(ns eventstore.config
  (:require [clojure.tools.logging :as log]))

(defn load-props
  "Receives a path and loads the Java properties for the file represented by the path inside the classpath (typically, a resource)."
  [resource-name]
  (do
    (log/info "opening resource" resource-name)
    (let [io (java.io.FileInputStream.
               (clojure.java.io/file
                 (clojure.java.io/resource (str resource-name ".properties"))))
          prop (java.util.Properties.)]
      (.load prop io)
      (into {} (for [[k v] prop]
                 [(keyword k) v])))))

(def config (try
              (let [props (load-props "config")]
                (log/info "Properties" (pr-str props))
                props)
              (catch Exception e
                (log/error "Configuration was not loaded due to " e)
                (.printStackTrace e)
                {:amqp.url "amqp://localhost"
                 :mongodb.host "localhost"
                 :riak.default_bucket "rxriak-events-v1"
                 :riak.node.1 "riak1.node.com"
                 :riak.node.2 "riak2.node.com"
                 :riak.node.3 "riak3.node.com"})))
