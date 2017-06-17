(defproject muoncore/photon "0.9.6"
  :description "Simple, lightweight high-performant eventstore with hot and cold
                streaming especially tailored for microservice architectures.
                Provides interfaces for muon and HTTP."
  :url "https://github.com/muoncore/photon"
  :license {:name "GNU Affero General Public License Version 3"
            :url "https://www.gnu.org/licenses/agpl-3.0.html"}
  :min-lein-version "2.0.0"
  :repositories [["snapshots"
                  {:url
                   "https://simplicityitself.artifactoryonline.com/simplicityitself/muon/"
                   :creds :gpg}]
                 ["releases" "https://simplicityitself.artifactoryonline.com/simplicityitself/repo/"]]
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.immutant/web "2.1.6"
                  :exclusions [org.clojure/tools.reader]]
                 [org.jboss.logging/jboss-logging "3.3.0.Final"]
                 [ring "1.5.1"]
                 [buddy "1.3.0"]
                 [com.taoensso/nippy "2.13.0"
                  :exclusions [org.clojure/tools.reader]]
                 [ring/ring-json "0.4.0"]
                 [tranchis/photon-db "0.10.8"
                  :exclusions [org.clojure/java.classpath]]
                 [org.clojure/tools.logging "0.3.1"]
                 [org.clojure/core.async "0.3.441"
                  :exclusions [org.clojure/tools.reader]]
                 [org.marianoguerra/clj-rhino "0.2.3"]
                 [cheshire "5.7.0"]
                 [clj-time "0.13.0"]
                 [compojure "1.5.2"]
                 [serializable-fn "1.1.4"]
                 [muoncore/photon-config "0.9.11"]
                 [tranchis/muon-schemas "0.1.9"]
                 [io.muoncore/muon-clojure "7.2.10"
                  :exclusions [com.google.guava/guava]]
                 [prismatic/schema "1.1.3"]
                 [metosin/ring-http-response "0.8.2"]
                 [metosin/compojure-api "1.1.10"
                  :exclusions [org.clojure/tools.reader]]
                 [dire "0.5.4" :exclusions [slingshot]]
                 [org.slf4j/slf4j-log4j12 "1.7.24"]
                 [tranchis/clj-schema-inspector "0.5.2"]
                 [com.stuartsierra/component "0.3.2"]
                 [jarohen/chord "0.8.0"
                  :exclusions [com.cognitect/transit-clj
                               com.cognitect/transit-cljs
                               org.clojure/tools.reader]]
                 [clj-http "3.4.1"]
                 ;; photon plugins
                 [io.github.lukehutch/fast-classpath-scanner "2.0.17"]
                 [congomongo "0.5.0"]
                 #_[tranchis/photon-riak "0.9.31"]
                 [tranchis/photon-h2 "0.10.8"]
                 [tranchis/photon-cassandra "0.10.8"
                  :exclusions [com.google.guava/guava]]
                 #_[tranchis/photon-hazelcast "0.9.40"
                  :exclusions [com.fasterxml.jackson.core/jackson-databind]]
                 #_[tranchis/photon-redis "0.9.42"]
                 [muoncore/photon-mongo "0.10.8"]
                 [tranchis/photon-file "0.10.8"]
                 [muoncore/photon-ui "0.9.7"]]
  :plugins [[lein-midje "3.2.1"]
            [lein-ring "0.11.0" :exclusions [org.clojure/clojure]]]
  :main photon.core ;; http-kit
  #_#_:warn-on-reflection true
  :jvm-opts ["-server" #_#_#_#_"-Xmx1g" "-Xms1g" "-XX:MaxMetaspaceSize=1g"
             "-agentpath:/opt/local/share/profiler/libyjpagent.jnilib"]
  #_#_:jvm-opts ["-dsa" "-d64" "-da" "-XX:+UseConcMarkSweepGC"
             "-XX:+UseParNewGC" "-XX:ParallelCMSThreads=4"
             "-XX:+ExplicitGCInvokesConcurrent"
             "-XX:+CMSParallelRemarkEnabled"
             "-XX:-CMSIncrementalPacing"
             "-XX:+UseCMSInitiatingOccupancyOnly"
             "-XX:CMSIncrementalDutyCycle=100"
             "-XX:CMSInitiatingOccupancyFraction=90"
             "-XX:CMSIncrementalSafetyFactor=10"
             "-XX:+CMSClassUnloadingEnabled" "-XX:+DoEscapeAnalysis"]
  :docker {:image-name "myregistry.example.org/myimage"
           :dockerfile "target/dist/Dockerfile"
           :build-dir  "target"}
  :aot :all
  :profiles
  {:repl {:dependencies [[midje "1.8.3"]]}
   :dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring-mock "0.1.5"]]}})
