// Compiled by ClojureScript 1.7.122 {}
goog.provide('cljs_http.client');
goog.require('cljs.core');
goog.require('goog.Uri');
goog.require('cljs_http.core');
goog.require('cljs.core.async');
goog.require('no.en.core');
goog.require('cljs_http.util');
goog.require('clojure.string');
goog.require('cljs.reader');
cljs_http.client.if_pos = (function cljs_http$client$if_pos(v){
if(cljs.core.truth_((function (){var and__4549__auto__ = v;
if(cljs.core.truth_(and__4549__auto__)){
return (v > (0));
} else {
return and__4549__auto__;
}
})())){
return v;
} else {
return null;
}
});
/**
 * Parse `s` as query params and return a hash map.
 */
cljs_http.client.parse_query_params = (function cljs_http$client$parse_query_params(s){
if(cljs.core.not.call(null,clojure.string.blank_QMARK_.call(null,s))){
return cljs.core.reduce.call(null,(function (p1__15508_SHARP_,p2__15507_SHARP_){
var vec__15510 = clojure.string.split.call(null,p2__15507_SHARP_,/=/);
var k = cljs.core.nth.call(null,vec__15510,(0),null);
var v = cljs.core.nth.call(null,vec__15510,(1),null);
return cljs.core.assoc.call(null,p1__15508_SHARP_,cljs.core.keyword.call(null,no.en.core.url_decode.call(null,k)),no.en.core.url_decode.call(null,v));
}),cljs.core.PersistentArrayMap.EMPTY,clojure.string.split.call(null,[cljs.core.str(s)].join(''),/&/));
} else {
return null;
}
});
/**
 * Parse `url` into a hash map.
 */
cljs_http.client.parse_url = (function cljs_http$client$parse_url(url){
if(cljs.core.not.call(null,clojure.string.blank_QMARK_.call(null,url))){
var uri = goog.Uri.parse(url);
var query_data = uri.getQueryData();
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"scheme","scheme",90199613),cljs.core.keyword.call(null,uri.getScheme()),new cljs.core.Keyword(null,"server-name","server-name",-1012104295),uri.getDomain(),new cljs.core.Keyword(null,"server-port","server-port",663745648),cljs_http.client.if_pos.call(null,uri.getPort()),new cljs.core.Keyword(null,"uri","uri",-774711847),uri.getPath(),new cljs.core.Keyword(null,"query-string","query-string",-1018845061),((cljs.core.not.call(null,query_data.isEmpty()))?[cljs.core.str(query_data)].join(''):null),new cljs.core.Keyword(null,"query-params","query-params",900640534),((cljs.core.not.call(null,query_data.isEmpty()))?cljs_http.client.parse_query_params.call(null,[cljs.core.str(query_data)].join('')):null)], null);
} else {
return null;
}
});
cljs_http.client.unexceptional_status_QMARK_ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 13, [(205),null,(206),null,(300),null,(204),null,(307),null,(303),null,(301),null,(201),null,(302),null,(202),null,(200),null,(203),null,(207),null], null), null);
cljs_http.client.encode_val = (function cljs_http$client$encode_val(k,v){
return [cljs.core.str(no.en.core.url_encode.call(null,cljs.core.name.call(null,k))),cljs.core.str("="),cljs.core.str(no.en.core.url_encode.call(null,[cljs.core.str(v)].join('')))].join('');
});
cljs_http.client.encode_vals = (function cljs_http$client$encode_vals(k,vs){
return clojure.string.join.call(null,"&",cljs.core.map.call(null,(function (p1__15511_SHARP_){
return cljs_http.client.encode_val.call(null,k,p1__15511_SHARP_);
}),vs));
});
cljs_http.client.encode_param = (function cljs_http$client$encode_param(p__15512){
var vec__15514 = p__15512;
var k = cljs.core.nth.call(null,vec__15514,(0),null);
var v = cljs.core.nth.call(null,vec__15514,(1),null);
if(cljs.core.coll_QMARK_.call(null,v)){
return cljs_http.client.encode_vals.call(null,k,v);
} else {
return cljs_http.client.encode_val.call(null,k,v);
}
});
cljs_http.client.generate_query_string = (function cljs_http$client$generate_query_string(params){
return clojure.string.join.call(null,"&",cljs.core.map.call(null,cljs_http.client.encode_param,params));
});
cljs_http.client.regex_char_esc_smap = (function (){var esc_chars = "()*&^%$#!+";
return cljs.core.zipmap.call(null,esc_chars,cljs.core.map.call(null,((function (esc_chars){
return (function (p1__15515_SHARP_){
return [cljs.core.str("\\"),cljs.core.str(p1__15515_SHARP_)].join('');
});})(esc_chars))
,esc_chars));
})();
/**
 * Escape special characters -- for content-type.
 */
cljs_http.client.escape_special = (function cljs_http$client$escape_special(string){
return cljs.core.reduce.call(null,cljs.core.str,cljs.core.replace.call(null,cljs_http.client.regex_char_esc_smap,string));
});
/**
 * Decocde the :body of `response` with `decode-fn` if the content type matches.
 */
