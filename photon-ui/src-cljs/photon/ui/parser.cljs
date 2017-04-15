(ns photon.ui.parser
  (:require [om.next :as om]))

(enable-console-print!)

#_(defmulti read (fn [_ key _] (.log js/console (pr-str key)) key))
(defmulti read (fn [env key params]
                 #_(.log js/console
                       "dispatch:"
                       (pr-str (om/dispatch env key params)))
                 (om/dispatch env key params)))

(defn with-children [state parents k-accessor
                     k-children k-parent-comp k-child-comp]
  (let [children (vals (get state k-accessor))]
    (into []
          (map (fn [parent]
                 (assoc parent k-children
                        (into []
                              (filter #(= (get % k-child-comp)
                                          (get parent k-parent-comp))
                                         children))))
               parents))))

(defn with-leaves [sections state]
  (with-children state sections :leaf/by-name :leaves :name :section))

(defn with-sections [categories state]
  (let [mod-state (update-in state [:section/by-name]
                             (fn [x]
                               (zipmap (keys x)
                                       (with-leaves (vals x) state))))]
    (with-children mod-state categories
      :section/by-name :sections :name :category)))

(defmethod read :categories
  [{:keys [state query] :as env} key params]
  {:value (with-sections
            (om/db->tree query (:categories @state) @state)
            @state)})

(defmethod read :sections
  [{:keys [state query] :as env} key params]
  {:value (with-leaves
            (om/db->tree query (:sections @state) @state)
            @state)})

(defmethod read :leaves
  [{:keys [state query] :as env} key params]
  {:value (om/db->tree query (get @state key) @state)})

(defmethod read :all-items
  [{:keys [state] :as env} key params]
  {:value (:items @state)})

(defmethod read :stream-info
  [{:keys [state] :as env} key params]
  (let [streams (:streams (:stats @state))]
    {:value {:streams streams
             :streams/by-name (zipmap (map :stream streams) streams)
             :ui-state (:ui-state @state)}}))

(defmethod read :projection-info
  [{:keys [state] :as env} key params]
  {:value {:projections (:projections (:stats @state))
           :ui-state (:ui-state @state)}})

(defmethod read :security-info
  [{:keys [state] :as env} key params]
  {:value {:security (:security @state) :ui-state (:ui-state @state)}})

(defmethod read :default
  [{:keys [state] :as env} key params]
  {:value (get @state key :not-found)})

(defmulti mutate (fn [env key params]
                   #_(.log js/console
                         "dispatch-mutate:"
                         (pr-str (om/dispatch env key params)))
                   (om/dispatch env key params)))

(defmethod mutate 'active-page/update
  [{:keys [state]} _ {:keys [name]}]
  {:action
   (fn []
     (swap! state
            (fn [old]
              (assoc old :items
                     (map #(assoc % :active? (= name (:name %)))
                          (:items old))))))})

(defmethod mutate 'section/update
  [{:keys [state]} _ {:keys [section k v]}]
  {:action
   (fn [] (swap! state assoc-in [:section/by-name section k] v))})

(defn unique-val [m route k-set k-comp val]
  (update-in m route
             (fn [x]
               (zipmap
                (keys x)
                (map #(assoc % k-set (= val (get % k-comp)))
                     (vals x))))))

(defmethod mutate 'section/activate
  [{:keys [state]} _ {:keys [v]}]
  {:action
   (fn []
     (swap! state update :section/by-name
            (fn [x]
              (zipmap
               (keys x)
               (map #(assoc % :active (not v)) (vals x))))))})

(defmethod mutate 'leaf/select
  [{:keys [state]} _ {:keys [name section]}]
  {:action
   (fn []
     (swap!
      state
      (fn [old]
        #_(unique-val [:section/by-name] :active :name section)
        (let [base (unique-val old [:leaf/by-name] :active :name name)]
          (if (:menu-toggle (:ui-state old))
            (update base :section/by-name
                    (fn [x]
                      (zipmap
                       (keys x)
                       (map #(assoc % :active false) (vals x)))))
            base)))))})

(defmethod mutate 'ui/update
  [{:keys [state]} _ {:keys [k v]}]
  {:action
   (fn [] (swap! state assoc-in [:ui-state k] v))})

(defmethod mutate 'stats/update
  [{:keys [state]} _ m]
  {:action
   (fn [] (swap! state update-in [:stats] #(merge % m)))})

(defmethod mutate 'sec/update
  [{:keys [state]} _ m]
  {:action (fn [] (swap! state update-in [:security] (fn [_] m)))})

(defmethod mutate :default [{:keys [state]} _ m]
  (swap! state merge m))
