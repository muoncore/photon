(ns photon.core
  (:gen-class)
  (:require [photon.handler :as h]
            [photon.db :as db]
            [photon.api :as api]
            [photon.exec :as exec]
            [photon.muon :as m]
            [photon.config :as conf]
            [photon.streams :as streams]
            [photon.security :as sec]
            [photon.default-projs :as dp]
            [photon-ui.core :as photon-ui]
            [immutant.web :as web]
            [com.stuartsierra.component :as component]
            [clojure.core.async :refer [<! go-loop]]
            [clojure.tools.logging :as log])
  (:import (java.net ServerSocket)
           (io.undertow UndertowOptions)))

(defrecord UIHandler [options stream-manager security handler]
  component/Lifecycle
  (start [component]
    (if (nil? handler)
      (do
        (log/info "Initialising endpoints...")
        (assoc component :handler (h/app (:http-kit? options)
                                         (:manager stream-manager)
                                         (:m-sec security))))
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
    (log/info "Final options" options)
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
      (let [m-conf (immutant.web.undertow/options
                    (if (nil? (:rest.keystore options))
                      {:host (:rest.host options)
                       :port (:rest.port options)}
                      {:host (:rest.host options)
                       :ssl-port (:rest.port options)
                       :keystore (:rest.keystore options)
                       :key-password (:rest.keypass options)}))
            ;; Example of ad hoc Undertow configuration setting
            #_m-conf #_(update m-conf :configuration
                               #(.setServerOption
                                 % UndertowOptions/MAX_ENTITY_SIZE 8388608))
            server (web/run (:handler ui) m-conf)]
        (assoc component :server server))
      component))
  (stop [component]
    (if (nil? server)
      component
      (do
        (web/stop server)
        (assoc component :server nil)))))

(defn web-server [options]
  (map->WebServer {:options options}))

(defmulti process-config-event!
  (fn [_ {:keys [event-type]}] (keyword event-type)))

(defmethod process-config-event! :post-projection!
  [stm {:keys [event-type payload]}]
  (let [body (:request payload)
        projection-name (:projection-name body)
        stream-name (:stream-name body)
        language (:language body)
        code (:reduction body)
        initial-value (:initial-value body)
        k-language (keyword language)
        parsed-initial-value (exec/parse-value initial-value k-language)
        projection-descriptor {:projection-name projection-name
                               :stream-name stream-name
                               :language k-language
                               :reduction code
                               :initial-value parsed-initial-value}]
    (streams/register-query! stm projection-descriptor)
    {:correct true}))

(defmethod process-config-event! :delete-projection!
  [stm {:keys [event-type payload]}]
  (let [projection-name (:projection-name payload)
        defaults (into #{} (map :projection-name dp/default-projections))]
    (when-not (contains? defaults projection-name)
      (streams/unregister-query! stm projection-name))))

(defrecord ConfigManager [options stream-manager]
  component/Lifecycle
  (start [component]
    (log/info "Loading default projections...")
    (let [stm (:manager stream-manager)
          projs (dp/starting-projections)]
      (log/info "projs:" projs)
      (dorun (map #(api/post-projection! stm %) projs))
      (let [subs (streams/stream->ch
                  stm
                  {:stream-type "hot-cold"
                   :stream-name "__config__"})]
        (go-loop [ev (<! subs)]
          (when ev
            (try
              (log/info "Processing config event:" ev)
              (process-config-event! stm ev)
              (catch Throwable t
                (log/error (.getMessage t))
                (.printStackTrace t)))
            (recur (<! subs))))))
    (log/info "Projections loaded!")
    component)
  (stop [component] component))

(defn config-manager [options]
  (map->ConfigManager {:options options}))

(defn photon-system [conf]
  (let [c (component/system-map
           :security (component/using (sec/security conf) [])
           :database (component/using (db-component conf) [])
           :stream-manager (component/using (streams/stream-manager conf)
                                            [:database])
           :muon-service (component/using (m/muon-service conf)
                                          [:stream-manager])
           :config-manager (component/using (config-manager conf)
                                            [:stream-manager])
           :ui (component/using (ui-handler conf) [:stream-manager :security]))]
    (if (nil? (:ui.port conf))
      c
      (merge c {:photon-ui (component/using (photon-ui.core/ui-handler conf)
                                            [:muon-service])
                :web-server (component/using (photon-ui.core/web-server conf)
                                             [:photon-ui])}))))

;; Workaround to have http-kit as the provider for Ring
;; In order to use http-kit, run `lein run` instead of `lein ring server`
(defn photon-component [conf]
  (log/info "Starting photon...")
  (let [system (photon-system conf)
        comp {:rest-server (component/using (web-server conf) [:ui])}
        web-system (merge system comp)]
    (component/start web-system)))

(defn -main [& args]
  (try
    (photon-component (apply conf/config args))
    (catch UnsupportedOperationException e
      (println (.getMessage e)))))

(defonce figwheel-instance (ref nil))

(defn figwheel-init! [& args]
  (log/info "Starting photon UI handler...")
  (let [h (dosync
            (if-let [instance @figwheel-instance]
              instance
              (let [system (photon-system (assoc (conf/config)
                                                 :http-kit? true
                                                 :db.backend "file"))
                    m-photon (component/start system)
                    handler (:handler (:ui m-photon))]
                (alter figwheel-instance (fn [_] handler))
                handler)))]
    (apply h args)))
