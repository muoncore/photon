(ns photon.core
  (:gen-class)
  (:use org.httpkit.server)
  (:require [photon.handler :as h]
            [photon.db :as db]
            [photon.muon :as m]
            [photon.config :as conf]
            [photon.streams :as streams]
            [com.stuartsierra.component :as component]
            [clojure.tools.logging :as log])
  (:import (java.net ServerSocket)))

(defrecord UIHandler [options stream-manager handler]
  component/Lifecycle
  (start [component]
    (if (nil? handler)
      (do
        (log/info "Initialising endpoints...")
        (assoc component :handler (h/app (:manager stream-manager))))
      component))
  (stop [component]
    (if (nil? handler)
      component
      (assoc component :handler nil))))

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
                               {:port (:rest.port options)
                                :max-body 600000000})]
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

(defn photon-system [conf]
  (component/system-map
   :database (component/using (db-component conf) [])
   :stream-manager (component/using (streams/stream-manager conf)
                                    [:database])
   :muon-service (component/using (m/muon-service conf)
                                  [:stream-manager])
   :ui (component/using (ui-handler conf) [:stream-manager])))

;; Workaround to have http-kit as the provider for Ring
;; In order to use http-kit, run `lein run` instead of `lein ring server`
(defn -main [& args]
  (log/info "Starting photon...")
  (try
    (let [conf (apply conf/config args)
          system (photon-system conf)
          comp {:web-server (component/using (web-server conf) [:ui])}
          web-system (merge system comp)]
      (component/start web-system))
    (catch UnsupportedOperationException e
      (println (.getMessage e)))))

(defonce figwheel-instance (ref nil))

(defn figwheel-init! [& args]
  (log/info "Starting photon UI handler...")
  (let [h (dosync
            (if-let [instance @figwheel-instance]
              instance
              (let [system (photon-system (conf/config))
                    m-photon (component/start system)
                    handler (:handler (:ui m-photon))]
                (alter figwheel-instance (fn [_] handler))
                handler)))]
    (apply h args)))
