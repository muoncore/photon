// Compiled by ClojureScript 0.0-3269 {}
goog.provide('figwheel.client.file_reloading');
goog.require('cljs.core');
goog.require('goog.Uri');
goog.require('goog.string');
goog.require('goog.net.jsloader');
goog.require('cljs.core.async');
goog.require('clojure.set');
goog.require('clojure.string');
goog.require('figwheel.client.utils');

figwheel.client.file_reloading.on_jsload_custom_event = (function figwheel$client$file_reloading$on_jsload_custom_event(url){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.js-reload",url);
});
figwheel.client.file_reloading.before_jsload_custom_event = (function figwheel$client$file_reloading$before_jsload_custom_event(files){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.before-js-reload",files);
});
figwheel.client.file_reloading.all_QMARK_ = (function figwheel$client$file_reloading$all_QMARK_(pred,coll){
return cljs.core.reduce.call(null,(function (p1__43290_SHARP_,p2__43291_SHARP_){
var and__29253__auto__ = p1__43290_SHARP_;
if(cljs.core.truth_(and__29253__auto__)){
return p2__43291_SHARP_;
} else {
return and__29253__auto__;
}
}),true,cljs.core.map.call(null,pred,coll));
});
figwheel.client.file_reloading.namespace_file_map_QMARK_ = (function figwheel$client$file_reloading$namespace_file_map_QMARK_(m){
var or__29265__auto__ = (cljs.core.map_QMARK_.call(null,m)) && (typeof new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(m) === 'string') && (typeof new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) === 'string') && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"namespace","namespace",-377510372)));
if(or__29265__auto__){
return or__29265__auto__;
} else {
cljs.core.println.call(null,"Error not namespace-file-map",cljs.core.pr_str.call(null,m));

return false;
}
});
figwheel.client.file_reloading.add_cache_buster = (function figwheel$client$file_reloading$add_cache_buster(url){

return goog.Uri.parse(url).makeUnique();
});
figwheel.client.file_reloading.ns_to_js_file = (function figwheel$client$file_reloading$ns_to_js_file(ns){

return [cljs.core.str(clojure.string.replace.call(null,ns,".","/")),cljs.core.str(".js")].join('');
});
figwheel.client.file_reloading.resolve_ns = (function figwheel$client$file_reloading$resolve_ns(ns){

return [cljs.core.str(figwheel.client.utils.base_url_path.call(null)),cljs.core.str(figwheel.client.file_reloading.ns_to_js_file.call(null,ns))].join('');
});
figwheel.client.file_reloading.patch_goog_base = (function figwheel$client$file_reloading$patch_goog_base(){
goog.isProvided = (function (x){
return false;
});

if(((cljs.core._STAR_loaded_libs_STAR_ == null)) || (cljs.core.empty_QMARK_.call(null,cljs.core._STAR_loaded_libs_STAR_))){
cljs.core._STAR_loaded_libs_STAR_ = (function (){var gntp = goog.dependencies_.nameToPath;
return cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.call(null,((function (gntp){
return (function (name){
return (goog.dependencies_.visited[(gntp[name])]);
});})(gntp))
,cljs.core.js_keys.call(null,gntp)));
})();
} else {
}

goog.require = (function (name,reload){
if(cljs.core.truth_((function (){var or__29265__auto__ = !(cljs.core.contains_QMARK_.call(null,cljs.core._STAR_loaded_libs_STAR_,name));
if(or__29265__auto__){
return or__29265__auto__;
} else {
return reload;
}
})())){
cljs.core._STAR_loaded_libs_STAR_ = cljs.core.conj.call(null,(function (){var or__29265__auto__ = cljs.core._STAR_loaded_libs_STAR_;
if(cljs.core.truth_(or__29265__auto__)){
return or__29265__auto__;
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
})(),name);

return figwheel.client.file_reloading.reload_file_STAR_.call(null,figwheel.client.file_reloading.resolve_ns.call(null,name));
} else {
return null;
}
});

goog.provide = goog.exportPath_;

return goog.global.CLOSURE_IMPORT_SCRIPT = figwheel.client.file_reloading.reload_file_STAR_;
});
if(typeof figwheel.client.file_reloading.resolve_url !== 'undefined'){
} else {
figwheel.client.file_reloading.resolve_url = (function (){var method_table__30160__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__30161__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__30162__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__30163__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__30164__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"figwheel.client.file-reloading","resolve-url"),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__30164__auto__,method_table__30160__auto__,prefer_table__30161__auto__,method_cache__30162__auto__,cached_hierarchy__30163__auto__));
})();
}
cljs.core._add_method.call(null,figwheel.client.file_reloading.resolve_url,new cljs.core.Keyword(null,"default","default",-1987822328),(function (p__43292){
var map__43293 = p__43292;
var map__43293__$1 = ((cljs.core.seq_QMARK_.call(null,map__43293))?cljs.core.apply.call(null,cljs.core.hash_map,map__43293):map__43293);
var file = cljs.core.get.call(null,map__43293__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
return file;
}));
cljs.core._add_method.call(null,figwheel.client.file_reloading.resolve_url,new cljs.core.Keyword(null,"namespace","namespace",-377510372),(function (p__43294){
var map__43295 = p__43294;
var map__43295__$1 = ((cljs.core.seq_QMARK_.call(null,map__43295))?cljs.core.apply.call(null,cljs.core.hash_map,map__43295):map__43295);
var namespace = cljs.core.get.call(null,map__43295__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

return figwheel.client.file_reloading.resolve_ns.call(null,namespace);
}));
if(typeof figwheel.client.file_reloading.reload_base !== 'undefined'){
} else {
figwheel.client.file_reloading.reload_base = (function (){var method_table__30160__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__30161__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__30162__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__30163__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__30164__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"figwheel.client.file-reloading","reload-base"),figwheel.client.utils.host_env_QMARK_,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__30164__auto__,method_table__30160__auto__,prefer_table__30161__auto__,method_cache__30162__auto__,cached_hierarchy__30163__auto__));
})();
}
cljs.core._add_method.call(null,figwheel.client.file_reloading.reload_base,new cljs.core.Keyword(null,"node","node",581201198),(function (request_url,callback){

var root = clojure.string.join.call(null,"/",cljs.core.reverse.call(null,cljs.core.drop.call(null,(2),cljs.core.reverse.call(null,clojure.string.split.call(null,__dirname,"/")))));
var path = [cljs.core.str(root),cljs.core.str("/"),cljs.core.str(request_url)].join('');
(require.cache[path] = null);

return callback.call(null,(function (){try{return require(path);
}catch (e43296){if((e43296 instanceof Error)){
var e = e43296;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(path)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e43296;

}
}})());
}));
cljs.core._add_method.call(null,figwheel.client.file_reloading.reload_base,new cljs.core.Keyword(null,"html","html",-998796897),(function (request_url,callback){

var deferred = goog.net.jsloader.load(figwheel.client.file_reloading.add_cache_buster.call(null,request_url),{"cleanupWhenDone": true});
deferred.addCallback(((function (deferred){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [true], null));
});})(deferred))
);

