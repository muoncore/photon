(ns photon.ui.frontend
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
                          :reduction ""
                          :projections []
                          :username ""
                          :auth nil
                          :password ""
                          :analyse-stream nil
                          :items [{:name "Dashboard"
                                   :active? true}
                                  {:name "Streams"
                                   :active? false}
                                  {:name "Projections"
                                   :active? false}
                                  {:name "Analyse Data"
                                   :active? true}] 
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

(defn get-chart-data [new-val previous last-25 is-first?]
  (let [difference (if is-first? 0 (- new-val previous))
        new-last-25 (into [] (take-last 25 (conj last-25 difference)))]
    new-last-25))

(defn proj->streams [reg]
  (map #(assoc (val %) :stream (key %)) reg))

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

(defn subscribe-projections! []
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

(defn subscribe-stats! []
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

(defn subscribe-streams! []
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

(defui LoginPage
  static om/IQuery
  (query [this] [:username :auth :password])
  Object
  (render
   [this]
   (let [upd (fn [k v]
               (swap! app-state (fn [old] (assoc old k v))))
         g (fn [k] (get @app-state k))
         fn-post (fn []
                   (client/get "/auth/login"
                               {:basic-auth {:username (g :username)
                                             :password (g :password)}}))
         fn-clk (fn [_]
                  (go (let [res (<! (fn-post))]
                        (upd :auth res))))]
     (if (= 200 (:status (:auth (om/props this))))
       (set! (.-location js/window) "/ui")
       (dom/div nil
                (dom/p nil (if (= 401 (:status (:auth (om/props this))))
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
                            "Login"))))))

(defui MenuItem
  static om/IQuery
  (query [this] [:name :active?])
  static om/Ident
  (ident [this {:keys [name]}] [:item/by-name name])
  Object
  (render
   [this]
   (let [data (om/props this)
         class (if (:active? data) "menu-item active" "menu-item")]
     (dom/a #js
            {:className class
             :href "#"
             :onClick
             (fn [_]
               (om/transact! this `[(active-page/update ~data)]))}
            (:name data)))))

(defui MainMenu
  Object
  (render
   [this]
   (apply dom/div
          #js {:className "menu-bar hidden-xs"}
          #_(dom/img #js {:src "/ui/images/photon.png"
                          :width "100%"
                          :height "auto"})
          (dom/h2 #js {:className "logo"} "Photon")
          (map (om/factory MenuItem) (om/props this)))))

(defui FullPage
  static om/IQuery
  (query [this] [{:all-items (om/get-query MenuItem)}] #_[:items])
  Object
  (render
   [this]
   (dom/div
    nil
    (dom/div
     nil
     ((om/factory MainMenu) (:all-items (om/props this)))
     #_(condp = (:active-page @app-state)
         "Dashboard" (omo/build widget-dashboard state)
         "Streams" (omo/build widget-streams (assoc state :full-page-owner owner))
         "Projections" (omo/build widget-projections (assoc state :full-page-owner owner))
         "New Projection" (omo/build widget-new-projection state)
         "New Stream" (omo/build widget-new-stream state)
         "Analyse Data" (when (contains? state :streams)
                          (omo/build widget-analyse state)))))))

(defmulti read om/dispatch)

#_(defn read [{:keys [state] :as env} key params]
  (let [st @state]
    (if-let [[_ value] (find st key)]
      {:value value}
      {:value :not-found})))

(defmethod read :all-items
  [{:keys [state] :as env} key params]
  {:value (:items @state)})

(defmulti mutate om/dispatch)

(defmethod mutate 'active-page/update
  [{:keys [state]} _ {:keys [name]}]
  {:action
   (fn []
     (swap! state
            (fn [old]
              (assoc old :items
                     (map #(assoc % :active? (= name (:name %)))
                          (:items old))))))})

(def reconciler
  (om/reconciler {:state app-state
                  :parser (om/parser {:read read :mutate mutate})}))

(go
  (let [res (<! (get-api "/api/ping"))
        page (if (or (= (:status res) 500) (= (:status res) 401))
               LoginPage
               (do
                 (subscribe-streams!)
                 (subscribe-projections!)
                 (subscribe-stats!)
                 FullPage))]
    (om/add-root! reconciler page (gdom/getElement "main-area"))))
