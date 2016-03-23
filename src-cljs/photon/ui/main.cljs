(ns photon.ui.main
  (:use [jayq.core :only [$ css html]])
  (:require [om.next :as om :refer-macros [defui]]
            [om.dom :as dom]
            [photon.ui.streams :as stm]
            [photon.ui.streams.analyser :as anal]
            [photon.ui.projections :as proj]
            [photon.ui.dashboard :as dsh]))

(def components
  {:streams/active stm/ActiveStreams
   :dashboard/stats dsh/DashboardStats
   :streams/new stm/NewStream
   :projections/active proj/ActiveProjections
   :projections/new proj/NewProjection
   :streams/analyse anal/DataAnalyser})

(defui Footer
  Object
  (render
   [_]
   (dom/footer
    nil
    (dom/div
     #js {:className "copyright-info"}
     (dom/p
      #js {:className "pull-right"}
      "Gentelella - Bootstrap Admin Template by "
      (dom/a #js {:href "https://colorlib.com"} "Colorlib"))))))

(defui Content
  Object
  #_(did-mount [this] #_(update-models!))
  (render
   [this]
   (dom/div
    #js {:className "right_col" :role "main"}
    (dom/br nil)
    (dom/div
     #js {:className ""})
    (let [active-comp (->> (om/props this) :leaves
                           (filter (comp true? :active)) first :link)]
      (dom/div
       nil
       #_(dom/p nil (pr-str active-comp))
       #_(println (:projection-info (om/props this)))
       #_(println (get components active-comp))
       ((om/factory (get components active-comp)) (om/props this))))
    ((om/factory Footer) {}))))

(defui MenuLeaf
  static om/Ident
  (ident [this {:keys [name]}] [:leaf/by-name name])
  static om/IQuery
  (query [this] [:name :link :active :section])
  Object
  (render
   [this]
   (let [{:keys [name active link]} (om/props this)]
     (dom/li
      (when active
        #js {:className "current-page"})
      (dom/a #js {:href "#"
                  :onClick
                  (fn [_]
                    (om/transact! this `[(leaf/select ~(om/props this))
                                         :sections]))}
             name)))))

(defui MenuSection
  static om/Ident
  (ident [this {:keys [name]}] [:section/by-name name])
  static om/IQuery
  (query [this] `[:name :category {:leaves ~(om/get-query MenuLeaf)}
                  :active])
  Object
  (componentDidUpdate
   [this prev-props prev-state]
   (let [{:keys [name active opened]} (om/props this)
         ul ($ (om/react-ref this "ul"))]
     (when (and (not opened) active)
       (.slideDown ul)
       (om/transact! this `[(section/update ~{:section name
                                              :k :opened :v true})
                            :sections]))
     (when (and opened (not active))
       (.slideUp ul)
       (om/transact! this `[(section/update ~{:section name
                                              :k :opened :v false})
                            :sections]))))
  (render
   [this]
   (let [{:keys [name leaves active opened]} (om/props this)]
     (dom/li
      (clj->js
       {:className (if active "active" "")})
      (dom/a
       #js {:onClick
            (fn [e]
              (om/transact! this
                            `[(section/update ~{:section name
                                                :k :active :v (not active)})
                              :sections]))}
       (dom/i #js {:className "fa fa-home"})
       name
       (dom/span
        (if active
          #js {:className "fa fa-chevron-up"}
          #js {:className "fa fa-chevron-down"})))
      (apply
       dom/ul
       #js {:ref "ul"
            :className "nav child_menu"
            :style (if active
                     #js {:display ""}
                     #js {:display "none"})}
       (map (om/factory MenuLeaf) leaves))))))

(defui MenuCategory
  static om/Ident
  (ident [this {:keys [name]}] [:category/by-name name])
  static om/IQuery
  (query [this] `[:name {:sections ~(om/get-query MenuSection)}])
  Object
  (render
   [this]
   (let [{:keys [name sections]} (om/props this)]
     (dom/div
      #js {:className "menu_section"}
      (dom/h3 nil name)
      (apply dom/ul
             #js {:className "nav side-menu"}
             (map (om/factory MenuSection) sections))))))

(defui SidebarButtons
  Object
  (render
   [this]
   (dom/div
    #js {:className "sidebar-footer hidden-small"}
    (dom/a #js {:data-toggle "tooltip"
                :data-placement "top"
                :title-data-original-title "Settings"}
           (dom/span #js {:className "glyphicon glyphicon-cog"
                          :aria-hidden "true"}))
    (dom/a #js {:data-toggle "tooltip"
                :data-placement "top"
                :title-data-original-title "FullScreen"}
           (dom/span #js {:className "glyphicon glyphicon-fullscreen"
                          :aria-hidden "true"}))
    (dom/a #js {:data-toggle "tooltip"
                :data-placement "top"
                :title-data-original-title "Lock"}
           (dom/span #js {:className "glyphicon glyphicon-eye-close"
                          :aria-hidden "true"}))
    (dom/a #js {:data-toggle "tooltip"
                :data-placement "top"
                :title-data-original-title "Logout"}
           (dom/span #js {:className "glyphicon glyphicon-off"
                          :aria-hidden "true"})))))

(defui MainMenu
  Object
  (render
   [this]
   (let [mt (:menu-toggle (:ui-state (om/props this)))]
     (dom/div
      (clj->js (if mt
                 #js {:className "col-md-3 left_col"}
                 #js {:className "col-md-3 left_col"}))
      (dom/div
       (clj->js (if mt
                  #js {:className "left_col"}
                  #js {:className "left_col scroll-view"}))
       (dom/div
        #js {:className "navbar nav_title"
             :style #js {:border 0}}
        (dom/a
         #js {:href "/index.html" :className "site_title"}
         (dom/i #js {:className "fa fa-ellipsis-h"})
         (dom/span nil " photon")))
       (dom/div #js {:className "clearfix"})
       (when-not mt
         (dom/div
          #js {:className "profile"}
          (dom/div
           #js {:className "profile_pic"}
           (dom/img
            #js {:src "images/2285.jpg"
                 :alt "..."
                 :className "img-circle profile_img"}))
          (dom/div
           #js {:className "profile_info"}
           (dom/span nil "Welcome,")
           (dom/h2 nil "Wam Shiting"))
          (dom/div #js {:style #js {:height "115px"}})))
       (apply
        dom/div
        #js {:id "sidebar-menu"
             :className "main_menu_side hidden-print main_menu"}
        (map (om/factory MenuCategory) (:categories (om/props this))))
       ((om/factory SidebarButtons)))))))

(defui TopBar
  static om/IQuery
  (query [this] `[:ui-state])
  Object
  (render
   [this]
   (dom/div
    #js {:className "top_nav"}
    (dom/div
     #js {:className "nav_menu"}
     (dom/nav
      #js {:className "" :role "navigation"}
      (dom/div
       #js {:className "nav toggle"}
       (dom/a
        #js {:id "menu_toggle"
             :onClick
             (fn [e]
               (om/transact!
                this
                `[(ui/update
                   {:k :menu-toggle
                    :v ~(-> this om/props :ui-state :menu-toggle not)})
                  :ui-state]))}
        (dom/i #js {:className "fa fa-bars"})))
      (dom/ul
       #js {:className "nav navbar-nav navbar-right"}
       (dom/li
        #js {:className ""}
        (dom/a
         #js {:href "javascript:;"
              :className "user-profile dropdown-toggle"
              :data-toggle "dropdown"
              :aria-expanded "false"}
         (dom/img
          #js {:src "images/2285.jpg" :alt ""})
         "Wam Shiting"
         ;; TODO: Arrow + dropdown menu
         #_(dom/span
            #js {:className "fa fa-angle-down"})))))))))

(defui MainPage
  Object
  (render
   [this]
   (dom/div
    #js {:className "nav-md"}
    (dom/div
     #js {:className "container body"}
     (dom/div
      #js {:className "main_container"}
      ((om/factory MainMenu) (om/props this))
      ((om/factory TopBar) (om/props this))
      ((om/factory Content) (om/props this)))))))
