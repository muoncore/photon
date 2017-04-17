(ns photon.security
  (:require [buddy.auth :refer [authenticated?]]
            [buddy.auth.middleware :refer [wrap-authentication]]
            [buddy.auth.backends.httpbasic :refer [http-basic-backend]]
            [buddy.hashers :as hashers]
            [buddy.sign.jwt :as jws]
            [clojure.tools.logging :as log]
            [clj-time.core :as time]
            [clj-time.coerce :as c]
            [ring.util.http-response :refer :all]
            [buddy.auth.backends.token :refer [jws-backend token-backend]]
            [buddy.auth.backends.session :refer [session-backend]]
            [com.stuartsierra.component :as component]))

(defn user-profile [username]
  {:id username
   :permissions []
   :email username
   :username username})

(defn basic-auth [user-info]
  (fn [request auth-data]
    (let [identifier  (:username auth-data)
          password    (:password auth-data)]
      ;; TODO: Improve security with buddy/hashers
      (if (and user-info (hashers/check password (:password user-info)))
        (user-profile identifier)
        false))))

(defn basic-backend [user-info]
  (http-basic-backend {:authfn (basic-auth user-info)}))

(defn create-token [secret user]
  {:post [(jws/unsign % secret {:alg :hs512})]}
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

(defn app-token-fn [secret]
  (fn [req token]
    (try
      (if-let [token-contents (jws/unsign token secret {:alg :hs256})]
        (do
          (if (time/before? (time/now)
                            (c/from-long (long (* 1000 (:exp token-contents)))))
            token-contents
            false))
        false)
      (catch Exception e
        (println (.getMessage e))
        false))))

(defprotocol SecurityProtocol
  (basic-auth-mw [this])
  (authenticated-mw [this])
  (cors-mw [this])
  (token-auth-mw [this])
  (session-mw [this])
  (basic-or-session-mw [this])
  (session-or-token-mw [this])
  (auth-credentials-response [this req])
  (qs->token-mw [this ms])
  (create-app-token! [this identity name description website]))

(defn token-from-id-secret [ms client-id client-secret]
  (let [proj (get (:projections @(:state ms)) "__security-state__")
        v (:current-value @(:projection-descriptor proj))
        all-apps (mapcat vals (vals v))
        valid-app (first
                   (filter #(and (= (str (:client-id %)) client-id)
                                 (= (str (:client-secret %)) client-secret))
                           all-apps))]
    (when-not (nil? valid-app) (second (:tks valid-app)))))

(defrecord SecurityImpl [jws-tokens tokens secret username password]
  SecurityProtocol
  (basic-auth-mw [this]
    (fn [handler]
      (wrap-authentication
       handler (basic-backend {:username username :password password}))))
  (session-mw [this]
    (fn [handler]
      (wrap-authentication handler (session-backend))))
  (basic-or-session-mw [this]
    (fn [handler]
      (wrap-authentication
       handler (basic-backend {:username username :password password})
       (session-backend))))
  (authenticated-mw [this]
    (fn [handler]
      (fn [request]
        (if (or (= :options (:request-method request)) (authenticated? request))
          (assoc-in (handler request) [:session :identity]
                    (:identity request))
          (unauthorized {:error "Not authorized"})))))
  (cors-mw [this]
    (fn [handler]
      (fn [request]
        (let [response (handler request)]
          (-> response
              (assoc-in [:headers "Access-Control-Allow-Origin"]
                        [(get (:headers request) "origin")])
              (assoc-in [:headers "Access-Control-Allow-Credentials"] "true")
              (assoc-in [:headers "Access-Control-Allow-Methods"]
                        "GET, PUT, PATCH, POST, DELETE, OPTIONS")
              (assoc-in [:headers "Access-Control-Allow-Headers"]
                        "Authorization, Content-Type, Accept, If-None-Match, Accept-Language, Accept-Encoding"))))))
  (session-or-token-mw [this]
    (fn [handler]
      (wrap-authentication
       handler (session-backend) (jws-token-backend secret)
       (token-backend {:authfn (app-token-fn secret)})
       (token-backend {:authfn (simple-token-fn tokens)}))))
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
  (qs->token-mw [this ms]
    (fn [handler]
      (fn [req]
        (if-let [token (:access_token (:params req))]
          (let [new-req (assoc-in req [:headers "authorization"]
                                  (str "Token " token))]
            (handler new-req))
          (let [client-id (:client_id (:params req))
                client-secret (:client_secret (:params req))]
            (if-let [token (token-from-id-secret ms client-id client-secret)]
              (handler (assoc-in req [:headers "authorization"]
                                 (str "Token " token)))
              (handler req)))))))
  (create-app-token! [this identity name description website]
    (let [tn (time/plus (time/now) (time/years 5))
          token-id {:username (:username identity) :exp tn}
          token-secret {:username (:username identity)
                        :exp tn
                        :name name
                        :description description
                        :website website}
          client-id (jws/sign token-id secret {:alg :hs256})
          client-secret (jws/sign token-secret secret {:alg :hs256})]
      {:client-id client-id :client-secret client-secret})))

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
                 :secret (.getBytes
                          (.toString
                           (get options :admin.secret
                                (java.util.UUID/randomUUID))))})))
      component))
  (stop [component]
    (if (nil? m-sec)
      component
      (assoc component :m-sec nil))))

(defn security [options]
  (map->Security {:options options}))
