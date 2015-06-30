// Compiled by ClojureScript 0.0-3269 {}
goog.provide('cljs_http.core');
goog.require('cljs.core');
goog.require('goog.net.ErrorCode');
goog.require('goog.net.EventType');
goog.require('cljs.core.async');
goog.require('cljs_http.util');
goog.require('goog.net.Jsonp');
goog.require('clojure.string');
goog.require('goog.net.XhrIo');
cljs_http.core.pending_requests = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
/**
 * Attempt to close the given channel and abort the pending HTTP request
 * with which it is associated.
 */
cljs_http.core.abort_BANG_ = (function cljs_http$core$abort_BANG_(channel){
var temp__4423__auto__ = cljs.core.deref.call(null,cljs_http.core.pending_requests).call(null,channel);
if(cljs.core.truth_(temp__4423__auto__)){
var req = temp__4423__auto__;
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

cljs.core.async.close_BANG_.call(null,channel);

if(cljs.core.truth_(req.hasOwnProperty("abort"))){
return req.abort();
} else {
return new cljs.core.Keyword(null,"jsonp","jsonp",226119588).cljs$core$IFn$_invoke$arity$1(req).cancel(new cljs.core.Keyword(null,"request","request",1772954723).cljs$core$IFn$_invoke$arity$1(req));
}
} else {
return null;
}
});
cljs_http.core.aborted_QMARK_ = (function cljs_http$core$aborted_QMARK_(xhr){
return cljs.core._EQ_.call(null,xhr.getLastErrorCode(),goog.net.ErrorCode.ABORT);
});
/**
 * Takes an XhrIo object and applies the default-headers to it.
 */
