// Compiled by ClojureScript 1.7.122 {}
goog.provide('jayq.core');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('cljs.reader');
jayq.core.crate_meta = (function jayq$core$crate_meta(func){
return func.prototype._crateGroup;
});
jayq.core.__GT_selector = (function jayq$core$__GT_selector(sel){
if(typeof sel === 'string'){
return sel;
} else {
if(cljs.core.fn_QMARK_.call(null,sel)){
var temp__4423__auto__ = jayq.core.crate_meta.call(null,sel);
if(cljs.core.truth_(temp__4423__auto__)){
var cm = temp__4423__auto__;
return [cljs.core.str("[crateGroup="),cljs.core.str(cm),cljs.core.str("]")].join('');
} else {
return sel;
}
} else {
if((sel instanceof cljs.core.Keyword)){
return cljs.core.name.call(null,sel);
} else {
return sel;

}
}
}
});
jayq.core.$ = (function jayq$core$$(var_args){
var args18754 = [];
var len__5619__auto___18757 = arguments.length;
var i__5620__auto___18758 = (0);
while(true){
if((i__5620__auto___18758 < len__5619__auto___18757)){
args18754.push((arguments[i__5620__auto___18758]));

var G__18759 = (i__5620__auto___18758 + (1));
i__5620__auto___18758 = G__18759;
continue;
} else {
}
break;
}

var G__18756 = args18754.length;
switch (G__18756) {
case 1:
return jayq.core.$.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.$.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18754.length)].join('')));

}
});

jayq.core.$.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return jQuery(jayq.core.__GT_selector.call(null,sel));
});

jayq.core.$.cljs$core$IFn$_invoke$arity$2 = (function (sel,context){
return jQuery(jayq.core.__GT_selector.call(null,sel),context);
});

jayq.core.$.cljs$lang$maxFixedArity = 2;
jQuery.prototype.cljs$core$ISeqable$ = true;

jQuery.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this$__$1 = this;
if(cljs.core.truth_(this$__$1.get((0)))){
return this$__$1;
} else {
return null;
}
});

jQuery.prototype.cljs$core$ISeq$ = true;

jQuery.prototype.cljs$core$ISeq$_first$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.get((0));
});

jQuery.prototype.cljs$core$ISeq$_rest$arity$1 = (function (this$){
var this$__$1 = this;
if((cljs.core.count.call(null,this$__$1) > (1))){
return this$__$1.slice((1));
} else {
return cljs.core.List.EMPTY;
}
});

jQuery.prototype.cljs$core$ICounted$ = true;

jQuery.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.length;
});

jQuery.prototype.cljs$core$IIndexed$ = true;

jQuery.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (this$,n){
var this$__$1 = this;
if((n < cljs.core.count.call(null,this$__$1))){
return this$__$1.slice(n,(n + (1)));
} else {
return null;
}
});

jQuery.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (this$,n,not_found){
var this$__$1 = this;
if((n < cljs.core.count.call(null,this$__$1))){
return this$__$1.slice(n,(n + (1)));
} else {
if((void 0 === not_found)){
return null;
} else {
return not_found;
}
}
});

jQuery.prototype.cljs$core$ISequential$ = true;

jQuery.prototype.cljs$core$ILookup$ = true;

jQuery.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this$,k){
var this$__$1 = this;
var or__4561__auto__ = this$__$1.slice(k,(k + (1)));
if(cljs.core.truth_(or__4561__auto__)){
return or__4561__auto__;
} else {
return null;
}
});

jQuery.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this$,k,not_found){
var this$__$1 = this;
return cljs.core._nth.call(null,this$__$1,k,not_found);
});

jQuery.prototype.cljs$core$IReduce$ = true;

jQuery.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (this$,f){
var this$__$1 = this;
return cljs.core.ci_reduce.call(null,this$__$1,f);
});

jQuery.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (this$,f,start){
var this$__$1 = this;
return cljs.core.ci_reduce.call(null,this$__$1,f,start);
});

jQuery.prototype.cljs$core$IFn$ = true;

jQuery.prototype.call = (function() {
var G__18762 = null;
var G__18762__2 = (function (self__,k){
var self____$1 = this;
var this$ = self____$1;
return cljs.core._lookup.call(null,this$,k);
});
var G__18762__3 = (function (self__,k,not_found){
var self____$1 = this;
var this$ = self____$1;
return cljs.core._lookup.call(null,this$,k,not_found);
});
G__18762 = function(self__,k,not_found){
switch(arguments.length){
case 2:
return G__18762__2.call(this,self__,k);
case 3:
return G__18762__3.call(this,self__,k,not_found);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__18762.cljs$core$IFn$_invoke$arity$2 = G__18762__2;
G__18762.cljs$core$IFn$_invoke$arity$3 = G__18762__3;
return G__18762;
})()
;

jQuery.prototype.apply = (function (self__,args18761){
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone.call(null,args18761)));
});

jQuery.prototype.cljs$core$IFn$_invoke$arity$1 = (function (k){
var this$ = this;
return cljs.core._lookup.call(null,this$,k);
});

jQuery.prototype.cljs$core$IFn$_invoke$arity$2 = (function (k,not_found){
var this$ = this;
return cljs.core._lookup.call(null,this$,k,not_found);
});
jayq.core.anim = (function jayq$core$anim(var_args){
var args__5626__auto__ = [];
var len__5619__auto___18768 = arguments.length;
var i__5620__auto___18769 = (0);
while(true){
if((i__5620__auto___18769 < len__5619__auto___18768)){
args__5626__auto__.push((arguments[i__5620__auto___18769]));

var G__18770 = (i__5620__auto___18769 + (1));
i__5620__auto___18769 = G__18770;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((2) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((2)),(0))):null);
return jayq.core.anim.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5627__auto__);
});

jayq.core.anim.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,props,p__18766){
var vec__18767 = p__18766;
var speed = cljs.core.nth.call(null,vec__18767,(0),null);
var on_finish = cljs.core.nth.call(null,vec__18767,(1),null);
return $elem.animate(cljs.core.clj__GT_js.call(null,props),speed,on_finish);
});

jayq.core.anim.cljs$lang$maxFixedArity = (2);

jayq.core.anim.cljs$lang$applyTo = (function (seq18763){
var G__18764 = cljs.core.first.call(null,seq18763);
var seq18763__$1 = cljs.core.next.call(null,seq18763);
var G__18765 = cljs.core.first.call(null,seq18763__$1);
var seq18763__$2 = cljs.core.next.call(null,seq18763__$1);
return jayq.core.anim.cljs$core$IFn$_invoke$arity$variadic(G__18764,G__18765,seq18763__$2);
});
jayq.core.text = (function jayq$core$text(var_args){
var args18771 = [];
var len__5619__auto___18774 = arguments.length;
var i__5620__auto___18775 = (0);
while(true){
if((i__5620__auto___18775 < len__5619__auto___18774)){
args18771.push((arguments[i__5620__auto___18775]));

var G__18776 = (i__5620__auto___18775 + (1));
i__5620__auto___18775 = G__18776;
continue;
} else {
}
break;
}

var G__18773 = args18771.length;
switch (G__18773) {
case 1:
return jayq.core.text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18771.length)].join('')));

}
});

jayq.core.text.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.text();
});

jayq.core.text.cljs$core$IFn$_invoke$arity$2 = (function ($elem,txt){
return $elem.text(txt);
});

jayq.core.text.cljs$lang$maxFixedArity = 2;
jayq.core.css = (function jayq$core$css(var_args){
var args18778 = [];
var len__5619__auto___18781 = arguments.length;
var i__5620__auto___18782 = (0);
while(true){
if((i__5620__auto___18782 < len__5619__auto___18781)){
args18778.push((arguments[i__5620__auto___18782]));

var G__18783 = (i__5620__auto___18782 + (1));
i__5620__auto___18782 = G__18783;
continue;
} else {
}
break;
}

var G__18780 = args18778.length;
switch (G__18780) {
case 2:
return jayq.core.css.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return jayq.core.css.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18778.length)].join('')));

}
});

