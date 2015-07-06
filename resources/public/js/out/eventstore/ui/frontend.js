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
var _STAR_print_newline_STAR_33568_33570 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_33569_33571 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_33568_33570,_STAR_print_fn_STAR_33569_33571,sb__30296__auto__){
return (function (x__30297__auto__){
return sb__30296__auto__.append(x__30297__auto__);
});})(_STAR_print_newline_STAR_33568_33570,_STAR_print_fn_STAR_33569_33571,sb__30296__auto__))
;

try{fipp.edn.pprint.call(null,c,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),(80)], null));
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_33569_33571;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_33568_33570;
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
var c__32428__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32428__auto__){
return (function (){
var f__32429__auto__ = (function (){var switch__32407__auto__ = ((function (c__32428__auto__){
return (function (state_33593){
var state_val_33594 = (state_33593[(1)]);
if((state_val_33594 === (1))){
var inst_33587 = cljs_http.client.get.call(null,"/projections");
var state_33593__$1 = state_33593;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33593__$1,(2),inst_33587);
} else {
if((state_val_33594 === (2))){
var inst_33589 = (state_33593[(2)]);
var inst_33590 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_33589);
var inst_33591 = om.core.update_BANG_.call(null,data,new cljs.core.Keyword(null,"projections","projections",-1183474213),inst_33590);
var state_33593__$1 = state_33593;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33593__$1,inst_33591);
} else {
return null;
}
}
});})(c__32428__auto__))
;
return ((function (switch__32407__auto__,c__32428__auto__){
return (function() {
var eventstore$ui$frontend$update_projections_BANG__$_state_machine__32408__auto__ = null;
var eventstore$ui$frontend$update_projections_BANG__$_state_machine__32408__auto____0 = (function (){
var statearr_33598 = [null,null,null,null,null,null,null];
(statearr_33598[(0)] = eventstore$ui$frontend$update_projections_BANG__$_state_machine__32408__auto__);

(statearr_33598[(1)] = (1));

return statearr_33598;
});
var eventstore$ui$frontend$update_projections_BANG__$_state_machine__32408__auto____1 = (function (state_33593){
while(true){
var ret_value__32409__auto__ = (function (){try{while(true){
var result__32410__auto__ = switch__32407__auto__.call(null,state_33593);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32410__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32410__auto__;
}
break;
}
}catch (e33599){if((e33599 instanceof Object)){
var ex__32411__auto__ = e33599;
var statearr_33600_33602 = state_33593;
(statearr_33600_33602[(5)] = ex__32411__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33593);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33599;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32409__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33603 = state_33593;
state_33593 = G__33603;
continue;
} else {
return ret_value__32409__auto__;
}
break;
}
});
eventstore$ui$frontend$update_projections_BANG__$_state_machine__32408__auto__ = function(state_33593){
switch(arguments.length){
case 0:
return eventstore$ui$frontend$update_projections_BANG__$_state_machine__32408__auto____0.call(this);
case 1:
return eventstore$ui$frontend$update_projections_BANG__$_state_machine__32408__auto____1.call(this,state_33593);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
eventstore$ui$frontend$update_projections_BANG__$_state_machine__32408__auto__.cljs$core$IFn$_invoke$arity$0 = eventstore$ui$frontend$update_projections_BANG__$_state_machine__32408__auto____0;
eventstore$ui$frontend$update_projections_BANG__$_state_machine__32408__auto__.cljs$core$IFn$_invoke$arity$1 = eventstore$ui$frontend$update_projections_BANG__$_state_machine__32408__auto____1;
return eventstore$ui$frontend$update_projections_BANG__$_state_machine__32408__auto__;
})()
;})(switch__32407__auto__,c__32428__auto__))
})();
var state__32430__auto__ = (function (){var statearr_33601 = f__32429__auto__.call(null);
(statearr_33601[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32428__auto__);

return statearr_33601;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32430__auto__);
});})(c__32428__auto__))
);

