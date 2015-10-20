// Compiled by ClojureScript 1.7.122 {}
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
 *   with which it is associated.
 */
cljs_http.core.abort_BANG_ = (function cljs_http$core$abort_BANG_(channel){
var temp__4425__auto__ = cljs.core.deref.call(null,cljs_http.core.pending_requests).call(null,channel);
if(cljs.core.truth_(temp__4425__auto__)){
var req = temp__4425__auto__;
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
var seq__15750 = cljs.core.seq.call(null,cljs.core.map.call(null,cljs_http.util.camelize,cljs.core.keys.call(null,headers)));
var chunk__15755 = null;
var count__15756 = (0);
var i__15757 = (0);
while(true){
if((i__15757 < count__15756)){
var h_name = cljs.core._nth.call(null,chunk__15755,i__15757);
var seq__15758_15762 = cljs.core.seq.call(null,cljs.core.vals.call(null,headers));
var chunk__15759_15763 = null;
var count__15760_15764 = (0);
var i__15761_15765 = (0);
while(true){
if((i__15761_15765 < count__15760_15764)){
var h_val_15766 = cljs.core._nth.call(null,chunk__15759_15763,i__15761_15765);
xhr.headers.set(h_name,h_val_15766);

var G__15767 = seq__15758_15762;
var G__15768 = chunk__15759_15763;
var G__15769 = count__15760_15764;
var G__15770 = (i__15761_15765 + (1));
seq__15758_15762 = G__15767;
chunk__15759_15763 = G__15768;
count__15760_15764 = G__15769;
i__15761_15765 = G__15770;
continue;
} else {
var temp__4425__auto___15771 = cljs.core.seq.call(null,seq__15758_15762);
if(temp__4425__auto___15771){
var seq__15758_15772__$1 = temp__4425__auto___15771;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15758_15772__$1)){
var c__5364__auto___15773 = cljs.core.chunk_first.call(null,seq__15758_15772__$1);
var G__15774 = cljs.core.chunk_rest.call(null,seq__15758_15772__$1);
var G__15775 = c__5364__auto___15773;
var G__15776 = cljs.core.count.call(null,c__5364__auto___15773);
var G__15777 = (0);
seq__15758_15762 = G__15774;
chunk__15759_15763 = G__15775;
count__15760_15764 = G__15776;
i__15761_15765 = G__15777;
continue;
} else {
var h_val_15778 = cljs.core.first.call(null,seq__15758_15772__$1);
xhr.headers.set(h_name,h_val_15778);

var G__15779 = cljs.core.next.call(null,seq__15758_15772__$1);
var G__15780 = null;
var G__15781 = (0);
var G__15782 = (0);
seq__15758_15762 = G__15779;
chunk__15759_15763 = G__15780;
count__15760_15764 = G__15781;
i__15761_15765 = G__15782;
continue;
}
} else {
}
}
break;
}

var G__15783 = seq__15750;
var G__15784 = chunk__15755;
var G__15785 = count__15756;
var G__15786 = (i__15757 + (1));
seq__15750 = G__15783;
chunk__15755 = G__15784;
count__15756 = G__15785;
i__15757 = G__15786;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__15750);
if(temp__4425__auto__){
var seq__15750__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15750__$1)){
var c__5364__auto__ = cljs.core.chunk_first.call(null,seq__15750__$1);
var G__15787 = cljs.core.chunk_rest.call(null,seq__15750__$1);
var G__15788 = c__5364__auto__;
var G__15789 = cljs.core.count.call(null,c__5364__auto__);
var G__15790 = (0);
seq__15750 = G__15787;
chunk__15755 = G__15788;
count__15756 = G__15789;
i__15757 = G__15790;
continue;
} else {
var h_name = cljs.core.first.call(null,seq__15750__$1);
var seq__15751_15791 = cljs.core.seq.call(null,cljs.core.vals.call(null,headers));
var chunk__15752_15792 = null;
var count__15753_15793 = (0);
var i__15754_15794 = (0);
while(true){
if((i__15754_15794 < count__15753_15793)){
var h_val_15795 = cljs.core._nth.call(null,chunk__15752_15792,i__15754_15794);
xhr.headers.set(h_name,h_val_15795);

var G__15796 = seq__15751_15791;
var G__15797 = chunk__15752_15792;
var G__15798 = count__15753_15793;
var G__15799 = (i__15754_15794 + (1));
seq__15751_15791 = G__15796;
chunk__15752_15792 = G__15797;
count__15753_15793 = G__15798;
i__15754_15794 = G__15799;
continue;
} else {
var temp__4425__auto___15800__$1 = cljs.core.seq.call(null,seq__15751_15791);
if(temp__4425__auto___15800__$1){
var seq__15751_15801__$1 = temp__4425__auto___15800__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15751_15801__$1)){
var c__5364__auto___15802 = cljs.core.chunk_first.call(null,seq__15751_15801__$1);
var G__15803 = cljs.core.chunk_rest.call(null,seq__15751_15801__$1);
var G__15804 = c__5364__auto___15802;
var G__15805 = cljs.core.count.call(null,c__5364__auto___15802);
var G__15806 = (0);
seq__15751_15791 = G__15803;
chunk__15752_15792 = G__15804;
count__15753_15793 = G__15805;
i__15754_15794 = G__15806;
continue;
} else {
var h_val_15807 = cljs.core.first.call(null,seq__15751_15801__$1);
xhr.headers.set(h_name,h_val_15807);

var G__15808 = cljs.core.next.call(null,seq__15751_15801__$1);
var G__15809 = null;
var G__15810 = (0);
var G__15811 = (0);
seq__15751_15791 = G__15808;
chunk__15752_15792 = G__15809;
count__15753_15793 = G__15810;
i__15754_15794 = G__15811;
continue;
}
} else {
}
}
break;
}

