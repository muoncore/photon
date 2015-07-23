(ns photon.stream-test
  (:require [clojure.test :refer :all]
            [clojure.core.async :refer [go-loop go <! >! chan buffer <!! close!]]
            [ring.mock.request :as mock]
            [clojure.tools.logging :as log]
            [muon-clojure.client :as cl]
            [photon.riak :as riak]
            [photon.streams :as streams]
            [photon.muon :as m])
  (:use midje.sweet))

(def amazon-url "amqp://localhost")

(defn prepare! []
  (let [ms (m/start-server! "bucket-test-1")]
    (streams/clean! (:stm ms))
    ms))

(defn test-cold []
  (let [b (cl/muon-client amazon-url "monitor-client" "monitor" "client")
        c (cl/with-muon b (cl/stream-subscription "muon://photon/stream"
                                                  :stream-name "dummy"
                                                  :stream-type :cold
                                                  :from 0))]
    (loop [ev (<!! c) n 0]
      (if (nil? ev)
        (do
          (log/info "Total:" n "events.")
          n)
        (do
          (log/debug "Event received")
          (recur (<!! c) (inc n)))))))

(defn test-hot-cold []
  (let [b (cl/muon-client amazon-url "1monitor-client" "2monitor" "3lient")
        c (cl/with-muon b (cl/stream-subscription "muon://photon/stream"
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
            (recur (<! c) (inc n))))))
    (Thread/sleep 10000)
    (close! c)))

#_(let [ms (prepare!)
      n1 (test-cold)
      n2 (test-cold)]
  (fact "Consistent behaviour in cold streaming" n1 => n2))

#_(let [ms (prepare!)
      a (cl/muon-client amazon-url "asap-client" "asap" "client")]
  (cl/with-muon a (cl/post-event "muon://photon/events" "dummy" {:test :ok}))
  (cl/with-muon a (cl/post-event "muon://photon/events" "dummy" {:test :ok}))
  (cl/with-muon a (cl/post-event "muon://photon/events" "dummy" {:test :ok}))
  (cl/with-muon a (cl/post-event "muon://photon/events" "dummy" {:test :ok}))
  (fact "Correct count" (test-cold) => 4))

#_(Thread/sleep 20000)

#_(let [n1 (test-cold)
      n2 (test-cold)]
  (fact "Consistent behaviour in cold streaming" n1 => n2))

#_(let [ms (m/start-server! "rxriak-events-v1")]
  (streams/clean! (:stm ms)))




