// Compiled by ClojureScript 0.0-3269 {}
goog.provide('fipp.visit');
goog.require('cljs.core');
goog.require('fipp.ednize');

fipp.visit.IVisitor = (function (){var obj38254 = {};
return obj38254;
})();

fipp.visit.visit_unknown = (function fipp$visit$visit_unknown(this$,x){
if((function (){var and__29253__auto__ = this$;
if(and__29253__auto__){
return this$.fipp$visit$IVisitor$visit_unknown$arity$2;
} else {
return and__29253__auto__;
}
})()){
return this$.fipp$visit$IVisitor$visit_unknown$arity$2(this$,x);
} else {
var x__29901__auto__ = (((this$ == null))?null:this$);
return (function (){var or__29265__auto__ = (fipp.visit.visit_unknown[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (fipp.visit.visit_unknown["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"IVisitor.visit-unknown",this$);
}
}
})().call(null,this$,x);
}
});

fipp.visit.visit_nil = (function fipp$visit$visit_nil(this$){
if((function (){var and__29253__auto__ = this$;
if(and__29253__auto__){
return this$.fipp$visit$IVisitor$visit_nil$arity$1;
} else {
return and__29253__auto__;
}
})()){
return this$.fipp$visit$IVisitor$visit_nil$arity$1(this$);
} else {
var x__29901__auto__ = (((this$ == null))?null:this$);
return (function (){var or__29265__auto__ = (fipp.visit.visit_nil[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (fipp.visit.visit_nil["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"IVisitor.visit-nil",this$);
}
}
})().call(null,this$);
}
});

fipp.visit.visit_boolean = (function fipp$visit$visit_boolean(this$,x){
if((function (){var and__29253__auto__ = this$;
if(and__29253__auto__){
return this$.fipp$visit$IVisitor$visit_boolean$arity$2;
} else {
return and__29253__auto__;
}
})()){
return this$.fipp$visit$IVisitor$visit_boolean$arity$2(this$,x);
} else {
var x__29901__auto__ = (((this$ == null))?null:this$);
return (function (){var or__29265__auto__ = (fipp.visit.visit_boolean[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (fipp.visit.visit_boolean["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"IVisitor.visit-boolean",this$);
}
}
})().call(null,this$,x);
}
});

fipp.visit.visit_string = (function fipp$visit$visit_string(this$,x){
if((function (){var and__29253__auto__ = this$;
if(and__29253__auto__){
return this$.fipp$visit$IVisitor$visit_string$arity$2;
} else {
return and__29253__auto__;
}
})()){
return this$.fipp$visit$IVisitor$visit_string$arity$2(this$,x);
} else {
var x__29901__auto__ = (((this$ == null))?null:this$);
return (function (){var or__29265__auto__ = (fipp.visit.visit_string[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (fipp.visit.visit_string["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"IVisitor.visit-string",this$);
}
}
})().call(null,this$,x);
}
});

fipp.visit.visit_character = (function fipp$visit$visit_character(this$,x){
if((function (){var and__29253__auto__ = this$;
if(and__29253__auto__){
return this$.fipp$visit$IVisitor$visit_character$arity$2;
} else {
return and__29253__auto__;
}
})()){
return this$.fipp$visit$IVisitor$visit_character$arity$2(this$,x);
} else {
var x__29901__auto__ = (((this$ == null))?null:this$);
return (function (){var or__29265__auto__ = (fipp.visit.visit_character[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (fipp.visit.visit_character["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"IVisitor.visit-character",this$);
}
}
})().call(null,this$,x);
}
});

fipp.visit.visit_symbol = (function fipp$visit$visit_symbol(this$,x){
if((function (){var and__29253__auto__ = this$;
if(and__29253__auto__){
return this$.fipp$visit$IVisitor$visit_symbol$arity$2;
} else {
return and__29253__auto__;
}
})()){
return this$.fipp$visit$IVisitor$visit_symbol$arity$2(this$,x);
} else {
var x__29901__auto__ = (((this$ == null))?null:this$);
return (function (){var or__29265__auto__ = (fipp.visit.visit_symbol[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (fipp.visit.visit_symbol["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"IVisitor.visit-symbol",this$);
}
}
})().call(null,this$,x);
}
});

fipp.visit.visit_keyword = (function fipp$visit$visit_keyword(this$,x){
if((function (){var and__29253__auto__ = this$;
if(and__29253__auto__){
return this$.fipp$visit$IVisitor$visit_keyword$arity$2;
} else {
return and__29253__auto__;
}
})()){
return this$.fipp$visit$IVisitor$visit_keyword$arity$2(this$,x);
} else {
var x__29901__auto__ = (((this$ == null))?null:this$);
return (function (){var or__29265__auto__ = (fipp.visit.visit_keyword[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (fipp.visit.visit_keyword["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"IVisitor.visit-keyword",this$);
}
}
})().call(null,this$,x);
}
});

fipp.visit.visit_number = (function fipp$visit$visit_number(this$,x){
if((function (){var and__29253__auto__ = this$;
if(and__29253__auto__){
return this$.fipp$visit$IVisitor$visit_number$arity$2;
} else {
return and__29253__auto__;
}
})()){
return this$.fipp$visit$IVisitor$visit_number$arity$2(this$,x);
} else {
var x__29901__auto__ = (((this$ == null))?null:this$);
return (function (){var or__29265__auto__ = (fipp.visit.visit_number[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (fipp.visit.visit_number["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"IVisitor.visit-number",this$);
}
}
})().call(null,this$,x);
}
});

fipp.visit.visit_seq = (function fipp$visit$visit_seq(this$,x){
if((function (){var and__29253__auto__ = this$;
if(and__29253__auto__){
return this$.fipp$visit$IVisitor$visit_seq$arity$2;
} else {
return and__29253__auto__;
}
})()){
return this$.fipp$visit$IVisitor$visit_seq$arity$2(this$,x);
} else {
var x__29901__auto__ = (((this$ == null))?null:this$);
return (function (){var or__29265__auto__ = (fipp.visit.visit_seq[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (fipp.visit.visit_seq["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"IVisitor.visit-seq",this$);
}
}
})().call(null,this$,x);
}
});

fipp.visit.visit_vector = (function fipp$visit$visit_vector(this$,x){
if((function (){var and__29253__auto__ = this$;
if(and__29253__auto__){
return this$.fipp$visit$IVisitor$visit_vector$arity$2;
} else {
return and__29253__auto__;
}
})()){
return this$.fipp$visit$IVisitor$visit_vector$arity$2(this$,x);
} else {
var x__29901__auto__ = (((this$ == null))?null:this$);
return (function (){var or__29265__auto__ = (fipp.visit.visit_vector[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (fipp.visit.visit_vector["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"IVisitor.visit-vector",this$);
}
}
})().call(null,this$,x);
}
});

fipp.visit.visit_map = (function fipp$visit$visit_map(this$,x){
if((function (){var and__29253__auto__ = this$;
if(and__29253__auto__){
return this$.fipp$visit$IVisitor$visit_map$arity$2;
} else {
return and__29253__auto__;
}
})()){
return this$.fipp$visit$IVisitor$visit_map$arity$2(this$,x);
} else {
var x__29901__auto__ = (((this$ == null))?null:this$);
return (function (){var or__29265__auto__ = (fipp.visit.visit_map[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (fipp.visit.visit_map["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"IVisitor.visit-map",this$);
}
}
})().call(null,this$,x);
}
});

fipp.visit.visit_set = (function fipp$visit$visit_set(this$,x){
if((function (){var and__29253__auto__ = this$;
if(and__29253__auto__){
return this$.fipp$visit$IVisitor$visit_set$arity$2;
} else {
return and__29253__auto__;
}
})()){
return this$.fipp$visit$IVisitor$visit_set$arity$2(this$,x);
} else {
var x__29901__auto__ = (((this$ == null))?null:this$);
return (function (){var or__29265__auto__ = (fipp.visit.visit_set[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (fipp.visit.visit_set["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"IVisitor.visit-set",this$);
}
}
})().call(null,this$,x);
}
});

fipp.visit.visit_tagged = (function fipp$visit$visit_tagged(this$,x){
if((function (){var and__29253__auto__ = this$;
if(and__29253__auto__){
return this$.fipp$visit$IVisitor$visit_tagged$arity$2;
} else {
return and__29253__auto__;
}
})()){
return this$.fipp$visit$IVisitor$visit_tagged$arity$2(this$,x);
} else {
var x__29901__auto__ = (((this$ == null))?null:this$);
return (function (){var or__29265__auto__ = (fipp.visit.visit_tagged[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (fipp.visit.visit_tagged["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"IVisitor.visit-tagged",this$);
}
}
})().call(null,this$,x);
}
});

fipp.visit.visit_meta = (function fipp$visit$visit_meta(this$,meta,x){
if((function (){var and__29253__auto__ = this$;
if(and__29253__auto__){
return this$.fipp$visit$IVisitor$visit_meta$arity$3;
} else {
return and__29253__auto__;
}
})()){
return this$.fipp$visit$IVisitor$visit_meta$arity$3(this$,meta,x);
} else {
var x__29901__auto__ = (((this$ == null))?null:this$);
return (function (){var or__29265__auto__ = (fipp.visit.visit_meta[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (fipp.visit.visit_meta["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"IVisitor.visit-meta",this$);
}
}
})().call(null,this$,meta,x);
}
});

fipp.visit.visit_var = (function fipp$visit$visit_var(this$,x){
if((function (){var and__29253__auto__ = this$;
if(and__29253__auto__){
return this$.fipp$visit$IVisitor$visit_var$arity$2;
} else {
return and__29253__auto__;
}
})()){
return this$.fipp$visit$IVisitor$visit_var$arity$2(this$,x);
} else {
var x__29901__auto__ = (((this$ == null))?null:this$);
return (function (){var or__29265__auto__ = (fipp.visit.visit_var[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (fipp.visit.visit_var["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"IVisitor.visit-var",this$);
}
}
})().call(null,this$,x);
}
});

fipp.visit.visit_pattern = (function fipp$visit$visit_pattern(this$,x){
if((function (){var and__29253__auto__ = this$;
if(and__29253__auto__){
return this$.fipp$visit$IVisitor$visit_pattern$arity$2;
} else {
return and__29253__auto__;
}
})()){
return this$.fipp$visit$IVisitor$visit_pattern$arity$2(this$,x);
} else {
var x__29901__auto__ = (((this$ == null))?null:this$);
return (function (){var or__29265__auto__ = (fipp.visit.visit_pattern[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (fipp.visit.visit_pattern["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"IVisitor.visit-pattern",this$);
}
}
})().call(null,this$,x);
}
});

fipp.visit.boolean_QMARK_ = (function fipp$visit$boolean_QMARK_(x){
return (x === true) || (x === false);
});
fipp.visit.char_QMARK_ = (function fipp$visit$char_QMARK_(x){
return false;
});
/**
 * Visits objects, ignoring metadata.
 */
fipp.visit.visit_STAR_ = (function fipp$visit$visit_STAR_(visitor,x){
if((x == null)){
return fipp.visit.visit_nil.call(null,visitor);
} else {
if(cljs.core.truth_(fipp.visit.boolean_QMARK_.call(null,x))){
return fipp.visit.visit_boolean.call(null,visitor,x);
} else {
if(typeof x === 'string'){
return fipp.visit.visit_string.call(null,visitor,x);
} else {
if(cljs.core.truth_(fipp.visit.char_QMARK_.call(null,x))){
return fipp.visit.visit_character.call(null,visitor,x);
} else {
if((x instanceof cljs.core.Symbol)){
return fipp.visit.visit_symbol.call(null,visitor,x);
} else {
if((x instanceof cljs.core.Keyword)){
return fipp.visit.visit_keyword.call(null,visitor,x);
} else {
if(typeof x === 'number'){
return fipp.visit.visit_number.call(null,visitor,x);
} else {
if(cljs.core.seq_QMARK_.call(null,x)){
return fipp.visit.visit_seq.call(null,visitor,x);
} else {
if(cljs.core.vector_QMARK_.call(null,x)){
return fipp.visit.visit_vector.call(null,visitor,x);
} else {
if(cljs.core.record_QMARK_.call(null,x)){
return fipp.visit.visit_tagged.call(null,visitor,fipp.ednize.record__GT_tagged.call(null,x));
} else {
if(cljs.core.map_QMARK_.call(null,x)){
return fipp.visit.visit_map.call(null,visitor,x);
} else {
if(cljs.core.set_QMARK_.call(null,x)){
return fipp.visit.visit_set.call(null,visitor,x);
} else {
if(cljs.core.truth_(cljs.core.tagged_literal_QMARK_.call(null,x))){
return fipp.visit.visit_tagged.call(null,visitor,x);
} else {
if(cljs.core.truth_(cljs.core.var_QMARK_.call(null,x))){
return fipp.visit.visit_var.call(null,visitor,x);
} else {
if(cljs.core.truth_(cljs.core.regexp_QMARK_.call(null,x))){
return fipp.visit.visit_pattern.call(null,visitor,x);
} else {
return fipp.visit.visit_unknown.call(null,visitor,x);

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
});
fipp.visit.visit = (function fipp$visit$visit(visitor,x){
var temp__4421__auto__ = cljs.core.meta.call(null,x);
if(cljs.core.truth_(temp__4421__auto__)){
var m = temp__4421__auto__;
return fipp.visit.visit_meta.call(null,visitor,m,x);
} else {
return fipp.visit.visit_STAR_.call(null,visitor,x);
}
});

//# sourceMappingURL=visit.js.map