cljs_http.client.decode_body = (function cljs_http$client$decode_body(response,decode_fn,content_type,request_method){
if(cljs.core.truth_((function (){var and__4549__auto__ = cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"head","head",-771383919),request_method);
if(and__4549__auto__){
var and__4549__auto____$1 = cljs.core.not_EQ_.call(null,(204),new cljs.core.Keyword(null,"status","status",-1997798413).cljs$core$IFn$_invoke$arity$1(response));
if(and__4549__auto____$1){
return cljs.core.re_find.call(null,cljs.core.re_pattern.call(null,[cljs.core.str("(?i)"),cljs.core.str(cljs_http.client.escape_special.call(null,content_type))].join('')),[cljs.core.str(cljs.core.get.call(null,new cljs.core.Keyword(null,"headers","headers",-835030129).cljs$core$IFn$_invoke$arity$1(response),"content-type",""))].join(''));
} else {
return and__4549__auto____$1;
}
} else {
return and__4549__auto__;
}
})())){
return cljs.core.update_in.call(null,response,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"body","body",-2049205669)], null),decode_fn);
} else {
return response;
}
});
/**
 * Encode :edn-params in the `request` :body and set the appropriate
 *   Content Type header.
 */
cljs_http.client.wrap_edn_params = (function cljs_http$client$wrap_edn_params(client){
return (function (request){
var temp__4423__auto__ = new cljs.core.Keyword(null,"edn-params","edn-params",894273052).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(temp__4423__auto__)){
var params = temp__4423__auto__;
return client.call(null,cljs.core.assoc_in.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,request,new cljs.core.Keyword(null,"edn-params","edn-params",894273052)),new cljs.core.Keyword(null,"body","body",-2049205669),cljs.core.pr_str.call(null,params)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",-835030129),"content-type"], null),"application/edn"));
} else {
return client.call(null,request);
}
});
});
/**
 * Decode application/edn responses.
 */
