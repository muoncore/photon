(ns io.riak-test
  (:use midje.sweet)
  (:require [quux.core :as core]))

(expect (conj [1 2] 3) => [1 2 3])


