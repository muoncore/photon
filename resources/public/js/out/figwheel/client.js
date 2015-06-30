// Compiled by ClojureScript 0.0-3269 {}
goog.provide('figwheel.client');
goog.require('cljs.core');
goog.require('goog.Uri');
goog.require('cljs.core.async');
goog.require('figwheel.client.socket');
goog.require('figwheel.client.file_reloading');
goog.require('clojure.string');
goog.require('figwheel.client.utils');
goog.require('cljs.repl');
goog.require('figwheel.client.heads_up');
figwheel.client.figwheel_repl_print = (function figwheel$client$figwheel_repl_print(args){
figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),"figwheel-repl-print",new cljs.core.Keyword(null,"content","content",15833224),args], null));

return args;
});
figwheel.client.console_print = (function figwheel$client$console_print(args){
console.log.apply(console,cljs.core.into_array.call(null,args));

return args;
});
figwheel.client.enable_repl_print_BANG_ = (function figwheel$client$enable_repl_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

return cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__42349__delegate = function (args){
return figwheel.client.figwheel_repl_print.call(null,figwheel.client.console_print.call(null,args));
};
var G__42349 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__42350__i = 0, G__42350__a = new Array(arguments.length -  0);
while (G__42350__i < G__42350__a.length) {G__42350__a[G__42350__i] = arguments[G__42350__i + 0]; ++G__42350__i;}
  args = new cljs.core.IndexedSeq(G__42350__a,0);
} 
return G__42349__delegate.call(this,args);};
G__42349.cljs$lang$maxFixedArity = 0;
G__42349.cljs$lang$applyTo = (function (arglist__42351){
var args = cljs.core.seq(arglist__42351);
return G__42349__delegate(args);
});
G__42349.cljs$core$IFn$_invoke$arity$variadic = G__42349__delegate;
return G__42349;
})()
;
});
figwheel.client.get_essential_messages = (function figwheel$client$get_essential_messages(ed){
if(cljs.core.truth_(ed)){
return cljs.core.cons.call(null,cljs.core.select_keys.call(null,ed,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.Keyword(null,"class","class",-2030961996)], null)),figwheel$client$get_essential_messages.call(null,new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(ed)));
} else {
return null;
}
});
figwheel.client.error_msg_format = (function figwheel$client$error_msg_format(p__42352){
var map__42354 = p__42352;
var map__42354__$1 = ((cljs.core.seq_QMARK_.call(null,map__42354))?cljs.core.apply.call(null,cljs.core.hash_map,map__42354):map__42354);
var message = cljs.core.get.call(null,map__42354__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var class$ = cljs.core.get.call(null,map__42354__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
return [cljs.core.str(class$),cljs.core.str(" : "),cljs.core.str(message)].join('');
});
figwheel.client.format_messages = cljs.core.comp.call(null,cljs.core.partial.call(null,cljs.core.map,figwheel.client.error_msg_format),figwheel.client.get_essential_messages);
figwheel.client.focus_msgs = (function figwheel$client$focus_msgs(name_set,msg_hist){
return cljs.core.cons.call(null,cljs.core.first.call(null,msg_hist),cljs.core.filter.call(null,cljs.core.comp.call(null,name_set,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863)),cljs.core.rest.call(null,msg_hist)));
});
figwheel.client.reload_file_QMARK__STAR_ = (function figwheel$client$reload_file_QMARK__STAR_(msg_name,opts){
var or__29265__auto__ = new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__29265__auto__)){
return or__29265__auto__;
} else {
return cljs.core.not_EQ_.call(null,msg_name,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356));
}
});
figwheel.client.reload_file_state_QMARK_ = (function figwheel$client$reload_file_state_QMARK_(msg_names,opts){
var and__29253__auto__ = cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563));
if(and__29253__auto__){
return figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts);
} else {
return and__29253__auto__;
}
});
figwheel.client.block_reload_file_state_QMARK_ = (function figwheel$client$block_reload_file_state_QMARK_(msg_names,opts){
return (cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))) && (cljs.core.not.call(null,figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts)));
});
figwheel.client.warning_append_state_QMARK_ = (function figwheel$client$warning_append_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.warning_state_QMARK_ = (function figwheel$client$warning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),cljs.core.first.call(null,msg_names));
});
figwheel.client.rewarning_state_QMARK_ = (function figwheel$client$rewarning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(3),msg_names));
});
figwheel.client.compile_fail_state_QMARK_ = (function figwheel$client$compile_fail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),cljs.core.first.call(null,msg_names));
});
figwheel.client.compile_refail_state_QMARK_ = (function figwheel$client$compile_refail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.css_loaded_state_QMARK_ = (function figwheel$client$css_loaded_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874),cljs.core.first.call(null,msg_names));
});
figwheel.client.file_reloader_plugin = (function figwheel$client$file_reloader_plugin(opts){
var ch = cljs.core.async.chan.call(null);
var c__32551__auto___42483 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto___42483,ch){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto___42483,ch){
return (function (state_42457){
var state_val_42458 = (state_42457[(1)]);
if((state_val_42458 === (7))){
var inst_42453 = (state_42457[(2)]);
var state_42457__$1 = state_42457;
var statearr_42459_42484 = state_42457__$1;
(statearr_42459_42484[(2)] = inst_42453);

(statearr_42459_42484[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42458 === (1))){
var state_42457__$1 = state_42457;
var statearr_42460_42485 = state_42457__$1;
(statearr_42460_42485[(2)] = null);

(statearr_42460_42485[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42458 === (4))){
var inst_42421 = (state_42457[(7)]);
var inst_42421__$1 = (state_42457[(2)]);
var state_42457__$1 = (function (){var statearr_42461 = state_42457;
(statearr_42461[(7)] = inst_42421__$1);

return statearr_42461;
})();
if(cljs.core.truth_(inst_42421__$1)){
var statearr_42462_42486 = state_42457__$1;
(statearr_42462_42486[(1)] = (5));

} else {
var statearr_42463_42487 = state_42457__$1;
(statearr_42463_42487[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42458 === (13))){
var state_42457__$1 = state_42457;
var statearr_42464_42488 = state_42457__$1;
(statearr_42464_42488[(2)] = null);

(statearr_42464_42488[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42458 === (6))){
var state_42457__$1 = state_42457;
var statearr_42465_42489 = state_42457__$1;
(statearr_42465_42489[(2)] = null);

(statearr_42465_42489[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42458 === (3))){
var inst_42455 = (state_42457[(2)]);
var state_42457__$1 = state_42457;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_42457__$1,inst_42455);
} else {
if((state_val_42458 === (12))){
var inst_42428 = (state_42457[(8)]);
var inst_42441 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_42428);
var inst_42442 = cljs.core.first.call(null,inst_42441);
var inst_42443 = new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(inst_42442);
var inst_42444 = console.warn("Figwheel: Not loading code with warnings - ",inst_42443);
var state_42457__$1 = state_42457;
var statearr_42466_42490 = state_42457__$1;
(statearr_42466_42490[(2)] = inst_42444);

(statearr_42466_42490[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42458 === (2))){
var state_42457__$1 = state_42457;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42457__$1,(4),ch);
} else {
if((state_val_42458 === (11))){
var inst_42437 = (state_42457[(2)]);
var state_42457__$1 = state_42457;
var statearr_42467_42491 = state_42457__$1;
(statearr_42467_42491[(2)] = inst_42437);

(statearr_42467_42491[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42458 === (9))){
var inst_42427 = (state_42457[(9)]);
var inst_42439 = figwheel.client.block_reload_file_state_QMARK_.call(null,inst_42427,opts);
var state_42457__$1 = state_42457;
if(cljs.core.truth_(inst_42439)){
var statearr_42468_42492 = state_42457__$1;
(statearr_42468_42492[(1)] = (12));

} else {
var statearr_42469_42493 = state_42457__$1;
(statearr_42469_42493[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42458 === (5))){
var inst_42421 = (state_42457[(7)]);
var inst_42427 = (state_42457[(9)]);
var inst_42423 = [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null];
var inst_42424 = (new cljs.core.PersistentArrayMap(null,2,inst_42423,null));
var inst_42425 = (new cljs.core.PersistentHashSet(null,inst_42424,null));
var inst_42426 = figwheel.client.focus_msgs.call(null,inst_42425,inst_42421);
var inst_42427__$1 = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),inst_42426);
var inst_42428 = cljs.core.first.call(null,inst_42426);
var inst_42429 = figwheel.client.reload_file_state_QMARK_.call(null,inst_42427__$1,opts);
var state_42457__$1 = (function (){var statearr_42470 = state_42457;
(statearr_42470[(8)] = inst_42428);

(statearr_42470[(9)] = inst_42427__$1);

return statearr_42470;
})();
if(cljs.core.truth_(inst_42429)){
var statearr_42471_42494 = state_42457__$1;
(statearr_42471_42494[(1)] = (8));

} else {
var statearr_42472_42495 = state_42457__$1;
(statearr_42472_42495[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42458 === (14))){
var inst_42447 = (state_42457[(2)]);
var state_42457__$1 = state_42457;
var statearr_42473_42496 = state_42457__$1;
(statearr_42473_42496[(2)] = inst_42447);

(statearr_42473_42496[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42458 === (10))){
var inst_42449 = (state_42457[(2)]);
var state_42457__$1 = (function (){var statearr_42474 = state_42457;
(statearr_42474[(10)] = inst_42449);

return statearr_42474;
})();
var statearr_42475_42497 = state_42457__$1;
(statearr_42475_42497[(2)] = null);

(statearr_42475_42497[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42458 === (8))){
var inst_42428 = (state_42457[(8)]);
var inst_42431 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_42432 = figwheel.client.file_reloading.reload_js_files.call(null,opts,inst_42428);
var inst_42433 = cljs.core.async.timeout.call(null,(1000));
var inst_42434 = [inst_42432,inst_42433];
var inst_42435 = (new cljs.core.PersistentVector(null,2,(5),inst_42431,inst_42434,null));
var state_42457__$1 = state_42457;
return cljs.core.async.ioc_alts_BANG_.call(null,state_42457__$1,(11),inst_42435);
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
});})(c__32551__auto___42483,ch))
;
return ((function (switch__32489__auto__,c__32551__auto___42483,ch){
return (function() {
var figwheel$client$file_reloader_plugin_$_state_machine__32490__auto__ = null;
var figwheel$client$file_reloader_plugin_$_state_machine__32490__auto____0 = (function (){
var statearr_42479 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_42479[(0)] = figwheel$client$file_reloader_plugin_$_state_machine__32490__auto__);

(statearr_42479[(1)] = (1));

return statearr_42479;
});
var figwheel$client$file_reloader_plugin_$_state_machine__32490__auto____1 = (function (state_42457){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_42457);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e42480){if((e42480 instanceof Object)){
var ex__32493__auto__ = e42480;
var statearr_42481_42498 = state_42457;
(statearr_42481_42498[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_42457);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e42480;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42499 = state_42457;
state_42457 = G__42499;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
figwheel$client$file_reloader_plugin_$_state_machine__32490__auto__ = function(state_42457){
switch(arguments.length){
case 0:
return figwheel$client$file_reloader_plugin_$_state_machine__32490__auto____0.call(this);
case 1:
return figwheel$client$file_reloader_plugin_$_state_machine__32490__auto____1.call(this,state_42457);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloader_plugin_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloader_plugin_$_state_machine__32490__auto____0;
figwheel$client$file_reloader_plugin_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloader_plugin_$_state_machine__32490__auto____1;
return figwheel$client$file_reloader_plugin_$_state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto___42483,ch))
})();
var state__32553__auto__ = (function (){var statearr_42482 = f__32552__auto__.call(null);
(statearr_42482[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___42483);

return statearr_42482;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto___42483,ch))
);


return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.truncate_stack_trace = (function figwheel$client$truncate_stack_trace(stack_str){
return cljs.core.take_while.call(null,(function (p1__42500_SHARP_){
return cljs.core.not.call(null,cljs.core.re_matches.call(null,/.*eval_javascript_STAR__STAR_.*/,p1__42500_SHARP_));
}),clojure.string.split_lines.call(null,stack_str));
});
var base_path_42507 = figwheel.client.utils.base_url_path.call(null);
figwheel.client.eval_javascript_STAR__STAR_ = ((function (base_path_42507){
return (function figwheel$client$eval_javascript_STAR__STAR_(code,result_handler){
try{var _STAR_print_fn_STAR_42505 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR_42506 = cljs.core._STAR_print_newline_STAR_;
cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_fn_STAR_42505,_STAR_print_newline_STAR_42506,base_path_42507){
return (function() { 
var G__42508__delegate = function (args){
return figwheel.client.figwheel_repl_print.call(null,figwheel.client.console_print.call(null,args));
};
var G__42508 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__42509__i = 0, G__42509__a = new Array(arguments.length -  0);
while (G__42509__i < G__42509__a.length) {G__42509__a[G__42509__i] = arguments[G__42509__i + 0]; ++G__42509__i;}
  args = new cljs.core.IndexedSeq(G__42509__a,0);
} 
return G__42508__delegate.call(this,args);};
G__42508.cljs$lang$maxFixedArity = 0;
G__42508.cljs$lang$applyTo = (function (arglist__42510){
var args = cljs.core.seq(arglist__42510);
return G__42508__delegate(args);
});
G__42508.cljs$core$IFn$_invoke$arity$variadic = G__42508__delegate;
return G__42508;
})()
;})(_STAR_print_fn_STAR_42505,_STAR_print_newline_STAR_42506,base_path_42507))
;

cljs.core._STAR_print_newline_STAR_ = false;

try{return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"success","success",1890645906),new cljs.core.Keyword(null,"value","value",305978217),[cljs.core.str(eval(code))].join('')], null));
}finally {cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_42506;

cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_42505;
}}catch (e42504){if((e42504 instanceof Error)){
var e = e42504;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),clojure.string.join.call(null,"\n",figwheel.client.truncate_stack_trace.call(null,e.stack)),new cljs.core.Keyword(null,"base-path","base-path",495760020),base_path_42507], null));
} else {
var e = e42504;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),"No stacktrace available."], null));

}
}});})(base_path_42507))
;
/**
 * The REPL can disconnect and reconnect lets ensure cljs.user exists at least.
 */
