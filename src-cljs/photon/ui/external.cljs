(ns photon.ui.external
  (:require [om.next :as om :refer-macros [defui]]
            [om.dom :as dom]))

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
