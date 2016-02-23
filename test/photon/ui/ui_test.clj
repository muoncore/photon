(ns photon.ui.ui-test
  (:require [midje.sweet :refer :all]
            [photon.core :refer :all]
            [clj-http.client :as client]
            [com.stuartsierra.component :as component]))

(let [system (-main "-rest.port" "6969"
                    "-projections.path" "/tmp/dummy-folder/"
                    "-amqp.url" "amqp://localhost"
                    "-db.backend" "file"
                    "-file.path" "/tmp/events.tmp")]
  (fact (client/get "http://localhost:6969/swagger.json")
        =not=> (throws clojure.lang.ExceptionInfo))
  (component/stop system))
