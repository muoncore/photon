(ns photon.streams
  (:require [clojure.core.async :refer [go-loop go <!! <! >! chan buffer sub
                                        sliding-buffer mult tap close! pub]
             :as async]
            [clojure.tools.logging :as log]
            [uap-clj.core :as uap]
            [somnium.congomongo :as m]
            [clj-time.coerce :as cc]
            [clojure.tools.logging :as log]
            [photon.db :as db]))


;; Global defs
;;;;;;;;;;;;;;

;; TODO: Try to minimise

(defonce publications (ref {}))
(defonce global-channels (ref {}))


;; Stream protocols and multimethods
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defprotocol ColdStream
  (clean! [this])
  (data-from [this stream-name date-string]))

(defprotocol HotStream
  (next! [this]))

(defprotocol EventProcessor
  (process-event! [this ev]))

(defprotocol StreamManager
  (streams [this]))

(defmulti stream (fn [_ params]
                   (log/info (pr-str params))
                   (let [st (get params "stream-type"
                                 (get params :stream-type "hot"))]
                     (log/info "stream type:" st)
                     st)))

(defn extract-date [params]
  (let [pre-date (get params "from" 0)
        post-date (if (string? pre-date) (read-string pre-date) pre-date)]
    post-date))

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
  (process-event! [this msg]
    ;; Think about the order of store+send to taps
    (println "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! " (pr-str msg))
    (go (>! (:channel (global-channel this)) msg)
        (>! (:channel (publisher this)) msg))
    (db/store db msg)
    {:correct "true"}))

(defmethod stream "cold" [a-stream params]
  (log/info "cold-stream" (pr-str params))
  (let [ch (chan (buffer 1))
        full-s (data-from a-stream 
                          (get params "stream-name" "__all__")
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

