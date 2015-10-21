// Compiled by ClojureScript 1.7.122 {}
goog.provide('chord.format');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('cljs.reader');
goog.require('clojure.walk');
goog.require('cognitect.transit');

/**
 * @interface
 */
chord.format.ChordFormatter = function(){};

chord.format.freeze = (function chord$format$freeze(_,obj){
if((!((_ == null))) && (!((_.chord$format$ChordFormatter$freeze$arity$2 == null)))){
return _.chord$format$ChordFormatter$freeze$arity$2(_,obj);
} else {
var x__5216__auto__ = (((_ == null))?null:_);
var m__5217__auto__ = (chord.format.freeze[goog.typeOf(x__5216__auto__)]);
if(!((m__5217__auto__ == null))){
return m__5217__auto__.call(null,_,obj);
} else {
var m__5217__auto____$1 = (chord.format.freeze["_"]);
if(!((m__5217__auto____$1 == null))){
return m__5217__auto____$1.call(null,_,obj);
} else {
throw cljs.core.missing_protocol.call(null,"ChordFormatter.freeze",_);
}
}
}
});

chord.format.thaw = (function chord$format$thaw(_,s){
if((!((_ == null))) && (!((_.chord$format$ChordFormatter$thaw$arity$2 == null)))){
return _.chord$format$ChordFormatter$thaw$arity$2(_,s);
} else {
var x__5216__auto__ = (((_ == null))?null:_);
var m__5217__auto__ = (chord.format.thaw[goog.typeOf(x__5216__auto__)]);
if(!((m__5217__auto__ == null))){
return m__5217__auto__.call(null,_,s);
} else {
var m__5217__auto____$1 = (chord.format.thaw["_"]);
if(!((m__5217__auto____$1 == null))){
return m__5217__auto____$1.call(null,_,s);
} else {
throw cljs.core.missing_protocol.call(null,"ChordFormatter.thaw",_);
}
}
}
});

if(typeof chord.format.formatter_STAR_ !== 'undefined'){
} else {
chord.format.formatter_STAR_ = (function (){var method_table__5474__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__5475__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__5476__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__5477__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__5478__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"chord.format","formatter*"),new cljs.core.Keyword(null,"format","format",-1306924766),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__5478__auto__,method_table__5474__auto__,prefer_table__5475__auto__,method_cache__5476__auto__,cached_hierarchy__5477__auto__));
})();
}
cljs.core._add_method.call(null,chord.format.formatter_STAR_,new cljs.core.Keyword(null,"edn","edn",1317840885),(function (_){
if(typeof chord.format.t_chord$format14479 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
 * @implements {chord.format.ChordFormatter}
*/
chord.format.t_chord$format14479 = (function (_,meta14480){
this._ = _;
this.meta14480 = meta14480;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
chord.format.t_chord$format14479.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14481,meta14480__$1){
var self__ = this;
var _14481__$1 = this;
return (new chord.format.t_chord$format14479(self__._,meta14480__$1));
});

chord.format.t_chord$format14479.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14481){
var self__ = this;
var _14481__$1 = this;
return self__.meta14480;
});

chord.format.t_chord$format14479.prototype.chord$format$ChordFormatter$ = true;

chord.format.t_chord$format14479.prototype.chord$format$ChordFormatter$freeze$arity$2 = (function (___$1,obj){
var self__ = this;
var ___$2 = this;
return cljs.core.pr_str.call(null,obj);
});

chord.format.t_chord$format14479.prototype.chord$format$ChordFormatter$thaw$arity$2 = (function (___$1,s){
var self__ = this;
var ___$2 = this;
return cljs.reader.read_string.call(null,s);
});

chord.format.t_chord$format14479.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.Symbol(null,"meta14480","meta14480",-1054677042,null)], null);
});

chord.format.t_chord$format14479.cljs$lang$type = true;

chord.format.t_chord$format14479.cljs$lang$ctorStr = "chord.format/t_chord$format14479";

chord.format.t_chord$format14479.cljs$lang$ctorPrWriter = (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"chord.format/t_chord$format14479");
});

