(ns photon.ui.state)

(defonce app-state
  {:stream nil
   :current nil
   :initial-value ""
   :reduction ""
   :projections []
   :username ""
   :auth nil
   :password ""
   :categories [{:name "Admin dashboard"}
                {:name "Docs"}]
   :sections [{:name "Stats"
               :category "Admin dashboard"
               :active true
               :opened true
               :hover false}
              {:name "Streams"
               :category "Admin dashboard"
               :active false
               :opened false
               :hover false}]
   :leaves [{:name "Basic stats"
             :section "Stats"
             :link :dashboard/stats
             :active true}
            {:name "Active streams"
             :section "Streams"
             :link :streams/active
             :active false}]
   #_#_:menu-structure
   {"Admin dashboard" {"Stats" {"Basic stats" :dashboard/stats}
                       "Streams" {"Active streams" :dashboard/streams}}
    #_#_#_#_#_#_"Streams" {"Active streams" StreamsContent
                           "New stream" NewStreamContent}
    "Projections" {"List of projections" ProjectionsContent
                   "New projections" NewProjectionContent}
    "Data analysis" {"Schema inspector" SchemaInspectorContent}}
   :analyse-stream nil
   :new-projection false
   :ui-state {:menu-toggle false
              :active-stream nil}})
