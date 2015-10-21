(ns photon.handler
  (:gen-class)
  (:use org.httpkit.server)
  (:require [photon.db :as db]
            [compojure.core :as cc]
            [compojure.route :as route]
            [clojure.tools.logging :as log]
            [photon.muon :as m]
            [gniazdo.core :as ws]
            [ring.middleware.reload :as reload]
            [photon.streams :as streams]
            [schema.core :as s]
            [ring.util.http-response :refer :all]
            [ring.util.response :as response]
            [ring.middleware.json :as rjson]
            [cheshire.core :as json]
            [compojure.api.sweet :refer :all]
            [ring.swagger.json-schema-dirty :refer :all]
            [clojure.core.async :as async :refer [go-loop go timeout
                                                  <! >! close! chan
                                                  sliding-buffer]]
            [cheshire.generate :refer [add-encoder]]
            [serializable.fn :as sfn]
            [ring.middleware.params :as pms]
            [photon.config :as conf]
            [photon.cassandra :as cassandra]
            [photon.filedb :as filedb]
            [photon.api :as api]
            [photon.mongo :as mongo]
            [chord.http-kit :refer [wrap-websocket-handler]]
            #_[photon.riak :as riak]
            [compojure.handler :refer [site]])
  (:import (com.fasterxml.jackson.core JsonGenerator)
           (clojure.lang AFunction Ref)
           (org.bson.types ObjectId)))

(defonce own-stream (ref nil))

(defn async-handler [ring-request]
  (with-channel ring-request channel
    #_(send! channel {:status 200
                      :headers {"Content-Type" "text/plain"}
                      :body "Long polling?"})
    (on-receive channel (fn [data]
                          (send! channel (str "hello " data))))))

(defn ws-handler [{:keys [ws-channel] :as req}]
  (go-loop []
    (if-let [{:keys [message]} (<! ws-channel)]
      (do
        (spit "/tmp/messages.txt" (str (pr-str {:message message}) "\n") :append true)
        (prn {:message message})
        (>! ws-channel (str "You said: " message))
        (recur))
      (prn "closed."))))

(defn ws-projections-handler [{:keys [ws-channel] :as req}]
  (go
    (loop [t 0]
      (if-let [{:keys [message]} (<! ws-channel)]
        (do
          (<! (timeout t))
          (>! ws-channel
              (if (contains? message :projection-name)
                (api/projection (:projection-name message))
                (api/projections-without-val @streams/queries)))
          (recur 1000))
        (do
          (close! ws-channel)
          (prn "closed."))))))

(defn ws-streams-handler [{:keys [ws-channel] :as req}]
  (let [ch (streams/stream (:stm @own-stream)
                           {"from" "0"
                            "stream-name" "__streams__"
                            "stream-type" "hot-cold"})
        current-value (atom (streams/streams (:stm @own-stream)))]
    (go-loop [t 0]
      (if-let [{:keys [message]} (<! ws-channel)]
        (do
          (<! (timeout t))
          (>! ws-channel (<! ch))
          (recur 1000))
        (do
          (close! ch)
          (close! ws-channel)
          (prn "closed."))))))

(defn wrap-json [r]
  (response/header (response/response (json/generate-string r))
                   "Content-Type" "application/json"))

(add-encoder Double
             (fn [^Double object ^JsonGenerator out]
               (cond (.isInfinite object)
                     (.writeString out (str 9007199254740992.0))
                     (.isNaN object)
                     (.writeString out (str 0.0))
                     :else
                     (.writeString out (str object)))))

(add-encoder Exception
             (fn [^Exception object ^JsonGenerator out]
               (.writeString out (pr-str (.getMessage object)))))

(add-encoder AFunction
             (fn [^AFunction object ^JsonGenerator out]
               (.writeString out (pr-str object))))

(add-encoder ObjectId
             (fn [^ObjectId object ^JsonGenerator out]
               (.writeString out (str "\"" (.toString object) "\""))))

(add-encoder Ref
             (fn [^Ref object ^JsonGenerator out]
               (.writeString out (json/generate-string @object))))

(def cold-latency 5000)

(def test-ds (filedb/->DBFile (clojure.java.io/resource "events.json")))

(defmulti default-db (fn []
                       (log/info "Configuring DB...")
                       (:db.backend conf/config)))
(defmethod default-db "cassandra" []
  (cassandra/->DBCassandra (get conf/config :cassandra.ip "127.0.0.1")
                           (get conf/config :kspace "photon")
                           (get conf/config :table "events")))
