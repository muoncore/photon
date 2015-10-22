(ns photon.api
  (:require [photon.streams :as streams]
            [schema.core :as s]
            [clojure.tools.logging :as log]
            [clojure.core.async :as async])
  (:import (java.util Map)))

;; Schemas
(s/defschema StreamInfo
  {:stream-name s/Str
   :total-events Long})

(s/defschema StreamInfoMap
  {:streams [StreamInfo]})

(s/defschema ProjectionKeyMap
  {:projection-keys [s/Str]})

(s/defschema ReductionValue
  ;; TODO: Improve
  s/Any)

(s/def Encoding
  ;; TODO: Extend
  (s/enum "application/json"))

(s/def Provenance
  ;; TODO: Improve
  {s/Keyword s/Any})

(s/defschema Event
  {(s/optional-key :encoding) (s/maybe Encoding)
   (s/optional-key :schema) (s/maybe s/Str)
   :payload s/Any
   :service-id (s/maybe s/Str) ;; TODO: Re-check this
   :photon-timestamp Long
   :local-id s/Str
   :order-id Long
   (s/optional-key :provenance) (s/maybe Provenance)
   :stream-name s/Str
   (s/optional-key :server-timestamp) Long})

(s/defschema FreeSchema
  {s/Keyword s/Any})

(s/defschema EventTemplate
  {(s/optional-key :encoding) (s/maybe Encoding)
   (s/optional-key :schema) (s/maybe s/Str)
   :payload (s/maybe FreeSchema)
   :service-id (s/maybe s/Str) ;; TODO: Re-check this
   :local-id s/Str
   (s/optional-key :provenance) (s/maybe Provenance)
   :stream-name s/Str
   :server-timestamp Long})

(s/defschema ReductionFunction
  ;; TODO: Improve
  s/Any)

(s/defschema StreamContentsResponse
  {:results [Event]})

(s/defschema ProjectionTemplate
  {:language (s/maybe (s/enum :clojure :javascript))
   :reduction s/Str
   :initial-value s/Str
   :stream-name s/Str
   :projection-name s/Str})

(s/defschema ProjectionValue
  {:fn s/Str
   :last-error (s/maybe s/Str)
   :current-value (s/maybe ReductionValue)
   :init-time Long
   :status (s/enum :running :failed)
   :language (s/maybe (s/enum :clojure :javascript))
   :initial-value ReductionValue
   :processed Long
   :last-event Event
   :reduction ReductionFunction
   :stream-name s/Str
   :avg-time Double
   :avg-global-time Double
   :projection-name s/Str})

(s/defschema Projection
  {:fn s/Str
   :last-error (s/maybe s/Str)
   :init-time Long
   :status (s/enum :running :failed)
   :language (s/maybe (s/enum :clojure :javascript))
   :initial-value ReductionValue
   :processed Long
   :last-event Event
   :reduction ReductionFunction
   :stream-name s/Str
   :avg-time Double
   :avg-global-time Double
   :projection-name s/Str})

(s/defschema ProjectionList
  {:projections [Projection]})

(s/defschema EventResponse (s/maybe Event))

(s/defschema PostResponse (s/maybe {:correct (s/enum true)}))

(s/defschema ProjectionResponse
  (s/maybe ProjectionValue))

;; Methods
(defn event [stm stream-name order-id]
  (streams/event stm stream-name order-id))

(defn post-projection! [stm request]
  (let [body request
        projection-name (:projection-name body)
        stream-name (:stream-name body)
        language (:language body)
        code (:reduction body)
        initial-value (:initial-value body)]
    (streams/register-query!
     stm
     {:projection-name projection-name
      :stream-name stream-name
      :language (keyword language)
      :reduction code
      :initial-value (read-string initial-value)})
    {:correct true}))

(defn post-event! [stm ev]
  (streams/process-event! stm ev))

(defn filtered-projections [projs filter-keys]
  {:projections
   (map
    (fn [v] (assoc v :fn (pr-str (:fn v))))
    (map #(apply dissoc (deref %) filter-keys)
         (vals projs)))})

(defn projections-without-val [projs]
  (filtered-projections projs [:_id :current-value]))

(defn projections-with-val [projs]
  (filtered-projections projs [:_id]))

(defn projection [projection-name]
  (log/trace "Querying" projection-name)
  (let [res (first (filter #(= (name (:projection-name %)) projection-name)
                           (map deref (vals @streams/queries))))]
    #_(log/info "Result:" (pr-str res))
    #_(log/info "Result:" (pr-str (muon-clojure.utils/dekeywordize res)))
    res))

(defn streams []
  {:streams
   (into [] (map
             #(hash-map :stream-name (key %)
                        :total-events (:total-events (val %)))
             (:current-value (projection "__streams__"))))})

(defn projections []
  (projections-without-val @streams/queries))

(defn map->hashmap [^Map m]
  (java.util.HashMap. m))

(defn proper-map [m]
  (map->hashmap (clojure.walk/stringify-keys m)))

(defn projection-keys []
  {:projection-keys
   (map :projection-name
        (map
          (fn [v] (assoc v :fn (pr-str (:fn v))))
          (map #(apply dissoc (deref %) [:_id])
               (vals @streams/queries))))})

(defn stream [stm stream-name & args]
  (let [m-args (apply hash-map args)
        from (str (get m-args :from 0))
        limit (get m-args :limit)
        res (async/<!!
             (async/reduce (fn [prev n] (concat prev [n])) []
                           (streams/stream stm {"from" from
                                                "stream-name" stream-name
                                                :limit limit
                                                "stream-type" "cold"})))]
    {:results res}))

