(ns eventstore.filedb
  (:require [clojure.data.json :as json]
            [clojure.tools.logging :as log]
            [eventstore.db :as db]))

(defrecord DBFile [file-name]
  db/DB
  (db/fetch [this id] {})
  (db/delete! [this id])
  (db/delete-all! [this])
  (db/put [this data])
  (db/search [this id] [])
  (db/store [this stream-name event-name payload]
    (log/info "Payload" payload)
    (let [server-timestamp (:server-timestamp payload)
          new-payload (assoc (into {} payload) :server-timestamp
                             (if (nil? server-timestamp)
                               (System/currentTimeMillis)
                               (long server-timestamp)))]
      (with-open [w (clojure.java.io/writer file-name :append true)]
        (.write w (str (json/write-str new-payload) "\n")))))
  (db/event [this id] {})
  (db/distinct-values [this k]
    (into #{} (map #(get % k)
                   (db/lazy-events this "__all__" 0))))
  (db/lazy-events [this stream-name date]
    (log/info "Retrieving events from" stream-name)
    (with-open [rdr (clojure.java.io/reader file-name)]
      (filter (fn [ev]
                (and
                  (or (= "__all__" stream-name)
                      (= :__all__ stream-name)
                      (= stream-name (:stream-name ev)))
                  (<= date (:server-timestamp ev))))
              (map #(json/read-str % :key-fn keyword) (doall (line-seq rdr))))))
  (db/lazy-events-page [this stream-name date page] []))

