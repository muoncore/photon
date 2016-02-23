(ns photon.security
  (:require [buddy.auth :refer [authenticated?]]
            [buddy.auth.middleware :refer [wrap-authentication]]
            [buddy.auth.backends.httpbasic :refer [http-basic-backend]]
            [buddy.hashers :as hashers]
            [buddy.sign.jws :as jws]
            [clojure.tools.logging :as log]
            [clj-time.core :as time]
            [ring.util.http-response :refer :all]
            [buddy.auth.backends.token :refer [jws-backend token-backend]]
            [com.stuartsierra.component :as component]))

(defn basic-auth [user-info]
  (fn [request auth-data]
    (let [identifier  (:username auth-data)
          password    (:password auth-data)]
      ;; TODO: Improve security with buddy/hashers
      (if (and user-info (hashers/check password (:password user-info)))
        {:id identifier
         :permissions []
         :email identifier
         :username identifier}
        false))))

(defn basic-backend [user-info]
  (http-basic-backend {:authfn (basic-auth user-info)}))

(defn create-token [secret user]
  (let [stringify-user
        (-> user
            (update-in [:username] str)
            (update-in [:email] str)
            (assoc     :exp (time/plus (time/now) (time/years 5))))
        token-contents
        (select-keys stringify-user [:permissions :username :email :id :exp])]
    (jws/sign token-contents secret {:alg :hs512})))

(defn create-simple-token [tokens user]
  (let [stringify-user
        (-> user
            (update-in [:username] str)
            (update-in [:email] str)
            (assoc     :exp (time/plus (time/now) (time/seconds 900))))
        token-contents
        (select-keys stringify-user [:permissions :username :email :id :exp])
        simple-token (str (java.util.UUID/randomUUID))]
    (dosync (alter tokens assoc simple-token token-contents))
    simple-token))

(defn jws-token-backend [secret]
  (jws-backend {:secret secret :options {:alg :hs512}}))

(defn simple-token-fn [tokens]
  (fn [req token]
    (if-let [token-contents (get @tokens token)]
      (if (time/before? (time/now) (:exp token-contents))
        token-contents
        (do
          (dosync (alter tokens dissoc token))
          false))
      false)))

(defprotocol SecurityProtocol
  (basic-auth-mw [this])
  (authenticated-mw [this])
  (cors-mw [this])
  (token-auth-mw [this])
  (auth-credentials-response [this req])
  (qs->token-mw [this]))

(defrecord SecurityImpl [jws-tokens tokens secret username password]
  SecurityProtocol
  (basic-auth-mw [this]
    (fn [handler]
      (wrap-authentication
       handler (basic-backend {:username username :password password}))))
  (authenticated-mw [this]
    (fn [handler]
      (fn [request]
        (if (authenticated? request)
          (handler request)
          (unauthorized {:error "Not authorized"})))))
  (cors-mw [this]
    (fn [handler]
      (fn [request]
        (let [response (handler request)]
          (-> response
              (assoc-in [:headers "Access-Control-Allow-Origin"] "*")
              (assoc-in [:headers "Access-Control-Allow-Methods"]
                        "GET, PUT, PATCH, POST, DELETE, OPTIONS")
              (assoc-in [:headers "Access-Control-Allow-Headers"]
                        "Authorization, Content-Type"))))))
  (token-auth-mw [this]
    (fn [handler]
      (wrap-authentication
       handler (jws-token-backend secret)
       (token-backend {:authfn (simple-token-fn tokens)}))))
  (auth-credentials-response [this req]
    (let [user          (:identity req)
          refresh-token (str (java.util.UUID/randomUUID))]
      (dosync
       (alter jws-tokens conj {:refresh_token refresh-token :id (:id user)}))
      {:id            (:id user)
       :username      (:username user)
       :permissions   (:permissions user)
       :token         (create-token secret user)
       :simple-token  (create-simple-token tokens user)
       :refreshToken  refresh-token}))
  (qs->token-mw [this]
    (fn [handler]
      (fn [req]
        (if-let [token (:access_token (:params req))]
          (let [new-req (assoc-in req [:headers "authorization"]
                                  (str "Token " token))]
            (handler new-req))
          (handler req))))))

(defrecord Security [options m-sec]
  component/Lifecycle
  (start [component]
    (if (nil? m-sec)
      (do
        (log/info "Initialising security...")
        (assoc component :m-sec
               (map->SecurityImpl
                {:jws-tokens (ref [])
                 :tokens (ref {})
                 :username (:admin.user options)
                 :password (:admin.pass options)
                 :secret (java.util.UUID/randomUUID)})))
      component))
  (stop [component]
    (if (nil? m-sec)
      component
      (assoc component :m-sec nil))))

(defn security [options]
  (map->Security {:options options}))
