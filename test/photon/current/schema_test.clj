(ns photon.current.schema-test
  (:require [muon-clojure.client :as cl]
            [photon.muon :as muon]
            [photon.config :as conf]
            [clojure.tools.logging :as log]
            [clojure.core.async :refer [<!!]]
            [com.stuartsierra.component :as component]
            [photon.current.common :refer :all])
  (:use midje.sweet))

(let [uuid (java.util.UUID/randomUUID)
      ms (new-server uuid)
      s-name (str "photon-integration-test-" uuid)
      url-req (str "request://" s-name)
      url-str (str "stream://" s-name)
      m (cl/muon-client :local (str "client-" uuid)
                        "client" "test")
      spn (cl/with-muon m
            (cl/request! (str url-req "/projection")
                         {:projection-name "idontexist"}))
      sp (cl/with-muon m
           (cl/request! (str url-req "/projection")
                        {:projection-name "__streams__"}))]
  (fact "The streams projection indicates 0 events processed"
        (:processed sp) => 0.0)
  (post-one-event m s-name)
  (let [new-sp (cl/with-muon m
                 (cl/request! (str url-req "/projection")
                              {:projection-name "__streams__"}))]
    (fact "Now there is one event processed"
          (:processed new-sp) => 1.0))
  (let [res (cl/with-muon m
              (cl/request! (str url-req "/projection")
                           {:projection-name "__streams__"}))]
    (fact "Only __unversioned__ schema"
          (into #{} (keys (:schemas (:chatter (:current-value res)))))
          => #{:__unversioned__})
    (fact "Schema parts are correct"
          (-> res :current-value :chatter :schemas :__unversioned__
              :schema :m ((keyword "[:service-id]")) :type)
          (-> res :current-value :chatter :schemas :__unversioned__
              :schema :m ((keyword "[:service-id]")) :mode) => "required")
    (post-one-event m s-name "0.0.1")
    (clojure.pprint/pprint (:schemas (:chatter (:current-value res))))
    (let [res (cl/with-muon m
                (cl/request! (str url-req "/projection")
                             {:projection-name "__streams__"}))]
      (fact "Not only __unversioned__ schema"
            (into #{} (keys (:schemas (:chatter (:current-value res)))))
            =not=> #{:__unversioned__})
      (fact "New version in schemas"
            (contains? (:schemas (:chatter (:current-value res)))
                       :0.0.1)
            => truthy)
      (fact "Schema parts for unversioned are correct"
            (-> res :current-value :chatter :schemas :__unversioned__
                :schema :m ((keyword "[:service-id]")) :count) => 1.0
            (-> res :current-value :chatter :schemas :__unversioned__
                :schema :m ((keyword "[:service-id]")) :type) => "s/Str"
            (-> res :current-value :chatter :schemas :__unversioned__
                :schema :m ((keyword "[:service-id]")) :mode) => "required")
      (fact "Schema parts for 0.0.1 are correct"
            (-> res :current-value :chatter :schemas :0.0.1
                :schema :m ((keyword "[:service-id]")) :count) => 1.0
            (-> res :current-value :chatter :schemas :0.0.1
                :schema :m ((keyword "[:service-id]")) :type) => "s/Str"
            (-> res :current-value :chatter :schemas :0.0.1
                :schema :m ((keyword "[:service-id]")) :mode) => "required")))
  (component/stop ms))
