// Compiled by ClojureScript 0.0-3269 {}
goog.provide('eventstore.ui.frontend');
goog.require('cljs.core');
goog.require('om.dom');
goog.require('tailrecursion.cljson');
goog.require('fipp.edn');
goog.require('cljs_http.client');
goog.require('cljs.core.async');
goog.require('jayq.core');
goog.require('om.core');
if(typeof eventstore.ui.frontend.app_state !== 'undefined'){
} else {
eventstore.ui.frontend.app_state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"stream","stream",1534941648),null,new cljs.core.Keyword(null,"current","current",-1088038603),null,new cljs.core.Keyword(null,"initial-value","initial-value",470619381),"",new cljs.core.Keyword(null,"code","code",1586293142),"",new cljs.core.Keyword(null,"projections","projections",-1183474213),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"new-projection","new-projection",-1144791648),false], null));
}
eventstore.ui.frontend.clj__GT_str = (function eventstore$ui$frontend$clj__GT_str(c){
var res = clojure.string.replace.call(null,(function (){var sb__30296__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_33356_33358 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_33357_33359 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_33356_33358,_STAR_print_fn_STAR_33357_33359,sb__30296__auto__){
return (function (x__30297__auto__){
return sb__30296__auto__.append(x__30297__auto__);
});})(_STAR_print_newline_STAR_33356_33358,_STAR_print_fn_STAR_33357_33359,sb__30296__auto__))
;

try{fipp.edn.pprint.call(null,c,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),(80)], null));
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_33357_33359;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_33356_33358;
}
return [cljs.core.str(sb__30296__auto__)].join('');
})(),/}nil/,"}");
console.log(res);

return res;
});
eventstore.ui.frontend.update_box = (function eventstore$ui$frontend$update_box(owner,box_ref){
return hljs.highlightBlock(om.core.get_node.call(null,owner,box_ref));
});
eventstore.ui.frontend.update_projections_BANG_ = (function eventstore$ui$frontend$update_projections_BANG_(data){
var c__32427__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32427__auto__){
return (function (){
var f__32428__auto__ = (function (){var switch__32406__auto__ = ((function (c__32427__auto__){
return (function (state_33381){
var state_val_33382 = (state_33381[(1)]);
if((state_val_33382 === (1))){
var inst_33375 = cljs_http.client.get.call(null,"/projections");
var state_33381__$1 = state_33381;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33381__$1,(2),inst_33375);
} else {
if((state_val_33382 === (2))){
var inst_33377 = (state_33381[(2)]);
var inst_33378 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_33377);
var inst_33379 = om.core.update_BANG_.call(null,data,new cljs.core.Keyword(null,"projections","projections",-1183474213),inst_33378);
var state_33381__$1 = state_33381;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33381__$1,inst_33379);
} else {
return null;
}
}
});})(c__32427__auto__))
;
return ((function (switch__32406__auto__,c__32427__auto__){
return (function() {
var eventstore$ui$frontend$update_projections_BANG__$_state_machine__32407__auto__ = null;
var eventstore$ui$frontend$update_projections_BANG__$_state_machine__32407__auto____0 = (function (){
var statearr_33386 = [null,null,null,null,null,null,null];
(statearr_33386[(0)] = eventstore$ui$frontend$update_projections_BANG__$_state_machine__32407__auto__);

(statearr_33386[(1)] = (1));

return statearr_33386;
});
var eventstore$ui$frontend$update_projections_BANG__$_state_machine__32407__auto____1 = (function (state_33381){
while(true){
var ret_value__32408__auto__ = (function (){try{while(true){
var result__32409__auto__ = switch__32406__auto__.call(null,state_33381);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32409__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32409__auto__;
}
break;
}
}catch (e33387){if((e33387 instanceof Object)){
var ex__32410__auto__ = e33387;
var statearr_33388_33390 = state_33381;
(statearr_33388_33390[(5)] = ex__32410__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33381);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33387;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32408__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33391 = state_33381;
state_33381 = G__33391;
continue;
} else {
return ret_value__32408__auto__;
}
break;
}
});
eventstore$ui$frontend$update_projections_BANG__$_state_machine__32407__auto__ = function(state_33381){
switch(arguments.length){
case 0:
return eventstore$ui$frontend$update_projections_BANG__$_state_machine__32407__auto____0.call(this);
case 1:
return eventstore$ui$frontend$update_projections_BANG__$_state_machine__32407__auto____1.call(this,state_33381);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
eventstore$ui$frontend$update_projections_BANG__$_state_machine__32407__auto__.cljs$core$IFn$_invoke$arity$0 = eventstore$ui$frontend$update_projections_BANG__$_state_machine__32407__auto____0;
eventstore$ui$frontend$update_projections_BANG__$_state_machine__32407__auto__.cljs$core$IFn$_invoke$arity$1 = eventstore$ui$frontend$update_projections_BANG__$_state_machine__32407__auto____1;
return eventstore$ui$frontend$update_projections_BANG__$_state_machine__32407__auto__;
})()
;})(switch__32406__auto__,c__32427__auto__))
})();
var state__32429__auto__ = (function (){var statearr_33389 = f__32428__auto__.call(null);
(statearr_33389[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32427__auto__);

return statearr_33389;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32429__auto__);
});})(c__32427__auto__))
);

return c__32427__auto__;
});
eventstore.ui.frontend.widget_new_projection = (function eventstore$ui$frontend$widget_new_projection(data,owner){
if(typeof eventstore.ui.frontend.t33420 !== 'undefined'){
} else {

/**
* @constructor
*/
eventstore.ui.frontend.t33420 = (function (widget_new_projection,data,owner,meta33421){
this.widget_new_projection = widget_new_projection;
this.data = data;
this.owner = owner;
this.meta33421 = meta33421;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
eventstore.ui.frontend.t33420.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33422,meta33421__$1){
var self__ = this;
var _33422__$1 = this;
return (new eventstore.ui.frontend.t33420(self__.widget_new_projection,self__.data,self__.owner,meta33421__$1));
});

eventstore.ui.frontend.t33420.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33422){
var self__ = this;
var _33422__$1 = this;
return self__.meta33421;
});

eventstore.ui.frontend.t33420.prototype.om$core$IDidMount$ = true;

eventstore.ui.frontend.t33420.prototype.om$core$IDidMount$did_mount$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
eventstore.ui.frontend.update_box.call(null,self__.owner,"code-box");

return eventstore.ui.frontend.update_box.call(null,self__.owner,"initial-value-box");
});

