(ns photon.dummy.data
  (:require [photon.db :as db]
            [clj-http.client :as client]
            [clojure.data.json :as json]))

(let [total 1000
      data (map (fn [_]
                  (let [n (inc (int (* 10 (Math/random))))
                        words (pmap (fn [_]
                                      (->
                                        (client/get "http://randomword.setgetgo.com/get.php")
                                        :body
                                        (clojure.string/trim)
                                        (clojure.string/lower-case)))
                                    (range n))
                        uniq-words (into #{} words)]
                    {:id (db/uuid)
                     :text (clojure.string/join " " words)
                     :textanalysis {:aggregateSentiment (int (* 100 (Math/random)))
                                    :keyphrases 
                                    (map (fn [w] {:phrase w
                                                  :count (count (filter #(= % w) words))})
                                         uniq-words)}}))
                (range total))
      events (map-indexed
               (fn [idx d]
                 {:service-id "muon://chatter"
                  :local-id (db/uuid)
                  :payload d
                  :stream-name "chatter"
                  :server-timestamp (+ 1420070400000 (* idx (/ 604800000 total)))})
               data)]
  (dorun (map #(spit "/tmp/events.json" (str (json/write-str %) "\n") :append true) events)))

