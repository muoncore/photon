// Compiled by ClojureScript 0.0-3269 {}
goog.provide('cljs.repl');
goog.require('cljs.core');
cljs.repl.print_doc = (function cljs$repl$print_doc(m){
cljs.core.println.call(null,"-------------------------");

cljs.core.println.call(null,[cljs.core.str((function (){var temp__4423__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__4423__auto__)){
var ns = temp__4423__auto__;
return [cljs.core.str(ns),cljs.core.str("/")].join('');
} else {
return null;
}
})()),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__43242_43254 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__43243_43255 = null;
var count__43244_43256 = (0);
var i__43245_43257 = (0);
while(true){
if((i__43245_43257 < count__43244_43256)){
var f_43258 = cljs.core._nth.call(null,chunk__43243_43255,i__43245_43257);
cljs.core.println.call(null,"  ",f_43258);

var G__43259 = seq__43242_43254;
var G__43260 = chunk__43243_43255;
var G__43261 = count__43244_43256;
var G__43262 = (i__43245_43257 + (1));
seq__43242_43254 = G__43259;
chunk__43243_43255 = G__43260;
count__43244_43256 = G__43261;
i__43245_43257 = G__43262;
continue;
} else {
var temp__4423__auto___43263 = cljs.core.seq.call(null,seq__43242_43254);
if(temp__4423__auto___43263){
var seq__43242_43264__$1 = temp__4423__auto___43263;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__43242_43264__$1)){
var c__30050__auto___43265 = cljs.core.chunk_first.call(null,seq__43242_43264__$1);
var G__43266 = cljs.core.chunk_rest.call(null,seq__43242_43264__$1);
var G__43267 = c__30050__auto___43265;
var G__43268 = cljs.core.count.call(null,c__30050__auto___43265);
var G__43269 = (0);
seq__43242_43254 = G__43266;
chunk__43243_43255 = G__43267;
count__43244_43256 = G__43268;
i__43245_43257 = G__43269;
continue;
} else {
var f_43270 = cljs.core.first.call(null,seq__43242_43264__$1);
cljs.core.println.call(null,"  ",f_43270);

var G__43271 = cljs.core.next.call(null,seq__43242_43264__$1);
var G__43272 = null;
var G__43273 = (0);
var G__43274 = (0);
seq__43242_43254 = G__43271;
chunk__43243_43255 = G__43272;
count__43244_43256 = G__43273;
i__43245_43257 = G__43274;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_43275 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__29265__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__29265__auto__)){
return or__29265__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_43275);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_43275)))?cljs.core.second.call(null,arglists_43275):arglists_43275));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/"),cljs.core.str(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/special_forms#"),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__43246 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__43247 = null;
var count__43248 = (0);
var i__43249 = (0);
while(true){
if((i__43249 < count__43248)){
var vec__43250 = cljs.core._nth.call(null,chunk__43247,i__43249);
var name = cljs.core.nth.call(null,vec__43250,(0),null);
var map__43251 = cljs.core.nth.call(null,vec__43250,(1),null);
var map__43251__$1 = ((cljs.core.seq_QMARK_.call(null,map__43251))?cljs.core.apply.call(null,cljs.core.hash_map,map__43251):map__43251);
var doc = cljs.core.get.call(null,map__43251__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__43251__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__43276 = seq__43246;
var G__43277 = chunk__43247;
var G__43278 = count__43248;
var G__43279 = (i__43249 + (1));
seq__43246 = G__43276;
chunk__43247 = G__43277;
count__43248 = G__43278;
i__43249 = G__43279;
continue;
} else {
var temp__4423__auto__ = cljs.core.seq.call(null,seq__43246);
if(temp__4423__auto__){
var seq__43246__$1 = temp__4423__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__43246__$1)){
var c__30050__auto__ = cljs.core.chunk_first.call(null,seq__43246__$1);
var G__43280 = cljs.core.chunk_rest.call(null,seq__43246__$1);
var G__43281 = c__30050__auto__;
var G__43282 = cljs.core.count.call(null,c__30050__auto__);
var G__43283 = (0);
seq__43246 = G__43280;
chunk__43247 = G__43281;
count__43248 = G__43282;
i__43249 = G__43283;
continue;
} else {
var vec__43252 = cljs.core.first.call(null,seq__43246__$1);
var name = cljs.core.nth.call(null,vec__43252,(0),null);
var map__43253 = cljs.core.nth.call(null,vec__43252,(1),null);
var map__43253__$1 = ((cljs.core.seq_QMARK_.call(null,map__43253))?cljs.core.apply.call(null,cljs.core.hash_map,map__43253):map__43253);
var doc = cljs.core.get.call(null,map__43253__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__43253__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__43284 = cljs.core.next.call(null,seq__43246__$1);
var G__43285 = null;
var G__43286 = (0);
var G__43287 = (0);
seq__43246 = G__43284;
chunk__43247 = G__43285;
count__43248 = G__43286;
i__43249 = G__43287;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
}
});

//# sourceMappingURL=repl.js.map