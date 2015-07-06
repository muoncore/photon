(ns eventstore.muon
  (:require [eventstore.rx :as rx]
            [eventstore.riak :as riak]
            [eventstore.streams :as streams]
            [muon-clojure.server :as mcs]
            [clojure.data.json :as json]
            [clojure.java.data :as j]
            [clojure.tools.logging :as log])
  (:import (io.muoncore Muon MuonStreamGenerator)
           (io.muoncore.future MuonFuture ImmediateReturnFuture)
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

(defrecord PhotonMicroservice [m stm]
  mcs/MicroserviceStream
  (expose-stream! [this]
    (.streamSource m "/stream" Map
                   (reify MuonStreamGenerator
                     (^Publisher generatePublisher [this ^Map params]
                       (log/info ":::: GENERATE-PUBLISHER")
                       (rx/publisher stm params)))))
  mcs/MicroserviceCommand
  (expose-post! [this]
    (let [f (fn [ev] (streams/process-event! stm (clojure.walk/keywordize-keys ev)))
          listener (reify io.muoncore.MuonService$MuonCommand
                     (^MuonFuture onCommand [_ ^MuonResourceEvent queryEvent]
                       (log/info "onCommand" (pr-str queryEvent))
                       (ImmediateReturnFuture. (f (decode-event queryEvent)))))]
      (.onCommand m "/events" Map listener))))

#_ (muon amazon-url "eventstore" ["eventstore" "helios"])

(defn start-server! [bucket]
  (let [ms (->PhotonMicroservice (mcs/muon amazon-url "eventstore" ["eventstore" "helios"])
                                 (streams/async-stream (riak/riak bucket)))]
    (mcs/start-server! ms)))


#_(start-server!)
