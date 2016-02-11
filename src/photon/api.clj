(ns photon.api
  (:require [photon.streams :as streams]
            [schema.core :as s]
            [cheshire.core :as json]
            [clojure.java.io :as io]
            [clojure.tools.logging :as log]
            [clojure.core.async :as async])
  (:import (java.util Map)
           (java.io File FileInputStream FileOutputStream)
           (java.util.zip GZIPInputStream GZIPOutputStream)
           (java.lang.management ManagementFactory)))

;; Schemas
(s/defschema StreamInfo
  {:stream-name s/Str
   :total-events Long})

(s/defschema StreamInfoMap
  {:streams [StreamInfo]})

(s/defschema ProjectionKeyMap
  {:projection-keys [s/Str]})

(s/defschema ReductionValue
  ;; TODO: Improve
  s/Any)

(s/def Encoding
  ;; TODO: Extend
  (s/enum "application/json"))

(s/def Provenance
  ;; TODO: Improve
  {s/Keyword s/Any})

(s/defschema Event
  {(s/optional-key :encoding) (s/maybe Encoding)
   (s/optional-key :schema) (s/maybe s/Str)
   :payload s/Any
   :service-id (s/maybe s/Str) ;; TODO: Re-check this
   (s/optional-key :photon-timestamp) Long
   :local-id s/Any
   (s/optional-key :order-id) Long
   (s/optional-key :provenance) (s/maybe Provenance)
   :stream-name s/Str
   :server-timestamp Long})

(s/defschema FreeSchema
  {s/Keyword s/Any})

(s/defschema EventTemplate
  {(s/optional-key :encoding) (s/maybe Encoding)
   (s/optional-key :schema) (s/maybe s/Str)
   :payload (s/maybe FreeSchema)
   :service-id (s/maybe s/Str) ;; TODO: Re-check this
   :local-id s/Str
   (s/optional-key :provenance) (s/maybe Provenance)
   :stream-name s/Str
   (s/optional-key :server-timestamp) Long})

(s/defschema ReductionFunction
  ;; TODO: Improve
  s/Any)

(s/defschema StreamContentsResponse
  {:results [Event]})

(s/defschema ProjectionTemplate
  {:language (s/maybe (s/enum :clojure :javascript :js-experimental))
   :reduction s/Str
   :initial-value s/Str
   :stream-name s/Str
   :projection-name s/Str})

(s/defschema ProjectionValue
  {:fn s/Str
   :last-error (s/maybe s/Str)
   :current-value (s/maybe ReductionValue)
   :init-time Long
   :status (s/enum :running :failed)
   :language (s/maybe (s/enum :clojure :javascript :js-experimental))
   :initial-value ReductionValue
   :processed Long
   :last-event Event
   :reduction ReductionFunction
   :stream-name s/Str
   :avg-time Double
   :avg-global-time Double
   :projection-name s/Str})

(s/defschema Projection
  {:fn s/Str
   :last-error (s/maybe s/Str)
   :init-time Long
   :status (s/enum :running :failed)
   :language (s/maybe (s/enum :clojure :javascript :js-experimental))
   :initial-value ReductionValue
   :processed Long
   :last-event Event
   :reduction ReductionFunction
   :stream-name s/Str
   :avg-time Double
   :avg-global-time Double
   :projection-name s/Str})

(s/defschema ProjectionList
  {:projections [Projection]})

(s/defschema EventResponse (s/maybe Event))

(s/defschema PostResponse (s/maybe {:correct (s/enum true)}))

(s/defschema ProjectionResponse
  (s/maybe ProjectionValue))

;; Methods
(defn event [stm stream-name order-id]
  (streams/event stm stream-name order-id))

(defn post-projection! [stm request]
  (let [body request
        projection-name (:projection-name body)
        stream-name (:stream-name body)
        language (:language body)
        code (:reduction body)
        initial-value (:initial-value body)]
    (streams/register-query!
     stm
     {:projection-name projection-name
      :stream-name stream-name
      :language (keyword language)
      :reduction code
      :initial-value (read-string initial-value)})
    {:correct true}))

(defn post-event! [stm ev]
  (streams/process-event! stm ev))

(defn filtered-projections [stm filter-keys]
  {:projections
   (map
    (fn [v] (assoc v :fn (pr-str (:fn v))))
    (map #(apply dissoc (deref %) filter-keys)
         (vals (:queries @(:state stm)))))})

(defn projections-without-val [stm]
  (filtered-projections stm [:_id :current-value]))

