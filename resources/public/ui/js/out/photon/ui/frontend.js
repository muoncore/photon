// Compiled by ClojureScript 1.7.122 {}
goog.provide('photon.ui.frontend');
goog.require('cljs.core');
goog.require('om.dom');
goog.require('tailrecursion.cljson');
goog.require('fipp.edn');
goog.require('cljs_http.client');
goog.require('chord.client');
goog.require('cljs.core.async');
goog.require('jayq.core');
goog.require('om.core');
if(typeof photon.ui.frontend.app_state !== 'undefined'){
} else {
photon.ui.frontend.app_state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"stream","stream",1534941648),null,new cljs.core.Keyword(null,"current","current",-1088038603),null,new cljs.core.Keyword(null,"initial-value","initial-value",470619381),"",new cljs.core.Keyword(null,"reduction","reduction",-1932397346),"",new cljs.core.Keyword(null,"projections","projections",-1183474213),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"new-projection","new-projection",-1144791648),false], null));
}
photon.ui.frontend.clj__GT_str = (function photon$ui$frontend$clj__GT_str(c){
var res = clojure.string.replace.call(null,(function (){var sb__5535__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_13006_13008 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_13007_13009 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_13006_13008,_STAR_print_fn_STAR_13007_13009,sb__5535__auto__){
return (function (x__5536__auto__){
return sb__5535__auto__.append(x__5536__auto__);
});})(_STAR_print_newline_STAR_13006_13008,_STAR_print_fn_STAR_13007_13009,sb__5535__auto__))
;

try{fipp.edn.pprint.call(null,c,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),(80)], null));
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_13007_13009;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_13006_13008;
}
return [cljs.core.str(sb__5535__auto__)].join('');
})(),/}nil/,"}");
console.log(res);

return res;
});
photon.ui.frontend.proj__GT_streams = (function photon$ui$frontend$proj__GT_streams(reg){
return cljs.core.map.call(null,(function (p1__13010_SHARP_){
return cljs.core.assoc.call(null,cljs.core.val.call(null,p1__13010_SHARP_),new cljs.core.Keyword(null,"stream","stream",1534941648),cljs.core.key.call(null,p1__13010_SHARP_));
}),reg);
});
photon.ui.frontend.update_box = (function photon$ui$frontend$update_box(owner,box_ref){
return hljs.highlightBlock(om.core.get_node.call(null,owner,box_ref));
});
photon.ui.frontend.widget_new_projection = (function photon$ui$frontend$widget_new_projection(params,owner){
var data = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(params);
if(typeof photon.ui.frontend.t_photon$ui$frontend13035 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRender}
 * @implements {cljs.core.IMeta}
 * @implements {om.core.IDidMount}
 * @implements {cljs.core.IWithMeta}
*/
photon.ui.frontend.t_photon$ui$frontend13035 = (function (widget_new_projection,params,owner,data,meta13036){
this.widget_new_projection = widget_new_projection;
this.params = params;
this.owner = owner;
this.data = data;
this.meta13036 = meta13036;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
photon.ui.frontend.t_photon$ui$frontend13035.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (data){
return (function (_13037,meta13036__$1){
var self__ = this;
var _13037__$1 = this;
return (new photon.ui.frontend.t_photon$ui$frontend13035(self__.widget_new_projection,self__.params,self__.owner,self__.data,meta13036__$1));
});})(data))
;

photon.ui.frontend.t_photon$ui$frontend13035.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (data){
return (function (_13037){
var self__ = this;
var _13037__$1 = this;
return self__.meta13036;
});})(data))
;

photon.ui.frontend.t_photon$ui$frontend13035.prototype.om$core$IDidMount$ = true;

photon.ui.frontend.t_photon$ui$frontend13035.prototype.om$core$IDidMount$did_mount$arity$1 = ((function (data){
return (function (_){
var self__ = this;
var ___$1 = this;
photon.ui.frontend.update_box.call(null,self__.owner,"code-box");

return photon.ui.frontend.update_box.call(null,self__.owner,"initial-value-box");
});})(data))
;

photon.ui.frontend.t_photon$ui$frontend13035.prototype.om$core$IRender$ = true;

photon.ui.frontend.t_photon$ui$frontend13035.prototype.om$core$IRender$render$arity$1 = ((function (data){
return (function (_){
var self__ = this;
var ___$1 = this;
return React.DOM.div(null,React.DOM.div(null,"Projection name",om.dom.input.call(null,{"type": "text", "ref": "name", "value": new cljs.core.Keyword(null,"projection-name","projection-name",-1947595457).cljs$core$IFn$_invoke$arity$1(self__.data), "onChange": ((function (___$1,data){
return (function (ev){
return om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"projection-name","projection-name",-1947595457),ev.target.value);
});})(___$1,data))
})),React.DOM.div(null,"Stream name",om.dom.input.call(null,{"type": "text", "ref": "name", "value": new cljs.core.Keyword(null,"stream-name","stream-name",1607843230).cljs$core$IFn$_invoke$arity$1(self__.data), "onChange": ((function (___$1,data){
return (function (ev){
return om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"stream-name","stream-name",1607843230),ev.target.value);
});})(___$1,data))
})),React.DOM.div(null,"Language"),cljs.core.apply.call(null,om.dom.div,{"className": "radio"},cljs.core.map.call(null,((function (___$1,data){
return (function (p1__13011_SHARP_){
return React.DOM.div(null,om.dom.input.call(null,{"type": "checkbox", "checked": cljs.core._EQ_.call(null,p1__13011_SHARP_,new cljs.core.Keyword(null,"language","language",-1591107564).cljs$core$IFn$_invoke$arity$1(self__.data)), "onChange": ((function (___$1,data){
return (function (ev){
return om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"language","language",-1591107564),p1__13011_SHARP_);
});})(___$1,data))
}),p1__13011_SHARP_);
});})(___$1,data))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["clojure","javascript"], null))),React.DOM.div(null,"Initial value"),React.DOM.pre(null,React.DOM.code({"className": "clojure"},React.DOM.div({"contentEditable": "true", "ref": "initial-value-box", "className": "clojure", "onBlur": ((function (___$1,data){
return (function (ev){
om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"initial-value","initial-value",470619381),ev.target.textContent);

return photon.ui.frontend.update_box.call(null,self__.owner,"initial-value-box");
});})(___$1,data))
},new cljs.core.Keyword(null,"initial-value","initial-value",470619381).cljs$core$IFn$_invoke$arity$1(self__.data)))),React.DOM.div(null,"Code: content of (fn [prev item] ... )"),React.DOM.pre(null,React.DOM.code({"className": "clojure"},React.DOM.div({"contentEditable": "true", "ref": "code-box", "className": "clojure", "onBlur": ((function (___$1,data){
return (function (ev){
om.core.update_BANG_.call(null,self__.data,new cljs.core.Keyword(null,"reduction","reduction",-1932397346),ev.target.textContent);

return photon.ui.frontend.update_box.call(null,self__.owner,"code-box");
});})(___$1,data))
},new cljs.core.Keyword(null,"reduction","reduction",-1932397346).cljs$core$IFn$_invoke$arity$1(self__.data)))),React.DOM.div(null,React.DOM.button({"onClick": ((function (___$1,data){
return (function (___$2){
var c__7859__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__7859__auto__,___$1,data){
return (function (){
var f__7860__auto__ = (function (){var switch__7838__auto__ = ((function (c__7859__auto__,___$1,data){
return (function (state_13049){
var state_val_13050 = (state_13049[(1)]);
if((state_val_13050 === (1))){
var inst_13038 = [new cljs.core.Keyword(null,"json-params","json-params",-1112693596)];
var inst_13039 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_13040 = [new cljs.core.Keyword(null,"projection-name","projection-name",-1947595457),new cljs.core.Keyword(null,"stream-name","stream-name",1607843230),new cljs.core.Keyword(null,"initial-value","initial-value",470619381),new cljs.core.Keyword(null,"reduction","reduction",-1932397346),new cljs.core.Keyword(null,"language","language",-1591107564)];
var inst_13041 = (new cljs.core.PersistentVector(null,5,(5),inst_13039,inst_13040,null));
var inst_13042 = cljs.core.select_keys.call(null,self__.data,inst_13041);
var inst_13043 = [inst_13042];
var inst_13044 = cljs.core.PersistentHashMap.fromArrays(inst_13038,inst_13043);
var inst_13045 = cljs_http.client.post.call(null,"/api/projections",inst_13044);
var state_13049__$1 = state_13049;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13049__$1,(2),inst_13045);
} else {
if((state_val_13050 === (2))){
var inst_13047 = (state_13049[(2)]);
var state_13049__$1 = state_13049;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13049__$1,inst_13047);
} else {
return null;
}
}
});})(c__7859__auto__,___$1,data))
;
return ((function (switch__7838__auto__,c__7859__auto__,___$1,data){
return (function() {
var photon$ui$frontend$widget_new_projection_$_state_machine__7839__auto__ = null;
var photon$ui$frontend$widget_new_projection_$_state_machine__7839__auto____0 = (function (){
var statearr_13054 = [null,null,null,null,null,null,null];
(statearr_13054[(0)] = photon$ui$frontend$widget_new_projection_$_state_machine__7839__auto__);

(statearr_13054[(1)] = (1));

return statearr_13054;
});
var photon$ui$frontend$widget_new_projection_$_state_machine__7839__auto____1 = (function (state_13049){
while(true){
var ret_value__7840__auto__ = (function (){try{while(true){
var result__7841__auto__ = switch__7838__auto__.call(null,state_13049);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7841__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7841__auto__;
}
break;
}
}catch (e13055){if((e13055 instanceof Object)){
var ex__7842__auto__ = e13055;
var statearr_13056_13058 = state_13049;
(statearr_13056_13058[(5)] = ex__7842__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13049);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13055;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7840__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13059 = state_13049;
state_13049 = G__13059;
continue;
} else {
return ret_value__7840__auto__;
}
break;
}
});
photon$ui$frontend$widget_new_projection_$_state_machine__7839__auto__ = function(state_13049){
switch(arguments.length){
case 0:
return photon$ui$frontend$widget_new_projection_$_state_machine__7839__auto____0.call(this);
case 1:
return photon$ui$frontend$widget_new_projection_$_state_machine__7839__auto____1.call(this,state_13049);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
photon$ui$frontend$widget_new_projection_$_state_machine__7839__auto__.cljs$core$IFn$_invoke$arity$0 = photon$ui$frontend$widget_new_projection_$_state_machine__7839__auto____0;
photon$ui$frontend$widget_new_projection_$_state_machine__7839__auto__.cljs$core$IFn$_invoke$arity$1 = photon$ui$frontend$widget_new_projection_$_state_machine__7839__auto____1;
return photon$ui$frontend$widget_new_projection_$_state_machine__7839__auto__;
})()
;})(switch__7838__auto__,c__7859__auto__,___$1,data))
})();
var state__7861__auto__ = (function (){var statearr_13057 = f__7860__auto__.call(null);
(statearr_13057[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7859__auto__);

return statearr_13057;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7861__auto__);
});})(c__7859__auto__,___$1,data))
);

return c__7859__auto__;
});})(___$1,data))
},"Register projection")));
});})(data))
;

photon.ui.frontend.t_photon$ui$frontend13035.getBasis = ((function (data){
return (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"widget-new-projection","widget-new-projection",-572612337,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",-1943919534,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"params","params",-1943919534,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"meta13036","meta13036",1244973216,null)], null);
});})(data))
;