jayq.core.css.cljs$core$IFn$_invoke$arity$2 = (function ($elem,opts){
return $elem.css(cljs.core.clj__GT_js.call(null,opts));
});

jayq.core.css.cljs$core$IFn$_invoke$arity$3 = (function ($elem,p,v){
return $elem.css(cljs.core.name.call(null,p),v);
});

jayq.core.css.cljs$lang$maxFixedArity = 3;
jayq.core.attr = (function jayq$core$attr(var_args){
var args18785 = [];
var len__5619__auto___18788 = arguments.length;
var i__5620__auto___18789 = (0);
while(true){
if((i__5620__auto___18789 < len__5619__auto___18788)){
args18785.push((arguments[i__5620__auto___18789]));

var G__18790 = (i__5620__auto___18789 + (1));
i__5620__auto___18789 = G__18790;
continue;
} else {
}
break;
}

var G__18787 = args18785.length;
switch (G__18787) {
case 3:
return jayq.core.attr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return jayq.core.attr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18785.length)].join('')));

}
});

jayq.core.attr.cljs$core$IFn$_invoke$arity$3 = (function ($elem,n,v){
return $elem.attr(cljs.core.name.call(null,n),v);
});

jayq.core.attr.cljs$core$IFn$_invoke$arity$2 = (function ($elem,x){
return $elem.attr(cljs.core.clj__GT_js.call(null,x));
});

jayq.core.attr.cljs$lang$maxFixedArity = 3;
jayq.core.prop = (function jayq$core$prop(var_args){
var args18792 = [];
var len__5619__auto___18795 = arguments.length;
var i__5620__auto___18796 = (0);
while(true){
if((i__5620__auto___18796 < len__5619__auto___18795)){
args18792.push((arguments[i__5620__auto___18796]));

var G__18797 = (i__5620__auto___18796 + (1));
i__5620__auto___18796 = G__18797;
continue;
} else {
}
break;
}

var G__18794 = args18792.length;
switch (G__18794) {
case 3:
return jayq.core.prop.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return jayq.core.prop.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18792.length)].join('')));

}
});

jayq.core.prop.cljs$core$IFn$_invoke$arity$3 = (function ($elem,n,v){
return $elem.prop(cljs.core.name.call(null,n),v);
});

jayq.core.prop.cljs$core$IFn$_invoke$arity$2 = (function ($elem,x){
return $elem.prop(cljs.core.clj__GT_js.call(null,x));
});

jayq.core.prop.cljs$lang$maxFixedArity = 3;
jayq.core.remove_attr = (function jayq$core$remove_attr($elem,a){
return $elem.removeAttr(cljs.core.name.call(null,a));
});
jayq.core.remove_prop = (function jayq$core$remove_prop($elem,a){
return $elem.removeProp(cljs.core.name.call(null,a));
});
jayq.core.data = (function jayq$core$data(var_args){
var args18799 = [];
var len__5619__auto___18802 = arguments.length;
var i__5620__auto___18803 = (0);
while(true){
if((i__5620__auto___18803 < len__5619__auto___18802)){
args18799.push((arguments[i__5620__auto___18803]));

var G__18804 = (i__5620__auto___18803 + (1));
i__5620__auto___18803 = G__18804;
continue;
} else {
}
break;
}

var G__18801 = args18799.length;
switch (G__18801) {
case 1:
return jayq.core.data.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.data.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return jayq.core.data.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18799.length)].join('')));

}
});

jayq.core.data.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.data();
});

jayq.core.data.cljs$core$IFn$_invoke$arity$2 = (function ($elem,k){
return $elem.data(cljs.core.clj__GT_js.call(null,k));
});

jayq.core.data.cljs$core$IFn$_invoke$arity$3 = (function ($elem,k,v){
return $elem.data(cljs.core.name.call(null,k),cljs.core.clj__GT_js.call(null,v));
});

jayq.core.data.cljs$lang$maxFixedArity = 3;
jayq.core.add_class = (function jayq$core$add_class($elem,cl){
return $elem.addClass(cljs.core.name.call(null,cl));
});
jayq.core.remove_class = (function jayq$core$remove_class(var_args){
var args18806 = [];
var len__5619__auto___18809 = arguments.length;
var i__5620__auto___18810 = (0);
while(true){
if((i__5620__auto___18810 < len__5619__auto___18809)){
args18806.push((arguments[i__5620__auto___18810]));

var G__18811 = (i__5620__auto___18810 + (1));
i__5620__auto___18810 = G__18811;
continue;
} else {
}
break;
}

var G__18808 = args18806.length;
switch (G__18808) {
case 1:
return jayq.core.remove_class.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.remove_class.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18806.length)].join('')));

}
});

jayq.core.remove_class.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.removeClass();
});

jayq.core.remove_class.cljs$core$IFn$_invoke$arity$2 = (function ($elem,cl){
return $elem.removeClass(cljs.core.name.call(null,cl));
});

jayq.core.remove_class.cljs$lang$maxFixedArity = 2;
jayq.core.toggle_class = (function jayq$core$toggle_class(var_args){
var args18813 = [];
var len__5619__auto___18816 = arguments.length;
var i__5620__auto___18817 = (0);
while(true){
if((i__5620__auto___18817 < len__5619__auto___18816)){
args18813.push((arguments[i__5620__auto___18817]));

var G__18818 = (i__5620__auto___18817 + (1));
i__5620__auto___18817 = G__18818;
continue;
} else {
}
break;
}

var G__18815 = args18813.length;
switch (G__18815) {
case 2:
return jayq.core.toggle_class.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return jayq.core.toggle_class.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18813.length)].join('')));

}
});

jayq.core.toggle_class.cljs$core$IFn$_invoke$arity$2 = (function ($elem,cl){
return $elem.toggleClass(cljs.core.name.call(null,cl));
});

jayq.core.toggle_class.cljs$core$IFn$_invoke$arity$3 = (function ($elem,cl,switch$){
return $elem.toggleClass(cljs.core.name.call(null,cl),cljs.core.boolean$.call(null,switch$));
});

