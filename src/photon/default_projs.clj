(ns photon.default-projs
  (:require [serializable.fn :as sfn]
            [clojure.java.io :as io]
            [clojure.tools.logging :as log]
            [clj-schema-inspector.core :as csi])
  (:import (java.io File)))

(def stream-fn
  (sfn/fn [p n]
    (let [ps (get p (:stream-name n) {})
          schema-version (if-let [v (get n :schema)] v :__unversioned__)
          old-total (get ps :total-events 0)
          old-local-total (get-in ps [:schemas schema-version
                                      :total-events]
                                  0)
          new-total (inc old-total)
          new-local-total (inc old-local-total)
          old-schema (get-in ps [:schemas schema-version :schema] {})
          schema (if (or (< old-local-total 10) (< (rand) 0.02))
                   (clj-schema-inspector.core/serialise
                    (clj-schema-inspector.core/add-map
                     old-schema n))
                   old-schema)]
      (assoc-in (assoc-in p [(:stream-name n) :total-events] new-total)
                [(:stream-name n) :schemas schema-version]
                {:total-events new-local-total :schema schema}))))

(def security-fn
  (sfn/fn [p {:keys [event-type payload] :as n}]
    (let [new-p (condp = event-type
                  "create-app"
                  (assoc-in p [(:username payload)
                               (:client-id payload)] payload)
                  "delete-app"
                  (assoc p (:username payload)
                         (dissoc (get p (:username payload))
                                 (:client-id payload)))
                  p)]
      new-p)))
 
(def default-projections
  [{:projection-name "__streams__"
    :stream-name "__all__"
    :language :clojure
    :reduction (pr-str stream-fn)
    :initial-value (pr-str {})}
   {:projection-name "__security-state__"
    :stream-name "__security__"
    :language :clojure
    :reduction (pr-str security-fn)
    :initial-value (pr-str {})}])

(defn projs->keyed [m]
  (zipmap (map :projection-name m) m))

(defn starting-projections []
  (vals (projs->keyed default-projections)))
