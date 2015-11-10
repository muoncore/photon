(ns photon.db.redis
  (:require [photon.db :as db]
            [taoensso.carmine :as car :refer [wcar]])
  (:import (redis.embedded RedisServer)))

(def chunk-size 1000)
(def instances (atom {}))

(defn redis-conn [db-hazelcast]
  (if-let [instance (get @instances db-hazelcast)]
    instance
    (let [port (int (+ 10000 (* 1000 (Math/random))))
          rs (RedisServer. port)
          pool {:pool {} :spec {:host "127.0.0.1" :port port}}
          new-instance {:rs rs :conn pool}]
      (swap! instances assoc db-hazelcast new-instance)
      (.start rs)
      new-instance)))

(defrecord DBRedis [conf]
  db/DB
  (db/driver-name [this] "hazelcast")
  (db/fetch [this stream-name id]
    (let [conn (:conn (redis-conn this))]
      (wcar conn
            (car/zrangebyscore stream-name id (inc id) :limit 0 1))))
  (db/delete! [this id]
    (let [conn (:conn (redis-conn this))
          keys (wcar conn (car/keys "*"))]
      (wcar conn
            (dorun (map #(car/zremrangebyscore % id id) keys)))))
  (db/delete-all! [this]
    (let [conn (:conn (redis-conn this))]
      (wcar conn (car/flushall))))
  (db/put [this data]
    (let [conn (:conn (redis-conn this))]
      (wcar conn
            (car/zadd (:stream-name data) (:order-id data) data))))
  (db/search [this id]
    (let [conn (:conn (redis-conn this))
          keys (wcar conn (car/keys "*"))]
      (wcar conn
            (mapcat #(car/zrangebyscore % id id :limit 0 1) keys))))
  (db/store [this payload]
    (let [conn (:conn (redis-conn this))]
      (wcar conn
            (car/zadd (:stream-name payload)
                      (:order-id payload) payload))))
  (db/distinct-values [this k]
    ;; TODO: Decide what to do about k (it is always :stream-name)
    (let [conn (:conn (redis-conn this))]
      (println conn)
      (wcar conn (car/keys "*"))))
  (db/lazy-events [this stream-name date]
    (db/lazy-events-page this stream-name (* 1000 date) 0))
  (db/lazy-events-page [this stream-name date page]
    (let [conn (:conn (redis-conn this))
          [st-cursor vs] (wcar conn (car/zscan stream-name page))
          new-cursor (read-string st-cursor)]
      (if (= 0 new-cursor)
        []
        (let [pairs (partition 2 vs)
              valid-pairs (remove #(< (read-string (second %)) date)
                                  pairs)]
          (concat (map first valid-pairs)
                  (lazy-seq
                   (db/lazy-events-page this stream-name
                                        date new-cursor))))))))

