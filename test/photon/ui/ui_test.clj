(ns photon.ui.ui-test
  (:require [midje.sweet :refer :all]
            [photon.core :refer :all]
            [clj-http.client :as client]
            [com.stuartsierra.component :as component]))

(def temp-file (java.io.File/createTempFile "midje" ".json"))
(let [system (-main "-rest.port" "6969"
                    "-db.backend" "file"
                    "-file.path" (.getAbsolutePath temp-file))]
  (fact (client/get "http://localhost:6969/swagger.json")
        =not=> (throws clojure.lang.ExceptionInfo))
  (component/stop system))