photon.ui.frontend.t_photon$ui$frontend13035.cljs$lang$type = true;

photon.ui.frontend.t_photon$ui$frontend13035.cljs$lang$ctorStr = "photon.ui.frontend/t_photon$ui$frontend13035";

photon.ui.frontend.t_photon$ui$frontend13035.cljs$lang$ctorPrWriter = ((function (data){
return (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"photon.ui.frontend/t_photon$ui$frontend13035");
});})(data))
;

photon.ui.frontend.__GT_t_photon$ui$frontend13035 = ((function (data){
return (function photon$ui$frontend$widget_new_projection_$___GT_t_photon$ui$frontend13035(widget_new_projection__$1,params__$1,owner__$1,data__$1,meta13036){
return (new photon.ui.frontend.t_photon$ui$frontend13035(widget_new_projection__$1,params__$1,owner__$1,data__$1,meta13036));
});})(data))
;

}

return (new photon.ui.frontend.t_photon$ui$frontend13035(photon$ui$frontend$widget_new_projection,params,owner,data,cljs.core.PersistentArrayMap.EMPTY));
});
photon.ui.frontend.subscribe_projections_BANG_ = (function photon$ui$frontend$subscribe_projections_BANG_(data){
var c__7859__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__7859__auto__){
return (function (){
var f__7860__auto__ = (function (){var switch__7838__auto__ = ((function (c__7859__auto__){
return (function (state_13236){
var state_val_13237 = (state_13236[(1)]);
if((state_val_13237 === (7))){
var state_13236__$1 = state_13236;
var statearr_13238_13278 = state_13236__$1;
(statearr_13238_13278[(2)] = false);

(statearr_13238_13278[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13237 === (20))){
var inst_13204 = (state_13236[(7)]);
var inst_13209 = cljs.core.contains_QMARK_.call(null,inst_13204,new cljs.core.Keyword(null,"error","error",-978969032));
var state_13236__$1 = state_13236;
if(inst_13209){
var statearr_13239_13279 = state_13236__$1;
(statearr_13239_13279[(1)] = (22));

} else {
var statearr_13240_13280 = state_13236__$1;
(statearr_13240_13280[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13237 === (1))){
var inst_13170 = chord.client.ws_ch.call(null,"ws://localhost:3000/ws/ws-projections");
var state_13236__$1 = state_13236;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13236__$1,(2),inst_13170);
} else {
if((state_val_13237 === (24))){
var inst_13193 = (state_13236[(8)]);
var inst_13217 = (state_13236[(2)]);
var inst_13218 = [new cljs.core.Keyword(null,"ok","ok",967785236)];
var inst_13219 = [true];
var inst_13220 = cljs.core.PersistentHashMap.fromArrays(inst_13218,inst_13219);
var state_13236__$1 = (function (){var statearr_13241 = state_13236;
(statearr_13241[(9)] = inst_13217);

return statearr_13241;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13236__$1,(25),inst_13193,inst_13220);
} else {
if((state_val_13237 === (4))){
var state_13236__$1 = state_13236;
var statearr_13242_13281 = state_13236__$1;
(statearr_13242_13281[(2)] = false);

(statearr_13242_13281[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13237 === (15))){
var inst_13193 = (state_13236[(8)]);
var inst_13201 = (state_13236[(2)]);
var state_13236__$1 = (function (){var statearr_13243 = state_13236;
(statearr_13243[(10)] = inst_13201);

return statearr_13243;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13236__$1,(16),inst_13193);
} else {
if((state_val_13237 === (21))){
var inst_13227 = (state_13236[(2)]);
var state_13236__$1 = state_13236;
var statearr_13244_13282 = state_13236__$1;
(statearr_13244_13282[(2)] = inst_13227);

(statearr_13244_13282[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13237 === (13))){
var inst_13194 = (state_13236[(11)]);
var inst_13231 = cljs.core.pr_str.call(null,inst_13194);
var inst_13232 = console.log("Error:",inst_13231);
var state_13236__$1 = state_13236;
var statearr_13245_13283 = state_13236__$1;
(statearr_13245_13283[(2)] = inst_13232);

(statearr_13245_13283[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13237 === (22))){
var inst_13204 = (state_13236[(7)]);
var inst_13211 = cljs.core.pr_str.call(null,inst_13204);
var inst_13212 = console.log(inst_13211);
var state_13236__$1 = state_13236;
var statearr_13246_13284 = state_13236__$1;
(statearr_13246_13284[(2)] = inst_13212);

(statearr_13246_13284[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13237 === (6))){
var state_13236__$1 = state_13236;
var statearr_13247_13285 = state_13236__$1;
(statearr_13247_13285[(2)] = true);

(statearr_13247_13285[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13237 === (25))){
var inst_13193 = (state_13236[(8)]);
var inst_13222 = (state_13236[(2)]);
var state_13236__$1 = (function (){var statearr_13248 = state_13236;
(statearr_13248[(12)] = inst_13222);

return statearr_13248;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13236__$1,(26),inst_13193);
} else {
if((state_val_13237 === (17))){
var inst_13204 = (state_13236[(7)]);
var inst_13206 = (inst_13204 == null);
var state_13236__$1 = state_13236;
if(cljs.core.truth_(inst_13206)){
var statearr_13249_13286 = state_13236__$1;
(statearr_13249_13286[(1)] = (19));

} else {
var statearr_13250_13287 = state_13236__$1;
(statearr_13250_13287[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13237 === (3))){
var inst_13172 = (state_13236[(13)]);
var inst_13177 = inst_13172.cljs$lang$protocol_mask$partition0$;
var inst_13178 = (inst_13177 & (64));
var inst_13179 = inst_13172.cljs$core$ISeq$;
var inst_13180 = (inst_13178) || (inst_13179);
var state_13236__$1 = state_13236;
if(cljs.core.truth_(inst_13180)){
var statearr_13251_13288 = state_13236__$1;
(statearr_13251_13288[(1)] = (6));

} else {
var statearr_13252_13289 = state_13236__$1;
(statearr_13252_13289[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13237 === (12))){
var inst_13193 = (state_13236[(8)]);
var inst_13197 = [new cljs.core.Keyword(null,"ok","ok",967785236)];
var inst_13198 = [true];
var inst_13199 = cljs.core.PersistentHashMap.fromArrays(inst_13197,inst_13198);
var state_13236__$1 = state_13236;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13236__$1,(15),inst_13193,inst_13199);
} else {
if((state_val_13237 === (2))){
var inst_13172 = (state_13236[(13)]);
var inst_13172__$1 = (state_13236[(2)]);
var inst_13174 = (inst_13172__$1 == null);
var inst_13175 = cljs.core.not.call(null,inst_13174);
var state_13236__$1 = (function (){var statearr_13253 = state_13236;
(statearr_13253[(13)] = inst_13172__$1);

return statearr_13253;
})();
if(inst_13175){
var statearr_13254_13290 = state_13236__$1;
(statearr_13254_13290[(1)] = (3));

} else {
var statearr_13255_13291 = state_13236__$1;
(statearr_13255_13291[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13237 === (23))){
var inst_13204 = (state_13236[(7)]);
var inst_13214 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(inst_13204);
var inst_13215 = om.core.update_BANG_.call(null,data,new cljs.core.Keyword(null,"projections","projections",-1183474213),inst_13214);
var state_13236__$1 = state_13236;
var statearr_13256_13292 = state_13236__$1;
(statearr_13256_13292[(2)] = inst_13215);

(statearr_13256_13292[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13237 === (19))){
var state_13236__$1 = state_13236;
var statearr_13257_13293 = state_13236__$1;
(statearr_13257_13293[(2)] = null);

(statearr_13257_13293[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13237 === (11))){
var inst_13194 = (state_13236[(11)]);
var inst_13192 = (state_13236[(2)]);
var inst_13193 = cljs.core.get.call(null,inst_13192,new cljs.core.Keyword(null,"ws-channel","ws-channel",1643892174));
var inst_13194__$1 = cljs.core.get.call(null,inst_13192,new cljs.core.Keyword(null,"error","error",-978969032));
var inst_13195 = cljs.core.not.call(null,inst_13194__$1);
var state_13236__$1 = (function (){var statearr_13258 = state_13236;
(statearr_13258[(11)] = inst_13194__$1);

(statearr_13258[(8)] = inst_13193);

return statearr_13258;
})();
if(inst_13195){
var statearr_13259_13294 = state_13236__$1;
(statearr_13259_13294[(1)] = (12));

} else {
var statearr_13260_13295 = state_13236__$1;
(statearr_13260_13295[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13237 === (9))){
var inst_13172 = (state_13236[(13)]);
var inst_13189 = cljs.core.apply.call(null,cljs.core.hash_map,inst_13172);
var state_13236__$1 = state_13236;
var statearr_13261_13296 = state_13236__$1;
(statearr_13261_13296[(2)] = inst_13189);

(statearr_13261_13296[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13237 === (5))){
var inst_13187 = (state_13236[(2)]);
var state_13236__$1 = state_13236;
if(cljs.core.truth_(inst_13187)){
var statearr_13262_13297 = state_13236__$1;
(statearr_13262_13297[(1)] = (9));

} else {
var statearr_13263_13298 = state_13236__$1;
(statearr_13263_13298[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13237 === (14))){
var inst_13234 = (state_13236[(2)]);
var state_13236__$1 = state_13236;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13236__$1,inst_13234);
} else {
if((state_val_13237 === (26))){
var inst_13224 = (state_13236[(2)]);
var inst_13204 = inst_13224;
var state_13236__$1 = (function (){var statearr_13264 = state_13236;
(statearr_13264[(7)] = inst_13204);

return statearr_13264;
})();
var statearr_13265_13299 = state_13236__$1;
(statearr_13265_13299[(2)] = null);

(statearr_13265_13299[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13237 === (16))){
var inst_13203 = (state_13236[(2)]);
var inst_13204 = inst_13203;
var state_13236__$1 = (function (){var statearr_13266 = state_13236;
(statearr_13266[(7)] = inst_13204);

return statearr_13266;
})();
var statearr_13267_13300 = state_13236__$1;
(statearr_13267_13300[(2)] = null);

(statearr_13267_13300[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13237 === (10))){
var inst_13172 = (state_13236[(13)]);
var state_13236__$1 = state_13236;
var statearr_13268_13301 = state_13236__$1;
(statearr_13268_13301[(2)] = inst_13172);

(statearr_13268_13301[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13237 === (18))){
var inst_13229 = (state_13236[(2)]);
var state_13236__$1 = state_13236;
var statearr_13269_13302 = state_13236__$1;
(statearr_13269_13302[(2)] = inst_13229);

(statearr_13269_13302[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13237 === (8))){
var inst_13184 = (state_13236[(2)]);
var state_13236__$1 = state_13236;
var statearr_13270_13303 = state_13236__$1;
(statearr_13270_13303[(2)] = inst_13184);

(statearr_13270_13303[(1)] = (5));


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
});})(c__7859__auto__))
;
return ((function (switch__7838__auto__,c__7859__auto__){
return (function() {
var photon$ui$frontend$subscribe_projections_BANG__$_state_machine__7839__auto__ = null;
var photon$ui$frontend$subscribe_projections_BANG__$_state_machine__7839__auto____0 = (function (){
var statearr_13274 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_13274[(0)] = photon$ui$frontend$subscribe_projections_BANG__$_state_machine__7839__auto__);

(statearr_13274[(1)] = (1));

return statearr_13274;
});
var photon$ui$frontend$subscribe_projections_BANG__$_state_machine__7839__auto____1 = (function (state_13236){
while(true){
var ret_value__7840__auto__ = (function (){try{while(true){
var result__7841__auto__ = switch__7838__auto__.call(null,state_13236);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7841__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7841__auto__;
}
break;
}
}catch (e13275){if((e13275 instanceof Object)){
var ex__7842__auto__ = e13275;
var statearr_13276_13304 = state_13236;
(statearr_13276_13304[(5)] = ex__7842__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13236);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13275;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7840__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13305 = state_13236;
state_13236 = G__13305;
continue;
} else {
return ret_value__7840__auto__;
}
break;
}
});
photon$ui$frontend$subscribe_projections_BANG__$_state_machine__7839__auto__ = function(state_13236){
switch(arguments.length){
case 0:
return photon$ui$frontend$subscribe_projections_BANG__$_state_machine__7839__auto____0.call(this);
case 1:
return photon$ui$frontend$subscribe_projections_BANG__$_state_machine__7839__auto____1.call(this,state_13236);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
photon$ui$frontend$subscribe_projections_BANG__$_state_machine__7839__auto__.cljs$core$IFn$_invoke$arity$0 = photon$ui$frontend$subscribe_projections_BANG__$_state_machine__7839__auto____0;
photon$ui$frontend$subscribe_projections_BANG__$_state_machine__7839__auto__.cljs$core$IFn$_invoke$arity$1 = photon$ui$frontend$subscribe_projections_BANG__$_state_machine__7839__auto____1;
return photon$ui$frontend$subscribe_projections_BANG__$_state_machine__7839__auto__;
})()
;})(switch__7838__auto__,c__7859__auto__))
})();
var state__7861__auto__ = (function (){var statearr_13277 = f__7860__auto__.call(null);
(statearr_13277[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7859__auto__);

return statearr_13277;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7861__auto__);
});})(c__7859__auto__))
);

return c__7859__auto__;
});
photon.ui.frontend.subscribe_streams_BANG_ = (function photon$ui$frontend$subscribe_streams_BANG_(data){
var c__7859__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__7859__auto__){
return (function (){
var f__7860__auto__ = (function (){var switch__7838__auto__ = ((function (c__7859__auto__){
return (function (state_13485){
var state_val_13486 = (state_13485[(1)]);
if((state_val_13486 === (7))){
var state_13485__$1 = state_13485;
var statearr_13487_13527 = state_13485__$1;
(statearr_13487_13527[(2)] = false);

(statearr_13487_13527[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13486 === (20))){
var inst_13452 = (state_13485[(7)]);
var inst_13457 = cljs.core.contains_QMARK_.call(null,inst_13452,new cljs.core.Keyword(null,"error","error",-978969032));
var state_13485__$1 = state_13485;
if(inst_13457){
var statearr_13488_13528 = state_13485__$1;
(statearr_13488_13528[(1)] = (22));

} else {
var statearr_13489_13529 = state_13485__$1;
(statearr_13489_13529[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13486 === (1))){
var inst_13418 = chord.client.ws_ch.call(null,"ws://localhost:3000/ws/ws-projections");
var state_13485__$1 = state_13485;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13485__$1,(2),inst_13418);
} else {
if((state_val_13486 === (24))){
var inst_13441 = (state_13485[(8)]);
var inst_13466 = (state_13485[(2)]);
var inst_13467 = [new cljs.core.Keyword(null,"projection-name","projection-name",-1947595457)];
var inst_13468 = ["__streams__"];
var inst_13469 = cljs.core.PersistentHashMap.fromArrays(inst_13467,inst_13468);
var state_13485__$1 = (function (){var statearr_13490 = state_13485;
(statearr_13490[(9)] = inst_13466);

return statearr_13490;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13485__$1,(25),inst_13441,inst_13469);
} else {
if((state_val_13486 === (4))){
var state_13485__$1 = state_13485;
var statearr_13491_13530 = state_13485__$1;
(statearr_13491_13530[(2)] = false);

(statearr_13491_13530[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13486 === (15))){
var inst_13441 = (state_13485[(8)]);
var inst_13449 = (state_13485[(2)]);
var state_13485__$1 = (function (){var statearr_13492 = state_13485;
(statearr_13492[(10)] = inst_13449);

return statearr_13492;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13485__$1,(16),inst_13441);
} else {
if((state_val_13486 === (21))){
var inst_13476 = (state_13485[(2)]);
var state_13485__$1 = state_13485;
var statearr_13493_13531 = state_13485__$1;
(statearr_13493_13531[(2)] = inst_13476);

(statearr_13493_13531[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13486 === (13))){
var inst_13442 = (state_13485[(11)]);
var inst_13480 = cljs.core.pr_str.call(null,inst_13442);
var inst_13481 = console.log("Error:",inst_13480);
var state_13485__$1 = state_13485;
var statearr_13494_13532 = state_13485__$1;
(statearr_13494_13532[(2)] = inst_13481);

(statearr_13494_13532[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13486 === (22))){
var inst_13452 = (state_13485[(7)]);
var inst_13459 = cljs.core.pr_str.call(null,inst_13452);
var inst_13460 = console.log(inst_13459);
var state_13485__$1 = state_13485;
var statearr_13495_13533 = state_13485__$1;
(statearr_13495_13533[(2)] = inst_13460);

(statearr_13495_13533[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13486 === (6))){
var state_13485__$1 = state_13485;
var statearr_13496_13534 = state_13485__$1;
(statearr_13496_13534[(2)] = true);

(statearr_13496_13534[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13486 === (25))){
var inst_13441 = (state_13485[(8)]);
var inst_13471 = (state_13485[(2)]);
var state_13485__$1 = (function (){var statearr_13497 = state_13485;
(statearr_13497[(12)] = inst_13471);

return statearr_13497;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13485__$1,(26),inst_13441);
} else {
if((state_val_13486 === (17))){
var inst_13452 = (state_13485[(7)]);
var inst_13454 = (inst_13452 == null);
var state_13485__$1 = state_13485;
if(cljs.core.truth_(inst_13454)){
var statearr_13498_13535 = state_13485__$1;
(statearr_13498_13535[(1)] = (19));

} else {
var statearr_13499_13536 = state_13485__$1;
(statearr_13499_13536[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13486 === (3))){
var inst_13420 = (state_13485[(13)]);
var inst_13425 = inst_13420.cljs$lang$protocol_mask$partition0$;
var inst_13426 = (inst_13425 & (64));
var inst_13427 = inst_13420.cljs$core$ISeq$;
var inst_13428 = (inst_13426) || (inst_13427);
var state_13485__$1 = state_13485;
if(cljs.core.truth_(inst_13428)){
var statearr_13500_13537 = state_13485__$1;
(statearr_13500_13537[(1)] = (6));

} else {
var statearr_13501_13538 = state_13485__$1;
(statearr_13501_13538[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13486 === (12))){
var inst_13441 = (state_13485[(8)]);
var inst_13445 = [new cljs.core.Keyword(null,"projection-name","projection-name",-1947595457)];
var inst_13446 = ["__streams__"];
var inst_13447 = cljs.core.PersistentHashMap.fromArrays(inst_13445,inst_13446);
var state_13485__$1 = state_13485;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13485__$1,(15),inst_13441,inst_13447);
} else {
if((state_val_13486 === (2))){
var inst_13420 = (state_13485[(13)]);
var inst_13420__$1 = (state_13485[(2)]);
var inst_13422 = (inst_13420__$1 == null);
var inst_13423 = cljs.core.not.call(null,inst_13422);
var state_13485__$1 = (function (){var statearr_13502 = state_13485;
(statearr_13502[(13)] = inst_13420__$1);

return statearr_13502;
})();
if(inst_13423){
var statearr_13503_13539 = state_13485__$1;
(statearr_13503_13539[(1)] = (3));

} else {
var statearr_13504_13540 = state_13485__$1;
(statearr_13504_13540[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13486 === (23))){
var inst_13441 = (state_13485[(8)]);
var inst_13440 = (state_13485[(14)]);
var inst_13452 = (state_13485[(7)]);
var inst_13442 = (state_13485[(11)]);
var inst_13462 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(inst_13452);
var inst_13463 = (function (){var map__13417 = inst_13440;
var ws_channel = inst_13441;
var error = inst_13442;
var elem = inst_13452;
var streams_proj = inst_13462;
return ((function (map__13417,ws_channel,error,elem,streams_proj,inst_13441,inst_13440,inst_13452,inst_13442,inst_13462,state_val_13486,c__7859__auto__){
return (function (p1__13306_SHARP_){
return cljs.core.assoc.call(null,p1__13306_SHARP_,new cljs.core.Keyword(null,"streams","streams",1465783789),photon.ui.frontend.proj__GT_streams.call(null,new cljs.core.Keyword(null,"current-value","current-value",2066017989).cljs$core$IFn$_invoke$arity$1(streams_proj)));
});
;})(map__13417,ws_channel,error,elem,streams_proj,inst_13441,inst_13440,inst_13452,inst_13442,inst_13462,state_val_13486,c__7859__auto__))
})();
var inst_13464 = om.core.update_state_BANG_.call(null,data,inst_13463);
var state_13485__$1 = state_13485;
var statearr_13505_13541 = state_13485__$1;
(statearr_13505_13541[(2)] = inst_13464);

(statearr_13505_13541[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13486 === (19))){
var state_13485__$1 = state_13485;
var statearr_13506_13542 = state_13485__$1;
(statearr_13506_13542[(2)] = null);

(statearr_13506_13542[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13486 === (11))){
var inst_13440 = (state_13485[(14)]);
var inst_13442 = (state_13485[(11)]);
var inst_13440__$1 = (state_13485[(2)]);
var inst_13441 = cljs.core.get.call(null,inst_13440__$1,new cljs.core.Keyword(null,"ws-channel","ws-channel",1643892174));
var inst_13442__$1 = cljs.core.get.call(null,inst_13440__$1,new cljs.core.Keyword(null,"error","error",-978969032));
var inst_13443 = cljs.core.not.call(null,inst_13442__$1);
var state_13485__$1 = (function (){var statearr_13507 = state_13485;
(statearr_13507[(8)] = inst_13441);

(statearr_13507[(14)] = inst_13440__$1);

(statearr_13507[(11)] = inst_13442__$1);

return statearr_13507;
})();
if(inst_13443){
var statearr_13508_13543 = state_13485__$1;
(statearr_13508_13543[(1)] = (12));

} else {
var statearr_13509_13544 = state_13485__$1;
(statearr_13509_13544[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13486 === (9))){
var inst_13420 = (state_13485[(13)]);
var inst_13437 = cljs.core.apply.call(null,cljs.core.hash_map,inst_13420);
var state_13485__$1 = state_13485;
var statearr_13510_13545 = state_13485__$1;
(statearr_13510_13545[(2)] = inst_13437);

(statearr_13510_13545[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13486 === (5))){
var inst_13435 = (state_13485[(2)]);
var state_13485__$1 = state_13485;
if(cljs.core.truth_(inst_13435)){
var statearr_13511_13546 = state_13485__$1;
(statearr_13511_13546[(1)] = (9));

} else {
var statearr_13512_13547 = state_13485__$1;
(statearr_13512_13547[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13486 === (14))){
var inst_13483 = (state_13485[(2)]);
var state_13485__$1 = state_13485;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13485__$1,inst_13483);
} else {
if((state_val_13486 === (26))){
var inst_13473 = (state_13485[(2)]);
var inst_13452 = inst_13473;
var state_13485__$1 = (function (){var statearr_13513 = state_13485;
(statearr_13513[(7)] = inst_13452);

return statearr_13513;
})();
var statearr_13514_13548 = state_13485__$1;
(statearr_13514_13548[(2)] = null);

(statearr_13514_13548[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13486 === (16))){
var inst_13451 = (state_13485[(2)]);
var inst_13452 = inst_13451;
var state_13485__$1 = (function (){var statearr_13515 = state_13485;
(statearr_13515[(7)] = inst_13452);

return statearr_13515;
})();
var statearr_13516_13549 = state_13485__$1;
(statearr_13516_13549[(2)] = null);

(statearr_13516_13549[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13486 === (10))){
var inst_13420 = (state_13485[(13)]);
var state_13485__$1 = state_13485;
var statearr_13517_13550 = state_13485__$1;
(statearr_13517_13550[(2)] = inst_13420);

(statearr_13517_13550[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13486 === (18))){
var inst_13478 = (state_13485[(2)]);
var state_13485__$1 = state_13485;
var statearr_13518_13551 = state_13485__$1;
(statearr_13518_13551[(2)] = inst_13478);

(statearr_13518_13551[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13486 === (8))){
var inst_13432 = (state_13485[(2)]);
var state_13485__$1 = state_13485;
var statearr_13519_13552 = state_13485__$1;
(statearr_13519_13552[(2)] = inst_13432);

(statearr_13519_13552[(1)] = (5));


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
});})(c__7859__auto__))
;
return ((function (switch__7838__auto__,c__7859__auto__){
return (function() {
var photon$ui$frontend$subscribe_streams_BANG__$_state_machine__7839__auto__ = null;
var photon$ui$frontend$subscribe_streams_BANG__$_state_machine__7839__auto____0 = (function (){
var statearr_13523 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_13523[(0)] = photon$ui$frontend$subscribe_streams_BANG__$_state_machine__7839__auto__);

(statearr_13523[(1)] = (1));

return statearr_13523;
});
var photon$ui$frontend$subscribe_streams_BANG__$_state_machine__7839__auto____1 = (function (state_13485){
while(true){
var ret_value__7840__auto__ = (function (){try{while(true){
var result__7841__auto__ = switch__7838__auto__.call(null,state_13485);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7841__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7841__auto__;
}
break;
}
}catch (e13524){if((e13524 instanceof Object)){
var ex__7842__auto__ = e13524;
var statearr_13525_13553 = state_13485;
(statearr_13525_13553[(5)] = ex__7842__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13485);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13524;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7840__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13554 = state_13485;
state_13485 = G__13554;
continue;
} else {
return ret_value__7840__auto__;
}
break;
}
});
photon$ui$frontend$subscribe_streams_BANG__$_state_machine__7839__auto__ = function(state_13485){
switch(arguments.length){
case 0:
return photon$ui$frontend$subscribe_streams_BANG__$_state_machine__7839__auto____0.call(this);
case 1:
return photon$ui$frontend$subscribe_streams_BANG__$_state_machine__7839__auto____1.call(this,state_13485);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
photon$ui$frontend$subscribe_streams_BANG__$_state_machine__7839__auto__.cljs$core$IFn$_invoke$arity$0 = photon$ui$frontend$subscribe_streams_BANG__$_state_machine__7839__auto____0;
photon$ui$frontend$subscribe_streams_BANG__$_state_machine__7839__auto__.cljs$core$IFn$_invoke$arity$1 = photon$ui$frontend$subscribe_streams_BANG__$_state_machine__7839__auto____1;
return photon$ui$frontend$subscribe_streams_BANG__$_state_machine__7839__auto__;
})()
;})(switch__7838__auto__,c__7859__auto__))
})();
var state__7861__auto__ = (function (){var statearr_13526 = f__7860__auto__.call(null);
(statearr_13526[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7859__auto__);

return statearr_13526;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7861__auto__);
});})(c__7859__auto__))
);

return c__7859__auto__;
});
photon.ui.frontend.filter_projection = (function photon$ui$frontend$filter_projection(proj){
return cljs.core.assoc.call(null,cljs.core.select_keys.call(null,proj,new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"stream","stream",1534941648),new cljs.core.Keyword(null,"avg-time","avg-time",1268085425),new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"language","language",-1591107564),new cljs.core.Keyword(null,"processed","processed",800622264),new cljs.core.Keyword(null,"stream-name","stream-name",1607843230),new cljs.core.Keyword(null,"projection-name","projection-name",-1947595457)], null)),new cljs.core.Keyword(null,"url","url",276297046),(function (){var current = window.location.href;
var root = clojure.string.join.call(null,"/",cljs.core.drop_last.call(null,clojure.string.split.call(null,current,/\//)));
return [cljs.core.str(root),cljs.core.str("/api/projection/"),cljs.core.str(new cljs.core.Keyword(null,"projection-name","projection-name",-1947595457).cljs$core$IFn$_invoke$arity$1(proj))].join('');
})());
});
photon.ui.frontend.projection_item = (function photon$ui$frontend$projection_item(params,owner){
if(typeof photon.ui.frontend.t_photon$ui$frontend13562 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRender}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
photon.ui.frontend.t_photon$ui$frontend13562 = (function (projection_item,params,owner,meta13563){
this.projection_item = projection_item;
this.params = params;
this.owner = owner;
this.meta13563 = meta13563;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
photon.ui.frontend.t_photon$ui$frontend13562.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13564,meta13563__$1){
var self__ = this;
var _13564__$1 = this;
return (new photon.ui.frontend.t_photon$ui$frontend13562(self__.projection_item,self__.params,self__.owner,meta13563__$1));
});

photon.ui.frontend.t_photon$ui$frontend13562.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13564){
var self__ = this;
var _13564__$1 = this;
return self__.meta13563;
});

photon.ui.frontend.t_photon$ui$frontend13562.prototype.om$core$IRender$ = true;

photon.ui.frontend.t_photon$ui$frontend13562.prototype.om$core$IRender$render$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var filtered = photon.ui.frontend.filter_projection.call(null,new cljs.core.Keyword(null,"projection","projection",-412523042).cljs$core$IFn$_invoke$arity$1(self__.params));
return cljs.core.apply.call(null,om.dom.tr,null,cljs.core.map.call(null,((function (filtered,___$1){
return (function (p1__13555_SHARP_){
return React.DOM.td(null,(function (){var pred__13565 = cljs.core._EQ_;
var expr__13566 = cljs.core.key.call(null,p1__13555_SHARP_);
if(cljs.core.truth_(pred__13565.call(null,new cljs.core.Keyword(null,"url","url",276297046),expr__13566))){
return React.DOM.a({"href": cljs.core.val.call(null,p1__13555_SHARP_)},cljs.core.val.call(null,p1__13555_SHARP_));
} else {
if(cljs.core.truth_(pred__13565.call(null,new cljs.core.Keyword(null,"projection-name","projection-name",-1947595457),expr__13566))){
return React.DOM.a({"href": "#", "onClick": ((function (pred__13565,expr__13566,filtered,___$1){
return (function (___$2){
return om.core.update_BANG_.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(self__.params),new cljs.core.Keyword(null,"active-projection","active-projection",835255398),new cljs.core.Keyword(null,"projection","projection",-412523042).cljs$core$IFn$_invoke$arity$1(self__.params));
});})(pred__13565,expr__13566,filtered,___$1))
},cljs.core.val.call(null,p1__13555_SHARP_));
} else {
return [cljs.core.str(cljs.core.val.call(null,p1__13555_SHARP_))].join('');
}
}
})());
});})(filtered,___$1))
,filtered));
});

photon.ui.frontend.t_photon$ui$frontend13562.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"projection-item","projection-item",-1890056241,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",-1943919534,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"params","params",-1943919534,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"meta13563","meta13563",604030703,null)], null);
});

photon.ui.frontend.t_photon$ui$frontend13562.cljs$lang$type = true;

photon.ui.frontend.t_photon$ui$frontend13562.cljs$lang$ctorStr = "photon.ui.frontend/t_photon$ui$frontend13562";

photon.ui.frontend.t_photon$ui$frontend13562.cljs$lang$ctorPrWriter = (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"photon.ui.frontend/t_photon$ui$frontend13562");
});

photon.ui.frontend.__GT_t_photon$ui$frontend13562 = (function photon$ui$frontend$projection_item_$___GT_t_photon$ui$frontend13562(projection_item__$1,params__$1,owner__$1,meta13563){
return (new photon.ui.frontend.t_photon$ui$frontend13562(projection_item__$1,params__$1,owner__$1,meta13563));
});

}

return (new photon.ui.frontend.t_photon$ui$frontend13562(photon$ui$frontend$projection_item,params,owner,cljs.core.PersistentArrayMap.EMPTY));
});
photon.ui.frontend.k__GT_header = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"encoding","encoding",1728578272),new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.Keyword(null,"fn","fn",-1175266204),new cljs.core.Keyword(null,"service-id","service-id",-569220412),new cljs.core.Keyword(null,"last-error","last-error",1848699973),new cljs.core.Keyword(null,"current-value","current-value",2066017989),new cljs.core.Keyword(null,"total-events","total-events",-1205693048),new cljs.core.Keyword(null,"photon-timestamp","photon-timestamp",953684138),new cljs.core.Keyword(null,"stream","stream",1534941648),new cljs.core.Keyword(null,"avg-time","avg-time",1268085425),new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"language","language",-1591107564),new cljs.core.Keyword(null,"local-id","local-id",1726280758),new cljs.core.Keyword(null,"url","url",276297046),new cljs.core.Keyword(null,"processed","processed",800622264),new cljs.core.Keyword(null,"last-event","last-event",2067154394),new cljs.core.Keyword(null,"payload-size","payload-size",-1871552354),new cljs.core.Keyword(null,"stream-name","stream-name",1607843230),new cljs.core.Keyword(null,"projection-name","projection-name",-1947595457),new cljs.core.Keyword(null,"server-timestamp","server-timestamp",553472863)],["Encoding","Schema URL","Function","Sending Service","Last error","Current value","Stream size","Photon Timestamp","Stream name","Avg. time/event","Status","Language","Local UUID","Data link","Events processed","Last event processed","Payload size","Target stream","Projection name","Service Timestamp"]);
photon.ui.frontend.code_block = (function photon$ui$frontend$code_block(c,owner){
if(typeof photon.ui.frontend.t_photon$ui$frontend13572 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRender}
 * @implements {cljs.core.IMeta}
 * @implements {om.core.IDidMount}
 * @implements {cljs.core.IWithMeta}
*/
photon.ui.frontend.t_photon$ui$frontend13572 = (function (code_block,c,owner,meta13573){
this.code_block = code_block;
this.c = c;
this.owner = owner;
this.meta13573 = meta13573;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
photon.ui.frontend.t_photon$ui$frontend13572.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13574,meta13573__$1){
var self__ = this;
var _13574__$1 = this;
return (new photon.ui.frontend.t_photon$ui$frontend13572(self__.code_block,self__.c,self__.owner,meta13573__$1));
});

photon.ui.frontend.t_photon$ui$frontend13572.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13574){
var self__ = this;
var _13574__$1 = this;
return self__.meta13573;
});

photon.ui.frontend.t_photon$ui$frontend13572.prototype.om$core$IDidMount$ = true;

photon.ui.frontend.t_photon$ui$frontend13572.prototype.om$core$IDidMount$did_mount$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
console.log("Update: code-block");

return cljs.core.dorun.call(null,cljs.core.map.call(null,((function (___$1){
return (function (p1__13568_SHARP_){
return hljs.highlightBlock(p1__13568_SHARP_);
});})(___$1))
,jayq.core.$.call(null,"code")));
});

photon.ui.frontend.t_photon$ui$frontend13572.prototype.om$core$IRender$ = true;

photon.ui.frontend.t_photon$ui$frontend13572.prototype.om$core$IRender$render$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return React.DOM.pre(null,React.DOM.code({"className": "clojure"},photon.ui.frontend.clj__GT_str.call(null,self__.c)));
});

photon.ui.frontend.t_photon$ui$frontend13572.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"code-block","code-block",-472893614,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"c","c",-122660552,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"c","c",-122660552,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"meta13573","meta13573",292024987,null)], null);
});

photon.ui.frontend.t_photon$ui$frontend13572.cljs$lang$type = true;

photon.ui.frontend.t_photon$ui$frontend13572.cljs$lang$ctorStr = "photon.ui.frontend/t_photon$ui$frontend13572";

photon.ui.frontend.t_photon$ui$frontend13572.cljs$lang$ctorPrWriter = (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"photon.ui.frontend/t_photon$ui$frontend13572");
});

photon.ui.frontend.__GT_t_photon$ui$frontend13572 = (function photon$ui$frontend$code_block_$___GT_t_photon$ui$frontend13572(code_block__$1,c__$1,owner__$1,meta13573){
return (new photon.ui.frontend.t_photon$ui$frontend13572(code_block__$1,c__$1,owner__$1,meta13573));
});

}

return (new photon.ui.frontend.t_photon$ui$frontend13572(photon$ui$frontend$code_block,c,owner,cljs.core.PersistentArrayMap.EMPTY));
});
photon.ui.frontend.widget_projections = (function photon$ui$frontend$widget_projections(params,owner){
var data = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(params);
if(typeof photon.ui.frontend.t_photon$ui$frontend13580 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRenderState}
 * @implements {cljs.core.IMeta}
 * @implements {om.core.IInitState}
 * @implements {om.core.IDidMount}
 * @implements {cljs.core.IWithMeta}
*/
photon.ui.frontend.t_photon$ui$frontend13580 = (function (widget_projections,params,owner,data,meta13581){
this.widget_projections = widget_projections;
this.params = params;
this.owner = owner;
this.data = data;
this.meta13581 = meta13581;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
photon.ui.frontend.t_photon$ui$frontend13580.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (data){
return (function (_13582,meta13581__$1){
var self__ = this;
var _13582__$1 = this;
return (new photon.ui.frontend.t_photon$ui$frontend13580(self__.widget_projections,self__.params,self__.owner,self__.data,meta13581__$1));
});})(data))
;

photon.ui.frontend.t_photon$ui$frontend13580.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (data){
return (function (_13582){
var self__ = this;
var _13582__$1 = this;
return self__.meta13581;
});})(data))
;

photon.ui.frontend.t_photon$ui$frontend13580.prototype.om$core$IInitState$ = true;

photon.ui.frontend.t_photon$ui$frontend13580.prototype.om$core$IInitState$init_state$arity$1 = ((function (data){
return (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.PersistentArrayMap.EMPTY;
});})(data))
;

photon.ui.frontend.t_photon$ui$frontend13580.prototype.om$core$IDidMount$ = true;

photon.ui.frontend.t_photon$ui$frontend13580.prototype.om$core$IDidMount$did_mount$arity$1 = ((function (data){
return (function (this$){
var self__ = this;
var this$__$1 = this;
return photon.ui.frontend.subscribe_projections_BANG_.call(null,self__.data);
});})(data))
;

photon.ui.frontend.t_photon$ui$frontend13580.prototype.om$core$IRenderState$ = true;

photon.ui.frontend.t_photon$ui$frontend13580.prototype.om$core$IRenderState$render_state$arity$2 = ((function (data){
return (function (_,state){
var self__ = this;
var ___$1 = this;
return React.DOM.div(null,React.DOM.h1(null,"Projections1"),cljs.core.apply.call(null,om.dom.table,{"className": "table table-striped table-bordered table-hover table-heading"},cljs.core.apply.call(null,om.dom.tr,null,cljs.core.map.call(null,((function (___$1,data){
return (function (p1__13575_SHARP_){
return React.DOM.th({"style": {"border": "1px"}},photon.ui.frontend.k__GT_header.call(null,cljs.core.key.call(null,p1__13575_SHARP_)));
});})(___$1,data))
,photon.ui.frontend.filter_projection.call(null,cljs.core.first.call(null,new cljs.core.Keyword(null,"projections","projections",-1183474213).cljs$core$IFn$_invoke$arity$1(self__.data))))),cljs.core.map.call(null,((function (___$1,data){
return (function (p1__13576_SHARP_){
return om.core.build.call(null,photon.ui.frontend.projection_item,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"data","data",-232669377),self__.data,new cljs.core.Keyword(null,"projection","projection",-412523042),p1__13576_SHARP_], null));
});})(___$1,data))
,new cljs.core.Keyword(null,"projections","projections",-1183474213).cljs$core$IFn$_invoke$arity$1(self__.data))),((!((new cljs.core.Keyword(null,"active-projection","active-projection",835255398).cljs$core$IFn$_invoke$arity$1(self__.data) == null)))?(function (){var block = om.core.build.call(null,photon.ui.frontend.code_block,new cljs.core.Keyword(null,"active-projection","active-projection",835255398).cljs$core$IFn$_invoke$arity$1(self__.data));
return block;
})():null));
});})(data))
;

photon.ui.frontend.t_photon$ui$frontend13580.getBasis = ((function (data){
return (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"widget-projections","widget-projections",-1417704861,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",-1943919534,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"params","params",-1943919534,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"meta13581","meta13581",-1575639915,null)], null);
});})(data))
;

photon.ui.frontend.t_photon$ui$frontend13580.cljs$lang$type = true;

photon.ui.frontend.t_photon$ui$frontend13580.cljs$lang$ctorStr = "photon.ui.frontend/t_photon$ui$frontend13580";

photon.ui.frontend.t_photon$ui$frontend13580.cljs$lang$ctorPrWriter = ((function (data){
return (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"photon.ui.frontend/t_photon$ui$frontend13580");
});})(data))
;

photon.ui.frontend.__GT_t_photon$ui$frontend13580 = ((function (data){
return (function photon$ui$frontend$widget_projections_$___GT_t_photon$ui$frontend13580(widget_projections__$1,params__$1,owner__$1,data__$1,meta13581){
return (new photon.ui.frontend.t_photon$ui$frontend13580(widget_projections__$1,params__$1,owner__$1,data__$1,meta13581));
});})(data))
;

}

return (new photon.ui.frontend.t_photon$ui$frontend13580(photon$ui$frontend$widget_projections,params,owner,data,cljs.core.PersistentArrayMap.EMPTY));
});
photon.ui.frontend.event_list_item = (function photon$ui$frontend$event_list_item(params){
if(typeof photon.ui.frontend.t_photon$ui$frontend13590 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRender}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
photon.ui.frontend.t_photon$ui$frontend13590 = (function (event_list_item,params,meta13591){
this.event_list_item = event_list_item;
this.params = params;
this.meta13591 = meta13591;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
photon.ui.frontend.t_photon$ui$frontend13590.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13592,meta13591__$1){
var self__ = this;
var _13592__$1 = this;
return (new photon.ui.frontend.t_photon$ui$frontend13590(self__.event_list_item,self__.params,meta13591__$1));
});

photon.ui.frontend.t_photon$ui$frontend13590.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13592){
var self__ = this;
var _13592__$1 = this;
return self__.meta13591;
});

photon.ui.frontend.t_photon$ui$frontend13590.prototype.om$core$IRender$ = true;

photon.ui.frontend.t_photon$ui$frontend13590.prototype.om$core$IRender$render$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var event = new cljs.core.Keyword(null,"event","event",301435442).cljs$core$IFn$_invoke$arity$1(self__.params);
var data = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(self__.params);
var payload = new cljs.core.Keyword(null,"payload","payload",-383036092).cljs$core$IFn$_invoke$arity$1(event);
var id = [cljs.core.str(new cljs.core.Keyword(null,"service-id","service-id",-569220412).cljs$core$IFn$_invoke$arity$1(event)),cljs.core.str(":"),cljs.core.str(new cljs.core.Keyword(null,"local-id","local-id",1726280758).cljs$core$IFn$_invoke$arity$1(event))].join('');
var current_QMARK_ = cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"current","current",-1088038603).cljs$core$IFn$_invoke$arity$1(data),id);
return cljs.core.apply.call(null,om.dom.tr,null,cljs.core.map.call(null,((function (current_QMARK_,event,data,payload,id,___$1){
return (function (p1__13583_SHARP_){
return React.DOM.td(null,(function (){var pred__13593 = cljs.core._EQ_;
var expr__13594 = cljs.core.key.call(null,p1__13583_SHARP_);
if(cljs.core.truth_(pred__13593.call(null,new cljs.core.Keyword(null,"url","url",276297046),expr__13594))){
return React.DOM.a({"href": cljs.core.val.call(null,p1__13583_SHARP_)},cljs.core.val.call(null,p1__13583_SHARP_));
} else {
return [cljs.core.str(cljs.core.val.call(null,p1__13583_SHARP_))].join('');
}
})());
});})(current_QMARK_,event,data,payload,id,___$1))
,event));
});

photon.ui.frontend.t_photon$ui$frontend13590.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"event-list-item","event-list-item",1203672552,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",-1943919534,null)], null)))], null)),new cljs.core.Symbol(null,"params","params",-1943919534,null),new cljs.core.Symbol(null,"meta13591","meta13591",765146807,null)], null);
});

photon.ui.frontend.t_photon$ui$frontend13590.cljs$lang$type = true;

photon.ui.frontend.t_photon$ui$frontend13590.cljs$lang$ctorStr = "photon.ui.frontend/t_photon$ui$frontend13590";

photon.ui.frontend.t_photon$ui$frontend13590.cljs$lang$ctorPrWriter = (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"photon.ui.frontend/t_photon$ui$frontend13590");
});

photon.ui.frontend.__GT_t_photon$ui$frontend13590 = (function photon$ui$frontend$event_list_item_$___GT_t_photon$ui$frontend13590(event_list_item__$1,params__$1,meta13591){
return (new photon.ui.frontend.t_photon$ui$frontend13590(event_list_item__$1,params__$1,meta13591));
});

}

return (new photon.ui.frontend.t_photon$ui$frontend13590(photon$ui$frontend$event_list_item,params,cljs.core.PersistentArrayMap.EMPTY));
});
photon.ui.frontend.fn_update = (function photon$ui$frontend$fn_update(owner,stream_name){
var c__7859__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__7859__auto__){
return (function (){
var f__7860__auto__ = (function (){var switch__7838__auto__ = ((function (c__7859__auto__){
return (function (state_13625){
var state_val_13626 = (state_13625[(1)]);
if((state_val_13626 === (1))){
var inst_13616 = [cljs.core.str("/api/stream-contents/"),cljs.core.str(stream_name)].join('');
var inst_13617 = cljs_http.client.get.call(null,inst_13616);
var state_13625__$1 = state_13625;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13625__$1,(2),inst_13617);
} else {
if((state_val_13626 === (2))){
var inst_13619 = (state_13625[(2)]);
var inst_13620 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_13619);
var inst_13621 = console.log(inst_13620);
var inst_13622 = (function (){var response = inst_13620;
return ((function (response,inst_13619,inst_13620,inst_13621,state_val_13626,c__7859__auto__){
return (function (p1__13596_SHARP_){
return cljs.core.assoc.call(null,p1__13596_SHARP_,new cljs.core.Keyword(null,"events","events",1792552201),new cljs.core.Keyword(null,"results","results",-1134170113).cljs$core$IFn$_invoke$arity$1(response));
});
;})(response,inst_13619,inst_13620,inst_13621,state_val_13626,c__7859__auto__))
})();
var inst_13623 = om.core.update_state_BANG_.call(null,owner,inst_13622);
var state_13625__$1 = (function (){var statearr_13627 = state_13625;
(statearr_13627[(7)] = inst_13621);

return statearr_13627;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13625__$1,inst_13623);
} else {
return null;
}
}
});})(c__7859__auto__))
;
return ((function (switch__7838__auto__,c__7859__auto__){
return (function() {
var photon$ui$frontend$fn_update_$_state_machine__7839__auto__ = null;
var photon$ui$frontend$fn_update_$_state_machine__7839__auto____0 = (function (){
var statearr_13631 = [null,null,null,null,null,null,null,null];
(statearr_13631[(0)] = photon$ui$frontend$fn_update_$_state_machine__7839__auto__);

(statearr_13631[(1)] = (1));

return statearr_13631;
});
var photon$ui$frontend$fn_update_$_state_machine__7839__auto____1 = (function (state_13625){
while(true){
var ret_value__7840__auto__ = (function (){try{while(true){
var result__7841__auto__ = switch__7838__auto__.call(null,state_13625);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7841__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7841__auto__;
}
break;
}
}catch (e13632){if((e13632 instanceof Object)){
var ex__7842__auto__ = e13632;
var statearr_13633_13635 = state_13625;
(statearr_13633_13635[(5)] = ex__7842__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13625);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13632;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7840__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13636 = state_13625;
state_13625 = G__13636;
continue;
} else {
return ret_value__7840__auto__;
}
break;
}
});
photon$ui$frontend$fn_update_$_state_machine__7839__auto__ = function(state_13625){
switch(arguments.length){
case 0:
return photon$ui$frontend$fn_update_$_state_machine__7839__auto____0.call(this);
case 1:
return photon$ui$frontend$fn_update_$_state_machine__7839__auto____1.call(this,state_13625);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
photon$ui$frontend$fn_update_$_state_machine__7839__auto__.cljs$core$IFn$_invoke$arity$0 = photon$ui$frontend$fn_update_$_state_machine__7839__auto____0;
photon$ui$frontend$fn_update_$_state_machine__7839__auto__.cljs$core$IFn$_invoke$arity$1 = photon$ui$frontend$fn_update_$_state_machine__7839__auto____1;
return photon$ui$frontend$fn_update_$_state_machine__7839__auto__;
})()
;})(switch__7838__auto__,c__7859__auto__))
})();
var state__7861__auto__ = (function (){var statearr_13634 = f__7860__auto__.call(null);
(statearr_13634[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7859__auto__);

return statearr_13634;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7861__auto__);
});})(c__7859__auto__))
);

return c__7859__auto__;
});
photon.ui.frontend.strip_event = (function photon$ui$frontend$strip_event(event){
return cljs.core.assoc.call(null,cljs.core.dissoc.call(null,event,new cljs.core.Keyword(null,"payload","payload",-383036092),new cljs.core.Keyword(null,"provenance","provenance",-1359866313),new cljs.core.Keyword(null,"order-id","order-id",1242924148)),new cljs.core.Keyword(null,"payload-size","payload-size",-1871552354),cljs.core.count.call(null,cljs.core.pr_str.call(null,new cljs.core.Keyword(null,"payload","payload",-383036092).cljs$core$IFn$_invoke$arity$1(event))),new cljs.core.Keyword(null,"url","url",276297046),(function (){var current = window.location.href;
var root = clojure.string.join.call(null,"/",cljs.core.drop_last.call(null,clojure.string.split.call(null,current,/\//)));
return [cljs.core.str(root),cljs.core.str("/api/event/"),cljs.core.str(new cljs.core.Keyword(null,"stream-name","stream-name",1607843230).cljs$core$IFn$_invoke$arity$1(event)),cljs.core.str("/"),cljs.core.str(new cljs.core.Keyword(null,"order-id","order-id",1242924148).cljs$core$IFn$_invoke$arity$1(event))].join('');
})());
});
photon.ui.frontend.event_list = (function photon$ui$frontend$event_list(params,owner){
if(typeof photon.ui.frontend.t_photon$ui$frontend13643 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRenderState}
 * @implements {om.core.IWillReceiveProps}
 * @implements {om.core.IDidUpdate}
 * @implements {cljs.core.IMeta}
 * @implements {om.core.IInitState}
 * @implements {om.core.IDidMount}
 * @implements {cljs.core.IWithMeta}
*/
photon.ui.frontend.t_photon$ui$frontend13643 = (function (event_list,params,owner,meta13644){
this.event_list = event_list;
this.params = params;
this.owner = owner;
this.meta13644 = meta13644;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
photon.ui.frontend.t_photon$ui$frontend13643.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13645,meta13644__$1){
var self__ = this;
var _13645__$1 = this;
return (new photon.ui.frontend.t_photon$ui$frontend13643(self__.event_list,self__.params,self__.owner,meta13644__$1));
});

photon.ui.frontend.t_photon$ui$frontend13643.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13645){
var self__ = this;
var _13645__$1 = this;
return self__.meta13644;
});

photon.ui.frontend.t_photon$ui$frontend13643.prototype.om$core$IInitState$ = true;

photon.ui.frontend.t_photon$ui$frontend13643.prototype.om$core$IInitState$init_state$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stream","stream",1534941648),new cljs.core.Keyword(null,"stream","stream",1534941648).cljs$core$IFn$_invoke$arity$1(self__.params),new cljs.core.Keyword(null,"events","events",1792552201),cljs.core.PersistentVector.EMPTY], null);
});

photon.ui.frontend.t_photon$ui$frontend13643.prototype.om$core$IDidUpdate$ = true;

photon.ui.frontend.t_photon$ui$frontend13643.prototype.om$core$IDidUpdate$did_update$arity$3 = (function (_,___$1,___$2){
var self__ = this;
var ___$3 = this;
return cljs.core.dorun.call(null,cljs.core.map.call(null,((function (___$3){
return (function (p1__13637_SHARP_){
return hljs.highlightBlock(p1__13637_SHARP_);
});})(___$3))
,jayq.core.$.call(null,"code")));
});

photon.ui.frontend.t_photon$ui$frontend13643.prototype.om$core$IWillReceiveProps$ = true;

photon.ui.frontend.t_photon$ui$frontend13643.prototype.om$core$IWillReceiveProps$will_receive_props$arity$2 = (function (this$,next_props){
var self__ = this;
var this$__$1 = this;
if(cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"stream","stream",1534941648).cljs$core$IFn$_invoke$arity$1(next_props),new cljs.core.Keyword(null,"stream","stream",1534941648).cljs$core$IFn$_invoke$arity$1(om.core.get_state.call(null,self__.owner)))){
om.core.update_state_BANG_.call(null,self__.owner,((function (this$__$1){
return (function (_){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stream","stream",1534941648),new cljs.core.Keyword(null,"stream","stream",1534941648).cljs$core$IFn$_invoke$arity$1(next_props),new cljs.core.Keyword(null,"events","events",1792552201),cljs.core.PersistentVector.EMPTY], null);
});})(this$__$1))
);

return photon.ui.frontend.fn_update.call(null,self__.owner,new cljs.core.Keyword(null,"stream","stream",1534941648).cljs$core$IFn$_invoke$arity$1(next_props));
} else {
return null;
}
});

photon.ui.frontend.t_photon$ui$frontend13643.prototype.om$core$IDidMount$ = true;

photon.ui.frontend.t_photon$ui$frontend13643.prototype.om$core$IDidMount$did_mount$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return photon.ui.frontend.fn_update.call(null,self__.owner,new cljs.core.Keyword(null,"stream","stream",1534941648).cljs$core$IFn$_invoke$arity$1(self__.params));
});

photon.ui.frontend.t_photon$ui$frontend13643.prototype.om$core$IRenderState$ = true;

photon.ui.frontend.t_photon$ui$frontend13643.prototype.om$core$IRenderState$render_state$arity$2 = (function (_,state){
var self__ = this;
var ___$1 = this;
return React.DOM.div(null,React.DOM.h2(null,"Events"),cljs.core.apply.call(null,om.dom.table,{"className": "table table-striped table-bordered table-hover table-heading"},cljs.core.apply.call(null,om.dom.tr,null,cljs.core.map.call(null,((function (___$1){
return (function (p1__13638_SHARP_){
return React.DOM.th({"style": {"border": "1px"}},cljs.core.get.call(null,photon.ui.frontend.k__GT_header,cljs.core.key.call(null,p1__13638_SHARP_),cljs.core.name.call(null,cljs.core.key.call(null,p1__13638_SHARP_))));
});})(___$1))
,photon.ui.frontend.strip_event.call(null,cljs.core.first.call(null,new cljs.core.Keyword(null,"events","events",1792552201).cljs$core$IFn$_invoke$arity$1(state))))),cljs.core.map.call(null,((function (___$1){
return (function (p1__13639_SHARP_){
return om.core.build.call(null,photon.ui.frontend.event_list_item,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(self__.params),new cljs.core.Keyword(null,"event","event",301435442),photon.ui.frontend.strip_event.call(null,p1__13639_SHARP_)], null));
});})(___$1))
,new cljs.core.Keyword(null,"events","events",1792552201).cljs$core$IFn$_invoke$arity$1(state))));
});

photon.ui.frontend.t_photon$ui$frontend13643.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"event-list","event-list",1997741194,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"params","params",-1943919534,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"params","params",-1943919534,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"meta13644","meta13644",2083115625,null)], null);
});

photon.ui.frontend.t_photon$ui$frontend13643.cljs$lang$type = true;

photon.ui.frontend.t_photon$ui$frontend13643.cljs$lang$ctorStr = "photon.ui.frontend/t_photon$ui$frontend13643";

photon.ui.frontend.t_photon$ui$frontend13643.cljs$lang$ctorPrWriter = (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"photon.ui.frontend/t_photon$ui$frontend13643");
});

photon.ui.frontend.__GT_t_photon$ui$frontend13643 = (function photon$ui$frontend$event_list_$___GT_t_photon$ui$frontend13643(event_list__$1,params__$1,owner__$1,meta13644){
return (new photon.ui.frontend.t_photon$ui$frontend13643(event_list__$1,params__$1,owner__$1,meta13644));
});

}

return (new photon.ui.frontend.t_photon$ui$frontend13643(photon$ui$frontend$event_list,params,owner,cljs.core.PersistentArrayMap.EMPTY));
});
photon.ui.frontend.row_stream = (function photon$ui$frontend$row_stream(data,owner){
if(typeof photon.ui.frontend.t_photon$ui$frontend13650 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRender}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
photon.ui.frontend.t_photon$ui$frontend13650 = (function (row_stream,data,owner,meta13651){
this.row_stream = row_stream;
this.data = data;
this.owner = owner;
this.meta13651 = meta13651;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
photon.ui.frontend.t_photon$ui$frontend13650.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13652,meta13651__$1){
var self__ = this;
var _13652__$1 = this;
return (new photon.ui.frontend.t_photon$ui$frontend13650(self__.row_stream,self__.data,self__.owner,meta13651__$1));
});

photon.ui.frontend.t_photon$ui$frontend13650.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13652){
var self__ = this;
var _13652__$1 = this;
return self__.meta13651;
});

photon.ui.frontend.t_photon$ui$frontend13650.prototype.om$core$IRender$ = true;

photon.ui.frontend.t_photon$ui$frontend13650.prototype.om$core$IRender$render$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.apply.call(null,om.dom.tr,null,cljs.core.map.call(null,((function (___$1){
return (function (p1__13646_SHARP_){
return React.DOM.td(null,((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"stream","stream",1534941648),cljs.core.key.call(null,p1__13646_SHARP_)))?React.DOM.a({"href": "#", "onClick": ((function (___$1){
return (function (___$2){
return om.core.update_BANG_.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(self__.data),new cljs.core.Keyword(null,"active-stream","active-stream",-135071817),cljs.core.val.call(null,p1__13646_SHARP_));
});})(___$1))
},cljs.core.val.call(null,p1__13646_SHARP_)):cljs.core.val.call(null,p1__13646_SHARP_)));
});})(___$1))
,new cljs.core.Keyword(null,"stream","stream",1534941648).cljs$core$IFn$_invoke$arity$1(self__.data)));
});

