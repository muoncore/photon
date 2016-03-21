(ns photon.ui.frontend
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:use [jayq.core :only [$ css html]])
  (:require [cljs-http.client :as client]
            [cljs.core.async :refer [chan <! >! put! close!]]
            [tailrecursion.cljson :refer [clj->cljson cljson->clj]]
            [goog.net.cookies :as ck]
            [goog.events :as events]
            [cljs.pprint :as pprint]
            [om.next :as om :refer-macros [defui]]
            [photon.ui.parser :as parser]
            [photon.ui.main :as main]
            [photon.ui.state :as st]
            [photon.ui.streams :as stm]
            [photon.ui.ws :as ws]
            [photon.ui.projections :as proj]
            [photon.ui.dashboard :as dsh]
            [goog.dom :as gdom]
            [om.dom :as dom])
  (:import goog.net.IframeIo
           goog.net.EventType))

#_(defui FullPage
  Object
  (render
   [this]
   (dom/div
    nil
    (dom/div
     nil
     (condp = (:active-page @app-state)
       "Dashboard" (omo/build widget-dashboard state)
       "Streams" (omo/build widget-streams (assoc state :full-page-owner owner))
       "Projections" (omo/build widget-projections (assoc state :full-page-owner owner))
       "New Projection" (omo/build widget-new-projection state)
       "New Stream" (omo/build widget-new-stream state)
       "Analyse Data" (when (contains? state :streams)
                        (omo/build widget-analyse state)))))))

(defonce reconciler
  (om/reconciler {:state st/app-state
                  :logger false
                  :parser (om/parser {:read parser/read
                                      :mutate parser/mutate})}))

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

(defui App
  static om/IQuery
  (query [this]
         `[{:categories ~(om/get-query main/MenuCategory)}
           {:sections ~(om/get-query main/MenuSection)}
           {:leaves ~(om/get-query main/MenuLeaf)}
           {:stats ~(om/get-query dsh/DashboardStats)}
           {:ui-state ~(om/get-query main/TopBar)}
           :subscriptions
           {:projection-info ~(om/get-query proj/ActiveProjections)}
           {:stream-info ~(om/get-query stm/ActiveStreams)}
           {:stream-info ~(om/get-query stm/NewStream)}])
  Object
  (componentDidMount
   [this]
   (when-not (:subscriptions (om/props this))
     (let [upd (fn [x] (om/transact! this `[(stats/update ~x) :stats]))
           stats (let [stats (get-in (om/props this) [:stats :stats :last-25])]
                   (if (or (nil? stats) (= :not-found stats)) {} stats))]
       (println "Subscribing...")
       (ws/subscribe-streams! stats upd)
       (ws/subscribe-projections! stats upd)
       (ws/subscribe-stats! stats upd)
       (om/transact! this `[(subscriptions/update {:subscriptions true})]))))
  (componentDidUpdate
   [this next-props next-state]
   (let [body ($ :body)
         li ($ "#sidebar-menu li")]
     (if (:menu-toggle (:ui-state (om/props this)))
       (do
         (.removeClass body "nav-md")
         (.addClass body "nav-sm")
         (when (.hasClass li "active")
           (.removeClass (.addClass ($ "#sidebar-menu li.active")
                                    "active-sm") "active")))
       (do
         (.removeClass body "nav-sm")
         (.addClass body "nav-md")
         (when (.hasClass li "active-sm")
           (.removeClass (.addClass ($ "#sidebar-menu li.active-sm")
                                    "active") "active-sm"))))))
  (render
   [this]
   ;; TODO: Check the idiomatic way to do this
   ((om/factory main/MainPage) (om/props this))))

(go
  (let [res (<! (ws/get-api "/api/ping"))
        page (if (or (= (:status res) 500) (= (:status res) 401))
               LoginPage App)]
    (om/add-root! reconciler page (gdom/getElement "main-area"))))
