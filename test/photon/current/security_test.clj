(ns photon.current.security-test
  (:require [photon.current.common :refer :all]
            [clj-http.client :as client]
            [com.stuartsierra.component :as component]
            [midje.sweet :refer :all]))

(let [s (new-web-server (java.util.UUID/randomUUID))]
  (fact
   (:status (client/get "http://localhost:9997/api-docs"))
   => 200)
  (fact
   (:status (client/get "http://localhost:9997/api/ping"))
   => (throws))
  (fact
   (:status (client/get "http://localhost:9997/auth/token"
                        {:basic-auth ["test" "wrong"]}))
   => (throws))
  (let [res (client/get "http://localhost:9997/auth/token"
                        {:basic-auth ["test" "test"] :as :json})
        token (:simple-token (:body res))]
    (fact (:status res) => 200)
    (let [res (client/get (str "http://localhost:9997/api/ping"
                               "?access_token=" token) {:as :json})]
      (fact (:status res) => 200)
      (fact (:body res) => {:auth "ok"}))
    (let [res (client/get "http://localhost:9997/api/ping"
                          {:headers {"Authorization" (str "Token " token)}
                           :as :json})]
      (fact (:status res) => 200)
      (fact (:body res) => {:auth "ok"})))
  #_(let [token (:simple_token
               (:body (client/get "http://localhost:9997/api/ping")))]
    
   => (throws))
  (component/stop s))