return c__32428__auto__;
});
eventstore.ui.frontend.widget_new_projection = (function eventstore$ui$frontend$widget_new_projection(data,owner){
if(typeof eventstore.ui.frontend.t33632 !== 'undefined'){
} else {

/**
* @constructor
*/
eventstore.ui.frontend.t33632 = (function (widget_new_projection,data,owner,meta33633){
this.widget_new_projection = widget_new_projection;
this.data = data;
this.owner = owner;
this.meta33633 = meta33633;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
eventstore.ui.frontend.t33632.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33634,meta33633__$1){
var self__ = this;
var _33634__$1 = this;
return (new eventstore.ui.frontend.t33632(self__.widget_new_projection,self__.data,self__.owner,meta33633__$1));
});

eventstore.ui.frontend.t33632.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33634){
var self__ = this;
var _33634__$1 = this;
return self__.meta33633;
});

eventstore.ui.frontend.t33632.prototype.om$core$IDidMount$ = true;

eventstore.ui.frontend.t33632.prototype.om$core$IDidMount$did_mount$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
eventstore.ui.frontend.update_box.call(null,self__.owner,"code-box");

return eventstore.ui.frontend.update_box.call(null,self__.owner,"initial-value-box");
});

eventstore.ui.frontend.t33632.prototype.om$core$IRender$ = true;

eventstore.ui.frontend.t33632.prototype.om$core$IRender$render$arity$1 = (function (_){
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
var c__32428__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32428__auto__,___$1){
return (function (){
var f__32429__auto__ = (function (){var switch__32407__auto__ = ((function (c__32428__auto__,___$1){
return (function (state_33650){
var state_val_33651 = (state_33650[(1)]);
if((state_val_33651 === (1))){
var inst_33635 = [new cljs.core.Keyword(null,"json-params","json-params",-1112693596)];
var inst_33636 = [new cljs.core.Keyword(null,"projection-name","projection-name",-1947595457),new cljs.core.Keyword(null,"initial-value","initial-value",470619381),new cljs.core.Keyword(null,"code","code",1586293142)];
var inst_33637 = new cljs.core.Keyword(null,"projection-name","projection-name",-1947595457).cljs$core$IFn$_invoke$arity$1(self__.data);
var inst_33638 = new cljs.core.Keyword(null,"initial-value","initial-value",470619381).cljs$core$IFn$_invoke$arity$1(self__.data);
var inst_33639 = new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(self__.data);
var inst_33640 = [inst_33637,inst_33638,inst_33639];
var inst_33641 = cljs.core.PersistentHashMap.fromArrays(inst_33636,inst_33640);
var inst_33642 = [inst_33641];
var inst_33643 = cljs.core.PersistentHashMap.fromArrays(inst_33635,inst_33642);
var inst_33644 = cljs_http.client.post.call(null,"/projections",inst_33643);
var state_33650__$1 = state_33650;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33650__$1,(2),inst_33644);
} else {
if((state_val_33651 === (2))){
var inst_33646 = (state_33650[(2)]);
var inst_33647 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_33646);
var inst_33648 = eventstore.ui.frontend.update_projections_BANG_.call(null,self__.data);
var state_33650__$1 = (function (){var statearr_33652 = state_33650;
(statearr_33652[(7)] = inst_33647);

return statearr_33652;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33650__$1,inst_33648);
} else {
return null;
}
}
});})(c__32428__auto__,___$1))
;
return ((function (switch__32407__auto__,c__32428__auto__,___$1){
return (function() {
var eventstore$ui$frontend$widget_new_projection_$_state_machine__32408__auto__ = null;
var eventstore$ui$frontend$widget_new_projection_$_state_machine__32408__auto____0 = (function (){
var statearr_33656 = [null,null,null,null,null,null,null,null];
(statearr_33656[(0)] = eventstore$ui$frontend$widget_new_projection_$_state_machine__32408__auto__);

(statearr_33656[(1)] = (1));

return statearr_33656;
});
var eventstore$ui$frontend$widget_new_projection_$_state_machine__32408__auto____1 = (function (state_33650){
while(true){
var ret_value__32409__auto__ = (function (){try{while(true){
var result__32410__auto__ = switch__32407__auto__.call(null,state_33650);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32410__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32410__auto__;
}
break;
}
}catch (e33657){if((e33657 instanceof Object)){
var ex__32411__auto__ = e33657;
var statearr_33658_33660 = state_33650;
(statearr_33658_33660[(5)] = ex__32411__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33650);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33657;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32409__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33661 = state_33650;
state_33650 = G__33661;
continue;
} else {
return ret_value__32409__auto__;
}
break;
}
});
eventstore$ui$frontend$widget_new_projection_$_state_machine__32408__auto__ = function(state_33650){
switch(arguments.length){
case 0:
return eventstore$ui$frontend$widget_new_projection_$_state_machine__32408__auto____0.call(this);
case 1:
return eventstore$ui$frontend$widget_new_projection_$_state_machine__32408__auto____1.call(this,state_33650);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
eventstore$ui$frontend$widget_new_projection_$_state_machine__32408__auto__.cljs$core$IFn$_invoke$arity$0 = eventstore$ui$frontend$widget_new_projection_$_state_machine__32408__auto____0;
eventstore$ui$frontend$widget_new_projection_$_state_machine__32408__auto__.cljs$core$IFn$_invoke$arity$1 = eventstore$ui$frontend$widget_new_projection_$_state_machine__32408__auto____1;
return eventstore$ui$frontend$widget_new_projection_$_state_machine__32408__auto__;
})()
;})(switch__32407__auto__,c__32428__auto__,___$1))
})();
var state__32430__auto__ = (function (){var statearr_33659 = f__32429__auto__.call(null);
(statearr_33659[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32428__auto__);

return statearr_33659;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32430__auto__);
});})(c__32428__auto__,___$1))
);

return c__32428__auto__;
});})(___$1))
},"Register projection")));
});

