(ns photon.db.hazelcast
  (:require [chazel :refer :all]
            [photon.db :as db])
  (:import [photon.java MapProxy EntryComparator]
           [java.util Comparator]
           [com.hazelcast.query Predicates PagingPredicate]
           [com.hazelcast.instance HazelcastInstanceProxy]))

(def chunk-size 1000)
(def map-comparator (EntryComparator.))
(def instances (ref {}))
(def streams (ref {}))

(defn kv-store [instance]
  (let [mm (get @instances instance)]
    (if (nil? mm)
      (do
        (cluster-of 3)
        (let [new-mm (hz-map :photon)]
          (dosync (alter instances assoc instance new-mm))
          (add-index new-mm "orderId" true)
          (add-index new-mm "streamName" false)
          (add-index new-mm "serverTimestamp" true)
          new-mm))
      mm)))

(defn stream-set [mm]
  (let [ms (get @streams mm)]
    (if (nil? ms)
      (let [new-ms (.getSet (hz-instance) "streams")]
        (dosync (alter streams assoc mm new-ms))
        new-ms)
      ms)))

(defrecord DBHazelcast [conf]
  db/DB
  (db/driver-name [this] "hazelcast")
  (db/fetch [this stream-name id]
    (.getMap (cget (kv-store this) id)))
  (db/delete! [this id]
    (remove! (kv-store this) id))
  (db/delete-all! [this]
    (let [instance (kv-store this)
          ks (.keySet instance)]
      (dorun (map #(remove! instance %) ks))))
  (db/put [this data]
    (.add (stream-set (kv-store this)) (:stream-name data))
    (put! (kv-store this) (:order-id data) (MapProxy. data)))
  (db/search [this id]
    [(db/fetch this nil id)])
  (db/store [this payload]
    (db/put this payload))
  (db/distinct-values [this k]
    (if (= k :stream-name)
      (seq (.toArray (stream-set (kv-store this))))
      (throw (UnsupportedOperationException. (pr-str k)))))
  (db/lazy-events [this stream-name date]
    (let [query (if (or (= stream-name "__all__")
                        (= stream-name :__all__))
                  (Predicates/greaterEqual "serverTimestamp" date)
                  (Predicates/and
                   (Predicates/greaterEqual "serverTimestamp" date)
                   (Predicates/equal "streamName" stream-name)))
          predicate (PagingPredicate. query
                                      map-comparator chunk-size)]
      (db/lazy-events-page this stream-name date predicate)))
  (db/lazy-events-page [this stream-name date page]
    (let [vs (.values (kv-store this) page)]
      (if (empty? vs)
        []
        (do
          (.nextPage page)
          (concat (map #(.getMap %) vs)
                  (lazy-seq (db/lazy-events-page
                             this stream-name date page))))))))


