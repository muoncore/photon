(ns eventstore.rx
  (:require [clojure.tools.logging :as log]
            [clojure.core.async :refer [go-loop go <! >! chan buffer close!]]
            [eventstore.streams :as stm])
  (:import (org.reactivestreams Publisher Subscriber Subscription)))

(defn subscriber [ch]
  (reify Subscriber
    (^void onSubscribe [this ^Subscription s]
      (log/info "onSubscribe" s))
    (^void onNext [this ^Object obj]
      (log/info "onNext:::::::::::: CLIENTSIDE[" (.hashCode this) "]" obj)
      (go (>! ch obj)))
    (^void onError [this ^Throwable t]
      (log/info "onError" t)
      (.printStackTrace t))
    (^void onComplete [this]
      (close! ch)
      (log/info "onComplete"))))

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
                (log/info "::::::::::::: SUBSCRIBER" s "closing channel...")
                (.onComplete s)
                (close! ch))
              (do
                (.onNext s item)
                (recur (<! ch))))))))))