eventstore.ui.frontend.t33632.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"widget-new-projection","widget-new-projection",-572612337,null),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"meta33633","meta33633",1147284837,null)], null);
});

eventstore.ui.frontend.t33632.cljs$lang$type = true;

eventstore.ui.frontend.t33632.cljs$lang$ctorStr = "eventstore.ui.frontend/t33632";

eventstore.ui.frontend.t33632.cljs$lang$ctorPrWriter = (function (this__29919__auto__,writer__29920__auto__,opt__29921__auto__){
return cljs.core._write.call(null,writer__29920__auto__,"eventstore.ui.frontend/t33632");
});

eventstore.ui.frontend.__GT_t33632 = (function eventstore$ui$frontend$widget_new_projection_$___GT_t33632(widget_new_projection__$1,data__$1,owner__$1,meta33633){
return (new eventstore.ui.frontend.t33632(widget_new_projection__$1,data__$1,owner__$1,meta33633));
});

}

return (new eventstore.ui.frontend.t33632(eventstore$ui$frontend$widget_new_projection,data,owner,cljs.core.PersistentArrayMap.EMPTY));
});
eventstore.ui.frontend.widget_projections = (function eventstore$ui$frontend$widget_projections(data,owner){
if(typeof eventstore.ui.frontend.t33666 !== 'undefined'){
} else {

/**
* @constructor
*/
eventstore.ui.frontend.t33666 = (function (widget_projections,data,owner,meta33667){
this.widget_projections = widget_projections;
this.data = data;
this.owner = owner;
this.meta33667 = meta33667;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
eventstore.ui.frontend.t33666.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33668,meta33667__$1){
var self__ = this;
var _33668__$1 = this;
return (new eventstore.ui.frontend.t33666(self__.widget_projections,self__.data,self__.owner,meta33667__$1));
});

eventstore.ui.frontend.t33666.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33668){
var self__ = this;
var _33668__$1 = this;
return self__.meta33667;
});

eventstore.ui.frontend.t33666.prototype.om$core$IInitState$ = true;

eventstore.ui.frontend.t33666.prototype.om$core$IInitState$init_state$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.PersistentArrayMap.EMPTY;
});

eventstore.ui.frontend.t33666.prototype.om$core$IDidMount$ = true;

eventstore.ui.frontend.t33666.prototype.om$core$IDidMount$did_mount$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return eventstore.ui.frontend.update_projections_BANG_.call(null,self__.data);
});

eventstore.ui.frontend.t33666.prototype.om$core$IRenderState$ = true;

