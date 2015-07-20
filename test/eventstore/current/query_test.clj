(ns eventstore.current.query-test
  (:require [muon-clojure.client :as cl]
            [eventstore.filedb :as filedb]
            [eventstore.muon :as muon])
  (:use midje.sweet))

(def amazon-url "amqp://muon:microservices@msg.cistechfutures.net")

(let [m (cl/muon-client amazon-url "client-test" "client" "test")
      #_#_db (filedb/->DBFile (clojure.java.io/resource "events.json"))
      #_#_ph (muon/start-server! db amazon-url)]
  (cl/with-muon m (cl/query-event "muon://eventstore/projection" {:a 1})))

