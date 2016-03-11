(ns photon.streams
  (:require [clojure.tools.logging :as log]
            [muon-clojure.common :as mcc]
            [photon.default-projs :as dp]
            [photon.exec :refer :all]
            [photon.db :as db]
            [clojure.pprint :as pp]
            [com.stuartsierra.component :as component]
            [clojure.string :as str]
            [clojure.core.async :as async
             :refer [go-loop go <!! <! >! chan buffer sliding-buffer
                     mult tap close! put! >!! mix admix onto-chan
                     pub sub alts!]])
  (:import (java.net ServerSocket)))
;; TODO: Do something about the conflict between keywords and strings
;;       for the keys (e.g. stream-name)

(defn merge-t
  "An example implementation of `merge` using transients."
  [x y]
  (persistent! (reduce (fn [res [k v]] (assoc! res k v))
                       (transient x) y)))


;; Stream protocols and multimethods
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defrecord Projection [ch-in ch-out projection-descriptor])

(defprotocol ColdStream
  (clean! [this])
  (event [this stream-name order-id])
  (data-from [this stream-name date-string]))

(defprotocol HotStream
  (next! [this]))

(defprotocol EventProcessor
  (register-query! [this projection-descriptor])
  (unregister-query! [this projection-name])
  (process-event! [this ev]))

(defprotocol StreamProtocol
  (init-stream-manager! [this path])
  (update-streams! [this stream-name])
  (create-stream-endpoint! [this stream-name])
  (create-virtual-stream-endpoint! [this stream-name])
  (streams [this]))

(defmulti stream->ch
  (fn [_ params]
    (log/info (pr-str params))
    (let [st (get params :stream-type "hot")]
      (log/info "stream type:" st)
      st)))

(defn extract-date [params]
  (let [pre-date (get params :from 0)
        post-date (if (string? pre-date)
                    (read-string pre-date) pre-date)]
    post-date))

(defn publisher [{:keys [state]}]
  (dosync
    (if-let [p (:publication @state)]
      p
      (let [c (chan 1)
            new-p {:channel c :p (pub c :stream-name)}]
        (dosync
            (alter state
                   (fn [old-state]
                     (let [new-channels
                           (conj (:all-channels old-state) c)]
                       (merge old-state
                              {:publication new-p
                               :all-channels new-channels})))))
        new-p))))

(defn exception->message [^Throwable t] (.getMessage t))
(defn exception->stack-trace [^Throwable t] (.getStackTrace t))
(defn exception->error-str [t]
  (let [stack (map str (exception->stack-trace t))]
    (str (exception->message t) "\n" (str/join "\n" stack))))

(defn assoc-update-t! [rqt function ev]
  (try
    (assoc! rqt :current-value (function (:current-value rqt) ev))
    (catch Exception e
      (log/info (.getMessage e))
      (.printStackTrace e)
      (let [rqt-failed (assoc! rqt :status :failed)]
        (assoc! rqt-failed :last-error (exception->error-str e))))))

(defn next-avg [avg x n] (double (/ (+ (* avg n) x) (inc n))))

(defn new-avg-g-time [rqt]
  (double (/ (- (System/currentTimeMillis) (:init-time rqt))
             (inc (:processed rqt)))))

(defn new-avg-time [rqt delta]
  (next-avg (:avg-time rqt) delta (inc (:processed rqt))))

(defn updated-value [rq function ev]
  (let [rqt (transient rq)
        start-ts (System/currentTimeMillis)
        to-merge (assoc-update-t! rqt function ev)
        delta (- (System/currentTimeMillis) start-ts)
        to-merge (assoc! to-merge :avg-global-time
                         (new-avg-g-time rqt))
        to-merge (assoc! to-merge :avg-time (new-avg-time rqt delta))
        to-merge (assoc! to-merge :processed (inc (:processed rq)))
        to-merge (assoc! to-merge :last-event ev)]
    (persistent! to-merge)))

(defn schedule
  [{:keys [stream running-query current-event function ch]}]
  (swap! (:stats stream) update :processed inc)
  (dosync
    (if (nil? current-event)
      (alter running-query assoc :status :finished)
      (let [nrq (alter running-query updated-value
                       function current-event)]
        (log/trace "!!!!!!!! Processing event in projection:"
                   (pr-str current-event))
        (>!! ch nrq)
        (when (= (:status nrq) :failed)
          (close! ch)
          (alter (:state stream) update-in [:virtual-streams]
                 (fn [m] (dissoc m :projection-name))))))))