cljs_http.core.apply_default_headers_BANG_ = (function cljs_http$core$apply_default_headers_BANG_(xhr,headers){
var seq__39546 = cljs.core.seq.call(null,cljs.core.map.call(null,cljs_http.util.camelize,cljs.core.keys.call(null,headers)));
var chunk__39551 = null;
var count__39552 = (0);
var i__39553 = (0);
while(true){
if((i__39553 < count__39552)){
var h_name = cljs.core._nth.call(null,chunk__39551,i__39553);
var seq__39554_39558 = cljs.core.seq.call(null,cljs.core.vals.call(null,headers));
var chunk__39555_39559 = null;
var count__39556_39560 = (0);
var i__39557_39561 = (0);
while(true){
if((i__39557_39561 < count__39556_39560)){
var h_val_39562 = cljs.core._nth.call(null,chunk__39555_39559,i__39557_39561);
xhr.headers.set(h_name,h_val_39562);

var G__39563 = seq__39554_39558;
var G__39564 = chunk__39555_39559;
var G__39565 = count__39556_39560;
var G__39566 = (i__39557_39561 + (1));
seq__39554_39558 = G__39563;
chunk__39555_39559 = G__39564;
count__39556_39560 = G__39565;
i__39557_39561 = G__39566;
continue;
} else {
var temp__4423__auto___39567 = cljs.core.seq.call(null,seq__39554_39558);
if(temp__4423__auto___39567){
var seq__39554_39568__$1 = temp__4423__auto___39567;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__39554_39568__$1)){
var c__30050__auto___39569 = cljs.core.chunk_first.call(null,seq__39554_39568__$1);
var G__39570 = cljs.core.chunk_rest.call(null,seq__39554_39568__$1);
var G__39571 = c__30050__auto___39569;
var G__39572 = cljs.core.count.call(null,c__30050__auto___39569);
var G__39573 = (0);
seq__39554_39558 = G__39570;
chunk__39555_39559 = G__39571;
count__39556_39560 = G__39572;
i__39557_39561 = G__39573;
continue;
} else {
var h_val_39574 = cljs.core.first.call(null,seq__39554_39568__$1);
xhr.headers.set(h_name,h_val_39574);

var G__39575 = cljs.core.next.call(null,seq__39554_39568__$1);
var G__39576 = null;
var G__39577 = (0);
var G__39578 = (0);
seq__39554_39558 = G__39575;
chunk__39555_39559 = G__39576;
count__39556_39560 = G__39577;
i__39557_39561 = G__39578;
continue;
}
} else {
}
}
break;
}

var G__39579 = seq__39546;
var G__39580 = chunk__39551;
var G__39581 = count__39552;
var G__39582 = (i__39553 + (1));
seq__39546 = G__39579;
chunk__39551 = G__39580;
count__39552 = G__39581;
i__39553 = G__39582;
continue;
} else {
var temp__4423__auto__ = cljs.core.seq.call(null,seq__39546);
if(temp__4423__auto__){
var seq__39546__$1 = temp__4423__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__39546__$1)){
var c__30050__auto__ = cljs.core.chunk_first.call(null,seq__39546__$1);
var G__39583 = cljs.core.chunk_rest.call(null,seq__39546__$1);
var G__39584 = c__30050__auto__;
var G__39585 = cljs.core.count.call(null,c__30050__auto__);
var G__39586 = (0);
seq__39546 = G__39583;
chunk__39551 = G__39584;
count__39552 = G__39585;
i__39553 = G__39586;
continue;
} else {
var h_name = cljs.core.first.call(null,seq__39546__$1);
var seq__39547_39587 = cljs.core.seq.call(null,cljs.core.vals.call(null,headers));
var chunk__39548_39588 = null;
var count__39549_39589 = (0);
var i__39550_39590 = (0);
while(true){
if((i__39550_39590 < count__39549_39589)){
var h_val_39591 = cljs.core._nth.call(null,chunk__39548_39588,i__39550_39590);
xhr.headers.set(h_name,h_val_39591);

var G__39592 = seq__39547_39587;
var G__39593 = chunk__39548_39588;
var G__39594 = count__39549_39589;
var G__39595 = (i__39550_39590 + (1));
seq__39547_39587 = G__39592;
chunk__39548_39588 = G__39593;
count__39549_39589 = G__39594;
i__39550_39590 = G__39595;
continue;
} else {
var temp__4423__auto___39596__$1 = cljs.core.seq.call(null,seq__39547_39587);
if(temp__4423__auto___39596__$1){
var seq__39547_39597__$1 = temp__4423__auto___39596__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__39547_39597__$1)){
var c__30050__auto___39598 = cljs.core.chunk_first.call(null,seq__39547_39597__$1);
var G__39599 = cljs.core.chunk_rest.call(null,seq__39547_39597__$1);
var G__39600 = c__30050__auto___39598;
var G__39601 = cljs.core.count.call(null,c__30050__auto___39598);
var G__39602 = (0);
seq__39547_39587 = G__39599;
chunk__39548_39588 = G__39600;
count__39549_39589 = G__39601;
i__39550_39590 = G__39602;
continue;
} else {
var h_val_39603 = cljs.core.first.call(null,seq__39547_39597__$1);
xhr.headers.set(h_name,h_val_39603);

var G__39604 = cljs.core.next.call(null,seq__39547_39597__$1);
var G__39605 = null;
var G__39606 = (0);
var G__39607 = (0);
seq__39547_39587 = G__39604;
chunk__39548_39588 = G__39605;
count__39549_39589 = G__39606;
i__39550_39590 = G__39607;
continue;
}
} else {
}
}
break;
}

var G__39608 = cljs.core.next.call(null,seq__39546__$1);
var G__39609 = null;
var G__39610 = (0);
var G__39611 = (0);
seq__39546 = G__39608;
chunk__39551 = G__39609;
count__39552 = G__39610;
i__39553 = G__39611;
continue;
}
} else {
return null;
}
}
break;
}
});
/**
 * Takes an XhrIo object and sets response-type if not nil.
 */
