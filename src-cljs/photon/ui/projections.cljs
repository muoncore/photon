(ns photon.ui.projections
  (:use [jayq.core :only [$ css html]])
  (:require [om.dom :as dom]
            [photon.ui.ws :as ws]
            [photon.ui.components :as comp]
            [om.next :as om :refer-macros [defui]]))

(defn filter-projection [proj]
  (assoc
   (select-keys proj [:stream
                      :avg-time :status :language :processed
                      :stream-name :projection-name])
   :url :action/view-projection
   :meta/original proj))

(defn load-value! [owner projection-name]
  (ws/call-back
   (str ws/localhost "/api/projection/" projection-name) {}
   (fn [res]
     (om/update-state!
      owner assoc
      :current-value (:current-value (:body res))))))

(defn update-current-value! [owner]
  (let [projection-name (:projection-name (:meta/original (om/props owner)))]
    (when-not (= projection-name (:previous (om/get-state owner)))
      (om/update-state! owner merge {:current-value nil
                                     :previous projection-name})
      (load-value! owner projection-name))))

(defui ProjectionBox
  Object
  (componentDidMount [this] (update-current-value! this))
  (componentWillReceiveProps
   [this prev-props]
   (update-current-value! this))
  (render
   [this]
   (dom/div
    #js {:className ""
         :role "tabpanel"}
    (dom/ul
     #js {:className "nav nav-tabs bar_tabs"
          :role "tablist"}
     (dom/li
      #js {:role "presentation"
           :onClick (fn [_] (om/update-state! this assoc :value? false))
           :className (if (:value? (om/get-state this))
                        "" "active")}
      (dom/a
       #js {:href "#projection-tab1"
            :role "tab"
            :aria-expanded "true"}
       "Projection metadata"))
     (dom/li
      #js {:role "presentation"
           :onClick (fn [_] (om/update-state! this assoc :value? true))
           :className (if (:value? (om/get-state this))
                        "active" "")}
      (dom/a
       #js {:href "#projection-tab1"
            :role "tab"
            :aria-expanded "true"}
       "Current value")))
    (let [projection (:meta/original (om/props this))]
      (if (:value? (om/get-state this))
        (let [current-value (:current-value (om/get-state this))]
          (if (nil? current-value)
            (dom/p nil "Loading...")
            ((om/factory comp/CodeBlock) {:code current-value
                                          :modal? true})))
        ((om/factory comp/CodeBlock)
         {:code (if-let [code projection] code "")
          :modal? true}))))))

(defui ActiveProjections
  static om/IQuery
  (query [this] `[:projection-info])
  Object
  (componentDidUpdate
   [this prev-props prev-state]
   (let [active-modal (:modal-projections (:ui-state (om/props this)))]
     (when (not (nil? active-modal))
       (.modal ($ :#modal-projections)
               #js {:keyboard true :show active-modal})
       (when-not active-modal
         (.remove ($ ".modal-backdrop.fade.in"))))))
  (render
   [this]
   (let [{:keys [projections ui-state] :as props}
         (:projection-info (om/props this))
         active-projection (:active-projection ui-state)]
     (dom/div
      nil
      (dom/div
       #js {:className "page-title"}
       (dom/div
        #js {:className "title_left"}
        (dom/h3
         nil "Projection browser")))
      (dom/div #js {:className "clearfix"})
      (dom/div
       #js {:className "row"}
       ((om/factory comp/LongPanel)
        {:title "Currently active projections"
         :component comp/Table
         :data {:data (map filter-projection projections)
                :owner this
                :rows [:projection-name
                       :init-time :avg-time :status :language
                       :processed :stream-name :url]}}))
      ((om/factory comp/Modal)
       {:id "modal-projections"
        :title "Projection viewer"
        :onHide (fn [_]
                  (om/transact! this `[(ui/update {:k :modal-projections :v false})
                                       :projection-info]))
        :component ((om/factory ProjectionBox)
                    (:active-projection ui-state))})
      #_(if (not (nil? active-stream))
          ((om/factory EventList)
           {:events (:events (:ui-state data)) :stream active-stream}))))
   #_(let [fn-update (fn [new-active-projection]
                       (om/transact! this `[(ui/update ~{:k :active-projection :v new-active-projection})]))]
       (apply dom/table #js
              {:className "table table-striped table-bordered table-hover table-heading"}
              (apply dom/tr nil
                     (map #(dom/th #js {:style #js {:border "1px"}}
                                   (k->header (key %)))
                          (filter-projection
                           (first (:projections data)))))
              (map #(omo/build projection-item {:data data
                                                :projection %
                                                :fn-update fn-update})
                   (:projections data)))
       (if (not (nil? (:active-projection state)))
         (let [block (omo/build code-block (:active-projection state))]
           block)))))