photon.ui.frontend.t_photon$ui$frontend13650.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"row-stream","row-stream",-436423181,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"meta13651","meta13651",277942478,null)], null);
});

photon.ui.frontend.t_photon$ui$frontend13650.cljs$lang$type = true;

photon.ui.frontend.t_photon$ui$frontend13650.cljs$lang$ctorStr = "photon.ui.frontend/t_photon$ui$frontend13650";

photon.ui.frontend.t_photon$ui$frontend13650.cljs$lang$ctorPrWriter = (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"photon.ui.frontend/t_photon$ui$frontend13650");
});

photon.ui.frontend.__GT_t_photon$ui$frontend13650 = (function photon$ui$frontend$row_stream_$___GT_t_photon$ui$frontend13650(row_stream__$1,data__$1,owner__$1,meta13651){
return (new photon.ui.frontend.t_photon$ui$frontend13650(row_stream__$1,data__$1,owner__$1,meta13651));
});

}

return (new photon.ui.frontend.t_photon$ui$frontend13650(photon$ui$frontend$row_stream,data,owner,cljs.core.PersistentArrayMap.EMPTY));
});
photon.ui.frontend.widget_streams = (function photon$ui$frontend$widget_streams(data,owner){
if(typeof photon.ui.frontend.t_photon$ui$frontend13675 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRenderState}
 * @implements {cljs.core.IMeta}
 * @implements {om.core.IInitState}
 * @implements {om.core.IDidMount}
 * @implements {cljs.core.IWithMeta}
*/
photon.ui.frontend.t_photon$ui$frontend13675 = (function (widget_streams,data,owner,meta13676){
this.widget_streams = widget_streams;
this.data = data;
this.owner = owner;
this.meta13676 = meta13676;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
photon.ui.frontend.t_photon$ui$frontend13675.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13677,meta13676__$1){
var self__ = this;
var _13677__$1 = this;
return (new photon.ui.frontend.t_photon$ui$frontend13675(self__.widget_streams,self__.data,self__.owner,meta13676__$1));
});

photon.ui.frontend.t_photon$ui$frontend13675.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13677){
var self__ = this;
var _13677__$1 = this;
return self__.meta13676;
});

