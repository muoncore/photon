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
            [photon.ui.streams.analyser :as anal]
            [photon.ui.state :as st]
            [photon.ui.streams :as stm]
            [photon.ui.ws :as ws]
            [photon.ui.projections :as proj]
            [photon.ui.dashboard :as dsh]
            [goog.dom :as gdom]
            [om.dom :as dom])
  (:import goog.net.IframeIo
           goog.net.EventType))

(defonce reconciler
  (om/reconciler {:state st/app-state
                  :history 1
                  :logger false
                  :parser (om/parser {:read parser/read
                                      :mutate parser/mutate})}))

(defui LoginPage
  ;; TODO: Breakdown and move pieces to components.cljs
  static om/IQuery
  (query [this] [:username :auth :password :server])
  Object
  (render
   [this]
   (let [{:keys [username auth password server]} (om/props this)
         fn-clk (fn [_]
                  (ws/call-back "/auth/login"
                                {:basic-auth {:username username
                                              :password password}}
                                (fn [m]
                                  (om/transact!
                                   this `[(root/update ~{:auth m})]))))]
     (if (= 200 (:status auth))
       (set! (.-location js/window) "/")
       (dom/div
        #js {:id "wrapper"}
        (dom/div
         #js {:id "login" :className "animate form"}
         (dom/section
          #js {:className "login_content"}
          (dom/form
           #js {:onSubmit #(.preventDefault %)}
           (dom/h1 nil "photon admin console")
           (dom/p nil (if (= 401 (:status auth)) "Wrong credentials"))
           (dom/div
            nil
            (dom/input
            #js {:name "username" :type "text"
                 :className "form-control" :placeholder "Username"
                 :value username
                 :onChange
                 (fn [ev]
                   (om/transact!
                    this `[(root/update {:username
                                         ~(.-value (.-target ev))})]))
                 :onKeyDown #(if (= 13 (.-keyCode %)) (fn-clk nil))}))
           (dom/div
            nil
            (dom/input
            #js {:type "password" :name "password"
                 :className "form-control" :placeholder "Password"
                 :value password
                 :onKeyDown #(if (= 13 (.-keyCode %)) (fn-clk nil))
                 :onChange
                 (fn [ev]
                   (om/transact!
                    this `[(root/update
                            {:password ~(.-value (.-target ev))})]))}))
           (dom/div
            nil
            (dom/select
             #js {:className "form-control"
                  :onKeyDown #(if (= 13 (.-keyCode %)) (fn-clk nil))
                  :onChange
                  (fn [ev]
                    (om/transact!
                     this `[(root/update
                             {:server ~(.-value (.-target ev))})]))}
             (dom/option #js {:value ws/localhost} ws/localhost)
             (dom/option
              #js {:value "https://photon-ext.cistechfutures.net"}
              "https://photon-ext.cistechfutures.net")))
           (dom/div #js {:style #js {:height "20px"}})
           (dom/div
            nil
            (dom/button #js {:type "Submit" :onClick fn-clk
                             :className "btn btn-default submit"}
                        "Login"))))))))))

(defui App
  static om/IQuery
  (query [this]
         `[{:categories ~(om/get-query main/MenuCategory)}
           {:sections ~(om/get-query main/MenuSection)}
           {:leaves ~(om/get-query main/MenuLeaf)}
           {:stats ~(om/get-query dsh/DashboardStats)}
           {:ui-state ~(om/get-query main/TopBar)}
           {:ui-state ~(om/get-query main/SidebarButtons)}
           :subscriptions
           {:projection-info ~(om/get-query proj/ActiveProjections)}
           {:stream-info ~(om/get-query stm/ActiveStreams)}
           {:stream-info ~(om/get-query stm/NewStream)}
           {:stream-info ~(om/get-query anal/DataAnalyser)}
           {:projection-info ~(om/get-query proj/NewProjection)}])
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
   (let [stream-info (:stream-info (om/props this))
         first-stream (first (:streams stream-info))
         analyse-stream (:stream first-stream)]
     (when (nil? (:analyse-stream (:ui-state stream-info)))
       (go
         (let [res (<! (ws/get-api (str "/api/schema/" analyse-stream)))
               schemas (:body res)
               analyse-version (first (keys schemas))]
           (om/transact! this
                         `[(ui/update ~{:k :analyse-stream
                                        :v analyse-stream})
                           (ui/update ~{:k :analyse-version
                                        :v analyse-version})
                           (ui/update ~{:k :schemas
                                        :v schemas})
                           :stream-info :ui-state])))))
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
