(defproject eventstore "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :repositories [["muoncore" "http://dl.bintray.com/muoncore/muon-java"]
                 ["reactor" "http://repo.spring.io/libs-release"]]
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [compojure "1.3.4"]
                 [congomongo "0.4.4"]
                 [org.clojure/tools.logging "0.3.1"]
                 [org.slf4j/slf4j-log4j12 "1.7.12"]
                 [clj-http "1.1.2"]
                 [org.clojure/java.data "0.1.1"]
                 [org.clojure/data.json "0.2.6"]
                 [org.clojure/data.xml "0.0.8"]
                 [serializable-fn "1.1.4"]
                 [http-kit "2.1.18"]
                 [clj-time "0.9.0"]
                 [incanter "1.5.6"]
                 [ring "1.3.2"]
                 [com.basho.riak/riak-client "2.0.1" :exclusions [com.sun/tools]]
                 [org.json/json "20141113"]
                 [midje "1.6.3"]
                 [ring/ring-defaults "0.1.2"]
                 [midje "1.6.3"]
                 [uap-clj "1.0.1"]
                 [io.muoncore/muon-core "0.30-20150624010741"]
                 [io.muoncore/muon-transport-amqp "0.30-20150624010741"]
                 [io.muoncore/muon-discovery-amqp "0.30-20150624010741"]
                 [org.clojure/core.async "0.1.346.0-17112a-alpha"]
                 [stylefruits/gniazdo "0.4.0"]]
  :plugins [[lein-ring "0.8.13"]]
  :ring {:handler eventstore.handler/app} ;; jetty
  :main eventstore.handler ;; http-kit
  :java-source-paths ["java"]
  :docker  {:image-name "myregistry.example.org/myimage"
            :dockerfile "target/dist/Dockerfile"
            :build-dir  "target"}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring-mock "0.1.5"]]}})
