(ns photon.interop.old-photon
  (:require [clj-http.client :as client]
            [somnium.congomongo :as m]
            [clojure.pprint :as pp]
            [clojure.data.json :as json]
            [clojure.data.xml :as xml]))

(defn import-old-photon! []
  (m/with-mongo (m/make-connection "photon" :host "localhost" :port 27017)
    (loop [url "http://10.90.228.85:2113/streams/events_production"]
      (println "Loading" url "...")
      (let [content (json/read-str (:body (client/get url {:accept :json}))
                                   :key-fn keyword)
            next-url (:uri (first (filter #(= (:relation %) "next") (:links content))))
            entries (:entries content)
            links (map (fn [entry]
                         (:uri (first (:links entry))))
                       entries)
            events (map #(let [js (json/read-str (:body (client/get % {:accept :json}))
                                                 :key-fn keyword)]
                           (if (map? js)
                             js
                             (spit "/tmp/offending.txt"
                                   (str js "\n")
                                   :append true)))
                        links)
            good (try
                   (m/mass-insert! :events (remove nil? events))
                   true
                   (catch Exception e
                     (println (.getMessage e))
                     (.printStackTrace e)
                     false))]
        (if (or (not good) (nil? next-url))
          (println "Finished")
          (do
            (println next-url)
            (recur next-url)))))))





