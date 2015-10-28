(ns photon.streams
  (:require [clojure.core.async :refer [go-loop go <!! <! >! chan buffer
                                        sliding-buffer mult tap close!
                                        put! >!! mix admix onto-chan
                                        pub sub alts! pipeline]
             :as async]
            [clj-rhino :as js]
            [clojure.tools.logging :as log]
            [somnium.congomongo :as m]
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

(defn clj->nashorn [x-orig]
  (if (map? x-orig)
    (let [x-ref (atom x-orig)]
      (reify JSObject
        (isArray [^JSObject this]
                 (println "isArray")
                 false)
        (^boolean isInstance [^JSObject this ^Object instance]
                  (println "isInstance"))
        (^boolean isInstanceOf [^JSObject this ^Object class]
                  (println "isInstanceOf")
                  false)
        (isStrictFunction [^JSObject this]
                          (println "isStrictFunction")
                          false)
        (keySet [^JSObject this]
                #_(println "keySet")
                (into #{} (keys @x-ref)))
        (newObject [^JSObject this args]
                   (println "newObject")
                   (clj->nashorn @x-ref))
        (^void removeMember [^JSObject this ^String s]
               #_(println "removeMember")
               (swap! x-ref dissoc s (keyword s)))
        (^void setMember [^JSObject this ^String n ^Object v]
               #_(println "setMember")
               (let [k (if (contains? @x-ref (keyword n))
                         (keyword n)
                         n)]
                 (swap! x-ref assoc k (clj->nashorn v))))
        (^void setSlot [^JSObject this ^int n ^Object v]
               #_(println "setSlot")
               (let [k (let [k-c (nth (keys @x-ref) n)]
                         (if (nil? k-c) (str n) k-c))]
                 (swap! x-ref assoc k (clj->nashorn v))))
        (values [^JSObject this]
                #_(println "values")
                (map clj->nashorn (vals @x-ref)))
        (isFunction [^JSObject this]
                    #_(println "isFunction")
                    true)
        (eval [^JSObject this ^String s]
              #_(println "eval"))
        (getClassName [^JSObject this]
                      #_(println "getClassName")
                      "ReifiedJSObject")
        (getSlot [^JSObject this ^int index]
                 #_(println "getSlot")
                 (let [k (nth (keys @x-ref) index)]
                   (if (nil? k) nil (get @x-ref k))))
        (^boolean hasSlot [^JSObject this ^int index]
                  #_(println "hasSlot")
                  (let [k (nth (keys @x-ref) index)]
                    (not (nil? k))))
        (^boolean hasMember [^JSObject this ^String s]
                  #_(println "hasMember")
                  (or (contains? @x-ref s) (contains? @x-ref (keyword s))))
        (call [this thiz args]
              #_(println "call" thiz (into [] args)))
        (getMember [^JSObject this ^String n]
                   #_(println "getMember" n)
                   (condp = n
                     "toString" "[object Object]"
                     "___map" @x-ref
                     "valueOf" this
                     (get-member @x-ref n)))))
    x-orig))

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
                              "__res = reduction(__prev, __next);"
                              "if(__res != null && typeof __res === 'function'"
                              "&& __res.___map != null && __res.___map != undefined)"
                              "{ __res = __res.___map; }"
                              "g.put('__prev', __res);"
                              "return __res;"
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

(defn publisher [async-stream]
  (dosync
   (let [p (:publication @(:state async-stream))]
     (if (nil? p)
       (let [c (chan 1)
             new-p {:channel c
                    :p (pub c (fn [ev] (get ev "stream-name"
                                            (get ev :stream-name))))}]
         (dosync
          (alter (:state async-stream) assoc :publication new-p))
         new-p)
       p))))

(defn exception->message [^Throwable t] (.getMessage t))
(defn exception->stack-trace [^Throwable t] (.getStackTrace t))

(defn projection-step! [stream running-query current-event function ch]
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
         ;; TODO: Reconsider projection persistence
         #_(spit (str (:projections.path conf/config)
                      "/" projection-name ".projection")
                 (pr-str @running-query) :append false) 
         (go (>! ch @running-query))
         (if (instance? Exception new-value)
           (do
             (close! ch)
             (alter (:state stream) update-in [:virtual-streams]
                    #(dissoc (:projection-name @running-query))))))))))

(defn schedule [current-proj]
  (projection-step! (:stream current-proj)
                    (:running-query current-proj)
                    (:element current-proj)
                    (:function current-proj)
                    (:channel current-proj))
  true)

(defrecord AsyncStream [muon db global-channel
                        projection-mix state]
  StreamManager
  (init-stream-manager! [this]
    (let [db-streams (db/distinct-values db :stream-name)]
      (dorun (map #(update-streams! this %) db-streams)))
    (dosync
     (alter state assoc-in
            [:active-streams :virtual-streams] #{"__all__"})))
  (update-streams! [this stream-name]
    (dosync
     (let [real-streams (into #{}
                              (:real-streams
                               (:active-streams @state)))]
       (if (not (contains? real-streams stream-name))
         (do
           (create-stream-endpoint! this stream-name)
           (alter state update-in [:active-streams]
                  (fn [old-active-streams]
                    (assoc-in old-active-streams
                              [this :real-streams]
                              (conj real-streams stream-name)))))))))
  (create-virtual-stream-endpoint! [this stream-name]
    (let [ch (chan (sliding-buffer 1))
          ch-mult (mult ch)]
      (dosync (alter state assoc-in [:virtual-streams stream-name]
                     {:channel ch :mult-channel ch-mult}))
      (when (not (nil? muon)) ;; TODO: Abstract this somehow
        (mcc/stream-source
         {:m muon} (str "projection/" stream-name)
         (fn [params]
           (let [t-ch (chan)]
             (tap ch-mult t-ch)))))))
  (create-stream-endpoint! [this stream-name]
    ;; TODO: Fix this mess
    (when (not (nil? muon))
      (mcc/stream-source
       {:m muon} (str "stream/" stream-name)
       (fn [params]
         (stream this
                 (assoc (assoc (into {} params)
                               "stream-name" stream-name)
                        :stream-name stream-name))))))
  (streams [this]
    {:streams
     (let [active-streams (:active-streams @state)]
       (map #(hash-map :stream %)
            (concat (:real-streams active-streams)
                    (:virtual-streams active-streams))))})
  ColdStream
  (event [this stream-name order-id] (db/fetch db stream-name order-id))
  (clean! [this] (db/delete-all! db))
  (data-from [this stream-name date-string]
    (db/lazy-events db stream-name date-string))
  HotStream
  (next! [this] (go (<! (:channel global-channel))))
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
          ch (:channel (get (:virtual-streams @state) projection-name))
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
                    {:stream this
                     :running-query running-query
                     :element element
                     :function function
                     :channel ch})
                  [s])]
      (log/info "Starting projection loop for" projection-name)
      (dosync (alter state assoc-in
                     [:queries projection-name] running-query))
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
                      (>!! (:channel global-channel) new-msg)
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
        (tap (:mult-channel (:global-channel a-stream)) ch)
        (sub (:p (publisher a-stream)) stream-name ch)))
    ch))

(defmethod stream "hot" [a-stream params]
  (let [ch (chan 1)
        stream-name (get params "stream-name"
                         (get params :stream-name "__all__"))]
    (if (= stream-name "__all__")
      (tap (:mult-channel (:global-channel a-stream)) ch)
      (sub (:p (publisher a-stream)) stream-name ch))
    ch))

(defrecord AsyncStreamState [queries publication
                             active-streams virtual-streams])

(defn new-async-stream [m db threads state]
  (let [c (chan 1)
        global-channel {:channel c :mult-channel (mult c)}
        projection-channel (chan)
        projection-mix (mix projection-channel)
        as (->AsyncStream m db global-channel projection-mix state)
        initial-state (map->AsyncStreamState
                       {:queries {}
                        :publication nil
                        :active-streams {}
                        :virtual-streams {}})]
    (init-stream-manager! as)
    (dosync (alter state (fn [_] initial-state)))
    (pipeline threads
              (chan (sliding-buffer 1)) (map schedule) projection-channel)
    as))

