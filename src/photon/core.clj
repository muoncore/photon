(ns photon.core
  (:gen-class)
  (:use org.httpkit.server)
  (:require [photon.handler :as h]
            [photon.db :as db]
            [photon.muon :as m]
            [photon.config :as conf]
            [clojure.tools.logging :as log]))

;; Workaround to have http-kit as the provider for Ring
;; In order to use http-kit, run `lein run` instead of `lein ring server`
(defn -main [& args]
  (log/info "Starting photon...")
  (let [conf conf/config
        db (db/default-db conf)
        _ (log/info "DB Configured...")
        ms (m/start-server! (:microservice.name conf) db)]
    (log/info "Server started, initialising streams...")
    (log/info "Initialising endpoints...")
    (let [handler (h/app (:stream ms))]
      (println run-server)
      (time (run-server handler {:port 3000})))))

