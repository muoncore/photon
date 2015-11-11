(ns photon.core
  (:gen-class)
  (:use org.httpkit.server)
  (:require [photon.handler :as h]
            [photon.db :as db]
            [photon.muon :as m]
            [photon.config :as conf]
            [clojure.tools.logging :as log])
  (:import (java.net ServerSocket)))

(defn init-photon! [& args]
  (log/info "Starting photon...")
  (try
    (let [conf (apply conf/config args)
          db ((db/default-db conf) conf)
          _ (log/info "DB Configured...")
          ms (m/start-server! (:amqp.url conf)
                              (:microservice.name conf)
                              db
                              (:projections.port conf)
                              (:events.port conf)
                              (:parallel.projections conf)
                              (:projections.path conf))]
      (log/info "Server started, initialising streams...")
      (log/info "Initialising endpoints...")
      (let [handler (h/app (:stream ms))]
        {:handler handler :ms ms :stream (:stream ms)}))
    (catch UnsupportedOperationException e
      (println (.getMessage e)))))

;; Workaround to have http-kit as the provider for Ring
;; In order to use http-kit, run `lein run` instead of `lein ring server`
(defn -main [& args]
  (let [m-photon (apply init-photon! args)]
    (println run-server)
    (time (run-server (:handler m-photon) {:port 3000}))
    m-photon))

(defonce figwheel-instance (ref nil))

(defn figwheel-init! [& args]
  (let [h (dosync
           (if-let [instance @figwheel-instance]
             instance
             (let [m-photon (init-photon!)]
               (alter figwheel-instance (fn [_] (:handler m-photon)))
               (:handler m-photon))))]
    (apply h args)))

