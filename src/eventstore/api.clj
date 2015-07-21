(ns eventstore.api
  (:require [eventstore.streams :as streams]
            [clojure.tools.logging :as log]
            [clojure.core.async :as async]))

(defn post-projection! [stm request]
  (let [body request
        projection-name (:projection-name body)
        language (:language body)
        code (:reduction body)
        initial-value (:initial-value body)]
    (streams/register-query! stm (keyword projection-name)
                             (keyword language)
                             code
                             (read-string initial-value))
    "Ok"))

(defn projections []
  (map
    (fn [v] (assoc v :fn (pr-str (:fn v))))
    (map #(apply dissoc (deref %) [:_id])
         (vals @streams/queries))))

(defn projection [projection-name]
  (log/info "Querying" projection-name)
  (let [res (first (filter #(= (name (:projection-name %)) projection-name)
                           (map deref (vals @streams/queries))))]
    (log/info "Result:" (pr-str res))
    (log/info "Result:" (pr-str (muon-clojure.common/dekeywordize res)))
    res))

(defn proper-map [m]
  (java.util.HashMap. (clojure.walk/stringify-keys m)))

(defn projection-keys []
  (proper-map
    {:projection-keys
     (map :projection-name
          (map
            (fn [v] (assoc v :fn (pr-str (:fn v))))
            (map #(apply dissoc (deref %) [:_id])
                 (vals @streams/queries))))}))

(defn stream [stm stream-name]
  {:results
   (async/<!!
     (async/reduce (fn [prev n] (concat prev [n])) []
                   (streams/stream stm {"from" "0"
                                        "stream-name" stream-name
                                        "stream-type" "cold"})))})

