(ns photon.ui.frontend
  (:require-macros [cljs.core.async.macros :refer [go]])
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
                          :chord-test ""
                          :new-projection false}))

(defn clj->str [c]
  (let [res (clojure.string/replace
             (with-out-str (fipp/pprint c {:width 80})) #"}nil" "}")]
    (.log js/console res)
    res))

(defn update-box [owner box-ref]
  (.highlightBlock js/hljs (om/get-node owner box-ref)))

(defn update-projections! [data]
  (go (let [response (:body (<! (client/get "/projections")))]
        (om/update! data :projections response))))

(defn widget-new-projection [data owner]
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
                       (let [res
                             (:body
                              (<! (client/post
                                   "/projections"
                                   {:json-params
                                    (select-keys data
                                                 [:projection-name
                                                  :stream-name
                                                  :initial-value
                                                  :reduction
                                                  :language])})))]
                         (update-projections! data))))}
              "Register projection"))))))

(defn widget-projections [data owner]
  (reify
    om/IInitState
    (init-state [this]
      {})
    om/IDidMount
    (did-mount [this]
      (update-projections! data))
    om/IRenderState
    (render-state [_ state]
      (dom/div
        nil
        (dom/h1
          nil
          "Projections")
        (dom/button
          #js {:onClick
               (fn [_]
                 (om/update! data :new-projection
                             (not (:new-projection data))))}
          "+ New Projection")
        (if (:new-projection data)
          (do
            (om/build widget-new-projection data)))
        (apply dom/ul
               nil
               (map #(dom/li
                       nil
                       (dom/a
                         #js {:href "#"
                              :onClick
                              (fn [ev]
                                (if (= (:current-projection data) %)
                                  (om/update! data
                                              :current-projection nil)
                                  (om/update! data
                                              :current-projection %)))}
                         (:projection-name %))
                       (if (= (:current-projection data) %)
                         (dom/pre
                           nil
                           (dom/code
                             #js {:className "clojure"}
                             (clj->str %)))))
                    (:projections data)))))))

(defn widget-streams [data owner]
  (reify
    om/IInitState
    (init-state [this] data)
    om/IDidMount
    (did-mount [this]
      (go (let [response (:body (<! (client/get "/streams")))]
            (om/update-state!
             owner
             #(assoc % :streams (:streams response))))))
    om/IRenderState
    (render-state [_ state]
      (dom/div
        nil
        (dom/h1
          nil
          "Streams")
        (apply dom/ul
               nil
               (map #(dom/li
                       nil
                       (dom/a
                         #js {:href "#"
                              :onClick (fn [ev]
                                         ((:handler data)
                                          {:stream (:stream %)}))}
                         (:stream %)))
                    (:streams state)))))))

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

(defn event-list [params owner]
  (let [fn-update
        (fn [stream-name]
          (go (let [response
                    (:body (<! (client/get
                                (str "/stream-contents/"
                                     stream-name))))]
                (om/update-state!
                 owner
                 #(assoc % :events (:results response))))))]
   (reify
    om/IInitState
    (init-state [this]
      {:events []})
    om/IDidUpdate
    (did-update [_ _ _]
      (dorun (map #(.highlightBlock js/hljs %) ($ "code"))))
    om/IWillReceiveProps
    (will-receive-props [this next-props]
      (om/update-state! owner (fn [_] {:events []}))
      (fn-update (:stream next-props)))
    om/IDidMount
    (did-mount [this]
      (fn-update (:stream params)))
    om/IRenderState
    (render-state [_ state]
      (apply dom/ul
          nil
          (map #(om/build event-list-item {:data (:data params)
                                           :event %})
               (:events state)))))))

(defn widget-stream [data owner]
  (reify
    om/IRenderState
    (render-state [_ state]
      (.log js/console (:current data))
      (dom/div
        nil
        (dom/h2
          nil
          (str "Events: " (:stream data)))
        (om/build event-list {:stream (:stream data)
                              :data data})))))

(defn full-page [data owner]
  (reify
    om/IDidMount
    (did-mount [_]
      (go
        (>! (ws-ch "ws://localhost:3000/ws") "message")
        (let [{:keys [ws-channel]} (<! (ws-ch "ws://localhost:3000/ws"))
              {:keys [message]} (<! ws-channel)]
          (om/update! data :chord-test message)
          (.log js/console "Got message from server:" (pr-str message)))))
    om/IRender
    (render [_]
      (dom/div
        nil
        (:chord-test data)
        (om/build widget-streams {:handler (fn [ev]
                                             (om/update! data :stream (:stream ev)))
                                  :streams []})
        (if (not (nil? (:stream data)))
          (om/build widget-stream data))
        (om/build widget-projections data)))))

(om/root full-page app-state
  {:target (. js/document (getElementById "main-area"))})


(defn -main [& args])


