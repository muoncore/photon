(ns photon.ui.streams
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:use [jayq.core :only [$ css html]])
  (:require [om.next :as om :refer-macros [defui]]
            [cljs.core.async :refer [chan <! >! put! close!]]
            [om.dom :as dom]
            [goog.events :as events]
            [photon.ui.components :as comp]
            [photon.ui.ws :as ws])
  (:import goog.net.IframeIo
           goog.net.EventType))

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
                :schema "Schema URL"
                :service-id "Sending Service"
                :local-id "Local UUID"
                :photon-timestamp "Photon Timestamp"
                :server-timestamp "Service Timestamp"
                :projection-name "Projection name"})

(defn clean-stream [stream]
  (-> stream
      (dissoc :schemas)
      (assoc :export :action/export-stream)
      (assoc :contents :action/view-contents)))

(defn strip-event [event]
  (assoc (dissoc event :payload :provenance :order-id)
         :action/show-payload :action/show-payload
         :meta/original event
         :payload-size (count (pr-str (:payload event)))))

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

(defui ActiveStreams
  static om/IQuery
  (query [this] `[:stream-info])
  Object
  (componentDidUpdate
   [this prev-props prev-state]
   (let [active-modal (:modal-events (:ui-state (om/props this)))]
     (when (not (nil? active-modal))
       (.modal ($ :#modal-events) #js {:keyboard true :show active-modal})
       (when-not active-modal
         (.remove ($ ".modal-backdrop.fade.in"))))))
  (render
   [this]
   (let [data (:stream-info (om/props this))
         active-stream (:active-stream (:ui-state data))
         streams (map clean-stream (:streams data))
         events (map strip-event (:events (:ui-state data)))]
     (dom/div
      nil
      (dom/div
       #js {:className "page-title"}
       (dom/div
        #js {:className "title_left"}
        (dom/h3
         nil "Stream browser")))
      #_(dom/p nil (pr-str (:ui-state data)))
      (dom/div #js {:className "clearfix"})
      (dom/div
       #js {:className "row"}
       ((om/factory comp/LongPanel)
        {:title "Currently active streams"
         :component comp/Table
         :data {:data streams
                :owner this
                :rows [:stream :total-events :contents :export]}}))
      (if (not (nil? active-stream))
        (dom/div
         #js {:id "event-browser" :className "row"}
         ((om/factory comp/LongPanel)
          {:title "Event browser"
           :component comp/Table
           :data {:data events
                  :owner this
                  :rows [:service-id :local-id
                         :payload-size :stream-name
                         :action/show-payload]}})))
      ((om/factory comp/Modal)
       {:id "modal-events"
        :title "Event viewer"
        :onHide (fn [_]
                  (om/transact! this `[(ui/update {:k :modal-events :v false})
                                       :stream-info]))
        :component ((om/factory comp/CodeBlock)
                    {:code
                     (if-let [code (:meta/original
                                    (:selected-event (:ui-state data)))]
                       code "")
                     :modal? true})})
      #_(if (not (nil? active-stream))
          ((om/factory EventList)
           {:events (:events (:ui-state data)) :stream active-stream}))))))

(defn js->cljk [n]
  (.log js/console "js->cljk")
  (js->clj n :keywordize-keys true))

(defn handle-iframe-response [json-msg]
  (let [msg (js->cljk json-msg)]
    #_(.log js/console (str "iframe-response: " msg))
    (cond
      (= "OK" (:status msg)) (str "Uploaded to stream: " (:stream-name msg))
      :else (str "Unexpected error: " (pr-str msg)))))

(defn iframeio-upload-file [form-id owner]
  (let [el (.getDOMNode (om/react-ref owner form-id))
        iframe (IframeIo.)]
    #_(.log js/console el)
    (events/listen iframe EventType.COMPLETE
        (fn [event]
          (om/update-state!
           owner assoc :upload-status (handle-iframe-response
                                       (.getResponseJson iframe)))
          (.dispose iframe)))
    (.sendFromForm iframe el)))

