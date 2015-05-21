(ns eventstore.rx
  (:require [clojure.tools.logging :as log]
            [clojure.core.async :refer [go-loop go <! >! chan buffer]]
            [eventstore.streams :as stm])
  (:import (org.reactivestreams Publisher Subscriber Subscription)))

;; #'eventstore.rx/subscriber
;; #<DeferredStreamSpec reactor.core.composable.spec.DeferredStreamSpec@7f35df4b>
(defn subscriber []
  (reify Subscriber
    (^void onSubscribe [this ^Subscription s]
      (log/info "onSubscribe" s))
    (^void onNext [this ^Object obj]
      (log/info "onNext:::::::::::: CLIENTSIDE" obj))
    (^void onError [this ^Throwable t]
      (log/info "onError" t)
      (.printStackTrace t))
    (^void onComplete [this]
      (log/info "onComplete"))))

(defn publisher [stream-name]
  (reify Publisher
    (^void subscribe [this ^Subscriber s]
      (log/info "subscribe::::::::: SUBSCRIBER" s)
      (let [ch (get @stm/streams stream-name)]
        (go
          (loop [item (<! ch)]
            (.onNext s item)
            (recur (<! ch))))))))


