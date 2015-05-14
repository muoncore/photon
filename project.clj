(defproject eventstore "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [compojure "1.3.1"]
                 [clj-http "1.1.2"]
                 [org.clojure/data.json "0.2.6"]
                 [clj-time "0.9.0"]
                 [com.basho.riak/riak-client "2.0.1" :exclusions [com.sun/tools]]
                 [org.json/json "20141113"]
                 [ring/ring-defaults "0.1.2"]]
  :plugins [[lein-ring "0.8.13"]]
  :ring {:handler eventstore.handler/app}
            :java-source-paths ["java"]
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring-mock "0.1.5"]]}})
