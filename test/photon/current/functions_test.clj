(ns photon.current.functions-test
  (:require [photon.streams :as streams]
            [clojure.tools.logging :as log])
  (:use midje.sweet))

(binding [streams/*nashorn-cache* false]
 (fact "A simple function is correctly converted (clojure)"
       (let [f (:computable
                (streams/generate-function "clojure" "(fn [prev next] 0)"))]
         (f 0 0) => 0
         (f 0 1) => 0
         (f 5 0) => 0))

 (fact "A less simple function is correctly converted (clojure)"
       (let [f (:computable
                (streams/generate-function "clojure" "(fn [prev next] (inc prev))"))]
         (f 4 0) => 5
         (f 10 6) => 11))

 (fact "A more complex function is correctly converted (clojure)"
       (let [f (:computable
                (streams/generate-function
                 "clojure"
                 "(fn [prev next]
                    {:value (* (:value prev) (:number next))})"))]
         (f {:value 5} {:number 6}) => {:value 30}))

 (fact "Wrong syntax makes babies cry (clojure)"
       (streams/generate-function "clojure" "(fn [a b] where-is-my-eof?")
       =>
       (throws Exception))


 (fact "A simple function is correctly converted (javascript)"
       (let [f (:computable
                (streams/generate-function "js-experimental" "function(prev,next) {return 0;}"))]
         (f 0 0) => 0
         (f 0 1) => 0
         (f 5 0) => 0))

 (fact "A less simple function is correctly converted (javascript)"
       (let [f (:computable
                (streams/generate-function "js-experimental" "function(prev,next) {return prev + 1;}"))]
         (f 4 0) => 5.0
         (f 10 6) => 11.0))

 (fact "A more complex function is correctly converted (javascript)"
       (let [f (:computable
                (streams/generate-function
                 "js-experimental"
                 #_"function(prev,next) {prev.value *= next.number; return prev;}"
                 "function(prev,next) {var res = prev.value * next.number; return {value: res};}"))]
         (f {:value 5} {:number 6}) => {"value" 30.0}))

 (fact "A more complex function with vectors is correctly converted (javascript)"
       (let [f (:computable
                (streams/generate-function
                 "js-experimental"
                 #_"function(prev,next) {prev.value = prev.value * next[1]; return prev;}"
                 "function(prev,next) {var res = prev.value * next[1]; return {value: res}}"))]
         (f {:value 5} [1 2]) => {"value" 10.0}))

 (fact "Wrong syntax makes babies cry (javascript)"
       (streams/generate-function "js-experimental" "function(prev,next) {return 0")
       =>
       (throws Exception)))

