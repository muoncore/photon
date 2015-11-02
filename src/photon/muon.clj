(ns photon.muon
  (:require [photon.streams :as streams]
            [muon-clojure.common :as mcc]
            [muon-clojure.server :as mcs]
            [photon.default-projs :as dp]
            [photon.api :as api]
            [clojure.tools.logging :as log])
  (:import (io.muoncore Muon MuonStreamGenerator)
           (io.muoncore.future MuonFuture ImmediateReturnFuture)
           (io.muoncore.transport.resource MuonResourceEvent)
           (io.muoncore.extension.amqp AmqpTransportExtension)
           (io.muoncore.extension.amqp.discovery AmqpDiscovery)
           (org.reactivestreams Publisher)
           (io.muoncore.config MuonBuilder AutoConfigurationWriter)
           (java.util Map)))

(defmulti decode-event (fn [^MuonResourceEvent e] (.getContentType e)))

(defmethod decode-event "application/json" [^MuonResourceEvent queryEvent]
  (into {} (.getDecodedContent queryEvent)))

(defrecord PhotonMicroservice [muon stream]
  ;; TODO: Fix muon-clojure --> {:m m}
  mcs/MicroserviceStream
  (expose-stream! [this]
    (mcc/stream-source {:m muon} "stream"
                       (fn [params] (streams/stream stream params))))
  mcs/MicroserviceQuery
  (expose-get [this]
    (mcc/on-query {:m muon} "projection"
                  (fn [resource]
                    (log/info ":::: QUERY " (pr-str resource))
                    (api/projection stream (:projection-name resource))))
    (mcc/on-query {:m muon} "projection-keys"
                  (fn [resource]
                    (api/projection-keys stream))))
  mcs/MicroserviceCommand
  (expose-post! [this]
    (let [listener (fn [ev] (api/post-event!
                             stream
                             (clojure.walk/keywordize-keys ev)))
          listener-projections
          (fn [resource]
            (let [params (clojure.walk/keywordize-keys resource)]
              (api/post-projection! stream params)))]
      (mcc/on-command {:m muon} "events" listener)
      (mcc/on-command {:m muon} "projections" listener-projections))))

(defn muon-local [amqp-url service-identifier tags]
  (MuonBuilder/addWriter
   (reify AutoConfigurationWriter
     (writeConfiguration [_ ac]
        (.setDiscoveryUrl ac amqp-url))))
  (let [builder (MuonBuilder.)]
    (.withServiceIdentifier builder service-identifier)
    (let [muon (.build builder)]
      (dorun (map #(.addTag muon %) tags))
      (.start muon)
      muon)))

(defn start-server! [amqp-url server-name db projections-port
                     events-port threads projections-path]
  (let [m (try
            (muon-local amqp-url
                        server-name ["photon" "eventstore"])
            (catch io.muoncore.exception.MuonException e
              (log/error (str "AMQP queue not found, "
                              "dropping to Muon-less mode"))))
        stm (streams/new-async-stream m db projections-port
                                      events-port threads (ref nil))
        ms (->PhotonMicroservice m stm)]
    (log/info "Loading default projections...")
    (dp/init-default-projs! stm projections-path)
    (log/info "Projections loaded!")
    (when (not (nil? m))
      (mcs/start-server! ms))
    ms))

