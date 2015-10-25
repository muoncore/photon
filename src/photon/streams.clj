(ns photon.streams
  (:require [clojure.core.async :refer [go-loop go <!! <! >! chan buffer
                                        sliding-buffer mult tap close!
                                        put! >!! mix admix onto-chan
                                        pub sub alts! pipeline]
             :as async]
            [clj-rhino :as js]
            [clojure.tools.logging :as log]
            [somnium.congomongo :as m]
            [photon.config :as conf]
            [cheshire.core :as json]
            [clojure.tools.logging :as log]
            [muon-clojure.common :as mcc]
            [photon.db :as db])
  (:import (org.mozilla.javascript ConsString)
           (java.util HashMap)
           (jdk.nashorn.api.scripting JSObject)
           (clojure.lang PersistentArrayMap)
           (javax.script ScriptEngineManager SimpleBindings
                         ScriptContext)))
;; TODO: Do something about the conflict between keywords and strings
;;       for the keys (e.g. stream-name)


;; Global defs
;;;;;;;;;;;;;;

;; TODO: Try to minimise

(def queries (ref {})) ;; TODO: Make persistent!
(defonce publications (ref {}))
(defonce global-channels (ref {}))
(defonce active-streams (ref {}))
(defonce virtual-streams (ref {}))
(defonce projection-channel (chan))
(defonce projection-mix (mix projection-channel))


;; Stream protocols and multimethods
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defprotocol ColdStream
  (clean! [this])
  (event [this stream-name order-id])
  (data-from [this stream-name date-string]))

(defprotocol HotStream
  (next! [this]))

(defprotocol EventProcessor
  (register-query! [this projection-descriptor])
  (current-query-value [this projection-name])
  (process-event! [this ev]))

(defprotocol StreamManager
  (init-stream-manager! [this])
  (update-streams! [this stream-name])
  (create-stream-endpoint! [this stream-name])
  (create-virtual-stream-endpoint! [this stream-name])
  (streams [this]))

(defmulti stream (fn [_ params]
                   (log/info (pr-str params))
                   (let [st (get params "stream-type"
                                 (get params :stream-type "hot"))]
                     (log/info "stream type:" st)
                     st)))


;; Code handling
;;;;;;;;;;;;;;;;

(defmulti generate-function (fn [lang _] (name lang)))

(defmethod generate-function "clojure" [lang f-string]
  (let [code (eval (let [f (read-string f-string)]
                     (if (= (first f) 'fn)
                       (conj (rest f) 'serializable.fn/fn)
                       f)))]
    {:computable code
     :persist f-string}))

(defn cons-string->string [^ConsString elem]
  (.toString elem))

(defn generate-fun-with-return [scope fun]
  (fn [& args]
    (let [res (apply js/call-timeout scope fun 9999999 args)]
      (try
        (let [converted (clojure.walk/walk
                         (fn [elem]
                           (if (instance?
                                ConsString
                                elem)
                             (cons-string->string elem)
                             elem))
                         identity
                         (js/from-js res))]
          converted)
        (catch Exception e
          (println (.getMessage e))
          (.printStackTrace e)
          res)))))

(defmethod generate-function "javascript" [_ f]
  (let [sc (js/new-safe-scope)
        compiled-fun (js/compile-function sc f :filename (str (db/uuid) ".js"))
        fun-with-return (generate-fun-with-return sc compiled-fun)]
    {:computable fun-with-return
     :persist f}))

(def ^:dynamic *nashorn-cache* true)
(declare clj->nashorn)

(defn m-get-member [x n]
  (let [res (get x n (get x (keyword n)))]
    (if (nil? res)
      nil
      (clj->nashorn res))))

(def get-member (memoize m-get-member))

(defprotocol JSProtocol)

(extend-protocol JSProtocol JSObject)

(defn clj->nashorn [x-ref]
  (if (map? x-ref)
    (reify JSObject
      (isArray [^JSObject this] false)
      (^boolean isInstance [^JSObject this ^Object instance])
      (^boolean isInstanceOf [^JSObject this ^Object class] false)
      (isStrictFunction [^JSObject this] false)
      (keySet [^JSObject this] (into #{} (keys x-ref)))
      (newObject [^JSObject this args] (clj->nashorn x-ref))
      (^void removeMember [^JSObject this ^String s]
             (swap! x-ref dissoc s (keyword s))
             nil)
      (^void setMember [^JSObject this ^String n ^Object v]
             (swap! x-ref assoc n v))
      (^void setSlot [^JSObject this ^int n ^Object v])
      (values [^JSObject this] (map clj->nashorn x-ref))
      (isFunction [^JSObject this] true)
      (eval [^JSObject this ^String s])
      (getClassName [^JSObject this])
      (getSlot [^JSObject this ^int index])
      (^boolean hasSlot [^JSObject this ^int index])
      (^boolean hasMember [^JSObject this ^String s])
      (call [this thiz args])
      (getMember [^JSObject this ^String n]
                 (condp = n
                   "toString" "[object Object]"
                   "valueOf" this
                   (get-member x-ref n))))
    x-ref))

(defmethod generate-function "js-experimental" [_ f]
  (let [factory (ScriptEngineManager.)
        engine (.getEngineByName factory "nashorn")
        compiled (.compile engine f)
        evaled (.eval compiled)
        global (SimpleBindings.)]
    (.eval engine (str "load(\"nashorn:mozilla_compat.js\");"
                       "var HashMap = Java.type(\"java.util.HashMap\");"))
    (.setBindings engine global ScriptContext/GLOBAL_SCOPE)
    (.put global "reduction" evaled)
    (.put global "__prev" (.eval (.compile engine "null")))
    (let [wrap (.compile engine
                         (str "function() {"
                              "var GLOBAL_SCOPE = "
                              "javax.script.ScriptContext.GLOBAL_SCOPE;"
                              "var g = context.getBindings(GLOBAL_SCOPE);"
                              "__prev = g.get('__prev');"
                              "__prev = reduction(__prev, __next);"
                              "g.put('__prev', __prev);"
                              "return __prev;"
                              "}"))
          compiled-fun (fn [a b]
                         (if (or
                              (not *nashorn-cache*)
                              (nil? (.get global "__prev")))
                           (.put global "__prev" (clj->nashorn a)))
                         (.put global "__next" (clj->nashorn b))
                         (let [script "wrap_reduction()"]
                           (.eval engine script global)))]
      (.put global "wrap_reduction" (.eval wrap))
      {:computable compiled-fun
       :persist f})))

(extend org.bson.types.ObjectId js/RhinoConvertible
  {:-to-rhino (fn [obj scope ctx] (str obj))})

(defn extract-date [params]
  (let [pre-date (get params "from" 0)
        post-date (if (string? pre-date) (read-string pre-date) pre-date)]
    post-date))

(defn next-avg [avg x n] (double (/ (+ (* avg n) x) (inc n))))

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
                     :p (pub c (fn [ev] (get ev "stream-name"
                                             (get ev :stream-name))))}]
          (alter publications assoc async-stream new-p)
          new-p)
        p))))

