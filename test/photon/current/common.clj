(ns photon.current.common
  (:require [muon-clojure.client :as cl]
            [photon.db :as db]
            [cheshire.core :as json]
            [photon.muon :as muon])
  (:import (java.io File)))

(defn new-file [^File s] (File. s))

(defrecord TempDBFile [file-name]
  db/DB
  (db/driver-name [this] "file")
  (db/fetch [this stream-name order-id]
            (first (db/search this order-id)))
  (db/delete! [this id]
              (let [all (db/lazy-events this "__all__" 0)
                    filtered (remove #(= id (:local-id %)) all)]
                (db/delete-all! this)
                (dorun (map #(db/store this %) filtered))))
  (db/delete-all! [this]
                  (.delete (new-file file-name))
                  (new-file file-name))
  (db/put [this data]
          (db/delete! this (:local-id data))
          (db/store this data))
  (db/search [this id]
             (let [all (db/lazy-events this "__all__" 0)
                   filtered (filter #(= id (:local-id %)) all)]
               filtered))
  (db/store [this payload]
            (let [server-timestamp (:server-timestamp payload)
                  new-payload (assoc (into {} payload) :server-timestamp
                                     (if (nil? server-timestamp)
                                       (System/currentTimeMillis)
                                       (long server-timestamp)))]
              (with-open [w (clojure.java.io/writer file-name :append true)]
                (.write w (str (json/generate-string new-payload) "\n")))))
  (db/distinct-values [this k]
                      (into #{} (map #(get % k)
                                     (db/lazy-events this "__all__" 0))))
  (db/lazy-events [this stream-name date]
                  (try
                    (with-open [rdr (clojure.java.io/reader file-name)]
                      (doall
                       (filter (fn [ev]
                                 (and
                                  (or (= "__all__" stream-name)
                                      (= :__all__ stream-name)
                                      (= stream-name (:stream-name ev)))
                                  (<= date (:server-timestamp ev))))
                               (map #(json/parse-string % true)
                                    (line-seq rdr)))))
      (catch java.io.IOException e
        '())))
  (db/lazy-events-page [this stream-name date page] []))


(defn post-one-event
  ([m url]
   (cl/with-muon m
     (cl/post-event (str "muon://" url "/events")
                    {"service-id","muon://chatter",
                     "local-id", (java.util.UUID/randomUUID),
                     "payload",{"id","dbd6eecf-8f5c-42aa-8aa8-1b2172d53c71",
                                "text","substitutable",
                                "textanalysis",
                                {"aggregateSentiment",40,
                                 "keyphrases",[{"phrase",
                                                "substitutable",
                                                "count",1}]}},
                     "stream-name","chatter",
                     "server-timestamp",1420660080000})
     #_(cl/query-event "muon://photon/projection"
                       {:projection-name "count"}))) 
  ([m]
   (post-one-event m "photon-integration-test")))

(defn new-server [uuid]
  (let [temp-file (.getAbsolutePath
                   (java.io.File/createTempFile "muon" ".json"))
        d (->TempDBFile temp-file)
        #_#_d (cassandra/->DBCassandra
           "127.0.0.1" "photon"
           (first (clojure.string/split
                   (.toString (java.util.UUID/randomUUID)) #"-")))
        ms (muon/start-server! "amqp://localhost"
                               (str "photon-integration-test-" uuid)
                               d 2 "/tmp/non-existing-path")]
    (db/delete-all! d)
    ms))

(defmacro time-limited [ms & body]
  `(let [f# (future ~@body)]
     (.get f# ~ms java.util.concurrent.TimeUnit/MILLISECONDS)))

