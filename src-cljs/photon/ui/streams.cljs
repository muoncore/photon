(ns photon.ui.streams
  (:use [jayq.core :only [$ css html]])
  (:require [om.next :as om :refer-macros [defui]]
            [om.dom :as dom]
            [photon.ui.ws :as ws]))

(def k->header {:stream "Stream name"
                :fn "Function"
                :export "Export"
                :last-error "Last error"
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
                :schema "Schema URL"
                :service-id "Sending Service"
                :local-id "Local UUID"
                :photon-timestamp "Photon Timestamp"
                :server-timestamp "Service Timestamp"
                :projection-name "Projection name"})

(defn clean-stream [stream]
  (-> stream
      (dissoc :schemas)
      (assoc :export :action/export-stream)))

(defn strip-event [event]
  (assoc (dissoc event :payload :provenance :order-id)
         :payload-size (count (pr-str (:payload event)))
         :url (str ws/localhost "/api/event/" (:stream-name event)
                   "/" (:order-id event))))

(defui EventListItem
  Object
  (render
   [this]
   (let [params (om/props this)
         event (:event params)
         data (:data params)
         payload (:payload event)
         id (str (:service-id event) ":" (:local-id event))]
     (let [current? (= (:current data) id)]
       (apply dom/tr
              nil
              (map #(dom/td nil
                            (condp = (key %)
                              :url
                              (dom/a #js
                                     {:href (val %)} (val %))
                              (str (val %))))
                   event)
              #_(if current?
                  (dom/pre
                   nil
                   (dom/code
                    #js {:className "clojure"}
                    (clj->str event)))))))))

(defui EventList
  Object
  (componentWillMount
   [this]
   (om/set-state! this {:stream (:stream (om/props this)) :events []}))
  (componentDidUpdate
   [_ _ _]
   (dorun (map #(.highlightBlock js/hljs %) ($ "code"))))
  (componentWillReceiveProps
   [this next-props]
   (if (not= (:stream next-props) (:stream (om/get-state this)))
     (do
       (om/set-state! this {:stream (:stream next-props) :events []})
       (ws/fn-update this (:stream next-props)))))
  (did-mount
   [this]
   (ws/fn-update this (:stream (om/params this))))
  (render
   [this]
   (dom/div
    nil
    (dom/h1 nil "Events")
    (apply dom/table #js
           {:className "table table-striped table-bordered table-hover table-heading"}
           (apply dom/tr nil
                  (map #(dom/th #js {:style #js {:border "1px"}}
                                (get k->header (key %) (name (key %))))
                       (strip-event (first (:events (om/get-state this))))))
           (map #((om/factory EventListItem) {:data (:data (om/props this))
                                                :event (strip-event %)})
                (:events (om/props this)))))))

(defui RowStream
  Object
  (render
   [this]
   (let [data (om/props this)]
     (apply dom/tr nil
            (map #(dom/td nil
                          (if (= :stream (key %))
                            (dom/a #js
                                   {:href "#"
                                    :onClick
                                    (fn [_]
                                      ((:fn-update data) (val %)))}
                                   (val %))
                            (if (= (val %) :action/export-stream)
                              (dom/a
                               #js {:href (str "/export/stream/"
                                               (:stream (:stream data)))}
                               "Export")
                              (val %))))
                 (:stream data))))))

(defui ActiveStreams
  static om/IQuery
  (query [this] `[:stream-info])
  Object
  (render
   [this]
   (let [data (:stream-info (om/props this))
         active-stream (:active-stream (:ui-state data))
         streams (map clean-stream (:streams data))
         fn-update (fn [s]
                     (om/transact!
                      this `[(ui/update {:k :active-stream :v ~s})
                             :stream-info]))]
     (dom/div
      #js {:className "streams"}
      (dom/p nil (pr-str (:ui-state data)))
      (dom/table
       #js
       {:className (str "table table-striped table-bordered "
                        "table-hover table-heading streams-table")}
       (apply dom/tbody
              nil
              (apply dom/tr nil
                     (map #(dom/th nil
                                   (k->header %))
                          (keys (first streams))))
              (map #((om/factory RowStream)
                     {:data (:data data)
                      :stream %
                      :fn-update fn-update})
                   streams)))
      (if (not (nil? active-stream))
        ((om/factory EventListItem)
         {:data (:data data)
          :stream active-stream}))))))