jayq.core.toggle_class.cljs$lang$maxFixedArity = 3;
jayq.core.has_class = (function jayq$core$has_class($elem,cl){
return $elem.hasClass(cljs.core.name.call(null,cl));
});
jayq.core.is = (function jayq$core$is($elem,selector){
return $elem.is(jayq.core.__GT_selector.call(null,selector));
});
jayq.core.after = (function jayq$core$after($elem,content){
return $elem.after(content);
});
jayq.core.before = (function jayq$core$before($elem,content){
return $elem.before(content);
});
jayq.core.append = (function jayq$core$append($elem,content){
return $elem.append(content);
});
jayq.core.prepend = (function jayq$core$prepend($elem,content){
return $elem.prepend(content);
});
jayq.core.append_to = (function jayq$core$append_to($elem,target){
return $elem.appendTo(jayq.core.__GT_selector.call(null,target));
});
jayq.core.prepend_to = (function jayq$core$prepend_to($elem,target){
return $elem.prependTo(jayq.core.__GT_selector.call(null,target));
});
jayq.core.insert_before = (function jayq$core$insert_before($elem,target){
return $elem.insertBefore(jayq.core.__GT_selector.call(null,target));
});
jayq.core.insert_after = (function jayq$core$insert_after($elem,target){
return $elem.insertAfter(jayq.core.__GT_selector.call(null,target));
});
jayq.core.replace_with = (function jayq$core$replace_with($elem,content){
return $elem.replaceWith(content);
});
jayq.core.remove = (function jayq$core$remove($elem){
return $elem.remove();
});
jayq.core.hide = (function jayq$core$hide(var_args){
var args__5626__auto__ = [];
var len__5619__auto___18824 = arguments.length;
var i__5620__auto___18825 = (0);
while(true){
if((i__5620__auto___18825 < len__5619__auto___18824)){
args__5626__auto__.push((arguments[i__5620__auto___18825]));

var G__18826 = (i__5620__auto___18825 + (1));
i__5620__auto___18825 = G__18826;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return jayq.core.hide.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

jayq.core.hide.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__18822){
var vec__18823 = p__18822;
var speed = cljs.core.nth.call(null,vec__18823,(0),null);
var on_finish = cljs.core.nth.call(null,vec__18823,(1),null);
return $elem.hide(speed,on_finish);
});

jayq.core.hide.cljs$lang$maxFixedArity = (1);

jayq.core.hide.cljs$lang$applyTo = (function (seq18820){
var G__18821 = cljs.core.first.call(null,seq18820);
var seq18820__$1 = cljs.core.next.call(null,seq18820);
return jayq.core.hide.cljs$core$IFn$_invoke$arity$variadic(G__18821,seq18820__$1);
});
jayq.core.show = (function jayq$core$show(var_args){
var args__5626__auto__ = [];
var len__5619__auto___18831 = arguments.length;
var i__5620__auto___18832 = (0);
while(true){
if((i__5620__auto___18832 < len__5619__auto___18831)){
args__5626__auto__.push((arguments[i__5620__auto___18832]));

var G__18833 = (i__5620__auto___18832 + (1));
i__5620__auto___18832 = G__18833;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return jayq.core.show.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

jayq.core.show.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__18829){
var vec__18830 = p__18829;
var speed = cljs.core.nth.call(null,vec__18830,(0),null);
var on_finish = cljs.core.nth.call(null,vec__18830,(1),null);
return $elem.show(speed,on_finish);
});

jayq.core.show.cljs$lang$maxFixedArity = (1);

jayq.core.show.cljs$lang$applyTo = (function (seq18827){
var G__18828 = cljs.core.first.call(null,seq18827);
var seq18827__$1 = cljs.core.next.call(null,seq18827);
return jayq.core.show.cljs$core$IFn$_invoke$arity$variadic(G__18828,seq18827__$1);
});
jayq.core.toggle = (function jayq$core$toggle(var_args){
var args__5626__auto__ = [];
var len__5619__auto___18838 = arguments.length;
var i__5620__auto___18839 = (0);
while(true){
if((i__5620__auto___18839 < len__5619__auto___18838)){
args__5626__auto__.push((arguments[i__5620__auto___18839]));

var G__18840 = (i__5620__auto___18839 + (1));
i__5620__auto___18839 = G__18840;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return jayq.core.toggle.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

jayq.core.toggle.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__18836){
var vec__18837 = p__18836;
var speed = cljs.core.nth.call(null,vec__18837,(0),null);
var on_finish = cljs.core.nth.call(null,vec__18837,(1),null);
return $elem.toggle(speed,on_finish);
});

jayq.core.toggle.cljs$lang$maxFixedArity = (1);

jayq.core.toggle.cljs$lang$applyTo = (function (seq18834){
var G__18835 = cljs.core.first.call(null,seq18834);
var seq18834__$1 = cljs.core.next.call(null,seq18834);
return jayq.core.toggle.cljs$core$IFn$_invoke$arity$variadic(G__18835,seq18834__$1);
});
jayq.core.fade_out = (function jayq$core$fade_out(var_args){
var args__5626__auto__ = [];
var len__5619__auto___18845 = arguments.length;
var i__5620__auto___18846 = (0);
while(true){
if((i__5620__auto___18846 < len__5619__auto___18845)){
args__5626__auto__.push((arguments[i__5620__auto___18846]));

var G__18847 = (i__5620__auto___18846 + (1));
i__5620__auto___18846 = G__18847;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return jayq.core.fade_out.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

jayq.core.fade_out.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__18843){
var vec__18844 = p__18843;
var speed = cljs.core.nth.call(null,vec__18844,(0),null);
var on_finish = cljs.core.nth.call(null,vec__18844,(1),null);
return $elem.fadeOut(speed,on_finish);
});

jayq.core.fade_out.cljs$lang$maxFixedArity = (1);

jayq.core.fade_out.cljs$lang$applyTo = (function (seq18841){
var G__18842 = cljs.core.first.call(null,seq18841);
var seq18841__$1 = cljs.core.next.call(null,seq18841);
return jayq.core.fade_out.cljs$core$IFn$_invoke$arity$variadic(G__18842,seq18841__$1);
});
jayq.core.fade_in = (function jayq$core$fade_in(var_args){
var args__5626__auto__ = [];
var len__5619__auto___18852 = arguments.length;
var i__5620__auto___18853 = (0);
while(true){
if((i__5620__auto___18853 < len__5619__auto___18852)){
args__5626__auto__.push((arguments[i__5620__auto___18853]));

var G__18854 = (i__5620__auto___18853 + (1));
i__5620__auto___18853 = G__18854;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return jayq.core.fade_in.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

jayq.core.fade_in.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__18850){
var vec__18851 = p__18850;
var speed = cljs.core.nth.call(null,vec__18851,(0),null);
var on_finish = cljs.core.nth.call(null,vec__18851,(1),null);
return $elem.fadeIn(speed,on_finish);
});

jayq.core.fade_in.cljs$lang$maxFixedArity = (1);

jayq.core.fade_in.cljs$lang$applyTo = (function (seq18848){
var G__18849 = cljs.core.first.call(null,seq18848);
var seq18848__$1 = cljs.core.next.call(null,seq18848);
return jayq.core.fade_in.cljs$core$IFn$_invoke$arity$variadic(G__18849,seq18848__$1);
});
jayq.core.slide_up = (function jayq$core$slide_up(var_args){
var args__5626__auto__ = [];
var len__5619__auto___18859 = arguments.length;
var i__5620__auto___18860 = (0);
while(true){
if((i__5620__auto___18860 < len__5619__auto___18859)){
args__5626__auto__.push((arguments[i__5620__auto___18860]));

var G__18861 = (i__5620__auto___18860 + (1));
i__5620__auto___18860 = G__18861;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return jayq.core.slide_up.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

jayq.core.slide_up.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__18857){
var vec__18858 = p__18857;
var speed = cljs.core.nth.call(null,vec__18858,(0),null);
var on_finish = cljs.core.nth.call(null,vec__18858,(1),null);
return $elem.slideUp(speed,on_finish);
});

jayq.core.slide_up.cljs$lang$maxFixedArity = (1);

jayq.core.slide_up.cljs$lang$applyTo = (function (seq18855){
var G__18856 = cljs.core.first.call(null,seq18855);
var seq18855__$1 = cljs.core.next.call(null,seq18855);
return jayq.core.slide_up.cljs$core$IFn$_invoke$arity$variadic(G__18856,seq18855__$1);
});
jayq.core.slide_down = (function jayq$core$slide_down(var_args){
var args__5626__auto__ = [];
var len__5619__auto___18866 = arguments.length;
var i__5620__auto___18867 = (0);
while(true){
if((i__5620__auto___18867 < len__5619__auto___18866)){
args__5626__auto__.push((arguments[i__5620__auto___18867]));

var G__18868 = (i__5620__auto___18867 + (1));
i__5620__auto___18867 = G__18868;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return jayq.core.slide_down.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

jayq.core.slide_down.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__18864){
var vec__18865 = p__18864;
var speed = cljs.core.nth.call(null,vec__18865,(0),null);
var on_finish = cljs.core.nth.call(null,vec__18865,(1),null);
return $elem.slideDown(speed,on_finish);
});

jayq.core.slide_down.cljs$lang$maxFixedArity = (1);

jayq.core.slide_down.cljs$lang$applyTo = (function (seq18862){
var G__18863 = cljs.core.first.call(null,seq18862);
var seq18862__$1 = cljs.core.next.call(null,seq18862);
return jayq.core.slide_down.cljs$core$IFn$_invoke$arity$variadic(G__18863,seq18862__$1);
});
jayq.core.siblings = (function jayq$core$siblings(var_args){
var args18869 = [];
var len__5619__auto___18872 = arguments.length;
var i__5620__auto___18873 = (0);
while(true){
if((i__5620__auto___18873 < len__5619__auto___18872)){
args18869.push((arguments[i__5620__auto___18873]));

var G__18874 = (i__5620__auto___18873 + (1));
i__5620__auto___18873 = G__18874;
continue;
} else {
}
break;
}

var G__18871 = args18869.length;
switch (G__18871) {
case 1:
return jayq.core.siblings.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.siblings.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18869.length)].join('')));

}
});

jayq.core.siblings.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.siblings();
});

jayq.core.siblings.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.siblings(cljs.core.name.call(null,selector));
});

jayq.core.siblings.cljs$lang$maxFixedArity = 2;
jayq.core.parent = (function jayq$core$parent($elem){
return $elem.parent();
});
jayq.core.parents = (function jayq$core$parents(var_args){
var args18876 = [];
var len__5619__auto___18879 = arguments.length;
var i__5620__auto___18880 = (0);
while(true){
if((i__5620__auto___18880 < len__5619__auto___18879)){
args18876.push((arguments[i__5620__auto___18880]));

var G__18881 = (i__5620__auto___18880 + (1));
i__5620__auto___18880 = G__18881;
continue;
} else {
}
break;
}

var G__18878 = args18876.length;
switch (G__18878) {
case 1:
return jayq.core.parents.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.parents.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18876.length)].join('')));

}
});

jayq.core.parents.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.parents();
});

