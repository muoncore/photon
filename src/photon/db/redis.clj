(ns photon.db.redis
  (:require [photon.db :as db]
            [taoensso.carmine :as car :refer [wcar]])
  (:import (redis.embedded RedisServer)))

(def chunk-size 1000)
(def instances (ref {}))
(def streams (ref {}))

(defn redis-conn [db-hazelcast]
  (dosync
   (if-let [instance (get @instances db-hazelcast)]
     instance
     (let [port (int (+ 10000 (* 1000 (Math/random))))
           rs (RedisServer. port)
           pool {:pool {} :spec {:host "127.0.0.1" :port port}}]
       (dosync (alter instances
                      assoc db-hazelcast {:rs rs :conn pool}))))))

(defrecord DBHazelcast [conf]
  db/DB
  (db/driver-name [this] "hazelcast")
  (db/fetch [this stream-name id]
    (let [conn (:conn (redis-conn this))]
      (wcar conn
            (car/zrangebyscore stream-name
                               id (inc id) :limit 0 1))))
  (db/delete! [this id]
    (let [conn (:conn (redis-conn this))]
      (wcar conn
            #_(car/zremrangebyscore stream-name
                                  id (inc id) :limit 0 1))))
  (db/delete-all! [this]
    )
  (db/put [this data]
    
    )
  (db/search [this id]
    )
  (db/store [this payload]
    )
  (db/distinct-values [this k]
    )
  (db/lazy-events [this stream-name date]
    )
  (db/lazy-events-page [this stream-name date page]
    ))

(defn event []
  {:stream-name "cambio"
   :payload {:test :ok}
   :service-id "muon://dummy"
   :local-id (java.util.UUID/randomUUID)
   :server-timestamp (System/currentTimeMillis)})

#_(let [port (int (+ 10000 (* 1000 (Math/random))))
      rs (RedisServer. port)]
  (.start rs)
  (let [server1-conn {:pool {} :spec {:host "127.0.0.1" :port port}}
        res (wcar server1-conn
                  (dorun (take 100000 (repeatedly #(let [ev (event)]
                                                    (car/zadd :cambio (:server-timestamp ev) ev))))))]
    #_(time (let [res (loop [cursor 0 all-vs []]
                      (let [[st-cursor vs] (wcar server1-conn
                                                 (car/zscan :cambio cursor))
                            new-cursor (read-string st-cursor)
                            new-vs (doall (concat all-vs vs))]
                        (if (= 0 new-cursor)
                          new-vs
                          (recur new-cursor new-vs))))]
              (.stop rs)       
              (count (filter map? res))))
    (let [res (wcar server1-conn (car/zrangebyscore :cambio 0 (System/currentTimeMillis) :limit 0 1))]
      (.stop rs)
      res)
    (let [res (wcar server1-conn (car/keys "*mbio"))]
      (.stop rs)
      res)))

