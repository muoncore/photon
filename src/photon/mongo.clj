(ns photon.mongo
  (:require [photon.db :as db]
            [photon.config :as conf]
            [clojure.tools.logging :as log]
            [somnium.congomongo :as m]))

(def page-size 100)

(defn mongo-conn []
  (m/make-connection "photon" :host (:mongodb.host conf/config)))

(defrecord LocalMongoDB [db collection]
  db/DB
  (fetch [this stream-name id]
    (m/with-mongo db
      (m/fetch-one collection :where {:stream-name stream-name
                                      :_id id})))
  (delete! [this id]
    (m/with-mongo db
      (m/destroy! collection {:_id id})))
  (delete-all! [this]
    (m/with-mongo db
      (m/destroy! collection {})))
  (put [this data]
    (m/with-mongo db
      (m/insert! collection data)))
  (search [this id] (db/fetch this {:$exists true} id))
  (distinct-values [this k]
    (m/with-mongo db
      (m/distinct-values collection k)))
  (store [this payload]
    (m/with-mongo db
      (m/insert! collection (merge payload {:_id (:local-id payload)}))))
  (lazy-events [this stream-name date]
    (db/lazy-events-page this stream-name date 0)) 
  (lazy-events-page [this stream-name date page]
    (m/with-mongo db
      (let [l-date (if (string? date) (read-string date) date)
            res (m/fetch collection :where {:stream-name stream-name}
                         :skip (* page-size page) :limit page-size)]
        (log/info "Calling mongo: " :where {:stream-name stream-name}
                  :skip (* page-size page) :limit page-size)
        (if (< (count res) 1)
          []
          (concat res
                  (lazy-seq (db/lazy-events-page this stream-name l-date (inc page)))))))))

(defn m-mongo
  ([collection]
   (->LocalMongoDB (mongo-conn) collection))
  ([]
   (m-mongo :events)))

(def mongo (memoize m-mongo))

#_(m/with-mongo (mongo-conn)
  (let [everything (m/fetch :events :where {})]
    (dorun (map #(m/insert! :new-events {:stream-name "cambio"
                                         :server_timestamp (:server_timestamp %)
                                         :payload %}) everything))))

#_(m/with-mongo (mongo-conn)
  (m/distinct-values :events "stream-name"))