eventstore.ui.frontend.t33666.prototype.om$core$IRenderState$render_state$arity$2 = (function (_,state){
var self__ = this;
var ___$1 = this;
return React.DOM.div(null,React.DOM.h1(null,"Projections"),React.DOM.button({"onClick": ((function (___$1){
return (function (___$2){
return om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"new-projection","new-projection",-1144791648),cljs.core.not.call(null,new cljs.core.Keyword(null,"new-projection","new-projection",-1144791648).cljs$core$IFn$_invoke$arity$1(self__.data)));
});})(___$1))
},"+ New Projection"),(cljs.core.truth_(new cljs.core.Keyword(null,"new-projection","new-projection",-1144791648).cljs$core$IFn$_invoke$arity$1(self__.data))?om.core.build.call(null,eventstore.ui.frontend.widget_new_projection,self__.data):null),cljs.core.apply.call(null,om.dom.ul,null,cljs.core.map.call(null,((function (___$1){
return (function (p1__33662_SHARP_){
return React.DOM.li(null,React.DOM.a({"href": "#", "onClick": ((function (___$1){
return (function (ev){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"current-projection","current-projection",-154217900).cljs$core$IFn$_invoke$arity$1(self__.data),p1__33662_SHARP_)){
return om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"current-projection","current-projection",-154217900),null);
} else {
return om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"current-projection","current-projection",-154217900),p1__33662_SHARP_);
}
});})(___$1))
},new cljs.core.Keyword(null,"query-name","query-name",1304059248).cljs$core$IFn$_invoke$arity$1(p1__33662_SHARP_)),((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"current-projection","current-projection",-154217900).cljs$core$IFn$_invoke$arity$1(self__.data),p1__33662_SHARP_))?React.DOM.pre(null,React.DOM.code({"className": "clojure"},eventstore.ui.frontend.clj__GT_str.call(null,p1__33662_SHARP_))):null));
});})(___$1))
,new cljs.core.Keyword(null,"projections","projections",-1183474213).cljs$core$IFn$_invoke$arity$1(self__.data))));
});

eventstore.ui.frontend.t33666.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"widget-projections","widget-projections",-1417704861,null),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"meta33667","meta33667",1715059565,null)], null);
});

eventstore.ui.frontend.t33666.cljs$lang$type = true;

eventstore.ui.frontend.t33666.cljs$lang$ctorStr = "eventstore.ui.frontend/t33666";

eventstore.ui.frontend.t33666.cljs$lang$ctorPrWriter = (function (this__29919__auto__,writer__29920__auto__,opt__29921__auto__){
return cljs.core._write.call(null,writer__29920__auto__,"eventstore.ui.frontend/t33666");
});

eventstore.ui.frontend.__GT_t33666 = (function eventstore$ui$frontend$widget_projections_$___GT_t33666(widget_projections__$1,data__$1,owner__$1,meta33667){
return (new eventstore.ui.frontend.t33666(widget_projections__$1,data__$1,owner__$1,meta33667));
});

}

return (new eventstore.ui.frontend.t33666(eventstore$ui$frontend$widget_projections,data,owner,cljs.core.PersistentArrayMap.EMPTY));
});
eventstore.ui.frontend.widget_streams = (function eventstore$ui$frontend$widget_streams(data,owner){
if(typeof eventstore.ui.frontend.t33690 !== 'undefined'){
} else {

/**
* @constructor
*/
eventstore.ui.frontend.t33690 = (function (widget_streams,data,owner,meta33691){
this.widget_streams = widget_streams;
this.data = data;
this.owner = owner;
this.meta33691 = meta33691;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
eventstore.ui.frontend.t33690.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33692,meta33691__$1){
var self__ = this;
var _33692__$1 = this;
return (new eventstore.ui.frontend.t33690(self__.widget_streams,self__.data,self__.owner,meta33691__$1));
});

eventstore.ui.frontend.t33690.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33692){
var self__ = this;
var _33692__$1 = this;
return self__.meta33691;
});

eventstore.ui.frontend.t33690.prototype.om$core$IInitState$ = true;

eventstore.ui.frontend.t33690.prototype.om$core$IInitState$init_state$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.data;
});

