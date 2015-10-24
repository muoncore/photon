(ns photon.stream-test
  (:require [clojure.test :refer :all]
            [clojure.core.async :refer [go-loop go <! >! chan buffer <!! close!]]
            [ring.mock.request :as mock]
            [clojure.tools.logging :as log]
            [muon-clojure.client :as cl]
            [photon.current.common :refer :all]
            [photon.streams :as streams]
            [photon.muon :as m])
  (:use midje.sweet))

(def amazon-url "amqp://localhost")
(def db (->TempDBFile "/tmp/temporalphoton.log"))
#_(def db (cassandra/->DBCassandra
         "127.0.0.1" "photon"
         (first (clojure.string/split
                 (.toString (java.util.UUID/randomUUID)) #"-"))))
(def uuid (java.util.UUID/randomUUID))

(defn prepare! []
  (let [ms (m/start-server! (str "photon-test-" uuid) db)]
    (streams/clean! (:stm ms))
    ms))

(defn test-cold []
  (log/info "test-cold :: 1")
  (let [b (cl/muon-client amazon-url
                          (str "monitor-client-"
                               (java.util.UUID/randomUUID))
                          "monitor" "client")
        _ (log/info "test-cold :: 2")
        c (cl/with-muon b (cl/stream-subscription
                           (str "muon://photon-test-" uuid "/stream")
                           :stream-name "dummy"
                           :stream-type :cold
                           :from 0))
        res (do
              (log/info "test-cold :: 3")
              (loop [ev (<!! c) n 0]
                (log/info "test-cold :: 4")
                (if (nil? ev)
                  (do
                    (log/info "test-cold :: 5")
                    (log/info "Total:" n "events.")
                    n)
                  (do
                    (log/info "test-cold :: 6")
                    (log/debug "Event received")
                    (recur (<!! c) (inc n))))))]
    (log/info "test-cold :: 7")
    res))

(defn test-hot-cold []
  (let [b (cl/muon-client amazon-url "1monitor-client" "2monitor" "3lient")
        c (cl/with-muon b (cl/stream-subscription
                           (str "muon://photon-test-" uuid "/stream")
                           :stream-name "dummy"
                           :stream-type :hot-cold
                           :from 0))]
    (go
      (loop [ev (<! c) n 0]
        (if (nil? ev)
          (do
            (log/info "Total:" n "events.")
            n)
          (do
            (log/info "Event received")
            (recur (<! c) (inc n))))))))

(log/info "stream-test :: 1")
(let [ms (prepare!)
      n1 (test-cold)
      n2 (test-cold)]
  (fact "Consistent behaviour in cold streaming" n1 => n2))

(log/info "stream-test :: 2")
(let [a (cl/muon-client amazon-url "asap-client" "asap" "client")]
  (Thread/sleep 3000)
  (dorun
   (take 4 (repeatedly
            #(cl/with-muon a (cl/post-event
                              (str "muon://photon-test-" uuid "/events")
                              {:payload {:test :ok}
                               :service-id "muon://client"
                               :local-id (java.util.UUID/randomUUID)
                               :stream-name "dummy"})))))
  (Thread/sleep 5000)
  (fact "Correct count" (test-cold) => 4))

(log/info "stream-test :: 3")
(let [n1 (test-cold)
      n2 (test-cold)]
  (fact "Consistent behaviour in cold streaming after posts" n1 => n2))