eventstore.ui.frontend.t33420.prototype.om$core$IRender$ = true;

eventstore.ui.frontend.t33420.prototype.om$core$IRender$render$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return React.DOM.div(null,React.DOM.div(null,"Projection name",om.dom.input.call(null,{"type": "text", "ref": "name", "value": new cljs.core.Keyword(null,"projection-name","projection-name",-1947595457).cljs$core$IFn$_invoke$arity$1(self__.data), "onChange": ((function (___$1){
return (function (ev){
return om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"projection-name","projection-name",-1947595457),ev.target.value);
});})(___$1))
})),React.DOM.div(null,"Initial value"),React.DOM.pre(null,React.DOM.code({"className": "clojure"},React.DOM.div({"contentEditable": "true", "ref": "initial-value-box", "className": "clojure", "onBlur": ((function (___$1){
return (function (ev){
om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"initial-value","initial-value",470619381),ev.target.textContent);

return eventstore.ui.frontend.update_box.call(null,self__.owner,"initial-value-box");
});})(___$1))
},new cljs.core.Keyword(null,"initial-value","initial-value",470619381).cljs$core$IFn$_invoke$arity$1(self__.data)))),React.DOM.div(null,"Code: content of (fn [prev item] ... )"),React.DOM.pre(null,React.DOM.code({"className": "clojure"},React.DOM.div({"contentEditable": "true", "ref": "code-box", "className": "clojure", "onBlur": ((function (___$1){
return (function (ev){
om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"code","code",1586293142),ev.target.textContent);

return eventstore.ui.frontend.update_box.call(null,self__.owner,"code-box");
});})(___$1))
},new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(self__.data)))),React.DOM.div(null,React.DOM.button({"onClick": ((function (___$1){
return (function (___$2){
var c__32427__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32427__auto__,___$1){
return (function (){
var f__32428__auto__ = (function (){var switch__32406__auto__ = ((function (c__32427__auto__,___$1){
return (function (state_33438){
var state_val_33439 = (state_33438[(1)]);
if((state_val_33439 === (1))){
var inst_33423 = [new cljs.core.Keyword(null,"json-params","json-params",-1112693596)];
var inst_33424 = [new cljs.core.Keyword(null,"projection-name","projection-name",-1947595457),new cljs.core.Keyword(null,"initial-value","initial-value",470619381),new cljs.core.Keyword(null,"code","code",1586293142)];
var inst_33425 = new cljs.core.Keyword(null,"projection-name","projection-name",-1947595457).cljs$core$IFn$_invoke$arity$1(self__.data);
var inst_33426 = new cljs.core.Keyword(null,"initial-value","initial-value",470619381).cljs$core$IFn$_invoke$arity$1(self__.data);
var inst_33427 = new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(self__.data);
var inst_33428 = [inst_33425,inst_33426,inst_33427];
var inst_33429 = cljs.core.PersistentHashMap.fromArrays(inst_33424,inst_33428);
var inst_33430 = [inst_33429];
var inst_33431 = cljs.core.PersistentHashMap.fromArrays(inst_33423,inst_33430);
var inst_33432 = cljs_http.client.post.call(null,"/projections",inst_33431);
var state_33438__$1 = state_33438;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33438__$1,(2),inst_33432);
} else {
if((state_val_33439 === (2))){
var inst_33434 = (state_33438[(2)]);
var inst_33435 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_33434);
var inst_33436 = eventstore.ui.frontend.update_projections_BANG_.call(null,self__.data);
var state_33438__$1 = (function (){var statearr_33440 = state_33438;
(statearr_33440[(7)] = inst_33435);

return statearr_33440;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33438__$1,inst_33436);
} else {
return null;
}
}
});})(c__32427__auto__,___$1))
;
return ((function (switch__32406__auto__,c__32427__auto__,___$1){
return (function() {
var eventstore$ui$frontend$widget_new_projection_$_state_machine__32407__auto__ = null;
var eventstore$ui$frontend$widget_new_projection_$_state_machine__32407__auto____0 = (function (){
var statearr_33444 = [null,null,null,null,null,null,null,null];
(statearr_33444[(0)] = eventstore$ui$frontend$widget_new_projection_$_state_machine__32407__auto__);

(statearr_33444[(1)] = (1));

return statearr_33444;
});
var eventstore$ui$frontend$widget_new_projection_$_state_machine__32407__auto____1 = (function (state_33438){
while(true){
var ret_value__32408__auto__ = (function (){try{while(true){
var result__32409__auto__ = switch__32406__auto__.call(null,state_33438);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32409__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32409__auto__;
}
break;
}
}catch (e33445){if((e33445 instanceof Object)){
var ex__32410__auto__ = e33445;
var statearr_33446_33448 = state_33438;
(statearr_33446_33448[(5)] = ex__32410__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33438);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33445;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32408__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33449 = state_33438;
state_33438 = G__33449;
continue;
} else {
return ret_value__32408__auto__;
}
break;
}
});
eventstore$ui$frontend$widget_new_projection_$_state_machine__32407__auto__ = function(state_33438){
switch(arguments.length){
case 0:
return eventstore$ui$frontend$widget_new_projection_$_state_machine__32407__auto____0.call(this);
case 1:
return eventstore$ui$frontend$widget_new_projection_$_state_machine__32407__auto____1.call(this,state_33438);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
eventstore$ui$frontend$widget_new_projection_$_state_machine__32407__auto__.cljs$core$IFn$_invoke$arity$0 = eventstore$ui$frontend$widget_new_projection_$_state_machine__32407__auto____0;
eventstore$ui$frontend$widget_new_projection_$_state_machine__32407__auto__.cljs$core$IFn$_invoke$arity$1 = eventstore$ui$frontend$widget_new_projection_$_state_machine__32407__auto____1;
return eventstore$ui$frontend$widget_new_projection_$_state_machine__32407__auto__;
})()
;})(switch__32406__auto__,c__32427__auto__,___$1))
})();
var state__32429__auto__ = (function (){var statearr_33447 = f__32428__auto__.call(null);
(statearr_33447[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32427__auto__);

return statearr_33447;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32429__auto__);
});})(c__32427__auto__,___$1))
);

return c__32427__auto__;
});})(___$1))
},"Register projection")));
});

