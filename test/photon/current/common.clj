(ns photon.current.common
  (:require [muon-clojure.client :as cl]
            [photon.filedb :as filedb]
            [photon.muon :as muon]))

(defn post-one-event
  ([m url]
   (cl/with-muon m
     (cl/post-event (str "muon://" url "/events")
                    {"service-id","muon://chatter",
                     "local-id","5198cea7-b260-4bb7-963d-f102132032fe",
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
        d (filedb/->DBFile temp-file)
        ms (muon/start-server! (str "photon-integration-test-" uuid) d)]
    ms))

(defmacro time-limited [ms & body]
  `(let [f# (future ~@body)]
     (.get f# ~ms java.util.concurrent.TimeUnit/MILLISECONDS)))
