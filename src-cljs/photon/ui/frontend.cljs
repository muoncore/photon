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

(defn clj->str [c]
  (let [res (clojure.string/replace
             (with-out-str (fipp/pprint c {:width 80})) #"}nil" "}")]
    (.log js/console res)
    res))

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
            nil
          (dom/div
              nil
            "Projection name"
            (dom/input
                #js {:type "text" :ref "name"
                     :value (:projection-name data)
                     :onChange
                     (fn [ev]
                       (om/update! data :projection-name
                                   (.-value (.-target ev))))}))
          (dom/div
              nil
            "Stream name"
            (dom/input
                #js {:type "text" :ref "name"
                     :value (:stream-name data)
                     :onChange
                     (fn [ev]
                       (om/update! data :stream-name
                                   (.-value (.-target ev))))}))
          (dom/div nil "Language")
          (apply dom/div
                 #js {:className "radio"}
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
                              "/projections"
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
          (<! (ws-ch "ws://localhost:3000/ws-projections"))]
      (if-not error
        (do
          (>! ws-channel {:ok true})
          (loop [elem (<! ws-channel)]
            (when-not (nil? elem)
              (if (contains? elem :error)
                (.log js/console (pr-str elem))
                (om/update! data :projections (:message elem)))
              (>! ws-channel {:ok true})
              (recur (<! ws-channel)))))
        (.log js/console "Error:" (pr-str error))))))

(defn subscribe-streams! [owner]
  (go
    (let [{:keys [ws-channel error]}
          (<! (ws-ch "ws://localhost:3000/ws-streams"))]
      (if-not error
        (do
          (>! ws-channel {:ok true})
          (loop [elem (<! ws-channel)]
            (when-not (nil? elem)
              (om/update-state! owner
                                #(assoc % :streams
                                        (:streams (:message elem))))
              (>! ws-channel {:ok true})
              (recur (<! ws-channel)))))
        (.log js/console "Error:" (pr-str error))))))

(defn filter-projection [proj]
  (select-keys proj [:stream
                     :avg-time :status :language :processed
                     :stream-name :projection-name]))

(defn projection-item [params owner]
  (reify
    om/IRender
    (render [_]
      (let [filtered (filter-projection (:projection params))]
        (apply dom/tr nil
                     (map #(dom/td nil
                             (condp = (key %)
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
                :language "Language"
                :processed "Events processed"
                :last-event "Last event processed"
                :stream-name "Target stream"
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
        (dom/div
            nil
          (dom/h1
           nil
           "Projections")
          (apply dom/table nil
                 (apply dom/tr nil
                        (map #(dom/th nil
                                (k->header (key %)))
                             (filter-projection
                              (first (:projections data)))))
                 (map #(om/build projection-item {:data data
                                                  :projection %})
                      (:projections data)))
          (if (not (nil? (:active-projection data)))
            (let [block (om/build code-block (:active-projection data))]
              block)))))))

(defn event-list-item [params]
  (reify
    om/IRender
    (render [_]
      (let [event (:event params)
            data (:data params)
            payload (:payload event)
            id (str (:service-id event) ":" (:local-id event))]
        (dom/li
            nil
          (let [current? (= (:current data) id)]
            (dom/div
                nil
              (dom/a
                  #js {:href "#"
                       :onClick
                       (fn [ev] (if current?
                                  (om/update! data :current nil)
                                  (om/update! data :current id)))}
                  id)
              (if current?
                (dom/pre
                 nil
                 (dom/code
                  #js {:className "clojure"}
                  (clj->str event)))))))))))

(defn fn-update [owner stream-name]
  (go (let [response
            (:body (<! (client/get
                        (str "/stream-contents/"
                             stream-name))))]
        (om/update-state!
         owner
         #(assoc % :events (:results response))))))

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
        (apply dom/ul
               nil
               (map #(om/build event-list-item {:data (:data params)
                                                :event %})
                    (:events state)))))))

(defn row-stream [data owner]
  (reify
    om/IRender
    (render [_]
      (dom/tr nil
        (apply dom/td nil
               (map #(if (= :stream (key %))
                       (dom/a #js
                         {:href "#"
                          :onClick
                          (fn [_]
                            (om/update! (:data data)
                                        :active-stream (val %)))}
                         (val %))
                       (val %))
                    (:stream data)))))))

(defn widget-streams [data owner]
  (reify
    om/IInitState
    (init-state [this] data)
    om/IDidMount
    (did-mount [this]
      (subscribe-streams! owner))
    om/IRenderState
    (render-state [_ state]
      (dom/div nil
        (dom/h1 nil
          "Streams")
        (apply dom/table nil
               (apply dom/th nil
                      (map #(dom/td nil
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
        {:href "#"
         :onClick (fn [_]
                    (om/update! (:data data)
                                :active-page (val (:item data))))}
        (key (:item data))))))

(defn main-menu [data owner]
  (reify
    om/IRender
    (render [_]
      (dom/div nil
        (apply dom/div nil
               (map
                #(om/build menu-item {:data (:data data)
                                      :item %})
                (:items data)))))))

(defn full-page [data owner]
  (reify
    om/IRender
    (render [_]
      (dom/div
        nil
        (om/build main-menu
                  {:data data
                   :items {"Streams" widget-streams
                           "Projections" widget-projections
                           "New projection" widget-new-projection}})
        (dom/div nil
          (if (nil? (:active-page data))
            "Choose option from menu"
            (om/build (:active-page data) {:data data})))))))

(go (let [response (<! (client/get "/startup"))]
      (om/root full-page app-state
               {:target (. js/document
                           (getElementById "main-area"))})))

