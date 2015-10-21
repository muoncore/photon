(defproject photon "0.9.1"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :repositories [["muoncore" "http://dl.bintray.com/muoncore/muon-java"]
                 ["reactor" "http://repo.spring.io/libs-release"]]
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [org.clojure/clojurescript "1.7.122"]
                 [io.muoncore/muon-clojure "5.3.6"
                  :exclusions [com.cognitect/transit-clj
                               com.cognitect/transit-cljs]]
                 [org.marianoguerra/clj-rhino "0.2.2"]
                 [metosin/schema-tools "0.6.1"]
                 [metosin/ring-swagger "0.21.0"
                  :exclusions [prismatic/schema
                               metosin/schema-tools]]
                 [tranchis/compojure-api "0.24.0"
                  :exclusions [metosin/schema-tools
                               prismatic/plumbing
                               com.cognitect/transit-clj
                               org.clojure/test.check]]
                 [metosin/ring-swagger-ui "2.1.3"]
                 [compojure "1.4.0"]
                 [fipp "0.6.2"]
                 [congomongo "0.4.4"]
                 [jarohen/chord "0.6.0"]
                 [org.clojure/tools.logging "0.3.1"]
                 [tailrecursion/cljson "1.0.7"]
                 [org.slf4j/slf4j-log4j12 "1.7.12"]
                 [clj-http "1.1.2"
                  :exclusions [com.cognitect/transit-clj
                               com.cognitect/transit-cljs]]
                 [cljs-http "0.1.35"
                  :exclusions [com.cognitect/transit-cljs]]
                 [org.clojure/java.data "0.1.1"]
                 [cheshire "5.5.0"]
                 ;; TODO: Remove when gniazdo and lein-ring use the same Jetty
                 [org.eclipse.jetty/jetty-server "9.3.0.M1"]
                 [org.clojure/data.xml "0.0.8"]
                 [serializable-fn "1.1.4"]
                 [http-kit "2.1.18"]
                 [jayq "2.5.4"]
                 [org.omcljs/om "0.8.8"]
                 [clj-time "0.11.0"]
                 [incanter "1.5.6"]
                 [ring "1.4.0"]
                 [ring/ring-json "0.3.1"]
                 [org.clojure/tools.namespace "0.2.11"]
                 [com.basho.riak/riak-client "2.0.1"
                  :exclusions [com.sun/tools
                               com.fasterxml.jackson.core/jackson-databind]]
                 [org.json/json "20141113"]
                 [midje "1.6.3"]
                 [ring/ring-defaults "0.1.2"]
                 [midje "1.6.3"]
                 [uap-clj "1.0.1"]
                 [tranchis/cassaforte "2.1.0-beta3"]
                 [dire "0.5.3"]
                 [com.lucasbradstreet/cljs-uuid-utils "1.0.2"]
                 [io.muoncore/muon-core "5.4.4"]
                 [io.muoncore/muon-transport-amqp "5.4.4"]
                 [io.muoncore/muon-discovery-amqp "5.4.4"]
                 [org.clojure/core.async "0.1.346.0-17112a-alpha"]
                 [org.codehaus.plexus/plexus-utils "3.0"]
                 [stylefruits/gniazdo "0.4.0"]]
  :plugins [[lein-ring "0.9.6"
             :exclusions [org.clojure/clojure]]
            [lein-cljsbuild "1.0.5"
             :exclusions [org.clojure/clojure]]
            [lein-midje "3.1.3"]
            [lein-figwheel "0.4.1"
             :exclusions [org.codehaus.plexus/plexus-utils]]
            [cider/cider-nrepl "0.9.1"
             :exclusions [org.clojure/tools.nrepl]]
            [org.clojure/tools.nrepl "0.2.11"
             :exclusions [org.clojure/clojure]]]
  :ring {:handler photon} ;; jetty
  :main photon.handler ;; http-kit
  :aot :all
  :java-source-paths ["java"]
  #_#_:warn-on-reflection true
  :jvm-opts [#_"-Xmx4g"
             #_"-XX:+PrintGCDetails"
             #_"-agentpath:/Users/sergio/Downloads/YourKit_Java_Profiler_2015_build_15074.app/Contents/Resources/bin/mac/libyjpagent.jnilib"
             #_"server"
             "-dsa" "-d64" "-da" "-XX:+UseConcMarkSweepGC"
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
             :load-warninged-code true
             :open-file-command "mvim"
             :ring-handler photon.handler/reloadable-app}
  :cljsbuild {:builds [{:source-paths ["src-cljs"]
                        :figwheel true
                        :compiler {:main photon.ui.frontend
                                   :asset-path "ui/js/out"
                                   :output-to "resources/public/ui/js/main.js"
                                   :output-dir    "resources/public/ui/js/out"
                                   :source-map    "resources/public/ui/js/out.js.map"
                                   :preamble      ["react/react.min.js"]
                                   :optimizations :none
                                   :pretty-print  true}}]}
  :docker {:image-name "myregistry.example.org/myimage"
           :dockerfile "target/dist/Dockerfile"
           :build-dir  "target"}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring-mock "0.1.5"]]}})