(defn projections-with-val [stm]
  (filtered-projections stm [:_id]))

(defn projection [stm projection-name]
  (log/trace "Querying" projection-name)
  (let [res (first (filter #(= (name (:projection-name %)) projection-name)
                           (map deref (vals (:queries @(:state stm))))))]
    (log/trace "Result:" (pr-str res))
    (log/trace "Result:" (pr-str (muon-clojure.utils/dekeywordize res)))
    res))

(defn streams [stm]
  {:streams
   (into [] (map
             #(hash-map :stream-name (key %)
                        :total-events (:total-events (val %)))
             (:current-value (projection stm "__streams__"))))})

(defn projections [stm]
  (projections-without-val (:queries @(:state stm))))

(defn map->hashmap [^Map m]
  (java.util.HashMap. m))

(defn proper-map [m]
  (map->hashmap (clojure.walk/stringify-keys m)))

(defn projection-keys [stm]
  {:projection-keys
   (map :projection-name
        (map
         (fn [v] (assoc v :fn (pr-str (:fn v))))
         (map #(apply dissoc (deref %) [:_id])
              (vals (:queries @(:state stm))))))})

(defn stream [stm stream-name & args]
  (let [m-args (apply hash-map args)
        from (str (get m-args :from 0))
        limit (:limit m-args)
        res (async/<!!
             (async/reduce
              (fn [prev n] (concat prev [n])) []
              (streams/stream->ch stm {:from from
                                       :stream-name stream-name
                                       :limit limit
                                       :stream-type "cold"})))]
    {:results res}))

(defn gzip-compress [f]
  (let [buffer (byte-array 1024)
        g (File/createTempFile "compressed" ".pev")
        gzos (GZIPOutputStream. (FileOutputStream. g))
        in (FileInputStream. f)]
    (loop [len (.read in buffer)]
      (when (> len 0)
        (.write gzos buffer 0 len)
        (recur (.read in buffer))))
    (.close in)
    (.finish gzos)
    (.close gzos)
    g))

(defn stream->file [stm stream-name]
  (let [f (File/createTempFile stream-name ".edn")]
    (with-open [w (io/writer f)]
      (async/<!!
       (async/reduce
        (fn [prev n]
          (do
            (.write w (str (pr-str n) "\n"))
            {:ok true})) []
        (streams/stream->ch stm {:from 0
                                 :stream-type "cold"
                                 :stream-name stream-name}))))
    (gzip-compress f)))

(defn find-name [stm stream-name]
  (loop [i -1 stms (into #{}
                         (map :stream-name (:streams (streams stm))))]
    (let [name (if (= -1 i)
                 stream-name
                 (str stream-name "-" i))]
      (if (empty? stms)
        name
        (if (not (contains? stms name))
          name
          (recur (inc i) (disj stms name)))))))

(defn new-stream [stm params]
  (println (pr-str params))
  (let [type (if (contains? params "upload-pev-name") :pev :json)
        file (get params "upload-pev-name" (get params "upload-file-name"))
        filename (:filename file)
        stream-name (get params "stream-name")
        stream-name (if (or (nil? stream-name)
                            (= "" (clojure.string/trim stream-name)))
                      (clojure.string/join
                       "."
                       (drop-last (clojure.string/split
                                   filename #"[.]")))
                      stream-name)
        stream-name (find-name stm stream-name)]
    (if (= :pev type)
      (let [f (:tempfile file)
            gzis (GZIPInputStream. (FileInputStream. f))]
        (with-open [r (io/reader gzis)]
          (let [ls (map read-string (line-seq r))]
            (dorun (map #(streams/process-event! stm (assoc % :stream-name stream-name))
                        ls)))))
      (let [lazy-events (json/parsed-seq
                         (clojure.java.io/reader (:tempfile file)) true)]
        (dorun (map #(streams/process-event! stm (assoc % :stream-name stream-name))
                    lazy-events))))
    stream-name))

(defn runtime-stats [_]
  (let [rt (Runtime/getRuntime)
        mf (ManagementFactory/getOperatingSystemMXBean)
        total-memory (.maxMemory rt)
        avail-memory (+ (.freeMemory rt) (- total-memory (.totalMemory rt)))
        avail-processors (.availableProcessors rt)
        cpu-load (format "%.2f" (* (/ (.getSystemLoadAverage mf) avail-processors) 100))
        stats {:total-memory total-memory :available-memory avail-memory
               :cpu-load cpu-load}]
    stats))
