(ns eventstore.handler
  (:gen-class)
  (:use org.httpkit.server)
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [clojure.tools.logging :as log]
            [eventstore.muon :as m]
            [gniazdo.core :as ws]
            [ring.middleware.reload :as reload]
            [eventstore.streams :as streams]
            [ring.util.response :as response]
            [ring.middleware.json :as rjson]
            [clojure.data.json :as json]
            [clojure.core.async :as async]
            [serializable.fn :as sfn]
            [ring.middleware.params :as pms]
            [eventstore.db :as db]
            [eventstore.mongo :as mongo]
            [eventstore.riak :as riak]
            [compojure.handler :refer [site]]))

(defn async-handler [ring-request]
  (with-channel ring-request channel
    #_(send! channel {:status 200
                    :headers {"Content-Type" "text/plain"}
                    :body "Long polling?"})
    (on-receive channel (fn [data]
                          (send! channel data)))))

(defn wrap-json [r]
  (response/header (response/response (json/write-str r))
    "Content-Type" "application/json"))

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
(def riak-streams (riak/riak "streams"))
#_(def active-streams
  (ref (into #{} (map #_#(hash-map :stream (pr-str %))
                      #(json/read-str (first (:payload_s %)) :key-fn keyword)
                      (db/lazy-events riak-streams "streams" 0)))))

(def test-ds 
  (streams/new-async-stream 
    (mongo/mongo)
    #_(riak/riak riak/s-bucket)))

#_(def ms (m/start-server! ))

(defroutes app-routes
  (GET "/streams" []
       (wrap-json (streams/streams test-ds)))
  (GET "/projections" []
       (wrap-json (map
                    (fn [v] (assoc v :fn (pr-str (:fn v))))
                    (map #(apply dissoc (deref %) [:_id])
                         (vals @streams/queries)))))
  (GET "/stream/:stream-name" [stream-name]
       (wrap-json
         {:results
          (async/<!!
            (async/reduce (fn [prev n] (concat prev [n])) []
                          (streams/stream test-ds {"from" "0"
                                                   "stream-name" stream-name
                                                   :limit 5 
                                                   "stream-type" "cold"})))}))
  (GET "/ws" [] async-handler)
  (GET "/thing" [] "Thing")
  (GET "/thing2" [] "Thing4")
  (POST "/projections" request
        (let [body (:body request)
              projection-name (:projection-name body)
              code (:code body)
              initial-value (:initial-value body)]
          (streams/register-query! test-ds (keyword projection-name)
                                   (eval (let [f (read-string code)]
                                           (if (= (first f) 'fn)
                                             (conj (rest f) 'serializable.fn/fn)
                                             f)))
                                   (read-string initial-value))
          "Ok"))
  (route/not-found "Not Found"))

(def app
  (rjson/wrap-json-body (pms/wrap-params (site app-routes)) {:keywords? true}))

(def reloadable-app
  (reload/wrap-reload #'app))

;; Workaround to have http-kit as the provider for Ring
;; In order to use http-kit, run `lein run` instead of `lein ring server`
(defn -main [& args]
  #_(future (m/start-server!))
  (let [handler (reload/wrap-reload #'app)]
    (println run-server)
    (time (run-server handler {:port 3000}))))

#_(let [socket (ws/connect "ws://localhost:3000/ws" :on-receive #(prn 'received %))]
  (ws/send-msg socket "hello")
  (Thread/sleep 2000)
  (ws/close socket))

