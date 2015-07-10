(ns eventstore.riak
  (:require [clj-http.client :as client]
            [clojure.data.json :as json]
            [clj-time.core :as time]
            [eventstore.db :as db]
            [clojure.tools.logging :as log]
            [clj-time.format :as time-format]))

(import (io Riak))

(def eventstore "eventstore")
(def s-bucket "rxriak-events-v1")

(def s-nodes ["riak1.cistechfutures.net"
              "riak2.cistechfutures.net"
              "riak3.cistechfutures.net"])

(defn bucket-url [rdb]
  (str "http://riak1.cistechfutures.net:8098/types/"
       eventstore "/buckets/" (:bucket rdb) "/keys"))
(defn riak-url [rdb id]
  (str (bucket-url rdb) "/" id))

(defrecord RiakDB [riak nodes bucket]
  db/DB
  (fetch [this id]
    (:body (client/get (riak-url this id))))
  (delete! [this id]
    (log/info "Deleting" id)
    (client/delete (riak-url this id)))
  (delete-all! [this]
    (let [body (:body (client/get (str (bucket-url this) "?keys=true")))
          js (json/read-str body :key-fn keyword)
          k (first (:keys js))]
      (dorun (map #(try (db/delete! this %) (catch Exception e (log/debug (.getMessage e)))) (:keys js)))))
  (put [this data]
    (let [id (db/uuid)
          wrapper (json/write-str {:id_s id
                                   :created_dt (db/datetime)
                                   :data_s (json/write-str data)})]
      (print (str "PUT "  (riak-url this id) "\n"))
      (print "BODY: " wrapper "\n")
      (client/put (riak-url this id) {:body wrapper :content-type :json})))
  (search [this id] (:body (client/get (riak-url this id))))
  (store [this stream-name event-name payload]
    (.persist riak stream-name event-name (json/write-str payload)))
  (event [this id]
    (.getEvent riak id))
  (distinct-values [this k] ["events"])
  (lazy-events [this stream-name date]
    (db/lazy-events-page this stream-name date 1)) 
  (lazy-events-page [this stream-name date page]
    (let [l-date (if (string? date) (read-string date) date)
          res (map #(clojure.walk/keywordize-keys (into {} %))
                   (into [] (.eventsSince riak l-date stream-name page)))]
      (if (< (.size res) 1)
        []
        (concat res
                (lazy-seq (db/lazy-events-page this stream-name l-date (inc page))))))))

(defn m-riak
  ([nodes bucket]
   (->RiakDB (Riak. bucket "eventstore" (into-array String nodes))
             nodes bucket))
  ([bucket]
   (m-riak s-nodes bucket)))

(def riak (memoize m-riak))

#_(jo->map (event (store "events" "create-user"
                       {:username "sergio alvarez"
                        :uid "sal49"
                        :job_title "Software Developer"})))

#_(count (lazy-events (- (System/currentTimeMillis) 60000)))



