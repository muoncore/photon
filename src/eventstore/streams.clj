(ns eventstore.streams
  (:require [clojure.core.async :refer [go-loop go <! >! chan buffer
                                        sliding-buffer mult tap close!]]
            [clojure.tools.logging :as log]
            [eventstore.riak :as riak]))

(def cold-latency 5000)

(def tube (chan 1))
(def tube-m (mult tube))

(defn seq->channel [s]
  (let [ch (chan (buffer 1))]
    (go
      (doseq [event s]
        (>! ch event)))
    ch))

(defn cold-stream [date-string & args]
  (let [m-args (apply hash-map args)
        s (riak/lazy-events date-string)]
    (if (true? (:channel m-args))
      (seq->channel s)
      s)))

(defmulti stream #(get % "stream-type" "hot"))

(defmethod stream "cold" [params]
  (let [ch (chan (buffer 1))
        full-s (cold-stream (get params "from" 0))]
    (go
      (loop [e (first full-s) s (rest full-s) closed? false]
        (if (nil? e)
          (do
            (close! ch)
            (log/info ":::::::::::::::::::: Stream depleted, closing"))
          (if closed?
            (log/info ":::::::::::::::::::: Stream closed!")
            (do
              (let [closed? (not (>! ch e))]
                (recur (first s) (rest s) closed?))))))
      (tap tube-m ch))
    ch))

(defmethod stream "hot-cold" [params]
  (let [ch (chan (buffer 1))
        full-s (cold-stream (get params "from" 0))]
    (go
      (loop [e (first full-s)
             s (rest full-s)
             closed? false
             last-t (System/currentTimeMillis)]
        (let [rest-s (rest s)
              new-s (if (empty? rest-s) (cold-stream last-t) s)
              last-t (if (empty? rest-s) (System/currentTimeMillis) last-t)]
          (if (nil? e)
            (do
              (close! ch)
              (log/info ":::::::::::::::::::: Stream depleted, closing"))
            (if closed?
              (log/info ":::::::::::::::::::: Stream closed!")
              (do
                (let [closed? (not (>! ch e))]
                  (recur (first new-s) (rest new-s) closed? last-t))))))))
    ch))

(defmethod stream "hot" [params]
  (let [ch (chan 1)]
    (tap tube-m ch)
    ch))

#_(def test-s (stream {"stream-type" "cold"}))
#_(go (loop [e (<! test-s)] (println (nil? e)) (if (nil? e) (println "Finished") (do (println e) (recur (<! test-s))))) (println "Done"))
#_(close! test-s)

#_(Thread/sleep 10000)

#_(def test-s (stream {"stream-type" "hot"}))
#_(go (loop [e (<! test-s)] (println (nil? e)) (if (nil? e) (println "Finished") (do (println e) (recur (<! test-s))))) (println "Done"))
#_(go (loop [i 1000] (if (= 0 i) (println "Source finished") (>! tube {:value i})) (recur (dec i))))

