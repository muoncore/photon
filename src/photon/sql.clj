(ns photon.sql
  (:import (net.sf.jsqlparser.parser CCJSqlParserUtil)
           (net.sf.jsqlparser.schema Table)
           (net.sf.jsqlparser.statement.select
            Select SelectVisitor PlainSelect SetOperationList
            WithItem FromItemVisitor SubSelect SubJoin LateralSubSelect
            ValuesList TableFunction)
           (net.sf.jsqlparser.statement StatementVisitor)))

(defn dots->path [s]
  (let [tokens (clojure.string/split s #"\.")]
    (into [] (map keyword tokens))))

(defn accept [a b]
  (let [at (atom nil)]
    (.accept a (b at))
    @at))

(defn from-item-visitor [at]
  (reify FromItemVisitor
    (^void visit [this ^Table t]
     (if (nil? (.getPivot t))
       (swap! at
              (fn [_]
                {:table-name (dots->path (.getFullyQualifiedName t))
                 :alias (.getName (.getAlias t))}))
       (throw (UnsupportedOperationException. "PIVOT"))))
    (^void visit [this ^SubSelect t]
     (throw (UnsupportedOperationException. "SubSelect")))
    (^void visit [this ^SubJoin t]
     (throw (UnsupportedOperationException. "SubJoin")))
    (^void visit [this ^LateralSubSelect t]
     (throw (UnsupportedOperationException. "LateralSubSelect")))
    (^void visit [this ^ValuesList t]
     (throw (UnsupportedOperationException. "ValuesList")))
    (^void visit [this ^TableFunction t]
     (throw (UnsupportedOperationException. "TableFunction")))))

(defn select-visitor [at]
  (reify SelectVisitor
    (^void visit [this ^PlainSelect plain-select]
     (let [from (.getFromItem plain-select)]
       (accept from from-item-visitor))
     (let [joins (.getJoins plain-select)]
       (println (map #(accept (.getRightItem %) from-item-visitor) joins)))
     (println "plain select")
     (println (.getFromItem plain-select))
     (println (into [] (.getJoins plain-select))))
    (^void visit [this ^SetOperationList set-op-list]
     (throw (UnsupportedOperationException. "set operation list")))
    (^void visit [this ^WithItem with-item]
     (throw (UnsupportedOperationException. "WITH item")))))

(defn visitor [at]
  (reify StatementVisitor
    (^void visit [this ^Select select]
     (if (> (count (.getWithItemsList select)) 0)
       (throw (UnsupportedOperationException. "SELECT WITH"))
       (accept (.getSelectBody select) select-visitor)))))

(defn execute [sql]
  (let [obj (CCJSqlParserUtil/parse sql)]
    (accept obj visitor)))

#_(execute "SELECT p.userID, p.journeyID FROM payload p;")
