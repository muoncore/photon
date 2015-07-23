(ns photon.viz
  (:require [photon.streams :as streams])
  (:use (incanter core stats charts io)))

#_(let [results (:current-value @(:test-query-3 @streams/queries))
      registered-users (reduce
                         (fn [prev item]
                           (let [k (key item)
                                 v (val item)
                                 users (into #{}
                                             (map clojure.string/lower-case (keys v)))
                                 new-users (clojure.set/difference
                                             users
                                             (:registered prev))
                                 last-new-users (+ (count new-users)
                                                   (apply max 0 (vals (:time-series prev))))
                                 last-logins (+ (reduce + (vals v))
                                                (apply max 0 (vals (:logins prev))))]
                             {:registered (into #{}
                                                (concat (:registered prev) new-users))
                              :non-logins (assoc (:non-logins prev)
                                                 k
                                                 (reduce + (vals v)))
                              :logins (assoc (:logins prev)
                                             k
                                             last-logins)
                              :stickiness (assoc (:stickiness prev)
                                                 k
                                                 (if (= 0 last-new-users)
                                                   0
                                                   (double (/ last-logins last-new-users))))
                              :non-time-series (assoc (:non-time-series prev)
                                                      k
                                                      (count new-users))
                              :time-series (assoc (:time-series prev)
                                                  k
                                                  last-new-users)}))
                         {:non-logins {}
                          :non-time-series {}
                          :logins {}
                          :stickiness {}
                          :registered #{}
                          :time-series {}}
                         (sort-by key (:intervals results)))
      added-projects (reduce
                       (fn [prev item]
                         (let [k (key item)
                               v (val item)]
                           {:registered (if (nil? v)
                                          (:registered prev)
                                          (assoc (:registered prev)
                                                 k
                                                 (+ (get v "create-project" 0)
                                                    (apply max 0 (vals (:registered prev))))))
                            :volunteers (if (nil? v)
                                          (:volunteers prev)
                                          (assoc (:volunteers prev)
                                                 k
                                                 (+ (get v "create-volunteer" 0)
                                                    (apply max 0 (vals (:volunteers prev))))))}))
                       {:registered {}
                        :volunteers {}
                        :time-series {}}
                       (sort-by key (:actions results)))
      projects2 (reduce
                  (fn [prev item]
                    (let [k (key item)
                          v (val item)
                          ]
                      {:views (if (nil? v)
                                (:views prev)
                                (assoc (:views prev)
                                       k
                                       (+ (get v ["GET" "/project"] 0)
                                          (apply max 0 (vals (:views prev))))))
                       }))
                  {:views {}
                   :volunteers {}
                   :time-series {}}
                  (sort-by key (:paths results)))
      available (reduce
                  (fn [prev item]
                    (let [k (key item)
                          v (val item)]
                      {:searches (if (nil? v)
                                   (:searches prev)
                                   (assoc (:searches prev)
                                          k
                                          (get v ["GET" "/people"] 0)))
                       :requests (if (nil? v) 
                                   (:requests prev)
                                   (assoc (:requests prev)
                                          k
                                          (get v ["POST" "/socketio/domain/request"] 0)))
                       :total (assoc (:total prev)
                                    k
                                    (get (:non-time-series registered-users) k 0)) 
                       :available (if (nil? v)
                                    (:available prev)
                                    (assoc (:available prev)
                                           k
                                           (get v ["POST" "/socketio/domain/advice"] 0)))}))
                  {:searches {}
                   :requests {}
                   :total {}
                   :available {}}
                  (sort-by key (:paths results)))
      ds (dataset [:key :value]
                  [{:key "Registered" :value (count (:registered registered-users))}
                   {:key "Logins" :value (apply max 0 (vals (:logins registered-users)))}])
      bc (with-data ds
           (bar-chart :key :value :title "Active users"
                      :x-label "" :y-label "Total number"))
      ts-non-bc (time-series-plot (keys (:non-logins registered-users))
                                  (vals (:non-logins registered-users))
                                  :series-label "Logins"
                                  :x-label "Users"
                                  :y-label "Total"
                                  :legend true)
      ts-avail (time-series-plot (keys (:searches available))
                                 (vals (:searches available))
                                 :series-label "Searches for people"
                                 :x-label "Available people stats"
                                 :y-label "Total"
                                 :legend true)
      ts-bc (time-series-plot (keys (:logins registered-users))
                              (vals (:logins registered-users))
                              :series-label "Logins"
                              :x-label "Users"
                              :y-label "Acc. total"
                              :legend true)
      ts-stick (time-series-plot (keys (:stickiness registered-users))
                                 (vals (:stickiness registered-users))
                                 :series-label "Stickiness"
                                 :x-label "Time"
                                 :y-label "Stickiness")
      ts-bc2 (time-series-plot (keys (:registered added-projects))
                               (vals (:registered added-projects))
                               :series-label "Projects created"
                               :x-label "Added projects"
                               :y-label "Acc. total"
                               :legend true)
      ds2 (dataset [:key :value]
                   [{:key "Searches for people"
                     :value (reduce + (map #(get (val %) ["GET" "/people"] 0)
                                           (:paths results)))}
                    {:key "Requests for people"
                     :value (reduce + (map #(get (val %) ["POST" "/socketio/domain/request"] 0)
                                           (:paths results)))}
                    {:key "Total people"
                     :value (count (:registered registered-users))}
                    {:key "Available"
                     :value 30}])
      bc2 (with-data ds2
            (bar-chart :key :value :title "Available people stats"
                       :x-label "" :y-label "Total number"))
      ds3 (dataset [:key :value]
                   [{:key "Requests" :value (reduce + (map #(get (val %) "post-request" 0)
                                                           (:events results)))}
                    {:key "Searches" :value (reduce + (map #(get (val %) ["GET" "/advice"] 0)
                                                           (:paths results)))}
                    {:key "Total registered" :value (reduce + (map #(get (val %) "post-advice" 0)
                                                                   (:events results)))}
                    {:key "Profiles with skills" :value 30}])