chord.format.__GT_t_chord$format14479 = (function chord$format$__GT_t_chord$format14479(___$1,meta14480){
return (new chord.format.t_chord$format14479(___$1,meta14480));
});

}

return (new chord.format.t_chord$format14479(_,cljs.core.PersistentArrayMap.EMPTY));
}));
cljs.core._add_method.call(null,chord.format.formatter_STAR_,new cljs.core.Keyword(null,"json","json",1279968570),(function (_){
if(typeof chord.format.t_chord$format14482 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
 * @implements {chord.format.ChordFormatter}
*/
chord.format.t_chord$format14482 = (function (_,meta14483){
this._ = _;
this.meta14483 = meta14483;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
chord.format.t_chord$format14482.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14484,meta14483__$1){
var self__ = this;
var _14484__$1 = this;
return (new chord.format.t_chord$format14482(self__._,meta14483__$1));
});

chord.format.t_chord$format14482.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14484){
var self__ = this;
var _14484__$1 = this;
return self__.meta14483;
});

chord.format.t_chord$format14482.prototype.chord$format$ChordFormatter$ = true;

chord.format.t_chord$format14482.prototype.chord$format$ChordFormatter$freeze$arity$2 = (function (___$1,obj){
var self__ = this;
var ___$2 = this;
return JSON.stringify(cljs.core.clj__GT_js.call(null,obj));
});

chord.format.t_chord$format14482.prototype.chord$format$ChordFormatter$thaw$arity$2 = (function (this$,s){
var self__ = this;
var this$__$1 = this;
return cljs.core.js__GT_clj.call(null,JSON.parse(s));
});

chord.format.t_chord$format14482.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.Symbol(null,"meta14483","meta14483",-8428960,null)], null);
});

chord.format.t_chord$format14482.cljs$lang$type = true;

chord.format.t_chord$format14482.cljs$lang$ctorStr = "chord.format/t_chord$format14482";

chord.format.t_chord$format14482.cljs$lang$ctorPrWriter = (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"chord.format/t_chord$format14482");
});

chord.format.__GT_t_chord$format14482 = (function chord$format$__GT_t_chord$format14482(___$1,meta14483){
return (new chord.format.t_chord$format14482(___$1,meta14483));
});

}

return (new chord.format.t_chord$format14482(_,cljs.core.PersistentArrayMap.EMPTY));
}));
cljs.core._add_method.call(null,chord.format.formatter_STAR_,new cljs.core.Keyword(null,"json-kw","json-kw",341203175),(function (opts){
var json_formatter = chord.format.formatter_STAR_.call(null,cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"format","format",-1306924766),new cljs.core.Keyword(null,"json","json",1279968570)));
if(typeof chord.format.t_chord$format14485 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
 * @implements {chord.format.ChordFormatter}
*/
chord.format.t_chord$format14485 = (function (opts,json_formatter,meta14486){
this.opts = opts;
this.json_formatter = json_formatter;
this.meta14486 = meta14486;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
chord.format.t_chord$format14485.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (json_formatter){
return (function (_14487,meta14486__$1){
var self__ = this;
var _14487__$1 = this;
return (new chord.format.t_chord$format14485(self__.opts,self__.json_formatter,meta14486__$1));
});})(json_formatter))
;

chord.format.t_chord$format14485.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (json_formatter){
return (function (_14487){
var self__ = this;
var _14487__$1 = this;
return self__.meta14486;
});})(json_formatter))
;

chord.format.t_chord$format14485.prototype.chord$format$ChordFormatter$ = true;

chord.format.t_chord$format14485.prototype.chord$format$ChordFormatter$freeze$arity$2 = ((function (json_formatter){
return (function (_,obj){
var self__ = this;
var ___$1 = this;
return chord.format.freeze.call(null,self__.json_formatter,obj);
});})(json_formatter))
;

chord.format.t_chord$format14485.prototype.chord$format$ChordFormatter$thaw$arity$2 = ((function (json_formatter){
return (function (_,s){
var self__ = this;
var ___$1 = this;
return clojure.walk.keywordize_keys.call(null,chord.format.thaw.call(null,self__.json_formatter,s));
});})(json_formatter))
;

