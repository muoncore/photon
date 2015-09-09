(ns photon.default-projs
  (:require [serializable.fn :as sfn]
            [photon.streams :as streams]))

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

(defn init-default-projs! [stm]
  (dorun (map #(apply streams/register-query!
                      stm
                      (vals
                       (select-keys % [:projection-name
                                       :stream-name :language
                                       :reduction :initial-value])))
              default-projections)))

