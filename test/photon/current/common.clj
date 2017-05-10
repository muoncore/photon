(ns photon.current.common
  (:require [muon-clojure.core :as cl]
            [photon.db :as db]
            [photon.core :as core]
            [photon.config :as conf]
            [com.stuartsierra.component :as component]
            [cheshire.core :as json]
            [buddy.hashers :as hashers]
            [photon.muon :as muon]
            [clojure.tools.logging :as log])
  (:import (java.io File)))

(defn new-file [^File s] (File. s))

(defn post-one-event
  ([m url schema-version]
   (cl/with-muon m
     (cl/request! (str "request://" url "/events")
                  {"service-id","request://chatter",
                   "event-type","chatter-event",
                   "payload",{"id","dbd6eecf-8f5c-42aa-8aa8-1b2172d53c71",
                              "text","substitutable",
                              "textanalysis",
                              {"aggregateSentiment",40,
                               "keyphrases",[{"phrase",
                                              "substitutable",
                                              "count",1}]}},
                   "schema", schema-version,
                   "stream-name","chatter"})
     #_(cl/query-event "request://photon/projection"
                       {:projection-name "count"}))) 
  ([m url]
   (post-one-event m url nil))
  ([m]
   (post-one-event m "photon-integration-test")))

(defn new-component [c uuid secret]
  (let [temp-file (.getAbsolutePath
                   (java.io.File/createTempFile "muon" ".json"))
        conf {:muon.url :local
              :rest.port 9997
              :microservice.name (str "photon-integration-test-" uuid)
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
                                     :file.path temp-file
                                     :ui.port nil}))))
        d (:driver (:database comp))]
    (log/info "Temporal file:" temp-file)
    comp))

(defn new-server
  ([uuid] (new-server uuid nil))
  ([uuid secret]
   (let [comp (new-component core/photon-system uuid secret)]
     (assoc (:muon (:muon-service comp))
            :stream-manager (:stream-manager comp))))) 

(defn new-web-server
  ([uuid] (new-web-server uuid nil))
  ([uuid secret] (new-component core/photon-component uuid secret)))

(defmacro time-limited [ms & body]
  `(let [f# (future ~@body)]
     (.get f# ~ms java.util.concurrent.TimeUnit/MILLISECONDS)))