eventstore.ui.frontend.t33420.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"widget-new-projection","widget-new-projection",-572612337,null),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"meta33421","meta33421",-1833738382,null)], null);
});

eventstore.ui.frontend.t33420.cljs$lang$type = true;

eventstore.ui.frontend.t33420.cljs$lang$ctorStr = "eventstore.ui.frontend/t33420";

eventstore.ui.frontend.t33420.cljs$lang$ctorPrWriter = (function (this__29919__auto__,writer__29920__auto__,opt__29921__auto__){
return cljs.core._write.call(null,writer__29920__auto__,"eventstore.ui.frontend/t33420");
});

eventstore.ui.frontend.__GT_t33420 = (function eventstore$ui$frontend$widget_new_projection_$___GT_t33420(widget_new_projection__$1,data__$1,owner__$1,meta33421){
return (new eventstore.ui.frontend.t33420(widget_new_projection__$1,data__$1,owner__$1,meta33421));
});

}

return (new eventstore.ui.frontend.t33420(eventstore$ui$frontend$widget_new_projection,data,owner,cljs.core.PersistentArrayMap.EMPTY));
});
eventstore.ui.frontend.widget_projections = (function eventstore$ui$frontend$widget_projections(data,owner){
if(typeof eventstore.ui.frontend.t33454 !== 'undefined'){
} else {

/**
* @constructor
*/
eventstore.ui.frontend.t33454 = (function (widget_projections,data,owner,meta33455){
this.widget_projections = widget_projections;
this.data = data;
this.owner = owner;
this.meta33455 = meta33455;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
eventstore.ui.frontend.t33454.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33456,meta33455__$1){
var self__ = this;
var _33456__$1 = this;
return (new eventstore.ui.frontend.t33454(self__.widget_projections,self__.data,self__.owner,meta33455__$1));
});

eventstore.ui.frontend.t33454.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33456){
var self__ = this;
var _33456__$1 = this;
return self__.meta33455;
});

eventstore.ui.frontend.t33454.prototype.om$core$IInitState$ = true;

eventstore.ui.frontend.t33454.prototype.om$core$IInitState$init_state$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.PersistentArrayMap.EMPTY;
});

