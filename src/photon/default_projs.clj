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

(def all-events
  (sfn/fn [p n]
    (let [hash-amount 100
          ignored ["/favicon.ico" "/fonts/" "/learn.json"
                   "/images/learn.json" "/apple-touch-icon.png"
                   "/browserconfig.xml"
                   "/views-react//remarkable-react.jsx"
                   "/apple-touch-icon-precomposed.png"]
          payload (:payload n)
          user-agent (:user-agent (:headers payload))
          starts-with (fn [^String s ^String b] (.startsWith s b))
          user (mod (hash (:session_id payload)) hash-amount)]
      (if (and (not (nil? user)) (= "get-html" (:commandName payload))
               (not (nil? user-agent))
               (not (starts-with user-agent "Apache")))
        (let [matrix (:matrix p)
              origin (get (:user-last p) user)
              destination (:url payload)
              index-of (fn [^String s ^String b] (.indexOf s b))
              ignore (map #(= 0 (index-of destination %)) ignored)
              ignore (reduce #(or %1 %2) false ignore)]
          (if ignore
            p
            (let [new-matrix
                  (if (nil? origin)
                    matrix
                    (let [by-origin (get matrix origin {})
                          new-d (merge-with + by-origin {destination 1})]
                      (assoc matrix origin new-d)))]
              {:matrix new-matrix
               :user-last (assoc (:user-last p) user destination)})))
        p))))

(def browser-count
  (sfn/fn [p n]
    (let [hash-amount 100
          payload (:payload n)
          session-id (:session_id payload)
          user-agent (:user-agent (:headers payload))
          index-of (fn [^String s ^String b] (.indexOf s b))
          user (:user payload)]
      (if (or (nil? session-id) (nil? user-agent)
              (= 0 (index-of user-agent "curl"))
              (= 0 (index-of user-agent "node-superagent")))
        p
        (assoc-in p [user-agent session-id :user] user)))))

(def default-projections
  [{:projection-name "__streams__"
    :stream-name "__all__"
    :language :clojure
    :reduction (pr-str stream-fn)
    :initial-value {}}
   {:projection-name "__streams2__"
    :stream-name "__all__"
    :language :clojure
    :reduction (pr-str stream-fn)
    :initial-value {}}
   {:projection-name "__streams3__"
    :stream-name "__all__"
    :language :clojure
    :reduction (pr-str stream-fn)
    :initial-value {}}
   {:projection-name "__streams4__"
    :stream-name "__all__"
    :language :clojure
    :reduction (pr-str stream-fn)
    :initial-value {}}
   {:projection-name "all-events"
      :stream-name "cambio"
      :language :clojure
      :reduction (pr-str all-events)
      :initial-value {:user-last {}
                      :matrix {}}}
   {:projection-name "browser-count"
      :stream-name "cambio"
      :language :clojure
      :reduction (pr-str all-events)
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
                                       ".projection")
                           all-files)
        projs (map #(read-string (slurp %)) proj-files)
        combined (vals (merge (projs->keyed default-projections)
                              (projs->keyed projs)))]
    (dorun (map #(streams/register-query! stm %) combined))))