var G__15812 = cljs.core.next.call(null,seq__15750__$1);
var G__15813 = null;
var G__15814 = (0);
var G__15815 = (0);
seq__15750 = G__15812;
chunk__15755 = G__15813;
count__15756 = G__15814;
i__15757 = G__15815;
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
return xhr.setResponseType((function (){var G__15817 = response_type;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"array-buffer","array-buffer",519008380),G__15817)){
return goog.net.XhrIo.ResponseType.ARRAY_BUFFER;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"blob","blob",1636965233),G__15817)){
return goog.net.XhrIo.ResponseType.BLOB;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"document","document",-1329188687),G__15817)){
return goog.net.XhrIo.ResponseType.DOCUMENT;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"text","text",-1790561697),G__15817)){
return goog.net.XhrIo.ResponseType.TEXT;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"default","default",-1987822328),G__15817)){
return goog.net.XhrIo.ResponseType.DEFAULT;
} else {
if(cljs.core._EQ_.call(null,null,G__15817)){
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
cljs_http.core.build_xhr = (function cljs_http$core$build_xhr(p__15818){
var map__15822 = p__15818;
var map__15822__$1 = ((((!((map__15822 == null)))?((((map__15822.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15822.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15822):map__15822);
var request = map__15822__$1;
var with_credentials_QMARK_ = cljs.core.get.call(null,map__15822__$1,new cljs.core.Keyword(null,"with-credentials?","with-credentials?",-1773202222));
var default_headers = cljs.core.get.call(null,map__15822__$1,new cljs.core.Keyword(null,"default-headers","default-headers",-43146094));
var response_type = cljs.core.get.call(null,map__15822__$1,new cljs.core.Keyword(null,"response-type","response-type",-1493770458));
var timeout = (function (){var or__4561__auto__ = new cljs.core.Keyword(null,"timeout","timeout",-318625318).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__4561__auto__)){
return or__4561__auto__;
} else {
return (0);
}
})();
var send_credentials = (((with_credentials_QMARK_ == null))?true:with_credentials_QMARK_);
var G__15824 = (new goog.net.XhrIo());
cljs_http.core.apply_default_headers_BANG_.call(null,G__15824,default_headers);

cljs_http.core.apply_response_type_BANG_.call(null,G__15824,response_type);

G__15824.setTimeoutInterval(timeout);

G__15824.setWithCredentials(send_credentials);

return G__15824;
});
cljs_http.core.error_kw = cljs.core.PersistentHashMap.fromArrays([(0),(7),(1),(4),(6),(3),(2),(9),(5),(8)],[new cljs.core.Keyword(null,"no-error","no-error",1984610064),new cljs.core.Keyword(null,"abort","abort",521193198),new cljs.core.Keyword(null,"access-denied","access-denied",959449406),new cljs.core.Keyword(null,"custom-error","custom-error",-1565161123),new cljs.core.Keyword(null,"http-error","http-error",-1040049553),new cljs.core.Keyword(null,"ff-silent-error","ff-silent-error",189390514),new cljs.core.Keyword(null,"file-not-found","file-not-found",-65398940),new cljs.core.Keyword(null,"offline","offline",-107631935),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"timeout","timeout",-318625318)]);
/**
 * Execute the HTTP request corresponding to the given Ring request
 *   map and return a core.async channel.
 */
cljs_http.core.xhr = (function cljs_http$core$xhr(p__15825){
var map__15852 = p__15825;
var map__15852__$1 = ((((!((map__15852 == null)))?((((map__15852.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15852.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15852):map__15852);
var request = map__15852__$1;
var request_method = cljs.core.get.call(null,map__15852__$1,new cljs.core.Keyword(null,"request-method","request-method",1764796830));
var headers = cljs.core.get.call(null,map__15852__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var body = cljs.core.get.call(null,map__15852__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var with_credentials_QMARK_ = cljs.core.get.call(null,map__15852__$1,new cljs.core.Keyword(null,"with-credentials?","with-credentials?",-1773202222));
var cancel = cljs.core.get.call(null,map__15852__$1,new cljs.core.Keyword(null,"cancel","cancel",-1964088360));
var channel = cljs.core.async.chan.call(null);
var request_url = cljs_http.util.build_url.call(null,request);
var method = cljs.core.name.call(null,(function (){var or__4561__auto__ = request_method;
if(cljs.core.truth_(or__4561__auto__)){
return or__4561__auto__;
} else {
return new cljs.core.Keyword(null,"get","get",1683182755);
}
})());
var headers__$1 = cljs_http.util.build_headers.call(null,headers);
var xhr__$1 = cljs_http.core.build_xhr.call(null,request);
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.assoc,channel,xhr__$1);

xhr__$1.listen(goog.net.EventType.COMPLETE,((function (channel,request_url,method,headers__$1,xhr__$1,map__15852,map__15852__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
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
});})(channel,request_url,method,headers__$1,xhr__$1,map__15852,map__15852__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
);

xhr__$1.send(request_url,method,body,headers__$1);

if(cljs.core.truth_(cancel)){
var c__8054__auto___15878 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto___15878,channel,request_url,method,headers__$1,xhr__$1,map__15852,map__15852__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto___15878,channel,request_url,method,headers__$1,xhr__$1,map__15852,map__15852__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function (state_15864){
var state_val_15865 = (state_15864[(1)]);
if((state_val_15865 === (1))){
var state_15864__$1 = state_15864;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15864__$1,(2),cancel);
} else {
if((state_val_15865 === (2))){
var inst_15855 = (state_15864[(2)]);
var inst_15856 = xhr__$1.isComplete();
var inst_15857 = cljs.core.not.call(null,inst_15856);
var state_15864__$1 = (function (){var statearr_15866 = state_15864;
(statearr_15866[(7)] = inst_15855);

return statearr_15866;
})();
if(inst_15857){
var statearr_15867_15879 = state_15864__$1;
(statearr_15867_15879[(1)] = (3));

} else {
var statearr_15868_15880 = state_15864__$1;
(statearr_15868_15880[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15865 === (3))){
var inst_15859 = xhr__$1.abort();
var state_15864__$1 = state_15864;
var statearr_15869_15881 = state_15864__$1;
(statearr_15869_15881[(2)] = inst_15859);

(statearr_15869_15881[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15865 === (4))){
var state_15864__$1 = state_15864;
var statearr_15870_15882 = state_15864__$1;
(statearr_15870_15882[(2)] = null);

(statearr_15870_15882[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15865 === (5))){
var inst_15862 = (state_15864[(2)]);
var state_15864__$1 = state_15864;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15864__$1,inst_15862);
} else {
return null;
}
}
}
}
}
});})(c__8054__auto___15878,channel,request_url,method,headers__$1,xhr__$1,map__15852,map__15852__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
;
return ((function (switch__7989__auto__,c__8054__auto___15878,channel,request_url,method,headers__$1,xhr__$1,map__15852,map__15852__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function() {
var cljs_http$core$xhr_$_state_machine__7990__auto__ = null;
var cljs_http$core$xhr_$_state_machine__7990__auto____0 = (function (){
var statearr_15874 = [null,null,null,null,null,null,null,null];
(statearr_15874[(0)] = cljs_http$core$xhr_$_state_machine__7990__auto__);

(statearr_15874[(1)] = (1));

return statearr_15874;
});
var cljs_http$core$xhr_$_state_machine__7990__auto____1 = (function (state_15864){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_15864);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e15875){if((e15875 instanceof Object)){
var ex__7993__auto__ = e15875;
var statearr_15876_15883 = state_15864;
(statearr_15876_15883[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15864);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e15875;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15884 = state_15864;
state_15864 = G__15884;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs_http$core$xhr_$_state_machine__7990__auto__ = function(state_15864){
switch(arguments.length){
case 0:
return cljs_http$core$xhr_$_state_machine__7990__auto____0.call(this);
case 1:
return cljs_http$core$xhr_$_state_machine__7990__auto____1.call(this,state_15864);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs_http$core$xhr_$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs_http$core$xhr_$_state_machine__7990__auto____0;
cljs_http$core$xhr_$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs_http$core$xhr_$_state_machine__7990__auto____1;
return cljs_http$core$xhr_$_state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto___15878,channel,request_url,method,headers__$1,xhr__$1,map__15852,map__15852__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
})();
var state__8056__auto__ = (function (){var statearr_15877 = f__8055__auto__.call(null);
(statearr_15877[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto___15878);

return statearr_15877;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto___15878,channel,request_url,method,headers__$1,xhr__$1,map__15852,map__15852__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
);

} else {
}

return channel;
});
/**
 * Execute the JSONP request corresponding to the given Ring request
 *   map and return a core.async channel.
 */
cljs_http.core.jsonp = (function cljs_http$core$jsonp(p__15885){
var map__15902 = p__15885;
var map__15902__$1 = ((((!((map__15902 == null)))?((((map__15902.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15902.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15902):map__15902);
var request = map__15902__$1;
var timeout = cljs.core.get.call(null,map__15902__$1,new cljs.core.Keyword(null,"timeout","timeout",-318625318));
var callback_name = cljs.core.get.call(null,map__15902__$1,new cljs.core.Keyword(null,"callback-name","callback-name",336964714));
var cancel = cljs.core.get.call(null,map__15902__$1,new cljs.core.Keyword(null,"cancel","cancel",-1964088360));
var channel = cljs.core.async.chan.call(null);
var jsonp__$1 = (new goog.net.Jsonp(cljs_http.util.build_url.call(null,request),callback_name));
jsonp__$1.setRequestTimeout(timeout);

var req_15918 = jsonp__$1.send(null,((function (channel,jsonp__$1,map__15902,map__15902__$1,request,timeout,callback_name,cancel){
return (function cljs_http$core$jsonp_$_success_callback(data){
var response = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),(200),new cljs.core.Keyword(null,"success","success",1890645906),true,new cljs.core.Keyword(null,"body","body",-2049205669),cljs.core.js__GT_clj.call(null,data,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true)], null);
cljs.core.async.put_BANG_.call(null,channel,response);

cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

if(cljs.core.truth_(cancel)){
cljs.core.async.close_BANG_.call(null,cancel);
} else {
}

return cljs.core.async.close_BANG_.call(null,channel);
});})(channel,jsonp__$1,map__15902,map__15902__$1,request,timeout,callback_name,cancel))
,((function (channel,jsonp__$1,map__15902,map__15902__$1,request,timeout,callback_name,cancel){
return (function cljs_http$core$jsonp_$_error_callback(){
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

if(cljs.core.truth_(cancel)){
cljs.core.async.close_BANG_.call(null,cancel);
} else {
}

return cljs.core.async.close_BANG_.call(null,channel);
});})(channel,jsonp__$1,map__15902,map__15902__$1,request,timeout,callback_name,cancel))
);
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.assoc,channel,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"jsonp","jsonp",226119588),jsonp__$1,new cljs.core.Keyword(null,"request","request",1772954723),req_15918], null));

if(cljs.core.truth_(cancel)){
var c__8054__auto___15919 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto___15919,req_15918,channel,jsonp__$1,map__15902,map__15902__$1,request,timeout,callback_name,cancel){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto___15919,req_15918,channel,jsonp__$1,map__15902,map__15902__$1,request,timeout,callback_name,cancel){
return (function (state_15908){
var state_val_15909 = (state_15908[(1)]);
if((state_val_15909 === (1))){
var state_15908__$1 = state_15908;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15908__$1,(2),cancel);
} else {
if((state_val_15909 === (2))){
var inst_15905 = (state_15908[(2)]);
var inst_15906 = jsonp__$1.cancel(req_15918);
var state_15908__$1 = (function (){var statearr_15910 = state_15908;
(statearr_15910[(7)] = inst_15905);

return statearr_15910;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15908__$1,inst_15906);
} else {
return null;
}
}
});})(c__8054__auto___15919,req_15918,channel,jsonp__$1,map__15902,map__15902__$1,request,timeout,callback_name,cancel))
;
return ((function (switch__7989__auto__,c__8054__auto___15919,req_15918,channel,jsonp__$1,map__15902,map__15902__$1,request,timeout,callback_name,cancel){
return (function() {
var cljs_http$core$jsonp_$_state_machine__7990__auto__ = null;
var cljs_http$core$jsonp_$_state_machine__7990__auto____0 = (function (){
var statearr_15914 = [null,null,null,null,null,null,null,null];
(statearr_15914[(0)] = cljs_http$core$jsonp_$_state_machine__7990__auto__);

(statearr_15914[(1)] = (1));

return statearr_15914;
});
var cljs_http$core$jsonp_$_state_machine__7990__auto____1 = (function (state_15908){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_15908);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e15915){if((e15915 instanceof Object)){
var ex__7993__auto__ = e15915;
var statearr_15916_15920 = state_15908;
(statearr_15916_15920[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15908);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e15915;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15921 = state_15908;
state_15908 = G__15921;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs_http$core$jsonp_$_state_machine__7990__auto__ = function(state_15908){
switch(arguments.length){
case 0:
return cljs_http$core$jsonp_$_state_machine__7990__auto____0.call(this);
case 1:
return cljs_http$core$jsonp_$_state_machine__7990__auto____1.call(this,state_15908);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs_http$core$jsonp_$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs_http$core$jsonp_$_state_machine__7990__auto____0;
cljs_http$core$jsonp_$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs_http$core$jsonp_$_state_machine__7990__auto____1;
return cljs_http$core$jsonp_$_state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto___15919,req_15918,channel,jsonp__$1,map__15902,map__15902__$1,request,timeout,callback_name,cancel))
})();
var state__8056__auto__ = (function (){var statearr_15917 = f__8055__auto__.call(null);
(statearr_15917[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto___15919);

return statearr_15917;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto___15919,req_15918,channel,jsonp__$1,map__15902,map__15902__$1,request,timeout,callback_name,cancel))
);

} else {
}

return channel;
});
/**
 * Execute the HTTP request corresponding to the given Ring request
 *   map and return a core.async channel.
 */
cljs_http.core.request = (function cljs_http$core$request(p__15922){
var map__15925 = p__15922;
var map__15925__$1 = ((((!((map__15925 == null)))?((((map__15925.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15925.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15925):map__15925);
var request__$1 = map__15925__$1;
var request_method = cljs.core.get.call(null,map__15925__$1,new cljs.core.Keyword(null,"request-method","request-method",1764796830));
if(cljs.core._EQ_.call(null,request_method,new cljs.core.Keyword(null,"jsonp","jsonp",226119588))){
return cljs_http.core.jsonp.call(null,request__$1);
} else {
return cljs_http.core.xhr.call(null,request__$1);
}
});

//# sourceMappingURL=core.js.map