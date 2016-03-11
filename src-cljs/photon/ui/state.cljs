(ns photon.ui.state)

(defonce app-state
  (atom {:stream nil
         :current nil
         :initial-value ""
         :reduction ""
         :projections []
         :username ""
         :auth nil
         :password ""
         :analyse-stream nil
         :items [{:name "Dashboard" :active? true}
                 {:name "Streams" :active? false}
                 {:name "Projections" :active? false}
                 {:name "Analyse Data" :active? true}] 
         :new-projection false}))
