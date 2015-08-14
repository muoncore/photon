(ns photon.api
  (:require [photon.streams :as streams]
            [clojure.tools.logging :as log]
            [clojure.core.async :as async]))

(defn stream [stm stream-name]
  {:results
   (async/<!!
     (async/reduce (fn [prev n] (concat prev [n])) []
                   (streams/stream stm {"from" "0"
                                        "stream-name" stream-name
                                        "stream-type" "cold"})))})

