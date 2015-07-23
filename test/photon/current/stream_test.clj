(ns photon.current.stream-test
  (:require [photon.streams :as streams]
            [photon.db :as db]
            [photon.filedb :as filedb]
            [clojure.core.async :as async :refer [<!!]]
            [clojure.tools.logging :as log])
  (:use midje.sweet))

(def temp-file (java.io.File/createTempFile "midje" ".json"))
(def d (filedb/->DBFile (.getAbsolutePath temp-file)))
(def s (streams/->AsyncStream d))
(defn elem-count [ch]
  (loop [elem (<!! ch) n 0]
    (if (nil? elem)
      n
      (recur (<!! ch) (inc n)))))

(fact "Empty stream has 0 elements"
      (elem-count (streams/stream s {:stream-type "cold"
                                     :stream-name "__all__"})) => 0)

(fact "Clean stream + 1 event stored = 1 element"
      (do
        (db/delete-all! d)
        (db/store d {})
        (elem-count (streams/stream s {:stream-type "cold"
                                       :stream-name "__all__"})) => 1))

