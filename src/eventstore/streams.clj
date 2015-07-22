(ns eventstore.streams
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
            [eventstore.db :as db]))

(defn seq->channel [s]
  (let [ch (chan (buffer 1))]
    (go
      (doseq [event s]
        (>! ch event)))
    ch))

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

(def publications (ref {}))

(defn publisher [async-stream]
  (get publications async-stream (pub (:channel async-stream)
                                      (fn [ev] (:stream-name ev)))))

(defrecord AsyncStream [db channel mult-channel]
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
  (next! [this] (go (<! channel)))
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
    (go (>! channel msg))
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
        (tap (:mult-channel a-stream) ch)
        (sub (publisher a-stream) stream-name ch)))
    ch))

(defmethod stream "hot" [a-stream params]
  (let [ch (chan 1)
        stream-name (get params "stream-name" "__all__")]
    (if (= stream-name "__all__")
      (tap (:mult-channel a-stream) ch)
      (sub (publisher a-stream) stream-name ch))
    ch))

#_(def test-ch (chan))
#_(def mongo-ds (->DummyStream (m/make-connection "eventstore") test-ch (mult test-ch)))
#_(def test-ds (->AsyncStream (db/riak "rxriak-events-v1")
                            test-ch (mult test-ch)))

(defn new-async-stream [db]
  (let [tube (chan 1)
        tube-m (mult tube)]
    (->AsyncStream db tube tube-m)))

#_(defn transfer! []
  (let [ch (stream mongo-ds {"stream-type" "cold" "from" "0"})]
    (go
      (loop [elem (<! ch)]
        (if (nil? elem)
          (println "Finished!")
          (do
            (println "Processing " (.hashCode elem))
            (process-event! test-ds (dissoc elem :_id))
            (recur (<! ch))))))))

#_(stream mongo-ds {"stream-type" "cold" "from" "0" :limit 5})
#_(db/store (db/riak "rxriak-events-v1") "events" "event" {:b 2})
#_(Thread/sleep 5000)
#_(db/lazy-events-page (db/riak "rxriak-events-v1") "events" "0" 1)

#_(defn test-query []
   (register-query! mongo-ds :test-query-3
                    (sfn/fn [prev item]
                      (let [agg-unit 604800000 #_86400000
                            ua (try
                                 (uap/lookup-useragent (:user-agent (:headers item)))
                                 (catch Exception e {}))
                            payload (:payload item)
                            event-name (:commandName item)
                            action-name (:name item)
                            entity-type (:type (:parameters item))
                            path [(:method item) (:url item)]
                            timestamp (:server_timestamp item)
                            interval (* (int (/ timestamp agg-unit)) agg-unit)
                            username (:username payload)]
                        {:oses (assoc (:oses prev)
                                      (:family (:os ua))
                                      (inc (get (:oses prev)
                                                (:family (:os ua)) 0)))
                         :browsers (assoc (:browsers prev)
                                          (:family (:browser ua))
                                          (inc (get (:browsers prev)
                                                    (:family (:browser ua)) 0)))
                         :actions (assoc-in (:actions prev)
                                            [interval action-name]
                                            (inc (get-in (:actions prev)
                                                         [interval action-name]
                                                         0)))
                         :paths (assoc-in (:paths prev)
                                          [interval path]
                                          (inc (get-in (:paths prev)
                                                       [interval path]
                                                       0)))
                         :events (assoc-in (:events prev)
                                           [interval event-name]
                                           (inc (get-in (:events prev)
                                                        [interval event-name]
                                                        0)))
                         :profiles (if (or (nil? username)
                                           (not (contains? payload :id)))
                                     (:profiles prev)
                                     (assoc (:profiles prev) username
                                            (merge (get (:profiles prev)
                                                        username {})
                                                   payload)))
                         :all-skills (if (contains? payload :skills)
                                       (into #{} (concat (:all-skills prev)
                                                         (:skills payload)))
                                       (:all-skills prev))
                         :non-skills (assoc (:non-skills prev)
                                            interval
                                            (count
                                              (if (contains? payload :skills)
                                                (into #{} (:skills payload))
                                                [])))
                         :skills-intervals (assoc (:skills-intervals prev)
                                                  interval
                                                  (count
                                                    (if (contains? payload :skills)
                                                      (into #{} (concat (:all-skills prev)
                                                                        (:skills payload)))
                                                      (:all-skills prev))))
                         :intervals (if (or (not (= event-name "login-success"))
                                            (nil? username))
                                      (:intervals prev)
                                      (assoc-in (:intervals prev)
                                                [interval username]
                                                (inc (get-in (:intervals prev)
                                                             [interval username]
                                                             0))))}))
                    {:browsers {}
                     :devices {}
                     :oses {}
                     :all-skills {}
                     :skills-intervals {}
                     :non-skills {}
                     :logins {}
                     :intervals {}
                     :events {}
                     :actions {}
                     :paths {}
                     :profiles {}}))

#_(db/store riak-streams "streams" "stream" {:stream "events"})

#_(def test-s (stream {"stream-type" "cold"}))
#_(go (loop [e (<! test-s)] (println (nil? e)) (if (nil? e) (println "Finished") (do (println e) (recur (<! test-s))))) (println "Done"))
#_(close! test-s)

#_(Thread/sleep 10000)

#_(def test-s (stream {"stream-type" "hot"}))
#_(go (loop [e (<! test-s)] (println (nil? e)) (if (nil? e) (println "Finished") (do (println e) (recur (<! test-s))))) (println "Done"))
#_(go (loop [i 1000] (if (= 0 i) (println "Source finished") (>! tube {:value i})) (recur (dec i))))

