(ns photon.cassandra
  (:require [clojure.data.json :as json]
            [clojure.tools.logging :as log]
            [photon.db :as db]
            [clojure.set :refer [rename-keys]]
            [clojurewerkz.cassaforte.client :as cc]
            [clojurewerkz.cassaforte.cql    :as cql]
            [dire.core :refer [with-handler!]])
  (:use clojurewerkz.cassaforte.query)
  (:import (java.nio.charset Charset)
           (java.nio CharBuffer)))
;; TODO: Optimise connection handling!

#_(def kspace "photon")
#_(def table "events")
(def chunk-size 100)

(def charset (Charset/forName "UTF-8"))
(def encoder (.newEncoder charset))
(def decoder (.newDecoder charset))

(def cassandra-instances (ref {}))

(def schema
  {:service_id       :varchar
   :local_id         :varchar
   :provenance       (map-type :varchar :varchar)
   :encoding         :varchar
   :server_timestamp :bigint
   :schema_url       :varchar
   :stream_name      :varchar
   :payload          :blob
   :primary-key      [:stream_name :server_timestamp :local_id]})

(defn connection [ip]
  (let [ref-conn (get @cassandra-instances ip)]
    (if (nil? ref-conn)
      (do
        (let [conn (cc/connect [ip])]
          (dosync (alter cassandra-instances assoc ip conn))
          (println (pr-str @cassandra-instances))
          conn))
      ref-conn)))

(defn clj->cassandra [cl]
  (let [rm (rename-keys cl {:stream-name :stream_name
                            :service-id :service_id
                            :server-timestamp :server_timestamp
                            :local-id :local_id
                            :schema :schema_url})]
    (assoc (assoc rm :payload (.encode encoder
                                       (CharBuffer/wrap
                                        (json/write-str (:payload cl)))))
           :server_timestamp (.longValue (:server_timestamp rm)))))

(defn cassandra->clj [cass]
  #_(println (pr-str cass))
  (let [rm (rename-keys cass {:stream_name :stream-name
                              :service_id :service-id
                              :server_timestamp :server-timestamp
                              :local_id :local-id
                              :schema_url :schema})
        p (:payload cass)]
    (if (nil? p)
      {}
      (let [old-position (.position p)
            data (.toString (.decode decoder p))
            res (assoc rm :payload (json/read-str data :key-fn keyword))]
        (.position p old-position)
        #_(println (pr-str res))
        res))))

(defrecord DBCassandra [conn-string kspace table]
  db/DB
  (db/fetch [this id]
            (first
             (map
              cassandra->clj
              (let [conn (connection conn-string)]
                (cql/use-keyspace conn kspace)
                (cql/select conn table (where [[= :uuid id]]))))))
  (db/delete! [this id]
              (let [conn (connection conn-string)]
                (cql/use-keyspace conn kspace)
                (cql/delete conn table (where [[= :uuid id]]))))
  (db/delete-all! [this]
                  (let [conn (connection conn-string)]
                    (cql/use-keyspace conn kspace)
                    (cql/drop-table conn table)))
  (db/put [this data]
          (let [conn (connection conn-string)]
            (cql/use-keyspace conn kspace)
            (cql/insert conn table (clj->cassandra data))))
  (db/search [this id]
             (map
              cassandra->clj
              (let [conn (connection conn-string)]
                (cql/use-keyspace conn kspace)
                (cql/select conn table {:uuid id}))))
  (db/store [this payload]
            (let [server-timestamp (:server-timestamp payload)
                  new-payload (assoc (into {} payload) :server-timestamp
                                     (if (nil? server-timestamp)
                                       (bigint (System/currentTimeMillis))
                                       (long server-timestamp)))
                  conn (connection conn-string)]
              (cql/use-keyspace conn kspace)
              (cql/insert conn table (clj->cassandra new-payload))))
  (db/event [this id]
            (db/fetch this id))
  (db/distinct-values [this k]
    (let [conn (connection conn-string)
          ck (get {:stream-name :stream_name
                   :service-id :service_id
                   :server-timestamp :server_timestamp
                   :local-id :local_id
                   :schema :schema_url}
                  k k)]
      (cql/use-keyspace conn kspace)
      (cql/select conn table (columns (-> ck distinct* (as "dv"))))))
  (db/lazy-events [this stream-name date]
    (log/info "Retrieving events from" stream-name)
    (map
     cassandra->clj
     (filter
      (fn [ev]
        (and
         (or (= "__all__" stream-name)
             (= :__all__ stream-name)
             (= stream-name (:stream_name ev)))
         (<= date (:server_timestamp ev))))
      (let [conn (connection conn-string)]
        (cql/use-keyspace conn kspace)
        (cql/iterate-table conn table :local_id 1)))))
  (db/lazy-events-page [this stream-name date page]))

