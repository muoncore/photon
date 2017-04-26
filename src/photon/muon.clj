(ns photon.muon
  (:require [photon.streams :as streams]
            [muon-clojure.common :as mcc]
            [muon-clojure.core :as mcs]
            [com.stuartsierra.component :as component]
            [photon.api :as api]
            [clojure.core.async :refer [go <! chan tap]]
            [clojure.tools.logging :as log])
  (:import (org.reactivestreams Publisher)
           (java.util Map)))

(defrecord PhotonMicroservice [stream-manager options]
  mcs/MicroserviceStream
  (stream-mappings [this]
    ;; TODO: Explore the case of pure hot/cold streams
    [{:endpoint "stream" :type :hot-cold
      :fn-process (fn [params]
                    (log/info "PhotonMS:" params)
                    (streams/stream->ch stream-manager params))}])
  mcs/MicroserviceEvent
  (handle-event [this event]
    (try
      (api/post-event! stream-manager event)
      (catch clojure.lang.ExceptionInfo e
        {:error (.getMessage e)})))
  mcs/MicroserviceRequest
  (request-mappings [this]
    [{:endpoint "projection"
      :fn-process
      (fn [{:keys [projection-name] :as resource}]
        (log/info ":::: QUERY " (pr-str resource))
        (if-let [action (:action resource)]
          (condp = action
            "delete"
            (api/delete-projection! stream-manager projection-name)
            {:error "Action not recognized"})
          (if-let [query-key (:query-key resource)]
            (api/projection-value
             stream-manager (:projection-name resource) query-key)
            (api/projection stream-manager
                            (:projection-name resource)))))}
     {:endpoint "projection-keys"
      :fn-process (fn [resource]
                    (api/projection-keys stream-manager))}
     {:endpoint "events"
      :fn-process (fn [ev]
                    (log/trace ":::: EVENTS" (pr-str ev))
                    (api/post-event!
                     stream-manager
                     (clojure.walk/keywordize-keys ev)))}
     {:endpoint "stream/delete"
      :fn-process (fn [resource]
                    (log/trace ":::: DELETING STREAM" (pr-str resource))
                    (let [params (clojure.walk/keywordize-keys resource)]
                      (api/delete-stream! stream-manager (:stream-name params))))}
     {:endpoint "stream-names"
      :fn-process (fn [ev]
                    (log/trace ":::: EVENTS" (pr-str ev))
                    (api/streams stream-manager))}
     {:endpoint "projections"
      :fn-process (fn [resource]
                    (let [params (clojure.walk/keywordize-keys resource)]
                      (api/post-projection! stream-manager params)))}
     {:endpoint "rest-url"
      :fn-process (fn [_]
                    (let [no-ssl? (nil? (:rest.keystore options))
                          prot (if no-ssl? "http" "https")]
                      (str prot "://" (:rest.host options) ":"
                           (:rest.port options))))}]))

(defrecord MuonService [options stream-manager]
  component/Lifecycle
  (start [component]
    (if (nil? (:muon component))
      (try
        (let [stream-manager (:manager stream-manager)
              impl (PhotonMicroservice. stream-manager options)
              projections (:proj-ch stream-manager)
              conf (if-let [mcb (:muon-builder options)]
                     {:config
                      (-> mcb
                          (.withTags (into-array String ["photon" "eventstore"]))
                          .build)
                      :implementation impl}
                     {:url (:muon.url options)
                      :service-name (:microservice.name options)
                      :tags ["photon" "eventstore"]
                      :implementation impl})
              comp (mcs/micro-service conf)
              ms (component/start comp)]
          (go
            (loop [new-proj (<! projections)]
              (when-not (nil? new-proj)
                (log/info "Registering new projection"
                          (:projection-name new-proj) "into muon...")
                (mcc/stream-source (:muon ms)
                                   (str "projection/" (:projection-name new-proj))
                                   :hot
                                   (fn [resource]
                                     (let [ch (chan)]
                                       (tap (:mult new-proj) ch)
                                       ch)))
                (recur (<! projections)))))
          (assoc component :muon ms))
        (catch Exception e
          (log/info "Muon could not be started:" (.getMessage e))
          (log/info "Error class: " (.getName (.getClass e)))
          (.printStackTrace e)
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
