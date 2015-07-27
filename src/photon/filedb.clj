(ns photon.filedb
  (:require [clojure.data.json :as json]
            [clojure.tools.logging :as log]
            [photon.db :as db]))

(defrecord DBFile [file-name]
  db/DB
  (db/fetch [this id]
    (first (db/search this id)))
  (db/delete! [this id]
    (let [all (db/lazy-events this "__all__" 0)
          filtered (remove #(= id (:local-id %)) all)]
      (db/delete-all! this)
      (dorun (map #(db/store this %) filtered))))
  (db/delete-all! [this]
    (.delete (java.io.File. file-name))
    (java.io.File. file-name))
  (db/put [this data]
    (db/delete! this (:local-id data))
    (db/store this data))
  (db/search [this id]
    (let [all (db/lazy-events this "__all__" 0)
          filtered (filter #(= id (:local-id %)) all)]
      filtered))
  (db/store [this payload]
    (log/info "Payload" payload)
    (let [server-timestamp (:server-timestamp payload)
          new-payload (assoc (into {} payload) :server-timestamp
                             (if (nil? server-timestamp)
                               (System/currentTimeMillis)
                               (long server-timestamp)))]
      (with-open [w (clojure.java.io/writer file-name :append true)]
        (.write w (str (json/write-str new-payload) "\n")))))
  (db/event [this id]
    (db/fetch this id))
  (db/distinct-values [this k]
    (into #{} (map #(get % k)
                   (db/lazy-events this "__all__" 0))))
  (db/lazy-events [this stream-name date]
    (log/info "Retrieving events from" stream-name)
    (try
      (with-open [rdr (clojure.java.io/reader file-name)]
        (filter (fn [ev]
                  (and
                    (or (= "__all__" stream-name)
                        (= :__all__ stream-name)
                        (= stream-name (:stream-name ev)))
                    (<= date (:server-timestamp ev))))
                (map #(json/read-str % :key-fn keyword) (doall (line-seq rdr)))))
      (catch java.io.IOException e
        '())))
  (db/lazy-events-page [this stream-name date page] []))