eventstore.ui.frontend.t33454.prototype.om$core$IDidMount$ = true;

eventstore.ui.frontend.t33454.prototype.om$core$IDidMount$did_mount$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return eventstore.ui.frontend.update_projections_BANG_.call(null,self__.data);
});

eventstore.ui.frontend.t33454.prototype.om$core$IRenderState$ = true;

eventstore.ui.frontend.t33454.prototype.om$core$IRenderState$render_state$arity$2 = (function (_,state){
var self__ = this;
var ___$1 = this;
return React.DOM.div(null,React.DOM.h1(null,"Projections"),React.DOM.button({"onClick": ((function (___$1){
return (function (___$2){
return om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"new-projection","new-projection",-1144791648),cljs.core.not.call(null,new cljs.core.Keyword(null,"new-projection","new-projection",-1144791648).cljs$core$IFn$_invoke$arity$1(self__.data)));
});})(___$1))
},"+ New Projection"),(cljs.core.truth_(new cljs.core.Keyword(null,"new-projection","new-projection",-1144791648).cljs$core$IFn$_invoke$arity$1(self__.data))?om.core.build.call(null,eventstore.ui.frontend.widget_new_projection,self__.data):null),cljs.core.apply.call(null,om.dom.ul,null,cljs.core.map.call(null,((function (___$1){
return (function (p1__33450_SHARP_){
return React.DOM.li(null,React.DOM.a({"href": "#", "onClick": ((function (___$1){
return (function (ev){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"current-projection","current-projection",-154217900).cljs$core$IFn$_invoke$arity$1(self__.data),p1__33450_SHARP_)){
return om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"current-projection","current-projection",-154217900),null);
} else {
return om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"current-projection","current-projection",-154217900),p1__33450_SHARP_);
}
});})(___$1))
},new cljs.core.Keyword(null,"query-name","query-name",1304059248).cljs$core$IFn$_invoke$arity$1(p1__33450_SHARP_)),((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"current-projection","current-projection",-154217900).cljs$core$IFn$_invoke$arity$1(self__.data),p1__33450_SHARP_))?React.DOM.pre(null,React.DOM.code({"className": "clojure"},eventstore.ui.frontend.clj__GT_str.call(null,p1__33450_SHARP_))):null));
});})(___$1))
,new cljs.core.Keyword(null,"projections","projections",-1183474213).cljs$core$IFn$_invoke$arity$1(self__.data))));
});

eventstore.ui.frontend.t33454.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"widget-projections","widget-projections",-1417704861,null),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"meta33455","meta33455",1610084377,null)], null);
});

eventstore.ui.frontend.t33454.cljs$lang$type = true;

eventstore.ui.frontend.t33454.cljs$lang$ctorStr = "eventstore.ui.frontend/t33454";

eventstore.ui.frontend.t33454.cljs$lang$ctorPrWriter = (function (this__29919__auto__,writer__29920__auto__,opt__29921__auto__){
return cljs.core._write.call(null,writer__29920__auto__,"eventstore.ui.frontend/t33454");
});

eventstore.ui.frontend.__GT_t33454 = (function eventstore$ui$frontend$widget_projections_$___GT_t33454(widget_projections__$1,data__$1,owner__$1,meta33455){
return (new eventstore.ui.frontend.t33454(widget_projections__$1,data__$1,owner__$1,meta33455));
});

}

return (new eventstore.ui.frontend.t33454(eventstore$ui$frontend$widget_projections,data,owner,cljs.core.PersistentArrayMap.EMPTY));
});
eventstore.ui.frontend.widget_streams = (function eventstore$ui$frontend$widget_streams(data,owner){
if(typeof eventstore.ui.frontend.t33478 !== 'undefined'){
} else {

/**
* @constructor
*/
eventstore.ui.frontend.t33478 = (function (widget_streams,data,owner,meta33479){
this.widget_streams = widget_streams;
this.data = data;
this.owner = owner;
this.meta33479 = meta33479;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
eventstore.ui.frontend.t33478.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33480,meta33479__$1){
var self__ = this;
var _33480__$1 = this;
return (new eventstore.ui.frontend.t33478(self__.widget_streams,self__.data,self__.owner,meta33479__$1));
});

eventstore.ui.frontend.t33478.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33480){
var self__ = this;
var _33480__$1 = this;
return self__.meta33479;
});

eventstore.ui.frontend.t33478.prototype.om$core$IInitState$ = true;

eventstore.ui.frontend.t33478.prototype.om$core$IInitState$init_state$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.data;
});

