(ns photon.ui.components
  (:use [jayq.core :only [$ css html]])
  (:require [photon.ui.ws :as ws]
            [photon.ui.actions :as actions]
            [om.next :as om :refer-macros [defui]]
            [om.dom :as dom]
            [cljs.pprint :as pprint]))

(def k->header {:stream "Stream name"
                :fn "Function"
                :export "Export"
                :last-error "Last error"
                :contents "Contents"
                :current-value "Current value"
                :avg-time "Avg. time/event"
                :status "Status"
                :url "Data link"
                :language "Language"
                :payload-size "Payload size"
                :processed "Events processed"
                :last-event "Last event processed"
                :stream-name "Target stream"
                :total-events "Stream size"
                :encoding "Encoding"
                :init-time "Created at"
                :schema "Schema URL"
                :service-id "Sending Service"
                :local-id "Local UUID"
                :photon-timestamp "Photon Timestamp"
                :server-timestamp "Service Timestamp"
                :action/show-payload "Payload"
                :projection-name "Projection name"})

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
       (dom/div #js {:className "clearfix"}))
      (dom/div
       #js {:className "x_content"} ((om/factory component) data))))))

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

(defui TableButton
  Object
  (render
   [this]
   (let [{:keys [title type]} (om/props this)]
     (dom/a
      #js {:className (str "DTTT_button " type)}
      (dom/span nil title)
      (dom/div #js {:style #js {:position "absolute"
                                :left "0px"
                                :top "0px"
                                :width "45px"
                                :height "28px"
                                :zIndex "99"}})))))

(defui TableExports
  Object
  (render
   [this]
   (apply dom/div
          #js {:className "DTTT_container"}
          (map (om/factory TableButton)
               [{:type "DTTT_button_copy" :title "Copy"}
                {:type "DTTT_button_csv" :title "CSV"}
                {:type "DTTT_button_xls" :title "Excel"}
                {:type "DTTT_button_pdf" :title "PDF"}
                {:type "DTTT_button_print" :title "Print"}]))))

