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
   :categories [{:name "Admin dashboard"
                 :sections [{:name "Stats"
                             :category "Admin dashboard"
                             :active false
                             :leaves [{:name "Basic stats"
                                       :section "Stats"
                                       :link :dashboard/stats
                                       :active false}]
                             :hover false}]}
                {:name "Streams"}]
   :sections [{:name "Stats"
               :category "Admin dashboard"
               :active false
               :hover false}
              {:name "Active streams"
               :category "Streams"
               :active false
               :hover false}]
   :leaves [{:name "Basic stats"
             :section "Stats"
             :link :dashboard/stats
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
   :new-projection false})
