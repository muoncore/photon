(ns eventstore.current.query-test
  (:require [muon-clojure.client :as cl]
            [clojure.tools.logging :as log]
            [eventstore.filedb :as filedb]
            [eventstore.muon :as muon])
  (:use midje.sweet))

(def amazon-url "amqp://muon:microservices@msg.cistechfutures.net")

(let [m (cl/muon-client amazon-url "client-test" "client" "test")
      #_#_db (filedb/->DBFile (clojure.java.io/resource "events.json"))
      #_#_ph (muon/start-server! db amazon-url)]
  (let [res (cl/with-muon m
              (cl/query-event "muon://eventstore/projection"
                              {:projection-name "count"}))]
    (log/info res)
    res))

