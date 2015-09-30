(ns photon.stats.db-comparison
  (:require [muon-clojure.client :as cl]
            [photon.cassandra :as cassandra]
            [photon.config :as conf]
            [photon.db :as db]
            [clojure.core.async :refer [<!!]]
            [photon.filedb :as filedb]
            [photon.muon :as muon]))

(def dbs {"file" (filedb/->DBFile "/tmp/benchmark.txt")
          "cassandra" (cassandra/->DBCassandra
                       "127.0.0.1" "photon"
                       (first (clojure.string/split
                               (.toString (java.util.UUID/randomUUID))
                               #"-")))})
(def amounts [1 5 10 50 100 500 1000 5000 10000])
 
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

(defn new-server [uuid d]
  (let [temp-file (.getAbsolutePath
                   (java.io.File/createTempFile "muon" ".json"))
        ms (muon/start-server! (str "photon-integration-test-" uuid) d)]
    (db/delete-all! d)
    ms))

(defmacro bench
  "Times the execution of forms, discarding their output and returning
  a long in nanoseconds."
  ([& forms]
   `(let [start# (System/currentTimeMillis)]
      ~@forms
      (- (System/currentTimeMillis) start#))))

(defn benchmark []
  (let [client (cl/muon-client (:amqp.url conf/config) "client-test"
                               "client" "test")
        servers (zipmap
                 (keys dbs) (map #(new-server (key %) (val %)) dbs))
        fn-write (fn [k-db]
                   (post-one-event
                    client (str "photon-integration-test-" k-db))
                   nil)
        fn-read (fn [k-db]
                  (let [ch (cl/with-muon client
                             (cl/stream-subscription
                              (str "muon://photon-integration-test-"
                                   k-db "/stream")
                              :stream-name "__all__"
                              :stream-type "cold"
                              :from 0))]
                    (loop [elem (<!! ch)]
                      (if (not (nil? elem))
                        (recur (<!! ch))))))
        ts (mapcat (fn [amount]
                     (map (fn [db-server]
                            (let [k-db (key db-server)
                                  server (val db-server)
                                  tw (bench
                                      (dorun (take amount
                                                   (repeatedly
                                                    #(fn-write k-db)))))]
                              (Thread/sleep 5000)
                              (let [tr (bench (fn-read k-db))]
                                {:db k-db
                                 :amount amount
                                 :t-write tw
                                 :t-read tr})))
                          servers))
                   amounts)]
    (spit "/tmp/bench-results.txt" (pr-str ts) :append false)
    ts))


