// Compiled by ClojureScript 0.0-3269 {}
goog.provide('figwheel.client.heads_up');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('figwheel.client.socket');
goog.require('cljs.core.async');

figwheel.client.heads_up.node = (function figwheel$client$heads_up$node(){
var argseq__30305__auto__ = ((((2) < arguments.length))?(new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,(2)),(0))):null);
return figwheel.client.heads_up.node.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__30305__auto__);
});

figwheel.client.heads_up.node.cljs$core$IFn$_invoke$arity$variadic = (function (t,attrs,children){
var e = document.createElement(cljs.core.name.call(null,t));
var seq__42999_43007 = cljs.core.seq.call(null,cljs.core.keys.call(null,attrs));
var chunk__43000_43008 = null;
var count__43001_43009 = (0);
var i__43002_43010 = (0);
while(true){
if((i__43002_43010 < count__43001_43009)){
var k_43011 = cljs.core._nth.call(null,chunk__43000_43008,i__43002_43010);
e.setAttribute(cljs.core.name.call(null,k_43011),cljs.core.get.call(null,attrs,k_43011));

var G__43012 = seq__42999_43007;
var G__43013 = chunk__43000_43008;
var G__43014 = count__43001_43009;
var G__43015 = (i__43002_43010 + (1));
seq__42999_43007 = G__43012;
chunk__43000_43008 = G__43013;
count__43001_43009 = G__43014;
i__43002_43010 = G__43015;
continue;
} else {
var temp__4423__auto___43016 = cljs.core.seq.call(null,seq__42999_43007);
if(temp__4423__auto___43016){
var seq__42999_43017__$1 = temp__4423__auto___43016;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__42999_43017__$1)){
var c__30050__auto___43018 = cljs.core.chunk_first.call(null,seq__42999_43017__$1);
var G__43019 = cljs.core.chunk_rest.call(null,seq__42999_43017__$1);
var G__43020 = c__30050__auto___43018;
var G__43021 = cljs.core.count.call(null,c__30050__auto___43018);
var G__43022 = (0);
seq__42999_43007 = G__43019;
chunk__43000_43008 = G__43020;
count__43001_43009 = G__43021;
i__43002_43010 = G__43022;
continue;
} else {
var k_43023 = cljs.core.first.call(null,seq__42999_43017__$1);
e.setAttribute(cljs.core.name.call(null,k_43023),cljs.core.get.call(null,attrs,k_43023));

var G__43024 = cljs.core.next.call(null,seq__42999_43017__$1);
var G__43025 = null;
var G__43026 = (0);
var G__43027 = (0);
seq__42999_43007 = G__43024;
chunk__43000_43008 = G__43025;
count__43001_43009 = G__43026;
i__43002_43010 = G__43027;
continue;
}
} else {
}
}
break;
}

var seq__43003_43028 = cljs.core.seq.call(null,children);
var chunk__43004_43029 = null;
var count__43005_43030 = (0);
var i__43006_43031 = (0);
while(true){
if((i__43006_43031 < count__43005_43030)){
var ch_43032 = cljs.core._nth.call(null,chunk__43004_43029,i__43006_43031);
e.appendChild(ch_43032);

var G__43033 = seq__43003_43028;
var G__43034 = chunk__43004_43029;
var G__43035 = count__43005_43030;
var G__43036 = (i__43006_43031 + (1));
seq__43003_43028 = G__43033;
chunk__43004_43029 = G__43034;
count__43005_43030 = G__43035;
i__43006_43031 = G__43036;
continue;
} else {
var temp__4423__auto___43037 = cljs.core.seq.call(null,seq__43003_43028);
if(temp__4423__auto___43037){
var seq__43003_43038__$1 = temp__4423__auto___43037;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__43003_43038__$1)){
var c__30050__auto___43039 = cljs.core.chunk_first.call(null,seq__43003_43038__$1);
var G__43040 = cljs.core.chunk_rest.call(null,seq__43003_43038__$1);
var G__43041 = c__30050__auto___43039;
var G__43042 = cljs.core.count.call(null,c__30050__auto___43039);
var G__43043 = (0);
seq__43003_43028 = G__43040;
chunk__43004_43029 = G__43041;
count__43005_43030 = G__43042;
i__43006_43031 = G__43043;
continue;
} else {
var ch_43044 = cljs.core.first.call(null,seq__43003_43038__$1);
e.appendChild(ch_43044);

var G__43045 = cljs.core.next.call(null,seq__43003_43038__$1);
var G__43046 = null;
var G__43047 = (0);
var G__43048 = (0);
seq__43003_43028 = G__43045;
chunk__43004_43029 = G__43046;
count__43005_43030 = G__43047;
i__43006_43031 = G__43048;
continue;
}
} else {
}
}
break;
}

