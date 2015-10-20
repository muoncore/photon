// Compiled by ClojureScript 1.7.122 {}
goog.provide('fipp.edn');
goog.require('cljs.core');
goog.require('fipp.ednize');
goog.require('fipp.visit');
goog.require('fipp.engine');

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {fipp.visit.IVisitor}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
fipp.edn.EdnPrinter = (function (print_meta,symbols,__meta,__extmap,__hash){
this.print_meta = print_meta;
this.symbols = symbols;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
fipp.edn.EdnPrinter.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5175__auto__,k__5176__auto__){
var self__ = this;
var this__5175__auto____$1 = this;
return cljs.core._lookup.call(null,this__5175__auto____$1,k__5176__auto__,null);
});

fipp.edn.EdnPrinter.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5177__auto__,k13141,else__5178__auto__){
var self__ = this;
var this__5177__auto____$1 = this;
var G__13143 = (((k13141 instanceof cljs.core.Keyword))?k13141.fqn:null);
switch (G__13143) {
case "print-meta":
return self__.print_meta;

break;
case "symbols":
return self__.symbols;

break;
default:
return cljs.core.get.call(null,self__.__extmap,k13141,else__5178__auto__);

}
});

fipp.edn.EdnPrinter.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5189__auto__,writer__5190__auto__,opts__5191__auto__){
var self__ = this;
var this__5189__auto____$1 = this;
var pr_pair__5192__auto__ = ((function (this__5189__auto____$1){
return (function (keyval__5193__auto__){
return cljs.core.pr_sequential_writer.call(null,writer__5190__auto__,cljs.core.pr_writer,""," ","",opts__5191__auto__,keyval__5193__auto__);
});})(this__5189__auto____$1))
;
return cljs.core.pr_sequential_writer.call(null,writer__5190__auto__,pr_pair__5192__auto__,"#fipp.edn.EdnPrinter{",", ","}",opts__5191__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),self__.print_meta],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"symbols","symbols",1211743),self__.symbols],null))], null),self__.__extmap));
});

fipp.edn.EdnPrinter.prototype.cljs$core$IIterable$ = true;

fipp.edn.EdnPrinter.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__13140){
var self__ = this;
var G__13140__$1 = this;
return (new cljs.core.RecordIter((0),G__13140__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),new cljs.core.Keyword(null,"symbols","symbols",1211743)], null),cljs.core._iterator.call(null,self__.__extmap)));
});

fipp.edn.EdnPrinter.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5173__auto__){
var self__ = this;
var this__5173__auto____$1 = this;
return self__.__meta;
});

fipp.edn.EdnPrinter.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5169__auto__){
var self__ = this;
var this__5169__auto____$1 = this;
return (new fipp.edn.EdnPrinter(self__.print_meta,self__.symbols,self__.__meta,self__.__extmap,self__.__hash));
});

