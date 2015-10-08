(ns photon.default-projs
  (:require [serializable.fn :as sfn]
            [clojure.java.io :as io]
            [photon.config :as conf]
            [photon.streams :as streams]))

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
    (let [ignored ["/favicon.ico" "/fonts/" "/learn.json"]
          payload (:payload n)
          user (:session_id payload)]
      (if (and (not (nil? user)) (= "get-html" (:commandName payload)))
        (let [matrix (:matrix p)
              origin (get (:user-last p) user)
              destination (:url payload)
              ignore (map #(= 0 (.indexOf destination %)) ignored)
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

(def default-projections
  [{:projection-name "__streams__"
    :stream-name "__all__"
    :language :clojure
    :reduction (pr-str stream-fn)
    :initial-value {}}
   #_{:projection-name "all-events"
    :stream-name "cambio"
    :language :clojure
    :reduction (pr-str all-events)
    :initial-value {:user-last {}
                    :matrix {}}}
   ])

(defn init-projection! [proj-file]
  (read-string (slurp proj-file)))

(defn projs->keyed [m]
  (zipmap (map :projection-name m) m))

(defn init-default-projs! [stm]
  (let [path (:projections.path conf/config)
        all-files (file-seq (io/file path))
        proj-files (filter #(.endsWith (.getAbsolutePath %)
                                       ".projection")
                           all-files)
        projs (map #(read-string (slurp %)) proj-files)
        combined (vals (merge (projs->keyed default-projections)
                              (projs->keyed projs)))]
    (dorun (map #(streams/register-query! stm %) combined))))


