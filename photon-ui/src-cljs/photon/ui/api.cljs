(ns photon.ui.api
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.next :as om :refer-macros [defui]]
            [om.dom :as dom]
            [goog.net.cookies :as ck]
            [photon.ui.ws :as ws]
            [photon.ui.components :as comp]))

(defui PhotonApps
  static om/IQuery
  (query [this] `[:security-info])
  Object
  (render
   [this]
   (let [{:keys [security-info]} (om/props this)
         apps (vals (get (:security security-info) "admin"))
         apps-table (map
                     #(-> %
                          (select-keys [:app-name :description :website])
                          (assoc :meta/original %)
                          (assoc :action/show-keys :action/show-keys))
                     apps)]
     (dom/div
      nil
      (dom/div
       #js {:className "row"}
       ((om/factory comp/FormButton)
        {:text "Create new app"
         :onClick
         (fn [_]
           (om/transact! this `[(ui/update {:k :selected-app :v nil})
                                (ui/update {:k :new-app :v true})
                                :ui-state]))}))
      (dom/div
       #js {:className "row"}
       ((om/factory comp/Table)
        {:data apps-table :owner this
         :rows [:app-name :description :website :action/show-keys]}))))))

(defui AppInfo
  static om/IQuery
  (query [this] `[:security-info])
  Object
  (render
   [this]
   (let [{:keys [ui-state security]} (:security-info (om/props this))]
     (dom/div
      nil
      (dom/div
       #js {:className "row"}
       (if (:new-app ui-state)
         (dom/form
          #js {:className "form-horizontal form-label-left"
               :onSubmit (fn [e] (.preventDefault e) false)}
          (comp/label-input
           {:owner this :key :aform/name
            :val (:aform/name ui-state) :label "Name"})
          (comp/label-input
           {:owner this :key :aform/description
            :val (:aform/description ui-state) :label "Description"})
          (comp/label-input
           {:owner this :key :aform/website
            :val (:aform/website ui-state) :label "App website"})
          (comp/form-button
           {:text "Create application"
            :onClick
            (fn [_]
              (go
                (<!
                 (ws/post-api "/auth/app"
                              {:query-params
                               {:name (:aform/name ui-state)
                                :description (:aform/description ui-state)
                                :website (:aform/website ui-state)}}))
                (om/transact! this `[(ui/update {:k :new-app :v false})
                                     :ui-state])))}))
         (if-let [app (:selected-app ui-state)]
           (dom/form
            #js {:className "form-horizontal form-label-left"
                 :onSubmit (fn [e] (.preventDefault e) false)}
            (comp/label-label
             {:label "Name" :second-label (:app-name app)})
            (comp/label-label
             {:label "Description" :second-label (:description app)})
            (comp/label-label
             {:label "Website" :second-label (:website app)})
            (comp/label-label
             {:label "Client ID" :second-label (str (:client-id app))})
            (comp/label-label
             {:label "Client secret" :second-label (str (:client-secret app))})
            (comp/label-label
             {:label "Test URL"
              :second-label
              (str "curl \"" (ck/get "server") "/api/ping?client_id="
                   (:client-id app) "&client_secret="
                   (:client-secret app) "\"")})
            #_(comp/label-input
             {:owner this :key :aform/description
              :val (:aform/description ui-state) :label "Description"})
            #_(comp/label-input
             {:owner this :key :aform/website
              :val (:aform/website ui-state) :label "App website"})
            #_(comp/form-button
             {:text "Create application"
              :onClick
              (fn [_]
                (go
                  (<!
                   (ws/post-api "/auth/app"
                                {:query-params
                                 {:name (:aform/name ui-state)
                                  :description (:aform/description ui-state)
                                  :website (:aform/website ui-state)}}))
                  (om/transact! this `[(ui/update {:k :new-app :v false})
                                       :ui-state])))}))
           (dom/p nil "Select and existing app or create a new one"))))))))

(defui ManageKeys
  static om/IQuery
  (query [this] `[{:security-info ~(om/get-query AppInfo)}
                  {:security-info ~(om/get-query PhotonApps)}])
  Object
  (render
   [this]
   (dom/div
    #js {:className "row"}
    ((om/factory comp/HalfPanel)
     {:title "Photon Apps"
      :component PhotonApps
      :data (om/props this)})
    ((om/factory comp/HalfPanel)
     {:title "App Info"
      :component AppInfo
      :data {}}))))