photon.ui.frontend.t_photon$ui$frontend13675.prototype.om$core$IInitState$ = true;

photon.ui.frontend.t_photon$ui$frontend13675.prototype.om$core$IInitState$init_state$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.data;
});

photon.ui.frontend.t_photon$ui$frontend13675.prototype.om$core$IDidMount$ = true;

photon.ui.frontend.t_photon$ui$frontend13675.prototype.om$core$IDidMount$did_mount$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var c__7859__auto___13694 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__7859__auto___13694,this$__$1){
return (function (){
var f__7860__auto__ = (function (){var switch__7838__auto__ = ((function (c__7859__auto___13694,this$__$1){
return (function (state_13685){
var state_val_13686 = (state_13685[(1)]);
if((state_val_13686 === (1))){
var inst_13678 = cljs_http.client.get.call(null,"/api/streams");
var state_13685__$1 = state_13685;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13685__$1,(2),inst_13678);
} else {
if((state_val_13686 === (2))){
var inst_13680 = (state_13685[(2)]);
var inst_13681 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_13680);
var inst_13682 = (function (){var res = inst_13681;
return ((function (res,inst_13680,inst_13681,state_val_13686,c__7859__auto___13694,this$__$1){
return (function (p1__13653_SHARP_){
return cljs.core.assoc.call(null,p1__13653_SHARP_,new cljs.core.Keyword(null,"streams","streams",1465783789),photon.ui.frontend.proj__GT_streams.call(null,new cljs.core.Keyword(null,"current-value","current-value",2066017989).cljs$core$IFn$_invoke$arity$1(res)));
});
;})(res,inst_13680,inst_13681,state_val_13686,c__7859__auto___13694,this$__$1))
})();
var inst_13683 = om.core.update_state_BANG_.call(null,self__.owner,inst_13682);
var state_13685__$1 = state_13685;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13685__$1,inst_13683);
} else {
return null;
}
}
});})(c__7859__auto___13694,this$__$1))
;
return ((function (switch__7838__auto__,c__7859__auto___13694,this$__$1){
return (function() {
var photon$ui$frontend$widget_streams_$_state_machine__7839__auto__ = null;
var photon$ui$frontend$widget_streams_$_state_machine__7839__auto____0 = (function (){
var statearr_13690 = [null,null,null,null,null,null,null];
(statearr_13690[(0)] = photon$ui$frontend$widget_streams_$_state_machine__7839__auto__);

(statearr_13690[(1)] = (1));

return statearr_13690;
});
var photon$ui$frontend$widget_streams_$_state_machine__7839__auto____1 = (function (state_13685){
while(true){
var ret_value__7840__auto__ = (function (){try{while(true){
var result__7841__auto__ = switch__7838__auto__.call(null,state_13685);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7841__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7841__auto__;
}
break;
}
}catch (e13691){if((e13691 instanceof Object)){
var ex__7842__auto__ = e13691;
var statearr_13692_13695 = state_13685;
(statearr_13692_13695[(5)] = ex__7842__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13685);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13691;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7840__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13696 = state_13685;
state_13685 = G__13696;
continue;
} else {
return ret_value__7840__auto__;
}
break;
}
});
photon$ui$frontend$widget_streams_$_state_machine__7839__auto__ = function(state_13685){
switch(arguments.length){
case 0:
return photon$ui$frontend$widget_streams_$_state_machine__7839__auto____0.call(this);
case 1:
return photon$ui$frontend$widget_streams_$_state_machine__7839__auto____1.call(this,state_13685);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
photon$ui$frontend$widget_streams_$_state_machine__7839__auto__.cljs$core$IFn$_invoke$arity$0 = photon$ui$frontend$widget_streams_$_state_machine__7839__auto____0;
photon$ui$frontend$widget_streams_$_state_machine__7839__auto__.cljs$core$IFn$_invoke$arity$1 = photon$ui$frontend$widget_streams_$_state_machine__7839__auto____1;
return photon$ui$frontend$widget_streams_$_state_machine__7839__auto__;
})()
;})(switch__7838__auto__,c__7859__auto___13694,this$__$1))
})();
var state__7861__auto__ = (function (){var statearr_13693 = f__7860__auto__.call(null);
(statearr_13693[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7859__auto___13694);

return statearr_13693;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7861__auto__);
});})(c__7859__auto___13694,this$__$1))
);


