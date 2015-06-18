(ns eventstore.streams
  (:require [clojure.core.async :refer [go-loop go <! >! chan buffer
                                        sliding-buffer mult tap close!]]
            [clojure.tools.logging :as log]
            [eventstore.riak :as riak]))

(def cold-latency 5000)

(defn seq->channel [s]
  (let [ch (chan (buffer 1))]
    (go
      (doseq [event s]
        (>! ch event)))
    ch))

(defn cold-stream [a-stream date-string & args]
  (let [m-args (apply hash-map args)
        s (riak/lazy-events (:db a-stream) date-string)]
    (if (true? (:channel m-args))
      (seq->channel s)
      s)))

(defmulti m-stream (fn [params _] (get params "stream-type" "hot")))

(defmethod m-stream "cold" [params a-stream]
  (let [ch (chan (buffer 1))
        full-s (cold-stream a-stream (get params "from" 0))]
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
                (recur (first s) (rest s) closed?)))))))
    ch))

(defmethod m-stream "hot-cold" [params a-stream]
  (let [ch (chan (buffer 1))
        full-s (cold-stream a-stream (get params "from" 0))]
    (go
      (loop [e (first full-s)
             s (rest full-s)
             closed? false
             last-t (System/currentTimeMillis)]
        (let [rest-s (rest s)
              new-s (if (empty? rest-s) (cold-stream a-stream last-t) s)
              last-t (if (empty? rest-s) (System/currentTimeMillis) last-t)]
          (if (nil? e)
            (do
              #_(close! ch)
              (log/info ":::::::::::::::::::: Stream depleted, switching to hot stream"))
            (if closed?
              (log/info ":::::::::::::::::::: Stream closed by peer, switching to hot stream")
              (do
                (let [closed? (not (>! ch e))]
                  (recur (first new-s) (rest new-s) closed? last-t)))))))
      (tap (:mult-channel a-stream) ch))
    ch))

(defmethod m-stream "hot" [params a-stream]
  (let [ch (chan 1)]
    (tap (:tube-m a-stream) ch)
    ch))

(defprotocol Stream
  (clean! [this])
  (stream [this params]))

(defprotocol EventProcessor
  (process-event! [this ev]))

(defrecord AsyncStream [db channel mult-channel]
  Stream
  (clean! [this] (riak/delete-all! db))
  (stream [this params] (m-stream params this))
  EventProcessor
  (process-event! [this ev]
    (go (>! channel ev))
    (riak/store db "events" (riak/uuid) ev)))

(defn async-stream [db]
  (let [tube (chan 1)
        tube-m (mult tube)]
    (->AsyncStream db tube tube-m)))


#_(def test-s (stream {"stream-type" "cold"}))
#_(go (loop [e (<! test-s)] (println (nil? e)) (if (nil? e) (println "Finished") (do (println e) (recur (<! test-s))))) (println "Done"))
#_(close! test-s)

#_(Thread/sleep 10000)

#_(def test-s (stream {"stream-type" "hot"}))
#_(go (loop [e (<! test-s)] (println (nil? e)) (if (nil? e) (println "Finished") (do (println e) (recur (<! test-s))))) (println "Done"))
#_(go (loop [i 1000] (if (= 0 i) (println "Source finished") (>! tube {:value i})) (recur (dec i))))

