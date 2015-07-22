(ns eventstore.current.query-test
  (:require [muon-clojure.client :as cl]
            [clojure.tools.logging :as log]
            [clojure.core.async :as async :refer [go-loop <!]]
            [eventstore.filedb :as filedb]
            [eventstore.muon :as muon])
  (:use midje.sweet))

(def amazon-url "amqp://muon:microservices@msg.cistechfutures.net")
#_(def amazon-url "amqp://localhost")

#_(let [m (cl/muon-client amazon-url "client-test" "client" "test")
      #_#_db (filedb/->DBFile (clojure.java.io/resource "events.json"))
      #_#_ph (muon/start-server! db amazon-url)]
  #_(let [ch (cl/with-muon m
             (cl/stream-subscription "muon://eventstore/stream"
                                     :stream-name "__all__"
                                     :stream-type "hot"))]
    (go-loop [elem (<! ch)]
             (log/info ":::::::::::::::::::::::::::::: INPUT :::::::  " (pr-str elem))
             (recur (<! ch))))
  (let [res (cl/with-muon m
              #_(cl/post-event "muon://eventstore/events" "chatter"
                             {"service-id","muon,//chatter","local-id","5198cea7-b260-4bb7-963d-f102132032fe","payload",{"id","dbd6eecf-8f5c-42aa-8aa8-1b2172d53c71","text","substitutable","textanalysis",{"aggregateSentiment",40,"keyphrases",[{"phrase","substitutable","count",1}]}},"stream-name","chatter","server-timestamp",1420660080000})
              (cl/query-event "muon://eventstore/projection"
                              {:projection-name "count"}))]
    (log/info res)
    res))

(let [m (cl/muon-client amazon-url "client-test" "client" "test")]
  (Thread/sleep 5000)
  (let [res (cl/with-muon m
              (cl/query-event "muon://eventstore/projection" {:projection-name "SimpleTest"})
              #_(cl/post-event "muon://eventstore/events" "chatter"
                             {"service-id","muon://chatter","local-id","5198cea7-b260-4bb7-963d-f102132032fe","payload",{"id","dbd6eecf-8f5c-42aa-8aa8-1b2172d53c71","text","substitutable","textanalysis",{"aggregateSentiment",40,"keyphrases",[{"phrase","substitutable","count",1}]}},"stream-name","chatter","server-timestamp",1420660080000}))]
    (log/info res)
    res))

