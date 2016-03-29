(ns photon.ui.streams.analyser
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:use [jayq.core :only [$ css html]])
  (:require [om.next :as om :refer-macros [defui]]
            [cljs.core.async :refer [chan <! >! put! close!]]
            [om.dom :as dom]
            [goog.events :as events]
            [photon.ui.utils :as u]
            [photon.ui.components :as comp]
            [photon.ui.ws :as ws]))

(defui ListStreams
  Object
  (render
   [this]
   (let [{:keys [stream-info owner ui-state]} (om/props this)
         by-name (:streams/by-name stream-info)
         upd #(let [stm (get by-name %)]
                (om/transact!
                 owner
                 `[(ui/update ~{:k :analyse-stream :v %})
                   (ui/update ~{:k :analyse-version
                                :v (first (keys (:schemas stm)))})
                   :stream-info]))]
     ((om/factory comp/LabelAndSomething)
      {:label "Stream"
       :component
       (apply dom/select
              #js {:value (:analyse-stream ui-state)
                   :className "form-control"
                   :onChange (fn [x]
                               (upd (.-value (.-target x))))}
              (map #(dom/option #js {:value %} %) (keys by-name)))}))))

(defui ListVersions
  Object
  (render
   [this]
   ((om/factory comp/LabelAndSomething)
    {:label "Schema version"
     :component
     (let [{:keys [stream-info owner]} (om/props this)
           ui-state (:ui-state stream-info)
           streams-by-name (:streams/by-name stream-info)
           schema (get streams-by-name (:analyse-stream ui-state))]
       (dom/div
        nil
        (apply dom/select
               #js {:ref "schema-version-select"
                    :className "form-control"
                    :onChange
                    (fn [x]
                      (om/transact!
                       owner
                       `[(ui/update
                          ~{:k :analyse-version
                            :v (cljs.reader/read-string
                                (.-value (.-target x)))})
                         :stream-info]))}
               (map #(dom/option #js {:value (pr-str %)} (name %))
                    (keys (:schemas schema))))))})))

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

(defn produce-tree! [data node]
  (let [{:keys [schema owner]} data
        tj (tree->js (schema->tree schema))
        cd (clj->js {:core {:data tj}})
        jqn ($ node)]
    (.jstree jqn cd)
    (.on jqn "select_node.jstree"
         (fn [_ data]
           (om/transact! owner `[(ui/update ~{:k :tree/select :v data})
                                 :stream-info])))
    (.on jqn "hover_node.jstree"
         (fn [_ data]
           (om/transact! owner `[(ui/update ~{:k :tree/hover :v data})
                                 :stream-info])))))

(defn clean-tree! [data node]
  (let [jqn ($ node)
        tj (tree->js (schema->tree (:schema data)))
        cd (clj->js {:core {:data tj}})
        t (.jstree jqn true)]
    (set! (.-data (.-core (.-settings t))) cd)
    (.destroy t)))

