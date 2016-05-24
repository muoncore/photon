(ns photon.current.sql-test
  (:require [photon.sql :as sql]
            [midje.sweet :refer :all]))

(fact "SELECT WITH not allowed"
      (sql/execute "WITH dept_count AS (SELECT e.name AS employee_name FROM emp e) SELECT a.* FROM events a;")
      => (throws UnsupportedOperationException))

(fact "INSERT not allowed"
      (sql/execute "INSERT INTO events VALUES(1,2,3)")
      => (throws AbstractMethodError))

(fact "UPDATE not allowed"
      (sql/execute "UPDATE events SET a = 1")
      => (throws AbstractMethodError))

(fact "DELETE not allowed"
      (sql/execute "DELETE events")
      => (throws AbstractMethodError))