jayq.core.parents.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.parents(cljs.core.name.call(null,selector));
});

jayq.core.parents.cljs$lang$maxFixedArity = 2;
jayq.core.parents_until = (function jayq$core$parents_until(var_args){
var args18883 = [];
var len__5619__auto___18886 = arguments.length;
var i__5620__auto___18887 = (0);
while(true){
if((i__5620__auto___18887 < len__5619__auto___18886)){
args18883.push((arguments[i__5620__auto___18887]));

var G__18888 = (i__5620__auto___18887 + (1));
i__5620__auto___18887 = G__18888;
continue;
} else {
}
break;
}

var G__18885 = args18883.length;
switch (G__18885) {
case 1:
return jayq.core.parents_until.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.parents_until.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return jayq.core.parents_until.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18883.length)].join('')));

}
});

jayq.core.parents_until.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.parentsUntil();
});

jayq.core.parents_until.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.parentsUntil(jayq.core.__GT_selector.call(null,selector));
});

jayq.core.parents_until.cljs$core$IFn$_invoke$arity$3 = (function ($elem,selector,filtr){
return $elem.parentsUntil(jayq.core.__GT_selector.call(null,selector),cljs.core.name.call(null,filtr));
});

jayq.core.parents_until.cljs$lang$maxFixedArity = 3;
jayq.core.children = (function jayq$core$children(var_args){
var args18890 = [];
var len__5619__auto___18893 = arguments.length;
var i__5620__auto___18894 = (0);
while(true){
if((i__5620__auto___18894 < len__5619__auto___18893)){
args18890.push((arguments[i__5620__auto___18894]));

var G__18895 = (i__5620__auto___18894 + (1));
i__5620__auto___18894 = G__18895;
continue;
} else {
}
break;
}

var G__18892 = args18890.length;
switch (G__18892) {
case 2:
return jayq.core.children.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.children.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18890.length)].join('')));

}
});

jayq.core.children.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.children(cljs.core.name.call(null,selector));
});

jayq.core.children.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.children();
});

jayq.core.children.cljs$lang$maxFixedArity = 2;
jayq.core.next = (function jayq$core$next(var_args){
var args18897 = [];
var len__5619__auto___18900 = arguments.length;
var i__5620__auto___18901 = (0);
while(true){
if((i__5620__auto___18901 < len__5619__auto___18900)){
args18897.push((arguments[i__5620__auto___18901]));

var G__18902 = (i__5620__auto___18901 + (1));
i__5620__auto___18901 = G__18902;
continue;
} else {
}
break;
}

var G__18899 = args18897.length;
switch (G__18899) {
case 1:
return jayq.core.next.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.next.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18897.length)].join('')));

}
});

jayq.core.next.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.next();
});

jayq.core.next.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.next(cljs.core.name.call(null,selector));
});

jayq.core.next.cljs$lang$maxFixedArity = 2;
jayq.core.prev = (function jayq$core$prev(var_args){
var args18904 = [];
var len__5619__auto___18907 = arguments.length;
var i__5620__auto___18908 = (0);
while(true){
if((i__5620__auto___18908 < len__5619__auto___18907)){
args18904.push((arguments[i__5620__auto___18908]));

var G__18909 = (i__5620__auto___18908 + (1));
i__5620__auto___18908 = G__18909;
continue;
} else {
}
break;
}

var G__18906 = args18904.length;
switch (G__18906) {
case 1:
return jayq.core.prev.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.prev.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18904.length)].join('')));

}
});

jayq.core.prev.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.prev();
});

jayq.core.prev.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.prev(cljs.core.name.call(null,selector));
});

jayq.core.prev.cljs$lang$maxFixedArity = 2;
jayq.core.next_all = (function jayq$core$next_all(var_args){
var args18911 = [];
var len__5619__auto___18914 = arguments.length;
var i__5620__auto___18915 = (0);
while(true){
if((i__5620__auto___18915 < len__5619__auto___18914)){
args18911.push((arguments[i__5620__auto___18915]));

var G__18916 = (i__5620__auto___18915 + (1));
i__5620__auto___18915 = G__18916;
continue;
} else {
}
break;
}

var G__18913 = args18911.length;
switch (G__18913) {
case 1:
return jayq.core.next_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.next_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18911.length)].join('')));

}
});

jayq.core.next_all.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.nextAll();
});

jayq.core.next_all.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.nextAll(cljs.core.name.call(null,selector));
});

jayq.core.next_all.cljs$lang$maxFixedArity = 2;
jayq.core.prev_all = (function jayq$core$prev_all(var_args){
var args18918 = [];
var len__5619__auto___18921 = arguments.length;
var i__5620__auto___18922 = (0);
while(true){
if((i__5620__auto___18922 < len__5619__auto___18921)){
args18918.push((arguments[i__5620__auto___18922]));

var G__18923 = (i__5620__auto___18922 + (1));
i__5620__auto___18922 = G__18923;
continue;
} else {
}
break;
}

var G__18920 = args18918.length;
switch (G__18920) {
case 1:
return jayq.core.prev_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.prev_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18918.length)].join('')));

}
});

jayq.core.prev_all.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.prevAll();
});

jayq.core.prev_all.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.prevAll(cljs.core.name.call(null,selector));
});

jayq.core.prev_all.cljs$lang$maxFixedArity = 2;
jayq.core.next_until = (function jayq$core$next_until(var_args){
var args18925 = [];
var len__5619__auto___18928 = arguments.length;
var i__5620__auto___18929 = (0);
while(true){
if((i__5620__auto___18929 < len__5619__auto___18928)){
args18925.push((arguments[i__5620__auto___18929]));

var G__18930 = (i__5620__auto___18929 + (1));
i__5620__auto___18929 = G__18930;
continue;
} else {
}
break;
}

var G__18927 = args18925.length;
switch (G__18927) {
case 1:
return jayq.core.next_until.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.next_until.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return jayq.core.next_until.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18925.length)].join('')));

}
});

jayq.core.next_until.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.nextUntil();
});

jayq.core.next_until.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.nextUntil(jayq.core.__GT_selector.call(null,selector));
});

jayq.core.next_until.cljs$core$IFn$_invoke$arity$3 = (function ($elem,selector,filtr){
return $elem.nextUntil(jayq.core.__GT_selector.call(null,selector),cljs.core.name.call(null,filtr));
});

