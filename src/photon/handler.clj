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
            [clojure.data.json :as json]
            [clojure.core.async :as async :refer [go-loop go timeout
                                                  <! >! close! chan
                                                  sliding-buffer]]
            [serializable.fn :as sfn]
            [ring.middleware.params :as pms]
            [photon.config :as conf]
            [photon.filedb :as filedb]
            [photon.api :as api]
            [photon.mongo :as mongo]
            [chord.http-kit :refer [wrap-websocket-handler]]
            #_[photon.riak :as riak]
            [compojure.handler :refer [site]]))

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
          (>! ws-channel (api/projections-with-val @streams/queries))
          (recur 1000))
        (do
          (close! ws-channel)
          (prn "closed."))))))

(defn ws-streams-handler [{:keys [ws-channel] :as req}]
  (let [uuid (java.util.UUID/randomUUID)
        current-value (atom (streams/streams (:stm @own-stream)))]
    (add-watch streams/active-streams uuid
               (fn [k r os ns]
                 (swap! current-value
                        (fn [_]
                          (streams/streams (:stm @own-stream))))))
    (go-loop [t 0]
      (if-let [{:keys [message]} (<! ws-channel)]
        (do
          (<! (timeout t))
          (>! ws-channel @current-value)
          (recur 1000))
        (do
          (remove-watch streams/active-streams uuid)
          (close! ws-channel)
          (prn "closed."))))))

(defn wrap-json [r]
  (response/header (response/response (json/write-str r))
                   "Content-Type" "application/json"))

(extend Double json/JSONWriter
  {:-write (fn [object out]
             (cond (.isInfinite object)
                   (.print out 9007199254740992.0)
                   (.isNaN object)
                   (.print out 0.0)
                   :else
                   (.print out object)))})

(extend Exception json/JSONWriter
  {:-write (fn [object out]
             (.print out (pr-str (.getMessage object))))})

(extend clojure.lang.AFunction json/JSONWriter
  {:-write (fn [object out]
             (.print out (pr-str object)))})

(extend org.bson.types.ObjectId json/JSONWriter
  {:-write (fn [object out]
             (.print out (str "\"" (.toString object) "\"")))})

(extend clojure.lang.Ref json/JSONWriter
  {:-write (fn [object out]
             (.print out (json/write-str @object)))})

(def cold-latency 5000)
#_(def riak-streams (riak/riak "streams"))
#_(def active-streams
    (ref (into #{} (map #_#(hash-map :stream (pr-str %))
                        #(json/read-str (first (:payload_s %)) :key-fn keyword)
                        (db/lazy-events riak-streams "streams" 0)))))

(def test-ds (filedb/->DBFile (clojure.java.io/resource "events.json")))

(defroutes app-routes
  (GET "/streams" []
       (log/info @own-stream)
       (wrap-json (streams/streams (:stm @own-stream))))
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
  (GET "/thing" [] "Thing")
  (GET "/thing2" [] "Thing4")
  (GET "/first-projection" []
       (wrap-json (api/projection)))
  (POST "/projections" request (api/post-projection! (:stm @own-stream) (:body request)))
  (route/resources "/")
  (route/not-found "Not Found"))

(def app
  (routes (rjson/wrap-json-body (pms/wrap-params (site app-routes))
                                {:keywords? true})))

(def reloadable-app (reload/wrap-reload #'app))

(defmulti default-db (fn [] (:db.backend conf/config)))
(defmethod default-db "mongodb" [] (mongo/mongo))
#_(defmethod default-db "riak" [] (riak/riak riak/s-bucket))
(defmethod default-db "file" []
  (filedb/->DBFile (clojure.java.io/file (:file.path conf/config))))

;; Workaround to have http-kit as the provider for Ring
;; In order to use http-kit, run `lein run` instead of `lein ring server`
(defn -main [& args]
  (let [ms (m/start-server! (:microservice.name conf/config)
                            (default-db))]
    (dosync (alter own-stream (fn [_] ms)))
    (let [handler (reload/wrap-reload #'app)]
      (println run-server)
      (time (run-server handler {:port 3000})))))

#_(let [socket (ws/connect "ws://localhost:3000/ws"
                         :on-receive #(prn 'received %))]
  (ws/send-msg socket "hello")
  (Thread/sleep 2000)
  (ws/close socket))

