(ns eventstore.handler
  (:use [org.httpkit.server :only [run-server]])
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.reload :as reload]
            [compojure.handler :refer [site]]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]))

(defroutes app-routes
  (GET "/" [] "Hello World")
  (route/not-found "Not Found"))


(def app
  (wrap-defaults app-routes site-defaults))

;; Workaround to have http-kit as the provider for Ring
;; In order to use http-kit, run `lein run` instead of `lein ring server`
(defn -main [& args]
  (let [handler (reload/wrap-reload app)]
    (time (run-server handler {:port 3000}))))