jayq.core.next_until.cljs$lang$maxFixedArity = 3;
jayq.core.prev_until = (function jayq$core$prev_until(var_args){
var args18932 = [];
var len__5619__auto___18935 = arguments.length;
var i__5620__auto___18936 = (0);
while(true){
if((i__5620__auto___18936 < len__5619__auto___18935)){
args18932.push((arguments[i__5620__auto___18936]));

var G__18937 = (i__5620__auto___18936 + (1));
i__5620__auto___18936 = G__18937;
continue;
} else {
}
break;
}

var G__18934 = args18932.length;
switch (G__18934) {
case 1:
return jayq.core.prev_until.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.prev_until.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return jayq.core.prev_until.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18932.length)].join('')));

}
});

jayq.core.prev_until.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.prevUntil();
});

jayq.core.prev_until.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.prevUntil(jayq.core.__GT_selector.call(null,selector));
});

jayq.core.prev_until.cljs$core$IFn$_invoke$arity$3 = (function ($elem,selector,filtr){
return $elem.prevUntil(jayq.core.__GT_selector.call(null,selector),cljs.core.name.call(null,filtr));
});

jayq.core.prev_until.cljs$lang$maxFixedArity = 3;
jayq.core.find = (function jayq$core$find($elem,selector){
return $elem.find(cljs.core.name.call(null,selector));
});
jayq.core.closest = (function jayq$core$closest(var_args){
var args__5626__auto__ = [];
var len__5619__auto___18944 = arguments.length;
var i__5620__auto___18945 = (0);
while(true){
if((i__5620__auto___18945 < len__5619__auto___18944)){
args__5626__auto__.push((arguments[i__5620__auto___18945]));

var G__18946 = (i__5620__auto___18945 + (1));
i__5620__auto___18945 = G__18946;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((2) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((2)),(0))):null);
return jayq.core.closest.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5627__auto__);
});

jayq.core.closest.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,selector,p__18942){
var vec__18943 = p__18942;
var context = cljs.core.nth.call(null,vec__18943,(0),null);
return $elem.closest(jayq.core.__GT_selector.call(null,selector),context);
});

jayq.core.closest.cljs$lang$maxFixedArity = (2);

jayq.core.closest.cljs$lang$applyTo = (function (seq18939){
var G__18940 = cljs.core.first.call(null,seq18939);
var seq18939__$1 = cljs.core.next.call(null,seq18939);
var G__18941 = cljs.core.first.call(null,seq18939__$1);
var seq18939__$2 = cljs.core.next.call(null,seq18939__$1);
return jayq.core.closest.cljs$core$IFn$_invoke$arity$variadic(G__18940,G__18941,seq18939__$2);
});
jayq.core.clone = (function jayq$core$clone($elem){
return $elem.clone();
});
jayq.core.html = (function jayq$core$html(var_args){
var args18947 = [];
var len__5619__auto___18950 = arguments.length;
var i__5620__auto___18951 = (0);
while(true){
if((i__5620__auto___18951 < len__5619__auto___18950)){
args18947.push((arguments[i__5620__auto___18951]));

var G__18952 = (i__5620__auto___18951 + (1));
i__5620__auto___18951 = G__18952;
continue;
} else {
}
break;
}

var G__18949 = args18947.length;
switch (G__18949) {
case 2:
return jayq.core.html.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.html.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18947.length)].join('')));

}
});

jayq.core.html.cljs$core$IFn$_invoke$arity$2 = (function ($elem,v){
return $elem.html(v);
});

jayq.core.html.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.html();
});

jayq.core.html.cljs$lang$maxFixedArity = 2;
jayq.core.inner = jayq.core.html;
jayq.core.empty = (function jayq$core$empty($elem){
return $elem.empty();
});
jayq.core.val = (function jayq$core$val(var_args){
var args18954 = [];
var len__5619__auto___18957 = arguments.length;
var i__5620__auto___18958 = (0);
while(true){
if((i__5620__auto___18958 < len__5619__auto___18957)){
args18954.push((arguments[i__5620__auto___18958]));

var G__18959 = (i__5620__auto___18958 + (1));
i__5620__auto___18958 = G__18959;
continue;
} else {
}
break;
}

var G__18956 = args18954.length;
switch (G__18956) {
case 2:
return jayq.core.val.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.val.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18954.length)].join('')));

}
});

jayq.core.val.cljs$core$IFn$_invoke$arity$2 = (function ($elem,v){
return $elem.val(v);
});

jayq.core.val.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.val();
});

jayq.core.val.cljs$lang$maxFixedArity = 2;
jayq.core.serialize = (function jayq$core$serialize($elem){
return $elem.serialize();
});
jayq.core.queue = (function jayq$core$queue(var_args){
var args18961 = [];
var len__5619__auto___18964 = arguments.length;
var i__5620__auto___18965 = (0);
while(true){
if((i__5620__auto___18965 < len__5619__auto___18964)){
args18961.push((arguments[i__5620__auto___18965]));

var G__18966 = (i__5620__auto___18965 + (1));
i__5620__auto___18965 = G__18966;
continue;
} else {
}
break;
}

var G__18963 = args18961.length;
switch (G__18963) {
case 3:
return jayq.core.queue.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return jayq.core.queue.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.queue.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18961.length)].join('')));

}
});

jayq.core.queue.cljs$core$IFn$_invoke$arity$3 = (function ($elem,x,y){
return $elem.queue(x,y);
});

jayq.core.queue.cljs$core$IFn$_invoke$arity$2 = (function ($elem,x){
return $elem.queue(x);
});

jayq.core.queue.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.queue();
});

jayq.core.queue.cljs$lang$maxFixedArity = 3;
jayq.core.dequeue = (function jayq$core$dequeue(var_args){
var args18968 = [];
var len__5619__auto___18971 = arguments.length;
var i__5620__auto___18972 = (0);
while(true){
if((i__5620__auto___18972 < len__5619__auto___18971)){
args18968.push((arguments[i__5620__auto___18972]));

var G__18973 = (i__5620__auto___18972 + (1));
i__5620__auto___18972 = G__18973;
continue;
} else {
}
break;
}

var G__18970 = args18968.length;
switch (G__18970) {
case 2:
return jayq.core.dequeue.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.dequeue.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18968.length)].join('')));

}
});

jayq.core.dequeue.cljs$core$IFn$_invoke$arity$2 = (function ($elem,queue_name){
return $elem.dequeue(queue_name);
});

jayq.core.dequeue.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.dequeue();
});

