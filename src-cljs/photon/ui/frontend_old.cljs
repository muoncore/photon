(ns photon.ui.frontend-old
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:use [jayq.core :only [$ css html]])
  (:require [cljs-http.client :as client]
            [cljs.core.async :refer [chan <! >! put! close!]]
            [tailrecursion.cljson :refer [clj->cljson cljson->clj]]
            [chord.client :refer [ws-ch]]
            [goog.net.cookies :as ck]
            [goog.events :as events]
            [cljs.pprint :as pprint]
            [om.next :as om :refer-macros [defui]]
            [goog.dom :as gdom]
            [om.core :as omo]
            [om.dom :as dom])
  (:import goog.net.IframeIo
           goog.net.EventType))

(defonce app-state (atom {:stream nil
                          :current nil
                          :initial-value ""
                          :active-page "Dashboard"
                          :reduction ""
                          :projections []
                          :analyse-stream nil
                          :new-projection false}))

(defonce localhost (let [href (.-href (.-location js/window))]
                     (clojure.string/join
                      "/"
                      (drop-last (clojure.string/split href #"/")))))
(defonce ws-localhost (let [tokens (clojure.string/split localhost #":")
                            prefix (if (= (first tokens) "https")
                                     "wss" "ws")]
                        (clojure.string/join
                         ":" (conj (rest tokens) prefix))))

(defn js->cljk [n]
  (.log js/console "js->cljk")
  (js->clj n :keywordize-keys true))

(defn call-api
  ([f url]
   (call-api f url ""))
  ([f url qs]
   (let [query (str url (if (or (nil? qs) (= "" qs))
                          ""
                          (str "?" qs)))]
     #_(.log js/console query)
     (f query))))

(defn call-oauth [f & args]
  (let [m (if (> (count args) 1)
            (merge (second args) {})
            {})]
    #_(.log js/console (pr-str m))
    (f (first args) m)))

(defn ws-api   [& args] (apply call-api ws-ch args))
(defn get-api  [& args] (apply call-oauth client/get args))
(defn post-api [& args] (apply call-oauth client/post args))

(defn clj->str [c]
  (clojure.string/replace
   (with-out-str (pprint/pprint c)) #"}nil" "}"))

(defn proj->streams [reg]
  (map #(assoc (val %) :stream (key %)) reg))

(defn update-box [owner box-ref]
  (.highlightBlock js/hljs (omo/get-node owner box-ref)))

(defn widget-new-projection [params owner]
  (reify
    omo/IInitState
    (init-state [_]
      {})
    omo/IDidMount
    (did-mount [_]
      (update-box owner "code-box")
      (update-box owner "initial-value-box"))
    omo/IRenderState
    (render-state [_ data]
      (dom/div
          #js {:className "new-projection"}
        (dom/h1 #js {:className "view-title"} "New Projection")
        (dom/div
            #js {:className "box"}
          (dom/div
              nil
            (dom/label #js {:className "input-label"} "Projection name")
            (dom/input
                #js {:className "wide-input"
                     :type "text" :ref "name"
                     :value (:projection-name data)
                     :onChange
                     (fn [ev]
                       (omo/set-state! owner :projection-name
                                         (.-value (.-target ev))))}))
          (dom/div
              nil
            (dom/label #js {:className "input-label"} "Stream name")
            (dom/input
                #js {:className "wide-input"
                     :type "text" :ref "name"
                     :value (:stream-name data)
                     :onChange
                     (fn [ev]
                       (omo/set-state! owner :stream-name
                                         (.-value (.-target ev))))}))
          (apply dom/div
                 #js {:className "radio"}
                 "Language:"
                 (map #(dom/div
                        nil
                        (dom/input
                         #js {:type "checkbox"
                              :checked (= % (:language data))
                              :onChange
                              (fn [ev] (omo/set-state! owner :language %))})
                        %)
                      ["clojure" "javascript"]))
          (dom/div nil "Initial value")
          (dom/pre
           nil
           (dom/code #js {:className "clojure"}
                     (dom/div
                      #js {:contentEditable "true"
                           :ref "initial-value-box"
                           :className "clojure"
                           :onBlur
                           (fn [ev]
                             (omo/set-state! owner :initial-value
                                            (.-textContent (.-target ev)))
                             (update-box owner "initial-value-box"))}
                      (:initial-value data))))
          (dom/div nil "Code: content of (fn [prev item] ... )")
          (dom/pre
           nil
           (dom/code #js {:className "clojure"}
                     (dom/div
                      #js {:contentEditable "true"
                           :ref "code-box"
                           :className "clojure"
                           :onBlur
                           (fn [ev]
                             (omo/set-state! owner :reduction
                                            (.-textContent (.-target ev)))
                             (update-box owner "code-box"))}
                      (:reduction data))))
          (dom/div
           nil
           (dom/button
            #js {:onClick
                 (fn [_]
                   (go
                     (<! (post-api "/api/projection"
                                   {:json-params
                                    (select-keys data
                                                 [:projection-name
                                                  :stream-name
                                                  :initial-value
                                                  :reduction
                                                  :language])}))))}
            "Register projection")))))))

(defn subscribe-projections! [owner]
  (go
    (let [{:keys [ws-channel error]}
          (<! (ws-api (str ws-localhost "/ws/ws-projections")))]
      (if-not error
        (do
          (>! ws-channel {:ok true})
          (loop [elem (<! ws-channel)]
            (when-not (nil? elem)
              (if (contains? elem :error)
                (do
                  #_(.log js/console (pr-str elem)))
                (swap! app-state
                       #(assoc % :projections
                               (:projections (:message elem)))))
              (>! ws-channel {:ok true})
              (recur (<! ws-channel)))))
        (do (.log js/console "Error:" (pr-str error)))))))

(defn get-chart-data [new-val previous last-25 is-first?]
  (let [difference (if is-first? 0 (- new-val previous))
        new-last-25 (into [] (take-last 25 (conj last-25 difference)))]
    new-last-25))

(defn subscribe-stats! [owner]
  (go
    (let [{:keys [ws-channel error]}
          (<! (ws-api (str ws-localhost "/ws/ws-stats")))]
      (if-not error
        (do
          (>! ws-channel {:ok true})
          (loop [elem (<! ws-channel)
                 last-25-processed []
                 last-25-incoming []
                 last-25-memory (repeat 25 0)
                 timestamps []
                 previous-processed 0
                 previous-incoming 0
                 is-first? true]
            (when-not (nil? elem)
              (if (contains? elem :error)
                (do
                  #_(.log js/console (pr-str elem)))
                (let [stats-from-msg (:stats (:message elem))
                      new-processed (get-chart-data (:processed stats-from-msg) previous-processed last-25-processed is-first?)
                      new-incoming (get-chart-data (:incoming stats-from-msg) previous-incoming last-25-incoming is-first?)
                      used-memory (- (:total-memory stats-from-msg) (:available-memory stats-from-msg))
                      used-memory-percentage (int (* (/ used-memory (:total-memory stats-from-msg)) 100))
                      new-memory (into [] (take-last 25 (conj last-25-memory used-memory-percentage)))
                      new-timestamps (into [] (take-last 25 (conj timestamps (.getTime (js/Date.)))))
                      stats (assoc stats-from-msg :last-25 {:processed new-processed
                                                            :incoming new-incoming
                                                            :memory new-memory
                                                            :timestamps new-timestamps})]
                  (when-not is-first?
                    (swap! app-state #(assoc % :stats stats)))
                  (>! ws-channel {:ok true})
                  (recur (<! ws-channel) new-processed new-incoming new-memory new-timestamps (:processed stats-from-msg) (:incoming stats-from-msg) false))))))
        (do
          (.log js/console "Error:" (pr-str error)))))))

(defn subscribe-streams! [owner]
  (go
    (let [{:keys [ws-channel error]}
          (<! (ws-api (str ws-localhost "/ws/ws-projections")
                      "projection-name=__streams__"))]
      (if-not error
        (do
          (>! ws-channel {:projection-name "__streams__"})
          (loop [elem (<! ws-channel)]
            (when-not (nil? elem)
              (if (contains? elem :error)
                (do #_(.log js/console (pr-str elem)))
                (let [streams-proj (:message elem)]
                  (swap! app-state
                         #(assoc % :streams
                                 (proj->streams (:current-value streams-proj))))))
              (>! ws-channel {:projection-name "__streams__"})
              (recur (<! ws-channel)))))
        (do #_(.log js/console "Error:" (pr-str error)))))))

(defn filter-projection [proj]
  (assoc
   (select-keys proj [:stream
                      :avg-time :status :language :processed
                      :stream-name :projection-name])
   :url (str localhost "/api/projection/" (:projection-name proj))))

(defn projection-item [params owner]
  (reify
    omo/IRender
    (render [_]
      (let [filtered (filter-projection (:projection params))]
        (apply dom/tr nil
                     (map #(dom/td nil
                             (condp = (key %)
                               :url
                              (dom/a #js
                                 {:href (val %)} (val %))
                               :projection-name
                               (dom/a #js
                                 {:href "#"
                                  :onClick
                                  (fn [_]
                                    ((:fn-update params) (:projection params)))}
                                 (val %))
                               (str (val %))))
                          filtered))))))

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

(defn code-block [c owner]
  (reify
    omo/IDidMount
    (did-mount [_]
      #_(.log js/console "Update: code-block")
      (dorun (map #(.highlightBlock js/hljs %) ($ "code"))))
    omo/IDidUpdate
    (did-update [_ _ _]
      (dorun (map #(.highlightBlock js/hljs %) ($ "code"))))
    omo/IRender
    (render [_]
      (dom/pre nil
               (dom/code #js
                         {:className "clojure"}
                         (if (string? c) c (clj->str c)))))))

(defn widget-projections [data owner]
  (reify
    omo/IInitState
    (init-state [_]
      {:active-projection nil})
    omo/IRenderState
    (render-state [_ state]
      (let [fn-update (fn [new-active-projection]
                        (omo/update-state! owner (fn [state]
                                                  (assoc state
                                                         :active-projection
                                                         new-active-projection))))]
        (dom/div #js {:className "projections"}
          (dom/h1 #js {:className "view-title"} "Projections")
          (dom/div
           #js {:className "button"
                :onClick (fn [_]
                           (swap! app-state
                                  (fn [state]
                                    #_(.log js/console (pr-str state))
                                    (assoc state :active-page "New Projection"))))}
           "+ New Projection")
          (apply dom/table #js
            {:className "table table-striped table-bordered table-hover table-heading"}
            (apply dom/tr nil
              (map #(dom/th #js {:style #js {:border "1px"}}
                            (k->header (key %)))
                   (filter-projection
                    (first (:projections data)))))
            (map #(omo/build projection-item {:data data
                                             :projection %
                                             :fn-update fn-update})
                 (:projections data)))
          (if (not (nil? (:active-projection state)))
            (let [block (omo/build code-block (:active-projection state))]
              block)))))))

(defn update-chart! [chart data timestamps name]
  (let [vector-data (clj->js (concat [name] data))]
    #_(.log js/console vector-data)
    (if-let [x-axis (clj->js (concat ["x"] timestamps ))]
      (.load chart #js {:columns #js [x-axis vector-data]}) (.load chart #js {:columns #js [vector-data]}))))

(defn widget-dashboard [params owner]
  (reify
    omo/IInitState
    (init-state [_]
      {:events-processed-chart nil
       :events-incoming-chart nil
       :memory-usage-chart nil})
    omo/IDidMount
    (did-mount [_]
      (let [events-incoming-chart (.generate js/c3
                             #js {:bindto "#events-incoming"
                                  :data
                                  #js {:x "x"
                                       :columns #js []
                                       :colors #js {"Events Incoming" "#800000"}}
                                  :axis
                                  #js {:y #js {:min 0
                                               :padding #js {:bottom 10}
                                               :label "Events"}
                                       :x #js {:type "timeseries"
                                               :tick #js {:count 5
                                                          :format "%H:%M:%S"}}}
                                  :transition
                                  #js {:duration 0}})
            events-processed-chart (.generate js/c3
                             #js {:bindto "#events-processed"
                                  :data
                                  #js {:x "x"
                                       :columns #js []
                                       :colors #js {"Events Processed" "#009000"}}
                                  :axis
                                  #js {:y #js {:min 0
                                               :padding #js {:bottom 10}
                                               :label "Events"}
                                       :x #js {:type "timeseries"
                                               :tick #js {:count 5
                                                          :format "%H:%M:%S"}}}
                                  :transition
                                  #js {:duration 0}})
            memory-usage-chart (.generate js/c3
                             #js {:bindto "#memory-usage"
                                  :size
                                  #js {:height 150
                                       :width 250}
                                  :data
                                  #js {:columns #js []
                                       :colors #js {"Memory Usage" "#009000"}
                                       :type "area"}
                                  :point
                                  #js {:show false}
                                  :axis
                                  #js {:y #js {:tick #js {:count 5}
                                               :min 0
                                               :max 100
                                               :padding #js {:bottom 0
                                                             :top 0}
                                               :label "%"}
                                       :x #js {:show false}}
                                  :tooltip
                                  #js {:show false}
                                  :transition
                                  #js {:duration 0}})]
        (omo/update-state! owner (fn [state] (assoc state :events-processed-chart events-processed-chart :events-incoming-chart events-incoming-chart :memory-usage-chart memory-usage-chart)))))
    omo/IRenderState
    (render-state [_ state]
      #_(.log js/console (pr-str (:projections params)))
      (if-let [events-incoming-chart (:events-incoming-chart state)]
        (update-chart! events-incoming-chart (:incoming (:last-25 (:stats params))) (:timestamps (:last-25 (:stats params))) "Events Incoming"))
      (if-let [events-processed-chart (:events-processed-chart state)]
        (update-chart! events-processed-chart (:processed (:last-25 (:stats params))) (:timestamps (:last-25 (:stats params))) "Events Processed"))
      (if-let [memory-usage-chart (:memory-usage-chart state)]
        (update-chart! memory-usage-chart (:memory (:last-25 (:stats params))) nil "Memory Usage"))
      (dom/div #js {:className "dashboard"}
        (dom/div
          #js {:className "col-sm-12 col-md-12 col-lg-6"}
          (dom/div
            #js {:id "events-incoming"}))
        (dom/div
          #js {:className "col-sm-12 col-md-12 col-lg-6"}
          (dom/div
            #js {:id "events-processed"}))
        (dom/div
          #js {:className "col-sm-12 col-md-12 col-lg-6"}
          (dom/div
            #js {:className "widget-box"}
            (dom/span
              #js {:className "title"}
                "Summary")
            (dom/div
              #js {:className "summary"}
            (dom/span
              #js {:className "data"}
                "Streams: " (count (:streams params)))
            (dom/span
              #js {:className "data"}
                "Projections: " (count (:projections params))))))
        (dom/div
          #js {:className "col-sm-12 col-md-12 col-lg-6"}
          (dom/div
            #js {:className "widget-box"}
            (dom/span
              #js {:className "title"}
                "System Data")
              (dom/div
                #js {:className "system-data"}
                (dom/div
                 #js {:id "memory-usage"})
                (dom/span
                  #js {:className "data"}
                    "Total Memory (KB): " (quot (:total-memory (:stats params)) 1024))
                (dom/span
                  #js {:className "data"}
                    "Used Memory (KB): " (quot
                                           (- (:total-memory (:stats params)) (:available-memory (:stats params))) 1024))
                (dom/span
                  #js {:className "data"}
                    "Available Memory (KB): " (quot (:available-memory (:stats params)) 1024))
                (dom/span
                  #js {:className "data"}
                    "CPU Load: " (:cpu-load (:stats params)) "%"))))
        #_(dom/div
          #js {:className "col-sm-12 col-md-6 col-lg-4"}
          (dom/div
            #js {:className "widget-box"}
            (dom/span
              #js {:className "title"}
                "Control Panel")
            (dom/span
              #js {:className "large-value"}
              (dom/button #js {:onClick (fn [_])} "Restart"))))
        #_(dom/div
          #js {:className "col-sm-12 col-md-6 col-lg-4"}
          (dom/div
            #js {:className "widget-box"}
            (dom/span
              #js {:className "title"}
                "title")
            (dom/span
              #js {:className "large-value"}
                "5")))
        #_(dom/div
          #js {:className "col-sm-12 col-md-6 col-lg-4"}
          (dom/div
            #js {:className "widget-box"}
            (dom/span
              #js {:className "title"}
                "title")
            (dom/span
              #js {:className "large-value"}
                "6")))))))


(defn event-list-item [params]
  (reify
    omo/IRender
    (render [_]
      (let [event (:event params)
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
                         (clj->str event))))))))))

(defn fn-update [owner stream-name]
  (go (let [response
            (:body (<! (get-api (str "/api/stream-contents/"
                                     stream-name))))]
        #_(.log js/console response)
        (omo/update-state!
         owner
         #(assoc % :events (:results response))))))

(defn strip-event [event]
  (assoc (dissoc event :payload :provenance :order-id)
         :payload-size (count (pr-str (:payload event)))
         :url (str localhost "/api/event/" (:stream-name event)
                   "/" (:order-id event))))

(defn event-list [params owner]
  (reify
    omo/IInitState
    (init-state [this]
      {:stream (:stream params)
       :events []})
    omo/IDidUpdate
    (did-update [_ _ _]
      (dorun (map #(.highlightBlock js/hljs %) ($ "code"))))
    omo/IWillReceiveProps
    (will-receive-props [this next-props]
      (if (not= (:stream next-props) (:stream (omo/get-state owner)))
        (do
          (omo/update-state! owner (fn [_] {:stream (:stream next-props)
                                           :events []}))
          (fn-update owner (:stream next-props)))))
    omo/IDidMount
    (did-mount [this]
      (fn-update owner (:stream params)))
    omo/IRenderState
    (render-state [_ state]
      (dom/div nil
        (dom/h1 nil "Events")
        (apply dom/table #js
               {:className "table table-striped table-bordered table-hover table-heading"}
               (apply dom/tr nil
                      (map #(dom/th #js {:style #js {:border "1px"}}
                                    (get k->header (key %) (name (key %))))
                           (strip-event (first (:events state)))))
               (map #(omo/build event-list-item {:data (:data params)
                                                :event (strip-event %)})
                    (:events state)))))))

(defn row-stream [data owner]
  (reify
    omo/IRender
    (render [_]
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

(defn add-select-state [option entry]
  (if (= option (:text entry))
    #js {:value option :selected "selected"}
    #js {:value option}))

(defn set-status [class title items]
  #_(.log js/console "set-status" class title items))

(defn handle-iframe-response [json-msg]
  (let [msg (js->cljk json-msg)]
    #_(.log js/console (str "iframe-response: " msg))
    (cond
      (= "OK" (:status msg)) (str "Uploaded to stream: " (:stream-name msg))
      :else (str "Unexpected error: " (pr-str msg)))))

(defn iframeio-upload-file [form-id owner]
  (let [el (.getDOMNode (omo/get-node owner form-id))
        iframe (IframeIo.)]
    #_(.log js/console el)
    (events/listen iframe EventType.COMPLETE
        (fn [event]
          (omo/update-state! owner
                            (fn [state]
                              (assoc state
                                     :upload-status
                                     (handle-iframe-response
                                      (.getResponseJson iframe)))))
          (.dispose iframe)))
    (.sendFromForm iframe el)))

(defn widget-new-stream [props owner]
  (reify
    omo/IInitState
    (init-state [_]
      {:name ""
       :select-value "pev"
       :upload-status ""
       :stream-file nil})
    omo/IRenderState
    (render-state [_ state]
      (dom/div
          #js {:className "new-stream"}
        (dom/form #js {:ref "upload-form"
                       :method "POST"
                       :encType "multipart/form-data"
                       :onSubmit (fn [e]
                                   (.preventDefault e)
                                   (omo/update-state! owner
                                                     (fn [state]
                                                       (assoc state
                                                              :upload-status
                                                              "Uploading...")))
                                   (iframeio-upload-file "upload-form"
                                                         owner))
                       :action "/api/new-stream"}
          (dom/h1 #js {:className "view-title"} "New Stream")
          (:upload-status state)
          (dom/div
              #js {:className "box"}
            (dom/div
                nil
              (dom/label #js {:className "input-label"} "Stream name (optional)")
              (dom/input
                  #js {:className "wide-input"
                       :name "stream-name"
                       :type "text"
                       :ref "name"
                       :value (:name state)
                       :onChange
                       (fn [ev]
                         (omo/update-state!
                          owner
                          (fn [state]
                            (assoc state :name (.-value (.-target ev))))))}))
            (dom/div
                #js {:className "radio"}
              "Source type:"
              (dom/select
               #js {:onChange
                    (fn [ev]
                      (omo/update-state!
                       owner
                       (fn [state]
                         (assoc state :select-value
                                (.-value (.-target ev))))))}
               (dom/option
                (add-select-state "pev"
                                  (:select-value state))
                "PEV file")
               (dom/option
                (add-select-state "file"
                                  (:select-value state))
                "JSON sequence file")))
            (condp = (:select-value state)
              "file" (dom/div nil
                       (dom/input #js
                           {:type "file"
                            :name "upload-file-name"})
                       (dom/button
                           #js {:type "submit"
                                :value "submit"}
                         "Declare stream"))
              "pev" (dom/div nil
                      (dom/input #js
                          {:type "file"
                           :name "upload-pev-name"})
                      (dom/button
                          #js {:type "submit"
                               :value "submit"}
                        "Declare stream")))))))))

(defn clean-stream [stream]
  (-> stream
      (dissoc :schemas)
      (assoc :export :action/export-stream)))

(defn widget-streams [data owner]
  (reify
    omo/IInitState
    (init-state [_]
      {:active-stream nil})
    omo/IRenderState
    (render-state [_ state]
      (let [streams (map clean-stream (:streams data))
            fn-update (fn [new-active-stream]
                        (omo/update-state! owner (fn [state]
                                                  (assoc state
                                                         :active-stream
                                                         new-active-stream))))]
        (dom/div #js {:className "streams"}
          (dom/h1 #js {:className "view-title"} "Streams")
          (dom/div
              #js {:className "button"
                   :onClick (fn [_]
                              (swap! app-state
                                     (fn [state]
                                       #_(.log js/console (pr-str state))
                                       (assoc state :active-page "New Stream"))))}
            "+ New Stream")
          (apply dom/table #js
                 {:className (str "table table-striped table-bordered "
                                  "table-hover table-heading streams-table")}
                 (apply dom/tr nil
                        (map #(dom/th nil
                                (k->header %))
                             (keys (first streams))))
                 (map #(omo/build row-stream {:data (:data data)
                                             :stream %
                                             :fn-update fn-update})
                      streams))
          (if (not (nil? (:active-stream state)))
            (omo/build event-list
                      {:data (:data data)
                       :stream (:active-stream state)})))))))

(defn menu-item [data owner]
  (reify
    omo/IRender
    (render [_]
      (let [class (if (= (:active-page @app-state) (:item data))
                    "menu-item active" "menu-item")]
        (dom/a #js
          {:className class
           :href "#"
           :onClick (fn [_]
                      (swap! app-state
                             (fn [state]
                               (assoc state :active-page (:item data)))))}
        (:item data))))))

(defui MenuItem
  Object
  (render
   [this]
   (let [class (if (= (:active-page @app-state) (:item data))
                 "menu-item active" "menu-item")]
     (dom/a #js
            {:className class
             :href "#"
             :onClick (fn [_]
                        (swap! app-state
                               (fn [state]
                                 (assoc state :active-page (:item data)))))}
            (:item data)))))

(defn main-menu [data owner]
  (reify
    omo/IRender
    (render [_]
      (dom/div
          #js {:className "menu-bar hidden-xs"}
        #_(dom/img #js {:src "/ui/images/photon.png"
                        :width "100%"
                        :height "auto"})
        (dom/h2 #js {:className "logo"} "Photon")
        (map
         #(do
            (omo/build menu-item {:data (:data data) :item %}))
         (:items data))))))

(defui MainMenu
  Object
  (render
   [_]
   (dom/div
    #js {:className "menu-bar hidden-xs"}
    #_(dom/img #js {:src "/ui/images/photon.png"
                    :width "100%"
                    :height "auto"})
    (dom/h2 #js {:className "logo"} "Photon")
    (map
     #(do
        ((om/factory MenuItem) {:data (:data data) :item %}))
     (:items data)))))

(defn login-page [data owner]
  (reify
    omo/IInitState
    (init-state [_]
      {:username ""
       :auth nil
       :password ""})
    omo/IRenderState
    (render-state [_ state]
      (let [upd (fn [k v]
                  (omo/update-state! owner (fn [old] (assoc old k v))))
            g (fn [k] (get state k))
            fn-post (fn []
                      (client/get "/auth/login"
                                  {:basic-auth {:username (g :username)
                                                :password (g :password)}}))
            fn-clk (fn [_]
                     (go (let [res (<! (fn-post))]
                           (upd :auth res))))]
        (if (= 200 (:status (:auth state)))
          (set! (.-location js/window) "/ui")
          (dom/div nil
                   (dom/p nil (if (= 401 (:status (:auth state)))
                                "Wrong credentials"))
                   (dom/label nil "Username")
                   (dom/input
                    #js {:name "username"
                         :value (g :username)
                         :onChange (fn [ev]
                                     (upd :username
                                          (.-value (.-target ev))))
                         :onKeyDown (fn [ev]
                                      (if (= 13 (.-keyCode ev))
                                        (fn-clk nil)))})
                   (dom/label nil "Password")
                   (dom/input
                    #js {:type "password" :name "password"
                         :value (g :password)
                         :onKeyDown (fn [ev]
                                      (if (= 13 (.-keyCode ev))
                                        (fn-clk nil)))
                         :onChange (fn [ev]
                                     (upd :password
                                          (.-value (.-target ev))))})
                   (dom/button #js {:type "Submit" :onClick fn-clk}
                               "Login")))))))

(defn list-streams [data owner]
  (let [upd (fn [v] (omo/update-state!
                     (:owner data)
                     (fn [old] (assoc old :analyse-stream v))))]
    (reify
      omo/IRender
      (render [_]
        (dom/div nil
                 (dom/p nil "Choose stream:")
                 (apply dom/select
                        #js {:onChange (fn [x]
                                         (upd (.-value (.-target x))))}
                        (map #(dom/option
                               (add-select-state
                                % {:text (:analyse-stream data)}) %)
                             (:streams data))))))))

(defn list-versions [data owner]
  (reify
    omo/IWillReceiveProps
    (will-receive-props [_ next-props]
      (let [svs (omo/get-node owner "schema-version-select")
            cv (cljs.reader/read-string (.-value svs))]
        (when-not (contains? (:schemas (:schema next-props)) cv)
          (omo/update-state!
           (:owner next-props)
           (fn [old]
             (assoc old :analyse-version (first (keys (:schemas (:schema next-props))))))))))
    omo/IRender
    (render [_]
      (dom/div nil
               (dom/p nil "Schema version:")
               (apply dom/select
                      #js {:ref "schema-version-select"
                           :onChange
                           (fn [x]
                             (omo/update-state!
                              (:owner data)
                              (fn [old]
                                (assoc old :analyse-version
                                       (cljs.reader/read-string (.-value (.-target x)))))))}
                      (map #(dom/option
                             (add-select-state (pr-str %) nil) (pr-str %))
                           (keys (:schemas (:schema data)))))))))

(def type-mappings {"s/Str" "string"
                    "s/Num" "num"
                    {:_ nil} "null"
                    "s/Bool" "bool"})

(defn type->text [t]
  (get type-mappings t t))

(defn m->text [m]
  (let [t (map type->text m)
        tt (if (string? m) (type->text m) (clojure.string/join ", " t))]
    tt))

(declare tree->js)

(defmulti node->js
  (fn [[_ v]]
    (if (contains? v :leaf)
      :leaf
      (if-let [vv (get v "[]")]
        (if (contains? vv :leaf)
          :vector
          :vector-object)
        :tree))))

;; TODO: Encapsulate into CSS classes

(defn render-text [text mode]
  (condp = mode
    :required (str "<b>" text "</b>")
    :optional text
    :rare (str "<font color=\"#888888\">" text "</font>")
    (pr-str mode)))

(defmethod node->js :leaf [[k v]]
  (let [sch (:leaf v)
        ts (:type sch)
        tt (m->text ts)
        n (render-text (name k) (:mode sch)) ]
    {:text (str n " <i>[" tt "]</i>")
     :a_attr {:style "color: #111111;"}
     :schema sch
     :icon "ui/images/ic_short_text_black_18dp.png"}))

(defmethod node->js :vector-object [[k v]]
  (let [vv (get v "[]")]
    {:text (str (name k) " <i>[Array (Object)]</i>")
     :state {:opened false}
     :icon "ui/images/ic_grid_on_black_18dp.png"
     :children (tree->js vv)}))

(defmethod node->js :vector [[k v]]
  (let [vv (get v "[]")
        leaf (:leaf vv)
        under-type (m->text (:type leaf))]
    {:text (str (render-text (name k) (:mode leaf))
                " <i>[Array (" under-type ")]</i>")
     :schema leaf
     :icon "ui/images/ic_more_horiz_black_18dp.png"}))

(defmethod node->js :tree [[k v]]
  {:text (str "<i>" (name k) " [Object]</i>")
   :state {:opened false}
   :icon "ui/images/ic_folder_open_black_18dp.png"
   :children (tree->js v)})

(defn tree->js [tree]
  (map node->js tree))

(defn schema->tree [schema]
  (reduce #(assoc-in %1 (key %2) {:leaf (assoc (val %2) :path (key %2))})
          {} (:m schema)))

(defn produce-tree! [data ch ch-click]
  (let [tj (tree->js (schema->tree (:schema data)))
        cd (clj->js {:core {:data tj}})]
    (.jstree ($ :#tree) cd)
    (.on ($ :#tree) "select_node.jstree"
         (fn [_ data] (go (>! ch-click data))))
    (.on ($ :#tree) "hover_node.jstree"
         (fn [_ data] (go (>! ch data))))))

(defn clean-tree! [data]
  (let [tj (tree->js (schema->tree (:schema data)))
        cd (clj->js {:core {:data tj}})
        t (.jstree ($ :#tree) true)]
    (set! (.-data (.-core (.-settings t))) cd)
    (.destroy t)))

(defn var-inspector [data owner]
  (reify
    omo/IInitState
    (init-state [_]
      {:jstree.node nil})
    omo/IDidMount
    (did-mount [_]
      (go
        (loop [elem (<! data)]
          (when-not (nil? elem)
            (omo/update-state! owner
                              (fn [old] (assoc old :jstree.node elem)))
            (recur (<! data))))))
    omo/IRenderState
    (render-state [_ state]
      (when-not (nil? (:jstree.node state))
        (let [node (js->cljk (:jstree.node state))
              sch (-> node :node :original :schema)
              path (clojure.string/join "." (:path sch))]
          (apply dom/div
                 nil
                 (when-not (nil? sch)
                   [(dom/p nil path)
                    (dom/p nil (str "This parameter is probably " (:mode sch)))
                    (dom/p nil (when-not (= (:values sch) "not-enum")
                                 (str "Values found: "
                                      (clojure.string/join
                                       ", "
                                       (map name (keys (:values sch)))))))])))))))

(defn node->path [node]
  (let [node (js->cljk node)
        sch (-> node :node :original :schema)
        path (clojure.string/join "." (:path sch))]
    path))

(defn group-by-structure [gs]
  (let [nodes (map #(js->cljk %) gs)
        schs (map #(-> % :node :original :schema) nodes)
        paths (map #(into [] (map keyword (:path %))) schs)]
    (str "{:group-by {"
         (clojure.string/join
          " "
          (map (fn [x y]
                 (str (pr-str y)
                      " (-> next "
                      (clojure.string/join
                       " " (map #(str ":" %) (:path x)))
                      ")"))
               schs paths))
         "}}")))

(defn select-structure [gs]
  (let [nodes (map #(js->cljk %) gs)
        schs (map #(-> % :node :original :schema) nodes)
        paths (map #(clojure.string/join "." (:path %)) schs)
        bdgs (str "{"
                  (clojure.string/join
                   " "
                   (map (fn [x]
                          (let [v (into [] (map keyword (:path x)))
                                vt (clojure.string/join " " v)]
                            (str "[" vt "] (get-in next [" vt "])")))
                        schs))
                  "}")]
    (str "let [next (reduce (fn [m m2] "
         "(assoc-in m (key m2) (val m2))"
         ") {} " bdgs ")] ")))

(defn construct-code [m]
  (let [action-list (:action-list m)
        group-bys (:group-by action-list)
        gbs (group-by-structure group-bys)
        selects (:select action-list)
        let-body (when-not (empty? selects) (select-structure selects))
        action (if (empty? group-bys)
                 "(conj prev next)"
                 (str "(update prev "
                      gbs
                      " (fn [old] (if (nil? old)"
                      " [next] (conj old next)"
                      ")))"))
        iv (if (empty? group-bys) "[]" "{}")]
    [iv (str "(fn [prev next] "
             (if (empty? selects) action
                 (str "(" let-body action ")")) ")")]))

(def action-mappings {:group-by "Group by"
                      :select "Select"})

(defn action-item [{:keys [action fn-delete] :as data} owner]
  (reify
    omo/IRender
    (render [_]
      (let [k (key (first action))
            v (val (first action))
            path (node->path v)]
        (dom/p nil (str (get action-mappings k) " " path) " "
               (dom/a #js {:href "#"
                           :onClick (fn [ev] (fn-delete k v))}
                      "[X]"))))))

(defn action-list->actions [action-list]
  (mapcat (fn [k] (map #(hash-map k %) (get action-list k)))
          (keys action-list)))

(defn var-actions [data owner]
  (reify
    omo/IInitState
    (init-state [_]
      (go
        (loop [elem (<! (:ch data))]
          (omo/update-state! owner (fn [old] (assoc old :var elem)))
          (recur (<! (:ch data)))))
      {:var nil
       :action-list {}})
    omo/IRenderState
    (render-state [_ state]
      (if (nil? (:var state))
        (dom/p nil "Select a variable to get stated")
        (let [node (js->cljk (:var state))
              sch (-> node :node :original :schema)
              path (clojure.string/join "." (:path sch))
              [iv code] (construct-code state)
              upd (fn [k v]
                    (omo/update-state! owner (fn [o] (assoc o k v))))]
          (dom/div
           nil
           (dom/p nil (str "Selected variable: " path))
           (dom/button
            #js {:onClick
                 (fn [ev]
                   (omo/update-state!
                    owner
                    (fn [old] (update-in old [:action-list :group-by]
                                         #(conj (into #{} %) node)))))}
            "Group by")
           (dom/button
            #js {:onClick
                 (fn [ev]
                   (omo/update-state!
                    owner
                    (fn [old] (update-in old [:action-list :select]
                                         #(conj (into #{} %) node)))))}
            "Select")
           (.log js/console (:action-list->actions (:action-list state)))
           (apply dom/div
                  nil
                  (map #(omo/build action-item
                                  {:action %
                                   :fn-delete
                                   (fn [k v]
                                     (omo/update-state!
                                      owner
                                      (fn [old]
                                        (update-in old [:action-list k]
                                                   (fn [x] (disj x v))))))})
                       (action-list->actions (:action-list state))))
           (dom/label nil "Initial value")
           (omo/build code-block iv)
           (dom/label nil "Code")
           (omo/build code-block code)
           (dom/label nil "Projection name")
           (dom/input #js {:ref "projection-name"})
           (dom/button
            #js {:onClick
                 (fn [ev]
                   (let [pn (.-value (omo/get-node owner "projection-name"))]
                     (.log js/console (pr-str code))
                     (go
                       (<! (post-api "/api/projection"
                                     {:json-params
                                      {:projection-name pn
                                       :stream-name (:stream-name data)
                                       :initial-value iv
                                       :reduction code
                                       :language "clojure"}})))))}
            "Create projection")))))))

(defn stream-schema [data owner]
  (reify
    omo/IInitState
    (init-state [_]
      {:ch (chan)
       :ch-click (chan)})
    omo/IDidMount
    (did-mount [_]
      (produce-tree! data (:ch (omo/get-state owner))
                     (:ch-click (omo/get-state owner))))
    omo/IDidUpdate
    (did-update [_ _ _]
      (go (>! (:ch (omo/get-state owner)) ""))
      (clean-tree! data)
      (produce-tree! data (:ch (omo/get-state owner))
                     (:ch-click (omo/get-state owner))))
    omo/IRender
    (render [_]
      (dom/div
       nil
       (dom/div
        #js {:className "container"}
        (dom/div
         #js {:className "row"}
         (dom/div #js {:className "col-lg-4" :id "tree"})
         (dom/div
          #js {:className "col-lg-4"}
          (dom/div #js {:className "row small-widget-box"}
                   (omo/build var-inspector (:ch (omo/get-state owner))))
          (dom/div #js {:className "row small-widget-box"}
                   (omo/build var-actions {:ch (:ch-click (omo/get-state owner))
                                          :stream-name (:stream data)})))))
       #_(dom/p nil (pr-str data))))))

(defn widget-analyse [data owner]
  (reify
    omo/IInitState
    (init-state [_]
      (let [streams (map :stream (:streams data))
            def-schema (first (sort-by #(- (:total-events %))
                                       (:streams data)))
            default (:stream def-schema)]
        {:analyse-stream default
         :analyse-version (first (keys (:schemas def-schema)))
         :streams streams}))
    omo/IRenderState
    (render-state [_ state]
      (let [schema (first (filter #(= (:analyse-stream state) (:stream %))
                                  (:streams data)))
            my-schema (get (:schemas schema) (:analyse-version state))
            with-name (merge my-schema (dissoc schema :schemas))]
        (dom/div
         nil
         (dom/h2 nil "Data Analyser")
         (omo/build list-streams
                   {:owner owner
                    :analyse-stream (:analyse-stream state)
                    :streams (:streams state)})
         (omo/build list-versions {:owner owner :schema schema})
         (omo/build stream-schema with-name))))))

(defn full-page [data owner]
  (reify
    omo/IInitState
    (init-state [_]
      (assoc data :root-owner owner))
    omo/IDidMount
    (did-mount [_]
      (subscribe-streams! owner)
      (subscribe-projections! owner)
      (subscribe-stats! owner))
    omo/IRenderState
    (render-state [_ state]
      (dom/div
        nil
        (omo/build main-menu
                  {:data state
                   :items ["Dashboard" "Streams" "Projections" "Analyse Data"]})
        (dom/div nil
          (condp = (:active-page @app-state)
            "Dashboard" (omo/build widget-dashboard state)
            "Streams" (omo/build widget-streams (assoc state :full-page-owner owner))
            "Projections" (omo/build widget-projections (assoc state :full-page-owner owner))
            "New Projection" (omo/build widget-new-projection state)
            "New Stream" (omo/build widget-new-stream state)
            "Analyse Data" (when (contains? state :streams)
                             (omo/build widget-analyse state))))))))

(defui FullPage
  static omo/IQuery
  (query [this] [:active-page])
  Object
  (render
   [_]
   (dom/div
    nil
    (omo/build main-menu
              {:data state
               :items ["Dashboard" "Streams" "Projections" "Analyse Data"]})
    (dom/div nil
             (condp = (:active-page @app-state)
               "Dashboard" (omo/build widget-dashboard state)
               "Streams" (omo/build widget-streams (assoc state :full-page-owner owner))
               "Projections" (omo/build widget-projections (assoc state :full-page-owner owner))
               "New Projection" (omo/build widget-new-projection state)
               "New Stream" (omo/build widget-new-stream state)
               "Analyse Data" (when (contains? state :streams)
                                (omo/build widget-analyse state)))))))

(def reconciler (om/reconciler {:state app-state}))

#_(go
  (let [res (<! (get-api "/api/ping"))
        page (if (or (= (:status res) 500) (= (:status res) 401))
               login-page full-page)]
    (omo/root page app-state
             {:target (. js/document
                         (getElementById "main-area"))})))

(go
  (let [res (<! (get-api "/api/ping"))
        page (if (or (= (:status res) 500) (= (:status res) 401))
               FullPage FullPage)]
    (subscribe-streams! owner)
    (subscribe-projections! owner)
    (subscribe-stats! owner)
    (om/add-root! reconciler FullPage (gom/getElement "main-area"))))