return deferred.addErrback(((function (deferred){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [false], null));
});})(deferred))
);
}));
figwheel.client.file_reloading.reload_file_STAR_ = (function figwheel$client$file_reloading$reload_file_STAR_(){
var G__43298 = arguments.length;
switch (G__43298) {
case 2:
return figwheel.client.file_reloading.reload_file_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return figwheel.client.file_reloading.reload_file_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

figwheel.client.file_reloading.reload_file_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (request_url,callback){
return figwheel.client.file_reloading.reload_base.call(null,request_url,callback);
});

figwheel.client.file_reloading.reload_file_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (request_url){
return figwheel.client.file_reloading.reload_file_STAR_.call(null,request_url,cljs.core.identity);
});

figwheel.client.file_reloading.reload_file_STAR_.cljs$lang$maxFixedArity = 2;
figwheel.client.file_reloading.reload_file = (function figwheel$client$file_reloading$reload_file(p__43300,callback){
var map__43302 = p__43300;
var map__43302__$1 = ((cljs.core.seq_QMARK_.call(null,map__43302))?cljs.core.apply.call(null,cljs.core.hash_map,map__43302):map__43302);
var file_msg = map__43302__$1;
var request_url = cljs.core.get.call(null,map__43302__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));

figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Attempting to load "),cljs.core.str(request_url)].join(''));

return figwheel.client.file_reloading.reload_file_STAR_.call(null,request_url,((function (map__43302,map__43302__$1,file_msg,request_url){
return (function (success_QMARK_){
if(cljs.core.truth_(success_QMARK_)){
figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Successfullly loaded "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,file_msg,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),true)], null));
} else {
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});})(map__43302,map__43302__$1,file_msg,request_url))
);
});
figwheel.client.file_reloading.reload_file_QMARK_ = (function figwheel$client$file_reloading$reload_file_QMARK_(p__43303){
var map__43305 = p__43303;
var map__43305__$1 = ((cljs.core.seq_QMARK_.call(null,map__43305))?cljs.core.apply.call(null,cljs.core.hash_map,map__43305):map__43305);
var file_msg = map__43305__$1;
var namespace = cljs.core.get.call(null,map__43305__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var meta_data = cljs.core.get.call(null,map__43305__$1,new cljs.core.Keyword(null,"meta-data","meta-data",-1613399157));

var meta_data__$1 = (function (){var or__29265__auto__ = meta_data;
if(cljs.core.truth_(or__29265__auto__)){
return or__29265__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
var and__29253__auto__ = cljs.core.not.call(null,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179).cljs$core$IFn$_invoke$arity$1(meta_data__$1));
if(and__29253__auto__){
var or__29265__auto__ = new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(meta_data__$1);
if(cljs.core.truth_(or__29265__auto__)){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = new cljs.core.Keyword(null,"figwheel-load","figwheel-load",1316089175).cljs$core$IFn$_invoke$arity$1(meta_data__$1);
if(cljs.core.truth_(or__29265__auto____$1)){
return or__29265__auto____$1;
} else {
var and__29253__auto____$1 = cljs.core.contains_QMARK_.call(null,cljs.core._STAR_loaded_libs_STAR_,namespace);
if(and__29253__auto____$1){
var or__29265__auto____$2 = !(cljs.core.contains_QMARK_.call(null,meta_data__$1,new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932)));
if(or__29265__auto____$2){
return or__29265__auto____$2;
} else {
return new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932).cljs$core$IFn$_invoke$arity$1(meta_data__$1);
}
} else {
return and__29253__auto____$1;
}
}
}
} else {
return and__29253__auto__;
}
});
figwheel.client.file_reloading.js_reload = (function figwheel$client$file_reloading$js_reload(p__43306,callback){
var map__43308 = p__43306;
var map__43308__$1 = ((cljs.core.seq_QMARK_.call(null,map__43308))?cljs.core.apply.call(null,cljs.core.hash_map,map__43308):map__43308);
var file_msg = map__43308__$1;
var request_url = cljs.core.get.call(null,map__43308__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
var namespace = cljs.core.get.call(null,map__43308__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

if(cljs.core.truth_(figwheel.client.file_reloading.reload_file_QMARK_.call(null,file_msg))){
return figwheel.client.file_reloading.reload_file.call(null,file_msg,callback);
} else {
figwheel.client.utils.debug_prn.call(null,[cljs.core.str("Figwheel: Not trying to load file "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});
figwheel.client.file_reloading.reload_js_file = (function figwheel$client$file_reloading$reload_js_file(file_msg){
var out = cljs.core.async.chan.call(null);
setTimeout(((function (out){
return (function (){
return figwheel.client.file_reloading.js_reload.call(null,file_msg,((function (out){
return (function (url){
figwheel.client.file_reloading.patch_goog_base.call(null);

cljs.core.async.put_BANG_.call(null,out,url);

return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);
});})(out))
,(0));

return out;
});
/**
 * Returns a chanel with one collection of loaded filenames on it.
 */
figwheel.client.file_reloading.load_all_js_files = (function figwheel$client$file_reloading$load_all_js_files(files){
var out = cljs.core.async.chan.call(null);
var c__32551__auto___43395 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto___43395,out){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto___43395,out){
return (function (state_43377){
var state_val_43378 = (state_43377[(1)]);
if((state_val_43378 === (1))){
var inst_43355 = cljs.core.nth.call(null,files,(0),null);
var inst_43356 = cljs.core.nthnext.call(null,files,(1));
var inst_43357 = files;
var state_43377__$1 = (function (){var statearr_43379 = state_43377;
(statearr_43379[(7)] = inst_43357);

(statearr_43379[(8)] = inst_43355);

(statearr_43379[(9)] = inst_43356);

return statearr_43379;
})();
var statearr_43380_43396 = state_43377__$1;
(statearr_43380_43396[(2)] = null);

(statearr_43380_43396[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43378 === (2))){
var inst_43357 = (state_43377[(7)]);
var inst_43360 = (state_43377[(10)]);
var inst_43360__$1 = cljs.core.nth.call(null,inst_43357,(0),null);
var inst_43361 = cljs.core.nthnext.call(null,inst_43357,(1));
var inst_43362 = (inst_43360__$1 == null);
var inst_43363 = cljs.core.not.call(null,inst_43362);
var state_43377__$1 = (function (){var statearr_43381 = state_43377;
(statearr_43381[(11)] = inst_43361);

(statearr_43381[(10)] = inst_43360__$1);

return statearr_43381;
})();
if(inst_43363){
var statearr_43382_43397 = state_43377__$1;
(statearr_43382_43397[(1)] = (4));

} else {
var statearr_43383_43398 = state_43377__$1;
(statearr_43383_43398[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43378 === (3))){
var inst_43375 = (state_43377[(2)]);
var state_43377__$1 = state_43377;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_43377__$1,inst_43375);
} else {
if((state_val_43378 === (4))){
var inst_43360 = (state_43377[(10)]);
var inst_43365 = figwheel.client.file_reloading.reload_js_file.call(null,inst_43360);
var state_43377__$1 = state_43377;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_43377__$1,(7),inst_43365);
} else {
if((state_val_43378 === (5))){
var inst_43371 = cljs.core.async.close_BANG_.call(null,out);
var state_43377__$1 = state_43377;
var statearr_43384_43399 = state_43377__$1;
(statearr_43384_43399[(2)] = inst_43371);

(statearr_43384_43399[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43378 === (6))){
var inst_43373 = (state_43377[(2)]);
var state_43377__$1 = state_43377;
var statearr_43385_43400 = state_43377__$1;
(statearr_43385_43400[(2)] = inst_43373);

(statearr_43385_43400[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43378 === (7))){
var inst_43361 = (state_43377[(11)]);
var inst_43367 = (state_43377[(2)]);
var inst_43368 = cljs.core.async.put_BANG_.call(null,out,inst_43367);
var inst_43357 = inst_43361;
var state_43377__$1 = (function (){var statearr_43386 = state_43377;
(statearr_43386[(7)] = inst_43357);

(statearr_43386[(12)] = inst_43368);

return statearr_43386;
})();
var statearr_43387_43401 = state_43377__$1;
(statearr_43387_43401[(2)] = null);

(statearr_43387_43401[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(c__32551__auto___43395,out))
;
return ((function (switch__32489__auto__,c__32551__auto___43395,out){
return (function() {
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__32490__auto__ = null;
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__32490__auto____0 = (function (){
var statearr_43391 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_43391[(0)] = figwheel$client$file_reloading$load_all_js_files_$_state_machine__32490__auto__);

(statearr_43391[(1)] = (1));

return statearr_43391;
});
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__32490__auto____1 = (function (state_43377){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_43377);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e43392){if((e43392 instanceof Object)){
var ex__32493__auto__ = e43392;
var statearr_43393_43402 = state_43377;
(statearr_43393_43402[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_43377);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e43392;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43403 = state_43377;
state_43377 = G__43403;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
figwheel$client$file_reloading$load_all_js_files_$_state_machine__32490__auto__ = function(state_43377){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__32490__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__32490__auto____1.call(this,state_43377);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$load_all_js_files_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__32490__auto____0;
figwheel$client$file_reloading$load_all_js_files_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__32490__auto____1;
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto___43395,out))
})();
var state__32553__auto__ = (function (){var statearr_43394 = f__32552__auto__.call(null);
(statearr_43394[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___43395);

return statearr_43394;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto___43395,out))
);


return cljs.core.async.into.call(null,cljs.core.PersistentVector.EMPTY,out);
});
figwheel.client.file_reloading.add_request_url = (function figwheel$client$file_reloading$add_request_url(p__43404,p__43405){
var map__43408 = p__43404;
var map__43408__$1 = ((cljs.core.seq_QMARK_.call(null,map__43408))?cljs.core.apply.call(null,cljs.core.hash_map,map__43408):map__43408);
var opts = map__43408__$1;
var url_rewriter = cljs.core.get.call(null,map__43408__$1,new cljs.core.Keyword(null,"url-rewriter","url-rewriter",200543838));
var map__43409 = p__43405;
var map__43409__$1 = ((cljs.core.seq_QMARK_.call(null,map__43409))?cljs.core.apply.call(null,cljs.core.hash_map,map__43409):map__43409);
var file_msg = map__43409__$1;
var file = cljs.core.get.call(null,map__43409__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var resolved_path = figwheel.client.file_reloading.resolve_url.call(null,file_msg);
return cljs.core.assoc.call(null,file_msg,new cljs.core.Keyword(null,"request-url","request-url",2100346596),(cljs.core.truth_(url_rewriter)?url_rewriter.call(null,resolved_path):resolved_path));
});
figwheel.client.file_reloading.add_request_urls = (function figwheel$client$file_reloading$add_request_urls(opts,files){
return cljs.core.map.call(null,cljs.core.partial.call(null,figwheel.client.file_reloading.add_request_url,opts),files);
});
figwheel.client.file_reloading.eval_body = (function figwheel$client$file_reloading$eval_body(p__43410){
var map__43413 = p__43410;
var map__43413__$1 = ((cljs.core.seq_QMARK_.call(null,map__43413))?cljs.core.apply.call(null,cljs.core.hash_map,map__43413):map__43413);
var eval_body__$1 = cljs.core.get.call(null,map__43413__$1,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883));
var file = cljs.core.get.call(null,map__43413__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_((function (){var and__29253__auto__ = eval_body__$1;
if(cljs.core.truth_(and__29253__auto__)){
return typeof eval_body__$1 === 'string';
} else {
return and__29253__auto__;
}
})())){
var code = eval_body__$1;
try{figwheel.client.utils.debug_prn.call(null,[cljs.core.str("Evaling file "),cljs.core.str(file)].join(''));

return eval(code);
}catch (e43414){var e = e43414;
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Unable to evaluate "),cljs.core.str(file)].join(''));
}} else {
return null;
}
});
figwheel.client.file_reloading.reload_js_files = (function figwheel$client$file_reloading$reload_js_files(p__43419,p__43420){
var map__43622 = p__43419;
var map__43622__$1 = ((cljs.core.seq_QMARK_.call(null,map__43622))?cljs.core.apply.call(null,cljs.core.hash_map,map__43622):map__43622);
var opts = map__43622__$1;
var before_jsload = cljs.core.get.call(null,map__43622__$1,new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128));
var on_jsload = cljs.core.get.call(null,map__43622__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602));
var load_unchanged_files = cljs.core.get.call(null,map__43622__$1,new cljs.core.Keyword(null,"load-unchanged-files","load-unchanged-files",-1561468704));
var map__43623 = p__43420;
var map__43623__$1 = ((cljs.core.seq_QMARK_.call(null,map__43623))?cljs.core.apply.call(null,cljs.core.hash_map,map__43623):map__43623);
var msg = map__43623__$1;
var files = cljs.core.get.call(null,map__43623__$1,new cljs.core.Keyword(null,"files","files",-472457450));
var c__32551__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files){
return (function (state_43748){
var state_val_43749 = (state_43748[(1)]);
if((state_val_43749 === (7))){
var inst_43635 = (state_43748[(7)]);
var inst_43636 = (state_43748[(8)]);
var inst_43637 = (state_43748[(9)]);
var inst_43638 = (state_43748[(10)]);
var inst_43643 = cljs.core._nth.call(null,inst_43636,inst_43638);
var inst_43644 = figwheel.client.file_reloading.eval_body.call(null,inst_43643);
var inst_43645 = (inst_43638 + (1));
var tmp43750 = inst_43635;
var tmp43751 = inst_43636;
var tmp43752 = inst_43637;
var inst_43635__$1 = tmp43750;
var inst_43636__$1 = tmp43751;
var inst_43637__$1 = tmp43752;
var inst_43638__$1 = inst_43645;
var state_43748__$1 = (function (){var statearr_43753 = state_43748;
(statearr_43753[(7)] = inst_43635__$1);

(statearr_43753[(8)] = inst_43636__$1);

(statearr_43753[(9)] = inst_43637__$1);

(statearr_43753[(11)] = inst_43644);

(statearr_43753[(10)] = inst_43638__$1);

return statearr_43753;
})();
var statearr_43754_43823 = state_43748__$1;
(statearr_43754_43823[(2)] = null);

(statearr_43754_43823[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (20))){
var inst_43685 = (state_43748[(12)]);
var inst_43680 = (state_43748[(13)]);
var inst_43681 = (state_43748[(14)]);
var inst_43687 = (state_43748[(15)]);
var inst_43684 = (state_43748[(16)]);
var inst_43690 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these files");
var inst_43692 = (function (){var all_files = inst_43680;
var files_SINGLEQUOTE_ = inst_43681;
var res_SINGLEQUOTE_ = inst_43684;
var res = inst_43685;
var files_not_loaded = inst_43687;
return ((function (all_files,files_SINGLEQUOTE_,res_SINGLEQUOTE_,res,files_not_loaded,inst_43685,inst_43680,inst_43681,inst_43687,inst_43684,inst_43690,state_val_43749,c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files){
return (function (p__43691){
var map__43755 = p__43691;
var map__43755__$1 = ((cljs.core.seq_QMARK_.call(null,map__43755))?cljs.core.apply.call(null,cljs.core.hash_map,map__43755):map__43755);
var namespace = cljs.core.get.call(null,map__43755__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var file = cljs.core.get.call(null,map__43755__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_(namespace)){
return figwheel.client.file_reloading.ns_to_js_file.call(null,namespace);
} else {
return file;
}
});
;})(all_files,files_SINGLEQUOTE_,res_SINGLEQUOTE_,res,files_not_loaded,inst_43685,inst_43680,inst_43681,inst_43687,inst_43684,inst_43690,state_val_43749,c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files))
})();
var inst_43693 = cljs.core.map.call(null,inst_43692,inst_43685);
var inst_43694 = cljs.core.pr_str.call(null,inst_43693);
var inst_43695 = figwheel.client.utils.log.call(null,inst_43694);
var inst_43696 = (function (){var all_files = inst_43680;
var files_SINGLEQUOTE_ = inst_43681;
var res_SINGLEQUOTE_ = inst_43684;
var res = inst_43685;
var files_not_loaded = inst_43687;
return ((function (all_files,files_SINGLEQUOTE_,res_SINGLEQUOTE_,res,files_not_loaded,inst_43685,inst_43680,inst_43681,inst_43687,inst_43684,inst_43690,inst_43692,inst_43693,inst_43694,inst_43695,state_val_43749,c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files){
return (function (){
figwheel.client.file_reloading.on_jsload_custom_event.call(null,res);

return cljs.core.apply.call(null,on_jsload,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [res], null));
});
;})(all_files,files_SINGLEQUOTE_,res_SINGLEQUOTE_,res,files_not_loaded,inst_43685,inst_43680,inst_43681,inst_43687,inst_43684,inst_43690,inst_43692,inst_43693,inst_43694,inst_43695,state_val_43749,c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files))
})();
var inst_43697 = setTimeout(inst_43696,(10));
var state_43748__$1 = (function (){var statearr_43756 = state_43748;
(statearr_43756[(17)] = inst_43695);

(statearr_43756[(18)] = inst_43690);

return statearr_43756;
})();
var statearr_43757_43824 = state_43748__$1;
(statearr_43757_43824[(2)] = inst_43697);

(statearr_43757_43824[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (27))){
var inst_43707 = (state_43748[(19)]);
var state_43748__$1 = state_43748;
var statearr_43758_43825 = state_43748__$1;
(statearr_43758_43825[(2)] = inst_43707);

(statearr_43758_43825[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (1))){
var inst_43627 = (state_43748[(20)]);
var inst_43624 = before_jsload.call(null,files);
var inst_43625 = figwheel.client.file_reloading.before_jsload_custom_event.call(null,files);
var inst_43626 = (function (){return ((function (inst_43627,inst_43624,inst_43625,state_val_43749,c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files){
return (function (p1__43415_SHARP_){
return new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__43415_SHARP_);
});
;})(inst_43627,inst_43624,inst_43625,state_val_43749,c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files))
})();
var inst_43627__$1 = cljs.core.filter.call(null,inst_43626,files);
var inst_43628 = cljs.core.not_empty.call(null,inst_43627__$1);
var state_43748__$1 = (function (){var statearr_43759 = state_43748;
(statearr_43759[(21)] = inst_43625);

(statearr_43759[(22)] = inst_43624);

(statearr_43759[(20)] = inst_43627__$1);

return statearr_43759;
})();
if(cljs.core.truth_(inst_43628)){
var statearr_43760_43826 = state_43748__$1;
(statearr_43760_43826[(1)] = (2));

} else {
var statearr_43761_43827 = state_43748__$1;
(statearr_43761_43827[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (24))){
var state_43748__$1 = state_43748;
var statearr_43762_43828 = state_43748__$1;
(statearr_43762_43828[(2)] = null);

(statearr_43762_43828[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (4))){
var inst_43672 = (state_43748[(2)]);
var inst_43673 = (function (){return ((function (inst_43672,state_val_43749,c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files){
return (function (p1__43416_SHARP_){
var and__29253__auto__ = new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__43416_SHARP_);
if(cljs.core.truth_(and__29253__auto__)){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__43416_SHARP_));
} else {
return and__29253__auto__;
}
});
;})(inst_43672,state_val_43749,c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files))
})();
var inst_43674 = cljs.core.filter.call(null,inst_43673,files);
var state_43748__$1 = (function (){var statearr_43763 = state_43748;
(statearr_43763[(23)] = inst_43674);

(statearr_43763[(24)] = inst_43672);

return statearr_43763;
})();
if(cljs.core.truth_(load_unchanged_files)){
var statearr_43764_43829 = state_43748__$1;
(statearr_43764_43829[(1)] = (16));

} else {
var statearr_43765_43830 = state_43748__$1;
(statearr_43765_43830[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (15))){
var inst_43662 = (state_43748[(2)]);
var state_43748__$1 = state_43748;
var statearr_43766_43831 = state_43748__$1;
(statearr_43766_43831[(2)] = inst_43662);

(statearr_43766_43831[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (21))){
var state_43748__$1 = state_43748;
var statearr_43767_43832 = state_43748__$1;
(statearr_43767_43832[(2)] = null);

(statearr_43767_43832[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (31))){
var inst_43715 = (state_43748[(25)]);
var inst_43725 = (state_43748[(2)]);
var inst_43726 = cljs.core.not_empty.call(null,inst_43715);
var state_43748__$1 = (function (){var statearr_43768 = state_43748;
(statearr_43768[(26)] = inst_43725);

return statearr_43768;
})();
if(cljs.core.truth_(inst_43726)){
var statearr_43769_43833 = state_43748__$1;
(statearr_43769_43833[(1)] = (32));

} else {
var statearr_43770_43834 = state_43748__$1;
(statearr_43770_43834[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (32))){
var inst_43715 = (state_43748[(25)]);
var inst_43728 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_43715);
var inst_43729 = cljs.core.pr_str.call(null,inst_43728);
var inst_43730 = [cljs.core.str("file didn't change: "),cljs.core.str(inst_43729)].join('');
var inst_43731 = figwheel.client.utils.log.call(null,inst_43730);
var state_43748__$1 = state_43748;
var statearr_43771_43835 = state_43748__$1;
(statearr_43771_43835[(2)] = inst_43731);

(statearr_43771_43835[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (33))){
var state_43748__$1 = state_43748;
var statearr_43772_43836 = state_43748__$1;
(statearr_43772_43836[(2)] = null);

(statearr_43772_43836[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (13))){
var inst_43648 = (state_43748[(27)]);
var inst_43652 = cljs.core.chunk_first.call(null,inst_43648);
var inst_43653 = cljs.core.chunk_rest.call(null,inst_43648);
var inst_43654 = cljs.core.count.call(null,inst_43652);
var inst_43635 = inst_43653;
var inst_43636 = inst_43652;
var inst_43637 = inst_43654;
var inst_43638 = (0);
var state_43748__$1 = (function (){var statearr_43773 = state_43748;
(statearr_43773[(7)] = inst_43635);

(statearr_43773[(8)] = inst_43636);

(statearr_43773[(9)] = inst_43637);

(statearr_43773[(10)] = inst_43638);

return statearr_43773;
})();
var statearr_43774_43837 = state_43748__$1;
(statearr_43774_43837[(2)] = null);

(statearr_43774_43837[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (22))){
var inst_43687 = (state_43748[(15)]);
var inst_43700 = (state_43748[(2)]);
var inst_43701 = cljs.core.not_empty.call(null,inst_43687);
var state_43748__$1 = (function (){var statearr_43775 = state_43748;
(statearr_43775[(28)] = inst_43700);

return statearr_43775;
})();
if(cljs.core.truth_(inst_43701)){
var statearr_43776_43838 = state_43748__$1;
(statearr_43776_43838[(1)] = (23));

} else {
var statearr_43777_43839 = state_43748__$1;
(statearr_43777_43839[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (36))){
var state_43748__$1 = state_43748;
var statearr_43778_43840 = state_43748__$1;
(statearr_43778_43840[(2)] = null);

(statearr_43778_43840[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (29))){
var inst_43714 = (state_43748[(29)]);
var inst_43719 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_43714);
var inst_43720 = cljs.core.pr_str.call(null,inst_43719);
var inst_43721 = [cljs.core.str("figwheel-no-load meta-data: "),cljs.core.str(inst_43720)].join('');
var inst_43722 = figwheel.client.utils.log.call(null,inst_43721);
var state_43748__$1 = state_43748;
var statearr_43779_43841 = state_43748__$1;
(statearr_43779_43841[(2)] = inst_43722);

(statearr_43779_43841[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (6))){
var inst_43669 = (state_43748[(2)]);
var state_43748__$1 = state_43748;
var statearr_43780_43842 = state_43748__$1;
(statearr_43780_43842[(2)] = inst_43669);

(statearr_43780_43842[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (28))){
var inst_43714 = (state_43748[(29)]);
var inst_43713 = (state_43748[(2)]);
var inst_43714__$1 = cljs.core.get.call(null,inst_43713,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179));
var inst_43715 = cljs.core.get.call(null,inst_43713,new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932));
var inst_43716 = cljs.core.get.call(null,inst_43713,new cljs.core.Keyword(null,"not-required","not-required",-950359114));
var inst_43717 = cljs.core.not_empty.call(null,inst_43714__$1);
var state_43748__$1 = (function (){var statearr_43781 = state_43748;
(statearr_43781[(29)] = inst_43714__$1);

(statearr_43781[(30)] = inst_43716);

(statearr_43781[(25)] = inst_43715);

return statearr_43781;
})();
if(cljs.core.truth_(inst_43717)){
var statearr_43782_43843 = state_43748__$1;
(statearr_43782_43843[(1)] = (29));

} else {
var statearr_43783_43844 = state_43748__$1;
(statearr_43783_43844[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (25))){
var inst_43746 = (state_43748[(2)]);
var state_43748__$1 = state_43748;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_43748__$1,inst_43746);
} else {
if((state_val_43749 === (34))){
var inst_43716 = (state_43748[(30)]);
var inst_43734 = (state_43748[(2)]);
var inst_43735 = cljs.core.not_empty.call(null,inst_43716);
var state_43748__$1 = (function (){var statearr_43784 = state_43748;
(statearr_43784[(31)] = inst_43734);

return statearr_43784;
})();
if(cljs.core.truth_(inst_43735)){
var statearr_43785_43845 = state_43748__$1;
(statearr_43785_43845[(1)] = (35));

} else {
var statearr_43786_43846 = state_43748__$1;
(statearr_43786_43846[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (17))){
var inst_43674 = (state_43748[(23)]);
var state_43748__$1 = state_43748;
var statearr_43787_43847 = state_43748__$1;
(statearr_43787_43847[(2)] = inst_43674);

(statearr_43787_43847[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (3))){
var state_43748__$1 = state_43748;
var statearr_43788_43848 = state_43748__$1;
(statearr_43788_43848[(2)] = null);

(statearr_43788_43848[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (12))){
var inst_43665 = (state_43748[(2)]);
var state_43748__$1 = state_43748;
var statearr_43789_43849 = state_43748__$1;
(statearr_43789_43849[(2)] = inst_43665);

(statearr_43789_43849[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (2))){
var inst_43627 = (state_43748[(20)]);
var inst_43634 = cljs.core.seq.call(null,inst_43627);
var inst_43635 = inst_43634;
var inst_43636 = null;
var inst_43637 = (0);
var inst_43638 = (0);
var state_43748__$1 = (function (){var statearr_43790 = state_43748;
(statearr_43790[(7)] = inst_43635);

(statearr_43790[(8)] = inst_43636);

(statearr_43790[(9)] = inst_43637);

(statearr_43790[(10)] = inst_43638);

return statearr_43790;
})();
var statearr_43791_43850 = state_43748__$1;
(statearr_43791_43850[(2)] = null);

(statearr_43791_43850[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (23))){
var inst_43685 = (state_43748[(12)]);
var inst_43707 = (state_43748[(19)]);
var inst_43680 = (state_43748[(13)]);
var inst_43681 = (state_43748[(14)]);
var inst_43687 = (state_43748[(15)]);
var inst_43684 = (state_43748[(16)]);
var inst_43703 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: NOT loading these files ");
var inst_43706 = (function (){var all_files = inst_43680;
var files_SINGLEQUOTE_ = inst_43681;
var res_SINGLEQUOTE_ = inst_43684;
var res = inst_43685;
var files_not_loaded = inst_43687;
return ((function (all_files,files_SINGLEQUOTE_,res_SINGLEQUOTE_,res,files_not_loaded,inst_43685,inst_43707,inst_43680,inst_43681,inst_43687,inst_43684,inst_43703,state_val_43749,c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files){
return (function (p__43705){
var map__43792 = p__43705;
var map__43792__$1 = ((cljs.core.seq_QMARK_.call(null,map__43792))?cljs.core.apply.call(null,cljs.core.hash_map,map__43792):map__43792);
var meta_data = cljs.core.get.call(null,map__43792__$1,new cljs.core.Keyword(null,"meta-data","meta-data",-1613399157));
if((meta_data == null)){
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);
} else {
if(cljs.core.contains_QMARK_.call(null,meta_data,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179))){
return new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179);
} else {
if((cljs.core.contains_QMARK_.call(null,meta_data,new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932))) && (cljs.core.not.call(null,new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932).cljs$core$IFn$_invoke$arity$1(meta_data)))){
return new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932);
} else {
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);

}
}
}
});
;})(all_files,files_SINGLEQUOTE_,res_SINGLEQUOTE_,res,files_not_loaded,inst_43685,inst_43707,inst_43680,inst_43681,inst_43687,inst_43684,inst_43703,state_val_43749,c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files))
})();
var inst_43707__$1 = cljs.core.group_by.call(null,inst_43706,inst_43687);
var inst_43708 = cljs.core.seq_QMARK_.call(null,inst_43707__$1);
var state_43748__$1 = (function (){var statearr_43793 = state_43748;
(statearr_43793[(19)] = inst_43707__$1);

(statearr_43793[(32)] = inst_43703);

return statearr_43793;
})();
if(inst_43708){
var statearr_43794_43851 = state_43748__$1;
(statearr_43794_43851[(1)] = (26));

} else {
var statearr_43795_43852 = state_43748__$1;
(statearr_43795_43852[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (35))){
var inst_43716 = (state_43748[(30)]);
var inst_43737 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_43716);
var inst_43738 = cljs.core.pr_str.call(null,inst_43737);
var inst_43739 = [cljs.core.str("not required: "),cljs.core.str(inst_43738)].join('');
var inst_43740 = figwheel.client.utils.log.call(null,inst_43739);
var state_43748__$1 = state_43748;
var statearr_43796_43853 = state_43748__$1;
(statearr_43796_43853[(2)] = inst_43740);

(statearr_43796_43853[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (19))){
var inst_43685 = (state_43748[(12)]);
var inst_43680 = (state_43748[(13)]);
var inst_43681 = (state_43748[(14)]);
var inst_43684 = (state_43748[(16)]);
var inst_43684__$1 = (state_43748[(2)]);
var inst_43685__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_43684__$1);
var inst_43686 = (function (){var all_files = inst_43680;
var files_SINGLEQUOTE_ = inst_43681;
var res_SINGLEQUOTE_ = inst_43684__$1;
var res = inst_43685__$1;
return ((function (all_files,files_SINGLEQUOTE_,res_SINGLEQUOTE_,res,inst_43685,inst_43680,inst_43681,inst_43684,inst_43684__$1,inst_43685__$1,state_val_43749,c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files){
return (function (p1__43418_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375).cljs$core$IFn$_invoke$arity$1(p1__43418_SHARP_));
});
;})(all_files,files_SINGLEQUOTE_,res_SINGLEQUOTE_,res,inst_43685,inst_43680,inst_43681,inst_43684,inst_43684__$1,inst_43685__$1,state_val_43749,c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files))
})();
var inst_43687 = cljs.core.filter.call(null,inst_43686,inst_43684__$1);
var inst_43688 = cljs.core.not_empty.call(null,inst_43685__$1);
var state_43748__$1 = (function (){var statearr_43797 = state_43748;
(statearr_43797[(12)] = inst_43685__$1);

(statearr_43797[(15)] = inst_43687);

(statearr_43797[(16)] = inst_43684__$1);

return statearr_43797;
})();
if(cljs.core.truth_(inst_43688)){
var statearr_43798_43854 = state_43748__$1;
(statearr_43798_43854[(1)] = (20));

} else {
var statearr_43799_43855 = state_43748__$1;
(statearr_43799_43855[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (11))){
var state_43748__$1 = state_43748;
var statearr_43800_43856 = state_43748__$1;
(statearr_43800_43856[(2)] = null);

(statearr_43800_43856[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (9))){
var inst_43667 = (state_43748[(2)]);
var state_43748__$1 = state_43748;
var statearr_43801_43857 = state_43748__$1;
(statearr_43801_43857[(2)] = inst_43667);

(statearr_43801_43857[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (5))){
var inst_43637 = (state_43748[(9)]);
var inst_43638 = (state_43748[(10)]);
var inst_43640 = (inst_43638 < inst_43637);
var inst_43641 = inst_43640;
var state_43748__$1 = state_43748;
if(cljs.core.truth_(inst_43641)){
var statearr_43802_43858 = state_43748__$1;
(statearr_43802_43858[(1)] = (7));

} else {
var statearr_43803_43859 = state_43748__$1;
(statearr_43803_43859[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (14))){
var inst_43648 = (state_43748[(27)]);
var inst_43657 = cljs.core.first.call(null,inst_43648);
var inst_43658 = figwheel.client.file_reloading.eval_body.call(null,inst_43657);
var inst_43659 = cljs.core.next.call(null,inst_43648);
var inst_43635 = inst_43659;
var inst_43636 = null;
var inst_43637 = (0);
var inst_43638 = (0);
var state_43748__$1 = (function (){var statearr_43804 = state_43748;
(statearr_43804[(7)] = inst_43635);

(statearr_43804[(8)] = inst_43636);

(statearr_43804[(9)] = inst_43637);

(statearr_43804[(10)] = inst_43638);

(statearr_43804[(33)] = inst_43658);

return statearr_43804;
})();
var statearr_43805_43860 = state_43748__$1;
(statearr_43805_43860[(2)] = null);

(statearr_43805_43860[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (26))){
var inst_43707 = (state_43748[(19)]);
var inst_43710 = cljs.core.apply.call(null,cljs.core.hash_map,inst_43707);
var state_43748__$1 = state_43748;
var statearr_43806_43861 = state_43748__$1;
(statearr_43806_43861[(2)] = inst_43710);

(statearr_43806_43861[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (16))){
var inst_43674 = (state_43748[(23)]);
var inst_43676 = (function (){var all_files = inst_43674;
return ((function (all_files,inst_43674,state_val_43749,c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files){
return (function (p1__43417_SHARP_){
return cljs.core.update_in.call(null,p1__43417_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"meta-data","meta-data",-1613399157)], null),cljs.core.dissoc,new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932));
});
;})(all_files,inst_43674,state_val_43749,c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files))
})();
var inst_43677 = cljs.core.map.call(null,inst_43676,inst_43674);
var state_43748__$1 = state_43748;
var statearr_43807_43862 = state_43748__$1;
(statearr_43807_43862[(2)] = inst_43677);

(statearr_43807_43862[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (30))){
var state_43748__$1 = state_43748;
var statearr_43808_43863 = state_43748__$1;
(statearr_43808_43863[(2)] = null);

(statearr_43808_43863[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (10))){
var inst_43648 = (state_43748[(27)]);
var inst_43650 = cljs.core.chunked_seq_QMARK_.call(null,inst_43648);
var state_43748__$1 = state_43748;
if(inst_43650){
var statearr_43809_43864 = state_43748__$1;
(statearr_43809_43864[(1)] = (13));

} else {
var statearr_43810_43865 = state_43748__$1;
(statearr_43810_43865[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (18))){
var inst_43680 = (state_43748[(13)]);
var inst_43681 = (state_43748[(14)]);
var inst_43680__$1 = (state_43748[(2)]);
var inst_43681__$1 = figwheel.client.file_reloading.add_request_urls.call(null,opts,inst_43680__$1);
var inst_43682 = figwheel.client.file_reloading.load_all_js_files.call(null,inst_43681__$1);
var state_43748__$1 = (function (){var statearr_43811 = state_43748;
(statearr_43811[(13)] = inst_43680__$1);

(statearr_43811[(14)] = inst_43681__$1);

return statearr_43811;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_43748__$1,(19),inst_43682);
} else {
if((state_val_43749 === (37))){
var inst_43743 = (state_43748[(2)]);
var state_43748__$1 = state_43748;
var statearr_43812_43866 = state_43748__$1;
(statearr_43812_43866[(2)] = inst_43743);

(statearr_43812_43866[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_43749 === (8))){
var inst_43635 = (state_43748[(7)]);
var inst_43648 = (state_43748[(27)]);
var inst_43648__$1 = cljs.core.seq.call(null,inst_43635);
var state_43748__$1 = (function (){var statearr_43813 = state_43748;
(statearr_43813[(27)] = inst_43648__$1);

return statearr_43813;
})();
if(inst_43648__$1){
var statearr_43814_43867 = state_43748__$1;
(statearr_43814_43867[(1)] = (10));

} else {
var statearr_43815_43868 = state_43748__$1;
(statearr_43815_43868[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files))
;
return ((function (switch__32489__auto__,c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files){
return (function() {
var figwheel$client$file_reloading$reload_js_files_$_state_machine__32490__auto__ = null;
var figwheel$client$file_reloading$reload_js_files_$_state_machine__32490__auto____0 = (function (){
var statearr_43819 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_43819[(0)] = figwheel$client$file_reloading$reload_js_files_$_state_machine__32490__auto__);

(statearr_43819[(1)] = (1));

return statearr_43819;
});
var figwheel$client$file_reloading$reload_js_files_$_state_machine__32490__auto____1 = (function (state_43748){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_43748);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e43820){if((e43820 instanceof Object)){
var ex__32493__auto__ = e43820;
var statearr_43821_43869 = state_43748;
(statearr_43821_43869[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_43748);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e43820;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43870 = state_43748;
state_43748 = G__43870;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_js_files_$_state_machine__32490__auto__ = function(state_43748){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__32490__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__32490__auto____1.call(this,state_43748);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$reload_js_files_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_js_files_$_state_machine__32490__auto____0;
figwheel$client$file_reloading$reload_js_files_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_js_files_$_state_machine__32490__auto____1;
return figwheel$client$file_reloading$reload_js_files_$_state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files))
})();
var state__32553__auto__ = (function (){var statearr_43822 = f__32552__auto__.call(null);
(statearr_43822[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto__);

return statearr_43822;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto__,map__43622,map__43622__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__43623,map__43623__$1,msg,files))
);

return c__32551__auto__;
});
figwheel.client.file_reloading.current_links = (function figwheel$client$file_reloading$current_links(){
return Array.prototype.slice.call(document.getElementsByTagName("link"));
});
figwheel.client.file_reloading.truncate_url = (function figwheel$client$file_reloading$truncate_url(url){
return clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,cljs.core.first.call(null,clojure.string.split.call(null,url,/\?/)),[cljs.core.str(location.protocol),cljs.core.str("//")].join(''),""),".*://",""),/^\/\//,""),/[^\\/]*/,"");
});
figwheel.client.file_reloading.matches_file_QMARK_ = (function figwheel$client$file_reloading$matches_file_QMARK_(p__43873,link){
var map__43875 = p__43873;
var map__43875__$1 = ((cljs.core.seq_QMARK_.call(null,map__43875))?cljs.core.apply.call(null,cljs.core.hash_map,map__43875):map__43875);
var file = cljs.core.get.call(null,map__43875__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4423__auto__ = link.href;
if(cljs.core.truth_(temp__4423__auto__)){
var link_href = temp__4423__auto__;
var match = clojure.string.join.call(null,"/",cljs.core.take_while.call(null,cljs.core.identity,cljs.core.map.call(null,((function (link_href,temp__4423__auto__,map__43875,map__43875__$1,file){
return (function (p1__43871_SHARP_,p2__43872_SHARP_){
if(cljs.core._EQ_.call(null,p1__43871_SHARP_,p2__43872_SHARP_)){
return p1__43871_SHARP_;
} else {
return false;
}
});})(link_href,temp__4423__auto__,map__43875,map__43875__$1,file))
,cljs.core.reverse.call(null,clojure.string.split.call(null,file,"/")),cljs.core.reverse.call(null,clojure.string.split.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href),"/")))));
var match_length = cljs.core.count.call(null,match);
var file_name_length = cljs.core.count.call(null,cljs.core.last.call(null,clojure.string.split.call(null,file,"/")));
if((match_length >= file_name_length)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"link","link",-1769163468),link,new cljs.core.Keyword(null,"link-href","link-href",-250644450),link_href,new cljs.core.Keyword(null,"match-length","match-length",1101537310),match_length,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083),cljs.core.count.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href))], null);
} else {
return null;
}
} else {
return null;
}
});
figwheel.client.file_reloading.get_correct_link = (function figwheel$client$file_reloading$get_correct_link(f_data){
var temp__4423__auto__ = cljs.core.first.call(null,cljs.core.sort_by.call(null,(function (p__43879){
var map__43880 = p__43879;
var map__43880__$1 = ((cljs.core.seq_QMARK_.call(null,map__43880))?cljs.core.apply.call(null,cljs.core.hash_map,map__43880):map__43880);
var match_length = cljs.core.get.call(null,map__43880__$1,new cljs.core.Keyword(null,"match-length","match-length",1101537310));
var current_url_length = cljs.core.get.call(null,map__43880__$1,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083));
return (current_url_length - match_length);
}),cljs.core.keep.call(null,(function (p1__43876_SHARP_){
return figwheel.client.file_reloading.matches_file_QMARK_.call(null,f_data,p1__43876_SHARP_);
}),figwheel.client.file_reloading.current_links.call(null))));
if(cljs.core.truth_(temp__4423__auto__)){
var res = temp__4423__auto__;
return new cljs.core.Keyword(null,"link","link",-1769163468).cljs$core$IFn$_invoke$arity$1(res);
} else {
return null;
}
});
figwheel.client.file_reloading.clone_link = (function figwheel$client$file_reloading$clone_link(link,url){
var clone = document.createElement("link");
clone.rel = "stylesheet";

clone.media = link.media;

clone.disabled = link.disabled;

clone.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return clone;
});
figwheel.client.file_reloading.create_link = (function figwheel$client$file_reloading$create_link(url){
var link = document.createElement("link");
link.rel = "stylesheet";

link.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return link;
});
figwheel.client.file_reloading.add_link_to_doc = (function figwheel$client$file_reloading$add_link_to_doc(){
var G__43882 = arguments.length;
switch (G__43882) {
case 1:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$1 = (function (new_link){
return (document.getElementsByTagName("head")[(0)]).appendChild(new_link);
});

figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$2 = (function (orig_link,klone){
var parent = orig_link.parentNode;
if(cljs.core._EQ_.call(null,orig_link,parent.lastChild)){
parent.appendChild(klone);
} else {
parent.insertBefore(klone,orig_link.nextSibling);
}

return setTimeout(((function (parent){
return (function (){
return parent.removeChild(orig_link);
});})(parent))
,(300));
});

figwheel.client.file_reloading.add_link_to_doc.cljs$lang$maxFixedArity = 2;
figwheel.client.file_reloading.reload_css_file = (function figwheel$client$file_reloading$reload_css_file(p__43884){
var map__43886 = p__43884;
var map__43886__$1 = ((cljs.core.seq_QMARK_.call(null,map__43886))?cljs.core.apply.call(null,cljs.core.hash_map,map__43886):map__43886);
var f_data = map__43886__$1;
var file = cljs.core.get.call(null,map__43886__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var request_url = cljs.core.get.call(null,map__43886__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
var temp__4421__auto__ = figwheel.client.file_reloading.get_correct_link.call(null,f_data);
if(cljs.core.truth_(temp__4421__auto__)){
var link = temp__4421__auto__;
return figwheel.client.file_reloading.add_link_to_doc.call(null,link,figwheel.client.file_reloading.clone_link.call(null,link,link.href));
} else {
return figwheel.client.file_reloading.add_link_to_doc.call(null,figwheel.client.file_reloading.create_link.call(null,(function (){var or__29265__auto__ = request_url;
if(cljs.core.truth_(or__29265__auto__)){
return or__29265__auto__;
} else {
return file;
}
})()));
}
});
figwheel.client.file_reloading.reload_css_files = (function figwheel$client$file_reloading$reload_css_files(p__43887,files_msg){
var map__43909 = p__43887;
var map__43909__$1 = ((cljs.core.seq_QMARK_.call(null,map__43909))?cljs.core.apply.call(null,cljs.core.hash_map,map__43909):map__43909);
var opts = map__43909__$1;
var on_cssload = cljs.core.get.call(null,map__43909__$1,new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318));
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
var seq__43910_43930 = cljs.core.seq.call(null,figwheel.client.file_reloading.add_request_urls.call(null,opts,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg)));
var chunk__43911_43931 = null;
var count__43912_43932 = (0);
var i__43913_43933 = (0);
while(true){
if((i__43913_43933 < count__43912_43932)){
var f_43934 = cljs.core._nth.call(null,chunk__43911_43931,i__43913_43933);
figwheel.client.file_reloading.reload_css_file.call(null,f_43934);

var G__43935 = seq__43910_43930;
var G__43936 = chunk__43911_43931;
var G__43937 = count__43912_43932;
var G__43938 = (i__43913_43933 + (1));
seq__43910_43930 = G__43935;
chunk__43911_43931 = G__43936;
count__43912_43932 = G__43937;
i__43913_43933 = G__43938;
continue;
} else {
var temp__4423__auto___43939 = cljs.core.seq.call(null,seq__43910_43930);
if(temp__4423__auto___43939){
var seq__43910_43940__$1 = temp__4423__auto___43939;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__43910_43940__$1)){
var c__30050__auto___43941 = cljs.core.chunk_first.call(null,seq__43910_43940__$1);
var G__43942 = cljs.core.chunk_rest.call(null,seq__43910_43940__$1);
var G__43943 = c__30050__auto___43941;
var G__43944 = cljs.core.count.call(null,c__30050__auto___43941);
var G__43945 = (0);
seq__43910_43930 = G__43942;
chunk__43911_43931 = G__43943;
count__43912_43932 = G__43944;
i__43913_43933 = G__43945;
continue;
} else {
var f_43946 = cljs.core.first.call(null,seq__43910_43940__$1);
figwheel.client.file_reloading.reload_css_file.call(null,f_43946);

var G__43947 = cljs.core.next.call(null,seq__43910_43940__$1);
var G__43948 = null;
var G__43949 = (0);
var G__43950 = (0);
seq__43910_43930 = G__43947;
chunk__43911_43931 = G__43948;
count__43912_43932 = G__43949;
i__43913_43933 = G__43950;
continue;
}
} else {
}
}
break;
}

var c__32551__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto__,map__43909,map__43909__$1,opts,on_cssload){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto__,map__43909,map__43909__$1,opts,on_cssload){
return (function (state_43920){
var state_val_43921 = (state_43920[(1)]);
if((state_val_43921 === (1))){
var inst_43914 = cljs.core.async.timeout.call(null,(100));
var state_43920__$1 = state_43920;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_43920__$1,(2),inst_43914);
} else {
if((state_val_43921 === (2))){
var inst_43916 = (state_43920[(2)]);
var inst_43917 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg);
var inst_43918 = on_cssload.call(null,inst_43917);
var state_43920__$1 = (function (){var statearr_43922 = state_43920;
(statearr_43922[(7)] = inst_43916);

return statearr_43922;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_43920__$1,inst_43918);
} else {
return null;
}
}
});})(c__32551__auto__,map__43909,map__43909__$1,opts,on_cssload))
;
return ((function (switch__32489__auto__,c__32551__auto__,map__43909,map__43909__$1,opts,on_cssload){
return (function() {
var figwheel$client$file_reloading$reload_css_files_$_state_machine__32490__auto__ = null;
var figwheel$client$file_reloading$reload_css_files_$_state_machine__32490__auto____0 = (function (){
var statearr_43926 = [null,null,null,null,null,null,null,null];
(statearr_43926[(0)] = figwheel$client$file_reloading$reload_css_files_$_state_machine__32490__auto__);

(statearr_43926[(1)] = (1));

return statearr_43926;
});
var figwheel$client$file_reloading$reload_css_files_$_state_machine__32490__auto____1 = (function (state_43920){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_43920);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e43927){if((e43927 instanceof Object)){
var ex__32493__auto__ = e43927;
var statearr_43928_43951 = state_43920;
(statearr_43928_43951[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_43920);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e43927;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43952 = state_43920;
state_43920 = G__43952;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_css_files_$_state_machine__32490__auto__ = function(state_43920){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_css_files_$_state_machine__32490__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_css_files_$_state_machine__32490__auto____1.call(this,state_43920);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$reload_css_files_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_css_files_$_state_machine__32490__auto____0;
figwheel$client$file_reloading$reload_css_files_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_css_files_$_state_machine__32490__auto____1;
return figwheel$client$file_reloading$reload_css_files_$_state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto__,map__43909,map__43909__$1,opts,on_cssload))
})();
var state__32553__auto__ = (function (){var statearr_43929 = f__32552__auto__.call(null);
(statearr_43929[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto__);

return statearr_43929;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto__,map__43909,map__43909__$1,opts,on_cssload))
);

return c__32551__auto__;
} else {
return null;
}
});

//# sourceMappingURL=file_reloading.js.map