eventstore.ui.frontend.t33690.prototype.om$core$IDidMount$ = true;

eventstore.ui.frontend.t33690.prototype.om$core$IDidMount$did_mount$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var c__32428__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32428__auto__,this$__$1){
return (function (){
var f__32429__auto__ = (function (){var switch__32407__auto__ = ((function (c__32428__auto__,this$__$1){
return (function (state_33700){
var state_val_33701 = (state_33700[(1)]);
if((state_val_33701 === (1))){
var inst_33693 = cljs_http.client.get.call(null,"/streams");
var state_33700__$1 = state_33700;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33700__$1,(2),inst_33693);
} else {
if((state_val_33701 === (2))){
var inst_33695 = (state_33700[(2)]);
var inst_33696 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_33695);
var inst_33697 = (function (){var response = inst_33696;
return ((function (response,inst_33695,inst_33696,state_val_33701,c__32428__auto__,this$__$1){
return (function (p1__33669_SHARP_){
return cljs.core.assoc.call(null,p1__33669_SHARP_,new cljs.core.Keyword(null,"streams","streams",1465783789),new cljs.core.Keyword(null,"streams","streams",1465783789).cljs$core$IFn$_invoke$arity$1(response));
});
;})(response,inst_33695,inst_33696,state_val_33701,c__32428__auto__,this$__$1))
})();
var inst_33698 = om.core.update_state_BANG_.call(null,self__.owner,inst_33697);
var state_33700__$1 = state_33700;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33700__$1,inst_33698);
} else {
return null;
}
}
});})(c__32428__auto__,this$__$1))
;
return ((function (switch__32407__auto__,c__32428__auto__,this$__$1){
return (function() {
var eventstore$ui$frontend$widget_streams_$_state_machine__32408__auto__ = null;
var eventstore$ui$frontend$widget_streams_$_state_machine__32408__auto____0 = (function (){
var statearr_33705 = [null,null,null,null,null,null,null];
(statearr_33705[(0)] = eventstore$ui$frontend$widget_streams_$_state_machine__32408__auto__);

(statearr_33705[(1)] = (1));

return statearr_33705;
});
var eventstore$ui$frontend$widget_streams_$_state_machine__32408__auto____1 = (function (state_33700){
while(true){
var ret_value__32409__auto__ = (function (){try{while(true){
var result__32410__auto__ = switch__32407__auto__.call(null,state_33700);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32410__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32410__auto__;
}
break;
}
}catch (e33706){if((e33706 instanceof Object)){
var ex__32411__auto__ = e33706;
var statearr_33707_33709 = state_33700;
(statearr_33707_33709[(5)] = ex__32411__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33700);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33706;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32409__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33710 = state_33700;
state_33700 = G__33710;
continue;
} else {
return ret_value__32409__auto__;
}
break;
}
});
eventstore$ui$frontend$widget_streams_$_state_machine__32408__auto__ = function(state_33700){
switch(arguments.length){
case 0:
return eventstore$ui$frontend$widget_streams_$_state_machine__32408__auto____0.call(this);
case 1:
return eventstore$ui$frontend$widget_streams_$_state_machine__32408__auto____1.call(this,state_33700);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
eventstore$ui$frontend$widget_streams_$_state_machine__32408__auto__.cljs$core$IFn$_invoke$arity$0 = eventstore$ui$frontend$widget_streams_$_state_machine__32408__auto____0;
eventstore$ui$frontend$widget_streams_$_state_machine__32408__auto__.cljs$core$IFn$_invoke$arity$1 = eventstore$ui$frontend$widget_streams_$_state_machine__32408__auto____1;
return eventstore$ui$frontend$widget_streams_$_state_machine__32408__auto__;
})()
;})(switch__32407__auto__,c__32428__auto__,this$__$1))
})();
var state__32430__auto__ = (function (){var statearr_33708 = f__32429__auto__.call(null);
(statearr_33708[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32428__auto__);

return statearr_33708;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32430__auto__);
});})(c__32428__auto__,this$__$1))
);

return c__32428__auto__;
});

eventstore.ui.frontend.t33690.prototype.om$core$IRenderState$ = true;

