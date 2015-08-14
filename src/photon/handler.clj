(ns photon.handler
  (:gen-class)
  (:use org.httpkit.server)
  (:require [photon.db :as db]
            [photon.common :as common]
            [compojure.core :refer :all]
            [compojure.route :as route]
            [clojure.tools.logging :as log]
            [photon.muon :as m]
            [gniazdo.core :as ws]
            [ring.middleware.reload :as reload]
            [photon.streams :as streams]
            [ring.util.response :as response]
            [ring.middleware.json :as rjson]
            [clojure.data.json :as json]
            [clojure.core.async :as async :refer [go <! >! close!]]
            [serializable.fn :as sfn]
            [ring.middleware.params :as pms]
            [photon.config :as conf]
            [photon.filedb :as filedb]
            [photon.api :as api]
            [photon.mongo :as mongo]
            [chord.http-kit :refer [wrap-websocket-handler]]
            #_[photon.riak :as riak]
            [compojure.handler :refer [site]]))

(defn async-handler [ring-request]
  (with-channel ring-request channel
    #_(send! channel {:status 200
                      :headers {"Content-Type" "text/plain"}
                      :body "Long polling?"})
    (on-receive channel (fn [data]
                          (send! channel data)))))

#_(def cold-latency 5000)
#_(def riak-streams (riak/riak "streams"))
#_(def active-streams
    (ref (into #{} (map #_#(hash-map :stream (pr-str %))
                        #(json/read-str (first (:payload_s %)) :key-fn keyword)
                        (db/lazy-events riak-streams "streams" 0)))))

#_(def test-ds (filedb/->DBFile (clojure.java.io/resource "events.json")))
(defonce own-stream (ref nil))

(defroutes app-routes
  (GET "/streams" []
       (log/info @own-stream)
       (common/wrap-json (streams/streams (:stm @own-stream))))
  (GET "/stream/:stream-name" [stream-name]
       (common/wrap-json (api/stream (:stm @own-stream) stream-name)))
  (GET "/ws" [] async-handler)
  (route/resources "/")
  (route/not-found "Not Found"))

(defn ws-handler [{:keys [ws-channel] :as req}]
  (go
    (let [{:keys [message]} (<! ws-channel)]
      (println "Message received:" message)
      (>! ws-channel "Hello client from server!")
      (close! ws-channel))))

(def app
  (routes (rjson/wrap-json-body (pms/wrap-params (site app-routes))
                                {:keywords? true})
          (wrap-websocket-handler ws-handler)))

(def reloadable-app (reload/wrap-reload #'app))

(defmulti default-db (fn [] (:db.backend conf/config)))
(defmethod default-db "mongodb" [] (mongo/mongo))
#_(defmethod default-db "riak" [] (riak/riak riak/s-bucket))
(defmethod default-db "file" []
  (filedb/->DBFile (clojure.java.io/file (:file.path conf/config))))

;; Workaround to have http-kit as the provider for Ring
;; In order to use http-kit, run `lein run` instead of `lein ring server`
(defn -main [& args]
  (let [ms (m/start-server! (:microservice.name conf/config) (default-db))]
    (dosync (alter own-stream (fn [_] ms)))
    (let [handler (reload/wrap-reload #'app)]
      (println run-server)
      (time (run-server handler {:port 3000})))))

#_(let [socket (ws/connect "ws://localhost:3000/ws" :on-receive #(prn 'received %))]
  (ws/send-msg socket "hello")
  (Thread/sleep 2000)
  (ws/close socket))

