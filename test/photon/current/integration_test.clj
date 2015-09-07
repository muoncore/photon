(ns photon.current.integration-test
  (:require [muon-clojure.client :as cl]
            [clojure.tools.logging :as log]
            [clojure.core.async :as async :refer [go-loop <! <!!]]
            [photon.config :as conf]
            [photon.filedb :as filedb]
            [photon.muon :as muon])
  (:use midje.sweet))

(defn elem-count [ch]
  (loop [elem (<!! ch) n 0]
    (if (nil? elem)
      n
      (recur (<!! ch) (inc n)))))

(let [d (filedb/->DBFile (java.io.File/createTempFile "muon" ".json"))
      ms (muon/start-server! "test-service" d)
      m (cl/muon-client (:amqp.url conf/config) "client-test" "client" "test")
      res (cl/with-muon m
            (cl/post-event "muon://test-service/events"
                           {"service-id","muon://chatter",
                            "local-id","5198cea7-b260-4bb7-963d-f102132032fe",
                            "payload",{"id","dbd6eecf-8f5c-42aa-8aa8-1b2172d53c71","text","substitutable","textanalysis",{"aggregateSentiment",40,"keyphrases",[{"phrase","substitutable","count",1}]}},"stream-name","chatter","server-timestamp",1420660080000})
            #_(cl/query-event "muon://photon/projection"
                              {:projection-name "count"}))
      _ (Thread/sleep 2000)
      ch (cl/with-muon m
           (cl/stream-subscription "muon://test-service/stream"
                                   :stream-name "__all__"
                                   :stream-type "cold"
                                   :from 0))]
  (fact "Post works correctly" res => {:correct "true"})
  (fact "One event on stream" (elem-count ch) => 1))

#_(let [m (cl/muon-client amazon-url "client-test" "client" "test")
        #_#_db (filedb/->DBFile (clojure.java.io/resource "events.json"))
        #_#_ph (muon/start-server! db amazon-url)]
    #_(let [ch (cl/with-muon m
                 (cl/stream-subscription "muon://photon/stream"
                                         :stream-name "__all__"
                                         :stream-type "hot"))]
        (go-loop [elem (<! ch)]
                 (log/info ":::::::::::::::::::::::::::::: INPUT :::::::  " (pr-str elem))
                 (recur (<! ch))))
    (let [res (cl/with-muon m
                #_(cl/post-event "muon://photon/events" "chatter"
                                 {"service-id","muon,//chatter","local-id","5198cea7-b260-4bb7-963d-f102132032fe","payload",{"id","dbd6eecf-8f5c-42aa-8aa8-1b2172d53c71","text","substitutable","textanalysis",{"aggregateSentiment",40,"keyphrases",[{"phrase","substitutable","count",1}]}},"stream-name","chatter","server-timestamp",1420660080000})
                (cl/query-event "muon://photon/projection"
                                {:projection-name "count"}))]
      (log/info res)
      res))

#_(let [m (cl/muon-client amazon-url "client-test" "client" "test")]
  (Thread/sleep 5000)
  (let [res (cl/with-muon m
              #_(cl/query-event "muon://photon/projection" {:projection-name "test"})
              (dorun (take 10 (repeatedly (fn [] (cl/post-event "muon://photon/events" "chatter"
                                                        {"service-id","muon://chatter","local-id","6198cea7-b260-4bb7-963d-f102132032fe","payload",{"id","dbd6eecf-8f5c-42aa-8aa8-1b2172d53c71","text","substitutable","textanalysis",{"aggregateSentiment",40,"keyphrases",[{"phrase","substitutable","count",1}]}},"stream-name","dummy","server-timestamp",1420660080000}))))))]
    (log/info res)
    res))

