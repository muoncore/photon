(ns photon.muon
  (:require [photon.streams :as streams]
            [muon-clojure.common :as mcc]
            [muon-clojure.server :as mcs]
            [com.stuartsierra.component :as component]
            [photon.api :as api]
            [clojure.tools.logging :as log])
  (:import (org.reactivestreams Publisher)
           (java.util Map)))

(defrecord PhotonMicroservice [stream-manager]
  mcs/MicroserviceStream
  (stream-mappings [this]
    ;; TODO: Explore the case of pure hot/cold streams
    [{:endpoint "stream" :type :hot-cold
      :fn-process (fn [params]
                    (log/info "PhotonMS:" params)
                    (streams/stream->ch stream-manager params))}])
  mcs/MicroserviceRequest
  (request-mappings [this]
    [{:endpoint "projection"
      :fn-process (fn [resource]
                    (log/info ":::: QUERY " (pr-str resource))
                    (api/projection stream-manager
                                    (:projection-name resource)))}
     {:endpoint "projection-keys"
      :fn-process (fn [resource]
                    (api/projection-keys stream-manager))}
     {:endpoint "events"
      :fn-process (fn [ev] (api/post-event!
                            stream-manager
                            (clojure.walk/keywordize-keys ev)))}
     {:endpoint "projections"
      :fn-process (fn [resource]
                    (let [params (clojure.walk/keywordize-keys resource)]
                      (api/post-projection! stream-manager params)))}]))

(defrecord MuonService [options stream-manager]
  component/Lifecycle
  (start [component]
    (if (nil? (:muon component))
      (try
        (let [impl (PhotonMicroservice. (:manager stream-manager))
              conf {:rabbit-url (:amqp.url options)
                    :service-identifier (:microservice.name options)
                    :tags ["photon" "eventstore"]
                    :implementation impl}
              comp (mcs/micro-service conf)]
          (assoc component :muon (component/start comp)))
        (catch Exception e
          (log/info "Muon could not be started:" (.getMessage e))
          (log/info "Falling back to muon-less mode!")
          component))
      component))
  (stop [component]
    (if (nil? (:muon component))
      component
      (do
        (component/stop (:muon component))
        (assoc component :muon nil)))))

(defn muon-service [options]
  (map->MuonService {:options options}))
