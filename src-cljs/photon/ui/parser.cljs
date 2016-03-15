(ns photon.ui.parser
  (:require [om.next :as om]))

#_(defmulti read (fn [_ key _] (.log js/console (pr-str key)) key))
(defmulti read (fn [env key params]
                 #_(.log js/console
                       "dispatch:"
                       (pr-str (om/dispatch env key params)))
                 (om/dispatch env key params)))

#_(defn read [{:keys [state] :as env} key params]
  (let [st @state]
    (if-let [[_ value] (find st key)]
      {:value value}
      {:value :not-found})))

(defmethod read :categories
  [{:keys [state query] :as env} key params]
  {:value (om/db->tree query (get @state key) @state)})

(defmethod read :sections
  [{:keys [state query] :as env} key params]
  {:value (om/db->tree query (get @state key) @state)})

(defmethod read :leaves
  [{:keys [state query] :as env} key params]
  {:value (om/db->tree query (get @state key) @state)})

(defmethod read :all-items
  [{:keys [state] :as env} key params]
  {:value (:items @state)})

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

(defmethod mutate 'section/hover
  [{:keys [state]} _ {:keys [section hover]}]
  {:action
   (fn []
     (swap! state assoc-in [:section/by-name section :hover] hover))})

(defmethod mutate :default [{:keys [state]} _ m]
  (swap! state merge m))

;; Complementary

(defn with-children [m-parent m-child k-parent k-child]
  (map #(assoc % k-parent
               (filter (fn [x]
                         (= (k-child x) (:name %)))
                       m-child))
       m-parent))

(defn with-leaves [sections leaves]
  (with-children sections leaves :leaves :section))

(defn with-sections [categories sections]
  (with-children categories sections :sections :category))