(defui TableLengthSelect
  Object
  (render
   [this]
   (dom/div
    #js {:className "dataTables_length"}
    (dom/label
     nil
     "Show "
     (dom/select
      #js {:size "1"
           :style #js {:width "56px"
                       :padding "6px"
                       :name "length"
                       :ariaControls "example"}}
      (dom/option #js {:value "10"} 10)
      (dom/option #js {:value "25"} 10)
      (dom/option #js {:value "50"} 10)
      (dom/option #js {:value "50"} 100))
     " entries"))))

(defui TableFilter
  Object
  (render
   [this]
   (dom/div
    #js {:className "dataTables_filter"}
    (dom/label
     nil "Search all columns: "
     (dom/input #js {:type "text" :ariaControls "example"})))))

(defui TableChecker
  Object
  (render
   [this]
   (dom/div
    #js {:className "icheckbox_flat-green"
         :style #js {:position "relative"}}
    (dom/input
     #js {:type "checkbox"
          :className "tableflat"
          :style #js {:position "absolute"
                      :opacity "0"}})
    (dom/ins
     #js {:className "iCheck-helper"
          :style #js {:position "absolute"
                      :top "0%" :left "0%"
                      :display "block" :width "100%"
                      :height "100%" :margin "0px"
                      :padding "0px" :border "0px"
                      :opacity "0"
                      :background "rgb(255, 255, 255)"}}))))

(defn display-cell [x all owner]
  (if (keyword? x)
    (if-let [action (get actions/k->action x)]
      ((om/factory action) {:item all :prop x :owner owner})
      (name x))
    (str x)))

(defui TableRow
  Object
  (render
   [this]
   (let [{:keys [idx item owner]} (om/props this)
         oddness (if (= (mod idx 2) 0) "odd" "even")]
     (apply dom/tr
            #js {:className (str "pointer " oddness)}
            (dom/td
             #js {:className "a-center sorting_1"}
             ((om/factory TableChecker)))
            (map #(dom/td nil (display-cell % item owner))
                 (vals (dissoc item :meta/original)))))))

(defn row-comparator [row-order]
  (let [order (apply merge (map-indexed #(hash-map %2 %1) row-order))
        order (assoc order :meta/original (count order))]
    (fn [a b]
      (< (get order a) (get order b)))))

(defn sort-by-row [row-order item]
  (if (or (nil? row-order) (empty? row-order))
    item
    (assoc
     (into (sorted-map-by (row-comparator row-order)) item)
     :meta/original (:meta/original item))))

(defui Table
  Object
  (render
   [this]
   (let [{:keys [data rows owner]} (om/props this)
         data (map (partial sort-by-row rows) data)
         headings (map k->header
                       (keys (dissoc (first data) :meta/original)))]
     (dom/div
      #js {:className "dataTables_wrapper" :role "grid"}
      ((om/factory TableExports))
      (dom/div #js {:className "clear"})
      ((om/factory TableLengthSelect))
      ((om/factory TableFilter))
      (dom/table
       #js {:className (str "table table-striped responsive-utilities "
                            "jambo_table dataTable")
            :ariaDescribedBy "example_info"}
       (dom/thead
        nil
        (apply dom/tr
               #js {:className "headings" :role "row"}
               (dom/th
                #js {:className "sorting_disabled"
                     :role "columnheader" :rowSpan "1" :colSpan "1"
                     :aria-label " "
                     :style #js {:width "38px"}}
                ((om/factory TableChecker)))
               (map #(dom/th
                      #js {:className "sorting"
                           :role "columnheader"
                           :tabIndex "0" :ariaControls "example"
                           :rowSpan "1" :colSpan "1"
                           :aria-label %} %)
                    headings)))
       (apply dom/tbody
              #js {:role "alert" :aria-live "polite" :aria-relevant "all"}
              (map-indexed #((om/factory TableRow)
                             {:idx %1 :item %2 :owner owner})
                           data)))))))

(defui Modal
  Object
  (componentDidMount
   [this]
   (.on ($ (om/react-ref this "modal")) "hide.bs.modal"
        (:onHide (om/props this))))
  (render
   [this]
   (let [{:keys [id title component]} (om/props this)]
     (dom/div
      #js {:id id
           :ref "modal"
           :className "modal fade" :tabIndex "-1"
           :role "dialog" :aria-labelledby "myModalLabel"}
      (dom/div
       #js {:className "modal-dialog modal-lg"}
       (dom/div
        #js {:className "modal-content"}
        (dom/div
         #js {:className "modal-header"}
         (dom/button
          #js {:type "button"
               :className "close"
               :data-dismiss "modal"}
          (dom/span
           #js {:aria-hidden "true"}
           "x"))
         (dom/h4 #js {:className "modal-title"} title))
        (dom/div #js {:className "modal-body"} component)
        (dom/div
         #js {:className "modal-footer"}
         (dom/button
          #js {:type "button" :className "btn btn-default"
               :data-dismiss "modal"}
          "Close"))))))))

(defn clj->str [c]
  (clojure.string/replace
   (with-out-str (pprint/pprint c)) #"}nil" "}"))

(defui CodeBlock
  Object
  (componentDidMount
   [this]
   (dorun (map #(.highlightBlock js/hljs %) ($ "pre code"))))
  (componentDidUpdate
   [this _ _]
   (println "hola")
   (.highlightBlock js/hljs ($ (om/react-ref this "code"))))
  (render
   [this]
   (let [c (om/props this)]
     (dom/pre
      nil
      (dom/code
       #js {:className "clojure"}
       (if (string? c) c (clj->str c)))))))

(defui LabelAndSomething
  Object
  (render
   [this]
   (dom/div
    #js {:className "form-group"}
    (dom/label
     #js {:className "control-label col-md-3 col-sm-3 col-xs-12"}
     (:label (om/props this)))
    (dom/div
     #js {:className "col-md-6 col-sm-6 col-xs-12"}
     (:component (om/props this))))))

(defui LabelAndTextInput
  Object
  (render
   [this]
   ((om/factory LabelAndSomething)
    (assoc (om/props this)
           :component
           (dom/input
            #js {:className "form-control col-md-7 col-xs-12"
                 :name "stream-name"
                 :type "text"
                 :ref "name"
                 :value (:val (om/props this))
                 :onChange
                 (fn [ev]
                   (om/transact!
                    (:owner (om/props this))
                    `[(ui/update ~{:k (:key (om/props this))
                                   :v (.-value (.-target ev))})]))})))))

(defui LabelAndFileInput
  Object
  (render
   [this]
   ((om/factory LabelAndSomething)
    {:label "Input file"
     :component (dom/input
                 #js {:type "file"
                      :name (:name (om/props this))})})))

(defui FormButton
  Object
  (render
   [this]
   (dom/div
    #js {:className "col-md-6 col-sm-6 col-xs-12 col-md-offset-3"}
    (dom/button
     #js {:type "submit" :className "btn btn-default" :value "submit"}
     (:text (om/props this))))))
