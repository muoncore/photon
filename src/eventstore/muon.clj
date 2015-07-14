(ns eventstore.muon
  (:require [eventstore.riak :as riak]
            [eventstore.streams :as streams]
            [muon-clojure.common :as mcc]
            [muon-clojure.server :as mcs]
            [muon-clojure.rx :as rx]
            [clojure.data.json :as json]
            [clojure.java.data :as j]
            [eventstore.config :as conf]
            [clojure.tools.logging :as log]))

(def amazon-url (:amqp.url conf/config))

(defmulti decode-event #(.getContentType %))

(defmethod decode-event "application/json" [queryEvent]
  (into {} (.getDecodedContent queryEvent)))

(defrecord PhotonMicroservice [m stm]
  mcs/MicroserviceStream
  (expose-stream! [this]
    (mcc/stream-source this "stream" (fn [params] (streams/stream stm params))))
  mcs/MicroserviceCommand
  (expose-post! [this]
    (let [listener (fn [ev] (streams/process-event! stm (clojure.walk/keywordize-keys ev)))
          listener-projections
          (fn [resource]
            (let [params (clojure.walk/keywordize-keys resource)]
              (streams/register-query! stm
                                       (keyword (:projection-name params))
                                       (keyword (:language params))
                                       (:code params)
                                       (read-string (:initial-value params)))))]
      (mcc/on-command this "events" listener)
      (mcc/on-command this "projections" listener-projections))))

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