(defn exception->message [^Throwable t] (.getMessage t))
(defn exception->stack-trace [^Throwable t] (.getStackTrace t))

(defn projection-step! [running-query current-event function ch]
  (dosync
   (let [current-value (:current-value @running-query)]
     (if (nil? current-event)
       (alter running-query assoc :status :finished)
       (let [start-ts (System/currentTimeMillis)
             new-value (try
                         (function current-value current-event)
                         (catch Exception e
                           (log/info (.getMessage e))
                           (.printStackTrace e)
                           e))
             current-time (- (System/currentTimeMillis) start-ts)
             to-merge-no-time
             (if (instance? Exception new-value)
               {:last-error
                (str (exception->message new-value) "\n"
                     (clojure.string/join
                      "\n"
                      (map str (exception->stack-trace new-value))))
                :status :failed}
               {:current-value new-value
                :status :running})
             to-merge
             (merge to-merge-no-time
                    {:avg-global-time
                     (double (/ (- (System/currentTimeMillis)
                                   (:init-time @running-query))
                                (inc (:processed @running-query))))
                     :avg-time (next-avg
                                (:avg-time @running-query)
                                current-time
                                (inc (:processed @running-query)))
                     :processed (inc (:processed @running-query))
                     :last-event current-event})]
         (alter running-query merge to-merge)
         #_(spit (str (:projections.path conf/config)
                      "/" projection-name ".projection")
                 (pr-str @running-query) :append false) 
         (go (>! ch @running-query))
         (if (instance? Exception new-value)
           (do
             (close! ch)
             (alter virtual-streams
                    dissoc (:projection-name @running-query)))))))))

(defn schedule [current-proj]
  (projection-step! (:running-query current-proj)
                    (:element current-proj)
                    (:function current-proj)
                    (:channel current-proj))
  true)

(pipeline (read-string (str (:parallel.projections conf/config)))
          (chan (sliding-buffer 1)) (map schedule) projection-channel)

