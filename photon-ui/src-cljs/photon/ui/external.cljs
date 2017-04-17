(ns photon.ui.external
  (:require [om.next :as om :refer-macros [defui]]
            [om.dom :as dom]
            [photon.ui.components :as comp]))

(defui Swagger
  Object
  (render
   [this]
   (dom/iframe #js {:style #js {:display "block"
                                :overflow "hidden"
                                :width "100%"
                                :height "100vh"
                                :border "0"}
                    :src "/api-docs/"})))

(defui DebugMode
  Object
  (render
    [this]
    (dom/div
      nil
      (dom/p nil (pr-str (:stats (om/props this)))))))