eventstore.ui.frontend.t33478.prototype.om$core$IDidMount$ = true;

eventstore.ui.frontend.t33478.prototype.om$core$IDidMount$did_mount$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var c__32427__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32427__auto__,this$__$1){
return (function (){
var f__32428__auto__ = (function (){var switch__32406__auto__ = ((function (c__32427__auto__,this$__$1){
return (function (state_33488){
var state_val_33489 = (state_33488[(1)]);
if((state_val_33489 === (1))){
var inst_33481 = cljs_http.client.get.call(null,"/streams");
var state_33488__$1 = state_33488;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33488__$1,(2),inst_33481);
} else {
if((state_val_33489 === (2))){
var inst_33483 = (state_33488[(2)]);
var inst_33484 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_33483);
var inst_33485 = (function (){var response = inst_33484;
return ((function (response,inst_33483,inst_33484,state_val_33489,c__32427__auto__,this$__$1){
return (function (p1__33457_SHARP_){
return cljs.core.assoc.call(null,p1__33457_SHARP_,new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Keyword(null,"streams","streams",1465783789).cljs$core$IFn$_invoke$arity$1(response));
});
;})(response,inst_33483,inst_33484,state_val_33489,c__32427__auto__,this$__$1))
})();
var inst_33486 = om.core.update_state_BANG_.call(null,self__.owner,inst_33485);
var state_33488__$1 = state_33488;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33488__$1,inst_33486);
} else {
return null;
}
}
});})(c__32427__auto__,this$__$1))
;
return ((function (switch__32406__auto__,c__32427__auto__,this$__$1){
return (function() {
var eventstore$ui$frontend$widget_streams_$_state_machine__32407__auto__ = null;
var eventstore$ui$frontend$widget_streams_$_state_machine__32407__auto____0 = (function (){
var statearr_33493 = [null,null,null,null,null,null,null];
(statearr_33493[(0)] = eventstore$ui$frontend$widget_streams_$_state_machine__32407__auto__);

(statearr_33493[(1)] = (1));

return statearr_33493;
});
var eventstore$ui$frontend$widget_streams_$_state_machine__32407__auto____1 = (function (state_33488){
while(true){
var ret_value__32408__auto__ = (function (){try{while(true){
var result__32409__auto__ = switch__32406__auto__.call(null,state_33488);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32409__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32409__auto__;
}
break;
}
}catch (e33494){if((e33494 instanceof Object)){
var ex__32410__auto__ = e33494;
var statearr_33495_33497 = state_33488;
(statearr_33495_33497[(5)] = ex__32410__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33488);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33494;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32408__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33498 = state_33488;
state_33488 = G__33498;
continue;
} else {
return ret_value__32408__auto__;
}
break;
}
});
eventstore$ui$frontend$widget_streams_$_state_machine__32407__auto__ = function(state_33488){
switch(arguments.length){
case 0:
return eventstore$ui$frontend$widget_streams_$_state_machine__32407__auto____0.call(this);
case 1:
return eventstore$ui$frontend$widget_streams_$_state_machine__32407__auto____1.call(this,state_33488);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
eventstore$ui$frontend$widget_streams_$_state_machine__32407__auto__.cljs$core$IFn$_invoke$arity$0 = eventstore$ui$frontend$widget_streams_$_state_machine__32407__auto____0;
eventstore$ui$frontend$widget_streams_$_state_machine__32407__auto__.cljs$core$IFn$_invoke$arity$1 = eventstore$ui$frontend$widget_streams_$_state_machine__32407__auto____1;
return eventstore$ui$frontend$widget_streams_$_state_machine__32407__auto__;
})()
;})(switch__32406__auto__,c__32427__auto__,this$__$1))
})();
var state__32429__auto__ = (function (){var statearr_33496 = f__32428__auto__.call(null);
(statearr_33496[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32427__auto__);

return statearr_33496;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32429__auto__);
});})(c__32427__auto__,this$__$1))
);

return c__32427__auto__;
});

eventstore.ui.frontend.t33478.prototype.om$core$IRenderState$ = true;

eventstore.ui.frontend.t33478.prototype.om$core$IRenderState$render_state$arity$2 = (function (_,state){
var self__ = this;
var ___$1 = this;
return React.DOM.div(null,React.DOM.h1(null,"Streams"),cljs.core.apply.call(null,om.dom.ul,null,cljs.core.map.call(null,((function (___$1){
return (function (p1__33458_SHARP_){
return React.DOM.li(null,React.DOM.a({"href": "#", "onClick": ((function (___$1){
return (function (ev){
return new cljs.core.Keyword(null,"handler","handler",-195596612).cljs$core$IFn$_invoke$arity$1(self__.data).call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stream","stream",1534941648),new cljs.core.Keyword(null,"stream","stream",1534941648).cljs$core$IFn$_invoke$arity$1(p1__33458_SHARP_)], null));
});})(___$1))
},new cljs.core.Keyword(null,"stream","stream",1534941648).cljs$core$IFn$_invoke$arity$1(p1__33458_SHARP_)));
});})(___$1))
,new cljs.core.Keyword(null,"streams","streams",1465783789).cljs$core$IFn$_invoke$arity$1(state))));
});

