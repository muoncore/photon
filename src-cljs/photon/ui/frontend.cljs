(ns photon.ui.frontend
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:use [jayq.core :only [$ css html]])
  (:require [cljs-http.client :as client]
            [cljs.core.async :refer [<! >! put! close!]]
            [tailrecursion.cljson :refer [clj->cljson cljson->clj]]
            [chord.client :refer [ws-ch]]
            [goog.net.cookies :as ck]
            [goog.events :as events]
            [cljs.pprint :as pprint]
            [om.core :as om]
            [om.dom :as dom])
  (:import goog.net.IframeIo
           goog.net.EventType))

(defonce app-state (atom {:stream nil
                          :current nil
                          :initial-value ""
                          :active-page "Dashboard"
                          :reduction ""
                          :projections []
                          :new-projection false}))
(defonce localhost (let [href (.-href (.-location js/window))]
                     (clojure.string/join
                      "/"
                      (drop-last (clojure.string/split href #"/")))))
(defonce ws-localhost (let [tokens (clojure.string/split localhost #":")]
                        (clojure.string/join
                         ":" (conj (rest tokens) "ws"))))

(defn call-api
  ([f url]
   (call-api f url ""))
  ([f url qs]
   (let [token (ck/get "token")
         tk (str "access_token=" token)
         query (str url "?" (if (or (nil? qs) (= "" qs))
                              tk
                              (clojure.string/join "&" [qs tk])))]
     (.log js/console query)
     (f query))))

(defn call-oauth [f & args]
  (let [token (ck/get "token")
        new-m (if (nil? token)
                {}
                {:default-headers {"authorization" (str "Token " token)}})
        m (if (> (count args) 1)
            (merge (second args) new-m)
            new-m)]
    (.log js/console (pr-str m))
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
  (.highlightBlock js/hljs (om/get-node owner box-ref)))

(defn widget-new-projection [params owner]
  (reify
    om/IInitState
    (init-state [_]
      {})
    om/IDidMount
    (did-mount [_]
      (update-box owner "code-box")
      (update-box owner "initial-value-box"))
    om/IRenderState
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
                       (om/set-state! owner :projection-name
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
                       (om/set-state! owner :stream-name
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
                                  (fn [ev] (om/set-state! owner :language %))})
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
                         (om/set-state! owner :initial-value
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
                         (om/set-state! owner :reduction
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
                (om/update-state! owner
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
                    (om/update-state! owner #(assoc % :stats stats)))
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
                  (om/update-state! owner
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
    om/IRender
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
    om/IDidMount
    (did-mount [_]
      #_(.log js/console "Update: code-block")
      (dorun (map #(.highlightBlock js/hljs %) ($ "code"))))
    om/IRender
    (render [_]
      (dom/pre nil
               (dom/code #js
                         {:className "clojure"}
                         (clj->str c))))))

(defn widget-projections [data owner]
  (reify
    om/IInitState
    (init-state [_]
      {:active-projection nil})
    om/IRenderState
    (render-state [_ state]
      (let [fn-update (fn [new-active-projection]
                        (om/update-state! owner (fn [state]
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
            (map #(om/build projection-item {:data data
                                             :projection %
                                             :fn-update fn-update})
                 (:projections data)))
          (if (not (nil? (:active-projection state)))
            (let [block (om/build code-block (:active-projection state))]
              block)))))))

(defn update-chart! [chart data timestamps name]
  (let [vector-data (clj->js (concat [name] data))]
    #_(.log js/console vector-data)
    (if-let [x-axis (clj->js (concat ["x"] timestamps ))]
      (.load chart #js {:columns #js [x-axis vector-data]}) (.load chart #js {:columns #js [vector-data]}))))

(defn widget-dashboard [params owner]
  (reify
    om/IInitState
    (init-state [_]
      {:events-processed-chart nil
       :events-incoming-chart nil
       :memory-usage-chart nil})
    om/IDidMount
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
        (om/update-state! owner (fn [state] (assoc state :events-processed-chart events-processed-chart :events-incoming-chart events-incoming-chart :memory-usage-chart memory-usage-chart)))))
    om/IRenderState
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
    om/IRender
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
        (om/update-state!
         owner
         #(assoc % :events (:results response))))))

(defn strip-event [event]
  (assoc (dissoc event :payload :provenance :order-id)
         :payload-size (count (pr-str (:payload event)))
         :url (str localhost "/api/event/" (:stream-name event)
                   "/" (:order-id event))))

(defn event-list [params owner]
  (reify
    om/IInitState
    (init-state [this]
      {:stream (:stream params)
       :events []})
    om/IDidUpdate
    (did-update [_ _ _]
      (dorun (map #(.highlightBlock js/hljs %) ($ "code"))))
    om/IWillReceiveProps
    (will-receive-props [this next-props]
      (if (not= (:stream next-props) (:stream (om/get-state owner)))
        (do
          (om/update-state! owner (fn [_] {:stream (:stream next-props)
                                           :events []}))
          (fn-update owner (:stream next-props)))))
    om/IDidMount
    (did-mount [this]
      (fn-update owner (:stream params)))
    om/IRenderState
    (render-state [_ state]
      (dom/div nil
        (dom/h1 nil "Events")
        (apply dom/table #js
               {:className "table table-striped table-bordered table-hover table-heading"}
               (apply dom/tr nil
                      (map #(dom/th #js {:style #js {:border "1px"}}
                                    (get k->header (key %) (name (key %))))
                           (strip-event (first (:events state)))))
               (map #(om/build event-list-item {:data (:data params)
                                                :event (strip-event %)})
                    (:events state)))))))

(defn row-stream [data owner]
  (reify
    om/IRender
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
    #js {:value option :selected  "selected"}
    #js {:value option}))

(defn set-status [class title items]
  #_(.log js/console "set-status" class title items))

(defn handle-iframe-response [json-msg]
  (let [msg (js->clj json-msg :keywordize-keys true)]
    #_(.log js/console (str "iframe-response: " msg))
    (cond
      (= "OK" (:status msg)) (str "Uploaded to stream: " (:stream-name msg))
      :else (str "Unexpected error: " (pr-str msg)))))

(defn iframeio-upload-file [form-id owner]
  (let [el (.getDOMNode (om/get-node owner form-id))
        iframe (IframeIo.)]
    #_(.log js/console el)
    (events/listen iframe EventType.COMPLETE
        (fn [event]
          (om/update-state! owner
                            (fn [state]
                              (assoc state
                                     :upload-status
                                     (handle-iframe-response
                                      (.getResponseJson iframe)))))
          (.dispose iframe)))
    (.sendFromForm iframe el)))

(defn widget-new-stream [props owner]
  (reify
    om/IInitState
    (init-state [_]
      {:name ""
       :select-value "pev"
       :upload-status ""
       :stream-file nil})
    om/IRenderState
    (render-state [_ state]
      (dom/div
          #js {:className "new-stream"}
        (dom/form #js {:ref "upload-form"
                       :method "POST"
                       :encType "multipart/form-data"
                       :onSubmit (fn [e]
                                   (.preventDefault e)
                                   (om/update-state! owner
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
                         (om/update-state!
                          owner
                          (fn [state]
                            (assoc state :name (.-value (.-target ev))))))}))
            (dom/div
                #js {:className "radio"}
              "Source type:"
              (dom/select
               #js {:onChange
                    (fn [ev]
                      (om/update-state!
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
      (dissoc :schema)
      (assoc :export :action/export-stream)))

(defn widget-streams [data owner]
  (reify
    om/IInitState
    (init-state [_]
      {:active-stream nil})
    om/IRenderState
    (render-state [_ state]
      (let [streams (map clean-stream (:streams data))
            fn-update (fn [new-active-stream]
                        (om/update-state! owner (fn [state]
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
                 (map #(om/build row-stream {:data (:data data)
                                             :stream %
                                             :fn-update fn-update})
                      streams))
          (if (not (nil? (:active-stream state)))
            (om/build event-list
                      {:data (:data data)
                       :stream (:active-stream state)})))))))

(defn menu-item [data owner]
  (reify
    om/IRender
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

(defn main-menu [data owner]
  (reify
    om/IRender
    (render [_]
      (dom/div
          #js {:className "menu-bar hidden-xs"}
        #_(dom/img #js {:src "/ui/images/photon.png"
                        :width "100%"
                        :height "auto"})
        (dom/h2 #js {:className "logo"} "Photon")
        (map
         #(do
            (om/build menu-item {:data (:data data) :item %}))
         (:items data))))))

(defn login-page [data owner]
  (reify
    om/IInitState
    (init-state [_]
      {:username ""
       :auth nil
       :password ""})
    om/IRenderState
    (render-state [_ state]
      (let [upd (fn [k v]
                  (om/update-state! owner (fn [old] (assoc old k v))))
            g (fn [k] (get state k))
            fn-post (fn []
                      (client/get "/auth/token"
                                  {:basic-auth {:username (g :username)
                                                :password (g :password)}}))
            fn-clk (fn [_]
                     (go (let [res (<! (fn-post))]
                           (upd :auth res)
                           (ck/set "token" (:token (:body res))))))]
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

(defn full-page [data owner]
  (reify
    om/IInitState
    (init-state [_]
      (assoc data :root-owner owner))
    om/IDidMount
    (did-mount [_]
      (subscribe-streams! owner)
      (subscribe-projections! owner)
      (subscribe-stats! owner))
    om/IRenderState
    (render-state [_ state]
      (dom/div
        nil
        (om/build main-menu
                  {:data state
                   :items ["Dashboard" "Streams" "Projections" "Analyse Data"]})
        (dom/div nil
          (condp = (:active-page @app-state)
            "Dashboard" (om/build widget-dashboard state)
            "Streams" (om/build widget-streams (assoc state :full-page-owner owner))
            "Projections" (om/build widget-projections (assoc state :full-page-owner owner))
            "New Projection" (om/build widget-new-projection state)
            "New Stream" (om/build widget-new-stream state)))))))

(go
  (let [res (<! (get-api "/api/ping"))
        page (if (or (= (:status res) 500) (= (:status res) 401))
               login-page full-page)]
    (om/root page app-state
             {:target (. js/document
                         (getElementById "main-area"))})))
