(ns eventstore.muon
  (:gen-class)
  (:require [eventstore.rx :as rx]
            [eventstore.riak :as riak]
            [eventstore.streams :as streams]
            [clojure.data.json :as json]
            [clojure.java.data :as j]
            [clojure.tools.logging :as log])
  (:import (io.muoncore Muon MuonStreamGenerator)
           (io.muoncore.future MuonFuture)
           (io.muoncore.transport.resource MuonResourceEvent)
           (io.muoncore.extension.amqp AmqpTransportExtension)
           (io.muoncore.extension.amqp.discovery AmqpDiscovery)
           (org.reactivestreams Publisher)
           (java.util Map)))

#_(def amazon-url
  "amqp://sentinel:lkjljkllj@ec2-52-28-16-238.eu-central-1.compute.amazonaws.com")
(def amazon-url
  "amqp://localhost")

(defmulti decode-event #(.getContentType %))

(defmethod decode-event "application/json" [queryEvent]
  (into {} (.getDecodedContent queryEvent)))

(defprotocol Microservice
  (expose-stream! [this])
  (expose-post! [this]))

(defrecord MuonMicroservice [m stm]
  Microservice
  (expose-stream! [this]
    (.streamSource m "/stream" Map
                   (reify MuonStreamGenerator
                     (^Publisher generatePublisher [this ^Map params]
                       (log/info ":::: GENERATE-PUBLISHER")
                       (rx/publisher stm params)))))
  (expose-post! [this]
    (let [f (fn [ev] (streams/process-event! stm ev))
          listener (reify io.muoncore.MuonService$MuonCommand
                     (^MuonFuture onCommand [_ ^MuonResourceEvent queryEvent]
                       (log/info "onCommand" (pr-str queryEvent))
                       (f (decode-event queryEvent))))]
      (.onCommand m "/events" Map listener))))

(defn muon [rabbit-url]
  (let [discovery (AmqpDiscovery. rabbit-url)
        muon (Muon. discovery)]
    (.setServiceIdentifer muon "eventstore")
    (dorun (map #(.addTag muon %) ["eventstore" "helios"]))
    (.extend (AmqpTransportExtension. rabbit-url) muon)
    (.start muon)
    muon))

(defn start-server [bucket]
  (let [stm (streams/async-stream (riak/riak bucket))
        ms (->MuonMicroservice (muon amazon-url) stm)]
    (expose-stream! ms)
    (expose-post! ms)
    (Thread/sleep 2000)
    ms))

#_(start-server!)