eventstore.ui.frontend.t33478.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"widget-streams","widget-streams",-828269583,null),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"meta33479","meta33479",-1040058334,null)], null);
});

eventstore.ui.frontend.t33478.cljs$lang$type = true;

eventstore.ui.frontend.t33478.cljs$lang$ctorStr = "eventstore.ui.frontend/t33478";

eventstore.ui.frontend.t33478.cljs$lang$ctorPrWriter = (function (this__29919__auto__,writer__29920__auto__,opt__29921__auto__){
return cljs.core._write.call(null,writer__29920__auto__,"eventstore.ui.frontend/t33478");
});

eventstore.ui.frontend.__GT_t33478 = (function eventstore$ui$frontend$widget_streams_$___GT_t33478(widget_streams__$1,data__$1,owner__$1,meta33479){
return (new eventstore.ui.frontend.t33478(widget_streams__$1,data__$1,owner__$1,meta33479));
});

}

return (new eventstore.ui.frontend.t33478(eventstore$ui$frontend$widget_streams,data,owner,cljs.core.PersistentArrayMap.EMPTY));
});
eventstore.ui.frontend.widget_stream = (function eventstore$ui$frontend$widget_stream(data,owner){
if(typeof eventstore.ui.frontend.t33522 !== 'undefined'){
} else {

/**
* @constructor
*/
eventstore.ui.frontend.t33522 = (function (widget_stream,data,owner,meta33523){
this.widget_stream = widget_stream;
this.data = data;
this.owner = owner;
this.meta33523 = meta33523;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
eventstore.ui.frontend.t33522.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33524,meta33523__$1){
var self__ = this;
var _33524__$1 = this;
return (new eventstore.ui.frontend.t33522(self__.widget_stream,self__.data,self__.owner,meta33523__$1));
});

eventstore.ui.frontend.t33522.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33524){
var self__ = this;
var _33524__$1 = this;
return self__.meta33523;
});

eventstore.ui.frontend.t33522.prototype.om$core$IInitState$ = true;

eventstore.ui.frontend.t33522.prototype.om$core$IInitState$init_state$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"events","events",1792552201),cljs.core.PersistentVector.EMPTY], null);
});

eventstore.ui.frontend.t33522.prototype.om$core$IDidMount$ = true;

