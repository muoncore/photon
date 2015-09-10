(ns photon.current.integration-test
  (:require [muon-clojure.client :as cl]
            [clojure.tools.logging :as log]
            [clojure.core.async :as async :refer [go-loop <! <!!]]
            [photon.config :as conf]
            [photon.filedb :as filedb]
            [photon.db :as db]
            [photon.muon :as muon])
  (:use midje.sweet))

(defn elem-count [ch]
  (loop [elem (<!! ch) n 0]
    (if (nil? elem)
      n
      (recur (<!! ch) (inc n)))))

(defn post-one-event
  ([m url]
   (cl/with-muon m
     (cl/post-event (str "muon://" url "/events")
                    {"service-id","muon://chatter",
                     "local-id","5198cea7-b260-4bb7-963d-f102132032fe",
                     "payload",{"id","dbd6eecf-8f5c-42aa-8aa8-1b2172d53c71",
                                "text","substitutable",
                                "textanalysis",
                                {"aggregateSentiment",40,
                                 "keyphrases",[{"phrase",
                                                "substitutable",
                                                "count",1}]}},
                     "stream-name","chatter",
                     "server-timestamp",1420660080000})
     #_(cl/query-event "muon://photon/projection"
                       {:projection-name "count"}))) 
  ([m]
   (post-one-event m "photon-integration-test")))

(let [temp-file (.getAbsolutePath
                 (java.io.File/createTempFile "muon" ".json"))
      d (filedb/->DBFile temp-file)
      _ (println temp-file)
      _ (db/delete-all! d)
      uuid (java.util.UUID/randomUUID)
      ms (muon/start-server! (str "photon-integration-test-" uuid) d)
      m (cl/muon-client (:amqp.url conf/config) "client-test"
                        "client" "test")
      res (post-one-event m (str "photon-integration-test-" uuid))
      _ (Thread/sleep 2000)
      ch (cl/with-muon m
           (cl/stream-subscription (str "muon://photon-integration-test-"
                                        uuid "/stream")
                                   :stream-name "__all__"
                                   :stream-type "cold"
                                   :from 0))]
  (fact "Post works correctly" res => {:correct "true"})
  (fact "One event on stream" (elem-count ch) => 1)
  (dorun (take 10 (repeatedly
                   (fn []
                     (post-one-event
                      m (str "photon-integration-test-" uuid))))))
  (let [ch (cl/with-muon m
             (cl/stream-subscription (str "muon://photon-integration-test-"
                                          uuid "/stream")
                                     :stream-name "__all__"
                                     :stream-type "cold"
                                     :from 0))]
    (fact "11 events on stream" (elem-count ch) => 11))
  (dorun (take 1000 (repeatedly
                     (fn []
                       (post-one-event
                        m (str "photon-integration-test-" uuid))))))
  (let [ch (cl/with-muon m
             (cl/stream-subscription (str "muon://photon-integration-test-"
                                          uuid "/stream")
                                     :stream-name "__all__"
                                     :stream-type "cold"
                                     :from 0))]
    (fact "1011 events on stream" (elem-count ch) => 1011))
  #_(dorun (take 10000 (repeatedly
                      (fn []
                        (post-one-event
                         m (str "photon-integration-test-" uuid))))))
  #_(let [ch (cl/with-muon m
             (cl/stream-subscription (str "muon://photon-integration-test-"
                                          uuid "/stream")
                                     :stream-name "__all__"
                                     :stream-type "cold"
                                     :from 0))]
    (Thread/sleep 20000)
    (fact "11011 events on stream" (elem-count ch) => 11011)))



#_(let [m (cl/muon-client amazon-url "client-test" "client" "test")]
  (Thread/sleep 5000)
  (let [res (cl/with-muon m
              #_(cl/query-event "muon://photon/projection" {:projection-name "test"})
              (dorun (take 10 (repeatedly (fn [] (cl/post-event "muon://photon/events" "chatter"
                                                        {"service-id","muon://chatter","local-id","6198cea7-b260-4bb7-963d-f102132032fe","payload",{"id","dbd6eecf-8f5c-42aa-8aa8-1b2172d53c71","text","substitutable","textanalysis",{"aggregateSentiment",40,"keyphrases",[{"phrase","substitutable","count",1}]}},"stream-name","dummy","server-timestamp",1420660080000}))))))]
    (log/info res)
    res))

