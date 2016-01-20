(ns photon.current.projections
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
  (fact "There is a default projection loaded with photon"
        sp => truthy)
  (fact "But there are no 'imaginary' projections"
        spn => falsey)
  (log/trace (with-out-str (clojure.pprint/pprint sp)))
  (fact "The streams projection indicates 0 events processed"
        (:processed sp) => 0.0)
  (post-one-event m s-name)
  (let [new-sp (cl/with-muon m
                 (cl/request! (str url-req "/projection")
                              {:projection-name "__streams__"}))]
    (fact "Now there is one event processed"
          (:processed new-sp) => 1.0))
  (let [sn (cl/with-muon m
             (cl/subscribe! (str url-str "/projection/imaginary")
                            :from 0 :stream-type :hot))]
    (fact "There is no stream for a non-existing projection"
          (class (<!! sn)) => io.muoncore.exception.MuonException))
  (let [s (cl/with-muon m
            (cl/subscribe! (str url-str "/projection/__streams__")
                           :from 0 :stream-type :hot))]
    (post-one-event m s-name)
    (fact "Two events in projection"
          (:processed (<!! s)) => 2.0)
    (let [s2 (cl/with-muon m
               (cl/subscribe! (str url-str "/projection/__streams__")
                              :from 0 :stream-type :hot
                              :stream-name "__all__"))]
      (post-one-event m s-name)
      (let [val2 (<!! s2)]
        (fact "Two streams receive the same result..."
              (:processed (<!! s)) => (:processed val2))
        (fact "... and that result is 3.0"
              (:processed val2) => 3.0))))
  (cl/with-muon m (cl/request! (str url-req "/projections")
                               {:projection-name "dummy-proj"
                                :stream-name "dummy"
                                :language "clojure"
                                :reduction "(fn [a b] (inc a))"
                                :initial-value "0"}))
  (cl/with-muon m (cl/request! (str url-req "/projections")
                               {:projection-name "chatter-proj"
                                :stream-name "chatter"
                                :language "clojure"
                                :reduction "(fn [a b] (inc a))"
                                :initial-value "0"})) 
  (let [res (cl/with-muon m
              (cl/request! (str url-req "/projection-keys") {}))
        sd (cl/with-muon m
             (cl/subscribe! (str url-str "/projection/dummy-proj")
                            :from 0 :stream-type :hot
                            :stream-name "__all__"))
        sc (cl/with-muon m
             (cl/subscribe! (str url-str "/projection/chatter-proj")
                            :from 0 :stream-type :hot
                            :stream-name "__all__"))]
    (fact "There is now a chatter count projection"
          (contains? (into #{} (:projection-keys res)) "chatter-proj")
          => true)
    (fact "There is now a dummy count projection"
          (contains? (into #{} (:projection-keys res)) "dummy-proj")
          => true)
    (post-one-event m s-name)
    (let [val (time-limited 3000 (<!! sc))]
      (fact "There are 4 events proccesed in chatter-proj"
            (:current-value val) => 4.0))
    (fact "The dummy-proj stream has generated nothing as of yet"
          (time-limited 3000 (<!! sd)) => (throws Exception)))
  (component/stop ms))
