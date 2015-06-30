(ns eventstore.riak
  (:require [clj-http.client :as client]
            [clojure.data.json :as json]
            [clj-time.core :as time]
            [clojure.tools.logging :as log]
            [clj-time.format :as time-format]))

(import (io Riak))

(defn jo->map [jo]
  (let [ks (iterator-seq (.keys jo))
        obj (zipmap (map keyword ks) (map #(.get jo %) ks))]
    (assoc obj :payload (json/read-str
                          (clojure.string/replace (:payload_s obj)
                                                  #"'" "\"")
                          :key-fn keyword))))

(defn get-current-iso-8601-date
  "Returns current ISO 8601 compliant date."
  []
  (.format (java.text.SimpleDateFormat. "yyyy-MM-dd'T'HH:mm:ss'Z'")
           (.getTime (java.util.Calendar/getInstance))))

(defn datetime [] (str (get-current-iso-8601-date)))

(defn uuid [] (str (java.util.UUID/randomUUID)))

(def eventstore "eventstore")
(def s-bucket "rxriak-events-v1")

(def s-nodes ["riak1.cistechfutures.net"
              "riak2.cistechfutures.net"
              "riak3.cistechfutures.net"])

(defprotocol DB
  (bucket-url [this])
  (riak-url [this id])
  (fetch [this id])
  (delete! [this id])
  (delete-all! [this])
  (put [this data])
  (search [this id])
  (store [this stream-name event-name payload])
  (event [this id])
  (lazy-events [this stream-name date])
  (lazy-events-page [this stream-name date page]))

(defrecord RiakDB [riak nodes bucket]
  DB
  (bucket-url [_]
    (str "http://riak1.cistechfutures.net:8098/types/"
         eventstore "/buckets/" bucket "/keys"))
  (riak-url [this id]
    (str (bucket-url this) "/" id))
  (fetch [this id]
    (:body (client/get (riak-url this id))))
  (delete! [this id]
    (log/info "Deleting" id)
    (client/delete (riak-url this id)))
  (delete-all! [this]
    (let [body (:body (client/get (str (bucket-url this) "?keys=true")))
          js (json/read-str body :key-fn keyword)
          k (first (:keys js))]
      (dorun (map #(delete! this %) (:keys js)))))
  (put [this data]
    (let [id (uuid)
          wrapper (json/write-str {:id_s id
                                   :created_dt (datetime)
                                   :data_s (json/write-str data)})]
      (print (str "PUT "  (riak-url this id) "\n"))
      (print "BODY: " wrapper "\n")
      (client/put (riak-url this id) {:body wrapper :content-type :json})))
  (search [this id] (:body (client/get (riak-url this id))))
  (store [this stream-name event-name payload]
    (.persist riak stream-name event-name (json/write-str payload)))
  (event [this id]
    (.getEvent riak id))
  (lazy-events [this stream-name date]
    (lazy-events-page this stream-name date 1)) 
  (lazy-events-page [this stream-name date page]
    (let [l-date (if (string? date) (read-string date) date)
          res (map #(clojure.walk/keywordize-keys (into {} %))
                   (into [] (.eventsSince riak l-date stream-name page)))]
      (if (< (.size res) 1)
        []
        (concat res
                (lazy-seq (lazy-events-page this stream-name l-date (inc page))))))))

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



