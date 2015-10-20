(ns photon.api
  (:require [photon.streams :as streams]
            [clojure.tools.logging :as log]
            [clojure.core.async :as async])
  (:import (java.util Map)))

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
  (map
   (fn [v] (assoc v :fn (pr-str (:fn v))))
   (map #(apply dissoc (deref %) filter-keys)
        (vals projs))))

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
                                                "stream-type" "cold"})))
        res-compat (map #(update-in % [:order-id] str) res)]
    {:results res-compat}))

