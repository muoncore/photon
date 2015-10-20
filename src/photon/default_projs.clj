(ns photon.default-projs
  (:require [serializable.fn :as sfn]
            [clojure.java.io :as io]
            [photon.config :as conf]
            [photon.streams :as streams])
  (:import (java.io File)))

(def stream-fn
  (sfn/fn [p n]
    (merge-with
     #(assoc %1 :total-events (+ (:total-events %1)
                                 (:total-events %2)))
     p
     {(:stream-name n)
      {:total-events 1}})))

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

(defn init-default-projs! [stm]
  (let [path (:projections.path conf/config)
        all-files (file-seq (io/file path))
        proj-files (filter #(ends-with (absolute-path %)
                                       ".edn")
                           all-files)
        projs (map #(read-string (slurp %)) proj-files)
        projs (map #(if (list? (:reduction %))
                      (update-in % [:reduction] pr-str)
                      %)
                   projs)
        combined (vals (merge (projs->keyed default-projections)
                              (projs->keyed projs)))]
    (dorun (map #(streams/register-query! stm %) combined))))