return e;
});

figwheel.client.heads_up.node.cljs$lang$maxFixedArity = (2);

figwheel.client.heads_up.node.cljs$lang$applyTo = (function (seq42996){
var G__42997 = cljs.core.first.call(null,seq42996);
var seq42996__$1 = cljs.core.next.call(null,seq42996);
var G__42998 = cljs.core.first.call(null,seq42996__$1);
var seq42996__$2 = cljs.core.next.call(null,seq42996__$1);
return figwheel.client.heads_up.node.cljs$core$IFn$_invoke$arity$variadic(G__42997,G__42998,seq42996__$2);
});
if(typeof figwheel.client.heads_up.heads_up_event_dispatch !== 'undefined'){
} else {
figwheel.client.heads_up.heads_up_event_dispatch = (function (){var method_table__30160__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__30161__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__30162__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__30163__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__30164__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"figwheel.client.heads-up","heads-up-event-dispatch"),((function (method_table__30160__auto__,prefer_table__30161__auto__,method_cache__30162__auto__,cached_hierarchy__30163__auto__,hierarchy__30164__auto__){
return (function (dataset){
return dataset.figwheelEvent;
});})(method_table__30160__auto__,prefer_table__30161__auto__,method_cache__30162__auto__,cached_hierarchy__30163__auto__,hierarchy__30164__auto__))
,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__30164__auto__,method_table__30160__auto__,prefer_table__30161__auto__,method_cache__30162__auto__,cached_hierarchy__30163__auto__));
})();
}
cljs.core._add_method.call(null,figwheel.client.heads_up.heads_up_event_dispatch,new cljs.core.Keyword(null,"default","default",-1987822328),(function (_){
return cljs.core.PersistentArrayMap.EMPTY;
}));
cljs.core._add_method.call(null,figwheel.client.heads_up.heads_up_event_dispatch,"file-selected",(function (dataset){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"file-selected",new cljs.core.Keyword(null,"file-name","file-name",-1654217259),dataset.fileName,new cljs.core.Keyword(null,"file-line","file-line",-1228823138),dataset.fileLine], null));
}));
cljs.core._add_method.call(null,figwheel.client.heads_up.heads_up_event_dispatch,"close-heads-up",(function (dataset){
return figwheel.client.heads_up.clear.call(null);
}));
figwheel.client.heads_up.ancestor_nodes = (function figwheel$client$heads_up$ancestor_nodes(el){
return cljs.core.iterate.call(null,(function (e){
return e.parentNode;
}),el);
});
figwheel.client.heads_up.get_dataset = (function figwheel$client$heads_up$get_dataset(el){
return cljs.core.first.call(null,cljs.core.keep.call(null,(function (x){
if(cljs.core.truth_(x.dataset.figwheelEvent)){
return x.dataset;
} else {
return null;
}
}),cljs.core.take.call(null,(4),figwheel.client.heads_up.ancestor_nodes.call(null,el))));
});
figwheel.client.heads_up.heads_up_onclick_handler = (function figwheel$client$heads_up$heads_up_onclick_handler(event){
var dataset = figwheel.client.heads_up.get_dataset.call(null,event.target);
event.preventDefault();

if(cljs.core.truth_(dataset)){
return figwheel.client.heads_up.heads_up_event_dispatch.call(null,dataset);
} else {
return null;
}
});
figwheel.client.heads_up.ensure_container = (function figwheel$client$heads_up$ensure_container(){
var cont_id = "figwheel-heads-up-container";
var content_id = "figwheel-heads-up-content-area";
if(cljs.core.not.call(null,document.querySelector([cljs.core.str("#"),cljs.core.str(cont_id)].join('')))){
var el_43049 = figwheel.client.heads_up.node.call(null,new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),cont_id,new cljs.core.Keyword(null,"style","style",-496642736),[cljs.core.str("-webkit-transition: all 0.2s ease-in-out;"),cljs.core.str("-moz-transition: all 0.2s ease-in-out;"),cljs.core.str("-o-transition: all 0.2s ease-in-out;"),cljs.core.str("transition: all 0.2s ease-in-out;"),cljs.core.str("font-size: 13px;"),cljs.core.str("border-top: 1px solid #f5f5f5;"),cljs.core.str("box-shadow: 0px 0px 1px #aaaaaa;"),cljs.core.str("line-height: 18px;"),cljs.core.str("color: #333;"),cljs.core.str("font-family: monospace;"),cljs.core.str("padding: 0px 10px 0px 70px;"),cljs.core.str("position: fixed;"),cljs.core.str("bottom: 0px;"),cljs.core.str("left: 0px;"),cljs.core.str("height: 0px;"),cljs.core.str("opacity: 0.0;"),cljs.core.str("box-sizing: border-box;"),cljs.core.str("z-index: 10000;")].join('')], null));
el_43049.onclick = figwheel.client.heads_up.heads_up_onclick_handler;