chord.format.t_chord$format14485.getBasis = ((function (json_formatter){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"opts","opts",1795607228,null),new cljs.core.Symbol(null,"json-formatter","json-formatter",-485654307,null),new cljs.core.Symbol(null,"meta14486","meta14486",-306925763,null)], null);
});})(json_formatter))
;

chord.format.t_chord$format14485.cljs$lang$type = true;

chord.format.t_chord$format14485.cljs$lang$ctorStr = "chord.format/t_chord$format14485";

chord.format.t_chord$format14485.cljs$lang$ctorPrWriter = ((function (json_formatter){
return (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"chord.format/t_chord$format14485");
});})(json_formatter))
;

chord.format.__GT_t_chord$format14485 = ((function (json_formatter){
return (function chord$format$__GT_t_chord$format14485(opts__$1,json_formatter__$1,meta14486){
return (new chord.format.t_chord$format14485(opts__$1,json_formatter__$1,meta14486));
});})(json_formatter))
;

}

return (new chord.format.t_chord$format14485(opts,json_formatter,cljs.core.PersistentArrayMap.EMPTY));
}));
cljs.core._add_method.call(null,chord.format.formatter_STAR_,new cljs.core.Keyword(null,"transit-json","transit-json",1168016579),(function (_){
if(typeof chord.format.t_chord$format14488 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
 * @implements {chord.format.ChordFormatter}
*/
chord.format.t_chord$format14488 = (function (_,meta14489){
this._ = _;
this.meta14489 = meta14489;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
chord.format.t_chord$format14488.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14490,meta14489__$1){
var self__ = this;
var _14490__$1 = this;
return (new chord.format.t_chord$format14488(self__._,meta14489__$1));
});

chord.format.t_chord$format14488.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14490){
var self__ = this;
var _14490__$1 = this;
return self__.meta14489;
});

chord.format.t_chord$format14488.prototype.chord$format$ChordFormatter$ = true;

chord.format.t_chord$format14488.prototype.chord$format$ChordFormatter$freeze$arity$2 = (function (___$1,obj){
var self__ = this;
var ___$2 = this;
return cognitect.transit.write.call(null,cognitect.transit.writer.call(null,new cljs.core.Keyword(null,"json","json",1279968570)),obj);
});

chord.format.t_chord$format14488.prototype.chord$format$ChordFormatter$thaw$arity$2 = (function (___$1,s){
var self__ = this;
var ___$2 = this;
return cognitect.transit.read.call(null,cognitect.transit.reader.call(null,new cljs.core.Keyword(null,"json","json",1279968570)),s);
});

chord.format.t_chord$format14488.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.Symbol(null,"meta14489","meta14489",486726736,null)], null);
});

chord.format.t_chord$format14488.cljs$lang$type = true;

chord.format.t_chord$format14488.cljs$lang$ctorStr = "chord.format/t_chord$format14488";

chord.format.t_chord$format14488.cljs$lang$ctorPrWriter = (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"chord.format/t_chord$format14488");
});

chord.format.__GT_t_chord$format14488 = (function chord$format$__GT_t_chord$format14488(___$1,meta14489){
return (new chord.format.t_chord$format14488(___$1,meta14489));
});

}

return (new chord.format.t_chord$format14488(_,cljs.core.PersistentArrayMap.EMPTY));
}));
cljs.core._add_method.call(null,chord.format.formatter_STAR_,new cljs.core.Keyword(null,"str","str",1089608819),(function (_){
if(typeof chord.format.t_chord$format14491 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
 * @implements {chord.format.ChordFormatter}
*/
chord.format.t_chord$format14491 = (function (_,meta14492){
this._ = _;
this.meta14492 = meta14492;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
chord.format.t_chord$format14491.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14493,meta14492__$1){
var self__ = this;
var _14493__$1 = this;
return (new chord.format.t_chord$format14491(self__._,meta14492__$1));
});

chord.format.t_chord$format14491.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14493){
var self__ = this;
var _14493__$1 = this;
return self__.meta14492;
});

chord.format.t_chord$format14491.prototype.chord$format$ChordFormatter$ = true;

chord.format.t_chord$format14491.prototype.chord$format$ChordFormatter$freeze$arity$2 = (function (___$1,obj){
var self__ = this;
var ___$2 = this;
return obj;
});

chord.format.t_chord$format14491.prototype.chord$format$ChordFormatter$thaw$arity$2 = (function (___$1,s){
var self__ = this;
var ___$2 = this;
return s;
});

chord.format.t_chord$format14491.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.Symbol(null,"meta14492","meta14492",1255578906,null)], null);
});