jayq.core.dequeue.cljs$lang$maxFixedArity = 2;
jayq.core.document_ready = (function jayq$core$document_ready(func){
return jayq.core.$.call(null,document).ready(func);
});
jayq.core.mimetype_converter = (function jayq$core$mimetype_converter(s){
return cljs.reader.read_string.call(null,[cljs.core.str(s)].join(''));
});
jQuery.ajaxSetup(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"accepts","accepts",1429714104),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"edn","edn",1317840885),"application/edn, text/edn",new cljs.core.Keyword(null,"clojure","clojure",438975815),"application/clojure, text/clojure"], null),new cljs.core.Keyword(null,"contents","contents",-1567174023),new cljs.core.PersistentArrayMap(null, 1, ["clojure",/edn|clojure/], null),new cljs.core.Keyword(null,"converters","converters",195533259),new cljs.core.PersistentArrayMap(null, 2, ["text edn",jayq.core.mimetype_converter,"text clojure",jayq.core.mimetype_converter], null)], null)));
jayq.core.clj_content_type_QMARK_ = (function jayq$core$clj_content_type_QMARK_(x){
return cljs.core.re_find.call(null,/^(text|application)\/(clojure|edn)/,x);
});
jayq.core.__GT_content_type = (function jayq$core$__GT_content_type(ct){
if(typeof ct === 'string'){
return ct;
} else {
if((ct instanceof cljs.core.Keyword)){
return cljs.core.subs.call(null,[cljs.core.str(ct)].join(''),(1));
} else {
return null;
}
}
});
jayq.core.preprocess_request = (function jayq$core$preprocess_request(p__18977){
var map__18980 = p__18977;
var map__18980__$1 = ((((!((map__18980 == null)))?((((map__18980.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18980.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18980):map__18980);
var request = map__18980__$1;
var data = cljs.core.get.call(null,map__18980__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var contentType = cljs.core.get.call(null,map__18980__$1,new cljs.core.Keyword(null,"contentType","contentType",-1462509576));
var ct = jayq.core.__GT_content_type.call(null,contentType);
return ((function (ct,map__18980,map__18980__$1,request,data,contentType){
return (function (p1__18976_SHARP_){
if(cljs.core.truth_((function (){var and__4549__auto__ = ct;
if(cljs.core.truth_(and__4549__auto__)){
return jayq.core.clj_content_type_QMARK_.call(null,ct);
} else {
return and__4549__auto__;
}
})())){
return cljs.core.assoc.call(null,p1__18976_SHARP_,new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.pr_str.call(null,data));
} else {
return p1__18976_SHARP_;
}
});})(ct,map__18980,map__18980__$1,request,data,contentType))
.call(null,((function (ct,map__18980,map__18980__$1,request,data,contentType){
return (function (p1__18975_SHARP_){
if(cljs.core.truth_(ct)){
return cljs.core.assoc.call(null,p1__18975_SHARP_,new cljs.core.Keyword(null,"contentType","contentType",-1462509576),ct);
} else {
return p1__18975_SHARP_;
}
});})(ct,map__18980,map__18980__$1,request,data,contentType))
.call(null,request));
});
jayq.core.__GT_ajax_settings = (function jayq$core$__GT_ajax_settings(request){
return cljs.core.clj__GT_js.call(null,jayq.core.preprocess_request.call(null,request));
});
jayq.core.ajax = (function jayq$core$ajax(var_args){
var args18982 = [];
var len__5619__auto___18985 = arguments.length;
var i__5620__auto___18986 = (0);
while(true){
if((i__5620__auto___18986 < len__5619__auto___18985)){
args18982.push((arguments[i__5620__auto___18986]));

var G__18987 = (i__5620__auto___18986 + (1));
i__5620__auto___18986 = G__18987;
continue;
} else {
}
break;
}

var G__18984 = args18982.length;
switch (G__18984) {
case 2:
return jayq.core.ajax.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.ajax.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18982.length)].join('')));

}
});

jayq.core.ajax.cljs$core$IFn$_invoke$arity$2 = (function (url,settings){
return jQuery.ajax(url,jayq.core.__GT_ajax_settings.call(null,settings));
});

jayq.core.ajax.cljs$core$IFn$_invoke$arity$1 = (function (settings){
return jQuery.ajax(jayq.core.__GT_ajax_settings.call(null,settings));
});

jayq.core.ajax.cljs$lang$maxFixedArity = 2;
jayq.core.xhr = (function jayq$core$xhr(p__18989,content,callback){
var vec__18991 = p__18989;
var method = cljs.core.nth.call(null,vec__18991,(0),null);
var uri = cljs.core.nth.call(null,vec__18991,(1),null);
var params = cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),clojure.string.upper_case.call(null,cljs.core.name.call(null,method)),new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.clj__GT_js.call(null,content),new cljs.core.Keyword(null,"success","success",1890645906),callback], null));
return jQuery.ajax(uri,params);
});
/**
 * Reads clojure data from element content (preferably a script tag with type=edn/clojure)
 */
jayq.core.read = (function jayq$core$read($elem){
return cljs.reader.read_string.call(null,jayq.core.html.call(null,$elem));
});
jayq.core.$contains = jQuery.contains;
jayq.core.bind = (function jayq$core$bind($elem,ev,func){
return $elem.bind(cljs.core.name.call(null,ev),func);
});
jayq.core.unbind = (function jayq$core$unbind(var_args){
var args__5626__auto__ = [];
var len__5619__auto___18997 = arguments.length;
var i__5620__auto___18998 = (0);
while(true){
if((i__5620__auto___18998 < len__5619__auto___18997)){
args__5626__auto__.push((arguments[i__5620__auto___18998]));

var G__18999 = (i__5620__auto___18998 + (1));
i__5620__auto___18998 = G__18999;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((2) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((2)),(0))):null);
return jayq.core.unbind.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5627__auto__);
});

jayq.core.unbind.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,ev,p__18995){
var vec__18996 = p__18995;
var func = cljs.core.nth.call(null,vec__18996,(0),null);
return $elem.unbind(cljs.core.name.call(null,ev),func);
});

jayq.core.unbind.cljs$lang$maxFixedArity = (2);

jayq.core.unbind.cljs$lang$applyTo = (function (seq18992){
var G__18993 = cljs.core.first.call(null,seq18992);
var seq18992__$1 = cljs.core.next.call(null,seq18992);
var G__18994 = cljs.core.first.call(null,seq18992__$1);
var seq18992__$2 = cljs.core.next.call(null,seq18992__$1);
return jayq.core.unbind.cljs$core$IFn$_invoke$arity$variadic(G__18993,G__18994,seq18992__$2);
});
jayq.core.trigger = (function jayq$core$trigger($elem,ev){
return $elem.trigger(cljs.core.name.call(null,ev));
});
jayq.core.delegate = (function jayq$core$delegate($elem,sel,ev,func){
return $elem.delegate(jayq.core.__GT_selector.call(null,sel),cljs.core.name.call(null,ev),func);
});
jayq.core.__GT_event = (function jayq$core$__GT_event(e){
if(cljs.core.coll_QMARK_.call(null,e)){
return clojure.string.join.call(null," ",cljs.core.map.call(null,cljs.core.name,e));
} else {
return cljs.core.clj__GT_js.call(null,e);
}
});
jayq.core.on = (function jayq$core$on(var_args){
var args__5626__auto__ = [];
var len__5619__auto___19005 = arguments.length;
var i__5620__auto___19006 = (0);
while(true){
if((i__5620__auto___19006 < len__5619__auto___19005)){
args__5626__auto__.push((arguments[i__5620__auto___19006]));

var G__19007 = (i__5620__auto___19006 + (1));
i__5620__auto___19006 = G__19007;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((2) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((2)),(0))):null);
return jayq.core.on.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5627__auto__);
});

jayq.core.on.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,events,p__19003){
var vec__19004 = p__19003;
var sel = cljs.core.nth.call(null,vec__19004,(0),null);
var data = cljs.core.nth.call(null,vec__19004,(1),null);
var handler = cljs.core.nth.call(null,vec__19004,(2),null);
return $elem.on(jayq.core.__GT_event.call(null,events),jayq.core.__GT_selector.call(null,sel),data,handler);
});

jayq.core.on.cljs$lang$maxFixedArity = (2);

jayq.core.on.cljs$lang$applyTo = (function (seq19000){
var G__19001 = cljs.core.first.call(null,seq19000);
var seq19000__$1 = cljs.core.next.call(null,seq19000);
var G__19002 = cljs.core.first.call(null,seq19000__$1);
var seq19000__$2 = cljs.core.next.call(null,seq19000__$1);
return jayq.core.on.cljs$core$IFn$_invoke$arity$variadic(G__19001,G__19002,seq19000__$2);
});
jayq.core.one = (function jayq$core$one(var_args){
var args__5626__auto__ = [];
var len__5619__auto___19013 = arguments.length;
var i__5620__auto___19014 = (0);
while(true){
if((i__5620__auto___19014 < len__5619__auto___19013)){
args__5626__auto__.push((arguments[i__5620__auto___19014]));

var G__19015 = (i__5620__auto___19014 + (1));
i__5620__auto___19014 = G__19015;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((2) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((2)),(0))):null);
return jayq.core.one.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5627__auto__);
});

jayq.core.one.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,events,p__19011){
var vec__19012 = p__19011;
var sel = cljs.core.nth.call(null,vec__19012,(0),null);
var data = cljs.core.nth.call(null,vec__19012,(1),null);
var handler = cljs.core.nth.call(null,vec__19012,(2),null);
return $elem.one(jayq.core.__GT_event.call(null,events),jayq.core.__GT_selector.call(null,sel),data,handler);
});

jayq.core.one.cljs$lang$maxFixedArity = (2);

