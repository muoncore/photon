(ns photon.ui.ws
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [om.next :as om]
            [chord.client :refer [ws-ch]]
            [cljs-http.client :as client]
            [goog.net.cookies :as ck]
            [cljs.core.async :refer [chan <! >! put! close!]]))

(enable-console-print!)

(defonce localhost (let [href (.-href (.-location js/window))]
                     (if (= (last href) \/)
                       (apply str (drop-last 1 href))
                       (clojure.string/join
                        "/"
                        (drop-last (clojure.string/split href #"/"))))))

(def ws-server
  (let [tokens (clojure.string/split (ck/get "server") #":")
        prefix (if (= (first tokens) "https") "wss" "ws")]
    (clojure.string/join ":" (conj (rest tokens) prefix))))

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
     (f (str ws-server query)))))

(defn call-oauth [f & args]
  (let [m (if (> (count args) 1)
            (merge (second args) {})
            {})]
    #_(.log js/console (pr-str m))
    (f (str (ck/get "server") (first args))
       (assoc m :accept "application/edn"))))

(defn call-back [url params upd]
  (go
    (let [res (try
                (<! (client/get (str (ck/get "server") url) params))
                (catch js/Error e
                  (println e)))]
        (upd res))))

(defn ws-api   [& args] (apply call-api ws-ch args))
(defn get-api  [& args] (apply call-oauth client/get args))
(defn post-api [& args] (apply call-oauth client/post args))
(defn post-api-async [& args] (go (<! (apply call-oauth client/post args))))

(defn subscribe-projections! [stats upd msg]
  (go
    (let [{:keys [ws-channel error]}
          (<! (ws-api (if-let [pn (:projection-name msg)]
                        (str "/ws/ws-projections?projection-name=" pn)
                        "/ws/ws-projections")))]
      (if-not error
        (do
          ;; TODO: Fix first result, projection-name not applied
          (>! ws-channel msg)
          (loop [elem (<! ws-channel)]
            (when-not (nil? elem)
              (if (contains? elem :error)
                (do
                  #_(.log js/console (pr-str elem)))
                (upd elem))
              (>! ws-channel msg)
              (recur (<! ws-channel)))))
        (do (.log js/console "Error:" (pr-str error)))))))

(defn subscribe-stats! [stats upd]
  (go
    (let [{:keys [ws-channel error]}
          (<! (ws-api "/ws/ws-stats"))]
      (if-not error
        (do
          (>! ws-channel {:ok true})
          (loop [elem (<! ws-channel)
                 last-25-processed (get stats :processed [])
                 last-25-incoming (get stats :incoming [])
                 last-25-memory (get stats :memory (repeat 25 0))
                 last-25-cpu (get stats :cpu (repeat 25 0))
                 timestamps (get stats :timestamps [])
                 previous-processed 0
                 previous-incoming 0
                 is-first? true]
            (when-not (nil? elem)
              (if (contains? elem :error)
                (.log js/console (pr-str elem))
                (let [stats-from-msg (:stats (:message elem))
                      new-processed (get-chart-data (:processed stats-from-msg) previous-processed last-25-processed is-first?)
                      new-incoming (get-chart-data (:incoming stats-from-msg) previous-incoming last-25-incoming is-first?)
                      used-memory (- (:total-memory stats-from-msg) (:available-memory stats-from-msg))
                      used-memory-percentage (int (* (/ used-memory (:total-memory stats-from-msg)) 100))
                      new-memory (into [] (take-last 25 (conj last-25-memory used-memory-percentage)))
                      new-cpu (into [] (take-last 25 (conj last-25-cpu (:cpu-load stats-from-msg))))
                      new-timestamps (into [] (take-last 25 (conj timestamps (.getTime (js/Date.)))))
                      stats (assoc stats-from-msg :last-25 {:processed new-processed
                                                            :incoming new-incoming
                                                            :memory new-memory
                                                            :timestamps new-timestamps
                                                            :cpu new-cpu})]
                  (when-not is-first? (upd {:stats stats}))
                  (>! ws-channel {:ok true})
                  (recur (<! ws-channel) new-processed new-incoming
                         new-memory new-cpu new-timestamps
                         (:processed stats-from-msg)
                         (:incoming stats-from-msg) false))))))
        (do
          (.log js/console "Error:" (pr-str error)))))))

(defn subscribe-streams! [stats upd]
  (go
    (let [{:keys [ws-channel error]}
          (<! (ws-api "/ws/ws-streams"))]
      (if-not error
        (do
          (>! ws-channel {})
          (loop [elem (<! ws-channel)]
            (when-not (nil? elem)
              (if (contains? elem :error)
                (do #_(.log js/console (pr-str elem)))
                (let [streams-proj (:message elem)]
                  (upd {:streams (proj->streams streams-proj)})))
              (>! ws-channel {})
              (recur (<! ws-channel)))))
        (do #_(.log js/console "Error:" (pr-str error)))))))

(defn fn-update [owner stream-name]
  (go
    (let [response
          (:body (<! (get-api (str "/api/stream-contents/"
                                   stream-name))))]
      #_(.log js/console response)
      #_(om/update-state! owner #(assoc % :events (:results response)))
      (om/transact!
       owner `[(ui/update {:k :events :v ~(:results response)})
               :stream-info]))))

(defn post-projection-and-notify [owner params]
  (let [pn (:projection-name params)
        noti (js/PNotify.
              #js {:title "Creating projection..."
                   :type "info"
                   :text (str "Projection: " pn)})]
    (go
      (let [res (<! (post-api "/api/projection" {:json-params params}))]
        (.removeAll js/PNotify)
        (js/PNotify.
         (clj->js
          (if (= 200 (:status res))
            {:title "Success"
             :type "success"
             :text (str "Projection " pn " created "
                        "successfully")
             :confirm {:confirm true
                       :buttons
                       [{:text "Go to projection"
                         :addClass "btn-primary"
                         :click
                         (fn [_]
                           (om/transact!
                            owner
                            `[(leaf/select {:name "Active projections"})])
                           (om/transact!
                            owner
                            `[(ui/update ~{:k :new-projection :v pn})]))}]}}
            {:title "Unexpected problem"
             :type "error"
             :text (str "Error code: " (:status res) "\n"
                        "Message: " (pr-str (:body res)))})))
        (.positionAll js/PNotify)))))

(defn notify-stream [owner msg]
  (let [stream-name (:stream-name msg)]
    (js/PNotify.
     (clj->js
      (if (= "OK" (:status msg))
        {:title "Success"
         :type "success"
         :text (str "Stream " stream-name " created "
                    "successfully")
         :confirm {:confirm true
                   :buttons
                   [{:text "Go to stream"
                     :addClass "btn-primary"
                     :click
                     (fn [_]
                       (om/transact!
                        owner
                        `[(leaf/select {:name "Active streams"})])
                       (om/transact!
                        owner
                        `[(ui/update ~{:k :new-stream
                                       :v stream-name})]))}]}}
        {:title "Unexpected problem"
         :type "error"
         :text (str "Error code: " (:status msg) "\n"
                    "Message: " (pr-str msg))})))))
