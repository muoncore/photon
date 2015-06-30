// Compiled by ClojureScript 0.0-3269 {}
goog.provide('fipp.edn');
goog.require('cljs.core');
goog.require('fipp.ednize');
goog.require('fipp.visit');
goog.require('fipp.engine');

/**
* @constructor
* @param {*} print_meta
* @param {*} symbols
* @param {*} __meta
* @param {*} __extmap
* @param {*} __hash
* @param {*=} __meta 
* @param {*=} __extmap
* @param {number|null} __hash
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
fipp.edn.EdnPrinter.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__29860__auto__,k__29861__auto__){
var self__ = this;
var this__29860__auto____$1 = this;
return cljs.core._lookup.call(null,this__29860__auto____$1,k__29861__auto__,null);
});

fipp.edn.EdnPrinter.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__29862__auto__,k37824,else__29863__auto__){
var self__ = this;
var this__29862__auto____$1 = this;
var G__37826 = (((k37824 instanceof cljs.core.Keyword))?k37824.fqn:null);
switch (G__37826) {
case "print-meta":
return self__.print_meta;

break;
case "symbols":
return self__.symbols;

break;
default:
return cljs.core.get.call(null,self__.__extmap,k37824,else__29863__auto__);

}
});

fipp.edn.EdnPrinter.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__29874__auto__,writer__29875__auto__,opts__29876__auto__){
var self__ = this;
var this__29874__auto____$1 = this;
var pr_pair__29877__auto__ = ((function (this__29874__auto____$1){
return (function (keyval__29878__auto__){
return cljs.core.pr_sequential_writer.call(null,writer__29875__auto__,cljs.core.pr_writer,""," ","",opts__29876__auto__,keyval__29878__auto__);
});})(this__29874__auto____$1))
;
return cljs.core.pr_sequential_writer.call(null,writer__29875__auto__,pr_pair__29877__auto__,"#fipp.edn.EdnPrinter{",", ","}",opts__29876__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),self__.print_meta],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"symbols","symbols",1211743),self__.symbols],null))], null),self__.__extmap));
});

fipp.edn.EdnPrinter.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__29858__auto__){
var self__ = this;
var this__29858__auto____$1 = this;
return self__.__meta;
});

fipp.edn.EdnPrinter.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__29854__auto__){
var self__ = this;
var this__29854__auto____$1 = this;
return (new fipp.edn.EdnPrinter(self__.print_meta,self__.symbols,self__.__meta,self__.__extmap,self__.__hash));
});

fipp.edn.EdnPrinter.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__29864__auto__){
var self__ = this;
var this__29864__auto____$1 = this;
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
var temp__4421__auto__ = self__.symbols.call(null,cljs.core.first.call(null,x));
if(cljs.core.truth_(temp__4421__auto__)){
var pretty = temp__4421__auto__;
return pretty.call(null,this$__$1,x);
} else {
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),"(",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"align","align",1964212802),cljs.core.interpose.call(null,new cljs.core.Keyword(null,"line","line",212345235),cljs.core.map.call(null,((function (temp__4421__auto__,this$__$1){
return (function (p1__37820_SHARP_){
return fipp.visit.visit.call(null,this$__$1,p1__37820_SHARP_);
});})(temp__4421__auto__,this$__$1))
,x))], null),")"], null);
}
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_boolean$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),[cljs.core.str(x)].join('')], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_tagged$arity$2 = (function (this$,p__37827){
var self__ = this;
var map__37828 = p__37827;
var map__37828__$1 = ((cljs.core.seq_QMARK_.call(null,map__37828))?cljs.core.apply.call(null,cljs.core.hash_map,map__37828):map__37828);
var tag = cljs.core.get.call(null,map__37828__$1,new cljs.core.Keyword(null,"tag","tag",-1290361223));
var form = cljs.core.get.call(null,map__37828__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),"#",cljs.core.pr_str.call(null,tag),(cljs.core.truth_((function (){var or__29265__auto__ = (function (){var and__29253__auto__ = self__.print_meta;
if(cljs.core.truth_(and__29253__auto__)){
return cljs.core.meta.call(null,form);
} else {
return and__29253__auto__;
}
})();
if(cljs.core.truth_(or__29265__auto__)){
return or__29265__auto__;
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
var kvps = (function (){var iter__30019__auto__ = ((function (this$__$1){
return (function fipp$edn$iter__37829(s__37830){
return (new cljs.core.LazySeq(null,((function (this$__$1){
return (function (){
var s__37830__$1 = s__37830;
while(true){
var temp__4423__auto__ = cljs.core.seq.call(null,s__37830__$1);
if(temp__4423__auto__){
var s__37830__$2 = temp__4423__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__37830__$2)){
var c__30017__auto__ = cljs.core.chunk_first.call(null,s__37830__$2);
var size__30018__auto__ = cljs.core.count.call(null,c__30017__auto__);
var b__37832 = cljs.core.chunk_buffer.call(null,size__30018__auto__);
if((function (){var i__37831 = (0);
while(true){
if((i__37831 < size__30018__auto__)){
var vec__37835 = cljs.core._nth.call(null,c__30017__auto__,i__37831);
var k = cljs.core.nth.call(null,vec__37835,(0),null);
var v = cljs.core.nth.call(null,vec__37835,(1),null);
cljs.core.chunk_append.call(null,b__37832,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),fipp.visit.visit.call(null,this$__$1,k)," ",fipp.visit.visit.call(null,this$__$1,v)], null));

var G__37841 = (i__37831 + (1));
i__37831 = G__37841;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__37832),fipp$edn$iter__37829.call(null,cljs.core.chunk_rest.call(null,s__37830__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__37832),null);
}
} else {
var vec__37836 = cljs.core.first.call(null,s__37830__$2);
var k = cljs.core.nth.call(null,vec__37836,(0),null);
var v = cljs.core.nth.call(null,vec__37836,(1),null);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),fipp.visit.visit.call(null,this$__$1,k)," ",fipp.visit.visit.call(null,this$__$1,v)], null),fipp$edn$iter__37829.call(null,cljs.core.rest.call(null,s__37830__$2)));
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
return iter__30019__auto__.call(null,x);
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
return (function (p1__37822_SHARP_){
return fipp.visit.visit.call(null,this$__$1,p1__37822_SHARP_);
});})(this$__$1))
,x))], null),"}"], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_vector$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),"[",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"align","align",1964212802),cljs.core.interpose.call(null,new cljs.core.Keyword(null,"line","line",212345235),cljs.core.map.call(null,((function (this$__$1){
return (function (p1__37821_SHARP_){
return fipp.visit.visit.call(null,this$__$1,p1__37821_SHARP_);
});})(this$__$1))
,x))], null),"]"], null);
});

fipp.edn.EdnPrinter.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__29855__auto__){
var self__ = this;
var this__29855__auto____$1 = this;
var h__29681__auto__ = self__.__hash;
if(!((h__29681__auto__ == null))){
return h__29681__auto__;
} else {
var h__29681__auto____$1 = cljs.core.hash_imap.call(null,this__29855__auto____$1);
self__.__hash = h__29681__auto____$1;

return h__29681__auto____$1;
}
});

fipp.edn.EdnPrinter.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__29856__auto__,other__29857__auto__){
var self__ = this;
var this__29856__auto____$1 = this;
if(cljs.core.truth_((function (){var and__29253__auto__ = other__29857__auto__;
if(cljs.core.truth_(and__29253__auto__)){
var and__29253__auto____$1 = (this__29856__auto____$1.constructor === other__29857__auto__.constructor);
if(and__29253__auto____$1){
return cljs.core.equiv_map.call(null,this__29856__auto____$1,other__29857__auto__);
} else {
return and__29253__auto____$1;
}
} else {
return and__29253__auto__;
}
})())){
return true;
} else {
return false;
}
});

fipp.edn.EdnPrinter.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__29869__auto__,k__29870__auto__){
var self__ = this;
var this__29869__auto____$1 = this;
if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),null,new cljs.core.Keyword(null,"symbols","symbols",1211743),null], null), null),k__29870__auto__)){
return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__29869__auto____$1),self__.__meta),k__29870__auto__);
} else {
return (new fipp.edn.EdnPrinter(self__.print_meta,self__.symbols,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__29870__auto__)),null));
}
});

fipp.edn.EdnPrinter.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__29867__auto__,k__29868__auto__,G__37823){
var self__ = this;
var this__29867__auto____$1 = this;
var pred__37837 = cljs.core.keyword_identical_QMARK_;
var expr__37838 = k__29868__auto__;
if(cljs.core.truth_(pred__37837.call(null,new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),expr__37838))){
return (new fipp.edn.EdnPrinter(G__37823,self__.symbols,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__37837.call(null,new cljs.core.Keyword(null,"symbols","symbols",1211743),expr__37838))){
return (new fipp.edn.EdnPrinter(self__.print_meta,G__37823,self__.__meta,self__.__extmap,null));
} else {
return (new fipp.edn.EdnPrinter(self__.print_meta,self__.symbols,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__29868__auto__,G__37823),null));
}
}
});

fipp.edn.EdnPrinter.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__29872__auto__){
var self__ = this;
var this__29872__auto____$1 = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),self__.print_meta],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"symbols","symbols",1211743),self__.symbols],null))], null),self__.__extmap));
});

fipp.edn.EdnPrinter.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__29859__auto__,G__37823){
var self__ = this;
var this__29859__auto____$1 = this;
return (new fipp.edn.EdnPrinter(self__.print_meta,self__.symbols,G__37823,self__.__extmap,self__.__hash));
});

fipp.edn.EdnPrinter.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__29865__auto__,entry__29866__auto__){
var self__ = this;
var this__29865__auto____$1 = this;
if(cljs.core.vector_QMARK_.call(null,entry__29866__auto__)){
return cljs.core._assoc.call(null,this__29865__auto____$1,cljs.core._nth.call(null,entry__29866__auto__,(0)),cljs.core._nth.call(null,entry__29866__auto__,(1)));
} else {
return cljs.core.reduce.call(null,cljs.core._conj,this__29865__auto____$1,entry__29866__auto__);
}
});

fipp.edn.EdnPrinter.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"print-meta","print-meta",-1620321171,null),new cljs.core.Symbol(null,"symbols","symbols",1641743270,null)], null);
});

fipp.edn.EdnPrinter.cljs$lang$type = true;

fipp.edn.EdnPrinter.cljs$lang$ctorPrSeq = (function (this__29894__auto__){
return cljs.core._conj.call(null,cljs.core.List.EMPTY,"fipp.edn/EdnPrinter");
});

fipp.edn.EdnPrinter.cljs$lang$ctorPrWriter = (function (this__29894__auto__,writer__29895__auto__){
return cljs.core._write.call(null,writer__29895__auto__,"fipp.edn/EdnPrinter");
});

fipp.edn.__GT_EdnPrinter = (function fipp$edn$__GT_EdnPrinter(print_meta,symbols){
return (new fipp.edn.EdnPrinter(print_meta,symbols,null,null,null));
});

fipp.edn.map__GT_EdnPrinter = (function fipp$edn$map__GT_EdnPrinter(G__37825){
return (new fipp.edn.EdnPrinter(new cljs.core.Keyword(null,"print-meta","print-meta",1034114598).cljs$core$IFn$_invoke$arity$1(G__37825),new cljs.core.Keyword(null,"symbols","symbols",1211743).cljs$core$IFn$_invoke$arity$1(G__37825),null,cljs.core.dissoc.call(null,G__37825,new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),new cljs.core.Keyword(null,"symbols","symbols",1211743)),null));
});

fipp.edn.pprint = (function fipp$edn$pprint(){
var G__37843 = arguments.length;
switch (G__37843) {
case 1:
return fipp.edn.pprint.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return fipp.edn.pprint.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

fipp.edn.pprint.cljs$core$IFn$_invoke$arity$1 = (function (x){
return fipp.edn.pprint.call(null,x,cljs.core.PersistentArrayMap.EMPTY);
});

fipp.edn.pprint.cljs$core$IFn$_invoke$arity$2 = (function (x,options){
var printer = fipp.edn.map__GT_EdnPrinter.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),cljs.core._STAR_print_meta_STAR_,new cljs.core.Keyword(null,"symbols","symbols",1211743),cljs.core.PersistentArrayMap.EMPTY], null),options));
var _STAR_print_meta_STAR_37844 = cljs.core._STAR_print_meta_STAR_;
cljs.core._STAR_print_meta_STAR_ = false;

try{return fipp.engine.pprint_document.call(null,fipp.visit.visit.call(null,printer,x),options);
}finally {cljs.core._STAR_print_meta_STAR_ = _STAR_print_meta_STAR_37844;
}});

fipp.edn.pprint.cljs$lang$maxFixedArity = 2;

//# sourceMappingURL=edn.js.map