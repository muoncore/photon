(ns eventstore.riak
  (:require [clj-http.client :as client]
            [clojure.data.json :as json]
            [clj-time.core :as time]
            [clj-time.format :as time-format]))

(import (io Riak))

(def eventstore "eventstore")
(def bucket "rxriak-events-v1")
(def nodes ["riak1.cistechfutures.net"
            "riak2.cistechfutures.net"
            "riak3.cistechfutures.net"])
(def riak (Riak. "rxriak-events-v1" "eventstore" (into-array String nodes)))

(defn get-current-iso-8601-date
  "Returns current ISO 8601 compliant date."
  []
  (.format (java.text.SimpleDateFormat. "yyyy-MM-dd'T'HH:mm:ss'Z'")
           (.getTime (java.util.Calendar/getInstance))))

(defn datetime [] (str (get-current-iso-8601-date)))

(defn uuid [] (str (java.util.UUID/randomUUID)))

(defn riak-url [id] (str "http://riak1.cistechfutures.net:8098/types/"
                         eventstore "/buckets/" bucket "/keys/" id))

(defn fetch [id] (print (:body (client/get (riak-url id)))))

(defn put [data]
  (let [id (uuid)
        wrapper (json/write-str {:id_s id
                                :created_dt (datetime)
                                :data_s (json/write-str data)})]
    (print (str "PUT "  (riak-url id) "\n"))
    (print "BODY: " wrapper "\n")
    (client/put (riak-url id) {:body wrapper :content-type :json})))

(defn search [bucket id] (print (:body (client/get (riak-url id))))) 

(defn jo->map [jo]
  (let [ks (iterator-seq (.keys jo))
        obj (zipmap (map keyword ks) (map #(.get jo %) ks))]
    (assoc obj :payload (json/read-str
                          (clojure.string/replace (:payload_s obj)
                                                  #"'" "\"")
                          :key-fn keyword))))

(defn store [stream-name event-name payload]
  (.persist riak stream-name event-name (json/write-str payload)))

(defn event [id]
  (.getEvent riak id))

(defn lazy-events
  ([stream-name date-string]
   (lazy-events stream-name date-string 1))
  ([stream-name date-string page]
   (let [res (.eventsSince riak (.toDate riak date-string) stream-name page)]
     (if (< (.size res) 1)
       '()
       (concat res (lazy-seq (lazy-events stream-name date-string (inc page))))))))

#_(jo->map (event (store "cambio" "create-user"
                       {:username "sergio alvarez"
                        :uid "sal49"
                        :job_title "Software Developer"})))

#_(count (lazy-events "cambio" "2015-05-14T10:00:00Z"))



