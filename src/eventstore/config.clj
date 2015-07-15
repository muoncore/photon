(ns eventstore.config)

(defn load-props
  "Receives a path and loads the Java properties for the file represented by the path inside the classpath (typically, a resource)."
  [file-name]
  (with-open [^java.io.Reader reader (clojure.java.io/reader (clojure.java.io/resource file-name))] 
    (let [props (java.util.Properties.)]
      (.load props reader)
      (into {} (for [[k v] props] [(keyword k) (read-string v)])))))

(def config (try
              (load-props "config.properties")
              (catch Exception e
                {:amqp.url "amqp://localhost"
                 :mongodb.host "localhost"
                 :riak.default_bucket "rxriak-events-v1"
                 :riak.node.1 "riak1.node.com"
                 :riak.node.2 "riak2.node.com"
                 :riak.node.3 "riak3.node.com"})))

