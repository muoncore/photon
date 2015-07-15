(ns eventstore.filedb
  (:require [clojure.data.json :as json]
            [eventstore.db :as db]))

(defrecord DBFile [file-name]
  db/DB
  (db/fetch [this id] {})
  (db/delete! [this id])
  (db/delete-all! [this])
  (db/put [this data])
  (db/search [this id] [])
  (db/store [this stream-name event-name payload])
  (db/event [this id] {})
  (db/distinct-values [this k]
    ["__all__"])
  (db/lazy-events [this stream-name date]
    (with-open [rdr (clojure.java.io/reader file-name)]
      (filter (fn [ev]
                (<= date (:server-timestamp ev)))
              (map #(json/read-str % :key-fn keyword) (doall (line-seq rdr))))))
  (db/lazy-events-page [this stream-name date page] []))