(defmethod default-db "mongodb" [] (mongo/mongo))
#_(defmethod default-db "riak" [] (riak/riak riak/s-bucket))
(defmethod default-db "file" []
  (filedb/->DBFile (clojure.java.io/file (:file.path conf/config))))

(defn figwheel-main []
  (let [ms (m/start-server! (:microservice.name conf/config)
                            (default-db))]
    (dosync (alter own-stream (fn [_] ms)))))

(defroutes* app-routes
  (GET* "/startup" []
        :no-doc true
        (if (nil? @own-stream)
          (do
            (figwheel-main)
            (wrap-json {:started "ok"}))
          {:started "already-started"}))
  (GET* "/streams" []
        :return api/StreamInfoMap
        :summary "Obtain a list of active streams
                  and their current size"
        (log/info @own-stream)
        (ok (api/streams)))
  (GET* "/projection-keys" []
        :return api/ProjectionKeyMap
        :summary "Obtain a list of the names (IDs)
                  of the current active projections"
        (ok (api/projection-keys)))
  (GET* "/projections" []
        :return api/ProjectionList
        :summary "Obtain a list of the states of the current active
                  projections without their computed reduction values"
        (ok (api/projections)))
  (GET* "/projection/:projection-name" [projection-name]
        :path-params [projection-name :- s/Str]
        :return api/ProjectionResponse
        :summary "Obtain the current status of a given projection,
                  including the latest computed reduction value"
        (let [pres (api/projection projection-name)]
          (if (nil? pres)
            (not-found)
            (ok pres))))
  (GET* "/stream-contents/:stream-name" [stream-name]
        :path-params [stream-name :- s/Str]
        :return api/StreamContentsResponse
        :summary "Obtain a list (maximum of 50) of events contained
                  in a given stream"
        (ok (api/stream (:stm @own-stream) stream-name
                        :limit 50)))
  (GET* "/event/:stream-name/:order-id" [stream-name order-id]
        :path-params [stream-name :- s/Str order-id :- s/Str]
        :return api/EventResponse
        :summary "Obtain the event identified by a given stream name
                  and an order ID"
        (let [res (api/event (:stm @own-stream) stream-name
                             (read-string order-id))]
          (if (nil? res) (not-found) (ok res))))
  (POST* "/projection" request
         :body [body api/ProjectionTemplate]
         :return api/PostResponse
         :summary "Add a projection"
         (ok (api/post-projection! (:stm @own-stream) (:body request))))
  (POST* "/event" request
         :body [body api/EventTemplate]
         :return api/PostResponse
         :summary "Add an event"
         (let [res (try
                     (api/post-event! (:stm @own-stream) (:body request))
                     (catch Exception e
                       ;; TODO: Verify whether this is still needed
                       (println (.getMessage e))
                       (api/post-event!
                        (:stm @own-stream)
                        (json/parse-string (:body request) true))))]
           (println res)
           (ok res)))
  (POST* "/event/:stream-name" request
         :no-doc true
         (api/post-event! (:stm @own-stream) (:body request)))
  (route/not-found "Not Found"))

(cc/defroutes ws-routes
  (GET* "/ws" [] (wrap-websocket-handler #'ws-handler))
  (GET* "/ws-streams" []
       (wrap-websocket-handler #'ws-streams-handler))
  (GET* "/ws-projections" []
       (wrap-websocket-handler #'ws-projections-handler)))

(defapi app
  (swagger-ui)
  (swagger-docs)
  (GET* "/ui" []
        :no-doc true
        (response/resource-response "index.html" {:root "public/ui"}))
  (route/resources "/")
  (context* "/ws" []
            (routes (rjson/wrap-json-body (pms/wrap-params (site ws-routes))
                                          {:keywords? true})))
  (context* "/api" []
            (routes (rjson/wrap-json-body (pms/wrap-params (site app-routes))
                                          {:keywords? true}))))

(def reloadable-app (reload/wrap-reload #'app))

;; Workaround to have http-kit as the provider for Ring
;; In order to use http-kit, run `lein run` instead of `lein ring server`
(defn -main [& args]
  (log/info "Starting photon...")
  (let [db (default-db)
        _ (log/info "DB Configured...")
        ms (m/start-server! (:microservice.name conf/config) db)]
    (log/info "Server started, initialising streams...")
    (dosync (alter own-stream (fn [_] ms)))
    (log/info "Initialising endpoints...")
    (let [handler (reload/wrap-reload #'app)]
      (println run-server)
      (time (run-server handler {:port 3000})))))