bc3 (with-data ds3
      (bar-chart :key :value :title "Advice stats"
                 :x-label "" :y-label "Total number"))]

(add-lines ts-avail
           (keys (:requests available))
           (vals (:requests available))
           :series-label "Requests for people")
(add-lines ts-avail
           (keys (:total available))
           (vals (:total available))
           :series-label "Registrations")
(add-lines ts-avail
           (keys (:available available))
           (vals (:available available))
           :series-label "Available people")
(set-stroke-color ts-avail java.awt.Color/black :series 0)
(add-lines ts-non-bc
           (keys (:non-time-series registered-users))
           (vals (:non-time-series registered-users))
           :series-label "Registrations")
(add-lines ts-bc
           (keys (:time-series registered-users))
           (vals (:time-series registered-users))
           :series-label "Registrations")
(add-lines ts-bc2
           (keys (:volunteers added-projects))
           (vals (:volunteers added-projects))
           :series-label "Volunteers")
(add-lines ts-bc2
           (keys (:views projects2))
           (vals (:views projects2))
           :series-label "Views")
(let [min-ts (reduce min (keys (:logins registered-users)))
      filtered-skills (filter #(> (key %) min-ts)
                              (:skills-intervals results))
      filtered-skills (concat {min-ts 0} filtered-skills)]
  (add-lines ts-non-bc
             (keys (:non-skills results))
             (vals (:non-skills results))
             :series-label "Skills registered")
  (add-lines ts-bc
             (keys filtered-skills)
             (vals filtered-skills)
             :series-label "Skills registered"))

(save ts-stick "/tmp/ts-stick.png" :width 1000)
(save bc "/tmp/bc.png" :width 1000)
(save ts-bc "/tmp/ts-bc.png" :width 1000)
(save bc2 "/tmp/bc2.png" :width 1000)
(save bc3 "/tmp/bc3.png" :width 1000)
(save ts-bc2 "/tmp/ts-bc2.png" :width 1000)
(save ts-avail "/tmp/ts-avail.png" :width 1000)
(save ts-non-bc "/tmp/ts-non-bc.png" :width 1000)

(view ts-avail)
(view ts-non-bc)
(view ts-stick)
(view bc)
(view ts-bc)
(view bc2)
(view bc3)
(view ts-bc2)

)