eventstore.ui.frontend.t33690.prototype.om$core$IRenderState$render_state$arity$2 = (function (_,state){
var self__ = this;
var ___$1 = this;
return React.DOM.div(null,React.DOM.h1(null,"Streams"),cljs.core.apply.call(null,om.dom.ul,null,cljs.core.map.call(null,((function (___$1){
return (function (p1__33670_SHARP_){
return React.DOM.li(null,React.DOM.a({"href": "#", "onClick": ((function (___$1){
return (function (ev){
return new cljs.core.Keyword(null,"handler","handler",-195596612).cljs$core$IFn$_invoke$arity$1(self__.data).call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stream","stream",1534941648),new cljs.core.Keyword(null,"stream","stream",1534941648).cljs$core$IFn$_invoke$arity$1(p1__33670_SHARP_)], null));
});})(___$1))
},new cljs.core.Keyword(null,"stream","stream",1534941648).cljs$core$IFn$_invoke$arity$1(p1__33670_SHARP_)));
});})(___$1))
,new cljs.core.Keyword(null,"streams","streams",1465783789).cljs$core$IFn$_invoke$arity$1(state))));
});

eventstore.ui.frontend.t33690.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"widget-streams","widget-streams",-828269583,null),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"meta33691","meta33691",1807520697,null)], null);
});

eventstore.ui.frontend.t33690.cljs$lang$type = true;

eventstore.ui.frontend.t33690.cljs$lang$ctorStr = "eventstore.ui.frontend/t33690";

eventstore.ui.frontend.t33690.cljs$lang$ctorPrWriter = (function (this__29919__auto__,writer__29920__auto__,opt__29921__auto__){
return cljs.core._write.call(null,writer__29920__auto__,"eventstore.ui.frontend/t33690");
});

eventstore.ui.frontend.__GT_t33690 = (function eventstore$ui$frontend$widget_streams_$___GT_t33690(widget_streams__$1,data__$1,owner__$1,meta33691){
return (new eventstore.ui.frontend.t33690(widget_streams__$1,data__$1,owner__$1,meta33691));
});

}

return (new eventstore.ui.frontend.t33690(eventstore$ui$frontend$widget_streams,data,owner,cljs.core.PersistentArrayMap.EMPTY));
});
eventstore.ui.frontend.widget_stream = (function eventstore$ui$frontend$widget_stream(data,owner){
if(typeof eventstore.ui.frontend.t33734 !== 'undefined'){
} else {

/**
* @constructor
*/
eventstore.ui.frontend.t33734 = (function (widget_stream,data,owner,meta33735){
this.widget_stream = widget_stream;
this.data = data;
this.owner = owner;
this.meta33735 = meta33735;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
eventstore.ui.frontend.t33734.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33736,meta33735__$1){
var self__ = this;
var _33736__$1 = this;
return (new eventstore.ui.frontend.t33734(self__.widget_stream,self__.data,self__.owner,meta33735__$1));
});

eventstore.ui.frontend.t33734.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33736){
var self__ = this;
var _33736__$1 = this;
return self__.meta33735;
});

eventstore.ui.frontend.t33734.prototype.om$core$IInitState$ = true;

eventstore.ui.frontend.t33734.prototype.om$core$IInitState$init_state$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"events","events",1792552201),cljs.core.PersistentVector.EMPTY], null);
});

eventstore.ui.frontend.t33734.prototype.om$core$IDidMount$ = true;

