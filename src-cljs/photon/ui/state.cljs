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
                {:name "Documentation"}]
   :sections [{:name "Stats"
               :category "Admin dashboard"
               :icon "fa-cogs"
               :active true
               :opened true}
              {:name "Streams"
               :category "Admin dashboard"
               :icon "fa-sliders"
               :active true
               :opened true}
              {:name "Projections"
               :category "Admin dashboard"
               :icon "fa-tasks"
               :active true
               :opened true}
              {:name "API"
               :category "Documentation"
               :icon "fa-newspaper-o"
               :active true
               :opened true}]
   :leaves [{:name "Basic stats"
             :section "Stats"
             :link :dashboard/stats
             :active true}
            {:name "Active streams"
             :section "Streams"
             :link :streams/active
             :active false}
            {:name "New stream"
             :section "Streams"
             :link :streams/new
             :active false}
            {:name "Data analyser"
             :section "Streams"
             :link :streams/analyse
             :active false}
            {:name "Active projections"
             :section "Projections"
             :link :projections/active
             :active false}
            {:name "New projection"
             :section "Projections"
             :link :projections/new
             :active false}
            {:name "Swagger Interface"
             :section "API"
             :link :api/swagger
             :active false}]
   :analyse-stream nil
   :new-projection false
   :subscriptions false
   :ui-state {:menu-toggle false
              :pform/language "clojure"
              :pform/initial-value ""
              :pform/reduction ""
              :select-value "pev"
              :active-stream nil
              :active-projection nil}})