return photon.ui.frontend.subscribe_streams_BANG_.call(null,self__.owner);
});

photon.ui.frontend.t_photon$ui$frontend13675.prototype.om$core$IRenderState$ = true;

photon.ui.frontend.t_photon$ui$frontend13675.prototype.om$core$IRenderState$render_state$arity$2 = (function (_,state){
var self__ = this;
var ___$1 = this;
return React.DOM.div(null,React.DOM.h1(null,"Streams"),cljs.core.apply.call(null,om.dom.table,null,cljs.core.apply.call(null,om.dom.tr,null,cljs.core.map.call(null,((function (___$1){
return (function (p1__13654_SHARP_){
return React.DOM.th(null,photon.ui.frontend.k__GT_header.call(null,p1__13654_SHARP_));
});})(___$1))
,cljs.core.keys.call(null,cljs.core.first.call(null,new cljs.core.Keyword(null,"streams","streams",1465783789).cljs$core$IFn$_invoke$arity$1(state))))),cljs.core.map.call(null,((function (___$1){
return (function (p1__13655_SHARP_){
return om.core.build.call(null,photon.ui.frontend.row_stream,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(self__.data),new cljs.core.Keyword(null,"stream","stream",1534941648),p1__13655_SHARP_], null));
});})(___$1))
,new cljs.core.Keyword(null,"streams","streams",1465783789).cljs$core$IFn$_invoke$arity$1(state))),((!((new cljs.core.Keyword(null,"active-stream","active-stream",-135071817).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(self__.data)) == null)))?om.core.build.call(null,photon.ui.frontend.event_list,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(self__.data),new cljs.core.Keyword(null,"stream","stream",1534941648),new cljs.core.Keyword(null,"active-stream","active-stream",-135071817).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(self__.data))], null)):null));
});