fipp.edn.EdnPrinter.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5179__auto__){
var self__ = this;
var this__5179__auto____$1 = this;
return (2 + cljs.core.count.call(null,self__.__extmap));
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$ = true;

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_meta$arity$3 = (function (this$,m,x){
var self__ = this;
var this$__$1 = this;
if(cljs.core.truth_(self__.print_meta)){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"align","align",1964212802),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"^",fipp.visit.visit.call(null,this$__$1,m)], null),new cljs.core.Keyword(null,"line","line",212345235),fipp.visit.visit_STAR_.call(null,this$__$1,x)], null);
} else {
return fipp.visit.visit_STAR_.call(null,this$__$1,x);
}
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_number$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),cljs.core.pr_str.call(null,x)], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_pattern$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),cljs.core.pr_str.call(null,x)], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_unknown$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return fipp.visit.visit.call(null,this$__$1,fipp.ednize.edn.call(null,x));
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_symbol$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),[cljs.core.str(x)].join('')], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_seq$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
var temp__4423__auto__ = self__.symbols.call(null,cljs.core.first.call(null,x));
if(cljs.core.truth_(temp__4423__auto__)){
var pretty = temp__4423__auto__;
return pretty.call(null,this$__$1,x);
} else {
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),"(",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"align","align",1964212802),cljs.core.interpose.call(null,new cljs.core.Keyword(null,"line","line",212345235),cljs.core.map.call(null,((function (temp__4423__auto__,this$__$1){
return (function (p1__13137_SHARP_){
return fipp.visit.visit.call(null,this$__$1,p1__13137_SHARP_);
});})(temp__4423__auto__,this$__$1))
,x))], null),")"], null);
}
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_boolean$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),[cljs.core.str(x)].join('')], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_tagged$arity$2 = (function (this$,p__13144){
var self__ = this;
var map__13145 = p__13144;
var map__13145__$1 = ((((!((map__13145 == null)))?((((map__13145.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13145.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13145):map__13145);
var tag = cljs.core.get.call(null,map__13145__$1,new cljs.core.Keyword(null,"tag","tag",-1290361223));
var form = cljs.core.get.call(null,map__13145__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),"#",cljs.core.pr_str.call(null,tag),(cljs.core.truth_((function (){var or__4561__auto__ = (function (){var and__4549__auto__ = self__.print_meta;
if(cljs.core.truth_(and__4549__auto__)){
return cljs.core.meta.call(null,form);
} else {
return and__4549__auto__;
}
})();
if(cljs.core.truth_(or__4561__auto__)){
return or__4561__auto__;
} else {
return !(cljs.core.coll_QMARK_.call(null,form));
}
})())?" ":null),fipp.visit.visit.call(null,this$__$1,form)], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_keyword$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),[cljs.core.str(x)].join('')], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_map$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
var kvps = (function (){var iter__5333__auto__ = ((function (this$__$1){
return (function fipp$edn$iter__13147(s__13148){
return (new cljs.core.LazySeq(null,((function (this$__$1){
return (function (){
var s__13148__$1 = s__13148;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__13148__$1);
if(temp__4425__auto__){
var s__13148__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__13148__$2)){
var c__5331__auto__ = cljs.core.chunk_first.call(null,s__13148__$2);
var size__5332__auto__ = cljs.core.count.call(null,c__5331__auto__);
var b__13150 = cljs.core.chunk_buffer.call(null,size__5332__auto__);
if((function (){var i__13149 = (0);
while(true){
if((i__13149 < size__5332__auto__)){
var vec__13153 = cljs.core._nth.call(null,c__5331__auto__,i__13149);
var k = cljs.core.nth.call(null,vec__13153,(0),null);
var v = cljs.core.nth.call(null,vec__13153,(1),null);
cljs.core.chunk_append.call(null,b__13150,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),fipp.visit.visit.call(null,this$__$1,k)," ",fipp.visit.visit.call(null,this$__$1,v)], null));

var G__13159 = (i__13149 + (1));
i__13149 = G__13159;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13150),fipp$edn$iter__13147.call(null,cljs.core.chunk_rest.call(null,s__13148__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13150),null);
}
} else {
var vec__13154 = cljs.core.first.call(null,s__13148__$2);
var k = cljs.core.nth.call(null,vec__13154,(0),null);
var v = cljs.core.nth.call(null,vec__13154,(1),null);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),fipp.visit.visit.call(null,this$__$1,k)," ",fipp.visit.visit.call(null,this$__$1,v)], null),fipp$edn$iter__13147.call(null,cljs.core.rest.call(null,s__13148__$2)));
}
} else {
return null;
}
break;
}
});})(this$__$1))
,null,null));
});})(this$__$1))
;
return iter__5333__auto__.call(null,x);
})();
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),"{",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"align","align",1964212802),cljs.core.interpose.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),",",new cljs.core.Keyword(null,"line","line",212345235)], null),kvps)], null),"}"], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_nil$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),"nil"], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_character$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),cljs.core.pr_str.call(null,x)], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_string$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),cljs.core.pr_str.call(null,x)], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_var$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),[cljs.core.str(x)].join('')], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_set$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),"#{",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"align","align",1964212802),cljs.core.interpose.call(null,new cljs.core.Keyword(null,"line","line",212345235),cljs.core.map.call(null,((function (this$__$1){
return (function (p1__13139_SHARP_){
return fipp.visit.visit.call(null,this$__$1,p1__13139_SHARP_);
});})(this$__$1))
,x))], null),"}"], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_vector$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),"[",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"align","align",1964212802),cljs.core.interpose.call(null,new cljs.core.Keyword(null,"line","line",212345235),cljs.core.map.call(null,((function (this$__$1){
return (function (p1__13138_SHARP_){
return fipp.visit.visit.call(null,this$__$1,p1__13138_SHARP_);
});})(this$__$1))
,x))], null),"]"], null);
});

fipp.edn.EdnPrinter.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5170__auto__){
var self__ = this;
var this__5170__auto____$1 = this;
var h__4996__auto__ = self__.__hash;
if(!((h__4996__auto__ == null))){
return h__4996__auto__;
} else {
var h__4996__auto____$1 = cljs.core.hash_imap.call(null,this__5170__auto____$1);
self__.__hash = h__4996__auto____$1;

return h__4996__auto____$1;
}
});

fipp.edn.EdnPrinter.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5171__auto__,other__5172__auto__){
var self__ = this;
var this__5171__auto____$1 = this;
if(cljs.core.truth_((function (){var and__4549__auto__ = other__5172__auto__;
if(cljs.core.truth_(and__4549__auto__)){
var and__4549__auto____$1 = (this__5171__auto____$1.constructor === other__5172__auto__.constructor);
if(and__4549__auto____$1){
return cljs.core.equiv_map.call(null,this__5171__auto____$1,other__5172__auto__);
} else {
return and__4549__auto____$1;
}
} else {
return and__4549__auto__;
}
})())){
return true;
} else {
return false;
}
});

fipp.edn.EdnPrinter.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5184__auto__,k__5185__auto__){
var self__ = this;
var this__5184__auto____$1 = this;
if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),null,new cljs.core.Keyword(null,"symbols","symbols",1211743),null], null), null),k__5185__auto__)){
return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__5184__auto____$1),self__.__meta),k__5185__auto__);
} else {
return (new fipp.edn.EdnPrinter(self__.print_meta,self__.symbols,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__5185__auto__)),null));
}
});