eventstore.ui.frontend.t33734.prototype.om$core$IDidMount$did_mount$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var c__32428__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32428__auto__,this$__$1){
return (function (){
var f__32429__auto__ = (function (){var switch__32407__auto__ = ((function (c__32428__auto__,this$__$1){
return (function (state_33746){
var state_val_33747 = (state_33746[(1)]);
if((state_val_33747 === (1))){
var inst_33737 = new cljs.core.Keyword(null,"stream","stream",1534941648).cljs$core$IFn$_invoke$arity$1(self__.data);
var inst_33738 = [cljs.core.str("/stream/"),cljs.core.str(inst_33737)].join('');
var inst_33739 = cljs_http.client.get.call(null,inst_33738);
var state_33746__$1 = state_33746;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33746__$1,(2),inst_33739);
} else {
if((state_val_33747 === (2))){
var inst_33741 = (state_33746[(2)]);
var inst_33742 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_33741);
var inst_33743 = (function (){var response = inst_33742;
return ((function (response,inst_33741,inst_33742,state_val_33747,c__32428__auto__,this$__$1){
return (function (p1__33711_SHARP_){
return cljs.core.assoc.call(null,p1__33711_SHARP_,new cljs.core.Keyword(null,"events","events",1792552201),new cljs.core.Keyword(null,"results","results",-1134170113).cljs$core$IFn$_invoke$arity$1(response));
});
;})(response,inst_33741,inst_33742,state_val_33747,c__32428__auto__,this$__$1))
})();
var inst_33744 = om.core.update_state_BANG_.call(null,self__.owner,inst_33743);
var state_33746__$1 = state_33746;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33746__$1,inst_33744);
} else {
return null;
}
}
});})(c__32428__auto__,this$__$1))
;
return ((function (switch__32407__auto__,c__32428__auto__,this$__$1){
return (function() {
var eventstore$ui$frontend$widget_stream_$_state_machine__32408__auto__ = null;
var eventstore$ui$frontend$widget_stream_$_state_machine__32408__auto____0 = (function (){
var statearr_33751 = [null,null,null,null,null,null,null];
(statearr_33751[(0)] = eventstore$ui$frontend$widget_stream_$_state_machine__32408__auto__);

(statearr_33751[(1)] = (1));

return statearr_33751;
});
var eventstore$ui$frontend$widget_stream_$_state_machine__32408__auto____1 = (function (state_33746){
while(true){
var ret_value__32409__auto__ = (function (){try{while(true){
var result__32410__auto__ = switch__32407__auto__.call(null,state_33746);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32410__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32410__auto__;
}
break;
}
}catch (e33752){if((e33752 instanceof Object)){
var ex__32411__auto__ = e33752;
var statearr_33753_33755 = state_33746;
(statearr_33753_33755[(5)] = ex__32411__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33746);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33752;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32409__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33756 = state_33746;
state_33746 = G__33756;
continue;
} else {
return ret_value__32409__auto__;
}
break;
}
});
eventstore$ui$frontend$widget_stream_$_state_machine__32408__auto__ = function(state_33746){
switch(arguments.length){
case 0:
return eventstore$ui$frontend$widget_stream_$_state_machine__32408__auto____0.call(this);
case 1:
return eventstore$ui$frontend$widget_stream_$_state_machine__32408__auto____1.call(this,state_33746);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
eventstore$ui$frontend$widget_stream_$_state_machine__32408__auto__.cljs$core$IFn$_invoke$arity$0 = eventstore$ui$frontend$widget_stream_$_state_machine__32408__auto____0;
eventstore$ui$frontend$widget_stream_$_state_machine__32408__auto__.cljs$core$IFn$_invoke$arity$1 = eventstore$ui$frontend$widget_stream_$_state_machine__32408__auto____1;
return eventstore$ui$frontend$widget_stream_$_state_machine__32408__auto__;
})()
;})(switch__32407__auto__,c__32428__auto__,this$__$1))
})();
var state__32430__auto__ = (function (){var statearr_33754 = f__32429__auto__.call(null);
(statearr_33754[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32428__auto__);

return statearr_33754;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32430__auto__);
});})(c__32428__auto__,this$__$1))
);

return c__32428__auto__;
});

eventstore.ui.frontend.t33734.prototype.om$core$IDidUpdate$ = true;

eventstore.ui.frontend.t33734.prototype.om$core$IDidUpdate$did_update$arity$3 = (function (_,___$1,___$2){
var self__ = this;
var ___$3 = this;
return cljs.core.dorun.call(null,cljs.core.map.call(null,((function (___$3){
return (function (p1__33712_SHARP_){
return hljs.highlightBlock(p1__33712_SHARP_);
});})(___$3))
,jayq.core.$.call(null,"code")));
});

eventstore.ui.frontend.t33734.prototype.om$core$IRenderState$ = true;

