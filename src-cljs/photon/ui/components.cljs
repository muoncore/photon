(ns photon.ui.components
  (:use [jayq.core :only [$ css html]])
  (:require [photon.ui.ws :as ws]
            [om.next :as om :refer-macros [defui]]
            [om.dom :as dom]))

(defui LoginPage
  static om/IQuery
  (query [this] [:username :auth :password])
  Object
  (render
   [this]
   (let [{:keys [username auth password]} (om/props this)
         fn-clk (fn [_]
                  (ws/call-back "/auth/login"
                                {:basic-auth {:username username
                                              :password password}}
                                (fn [m] (om/transact!
                                         this `[(root/update ~m)]))))]
     (if (= 200 (:status auth))
       (set! (.-location js/window) "/ui")
       (dom/div
        nil
        (dom/p nil (if (= 401 (:status auth)) "Wrong credentials"))
        (dom/label nil "Username")
        (dom/input
         #js {:name "username"
              :value username
              :onChange
              (fn [ev]
                (om/transact!
                 this `[(root/update {:username
                                      ~(.-value (.-target ev))})]))
              :onKeyDown (fn [ev]
                           (if (= 13 (.-keyCode ev))
                             (fn-clk nil)))})
        (dom/label nil "Password")
        (dom/input
         #js {:type "password" :name "password"
              :value password
              :onKeyDown (fn [ev]
                           (if (= 13 (.-keyCode ev))
                             (fn-clk nil)))
              :onChange
              (fn [ev]
                (om/transact!
                 this `[(root/update
                         {:password ~(.-value (.-target ev))})]))})
        (dom/button #js {:type "Submit" :onClick fn-clk} "Login"))))))

(defui DashboardContent
  Object
  (render [this] (dom/p nil "Hello world")))

(defui MenuLeaf
  static om/Ident
  (ident [this {:keys [name]}] [:leaf/by-name name])
  static om/IQuery
  (query [this] [:name :link :active :section])
  Object
  (render
   [this]
   (let [{:keys [name link]} (om/props this)]
     (dom/li nil (dom/a #js {:href "index.html"} name)))))

(defui MenuSection
  static om/Ident
  (ident
   [this {:keys [name category]}]
   [:section/by-name name])
  static om/IQuery
  (query [this] '[:name :category :leaves :active :hover])
  Object
  (render
   [this]
   (let [{:keys [name leaves active hover]} (om/props this)]
     (dom/li
      (clj->js
       {:onMouseOver
        (fn [e]
          (om/transact! this
                        `[(section/hover ~{:section name
                                           :hover true})]))
        :onMouseOut
        (fn [e]
          (om/transact! this
                        `[(section/hover ~{:section name
                                           :hover false})]))
        :className (if (or active hover) "active" "")})
      (dom/a
       nil
       (dom/i #js {:className "fa fa-home"})
       name
       (dom/span
        #js {:className "fa fa-chevron-down"}))
      (apply
       dom/ul
       #js {:className "nav child_menu"
            :style (if active
                     #js {:display "none"}
                     #js {})}
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

(defui MainMenu
  Object
  (render
   [this]
   (dom/div
    #js {:className "col-md-3 left_col"}
    (dom/div
     #js {:className "left_col scroll-view"}
     (dom/div
      #js {:className "navbar nav_title"
           :style #js {:border 0}}
      (dom/a
       #js {:href "/index.html" :className "site_title"}
       (dom/i #js {:className "fa fa-ellipsis-h"})
       (dom/span nil " photon")))
     (dom/div #js {:className "clearfix"})
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
       (dom/h2 nil "Wam Shiting")))
     (dom/br nil)
     (apply
      dom/div
      #js {:id "sidebar-menu"
           :className "main_menu_side hidden-print main_menu"}
      (map (om/factory MenuCategory) (:categories (om/props this))))))))

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
  static om/IQuery
  (query [this] [:projections])
  Object
  (did-mount [this] #_(update-models!))
  (render
   [this]
   (dom/div
    #js {:className "right_col" :role "main"}
    (dom/br nil)
    (dom/div
     #js {:className ""})
    (dom/p nil (pr-str (om/props this)))
    #_(if (= :analytics (:page @app-state))
        (dom/div nil (om/build analytics data))
        (dom/div
         nil
         (dom/div nil (om/build menu data))
         (dom/div nil (om/build list-models data))
         (dom/div nil (om/build canvas data))
         (dom/div nil (om/build edn-model data))))
    ((om/factory Footer) {}))))

(defui TopBar
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
        #js {:id "menu_toggle"}
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
   (.log js/console "redraw")
   (dom/div
    #js {:className "nav-md"}
    (dom/div
     #js {:className "container body"}
     (dom/div
      #js {:className "main_container"}
      ((om/factory MainMenu) (om/props this))
      ((om/factory TopBar) {})
      ((om/factory Content) (om/props this)))))))
