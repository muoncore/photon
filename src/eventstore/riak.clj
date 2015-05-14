(ns eventstore.riak
  (:require [clj-http.client :as client])
  (:require [clojure.data.json :as json])
  (:require [clj-time.core :as time])
  (:require [clj-time.format :as time-format])
)


(def eventstore "eventstore")
(def bucket "rxriak-events-v1")

(defn datetime-old [] (str (.. (java.util.Date.) getTime))  )


(defn get-current-iso-8601-date-old
  "Returns current ISO 8601 compliant date."
  []
  (let [current-date-time (time/to-time-zone (time/now) (time/default-time-zone))]
    (time-format/unparse
      (time-format/with-zone (time-format/formatters :date-time-no-ms)
                             (.getZone current-date-time))
      current-date-time)))


(defn get-current-iso-8601-date
  "Returns current ISO 8601 compliant date."
  [] (.format (java.text.SimpleDateFormat. "yyyy-MM-dd'T'HH:mm:ss'Z'") (.getTime (java.util.Calendar/getInstance))))



(defn datetime [] (str (get-current-iso-8601-date) )  )

(defn uuid [] (str (java.util.UUID/randomUUID)))

(defn riak-url [id] (str "http://riak1.cistechfutures.net:8098/types/" eventstore "/buckets/" bucket "/keys/" id) )

(defn get [id] (print (:body (client/get (riak-url id))) )  )

(defn put [data]
  (def id (uuid))
  (def wrapper (json/write-str {:id_s id :created_dt  (datetime) :data data}))
  (print (str "PUT "  (riak-url id) "\n") )
  (print "BODY: " wrapper "\n")
  (client/put (riak-url id) {:body wrapper :content-type :json})
)


(defn search [bucket id] (print (:body (client/get (riak-url id))) ) )


