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
             (.print out "null"))})

(extend clojure.lang.Ref json/JSONWriter
  {:-write (fn [object out]
             (.print out (json/write-str @object)))})

(defroutes app-routes
  (GET "/streams" []
       (wrap-json {:streams @streams/active-streams}))
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
                          (streams/stream streams/test-ds {"from" "0"
                                                           "stream-name" stream-name
                                                           "stream-type" "cold"
                                                           :limit 5})))}))
  (GET "/ws" [] async-handler)
  (GET "/thing" [] "Thing")
  (GET "/thing2" [] "Thing4")
  (POST "/projections" request
        (let [body (:body request)
              projection-name (:projection-name body)
              code (:code body)
              initial-value (:initial-value body)]
          (streams/register-query! streams/test-ds (keyword projection-name)
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