figwheel.client.ensure_cljs_user = (function figwheel$client$ensure_cljs_user(){
if(cljs.core.truth_(cljs.user)){
return null;
} else {
return cljs.user = {};
}
});
figwheel.client.repl_plugin = (function figwheel$client$repl_plugin(p__42511){
var map__42516 = p__42511;
var map__42516__$1 = ((cljs.core.seq_QMARK_.call(null,map__42516))?cljs.core.apply.call(null,cljs.core.hash_map,map__42516):map__42516);
var opts = map__42516__$1;
var build_id = cljs.core.get.call(null,map__42516__$1,new cljs.core.Keyword(null,"build-id","build-id",1642831089));
return ((function (map__42516,map__42516__$1,opts,build_id){
return (function (p__42517){
var vec__42518 = p__42517;
var map__42519 = cljs.core.nth.call(null,vec__42518,(0),null);
var map__42519__$1 = ((cljs.core.seq_QMARK_.call(null,map__42519))?cljs.core.apply.call(null,cljs.core.hash_map,map__42519):map__42519);
var msg = map__42519__$1;
var msg_name = cljs.core.get.call(null,map__42519__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__42518,(1));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"repl-eval","repl-eval",-1784727398),msg_name)){
figwheel.client.ensure_cljs_user.call(null);

return figwheel.client.eval_javascript_STAR__STAR_.call(null,new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(msg),((function (vec__42518,map__42519,map__42519__$1,msg,msg_name,_,map__42516,map__42516__$1,opts,build_id){
return (function (res){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),new cljs.core.Keyword(null,"callback-name","callback-name",336964714).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"content","content",15833224),res], null));
});})(vec__42518,map__42519,map__42519__$1,msg,msg_name,_,map__42516,map__42516__$1,opts,build_id))
);
} else {
return null;
}
});
;})(map__42516,map__42516__$1,opts,build_id))
});
figwheel.client.css_reloader_plugin = (function figwheel$client$css_reloader_plugin(opts){
return (function (p__42523){
var vec__42524 = p__42523;
var map__42525 = cljs.core.nth.call(null,vec__42524,(0),null);
var map__42525__$1 = ((cljs.core.seq_QMARK_.call(null,map__42525))?cljs.core.apply.call(null,cljs.core.hash_map,map__42525):map__42525);
var msg = map__42525__$1;
var msg_name = cljs.core.get.call(null,map__42525__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__42524,(1));
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874))){
return figwheel.client.file_reloading.reload_css_files.call(null,opts,msg);
} else {
return null;
}
});
});
figwheel.client.compile_fail_warning_plugin = (function figwheel$client$compile_fail_warning_plugin(p__42526){
var map__42534 = p__42526;
var map__42534__$1 = ((cljs.core.seq_QMARK_.call(null,map__42534))?cljs.core.apply.call(null,cljs.core.hash_map,map__42534):map__42534);
var on_compile_warning = cljs.core.get.call(null,map__42534__$1,new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947));
var on_compile_fail = cljs.core.get.call(null,map__42534__$1,new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036));
return ((function (map__42534,map__42534__$1,on_compile_warning,on_compile_fail){
return (function (p__42535){
var vec__42536 = p__42535;
var map__42537 = cljs.core.nth.call(null,vec__42536,(0),null);
var map__42537__$1 = ((cljs.core.seq_QMARK_.call(null,map__42537))?cljs.core.apply.call(null,cljs.core.hash_map,map__42537):map__42537);
var msg = map__42537__$1;
var msg_name = cljs.core.get.call(null,map__42537__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__42536,(1));
var pred__42538 = cljs.core._EQ_;
var expr__42539 = msg_name;
if(cljs.core.truth_(pred__42538.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),expr__42539))){
return on_compile_warning.call(null,msg);
} else {
if(cljs.core.truth_(pred__42538.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),expr__42539))){
return on_compile_fail.call(null,msg);
} else {
return null;
}
}
});
;})(map__42534,map__42534__$1,on_compile_warning,on_compile_fail))
});
figwheel.client.heads_up_plugin_msg_handler = (function figwheel$client$heads_up_plugin_msg_handler(opts,msg_hist_SINGLEQUOTE_){
var msg_hist = figwheel.client.focus_msgs.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null], null), null),msg_hist_SINGLEQUOTE_);
var msg_names = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),msg_hist);
var msg = cljs.core.first.call(null,msg_hist);
var c__32551__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto__,msg_hist,msg_names,msg){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto__,msg_hist,msg_names,msg){
return (function (state_42740){
var state_val_42741 = (state_42740[(1)]);
if((state_val_42741 === (7))){
var inst_42674 = (state_42740[(2)]);
var state_42740__$1 = state_42740;
var statearr_42742_42783 = state_42740__$1;
(statearr_42742_42783[(2)] = inst_42674);

(statearr_42742_42783[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (20))){
var inst_42702 = figwheel.client.rewarning_state_QMARK_.call(null,msg_names);
var state_42740__$1 = state_42740;
if(cljs.core.truth_(inst_42702)){
var statearr_42743_42784 = state_42740__$1;
(statearr_42743_42784[(1)] = (22));

} else {
var statearr_42744_42785 = state_42740__$1;
(statearr_42744_42785[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (27))){
var inst_42714 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_42715 = figwheel.client.heads_up.display_warning.call(null,inst_42714);
var state_42740__$1 = state_42740;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42740__$1,(30),inst_42715);
} else {
if((state_val_42741 === (1))){
var inst_42662 = figwheel.client.reload_file_state_QMARK_.call(null,msg_names,opts);
var state_42740__$1 = state_42740;
if(cljs.core.truth_(inst_42662)){
var statearr_42745_42786 = state_42740__$1;
(statearr_42745_42786[(1)] = (2));

} else {
var statearr_42746_42787 = state_42740__$1;
(statearr_42746_42787[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (24))){
var inst_42730 = (state_42740[(2)]);
var state_42740__$1 = state_42740;
var statearr_42747_42788 = state_42740__$1;
(statearr_42747_42788[(2)] = inst_42730);

(statearr_42747_42788[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (4))){
var inst_42738 = (state_42740[(2)]);
var state_42740__$1 = state_42740;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_42740__$1,inst_42738);
} else {
if((state_val_42741 === (15))){
var inst_42690 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_42691 = figwheel.client.format_messages.call(null,inst_42690);
var inst_42692 = new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(msg);
var inst_42693 = figwheel.client.heads_up.display_error.call(null,inst_42691,inst_42692);
var state_42740__$1 = state_42740;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42740__$1,(18),inst_42693);
} else {
if((state_val_42741 === (21))){
var inst_42732 = (state_42740[(2)]);
var state_42740__$1 = state_42740;
var statearr_42748_42789 = state_42740__$1;
(statearr_42748_42789[(2)] = inst_42732);

(statearr_42748_42789[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (31))){
var inst_42721 = figwheel.client.heads_up.flash_loaded.call(null);
var state_42740__$1 = state_42740;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42740__$1,(34),inst_42721);
} else {
if((state_val_42741 === (32))){
var state_42740__$1 = state_42740;
var statearr_42749_42790 = state_42740__$1;
(statearr_42749_42790[(2)] = null);

(statearr_42749_42790[(1)] = (33));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (33))){
var inst_42726 = (state_42740[(2)]);
var state_42740__$1 = state_42740;
var statearr_42750_42791 = state_42740__$1;
(statearr_42750_42791[(2)] = inst_42726);

(statearr_42750_42791[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (13))){
var inst_42680 = (state_42740[(2)]);
var inst_42681 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_42682 = figwheel.client.format_messages.call(null,inst_42681);
var inst_42683 = new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(msg);
var inst_42684 = figwheel.client.heads_up.display_error.call(null,inst_42682,inst_42683);
var state_42740__$1 = (function (){var statearr_42751 = state_42740;
(statearr_42751[(7)] = inst_42680);

return statearr_42751;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42740__$1,(14),inst_42684);
} else {
if((state_val_42741 === (22))){
var inst_42704 = figwheel.client.heads_up.clear.call(null);
var state_42740__$1 = state_42740;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42740__$1,(25),inst_42704);
} else {
if((state_val_42741 === (29))){
var inst_42728 = (state_42740[(2)]);
var state_42740__$1 = state_42740;
var statearr_42752_42792 = state_42740__$1;
(statearr_42752_42792[(2)] = inst_42728);

(statearr_42752_42792[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (6))){
var inst_42670 = figwheel.client.heads_up.clear.call(null);
var state_42740__$1 = state_42740;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42740__$1,(9),inst_42670);
} else {
if((state_val_42741 === (28))){
var inst_42719 = figwheel.client.css_loaded_state_QMARK_.call(null,msg_names);
var state_42740__$1 = state_42740;
if(cljs.core.truth_(inst_42719)){
var statearr_42753_42793 = state_42740__$1;
(statearr_42753_42793[(1)] = (31));

} else {
var statearr_42754_42794 = state_42740__$1;
(statearr_42754_42794[(1)] = (32));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (25))){
var inst_42706 = (state_42740[(2)]);
var inst_42707 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_42708 = figwheel.client.heads_up.display_warning.call(null,inst_42707);
var state_42740__$1 = (function (){var statearr_42755 = state_42740;
(statearr_42755[(8)] = inst_42706);

return statearr_42755;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42740__$1,(26),inst_42708);
} else {
if((state_val_42741 === (34))){
var inst_42723 = (state_42740[(2)]);
var state_42740__$1 = state_42740;
var statearr_42756_42795 = state_42740__$1;
(statearr_42756_42795[(2)] = inst_42723);

(statearr_42756_42795[(1)] = (33));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (17))){
var inst_42734 = (state_42740[(2)]);
var state_42740__$1 = state_42740;
var statearr_42757_42796 = state_42740__$1;
(statearr_42757_42796[(2)] = inst_42734);

(statearr_42757_42796[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (3))){
var inst_42676 = figwheel.client.compile_refail_state_QMARK_.call(null,msg_names);
var state_42740__$1 = state_42740;
if(cljs.core.truth_(inst_42676)){
var statearr_42758_42797 = state_42740__$1;
(statearr_42758_42797[(1)] = (10));

} else {
var statearr_42759_42798 = state_42740__$1;
(statearr_42759_42798[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (12))){
var inst_42736 = (state_42740[(2)]);
var state_42740__$1 = state_42740;
var statearr_42760_42799 = state_42740__$1;
(statearr_42760_42799[(2)] = inst_42736);

(statearr_42760_42799[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (2))){
var inst_42664 = new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(opts);
var state_42740__$1 = state_42740;
if(cljs.core.truth_(inst_42664)){
var statearr_42761_42800 = state_42740__$1;
(statearr_42761_42800[(1)] = (5));

} else {
var statearr_42762_42801 = state_42740__$1;
(statearr_42762_42801[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (23))){
var inst_42712 = figwheel.client.warning_state_QMARK_.call(null,msg_names);
var state_42740__$1 = state_42740;
if(cljs.core.truth_(inst_42712)){
var statearr_42763_42802 = state_42740__$1;
(statearr_42763_42802[(1)] = (27));

} else {
var statearr_42764_42803 = state_42740__$1;
(statearr_42764_42803[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (19))){
var inst_42699 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_42700 = figwheel.client.heads_up.append_message.call(null,inst_42699);
var state_42740__$1 = state_42740;
var statearr_42765_42804 = state_42740__$1;
(statearr_42765_42804[(2)] = inst_42700);

(statearr_42765_42804[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (11))){
var inst_42688 = figwheel.client.compile_fail_state_QMARK_.call(null,msg_names);
var state_42740__$1 = state_42740;
if(cljs.core.truth_(inst_42688)){
var statearr_42766_42805 = state_42740__$1;
(statearr_42766_42805[(1)] = (15));

} else {
var statearr_42767_42806 = state_42740__$1;
(statearr_42767_42806[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (9))){
var inst_42672 = (state_42740[(2)]);
var state_42740__$1 = state_42740;
var statearr_42768_42807 = state_42740__$1;
(statearr_42768_42807[(2)] = inst_42672);

(statearr_42768_42807[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (5))){
var inst_42666 = figwheel.client.heads_up.flash_loaded.call(null);
var state_42740__$1 = state_42740;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42740__$1,(8),inst_42666);
} else {
if((state_val_42741 === (14))){
var inst_42686 = (state_42740[(2)]);
var state_42740__$1 = state_42740;
var statearr_42769_42808 = state_42740__$1;
(statearr_42769_42808[(2)] = inst_42686);

(statearr_42769_42808[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (26))){
var inst_42710 = (state_42740[(2)]);
var state_42740__$1 = state_42740;
var statearr_42770_42809 = state_42740__$1;
(statearr_42770_42809[(2)] = inst_42710);

(statearr_42770_42809[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (16))){
var inst_42697 = figwheel.client.warning_append_state_QMARK_.call(null,msg_names);
var state_42740__$1 = state_42740;
if(cljs.core.truth_(inst_42697)){
var statearr_42771_42810 = state_42740__$1;
(statearr_42771_42810[(1)] = (19));

} else {
var statearr_42772_42811 = state_42740__$1;
(statearr_42772_42811[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (30))){
var inst_42717 = (state_42740[(2)]);
var state_42740__$1 = state_42740;
var statearr_42773_42812 = state_42740__$1;
(statearr_42773_42812[(2)] = inst_42717);

(statearr_42773_42812[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (10))){
var inst_42678 = figwheel.client.heads_up.clear.call(null);
var state_42740__$1 = state_42740;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42740__$1,(13),inst_42678);
} else {
if((state_val_42741 === (18))){
var inst_42695 = (state_42740[(2)]);
var state_42740__$1 = state_42740;
var statearr_42774_42813 = state_42740__$1;
(statearr_42774_42813[(2)] = inst_42695);

(statearr_42774_42813[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42741 === (8))){
var inst_42668 = (state_42740[(2)]);
var state_42740__$1 = state_42740;
var statearr_42775_42814 = state_42740__$1;
(statearr_42775_42814[(2)] = inst_42668);

(statearr_42775_42814[(1)] = (7));


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
});})(c__32551__auto__,msg_hist,msg_names,msg))
;
return ((function (switch__32489__auto__,c__32551__auto__,msg_hist,msg_names,msg){
return (function() {
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__32490__auto__ = null;
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__32490__auto____0 = (function (){
var statearr_42779 = [null,null,null,null,null,null,null,null,null];
(statearr_42779[(0)] = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__32490__auto__);

(statearr_42779[(1)] = (1));

return statearr_42779;
});
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__32490__auto____1 = (function (state_42740){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_42740);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e42780){if((e42780 instanceof Object)){
var ex__32493__auto__ = e42780;
var statearr_42781_42815 = state_42740;
(statearr_42781_42815[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_42740);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e42780;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42816 = state_42740;
state_42740 = G__42816;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__32490__auto__ = function(state_42740){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__32490__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__32490__auto____1.call(this,state_42740);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__32490__auto____0;
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__32490__auto____1;
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto__,msg_hist,msg_names,msg))
})();
var state__32553__auto__ = (function (){var statearr_42782 = f__32552__auto__.call(null);
(statearr_42782[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto__);

return statearr_42782;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto__,msg_hist,msg_names,msg))
);

return c__32551__auto__;
});
figwheel.client.heads_up_plugin = (function figwheel$client$heads_up_plugin(opts){
var ch = cljs.core.async.chan.call(null);
figwheel.client.heads_up_config_options_STAR__STAR_ = opts;

var c__32551__auto___42879 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto___42879,ch){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto___42879,ch){
return (function (state_42862){
var state_val_42863 = (state_42862[(1)]);
if((state_val_42863 === (1))){
var state_42862__$1 = state_42862;
var statearr_42864_42880 = state_42862__$1;
(statearr_42864_42880[(2)] = null);

(statearr_42864_42880[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42863 === (2))){
var state_42862__$1 = state_42862;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42862__$1,(4),ch);
} else {
if((state_val_42863 === (3))){
var inst_42860 = (state_42862[(2)]);
var state_42862__$1 = state_42862;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_42862__$1,inst_42860);
} else {
if((state_val_42863 === (4))){
var inst_42850 = (state_42862[(7)]);
var inst_42850__$1 = (state_42862[(2)]);
var state_42862__$1 = (function (){var statearr_42865 = state_42862;
(statearr_42865[(7)] = inst_42850__$1);

return statearr_42865;
})();
if(cljs.core.truth_(inst_42850__$1)){
var statearr_42866_42881 = state_42862__$1;
(statearr_42866_42881[(1)] = (5));

} else {
var statearr_42867_42882 = state_42862__$1;
(statearr_42867_42882[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42863 === (5))){
var inst_42850 = (state_42862[(7)]);
var inst_42852 = figwheel.client.heads_up_plugin_msg_handler.call(null,opts,inst_42850);
var state_42862__$1 = state_42862;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42862__$1,(8),inst_42852);
} else {
if((state_val_42863 === (6))){
var state_42862__$1 = state_42862;
var statearr_42868_42883 = state_42862__$1;
(statearr_42868_42883[(2)] = null);

(statearr_42868_42883[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42863 === (7))){
var inst_42858 = (state_42862[(2)]);
var state_42862__$1 = state_42862;
var statearr_42869_42884 = state_42862__$1;
(statearr_42869_42884[(2)] = inst_42858);

(statearr_42869_42884[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42863 === (8))){
var inst_42854 = (state_42862[(2)]);
var state_42862__$1 = (function (){var statearr_42870 = state_42862;
(statearr_42870[(8)] = inst_42854);

return statearr_42870;
})();
var statearr_42871_42885 = state_42862__$1;
(statearr_42871_42885[(2)] = null);

(statearr_42871_42885[(1)] = (2));


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
});})(c__32551__auto___42879,ch))
;
return ((function (switch__32489__auto__,c__32551__auto___42879,ch){
return (function() {
var figwheel$client$heads_up_plugin_$_state_machine__32490__auto__ = null;
var figwheel$client$heads_up_plugin_$_state_machine__32490__auto____0 = (function (){
var statearr_42875 = [null,null,null,null,null,null,null,null,null];
(statearr_42875[(0)] = figwheel$client$heads_up_plugin_$_state_machine__32490__auto__);

(statearr_42875[(1)] = (1));

return statearr_42875;
});
var figwheel$client$heads_up_plugin_$_state_machine__32490__auto____1 = (function (state_42862){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_42862);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e42876){if((e42876 instanceof Object)){
var ex__32493__auto__ = e42876;
var statearr_42877_42886 = state_42862;
(statearr_42877_42886[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_42862);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e42876;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42887 = state_42862;
state_42862 = G__42887;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_$_state_machine__32490__auto__ = function(state_42862){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_$_state_machine__32490__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_$_state_machine__32490__auto____1.call(this,state_42862);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_$_state_machine__32490__auto____0;
figwheel$client$heads_up_plugin_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_$_state_machine__32490__auto____1;
return figwheel$client$heads_up_plugin_$_state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto___42879,ch))
})();
var state__32553__auto__ = (function (){var statearr_42878 = f__32552__auto__.call(null);
(statearr_42878[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___42879);

return statearr_42878;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto___42879,ch))
);


figwheel.client.heads_up.ensure_container.call(null);

return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.enforce_project_plugin = (function figwheel$client$enforce_project_plugin(opts){
return (function (msg_hist){
if(((1) < cljs.core.count.call(null,cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"project-id","project-id",206449307),cljs.core.take.call(null,(5),msg_hist)))))){
figwheel.client.socket.close_BANG_.call(null);

console.error("Figwheel: message received from different project. Shutting socket down.");

if(cljs.core.truth_(new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(opts))){
var c__32551__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto__){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto__){
return (function (state_42908){
var state_val_42909 = (state_42908[(1)]);
if((state_val_42909 === (1))){
var inst_42903 = cljs.core.async.timeout.call(null,(3000));
var state_42908__$1 = state_42908;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42908__$1,(2),inst_42903);
} else {
if((state_val_42909 === (2))){
var inst_42905 = (state_42908[(2)]);
var inst_42906 = figwheel.client.heads_up.display_system_warning.call(null,"Connection from different project","Shutting connection down!!!!!");
var state_42908__$1 = (function (){var statearr_42910 = state_42908;
(statearr_42910[(7)] = inst_42905);

return statearr_42910;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_42908__$1,inst_42906);
} else {
return null;
}
}
});})(c__32551__auto__))
;
return ((function (switch__32489__auto__,c__32551__auto__){
return (function() {
var figwheel$client$enforce_project_plugin_$_state_machine__32490__auto__ = null;
var figwheel$client$enforce_project_plugin_$_state_machine__32490__auto____0 = (function (){
var statearr_42914 = [null,null,null,null,null,null,null,null];
(statearr_42914[(0)] = figwheel$client$enforce_project_plugin_$_state_machine__32490__auto__);

(statearr_42914[(1)] = (1));

return statearr_42914;
});
var figwheel$client$enforce_project_plugin_$_state_machine__32490__auto____1 = (function (state_42908){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_42908);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e42915){if((e42915 instanceof Object)){
var ex__32493__auto__ = e42915;
var statearr_42916_42918 = state_42908;
(statearr_42916_42918[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_42908);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e42915;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42919 = state_42908;
state_42908 = G__42919;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
figwheel$client$enforce_project_plugin_$_state_machine__32490__auto__ = function(state_42908){
switch(arguments.length){
case 0:
return figwheel$client$enforce_project_plugin_$_state_machine__32490__auto____0.call(this);
case 1:
return figwheel$client$enforce_project_plugin_$_state_machine__32490__auto____1.call(this,state_42908);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_project_plugin_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_project_plugin_$_state_machine__32490__auto____0;
figwheel$client$enforce_project_plugin_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_project_plugin_$_state_machine__32490__auto____1;
return figwheel$client$enforce_project_plugin_$_state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto__))
})();
var state__32553__auto__ = (function (){var statearr_42917 = f__32552__auto__.call(null);
(statearr_42917[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto__);

return statearr_42917;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto__))
);

return c__32551__auto__;
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.default_on_jsload = cljs.core.identity;
figwheel.client.default_on_compile_fail = (function figwheel$client$default_on_compile_fail(p__42920){
var map__42926 = p__42920;
var map__42926__$1 = ((cljs.core.seq_QMARK_.call(null,map__42926))?cljs.core.apply.call(null,cljs.core.hash_map,map__42926):map__42926);
var ed = map__42926__$1;
var formatted_exception = cljs.core.get.call(null,map__42926__$1,new cljs.core.Keyword(null,"formatted-exception","formatted-exception",-116489026));
var exception_data = cljs.core.get.call(null,map__42926__$1,new cljs.core.Keyword(null,"exception-data","exception-data",-512474886));
var cause = cljs.core.get.call(null,map__42926__$1,new cljs.core.Keyword(null,"cause","cause",231901252));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: Compile Exception");

var seq__42927_42931 = cljs.core.seq.call(null,figwheel.client.format_messages.call(null,exception_data));
var chunk__42928_42932 = null;
var count__42929_42933 = (0);
var i__42930_42934 = (0);
while(true){
if((i__42930_42934 < count__42929_42933)){
var msg_42935 = cljs.core._nth.call(null,chunk__42928_42932,i__42930_42934);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_42935);

var G__42936 = seq__42927_42931;
var G__42937 = chunk__42928_42932;
var G__42938 = count__42929_42933;
var G__42939 = (i__42930_42934 + (1));
seq__42927_42931 = G__42936;
chunk__42928_42932 = G__42937;
count__42929_42933 = G__42938;
i__42930_42934 = G__42939;
continue;
} else {
var temp__4423__auto___42940 = cljs.core.seq.call(null,seq__42927_42931);
if(temp__4423__auto___42940){
var seq__42927_42941__$1 = temp__4423__auto___42940;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__42927_42941__$1)){
var c__30050__auto___42942 = cljs.core.chunk_first.call(null,seq__42927_42941__$1);
var G__42943 = cljs.core.chunk_rest.call(null,seq__42927_42941__$1);
var G__42944 = c__30050__auto___42942;
var G__42945 = cljs.core.count.call(null,c__30050__auto___42942);
var G__42946 = (0);
seq__42927_42931 = G__42943;
chunk__42928_42932 = G__42944;
count__42929_42933 = G__42945;
i__42930_42934 = G__42946;
continue;
} else {
var msg_42947 = cljs.core.first.call(null,seq__42927_42941__$1);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_42947);

var G__42948 = cljs.core.next.call(null,seq__42927_42941__$1);
var G__42949 = null;
var G__42950 = (0);
var G__42951 = (0);
seq__42927_42931 = G__42948;
chunk__42928_42932 = G__42949;
count__42929_42933 = G__42950;
i__42930_42934 = G__42951;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(cause)){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),[cljs.core.str("Error on file "),cljs.core.str(new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(cause)),cljs.core.str(", line "),cljs.core.str(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cause)),cljs.core.str(", column "),cljs.core.str(new cljs.core.Keyword(null,"column","column",2078222095).cljs$core$IFn$_invoke$arity$1(cause))].join(''));
} else {
}

return ed;
});
figwheel.client.default_on_compile_warning = (function figwheel$client$default_on_compile_warning(p__42952){
var map__42954 = p__42952;
var map__42954__$1 = ((cljs.core.seq_QMARK_.call(null,map__42954))?cljs.core.apply.call(null,cljs.core.hash_map,map__42954):map__42954);
var w = map__42954__$1;
var message = cljs.core.get.call(null,map__42954__$1,new cljs.core.Keyword(null,"message","message",-406056002));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),[cljs.core.str("Figwheel: Compile Warning - "),cljs.core.str(message)].join(''));

return w;
});
figwheel.client.default_before_load = (function figwheel$client$default_before_load(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: notified of file changes");

return files;
});
figwheel.client.default_on_cssload = (function figwheel$client$default_on_cssload(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded CSS files");

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),cljs.core.pr_str.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),files)));

return files;
});
if(typeof figwheel.client.config_defaults !== 'undefined'){
} else {
figwheel.client.config_defaults = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"load-unchanged-files","load-unchanged-files",-1561468704),new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947),new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036),new cljs.core.Keyword(null,"debug","debug",-1608172596),new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202),new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938),new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128),new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223),new cljs.core.Keyword(null,"retry-count","retry-count",1936122875),new cljs.core.Keyword(null,"autoload","autoload",-354122500),new cljs.core.Keyword(null,"url-rewriter","url-rewriter",200543838),new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318)],[true,figwheel.client.default_on_compile_warning,figwheel.client.default_on_jsload,figwheel.client.default_on_compile_fail,false,true,[cljs.core.str("ws://"),cljs.core.str((cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))?location.host:"localhost:3449")),cljs.core.str("/figwheel-ws")].join(''),figwheel.client.default_before_load,false,(100),true,false,figwheel.client.default_on_cssload]);
}
figwheel.client.handle_deprecated_jsload_callback = (function figwheel$client$handle_deprecated_jsload_callback(config){
if(cljs.core.truth_(new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config))){
return cljs.core.dissoc.call(null,cljs.core.assoc.call(null,config,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config)),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369));
} else {
return config;
}
});
figwheel.client.base_plugins = (function figwheel$client$base_plugins(system_options){
var base = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"enforce-project-plugin","enforce-project-plugin",959402899),figwheel.client.enforce_project_plugin,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),figwheel.client.file_reloader_plugin,new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),figwheel.client.compile_fail_warning_plugin,new cljs.core.Keyword(null,"css-reloader-plugin","css-reloader-plugin",2002032904),figwheel.client.css_reloader_plugin,new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371),figwheel.client.repl_plugin], null);
var base__$1 = ((cljs.core.not.call(null,figwheel.client.utils.html_env_QMARK_.call(null)))?cljs.core.select_keys.call(null,base,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371)], null)):base);
var base__$2 = ((new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(system_options) === false)?cljs.core.dissoc.call(null,base__$1,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733)):base__$1);
if(cljs.core.truth_((function (){var and__29253__auto__ = new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(system_options);
if(cljs.core.truth_(and__29253__auto__)){
return figwheel.client.utils.html_env_QMARK_.call(null);
} else {
return and__29253__auto__;
}
})())){
return cljs.core.assoc.call(null,base__$2,new cljs.core.Keyword(null,"heads-up-display-plugin","heads-up-display-plugin",1745207501),figwheel.client.heads_up_plugin);
} else {
return base__$2;
}
});
figwheel.client.add_plugins = (function figwheel$client$add_plugins(plugins,system_options){
var seq__42961 = cljs.core.seq.call(null,plugins);
var chunk__42962 = null;
var count__42963 = (0);
var i__42964 = (0);
while(true){
if((i__42964 < count__42963)){
var vec__42965 = cljs.core._nth.call(null,chunk__42962,i__42964);
var k = cljs.core.nth.call(null,vec__42965,(0),null);
var plugin = cljs.core.nth.call(null,vec__42965,(1),null);
if(cljs.core.truth_(plugin)){
var pl_42967 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__42961,chunk__42962,count__42963,i__42964,pl_42967,vec__42965,k,plugin){
return (function (_,___$1,___$2,msg_hist){
return pl_42967.call(null,msg_hist);
});})(seq__42961,chunk__42962,count__42963,i__42964,pl_42967,vec__42965,k,plugin))
);
} else {
}

var G__42968 = seq__42961;
var G__42969 = chunk__42962;
var G__42970 = count__42963;
var G__42971 = (i__42964 + (1));
seq__42961 = G__42968;
chunk__42962 = G__42969;
count__42963 = G__42970;
i__42964 = G__42971;
continue;
} else {
var temp__4423__auto__ = cljs.core.seq.call(null,seq__42961);
if(temp__4423__auto__){
var seq__42961__$1 = temp__4423__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__42961__$1)){
var c__30050__auto__ = cljs.core.chunk_first.call(null,seq__42961__$1);
var G__42972 = cljs.core.chunk_rest.call(null,seq__42961__$1);
var G__42973 = c__30050__auto__;
var G__42974 = cljs.core.count.call(null,c__30050__auto__);
var G__42975 = (0);
seq__42961 = G__42972;
chunk__42962 = G__42973;
count__42963 = G__42974;
i__42964 = G__42975;
continue;
} else {
var vec__42966 = cljs.core.first.call(null,seq__42961__$1);
var k = cljs.core.nth.call(null,vec__42966,(0),null);
var plugin = cljs.core.nth.call(null,vec__42966,(1),null);
if(cljs.core.truth_(plugin)){
var pl_42976 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__42961,chunk__42962,count__42963,i__42964,pl_42976,vec__42966,k,plugin,seq__42961__$1,temp__4423__auto__){
return (function (_,___$1,___$2,msg_hist){
return pl_42976.call(null,msg_hist);
});})(seq__42961,chunk__42962,count__42963,i__42964,pl_42976,vec__42966,k,plugin,seq__42961__$1,temp__4423__auto__))
);
} else {
}

var G__42977 = cljs.core.next.call(null,seq__42961__$1);
var G__42978 = null;
var G__42979 = (0);
var G__42980 = (0);
seq__42961 = G__42977;
chunk__42962 = G__42978;
count__42963 = G__42979;
i__42964 = G__42980;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.start = (function figwheel$client$start(){
var G__42982 = arguments.length;
switch (G__42982) {
case 1:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 0:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$1 = (function (opts){
if((goog.dependencies_ == null)){
return null;
} else {
if(typeof figwheel.client.__figwheel_start_once__ !== 'undefined'){
return null;
} else {
figwheel.client.__figwheel_start_once__ = setTimeout((function (){
var plugins_SINGLEQUOTE_ = new cljs.core.Keyword(null,"plugins","plugins",1900073717).cljs$core$IFn$_invoke$arity$1(opts);
var merge_plugins = new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370).cljs$core$IFn$_invoke$arity$1(opts);
var system_options = figwheel.client.handle_deprecated_jsload_callback.call(null,cljs.core.merge.call(null,figwheel.client.config_defaults,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"plugins","plugins",1900073717),new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370))));
var plugins = (cljs.core.truth_(plugins_SINGLEQUOTE_)?plugins_SINGLEQUOTE_:cljs.core.merge.call(null,figwheel.client.base_plugins.call(null,system_options),merge_plugins));
figwheel.client.utils._STAR_print_debug_STAR_ = new cljs.core.Keyword(null,"debug","debug",-1608172596).cljs$core$IFn$_invoke$arity$1(opts);

figwheel.client.add_plugins.call(null,plugins,system_options);

figwheel.client.file_reloading.patch_goog_base.call(null);

return figwheel.client.socket.open.call(null,system_options);
}));
}
}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$0 = (function (){
return figwheel.client.start.call(null,cljs.core.PersistentArrayMap.EMPTY);
});

figwheel.client.start.cljs$lang$maxFixedArity = 1;
figwheel.client.watch_and_reload_with_opts = figwheel.client.start;
figwheel.client.watch_and_reload = (function figwheel$client$watch_and_reload(){
var argseq__30305__auto__ = ((((0) < arguments.length))?(new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,(0)),(0))):null);
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(argseq__30305__auto__);
});

figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic = (function (p__42985){
var map__42986 = p__42985;
var map__42986__$1 = ((cljs.core.seq_QMARK_.call(null,map__42986))?cljs.core.apply.call(null,cljs.core.hash_map,map__42986):map__42986);
var opts = map__42986__$1;
return figwheel.client.start.call(null,opts);
});

figwheel.client.watch_and_reload.cljs$lang$maxFixedArity = (0);

figwheel.client.watch_and_reload.cljs$lang$applyTo = (function (seq42984){
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq42984));
});

//# sourceMappingURL=client.js.map