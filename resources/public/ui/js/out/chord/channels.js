// Compiled by ClojureScript 1.7.122 {}
goog.provide('chord.channels');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('cljs.core.async.impl.protocols');
chord.channels.read_from_ws_BANG_ = (function chord$channels$read_from_ws_BANG_(ws,ch){
return ws.onmessage = (function (ev){
var message = ev.data;
return cljs.core.async.put_BANG_.call(null,ch,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),message], null));
});
});
chord.channels.write_to_ws_BANG_ = (function chord$channels$write_to_ws_BANG_(ws,ch){
var c__8054__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto__){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto__){
return (function (state_14835){
var state_val_14836 = (state_14835[(1)]);
if((state_val_14836 === (1))){
var state_14835__$1 = state_14835;
var statearr_14837_14852 = state_14835__$1;
(statearr_14837_14852[(2)] = null);

(statearr_14837_14852[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14836 === (2))){
var state_14835__$1 = state_14835;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14835__$1,(4),ch);
} else {
if((state_val_14836 === (3))){
var inst_14833 = (state_14835[(2)]);
var state_14835__$1 = state_14835;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14835__$1,inst_14833);
} else {
if((state_val_14836 === (4))){
var inst_14825 = (state_14835[(7)]);
var inst_14825__$1 = (state_14835[(2)]);
var state_14835__$1 = (function (){var statearr_14838 = state_14835;
(statearr_14838[(7)] = inst_14825__$1);

return statearr_14838;
})();
if(cljs.core.truth_(inst_14825__$1)){
var statearr_14839_14853 = state_14835__$1;
(statearr_14839_14853[(1)] = (5));

} else {
var statearr_14840_14854 = state_14835__$1;
(statearr_14840_14854[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14836 === (5))){
var inst_14825 = (state_14835[(7)]);
var inst_14827 = ws.send(inst_14825);
var state_14835__$1 = (function (){var statearr_14841 = state_14835;
(statearr_14841[(8)] = inst_14827);

return statearr_14841;
})();
var statearr_14842_14855 = state_14835__$1;
(statearr_14842_14855[(2)] = null);

(statearr_14842_14855[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14836 === (6))){
var state_14835__$1 = state_14835;
var statearr_14843_14856 = state_14835__$1;
(statearr_14843_14856[(2)] = null);

(statearr_14843_14856[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14836 === (7))){
var inst_14831 = (state_14835[(2)]);
var state_14835__$1 = state_14835;
var statearr_14844_14857 = state_14835__$1;
(statearr_14844_14857[(2)] = inst_14831);

(statearr_14844_14857[(1)] = (3));


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
});})(c__8054__auto__))
;
return ((function (switch__7989__auto__,c__8054__auto__){
return (function() {
var chord$channels$write_to_ws_BANG__$_state_machine__7990__auto__ = null;
var chord$channels$write_to_ws_BANG__$_state_machine__7990__auto____0 = (function (){
var statearr_14848 = [null,null,null,null,null,null,null,null,null];
(statearr_14848[(0)] = chord$channels$write_to_ws_BANG__$_state_machine__7990__auto__);

(statearr_14848[(1)] = (1));

return statearr_14848;
});
var chord$channels$write_to_ws_BANG__$_state_machine__7990__auto____1 = (function (state_14835){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_14835);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e14849){if((e14849 instanceof Object)){
var ex__7993__auto__ = e14849;
var statearr_14850_14858 = state_14835;
(statearr_14850_14858[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14835);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e14849;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__14859 = state_14835;
state_14835 = G__14859;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
chord$channels$write_to_ws_BANG__$_state_machine__7990__auto__ = function(state_14835){
switch(arguments.length){
case 0:
return chord$channels$write_to_ws_BANG__$_state_machine__7990__auto____0.call(this);
case 1:
return chord$channels$write_to_ws_BANG__$_state_machine__7990__auto____1.call(this,state_14835);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chord$channels$write_to_ws_BANG__$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = chord$channels$write_to_ws_BANG__$_state_machine__7990__auto____0;
chord$channels$write_to_ws_BANG__$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = chord$channels$write_to_ws_BANG__$_state_machine__7990__auto____1;
return chord$channels$write_to_ws_BANG__$_state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto__))
})();
var state__8056__auto__ = (function (){var statearr_14851 = f__8055__auto__.call(null);
(statearr_14851[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto__);

return statearr_14851;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto__))
);

return c__8054__auto__;
});
chord.channels.bidi_ch = (function chord$channels$bidi_ch(var_args){
var args__5626__auto__ = [];
var len__5619__auto___14870 = arguments.length;
var i__5620__auto___14871 = (0);
while(true){
if((i__5620__auto___14871 < len__5619__auto___14870)){
args__5626__auto__.push((arguments[i__5620__auto___14871]));

var G__14872 = (i__5620__auto___14871 + (1));
i__5620__auto___14871 = G__14872;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((2) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((2)),(0))):null);
return chord.channels.bidi_ch.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5627__auto__);
});

chord.channels.bidi_ch.cljs$core$IFn$_invoke$arity$variadic = (function (read_ch,write_ch,p__14863){
var vec__14864 = p__14863;
var map__14865 = cljs.core.nth.call(null,vec__14864,(0),null);
var map__14865__$1 = ((((!((map__14865 == null)))?((((map__14865.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14865.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14865):map__14865);
var on_close = cljs.core.get.call(null,map__14865__$1,new cljs.core.Keyword(null,"on-close","on-close",-761178394));
if(typeof chord.channels.t_chord$channels14867 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
chord.channels.t_chord$channels14867 = (function (read_ch,write_ch,p__14863,vec__14864,map__14865,on_close,meta14868){
this.read_ch = read_ch;
this.write_ch = write_ch;
this.p__14863 = p__14863;
this.vec__14864 = vec__14864;
this.map__14865 = map__14865;
this.on_close = on_close;
this.meta14868 = meta14868;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
chord.channels.t_chord$channels14867.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (vec__14864,map__14865,map__14865__$1,on_close){
return (function (_14869,meta14868__$1){
var self__ = this;
var _14869__$1 = this;
return (new chord.channels.t_chord$channels14867(self__.read_ch,self__.write_ch,self__.p__14863,self__.vec__14864,self__.map__14865,self__.on_close,meta14868__$1));
});})(vec__14864,map__14865,map__14865__$1,on_close))
;

chord.channels.t_chord$channels14867.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (vec__14864,map__14865,map__14865__$1,on_close){
return (function (_14869){
var self__ = this;
var _14869__$1 = this;
return self__.meta14868;
});})(vec__14864,map__14865,map__14865__$1,on_close))
;

chord.channels.t_chord$channels14867.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

chord.channels.t_chord$channels14867.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = ((function (vec__14864,map__14865,map__14865__$1,on_close){
return (function (_,handler){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.read_ch,handler);
});})(vec__14864,map__14865,map__14865__$1,on_close))
;

chord.channels.t_chord$channels14867.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

chord.channels.t_chord$channels14867.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = ((function (vec__14864,map__14865,map__14865__$1,on_close){
return (function (_,msg,handler){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.write_ch,msg,handler);
});})(vec__14864,map__14865,map__14865__$1,on_close))
;

chord.channels.t_chord$channels14867.prototype.cljs$core$async$impl$protocols$Channel$ = true;

chord.channels.t_chord$channels14867.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = ((function (vec__14864,map__14865,map__14865__$1,on_close){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.close_BANG_.call(null,self__.read_ch);

cljs.core.async.impl.protocols.close_BANG_.call(null,self__.write_ch);

if(cljs.core.truth_(self__.on_close)){
return self__.on_close.call(null);
} else {
return null;
}
});})(vec__14864,map__14865,map__14865__$1,on_close))
;

chord.channels.t_chord$channels14867.getBasis = ((function (vec__14864,map__14865,map__14865__$1,on_close){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"read-ch","read-ch",1602045113,null),new cljs.core.Symbol(null,"write-ch","write-ch",-126054072,null),new cljs.core.Symbol(null,"p__14863","p__14863",1467992078,null),new cljs.core.Symbol(null,"vec__14864","vec__14864",-744595826,null),new cljs.core.Symbol(null,"map__14865","map__14865",-1533456315,null),new cljs.core.Symbol(null,"on-close","on-close",879353133,null),new cljs.core.Symbol(null,"meta14868","meta14868",188809480,null)], null);
});})(vec__14864,map__14865,map__14865__$1,on_close))
;

chord.channels.t_chord$channels14867.cljs$lang$type = true;

chord.channels.t_chord$channels14867.cljs$lang$ctorStr = "chord.channels/t_chord$channels14867";

chord.channels.t_chord$channels14867.cljs$lang$ctorPrWriter = ((function (vec__14864,map__14865,map__14865__$1,on_close){
return (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"chord.channels/t_chord$channels14867");
});})(vec__14864,map__14865,map__14865__$1,on_close))
;

chord.channels.__GT_t_chord$channels14867 = ((function (vec__14864,map__14865,map__14865__$1,on_close){
return (function chord$channels$__GT_t_chord$channels14867(read_ch__$1,write_ch__$1,p__14863__$1,vec__14864__$1,map__14865__$2,on_close__$1,meta14868){
return (new chord.channels.t_chord$channels14867(read_ch__$1,write_ch__$1,p__14863__$1,vec__14864__$1,map__14865__$2,on_close__$1,meta14868));
});})(vec__14864,map__14865,map__14865__$1,on_close))
;

}

return (new chord.channels.t_chord$channels14867(read_ch,write_ch,p__14863,vec__14864,map__14865__$1,on_close,cljs.core.PersistentArrayMap.EMPTY));
});

chord.channels.bidi_ch.cljs$lang$maxFixedArity = (2);

chord.channels.bidi_ch.cljs$lang$applyTo = (function (seq14860){
var G__14861 = cljs.core.first.call(null,seq14860);
var seq14860__$1 = cljs.core.next.call(null,seq14860);
var G__14862 = cljs.core.first.call(null,seq14860__$1);
var seq14860__$2 = cljs.core.next.call(null,seq14860__$1);
return chord.channels.bidi_ch.cljs$core$IFn$_invoke$arity$variadic(G__14861,G__14862,seq14860__$2);
});

//# sourceMappingURL=channels.js.map