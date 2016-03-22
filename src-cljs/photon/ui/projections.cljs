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
                    (:active-projection ui-state))})))))

(defui NewProjectionForm
  Object
  (render
   [this]
   (let [{:keys [owner] :as data} (om/props this)]
     (dom/form
      #js {:className "form-horizontal form-label-left"}
      ((om/factory comp/LabelAndTextInput)
       {:owner owner :key :pform/projection-name
        :val (:pform/projection-name data) :label "Projection name"})
      ((om/factory comp/LabelAndTextInput)
       {:owner owner :key :pform/stream-name
        :val (:pform/stream-name data) :label "Stream name"})
      ((om/factory comp/LabelAndButtonArray)
       {:owner owner :label "Language"
        :options {"clojure" "Clojure" "javascript" "JavaScript"}
        :key :pform/language :val (:pform/language data)})
      ((om/factory comp/LabelAndCodeBlock)
       {:owner owner :label "Initial value"
        :key :pform/initial-value :val (:pform/initial-value data)})
      ((om/factory comp/LabelAndCodeBlock)
       {:owner owner :label "Code: content of (fn [prev item] ... )"
        :key :pform/reduction :val (:pform/reduction data)}) 
      ((om/factory comp/FormButton)
       {:text "Register projection"
        :onClick
        (fn [_]
          (ws/post-api-async "/api/projection"
                             {:json-params
                              (select-keys data
                                           [:pform/projection-name
                                            :pform/stream-name
                                            :pform/initial-value
                                            :pform/reduction
                                            :pform/language])}))})))))

(defui NewProjection
  static om/IQuery
  (query [this] `[:projection-info])
  Object
  (render
   [this]
   (dom/div
    nil
    #_(dom/p nil (pr-str (:ui-state data)))
    (dom/div #js {:className "clearfix"})
    (dom/div
     #js {:className "row"}
     ((om/factory comp/LongPanel)
      {:component NewProjectionForm
       :title "New projection wizard"
       :data (assoc (:ui-state (:projection-info (om/props this)))
                    :owner this)})))))
