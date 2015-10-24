(ns photon.muon
  (:require [photon.streams :as streams]
            [muon-clojure.common :as mcc]
            [muon-clojure.server :as mcs]
            [photon.default-projs :as dp]
            [photon.api :as api]
            [photon.config :as conf]
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

(defrecord PhotonMicroservice [m stm]
  mcs/MicroserviceStream
  (expose-stream! [this]
    (mcc/stream-source this "stream" (fn [params] (streams/stream stm params))))
  mcs/MicroserviceQuery
  (expose-get [this]
    (mcc/on-query this "projection" (fn [resource]
                                      (log/info ":::: QUERY " (pr-str resource))
                                      (api/projection (:projection-name resource))))
    (mcc/on-query this "projection-keys" (fn [resource]
                                           (api/projection-keys))))
  mcs/MicroserviceCommand
  (expose-post! [this]
    (let [listener (fn [ev] (api/post-event!
                             stm
                             (clojure.walk/keywordize-keys ev)))
          listener-projections
          (fn [resource]
            (let [params (clojure.walk/keywordize-keys resource)]
              (api/post-projection! stm params)))]
      (mcc/on-command this "events" listener)
      (mcc/on-command this "projections" listener-projections))))

(MuonBuilder/addWriter
 (reify AutoConfigurationWriter
   (writeConfiguration [_ ac]
    (.setDiscoveryUrl ac
                      (if (nil? (:amqp.url conf/config))
                        "amqp://localhost"
                        (:amqp.url conf/config))))))

(defn muon-local [service-identifier tags]
  (let [builder (MuonBuilder.)]
    (.withServiceIdentifier builder service-identifier)
    (let [muon (.build builder)]
      (dorun (map #(.addTag muon %) tags))
      (.start muon)
      muon)))

(defn start-server! [server-name db]
  (let [m (try
            (muon-local server-name ["photon" "eventstore"])
            (catch io.muoncore.exception.MuonException e
              (log/error (str "AMQP queue not found, "
                              "dropping to Muon-less mode"))))
        stm (streams/new-async-stream m db)
        ms (->PhotonMicroservice m stm)]
    (log/info "Loading default projections...")
    (dp/init-default-projs! stm)
    (log/info "Projections loaded!")
    (when (not (nil? m))
      (mcs/start-server! ms))
    ms))
