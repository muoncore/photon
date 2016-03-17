(ns photon.ui.components
  (:use [jayq.core :only [$ css html]])
  (:require [photon.ui.ws :as ws]
            [om.next :as om :refer-macros [defui]]
            [om.dom :as dom]))

(defui StatTile
  Object
  (render
   [this]
   (let [{:keys [text subtext datum icon total]} (om/props this)
         n3 (int (/ 12 total))]
     (dom/div
      #js {:className (str "flipInY col-lg-" n3 " col-md-" n3
                           " col-sm-6 col-xs-12")}
      (dom/div
       #js {:className "tile-stats"}
       (dom/div
        #js {:className "icon"}
        (dom/i #js {:className (str "fa " icon)}))
       (dom/div #js {:className "count"} (str datum))
       (dom/h3 nil text)
       (dom/p nil subtext))))))

(defui TileRow
  Object
  (render
   [this]
   (apply dom/div
          #js {:className "row top_tiles"}
          (let [props (om/props this)
                total (count props)]
            (map #((om/factory StatTile) (assoc % :total total)) props)))))

(defui TableListRow
  Object
  (render
   [this]
   (let [{:keys [left right]} (om/props this)]
     (dom/tr
      nil
      (dom/td nil left)
      (dom/td #js {:className "fs15 fw700 text-right"} right)))))

(defui TableList
  Object
  (render
   [this]
   (let [items (om/props this)]
     (dom/table
      #js {:className "countries_list"}
      (apply dom/tbody nil (map (om/factory TableListRow) items))))))

(defn vector-chart [length {:keys [data name]}]
  (clj->js
   (if (nil? data) [name] (concat [name] (take-last length data)))))

(defui Chart
  Object
  (componentDidMount
   [this]
   (let [{:keys [id]} (om/props this)
         options {:bindto (str "#" id)
                  :data {:x "x"
                         :columns []
                         :type "area"}
                  :point {:show false}
                  :axis {:y {:tick {:count 5}
                             :min 0
                             :max 100
                             :padding {:bottom 0
                                       :top 0}
                             :label "%"}
                         :x {:type "timeseries"
                             :tick {:count 5
                                    :format "%H:%M:%S"}}}
                  #_#_:tooltip {:show false}
                  :transition {:duration 0}}
         chart (.generate js/c3 (clj->js options))]
     (om/set-state! this {:chart chart})))
  (componentDidUpdate
   [this prev-props prev-state]
   (let [{:keys [sets timestamps]} (om/props this)
         chart (:chart (om/get-state this))
         length (count timestamps)
         vectors-data (map (partial vector-chart length) sets)]
     (if-let [x-axis (clj->js (concat ["x"] timestamps))]
       (.load chart #js {:columns
                         (clj->js (into [] (concat [x-axis] vectors-data)))})
       (.load chart #js {:columns (clj->js (into [] vectors-data))}))))
  (render
   [this]
   (let [{:keys [id]} (om/props this)]
     (dom/div #js {:id id}))))

(defui Panel
  Object
  (render
   [this]
   (let [{:keys [data component title]} (om/props this)]
     (dom/div
      #js {:className "x_panel"}
      (dom/div
       #js {:className "x_title"}
       (dom/h2 nil title)
       (dom/ul
        #js {:className "nav navbar-right panel_toolbox"}
        (dom/li
         nil
         (dom/a #js {:className "collapse-link"}
                (dom/i #js {:className "fa fa-chevron-up"})))
        (dom/li
         #js {:className "dropdown"}
         (dom/a #js {:href "#" :className "dropdown-toggle"
                     :data-toggle "dropdown" :role "button"
                     :aria-expanded "false"}
                (dom/i #js {:className "fa fa-wrench"}))
         (dom/ul #js {:className "dropdown-menu" :role "menu"}
                 (dom/li nil (dom/a #js {:href "#"} "Settings"))))
        (dom/li
         nil
         (dom/a #js {:className "close-link"}
                (dom/i #js {:className "fa fa-close"}))))
       (dom/div #js {:className "clearfix"})
       (dom/div
        #js {:className "x_content"}
        ((om/factory component) data)))))))

(defui HalfPanel
  Object
  (render
   [this]
   (dom/div
    #js {:className "col-md-6 col-sm-6 col-xs-6"}
    ((om/factory Panel) (om/props this)))))

(defui LongPanel
  Object
  (render
   [this]
   (dom/div
    #js {:className "col-md-12 col-sm-12 col-xs-12"}
    ((om/factory Panel) (om/props this)))))
