(ns eventstore.streams
  (:require [clojure.core.async :refer [go-loop go <! >! chan buffer]]
            [eventstore.riak :as riak]))

(defn seq->channel [s]
  (let [ch (chan (buffer 1))]
    (go
      (doseq [event s]
        (>! ch event)))
    ch))

(defn cold-stream [stream-name date-string & args]
  (let [m-args (apply hash-map args)
        s (riak/lazy-events stream-name date-string)]
    (if (true? (:channel m-args))
      (seq->channel s)
      s)))

(defn hot-stream []
  (let [ch (chan (buffer 1024))]
    ch))

#_(let [ch (cold-stream "cambio" "2015-05-14T10:00:00Z")]
  (go-loop [i 1000 res (<! ch)]
           (println res)
           (if (= i 0)
             nil
             (recur (dec i) (<! ch)))))

#_(let [iter (.iterator (cold-stream "cambio" "2015-05-14T10:00:00Z"))]
  (.next iter)
  (.next iter))

#_(cold-stream "cambio" "2015-05-14T10:00:00Z" :channel true)

#_(Thread/sleep 1000)

(def streams (ref {:cambio (hot-stream)}))

(go
  (loop [i 1000]
    (if (= 0 i)
      nil
      (do
        (>! (:cambio @streams) {:value i})
        (recur (dec i))))))

