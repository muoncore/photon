(ns photon.handler
  (:require [ring.middleware.reload :as reload]
            [compojure.core :as cc]
            [compojure.route :as route]
            [clojure.tools.logging :as log]
            [photon.streams :as streams]
            [schema.core :as s]
            [ring.util.http-response :refer :all]
            [ring.util.response :as response]
            [ring.middleware.json :as rjson]
            [cheshire.core :as json]
            [compojure.api.sweet :refer :all]
            [ring.swagger.json-schema-dirty :refer :all]
            [clojure.core.async :refer [go-loop go timeout <! >! close!]]
            [ring.middleware.params :as pms]
            [photon.api :as api]
            [chord.http-kit :refer [wrap-websocket-handler]]
            [compojure.handler :refer [site]]))

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

(defn f-ws-streams-handler [stream]
  (fn [{:keys [ws-channel] :as req}]
    (let [ch (streams/stream stream
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

(defn app-routes [stream]
  (defroutes* d-app-routes
    (GET* "/streams" []
          :return api/StreamInfoMap
          :summary "Obtain a list of active streams
                  and their current size"
          (ok (api/streams stream)))
    (GET* "/projection-keys" []
          :return api/ProjectionKeyMap
          :summary "Obtain a list of the names (IDs)
                  of the current active projections"
          (ok (api/projection-keys stream)))
    (GET* "/projections" []
          :return api/ProjectionList
          :summary "Obtain a list of the states of the current active
                  projections without their computed reduction values"
          (ok (api/projections stream)))
    (GET* "/projection/:projection-name" [projection-name]
          :path-params [projection-name :- s/Str]
          :return api/ProjectionResponse
          :summary "Obtain the current status of a given projection,
                  including the latest computed reduction value"
          (let [pres (api/projection stream projection-name)]
            (if (nil? pres)
              (not-found)
              (ok pres))))
    (GET* "/stream-contents/:stream-name" [stream-name]
          :path-params [stream-name :- s/Str]
          :return api/StreamContentsResponse
          :summary "Obtain a list (maximum of 50) of events contained
                  in a given stream"
          (ok (api/stream stream stream-name :limit 50)))
    (GET* "/event/:stream-name/:order-id" [stream-name order-id]
          :path-params [stream-name :- s/Str order-id :- s/Str]
          :return api/EventResponse
          :summary "Obtain the event identified by a given stream name
                  and an order ID"
          (let [res (api/event stream stream-name (read-string order-id))]
            (if (nil? res) (not-found) (ok res))))
    (POST* "/projection" request
           :body [body api/ProjectionTemplate]
           :return api/PostResponse
           :summary "Add a projection"
           (ok (api/post-projection! stream (:body request))))
    (POST* "/event" request
           :body [body api/EventTemplate]
           :return api/PostResponse
           :summary "Add an event"
           (let [res (try
                       (api/post-event! stream (:body request))
                       (catch Exception e
                         ;; TODO: Verify whether this is still needed
                         (println (.getMessage e))
                         (api/post-event!
                          stream
                          (json/parse-string (:body request) true))))]
             (println res)
             (ok res)))
    (POST* "/event/:stream-name" request
           :no-doc true
           (api/post-event! stream (:body request)))
    (route/not-found "Not Found")))

(defn ws-routes [stm]
  (cc/defroutes m-ws-routes
    (let [ws-handler (f-ws-handler stm)
          ws-streams-handler (f-ws-streams-handler stm)
          ws-projections-handler (f-ws-projections-handler stm)]
      (GET* "/ws" [] (wrap-websocket-handler ws-handler))
      (GET* "/ws-streams" []
            (wrap-websocket-handler ws-streams-handler))
      (GET* "/ws-projections" []
            (wrap-websocket-handler ws-projections-handler)))))

(defn app [ms]
  (defapi app-no-reload
    (swagger-ui)
    (swagger-docs)
    (GET* "/ui" []
          :no-doc true
          (response/resource-response "index.html"
                                      {:root "public/ui"}))
    (route/resources "/")
    (context* "/ws" []
              (routes (rjson/wrap-json-body
                       (pms/wrap-params (site (ws-routes ms)))
                       {:keywords? true})))
    (context* "/api" []
              (routes (rjson/wrap-json-body
                       (pms/wrap-params (site (app-routes ms)))
                       {:keywords? true}))))
  (reload/wrap-reload #'app-no-reload))