photon.ui.frontend.t_photon$ui$frontend13675.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"widget-streams","widget-streams",-828269583,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"meta13676","meta13676",-1221247671,null)], null);
});

photon.ui.frontend.t_photon$ui$frontend13675.cljs$lang$type = true;

photon.ui.frontend.t_photon$ui$frontend13675.cljs$lang$ctorStr = "photon.ui.frontend/t_photon$ui$frontend13675";

photon.ui.frontend.t_photon$ui$frontend13675.cljs$lang$ctorPrWriter = (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"photon.ui.frontend/t_photon$ui$frontend13675");
});

photon.ui.frontend.__GT_t_photon$ui$frontend13675 = (function photon$ui$frontend$widget_streams_$___GT_t_photon$ui$frontend13675(widget_streams__$1,data__$1,owner__$1,meta13676){
return (new photon.ui.frontend.t_photon$ui$frontend13675(widget_streams__$1,data__$1,owner__$1,meta13676));
});

}

return (new photon.ui.frontend.t_photon$ui$frontend13675(photon$ui$frontend$widget_streams,data,owner,cljs.core.PersistentArrayMap.EMPTY));
});
photon.ui.frontend.menu_item = (function photon$ui$frontend$menu_item(data,owner){
if(typeof photon.ui.frontend.t_photon$ui$frontend13700 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRender}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
photon.ui.frontend.t_photon$ui$frontend13700 = (function (menu_item,data,owner,meta13701){
this.menu_item = menu_item;
this.data = data;
this.owner = owner;
this.meta13701 = meta13701;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
photon.ui.frontend.t_photon$ui$frontend13700.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13702,meta13701__$1){
var self__ = this;
var _13702__$1 = this;
return (new photon.ui.frontend.t_photon$ui$frontend13700(self__.menu_item,self__.data,self__.owner,meta13701__$1));
});

photon.ui.frontend.t_photon$ui$frontend13700.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13702){
var self__ = this;
var _13702__$1 = this;
return self__.meta13701;
});

