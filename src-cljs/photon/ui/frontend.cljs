(ns photon.ui.frontend
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:use [jayq.core :only [$ css html]])
  (:require [cljs-http.client :as client]
            [cljs.core.async :refer [<! >! put! close!]]
            [fipp.edn :as fipp]
            [tailrecursion.cljson :refer [clj->cljson cljson->clj]]
            [chord.client :refer [ws-ch]]
            [om.core :as om]
            [om.dom :as dom]))

(defonce app-state (atom {:stream nil
                          :current nil
                          :initial-value ""
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

(defn clj->str [c]
  (let [res (clojure.string/replace
             (with-out-str (fipp/pprint c {:width 80})) #"}nil" "}")]
    (.log js/console res)
    res))

(defn proj->streams [reg]
  (map #(assoc (val %) :stream (key %)) reg))

(defn update-box [owner box-ref]
  (.highlightBlock js/hljs (om/get-node owner box-ref)))

(defn widget-new-projection [params owner]
  (let [data (:data params)]
    (reify
      om/IDidMount
      (did-mount [_]
        (update-box owner "code-box")
        (update-box owner "initial-value-box"))
      om/IRender
      (render [_]
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
                       (om/update! data :projection-name
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
                       (om/update! data :stream-name
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
                                  (fn [ev] (om/update! data :language %))})
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
                                (om/update! data :initial-value
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
                                (om/update! data :reduction
                                            (.-textContent (.-target ev)))
                                (update-box owner "code-box"))}
                         (:reduction data))))
          (dom/div
              nil
            (dom/button
                #js {:onClick
                     (fn [_]
                       (go
                         (<! (client/post
                              "/api/projection"
                              {:json-params
                               (select-keys data
                                            [:projection-name
                                             :stream-name
                                             :initial-value
                                             :reduction
                                             :language])}))))}
                "Register projection")))))))

(defn subscribe-projections! [data]
  (go
    (let [{:keys [ws-channel error]}
          (<! (ws-ch (str ws-localhost "/ws/ws-projections")))]
      (if-not error
        (do
          (>! ws-channel {:ok true})
          (loop [elem (<! ws-channel)]
            (when-not (nil? elem)
              (if (contains? elem :error)
                (.log js/console (pr-str elem))
                (om/update! data :projections
                            (:projections (:message elem))))
              (>! ws-channel {:ok true})
              (recur (<! ws-channel)))))
        (.log js/console "Error:" (pr-str error))))))

(defn subscribe-streams! [data]
  (go
    (let [{:keys [ws-channel error]}
          (<! (ws-ch (str ws-localhost "/ws/ws-projections")))]
      (if-not error
        (do
          (>! ws-channel {:projection-name "__streams__"})
          (loop [elem (<! ws-channel)]
            (when-not (nil? elem)
              (if (contains? elem :error)
                (.log js/console (pr-str elem))
                (let [streams-proj (:message elem)]
                  (om/update-state! data
                                    #(assoc % :streams
                                            (proj->streams (:current-value streams-proj))))))
              (>! ws-channel {:projection-name "__streams__"})
              (recur (<! ws-channel)))))
        (.log js/console "Error:" (pr-str error))))))

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
                                    (om/update! (:data params)
                                                :active-projection
                                                (:projection params)))}
                                 (val %))
                               (str (val %))))
                          filtered))))))

(def k->header {:stream "Stream name"
                :fn "Function"
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
      (.log js/console "Update: code-block")
      (dorun (map #(.highlightBlock js/hljs %) ($ "code"))))
    om/IRender
    (render [_]
      (dom/pre nil
               (dom/code #js
                         {:className "clojure"}
                         (clj->str c))))))

(defn widget-projections [params owner]
  (let [data (:data params)]
    (reify
      om/IInitState
      (init-state [this]
        {})
      om/IDidMount
      (did-mount [this]
        (subscribe-projections! data))
      om/IRenderState
      (render-state [_ state]
        (dom/div #js{:className "projections"}
          (dom/h1 nil "Projections")
          (apply dom/table #js
                 {:className "table table-striped table-bordered table-hover table-heading"}
                 (apply dom/tr nil
                        (map #(dom/th #js {:style #js {:border "1px"}}
                                      (k->header (key %)))
                             (filter-projection
                              (first (:projections data)))))
                 (map #(om/build projection-item {:data data
                                                  :projection %})
                      (:projections data)))
          (if (not (nil? (:active-projection data)))
            (let [block (om/build code-block (:active-projection data))]
              block)))))))