cljs_http.core.apply_response_type_BANG_ = (function cljs_http$core$apply_response_type_BANG_(xhr,response_type){
return xhr.setResponseType((function (){var G__39613 = response_type;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"array-buffer","array-buffer",519008380),G__39613)){
return goog.net.XhrIo.ResponseType.ARRAY_BUFFER;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"blob","blob",1636965233),G__39613)){
return goog.net.XhrIo.ResponseType.BLOB;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"document","document",-1329188687),G__39613)){
return goog.net.XhrIo.ResponseType.DOCUMENT;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"text","text",-1790561697),G__39613)){
return goog.net.XhrIo.ResponseType.TEXT;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"default","default",-1987822328),G__39613)){
return goog.net.XhrIo.ResponseType.DEFAULT;
} else {
if(cljs.core._EQ_.call(null,null,G__39613)){
return goog.net.XhrIo.ResponseType.DEFAULT;
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(response_type)].join('')));

}
}
}
}
}
}
})());
});
/**
 * Builds an XhrIo object from the request parameters.
 */
cljs_http.core.build_xhr = (function cljs_http$core$build_xhr(p__39614){
var map__39617 = p__39614;
var map__39617__$1 = ((cljs.core.seq_QMARK_.call(null,map__39617))?cljs.core.apply.call(null,cljs.core.hash_map,map__39617):map__39617);
var request = map__39617__$1;
var with_credentials_QMARK_ = cljs.core.get.call(null,map__39617__$1,new cljs.core.Keyword(null,"with-credentials?","with-credentials?",-1773202222));
var default_headers = cljs.core.get.call(null,map__39617__$1,new cljs.core.Keyword(null,"default-headers","default-headers",-43146094));
var response_type = cljs.core.get.call(null,map__39617__$1,new cljs.core.Keyword(null,"response-type","response-type",-1493770458));
var timeout = (function (){var or__29265__auto__ = new cljs.core.Keyword(null,"timeout","timeout",-318625318).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__29265__auto__)){
return or__29265__auto__;
} else {
return (0);
}
})();
var send_credentials = (((with_credentials_QMARK_ == null))?true:with_credentials_QMARK_);
var G__39618 = (new goog.net.XhrIo());
cljs_http.core.apply_default_headers_BANG_.call(null,G__39618,default_headers);

cljs_http.core.apply_response_type_BANG_.call(null,G__39618,response_type);

G__39618.setTimeoutInterval(timeout);

G__39618.setWithCredentials(send_credentials);

return G__39618;
});
cljs_http.core.error_kw = cljs.core.PersistentHashMap.fromArrays([(0),(7),(1),(4),(6),(3),(2),(9),(5),(8)],[new cljs.core.Keyword(null,"no-error","no-error",1984610064),new cljs.core.Keyword(null,"abort","abort",521193198),new cljs.core.Keyword(null,"access-denied","access-denied",959449406),new cljs.core.Keyword(null,"custom-error","custom-error",-1565161123),new cljs.core.Keyword(null,"http-error","http-error",-1040049553),new cljs.core.Keyword(null,"ff-silent-error","ff-silent-error",189390514),new cljs.core.Keyword(null,"file-not-found","file-not-found",-65398940),new cljs.core.Keyword(null,"offline","offline",-107631935),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"timeout","timeout",-318625318)]);
/**
 * Execute the HTTP request corresponding to the given Ring request
 * map and return a core.async channel.
 */
