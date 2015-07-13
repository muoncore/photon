(ns eventstore.muon
  (:require [eventstore.rx :as rx]
            [eventstore.riak :as riak]
            [eventstore.streams :as streams]
            [muon-clojure.server :as mcs]
            [clojure.data.json :as json]
            [clojure.java.data :as j]
            [eventstore.config :as conf]
            [clojure.tools.logging :as log])
  (:import (io.muoncore Muon MuonStreamGenerator)
           (io.muoncore.future MuonFuture ImmediateReturnFuture)
           (io.muoncore.transport.resource MuonResourceEvent)
           (io.muoncore.extension.amqp AmqpTransportExtension)
           (io.muoncore.extension.amqp.discovery AmqpDiscovery)
           (org.reactivestreams Publisher)
           (java.util Map)))

(def amazon-url (:amqp.url conf/config))

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

(defn new-microservice [mq-url db]
  (->PhotonMicroservice (mcs/muon mq-url "eventstore" ["eventstore" "helios"])
                        (streams/new-async-stream db)))

(defn start-server! [db]
  (let [ms (->PhotonMicroservice (mcs/muon amazon-url "eventstore" ["eventstore" "helios"])
                                 (streams/new-async-stream (riak/riak riak/s-bucket))
                                 #_(streams/async-stream (riak/riak bucket))
                                 #_streams/mongo-ds)]
    (mcs/start-server! ms)))


#_(start-server!)