chord.format.t_chord$format14491.cljs$lang$type = true;

chord.format.t_chord$format14491.cljs$lang$ctorStr = "chord.format/t_chord$format14491";

chord.format.t_chord$format14491.cljs$lang$ctorPrWriter = (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"chord.format/t_chord$format14491");
});

chord.format.__GT_t_chord$format14491 = (function chord$format$__GT_t_chord$format14491(___$1,meta14492){
return (new chord.format.t_chord$format14491(___$1,meta14492));
});

}

return (new chord.format.t_chord$format14491(_,cljs.core.PersistentArrayMap.EMPTY));
}));
chord.format.formatter = (function chord$format$formatter(opts){
return chord.format.formatter_STAR_.call(null,(((opts instanceof cljs.core.Keyword))?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"format","format",-1306924766),opts], null):opts));
});
chord.format.wrap_format = (function chord$format$wrap_format(p__14495,p__14496){
var map__14505 = p__14495;
var map__14505__$1 = ((((!((map__14505 == null)))?((((map__14505.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14505.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14505):map__14505);
var read_ch = cljs.core.get.call(null,map__14505__$1,new cljs.core.Keyword(null,"read-ch","read-ch",-38486414));
var write_ch = cljs.core.get.call(null,map__14505__$1,new cljs.core.Keyword(null,"write-ch","write-ch",-1766585599));
var map__14506 = p__14496;
var map__14506__$1 = ((((!((map__14506 == null)))?((((map__14506.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14506.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14506):map__14506);
var opts = map__14506__$1;
var format = cljs.core.get.call(null,map__14506__$1,new cljs.core.Keyword(null,"format","format",-1306924766));
var fmtr = chord.format.formatter.call(null,(cljs.core.truth_(format)?opts:new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"format","format",-1306924766),new cljs.core.Keyword(null,"edn","edn",1317840885)], null)));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"read-ch","read-ch",-38486414),cljs.core.async.map_LT_.call(null,((function (fmtr,map__14505,map__14505__$1,read_ch,write_ch,map__14506,map__14506__$1,opts,format){
return (function (p__14509){
var map__14510 = p__14509;
var map__14510__$1 = ((((!((map__14510 == null)))?((((map__14510.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14510.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14510):map__14510);
var message = cljs.core.get.call(null,map__14510__$1,new cljs.core.Keyword(null,"message","message",-406056002));
try{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),chord.format.thaw.call(null,fmtr,message)], null);
}catch (e14512){if((e14512 instanceof Error)){
var e = e14512;
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-format","invalid-format",-72676108),new cljs.core.Keyword(null,"cause","cause",231901252),e,new cljs.core.Keyword(null,"invalid-msg","invalid-msg",-1474361625),message], null);
} else {
throw e14512;

}
}});})(fmtr,map__14505,map__14505__$1,read_ch,write_ch,map__14506,map__14506__$1,opts,format))
,read_ch),new cljs.core.Keyword(null,"write-ch","write-ch",-1766585599),cljs.core.async.map_GT_.call(null,((function (fmtr,map__14505,map__14505__$1,read_ch,write_ch,map__14506,map__14506__$1,opts,format){
return (function (p1__14494_SHARP_){
return chord.format.freeze.call(null,fmtr,p1__14494_SHARP_);
});})(fmtr,map__14505,map__14505__$1,read_ch,write_ch,map__14506,map__14506__$1,opts,format))
,write_ch)], null);
});

//# sourceMappingURL=format.js.map