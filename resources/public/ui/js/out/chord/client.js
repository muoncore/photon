// Compiled by ClojureScript 1.7.122 {}
goog.provide('chord.client');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('chord.channels');
goog.require('chord.format');
chord.client.on_close = (function chord$client$on_close(var_args){
var args__5626__auto__ = [];
var len__5619__auto___14294 = arguments.length;
var i__5620__auto___14295 = (0);
while(true){
if((i__5620__auto___14295 < len__5619__auto___14294)){
args__5626__auto__.push((arguments[i__5620__auto___14295]));

var G__14296 = (i__5620__auto___14295 + (1));
i__5620__auto___14295 = G__14296;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((3) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((3)),(0))):null);
return chord.client.on_close.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5627__auto__);
});

chord.client.on_close.cljs$core$IFn$_invoke$arity$variadic = (function (ws,read_ch,write_ch,p__14221){
var vec__14222 = p__14221;
var err_meta_channel = cljs.core.nth.call(null,vec__14222,(0),null);
return ws.onclose = ((function (vec__14222,err_meta_channel){
return (function (ev){
var c__8054__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto__,vec__14222,err_meta_channel){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto__,vec__14222,err_meta_channel){
return (function (state_14261){
var state_val_14262 = (state_14261[(1)]);
if((state_val_14262 === (7))){
var inst_14257 = (state_14261[(2)]);
var inst_14258 = cljs.core.async.close_BANG_.call(null,read_ch);
var inst_14259 = cljs.core.async.close_BANG_.call(null,write_ch);
var state_14261__$1 = (function (){var statearr_14263 = state_14261;
(statearr_14263[(7)] = inst_14258);

(statearr_14263[(8)] = inst_14257);

return statearr_14263;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14261__$1,inst_14259);
} else {
if((state_val_14262 === (1))){
var inst_14223 = (state_14261[(9)]);
var inst_14223__$1 = ws.error_seen;
var state_14261__$1 = (function (){var statearr_14264 = state_14261;
(statearr_14264[(9)] = inst_14223__$1);

return statearr_14264;
})();
if(cljs.core.truth_(inst_14223__$1)){
var statearr_14265_14297 = state_14261__$1;
(statearr_14265_14297[(1)] = (2));

} else {
var statearr_14266_14298 = state_14261__$1;
(statearr_14266_14298[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14262 === (4))){
var inst_14229 = (state_14261[(2)]);
var state_14261__$1 = state_14261;
if(cljs.core.truth_(inst_14229)){
var statearr_14267_14299 = state_14261__$1;
(statearr_14267_14299[(1)] = (5));

} else {
var statearr_14268_14300 = state_14261__$1;
(statearr_14268_14300[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14262 === (6))){
var state_14261__$1 = state_14261;
var statearr_14269_14301 = state_14261__$1;
(statearr_14269_14301[(2)] = null);

(statearr_14269_14301[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14262 === (3))){
var inst_14226 = ev.wasClean;
var inst_14227 = cljs.core.not.call(null,inst_14226);
var state_14261__$1 = state_14261;
var statearr_14270_14302 = state_14261__$1;
(statearr_14270_14302[(2)] = inst_14227);

(statearr_14270_14302[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14262 === (12))){
var inst_14254 = (state_14261[(2)]);
var state_14261__$1 = state_14261;
var statearr_14271_14303 = state_14261__$1;
(statearr_14271_14303[(2)] = inst_14254);

(statearr_14271_14303[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14262 === (2))){
var inst_14223 = (state_14261[(9)]);
var state_14261__$1 = state_14261;
var statearr_14272_14304 = state_14261__$1;
(statearr_14272_14304[(2)] = inst_14223);

(statearr_14272_14304[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14262 === (11))){
var inst_14249 = (state_14261[(2)]);
var state_14261__$1 = state_14261;
var statearr_14273_14305 = state_14261__$1;
(statearr_14273_14305[(2)] = inst_14249);

(statearr_14273_14305[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14262 === (9))){
var state_14261__$1 = state_14261;
var statearr_14274_14306 = state_14261__$1;
(statearr_14274_14306[(2)] = null);

(statearr_14274_14306[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14262 === (5))){
var inst_14231 = [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"code","code",1586293142),new cljs.core.Keyword(null,"wasClean","wasClean",-1404940601)];
var inst_14232 = ev.reason;
var inst_14233 = ev.code;
var inst_14234 = ev.wasClean;
var inst_14235 = [inst_14232,inst_14233,inst_14234];
var inst_14236 = cljs.core.PersistentHashMap.fromArrays(inst_14231,inst_14235);
var state_14261__$1 = (function (){var statearr_14275 = state_14261;
(statearr_14275[(10)] = inst_14236);

return statearr_14275;
})();
if(cljs.core.truth_(err_meta_channel)){
var statearr_14276_14307 = state_14261__$1;
(statearr_14276_14307[(1)] = (8));

} else {
var statearr_14277_14308 = state_14261__$1;
(statearr_14277_14308[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14262 === (10))){
var inst_14236 = (state_14261[(10)]);
var inst_14252 = (state_14261[(2)]);
var state_14261__$1 = (function (){var statearr_14278 = state_14261;
(statearr_14278[(11)] = inst_14252);

return statearr_14278;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14261__$1,(12),read_ch,inst_14236);
} else {
if((state_val_14262 === (8))){
var inst_14223 = (state_14261[(9)]);
var inst_14236 = (state_14261[(10)]);
var inst_14241 = cljs.core.async.chan.call(null,(1));
var inst_14242 = (function (){var error_seen_QMARK_ = inst_14223;
var error_desc = inst_14236;
var c__8054__auto____$1 = inst_14241;
return ((function (error_seen_QMARK_,error_desc,c__8054__auto____$1,inst_14223,inst_14236,inst_14241,state_val_14262,c__8054__auto__,vec__14222,err_meta_channel){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (error_seen_QMARK_,error_desc,c__8054__auto____$1,inst_14223,inst_14236,inst_14241,state_val_14262,c__8054__auto__,vec__14222,err_meta_channel){
return (function (state_14239){
var state_val_14240 = (state_14239[(1)]);
if((state_val_14240 === (1))){
var state_14239__$1 = state_14239;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14239__$1,error_desc);
} else {
return null;
}
});})(error_seen_QMARK_,error_desc,c__8054__auto____$1,inst_14223,inst_14236,inst_14241,state_val_14262,c__8054__auto__,vec__14222,err_meta_channel))
;
return ((function (switch__7989__auto__,error_seen_QMARK_,error_desc,c__8054__auto____$1,inst_14223,inst_14236,inst_14241,state_val_14262,c__8054__auto__,vec__14222,err_meta_channel){
return (function() {
var chord$client$state_machine__7990__auto__ = null;
var chord$client$state_machine__7990__auto____0 = (function (){
var statearr_14282 = [null,null,null,null,null,null,null];
(statearr_14282[(0)] = chord$client$state_machine__7990__auto__);

(statearr_14282[(1)] = (1));

return statearr_14282;
});
var chord$client$state_machine__7990__auto____1 = (function (state_14239){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_14239);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e14283){if((e14283 instanceof Object)){
var ex__7993__auto__ = e14283;
var statearr_14284_14309 = state_14239;
(statearr_14284_14309[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14239);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e14283;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__14310 = state_14239;
state_14239 = G__14310;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
chord$client$state_machine__7990__auto__ = function(state_14239){
switch(arguments.length){
case 0:
return chord$client$state_machine__7990__auto____0.call(this);
case 1:
return chord$client$state_machine__7990__auto____1.call(this,state_14239);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chord$client$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = chord$client$state_machine__7990__auto____0;
chord$client$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = chord$client$state_machine__7990__auto____1;
return chord$client$state_machine__7990__auto__;
})()
;})(switch__7989__auto__,error_seen_QMARK_,error_desc,c__8054__auto____$1,inst_14223,inst_14236,inst_14241,state_val_14262,c__8054__auto__,vec__14222,err_meta_channel))
})();
var state__8056__auto__ = (function (){var statearr_14285 = f__8055__auto__.call(null);
(statearr_14285[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto____$1);

return statearr_14285;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});
;})(error_seen_QMARK_,error_desc,c__8054__auto____$1,inst_14223,inst_14236,inst_14241,state_val_14262,c__8054__auto__,vec__14222,err_meta_channel))
})();
var inst_14243 = cljs.core.async.impl.dispatch.run.call(null,inst_14242);
var inst_14245 = cljs.core.async.chan.call(null);
var inst_14246 = cljs.core.async.close_BANG_.call(null,inst_14245);
var inst_14247 = chord.channels.bidi_ch.call(null,inst_14241,inst_14245);
var state_14261__$1 = (function (){var statearr_14286 = state_14261;
(statearr_14286[(12)] = inst_14246);

(statearr_14286[(13)] = inst_14243);

return statearr_14286;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14261__$1,(11),err_meta_channel,inst_14247);
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
});})(c__8054__auto__,vec__14222,err_meta_channel))
;
return ((function (switch__7989__auto__,c__8054__auto__,vec__14222,err_meta_channel){
return (function() {
var chord$client$state_machine__7990__auto__ = null;
var chord$client$state_machine__7990__auto____0 = (function (){
var statearr_14290 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_14290[(0)] = chord$client$state_machine__7990__auto__);

(statearr_14290[(1)] = (1));

return statearr_14290;
});
var chord$client$state_machine__7990__auto____1 = (function (state_14261){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_14261);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e14291){if((e14291 instanceof Object)){
var ex__7993__auto__ = e14291;
var statearr_14292_14311 = state_14261;
(statearr_14292_14311[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14261);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e14291;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__14312 = state_14261;
state_14261 = G__14312;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
chord$client$state_machine__7990__auto__ = function(state_14261){
switch(arguments.length){
case 0:
return chord$client$state_machine__7990__auto____0.call(this);
case 1:
return chord$client$state_machine__7990__auto____1.call(this,state_14261);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chord$client$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = chord$client$state_machine__7990__auto____0;
chord$client$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = chord$client$state_machine__7990__auto____1;
return chord$client$state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto__,vec__14222,err_meta_channel))
})();
var state__8056__auto__ = (function (){var statearr_14293 = f__8055__auto__.call(null);
(statearr_14293[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto__);

return statearr_14293;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto__,vec__14222,err_meta_channel))
);

return c__8054__auto__;
});})(vec__14222,err_meta_channel))
;
});

chord.client.on_close.cljs$lang$maxFixedArity = (3);

chord.client.on_close.cljs$lang$applyTo = (function (seq14217){
var G__14218 = cljs.core.first.call(null,seq14217);
var seq14217__$1 = cljs.core.next.call(null,seq14217);
var G__14219 = cljs.core.first.call(null,seq14217__$1);
var seq14217__$2 = cljs.core.next.call(null,seq14217__$1);
var G__14220 = cljs.core.first.call(null,seq14217__$2);
var seq14217__$3 = cljs.core.next.call(null,seq14217__$2);
return chord.client.on_close.cljs$core$IFn$_invoke$arity$variadic(G__14218,G__14219,G__14220,seq14217__$3);
});
chord.client.make_open_ch = (function chord$client$make_open_ch(ws,read_ch,write_ch,v){
var ch = cljs.core.async.chan.call(null);
chord.client.on_close.call(null,ws,read_ch,write_ch,ch);

ws.onopen = ((function (ch){
return (function (){
var c__8054__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto__,ch){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto__,ch){
return (function (state_14331){
var state_val_14332 = (state_14331[(1)]);
if((state_val_14332 === (1))){
var state_14331__$1 = state_14331;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14331__$1,(2),ch,v);
} else {
if((state_val_14332 === (2))){
var inst_14328 = (state_14331[(2)]);
var inst_14329 = cljs.core.async.close_BANG_.call(null,ch);
var state_14331__$1 = (function (){var statearr_14333 = state_14331;
(statearr_14333[(7)] = inst_14328);

return statearr_14333;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14331__$1,inst_14329);
} else {
return null;
}
}
});})(c__8054__auto__,ch))
;
return ((function (switch__7989__auto__,c__8054__auto__,ch){
return (function() {
var chord$client$make_open_ch_$_state_machine__7990__auto__ = null;
var chord$client$make_open_ch_$_state_machine__7990__auto____0 = (function (){
var statearr_14337 = [null,null,null,null,null,null,null,null];
(statearr_14337[(0)] = chord$client$make_open_ch_$_state_machine__7990__auto__);

(statearr_14337[(1)] = (1));

return statearr_14337;
});
var chord$client$make_open_ch_$_state_machine__7990__auto____1 = (function (state_14331){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_14331);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e14338){if((e14338 instanceof Object)){
var ex__7993__auto__ = e14338;
var statearr_14339_14341 = state_14331;
(statearr_14339_14341[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14331);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e14338;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__14342 = state_14331;
state_14331 = G__14342;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
chord$client$make_open_ch_$_state_machine__7990__auto__ = function(state_14331){
switch(arguments.length){
case 0:
return chord$client$make_open_ch_$_state_machine__7990__auto____0.call(this);
case 1:
return chord$client$make_open_ch_$_state_machine__7990__auto____1.call(this,state_14331);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chord$client$make_open_ch_$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = chord$client$make_open_ch_$_state_machine__7990__auto____0;
chord$client$make_open_ch_$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = chord$client$make_open_ch_$_state_machine__7990__auto____1;
return chord$client$make_open_ch_$_state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto__,ch))
})();
var state__8056__auto__ = (function (){var statearr_14340 = f__8055__auto__.call(null);
(statearr_14340[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto__);

return statearr_14340;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto__,ch))
);

return c__8054__auto__;
});})(ch))
;

return ch;
});
chord.client.close_event__GT_maybe_error = (function chord$client$close_event__GT_maybe_error(ev){
if(cljs.core.truth_(ev.wasClean)){
return null;
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"reason","reason",-2070751759),ev.reason,new cljs.core.Keyword(null,"code","code",1586293142),ev.code], null);
}
});
/**
 * Creates websockets connection and returns a 2-sided channel when the websocket is opened.
 * Arguments:
 *  ws-url           - (required) link to websocket service
 *  opts             - (optional) map to configure reading/writing channels
 *    :read-ch       - (optional) (possibly buffered) channel to use for reading the websocket
 *    :write-ch      - (optional) (possibly buffered) channel to use for writing to the websocket
 *    :format        - (optional) data format to use on the channel, (at the moment)
 *                                either :edn (default), :json, :json-kw or :str.
 * 
 * Usage:
 *  (:require [cljs.core.async :as a])
 * 
 * 
 *  (a/<! (ws-ch "ws://127.0.0.1:6437"))
 * 
 *  (a/<! (ws-ch "ws://127.0.0.1:6437" {:read-ch (a/chan (a/sliding-buffer 10))}))
 * 
 *  (a/<! (ws-ch "ws://127.0.0.1:6437" {:read-ch (a/chan (a/sliding-buffer 10))
 *                                        :write-ch (a/chan (a/dropping-buffer 10))}))
 */
chord.client.ws_ch = (function chord$client$ws_ch(var_args){
var args__5626__auto__ = [];
var len__5619__auto___14449 = arguments.length;
var i__5620__auto___14450 = (0);
while(true){
if((i__5620__auto___14450 < len__5619__auto___14449)){
args__5626__auto__.push((arguments[i__5620__auto___14450]));

var G__14451 = (i__5620__auto___14450 + (1));
i__5620__auto___14450 = G__14451;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return chord.client.ws_ch.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

chord.client.ws_ch.cljs$core$IFn$_invoke$arity$variadic = (function (ws_url,p__14347){
var vec__14348 = p__14347;
var map__14349 = cljs.core.nth.call(null,vec__14348,(0),null);
var map__14349__$1 = ((((!((map__14349 == null)))?((((map__14349.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14349.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14349):map__14349);
var opts = map__14349__$1;
var read_ch = cljs.core.get.call(null,map__14349__$1,new cljs.core.Keyword(null,"read-ch","read-ch",-38486414));
var write_ch = cljs.core.get.call(null,map__14349__$1,new cljs.core.Keyword(null,"write-ch","write-ch",-1766585599));
var format = cljs.core.get.call(null,map__14349__$1,new cljs.core.Keyword(null,"format","format",-1306924766));
var web_socket = (new WebSocket(ws_url));
var map__14351 = chord.format.wrap_format.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"read-ch","read-ch",-38486414),(function (){var or__4561__auto__ = read_ch;
if(cljs.core.truth_(or__4561__auto__)){
return or__4561__auto__;
} else {
return cljs.core.async.chan.call(null);
}
})(),new cljs.core.Keyword(null,"write-ch","write-ch",-1766585599),(function (){var or__4561__auto__ = write_ch;
if(cljs.core.truth_(or__4561__auto__)){
return or__4561__auto__;
} else {
return cljs.core.async.chan.call(null);
}
})()], null),opts);
var map__14351__$1 = ((((!((map__14351 == null)))?((((map__14351.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14351.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14351):map__14351);
var read_ch__$1 = cljs.core.get.call(null,map__14351__$1,new cljs.core.Keyword(null,"read-ch","read-ch",-38486414));
var write_ch__$1 = cljs.core.get.call(null,map__14351__$1,new cljs.core.Keyword(null,"write-ch","write-ch",-1766585599));
var open_ch = cljs.core.async.chan.call(null);
var close_ch = cljs.core.async.chan.call(null);
web_socket.binaryType = "arraybuffer";

chord.channels.read_from_ws_BANG_.call(null,web_socket,read_ch__$1);

chord.channels.write_to_ws_BANG_.call(null,web_socket,write_ch__$1);

web_socket.onopen = ((function (web_socket,map__14351,map__14351__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__14348,map__14349,map__14349__$1,opts,read_ch,write_ch,format){
return (function (p1__14343_SHARP_){
return cljs.core.async.put_BANG_.call(null,open_ch,p1__14343_SHARP_);
});})(web_socket,map__14351,map__14351__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__14348,map__14349,map__14349__$1,opts,read_ch,write_ch,format))
;

web_socket.onclose = ((function (web_socket,map__14351,map__14351__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__14348,map__14349,map__14349__$1,opts,read_ch,write_ch,format){
return (function (p1__14344_SHARP_){
return cljs.core.async.put_BANG_.call(null,close_ch,p1__14344_SHARP_);
});})(web_socket,map__14351,map__14351__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__14348,map__14349,map__14349__$1,opts,read_ch,write_ch,format))
;

var ws_chan = chord.channels.bidi_ch.call(null,read_ch__$1,write_ch__$1,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-close","on-close",-761178394),((function (web_socket,map__14351,map__14351__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__14348,map__14349,map__14349__$1,opts,read_ch,write_ch,format){
return (function (){
return web_socket.close();
});})(web_socket,map__14351,map__14351__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__14348,map__14349,map__14349__$1,opts,read_ch,write_ch,format))
], null));
var initial_ch = cljs.core.async.chan.call(null);
var c__8054__auto___14452 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto___14452,ws_chan,initial_ch,web_socket,map__14351,map__14351__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__14348,map__14349,map__14349__$1,opts,read_ch,write_ch,format){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto___14452,ws_chan,initial_ch,web_socket,map__14351,map__14351__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__14348,map__14349,map__14349__$1,opts,read_ch,write_ch,format){
return (function (state_14412){
var state_val_14413 = (state_14412[(1)]);
if((state_val_14413 === (7))){
var inst_14408 = (state_14412[(2)]);
var state_14412__$1 = state_14412;
var statearr_14414_14453 = state_14412__$1;
(statearr_14414_14453[(2)] = inst_14408);

(statearr_14414_14453[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14413 === (20))){
var state_14412__$1 = state_14412;
var statearr_14415_14454 = state_14412__$1;
(statearr_14415_14454[(2)] = null);

(statearr_14415_14454[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14413 === (1))){
var inst_14353 = false;
var state_14412__$1 = (function (){var statearr_14416 = state_14412;
(statearr_14416[(7)] = inst_14353);

return statearr_14416;
})();
var statearr_14417_14455 = state_14412__$1;
(statearr_14417_14455[(2)] = null);

(statearr_14417_14455[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14413 === (4))){
var inst_14366 = (state_14412[(8)]);
var inst_14364 = (state_14412[(9)]);
var inst_14364__$1 = (state_14412[(2)]);
var inst_14365 = cljs.core.nth.call(null,inst_14364__$1,(0),null);
var inst_14366__$1 = cljs.core.nth.call(null,inst_14364__$1,(1),null);
var inst_14367 = cljs.core._EQ_.call(null,inst_14366__$1,open_ch);
var state_14412__$1 = (function (){var statearr_14418 = state_14412;
(statearr_14418[(8)] = inst_14366__$1);

(statearr_14418[(9)] = inst_14364__$1);

(statearr_14418[(10)] = inst_14365);

return statearr_14418;
})();
if(inst_14367){
var statearr_14419_14456 = state_14412__$1;
(statearr_14419_14456[(1)] = (5));

} else {
var statearr_14420_14457 = state_14412__$1;
(statearr_14420_14457[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14413 === (15))){
var inst_14393 = (state_14412[(2)]);
var state_14412__$1 = state_14412;
var statearr_14421_14458 = state_14412__$1;
(statearr_14421_14458[(2)] = inst_14393);

(statearr_14421_14458[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14413 === (21))){
var inst_14404 = (state_14412[(2)]);
var state_14412__$1 = state_14412;
var statearr_14422_14459 = state_14412__$1;
(statearr_14422_14459[(2)] = inst_14404);

(statearr_14422_14459[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14413 === (13))){
var state_14412__$1 = state_14412;
var statearr_14423_14460 = state_14412__$1;
(statearr_14423_14460[(2)] = null);

(statearr_14423_14460[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14413 === (6))){
var inst_14366 = (state_14412[(8)]);
var inst_14379 = cljs.core._EQ_.call(null,inst_14366,close_ch);
var state_14412__$1 = state_14412;
if(inst_14379){
var statearr_14424_14461 = state_14412__$1;
(statearr_14424_14461[(1)] = (9));

} else {
var statearr_14425_14462 = state_14412__$1;
(statearr_14425_14462[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14413 === (17))){
var state_14412__$1 = state_14412;
var statearr_14426_14463 = state_14412__$1;
(statearr_14426_14463[(2)] = initial_ch);

(statearr_14426_14463[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14413 === (3))){
var inst_14410 = (state_14412[(2)]);
var state_14412__$1 = state_14412;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14412__$1,inst_14410);
} else {
if((state_val_14413 === (12))){
var inst_14353 = (state_14412[(7)]);
var state_14412__$1 = state_14412;
if(cljs.core.truth_(inst_14353)){
var statearr_14427_14464 = state_14412__$1;
(statearr_14427_14464[(1)] = (16));

} else {
var statearr_14428_14465 = state_14412__$1;
(statearr_14428_14465[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14413 === (2))){
var inst_14360 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_14361 = [open_ch,close_ch];
var inst_14362 = (new cljs.core.PersistentVector(null,2,(5),inst_14360,inst_14361,null));
var state_14412__$1 = state_14412;
return cljs.core.async.ioc_alts_BANG_.call(null,state_14412__$1,(4),inst_14362);
} else {
if((state_val_14413 === (19))){
var inst_14365 = (state_14412[(10)]);
var state_14412__$1 = state_14412;
var statearr_14429_14466 = state_14412__$1;
(statearr_14429_14466[(2)] = inst_14365);

(statearr_14429_14466[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14413 === (11))){
var inst_14406 = (state_14412[(2)]);
var state_14412__$1 = state_14412;
var statearr_14430_14467 = state_14412__$1;
(statearr_14430_14467[(2)] = inst_14406);

(statearr_14430_14467[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14413 === (9))){
var inst_14383 = (state_14412[(11)]);
var inst_14364 = (state_14412[(9)]);
var inst_14382 = cljs.core.nth.call(null,inst_14364,(0),null);
var inst_14383__$1 = chord.client.close_event__GT_maybe_error.call(null,inst_14382);
var state_14412__$1 = (function (){var statearr_14431 = state_14412;
(statearr_14431[(11)] = inst_14383__$1);

return statearr_14431;
})();
if(cljs.core.truth_(inst_14383__$1)){
var statearr_14432_14468 = state_14412__$1;
(statearr_14432_14468[(1)] = (12));

} else {
var statearr_14433_14469 = state_14412__$1;
(statearr_14433_14469[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14413 === (5))){
var inst_14364 = (state_14412[(9)]);
var inst_14370 = cljs.core.nth.call(null,inst_14364,(0),null);
var inst_14371 = [new cljs.core.Keyword(null,"ws-channel","ws-channel",1643892174)];
var inst_14372 = [ws_chan];
var inst_14373 = cljs.core.PersistentHashMap.fromArrays(inst_14371,inst_14372);
var state_14412__$1 = (function (){var statearr_14434 = state_14412;
(statearr_14434[(12)] = inst_14370);

return statearr_14434;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14412__$1,(8),initial_ch,inst_14373);
} else {
if((state_val_14413 === (14))){
var inst_14396 = (state_14412[(2)]);
var inst_14397 = cljs.core.async.close_BANG_.call(null,ws_chan);
var inst_14398 = cljs.core.async.close_BANG_.call(null,initial_ch);
var state_14412__$1 = (function (){var statearr_14435 = state_14412;
(statearr_14435[(13)] = inst_14396);

(statearr_14435[(14)] = inst_14397);

return statearr_14435;
})();
var statearr_14436_14470 = state_14412__$1;
(statearr_14436_14470[(2)] = inst_14398);

(statearr_14436_14470[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14413 === (16))){
var state_14412__$1 = state_14412;
var statearr_14437_14471 = state_14412__$1;
(statearr_14437_14471[(2)] = read_ch__$1);

(statearr_14437_14471[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14413 === (10))){
var inst_14366 = (state_14412[(8)]);
var inst_14400 = cljs.core._EQ_.call(null,inst_14366,new cljs.core.Keyword(null,"default","default",-1987822328));
var state_14412__$1 = state_14412;
if(inst_14400){
var statearr_14438_14472 = state_14412__$1;
(statearr_14438_14472[(1)] = (19));

} else {
var statearr_14439_14473 = state_14412__$1;
(statearr_14439_14473[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14413 === (18))){
var inst_14383 = (state_14412[(11)]);
var inst_14388 = (state_14412[(2)]);
var inst_14389 = [new cljs.core.Keyword(null,"error","error",-978969032)];
var inst_14390 = [inst_14383];
var inst_14391 = cljs.core.PersistentHashMap.fromArrays(inst_14389,inst_14390);
var state_14412__$1 = state_14412;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14412__$1,(15),inst_14388,inst_14391);
} else {
if((state_val_14413 === (8))){
var inst_14375 = (state_14412[(2)]);
var inst_14376 = cljs.core.async.close_BANG_.call(null,initial_ch);
var inst_14353 = true;
var state_14412__$1 = (function (){var statearr_14440 = state_14412;
(statearr_14440[(7)] = inst_14353);

(statearr_14440[(15)] = inst_14376);

(statearr_14440[(16)] = inst_14375);

return statearr_14440;
})();
var statearr_14441_14474 = state_14412__$1;
(statearr_14441_14474[(2)] = null);

(statearr_14441_14474[(1)] = (2));


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
});})(c__8054__auto___14452,ws_chan,initial_ch,web_socket,map__14351,map__14351__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__14348,map__14349,map__14349__$1,opts,read_ch,write_ch,format))
;
return ((function (switch__7989__auto__,c__8054__auto___14452,ws_chan,initial_ch,web_socket,map__14351,map__14351__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__14348,map__14349,map__14349__$1,opts,read_ch,write_ch,format){
return (function() {
var chord$client$state_machine__7990__auto__ = null;
var chord$client$state_machine__7990__auto____0 = (function (){
var statearr_14445 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_14445[(0)] = chord$client$state_machine__7990__auto__);

(statearr_14445[(1)] = (1));

return statearr_14445;
});
var chord$client$state_machine__7990__auto____1 = (function (state_14412){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_14412);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e14446){if((e14446 instanceof Object)){
var ex__7993__auto__ = e14446;
var statearr_14447_14475 = state_14412;
(statearr_14447_14475[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14412);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e14446;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__14476 = state_14412;
state_14412 = G__14476;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
chord$client$state_machine__7990__auto__ = function(state_14412){
switch(arguments.length){
case 0:
return chord$client$state_machine__7990__auto____0.call(this);
case 1:
return chord$client$state_machine__7990__auto____1.call(this,state_14412);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chord$client$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = chord$client$state_machine__7990__auto____0;
chord$client$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = chord$client$state_machine__7990__auto____1;
return chord$client$state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto___14452,ws_chan,initial_ch,web_socket,map__14351,map__14351__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__14348,map__14349,map__14349__$1,opts,read_ch,write_ch,format))
})();
var state__8056__auto__ = (function (){var statearr_14448 = f__8055__auto__.call(null);
(statearr_14448[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto___14452);

return statearr_14448;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto___14452,ws_chan,initial_ch,web_socket,map__14351,map__14351__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__14348,map__14349,map__14349__$1,opts,read_ch,write_ch,format))
);


return initial_ch;
});

chord.client.ws_ch.cljs$lang$maxFixedArity = (1);

chord.client.ws_ch.cljs$lang$applyTo = (function (seq14345){
var G__14346 = cljs.core.first.call(null,seq14345);
var seq14345__$1 = cljs.core.next.call(null,seq14345);
return chord.client.ws_ch.cljs$core$IFn$_invoke$arity$variadic(G__14346,seq14345__$1);
});

//# sourceMappingURL=client.js.map