(defui VarInspector
  Object
  (render
   [this]
   (when-not (nil? (:jstree.node (om/get-state this)))
     (let [node (u/js->cljk (:jstree.node (om/get-state this)))
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
  (let [node (u/js->cljk node)
        sch (-> node :node :original :schema)
        path (clojure.string/join "." (:path sch))]
    path))

(defn group-by-structure [gs]
  (let [nodes (map #(u/js->cljk %) gs)
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
  (let [nodes (map #(u/js->cljk %) gs)
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

(defn construct-code [m version]
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
    [iv (if (= :__unversioned__ version)
          (str "(fn [prev next] "
               (if (empty? selects) action
                   (str "(" let-body action ")")) ")")
          (str "(fn [prev next] (if (= \"" version "\" (:schema next)) "
               (if (empty? selects) action
                   (str "(" let-body action ")")) " prev))"))]))

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
     (dom/span
      #js {:className "tag"}
      (dom/span nil (str (get action-mappings k) " " path "   "))
      (dom/a #js {:href "#"
                  :data-original-title "Removing tag"
                  :onClick (fn [ev] (fn-delete k v))} " [X]")))))

(defn action-list->actions [action-list]
  (mapcat (fn [k] (map #(hash-map k %) (get action-list k)))
          (keys action-list)))

(defui StreamSelector
  Object
  (render
   [this]
   (let [{:keys [owner stream-info] :as props} (om/props this)]
     (dom/form
      #js {:className "form-horizontal form-label-left"}
      ((om/factory ListStreams) props)
      ((om/factory ListVersions) props)))))

(defui AttrInspector
  Object
  (render
   [this]
   (let [{:keys [ui-state]} (om/props this)]
     (let [node (u/js->cljk (:tree/select ui-state))
           sch (-> node :node :original :schema)
           path (clojure.string/join "." (:path sch))]
       (apply dom/form
              #js {:className "form-horizontal form-label-left"}
              (when-not (nil? sch)
                [((om/factory comp/LabelAndLabel)
                  {:label "Path" :second-label path})
                 ((om/factory comp/LabelAndLabel)
                  {:label "Optionality" :second-label (:mode sch)})
                 ((om/factory comp/LabelAndLabel)
                  {:label "Found values"
                   :second-label (when-not (= (:values sch) "not-enum")
                                   (str (clojure.string/join
                                         ", "
                                         (map name (keys (:values sch))))))})]))))))

(defui SchemaTree
  Object
  (componentDidMount
   [this]
   #_(println (om/props this))
   (let [{:keys [stream-name schema] :as props} (om/props this)]
     (produce-tree! props (om/react-ref this "tree"))
     (om/update-state! this assoc-in [:schemas stream-name] schema)
     (om/update-state! this assoc :current stream-name)))
  (componentDidUpdate
   [this _ _]
   (let [{:keys [stream-name schema owner] :as props} (om/props this)
         state (om/get-state this)
         tree (om/react-ref this "tree")
         prev-schema (get-in state [:schemas stream-name])
         same-schema? (= prev-schema schema)
         same-stream? (= (:current state) stream-name)]
     (if (and (not same-schema?) same-stream?)
       (do
         (om/update-state! this assoc-in [:schemas stream-name] schema)
         (om/update-state!
          this assoc
          :update (fn []
                    (clean-tree! {:schema schema} tree)
                    (produce-tree! {:schema schema :owner owner} tree)
                    (om/update-state! this assoc :update nil))))
       (when-not same-stream?
         (om/update-state! this assoc :current stream-name)
         (om/update-state! this assoc-in [:schemas stream-name] schema)
         (clean-tree! {:schema schema} tree)
         (produce-tree! {:schema schema :owner owner} tree)))))
  (render
   [this]
   (dom/div
    nil
    (dom/div
     #js {:className "col-md-6 col-xs-6 col-lg-6"}
     (dom/div #js {:className "col-lg-4" :ref "tree"}))
    (dom/div
     #js {:className "col-md-6 col-xs-6 col-lg-6"}
     (when-not (nil? (:update (om/get-state this)))
       (println (:update (om/get-state this)))
       (dom/button
        #js {:className "btn pull-right"
             :onClick (fn [_] ((:update (om/get-state this))))}
        "Update available"))))))

(defui DataProjector
  Object
  (render
   [this]
   (let [{:keys [ui-state schema owner]} (om/props this)
         v (:tree/select ui-state)
         node (u/js->cljk v)
         sch (-> node :node :original :schema)
         path (clojure.string/join "." (:path sch))
         [iv code] (construct-code (om/get-state this)
                                   (:analyse-version ui-state))
         upd (fn [k v]
               (om/transact! owner
                             `[(ui/update ~{:k k :v v}) :ui-state]))]
     (if (nil? v)
       (dom/p nil "Select a variable to get started")
       (dom/form
        #js {:className "form-horizontal form-label-left"}
        ((om/factory comp/LabelAndLabel)
         {:label "Selected variable" :second-label path})
        ((om/factory comp/LabelAndSomething)
         {:label "Actions"
          :component (dom/div
                      nil
                      (dom/button
                       #js {:className "btn btn-primary"
                            :onClick
                            (fn [ev]
                              (om/update-state!
                               this
                               update-in [:action-list :group-by] #(conj (into #{} %) node)))}
                       "Group by")
                      (dom/button
                       #js {:className "btn btn-primary"
                            :onClick
                            (fn [ev]
                              (om/update-state!
                               this
                               update-in [:action-list :select] #(conj (into #{} %) node)))}
                       "Select"))})
        #_(.log js/console (pr-str (action-list->actions (:action-list om/get-state))))
        (let [acs (action-list->actions (:action-list (om/get-state this)))]
          (dom/div
           #js {:className "control-group"}
           (dom/label
            #js {:className "control-label col-md-3 col-sm-3 col-xs-12"}
            "Selected actions")
           (dom/div
            #js {:id "tags" :className "col-md-9 col-sm-9 col-xs-12"}
            (apply dom/div
                  #js {:className "tagsinput"
                       :style #js {:width "auto" :height "auto"}}
                  (if (= 0 (count acs))
                    [(dom/input
                      #js {:value "none"
                           :data-default "none"
                           :style #js {:color "rgb(102,102,102)"
                                       :width "72px"}})]
                    (map #((om/factory ActionItem)
                           {:action %
                            :fn-delete
                            (fn [k v]
                              (om/update-state!
                               this
                               update-in [:action-list k] (fn [x] (disj x v))))})
                         acs))))))
        ((om/factory comp/LabelAndSomething)
         {:label "Initial value"
          :component ((om/factory comp/CodeBlock) {:code iv})})
        ((om/factory comp/LabelAndSomething)
         {:label "Code"
          :component ((om/factory comp/CodeBlock) {:code code})})
        ((om/factory comp/LabelAndTextInput)
         {:label "Projection name" :key :analyser-projection-name
          :owner owner})
        ((om/factory comp/FormButton)
         {:text "Create projection"
          :onClick
          (fn [ev]
            (ws/post-projection-and-notify
             owner
             {:projection-name (:analyser-projection-name ui-state)
              :stream-name (:analyse-stream ui-state)
              :initial-value iv
              :reduction code
              :language "clojure"}))}))))))

(defui DataAnalyser
  static om/IQuery
  (query [this] `[:stream-info])
  Object
  (render
   [this]
   (let [stream-info (:stream-info (om/props this))
         ui-state (:ui-state stream-info)
         {:keys [analyse-stream analyse-version]} ui-state
         stream (get (:streams/by-name stream-info) analyse-stream)
         schema (:schema (get (:schemas stream) analyse-version))]
     (dom/div
      nil
      (dom/div #js {:className "clearfix"})
      (dom/div
       #js {:className "row"}
       ((om/factory comp/LongPanel)
        {:title "Stream selector"
         :component StreamSelector
         :data {:owner this :stream-info stream-info}}))
      (dom/div
       #js {:className "row"}
       ((om/factory comp/HalfPanel)
        {:title "Schema tree"
         :component SchemaTree
         :data {:owner this :schema schema
                :stream-name [analyse-stream analyse-version]}})
       (dom/div
        #js {:className "col-md-6 col-sm-6 col-xs-6"}
        (dom/div
         #js {:className "row"}
         ((om/factory comp/LongPanel)
          {:title "Attribute inspector"
           :component AttrInspector
           :data {:owner this :ui-state ui-state}}))
        (dom/div
         #js {:className "row"}
         ((om/factory comp/LongPanel)
          {:title "Project data"
           :component DataProjector
           :data {:owner this :schema schema :ui-state ui-state}}))))))))