photon.ui.frontend.t_photon$ui$frontend13700.prototype.om$core$IRender$ = true;

photon.ui.frontend.t_photon$ui$frontend13700.prototype.om$core$IRender$render$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return React.DOM.a({"href": "#", "onClick": ((function (___$1){
return (function (___$2){
return om.core.update_BANG_.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(self__.data),new cljs.core.Keyword(null,"active-page","active-page",370357330),cljs.core.val.call(null,new cljs.core.Keyword(null,"item","item",249373802).cljs$core$IFn$_invoke$arity$1(self__.data)));
});})(___$1))
},cljs.core.key.call(null,new cljs.core.Keyword(null,"item","item",249373802).cljs$core$IFn$_invoke$arity$1(self__.data)));
});

photon.ui.frontend.t_photon$ui$frontend13700.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"menu-item","menu-item",269419754,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"meta13701","meta13701",-1610280636,null)], null);
});

photon.ui.frontend.t_photon$ui$frontend13700.cljs$lang$type = true;

photon.ui.frontend.t_photon$ui$frontend13700.cljs$lang$ctorStr = "photon.ui.frontend/t_photon$ui$frontend13700";

photon.ui.frontend.t_photon$ui$frontend13700.cljs$lang$ctorPrWriter = (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"photon.ui.frontend/t_photon$ui$frontend13700");
});

