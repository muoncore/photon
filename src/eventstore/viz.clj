(ns eventstore.viz
  (:require [eventstore.streams :as streams])
  (:use (incanter core stats charts io)))

(let [results (:current-value @(:test-query-3 @streams/queries))
      registered-users (reduce
                         (fn [prev item]
                           (let [k (key item)
                                 v (val item)
                                 users (into #{}
                                             (map clojure.string/lower-case (keys v)))
                                 new-users (clojure.set/difference
                                             users
                                             (:registered prev))]
                             {:registered (into #{}
                                                (concat (:registered prev) new-users))
                              :logins (assoc (:logins prev)
                                             k
                                             (+ (reduce + (vals v))
                                                (apply max 0 (vals (:logins prev)))))
                              :time-series (assoc (:time-series prev)
                                                  k
                                                  (+ (count new-users)
                                                     (apply max 0 (vals (:time-series prev)))))}))
                         {:logins {}
                          :registered #{}
                          :time-series {}}
                         (:intervals results))
      ds (dataset [:key :value]
                  #_{:key 1 :value (count (:registered registered-users))}
                  {:key 2 :value (apply max 0 (vals (:logins registered-users)))}
                  )
      bc (with-data ds
           (bar-chart :key :value :title "Registered vs login"))]
  (view bc)
  )