el_43049.innerHTML = [cljs.core.str(figwheel.client.heads_up.clojure_symbol_svg)].join('');

el_43049.appendChild(figwheel.client.heads_up.node.call(null,new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),content_id], null)));

document.body.appendChild(el_43049);
} else {
}

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"container-el","container-el",109664205),document.getElementById(cont_id),new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187),document.getElementById(content_id)], null);
});
figwheel.client.heads_up.set_style_BANG_ = (function figwheel$client$heads_up$set_style_BANG_(p__43050,st_map){
var map__43054 = p__43050;
var map__43054__$1 = ((cljs.core.seq_QMARK_.call(null,map__43054))?cljs.core.apply.call(null,cljs.core.hash_map,map__43054):map__43054);
var container_el = cljs.core.get.call(null,map__43054__$1,new cljs.core.Keyword(null,"container-el","container-el",109664205));
return cljs.core.mapv.call(null,((function (map__43054,map__43054__$1,container_el){
return (function (p__43055){
var vec__43056 = p__43055;
var k = cljs.core.nth.call(null,vec__43056,(0),null);
var v = cljs.core.nth.call(null,vec__43056,(1),null);
return (container_el.style[cljs.core.name.call(null,k)] = v);
});})(map__43054,map__43054__$1,container_el))
,st_map);
});
figwheel.client.heads_up.set_content_BANG_ = (function figwheel$client$heads_up$set_content_BANG_(p__43057,dom_str){
var map__43059 = p__43057;
var map__43059__$1 = ((cljs.core.seq_QMARK_.call(null,map__43059))?cljs.core.apply.call(null,cljs.core.hash_map,map__43059):map__43059);
var c = map__43059__$1;
var content_area_el = cljs.core.get.call(null,map__43059__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));
return content_area_el.innerHTML = dom_str;
});
figwheel.client.heads_up.get_content = (function figwheel$client$heads_up$get_content(p__43060){
var map__43062 = p__43060;
var map__43062__$1 = ((cljs.core.seq_QMARK_.call(null,map__43062))?cljs.core.apply.call(null,cljs.core.hash_map,map__43062):map__43062);
var content_area_el = cljs.core.get.call(null,map__43062__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));
return content_area_el.innerHTML;
});
figwheel.client.heads_up.close_link = (function figwheel$client$heads_up$close_link(){
return [cljs.core.str("<a style=\""),cljs.core.str("float: right;"),cljs.core.str("font-size: 18px;"),cljs.core.str("text-decoration: none;"),cljs.core.str("text-align: right;"),cljs.core.str("width: 30px;"),cljs.core.str("height: 30px;"),cljs.core.str("color: rgba(84,84,84, 0.5);"),cljs.core.str("\" href=\"#\"  data-figwheel-event=\"close-heads-up\">"),cljs.core.str("x"),cljs.core.str("</a>")].join('');
});
figwheel.client.heads_up.display_heads_up = (function figwheel$client$heads_up$display_heads_up(style,msg){
var c__32551__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto__){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto__){
return (function (state_43104){
var state_val_43105 = (state_43104[(1)]);
if((state_val_43105 === (1))){
var inst_43089 = (state_43104[(7)]);
var inst_43089__$1 = figwheel.client.heads_up.ensure_container.call(null);
var inst_43090 = [new cljs.core.Keyword(null,"paddingTop","paddingTop",-1088692345),new cljs.core.Keyword(null,"paddingBottom","paddingBottom",-916694489),new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"minHeight","minHeight",-1635998980),new cljs.core.Keyword(null,"opacity","opacity",397153780)];
var inst_43091 = ["10px","10px","100%","68px","1.0"];
var inst_43092 = cljs.core.PersistentHashMap.fromArrays(inst_43090,inst_43091);
var inst_43093 = cljs.core.merge.call(null,inst_43092,style);
var inst_43094 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_43089__$1,inst_43093);
var inst_43095 = figwheel.client.heads_up.set_content_BANG_.call(null,inst_43089__$1,msg);
var inst_43096 = cljs.core.async.timeout.call(null,(300));
var state_43104__$1 = (function (){var statearr_43106 = state_43104;
(statearr_43106[(8)] = inst_43095);

(statearr_43106[(9)] = inst_43094);

(statearr_43106[(7)] = inst_43089__$1);

return statearr_43106;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_43104__$1,(2),inst_43096);
} else {
if((state_val_43105 === (2))){
var inst_43089 = (state_43104[(7)]);
var inst_43098 = (state_43104[(2)]);
var inst_43099 = [new cljs.core.Keyword(null,"height","height",1025178622)];
var inst_43100 = ["auto"];
var inst_43101 = cljs.core.PersistentHashMap.fromArrays(inst_43099,inst_43100);
var inst_43102 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_43089,inst_43101);
var state_43104__$1 = (function (){var statearr_43107 = state_43104;
(statearr_43107[(10)] = inst_43098);

return statearr_43107;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_43104__$1,inst_43102);
} else {
return null;
}
}
});})(c__32551__auto__))
;
return ((function (switch__32489__auto__,c__32551__auto__){
return (function() {
var figwheel$client$heads_up$display_heads_up_$_state_machine__32490__auto__ = null;
var figwheel$client$heads_up$display_heads_up_$_state_machine__32490__auto____0 = (function (){
var statearr_43111 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_43111[(0)] = figwheel$client$heads_up$display_heads_up_$_state_machine__32490__auto__);

(statearr_43111[(1)] = (1));

return statearr_43111;
});
var figwheel$client$heads_up$display_heads_up_$_state_machine__32490__auto____1 = (function (state_43104){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_43104);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e43112){if((e43112 instanceof Object)){
var ex__32493__auto__ = e43112;
var statearr_43113_43115 = state_43104;
(statearr_43113_43115[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_43104);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e43112;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43116 = state_43104;
state_43104 = G__43116;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
figwheel$client$heads_up$display_heads_up_$_state_machine__32490__auto__ = function(state_43104){
switch(arguments.length){
case 0:
return figwheel$client$heads_up$display_heads_up_$_state_machine__32490__auto____0.call(this);
case 1:
return figwheel$client$heads_up$display_heads_up_$_state_machine__32490__auto____1.call(this,state_43104);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up$display_heads_up_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up$display_heads_up_$_state_machine__32490__auto____0;
figwheel$client$heads_up$display_heads_up_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up$display_heads_up_$_state_machine__32490__auto____1;
return figwheel$client$heads_up$display_heads_up_$_state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto__))
})();
var state__32553__auto__ = (function (){var statearr_43114 = f__32552__auto__.call(null);
(statearr_43114[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto__);

return statearr_43114;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto__))
);

return c__32551__auto__;
});
figwheel.client.heads_up.heading = (function figwheel$client$heads_up$heading(s){
return [cljs.core.str("<div style=\""),cljs.core.str("font-size: 26px;"),cljs.core.str("line-height: 26px;"),cljs.core.str("margin-bottom: 2px;"),cljs.core.str("padding-top: 1px;"),cljs.core.str("\">"),cljs.core.str(s),cljs.core.str("</div>")].join('');
});
figwheel.client.heads_up.file_and_line_number = (function figwheel$client$heads_up$file_and_line_number(msg){
if(cljs.core.truth_(cljs.core.re_matches.call(null,/.*at\sline.*/,msg))){
return cljs.core.take.call(null,(2),cljs.core.reverse.call(null,clojure.string.split.call(null,msg," ")));
} else {
return null;
}
});
figwheel.client.heads_up.file_selector_div = (function figwheel$client$heads_up$file_selector_div(file_name,line_number,msg){
return [cljs.core.str("<div data-figwheel-event=\"file-selected\" data-file-name=\""),cljs.core.str(file_name),cljs.core.str("\" data-file-line=\""),cljs.core.str(line_number),cljs.core.str("\">"),cljs.core.str(msg),cljs.core.str("</div>")].join('');
});
figwheel.client.heads_up.format_line = (function figwheel$client$heads_up$format_line(msg){
var temp__4421__auto__ = figwheel.client.heads_up.file_and_line_number.call(null,msg);
if(cljs.core.truth_(temp__4421__auto__)){
var vec__43118 = temp__4421__auto__;
var f = cljs.core.nth.call(null,vec__43118,(0),null);
var ln = cljs.core.nth.call(null,vec__43118,(1),null);
return figwheel.client.heads_up.file_selector_div.call(null,f,ln,msg);
} else {
return [cljs.core.str("<div>"),cljs.core.str(msg),cljs.core.str("</div>")].join('');
}
});
figwheel.client.heads_up.display_error = (function figwheel$client$heads_up$display_error(formatted_messages,cause){
var vec__43121 = (cljs.core.truth_(cause)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(cause),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cause),new cljs.core.Keyword(null,"column","column",2078222095).cljs$core$IFn$_invoke$arity$1(cause)], null):cljs.core.first.call(null,cljs.core.keep.call(null,figwheel.client.heads_up.file_and_line_number,formatted_messages)));
var file_name = cljs.core.nth.call(null,vec__43121,(0),null);
var file_line = cljs.core.nth.call(null,vec__43121,(1),null);
var file_column = cljs.core.nth.call(null,vec__43121,(2),null);
var msg = cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,((function (vec__43121,file_name,file_line,file_column){
return (function (p1__43119_SHARP_){
return [cljs.core.str("<div>"),cljs.core.str(p1__43119_SHARP_),cljs.core.str("</div>")].join('');
});})(vec__43121,file_name,file_line,file_column))
,formatted_messages));
return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(255, 161, 161, 0.95)"], null),[cljs.core.str(figwheel.client.heads_up.close_link.call(null)),cljs.core.str(figwheel.client.heads_up.heading.call(null,"Compile Error")),cljs.core.str(figwheel.client.heads_up.file_selector_div.call(null,file_name,(function (){var or__29265__auto__ = file_line;
if(cljs.core.truth_(or__29265__auto__)){
return or__29265__auto__;
} else {
var and__29253__auto__ = cause;
if(cljs.core.truth_(and__29253__auto__)){
return new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cause);
} else {
return and__29253__auto__;
}
}
})(),[cljs.core.str(msg),cljs.core.str((cljs.core.truth_(cause)?[cljs.core.str("Error on file "),cljs.core.str(new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(cause)),cljs.core.str(", line "),cljs.core.str(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cause)),cljs.core.str(", column "),cljs.core.str(new cljs.core.Keyword(null,"column","column",2078222095).cljs$core$IFn$_invoke$arity$1(cause))].join(''):""))].join('')))].join(''));
});
figwheel.client.heads_up.display_system_warning = (function figwheel$client$heads_up$display_system_warning(header,msg){
return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(255, 220, 110, 0.95)"], null),[cljs.core.str(figwheel.client.heads_up.close_link.call(null)),cljs.core.str(figwheel.client.heads_up.heading.call(null,header)),cljs.core.str(figwheel.client.heads_up.format_line.call(null,msg))].join(''));
});
figwheel.client.heads_up.display_warning = (function figwheel$client$heads_up$display_warning(msg){
return figwheel.client.heads_up.display_system_warning.call(null,"Compile Warning",msg);
});
figwheel.client.heads_up.append_message = (function figwheel$client$heads_up$append_message(message){
var map__43123 = figwheel.client.heads_up.ensure_container.call(null);
var map__43123__$1 = ((cljs.core.seq_QMARK_.call(null,map__43123))?cljs.core.apply.call(null,cljs.core.hash_map,map__43123):map__43123);
var content_area_el = cljs.core.get.call(null,map__43123__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));
var el = document.createElement("div");
el.innerHTML = figwheel.client.heads_up.format_line.call(null,message);

return content_area_el.appendChild(el);
});
figwheel.client.heads_up.clear = (function figwheel$client$heads_up$clear(){
var c__32551__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto__){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto__){
return (function (state_43170){
var state_val_43171 = (state_43170[(1)]);
if((state_val_43171 === (1))){
var inst_43153 = (state_43170[(7)]);
var inst_43153__$1 = figwheel.client.heads_up.ensure_container.call(null);
var inst_43154 = [new cljs.core.Keyword(null,"opacity","opacity",397153780)];
var inst_43155 = ["0.0"];
var inst_43156 = cljs.core.PersistentHashMap.fromArrays(inst_43154,inst_43155);
var inst_43157 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_43153__$1,inst_43156);
var inst_43158 = cljs.core.async.timeout.call(null,(300));
var state_43170__$1 = (function (){var statearr_43172 = state_43170;
(statearr_43172[(8)] = inst_43157);

(statearr_43172[(7)] = inst_43153__$1);

return statearr_43172;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_43170__$1,(2),inst_43158);
} else {
if((state_val_43171 === (2))){
var inst_43153 = (state_43170[(7)]);
var inst_43160 = (state_43170[(2)]);
var inst_43161 = [new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"height","height",1025178622),new cljs.core.Keyword(null,"minHeight","minHeight",-1635998980),new cljs.core.Keyword(null,"padding","padding",1660304693),new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491)];
var inst_43162 = ["auto","0px","0px","0px 10px 0px 70px","0px","transparent"];
var inst_43163 = cljs.core.PersistentHashMap.fromArrays(inst_43161,inst_43162);
var inst_43164 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_43153,inst_43163);
var inst_43165 = cljs.core.async.timeout.call(null,(200));
var state_43170__$1 = (function (){var statearr_43173 = state_43170;
(statearr_43173[(9)] = inst_43164);

(statearr_43173[(10)] = inst_43160);

return statearr_43173;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_43170__$1,(3),inst_43165);
} else {
if((state_val_43171 === (3))){
var inst_43153 = (state_43170[(7)]);
var inst_43167 = (state_43170[(2)]);
var inst_43168 = figwheel.client.heads_up.set_content_BANG_.call(null,inst_43153,"");
var state_43170__$1 = (function (){var statearr_43174 = state_43170;
(statearr_43174[(11)] = inst_43167);

return statearr_43174;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_43170__$1,inst_43168);
} else {
return null;
}
}
}
});})(c__32551__auto__))
;
return ((function (switch__32489__auto__,c__32551__auto__){
return (function() {
var figwheel$client$heads_up$clear_$_state_machine__32490__auto__ = null;
var figwheel$client$heads_up$clear_$_state_machine__32490__auto____0 = (function (){
var statearr_43178 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_43178[(0)] = figwheel$client$heads_up$clear_$_state_machine__32490__auto__);

(statearr_43178[(1)] = (1));

return statearr_43178;
});
var figwheel$client$heads_up$clear_$_state_machine__32490__auto____1 = (function (state_43170){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_43170);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e43179){if((e43179 instanceof Object)){
var ex__32493__auto__ = e43179;
var statearr_43180_43182 = state_43170;
(statearr_43180_43182[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_43170);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e43179;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43183 = state_43170;
state_43170 = G__43183;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
figwheel$client$heads_up$clear_$_state_machine__32490__auto__ = function(state_43170){
switch(arguments.length){
case 0:
return figwheel$client$heads_up$clear_$_state_machine__32490__auto____0.call(this);
case 1:
return figwheel$client$heads_up$clear_$_state_machine__32490__auto____1.call(this,state_43170);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up$clear_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up$clear_$_state_machine__32490__auto____0;
figwheel$client$heads_up$clear_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up$clear_$_state_machine__32490__auto____1;
return figwheel$client$heads_up$clear_$_state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto__))
})();
var state__32553__auto__ = (function (){var statearr_43181 = f__32552__auto__.call(null);
(statearr_43181[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto__);

return statearr_43181;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto__))
);

return c__32551__auto__;
});
figwheel.client.heads_up.display_loaded_start = (function figwheel$client$heads_up$display_loaded_start(){
return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(211,234,172,1.0)",new cljs.core.Keyword(null,"width","width",-384071477),"68px",new cljs.core.Keyword(null,"height","height",1025178622),"68px",new cljs.core.Keyword(null,"paddingLeft","paddingLeft",262720813),"0px",new cljs.core.Keyword(null,"paddingRight","paddingRight",-1642313463),"0px",new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),"35px"], null),"");
});
figwheel.client.heads_up.flash_loaded = (function figwheel$client$heads_up$flash_loaded(){
var c__32551__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto__){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto__){
return (function (state_43215){
var state_val_43216 = (state_43215[(1)]);
if((state_val_43216 === (1))){
var inst_43205 = figwheel.client.heads_up.display_loaded_start.call(null);
var state_43215__$1 = state_43215;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_43215__$1,(2),inst_43205);
} else {
if((state_val_43216 === (2))){
var inst_43207 = (state_43215[(2)]);
var inst_43208 = cljs.core.async.timeout.call(null,(400));
var state_43215__$1 = (function (){var statearr_43217 = state_43215;
(statearr_43217[(7)] = inst_43207);

return statearr_43217;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_43215__$1,(3),inst_43208);
} else {
if((state_val_43216 === (3))){
var inst_43210 = (state_43215[(2)]);
var inst_43211 = figwheel.client.heads_up.clear.call(null);
var state_43215__$1 = (function (){var statearr_43218 = state_43215;
(statearr_43218[(8)] = inst_43210);

return statearr_43218;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_43215__$1,(4),inst_43211);
} else {
if((state_val_43216 === (4))){
var inst_43213 = (state_43215[(2)]);
var state_43215__$1 = state_43215;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_43215__$1,inst_43213);
} else {
return null;
}
}
}
}
});})(c__32551__auto__))
;
return ((function (switch__32489__auto__,c__32551__auto__){
return (function() {
var figwheel$client$heads_up$flash_loaded_$_state_machine__32490__auto__ = null;
var figwheel$client$heads_up$flash_loaded_$_state_machine__32490__auto____0 = (function (){
var statearr_43222 = [null,null,null,null,null,null,null,null,null];
(statearr_43222[(0)] = figwheel$client$heads_up$flash_loaded_$_state_machine__32490__auto__);

(statearr_43222[(1)] = (1));

return statearr_43222;
});
var figwheel$client$heads_up$flash_loaded_$_state_machine__32490__auto____1 = (function (state_43215){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_43215);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e43223){if((e43223 instanceof Object)){
var ex__32493__auto__ = e43223;
var statearr_43224_43226 = state_43215;
(statearr_43224_43226[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_43215);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e43223;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43227 = state_43215;
state_43215 = G__43227;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
figwheel$client$heads_up$flash_loaded_$_state_machine__32490__auto__ = function(state_43215){
switch(arguments.length){
case 0:
return figwheel$client$heads_up$flash_loaded_$_state_machine__32490__auto____0.call(this);
case 1:
return figwheel$client$heads_up$flash_loaded_$_state_machine__32490__auto____1.call(this,state_43215);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up$flash_loaded_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up$flash_loaded_$_state_machine__32490__auto____0;
figwheel$client$heads_up$flash_loaded_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up$flash_loaded_$_state_machine__32490__auto____1;
return figwheel$client$heads_up$flash_loaded_$_state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto__))
})();
var state__32553__auto__ = (function (){var statearr_43225 = f__32552__auto__.call(null);
(statearr_43225[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto__);

return statearr_43225;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto__))
);

return c__32551__auto__;
});
figwheel.client.heads_up.clojure_symbol_svg = "<?xml version='1.0' encoding='UTF-8' ?>\n<!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>\n<svg width='49px' height='49px' viewBox='0 0 100 99' version='1.1' xmlns='http://www.w3.org/2000/svg' style='position:absolute; top:9px; left: 10px;'>\n<circle fill='rgba(255,255,255,0.5)' cx='49.75' cy='49.5' r='48.5'/>\n<path fill='#5881d8' d=' M 39.30 6.22 C 51.71 3.11 65.45 5.64 75.83 13.16 C 88.68 22.10 96.12 38.22 94.43 53.80 C 93.66 60.11 89.40 66.01 83.37 68.24 C 79.21 69.97 74.64 69.78 70.23 69.80 C 80.77 59.67 81.41 41.33 71.45 30.60 C 63.60 21.32 49.75 18.52 38.65 23.16 C 31.27 18.80 21.83 18.68 14.27 22.69 C 20.65 14.79 29.32 8.56 39.30 6.22 Z' />\n<path fill='#90b4fe' d=' M 42.93 26.99 C 48.49 25.50 54.55 25.62 59.79 28.14 C 68.71 32.19 74.61 42.14 73.41 51.94 C 72.85 58.64 68.92 64.53 63.81 68.69 C 59.57 66.71 57.53 62.30 55.66 58.30 C 50.76 48.12 50.23 36.02 42.93 26.99 Z' />\n<path fill='#63b132' d=' M 12.30 33.30 C 17.11 28.49 24.33 26.90 30.91 28.06 C 25.22 33.49 21.44 41.03 21.46 48.99 C 21.11 58.97 26.58 68.76 35.08 73.92 C 43.28 79.06 53.95 79.28 62.66 75.29 C 70.37 77.57 78.52 77.36 86.31 75.57 C 80.05 84.00 70.94 90.35 60.69 92.84 C 48.02 96.03 34.00 93.24 23.56 85.37 C 12.16 77.09 5.12 63.11 5.44 49.00 C 5.15 43.06 8.22 37.42 12.30 33.30 Z' />\n<path fill='#91dc47' d=' M 26.94 54.00 C 24.97 45.06 29.20 35.59 36.45 30.24 C 41.99 33.71 44.23 40.14 46.55 45.91 C 43.00 53.40 38.44 60.46 35.94 68.42 C 31.50 64.74 27.96 59.77 26.94 54.00 Z' />\n<path fill='#91dc47' d=' M 41.97 71.80 C 41.46 64.27 45.31 57.52 48.11 50.80 C 50.40 58.13 51.84 66.19 57.18 72.06 C 52.17 73.37 46.93 73.26 41.97 71.80 Z' />\n</svg>";

//# sourceMappingURL=heads_up.js.map