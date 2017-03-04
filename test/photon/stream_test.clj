(ns photon.stream-test
  (:require [clojure.test :refer :all]
            [clojure.core.async :refer [go-loop go <! >! chan buffer <!! close!]]
            [ring.mock.request :as mock]
            [com.stuartsierra.component :as component]
            [photon.core :as core]
            [clojure.tools.logging :as log]
            [muon-clojure.core :as cl]
            [photon.current.common :refer :all]
            [photon.streams :as streams]
            [photon.muon :as m])
  (:use midje.sweet))

(def uuid (java.util.UUID/randomUUID))
(def amazon-url :local)
(def temp-file (java.io.File/createTempFile "midje" ".json"))
(def conf {:amqp.url :local
           :microservice.name (str "photon-test-" uuid)
           :projections.port 9998
           :events.port 9999
           :db.backend "file"
           :file.path (.getAbsolutePath temp-file)
           :parallel.projections 2})
(def c
  (component/start (core/photon-system conf)))

(defn prepare! []
  (let [s (:manager (:stream-manager c))]
    (streams/clean! s)
    s))

(defn test-cold []
  (log/info "test-cold :: 1")
  (let [b (cl/muon-client amazon-url
                          (str "monitor-client-"
                               (java.util.UUID/randomUUID))
                          "monitor" "client")
        _ (log/info "test-cold :: 2")
        c (cl/with-muon b (cl/subscribe!
                           (str "stream://photon-test-" uuid "/stream")
                           {:stream-name "dummy"
                            :stream-type :cold
                            :from 0}))
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
        c (cl/with-muon b (cl/subscribe!
                           (str "stream://photon-test-" uuid "/stream")
                           {:stream-name "dummy"
                            :stream-type :hot-cold
                            :from 0}))]
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
  #_(Thread/sleep 3000)
  (dorun
   (take 4 (repeatedly
            #(cl/with-muon a (cl/request!
                              (str "request://photon-test-" uuid "/events")
                              {:payload {:test :ok}
                               :service-id "muon://client"
                               :event-type "client-event"
                               :stream-name "dummy"})))))
  #_(Thread/sleep 120000)
  (fact "Correct count" (test-cold) => 4))

(log/info "stream-test :: 3")
#_(Thread/sleep 60000)
(let [n1 (test-cold)
      n2 (test-cold)]
  (fact "Consistent behaviour in cold streaming after posts" n1 => n2))