(defrecord AsyncStream [m db]
  StreamManager
  (init-stream-manager! [this]
    (let [db-streams (db/distinct-values db :stream-name)]
      (dorun (map #(update-streams! this %) db-streams)))
    (dosync
     (alter active-streams assoc-in
            [this :virtual-streams] #{"__all__"})))
  (update-streams! [this stream-name]
    (dosync
     (let [real-streams (into #{}
                              (:real-streams
                               (get @active-streams this)))]
       (if (not (contains? real-streams stream-name))
         (do
           (create-stream-endpoint! this stream-name)
           (alter active-streams
                  (fn [old-active-streams]
                    (assoc-in old-active-streams
                              [this :real-streams]
                              (conj real-streams stream-name)))))))))
  (create-virtual-stream-endpoint! [this stream-name]
    (let [ch (chan (sliding-buffer 1))
          ch-mult (mult ch)]
      (dosync (alter virtual-streams assoc stream-name
                     {:channel ch :mult-channel ch-mult}))
      (when (not (nil? m)) ;; TODO: Abstract this somehow
        (mcc/stream-source
         {:m m} (str "projection/" stream-name)
         (fn [params]
           (let [t-ch (chan)]
             (tap ch-mult t-ch)))))))
  (create-stream-endpoint! [this stream-name]
    ;; TODO: Fix this mess
    (when (not (nil? m))
      (mcc/stream-source
       {:m m} (str "stream/" stream-name)
       (fn [params]
         (stream this
                 (assoc (assoc (into {} params)
                               "stream-name" stream-name)
                        :stream-name stream-name))))))
  (streams [this]
    {:streams
     (let [active-streams (get @active-streams this)]
       (map #(hash-map :stream %)
            (concat (:real-streams active-streams)
                    (:virtual-streams active-streams))))})
  ColdStream
  (event [this stream-name order-id] (db/fetch db stream-name order-id))
  (clean! [this] (db/delete-all! db))
  (data-from [this stream-name date-string]
    (db/lazy-events db stream-name date-string))
  HotStream
  (next! [this] (go (<! (:channel (global-channel this)))))
  EventProcessor
  (register-query! [this projection-descriptor]
    (let [projection-name (:projection-name projection-descriptor)
          _ (create-virtual-stream-endpoint! this projection-name)
          stream-name (:stream-name projection-descriptor)
          lang (:language projection-descriptor)
          f (:reduction projection-descriptor)
          init (:initial-value projection-descriptor)
          s-name (if (nil? stream-name) "__all__" stream-name) 
          function-descriptor (generate-function lang f)
          function (:computable function-descriptor)
          ch (:channel (get @virtual-streams projection-name))
          _ (log/info "Retrieving stream for" projection-name)
          new-descriptor (merge {:projection-name projection-name
                                 :fn (:persist function-descriptor)
                                 :stream-name s-name
                                 :language lang
                                 :current-value init
                                 :processed 0
                                 :init-time (System/currentTimeMillis)
                                 :last-event nil
                                 :last-error nil
                                 :avg-time 0
                                 :avg-global-time 0
                                 :status :running}
                                projection-descriptor)
          last-ts (str (inc (get (:last-event new-descriptor)
                                 :server-timestamp -1)))
          s (stream this {"from" last-ts
                          "stream-type" "hot-cold"
                          "stream-name" s-name})
          _ (log/info "Retrieved stream for" projection-name)
          running-query (ref new-descriptor)
          to-mix (clojure.core.async/map
                  (fn [element]
                    {:running-query running-query
                     :element element
                     :function function
                     :channel ch})
                  [s])]
      (log/info "Starting projection loop for" projection-name)
      (dosync (alter queries assoc projection-name running-query))
      (admix projection-mix to-mix)
      (log/info "All done for" projection-name)))
  (process-event! [this msg]
                  ;; Think about the order of store+send to taps
                  #_(println "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! " (pr-str msg))
                  (let [stream-name (get msg "stream-name"
                                         (get msg :stream-name))
                        server-timestamp (:server-timestamp msg)
                        now (bigint (System/currentTimeMillis))
                        new-timestamp (if (nil? server-timestamp)
                                        now
                                        (long server-timestamp))
                        new-msg (merge msg
                                       {:server-timestamp
                                        new-timestamp
                                        :photon-timestamp now
                                        :order-id
                                        (+ (* 1000 new-timestamp)
                                           (rem (System/nanoTime)
                                                1000))})]
                    (when (not= (:stream-name msg) "eventlog")
                      (update-streams! this (get msg "stream-name"
                                                 (get msg :stream-name)))
                      (>!! (:channel (global-channel this)) new-msg)
                      (>!! (:channel (publisher this)) new-msg)
                      (db/store db new-msg))) 
                  {:correct true}))

(defmethod stream "cold" [a-stream params]
  (log/info "cold-stream" (pr-str params))
  (let [ch (chan (buffer 1))]
    (go
      (log/info "Opening stream...")
      (loop [full-s
             (let [df (data-from
                       a-stream 
                       (get params "stream-name"
                            (get params :stream-name "__all__"))
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
              (do
                (let [closed? (not (>! ch e))]
                  (recur s closed?)))))))
      (log/info "::: Cold stream over"))
    ch))

(defmethod stream "hot-cold" [a-stream params]
  (log/info "Initialising hot-cold stream with params" (pr-str params))
  (let [date (extract-date params)
        ch (chan (buffer 1))
        _ (log/info "Getting stream-name and data")
        stream-name (get params "stream-name"
                         (get params :stream-name "__all__"))
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
                (recur (cons (first new-s) (rest new-s)) closed? last-t)))))))
      (if (= stream-name "__all__")
        (tap (:mult-channel (global-channel a-stream)) ch)
        (sub (:p (publisher a-stream)) stream-name ch)))
    ch))

(defmethod stream "hot" [a-stream params]
  (let [ch (chan 1)
        stream-name (get params "stream-name"
                         (get params :stream-name "__all__"))]
    (if (= stream-name "__all__")
      (tap (:mult-channel (global-channel a-stream)) ch)
      (sub (:p (publisher a-stream)) stream-name ch))
    ch))

(defn new-async-stream [m db]
  (let [as (->AsyncStream m db)]
    (init-stream-manager! as)
    as))

