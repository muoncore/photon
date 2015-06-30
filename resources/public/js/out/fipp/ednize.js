// Compiled by ClojureScript 0.0-3269 {}
goog.provide('fipp.ednize');
goog.require('cljs.core');
goog.require('clojure.string');

/**
 * Perform a shallow conversion to an Edn data structure.
 */
fipp.ednize.IEdn = (function (){var obj37849 = {};
return obj37849;
})();

fipp.ednize._edn = (function fipp$ednize$_edn(x){
if((function (){var and__29253__auto__ = x;
if(and__29253__auto__){
return x.fipp$ednize$IEdn$_edn$arity$1;
} else {
return and__29253__auto__;
}
})()){
return x.fipp$ednize$IEdn$_edn$arity$1(x);
} else {
var x__29901__auto__ = (((x == null))?null:x);
return (function (){var or__29265__auto__ = (fipp.ednize._edn[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (fipp.ednize._edn["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"IEdn.-edn",x);
}
}
})().call(null,x);
}
});

fipp.ednize.edn = (function fipp$ednize$edn(x){
if(cljs.core.object_QMARK_.call(null,x)){
return cljs.core.tagged_literal.call(null,new cljs.core.Symbol(null,"js","js",-886355190,null),cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__30019__auto__ = (function fipp$ednize$edn_$_iter__37858(s__37859){
return (new cljs.core.LazySeq(null,(function (){
var s__37859__$1 = s__37859;
while(true){
var temp__4423__auto__ = cljs.core.seq.call(null,s__37859__$1);
if(temp__4423__auto__){
var s__37859__$2 = temp__4423__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__37859__$2)){
var c__30017__auto__ = cljs.core.chunk_first.call(null,s__37859__$2);
var size__30018__auto__ = cljs.core.count.call(null,c__30017__auto__);
var b__37861 = cljs.core.chunk_buffer.call(null,size__30018__auto__);
if((function (){var i__37860 = (0);
while(true){
if((i__37860 < size__30018__auto__)){
var k = cljs.core._nth.call(null,c__30017__auto__,i__37860);
cljs.core.chunk_append.call(null,b__37861,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,k),(x[k])], null));

var G__37866 = (i__37860 + (1));
i__37860 = G__37866;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__37861),fipp$ednize$edn_$_iter__37858.call(null,cljs.core.chunk_rest.call(null,s__37859__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__37861),null);
}
} else {
var k = cljs.core.first.call(null,s__37859__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,k),(x[k])], null),fipp$ednize$edn_$_iter__37858.call(null,cljs.core.rest.call(null,s__37859__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__30019__auto__.call(null,cljs.core.js_keys.call(null,x));
})()));
} else {
if(cljs.core.array_QMARK_.call(null,x)){
return cljs.core.tagged_literal.call(null,new cljs.core.Symbol(null,"js","js",-886355190,null),cljs.core.vec.call(null,x));
} else {
if((function (){var G__37862 = x;
if(G__37862){
var bit__29939__auto__ = (G__37862.cljs$lang$protocol_mask$partition0$ & (32768));
if((bit__29939__auto__) || (G__37862.cljs$core$IDeref$)){
return true;
} else {
if((!G__37862.cljs$lang$protocol_mask$partition0$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IDeref,G__37862);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IDeref,G__37862);
}
})()){
var pending_QMARK_ = (function (){var and__29253__auto__ = (function (){var G__37864 = x;
if(G__37864){
var bit__29939__auto__ = (G__37864.cljs$lang$protocol_mask$partition1$ & (1));
if((bit__29939__auto__) || (G__37864.cljs$core$IPending$)){
return true;
} else {
if((!G__37864.cljs$lang$protocol_mask$partition1$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IPending,G__37864);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IPending,G__37864);
}
})();
if(and__29253__auto__){
return !(cljs.core.realized_QMARK_.call(null,x));
} else {
return and__29253__auto__;
}
})();
var val = ((pending_QMARK_)?null:cljs.core.deref.call(null,x));
var status = ((pending_QMARK_)?new cljs.core.Keyword(null,"pending","pending",-220036727):new cljs.core.Keyword(null,"ready","ready",1086465795));
return cljs.core.tagged_literal.call(null,new cljs.core.Symbol(null,"object","object",-1179821820,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.symbol.call(null,cljs.core.pr_str.call(null,cljs.core.type.call(null,x))),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status","status",-1997798413),status,new cljs.core.Keyword(null,"val","val",128701612),val], null)], null));
} else {
if((x instanceof Date)){
return cljs.core.tagged_literal.call(null,new cljs.core.Symbol(null,"inst","inst",-2008473268,null),(function (){var normalize = (function (n,len){
var ns = [cljs.core.str(n)].join('');
while(true){
if((cljs.core.count.call(null,ns) < len)){
var G__37867 = [cljs.core.str("0"),cljs.core.str(ns)].join('');
ns = G__37867;
continue;
} else {
return ns;
}
break;
}
});
return [cljs.core.str(x.getUTCFullYear()),cljs.core.str("-"),cljs.core.str(normalize.call(null,(x.getUTCMonth() + (1)),(2))),cljs.core.str("-"),cljs.core.str(normalize.call(null,x.getUTCDate(),(2))),cljs.core.str("T"),cljs.core.str(normalize.call(null,x.getUTCHours(),(2))),cljs.core.str(":"),cljs.core.str(normalize.call(null,x.getUTCMinutes(),(2))),cljs.core.str(":"),cljs.core.str(normalize.call(null,x.getUTCSeconds(),(2))),cljs.core.str("."),cljs.core.str(normalize.call(null,x.getUTCMilliseconds(),(3))),cljs.core.str("-"),cljs.core.str("00:00")].join('');
})());
} else {
if((function (){var G__37865 = x;
if(G__37865){
var bit__29939__auto__ = null;
if(cljs.core.truth_((function (){var or__29265__auto__ = bit__29939__auto__;
if(cljs.core.truth_(or__29265__auto__)){
return or__29265__auto__;
} else {
return G__37865.fipp$ednize$IEdn$;
}
})())){
return true;
} else {
if((!G__37865.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,fipp.ednize.IEdn,G__37865);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,fipp.ednize.IEdn,G__37865);
}
})()){
return fipp.ednize._edn.call(null,x);
} else {
return cljs.core.tagged_literal.call(null,new cljs.core.Symbol(null,"object","object",-1179821820,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.symbol.call(null,cljs.core.pr_str.call(null,cljs.core.type.call(null,x)))], null));

}
}
}
}
}
});
cljs.core.UUID.prototype.fipp$ednize$IEdn$ = true;

cljs.core.UUID.prototype.fipp$ednize$IEdn$_edn$arity$1 = (function (x){
var x__$1 = this;
return cljs.core.tagged_literal.call(null,new cljs.core.Symbol(null,"uuid","uuid",-504564192,null),[cljs.core.str(x__$1)].join(''));
});

cljs.core.ExceptionInfo.prototype.fipp$ednize$IEdn$ = true;

cljs.core.ExceptionInfo.prototype.fipp$ednize$IEdn$_edn$arity$1 = (function (x){
var x__$1 = this;
return cljs.core.tagged_literal.call(null,new cljs.core.Symbol(null,"ExceptionInfo","ExceptionInfo",294935087,null),cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"message","message",-406056002),cljs.core.ex_message.call(null,x__$1),new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.ex_data.call(null,x__$1)], null),(function (){var temp__4423__auto__ = cljs.core.ex_cause.call(null,x__$1);
if(cljs.core.truth_(temp__4423__auto__)){
var cause = temp__4423__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cause","cause",231901252),cause], null);
} else {
return null;
}
})()));
});
fipp.ednize.record__GT_tagged = (function fipp$ednize$record__GT_tagged(x){
return cljs.core.tagged_literal.call(null,clojure.string.split.call(null,cljs.core.pr_str.call(null,cljs.core.type.call(null,x)),/\//,(2)),cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,x));
});

//# sourceMappingURL=ednize.js.map