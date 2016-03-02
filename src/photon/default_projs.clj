(ns photon.default-projs
  (:require [serializable.fn :as sfn]
            [clojure.java.io :as io]
            [clojure.tools.logging :as log]
            [clj-schema-inspector.core :as csi])
  (:import (java.io File)))

(def stream-fn
  (sfn/fn [p n]
    (let [ps (get p (:stream-name n) {})
          old-total (get ps :total-events 0)
          new-total (inc old-total)
          old-schema (get ps :schema {})
          schema (if (or (< old-total 10) (< (rand) 0.02))
                   (clj-schema-inspector.core/serialise
                    (clj-schema-inspector.core/add-map
                     old-schema n))
                   old-schema)]
      (assoc p (:stream-name n) {:total-events new-total
                                 :schema schema}))))

(def default-projections
  [{:projection-name "__streams__"
    :stream-name "__all__"
    :language :clojure
    :reduction (pr-str stream-fn)
    :initial-value {}}])

(defn init-projection! [proj-file]
  (read-string (slurp proj-file)))

(defn projs->keyed [m]
  (zipmap (map :projection-name m) m))

(defn absolute-path [^File f] (.getAbsolutePath f))

(defn ends-with [^String s ^String e] (.endsWith s e))

(defn starting-projections [path]
  (let [all-files (file-seq (io/file path))
        proj-files (filter #(ends-with (absolute-path %)
                                       ".edn")
                           all-files)
        projs (map #(do
                      (log/info "Loading" %)
                      (read-string (slurp %)))
                   proj-files)
        projs (map #(if (list? (:reduction %))
                      (update-in % [:reduction] pr-str)
                      %)
                   projs)]
    (vals (merge (projs->keyed default-projections)
                 (projs->keyed projs)))))
