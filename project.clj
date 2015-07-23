(defproject photon "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :repositories [["muoncore" "http://dl.bintray.com/muoncore/muon-java"]
                 ["reactor" "http://repo.spring.io/libs-release"]]
  :dependencies [[org.clojure/clojure "1.7.0-beta3"]
                 [org.clojure/clojurescript "0.0-3269"]
                 [io.muoncore/muon-clojure "0.1.15"]
                 [org.marianoguerra/clj-rhino "0.2.2"]
                 [compojure "1.3.4"]
                 [fipp "0.6.2"]
                 [congomongo "0.4.4"]
                 [jarohen/chord "0.6.0"]
                 [org.clojure/tools.logging "0.3.1"]
                 [tailrecursion/cljson "1.0.7"]
                 [org.slf4j/slf4j-log4j12 "1.7.12"]
                 [clj-http "1.1.2"]
                 [cljs-http "0.1.35"]
                 [org.clojure/java.data "0.1.1"]
                 [org.clojure/data.json "0.2.6"]
                 ;; TODO: Remove when gniazdo and lein-ring use the same Jetty
                 [org.eclipse.jetty/jetty-server "9.3.0.M1"]
                 [org.clojure/data.xml "0.0.8"]
                 [serializable-fn "1.1.4"]
                 [http-kit "2.1.18"]
                 [jayq "2.5.4"]
                 [org.omcljs/om "0.8.8"]
                 [clj-time "0.9.0"]
                 [incanter "1.5.6"]
                 [ring "1.4.0"]
                 [ring/ring-json "0.3.1"]
                 #_[photon "0.1.0-SNAPSHOT"]
                 [com.basho.riak/riak-client "2.0.1" :exclusions [com.sun/tools]]
                 [org.json/json "20141113"]
                 [midje "1.6.3"]
                 [ring/ring-defaults "0.1.2"]
                 [midje "1.6.3"]
                 [uap-clj "1.0.1"]
                 [io.muoncore/muon-core "0.33"]
                 [io.muoncore/muon-transport-amqp "0.33"]
                 [io.muoncore/muon-discovery-amqp "0.33"]
                 [org.clojure/core.async "0.1.346.0-17112a-alpha"]
                 [stylefruits/gniazdo "0.4.0"]]
  :plugins [[lein-ring "0.9.6"]
            [lein-cljsbuild "1.0.5"]
            [lein-figwheel "0.3.3"]
            [cider/cider-nrepl "0.9.1"]
            [org.clojure/tools.nrepl "0.2.10"]]
  :ring {:handler photon} ;; jetty
  :main photon.handler ;; http-kit
  :java-source-paths ["java"]
  :figwheel {:server-port 3500
             :load-warninged-code true
             :ring-handler photon.handler/reloadable-app}
  :cljsbuild {:builds [{:source-paths ["src-cljs"]
                        :figwheel true
                        :compiler {:main photon.ui.frontend
                                   :asset-path "js/out"
                                   :output-to "resources/public/js/main.js"}}]}
  :docker {:image-name "myregistry.example.org/myimage"
           :dockerfile "target/dist/Dockerfile"
           :build-dir  "target"}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring-mock "0.1.5"]]}})