eventstore.ui.frontend.t33522.prototype.om$core$IDidMount$did_mount$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var c__32427__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32427__auto__,this$__$1){
return (function (){
var f__32428__auto__ = (function (){var switch__32406__auto__ = ((function (c__32427__auto__,this$__$1){
return (function (state_33534){
var state_val_33535 = (state_33534[(1)]);
if((state_val_33535 === (1))){
var inst_33525 = new cljs.core.Keyword(null,"stream","stream",1534941648).cljs$core$IFn$_invoke$arity$1(self__.data);
var inst_33526 = [cljs.core.str("/stream/"),cljs.core.str(inst_33525)].join('');
var inst_33527 = cljs_http.client.get.call(null,inst_33526);
var state_33534__$1 = state_33534;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33534__$1,(2),inst_33527);
} else {
if((state_val_33535 === (2))){
var inst_33529 = (state_33534[(2)]);
var inst_33530 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_33529);
var inst_33531 = (function (){var response = inst_33530;
return ((function (response,inst_33529,inst_33530,state_val_33535,c__32427__auto__,this$__$1){
return (function (p1__33499_SHARP_){
return cljs.core.assoc.call(null,p1__33499_SHARP_,new cljs.core.Keyword(null,"events","events",1792552201),new cljs.core.Keyword(null,"results","results",-1134170113).cljs$core$IFn$_invoke$arity$1(response));
});
;})(response,inst_33529,inst_33530,state_val_33535,c__32427__auto__,this$__$1))
})();
var inst_33532 = om.core.update_state_BANG_.call(null,self__.owner,inst_33531);
var state_33534__$1 = state_33534;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33534__$1,inst_33532);
} else {
return null;
}
}
});})(c__32427__auto__,this$__$1))
;
return ((function (switch__32406__auto__,c__32427__auto__,this$__$1){
return (function() {
var eventstore$ui$frontend$widget_stream_$_state_machine__32407__auto__ = null;
var eventstore$ui$frontend$widget_stream_$_state_machine__32407__auto____0 = (function (){
var statearr_33539 = [null,null,null,null,null,null,null];
(statearr_33539[(0)] = eventstore$ui$frontend$widget_stream_$_state_machine__32407__auto__);

(statearr_33539[(1)] = (1));

return statearr_33539;
});
var eventstore$ui$frontend$widget_stream_$_state_machine__32407__auto____1 = (function (state_33534){
while(true){
var ret_value__32408__auto__ = (function (){try{while(true){
var result__32409__auto__ = switch__32406__auto__.call(null,state_33534);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32409__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32409__auto__;
}
break;
}
}catch (e33540){if((e33540 instanceof Object)){
var ex__32410__auto__ = e33540;
var statearr_33541_33543 = state_33534;
(statearr_33541_33543[(5)] = ex__32410__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33534);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33540;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32408__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33544 = state_33534;
state_33534 = G__33544;
continue;
} else {
return ret_value__32408__auto__;
}
break;
}
});
eventstore$ui$frontend$widget_stream_$_state_machine__32407__auto__ = function(state_33534){
switch(arguments.length){
case 0:
return eventstore$ui$frontend$widget_stream_$_state_machine__32407__auto____0.call(this);
case 1:
return eventstore$ui$frontend$widget_stream_$_state_machine__32407__auto____1.call(this,state_33534);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
eventstore$ui$frontend$widget_stream_$_state_machine__32407__auto__.cljs$core$IFn$_invoke$arity$0 = eventstore$ui$frontend$widget_stream_$_state_machine__32407__auto____0;
eventstore$ui$frontend$widget_stream_$_state_machine__32407__auto__.cljs$core$IFn$_invoke$arity$1 = eventstore$ui$frontend$widget_stream_$_state_machine__32407__auto____1;
return eventstore$ui$frontend$widget_stream_$_state_machine__32407__auto__;
})()
;})(switch__32406__auto__,c__32427__auto__,this$__$1))
})();
var state__32429__auto__ = (function (){var statearr_33542 = f__32428__auto__.call(null);
(statearr_33542[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32427__auto__);

return statearr_33542;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32429__auto__);
});})(c__32427__auto__,this$__$1))
);

return c__32427__auto__;
});

eventstore.ui.frontend.t33522.prototype.om$core$IDidUpdate$ = true;

eventstore.ui.frontend.t33522.prototype.om$core$IDidUpdate$did_update$arity$3 = (function (_,___$1,___$2){
var self__ = this;
var ___$3 = this;
return cljs.core.dorun.call(null,cljs.core.map.call(null,((function (___$3){
return (function (p1__33500_SHARP_){
return hljs.highlightBlock(p1__33500_SHARP_);
});})(___$3))
,jayq.core.$.call(null,"code")));
});

eventstore.ui.frontend.t33522.prototype.om$core$IRenderState$ = true;

eventstore.ui.frontend.t33522.prototype.om$core$IRenderState$render_state$arity$2 = (function (_,state){
var self__ = this;
var ___$1 = this;
console.log(new cljs.core.Keyword(null,"current","current",-1088038603).cljs$core$IFn$_invoke$arity$1(self__.data));

return React.DOM.div(null,React.DOM.h2(null,[cljs.core.str("Events: "),cljs.core.str(new cljs.core.Keyword(null,"stream","stream",1534941648).cljs$core$IFn$_invoke$arity$1(self__.data))].join('')),cljs.core.apply.call(null,om.dom.ul,null,cljs.core.map.call(null,((function (___$1){
return (function (event){
var payload = cljs.core.first.call(null,new cljs.core.Keyword(null,"payload_s","payload_s",-1382649676).cljs$core$IFn$_invoke$arity$1(event));
return React.DOM.li(null,(function (){var current_QMARK_ = cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"current","current",-1088038603).cljs$core$IFn$_invoke$arity$1(self__.data),cljs.core.first.call(null,new cljs.core.Keyword(null,"id_s","id_s",-1924701932).cljs$core$IFn$_invoke$arity$1(event)));
return React.DOM.div(null,React.DOM.a({"href": "#", "onClick": ((function (current_QMARK_,payload,___$1){
return (function (ev){
if(current_QMARK_){
return om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"current","current",-1088038603),null);
} else {
return om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"current","current",-1088038603),cljs.core.first.call(null,new cljs.core.Keyword(null,"id_s","id_s",-1924701932).cljs$core$IFn$_invoke$arity$1(event)));
}
});})(current_QMARK_,payload,___$1))
},cljs.core.first.call(null,new cljs.core.Keyword(null,"name_s","name_s",1626833566).cljs$core$IFn$_invoke$arity$1(event))),((current_QMARK_)?React.DOM.pre(null,React.DOM.code({"className": "clojure"},eventstore.ui.frontend.clj__GT_str.call(null,cljs.core.js__GT_clj.call(null,JSON.parse(payload),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true)))):null));
})());
});})(___$1))
,new cljs.core.Keyword(null,"events","events",1792552201).cljs$core$IFn$_invoke$arity$1(state))));
});

