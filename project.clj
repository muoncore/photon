(defproject tranchis/photon "0.9.6"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :repositories [["snapshots"
                  {:url
                   "https://simplicityitself.artifactoryonline.com/simplicityitself/muon/"
                   :creds :gpg}]
                 ["releases" "https://simplicityitself.artifactoryonline.com/simplicityitself/repo/"]]
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.immutant/web "2.1.4"
                  :exclusions [potemkin ring/ring-core]]
                 [org.jboss.logging/jboss-logging "3.3.0.Final"]
                 [ring "1.4.0"]
                 [buddy "0.13.0"]
                 [com.taoensso/nippy "2.11.1"
                  :exclusions [org.clojure/tools.reader]]
                 [ring/ring-json "0.4.0"]
                 [tranchis/photon-db "0.9.45"]
                 [org.clojure/tools.logging "0.3.1"]
                 [org.clojure/core.async "0.2.374"
                  :exclusions [org.clojure/tools.reader]]
                 [org.marianoguerra/clj-rhino "0.2.3"]
                 [cheshire "5.6.1"]
                 [clj-time "0.11.0"]
                 [compojure "1.5.0"]
                 [serializable-fn "1.1.4"]
                 [tranchis/photon-config "0.9.50"]
                 [tranchis/muon-schemas "0.1.5"]
                 [io.muoncore/muon-clojure "7.0-20160503141240"
                  :exclusions [potemkin org.clojure/tools.reader]]
                 [prismatic/schema "1.1.0"]
                 [metosin/ring-http-response "0.6.5"
                  :exclusions [potemkin]]
                 [metosin/compojure-api "1.1.0"
                  :exclusions [com.fasterxml.jackson.core/jackson-databind]]
                 [dire "0.5.4"]
                 [org.slf4j/slf4j-log4j12 "1.7.21"]
                 [tranchis/clj-schema-inspector "0.5.2"]
                 [com.stuartsierra/component "0.3.1"]
                 ;; clojurescript
                 [org.clojure/clojurescript "1.8.51"]
                 [com.github.jsqlparser/jsqlparser "0.9.5"]
                 [jarohen/chord "0.7.0"
                  :exclusions [com.cognitect/transit-clj
                               com.cognitect/transit-cljs
                               com.cognitect/transit-java]]
                 [tailrecursion/cljson "1.0.7"]
                 [clj-http "3.0.1" :exclusions [potemkin]]
                 [cljs-http "0.1.40"
                  :exclusions [org.clojure/tools.reader]]
                 [org.omcljs/om "1.0.0-alpha32"]
                 [jayq "2.5.4"]
                 [fipp "0.6.5"]
                 [reagent-utils "0.1.8"]
                 ;; photon plugins
                 [io.github.lukehutch/fast-classpath-scanner "1.9.18"]
                 [congomongo "0.4.8"]
                 #_[tranchis/photon-riak "0.9.31"]
                 [tranchis/photon-h2 "0.9.45" :exclusions [potemkin]]
                 [tranchis/photon-cassandra "0.9.49"
                  :exclusions [potemkin]]
                 [tranchis/photon-hazelcast "0.9.40"]
                 [tranchis/photon-redis "0.9.42"
                  :exclusions [com.taoensso/encore]]
                 #_[tranchis/photon-mongo "0.9.45"]
                 [tranchis/photon-file "0.9.45"]]
  :ring {:handler photon.core/figwheel-instance
         :init photon.core/figwheel-init!}
  :plugins [[lein-cljsbuild "1.1.3" :exclusions [org.clojure/clojure]]
            [lein-midje "3.2"]
            [lein-ring "0.9.7" :exclusions [org.clojure/clojure]]
            [lein-figwheel "0.5.2" :exclusions [org.clojure/clojure]]]
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
  :figwheel {:server-port 3000
             :open-file-command "atom"
             :ring-handler photon.core/figwheel-init!}
  :cljsbuild
  {:builds [{:id "production"
             :source-paths ["src-cljs"]
             :figwheel true
             :compiler {:main photon.ui.frontend
                        :asset-path "ui/js/out"
                        :output-to "resources/public/ui/js/main.js"
                        :output-dir "resources/public/ui/js/out"
                        :source-map true
                        :preamble ["react/react.min.js"]
                        :optimizations :none
                        :pretty-print true}}]}
  :docker {:image-name "myregistry.example.org/myimage"
           :dockerfile "target/dist/Dockerfile"
           :build-dir  "target"}
  :aot :all
  :profiles
  {:repl {:dependencies [[midje "1.8.3"]]}
   :dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring-mock "0.1.5"]]}})
