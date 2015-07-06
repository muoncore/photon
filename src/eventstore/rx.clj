(ns eventstore.rx
  (:require [clojure.tools.logging :as log]
            [clojure.core.async :refer [go-loop go <! >! chan buffer close!]]
            [eventstore.streams :as stm])
  (:import (org.reactivestreams Publisher Subscriber Subscription)))

(defn publisher [stm params]
  (log/info (str "::::::::::::::::::::::::::::::: " (pr-str params)))
  (reify Publisher
    (^void subscribe [this ^Subscriber s]
      (log/info "subscribe::::::::: SUBSCRIBER" s)
      (let [ch (stm/stream stm params)]
        (go
          (loop [item (<! ch)]
            (if (nil? item)
              (do
                (log/debug "::::::::::::: SUBSCRIBER" s "closing channel...")
                (.onComplete s)
                (close! ch))
              (do
                (.onNext s item)
                (recur (<! ch))))))))))


