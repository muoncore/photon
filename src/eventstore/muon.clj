(ns eventstore.muon
  (:require [eventstore.rx :as rx]
            [clojure.tools.logging :as log])
  (:import (io.muoncore Muon MuonStreamGenerator)
           (io.muoncore.extension.amqp AmqpTransportExtension)
           (io.muoncore.extension.amqp discovery.AmqpDiscovery)
           (org.reactivestreams Publisher)
           (java.util Map)))

#_(def amazon-url
  "amqp://sentinel:lkjljkllj@ec2-52-28-16-238.eu-central-1.compute.amazonaws.com")

(def amazon-url
  "amqp://localhost")

(defn muon [rabbit-url]
  (let [discovery (AmqpDiscovery. rabbit-url)
        muon (Muon. discovery)]
    (.setServiceIdentifer muon "eventstore")
    (dorun (map #(.addTag muon %) ["eventstore" "helios"]))
    (.extend (AmqpTransportExtension. rabbit-url) muon)
    (.start muon)
    muon))

(defn client [rabbit-url]
  (let [discovery (AmqpDiscovery. rabbit-url)
        muon (Muon. discovery)]
    (.setServiceIdentifer muon "asap-client")
    (dorun (map #(.addTag muon %) ["asap" "client"]))
    (.extend (AmqpTransportExtension. rabbit-url) muon)
    (.start muon)
    muon))

(def m (muon amazon-url))
(def c (client amazon-url))

(.streamSource m "/cambio" Map (reify MuonStreamGenerator
                                 (^Publisher generatePublisher [this ^Map params]
                                   (log/info ":::: GENERATE-PUBLISHER")
                                   (rx/publisher params))))
(Thread/sleep 5000)
(.subscribe c "muon://eventstore/cambio"
            Map {"from" (str (- (System/currentTimeMillis) 10))
                 "stream-type" "hot"}
            (rx/subscriber))

