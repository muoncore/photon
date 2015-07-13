(ns eventstore.config)

(defn load-props
  "Receives a path and loads the Java properties for the file represented by the path inside the classpath (typically, a resource)."
  [file-name]
  (with-open [^java.io.Reader reader (clojure.java.io/reader (clojure.java.io/resource file-name))] 
    (let [props (java.util.Properties.)]
      (.load props reader)
      (into {} (for [[k v] props] [(keyword k) (read-string v)])))))

(def config (load-props "config.properties"))

