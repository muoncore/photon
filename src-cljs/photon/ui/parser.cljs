(ns photon.ui.parser
  (:require [om.next :as om]))

(defmulti read om/dispatch)

#_(defn read [{:keys [state] :as env} key params]
  (let [st @state]
    (if-let [[_ value] (find st key)]
      {:value value}
      {:value :not-found})))

(defmethod read :all-items
  [{:keys [state] :as env} key params]
  {:value (:items @state)})

(defmethod read :default
  [{:keys [state] :as env} key params]
  {:value (get @state key :not-found)})

(defmulti mutate om/dispatch)

(defmethod mutate 'active-page/update
  [{:keys [state]} _ {:keys [name]}]
  {:action
   (fn []
     (swap! state
            (fn [old]
              (assoc old :items
                     (map #(assoc % :active? (= name (:name %)))
                          (:items old))))))})

(defmethod mutate :default [{:keys [state]} _ m]
  (swap! state merge m))