jayq.core.one.cljs$lang$applyTo = (function (seq19008){
var G__19009 = cljs.core.first.call(null,seq19008);
var seq19008__$1 = cljs.core.next.call(null,seq19008);
var G__19010 = cljs.core.first.call(null,seq19008__$1);
var seq19008__$2 = cljs.core.next.call(null,seq19008__$1);
return jayq.core.one.cljs$core$IFn$_invoke$arity$variadic(G__19009,G__19010,seq19008__$2);
});
jayq.core.off = (function jayq$core$off(var_args){
var args__5626__auto__ = [];
var len__5619__auto___19021 = arguments.length;
var i__5620__auto___19022 = (0);
while(true){
if((i__5620__auto___19022 < len__5619__auto___19021)){
args__5626__auto__.push((arguments[i__5620__auto___19022]));

var G__19023 = (i__5620__auto___19022 + (1));
i__5620__auto___19022 = G__19023;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((2) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((2)),(0))):null);
return jayq.core.off.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5627__auto__);
});

jayq.core.off.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,events,p__19019){
var vec__19020 = p__19019;
var sel = cljs.core.nth.call(null,vec__19020,(0),null);
var handler = cljs.core.nth.call(null,vec__19020,(1),null);
return $elem.off(jayq.core.__GT_event.call(null,events),jayq.core.__GT_selector.call(null,sel),handler);
});

jayq.core.off.cljs$lang$maxFixedArity = (2);

jayq.core.off.cljs$lang$applyTo = (function (seq19016){
var G__19017 = cljs.core.first.call(null,seq19016);
var seq19016__$1 = cljs.core.next.call(null,seq19016);
var G__19018 = cljs.core.first.call(null,seq19016__$1);
var seq19016__$2 = cljs.core.next.call(null,seq19016__$1);
return jayq.core.off.cljs$core$IFn$_invoke$arity$variadic(G__19017,G__19018,seq19016__$2);
});
jayq.core.prevent = (function jayq$core$prevent(e){
return e.preventDefault();
});
jayq.core.height = (function jayq$core$height(var_args){
var args19024 = [];
var len__5619__auto___19027 = arguments.length;
var i__5620__auto___19028 = (0);
while(true){
if((i__5620__auto___19028 < len__5619__auto___19027)){
args19024.push((arguments[i__5620__auto___19028]));

var G__19029 = (i__5620__auto___19028 + (1));
i__5620__auto___19028 = G__19029;
continue;
} else {
}
break;
}

var G__19026 = args19024.length;
switch (G__19026) {
case 2:
return jayq.core.height.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.height.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19024.length)].join('')));

}
});

jayq.core.height.cljs$core$IFn$_invoke$arity$2 = (function ($elem,x){
return $elem.height(x);
});

jayq.core.height.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.height();
});

jayq.core.height.cljs$lang$maxFixedArity = 2;
jayq.core.width = (function jayq$core$width(var_args){
var args19031 = [];
var len__5619__auto___19034 = arguments.length;
var i__5620__auto___19035 = (0);
while(true){
if((i__5620__auto___19035 < len__5619__auto___19034)){
args19031.push((arguments[i__5620__auto___19035]));

var G__19036 = (i__5620__auto___19035 + (1));
i__5620__auto___19035 = G__19036;
continue;
} else {
}
break;
}

var G__19033 = args19031.length;
switch (G__19033) {
case 2:
return jayq.core.width.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.width.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19031.length)].join('')));

}
});

jayq.core.width.cljs$core$IFn$_invoke$arity$2 = (function ($elem,x){
return $elem.width(x);
});

jayq.core.width.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.width();
});

jayq.core.width.cljs$lang$maxFixedArity = 2;
jayq.core.inner_height = (function jayq$core$inner_height($elem){
return $elem.innerHeight();
});
jayq.core.inner_width = (function jayq$core$inner_width($elem){
return $elem.innerWidth();
});
jayq.core.outer_height = (function jayq$core$outer_height($elem){
return $elem.outerHeight();
});
jayq.core.outer_width = (function jayq$core$outer_width($elem){
return $elem.outerWidth();
});
jayq.core.offset = (function jayq$core$offset(var_args){
var args19038 = [];
var len__5619__auto___19041 = arguments.length;
var i__5620__auto___19042 = (0);
while(true){
if((i__5620__auto___19042 < len__5619__auto___19041)){
args19038.push((arguments[i__5620__auto___19042]));

var G__19043 = (i__5620__auto___19042 + (1));
i__5620__auto___19042 = G__19043;
continue;
} else {
}
break;
}

var G__19040 = args19038.length;
switch (G__19040) {
case 2:
return jayq.core.offset.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.offset.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19038.length)].join('')));

}
});

jayq.core.offset.cljs$core$IFn$_invoke$arity$2 = (function ($elem,coords){
return cljs.core.clj__GT_js.call(null,coords).offset();
});

jayq.core.offset.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return cljs.core.js__GT_clj.call(null,$elem.offset(),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true);
});

jayq.core.offset.cljs$lang$maxFixedArity = 2;
jayq.core.offset_parent = (function jayq$core$offset_parent($elem){
return $elem.offsetParent();
});
jayq.core.position = (function jayq$core$position($elem){
return cljs.core.js__GT_clj.call(null,$elem.position(),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true);
});
jayq.core.scroll_left = (function jayq$core$scroll_left(var_args){
var args19045 = [];
var len__5619__auto___19048 = arguments.length;
var i__5620__auto___19049 = (0);
while(true){
if((i__5620__auto___19049 < len__5619__auto___19048)){
args19045.push((arguments[i__5620__auto___19049]));

var G__19050 = (i__5620__auto___19049 + (1));
i__5620__auto___19049 = G__19050;
continue;
} else {
}
break;
}

var G__19047 = args19045.length;
switch (G__19047) {
case 1:
return jayq.core.scroll_left.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.scroll_left.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19045.length)].join('')));

}
});

jayq.core.scroll_left.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.scrollLeft();
});

jayq.core.scroll_left.cljs$core$IFn$_invoke$arity$2 = (function ($elem,x){
return $elem.scrollLeft(x);
});

jayq.core.scroll_left.cljs$lang$maxFixedArity = 2;
jayq.core.scroll_top = (function jayq$core$scroll_top(var_args){
var args19052 = [];
var len__5619__auto___19055 = arguments.length;
var i__5620__auto___19056 = (0);
while(true){
if((i__5620__auto___19056 < len__5619__auto___19055)){
args19052.push((arguments[i__5620__auto___19056]));

var G__19057 = (i__5620__auto___19056 + (1));
i__5620__auto___19056 = G__19057;
continue;
} else {
}
break;
}

var G__19054 = args19052.length;
switch (G__19054) {
case 1:
return jayq.core.scroll_top.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.scroll_top.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19052.length)].join('')));

}
});

jayq.core.scroll_top.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.scrollTop();
});

jayq.core.scroll_top.cljs$core$IFn$_invoke$arity$2 = (function ($elem,x){
return $elem.scrollTop(x);
});

jayq.core.scroll_top.cljs$lang$maxFixedArity = 2;
jayq.core.$deferred = jQuery.Deferred;
jayq.core.$when = jQuery.when;
jayq.core.then = (function jayq$core$then(var_args){
var args19059 = [];
var len__5619__auto___19062 = arguments.length;
var i__5620__auto___19063 = (0);
while(true){
if((i__5620__auto___19063 < len__5619__auto___19062)){
args19059.push((arguments[i__5620__auto___19063]));

var G__19064 = (i__5620__auto___19063 + (1));
i__5620__auto___19063 = G__19064;
continue;
} else {
}
break;
}

var G__19061 = args19059.length;
switch (G__19061) {
case 3:
return jayq.core.then.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return jayq.core.then.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19059.length)].join('')));

}
});

jayq.core.then.cljs$core$IFn$_invoke$arity$3 = (function (deferred,done_fn,fail_fn){
return deferred.then(cljs.core.clj__GT_js.call(null,done_fn),cljs.core.clj__GT_js.call(null,fail_fn));
});

