(ns photon.handler
  (:require [ring.middleware.reload :as reload]
            [compojure.core :as cc]
            [compojure.route :as route]
            [clojure.tools.logging :as log]
            [photon.streams :as streams]
            [schema.core :as s]
            [ring.util.http-response :refer :all]
            [ring.util.response :as response]
            [ring.middleware.json :as rjson]
            [cheshire.core :as json]
            [cheshire.generate :refer [add-encoder]]
            [compojure.api.sweet :refer :all]
            [ring.swagger.swagger2 :as rs]
            [ring.swagger.json-schema-dirty :refer :all]
            [clojure.core.async :refer [go-loop go timeout <! >! close!]]
            [ring.middleware.params :as pms]
            [ring.middleware.multipart-params :as mp]
            [photon.api :as api]
            [chord.http-kit :refer [wrap-websocket-handler]]
            [compojure.handler :refer [site]]))

(defn f-ws-handler [ms]
  (fn [{:keys [ws-channel] :as req}]
    (go-loop []
      (if-let [{:keys [message]} (<! ws-channel)]
        (do
          (spit "/tmp/messages.txt" (str (pr-str {:message message}) "\n") :append true)
          (prn {:message message})
          (>! ws-channel (str "You said: " message))
          (recur))
        (prn "closed.")))))

(defn f-ws-projections-handler [stream]
  (fn [{:keys [ws-channel] :as req}]
    (go
      (loop [t 0]
        (if-let [{:keys [message]} (<! ws-channel)]
          (do
            (<! (timeout t))
            (>! ws-channel
                (if (contains? message :projection-name)
                  (api/projection stream (:projection-name message))
                  (api/projections-without-val stream)))
            (recur 1000))
          (do
            (close! ws-channel)
            (prn "closed.")))))))

(defn f-ws-stats-handler [stream]
  (fn [{:keys [ws-channel] :as req}]
    (go
      (loop [t 0]
        (if-let [{:keys [message]} (<! ws-channel)]
          (do
            (<! (timeout t))
            (let [stats-stream @(:stats stream)
                  stats-rt (api/runtime-stats stream)
                  all-stats {:stats (merge stats-stream stats-rt)}]
              (>! ws-channel all-stats))
            (recur 1000))
          (do
            (close! ws-channel)
            (prn "closed.")))))))

(defn f-ws-streams-handler [stream]
  (fn [{:keys [ws-channel] :as req}]
    (let [ch (streams/stream->ch stream
                                 {"from" "0"
                                  "stream-name" "__streams__"
                                  "stream-type" "hot-cold"})
          current-value (atom (streams/streams stream))]
      (go-loop [t 0]
        (if-let [{:keys [message]} (<! ws-channel)]
          (do
            (<! (timeout t))
            (>! ws-channel (<! ch))
            (recur 1000))
          (do
            (close! ch)
            (close! ws-channel)
            (prn "closed.")))))))

(defn ws-route-projections [stm]
  (cc/defroutes m-ws-route-projections
    (let [ws-projections-handler (f-ws-projections-handler stm)]
      (GET* "/ws-projections" []
            (wrap-websocket-handler ws-projections-handler)))))

(defn ws-route-stats [stm]
  (cc/defroutes m-ws-route-stats
    (let [ws-stats-handler (f-ws-stats-handler stm)]
      (GET* "/ws-stats" []
            (wrap-websocket-handler ws-stats-handler)))))

(add-encoder java.lang.Class
             (fn [c json-generator]
               (.writeString json-generator (.getSimpleName c))))

(defn app [ms]
  (defapi app-no-reload
    (context* "/api" []
              (swagger-ui :swagger-docs "/api/swagger.json")
              (swagger-docs)
              (GET* "/streams" []
                    :return api/StreamInfoMap
                    :summary "Obtain a list of active streams
                     and their current size"
                    (ok (api/streams ms)))
              (GET* "/projection-keys" []
                    :return api/ProjectionKeyMap
                    :summary "Obtain a list of the names (IDs)
          of the current active projections"
                    (ok (api/projection-keys ms)))
              (GET* "/projections" []
                    :return api/ProjectionList
                    :summary "Obtain a list of the states of the current active
          projections without their computed reduction values"
                    (ok (api/projections ms)))
              (GET* "/projection/:projection-name" [projection-name]
                    :path-params [projection-name :- s/Str]
                    :return api/ProjectionResponse
                    :summary "Obtain the current status of a given projection,
          including the latest computed reduction value"
                    (let [pres (api/projection ms projection-name)]
                      (if (nil? pres)
                        (not-found)
                        (ok pres))))
              (GET* "/stream-contents/:stream-name" [stream-name]
                    :path-params [stream-name :- s/Str]
                    :return api/StreamContentsResponse
                    :summary "Obtain a list (maximum of 50) of events contained
          in a given stream"
                    (ok (api/stream ms stream-name :limit 50)))
              (GET* "/event/:stream-name/:order-id" [stream-name order-id]
                    :path-params [stream-name :- s/Str order-id :- s/Str]
                    :return api/EventResponse
                    :summary "Obtain the event identified by a given stream name
          and an order ID"
                    (let [res (api/event ms stream-name (read-string order-id))]
                      (if (nil? res) (not-found) (ok res))))
              (POST* "/projection" [& request]
                     :body [body api/ProjectionTemplate]
                     :return api/PostResponse
                     :summary "Add a projection"
                     (ok (api/post-projection! ms request)))
              (POST* "/event" [& request]
                     :body [body api/EventTemplate]
                     :return api/PostResponse
                     :summary "Add an event"
                     (let [res (api/post-event! ms request)]
                       (ok res)))
              (POST* "/event/:stream-name" [& request]
                     :no-doc true
                     (api/post-event! ms request))
              (mp/wrap-multipart-params
               (cc/POST "/new-stream" {params :params}
                     (ok {:status "OK"
                          :stream-name (api/new-stream ms params)}))))
    (GET* "/ui" []
          :no-doc true
          (response/resource-response "index.html"
                                      {:root "public/ui"}))
    (context* "/ws" []
              (routes (rjson/wrap-json-body
                       (pms/wrap-params
                        (site (routes (ws-route-projections ms)
                                      (ws-route-stats ms))))
                       {:keywords? true})))
    (route/resources "/")
    (route/not-found "Not Found"))
  (reload/wrap-reload #'app-no-reload))
