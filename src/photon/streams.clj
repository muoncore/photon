(ns photon.streams
  (:require [clojure.core.async :refer [go-loop go <!! <! >! chan buffer sub
                                        sliding-buffer mult tap close! pub]
             :as async]
            [serializable.fn :as sfn]
            [clj-rhino :as js]
            [clojure.tools.logging :as log]
            [uap-clj.core :as uap]
            [clojure.data.json :as json]
            [somnium.congomongo :as m]
            [clj-time.coerce :as cc]
            [photon.db :as db]))

(defprotocol ColdStream
  (clean! [this])
  (data-from [this stream-name date-string]))

(defprotocol HotStream
  (next! [this]))

(defprotocol EventProcessor
  (register-query! [this projection-name stream-name lang f init])
  (current-query-value [this projection-name])
  (process-event! [this ev]))

(defprotocol StreamManager
  (streams [this]))

(defmulti stream (fn [_ params]
                   (log/info (pr-str params))
                   (get params "stream-type" "hot")))

(def queries (ref {}))

(defmulti generate-function (fn [lang _] (name lang)))

(defmethod generate-function "clojure" [lang f-string]
  (let [code (eval (let [f (read-string f-string)]
                     (if (= (first f) 'fn)
                       (conj (rest f) 'serializable.fn/fn)
                       f)))]
    {:computable code
     :persist f-string}))

(defn generate-fun-with-return [scope fun]
  (fn [& args]
    (let [res (apply js/call-timeout scope fun 9999999 args)]
      (try
        (json/read-str res :key-fn keyword)
        (catch Exception e res)))))

(defmethod generate-function "javascript" [lang f]
  (let [sc (js/new-safe-scope)
        compiled-fun (js/compile-function sc f :filename (str (db/uuid) ".js"))
        fun-with-return (generate-fun-with-return sc compiled-fun)]
    {:computable fun-with-return
     :persist f}))

(extend org.bson.types.ObjectId js/RhinoConvertible
  {:-to-rhino (fn [obj scope ctx] (str obj))})

(defn extract-date [params]
  (let [pre-date (get params "from" 0)
        post-date (if (string? pre-date) (read-string pre-date) pre-date)]
    post-date))

(defn next-avg [avg x n] (double (/ (+ (* avg n) x) (inc n))))

(defonce publications (ref {}))
(defonce global-channels (ref {}))

(defn global-channel [async-stream]
  (dosync
    (let [ch (get @global-channels async-stream)]
      (if (nil? ch)
        (let [c (chan 1)
              new-ch {:channel c :mult-channel (mult c)}]
          (alter global-channels assoc async-stream new-ch)
          new-ch)
        ch))))

(defn publisher [async-stream]
  (dosync
    (let [p (get @publications async-stream)]
      (if (nil? p)
        (let [c (chan 1)
              new-p {:channel c
                     :p (pub c (fn [ev] (:stream-name ev)))}]
          (alter publications assoc async-stream new-p)
          new-p)
        p))))

(defrecord AsyncStream [db]
  StreamManager
  (streams [this] {:streams
                   (map #(hash-map :stream %)
                        (conj (db/distinct-values db :stream-name)
                              "__all__"))})
  ColdStream
  (clean! [this] (db/delete-all! db))
  (data-from [this stream-name date-string]
    (db/lazy-events db stream-name date-string))
  HotStream
  (next! [this] (go (<! (:channel (global-channel this)))))
  EventProcessor
  (register-query! [this projection-name stream-name lang f init]
    (let [s-name (if (nil? stream-name) "__all__" stream-name) 
          function-descriptor (generate-function lang f)
          function (:computable function-descriptor)
          s (stream this {"from" "0" "stream-type" "hot-cold"
                          "stream-name" s-name})
          running-query (ref {:projection-name projection-name
                              :fn (:persist function-descriptor)
                              :stream-name s-name
                              :language lang
                              :current-value init
                              :processed 0
                              :last-event nil
                              :last-error nil
                              :avg-time 0
                              :status :running})]
      (dosync (alter queries assoc projection-name running-query))
      (go
        (loop [current-value init current-event (<! s)]
          (if (nil? current-event)
            (dosync (alter running-query assoc :status :finished))
            (let [start-ts (System/currentTimeMillis)
                  new-value (try
                              (function current-value current-event)
                              (catch Exception e
                                (log/info (.getMessage e))
                                (.printStackTrace e)
                                e))
                  current-time (- (System/currentTimeMillis) start-ts)]
              (if (instance? Exception new-value)
                (dosync
                  (alter running-query
                         merge {:last-event current-event
                                :avg-time (next-avg
                                            (:avg-time @running-query)
                                            current-time
                                            (:processed @running-query))
                                :processed (inc (:processed @running-query))
                                :last-error new-value 
                                :status :failed}))                
                (do
                  (dosync
                    (alter running-query
                           merge {:last-event current-event
                                  :avg-time (next-avg
                                              (:avg-time @running-query)
                                              current-time
                                              (:processed @running-query))
                                  :current-value new-value
                                  :processed (inc (:processed @running-query))}))
                  (recur new-value (<! s))))))))))
  (process-event! [this msg]
    ;; Think about the order of store+send to taps
    (println "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! " (pr-str msg))
    (go (>! (:channel (global-channel this)) msg)
        (>! (:channel (publisher this)) msg))
    (db/store db (:stream-name msg) (db/uuid) msg)
    {:correct "true"}))

(defmethod stream "cold" [a-stream params]
  (let [ch (chan (buffer 1))
        full-s (data-from a-stream 
                          (get params "stream-name" "events")
                          (extract-date params))
        full-s (if (contains? params :limit)
                 (take (:limit params) full-s)
                 full-s)]
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
                (recur (first s) (rest s) closed?))))))
      (log/info "::: Cold stream over"))
    ch))

(defmethod stream "hot-cold" [a-stream params]
  (log/info "Initialising hot-cold stream with params" (pr-str params))
  (let [date (extract-date params)
        ch (chan (buffer 1))
        stream-name (get params "stream-name" "__all__")
        full-s (data-from a-stream
                          stream-name
                          (extract-date params))]
    (go
      (loop [e (first full-s)
             s (rest full-s)
             closed? false
             last-t (System/currentTimeMillis)]
        (if (nil? e)
          (log/info ":::::::::::::::::::: Stream depleted, switching to hot stream")
          (let [rest-s (rest s)
                new-s (concat s (if (empty? rest-s)
                                  (data-from a-stream stream-name last-t) []))
                last-t (if (empty? rest-s) (System/currentTimeMillis) last-t)]
            (if closed?
              (log/info ":::::::::::::::::::: Stream closed by peer, switching to hot stream")
              (let [closed? (not (>! ch e))]
                (recur (first new-s) (rest new-s) closed? last-t))))))
      (if (= stream-name "__all__")
        (tap (:mult-channel (global-channel a-stream)) ch)
        (sub (:p (publisher a-stream)) stream-name ch)))
    ch))

(defmethod stream "hot" [a-stream params]
  (let [ch (chan 1)
        stream-name (get params "stream-name" "__all__")]
    (if (= stream-name "__all__")
      (tap (:mult-channel (global-channel a-stream)) ch)
      (sub (:p (publisher a-stream)) stream-name ch))
    ch))

(defn new-async-stream [db]
  (->AsyncStream db))

