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
            [photon.ui.components :as comp]
            [photon.ui.state :as st]
            [photon.ui.ws :as ws]
            [goog.dom :as gdom]
            [om.core :as omo]
            [om.dom :as dom])
  (:import goog.net.IframeIo
           goog.net.EventType))

(defui FullPage
  Object
  (render
   [this]
   (dom/div
    nil
    (dom/div
     nil
     #_(condp = (:active-page @app-state)
         "Dashboard" (omo/build widget-dashboard state)
         "Streams" (omo/build widget-streams (assoc state :full-page-owner owner))
         "Projections" (omo/build widget-projections (assoc state :full-page-owner owner))
         "New Projection" (omo/build widget-new-projection state)
         "New Stream" (omo/build widget-new-stream state)
         "Analyse Data" (when (contains? state :streams)
                          (omo/build widget-analyse state)))))))

(def reconciler
  (om/reconciler {:state st/app-state
                  :parser (om/parser {:read parser/read
                                      :mutate parser/mutate})}))

(defui App
  static om/IQuery
  (query [this] (into [] (keys @st/app-state)))
  Object
  (componentDidMount
   [this]
   (let [upd (fn [x] (om/transact! this `[(root/update ~x)]))]
     (ws/subscribe-streams! upd)
     (ws/subscribe-projections! upd)
     (ws/subscribe-stats! upd)))
  (render [this] ((om/factory comp/MainPage) (om/props this))))

(go
  (let [res (<! (ws/get-api "/api/ping"))
        page (if (or (= (:status res) 500) (= (:status res) 401))
               comp/LoginPage App)]
    (om/add-root! reconciler page (gdom/getElement "main-area"))))