eventstore.ui.frontend.t33522.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"widget-stream","widget-stream",806489157,null),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"meta33523","meta33523",2084305842,null)], null);
});

eventstore.ui.frontend.t33522.cljs$lang$type = true;

eventstore.ui.frontend.t33522.cljs$lang$ctorStr = "eventstore.ui.frontend/t33522";

eventstore.ui.frontend.t33522.cljs$lang$ctorPrWriter = (function (this__29919__auto__,writer__29920__auto__,opt__29921__auto__){
return cljs.core._write.call(null,writer__29920__auto__,"eventstore.ui.frontend/t33522");
});

eventstore.ui.frontend.__GT_t33522 = (function eventstore$ui$frontend$widget_stream_$___GT_t33522(widget_stream__$1,data__$1,owner__$1,meta33523){
return (new eventstore.ui.frontend.t33522(widget_stream__$1,data__$1,owner__$1,meta33523));
});

}

return (new eventstore.ui.frontend.t33522(eventstore$ui$frontend$widget_stream,data,owner,cljs.core.PersistentArrayMap.EMPTY));
});
eventstore.ui.frontend.full_page = (function eventstore$ui$frontend$full_page(data,owner){
if(typeof eventstore.ui.frontend.t33548 !== 'undefined'){
} else {

/**
* @constructor
*/
eventstore.ui.frontend.t33548 = (function (full_page,data,owner,meta33549){
this.full_page = full_page;
this.data = data;
this.owner = owner;
this.meta33549 = meta33549;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
eventstore.ui.frontend.t33548.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33550,meta33549__$1){
var self__ = this;
var _33550__$1 = this;
return (new eventstore.ui.frontend.t33548(self__.full_page,self__.data,self__.owner,meta33549__$1));
});

eventstore.ui.frontend.t33548.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33550){
var self__ = this;
var _33550__$1 = this;
return self__.meta33549;
});

eventstore.ui.frontend.t33548.prototype.om$core$IRender$ = true;

eventstore.ui.frontend.t33548.prototype.om$core$IRender$render$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return React.DOM.div(null,om.core.build.call(null,eventstore.ui.frontend.widget_streams,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"handler","handler",-195596612),((function (___$1){
return (function (ev){
return om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"stream","stream",1534941648),new cljs.core.Keyword(null,"stream","stream",1534941648).cljs$core$IFn$_invoke$arity$1(ev));
});})(___$1))
,new cljs.core.Keyword(null,"streams","streams",1465783789),cljs.core.PersistentVector.EMPTY], null)),((!((new cljs.core.Keyword(null,"stream","stream",1534941648).cljs$core$IFn$_invoke$arity$1(self__.data) == null)))?om.core.build.call(null,eventstore.ui.frontend.widget_stream,self__.data):null),om.core.build.call(null,eventstore.ui.frontend.widget_projections,self__.data));
});

eventstore.ui.frontend.t33548.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"full-page","full-page",-1712627269,null),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"meta33549","meta33549",1235387214,null)], null);
});

eventstore.ui.frontend.t33548.cljs$lang$type = true;

eventstore.ui.frontend.t33548.cljs$lang$ctorStr = "eventstore.ui.frontend/t33548";

eventstore.ui.frontend.t33548.cljs$lang$ctorPrWriter = (function (this__29919__auto__,writer__29920__auto__,opt__29921__auto__){
return cljs.core._write.call(null,writer__29920__auto__,"eventstore.ui.frontend/t33548");
});

eventstore.ui.frontend.__GT_t33548 = (function eventstore$ui$frontend$full_page_$___GT_t33548(full_page__$1,data__$1,owner__$1,meta33549){
return (new eventstore.ui.frontend.t33548(full_page__$1,data__$1,owner__$1,meta33549));
});

}

return (new eventstore.ui.frontend.t33548(eventstore$ui$frontend$full_page,data,owner,cljs.core.PersistentArrayMap.EMPTY));
});
om.core.root.call(null,eventstore.ui.frontend.full_page,eventstore.ui.frontend.app_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),document.getElementById("main-area")], null));
eventstore.ui.frontend._main = (function eventstore$ui$frontend$_main(){
var argseq__30380__auto__ = ((((0) < arguments.length))?(new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,(0)),(0))):null);
return eventstore.ui.frontend._main.cljs$core$IFn$_invoke$arity$variadic(argseq__30380__auto__);
});

eventstore.ui.frontend._main.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return null;
});

eventstore.ui.frontend._main.cljs$lang$maxFixedArity = (0);

eventstore.ui.frontend._main.cljs$lang$applyTo = (function (seq33551){
return eventstore.ui.frontend._main.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq33551));
});

//# sourceMappingURL=frontend.js.map