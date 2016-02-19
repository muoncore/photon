(ns photon.handler
  (:require [ring.middleware.reload :as reload]
            [clojure.tools.logging :as log]
            [photon.streams :as streams]
            [schema.core :as s]
            [compojure.route :as route]
            [compojure.core :as cc]
            [ring.util.http-response :refer :all]
            [ring.util.response :as response]
            [ring.middleware.json :as rjson]
            [cheshire.core :as json]
            [cheshire.generate :refer [add-encoder]]
            [compojure.api.sweet :refer :all]
            [ring.swagger.swagger2 :as rs]
            [ring.swagger.json-schema-dirty :refer :all]
            [clojure.core.async :refer [go-loop go timeout <! >! close!]]
            [ring.middleware.params :as pms]
            [ring.middleware.multipart-params :as mp]

            [buddy.auth :refer [authenticated?]]
            [buddy.auth.middleware :refer [wrap-authentication]]
            [buddy.auth.backends.httpbasic :refer [http-basic-backend]]
            [buddy.hashers :as hashers]
            [buddy.sign.jws :as jws]
            [clj-time.core :as time]
            [buddy.auth.backends.token :refer [jws-backend token-backend]]
            
            [photon.api :as api]
            [chord.http-kit :refer [wrap-websocket-handler]]
            [clojure.pprint :as pp]
            [compojure.handler :refer [site]])
  (:import (java.io ByteArrayInputStream)))

(defn f-ws-handler [ms]
  (fn [{:keys [ws-channel] :as req}]
    (go-loop []
      (if-let [{:keys [message]} (<! ws-channel)]
        (do
          (spit "/tmp/messages.txt" (str (pr-str {:message message}) "\n") :append true)
          (prn {:message message})
          (>! ws-channel (str "You said: " message))
          (recur))
        (prn "closed.")))))

(defn f-ws-projections-handler [stream]
  (fn [{:keys [ws-channel] :as req}]
    (go
      (loop [t 0]
        (if-let [{:keys [message]} (<! ws-channel)]
          (do
            (<! (timeout t))
            (>! ws-channel
                (if (contains? message :projection-name)
                  (api/projection stream (:projection-name message))
                  (api/projections-without-val stream)))
            (recur 1000))
          (do
            (close! ws-channel)
            (prn "closed.")))))))

(defn f-ws-stats-handler [stream]
  (fn [{:keys [ws-channel] :as req}]
    (go
      (loop [t 0]
        (if-let [{:keys [message]} (<! ws-channel)]
          (do
            (<! (timeout t))
            (let [stats-stream @(:stats stream)
                  stats-rt (api/runtime-stats stream)
                  all-stats {:stats (merge stats-stream stats-rt)}]
              (>! ws-channel all-stats))
            (recur 1000))
          (do
            (close! ws-channel)
            (prn "closed.")))))))

(defn f-ws-streams-handler [stream]
  (fn [{:keys [ws-channel] :as req}]
    (let [ch (streams/stream->ch stream
                                 {"from" "0"
                                  "stream-name" "__streams__"
                                  "stream-type" "hot-cold"})
          current-value (atom (streams/streams stream))]
      (go-loop [t 0]
        (if-let [{:keys [message]} (<! ws-channel)]
          (do
            (<! (timeout t))
            (>! ws-channel (<! ch))
            (recur 1000))
          (do
            (close! ch)
            (close! ws-channel)
            (prn "closed.")))))))

(defn ws-route-projections [stm]
  (cc/defroutes m-ws-route-projections
    (let [ws-projections-handler (f-ws-projections-handler stm)]
      (GET "/ws-projections" []
           (wrap-websocket-handler ws-projections-handler)))))

(defn ws-route-stats [stm]
  (cc/defroutes m-ws-route-stats
    (let [ws-stats-handler (f-ws-stats-handler stm)]
      (GET "/ws-stats" []
           (wrap-websocket-handler ws-stats-handler)))))

(defn authenticated-mw [handler]
  (fn [request]
    (if (authenticated? request)
      (handler request)
      (unauthorized {:error "Not authorized"}))))

(defn cors-mw [handler]
  (fn [request]
    (let [response (handler request)]
      (-> response
          (assoc-in [:headers "Access-Control-Allow-Origin"] "*")
          (assoc-in [:headers "Access-Control-Allow-Methods"]
                    "GET, PUT, PATCH, POST, DELETE, OPTIONS")
          (assoc-in [:headers "Access-Control-Allow-Headers"]
                    "Authorization, Content-Type")))))

(defn basic-auth
  [request auth-data]
  (let [identifier  (:username auth-data)
        password    (:password auth-data)
        user-info   {:username "admin" :password "p4010n"}]
    ;; TODO: Improve security with buddy/hashers
    (if (and user-info (= password (:password user-info)))
      {:id identifier
       :permissions []
       :email identifier
       :username identifier}
      false)))

(def basic-backend (http-basic-backend {:authfn basic-auth}))

(defn basic-auth-mw [handler]
  (wrap-authentication handler basic-backend))

(def jws-tokens (ref []))
(def tokens (ref {}))

(defn create-token [user]
  (let [stringify-user
        (-> user
            (update-in [:username] str)
            (update-in [:email] str)
            (assoc     :exp (time/plus (time/now) (time/seconds 86400))))
        token-contents
        (select-keys stringify-user [:permissions :username :email :id :exp])]
    (jws/sign token-contents "secret" {:alg :hs512})))

