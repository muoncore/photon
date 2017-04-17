(ns photon.ui.utils)

(defn js->cljk [n]
  #_(.log js/console "js->cljk")
  (js->clj n :keywordize-keys true))