jayq.core.then.cljs$core$IFn$_invoke$arity$4 = (function (deferred,done_fn,fail_fn,progress_fn){
return deferred.then(cljs.core.clj__GT_js.call(null,done_fn),cljs.core.clj__GT_js.call(null,fail_fn),cljs.core.clj__GT_js.call(null,progress_fn));
});

jayq.core.then.cljs$lang$maxFixedArity = 4;
jayq.core.done = (function jayq$core$done(var_args){
var args__5626__auto__ = [];
var len__5619__auto___19068 = arguments.length;
var i__5620__auto___19069 = (0);
while(true){
if((i__5620__auto___19069 < len__5619__auto___19068)){
args__5626__auto__.push((arguments[i__5620__auto___19069]));

var G__19070 = (i__5620__auto___19069 + (1));
i__5620__auto___19069 = G__19070;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return jayq.core.done.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

jayq.core.done.cljs$core$IFn$_invoke$arity$variadic = (function (deferred,fns_args){
return deferred.done.apply(deferred,cljs.core.clj__GT_js.call(null,fns_args));
});

jayq.core.done.cljs$lang$maxFixedArity = (1);

jayq.core.done.cljs$lang$applyTo = (function (seq19066){
var G__19067 = cljs.core.first.call(null,seq19066);
var seq19066__$1 = cljs.core.next.call(null,seq19066);
return jayq.core.done.cljs$core$IFn$_invoke$arity$variadic(G__19067,seq19066__$1);
});
jayq.core.fail = (function jayq$core$fail(var_args){
var args__5626__auto__ = [];
var len__5619__auto___19073 = arguments.length;
var i__5620__auto___19074 = (0);
while(true){
if((i__5620__auto___19074 < len__5619__auto___19073)){
args__5626__auto__.push((arguments[i__5620__auto___19074]));

var G__19075 = (i__5620__auto___19074 + (1));
i__5620__auto___19074 = G__19075;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return jayq.core.fail.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

jayq.core.fail.cljs$core$IFn$_invoke$arity$variadic = (function (deferred,fns_args){
return deferred.fail.apply(deferred,cljs.core.clj__GT_js.call(null,fns_args));
});

jayq.core.fail.cljs$lang$maxFixedArity = (1);

jayq.core.fail.cljs$lang$applyTo = (function (seq19071){
var G__19072 = cljs.core.first.call(null,seq19071);
var seq19071__$1 = cljs.core.next.call(null,seq19071);
return jayq.core.fail.cljs$core$IFn$_invoke$arity$variadic(G__19072,seq19071__$1);
});
jayq.core.progress = (function jayq$core$progress(deferred,fns_args){
return deferred.progress(cljs.core.clj__GT_js.call(null,fns_args));
});
jayq.core.promise = (function jayq$core$promise(var_args){
var args19076 = [];
var len__5619__auto___19079 = arguments.length;
var i__5620__auto___19080 = (0);
while(true){
if((i__5620__auto___19080 < len__5619__auto___19079)){
args19076.push((arguments[i__5620__auto___19080]));

var G__19081 = (i__5620__auto___19080 + (1));
i__5620__auto___19080 = G__19081;
continue;
} else {
}
break;
}

var G__19078 = args19076.length;
switch (G__19078) {
case 1:
return jayq.core.promise.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.promise.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return jayq.core.promise.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19076.length)].join('')));

}
});

jayq.core.promise.cljs$core$IFn$_invoke$arity$1 = (function (deferred){
return deferred.promise();
});

jayq.core.promise.cljs$core$IFn$_invoke$arity$2 = (function (deferred,type){
return deferred.promise(type);
});

jayq.core.promise.cljs$core$IFn$_invoke$arity$3 = (function (deferred,type,target){
return deferred.promise(type,target);
});

jayq.core.promise.cljs$lang$maxFixedArity = 3;
jayq.core.always = (function jayq$core$always(var_args){
var args__5626__auto__ = [];
var len__5619__auto___19085 = arguments.length;
var i__5620__auto___19086 = (0);
while(true){
if((i__5620__auto___19086 < len__5619__auto___19085)){
args__5626__auto__.push((arguments[i__5620__auto___19086]));

var G__19087 = (i__5620__auto___19086 + (1));
i__5620__auto___19086 = G__19087;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return jayq.core.always.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

jayq.core.always.cljs$core$IFn$_invoke$arity$variadic = (function (deferred,fns_args){
return deferred.always.apply(deferred,cljs.core.clj__GT_js.call(null,fns_args));
});

jayq.core.always.cljs$lang$maxFixedArity = (1);

jayq.core.always.cljs$lang$applyTo = (function (seq19083){
var G__19084 = cljs.core.first.call(null,seq19083);
var seq19083__$1 = cljs.core.next.call(null,seq19083);
return jayq.core.always.cljs$core$IFn$_invoke$arity$variadic(G__19084,seq19083__$1);
});
jayq.core.reject = (function jayq$core$reject(deferred,args){
return deferred.reject(args);
});
jayq.core.reject_with = (function jayq$core$reject_with(deferred,context,args){
return deferred.rejectWith(context,args);
});
jayq.core.notify = (function jayq$core$notify(deferred,args){
return deferred.notify(args);
});
jayq.core.notify_with = (function jayq$core$notify_with(deferred,context,args){
return deferred.notifyWith(context,args);
});
jayq.core.resolve = (function jayq$core$resolve(deferred,args){
return deferred.resolve(args);
});
jayq.core.resolve_with = (function jayq$core$resolve_with(deferred,context,args){
return deferred.resolveWith(context,args);
});
jayq.core.pipe = (function jayq$core$pipe(var_args){
var args19088 = [];
var len__5619__auto___19091 = arguments.length;
var i__5620__auto___19092 = (0);
while(true){
if((i__5620__auto___19092 < len__5619__auto___19091)){
args19088.push((arguments[i__5620__auto___19092]));

var G__19093 = (i__5620__auto___19092 + (1));
i__5620__auto___19092 = G__19093;
continue;
} else {
}
break;
}

var G__19090 = args19088.length;
switch (G__19090) {
case 2:
return jayq.core.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return jayq.core.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return jayq.core.pipe.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19088.length)].join('')));

}
});

jayq.core.pipe.cljs$core$IFn$_invoke$arity$2 = (function (deferred,done_filter){
return deferred.pipe(done_filter);
});

jayq.core.pipe.cljs$core$IFn$_invoke$arity$3 = (function (deferred,done_filter,fail_filter){
return deferred.pipe(done_filter,fail_filter);
});

jayq.core.pipe.cljs$core$IFn$_invoke$arity$4 = (function (deferred,done_filter,fail_filter,progress_filter){
return deferred.pipe(done_filter,fail_filter,progress_filter);
});

jayq.core.pipe.cljs$lang$maxFixedArity = 4;
jayq.core.state = (function jayq$core$state(deferred){
return cljs.core.keyword.call(null,deferred.state());
});
jayq.core.deferred_m = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"return","return",-1891502105),jayq.core.$when,new cljs.core.Keyword(null,"bind","bind",-113428417),(function (x,f){
var dfd = jayq.core.$deferred.call(null);
jayq.core.done.call(null,x,((function (dfd){
return (function (v){
return jayq.core.done.call(null,f.call(null,v),cljs.core.partial.call(null,jayq.core.resolve,dfd));
});})(dfd))
);

return jayq.core.promise.call(null,dfd);
}),new cljs.core.Keyword(null,"zero","zero",-858964576),cljs.core.identity], null);
jayq.core.ajax_m = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"return","return",-1891502105),cljs.core.identity,new cljs.core.Keyword(null,"bind","bind",-113428417),(function (x,f){
return jayq.core.done.call(null,jayq.core.ajax.call(null,x),f);
}),new cljs.core.Keyword(null,"zero","zero",-858964576),cljs.core.identity], null);

//# sourceMappingURL=core.js.map