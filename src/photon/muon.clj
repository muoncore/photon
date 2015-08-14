(ns photon.muon
  (:require #_[photon.riak :as riak]
            [photon.streams :as streams]
            [muon-clojure.common :as mcc]
            [muon-clojure.server :as mcs]
            [muon-clojure.rx :as rx]
            [clojure.data.json :as json]
            [clojure.java.data :as j]
            [photon.api :as api]
            [photon.config :as conf]
            [clojure.data.json :as json]
            [clojure.tools.logging :as log])
  (:import (io.muoncore Muon MuonStreamGenerator)
           (io.muoncore.future MuonFuture ImmediateReturnFuture)
           (io.muoncore.transport.resource MuonResourceEvent)
           (io.muoncore.extension.amqp AmqpTransportExtension)
           (io.muoncore.extension.amqp.discovery AmqpDiscovery)
           (org.reactivestreams Publisher)
           (java.util Map)))

(defmulti decode-event #(.getContentType %))

(defmethod decode-event "application/json" [queryEvent]
  (into {} (.getDecodedContent queryEvent)))

(defrecord PhotonMicroservice [m stm]
  mcs/MicroserviceStream
  (expose-stream! [this]
    (mcc/stream-source this "stream" (fn [params] (streams/stream stm params))))
  mcs/MicroserviceQuery
  (expose-get [this]
    #_(mcc/on-query this "projection" (fn [resource]
                                      (log/info ":::: QUERY " (pr-str resource))
                                      (api/projection (:projection-name resource))))
    #_(mcc/on-query this "projection-keys" (fn [resource]
                                           (api/projection-keys))))
  mcs/MicroserviceCommand
  (expose-post! [this]
    #_(let [listener (fn [ev] (streams/process-event! stm (clojure.walk/keywordize-keys ev)))
          listener-projections
          (fn [resource]
            (let [params (clojure.walk/keywordize-keys resource)]
              (api/post-projection! stm params)))]
      (mcc/on-command this "events" listener)
      (mcc/on-command this "projections" listener-projections))))

(defn start-server! 
  ([server-name db]
   (println conf/config)
   (start-server! server-name db
                  (if (nil? (:amqp.url conf/config))
                    "amqp://localhost"
                    (:amqp.url conf/config))))
  ([server-name db url]
   (log/info "Connecting to" url)
   (let [ms (->PhotonMicroservice (mcs/muon url server-name ["photon" "helios"])
                                  (streams/new-async-stream db))]
     (mcs/start-server! ms)
     ms)))