photon.ui.frontend.__GT_t_photon$ui$frontend13700 = (function photon$ui$frontend$menu_item_$___GT_t_photon$ui$frontend13700(menu_item__$1,data__$1,owner__$1,meta13701){
return (new photon.ui.frontend.t_photon$ui$frontend13700(menu_item__$1,data__$1,owner__$1,meta13701));
});

}

return (new photon.ui.frontend.t_photon$ui$frontend13700(photon$ui$frontend$menu_item,data,owner,cljs.core.PersistentArrayMap.EMPTY));
});
photon.ui.frontend.main_menu = (function photon$ui$frontend$main_menu(data,owner){
if(typeof photon.ui.frontend.t_photon$ui$frontend13707 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRender}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
photon.ui.frontend.t_photon$ui$frontend13707 = (function (main_menu,data,owner,meta13708){
this.main_menu = main_menu;
this.data = data;
this.owner = owner;
this.meta13708 = meta13708;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
photon.ui.frontend.t_photon$ui$frontend13707.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13709,meta13708__$1){
var self__ = this;
var _13709__$1 = this;
return (new photon.ui.frontend.t_photon$ui$frontend13707(self__.main_menu,self__.data,self__.owner,meta13708__$1));
});

photon.ui.frontend.t_photon$ui$frontend13707.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13709){
var self__ = this;
var _13709__$1 = this;
return self__.meta13708;
});

photon.ui.frontend.t_photon$ui$frontend13707.prototype.om$core$IRender$ = true;

photon.ui.frontend.t_photon$ui$frontend13707.prototype.om$core$IRender$render$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return React.DOM.div(null,cljs.core.apply.call(null,om.dom.div,null,cljs.core.map.call(null,((function (___$1){
return (function (p1__13703_SHARP_){
return om.core.build.call(null,photon.ui.frontend.menu_item,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(self__.data),new cljs.core.Keyword(null,"item","item",249373802),p1__13703_SHARP_], null));
});})(___$1))
,new cljs.core.Keyword(null,"items","items",1031954938).cljs$core$IFn$_invoke$arity$1(self__.data))));
});

photon.ui.frontend.t_photon$ui$frontend13707.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"main-menu","main-menu",168741146,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"meta13708","meta13708",721415656,null)], null);
});

photon.ui.frontend.t_photon$ui$frontend13707.cljs$lang$type = true;

photon.ui.frontend.t_photon$ui$frontend13707.cljs$lang$ctorStr = "photon.ui.frontend/t_photon$ui$frontend13707";

photon.ui.frontend.t_photon$ui$frontend13707.cljs$lang$ctorPrWriter = (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"photon.ui.frontend/t_photon$ui$frontend13707");
});

photon.ui.frontend.__GT_t_photon$ui$frontend13707 = (function photon$ui$frontend$main_menu_$___GT_t_photon$ui$frontend13707(main_menu__$1,data__$1,owner__$1,meta13708){
return (new photon.ui.frontend.t_photon$ui$frontend13707(main_menu__$1,data__$1,owner__$1,meta13708));
});

}

return (new photon.ui.frontend.t_photon$ui$frontend13707(photon$ui$frontend$main_menu,data,owner,cljs.core.PersistentArrayMap.EMPTY));
});
photon.ui.frontend.full_page = (function photon$ui$frontend$full_page(data,owner){
if(typeof photon.ui.frontend.t_photon$ui$frontend13713 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRender}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
photon.ui.frontend.t_photon$ui$frontend13713 = (function (full_page,data,owner,meta13714){
this.full_page = full_page;
this.data = data;
this.owner = owner;
this.meta13714 = meta13714;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
photon.ui.frontend.t_photon$ui$frontend13713.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13715,meta13714__$1){
var self__ = this;
var _13715__$1 = this;
return (new photon.ui.frontend.t_photon$ui$frontend13713(self__.full_page,self__.data,self__.owner,meta13714__$1));
});

photon.ui.frontend.t_photon$ui$frontend13713.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13715){
var self__ = this;
var _13715__$1 = this;
return self__.meta13714;
});

photon.ui.frontend.t_photon$ui$frontend13713.prototype.om$core$IRender$ = true;

photon.ui.frontend.t_photon$ui$frontend13713.prototype.om$core$IRender$render$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return React.DOM.div(null,om.core.build.call(null,photon.ui.frontend.main_menu,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"data","data",-232669377),self__.data,new cljs.core.Keyword(null,"items","items",1031954938),new cljs.core.PersistentArrayMap(null, 3, ["Streams",photon.ui.frontend.widget_streams,"Projections",photon.ui.frontend.widget_projections,"New projection",photon.ui.frontend.widget_new_projection], null)], null)),React.DOM.div(null,(((new cljs.core.Keyword(null,"active-page","active-page",370357330).cljs$core$IFn$_invoke$arity$1(self__.data) == null))?"Choose option from menu":om.core.build.call(null,new cljs.core.Keyword(null,"active-page","active-page",370357330).cljs$core$IFn$_invoke$arity$1(self__.data),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),self__.data], null)))));
});

photon.ui.frontend.t_photon$ui$frontend13713.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"full-page","full-page",-1712627269,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"meta13714","meta13714",-865403038,null)], null);
});

photon.ui.frontend.t_photon$ui$frontend13713.cljs$lang$type = true;

photon.ui.frontend.t_photon$ui$frontend13713.cljs$lang$ctorStr = "photon.ui.frontend/t_photon$ui$frontend13713";

photon.ui.frontend.t_photon$ui$frontend13713.cljs$lang$ctorPrWriter = (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"photon.ui.frontend/t_photon$ui$frontend13713");
});

photon.ui.frontend.__GT_t_photon$ui$frontend13713 = (function photon$ui$frontend$full_page_$___GT_t_photon$ui$frontend13713(full_page__$1,data__$1,owner__$1,meta13714){
return (new photon.ui.frontend.t_photon$ui$frontend13713(full_page__$1,data__$1,owner__$1,meta13714));
});

}

return (new photon.ui.frontend.t_photon$ui$frontend13713(photon$ui$frontend$full_page,data,owner,cljs.core.PersistentArrayMap.EMPTY));
});
var c__7859__auto___13735 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__7859__auto___13735){
return (function (){
var f__7860__auto__ = (function (){var switch__7838__auto__ = ((function (c__7859__auto___13735){
return (function (state_13725){
var state_val_13726 = (state_13725[(1)]);
if((state_val_13726 === (1))){
var inst_13716 = cljs_http.client.get.call(null,"/api/startup");
var state_13725__$1 = state_13725;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13725__$1,(2),inst_13716);
} else {
if((state_val_13726 === (2))){
var inst_13718 = (state_13725[(2)]);
var inst_13719 = [new cljs.core.Keyword(null,"target","target",253001721)];
var inst_13720 = document.getElementById("main-area");
var inst_13721 = [inst_13720];
var inst_13722 = cljs.core.PersistentHashMap.fromArrays(inst_13719,inst_13721);
var inst_13723 = om.core.root.call(null,photon.ui.frontend.full_page,photon.ui.frontend.app_state,inst_13722);
var state_13725__$1 = (function (){var statearr_13727 = state_13725;
(statearr_13727[(7)] = inst_13718);

return statearr_13727;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13725__$1,inst_13723);
} else {
return null;
}
}
});})(c__7859__auto___13735))
;
return ((function (switch__7838__auto__,c__7859__auto___13735){
return (function() {
var photon$ui$frontend$state_machine__7839__auto__ = null;
var photon$ui$frontend$state_machine__7839__auto____0 = (function (){
var statearr_13731 = [null,null,null,null,null,null,null,null];
(statearr_13731[(0)] = photon$ui$frontend$state_machine__7839__auto__);

(statearr_13731[(1)] = (1));

return statearr_13731;
});
var photon$ui$frontend$state_machine__7839__auto____1 = (function (state_13725){
while(true){
var ret_value__7840__auto__ = (function (){try{while(true){
var result__7841__auto__ = switch__7838__auto__.call(null,state_13725);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7841__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7841__auto__;
}
break;
}
}catch (e13732){if((e13732 instanceof Object)){
var ex__7842__auto__ = e13732;
var statearr_13733_13736 = state_13725;
(statearr_13733_13736[(5)] = ex__7842__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13725);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13732;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7840__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13737 = state_13725;
state_13725 = G__13737;
continue;
} else {
return ret_value__7840__auto__;
}
break;
}
});
photon$ui$frontend$state_machine__7839__auto__ = function(state_13725){
switch(arguments.length){
case 0:
return photon$ui$frontend$state_machine__7839__auto____0.call(this);
case 1:
return photon$ui$frontend$state_machine__7839__auto____1.call(this,state_13725);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
photon$ui$frontend$state_machine__7839__auto__.cljs$core$IFn$_invoke$arity$0 = photon$ui$frontend$state_machine__7839__auto____0;
photon$ui$frontend$state_machine__7839__auto__.cljs$core$IFn$_invoke$arity$1 = photon$ui$frontend$state_machine__7839__auto____1;
return photon$ui$frontend$state_machine__7839__auto__;
})()
;})(switch__7838__auto__,c__7859__auto___13735))
})();
var state__7861__auto__ = (function (){var statearr_13734 = f__7860__auto__.call(null);
(statearr_13734[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7859__auto___13735);

return statearr_13734;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7861__auto__);
});})(c__7859__auto___13735))
);


//# sourceMappingURL=frontend.js.map