(defn create-keyspace [c]
  (let [conn (cc/connect ["127.0.0.1"])]
    (cql/create-keyspace conn "cassaforte_keyspace"
                         (with {:replication
                                {:class "SimpleStrategy"
                                 :replication_factor 1 }}))))

(defn drop-keyspace []
  (let [conn (cc/connect ["127.0.0.1"])]
    (cql/drop-keyspace conn "cassaforte_keyspace")))

(defn test-cassandra []
  (drop-keyspace)
  (create-keyspace)
  (let [conn (cc/connect ["127.0.0.1"])]
    (cql/use-keyspace conn "cassaforte_keyspace")
    (println "Creating table...")
    (cql/create-table conn "users"
                      (column-definitions {:name :varchar
                                           :age  :int
                                           :data (map-type :varchar
                                                           :blob)
                                           :primary-key [:name]}))
    (dorun (take 10
                 (repeatedly
                  #(cc/prepared (cql/insert
                                 conn "users"
                                 {:name (.toString (java.util.UUID/randomUUID))
                                  :age (int (rand-int 100))})))))
    (println "Done storing...")
    (cql/iterate-table conn "users" :name 100)))

(defn init-table [conn table]
  (cql/create-table conn table (column-definitions schema))
  #_(cql/create-index conn table :stream_name)
  (cql/create-index conn table :service_id)
  #_(cql/create-index conn table :server_timestamp))

(with-handler! #'cql/insert
  com.datastax.driver.core.exceptions.InvalidQueryException
  (fn [e conn table data & args]
    (println "::insert::" (.getMessage e) "::" (pr-str table) "::" (pr-str data))
    (init-table conn table)
    (cql/insert conn table data)))

(with-handler! #'cql/select
  com.datastax.driver.core.exceptions.InvalidQueryException
  (fn [e conn table query & args]
    (println "::select::" (.getMessage e))
    (init-table conn table)
    []))

(with-handler! #'cql/use-keyspace
  com.datastax.driver.core.exceptions.InvalidQueryException
  (fn [_ conn k & args]
    (cql/create-keyspace conn k
                         (with {:replication
                                {:class "SimpleStrategy"
                                 :replication_factor 1}}))
    (cql/use-keyspace conn k)))

(with-handler! #'cql/drop-keyspace
  com.datastax.driver.core.exceptions.InvalidQueryException
  (fn [e & args]
    (println "Dropping non-existing table")))

(with-handler! #'cql/create-table
  com.datastax.driver.core.exceptions.AlreadyExistsException
  (fn [e & args]
    (println "Already exists")))

(with-handler! #'cql/create-keyspace
  com.datastax.driver.core.exceptions.AlreadyExistsException
  (fn [e & args]
    (println "Already exists")))

(with-handler! #'cql/create-index
  com.datastax.driver.core.exceptions.AlreadyExistsException
  (fn [e & args]
    (println "Already exists")))

(with-handler! #'cql/create-index
  com.datastax.driver.core.exceptions.InvalidQueryException
  (fn [e & args]
    (println "Already exists")))

;; TODO: Move to tests
#_(let [all (test-cassandra)]
  (loop [elem (first all) s (rest all) i 0]
    (if (or (nil? elem) (empty? s))
      (println elem)
      (do
        (println i)
        (println elem)
        (recur (first s) (rest s) (inc i))))))

#_(let [conn (cc/connect ["127.0.0.1"])]
  (cql/use-keyspace conn :photon)
  (cql/create-index conn :events :stream_name)
  (cql/create-index conn :events :service_id)
  (cql/create-index conn :events :server_timestamp))

#_(let [conn (cc/connect ["127.0.0.1"])]
  (cql/drop-keyspace conn "photon"))
#_(let [c (->DBCassandra "127.0.0.1" "photon" "events")]
  (db/delete-all! c)
  (db/fetch c "hello")
  (db/delete! c "hello")
  (db/put c {:sender           "varchar"
             :receiver         "varchar"
             :uuid             "varchar"
             :in-reply-to      "varchar"
             :server-timestamp (System/currentTimeMillis)
             :schema_url       "varchar"
             :protocol         "varchar"
             :stream-name      "varchar"
             :encoding         "varchar"
             :payload          {:test :ok}})
  (db/fetch c "varchar")
  (db/search c "hello")
  (println (db/lazy-events c "varchar" 0)))