(defn create-simple-token [user]
  (let [stringify-user
        (-> user
            (update-in [:username] str)
            (update-in [:email] str)
            (assoc     :exp (time/plus (time/now) (time/seconds 900))))
        token-contents
        (select-keys stringify-user [:permissions :username :email :id :exp])
        simple-token (str (java.util.UUID/randomUUID))]
    (dosync (alter tokens assoc simple-token token-contents))
    simple-token))

(def jws-token-backend
  (jws-backend {:secret "secret" :options {:alg :hs512}}))

(defn simple-token-fn [req token]
  (if-let [token-contents (get @tokens token)]
    (if (time/before? (time/now) (:exp token-contents))
      token-contents
      (do
        (dosync (alter tokens dissoc token))
        false))
    false))

(defn auth-credentials-response [req]
  (let [user          (:identity req)
        refresh-token (str (java.util.UUID/randomUUID))]
    (dosync
     (alter jws-tokens conj {:refresh_token refresh-token :id (:id user)}))
    {:id            (:id user)
     :username      (:username user)
     :permissions   (:permissions user)
     :token         (create-token user)
     :simple-token  (create-simple-token user)
     :refreshToken  refresh-token}))

(defn token-auth-mw [handler]
  (wrap-authentication handler jws-token-backend
                       (token-backend {:authfn simple-token-fn})))

(defn qs->token-mw [app]
  (fn [req]
    (if-let [token (:access_token (:params req))]
      (let [new-req (assoc-in req [:headers "authorization"]
                              (str "Token " token))]
        (app new-req))
      (app req))))

(defn app [ms]
  (defapi app-no-reload
    {:swagger {:ui "/api-docs"
               :spec "/swagger.json"
               :data {:info {:title "Photon API"
                             :description "Photon API"}
                      :tags [{:name "api", :description "Core API"}]}}}
    (context "/auth" []
             :tags ["auth"]
             :middleware [basic-auth-mw cors-mw authenticated-mw]
             ;; TODO: Add refresh-token functionality
             (GET "/token" req
                  (ok (auth-credentials-response req))))
    (context "/export" []
             :no-doc true
             (GET "/stream/:stream-name" [stream-name]
                  :path-params [stream-name :- s/Str]
                  (let [f (api/stream->file ms stream-name)]
                    (-> (response/file-response (.getAbsolutePath f))
                      (header "Content-Type" "application/octet-stream")
                      (header "Content-Disposition" (str "attachment; filename=" stream-name ".pev"))
                      (header "Content-Length" (.length f))))))
    (context "/api" []
             :tags ["api"]
             :middleware [qs->token-mw token-auth-mw cors-mw authenticated-mw]
             (GET "/ping" []
                  (ok {:auth "ok"}))
             (GET "/streams" []
                  :return api/StreamInfoMap
                  :summary "Obtain a list of active streams
                     and their current size"
                  (ok (api/streams ms)))
             (GET "/projection-keys" []
                  :return api/ProjectionKeyMap
                  :summary "Obtain a list of the names (IDs)
          of the current active projections"
                  (ok (api/projection-keys ms)))
             (GET "/projections" []
                  :return api/ProjectionList
                  :summary "Obtain a list of the states of the current active
          projections without their computed reduction values"
                  (ok (api/projections ms)))
             (GET "/projection/:projection-name" [projection-name]
                  :path-params [projection-name :- s/Str]
                  :return api/ProjectionResponse
                  :summary "Obtain the current status of a given projection,
          including the latest computed reduction value"
                  (let [pres (api/projection ms projection-name)]
                    (if (nil? pres)
                      (not-found)
                      (ok pres))))
             (GET "/stream-contents/:stream-name" [stream-name]
                  :path-params [stream-name :- s/Str]
                  :return api/StreamContentsResponse
                  :summary "Obtain a list (maximum of 50) of events contained
          in a given stream"
                  (ok (api/stream ms stream-name :limit 50)))
             (GET "/event/:stream-name/:order-id" [stream-name order-id]
                  :path-params [stream-name :- s/Str order-id :- s/Str]
                  :return api/EventResponse
                  :summary "Obtain the event identified by a given stream name
          and an order ID"
                  (let [res (api/event ms stream-name (read-string order-id))]
                    (if (nil? res) (not-found) (ok res))))
             (POST "/projection" [& request]
                   :body [body api/ProjectionTemplate]
                   :return api/PostResponse
                   :summary "Add a projection"
                   (ok (api/post-projection! ms request)))
             (POST "/event" [& request]
                   :body [body api/EventTemplate]
                   :return api/PostResponse
                   :summary "Add an event"
                   (let [res (api/post-event! ms request)]
                     (ok res)))
             (POST "/event/:stream-name" [& request]
                   :no-doc true
                   (api/post-event! ms request))
             (mp/wrap-multipart-params
              (cc/POST "/new-stream" {params :params}
                       (ok {:status "OK"
                            :stream-name (api/new-stream ms params)}))))
    (GET "/ui" []
         :no-doc true
         (response/resource-response "index.html"
                                     {:root "public/ui"}))
    (context "/ws" []
             :middleware [qs->token-mw token-auth-mw cors-mw authenticated-mw]
             (routes (rjson/wrap-json-body
                      (pms/wrap-params
                       (site (routes (ws-route-projections ms)
                                     (ws-route-stats ms))))
                      {:keywords? true})))
    (route/resources "/"))
  (reload/wrap-reload #'app-no-reload))
