(ns photon.api
  (:require [photon.streams :as streams]
            [photon.exec :as exec]
            [cheshire.core :as json]
            [photon.default-projs :as dp]
            [clojure.java.io :as io]
            [clojure.tools.logging :as log]
            [clojure.core.async :as async])
  (:import (java.util Map)
           (java.io File FileInputStream FileOutputStream)
           (java.util.zip GZIPInputStream GZIPOutputStream)
           (java.lang.management ManagementFactory)))

;; Methods
(defn event [stm stream-name order-id]
  (streams/event stm stream-name order-id))

(defn post-projection! [stm request]
  (let [body request
        projection-name (:projection-name body)
        stream-name (:stream-name body)
        language (:language body)
        code (:reduction body)
        initial-value (:initial-value body)
        k-language (keyword language)
        parsed-initial-value (exec/parse-value initial-value k-language)
        projection-descriptor {:projection-name projection-name
                               :stream-name stream-name
                               :language k-language
                               :reduction code
                               :initial-value parsed-initial-value}]
    (try
      (spit (str (:projections.path (:conf stm)) "/" projection-name ".edn")
            (with-out-str (clojure.pprint/pprint projection-descriptor)))
      (catch java.io.FileNotFoundException e
        (log/fatal "projections.path is not writable. Not stopping, but"
                   "this means that configuration is not correct!")))
    (streams/register-query! stm projection-descriptor)
    {:correct true}))

(defn delete-projection! [{:keys [conf] :as stm} projection-name]
  (let [defaults (into #{} (map :projection-name dp/default-projections))]
    (if-not (contains? defaults projection-name)
      (let [f (str (:projections.path conf) "/" projection-name ".edn")]
        (.delete (File. f))
        {:correct (streams/unregister-query! stm projection-name)})
      {:correct false})))

(defn post-event! [stm ev]
  (streams/process-event! stm ev))

(defn filtered-projections [stm filter-keys]
  {:projections
   (map
    (fn [v] (assoc v :fn (pr-str (:fn v))))
    (map #(apply dissoc (deref (:projection-descriptor %)) filter-keys)
         (vals (:projections @(:state stm)))))})

(defn projections-without-val [stm]
  (filtered-projections stm [:_id :current-value]))

(defn projections-with-val [stm]
  (filtered-projections stm [:_id]))

(defn projection [stm projection-name]
  (log/trace "Querying" projection-name)
  (let [res (first
             (filter #(= (name (:projection-name %)) projection-name)
                     (map (comp deref :projection-descriptor)
                          (vals (:projections @(:state stm))))))]
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
  (projections-without-val stm))

(defn map->hashmap [^Map m]
  (java.util.HashMap. m))

(defn proper-map [m]
  (map->hashmap (clojure.walk/stringify-keys m)))

(defn projection-keys [stm]
  {:projection-keys
   (map :projection-name
        (map
         (fn [v] (assoc v :fn (pr-str (:fn v))))
         (map #(apply dissoc (deref (:projection-descriptor %)) [:_id])
              (vals (:projections @(:state stm))))))})

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
        raw-cpu-load (try
                       (.getProcessCpuLoad mf)
                       (catch Exception e
                         (/ (.getSystemLoadAverage mf) avail-processors)))
        cpu-load (format "%.2f" (* raw-cpu-load 100))
        stats {:total-memory total-memory :available-memory avail-memory
               :cpu-load (read-string cpu-load)}]
    stats))
