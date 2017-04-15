(ns photon.ui.dashboard
  (:require [om.next :as om :refer-macros [defui]]
            [om.dom :as dom]
            [photon.ui.components :as comp]))

(defui SystemDataPanel
  Object
  (render
   [this]
   (let [data (om/props this)]
     (dom/div
      #js {:className "dashboard-widget-content"}
      (dom/div
       #js {:className "col-md-4"}
       #_(dom/h2
          #js {:className "line_30"} "List title")
       ((om/factory comp/TableList)
        [{:left "Total Memory (KB)"
          :right (quot (:total-memory data) 1024)}
         {:left "Used Memory (KB)"
          :right (quot (- (:total-memory data)
                          (:available-memory data))
                       1024)}
         {:left "Available Memory (KB)"
          :right (quot (:available-memory data) 1024)}
         {:left "CPU Load"
          :right (str (:cpu-load data) "%")}
         {:left "Buffer load"
          :right (str (:buffer-count data) "/4096")}]))
      (dom/div
       #js {:className "col-md-8"}
       ((om/factory comp/Chart)
        {:timestamps (:timestamps (:last-25 data))
         :id "system-data"
         :max 100
         :label-y "%"
         :sets [{:name "Memory usage"
                 :data (:memory (:last-25 data))}
                {:name "CPU load"
                 :data (:cpu (:last-25 data))}
                {:name "Buffer load"
                 :data (:buffer (:last-25 data))}]}))))))

(defui EventsProcessedPanel
  Object
  (render
   [this]
   (let [data (om/props this)]
     (dom/div
      #js {:className "dashboard-widget-content"}
      (dom/div
       #js {:className "col-md-12"}
       ((om/factory comp/Chart)
        {:timestamps (:timestamps (:last-25 data))
         :id "events-processed-chart"
         :padding 10
         :sets [{:name "Events/sec."
                 :data (:processed (:last-25 data))}]}))))))

(defui EventsIncomingPanel
  Object
  (render
   [this]
   (let [data (om/props this)]
     (dom/div
      #js {:className "dashboard-widget-content"}
      (dom/div
       #js {:className "col-md-12"}
       ((om/factory comp/Chart)
        {:timestamps (:timestamps (:last-25 data))
         :id "events-incoming-chart"
         :padding 10
         :sets [{:name "Events/sec."
                 :data (:incoming (:last-25 data))}]}))))))

(defui DashboardStats
  static om/IQuery
  (query [this] '[:stats])
  Object
  (render
   [this]
   (let [params (:stats (om/props this))]
     (dom/div
      nil
      ((om/factory comp/TileRow) [{:datum (count (:streams params))
                                   :icon "fa-sliders"
                                   :text "Streams"
                                   :subtext "Currently active streams"}
                                  {:datum (count (:projections params))
                                   :icon "fa-tasks"
                                   :text "Projections"
                                   :subtext "Running projections"}])
      (dom/div
       #js {:className "row"}
       ((om/factory comp/HalfPanel) {:component EventsIncomingPanel
                                     :title "Events incoming"
                                     :data (:stats params)})
       ((om/factory comp/HalfPanel) {:component EventsProcessedPanel
                                     :title "Events processed"
                                     :data (:stats params)}))
      (dom/div
       #js {:className "row"}
       ((om/factory comp/LongPanel) {:component SystemDataPanel
                                     :title "System data"
                                     :data (:stats params)}))))))