(defui NewStreamForm
  Object
  (render
   [this]
   (let [state (om/props this)
         owner (:owner state)]
     (apply dom/form
            #js {:ref "upload-form"
                 :className "form-horizontal form-label-left"
                 :method "POST"
                 :encType "multipart/form-data"
                 :onSubmit (fn [e]
                             (.preventDefault e)
                             (om/update-state!
                              this assoc :upload-status "Uploading...")
                             (iframeio-upload-file "upload-form" this))
                 :action "/api/new-stream"}
            (:upload-status (om/get-state this))
            ((om/factory comp/LabelAndTextInput)
             {:owner owner :key :name :val (:name state)
              :label "Stream name (optional)"})
            ((om/factory comp/LabelAndSomething)
             {:owner owner
              :component (dom/select
                          #js {:className "form-control"
                               :value (:sform/select-value state)
                               :onChange
                               (fn [ev]
                                 (om/transact!
                                  owner
                                  `[(ui/update ~{:k :sform/select-value
                                                 :v (.-value (.-target ev))})]))}
                          (dom/option #js {:value "pev"} "PEV file")
                          (dom/option #js {:value "file"} "JSON sequence file"))
              :label "Source type"})
            (condp = (:select-value state)
              "file" [((om/factory comp/LabelAndFileInput)
                       {:name "upload-file-name"})
                      ((om/factory comp/FormButton)
                       {:text "Declare stream"})]
              "pev" [((om/factory comp/LabelAndFileInput)
                      {:name "upload-pev-name"})
                     ((om/factory comp/FormButton)
                      {:text "Declare stream"})])))))

(defui NewStream
  static om/IQuery
  (query [this] `[:stream-info])
  Object
  (render
   [this]
   (dom/div
    nil
    #_(dom/p nil (pr-str (:ui-state data)))
    (dom/div #js {:className "clearfix"})
    (dom/div
     #js {:className "row"}
     ((om/factory comp/LongPanel)
      {:component NewStreamForm
       :title "New stream wizard"
       :data (assoc (:ui-state (:stream-info (om/props this)))
                    :owner this)})))))

(defn add-select-state [option entry]
  (if (= option (:text entry))
    #js {:value option :selected "selected"}
    #js {:value option}))

(defui ListStreams
  Object
  (componentWillMount
   [this]
   (when (nil? (:analyse-stream (om/props this)))
     (om/transact! (:owner (om/props this))
                   `[(ui/update ~{:k :analyse-stream
                                  :v (:stream (first (:streams (om/props this))))})])))
  (render
   [this]
   (let [upd (fn [v] (om/transact! (:owner (om/props this))
                                   `[(ui/update ~{:k :analyse-stream
                                                  :v v})]))]
     (dom/div
      nil
      (dom/p nil "Choose stream:")
      (apply dom/select
            #js {:onChange (fn [x]
                              (upd (.-value (.-target x))))}
            (map #(dom/option
                   (add-select-state
                    % {:text (:analyse-stream (om/props this))}) %)
                 (map :stream (:streams (om/props this)))))))))

(defui ListVersions
  Object
  (componentWillReceiveProps
   [this next-props]
   (let [svs (om/react-ref this "schema-version-select")
         cv (cljs.reader/read-string (.-value svs))]
     (when-not (contains? (:schemas (:schema next-props)) cv)
       (om/update-state!
        (:owner next-props)
        assoc :analyse-version (first (keys (:schemas (:schema next-props))))))))
  (render
   [this]
   (dom/div
    nil
    (dom/p nil "Schema version:")
    (apply dom/select
           #js {:ref "schema-version-select"
                :onChange
                (fn [x]
                  (om/update-state!
                   (:owner (om/props this))
                   assoc :analyse-version
                   (cljs.reader/read-string (.-value (.-target x)))))}
           (map #(dom/option
                  (add-select-state (pr-str %) nil) (pr-str %))
                (keys (:schemas (:schema (om/props this)))))))))

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

(defui VarInspector
  Object
  (getInitialState [this] {:jstree.node nil})
  (componentDidMount
   [this]
   (go
     (loop [elem (<! (om/props this))]
       (when-not (nil? elem)
         (om/update-state! this assoc :jstree.node elem)
         (recur (<! (om/props this)))))))
  (render
   [this]
   (when-not (nil? (:jstree.node (om/get-state this)))
     (let [node (js->cljk (:jstree.node (om/get-state this)))
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
                                    (map name (keys (:values sch)))))))]))))))

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

