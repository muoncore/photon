(ns photon.ui.actions
  (:require [om.next :as om :refer-macros [defui]]
            [om.dom :as dom]
            [photon.ui.ws :as ws]))

(defui ExportAction
  Object
  (render
   [this]
   (let [item (:item (om/props this))
         link (str "/export/stream/" (:stream item))]
     (dom/a #js {:href link} "Export"))))

(defui DeleteStreamAction
  Object
  (render
   [this]
   (let [{:keys [item owner]} (om/props this)
         f (fn [_]
             (let [sm (:stream item)]
               (when (js/confirm
                      (str "Are you sure you want to delete the "
                           "stream " sm "?\n\n"
                           "NOTE: This is an advanced, unsafe "
                           "operation. The consistency of "
                           "currently active projections "
                           "will probably be lost. Proceed if "
                           "you REALLY know what you are doing."))
                 (ws/delete-stream this sm)))
             #_(ws/fn-update owner (:stream item))
             #_(om/transact!
                owner
                `[(ui/update {:k :active-stream :v ~(:stream item)})
                  :stream-info]))]
     (dom/a #js {:href "#" :onClick f} "Delete"))))

(defui ViewContentsAction
  Object
  (render
   [this]
   (let [{:keys [item owner]} (om/props this)
         f (fn [_]
             (ws/fn-update owner (:stream item))
             (om/transact!
              owner
              `[(ui/update {:k :active-stream :v ~(:stream item)})
                :stream-info]))]
     (dom/a #js {:href "#" :onClick f} "Browse"))))

(defui ViewProjectionAction
  Object
  (render
   [this]
   (let [{:keys [item owner]} (om/props this)
         f (fn [_]
             (ws/fn-update owner (:stream item))
             (om/transact!
              owner
              `[(ui/update {:k :active-projection
                            :v ~item})
                (ui/update {:k :modal-projections :v true})
                :projection-info]))]
     (dom/a #js {:href "#" :onClick f} "Browse"))))

(defui ShowPayloadAction
  Object
  (render
   [this]
   (let [{:keys [item owner]} (om/props this)
         f (fn [_]
             (om/transact!
              owner
              `[(ui/update {:k :selected-event :v ~item})
                (ui/update {:k :modal-events :v true})
                :stream-info]))]
     (dom/a #js {:href "#event-browser" :onClick f}
            (str "/api/event/" (:stream-name item)
                 "/" (:order-id item))))))

(defui ShowKeysAction
  Object
  (render
   [this]
   (let [{:keys [item owner]} (om/props this)
         f (fn [_]
             (om/transact!
              owner
              `[(ui/update {:k :selected-app :v ~(:meta/original item)})
                (ui/update {:k :new-app :v false}) 
                :ui-state]))]
     (dom/a #js {:href "#event-browser" :onClick f}
            "See keys"))))

(def k->action {:action/export-stream ExportAction
                :action/view-contents ViewContentsAction
                :action/show-payload ShowPayloadAction
                :action/delete-stream DeleteStreamAction
                :action/show-keys ShowKeysAction
                :action/view-projection ViewProjectionAction})