cljs_http.core.xhr = (function cljs_http$core$xhr(p__39619){
var map__39645 = p__39619;
var map__39645__$1 = ((cljs.core.seq_QMARK_.call(null,map__39645))?cljs.core.apply.call(null,cljs.core.hash_map,map__39645):map__39645);
var request = map__39645__$1;
var request_method = cljs.core.get.call(null,map__39645__$1,new cljs.core.Keyword(null,"request-method","request-method",1764796830));
var headers = cljs.core.get.call(null,map__39645__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var body = cljs.core.get.call(null,map__39645__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var with_credentials_QMARK_ = cljs.core.get.call(null,map__39645__$1,new cljs.core.Keyword(null,"with-credentials?","with-credentials?",-1773202222));
var cancel = cljs.core.get.call(null,map__39645__$1,new cljs.core.Keyword(null,"cancel","cancel",-1964088360));
var channel = cljs.core.async.chan.call(null);
var request_url = cljs_http.util.build_url.call(null,request);
var method = cljs.core.name.call(null,(function (){var or__29265__auto__ = request_method;
if(cljs.core.truth_(or__29265__auto__)){
return or__29265__auto__;
} else {
return new cljs.core.Keyword(null,"get","get",1683182755);
}
})());
var headers__$1 = cljs_http.util.build_headers.call(null,headers);
var xhr__$1 = cljs_http.core.build_xhr.call(null,request);
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.assoc,channel,xhr__$1);

xhr__$1.listen(goog.net.EventType.COMPLETE,((function (channel,request_url,method,headers__$1,xhr__$1,map__39645,map__39645__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function (evt){
var target = evt.target;
var response = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"status","status",-1997798413),target.getStatus(),new cljs.core.Keyword(null,"success","success",1890645906),target.isSuccess(),new cljs.core.Keyword(null,"body","body",-2049205669),target.getResponse(),new cljs.core.Keyword(null,"headers","headers",-835030129),cljs_http.util.parse_headers.call(null,target.getAllResponseHeaders()),new cljs.core.Keyword(null,"trace-redirects","trace-redirects",-1149427907),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [request_url,target.getLastUri()], null),new cljs.core.Keyword(null,"error-code","error-code",180497232),cljs_http.core.error_kw.call(null,target.getLastErrorCode()),new cljs.core.Keyword(null,"error-text","error-text",2021893718),target.getLastError()], null);
if(cljs.core.not.call(null,cljs_http.core.aborted_QMARK_.call(null,xhr__$1))){
cljs.core.async.put_BANG_.call(null,channel,response);
} else {
}

cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

if(cljs.core.truth_(cancel)){
cljs.core.async.close_BANG_.call(null,cancel);
} else {
}

return cljs.core.async.close_BANG_.call(null,channel);
});})(channel,request_url,method,headers__$1,xhr__$1,map__39645,map__39645__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
);

xhr__$1.send(request_url,method,body,headers__$1);

