(ns photon.current.integration-test
  (:require [muon-clojure.client :as cl]
            [clojure.tools.logging :as log]
            [clojure.core.async :as async :refer [go-loop <! <!!]]
            [photon.config :as conf]
            [photon.db :as db]
            [photon.muon :as muon]
            [photon.current.common :refer :all])
  (:use midje.sweet))

(set! (. io.muoncore.channel.async.StandardAsyncChannel echoOut) true)

(defn elem-count [ch]
  (loop [elem (<!! ch) n 0]
    (if (nil? elem)
      n
      (recur (<!! ch) (inc n)))))

(let [uuid (java.util.UUID/randomUUID)
      ms (new-server uuid)
      m (cl/muon-client :local "client-test"
                        "client" "test")
      _ (Thread/sleep 5000)
      res (post-one-event m (str "photon-integration-test-" uuid))
      res (post-one-event m (str "photon-integration-test-" uuid))
      _ (Thread/sleep 5000)
      ch (cl/with-muon m
           (cl/subscribe! (str "stream://photon-integration-test-"
                               uuid "/stream")
                          :stream-name "__all__"
                          :stream-type "cold"
                          :from 0))]
  (fact "Post works correctly" res => {:correct true})
  (fact "Two events on stream" (elem-count ch) => 2)
  (dorun (take 9 (repeatedly
                   (fn []
                      (post-one-event
                      m (str "photon-integration-test-" uuid))))))
  (let [ch (cl/with-muon m
             (cl/subscribe! (str "stream://photon-integration-test-"
                                 uuid "/stream")
                            :stream-name "__all__"
                            :stream-type "cold"
                            :from 0))]
    (fact "11 events on stream" (elem-count ch) => 11))
  (dorun (take 100 (repeatedly
                     (fn []
                       (post-one-event
                        m (str "photon-integration-test-" uuid))))))
  (let [ch (cl/with-muon m
             (cl/subscribe! (str "stream://photon-integration-test-"
                                 uuid "/stream")
                            :stream-name "__all__"
                            :stream-type "cold"
                            :from 0))]
    (fact "111 events on stream" (elem-count ch) => 111))
  #_(dorun (take 10000 (repeatedly
                      (fn []
                        (post-one-event
                         m (str "photon-integration-test-" uuid))))))
  #_(let [ch (cl/with-muon m
               (cl/subscribe! (str "stream://photon-integration-test-"
                                   uuid "/stream")
                              :stream-name "__all__"
                              :stream-type "cold"
                              :from 0))]
    (fact "11011 events on stream" (elem-count ch) => 11011)))

