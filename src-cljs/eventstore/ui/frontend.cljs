(ns eventstore.ui.frontend
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:use [jayq.core :only [$ css html]])
  (:require [cljs-http.client :as client]
            [cljs.core.async :refer [<!]]
            [fipp.edn :as fipp]
            [tailrecursion.cljson :refer [clj->cljson cljson->clj]]
            [om.core :as om]
            [om.dom :as dom]))

(defonce app-state (atom {:stream nil
                          :current nil
                          :initial-value ""
                          :code ""
                          :projections []
                          :new-projection false}))

(defn clj->str [c]
  (let [res (clojure.string/replace (with-out-str (fipp/pprint c {:width 80})) #"}nil" "}")]
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
                 :onChange (fn [ev]
                             (om/update! data :projection-name (.-value (.-target ev))))}))
        (dom/div nil "Language")
        (apply dom/div
          #js {:className "radio"}
          (map #(dom/div
                  nil
                  (dom/input
                    #js {:type "checkbox"
                         :checked (= % (:language data))
                         :onChange (fn [ev] (om/update! data :language %))})
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
                   :onBlur (fn [ev]
                             (om/update! data :initial-value (.-textContent (.-target ev)))
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
                   :onBlur (fn [ev]
                             (om/update! data :code (.-textContent (.-target ev)))
                             (update-box owner "code-box"))}
              (:code data))))
        (dom/div
          nil
          (dom/button
            #js {:onClick (fn [_]
                            (go
                              (let [res
                                    (:body
                                      (<! (client/post
                                            "/projections"
                                            {:json-params
                                             {:projection-name (:projection-name data)
                                              :initial-value (:initial-value data)
                                              :language (:language data)
                                              :code (:code data)}})))]
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
                 (om/update! data :new-projection (not (:new-projection data))))}
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
                              :onClick (fn [ev]
                                         (if (= (:current-projection data) %)
                                           (om/update! data :current-projection nil)
                                           (om/update! data :current-projection %)))}
                         (:query-name %))
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
            (om/update-state! owner #(assoc % :streams (:streams response))))))
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
                              :onClick (fn [ev] ((:handler data)
                                                 {:stream (:stream %)}))}
                         (:stream %)))
                    (:streams state)))))))

(defn widget-stream [data owner]
  (reify
    om/IInitState
    (init-state [this]
      {:events []})
    om/IDidMount
    (did-mount [this]
      (go (let [response (:body (<! (client/get (str "/stream/" (:stream data)))))]
            (om/update-state! owner #(assoc % :events (:results response))))))
    om/IDidUpdate
    (did-update [_ _ _]
      (dorun (map #(.highlightBlock js/hljs %) ($ "code"))))
    om/IRenderState
    (render-state [_ state]
      (.log js/console (:current data))
      (dom/div
        nil
        (dom/h2
          nil
          (str "Events: " (:stream data)))
        (apply dom/ul
               nil
               (map (fn [event]
                      (let [payload (:payload event)]
                        (dom/li
                          nil
                          (let [current? (= (:current data) (:_id event))]
                            (dom/div
                              nil
                              (dom/a
                                #js {:href "#"
                                     :onClick
                                     (fn [ev] (if current?
                                                (om/update! data :current nil)
                                                (om/update! data :current
                                                            (:_id event))))}
                                (:_id event))
                              (if current?
                                (dom/pre
                                  nil
                                  (dom/code
                                    #js {:className "clojure"}
                                    (clj->str event)
                                    #_(clj->str (js->clj (.parse js/JSON payload)
                                                         :keywordize-keys true))))))))))
                    (:events state)))))))

(defn full-page [data owner]
  (reify
    om/IRender
    (render [_]
      (dom/div
        nil
        (om/build widget-streams {:handler (fn [ev]
                                             (om/update! data :stream (:stream ev)))
                                  :streams []})
        (if (not (nil? (:stream data)))
          (om/build widget-stream data))
        (om/build widget-projections data)))))

(om/root full-page app-state
  {:target (. js/document (getElementById "main-area"))})


(defn -main [& args])


