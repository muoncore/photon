(ns photon-ui.core
  (:gen-class)
  (:require [immutant.web :as web]
            [com.stuartsierra.component :as component]
            [compojure.route :as route]
            [compojure.api.api :as capi]
            [photon.config :as conf]
            [ring.util.http-response :as http]
            [ring.middleware.reload :as reload]
            [ring.middleware.session :refer [wrap-session]]
            [compojure.api.sweet :refer :all]
            [ring.util.response :as response]
            [clojure.core.async :refer [<! go-loop]]
            [clojure.tools.logging :as log])
  (:import (java.net ServerSocket)
           (io.undertow UndertowOptions)))

(defn app [http-kit?]
  (let [app-no-reload
        (capi/api
         (GET "/" []
              :no-doc true
              (response/resource-response "index.html" {:root "public/ui"}))
         (route/resources "/")
         (route/not-found (http/not-found "Not found")))]
    (wrap-session (reload/wrap-reload app-no-reload))))

(defrecord UIHandler [options handler]
  component/Lifecycle
  (start [component]
    (if (nil? handler)
      (do
        (log/info "Initialising endpoints...")
        (assoc component :handler (app (:http-kit? options))))
      component))
  (stop [component]
    (if (nil? handler)
      component
      (assoc component :handler nil))))

(defn ui-handler [options]
  (map->UIHandler {:options options}))

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

(defn photon-ui-system [conf]
  (component/system-map
   :ui (component/using (ui-handler conf) [])))

;; Workaround to have http-kit as the provider for Ring
;; In order to use http-kit, run `lein run` instead of `lein ring server`
(defn photon-ui-component [conf]
  (log/info "Starting photon-ui...")
  (let [system (photon-ui-system conf)
        comp {:web-server (component/using (web-server conf) [:ui])}
        web-system (merge system comp)]
    (component/start web-system)))

(defn -main [& args]
  (try
    (photon-ui-component (apply conf/config args))
    (catch UnsupportedOperationException e
      (println (.getMessage e)))))

(defonce figwheel-instance (ref nil))

(defn figwheel-init! [& args]
  (log/info "Starting photon UI handler...")
  (let [h (dosync
            (if-let [instance @figwheel-instance]
              instance
              (let [system (photon-ui-system (assoc (conf/config)
                                                    :http-kit? true))
                    m-photon (component/start system)
                    handler (:handler (:ui m-photon))]
                (alter figwheel-instance (fn [_] handler))
                handler)))]
    (apply h args)))
