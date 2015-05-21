(ns eventstore.muon
  (:require [eventstore.rx :as rx]
            [clojure.tools.logging :as log])
  (:import (io.muoncore Muon)
           (io.muoncore.extension.amqp AmqpTransportExtension)
           (io.muoncore.extension.amqp discovery.AmqpDiscovery)
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

(.streamSource m "/cambio" Map (rx/publisher :cambio))
(Thread/sleep 10000)
(.subscribe c "muon://eventstore/cambio"
            Map {"from" (str (- (System/currentTimeMillis) 10))}
            (rx/subscriber))