(defn widget-dashboard [params owner]
  (reify
    om/IRenderState
    (render-state [_ state]
      (dom/div #js{:className "dashboard"}
        (dom/h1 nil "Dashboard")
        (dom/div
          #js{:className "jumbotron"}
            (dom/h1 nil "HELLO THERE"))
        (dom/div
          #js{:className "widget-box left"}
            (dom/span
              #js{:className "title"}
                "title")
            (dom/span
              #js{:className "large-value"}
                "1"))
        (dom/div
          #js{:className "widget-box right"}
            (dom/span
              #js{:className "title"}
                "title")
            (dom/span
              #js{:className "large-value"}
                "3"))
        (dom/div
          #js{:className "widget-box"}
            (dom/span
              #js{:className "title"}
                "title")
            (dom/span
              #js{:className "large-value"}
                "2"))
        (dom/div
          #js{:className "widget-box left"}
            (dom/span
              #js{:className "title"}
                "title")
            (dom/span
              #js{:className "large-value"}
                "4"))
        (dom/div
          #js{:className "widget-box right"}
            (dom/span
              #js{:className "title"}
                "title")
            (dom/span
              #js{:className "large-value"}
                "6"))
        (dom/div
          #js{:className "widget-box"}
            (dom/span
              #js{:className "title"}
                "title")
            (dom/span
              #js{:className "large-value"}
                "5"))))))


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
            (:body (<! (client/get
                        (str "/api/stream-contents/"
                             stream-name))))]
        (.log js/console response)
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
        (dom/h2 nil "Events")
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
                            (om/update! (:data data)
                                        :active-stream (val %)))}
                         (val %))
                       (val %)))
                  (:stream data))))))

(defn widget-streams [data owner]
  (reify
    om/IInitState
    (init-state [this]
      data)
    om/IDidMount
    (did-mount [this]
      (go
        (let [res (:body (<! (client/get "/api/streams")))]
          (om/update-state! owner #(assoc % :streams
                                          (proj->streams (:current-value res))))))
      (subscribe-streams! owner))
    om/IRenderState
    (render-state [_ state]
      (dom/div #js{:className "streams"}
        (dom/h1 nil "Streams")
        (apply dom/table #js
               {:className "table table-striped table-bordered table-hover table-heading"}
               (apply dom/tr nil
                      (map #(dom/th nil
                              (k->header %))
                           (keys (first (:streams state)))))
               (map #(om/build row-stream {:data (:data data)
                                           :stream %})
                    (:streams state)))
        (if (not (nil? (:active-stream (:data data))))
          (om/build event-list
                    {:data (:data data)
                     :stream (:active-stream (:data data))}))))))

(defn menu-item [data owner]
  (reify
    om/IRender
    (render [_]
      (dom/a #js
        {:className "menu-item"
         :href "#"
         :onClick (fn [_]
                    (om/update! (:data data)
                                :active-page (val (:item data))))}
        (key (:item data))))))

(defn main-menu [data owner]
  (reify
    om/IRender
    (render [_]
      (dom/div
            #js {:className "menu-bar"}
            (dom/h2 #js {:className "logo"} "Photon")
               (map
                #(om/build menu-item {:data (:data data)
                                      :item %})
                (:items data))))))

(defn full-page [data owner]
  (reify
    om/IRender
    (render [_]
      (dom/div
        nil
        (om/build main-menu
                  {:data data
                   :items {"dashboard" widget-dashboard
                           "Streams" widget-streams
                           "Projections" widget-projections
                           "New projection" widget-new-projection}})
        (dom/div nil
          (if (nil? (:active-page data))
            (dom/h3 nil "Choose option from menu...")
            (om/build (:active-page data) {:data data})))))))

(go (let [response (<! (client/get "/api/startup"))]
      (om/root full-page app-state
               {:target (. js/document
                           (getElementById "main-area"))})))
