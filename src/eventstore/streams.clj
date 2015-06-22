(ns eventstore.streams
  (:require [clojure.core.async :refer [go-loop go <!! <! >! chan buffer
                                        sliding-buffer mult tap close!]
             :as async]
            [clojure.tools.logging :as log]
            [somnium.congomongo :as m]
            [clj-time.coerce :as cc]
            [eventstore.riak :as riak]))

(def cold-latency 5000)

(defn seq->channel [s]
  (let [ch (chan (buffer 1))]
    (go
      (doseq [event s]
        (>! ch event)))
    ch))

(defprotocol ColdStream
  (clean! [this])
  (data-from [this date-string]))

(defprotocol HotStream
  (next! [this]))

(defprotocol EventProcessor
  (register-query! [this query-name f init])
  (current-query-value [this query-name])
  (process-event! [this ev]))

(defn parse-old-date [date-string]
  (cc/to-long
    (clj-time.format/parse
      (clj-time.format/formatter
        "EEE MMM dd yyyy HH:mm:ss zZ '(GMT)'")
      (clojure.string/replace date-string #"BST|UTC" "GMT"))))



(defmulti stream (fn [_ params]
                   (log/info (pr-str params))
                   (get params "stream-type" "hot")))

(def queries (ref {}))

(defrecord DummyStream [db channel mult-channel] 
  ColdStream
  (clean! [this]
    (m/with-mongo db
      (m/destroy! :events {})))
  (data-from [this date]
    (let [records (m/with-mongo db
                    (m/fetch :events :where {}))
          query-date (if (string? date) (read-string date) date)]
      (filter #(and
                 (not (nil? (:server_timestamp %)))
                 (not (empty? (:server_timestamp %)))
                 (let [db-date (parse-old-date (:server_timestamp %))]
                   (>= db-date query-date)))
              records)))
  HotStream
  (next! [this] (go (<! channel)))
  EventProcessor
  (register-query! [this query-name f init]
    (let [s (stream this {"from" "0" "stream-type" "hot-cold"})
          running-query (ref {:query-name query-name
                              :fn f
                              :current-value init
                              :processed 0
                              :last-event nil
                              :last-error nil
                              :status :running})]
      (dosync (alter queries assoc query-name running-query))
      (go
        (loop [current-value init current-event (<! s)]
          (if (nil? current-event)
            (dosync (alter running-query assoc :status :finished))
            (let [new-value (try
                              (f current-value current-event)
                              (catch Exception e e))]
              (if (instance? Exception new-value)
                (dosync
                  (alter running-query
                         merge {:last-event current-event
                                :processed (inc (:processed @running-query))
                                :last-error new-value 
                                :status :failed}))                
                (do
                  (dosync
                    (alter running-query
                           merge {:last-event current-event
                                  :current-value new-value
                                  :processed (inc (:processed @running-query))}))     
                  (recur new-value (<! s))))))))))
  (process-event! [this ev]
    (go (>! channel ev))
    (m/with-mongo db
      (m/insert! :events ev))))

(defrecord AsyncStream [db channel mult-channel]
  ColdStream
  (clean! [this] (riak/delete-all! db))
  (data-from [this date-string]
    (riak/lazy-events db date-string))
  HotStream
  (next! [this] (go (<! channel)))
  EventProcessor
  (register-query! [this query-name f init]
    (let [s (stream this {"from" "0" "stream-type" "hot-cold"})
          running-query (ref {:query-name query-name
                              :fn f
                              :current-value init
                              :processed 0
                              :last-event nil
                              :last-error nil
                              :status :running})]
      (dosync (alter queries assoc query-name running-query))
      (go
        (loop [current-value init current-event (<! s)]
          (if (nil? current-event)
            (dosync (alter running-query assoc :status :finished))
            (let [new-value (try
                              (f current-value current-event)
                              (catch Exception e e))]
              (if (instance? Exception new-value)
                (dosync
                  (alter running-query
                         merge {:last-event current-event
                                :processed (inc (:processed @running-query))
                                :last-error new-value 
                                :status :failed}))                
                (do
                  (dosync
                    (alter running-query
                           merge {:last-event current-event
                                  :current-value new-value
                                  :processed (inc (:processed @running-query))}))
                  (recur new-value (<! s))))))))))
  (process-event! [this ev]
    (go (>! channel ev))
    (riak/store db "events" (riak/uuid) ev)))

(defn async-stream [db]
  (let [tube (chan 1)
        tube-m (mult tube)]
    (->AsyncStream db tube tube-m)))


(defmethod stream "cold" [a-stream params]
  (let [ch (chan (buffer 1))
        full-s (data-from a-stream (get params "from" 0))]
    (go
      (log/info "Opening stream...")
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

(defmethod stream "hot-cold" [a-stream params]
  (let [ch (chan (buffer 1))
        full-s (data-from a-stream (get params "from" 0))]
    (go
      (loop [e (first full-s)
             s (rest full-s)
             closed? false
             last-t (System/currentTimeMillis)]
        (let [rest-s (rest s)
              new-s (if (empty? rest-s) (data-from a-stream last-t) s)
              last-t (if (empty? rest-s) (System/currentTimeMillis) last-t)]
          (if (nil? e)
            (log/info ":::::::::::::::::::: Stream depleted, switching to hot stream")
            (if closed?
              (log/info ":::::::::::::::::::: Stream closed by peer, switching to hot stream")
              (let [closed? (not (>! ch e))]
                (recur (first new-s) (rest new-s) closed? last-t))))))
      (tap (:mult-channel a-stream) ch))
    ch))

(defmethod stream "hot" [a-stream params]
  (let [ch (chan 1)]
    (tap (:mult-channel a-stream) ch)
    ch))

#_(def test-ch (chan))
#_(def test-ds (->DummyStream (m/make-connection "eventstore") test-ch (mult test-ch)))


#_(def test-s (stream {"stream-type" "cold"}))
#_(go (loop [e (<! test-s)] (println (nil? e)) (if (nil? e) (println "Finished") (do (println e) (recur (<! test-s))))) (println "Done"))
#_(close! test-s)

#_(Thread/sleep 10000)

#_(def test-s (stream {"stream-type" "hot"}))
#_(go (loop [e (<! test-s)] (println (nil? e)) (if (nil? e) (println "Finished") (do (println e) (recur (<! test-s))))) (println "Done"))
#_(go (loop [i 1000] (if (= 0 i) (println "Source finished") (>! tube {:value i})) (recur (dec i))))