(defui ActionItem
  Object
  (render
   [this]
   (let [{:keys [action fn-delete] :as data} (om/props this)
         k (key (first action))
         v (val (first action))
         path (node->path v)]
     (dom/p nil (str (get action-mappings k) " " path) " "
            (dom/a #js {:href "#"
                        :onClick (fn [ev] (fn-delete k v))}
                   "[X]")))))

(defn action-list->actions [action-list]
  (mapcat (fn [k] (map #(hash-map k %) (get action-list k)))
          (keys action-list)))

(defui VarActions
  Object
  (init-state
   [this]
   (go
     (loop [elem (<! (:ch (om/props this)))]
       (om/update-state! this assoc :var elem)
       (recur (<! (:ch (om/props this))))))
   {:var nil
    :action-list {}})
  (render
   [this]
   (if (nil? (:var (om/get-state this)))
     (dom/p nil "Select a variable to get stated")
     (let [node (js->cljk (:var (om/get-state this)))
           sch (-> node :node :original :schema)
           path (clojure.string/join "." (:path sch))
           [iv code] (construct-code (om/get-state this))
           upd (fn [k v]
                 (om/update-state! this assoc k v))]
       (dom/div
        nil
        (dom/p nil (str "Selected variable: " path))
        (dom/button
         #js {:onClick
              (fn [ev]
                (om/update-state!
                 this
                 update-in [:action-list :group-by] #(conj (into #{} %) node)))}
         "Group by")
        (dom/button
         #js {:onClick
              (fn [ev]
                (om/update-state!
                 this
                 update-in [:action-list :select] #(conj (into #{} %) node)))}
         "Select")
        (.log js/console (:action-list->actions (:action-list (om/get-state this))))
        (apply dom/div
               nil
               (map #((om/factory ActionItem)
                      {:action %
                       :fn-delete
                       (fn [k v]
                         (om/update-state!
                          this
                          update-in [:action-list k] (fn [x] (disj x v))))})
                    (action-list->actions (:action-list (om/get-state this)))))
        (dom/label nil "Initial value")
        (((om/factory comp/CodeBlock)) {:code code})
        (dom/label nil "Code")
        ((om/factory comp/CodeBlock) {:code code})
        (dom/label nil "Projection name")
        (dom/input #js {:ref "projection-name"})
        (dom/button
         #js {:onClick
              (fn [ev]
                (let [pn (.-value (om/react-ref this "projection-name"))]
                  (.log js/console (pr-str code))
                  (go
                    (<! (ws/post-api "/api/projection"
                                     {:json-params
                                      {:projection-name pn
                                       :stream-name (:stream-name (om/props this))
                                       :initial-value iv
                                       :reduction code
                                       :language "clojure"}})))))}
         "Create projection"))))))

(defui StreamSchema
  Object
  (getInitialState
   [this]
   {:ch (chan) :ch-click (chan)})
  (componentDidMount
   [this]
   (produce-tree! (om/props this)
                  (:ch (om/get-state this))
                  (:ch-click (om/get-state this))))
  (componentDidUpdate
   [this _ _]
   (go (>! (:ch (om/get-state this)) ""))
   (clean-tree! (om/props this))
   (produce-tree! (om/props this)
                  (:ch (om/get-state this))
                  (:ch-click (om/get-state this))))
  (render
   [this]
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
                ((om/factory VarInspector) (:ch (om/get-state this))))
       (dom/div #js {:className "row small-widget-box"}
                ((om/factory VarActions)
                 {:ch (:ch-click (om/get-state this))
                  :stream-name (:stream (om/props this))})))))
    #_(dom/p nil (pr-str data)))))

(defui DataAnalyser
  static om/IQuery
  (query [this] `[:stream-info])
  Object
  (render
   [this]
   (let [orig-streams (:streams (:stream-info (om/props this)))
         streams (zipmap (map :stream orig-streams) orig-streams)
         schema (val (first streams))
         my-schema (first (:schemas schema))
         with-name (merge my-schema (dissoc schema :schemas))]
     (dom/div
      nil
      ((om/factory ListStreams)
       {:owner this
        :analyse-stream (:analyse-stream (:ui-state (om/props this)))
        :streams (vals streams)})
      #_((om/factory ListVersions) {:owner this :schema my-schema})
      #_((om/factory StreamSchema) with-name)))))
