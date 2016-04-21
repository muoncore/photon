(ns photon.current.stream-test
  (:require [photon.streams :as streams]
            [photon.db :as db]
            [muon-clojure.core :as mcs]
            [clojure.core.async :as async :refer [<!!]]
            [com.stuartsierra.component :as component]
            [photon.current.common :refer :all]
            [photon.core :as core]
            [clojure.tools.logging :as log])
  (:use midje.sweet))

(.delete (java.io.File. "/tmp/temporalphoton.log"))

(def temp-file (java.io.File/createTempFile "midje" ".json"))
(def conf {:amqp.url :local
           :microservice.name (str "photon-integration-test-" (db/uuid))
           :projections.path "/tmp/non-existing-path"
           :parallel.projections 2
           :db.backend "file"
           :file.path (.getAbsolutePath temp-file)
           :projections.port 9998
           :events.port 9999})
#_(def s (streams/new-async-stream nil d conf))
(def c
  (component/start (component/system-map
                    :database (component/using
                               (core/db-component conf) [])
                    :stream-manager (component/using
                                     (streams/stream-manager conf)
                                     [:database]))))
(def d (:driver (:database c)))
(def s (:manager (:stream-manager c)))
(defn elem-count [ch]
  (loop [elem (<!! ch) n 0]
    (if (nil? elem)
      n
      (recur (<!! ch) (inc n)))))

(fact "Empty stream has 0 elements"
      (elem-count (streams/stream->ch s {:stream-type "cold"
                                         :stream-name "__all__"})) => 0)

(fact "Clean stream + 1 event stored = 1 element"
      (do
        (db/delete-all! d)
        (db/store d {})
        (elem-count (streams/stream->ch s {:stream-type "cold"
                                           :stream-name "__all__"})) => 1))

