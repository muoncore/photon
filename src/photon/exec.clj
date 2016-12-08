(ns photon.exec
  (:require [clj-rhino :as js]
            [cheshire.core :as json]
            [photon.db :as db])
  (:import (org.mozilla.javascript ConsString)
           (java.util HashMap)
           (jdk.nashorn.api.scripting JSObject)
           (clojure.lang PersistentArrayMap)
           (java.net ServerSocket)
           (javax.script ScriptEngineManager SimpleBindings
                         ScriptContext)))

;; Code handling
;;;;;;;;;;;;;;;;

(defmulti generate-function (fn [lang _] (name lang)))

(defmethod generate-function "clojure" [lang f-string]
  (let [code (eval (let [f (read-string f-string)]
                     (if (= (first f) 'fn)
                       (conj (rest f) 'serializable.fn/fn)
                       f)))]
    {:computable code
     :persist f-string}))

(defn cons-string->string [^ConsString elem]
  (.toString elem))

(defn generate-fun-with-return [scope fun]
  (fn [& args]
    (let [res (apply js/call-timeout scope fun 9999999 args)]
      (try
        (let [converted (clojure.walk/walk
                         (fn [elem]
                           (if (instance?
                                ConsString
                                elem)
                             (cons-string->string elem)
                             elem))
                         identity
                         (js/from-js res))]
          converted)
        (catch Exception e
          #_(println (.getMessage e))
          #_(.printStackTrace e)
          res)))))

(defmethod generate-function "javascript" [_ f]
  (let [sc (js/new-safe-scope)
        compiled-fun (js/compile-function sc f :filename (str (db/uuid) ".js"))
        fun-with-return (generate-fun-with-return sc compiled-fun)]
    {:computable fun-with-return
     :persist f}))

(def ^:dynamic *nashorn-cache* true)
(declare clj->nashorn)

(defn m-get-member [x n]
  (let [res (get x n (get x (keyword n)))]
    (if (nil? res)
      nil
      (clj->nashorn res))))

(def get-member (memoize m-get-member))

(defprotocol JSProtocol)

(extend-protocol JSProtocol JSObject)

(defn clj->nashorn [x-orig]
  (if (map? x-orig)
    (let [x-ref (atom x-orig)]
      (reify JSObject
        (isArray [^JSObject this]
          (println "isArray")
          false)
        (^boolean isInstance [^JSObject this ^Object instance]
         (println "isInstance"))
        (^boolean isInstanceOf [^JSObject this ^Object class]
         (println "isInstanceOf")
         false)
        (isStrictFunction [^JSObject this]
          (println "isStrictFunction")
          false)
        (keySet [^JSObject this]
          #_(println "keySet")
          (into #{} (keys @x-ref)))
        (newObject [^JSObject this args]
          (println "newObject")
          (clj->nashorn @x-ref))
        (^void removeMember [^JSObject this ^String s]
         #_(println "removeMember")
         (swap! x-ref dissoc s (keyword s)))
        (^void setMember [^JSObject this ^String n ^Object v]
         #_(println "setMember")
         (let [k (if (contains? @x-ref (keyword n))
                   (keyword n)
                   n)]
           (swap! x-ref assoc k (clj->nashorn v))))
        (^void setSlot [^JSObject this ^int n ^Object v]
         #_(println "setSlot")
         (let [k (let [k-c (nth (keys @x-ref) n)]
                   (if (nil? k-c) (str n) k-c))]
           (swap! x-ref assoc k (clj->nashorn v))))
        (values [^JSObject this]
          #_(println "values")
          (map clj->nashorn (vals @x-ref)))
        (isFunction [^JSObject this]
          #_(println "isFunction")
          true)
        (eval [^JSObject this ^String s]
          #_(println "eval"))
        (getClassName [^JSObject this]
          #_(println "getClassName")
          "ReifiedJSObject")
        (getSlot [^JSObject this ^int index]
          #_(println "getSlot")
          (let [k (nth (keys @x-ref) index)]
            (if (nil? k) nil (get @x-ref k))))
        (^boolean hasSlot [^JSObject this ^int index]
         #_(println "hasSlot")
         (let [k (nth (keys @x-ref) index)]
           (not (nil? k))))
        (^boolean hasMember [^JSObject this ^String s]
         #_(println "hasMember")
         (or (contains? @x-ref s) (contains? @x-ref (keyword s))))
        (call [this thiz args]
          #_(println "call" thiz (into [] args)))
        (getMember [^JSObject this ^String n]
          #_(println "getMember" n)
          (condp = n
            "toString" "[object Object]"
            "___map" @x-ref
            "valueOf" this
            (get-member @x-ref n)))))
    x-orig))

(defmethod generate-function "js-experimental" [_ f]
  (let [factory (ScriptEngineManager.)
        engine (.getEngineByName factory "nashorn")
        compiled (.compile engine f)
        evaled (.eval compiled)
        global (SimpleBindings.)]
    (.eval engine (str "load(\"nashorn:mozilla_compat.js\");"
                       "var HashMap = Java.type(\"java.util.HashMap\");"))
    (.setBindings engine global ScriptContext/GLOBAL_SCOPE)
    (.put global "reduction" evaled)
    (.put global "__prev" (.eval (.compile engine "null")))
    (let [wrap (.compile engine
                         (str "function() {"
                              "var GLOBAL_SCOPE = "
                              "javax.script.ScriptContext.GLOBAL_SCOPE;"
                              "var g = context.getBindings(GLOBAL_SCOPE);"
                              "__prev = g.get('__prev');"
                              "__res = reduction(__prev, __next);"
                              "if(__res != null && typeof __res === 'function'"
                              "&& __res.___map != null && __res.___map != undefined)"
                              "{ __res = __res.___map; }"
                              "g.put('__prev', __res);"
                              "return __res;"
                              "}"))
          compiled-fun (fn [a b]
                         (if (or
                              (not *nashorn-cache*)
                              (nil? (.get global "__prev")))
                           (.put global "__prev" (clj->nashorn a)))
                         (.put global "__next" (clj->nashorn b))
                         (let [script "wrap_reduction()"]
                           (.eval engine script global)))]
      (.put global "wrap_reduction" (.eval wrap))
      {:computable compiled-fun
       :persist f})))

(extend org.bson.types.ObjectId js/RhinoConvertible
        {:-to-rhino (fn [obj scope ctx] (str obj))})

(defn parse-value [str-val k-language]
  (condp = k-language
    :clojure (read-string str-val)
    :javascript (json/parse-string str-val)
    (throw (UnsupportedOperationException.
             (str (name k-language) " not supported")))))

