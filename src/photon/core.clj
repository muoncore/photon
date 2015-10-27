(ns photon.core
  (:gen-class)
  (:use org.httpkit.server)
  (:require [photon.handler :as h]
            [photon.db :as db]
            [photon.muon :as m]
            [photon.config :as conf]
            [clojure.tools.logging :as log]
            [clojure.java.classpath :refer :all]
            [clojure.string :as s]))

(defn -file->ns [f]
  (let [tokens (s/split f #"\.clj")
        main-part (s/join ".clj" tokens)
        nn (s/replace main-part #"\/" ".")
        nns (s/replace nn #"_" "-")]
    nns))

(defn -load-db-plugins!
  ([jf]
   (let [files (filenames-in-jar jf)
         matches (filter #(and (.startsWith % "photon/db/")
                               (.endsWith % ".clj"))
                         files)
         codes (map #(.getInputStream jf (.getEntry jf %)) matches)]
     (dorun (map #(log/info "Loading" % "in" (.getName jf) "...") matches))
     (dorun (map #(let [n (-file->ns %)]
                    (log/trace "Requiring" n)
                    (require (symbol n)))
                 matches))))
  ([]
   (log/info "Finding backend plugin implementations...")
   (let [jarfiles (classpath-jarfiles)]
     (dorun (map -load-db-plugins! jarfiles)))))

(defn -find-implementation [impls n]
  (first (filter #(= n (db/driver-name (%))) impls)))

(defn -default-db []
  (let [target (:db.backend conf/config)
        impls (db/implementations)
        chosen (-find-implementation impls target)]
    (log/info "Backend implementations available:"
              (map #(db/driver-name (%)) impls))
    (if (nil? chosen)
      (do
        (log/error "Backend plugin for" target
                   "not found, falling back to dummy")
        ((-find-implementation impls "dummy")))
      (chosen))))

;; Workaround to have http-kit as the provider for Ring
;; In order to use http-kit, run `lein run` instead of `lein ring server`
(defn -main [& args]
  (log/info "Starting photon...")
  (-load-db-plugins!)
  (let [db (-default-db)
        _ (log/info "DB Configured...")
        ms (m/start-server! (:microservice.name conf/config) db)]
    (log/info "Server started, initialising streams...")
    (log/info "Initialising endpoints...")
    (let [handler (h/app ms)]
      (println run-server)
      (time (run-server handler {:port 3000})))))

