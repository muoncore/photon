(ns eventstore.handler
  (:gen-class)
  (:use org.httpkit.server)
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [eventstore.muon :as m]
            [gniazdo.core :as ws]
            [ring.middleware.reload :as reload]
            [compojure.handler :refer [site]]))

(defn async-handler [ring-request]
  (with-channel ring-request channel
    #_(send! channel {:status 200
                    :headers {"Content-Type" "text/plain"}
                    :body "Long polling?"})
    (on-receive channel (fn [data]
                          (send! channel data)))))

(defroutes app-routes
  (GET "/ws" [] async-handler)
  (GET "/thing" [] "Thing")
  (GET "/thing2" [] "Thing4")
  (route/not-found "Not Found"))

(def app
  (site app-routes))

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

