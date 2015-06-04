(ns eventstore.muon
  (:gen-class)
  (:require [eventstore.rx :as rx]
            [eventstore.streams :as streams]
            [clojure.data.json :as json]
            [clojure.java.data :as j]
            [clojure.tools.logging :as log])
  (:import (io.muoncore Muon MuonStreamGenerator)
           (io.muoncore.transport.resource MuonResourceEvent)
           (io.muoncore.extension.amqp AmqpTransportExtension)
           (io.muoncore.extension.amqp discovery.AmqpDiscovery)
           (org.reactivestreams Publisher)
           (java.util Map)))

#_(def amazon-url
  "amqp://sentinel:lkjljkllj@ec2-52-28-16-238.eu-central-1.compute.amazonaws.com")
(def amazon-url
  "amqp://localhost")

(defmulti decode-event #(.getContentType %))

(defmethod decode-event "application/json" [queryEvent]
  (into {} (.getDecodedContent queryEvent)))

(defn muon [rabbit-url]
  (let [discovery (AmqpDiscovery. rabbit-url)
        muon (Muon. discovery)]
    (.setServiceIdentifer muon "eventstore")
    (dorun (map #(.addTag muon %) ["eventstore" "helios"]))
    (.extend (AmqpTransportExtension. rabbit-url) muon)
    (.start muon)
    muon))

(defn create-listener []
  (reify io.muoncore.MuonService$MuonPost
    (^Object onCommand [_ ^MuonResourceEvent queryEvent]
      (let [ev (decode-event queryEvent)]
        (streams/process-event! ev))
      nil)))

(defn expose-stream [m]
  (.streamSource m "/cambio" Map (reify MuonStreamGenerator
                                   (^Publisher generatePublisher [this ^Map params]
                                     (log/info ":::: GENERATE-PUBLISHER")
                                     (rx/publisher params)))))

(defn expose-post [m l]
  (.onPost m "/event" Map l))

(defn start-server! [& args]
  (let [m (muon amazon-url)
        listener (create-listener)]
    (expose-stream m)
    (expose-post m listener)))

#_(-main)





