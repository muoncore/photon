(ns photon.core
  (:gen-class)
  (:use org.httpkit.server)
  (:require [photon.handler :as h]
            [photon.db :as db]
            [photon.muon :as m]
            [photon.config :as conf]
            [com.stuartsierra.component :as component]
            [clojure.tools.logging :as log])
  (:import (java.net ServerSocket)))

(defrecord MuonService [options database ms stream]
  component/Lifecycle
  (start [component]
    (if (or (nil? ms) (nil? stream))
      (let [ms (m/start-server! (:driver database) options)]
        (log/info "Server started, initialising streams...")
        (assoc (assoc component :ms ms) :stream (:stream ms)))
      component))
  (stop [component]
    ;; TODO: Stop muon and async-stream
    component))

(defn muon-service [options]
  (map->MuonService {:options options}))

(defrecord UIHandler [options muon handler]
  component/Lifecycle
  (start [component]
    (if (nil? handler)
      (do
        (log/info "Initialising endpoints...")
        (assoc component :handler (h/app (:stream muon))))
      component))
  (stop [component] component))

(defn ui-handler [options]
  (map->UIHandler {:options options}))

(defrecord DBComponent [options driver]
  component/Lifecycle
  (start [component]
    (if (nil? driver)
      (let [driver ((db/default-db options) options)]
        (db/distinct-values driver :stream-name) ;; Test driver
        (assoc component :driver driver))
      component))
  (stop [component] component)) ;; TODO: Add lifecycle to photon-db

(defn db-component [options]
  (map->DBComponent {:options options}))

(defrecord WebServer [options ui server]
  component/Lifecycle
  (start [component]
    (if (nil? server)
      (let [server (run-server (:handler ui)
                               {:port 3000 :max-body 600000000})]
        (assoc component :server server))
      component))
  (stop [component]
    (if (nil? server)
      component
      (do
        (server :timeout 100)
        (assoc component :server nil)))))

(defn web-server [options]
  (map->WebServer {:options options}))

(defn init-photon! [& args]
  (log/info "Starting photon...")
  (try
    (let [conf (apply conf/config args)]
      (component/system-map
       :database (component/using (db-component conf) [])
       :muon (component/using (muon-service conf) [:database])
       :ui (component/using (ui-handler conf) [:muon])))
    (catch UnsupportedOperationException e
      (println (.getMessage e)))))

;; Workaround to have http-kit as the provider for Ring
;; In order to use http-kit, run `lein run` instead of `lein ring server`
(defn -main [& args]
  (let [system (apply init-photon! args)
        comp {:web-server (component/using (web-server {}) [:ui])}
        web-system (merge system comp)]
    web-system))

(defonce figwheel-instance (ref nil))

(defn figwheel-init! [& args]
  (let [h (dosync
            (if-let [instance @figwheel-instance]
              instance
              (let [m-photon (component/start (init-photon!))
                    handler (:handler (:ui m-photon))]
                (alter figwheel-instance (fn [_] handler))
                handler)))]
    (apply h args)))
