(ns photon.security
  (:require [com.stuartsierra.component :as component]
            [clauth.endpoints :as ep]
            [clauth.token :as token]
            [clauth.auth-code :as ac]
            [clauth.client :as client]
            [clauth.user :as user]
            [clauth.store :as store]))

(defrecord Security [options m-security]
  component/Lifecycle
  (start [component]
    (if (nil? m-security)
      (do
        ;; TODO: In-DB users will go here
        (reset! token/token-store (store/create-memory-store))
        (reset! ac/auth-code-store (store/create-memory-store))
        (reset! client/client-store (store/create-memory-store))
        (reset! user/user-store (store/create-memory-store))
        (let [master-client (client/register-client "photon" "/")
              ah (ep/authorization-handler)
              th (ep/token-handler)
              lh (ep/login-handler {:client master-client})]
          (user/register-user (:admin.user options)
                              (:admin.pass options))
          (assoc component :m-security
                 {:authorization-handler ah
                  :master-client master-client
                  :token-handler th
                  :login-handler lh})))
      component))
  (stop [component]
    (assoc component :m-security nil))) ;; TODO: Add lifecycle to photon-db)

(defn security [options]
  (map->Security {:options options}))

(defn authorize [m-security req]
  ((:authorization-handler m-security) req))

(defn token [m-security req]
  ((:token-handler m-security) req))

(defn login [m-security req]
  ((:login-handler m-security) req))
