(ns photon.current.stream-test
  (:require [photon.streams :as streams]
            [photon.db :as db]
            [muon-clojure.server :as mcs]
            [clojure.core.async :as async :refer [<!!]]
            [photon.current.common :refer :all]
            [clojure.tools.logging :as log])
  (:use midje.sweet))

(def temp-file (java.io.File/createTempFile "midje" ".json"))
(def d (->TempDBFile (.getAbsolutePath temp-file)))
(def conf {:projections.port 9998
           :events.port 9999
           :parallel.projections 2})
(def s (streams/new-async-stream nil d conf))
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