(defn as-init-stream-manager! [stream projections-path]
  (let [db-streams (db/distinct-values (:db stream) :stream-name)]
    (dorun (map #(update-streams! stream %) db-streams)))
  (dosync
    (alter (:state stream) assoc-in
           [:active-streams :virtual-streams] #{"__all__"}))
  (log/info "Loading default projections...")
  (let [projs (dp/starting-projections projections-path)]
    (dorun (map #(register-query! stream %) projs)))
  (log/info "Projections loaded!"))

(defn as-update-streams! [{:keys [state] :as stream} stream-name]
  (dosync
    (let [active-streams (:active-streams @state)
          real-streams (into #{} (:real-streams active-streams))]
      (when-not (contains? real-streams stream-name)
        (create-stream-endpoint! stream stream-name)
        (alter state update-in [:active-streams]
               (fn [old-active-streams]
                 (assoc-in old-active-streams
                           [stream :real-streams]
                           (conj real-streams stream-name))))))))

(defn as-create-virtual-stream-endpoint!
  [{:keys [muon state proj-ch]} stream-name]
  (let [ch (chan (sliding-buffer 1))
        ch-muon-mult (mult ch)
        copy-ch (chan (sliding-buffer 1))
        ch-mult (mult copy-ch)
        t-ch (chan)]
    (tap ch-muon-mult copy-ch)
    (tap ch-mult t-ch)
    (>!! proj-ch {:stream-name stream-name
                  :projection-name stream-name
                  :mult ch-muon-mult})
    (dosync (alter state
                   (fn [old-state]
                     (assoc (assoc-in old-state
                                      [:virtual-streams stream-name]
                                      {:channel ch :mult-channel ch-mult})
                            :all-channels
                            (conj (:all-channels old-state) ch t-ch)))))))

(defn as-create-stream-endpoint! [{:keys [muon] :as stream} stream-name]
  ;; TODO: Fix this mess
  (when-not (nil? muon)
    (mcc/stream-source
     {:m muon} (str "stream/" stream-name)
     (fn [params]
       (let [mp (into {} params)]
         (stream->ch stream (assoc mp :stream-name stream-name)))))))

(defn as-streams [{:keys [state]}]
  {:streams
   (let [active-streams (:active-streams @state)]
     (map #(hash-map :stream %) (map vals active-streams)))})

(defn descriptor-default [projection-name function-descriptor
                          s-name language initial-value]
  {:projection-name projection-name
   :fn (:persist function-descriptor)
   :stream-name s-name
   :language language
   :current-value initial-value
   :processed 0
   :init-time (System/currentTimeMillis)
   :last-event nil
   :last-error nil
   :avg-time 0
   :avg-global-time 0
   :status :running})

(defn projection-queue-mix [stream running-query function ch s]
  (clojure.core.async/map
   (fn [element]
     {:stream stream :running-query running-query
      :current-event element :function function :ch ch})
   [s]))

(defn as-register-query!
  [{:keys [conf state projection-mix telnet-mix] :as stream}
   {:keys [stream-name language reduction
           initial-value projection-name]
    :as projection-descriptor}]
  (create-virtual-stream-endpoint! stream projection-name)
  (log/info "Retrieving stream for" projection-name)
  (let [s-name (if (nil? stream-name) "__all__" stream-name)
        function-descriptor (generate-function language reduction)
        virtual-stream (get (:virtual-streams @state) projection-name)
        ch (:channel virtual-stream)
        desc (descriptor-default projection-name function-descriptor
                                 s-name language initial-value)
        new-descriptor (merge-t desc projection-descriptor)
        last-ts (str (inc (get (:last-event new-descriptor)
                               :server-timestamp -1)))
        s (stream->ch stream {:from last-ts
                              :stream-type "hot-cold"
                              :stream-name s-name})
        running-query (ref new-descriptor)
        function (:computable function-descriptor)
        to-mix (projection-queue-mix stream running-query
                                     function ch s)]
    (log/info "Retrieved stream for" projection-name)
    (let [telnet-tap (chan)
          mult-ch (:mult-channel virtual-stream)]
      (tap mult-ch telnet-tap)
      (admix telnet-mix telnet-tap))
    (log/info "Starting projection loop for" projection-name)
    (dosync
     (alter state
            (fn [old-state]
              (-> old-state
                  (assoc-in [:projections projection-name]
                            (->Projection s ch running-query))
                  (update :all-channels conj ch)))))
    (admix projection-mix to-mix)
    (log/info "All done for" projection-name)))

(defn as-unregister-query! [{:keys [state]} projection-name]
  (dosync
   (if-let [projection (get-in @state [:projections projection-name])]
     (do
       (close! (:ch-in projection))
       (close! (:ch-out projection))
       (alter state
              (fn [old-state]
                (update-in old-state [:projections] dissoc projection-name)))
       true)
     false)))

(defn as-process-event! [{:keys [stats db global-channel] :as stream}
                         ev]
  ;; Think about the order of store+send to taps
  (log/trace (pr-str ev))
  (let [msg (transient ev)
        stream-name (:stream-name msg)
        server-timestamp (:server-timestamp msg)
        now (bigint (System/currentTimeMillis))
        new-timestamp (if (nil? server-timestamp)
                        now
                        (long server-timestamp))
        new-msg (assoc! msg :server-timestamp
                        new-timestamp)
        new-msg (assoc! new-msg :photon-timestamp
                        now)
        new-msg (assoc! new-msg :order-id
                        (+ (* 1000 new-timestamp)
                           (rem (System/nanoTime)
                                1000)))
        new-msg (persistent! new-msg)]
    (when (not= (:stream-name new-msg) "eventlog")
      (swap! stats update :incoming inc)
      (update-streams! stream (:stream-name new-msg))
      (>!! (:channel global-channel) new-msg)
      (>!! (:channel (publisher stream)) new-msg)
      (db/store db new-msg)))
  {:correct true})

(defrecord AsyncStream [db global-channel telnet-mix projection-mix
                        state stats proj-ch conf]
  StreamProtocol
  (init-stream-manager! [this path] (as-init-stream-manager! this path))
  (update-streams! [this stream-name]
    (as-update-streams! this stream-name))
  (create-virtual-stream-endpoint! [this stream-name]
    (as-create-virtual-stream-endpoint! this stream-name))
  (create-stream-endpoint! [this stream-name]
    (as-create-stream-endpoint! this stream-name))
  (streams [this] (as-streams this))
  ColdStream
  (event [this stream-name order-id] (db/fetch db stream-name order-id))
  (clean! [this] (db/delete-all! db))
  (data-from [this stream-name date]
    (log/info "data-from" stream-name)
    (db/lazy-events db stream-name date))
  HotStream
  (next! [this] (<!! (:channel global-channel)))
  EventProcessor
  (register-query!
      [this {:keys [projection-name] :as projection-descriptor}]
    (if (contains? (:projections @state) projection-name)
      (as-unregister-query! this projection-name))
    (as-register-query! this projection-descriptor))
  (unregister-query! [this projection-name]
    (as-unregister-query! this projection-name))
  (process-event! [this orig-msg] (as-process-event! this orig-msg)))

(defmethod stream->ch "cold" [a-stream params]
  (log/info "cold-stream" (pr-str params))
  (let [ch (chan (buffer 1))]
    (go
      (log/info "Opening stream...")
      (loop [full-s
             (let [df (data-from
                       a-stream
                       (get params :stream-name "__all__")
                       (extract-date params))]
               (if (and (contains? params :limit)
                        (not (nil? (:limit params))))
                 (take (:limit params) df)
                 df))
             closed? false]
        (let [e (first full-s) s (rest full-s)]
          (if (nil? e)
            (do
              (close! ch)
              (log/info ":::::::::::::::::::: Stream depleted, closing"))
            (if closed?
              (log/info ":::::::::::::::::::: Stream closed!")
              (let [closed? (not (>! ch e))]
                (log/trace "LOOP: cold stream")
                (recur s closed?))))))
      (log/info "::: Cold stream over"))
    ch))

(defmethod stream->ch "hot-cold" [a-stream params]
  (log/info "Initialising hot-cold stream with params" (pr-str params))
  (let [date (extract-date params)
        ch (chan (buffer 1))
        _ (log/info "Getting stream-name and data")
        stream-name (get params :stream-name "__all__")
        _ (log/info "Finished getting stream-name and data")]
    (go
      (loop [full-s (data-from a-stream stream-name
                               (extract-date params))
             closed? false
             last-t (System/currentTimeMillis)]
        (let [e (first full-s) s (rest full-s)]
          (if (nil? e)
            (log/info ":::::::::::::::::::: Stream depleted, switching to hot stream")
            (let [rest-s (rest s)
                  new-s (if (empty? rest-s)
                          (concat s
                                  (data-from a-stream stream-name last-t))
                          s)
                  last-t (if (empty? rest-s) (System/currentTimeMillis) last-t)]
              (if closed?
                (log/info ":::::::::::::::::::: Stream closed by peer, switching to hot stream")
                (let [closed? (not (>! ch e))]
                  (log/trace "LOOP: hot-cold stream")
                  (recur (cons (first new-s) (rest new-s)) closed? last-t)))))))
      (if (= stream-name "__all__")
        (tap (:mult-channel (:global-channel a-stream)) ch)
        (sub (:p (publisher a-stream)) stream-name ch)))
    ch))

(defmethod stream->ch "hot" [a-stream params]
  (let [ch (chan 1)
        stream-name (get params :stream-name "__all__")]
    (if (= stream-name "__all__")
      (tap (:mult-channel (:global-channel a-stream)) ch)
      (sub (:p (publisher a-stream)) stream-name ch))
    ch))

(defrecord AsyncStreamState [projections publication active-streams
                             virtual-streams all-channels])

(defn create-telnet-socket! [port ch text]
  (try
    (let [ss (ServerSocket. (read-string (str port)))
          sockets (atom #{})]
      (log/info "Opening stream output on port" port "for"
                text "streaming...")
      (go
        (loop [elem (<! ch)]
          (if (nil? elem)
            (swap! sockets (fn [_] #{}))
            (do
              (when (not (or (nil? elem) (empty? @sockets)))
                (let [edn (prn-str elem)
                      bs (bytes (byte-array (map (comp byte int) edn)))]
                  (dorun (pmap #(let [os (.getOutputStream %)]
                                  (try
                                    (.write os bs)
                                    (catch Exception e
                                      (swap! sockets disj %))))
                               @sockets))))
              (log/trace "LOOP: create-telnet-socket!")
              (recur (<! ch))))))
      (go
        (loop [s (try
                   (.accept ss)
                   (catch java.net.SocketException e
                     (log/trace "Socket closed")
                     nil))]
          (when-not (nil? s)
            (swap! sockets conj s)
            (log/trace "LOOP: create-telnet-socket! - accept")
            (recur (.accept ss)))))
      ss)
    (catch java.net.BindException e
      (log/error (str "Port " port " unavailable, "
                      "deactivating telnet " text " streaming")))))

(defn pipeline [num fn ch]
  (loop [i 0]
    (when-not (= i num)
      (go
        (loop [elem (<! ch)]
          (when-not (nil? elem)
            (fn elem)
            (log/trace "LOOP: pipeline")
            (recur (<! ch)))))
      (log/trace "LOOP: pipeline - external")
      (recur (inc i)))))

(defn empty! [ch]
  (close! ch)
  (log/trace "Emptying channel" ch)
  (<!! (go-loop [elem (<! ch)]
         (when-not (nil? elem)
           (recur (<! ch)))))
  (log/trace "Channel" ch "empty, closing")
  (close! ch))

(defrecord StreamManager [options database manager channels
                          sockets proj-ch]
  component/Lifecycle
  (start [component]
    (if (nil? manager)
      (let [projections-port (:projections.port options)
            events-port (:events.port options)
            threads (:parallel.projections options)
            c (chan 1)
            mult-global (mult c)
            global-channel {:channel c :mult-channel mult-global}
            telnet-projections-channel (chan (sliding-buffer 1024))
            telnet-events-channel (chan (sliding-buffer 1024))
            telnet-mix (mix telnet-projections-channel)
            projection-channel (chan)
            projection-mix (mix projection-channel)
            initial-state (map->AsyncStreamState
                           {:projections {}
                            :publication nil
                            :active-streams {}
                            :virtual-streams {}
                            :all-channels #{}})
            as (->AsyncStream (:driver database) global-channel
                              telnet-mix projection-mix
                              (ref initial-state)
                              (atom {:incoming 0 :processed 0})
                              (chan 1024)
                              options)]
        (init-stream-manager! as (:projections.path options))
        (tap mult-global telnet-events-channel)
        (pipeline threads schedule projection-channel)
        (let [proj-socket (create-telnet-socket! projections-port
                                                 telnet-projections-channel
                                                 "projections")
              events-socket (create-telnet-socket! events-port
                                                   telnet-events-channel
                                                   "events")]
          (merge component {:manager as
                            :channels [projection-channel
                                       telnet-projections-channel
                                       telnet-events-channel c]
                            :sockets [proj-socket events-socket]})))
      component))
  (stop [component]
    (if (nil? manager)
      component
      (do
        (empty! (:proj-ch manager))
        (close! (:proj-ch manager))
        (dorun (map empty! channels))
        (dorun (map #(if (not (nil? %)) (.close %)) sockets))
        (dorun (map empty! (:all-channels @(:state manager))))
        (let [new-comp (merge component {:manager nil :channels nil :sockets nil})]
          (log/info "new-comp" new-comp)
          new-comp)))))

(defn stream-manager [options]
  (map->StreamManager {:options options}))