fipp.edn.EdnPrinter.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5182__auto__,k__5183__auto__,G__13140){
var self__ = this;
var this__5182__auto____$1 = this;
var pred__13155 = cljs.core.keyword_identical_QMARK_;
var expr__13156 = k__5183__auto__;
if(cljs.core.truth_(pred__13155.call(null,new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),expr__13156))){
return (new fipp.edn.EdnPrinter(G__13140,self__.symbols,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__13155.call(null,new cljs.core.Keyword(null,"symbols","symbols",1211743),expr__13156))){
return (new fipp.edn.EdnPrinter(self__.print_meta,G__13140,self__.__meta,self__.__extmap,null));
} else {
return (new fipp.edn.EdnPrinter(self__.print_meta,self__.symbols,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__5183__auto__,G__13140),null));
}
}
});

fipp.edn.EdnPrinter.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5187__auto__){
var self__ = this;
var this__5187__auto____$1 = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),self__.print_meta],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"symbols","symbols",1211743),self__.symbols],null))], null),self__.__extmap));
});

fipp.edn.EdnPrinter.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5174__auto__,G__13140){
var self__ = this;
var this__5174__auto____$1 = this;
return (new fipp.edn.EdnPrinter(self__.print_meta,self__.symbols,G__13140,self__.__extmap,self__.__hash));
});

fipp.edn.EdnPrinter.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5180__auto__,entry__5181__auto__){
var self__ = this;
var this__5180__auto____$1 = this;
if(cljs.core.vector_QMARK_.call(null,entry__5181__auto__)){
return cljs.core._assoc.call(null,this__5180__auto____$1,cljs.core._nth.call(null,entry__5181__auto__,(0)),cljs.core._nth.call(null,entry__5181__auto__,(1)));
} else {
return cljs.core.reduce.call(null,cljs.core._conj,this__5180__auto____$1,entry__5181__auto__);
}
});

fipp.edn.EdnPrinter.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"print-meta","print-meta",-1620321171,null),new cljs.core.Symbol(null,"symbols","symbols",1641743270,null)], null);
});

fipp.edn.EdnPrinter.cljs$lang$type = true;

fipp.edn.EdnPrinter.cljs$lang$ctorPrSeq = (function (this__5209__auto__){
return cljs.core._conj.call(null,cljs.core.List.EMPTY,"fipp.edn/EdnPrinter");
});

fipp.edn.EdnPrinter.cljs$lang$ctorPrWriter = (function (this__5209__auto__,writer__5210__auto__){
return cljs.core._write.call(null,writer__5210__auto__,"fipp.edn/EdnPrinter");
});

fipp.edn.__GT_EdnPrinter = (function fipp$edn$__GT_EdnPrinter(print_meta,symbols){
return (new fipp.edn.EdnPrinter(print_meta,symbols,null,null,null));
});

fipp.edn.map__GT_EdnPrinter = (function fipp$edn$map__GT_EdnPrinter(G__13142){
return (new fipp.edn.EdnPrinter(new cljs.core.Keyword(null,"print-meta","print-meta",1034114598).cljs$core$IFn$_invoke$arity$1(G__13142),new cljs.core.Keyword(null,"symbols","symbols",1211743).cljs$core$IFn$_invoke$arity$1(G__13142),null,cljs.core.dissoc.call(null,G__13142,new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),new cljs.core.Keyword(null,"symbols","symbols",1211743)),null));
});

fipp.edn.pprint = (function fipp$edn$pprint(var_args){
var args13160 = [];
var len__5619__auto___13164 = arguments.length;
var i__5620__auto___13165 = (0);
while(true){
if((i__5620__auto___13165 < len__5619__auto___13164)){
args13160.push((arguments[i__5620__auto___13165]));

var G__13166 = (i__5620__auto___13165 + (1));
i__5620__auto___13165 = G__13166;
continue;
} else {
}
break;
}

var G__13162 = args13160.length;
switch (G__13162) {
case 1:
return fipp.edn.pprint.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return fipp.edn.pprint.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13160.length)].join('')));

}
});

fipp.edn.pprint.cljs$core$IFn$_invoke$arity$1 = (function (x){
return fipp.edn.pprint.call(null,x,cljs.core.PersistentArrayMap.EMPTY);
});

fipp.edn.pprint.cljs$core$IFn$_invoke$arity$2 = (function (x,options){
var printer = fipp.edn.map__GT_EdnPrinter.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),cljs.core._STAR_print_meta_STAR_,new cljs.core.Keyword(null,"symbols","symbols",1211743),cljs.core.PersistentArrayMap.EMPTY], null),options));
var _STAR_print_meta_STAR_13163 = cljs.core._STAR_print_meta_STAR_;
cljs.core._STAR_print_meta_STAR_ = false;

try{return fipp.engine.pprint_document.call(null,fipp.visit.visit.call(null,printer,x),options);
}finally {cljs.core._STAR_print_meta_STAR_ = _STAR_print_meta_STAR_13163;
}});

fipp.edn.pprint.cljs$lang$maxFixedArity = 2;

//# sourceMappingURL=edn.js.map