(defproject tranchis/photon "0.9.1"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :repositories [["muoncore" "http://dl.bintray.com/muoncore/muon-java"]
                 ["reactor" "http://repo.spring.io/libs-release"]]
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [http-kit "2.1.18"]
                 [tranchis/photon-db "0.9.9"]
                 [org.clojure/tools.logging "0.3.1"]
                 [congomongo "0.4.6" :exclusions [org.clojure/data.json]]
                 [org.clojure/core.async "0.1.346.0-17112a-alpha"]
                 [org.marianoguerra/clj-rhino "0.2.2"
                  :exclusions [org.mozilla/rhino]]
                 [uap-clj "1.0.1"]
                 [cheshire "5.5.0"]
                 [clj-time "0.11.0"]
                 [compojure "1.4.0" :exclusions [org.clojure/tools.reader]]
                 [serializable-fn "1.1.4"]
                 [tranchis/photon-config "0.9.8"]
                 [io.muoncore/muon-clojure "5.3.6"
                  :exclusions [com.cognitect/transit-clj
                               commons-codec
                               org.clojure/data.json
                               org.mozilla/rhino
                               org.clojure/tools.reader
                               com.cognitect/transit-cljs]]
                 [prismatic/schema "1.0.1"]
                 [metosin/ring-http-response "0.6.5"
                  :exclusions [org.clojure/tools.reader]]
                 [tranchis/compojure-api "0.24.1"
                  :exclusions [org.clojure/core.memoize
                               com.fasterxml.jackson.core/jackson-annotations
                               commons-codec
                               org.clojure/data.priority-map
                               org.clojure/tools.reader
                               com.cognitect/transit-clj
                               com.fasterxml.jackson.core/jackson-databind
                               org.clojure/core.cache
                               com.cognitect/transit-java
                               org.clojure/test.check]]
                 [tranchis/cassaforte "2.1.0-beta3"]
                 [dire "0.5.3"]
                 [jarohen/chord "0.6.0"
                  :exclusions [commons-codec
                               org.clojure/tools.reader
                               com.fasterxml.jackson.core/jackson-databind
                               com.fasterxml.jackson.core/jackson-annotations]]
                 [org.slf4j/slf4j-log4j12 "1.7.12"]
                 [org.clojure/java.classpath "0.2.2"]
                 ;; clojurescript
                 [org.clojure/clojurescript "1.7.145"]
                 ;; photon plugins
                 [io.github.lukehutch/fast-classpath-scanner "1.9.7"]
                 #_[tranchis/photon-riak "0.9.7"]
                 [tranchis/photon-file "0.9.7"]]
  :plugins [[lein-cljsbuild "1.1.0"]
            [lein-midje "3.1.3"]
            [lein-figwheel "0.4.1"
             :exclusions [org.clojure/clojure
                          org.codehaus.plexus/plexus-utils]]]
  :main photon.handler ;; http-kit
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
                                   :output-dir "resources/public/ui/js/out"
                                   :source-map "resources/public/ui/js/out.js.map"
                                   :preamble ["react/react.min.js"]
                                   :optimizations :none
                                   :pretty-print  true}}]}
  :docker {:image-name "myregistry.example.org/myimage"
           :dockerfile "target/dist/Dockerfile"
           :build-dir  "target"}
  :profiles
  {:uberjar {:aot :all}
   :repl {:dependencies [[midje "1.7.0"]]}
   :dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring-mock "0.1.5"]]}})

