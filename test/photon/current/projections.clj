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
      _ (Thread/sleep 5000)
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
  (log/info (with-out-str (clojure.pprint/pprint sp)))
  (fact "The streams projection indicates 2 event processed"
        (:processed sp) => 2)
  (post-one-event m s-name)
  (Thread/sleep 2000)
  (let [new-sp (cl/with-muon m
                 (cl/request! (str url-req "/projection")
                              {:projection-name "__streams__"}))]
    (log/info (with-out-str (clojure.pprint/pprint new-sp)))
    (fact "Now there are three events processed"
          (:processed new-sp) => 3))
  #_(let [sn (cl/with-muon m
             (cl/subscribe! (str url-str "/projection/imaginary")
                            {:from 0 :stream-type :hot}))]
    (fact "There is no stream for a non-existing projection"
          (class (<!! sn)) => io.muoncore.exception.MuonException))
  (let [s (cl/with-muon m
            (cl/subscribe! (str url-str "/projection/__streams__")
                           {:from 0 :stream-type :hot}))]
    (log/info "Subscribing")
    (Thread/sleep 5000)
    (post-one-event m s-name)
    (log/info "Posted")
    (fact "Four events in projection" (:processed (<!! s)) => 4)
    (log/info "To next subscription")
    (let [s2 (cl/with-muon m
               (cl/subscribe! (str url-str "/projection/__streams__")
                              {:from 0 :stream-type :hot
                               :stream-name "__all__"}))]
      (log/info "Subscribing")
      (Thread/sleep 5000)
      (post-one-event m s-name)
      (log/info "Posted")
      (let [val2 (<!! s2)]
        (fact "Two streams receive the same result..."
              (:processed (<!! s)) => (:processed val2))
        (fact "... and that result is 5.0" (:processed val2) => 5))))
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
                            {:from 0 :stream-type :hot
                             :stream-name "__all__"}))
        sc (cl/with-muon m
             (cl/subscribe! (str url-str "/projection/chatter-proj")
                            {:from 0 :stream-type :hot
                             :stream-name "__all__"}))]
    (Thread/sleep 5000)
    (fact "There is now a chatter count projection"
          (contains? (into #{} (:projection-keys res)) "chatter-proj")
          => true)
    (fact "There is now a dummy count projection"
          (contains? (into #{} (:projection-keys res)) "dummy-proj")
          => true)
    (post-one-event m s-name)
    (let [val (time-limited 3000 (<!! sc))]
      (fact "There are 4 events processed in chatter-proj"
            (:current-value val) => 4)
      (dorun (take 1000 (repeatedly #(post-one-event m s-name))))
      (Thread/sleep 5000)
      (let [res (cl/with-muon m
                  (cl/request! (str url-req "/projection")
                               {:projection-name "chatter-proj"}))]
        (fact (:current-value res) => 1004))
      (let [res (cl/with-muon m
                  (cl/request! (str url-req "/projection")
                               {:projection-name "chatter-proj"
                                :query-key "current-value"}))]
        (fact res => 1004)))
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
          (Thread/sleep 3000)
          (fact "chatter-proj does not exist"
                (api/projection stm "chatter-proj") => nil)
          (post-one-event m s-name)
          (Thread/sleep 5000)
          (let [current-2 (:processed @(:stats stm))]
            (fact "2 events processed" (- current-2 current) => 2)
            (cl/with-muon m
              (cl/request! (str url-req "/projection")
                           {:projection-name "dummy-proj"
                            :action "delete"}))
            (fact "dummy-proj does not exist (muon endpoint)"
                  (api/projection stm "dummy-proj") => nil)
            (post-one-event m s-name)
            (Thread/sleep 5000)
            (let [current-3 (:processed @(:stats stm))]
              (fact "2 events processed" (- current-3 current-2) => 2)
              (api/delete-projection! stm "__streams__")
              (Thread/sleep 5000)
              (fact "__streams__ does not get deleted"
                    (:projection-name (api/projection stm "__streams__"))
                    => "__streams__")
              (post-one-event m s-name)
              (Thread/sleep 5000)
              (let [current-4 (:processed @(:stats stm))]
                (fact "2 events processed" (- current-4 current-3) => 2)
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
                  (fact "1011 events processed"
                        (- current-5 current-4) => 1011)
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
                    (fact "1012 events processed"
                          (- current-6 current-5) => 1012)
                    (api/delete-projection! stm "chatter-proj")
                    (Thread/sleep 5000)
                    (post-one-event m s-name)
                    (Thread/sleep 5000)
                    (let [current-7 (:processed @(:stats stm))]
                      (fact "2 events processed"
                            (- current-7 current-6) => 2)))))))))))
  (component/stop ms))