eventstore.ui.frontend.t33734.prototype.om$core$IRenderState$render_state$arity$2 = (function (_,state){
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

eventstore.ui.frontend.t33734.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"widget-stream","widget-stream",806489157,null),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"meta33735","meta33735",-2116085410,null)], null);
});

eventstore.ui.frontend.t33734.cljs$lang$type = true;

eventstore.ui.frontend.t33734.cljs$lang$ctorStr = "eventstore.ui.frontend/t33734";

eventstore.ui.frontend.t33734.cljs$lang$ctorPrWriter = (function (this__29919__auto__,writer__29920__auto__,opt__29921__auto__){
return cljs.core._write.call(null,writer__29920__auto__,"eventstore.ui.frontend/t33734");
});

eventstore.ui.frontend.__GT_t33734 = (function eventstore$ui$frontend$widget_stream_$___GT_t33734(widget_stream__$1,data__$1,owner__$1,meta33735){
return (new eventstore.ui.frontend.t33734(widget_stream__$1,data__$1,owner__$1,meta33735));
});

}

return (new eventstore.ui.frontend.t33734(eventstore$ui$frontend$widget_stream,data,owner,cljs.core.PersistentArrayMap.EMPTY));
});
eventstore.ui.frontend.full_page = (function eventstore$ui$frontend$full_page(data,owner){
if(typeof eventstore.ui.frontend.t33760 !== 'undefined'){
} else {

/**
* @constructor
*/
eventstore.ui.frontend.t33760 = (function (full_page,data,owner,meta33761){
this.full_page = full_page;
this.data = data;
this.owner = owner;
this.meta33761 = meta33761;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
eventstore.ui.frontend.t33760.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33762,meta33761__$1){
var self__ = this;
var _33762__$1 = this;
return (new eventstore.ui.frontend.t33760(self__.full_page,self__.data,self__.owner,meta33761__$1));
});

eventstore.ui.frontend.t33760.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33762){
var self__ = this;
var _33762__$1 = this;
return self__.meta33761;
});

eventstore.ui.frontend.t33760.prototype.om$core$IRender$ = true;

eventstore.ui.frontend.t33760.prototype.om$core$IRender$render$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return React.DOM.div(null,om.core.build.call(null,eventstore.ui.frontend.widget_streams,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"handler","handler",-195596612),((function (___$1){
return (function (ev){
return om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"stream","stream",1534941648),new cljs.core.Keyword(null,"stream","stream",1534941648).cljs$core$IFn$_invoke$arity$1(ev));
});})(___$1))
,new cljs.core.Keyword(null,"streams","streams",1465783789),cljs.core.PersistentVector.EMPTY], null)),((!((new cljs.core.Keyword(null,"stream","stream",1534941648).cljs$core$IFn$_invoke$arity$1(self__.data) == null)))?om.core.build.call(null,eventstore.ui.frontend.widget_stream,self__.data):null),om.core.build.call(null,eventstore.ui.frontend.widget_projections,self__.data));
});

eventstore.ui.frontend.t33760.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"full-page","full-page",-1712627269,null),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"meta33761","meta33761",66283670,null)], null);
});

eventstore.ui.frontend.t33760.cljs$lang$type = true;

eventstore.ui.frontend.t33760.cljs$lang$ctorStr = "eventstore.ui.frontend/t33760";

eventstore.ui.frontend.t33760.cljs$lang$ctorPrWriter = (function (this__29919__auto__,writer__29920__auto__,opt__29921__auto__){
return cljs.core._write.call(null,writer__29920__auto__,"eventstore.ui.frontend/t33760");
});

eventstore.ui.frontend.__GT_t33760 = (function eventstore$ui$frontend$full_page_$___GT_t33760(full_page__$1,data__$1,owner__$1,meta33761){
return (new eventstore.ui.frontend.t33760(full_page__$1,data__$1,owner__$1,meta33761));
});

}

return (new eventstore.ui.frontend.t33760(eventstore$ui$frontend$full_page,data,owner,cljs.core.PersistentArrayMap.EMPTY));
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

eventstore.ui.frontend._main.cljs$lang$applyTo = (function (seq33763){
return eventstore.ui.frontend._main.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq33763));
});

//# sourceMappingURL=frontend.js.map