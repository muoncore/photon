(ns eventstore.db
  (:require [clojure.data.json :as json]))

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

(defprotocol DB
  (fetch [this id])
  (delete! [this id])
  (delete-all! [this])
  (put [this data])
  (search [this id])
  (store [this stream-name event-name payload])
  (event [this id])
  (distinct-values [this k])
  (lazy-events [this stream-name date])
  (lazy-events-page [this stream-name date page]))

