(ns photon.current.projections
  (:require [muon-clojure.core :as cl]
            [photon.muon :as muon]
            [photon.config :as conf]
            [photon.api :as api]
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
            (:current-value val) => 4.0)
      (dorun (take 1000 (repeatedly #(post-one-event m s-name))))
      (let [res (cl/with-muon m
                  (cl/request! (str url-req "/projection")
                               {:projection-name "chatter-proj"}))]
        (fact (:current-value res) => 1004.0))
      (let [res (cl/with-muon m
                  (cl/request! (str url-req "/projection")
                               {:projection-name "chatter-proj"
                                :query-key "current-value"}))]
        (fact res => 1004.0)))
    (fact "The dummy-proj stream has generated nothing as of yet"
          (time-limited 3000 (<!! sd)) => (throws Exception))

    ;; TODO: Use muon instead of REST API
    (let [stm (:manager (:stream-manager ms))]
      (facts "There are 4 events proccesed in chatter-proj (API)"
             (fact (api/projection-value stm "chatter-proj" "current-value")
                   => 1004)
             (fact (api/projection-value stm "chatter-proj" :current-value)
                   => 1004))
      (fact "chatter-proj is still available"
            (:projection-name (api/projection stm "chatter-proj"))
            => "chatter-proj")
      (fact "chatter-proj2 does not exist"
            (api/projection stm "chatter-proj2") => nil)
      (let [processed (:processed @(:stats stm))]
        (post-one-event m s-name)
        (Thread/sleep 5000)
        (let [current (:processed @(:stats stm))]
          (fact "2 events processed"
                (- current processed) => 2)
          (api/delete-projection! stm "chatter-proj")
          (fact "chatter-proj does not exist"
                (api/projection stm "chatter-proj") => nil)
          (post-one-event m s-name)
          (Thread/sleep 5000)
          (let [current-2 (:processed @(:stats stm))]
            (fact "1 event processed"
                  (- current-2 current) => 1)
            (api/delete-projection! stm "dummy-proj")
            (post-one-event m s-name)
            (Thread/sleep 5000)
            (let [current-3 (:processed @(:stats stm))]
              (fact "1 events processed"
                    (- current-3 current-2) => 1)
              (api/delete-projection! stm "__streams__")
              (Thread/sleep 5000)
              (fact "__streams__ does not get deleted"
                    (:projection-name (api/projection stm "__streams__"))
                    => "__streams__")
              (post-one-event m s-name)
              (Thread/sleep 5000)
              (let [current-4 (:processed @(:stats stm))]
                (fact "1 events processed"
                      (- current-4 current-3) => 1)
                (cl/with-muon m (cl/request! (str url-req "/projections")
                                             {:projection-name "chatter-proj"
                                              :stream-name "chatter"
                                              :language "clojure"
                                              :reduction "(fn [a b] (inc a))"
                                              :initial-value "0"}))
                (Thread/sleep 5000)
                (post-one-event m s-name)
                (Thread/sleep 5000)
                (let [current-5 (:processed @(:stats stm))]
                  (fact "1010 events processed"
                        (- current-5 current-4) => 1010)
                  (cl/with-muon m (cl/request! (str url-req "/projections")
                                               {:projection-name "chatter-proj"
                                                :stream-name "chatter"
                                                :language "clojure"
                                                :reduction "(fn [a b] (inc a))"
                                                :initial-value "0"}))
                  (Thread/sleep 5000)
                  (post-one-event m s-name)
                  (Thread/sleep 5000)
                  (let [current-6 (:processed @(:stats stm))]
                    (fact "1011 events processed"
                          (- current-6 current-5) => 1011)
                    (api/delete-projection! stm "chatter-proj")
                    (Thread/sleep 5000)
                    (post-one-event m s-name)
                    (Thread/sleep 5000)
                    (let [current-7 (:processed @(:stats stm))]
                      (fact "1 events processed"
                            (- current-7 current-6) => 1)))))))))))
  (component/stop ms))
