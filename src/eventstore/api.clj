(ns eventstore.api
  (:require [eventstore.streams :as streams]
            [clojure.core.async :as async]))

(defn projection []
  (first
    (map
      (fn [v] (assoc v :fn (pr-str (:fn v))))
      (map #(apply dissoc (deref %) [:_id])
           (vals @streams/queries)))))

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

(defn proper-map [m]
  (java.util.HashMap. (clojure.walk/stringify-keys m)))

(defn projection-keys []
  (proper-map
    {:projection-keys
     (map :query-name
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
                                        :limit 5 
                                        "stream-type" "cold"})))})

