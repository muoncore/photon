(ns photon.common
  (:require [clojure.data.json :as json]
            [ring.util.response :as response]))

(defn wrap-json [r]
  (response/header (response/response (json/write-str r))
                   "Content-Type" "application/json"))

(defn uuid [] (str (java.util.UUID/randomUUID)))

