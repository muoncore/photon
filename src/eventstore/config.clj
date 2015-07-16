(ns eventstore.config
  (:require [clojure.tools.logging :as log]))

(defn load-props
  "Receives a path and loads the Java properties for the file represented by the path inside the classpath (typically, a resource)."
  [file-name]
  (do
    (log/info "opening file" file-name)
    (let [io (java.io.FileInputStream. file-name)
          prop (java.util.Properties.)]
      (.load prop io)
      (into {} (for [[k v] prop]
                 [(keyword k) v])))))

(def config (try
              (load-props "config.properties")
              (catch Exception e
                (do
                  (log/error "Configuration was not loaded due to " e)
                  (.printStackTrace e)
                  )
                {:amqp.url "amqp://localhost"
                 :mongodb.host "localhost"
                 :riak.default_bucket "rxriak-events-v1"
                 :riak.node.1 "riak1.node.com"
                 :riak.node.2 "riak2.node.com"
                 :riak.node.3 "riak3.node.com"})))