if(cljs.core.truth_(cancel)){
var c__32551__auto___39670 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto___39670,channel,request_url,method,headers__$1,xhr__$1,map__39645,map__39645__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto___39670,channel,request_url,method,headers__$1,xhr__$1,map__39645,map__39645__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function (state_39656){
var state_val_39657 = (state_39656[(1)]);
if((state_val_39657 === (1))){
var state_39656__$1 = state_39656;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39656__$1,(2),cancel);
} else {
if((state_val_39657 === (2))){
var inst_39647 = (state_39656[(2)]);
var inst_39648 = xhr__$1.isComplete();
var inst_39649 = cljs.core.not.call(null,inst_39648);
var state_39656__$1 = (function (){var statearr_39658 = state_39656;
(statearr_39658[(7)] = inst_39647);

return statearr_39658;
})();
if(inst_39649){
var statearr_39659_39671 = state_39656__$1;
(statearr_39659_39671[(1)] = (3));

} else {
var statearr_39660_39672 = state_39656__$1;
(statearr_39660_39672[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39657 === (3))){
var inst_39651 = xhr__$1.abort();
var state_39656__$1 = state_39656;
var statearr_39661_39673 = state_39656__$1;
(statearr_39661_39673[(2)] = inst_39651);

(statearr_39661_39673[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39657 === (4))){
var state_39656__$1 = state_39656;
var statearr_39662_39674 = state_39656__$1;
(statearr_39662_39674[(2)] = null);

(statearr_39662_39674[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39657 === (5))){
var inst_39654 = (state_39656[(2)]);
var state_39656__$1 = state_39656;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_39656__$1,inst_39654);
} else {
return null;
}
}
}
}
}
});})(c__32551__auto___39670,channel,request_url,method,headers__$1,xhr__$1,map__39645,map__39645__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
;
return ((function (switch__32489__auto__,c__32551__auto___39670,channel,request_url,method,headers__$1,xhr__$1,map__39645,map__39645__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function() {
var cljs_http$core$xhr_$_state_machine__32490__auto__ = null;
var cljs_http$core$xhr_$_state_machine__32490__auto____0 = (function (){
var statearr_39666 = [null,null,null,null,null,null,null,null];
(statearr_39666[(0)] = cljs_http$core$xhr_$_state_machine__32490__auto__);

(statearr_39666[(1)] = (1));

return statearr_39666;
});
var cljs_http$core$xhr_$_state_machine__32490__auto____1 = (function (state_39656){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_39656);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e39667){if((e39667 instanceof Object)){
var ex__32493__auto__ = e39667;
var statearr_39668_39675 = state_39656;
(statearr_39668_39675[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_39656);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e39667;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39676 = state_39656;
state_39656 = G__39676;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs_http$core$xhr_$_state_machine__32490__auto__ = function(state_39656){
switch(arguments.length){
case 0:
return cljs_http$core$xhr_$_state_machine__32490__auto____0.call(this);
case 1:
return cljs_http$core$xhr_$_state_machine__32490__auto____1.call(this,state_39656);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs_http$core$xhr_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs_http$core$xhr_$_state_machine__32490__auto____0;
cljs_http$core$xhr_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs_http$core$xhr_$_state_machine__32490__auto____1;
return cljs_http$core$xhr_$_state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto___39670,channel,request_url,method,headers__$1,xhr__$1,map__39645,map__39645__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
})();
var state__32553__auto__ = (function (){var statearr_39669 = f__32552__auto__.call(null);
(statearr_39669[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___39670);

return statearr_39669;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto___39670,channel,request_url,method,headers__$1,xhr__$1,map__39645,map__39645__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
);

} else {
}

return channel;
});
/**
 * Execute the JSONP request corresponding to the given Ring request
 * map and return a core.async channel.
 */
cljs_http.core.jsonp = (function cljs_http$core$jsonp(p__39677){
var map__39693 = p__39677;
var map__39693__$1 = ((cljs.core.seq_QMARK_.call(null,map__39693))?cljs.core.apply.call(null,cljs.core.hash_map,map__39693):map__39693);
var request = map__39693__$1;
var timeout = cljs.core.get.call(null,map__39693__$1,new cljs.core.Keyword(null,"timeout","timeout",-318625318));
var callback_name = cljs.core.get.call(null,map__39693__$1,new cljs.core.Keyword(null,"callback-name","callback-name",336964714));
var cancel = cljs.core.get.call(null,map__39693__$1,new cljs.core.Keyword(null,"cancel","cancel",-1964088360));
var channel = cljs.core.async.chan.call(null);
var jsonp__$1 = (new goog.net.Jsonp(cljs_http.util.build_url.call(null,request),callback_name));
jsonp__$1.setRequestTimeout(timeout);

var req_39708 = jsonp__$1.send(null,((function (channel,jsonp__$1,map__39693,map__39693__$1,request,timeout,callback_name,cancel){
return (function cljs_http$core$jsonp_$_success_callback(data){
var response = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),(200),new cljs.core.Keyword(null,"success","success",1890645906),true,new cljs.core.Keyword(null,"body","body",-2049205669),cljs.core.js__GT_clj.call(null,data,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true)], null);
cljs.core.async.put_BANG_.call(null,channel,response);

cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

if(cljs.core.truth_(cancel)){
cljs.core.async.close_BANG_.call(null,cancel);
} else {
}

return cljs.core.async.close_BANG_.call(null,channel);
});})(channel,jsonp__$1,map__39693,map__39693__$1,request,timeout,callback_name,cancel))
,((function (channel,jsonp__$1,map__39693,map__39693__$1,request,timeout,callback_name,cancel){
return (function cljs_http$core$jsonp_$_error_callback(){
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

if(cljs.core.truth_(cancel)){
cljs.core.async.close_BANG_.call(null,cancel);
} else {
}

return cljs.core.async.close_BANG_.call(null,channel);
});})(channel,jsonp__$1,map__39693,map__39693__$1,request,timeout,callback_name,cancel))
);
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.assoc,channel,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"jsonp","jsonp",226119588),jsonp__$1,new cljs.core.Keyword(null,"request","request",1772954723),req_39708], null));

if(cljs.core.truth_(cancel)){
var c__32551__auto___39709 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto___39709,req_39708,channel,jsonp__$1,map__39693,map__39693__$1,request,timeout,callback_name,cancel){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto___39709,req_39708,channel,jsonp__$1,map__39693,map__39693__$1,request,timeout,callback_name,cancel){
return (function (state_39698){
var state_val_39699 = (state_39698[(1)]);
if((state_val_39699 === (1))){
var state_39698__$1 = state_39698;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39698__$1,(2),cancel);
} else {
if((state_val_39699 === (2))){
var inst_39695 = (state_39698[(2)]);
var inst_39696 = jsonp__$1.cancel(req_39708);
var state_39698__$1 = (function (){var statearr_39700 = state_39698;
(statearr_39700[(7)] = inst_39695);

return statearr_39700;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_39698__$1,inst_39696);
} else {
return null;
}
}
});})(c__32551__auto___39709,req_39708,channel,jsonp__$1,map__39693,map__39693__$1,request,timeout,callback_name,cancel))
;
return ((function (switch__32489__auto__,c__32551__auto___39709,req_39708,channel,jsonp__$1,map__39693,map__39693__$1,request,timeout,callback_name,cancel){
return (function() {
var cljs_http$core$jsonp_$_state_machine__32490__auto__ = null;
var cljs_http$core$jsonp_$_state_machine__32490__auto____0 = (function (){
var statearr_39704 = [null,null,null,null,null,null,null,null];
(statearr_39704[(0)] = cljs_http$core$jsonp_$_state_machine__32490__auto__);

(statearr_39704[(1)] = (1));

return statearr_39704;
});
var cljs_http$core$jsonp_$_state_machine__32490__auto____1 = (function (state_39698){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_39698);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e39705){if((e39705 instanceof Object)){
var ex__32493__auto__ = e39705;
var statearr_39706_39710 = state_39698;
(statearr_39706_39710[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_39698);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e39705;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39711 = state_39698;
state_39698 = G__39711;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs_http$core$jsonp_$_state_machine__32490__auto__ = function(state_39698){
switch(arguments.length){
case 0:
return cljs_http$core$jsonp_$_state_machine__32490__auto____0.call(this);
case 1:
return cljs_http$core$jsonp_$_state_machine__32490__auto____1.call(this,state_39698);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs_http$core$jsonp_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs_http$core$jsonp_$_state_machine__32490__auto____0;
cljs_http$core$jsonp_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs_http$core$jsonp_$_state_machine__32490__auto____1;
return cljs_http$core$jsonp_$_state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto___39709,req_39708,channel,jsonp__$1,map__39693,map__39693__$1,request,timeout,callback_name,cancel))
})();
var state__32553__auto__ = (function (){var statearr_39707 = f__32552__auto__.call(null);
(statearr_39707[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___39709);

return statearr_39707;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto___39709,req_39708,channel,jsonp__$1,map__39693,map__39693__$1,request,timeout,callback_name,cancel))
);

} else {
}

return channel;
});
/**
 * Execute the HTTP request corresponding to the given Ring request
 * map and return a core.async channel.
 */
cljs_http.core.request = (function cljs_http$core$request(p__39712){
var map__39714 = p__39712;
var map__39714__$1 = ((cljs.core.seq_QMARK_.call(null,map__39714))?cljs.core.apply.call(null,cljs.core.hash_map,map__39714):map__39714);
var request__$1 = map__39714__$1;
var request_method = cljs.core.get.call(null,map__39714__$1,new cljs.core.Keyword(null,"request-method","request-method",1764796830));
if(cljs.core._EQ_.call(null,request_method,new cljs.core.Keyword(null,"jsonp","jsonp",226119588))){
return cljs_http.core.jsonp.call(null,request__$1);
} else {
return cljs_http.core.xhr.call(null,request__$1);
}
});

//# sourceMappingURL=core.js.map