cljs_http.client.wrap_edn_response = (function cljs_http$client$wrap_edn_response(client){
return (function (request){
return cljs.core.async.map.call(null,(function (p1__15516_SHARP_){
return cljs_http.client.decode_body.call(null,p1__15516_SHARP_,cljs.reader.read_string,"application/edn",new cljs.core.Keyword(null,"request-method","request-method",1764796830).cljs$core$IFn$_invoke$arity$1(request));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [client.call(null,request)], null));
});
});
cljs_http.client.wrap_default_headers = (function cljs_http$client$wrap_default_headers(var_args){
var args__5626__auto__ = [];
var len__5619__auto___15521 = arguments.length;
var i__5620__auto___15522 = (0);
while(true){
if((i__5620__auto___15522 < len__5619__auto___15521)){
args__5626__auto__.push((arguments[i__5620__auto___15522]));

var G__15523 = (i__5620__auto___15522 + (1));
i__5620__auto___15522 = G__15523;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_default_headers.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

cljs_http.client.wrap_default_headers.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__15519){
var vec__15520 = p__15519;
var default_headers = cljs.core.nth.call(null,vec__15520,(0),null);
return ((function (vec__15520,default_headers){
return (function (request){
var temp__4423__auto__ = (function (){var or__4561__auto__ = new cljs.core.Keyword(null,"default-headers","default-headers",-43146094).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__4561__auto__)){
return or__4561__auto__;
} else {
return default_headers;
}
})();
if(cljs.core.truth_(temp__4423__auto__)){
var default_headers__$1 = temp__4423__auto__;
return client.call(null,cljs.core.assoc.call(null,request,new cljs.core.Keyword(null,"default-headers","default-headers",-43146094),default_headers__$1));
} else {
return client.call(null,request);
}
});
;})(vec__15520,default_headers))
});

cljs_http.client.wrap_default_headers.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_default_headers.cljs$lang$applyTo = (function (seq15517){
var G__15518 = cljs.core.first.call(null,seq15517);
var seq15517__$1 = cljs.core.next.call(null,seq15517);
return cljs_http.client.wrap_default_headers.cljs$core$IFn$_invoke$arity$variadic(G__15518,seq15517__$1);
});
cljs_http.client.wrap_accept = (function cljs_http$client$wrap_accept(var_args){
var args__5626__auto__ = [];
var len__5619__auto___15528 = arguments.length;
var i__5620__auto___15529 = (0);
while(true){
if((i__5620__auto___15529 < len__5619__auto___15528)){
args__5626__auto__.push((arguments[i__5620__auto___15529]));

var G__15530 = (i__5620__auto___15529 + (1));
i__5620__auto___15529 = G__15530;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_accept.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

cljs_http.client.wrap_accept.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__15526){
var vec__15527 = p__15526;
var accept = cljs.core.nth.call(null,vec__15527,(0),null);
return ((function (vec__15527,accept){
return (function (request){
var temp__4423__auto__ = (function (){var or__4561__auto__ = new cljs.core.Keyword(null,"accept","accept",1874130431).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__4561__auto__)){
return or__4561__auto__;
} else {
return accept;
}
})();
if(cljs.core.truth_(temp__4423__auto__)){
var accept__$1 = temp__4423__auto__;
return client.call(null,cljs.core.assoc_in.call(null,request,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",-835030129),"accept"], null),accept__$1));
} else {
return client.call(null,request);
}
});
;})(vec__15527,accept))
});

cljs_http.client.wrap_accept.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_accept.cljs$lang$applyTo = (function (seq15524){
var G__15525 = cljs.core.first.call(null,seq15524);
var seq15524__$1 = cljs.core.next.call(null,seq15524);
return cljs_http.client.wrap_accept.cljs$core$IFn$_invoke$arity$variadic(G__15525,seq15524__$1);
});
cljs_http.client.wrap_content_type = (function cljs_http$client$wrap_content_type(var_args){
var args__5626__auto__ = [];
var len__5619__auto___15535 = arguments.length;
var i__5620__auto___15536 = (0);
while(true){
if((i__5620__auto___15536 < len__5619__auto___15535)){
args__5626__auto__.push((arguments[i__5620__auto___15536]));

var G__15537 = (i__5620__auto___15536 + (1));
i__5620__auto___15536 = G__15537;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_content_type.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

cljs_http.client.wrap_content_type.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__15533){
var vec__15534 = p__15533;
var content_type = cljs.core.nth.call(null,vec__15534,(0),null);
return ((function (vec__15534,content_type){
return (function (request){
var temp__4423__auto__ = (function (){var or__4561__auto__ = new cljs.core.Keyword(null,"content-type","content-type",-508222634).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__4561__auto__)){
return or__4561__auto__;
} else {
return content_type;
}
})();
if(cljs.core.truth_(temp__4423__auto__)){
var content_type__$1 = temp__4423__auto__;
return client.call(null,cljs.core.assoc_in.call(null,request,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",-835030129),"content-type"], null),content_type__$1));
} else {
return client.call(null,request);
}
});
;})(vec__15534,content_type))
});

cljs_http.client.wrap_content_type.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_content_type.cljs$lang$applyTo = (function (seq15531){
var G__15532 = cljs.core.first.call(null,seq15531);
var seq15531__$1 = cljs.core.next.call(null,seq15531);
return cljs_http.client.wrap_content_type.cljs$core$IFn$_invoke$arity$variadic(G__15532,seq15531__$1);
});
cljs_http.client.default_transit_opts = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"encoding","encoding",1728578272),new cljs.core.Keyword(null,"json","json",1279968570),new cljs.core.Keyword(null,"encoding-opts","encoding-opts",-1805664631),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"decoding","decoding",-568180903),new cljs.core.Keyword(null,"json","json",1279968570),new cljs.core.Keyword(null,"decoding-opts","decoding-opts",1050289140),cljs.core.PersistentArrayMap.EMPTY], null);
/**
 * Encode :transit-params in the `request` :body and set the appropriate
 *   Content Type header.
 * 
 *   A :transit-opts map can be optionally provided with the following keys:
 * 
 *   :encoding                #{:json, :json-verbose}
 *   :decoding                #{:json, :json-verbose}
 *   :encoding/decoding-opts  appropriate map of options to be passed to
 *                         transit writer/reader, respectively.
 */
cljs_http.client.wrap_transit_params = (function cljs_http$client$wrap_transit_params(client){
return (function (request){
var temp__4423__auto__ = new cljs.core.Keyword(null,"transit-params","transit-params",357261095).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(temp__4423__auto__)){
var params = temp__4423__auto__;
var map__15540 = cljs.core.merge.call(null,cljs_http.client.default_transit_opts,new cljs.core.Keyword(null,"transit-opts","transit-opts",1104386010).cljs$core$IFn$_invoke$arity$1(request));
var map__15540__$1 = ((((!((map__15540 == null)))?((((map__15540.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15540.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15540):map__15540);
var encoding = cljs.core.get.call(null,map__15540__$1,new cljs.core.Keyword(null,"encoding","encoding",1728578272));
var encoding_opts = cljs.core.get.call(null,map__15540__$1,new cljs.core.Keyword(null,"encoding-opts","encoding-opts",-1805664631));
return client.call(null,cljs.core.assoc_in.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,request,new cljs.core.Keyword(null,"transit-params","transit-params",357261095)),new cljs.core.Keyword(null,"body","body",-2049205669),cljs_http.util.transit_encode.call(null,params,encoding,encoding_opts)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",-835030129),"content-type"], null),"application/transit+json"));
} else {
return client.call(null,request);
}
});
});
/**
 * Decode application/transit+json responses.
 */
cljs_http.client.wrap_transit_response = (function cljs_http$client$wrap_transit_response(client){
return (function (request){
var map__15546 = cljs.core.merge.call(null,cljs_http.client.default_transit_opts,new cljs.core.Keyword(null,"transit-opts","transit-opts",1104386010).cljs$core$IFn$_invoke$arity$1(request));
var map__15546__$1 = ((((!((map__15546 == null)))?((((map__15546.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15546.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15546):map__15546);
var decoding = cljs.core.get.call(null,map__15546__$1,new cljs.core.Keyword(null,"decoding","decoding",-568180903));
var decoding_opts = cljs.core.get.call(null,map__15546__$1,new cljs.core.Keyword(null,"decoding-opts","decoding-opts",1050289140));
var transit_decode = ((function (map__15546,map__15546__$1,decoding,decoding_opts){
return (function (p1__15542_SHARP_){
return cljs_http.util.transit_decode.call(null,p1__15542_SHARP_,decoding,decoding_opts);
});})(map__15546,map__15546__$1,decoding,decoding_opts))
;
return cljs.core.async.map.call(null,((function (map__15546,map__15546__$1,decoding,decoding_opts,transit_decode){
return (function (p1__15543_SHARP_){
return cljs_http.client.decode_body.call(null,p1__15543_SHARP_,transit_decode,"application/transit+json",new cljs.core.Keyword(null,"request-method","request-method",1764796830).cljs$core$IFn$_invoke$arity$1(request));
});})(map__15546,map__15546__$1,decoding,decoding_opts,transit_decode))
,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [client.call(null,request)], null));
});
});
/**
 * Encode :json-params in the `request` :body and set the appropriate
 *   Content Type header.
 */
cljs_http.client.wrap_json_params = (function cljs_http$client$wrap_json_params(client){
return (function (request){
var temp__4423__auto__ = new cljs.core.Keyword(null,"json-params","json-params",-1112693596).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(temp__4423__auto__)){
var params = temp__4423__auto__;
return client.call(null,cljs.core.assoc_in.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,request,new cljs.core.Keyword(null,"json-params","json-params",-1112693596)),new cljs.core.Keyword(null,"body","body",-2049205669),cljs_http.util.json_encode.call(null,params)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",-835030129),"content-type"], null),"application/json"));
} else {
return client.call(null,request);
}
});
});
/**
 * Decode application/json responses.
 */
cljs_http.client.wrap_json_response = (function cljs_http$client$wrap_json_response(client){
return (function (request){
return cljs.core.async.map.call(null,(function (p1__15548_SHARP_){
return cljs_http.client.decode_body.call(null,p1__15548_SHARP_,cljs_http.util.json_decode,"application/json",new cljs.core.Keyword(null,"request-method","request-method",1764796830).cljs$core$IFn$_invoke$arity$1(request));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [client.call(null,request)], null));
});
});
cljs_http.client.wrap_query_params = (function cljs_http$client$wrap_query_params(client){
return (function (p__15552){
var map__15553 = p__15552;
var map__15553__$1 = ((((!((map__15553 == null)))?((((map__15553.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15553.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15553):map__15553);
var req = map__15553__$1;
var query_params = cljs.core.get.call(null,map__15553__$1,new cljs.core.Keyword(null,"query-params","query-params",900640534));
if(cljs.core.truth_(query_params)){
return client.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,req,new cljs.core.Keyword(null,"query-params","query-params",900640534)),new cljs.core.Keyword(null,"query-string","query-string",-1018845061),cljs_http.client.generate_query_string.call(null,query_params)));
} else {
return client.call(null,req);
}
});
});
cljs_http.client.wrap_form_params = (function cljs_http$client$wrap_form_params(client){
return (function (p__15558){
var map__15559 = p__15558;
var map__15559__$1 = ((((!((map__15559 == null)))?((((map__15559.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15559.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15559):map__15559);
var request = map__15559__$1;
var form_params = cljs.core.get.call(null,map__15559__$1,new cljs.core.Keyword(null,"form-params","form-params",1884296467));
var request_method = cljs.core.get.call(null,map__15559__$1,new cljs.core.Keyword(null,"request-method","request-method",1764796830));
if(cljs.core.truth_((function (){var and__4549__auto__ = form_params;
if(cljs.core.truth_(and__4549__auto__)){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"patch","patch",380775109),null,new cljs.core.Keyword(null,"delete","delete",-1768633620),null,new cljs.core.Keyword(null,"post","post",269697687),null,new cljs.core.Keyword(null,"put","put",1299772570),null], null), null).call(null,request_method);
} else {
return and__4549__auto__;
}
})())){
return client.call(null,cljs.core.assoc_in.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,request,new cljs.core.Keyword(null,"form-params","form-params",1884296467)),new cljs.core.Keyword(null,"body","body",-2049205669),cljs_http.client.generate_query_string.call(null,form_params)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",-835030129),"content-type"], null),"application/x-www-form-urlencoded"));
} else {
return client.call(null,request);
}
});
});
cljs_http.client.generate_form_data = (function cljs_http$client$generate_form_data(params){
var form_data = (new FormData());
var seq__15567_15573 = cljs.core.seq.call(null,params);
var chunk__15568_15574 = null;
var count__15569_15575 = (0);
var i__15570_15576 = (0);
while(true){
if((i__15570_15576 < count__15569_15575)){
var vec__15571_15577 = cljs.core._nth.call(null,chunk__15568_15574,i__15570_15576);
var k_15578 = cljs.core.nth.call(null,vec__15571_15577,(0),null);
var v_15579 = cljs.core.nth.call(null,vec__15571_15577,(1),null);
form_data.append(cljs.core.name.call(null,k_15578),v_15579);

var G__15580 = seq__15567_15573;
var G__15581 = chunk__15568_15574;
var G__15582 = count__15569_15575;
var G__15583 = (i__15570_15576 + (1));
seq__15567_15573 = G__15580;
chunk__15568_15574 = G__15581;
count__15569_15575 = G__15582;
i__15570_15576 = G__15583;
continue;
} else {
var temp__4425__auto___15584 = cljs.core.seq.call(null,seq__15567_15573);
if(temp__4425__auto___15584){
var seq__15567_15585__$1 = temp__4425__auto___15584;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15567_15585__$1)){
var c__5364__auto___15586 = cljs.core.chunk_first.call(null,seq__15567_15585__$1);
var G__15587 = cljs.core.chunk_rest.call(null,seq__15567_15585__$1);
var G__15588 = c__5364__auto___15586;
var G__15589 = cljs.core.count.call(null,c__5364__auto___15586);
var G__15590 = (0);
seq__15567_15573 = G__15587;
chunk__15568_15574 = G__15588;
count__15569_15575 = G__15589;
i__15570_15576 = G__15590;
continue;
} else {
var vec__15572_15591 = cljs.core.first.call(null,seq__15567_15585__$1);
var k_15592 = cljs.core.nth.call(null,vec__15572_15591,(0),null);
var v_15593 = cljs.core.nth.call(null,vec__15572_15591,(1),null);
form_data.append(cljs.core.name.call(null,k_15592),v_15593);

var G__15594 = cljs.core.next.call(null,seq__15567_15585__$1);
var G__15595 = null;
var G__15596 = (0);
var G__15597 = (0);
seq__15567_15573 = G__15594;
chunk__15568_15574 = G__15595;
count__15569_15575 = G__15596;
i__15570_15576 = G__15597;
continue;
}
} else {
}
}
break;
}

return form_data;
});
cljs_http.client.wrap_multipart_params = (function cljs_http$client$wrap_multipart_params(client){
return (function (p__15601){
var map__15602 = p__15601;
var map__15602__$1 = ((((!((map__15602 == null)))?((((map__15602.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15602.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15602):map__15602);
var request = map__15602__$1;
var multipart_params = cljs.core.get.call(null,map__15602__$1,new cljs.core.Keyword(null,"multipart-params","multipart-params",-1033508707));
var request_method = cljs.core.get.call(null,map__15602__$1,new cljs.core.Keyword(null,"request-method","request-method",1764796830));
if(cljs.core.truth_((function (){var and__4549__auto__ = multipart_params;
if(cljs.core.truth_(and__4549__auto__)){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"patch","patch",380775109),null,new cljs.core.Keyword(null,"delete","delete",-1768633620),null,new cljs.core.Keyword(null,"post","post",269697687),null,new cljs.core.Keyword(null,"put","put",1299772570),null], null), null).call(null,request_method);
} else {
return and__4549__auto__;
}
})())){
return client.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,request,new cljs.core.Keyword(null,"multipart-params","multipart-params",-1033508707)),new cljs.core.Keyword(null,"body","body",-2049205669),cljs_http.client.generate_form_data.call(null,multipart_params)));
} else {
return client.call(null,request);
}
});
});
cljs_http.client.wrap_method = (function cljs_http$client$wrap_method(client){
return (function (req){
var temp__4423__auto__ = new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(temp__4423__auto__)){
var m = temp__4423__auto__;
return client.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,req,new cljs.core.Keyword(null,"method","method",55703592)),new cljs.core.Keyword(null,"request-method","request-method",1764796830),m));
} else {
return client.call(null,req);
}
});
});
cljs_http.client.wrap_server_name = (function cljs_http$client$wrap_server_name(client,server_name){
return (function (p1__15604_SHARP_){
return client.call(null,cljs.core.assoc.call(null,p1__15604_SHARP_,new cljs.core.Keyword(null,"server-name","server-name",-1012104295),server_name));
});
});
cljs_http.client.wrap_url = (function cljs_http$client$wrap_url(client){
return (function (p__15609){
var map__15610 = p__15609;
var map__15610__$1 = ((((!((map__15610 == null)))?((((map__15610.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15610.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15610):map__15610);
var req = map__15610__$1;
var query_params = cljs.core.get.call(null,map__15610__$1,new cljs.core.Keyword(null,"query-params","query-params",900640534));
var temp__4423__auto__ = cljs_http.client.parse_url.call(null,new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(req));
if(cljs.core.truth_(temp__4423__auto__)){
var spec = temp__4423__auto__;
return client.call(null,cljs.core.update_in.call(null,cljs.core.dissoc.call(null,cljs.core.merge.call(null,req,spec),new cljs.core.Keyword(null,"url","url",276297046)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"query-params","query-params",900640534)], null),((function (spec,temp__4423__auto__,map__15610,map__15610__$1,req,query_params){
return (function (p1__15605_SHARP_){
return cljs.core.merge.call(null,p1__15605_SHARP_,query_params);
});})(spec,temp__4423__auto__,map__15610,map__15610__$1,req,query_params))
));
} else {
return client.call(null,req);
}
});
});
/**
 * Middleware converting the :basic-auth option or `credentials` into
 *   an Authorization header.
 */
cljs_http.client.wrap_basic_auth = (function cljs_http$client$wrap_basic_auth(var_args){
var args__5626__auto__ = [];
var len__5619__auto___15616 = arguments.length;
var i__5620__auto___15617 = (0);
while(true){
if((i__5620__auto___15617 < len__5619__auto___15616)){
args__5626__auto__.push((arguments[i__5620__auto___15617]));

var G__15618 = (i__5620__auto___15617 + (1));
i__5620__auto___15617 = G__15618;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_basic_auth.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

cljs_http.client.wrap_basic_auth.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__15614){
var vec__15615 = p__15614;
var credentials = cljs.core.nth.call(null,vec__15615,(0),null);
return ((function (vec__15615,credentials){
return (function (req){
var credentials__$1 = (function (){var or__4561__auto__ = new cljs.core.Keyword(null,"basic-auth","basic-auth",-673163332).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__4561__auto__)){
return or__4561__auto__;
} else {
return credentials;
}
})();
if(!(cljs.core.empty_QMARK_.call(null,credentials__$1))){
return client.call(null,cljs.core.assoc_in.call(null,cljs.core.dissoc.call(null,req,new cljs.core.Keyword(null,"basic-auth","basic-auth",-673163332)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",-835030129),"authorization"], null),cljs_http.util.basic_auth.call(null,credentials__$1)));
} else {
return client.call(null,req);
}
});
;})(vec__15615,credentials))
});

cljs_http.client.wrap_basic_auth.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_basic_auth.cljs$lang$applyTo = (function (seq15612){
var G__15613 = cljs.core.first.call(null,seq15612);
var seq15612__$1 = cljs.core.next.call(null,seq15612);
return cljs_http.client.wrap_basic_auth.cljs$core$IFn$_invoke$arity$variadic(G__15613,seq15612__$1);
});
/**
 * Middleware converting the :oauth-token option into an Authorization header.
 */
cljs_http.client.wrap_oauth = (function cljs_http$client$wrap_oauth(client){
return (function (req){
var temp__4423__auto__ = new cljs.core.Keyword(null,"oauth-token","oauth-token",311415191).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(temp__4423__auto__)){
var oauth_token = temp__4423__auto__;
return client.call(null,cljs.core.assoc_in.call(null,cljs.core.dissoc.call(null,req,new cljs.core.Keyword(null,"oauth-token","oauth-token",311415191)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",-835030129),"authorization"], null),[cljs.core.str("Bearer "),cljs.core.str(oauth_token)].join('')));
} else {
return client.call(null,req);
}
});
});
/**
 * Pipe the response-channel into the request-map's
 * custom channel (e.g. to enable transducers)
 */
cljs_http.client.wrap_channel_from_request_map = (function cljs_http$client$wrap_channel_from_request_map(client){
return (function (request){
var temp__4423__auto__ = new cljs.core.Keyword(null,"channel","channel",734187692).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(temp__4423__auto__)){
var custom_channel = temp__4423__auto__;
return cljs.core.async.pipe.call(null,client.call(null,request),custom_channel);
} else {
return client.call(null,request);
}
});
});
/**
 * Returns a batteries-included HTTP request function coresponding to the given
 * core client. See client/request
 */
cljs_http.client.wrap_request = (function cljs_http$client$wrap_request(request){
return cljs_http.client.wrap_default_headers.call(null,cljs_http.client.wrap_channel_from_request_map.call(null,cljs_http.client.wrap_url.call(null,cljs_http.client.wrap_method.call(null,cljs_http.client.wrap_oauth.call(null,cljs_http.client.wrap_basic_auth.call(null,cljs_http.client.wrap_query_params.call(null,cljs_http.client.wrap_content_type.call(null,cljs_http.client.wrap_json_response.call(null,cljs_http.client.wrap_json_params.call(null,cljs_http.client.wrap_transit_response.call(null,cljs_http.client.wrap_transit_params.call(null,cljs_http.client.wrap_edn_response.call(null,cljs_http.client.wrap_edn_params.call(null,cljs_http.client.wrap_multipart_params.call(null,cljs_http.client.wrap_form_params.call(null,cljs_http.client.wrap_accept.call(null,request)))))))))))))))));
});
/**
 * Executes the HTTP request corresponding to the given map and returns the
 * response map for corresponding to the resulting HTTP response.
 * 
 * In addition to the standard Ring request keys, the following keys are also
 * recognized:
 * * :url
 * * :method
 * * :query-params
 */
cljs_http.client.request = cljs_http.client.wrap_request.call(null,cljs_http.core.request);
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.delete$ = (function cljs_http$client$delete(var_args){
var args__5626__auto__ = [];
var len__5619__auto___15623 = arguments.length;
var i__5620__auto___15624 = (0);
while(true){
if((i__5620__auto___15624 < len__5619__auto___15623)){
args__5626__auto__.push((arguments[i__5620__auto___15624]));

var G__15625 = (i__5620__auto___15624 + (1));
i__5620__auto___15624 = G__15625;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return cljs_http.client.delete$.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

cljs_http.client.delete$.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__15621){
var vec__15622 = p__15621;
var req = cljs.core.nth.call(null,vec__15622,(0),null);
return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"delete","delete",-1768633620),new cljs.core.Keyword(null,"url","url",276297046),url], null)));
});

cljs_http.client.delete$.cljs$lang$maxFixedArity = (1);

cljs_http.client.delete$.cljs$lang$applyTo = (function (seq15619){
var G__15620 = cljs.core.first.call(null,seq15619);
var seq15619__$1 = cljs.core.next.call(null,seq15619);
return cljs_http.client.delete$.cljs$core$IFn$_invoke$arity$variadic(G__15620,seq15619__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.get = (function cljs_http$client$get(var_args){
var args__5626__auto__ = [];
var len__5619__auto___15630 = arguments.length;
var i__5620__auto___15631 = (0);
while(true){
if((i__5620__auto___15631 < len__5619__auto___15630)){
args__5626__auto__.push((arguments[i__5620__auto___15631]));

var G__15632 = (i__5620__auto___15631 + (1));
i__5620__auto___15631 = G__15632;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__15628){
var vec__15629 = p__15628;
var req = cljs.core.nth.call(null,vec__15629,(0),null);
return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"url","url",276297046),url], null)));
});

cljs_http.client.get.cljs$lang$maxFixedArity = (1);

cljs_http.client.get.cljs$lang$applyTo = (function (seq15626){
var G__15627 = cljs.core.first.call(null,seq15626);
var seq15626__$1 = cljs.core.next.call(null,seq15626);
return cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic(G__15627,seq15626__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.head = (function cljs_http$client$head(var_args){
var args__5626__auto__ = [];
var len__5619__auto___15637 = arguments.length;
var i__5620__auto___15638 = (0);
while(true){
if((i__5620__auto___15638 < len__5619__auto___15637)){
args__5626__auto__.push((arguments[i__5620__auto___15638]));

var G__15639 = (i__5620__auto___15638 + (1));
i__5620__auto___15638 = G__15639;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return cljs_http.client.head.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

cljs_http.client.head.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__15635){
var vec__15636 = p__15635;
var req = cljs.core.nth.call(null,vec__15636,(0),null);
return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"head","head",-771383919),new cljs.core.Keyword(null,"url","url",276297046),url], null)));
});

cljs_http.client.head.cljs$lang$maxFixedArity = (1);

cljs_http.client.head.cljs$lang$applyTo = (function (seq15633){
var G__15634 = cljs.core.first.call(null,seq15633);
var seq15633__$1 = cljs.core.next.call(null,seq15633);
return cljs_http.client.head.cljs$core$IFn$_invoke$arity$variadic(G__15634,seq15633__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.jsonp = (function cljs_http$client$jsonp(var_args){
var args__5626__auto__ = [];
var len__5619__auto___15644 = arguments.length;
var i__5620__auto___15645 = (0);
while(true){
if((i__5620__auto___15645 < len__5619__auto___15644)){
args__5626__auto__.push((arguments[i__5620__auto___15645]));

var G__15646 = (i__5620__auto___15645 + (1));
i__5620__auto___15645 = G__15646;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return cljs_http.client.jsonp.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

cljs_http.client.jsonp.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__15642){
var vec__15643 = p__15642;
var req = cljs.core.nth.call(null,vec__15643,(0),null);
return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"jsonp","jsonp",226119588),new cljs.core.Keyword(null,"url","url",276297046),url], null)));
});

cljs_http.client.jsonp.cljs$lang$maxFixedArity = (1);

cljs_http.client.jsonp.cljs$lang$applyTo = (function (seq15640){
var G__15641 = cljs.core.first.call(null,seq15640);
var seq15640__$1 = cljs.core.next.call(null,seq15640);
return cljs_http.client.jsonp.cljs$core$IFn$_invoke$arity$variadic(G__15641,seq15640__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.move = (function cljs_http$client$move(var_args){
var args__5626__auto__ = [];
var len__5619__auto___15651 = arguments.length;
var i__5620__auto___15652 = (0);
while(true){
if((i__5620__auto___15652 < len__5619__auto___15651)){
args__5626__auto__.push((arguments[i__5620__auto___15652]));

var G__15653 = (i__5620__auto___15652 + (1));
i__5620__auto___15652 = G__15653;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return cljs_http.client.move.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

cljs_http.client.move.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__15649){
var vec__15650 = p__15649;
var req = cljs.core.nth.call(null,vec__15650,(0),null);
return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"move","move",-2110884309),new cljs.core.Keyword(null,"url","url",276297046),url], null)));
});

cljs_http.client.move.cljs$lang$maxFixedArity = (1);

cljs_http.client.move.cljs$lang$applyTo = (function (seq15647){
var G__15648 = cljs.core.first.call(null,seq15647);
var seq15647__$1 = cljs.core.next.call(null,seq15647);
return cljs_http.client.move.cljs$core$IFn$_invoke$arity$variadic(G__15648,seq15647__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.options = (function cljs_http$client$options(var_args){
var args__5626__auto__ = [];
var len__5619__auto___15658 = arguments.length;
var i__5620__auto___15659 = (0);
while(true){
if((i__5620__auto___15659 < len__5619__auto___15658)){
args__5626__auto__.push((arguments[i__5620__auto___15659]));

var G__15660 = (i__5620__auto___15659 + (1));
i__5620__auto___15659 = G__15660;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return cljs_http.client.options.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

cljs_http.client.options.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__15656){
var vec__15657 = p__15656;
var req = cljs.core.nth.call(null,vec__15657,(0),null);
return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"options","options",99638489),new cljs.core.Keyword(null,"url","url",276297046),url], null)));
});

cljs_http.client.options.cljs$lang$maxFixedArity = (1);

cljs_http.client.options.cljs$lang$applyTo = (function (seq15654){
var G__15655 = cljs.core.first.call(null,seq15654);
var seq15654__$1 = cljs.core.next.call(null,seq15654);
return cljs_http.client.options.cljs$core$IFn$_invoke$arity$variadic(G__15655,seq15654__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.patch = (function cljs_http$client$patch(var_args){
var args__5626__auto__ = [];
var len__5619__auto___15665 = arguments.length;
var i__5620__auto___15666 = (0);
while(true){
if((i__5620__auto___15666 < len__5619__auto___15665)){
args__5626__auto__.push((arguments[i__5620__auto___15666]));

var G__15667 = (i__5620__auto___15666 + (1));
i__5620__auto___15666 = G__15667;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return cljs_http.client.patch.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

cljs_http.client.patch.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__15663){
var vec__15664 = p__15663;
var req = cljs.core.nth.call(null,vec__15664,(0),null);
return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"patch","patch",380775109),new cljs.core.Keyword(null,"url","url",276297046),url], null)));
});

cljs_http.client.patch.cljs$lang$maxFixedArity = (1);

cljs_http.client.patch.cljs$lang$applyTo = (function (seq15661){
var G__15662 = cljs.core.first.call(null,seq15661);
var seq15661__$1 = cljs.core.next.call(null,seq15661);
return cljs_http.client.patch.cljs$core$IFn$_invoke$arity$variadic(G__15662,seq15661__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.post = (function cljs_http$client$post(var_args){
var args__5626__auto__ = [];
var len__5619__auto___15672 = arguments.length;
var i__5620__auto___15673 = (0);
while(true){
if((i__5620__auto___15673 < len__5619__auto___15672)){
args__5626__auto__.push((arguments[i__5620__auto___15673]));

var G__15674 = (i__5620__auto___15673 + (1));
i__5620__auto___15673 = G__15674;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__15670){
var vec__15671 = p__15670;
var req = cljs.core.nth.call(null,vec__15671,(0),null);
return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"url","url",276297046),url], null)));
});

cljs_http.client.post.cljs$lang$maxFixedArity = (1);

cljs_http.client.post.cljs$lang$applyTo = (function (seq15668){
var G__15669 = cljs.core.first.call(null,seq15668);
var seq15668__$1 = cljs.core.next.call(null,seq15668);
return cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic(G__15669,seq15668__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.put = (function cljs_http$client$put(var_args){
var args__5626__auto__ = [];
var len__5619__auto___15679 = arguments.length;
var i__5620__auto___15680 = (0);
while(true){
if((i__5620__auto___15680 < len__5619__auto___15679)){
args__5626__auto__.push((arguments[i__5620__auto___15680]));

var G__15681 = (i__5620__auto___15680 + (1));
i__5620__auto___15680 = G__15681;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__15677){
var vec__15678 = p__15677;
var req = cljs.core.nth.call(null,vec__15678,(0),null);
return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.Keyword(null,"url","url",276297046),url], null)));
});

cljs_http.client.put.cljs$lang$maxFixedArity = (1);

cljs_http.client.put.cljs$lang$applyTo = (function (seq15675){
var G__15676 = cljs.core.first.call(null,seq15675);
var seq15675__$1 = cljs.core.next.call(null,seq15675);
return cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic(G__15676,seq15675__$1);
});

//# sourceMappingURL=client.js.map