(ns photon.current.common
  (:require [muon-clojure.core :as cl]
            [photon.db :as db]
            [photon.core :as core]
            [photon.config :as conf]
            [com.stuartsierra.component :as component]
            [cheshire.core :as json]
            [buddy.hashers :as hashers]
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
                    filtered (remove #(= id (:order-id %)) all)]
                (db/delete-all! this)
                (dorun (map #(db/store this %) filtered))))
  (db/delete-all! [this]
                  (.delete (new-file file-name))
                  (new-file file-name))
  (db/put [this data]
          (db/delete! this (:order-id data))
          (db/store this data))
  (db/search [this id]
             (let [all (db/lazy-events this "__all__" 0)
                   filtered (filter #(= id (:order-id %)) all)]
               filtered))
  (db/store [this payload]
            (let [event-time (:event-time payload)
                  new-payload (assoc (into {} payload) :event-time
                                     (if (nil? event-time)
                                       (System/currentTimeMillis)
                                       (long event-time)))]
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
                                  (<= date (:event-time ev))))
                               (map #(json/parse-string % true)
                                    (line-seq rdr)))))
      (catch java.io.IOException e
        '())))
  (db/lazy-events-page [this stream-name date page] []))

(defn post-one-event
  ([m url schema-version]
   (cl/with-muon m
     (cl/request! (str "request://" url "/events")
                  {"service-id","request://chatter",
                   "payload",{"id","dbd6eecf-8f5c-42aa-8aa8-1b2172d53c71",
                              "text","substitutable",
                              "textanalysis",
                              {"aggregateSentiment",40,
                               "keyphrases",[{"phrase",
                                              "substitutable",
                                              "count",1}]}},
                   "schema", schema-version,
                   "stream-name","chatter",
                   "event-time",1420660080000})
     #_(cl/query-event "request://photon/projection"
                       {:projection-name "count"}))) 
  ([m url]
   (post-one-event m url nil))
  ([m]
   (post-one-event m "photon-integration-test")))

(defn new-component [c uuid secret]
  (let [temp-file (.getAbsolutePath
                   (java.io.File/createTempFile "muon" ".json"))
        conf {:amqp.url :local
              :rest.port 9997
              :microservice.name (str "photon-integration-test-" uuid)
              :projections.path "/tmp/non-existing-path"
              :parallel.projections 2
              :admin.user "test"
              :admin.pass (hashers/encrypt "test")
              :admin.secret (if (nil? secret)
                              (java.util.UUID/randomUUID)
                              secret)
              :projections.port 9998
              :events.port 9999}
        comp (component/start
              (c (merge conf/default-config
                        (merge conf {:db.backend "file"
                                     :file.path temp-file}))))
        d (:driver (:database comp))]
    (db/delete-all! d)
    comp))

(defn new-server
  ([uuid] (new-server uuid nil))
  ([uuid secret]
   (let [comp (new-component core/photon-system uuid secret)]
     (assoc (:muon (:muon-service comp)) :stream-manager
            (:stream-manager comp)))))

(defn new-web-server
  ([uuid] (new-web-server uuid nil))
  ([uuid secret] (new-component core/photon-component uuid secret)))

(defmacro time-limited [ms & body]
  `(let [f# (future ~@body)]
     (.get f# ~ms java.util.concurrent.TimeUnit/MILLISECONDS)))

