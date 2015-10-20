(ns photon.handler
  (:gen-class)
  (:use org.httpkit.server)
  (:require [photon.db :as db]
            [compojure.core :refer :all]
            [compojure.route :as route]
            [clojure.tools.logging :as log]
            [photon.muon :as m]
            [gniazdo.core :as ws]
            [ring.middleware.reload :as reload]
            [photon.streams :as streams]
            [ring.util.response :as response]
            [ring.middleware.json :as rjson]
            [cheshire.core :as json]
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

(defroutes app-routes
  (GET "/startup" []
       (if (nil? @own-stream)
         (do
           (figwheel-main)
           (wrap-json {:started "ok"}))
         {:started "already-started"}))
  (GET "/streams" []
       (log/info @own-stream)
       (wrap-json (api/projection "__streams__")))
  (GET "/projection-keys" []
       (wrap-json (api/projection-keys)))
  (GET "/projections" []
       (wrap-json (api/projections)))
  (GET "/projection/:projection-name" [projection-name]
       (wrap-json (api/projection projection-name)))
  (GET "/stream-contents/:stream-name" [stream-name]
       (wrap-json (api/stream (:stm @own-stream) stream-name
                              :limit 50)))
  (GET "/ws" [] (wrap-websocket-handler #'ws-handler))
  (GET "/ws-streams" []
       (wrap-websocket-handler #'ws-streams-handler))
  (GET "/ws-projections" []
       (wrap-websocket-handler #'ws-projections-handler))
  (GET "/event/:stream-name/:order-id" [stream-name order-id]
       (wrap-json (api/event (:stm @own-stream) stream-name
                             (read-string order-id))))
  (POST "/projections" request (api/post-projection!
                                (:stm @own-stream)
                                (:body request)))
  (POST "/event" request (api/post-event!
                          (:stm @own-stream)
                          (json/parse-string (:body request) true)))
  (POST "/event/:stream-name" request
        (api/post-event! (:stm @own-stream) (:body request)))
  (route/resources "/")
  (route/not-found "Not Found"))

(def app
  (routes (rjson/wrap-json-body (pms/wrap-params (site app-routes))
                                {:keywords? true})))

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

