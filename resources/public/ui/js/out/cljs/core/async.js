// Compiled by ClojureScript 1.7.122 {}
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(f){
if(typeof cljs.core.async.t_cljs$core$async15932 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async15932 = (function (fn_handler,f,meta15933){
this.fn_handler = fn_handler;
this.f = f;
this.meta15933 = meta15933;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async15932.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15934,meta15933__$1){
var self__ = this;
var _15934__$1 = this;
return (new cljs.core.async.t_cljs$core$async15932(self__.fn_handler,self__.f,meta15933__$1));
});

cljs.core.async.t_cljs$core$async15932.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15934){
var self__ = this;
var _15934__$1 = this;
return self__.meta15933;
});

cljs.core.async.t_cljs$core$async15932.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async15932.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async15932.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t_cljs$core$async15932.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"fn-handler","fn-handler",648785851,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null)], null)))], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"meta15933","meta15933",-1436749628,null)], null);
});

cljs.core.async.t_cljs$core$async15932.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async15932.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async15932";

cljs.core.async.t_cljs$core$async15932.cljs$lang$ctorPrWriter = (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"cljs.core.async/t_cljs$core$async15932");
});

cljs.core.async.__GT_t_cljs$core$async15932 = (function cljs$core$async$fn_handler_$___GT_t_cljs$core$async15932(fn_handler__$1,f__$1,meta15933){
return (new cljs.core.async.t_cljs$core$async15932(fn_handler__$1,f__$1,meta15933));
});

}

return (new cljs.core.async.t_cljs$core$async15932(cljs$core$async$fn_handler,f,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if(!((buff == null))){
if((false) || (buff.cljs$core$async$impl$protocols$UnblockingBuffer$)){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var args15937 = [];
var len__5619__auto___15940 = arguments.length;
var i__5620__auto___15941 = (0);
while(true){
if((i__5620__auto___15941 < len__5619__auto___15940)){
args15937.push((arguments[i__5620__auto___15941]));

var G__15942 = (i__5620__auto___15941 + (1));
i__5620__auto___15941 = G__15942;
continue;
} else {
}
break;
}

var G__15939 = args15937.length;
switch (G__15939) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15937.length)].join('')));

}
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.call(null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.call(null,buf_or_n,null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.call(null,buf_or_n,xform,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("buffer must be supplied when transducer is"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,new cljs.core.Symbol(null,"buf-or-n","buf-or-n",-1646815050,null)))].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
});

cljs.core.async.chan.cljs$lang$maxFixedArity = 3;
/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var args15944 = [];
var len__5619__auto___15947 = arguments.length;
var i__5620__auto___15948 = (0);
while(true){
if((i__5620__auto___15948 < len__5619__auto___15947)){
args15944.push((arguments[i__5620__auto___15948]));

var G__15949 = (i__5620__auto___15948 + (1));
i__5620__auto___15948 = G__15949;
continue;
} else {
}
break;
}

var G__15946 = args15944.length;
switch (G__15946) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15944.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_15951 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_15951);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_15951,ret){
return (function (){
return fn1.call(null,val_15951);
});})(val_15951,ret))
);
}
} else {
}

return null;
});

cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3;
cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.call(null,cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn0 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn0 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var args15952 = [];
var len__5619__auto___15955 = arguments.length;
var i__5620__auto___15956 = (0);
while(true){
if((i__5620__auto___15956 < len__5619__auto___15955)){
args15952.push((arguments[i__5620__auto___15956]));

var G__15957 = (i__5620__auto___15956 + (1));
i__5620__auto___15956 = G__15957;
continue;
} else {
}
break;
}

var G__15954 = args15952.length;
switch (G__15954) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15952.length)].join('')));

}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__4423__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__4423__auto__)){
var ret = temp__4423__auto__;
return cljs.core.deref.call(null,ret);
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.call(null,port,val,fn1,true);
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__4423__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(temp__4423__auto__)){
var retb = temp__4423__auto__;
var ret = cljs.core.deref.call(null,retb);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,ret);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (ret,retb,temp__4423__auto__){
return (function (){
return fn1.call(null,ret);
});})(ret,retb,temp__4423__auto__))
);
}

return ret;
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4;
cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__5464__auto___15959 = n;
var x_15960 = (0);
while(true){
if((x_15960 < n__5464__auto___15959)){
(a[x_15960] = (0));

var G__15961 = (x_15960 + (1));
x_15960 = G__15961;
continue;
} else {
}
break;
}

var i = (1);
while(true){
if(cljs.core._EQ_.call(null,i,n)){
return a;
} else {
var j = cljs.core.rand_int.call(null,i);
(a[i] = (a[j]));

(a[j] = i);

var G__15962 = (i + (1));
i = G__15962;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if(typeof cljs.core.async.t_cljs$core$async15966 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async15966 = (function (alt_flag,flag,meta15967){
this.alt_flag = alt_flag;
this.flag = flag;
this.meta15967 = meta15967;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async15966.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_15968,meta15967__$1){
var self__ = this;
var _15968__$1 = this;
return (new cljs.core.async.t_cljs$core$async15966(self__.alt_flag,self__.flag,meta15967__$1));
});})(flag))
;

cljs.core.async.t_cljs$core$async15966.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_15968){
var self__ = this;
var _15968__$1 = this;
return self__.meta15967;
});})(flag))
;

cljs.core.async.t_cljs$core$async15966.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async15966.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t_cljs$core$async15966.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async15966.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-flag","alt-flag",-1794972754,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(cljs.core.PersistentVector.EMPTY))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta15967","meta15967",-1984552529,null)], null);
});})(flag))
;

cljs.core.async.t_cljs$core$async15966.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async15966.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async15966";

cljs.core.async.t_cljs$core$async15966.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"cljs.core.async/t_cljs$core$async15966");
});})(flag))
;

cljs.core.async.__GT_t_cljs$core$async15966 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async15966(alt_flag__$1,flag__$1,meta15967){
return (new cljs.core.async.t_cljs$core$async15966(alt_flag__$1,flag__$1,meta15967));
});})(flag))
;

}

return (new cljs.core.async.t_cljs$core$async15966(cljs$core$async$alt_flag,flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t_cljs$core$async15972 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async15972 = (function (alt_handler,flag,cb,meta15973){
this.alt_handler = alt_handler;
this.flag = flag;
this.cb = cb;
this.meta15973 = meta15973;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async15972.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15974,meta15973__$1){
var self__ = this;
var _15974__$1 = this;
return (new cljs.core.async.t_cljs$core$async15972(self__.alt_handler,self__.flag,self__.cb,meta15973__$1));
});

cljs.core.async.t_cljs$core$async15972.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15974){
var self__ = this;
var _15974__$1 = this;
return self__.meta15973;
});

cljs.core.async.t_cljs$core$async15972.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async15972.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t_cljs$core$async15972.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t_cljs$core$async15972.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-handler","alt-handler",963786170,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null)], null)))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta15973","meta15973",-1325563491,null)], null);
});

cljs.core.async.t_cljs$core$async15972.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async15972.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async15972";

cljs.core.async.t_cljs$core$async15972.cljs$lang$ctorPrWriter = (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"cljs.core.async/t_cljs$core$async15972");
});

cljs.core.async.__GT_t_cljs$core$async15972 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async15972(alt_handler__$1,flag__$1,cb__$1,meta15973){
return (new cljs.core.async.t_cljs$core$async15972(alt_handler__$1,flag__$1,cb__$1,meta15973));
});

}

return (new cljs.core.async.t_cljs$core$async15972(cljs$core$async$alt_handler,flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
var flag = cljs.core.async.alt_flag.call(null);
var n = cljs.core.count.call(null,ports);
var idxs = cljs.core.async.random_array.call(null,n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.call(null,ports,idx);
var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));
return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__15975_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__15975_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__15976_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__15976_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__4561__auto__ = wport;
if(cljs.core.truth_(or__4561__auto__)){
return or__4561__auto__;
} else {
return port;
}
})()], null));
} else {
var G__15977 = (i + (1));
i = G__15977;
continue;
}
} else {
return null;
}
break;
}
})();
var or__4561__auto__ = ret;
if(cljs.core.truth_(or__4561__auto__)){
return or__4561__auto__;
} else {
if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__4425__auto__ = (function (){var and__4549__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);
if(cljs.core.truth_(and__4549__auto__)){
return cljs.core.async.impl.protocols.commit.call(null,flag);
} else {
return and__4549__auto__;
}
})();
if(cljs.core.truth_(temp__4425__auto__)){
var got = temp__4425__auto__;
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__5626__auto__ = [];
var len__5619__auto___15983 = arguments.length;
var i__5620__auto___15984 = (0);
while(true){
if((i__5620__auto___15984 < len__5619__auto___15983)){
args__5626__auto__.push((arguments[i__5620__auto___15984]));

var G__15985 = (i__5620__auto___15984 + (1));
i__5620__auto___15984 = G__15985;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((1) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((1)),(0))):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5627__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__15980){
var map__15981 = p__15980;
var map__15981__$1 = ((((!((map__15981 == null)))?((((map__15981.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15981.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15981):map__15981);
var opts = map__15981__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq15978){
var G__15979 = cljs.core.first.call(null,seq15978);
var seq15978__$1 = cljs.core.next.call(null,seq15978);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__15979,seq15978__$1);
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var args15986 = [];
var len__5619__auto___16036 = arguments.length;
var i__5620__auto___16037 = (0);
while(true){
if((i__5620__auto___16037 < len__5619__auto___16036)){
args15986.push((arguments[i__5620__auto___16037]));

var G__16038 = (i__5620__auto___16037 + (1));
i__5620__auto___16037 = G__16038;
continue;
} else {
}
break;
}

var G__15988 = args15986.length;
switch (G__15988) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15986.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__8054__auto___16040 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto___16040){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto___16040){
return (function (state_16012){
var state_val_16013 = (state_16012[(1)]);
if((state_val_16013 === (7))){
var inst_16008 = (state_16012[(2)]);
var state_16012__$1 = state_16012;
var statearr_16014_16041 = state_16012__$1;
(statearr_16014_16041[(2)] = inst_16008);

(statearr_16014_16041[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16013 === (1))){
var state_16012__$1 = state_16012;
var statearr_16015_16042 = state_16012__$1;
(statearr_16015_16042[(2)] = null);

(statearr_16015_16042[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16013 === (4))){
var inst_15991 = (state_16012[(7)]);
var inst_15991__$1 = (state_16012[(2)]);
var inst_15992 = (inst_15991__$1 == null);
var state_16012__$1 = (function (){var statearr_16016 = state_16012;
(statearr_16016[(7)] = inst_15991__$1);

return statearr_16016;
})();
if(cljs.core.truth_(inst_15992)){
var statearr_16017_16043 = state_16012__$1;
(statearr_16017_16043[(1)] = (5));

} else {
var statearr_16018_16044 = state_16012__$1;
(statearr_16018_16044[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16013 === (13))){
var state_16012__$1 = state_16012;
var statearr_16019_16045 = state_16012__$1;
(statearr_16019_16045[(2)] = null);

(statearr_16019_16045[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16013 === (6))){
var inst_15991 = (state_16012[(7)]);
var state_16012__$1 = state_16012;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_16012__$1,(11),to,inst_15991);
} else {
if((state_val_16013 === (3))){
var inst_16010 = (state_16012[(2)]);
var state_16012__$1 = state_16012;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16012__$1,inst_16010);
} else {
if((state_val_16013 === (12))){
var state_16012__$1 = state_16012;
var statearr_16020_16046 = state_16012__$1;
(statearr_16020_16046[(2)] = null);

(statearr_16020_16046[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16013 === (2))){
var state_16012__$1 = state_16012;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16012__$1,(4),from);
} else {
if((state_val_16013 === (11))){
var inst_16001 = (state_16012[(2)]);
var state_16012__$1 = state_16012;
if(cljs.core.truth_(inst_16001)){
var statearr_16021_16047 = state_16012__$1;
(statearr_16021_16047[(1)] = (12));

} else {
var statearr_16022_16048 = state_16012__$1;
(statearr_16022_16048[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16013 === (9))){
var state_16012__$1 = state_16012;
var statearr_16023_16049 = state_16012__$1;
(statearr_16023_16049[(2)] = null);

(statearr_16023_16049[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16013 === (5))){
var state_16012__$1 = state_16012;
if(cljs.core.truth_(close_QMARK_)){
var statearr_16024_16050 = state_16012__$1;
(statearr_16024_16050[(1)] = (8));

} else {
var statearr_16025_16051 = state_16012__$1;
(statearr_16025_16051[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16013 === (14))){
var inst_16006 = (state_16012[(2)]);
var state_16012__$1 = state_16012;
var statearr_16026_16052 = state_16012__$1;
(statearr_16026_16052[(2)] = inst_16006);

(statearr_16026_16052[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16013 === (10))){
var inst_15998 = (state_16012[(2)]);
var state_16012__$1 = state_16012;
var statearr_16027_16053 = state_16012__$1;
(statearr_16027_16053[(2)] = inst_15998);

(statearr_16027_16053[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16013 === (8))){
var inst_15995 = cljs.core.async.close_BANG_.call(null,to);
var state_16012__$1 = state_16012;
var statearr_16028_16054 = state_16012__$1;
(statearr_16028_16054[(2)] = inst_15995);

(statearr_16028_16054[(1)] = (10));


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
});})(c__8054__auto___16040))
;
return ((function (switch__7989__auto__,c__8054__auto___16040){
return (function() {
var cljs$core$async$state_machine__7990__auto__ = null;
var cljs$core$async$state_machine__7990__auto____0 = (function (){
var statearr_16032 = [null,null,null,null,null,null,null,null];
(statearr_16032[(0)] = cljs$core$async$state_machine__7990__auto__);

(statearr_16032[(1)] = (1));

return statearr_16032;
});
var cljs$core$async$state_machine__7990__auto____1 = (function (state_16012){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_16012);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e16033){if((e16033 instanceof Object)){
var ex__7993__auto__ = e16033;
var statearr_16034_16055 = state_16012;
(statearr_16034_16055[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16012);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e16033;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16056 = state_16012;
state_16012 = G__16056;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$state_machine__7990__auto__ = function(state_16012){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__7990__auto____1.call(this,state_16012);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__7990__auto____0;
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__7990__auto____1;
return cljs$core$async$state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto___16040))
})();
var state__8056__auto__ = (function (){var statearr_16035 = f__8055__auto__.call(null);
(statearr_16035[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto___16040);

return statearr_16035;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto___16040))
);


return to;
});

cljs.core.async.pipe.cljs$lang$maxFixedArity = 3;
cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"pos?","pos?",-244377722,null),new cljs.core.Symbol(null,"n","n",-2092305744,null))))].join('')));
}

var jobs = cljs.core.async.chan.call(null,n);
var results = cljs.core.async.chan.call(null,n);
var process = ((function (jobs,results){
return (function (p__16240){
var vec__16241 = p__16240;
var v = cljs.core.nth.call(null,vec__16241,(0),null);
var p = cljs.core.nth.call(null,vec__16241,(1),null);
var job = vec__16241;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__8054__auto___16423 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto___16423,res,vec__16241,v,p,job,jobs,results){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto___16423,res,vec__16241,v,p,job,jobs,results){
return (function (state_16246){
var state_val_16247 = (state_16246[(1)]);
if((state_val_16247 === (1))){
var state_16246__$1 = state_16246;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_16246__$1,(2),res,v);
} else {
if((state_val_16247 === (2))){
var inst_16243 = (state_16246[(2)]);
var inst_16244 = cljs.core.async.close_BANG_.call(null,res);
var state_16246__$1 = (function (){var statearr_16248 = state_16246;
(statearr_16248[(7)] = inst_16243);

return statearr_16248;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16246__$1,inst_16244);
} else {
return null;
}
}
});})(c__8054__auto___16423,res,vec__16241,v,p,job,jobs,results))
;
return ((function (switch__7989__auto__,c__8054__auto___16423,res,vec__16241,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____0 = (function (){
var statearr_16252 = [null,null,null,null,null,null,null,null];
(statearr_16252[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__);

(statearr_16252[(1)] = (1));

return statearr_16252;
});
var cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____1 = (function (state_16246){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_16246);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e16253){if((e16253 instanceof Object)){
var ex__7993__auto__ = e16253;
var statearr_16254_16424 = state_16246;
(statearr_16254_16424[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16246);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e16253;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16425 = state_16246;
state_16246 = G__16425;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__ = function(state_16246){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____1.call(this,state_16246);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto___16423,res,vec__16241,v,p,job,jobs,results))
})();
var state__8056__auto__ = (function (){var statearr_16255 = f__8055__auto__.call(null);
(statearr_16255[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto___16423);

return statearr_16255;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto___16423,res,vec__16241,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__16256){
var vec__16257 = p__16256;
var v = cljs.core.nth.call(null,vec__16257,(0),null);
var p = cljs.core.nth.call(null,vec__16257,(1),null);
var job = vec__16257;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1));
xf.call(null,v,res);

cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results,process))
;
var n__5464__auto___16426 = n;
var __16427 = (0);
while(true){
if((__16427 < n__5464__auto___16426)){
var G__16258_16428 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__16258_16428) {
case "compute":
var c__8054__auto___16430 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__16427,c__8054__auto___16430,G__16258_16428,n__5464__auto___16426,jobs,results,process,async){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (__16427,c__8054__auto___16430,G__16258_16428,n__5464__auto___16426,jobs,results,process,async){
return (function (state_16271){
var state_val_16272 = (state_16271[(1)]);
if((state_val_16272 === (1))){
var state_16271__$1 = state_16271;
var statearr_16273_16431 = state_16271__$1;
(statearr_16273_16431[(2)] = null);

(statearr_16273_16431[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16272 === (2))){
var state_16271__$1 = state_16271;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16271__$1,(4),jobs);
} else {
if((state_val_16272 === (3))){
var inst_16269 = (state_16271[(2)]);
var state_16271__$1 = state_16271;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16271__$1,inst_16269);
} else {
if((state_val_16272 === (4))){
var inst_16261 = (state_16271[(2)]);
var inst_16262 = process.call(null,inst_16261);
var state_16271__$1 = state_16271;
if(cljs.core.truth_(inst_16262)){
var statearr_16274_16432 = state_16271__$1;
(statearr_16274_16432[(1)] = (5));

} else {
var statearr_16275_16433 = state_16271__$1;
(statearr_16275_16433[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16272 === (5))){
var state_16271__$1 = state_16271;
var statearr_16276_16434 = state_16271__$1;
(statearr_16276_16434[(2)] = null);

(statearr_16276_16434[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16272 === (6))){
var state_16271__$1 = state_16271;
var statearr_16277_16435 = state_16271__$1;
(statearr_16277_16435[(2)] = null);

(statearr_16277_16435[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16272 === (7))){
var inst_16267 = (state_16271[(2)]);
var state_16271__$1 = state_16271;
var statearr_16278_16436 = state_16271__$1;
(statearr_16278_16436[(2)] = inst_16267);

(statearr_16278_16436[(1)] = (3));


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
});})(__16427,c__8054__auto___16430,G__16258_16428,n__5464__auto___16426,jobs,results,process,async))
;
return ((function (__16427,switch__7989__auto__,c__8054__auto___16430,G__16258_16428,n__5464__auto___16426,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____0 = (function (){
var statearr_16282 = [null,null,null,null,null,null,null];
(statearr_16282[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__);

(statearr_16282[(1)] = (1));

return statearr_16282;
});
var cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____1 = (function (state_16271){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_16271);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e16283){if((e16283 instanceof Object)){
var ex__7993__auto__ = e16283;
var statearr_16284_16437 = state_16271;
(statearr_16284_16437[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16271);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e16283;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16438 = state_16271;
state_16271 = G__16438;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__ = function(state_16271){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____1.call(this,state_16271);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__;
})()
;})(__16427,switch__7989__auto__,c__8054__auto___16430,G__16258_16428,n__5464__auto___16426,jobs,results,process,async))
})();
var state__8056__auto__ = (function (){var statearr_16285 = f__8055__auto__.call(null);
(statearr_16285[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto___16430);

return statearr_16285;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(__16427,c__8054__auto___16430,G__16258_16428,n__5464__auto___16426,jobs,results,process,async))
);


break;
case "async":
var c__8054__auto___16439 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__16427,c__8054__auto___16439,G__16258_16428,n__5464__auto___16426,jobs,results,process,async){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (__16427,c__8054__auto___16439,G__16258_16428,n__5464__auto___16426,jobs,results,process,async){
return (function (state_16298){
var state_val_16299 = (state_16298[(1)]);
if((state_val_16299 === (1))){
var state_16298__$1 = state_16298;
var statearr_16300_16440 = state_16298__$1;
(statearr_16300_16440[(2)] = null);

(statearr_16300_16440[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16299 === (2))){
var state_16298__$1 = state_16298;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16298__$1,(4),jobs);
} else {
if((state_val_16299 === (3))){
var inst_16296 = (state_16298[(2)]);
var state_16298__$1 = state_16298;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16298__$1,inst_16296);
} else {
if((state_val_16299 === (4))){
var inst_16288 = (state_16298[(2)]);
var inst_16289 = async.call(null,inst_16288);
var state_16298__$1 = state_16298;
if(cljs.core.truth_(inst_16289)){
var statearr_16301_16441 = state_16298__$1;
(statearr_16301_16441[(1)] = (5));

} else {
var statearr_16302_16442 = state_16298__$1;
(statearr_16302_16442[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16299 === (5))){
var state_16298__$1 = state_16298;
var statearr_16303_16443 = state_16298__$1;
(statearr_16303_16443[(2)] = null);

(statearr_16303_16443[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16299 === (6))){
var state_16298__$1 = state_16298;
var statearr_16304_16444 = state_16298__$1;
(statearr_16304_16444[(2)] = null);

(statearr_16304_16444[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16299 === (7))){
var inst_16294 = (state_16298[(2)]);
var state_16298__$1 = state_16298;
var statearr_16305_16445 = state_16298__$1;
(statearr_16305_16445[(2)] = inst_16294);

(statearr_16305_16445[(1)] = (3));


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
});})(__16427,c__8054__auto___16439,G__16258_16428,n__5464__auto___16426,jobs,results,process,async))
;
return ((function (__16427,switch__7989__auto__,c__8054__auto___16439,G__16258_16428,n__5464__auto___16426,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____0 = (function (){
var statearr_16309 = [null,null,null,null,null,null,null];
(statearr_16309[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__);

(statearr_16309[(1)] = (1));

return statearr_16309;
});
var cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____1 = (function (state_16298){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_16298);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e16310){if((e16310 instanceof Object)){
var ex__7993__auto__ = e16310;
var statearr_16311_16446 = state_16298;
(statearr_16311_16446[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16298);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e16310;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16447 = state_16298;
state_16298 = G__16447;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__ = function(state_16298){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____1.call(this,state_16298);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__;
})()
;})(__16427,switch__7989__auto__,c__8054__auto___16439,G__16258_16428,n__5464__auto___16426,jobs,results,process,async))
})();
var state__8056__auto__ = (function (){var statearr_16312 = f__8055__auto__.call(null);
(statearr_16312[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto___16439);

return statearr_16312;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(__16427,c__8054__auto___16439,G__16258_16428,n__5464__auto___16426,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__16448 = (__16427 + (1));
__16427 = G__16448;
continue;
} else {
}
break;
}

var c__8054__auto___16449 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto___16449,jobs,results,process,async){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto___16449,jobs,results,process,async){
return (function (state_16334){
var state_val_16335 = (state_16334[(1)]);
if((state_val_16335 === (1))){
var state_16334__$1 = state_16334;
var statearr_16336_16450 = state_16334__$1;
(statearr_16336_16450[(2)] = null);

(statearr_16336_16450[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16335 === (2))){
var state_16334__$1 = state_16334;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16334__$1,(4),from);
} else {
if((state_val_16335 === (3))){
var inst_16332 = (state_16334[(2)]);
var state_16334__$1 = state_16334;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16334__$1,inst_16332);
} else {
if((state_val_16335 === (4))){
var inst_16315 = (state_16334[(7)]);
var inst_16315__$1 = (state_16334[(2)]);
var inst_16316 = (inst_16315__$1 == null);
var state_16334__$1 = (function (){var statearr_16337 = state_16334;
(statearr_16337[(7)] = inst_16315__$1);

return statearr_16337;
})();
if(cljs.core.truth_(inst_16316)){
var statearr_16338_16451 = state_16334__$1;
(statearr_16338_16451[(1)] = (5));

} else {
var statearr_16339_16452 = state_16334__$1;
(statearr_16339_16452[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16335 === (5))){
var inst_16318 = cljs.core.async.close_BANG_.call(null,jobs);
var state_16334__$1 = state_16334;
var statearr_16340_16453 = state_16334__$1;
(statearr_16340_16453[(2)] = inst_16318);

(statearr_16340_16453[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16335 === (6))){
var inst_16315 = (state_16334[(7)]);
var inst_16320 = (state_16334[(8)]);
var inst_16320__$1 = cljs.core.async.chan.call(null,(1));
var inst_16321 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_16322 = [inst_16315,inst_16320__$1];
var inst_16323 = (new cljs.core.PersistentVector(null,2,(5),inst_16321,inst_16322,null));
var state_16334__$1 = (function (){var statearr_16341 = state_16334;
(statearr_16341[(8)] = inst_16320__$1);

return statearr_16341;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_16334__$1,(8),jobs,inst_16323);
} else {
if((state_val_16335 === (7))){
var inst_16330 = (state_16334[(2)]);
var state_16334__$1 = state_16334;
var statearr_16342_16454 = state_16334__$1;
(statearr_16342_16454[(2)] = inst_16330);

(statearr_16342_16454[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16335 === (8))){
var inst_16320 = (state_16334[(8)]);
var inst_16325 = (state_16334[(2)]);
var state_16334__$1 = (function (){var statearr_16343 = state_16334;
(statearr_16343[(9)] = inst_16325);

return statearr_16343;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_16334__$1,(9),results,inst_16320);
} else {
if((state_val_16335 === (9))){
var inst_16327 = (state_16334[(2)]);
var state_16334__$1 = (function (){var statearr_16344 = state_16334;
(statearr_16344[(10)] = inst_16327);

return statearr_16344;
})();
var statearr_16345_16455 = state_16334__$1;
(statearr_16345_16455[(2)] = null);

(statearr_16345_16455[(1)] = (2));


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
});})(c__8054__auto___16449,jobs,results,process,async))
;
return ((function (switch__7989__auto__,c__8054__auto___16449,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____0 = (function (){
var statearr_16349 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_16349[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__);

(statearr_16349[(1)] = (1));

return statearr_16349;
});
var cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____1 = (function (state_16334){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_16334);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e16350){if((e16350 instanceof Object)){
var ex__7993__auto__ = e16350;
var statearr_16351_16456 = state_16334;
(statearr_16351_16456[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16334);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e16350;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16457 = state_16334;
state_16334 = G__16457;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__ = function(state_16334){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____1.call(this,state_16334);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto___16449,jobs,results,process,async))
})();
var state__8056__auto__ = (function (){var statearr_16352 = f__8055__auto__.call(null);
(statearr_16352[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto___16449);

return statearr_16352;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto___16449,jobs,results,process,async))
);


var c__8054__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto__,jobs,results,process,async){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto__,jobs,results,process,async){
return (function (state_16390){
var state_val_16391 = (state_16390[(1)]);
if((state_val_16391 === (7))){
var inst_16386 = (state_16390[(2)]);
var state_16390__$1 = state_16390;
var statearr_16392_16458 = state_16390__$1;
(statearr_16392_16458[(2)] = inst_16386);

(statearr_16392_16458[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16391 === (20))){
var state_16390__$1 = state_16390;
var statearr_16393_16459 = state_16390__$1;
(statearr_16393_16459[(2)] = null);

(statearr_16393_16459[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16391 === (1))){
var state_16390__$1 = state_16390;
var statearr_16394_16460 = state_16390__$1;
(statearr_16394_16460[(2)] = null);

(statearr_16394_16460[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16391 === (4))){
var inst_16355 = (state_16390[(7)]);
var inst_16355__$1 = (state_16390[(2)]);
var inst_16356 = (inst_16355__$1 == null);
var state_16390__$1 = (function (){var statearr_16395 = state_16390;
(statearr_16395[(7)] = inst_16355__$1);

return statearr_16395;
})();
if(cljs.core.truth_(inst_16356)){
var statearr_16396_16461 = state_16390__$1;
(statearr_16396_16461[(1)] = (5));

} else {
var statearr_16397_16462 = state_16390__$1;
(statearr_16397_16462[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16391 === (15))){
var inst_16368 = (state_16390[(8)]);
var state_16390__$1 = state_16390;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_16390__$1,(18),to,inst_16368);
} else {
if((state_val_16391 === (21))){
var inst_16381 = (state_16390[(2)]);
var state_16390__$1 = state_16390;
var statearr_16398_16463 = state_16390__$1;
(statearr_16398_16463[(2)] = inst_16381);

(statearr_16398_16463[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16391 === (13))){
var inst_16383 = (state_16390[(2)]);
var state_16390__$1 = (function (){var statearr_16399 = state_16390;
(statearr_16399[(9)] = inst_16383);

return statearr_16399;
})();
var statearr_16400_16464 = state_16390__$1;
(statearr_16400_16464[(2)] = null);

(statearr_16400_16464[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16391 === (6))){
var inst_16355 = (state_16390[(7)]);
var state_16390__$1 = state_16390;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16390__$1,(11),inst_16355);
} else {
if((state_val_16391 === (17))){
var inst_16376 = (state_16390[(2)]);
var state_16390__$1 = state_16390;
if(cljs.core.truth_(inst_16376)){
var statearr_16401_16465 = state_16390__$1;
(statearr_16401_16465[(1)] = (19));

} else {
var statearr_16402_16466 = state_16390__$1;
(statearr_16402_16466[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16391 === (3))){
var inst_16388 = (state_16390[(2)]);
var state_16390__$1 = state_16390;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16390__$1,inst_16388);
} else {
if((state_val_16391 === (12))){
var inst_16365 = (state_16390[(10)]);
var state_16390__$1 = state_16390;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16390__$1,(14),inst_16365);
} else {
if((state_val_16391 === (2))){
var state_16390__$1 = state_16390;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16390__$1,(4),results);
} else {
if((state_val_16391 === (19))){
var state_16390__$1 = state_16390;
var statearr_16403_16467 = state_16390__$1;
(statearr_16403_16467[(2)] = null);

(statearr_16403_16467[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16391 === (11))){
var inst_16365 = (state_16390[(2)]);
var state_16390__$1 = (function (){var statearr_16404 = state_16390;
(statearr_16404[(10)] = inst_16365);

return statearr_16404;
})();
var statearr_16405_16468 = state_16390__$1;
(statearr_16405_16468[(2)] = null);

(statearr_16405_16468[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16391 === (9))){
var state_16390__$1 = state_16390;
var statearr_16406_16469 = state_16390__$1;
(statearr_16406_16469[(2)] = null);

(statearr_16406_16469[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16391 === (5))){
var state_16390__$1 = state_16390;
if(cljs.core.truth_(close_QMARK_)){
var statearr_16407_16470 = state_16390__$1;
(statearr_16407_16470[(1)] = (8));

} else {
var statearr_16408_16471 = state_16390__$1;
(statearr_16408_16471[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16391 === (14))){
var inst_16368 = (state_16390[(8)]);
var inst_16370 = (state_16390[(11)]);
var inst_16368__$1 = (state_16390[(2)]);
var inst_16369 = (inst_16368__$1 == null);
var inst_16370__$1 = cljs.core.not.call(null,inst_16369);
var state_16390__$1 = (function (){var statearr_16409 = state_16390;
(statearr_16409[(8)] = inst_16368__$1);

(statearr_16409[(11)] = inst_16370__$1);

return statearr_16409;
})();
if(inst_16370__$1){
var statearr_16410_16472 = state_16390__$1;
(statearr_16410_16472[(1)] = (15));

} else {
var statearr_16411_16473 = state_16390__$1;
(statearr_16411_16473[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16391 === (16))){
var inst_16370 = (state_16390[(11)]);
var state_16390__$1 = state_16390;
var statearr_16412_16474 = state_16390__$1;
(statearr_16412_16474[(2)] = inst_16370);

(statearr_16412_16474[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16391 === (10))){
var inst_16362 = (state_16390[(2)]);
var state_16390__$1 = state_16390;
var statearr_16413_16475 = state_16390__$1;
(statearr_16413_16475[(2)] = inst_16362);

(statearr_16413_16475[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16391 === (18))){
var inst_16373 = (state_16390[(2)]);
var state_16390__$1 = state_16390;
var statearr_16414_16476 = state_16390__$1;
(statearr_16414_16476[(2)] = inst_16373);

(statearr_16414_16476[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16391 === (8))){
var inst_16359 = cljs.core.async.close_BANG_.call(null,to);
var state_16390__$1 = state_16390;
var statearr_16415_16477 = state_16390__$1;
(statearr_16415_16477[(2)] = inst_16359);

(statearr_16415_16477[(1)] = (10));


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
});})(c__8054__auto__,jobs,results,process,async))
;
return ((function (switch__7989__auto__,c__8054__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____0 = (function (){
var statearr_16419 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_16419[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__);

(statearr_16419[(1)] = (1));

return statearr_16419;
});
var cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____1 = (function (state_16390){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_16390);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e16420){if((e16420 instanceof Object)){
var ex__7993__auto__ = e16420;
var statearr_16421_16478 = state_16390;
(statearr_16421_16478[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16390);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e16420;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16479 = state_16390;
state_16390 = G__16479;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__ = function(state_16390){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____1.call(this,state_16390);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__7990__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto__,jobs,results,process,async))
})();
var state__8056__auto__ = (function (){var statearr_16422 = f__8055__auto__.call(null);
(statearr_16422[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto__);

return statearr_16422;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto__,jobs,results,process,async))
);

return c__8054__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). af must close!
 *   the channel before returning.  The presumption is that af will
 *   return immediately, having launched some asynchronous operation
 *   whose completion/callback will manipulate the result channel. Outputs
 *   will be returned in order relative to  the inputs. By default, the to
 *   channel will be closed when the from channel closes, but can be
 *   determined by the close?  parameter. Will stop consuming the from
 *   channel if the to channel closes.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var args16480 = [];
var len__5619__auto___16483 = arguments.length;
var i__5620__auto___16484 = (0);
while(true){
if((i__5620__auto___16484 < len__5619__auto___16483)){
args16480.push((arguments[i__5620__auto___16484]));

var G__16485 = (i__5620__auto___16484 + (1));
i__5620__auto___16484 = G__16485;
continue;
} else {
}
break;
}

var G__16482 = args16480.length;
switch (G__16482) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16480.length)].join('')));

}
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.call(null,n,to,af,from,true);
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_.call(null,n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
});

cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5;
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var args16487 = [];
var len__5619__auto___16490 = arguments.length;
var i__5620__auto___16491 = (0);
while(true){
if((i__5620__auto___16491 < len__5619__auto___16490)){
args16487.push((arguments[i__5620__auto___16491]));

var G__16492 = (i__5620__auto___16491 + (1));
i__5620__auto___16491 = G__16492;
continue;
} else {
}
break;
}

var G__16489 = args16487.length;
switch (G__16489) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16487.length)].join('')));

}
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.call(null,n,to,xf,from,true);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.call(null,n,to,xf,from,close_QMARK_,null);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_.call(null,n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
});

cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6;
/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var args16494 = [];
var len__5619__auto___16547 = arguments.length;
var i__5620__auto___16548 = (0);
while(true){
if((i__5620__auto___16548 < len__5619__auto___16547)){
args16494.push((arguments[i__5620__auto___16548]));

var G__16549 = (i__5620__auto___16548 + (1));
i__5620__auto___16548 = G__16549;
continue;
} else {
}
break;
}

var G__16496 = args16494.length;
switch (G__16496) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16494.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__8054__auto___16551 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto___16551,tc,fc){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto___16551,tc,fc){
return (function (state_16522){
var state_val_16523 = (state_16522[(1)]);
if((state_val_16523 === (7))){
var inst_16518 = (state_16522[(2)]);
var state_16522__$1 = state_16522;
var statearr_16524_16552 = state_16522__$1;
(statearr_16524_16552[(2)] = inst_16518);

(statearr_16524_16552[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16523 === (1))){
var state_16522__$1 = state_16522;
var statearr_16525_16553 = state_16522__$1;
(statearr_16525_16553[(2)] = null);

(statearr_16525_16553[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16523 === (4))){
var inst_16499 = (state_16522[(7)]);
var inst_16499__$1 = (state_16522[(2)]);
var inst_16500 = (inst_16499__$1 == null);
var state_16522__$1 = (function (){var statearr_16526 = state_16522;
(statearr_16526[(7)] = inst_16499__$1);

return statearr_16526;
})();
if(cljs.core.truth_(inst_16500)){
var statearr_16527_16554 = state_16522__$1;
(statearr_16527_16554[(1)] = (5));

} else {
var statearr_16528_16555 = state_16522__$1;
(statearr_16528_16555[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16523 === (13))){
var state_16522__$1 = state_16522;
var statearr_16529_16556 = state_16522__$1;
(statearr_16529_16556[(2)] = null);

(statearr_16529_16556[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16523 === (6))){
var inst_16499 = (state_16522[(7)]);
var inst_16505 = p.call(null,inst_16499);
var state_16522__$1 = state_16522;
if(cljs.core.truth_(inst_16505)){
var statearr_16530_16557 = state_16522__$1;
(statearr_16530_16557[(1)] = (9));

} else {
var statearr_16531_16558 = state_16522__$1;
(statearr_16531_16558[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16523 === (3))){
var inst_16520 = (state_16522[(2)]);
var state_16522__$1 = state_16522;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16522__$1,inst_16520);
} else {
if((state_val_16523 === (12))){
var state_16522__$1 = state_16522;
var statearr_16532_16559 = state_16522__$1;
(statearr_16532_16559[(2)] = null);

(statearr_16532_16559[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16523 === (2))){
var state_16522__$1 = state_16522;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16522__$1,(4),ch);
} else {
if((state_val_16523 === (11))){
var inst_16499 = (state_16522[(7)]);
var inst_16509 = (state_16522[(2)]);
var state_16522__$1 = state_16522;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_16522__$1,(8),inst_16509,inst_16499);
} else {
if((state_val_16523 === (9))){
var state_16522__$1 = state_16522;
var statearr_16533_16560 = state_16522__$1;
(statearr_16533_16560[(2)] = tc);

(statearr_16533_16560[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16523 === (5))){
var inst_16502 = cljs.core.async.close_BANG_.call(null,tc);
var inst_16503 = cljs.core.async.close_BANG_.call(null,fc);
var state_16522__$1 = (function (){var statearr_16534 = state_16522;
(statearr_16534[(8)] = inst_16502);

return statearr_16534;
})();
var statearr_16535_16561 = state_16522__$1;
(statearr_16535_16561[(2)] = inst_16503);

(statearr_16535_16561[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16523 === (14))){
var inst_16516 = (state_16522[(2)]);
var state_16522__$1 = state_16522;
var statearr_16536_16562 = state_16522__$1;
(statearr_16536_16562[(2)] = inst_16516);

(statearr_16536_16562[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16523 === (10))){
var state_16522__$1 = state_16522;
var statearr_16537_16563 = state_16522__$1;
(statearr_16537_16563[(2)] = fc);

(statearr_16537_16563[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16523 === (8))){
var inst_16511 = (state_16522[(2)]);
var state_16522__$1 = state_16522;
if(cljs.core.truth_(inst_16511)){
var statearr_16538_16564 = state_16522__$1;
(statearr_16538_16564[(1)] = (12));

} else {
var statearr_16539_16565 = state_16522__$1;
(statearr_16539_16565[(1)] = (13));

}

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
});})(c__8054__auto___16551,tc,fc))
;
return ((function (switch__7989__auto__,c__8054__auto___16551,tc,fc){
return (function() {
var cljs$core$async$state_machine__7990__auto__ = null;
var cljs$core$async$state_machine__7990__auto____0 = (function (){
var statearr_16543 = [null,null,null,null,null,null,null,null,null];
(statearr_16543[(0)] = cljs$core$async$state_machine__7990__auto__);

(statearr_16543[(1)] = (1));

return statearr_16543;
});
var cljs$core$async$state_machine__7990__auto____1 = (function (state_16522){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_16522);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e16544){if((e16544 instanceof Object)){
var ex__7993__auto__ = e16544;
var statearr_16545_16566 = state_16522;
(statearr_16545_16566[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16522);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e16544;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16567 = state_16522;
state_16522 = G__16567;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$state_machine__7990__auto__ = function(state_16522){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__7990__auto____1.call(this,state_16522);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__7990__auto____0;
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__7990__auto____1;
return cljs$core$async$state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto___16551,tc,fc))
})();
var state__8056__auto__ = (function (){var statearr_16546 = f__8055__auto__.call(null);
(statearr_16546[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto___16551);

return statearr_16546;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto___16551,tc,fc))
);


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});

cljs.core.async.split.cljs$lang$maxFixedArity = 4;
/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__8054__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto__){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto__){
return (function (state_16614){
var state_val_16615 = (state_16614[(1)]);
if((state_val_16615 === (1))){
var inst_16600 = init;
var state_16614__$1 = (function (){var statearr_16616 = state_16614;
(statearr_16616[(7)] = inst_16600);

return statearr_16616;
})();
var statearr_16617_16632 = state_16614__$1;
(statearr_16617_16632[(2)] = null);

(statearr_16617_16632[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16615 === (2))){
var state_16614__$1 = state_16614;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16614__$1,(4),ch);
} else {
if((state_val_16615 === (3))){
var inst_16612 = (state_16614[(2)]);
var state_16614__$1 = state_16614;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16614__$1,inst_16612);
} else {
if((state_val_16615 === (4))){
var inst_16603 = (state_16614[(8)]);
var inst_16603__$1 = (state_16614[(2)]);
var inst_16604 = (inst_16603__$1 == null);
var state_16614__$1 = (function (){var statearr_16618 = state_16614;
(statearr_16618[(8)] = inst_16603__$1);

return statearr_16618;
})();
if(cljs.core.truth_(inst_16604)){
var statearr_16619_16633 = state_16614__$1;
(statearr_16619_16633[(1)] = (5));

} else {
var statearr_16620_16634 = state_16614__$1;
(statearr_16620_16634[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16615 === (5))){
var inst_16600 = (state_16614[(7)]);
var state_16614__$1 = state_16614;
var statearr_16621_16635 = state_16614__$1;
(statearr_16621_16635[(2)] = inst_16600);

(statearr_16621_16635[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16615 === (6))){
var inst_16600 = (state_16614[(7)]);
var inst_16603 = (state_16614[(8)]);
var inst_16607 = f.call(null,inst_16600,inst_16603);
var inst_16600__$1 = inst_16607;
var state_16614__$1 = (function (){var statearr_16622 = state_16614;
(statearr_16622[(7)] = inst_16600__$1);

return statearr_16622;
})();
var statearr_16623_16636 = state_16614__$1;
(statearr_16623_16636[(2)] = null);

(statearr_16623_16636[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16615 === (7))){
var inst_16610 = (state_16614[(2)]);
var state_16614__$1 = state_16614;
var statearr_16624_16637 = state_16614__$1;
(statearr_16624_16637[(2)] = inst_16610);

(statearr_16624_16637[(1)] = (3));


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
});})(c__8054__auto__))
;
return ((function (switch__7989__auto__,c__8054__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__7990__auto__ = null;
var cljs$core$async$reduce_$_state_machine__7990__auto____0 = (function (){
var statearr_16628 = [null,null,null,null,null,null,null,null,null];
(statearr_16628[(0)] = cljs$core$async$reduce_$_state_machine__7990__auto__);

(statearr_16628[(1)] = (1));

return statearr_16628;
});
var cljs$core$async$reduce_$_state_machine__7990__auto____1 = (function (state_16614){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_16614);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e16629){if((e16629 instanceof Object)){
var ex__7993__auto__ = e16629;
var statearr_16630_16638 = state_16614;
(statearr_16630_16638[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16614);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e16629;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16639 = state_16614;
state_16614 = G__16639;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__7990__auto__ = function(state_16614){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__7990__auto____1.call(this,state_16614);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__7990__auto____0;
cljs$core$async$reduce_$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__7990__auto____1;
return cljs$core$async$reduce_$_state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto__))
})();
var state__8056__auto__ = (function (){var statearr_16631 = f__8055__auto__.call(null);
(statearr_16631[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto__);

return statearr_16631;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto__))
);

return c__8054__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var args16640 = [];
var len__5619__auto___16692 = arguments.length;
var i__5620__auto___16693 = (0);
while(true){
if((i__5620__auto___16693 < len__5619__auto___16692)){
args16640.push((arguments[i__5620__auto___16693]));

var G__16694 = (i__5620__auto___16693 + (1));
i__5620__auto___16693 = G__16694;
continue;
} else {
}
break;
}

var G__16642 = args16640.length;
switch (G__16642) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16640.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__8054__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto__){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto__){
return (function (state_16667){
var state_val_16668 = (state_16667[(1)]);
if((state_val_16668 === (7))){
var inst_16649 = (state_16667[(2)]);
var state_16667__$1 = state_16667;
var statearr_16669_16696 = state_16667__$1;
(statearr_16669_16696[(2)] = inst_16649);

(statearr_16669_16696[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16668 === (1))){
var inst_16643 = cljs.core.seq.call(null,coll);
var inst_16644 = inst_16643;
var state_16667__$1 = (function (){var statearr_16670 = state_16667;
(statearr_16670[(7)] = inst_16644);

return statearr_16670;
})();
var statearr_16671_16697 = state_16667__$1;
(statearr_16671_16697[(2)] = null);

(statearr_16671_16697[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16668 === (4))){
var inst_16644 = (state_16667[(7)]);
var inst_16647 = cljs.core.first.call(null,inst_16644);
var state_16667__$1 = state_16667;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_16667__$1,(7),ch,inst_16647);
} else {
if((state_val_16668 === (13))){
var inst_16661 = (state_16667[(2)]);
var state_16667__$1 = state_16667;
var statearr_16672_16698 = state_16667__$1;
(statearr_16672_16698[(2)] = inst_16661);

(statearr_16672_16698[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16668 === (6))){
var inst_16652 = (state_16667[(2)]);
var state_16667__$1 = state_16667;
if(cljs.core.truth_(inst_16652)){
var statearr_16673_16699 = state_16667__$1;
(statearr_16673_16699[(1)] = (8));

} else {
var statearr_16674_16700 = state_16667__$1;
(statearr_16674_16700[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16668 === (3))){
var inst_16665 = (state_16667[(2)]);
var state_16667__$1 = state_16667;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16667__$1,inst_16665);
} else {
if((state_val_16668 === (12))){
var state_16667__$1 = state_16667;
var statearr_16675_16701 = state_16667__$1;
(statearr_16675_16701[(2)] = null);

(statearr_16675_16701[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16668 === (2))){
var inst_16644 = (state_16667[(7)]);
var state_16667__$1 = state_16667;
if(cljs.core.truth_(inst_16644)){
var statearr_16676_16702 = state_16667__$1;
(statearr_16676_16702[(1)] = (4));

} else {
var statearr_16677_16703 = state_16667__$1;
(statearr_16677_16703[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16668 === (11))){
var inst_16658 = cljs.core.async.close_BANG_.call(null,ch);
var state_16667__$1 = state_16667;
var statearr_16678_16704 = state_16667__$1;
(statearr_16678_16704[(2)] = inst_16658);

(statearr_16678_16704[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16668 === (9))){
var state_16667__$1 = state_16667;
if(cljs.core.truth_(close_QMARK_)){
var statearr_16679_16705 = state_16667__$1;
(statearr_16679_16705[(1)] = (11));

} else {
var statearr_16680_16706 = state_16667__$1;
(statearr_16680_16706[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16668 === (5))){
var inst_16644 = (state_16667[(7)]);
var state_16667__$1 = state_16667;
var statearr_16681_16707 = state_16667__$1;
(statearr_16681_16707[(2)] = inst_16644);

(statearr_16681_16707[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16668 === (10))){
var inst_16663 = (state_16667[(2)]);
var state_16667__$1 = state_16667;
var statearr_16682_16708 = state_16667__$1;
(statearr_16682_16708[(2)] = inst_16663);

(statearr_16682_16708[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16668 === (8))){
var inst_16644 = (state_16667[(7)]);
var inst_16654 = cljs.core.next.call(null,inst_16644);
var inst_16644__$1 = inst_16654;
var state_16667__$1 = (function (){var statearr_16683 = state_16667;
(statearr_16683[(7)] = inst_16644__$1);

return statearr_16683;
})();
var statearr_16684_16709 = state_16667__$1;
(statearr_16684_16709[(2)] = null);

(statearr_16684_16709[(1)] = (2));


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
});})(c__8054__auto__))
;
return ((function (switch__7989__auto__,c__8054__auto__){
return (function() {
var cljs$core$async$state_machine__7990__auto__ = null;
var cljs$core$async$state_machine__7990__auto____0 = (function (){
var statearr_16688 = [null,null,null,null,null,null,null,null];
(statearr_16688[(0)] = cljs$core$async$state_machine__7990__auto__);

(statearr_16688[(1)] = (1));

return statearr_16688;
});
var cljs$core$async$state_machine__7990__auto____1 = (function (state_16667){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_16667);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e16689){if((e16689 instanceof Object)){
var ex__7993__auto__ = e16689;
var statearr_16690_16710 = state_16667;
(statearr_16690_16710[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16667);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e16689;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16711 = state_16667;
state_16667 = G__16711;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$state_machine__7990__auto__ = function(state_16667){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__7990__auto____1.call(this,state_16667);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__7990__auto____0;
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__7990__auto____1;
return cljs$core$async$state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto__))
})();
var state__8056__auto__ = (function (){var statearr_16691 = f__8055__auto__.call(null);
(statearr_16691[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto__);

return statearr_16691;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto__))
);

return c__8054__auto__;
});

cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3;
/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));
cljs.core.async.onto_chan.call(null,ch,coll);

return ch;
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((!((_ == null))) && (!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
var x__5216__auto__ = (((_ == null))?null:_);
var m__5217__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__5216__auto__)]);
if(!((m__5217__auto__ == null))){
return m__5217__auto__.call(null,_);
} else {
var m__5217__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);
if(!((m__5217__auto____$1 == null))){
return m__5217__auto____$1.call(null,_);
} else {
throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((!((m == null))) && (!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
var x__5216__auto__ = (((m == null))?null:m);
var m__5217__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__5216__auto__)]);
if(!((m__5217__auto__ == null))){
return m__5217__auto__.call(null,m,ch,close_QMARK_);
} else {
var m__5217__auto____$1 = (cljs.core.async.tap_STAR_["_"]);
if(!((m__5217__auto____$1 == null))){
return m__5217__auto____$1.call(null,m,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
}
});

cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
var x__5216__auto__ = (((m == null))?null:m);
var m__5217__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__5216__auto__)]);
if(!((m__5217__auto__ == null))){
return m__5217__auto__.call(null,m,ch);
} else {
var m__5217__auto____$1 = (cljs.core.async.untap_STAR_["_"]);
if(!((m__5217__auto____$1 == null))){
return m__5217__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
}
});

cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
var x__5216__auto__ = (((m == null))?null:m);
var m__5217__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__5216__auto__)]);
if(!((m__5217__auto__ == null))){
return m__5217__auto__.call(null,m);
} else {
var m__5217__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);
if(!((m__5217__auto____$1 == null))){
return m__5217__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async16933 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async16933 = (function (mult,ch,cs,meta16934){
this.mult = mult;
this.ch = ch;
this.cs = cs;
this.meta16934 = meta16934;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async16933.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_16935,meta16934__$1){
var self__ = this;
var _16935__$1 = this;
return (new cljs.core.async.t_cljs$core$async16933(self__.mult,self__.ch,self__.cs,meta16934__$1));
});})(cs))
;

cljs.core.async.t_cljs$core$async16933.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_16935){
var self__ = this;
var _16935__$1 = this;
return self__.meta16934;
});})(cs))
;

cljs.core.async.t_cljs$core$async16933.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async16933.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t_cljs$core$async16933.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t_cljs$core$async16933.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async16933.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async16933.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async16933.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"mult","mult",-1187640995,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mult(iple) of the supplied channel. Channels\n  containing copies of the channel can be created with 'tap', and\n  detached with 'untap'.\n\n  Each item is distributed to all taps in parallel and synchronously,\n  i.e. each tap must accept before the next item is distributed. Use\n  buffering/windowing to prevent slow taps from holding up the mult.\n\n  Items received when there are no taps get dropped.\n\n  If a tap puts to a closed channel, it will be removed from the mult."], null)),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta16934","meta16934",-1286891496,null)], null);
});})(cs))
;

cljs.core.async.t_cljs$core$async16933.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async16933.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async16933";

cljs.core.async.t_cljs$core$async16933.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"cljs.core.async/t_cljs$core$async16933");
});})(cs))
;

cljs.core.async.__GT_t_cljs$core$async16933 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t_cljs$core$async16933(mult__$1,ch__$1,cs__$1,meta16934){
return (new cljs.core.async.t_cljs$core$async16933(mult__$1,ch__$1,cs__$1,meta16934));
});})(cs))
;

}

return (new cljs.core.async.t_cljs$core$async16933(cljs$core$async$mult,ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = ((function (cs,m,dchan,dctr){
return (function (_){
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,true);
} else {
return null;
}
});})(cs,m,dchan,dctr))
;
var c__8054__auto___17154 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto___17154,cs,m,dchan,dctr,done){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto___17154,cs,m,dchan,dctr,done){
return (function (state_17066){
var state_val_17067 = (state_17066[(1)]);
if((state_val_17067 === (7))){
var inst_17062 = (state_17066[(2)]);
var state_17066__$1 = state_17066;
var statearr_17068_17155 = state_17066__$1;
(statearr_17068_17155[(2)] = inst_17062);

(statearr_17068_17155[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (20))){
var inst_16967 = (state_17066[(7)]);
var inst_16977 = cljs.core.first.call(null,inst_16967);
var inst_16978 = cljs.core.nth.call(null,inst_16977,(0),null);
var inst_16979 = cljs.core.nth.call(null,inst_16977,(1),null);
var state_17066__$1 = (function (){var statearr_17069 = state_17066;
(statearr_17069[(8)] = inst_16978);

return statearr_17069;
})();
if(cljs.core.truth_(inst_16979)){
var statearr_17070_17156 = state_17066__$1;
(statearr_17070_17156[(1)] = (22));

} else {
var statearr_17071_17157 = state_17066__$1;
(statearr_17071_17157[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (27))){
var inst_17007 = (state_17066[(9)]);
var inst_16938 = (state_17066[(10)]);
var inst_17014 = (state_17066[(11)]);
var inst_17009 = (state_17066[(12)]);
var inst_17014__$1 = cljs.core._nth.call(null,inst_17007,inst_17009);
var inst_17015 = cljs.core.async.put_BANG_.call(null,inst_17014__$1,inst_16938,done);
var state_17066__$1 = (function (){var statearr_17072 = state_17066;
(statearr_17072[(11)] = inst_17014__$1);

return statearr_17072;
})();
if(cljs.core.truth_(inst_17015)){
var statearr_17073_17158 = state_17066__$1;
(statearr_17073_17158[(1)] = (30));

} else {
var statearr_17074_17159 = state_17066__$1;
(statearr_17074_17159[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (1))){
var state_17066__$1 = state_17066;
var statearr_17075_17160 = state_17066__$1;
(statearr_17075_17160[(2)] = null);

(statearr_17075_17160[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (24))){
var inst_16967 = (state_17066[(7)]);
var inst_16984 = (state_17066[(2)]);
var inst_16985 = cljs.core.next.call(null,inst_16967);
var inst_16947 = inst_16985;
var inst_16948 = null;
var inst_16949 = (0);
var inst_16950 = (0);
var state_17066__$1 = (function (){var statearr_17076 = state_17066;
(statearr_17076[(13)] = inst_16950);

(statearr_17076[(14)] = inst_16948);

(statearr_17076[(15)] = inst_16984);

(statearr_17076[(16)] = inst_16949);

(statearr_17076[(17)] = inst_16947);

return statearr_17076;
})();
var statearr_17077_17161 = state_17066__$1;
(statearr_17077_17161[(2)] = null);

(statearr_17077_17161[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (39))){
var state_17066__$1 = state_17066;
var statearr_17081_17162 = state_17066__$1;
(statearr_17081_17162[(2)] = null);

(statearr_17081_17162[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (4))){
var inst_16938 = (state_17066[(10)]);
var inst_16938__$1 = (state_17066[(2)]);
var inst_16939 = (inst_16938__$1 == null);
var state_17066__$1 = (function (){var statearr_17082 = state_17066;
(statearr_17082[(10)] = inst_16938__$1);

return statearr_17082;
})();
if(cljs.core.truth_(inst_16939)){
var statearr_17083_17163 = state_17066__$1;
(statearr_17083_17163[(1)] = (5));

} else {
var statearr_17084_17164 = state_17066__$1;
(statearr_17084_17164[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (15))){
var inst_16950 = (state_17066[(13)]);
var inst_16948 = (state_17066[(14)]);
var inst_16949 = (state_17066[(16)]);
var inst_16947 = (state_17066[(17)]);
var inst_16963 = (state_17066[(2)]);
var inst_16964 = (inst_16950 + (1));
var tmp17078 = inst_16948;
var tmp17079 = inst_16949;
var tmp17080 = inst_16947;
var inst_16947__$1 = tmp17080;
var inst_16948__$1 = tmp17078;
var inst_16949__$1 = tmp17079;
var inst_16950__$1 = inst_16964;
var state_17066__$1 = (function (){var statearr_17085 = state_17066;
(statearr_17085[(13)] = inst_16950__$1);

(statearr_17085[(18)] = inst_16963);

(statearr_17085[(14)] = inst_16948__$1);

(statearr_17085[(16)] = inst_16949__$1);

(statearr_17085[(17)] = inst_16947__$1);

return statearr_17085;
})();
var statearr_17086_17165 = state_17066__$1;
(statearr_17086_17165[(2)] = null);

(statearr_17086_17165[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (21))){
var inst_16988 = (state_17066[(2)]);
var state_17066__$1 = state_17066;
var statearr_17090_17166 = state_17066__$1;
(statearr_17090_17166[(2)] = inst_16988);

(statearr_17090_17166[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (31))){
var inst_17014 = (state_17066[(11)]);
var inst_17018 = done.call(null,null);
var inst_17019 = cljs.core.async.untap_STAR_.call(null,m,inst_17014);
var state_17066__$1 = (function (){var statearr_17091 = state_17066;
(statearr_17091[(19)] = inst_17018);

return statearr_17091;
})();
var statearr_17092_17167 = state_17066__$1;
(statearr_17092_17167[(2)] = inst_17019);

(statearr_17092_17167[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (32))){
var inst_17007 = (state_17066[(9)]);
var inst_17006 = (state_17066[(20)]);
var inst_17009 = (state_17066[(12)]);
var inst_17008 = (state_17066[(21)]);
var inst_17021 = (state_17066[(2)]);
var inst_17022 = (inst_17009 + (1));
var tmp17087 = inst_17007;
var tmp17088 = inst_17006;
var tmp17089 = inst_17008;
var inst_17006__$1 = tmp17088;
var inst_17007__$1 = tmp17087;
var inst_17008__$1 = tmp17089;
var inst_17009__$1 = inst_17022;
var state_17066__$1 = (function (){var statearr_17093 = state_17066;
(statearr_17093[(9)] = inst_17007__$1);

(statearr_17093[(22)] = inst_17021);

(statearr_17093[(20)] = inst_17006__$1);

(statearr_17093[(12)] = inst_17009__$1);

(statearr_17093[(21)] = inst_17008__$1);

return statearr_17093;
})();
var statearr_17094_17168 = state_17066__$1;
(statearr_17094_17168[(2)] = null);

(statearr_17094_17168[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (40))){
var inst_17034 = (state_17066[(23)]);
var inst_17038 = done.call(null,null);
var inst_17039 = cljs.core.async.untap_STAR_.call(null,m,inst_17034);
var state_17066__$1 = (function (){var statearr_17095 = state_17066;
(statearr_17095[(24)] = inst_17038);

return statearr_17095;
})();
var statearr_17096_17169 = state_17066__$1;
(statearr_17096_17169[(2)] = inst_17039);

(statearr_17096_17169[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (33))){
var inst_17025 = (state_17066[(25)]);
var inst_17027 = cljs.core.chunked_seq_QMARK_.call(null,inst_17025);
var state_17066__$1 = state_17066;
if(inst_17027){
var statearr_17097_17170 = state_17066__$1;
(statearr_17097_17170[(1)] = (36));

} else {
var statearr_17098_17171 = state_17066__$1;
(statearr_17098_17171[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (13))){
var inst_16957 = (state_17066[(26)]);
var inst_16960 = cljs.core.async.close_BANG_.call(null,inst_16957);
var state_17066__$1 = state_17066;
var statearr_17099_17172 = state_17066__$1;
(statearr_17099_17172[(2)] = inst_16960);

(statearr_17099_17172[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (22))){
var inst_16978 = (state_17066[(8)]);
var inst_16981 = cljs.core.async.close_BANG_.call(null,inst_16978);
var state_17066__$1 = state_17066;
var statearr_17100_17173 = state_17066__$1;
(statearr_17100_17173[(2)] = inst_16981);

(statearr_17100_17173[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (36))){
var inst_17025 = (state_17066[(25)]);
var inst_17029 = cljs.core.chunk_first.call(null,inst_17025);
var inst_17030 = cljs.core.chunk_rest.call(null,inst_17025);
var inst_17031 = cljs.core.count.call(null,inst_17029);
var inst_17006 = inst_17030;
var inst_17007 = inst_17029;
var inst_17008 = inst_17031;
var inst_17009 = (0);
var state_17066__$1 = (function (){var statearr_17101 = state_17066;
(statearr_17101[(9)] = inst_17007);

(statearr_17101[(20)] = inst_17006);

(statearr_17101[(12)] = inst_17009);

(statearr_17101[(21)] = inst_17008);

return statearr_17101;
})();
var statearr_17102_17174 = state_17066__$1;
(statearr_17102_17174[(2)] = null);

(statearr_17102_17174[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (41))){
var inst_17025 = (state_17066[(25)]);
var inst_17041 = (state_17066[(2)]);
var inst_17042 = cljs.core.next.call(null,inst_17025);
var inst_17006 = inst_17042;
var inst_17007 = null;
var inst_17008 = (0);
var inst_17009 = (0);
var state_17066__$1 = (function (){var statearr_17103 = state_17066;
(statearr_17103[(9)] = inst_17007);

(statearr_17103[(27)] = inst_17041);

(statearr_17103[(20)] = inst_17006);

(statearr_17103[(12)] = inst_17009);

(statearr_17103[(21)] = inst_17008);

return statearr_17103;
})();
var statearr_17104_17175 = state_17066__$1;
(statearr_17104_17175[(2)] = null);

(statearr_17104_17175[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (43))){
var state_17066__$1 = state_17066;
var statearr_17105_17176 = state_17066__$1;
(statearr_17105_17176[(2)] = null);

(statearr_17105_17176[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (29))){
var inst_17050 = (state_17066[(2)]);
var state_17066__$1 = state_17066;
var statearr_17106_17177 = state_17066__$1;
(statearr_17106_17177[(2)] = inst_17050);

(statearr_17106_17177[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (44))){
var inst_17059 = (state_17066[(2)]);
var state_17066__$1 = (function (){var statearr_17107 = state_17066;
(statearr_17107[(28)] = inst_17059);

return statearr_17107;
})();
var statearr_17108_17178 = state_17066__$1;
(statearr_17108_17178[(2)] = null);

(statearr_17108_17178[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (6))){
var inst_16998 = (state_17066[(29)]);
var inst_16997 = cljs.core.deref.call(null,cs);
var inst_16998__$1 = cljs.core.keys.call(null,inst_16997);
var inst_16999 = cljs.core.count.call(null,inst_16998__$1);
var inst_17000 = cljs.core.reset_BANG_.call(null,dctr,inst_16999);
var inst_17005 = cljs.core.seq.call(null,inst_16998__$1);
var inst_17006 = inst_17005;
var inst_17007 = null;
var inst_17008 = (0);
var inst_17009 = (0);
var state_17066__$1 = (function (){var statearr_17109 = state_17066;
(statearr_17109[(9)] = inst_17007);

(statearr_17109[(29)] = inst_16998__$1);

(statearr_17109[(20)] = inst_17006);

(statearr_17109[(12)] = inst_17009);

(statearr_17109[(21)] = inst_17008);

(statearr_17109[(30)] = inst_17000);

return statearr_17109;
})();
var statearr_17110_17179 = state_17066__$1;
(statearr_17110_17179[(2)] = null);

(statearr_17110_17179[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (28))){
var inst_17006 = (state_17066[(20)]);
var inst_17025 = (state_17066[(25)]);
var inst_17025__$1 = cljs.core.seq.call(null,inst_17006);
var state_17066__$1 = (function (){var statearr_17111 = state_17066;
(statearr_17111[(25)] = inst_17025__$1);

return statearr_17111;
})();
if(inst_17025__$1){
var statearr_17112_17180 = state_17066__$1;
(statearr_17112_17180[(1)] = (33));

} else {
var statearr_17113_17181 = state_17066__$1;
(statearr_17113_17181[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (25))){
var inst_17009 = (state_17066[(12)]);
var inst_17008 = (state_17066[(21)]);
var inst_17011 = (inst_17009 < inst_17008);
var inst_17012 = inst_17011;
var state_17066__$1 = state_17066;
if(cljs.core.truth_(inst_17012)){
var statearr_17114_17182 = state_17066__$1;
(statearr_17114_17182[(1)] = (27));

} else {
var statearr_17115_17183 = state_17066__$1;
(statearr_17115_17183[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (34))){
var state_17066__$1 = state_17066;
var statearr_17116_17184 = state_17066__$1;
(statearr_17116_17184[(2)] = null);

(statearr_17116_17184[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (17))){
var state_17066__$1 = state_17066;
var statearr_17117_17185 = state_17066__$1;
(statearr_17117_17185[(2)] = null);

(statearr_17117_17185[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (3))){
var inst_17064 = (state_17066[(2)]);
var state_17066__$1 = state_17066;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_17066__$1,inst_17064);
} else {
if((state_val_17067 === (12))){
var inst_16993 = (state_17066[(2)]);
var state_17066__$1 = state_17066;
var statearr_17118_17186 = state_17066__$1;
(statearr_17118_17186[(2)] = inst_16993);

(statearr_17118_17186[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (2))){
var state_17066__$1 = state_17066;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_17066__$1,(4),ch);
} else {
if((state_val_17067 === (23))){
var state_17066__$1 = state_17066;
var statearr_17119_17187 = state_17066__$1;
(statearr_17119_17187[(2)] = null);

(statearr_17119_17187[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (35))){
var inst_17048 = (state_17066[(2)]);
var state_17066__$1 = state_17066;
var statearr_17120_17188 = state_17066__$1;
(statearr_17120_17188[(2)] = inst_17048);

(statearr_17120_17188[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (19))){
var inst_16967 = (state_17066[(7)]);
var inst_16971 = cljs.core.chunk_first.call(null,inst_16967);
var inst_16972 = cljs.core.chunk_rest.call(null,inst_16967);
var inst_16973 = cljs.core.count.call(null,inst_16971);
var inst_16947 = inst_16972;
var inst_16948 = inst_16971;
var inst_16949 = inst_16973;
var inst_16950 = (0);
var state_17066__$1 = (function (){var statearr_17121 = state_17066;
(statearr_17121[(13)] = inst_16950);

(statearr_17121[(14)] = inst_16948);

(statearr_17121[(16)] = inst_16949);

(statearr_17121[(17)] = inst_16947);

return statearr_17121;
})();
var statearr_17122_17189 = state_17066__$1;
(statearr_17122_17189[(2)] = null);

(statearr_17122_17189[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (11))){
var inst_16967 = (state_17066[(7)]);
var inst_16947 = (state_17066[(17)]);
var inst_16967__$1 = cljs.core.seq.call(null,inst_16947);
var state_17066__$1 = (function (){var statearr_17123 = state_17066;
(statearr_17123[(7)] = inst_16967__$1);

return statearr_17123;
})();
if(inst_16967__$1){
var statearr_17124_17190 = state_17066__$1;
(statearr_17124_17190[(1)] = (16));

} else {
var statearr_17125_17191 = state_17066__$1;
(statearr_17125_17191[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (9))){
var inst_16995 = (state_17066[(2)]);
var state_17066__$1 = state_17066;
var statearr_17126_17192 = state_17066__$1;
(statearr_17126_17192[(2)] = inst_16995);

(statearr_17126_17192[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (5))){
var inst_16945 = cljs.core.deref.call(null,cs);
var inst_16946 = cljs.core.seq.call(null,inst_16945);
var inst_16947 = inst_16946;
var inst_16948 = null;
var inst_16949 = (0);
var inst_16950 = (0);
var state_17066__$1 = (function (){var statearr_17127 = state_17066;
(statearr_17127[(13)] = inst_16950);

(statearr_17127[(14)] = inst_16948);

(statearr_17127[(16)] = inst_16949);

(statearr_17127[(17)] = inst_16947);

return statearr_17127;
})();
var statearr_17128_17193 = state_17066__$1;
(statearr_17128_17193[(2)] = null);

(statearr_17128_17193[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (14))){
var state_17066__$1 = state_17066;
var statearr_17129_17194 = state_17066__$1;
(statearr_17129_17194[(2)] = null);

(statearr_17129_17194[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (45))){
var inst_17056 = (state_17066[(2)]);
var state_17066__$1 = state_17066;
var statearr_17130_17195 = state_17066__$1;
(statearr_17130_17195[(2)] = inst_17056);

(statearr_17130_17195[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (26))){
var inst_16998 = (state_17066[(29)]);
var inst_17052 = (state_17066[(2)]);
var inst_17053 = cljs.core.seq.call(null,inst_16998);
var state_17066__$1 = (function (){var statearr_17131 = state_17066;
(statearr_17131[(31)] = inst_17052);

return statearr_17131;
})();
if(inst_17053){
var statearr_17132_17196 = state_17066__$1;
(statearr_17132_17196[(1)] = (42));

} else {
var statearr_17133_17197 = state_17066__$1;
(statearr_17133_17197[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (16))){
var inst_16967 = (state_17066[(7)]);
var inst_16969 = cljs.core.chunked_seq_QMARK_.call(null,inst_16967);
var state_17066__$1 = state_17066;
if(inst_16969){
var statearr_17134_17198 = state_17066__$1;
(statearr_17134_17198[(1)] = (19));

} else {
var statearr_17135_17199 = state_17066__$1;
(statearr_17135_17199[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (38))){
var inst_17045 = (state_17066[(2)]);
var state_17066__$1 = state_17066;
var statearr_17136_17200 = state_17066__$1;
(statearr_17136_17200[(2)] = inst_17045);

(statearr_17136_17200[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (30))){
var state_17066__$1 = state_17066;
var statearr_17137_17201 = state_17066__$1;
(statearr_17137_17201[(2)] = null);

(statearr_17137_17201[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (10))){
var inst_16950 = (state_17066[(13)]);
var inst_16948 = (state_17066[(14)]);
var inst_16956 = cljs.core._nth.call(null,inst_16948,inst_16950);
var inst_16957 = cljs.core.nth.call(null,inst_16956,(0),null);
var inst_16958 = cljs.core.nth.call(null,inst_16956,(1),null);
var state_17066__$1 = (function (){var statearr_17138 = state_17066;
(statearr_17138[(26)] = inst_16957);

return statearr_17138;
})();
if(cljs.core.truth_(inst_16958)){
var statearr_17139_17202 = state_17066__$1;
(statearr_17139_17202[(1)] = (13));

} else {
var statearr_17140_17203 = state_17066__$1;
(statearr_17140_17203[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (18))){
var inst_16991 = (state_17066[(2)]);
var state_17066__$1 = state_17066;
var statearr_17141_17204 = state_17066__$1;
(statearr_17141_17204[(2)] = inst_16991);

(statearr_17141_17204[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (42))){
var state_17066__$1 = state_17066;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_17066__$1,(45),dchan);
} else {
if((state_val_17067 === (37))){
var inst_16938 = (state_17066[(10)]);
var inst_17034 = (state_17066[(23)]);
var inst_17025 = (state_17066[(25)]);
var inst_17034__$1 = cljs.core.first.call(null,inst_17025);
var inst_17035 = cljs.core.async.put_BANG_.call(null,inst_17034__$1,inst_16938,done);
var state_17066__$1 = (function (){var statearr_17142 = state_17066;
(statearr_17142[(23)] = inst_17034__$1);

return statearr_17142;
})();
if(cljs.core.truth_(inst_17035)){
var statearr_17143_17205 = state_17066__$1;
(statearr_17143_17205[(1)] = (39));

} else {
var statearr_17144_17206 = state_17066__$1;
(statearr_17144_17206[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17067 === (8))){
var inst_16950 = (state_17066[(13)]);
var inst_16949 = (state_17066[(16)]);
var inst_16952 = (inst_16950 < inst_16949);
var inst_16953 = inst_16952;
var state_17066__$1 = state_17066;
if(cljs.core.truth_(inst_16953)){
var statearr_17145_17207 = state_17066__$1;
(statearr_17145_17207[(1)] = (10));

} else {
var statearr_17146_17208 = state_17066__$1;
(statearr_17146_17208[(1)] = (11));

}

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
});})(c__8054__auto___17154,cs,m,dchan,dctr,done))
;
return ((function (switch__7989__auto__,c__8054__auto___17154,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__7990__auto__ = null;
var cljs$core$async$mult_$_state_machine__7990__auto____0 = (function (){
var statearr_17150 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17150[(0)] = cljs$core$async$mult_$_state_machine__7990__auto__);

(statearr_17150[(1)] = (1));

return statearr_17150;
});
var cljs$core$async$mult_$_state_machine__7990__auto____1 = (function (state_17066){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_17066);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e17151){if((e17151 instanceof Object)){
var ex__7993__auto__ = e17151;
var statearr_17152_17209 = state_17066;
(statearr_17152_17209[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_17066);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e17151;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17210 = state_17066;
state_17066 = G__17210;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__7990__auto__ = function(state_17066){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__7990__auto____1.call(this,state_17066);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__7990__auto____0;
cljs$core$async$mult_$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__7990__auto____1;
return cljs$core$async$mult_$_state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto___17154,cs,m,dchan,dctr,done))
})();
var state__8056__auto__ = (function (){var statearr_17153 = f__8055__auto__.call(null);
(statearr_17153[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto___17154);

return statearr_17153;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto___17154,cs,m,dchan,dctr,done))
);


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var args17211 = [];
var len__5619__auto___17214 = arguments.length;
var i__5620__auto___17215 = (0);
while(true){
if((i__5620__auto___17215 < len__5619__auto___17214)){
args17211.push((arguments[i__5620__auto___17215]));

var G__17216 = (i__5620__auto___17215 + (1));
i__5620__auto___17215 = G__17216;
continue;
} else {
}
break;
}

var G__17213 = args17211.length;
switch (G__17213) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args17211.length)].join('')));

}
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.call(null,mult,ch,true);
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);

return ch;
});

cljs.core.async.tap.cljs$lang$maxFixedArity = 3;
/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_.call(null,mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
var x__5216__auto__ = (((m == null))?null:m);
var m__5217__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__5216__auto__)]);
if(!((m__5217__auto__ == null))){
return m__5217__auto__.call(null,m,ch);
} else {
var m__5217__auto____$1 = (cljs.core.async.admix_STAR_["_"]);
if(!((m__5217__auto____$1 == null))){
return m__5217__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
}
});

cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
var x__5216__auto__ = (((m == null))?null:m);
var m__5217__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__5216__auto__)]);
if(!((m__5217__auto__ == null))){
return m__5217__auto__.call(null,m,ch);
} else {
var m__5217__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);
if(!((m__5217__auto____$1 == null))){
return m__5217__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
}
});

cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
var x__5216__auto__ = (((m == null))?null:m);
var m__5217__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__5216__auto__)]);
if(!((m__5217__auto__ == null))){
return m__5217__auto__.call(null,m);
} else {
var m__5217__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);
if(!((m__5217__auto____$1 == null))){
return m__5217__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
}
});

cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((!((m == null))) && (!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
var x__5216__auto__ = (((m == null))?null:m);
var m__5217__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__5216__auto__)]);
if(!((m__5217__auto__ == null))){
return m__5217__auto__.call(null,m,state_map);
} else {
var m__5217__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);
if(!((m__5217__auto____$1 == null))){
return m__5217__auto____$1.call(null,m,state_map);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
}
});

cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((!((m == null))) && (!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
var x__5216__auto__ = (((m == null))?null:m);
var m__5217__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__5216__auto__)]);
if(!((m__5217__auto__ == null))){
return m__5217__auto__.call(null,m,mode);
} else {
var m__5217__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);
if(!((m__5217__auto____$1 == null))){
return m__5217__auto____$1.call(null,m,mode);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__5626__auto__ = [];
var len__5619__auto___17228 = arguments.length;
var i__5620__auto___17229 = (0);
while(true){
if((i__5620__auto___17229 < len__5619__auto___17228)){
args__5626__auto__.push((arguments[i__5620__auto___17229]));

var G__17230 = (i__5620__auto___17229 + (1));
i__5620__auto___17229 = G__17230;
continue;
} else {
}
break;
}

var argseq__5627__auto__ = ((((3) < args__5626__auto__.length))?(new cljs.core.IndexedSeq(args__5626__auto__.slice((3)),(0))):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5627__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__17222){
var map__17223 = p__17222;
var map__17223__$1 = ((((!((map__17223 == null)))?((((map__17223.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17223.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17223):map__17223);
var opts = map__17223__$1;
var statearr_17225_17231 = state;
(statearr_17225_17231[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__4425__auto__ = cljs.core.async.do_alts.call(null,((function (map__17223,map__17223__$1,opts){
return (function (val){
var statearr_17226_17232 = state;
(statearr_17226_17232[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__17223,map__17223__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__4425__auto__)){
var cb = temp__4425__auto__;
var statearr_17227_17233 = state;
(statearr_17227_17233[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq17218){
var G__17219 = cljs.core.first.call(null,seq17218);
var seq17218__$1 = cljs.core.next.call(null,seq17218);
var G__17220 = cljs.core.first.call(null,seq17218__$1);
var seq17218__$2 = cljs.core.next.call(null,seq17218__$1);
var G__17221 = cljs.core.first.call(null,seq17218__$2);
var seq17218__$3 = cljs.core.next.call(null,seq17218__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__17219,G__17220,G__17221,seq17218__$3);
});
/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.call(null);
var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){
return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;
var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){
return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){
if(cljs.core.truth_(attr.call(null,v))){
return cljs.core.conj.call(null,ret,c);
} else {
return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;
var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){
var chs = cljs.core.deref.call(null,cs);
var mode = cljs.core.deref.call(null,solo_mode);
var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async17397 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async17397 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta17398){
this.change = change;
this.mix = mix;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta17398 = meta17398;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async17397.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_17399,meta17398__$1){
var self__ = this;
var _17399__$1 = this;
return (new cljs.core.async.t_cljs$core$async17397(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta17398__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17397.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_17399){
var self__ = this;
var _17399__$1 = this;
return self__.meta17398;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17397.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async17397.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17397.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t_cljs$core$async17397.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17397.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17397.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17397.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17397.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.solo_modes.call(null,mode))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"mode","mode",-2000032078,null))))].join('')));
}

cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17397.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),cljs.core.with_meta(new cljs.core.Symbol(null,"mix","mix",2121373763,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"out","out",729986010,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mix of one or more input channels which will\n  be put on the supplied out channel. Input sources can be added to\n  the mix with 'admix', and removed with 'unmix'. A mix supports\n  soloing, muting and pausing multiple inputs atomically using\n  'toggle', and can solo using either muting or pausing as determined\n  by 'solo-mode'.\n\n  Each channel can have zero or more boolean modes set via 'toggle':\n\n  :solo - when true, only this (ond other soloed) channel(s) will appear\n          in the mix output channel. :mute and :pause states of soloed\n          channels are ignored. If solo-mode is :mute, non-soloed\n          channels are muted, if :pause, non-soloed channels are\n          paused.\n\n  :mute - muted channels will have their contents consumed but not included in the mix\n  :pause - paused channels will not have their contents consumed (and thus also not included in the mix)\n"], null)),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta17398","meta17398",716243007,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async17397.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async17397.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async17397";

cljs.core.async.t_cljs$core$async17397.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"cljs.core.async/t_cljs$core$async17397");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t_cljs$core$async17397 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t_cljs$core$async17397(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta17398){
return (new cljs.core.async.t_cljs$core$async17397(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta17398));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t_cljs$core$async17397(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__8054__auto___17560 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto___17560,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto___17560,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_17497){
var state_val_17498 = (state_17497[(1)]);
if((state_val_17498 === (7))){
var inst_17415 = (state_17497[(2)]);
var state_17497__$1 = state_17497;
var statearr_17499_17561 = state_17497__$1;
(statearr_17499_17561[(2)] = inst_17415);

(statearr_17499_17561[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (20))){
var inst_17427 = (state_17497[(7)]);
var state_17497__$1 = state_17497;
var statearr_17500_17562 = state_17497__$1;
(statearr_17500_17562[(2)] = inst_17427);

(statearr_17500_17562[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (27))){
var state_17497__$1 = state_17497;
var statearr_17501_17563 = state_17497__$1;
(statearr_17501_17563[(2)] = null);

(statearr_17501_17563[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (1))){
var inst_17403 = (state_17497[(8)]);
var inst_17403__$1 = calc_state.call(null);
var inst_17405 = (inst_17403__$1 == null);
var inst_17406 = cljs.core.not.call(null,inst_17405);
var state_17497__$1 = (function (){var statearr_17502 = state_17497;
(statearr_17502[(8)] = inst_17403__$1);

return statearr_17502;
})();
if(inst_17406){
var statearr_17503_17564 = state_17497__$1;
(statearr_17503_17564[(1)] = (2));

} else {
var statearr_17504_17565 = state_17497__$1;
(statearr_17504_17565[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (24))){
var inst_17450 = (state_17497[(9)]);
var inst_17471 = (state_17497[(10)]);
var inst_17457 = (state_17497[(11)]);
var inst_17471__$1 = inst_17450.call(null,inst_17457);
var state_17497__$1 = (function (){var statearr_17505 = state_17497;
(statearr_17505[(10)] = inst_17471__$1);

return statearr_17505;
})();
if(cljs.core.truth_(inst_17471__$1)){
var statearr_17506_17566 = state_17497__$1;
(statearr_17506_17566[(1)] = (29));

} else {
var statearr_17507_17567 = state_17497__$1;
(statearr_17507_17567[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (4))){
var inst_17418 = (state_17497[(2)]);
var state_17497__$1 = state_17497;
if(cljs.core.truth_(inst_17418)){
var statearr_17508_17568 = state_17497__$1;
(statearr_17508_17568[(1)] = (8));

} else {
var statearr_17509_17569 = state_17497__$1;
(statearr_17509_17569[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (15))){
var inst_17444 = (state_17497[(2)]);
var state_17497__$1 = state_17497;
if(cljs.core.truth_(inst_17444)){
var statearr_17510_17570 = state_17497__$1;
(statearr_17510_17570[(1)] = (19));

} else {
var statearr_17511_17571 = state_17497__$1;
(statearr_17511_17571[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (21))){
var inst_17449 = (state_17497[(12)]);
var inst_17449__$1 = (state_17497[(2)]);
var inst_17450 = cljs.core.get.call(null,inst_17449__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_17451 = cljs.core.get.call(null,inst_17449__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_17452 = cljs.core.get.call(null,inst_17449__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_17497__$1 = (function (){var statearr_17512 = state_17497;
(statearr_17512[(9)] = inst_17450);

(statearr_17512[(13)] = inst_17451);

(statearr_17512[(12)] = inst_17449__$1);

return statearr_17512;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_17497__$1,(22),inst_17452);
} else {
if((state_val_17498 === (31))){
var inst_17479 = (state_17497[(2)]);
var state_17497__$1 = state_17497;
if(cljs.core.truth_(inst_17479)){
var statearr_17513_17572 = state_17497__$1;
(statearr_17513_17572[(1)] = (32));

} else {
var statearr_17514_17573 = state_17497__$1;
(statearr_17514_17573[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (32))){
var inst_17456 = (state_17497[(14)]);
var state_17497__$1 = state_17497;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_17497__$1,(35),out,inst_17456);
} else {
if((state_val_17498 === (33))){
var inst_17449 = (state_17497[(12)]);
var inst_17427 = inst_17449;
var state_17497__$1 = (function (){var statearr_17515 = state_17497;
(statearr_17515[(7)] = inst_17427);

return statearr_17515;
})();
var statearr_17516_17574 = state_17497__$1;
(statearr_17516_17574[(2)] = null);

(statearr_17516_17574[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (13))){
var inst_17427 = (state_17497[(7)]);
var inst_17434 = inst_17427.cljs$lang$protocol_mask$partition0$;
var inst_17435 = (inst_17434 & (64));
var inst_17436 = inst_17427.cljs$core$ISeq$;
var inst_17437 = (inst_17435) || (inst_17436);
var state_17497__$1 = state_17497;
if(cljs.core.truth_(inst_17437)){
var statearr_17517_17575 = state_17497__$1;
(statearr_17517_17575[(1)] = (16));

} else {
var statearr_17518_17576 = state_17497__$1;
(statearr_17518_17576[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (22))){
var inst_17456 = (state_17497[(14)]);
var inst_17457 = (state_17497[(11)]);
var inst_17455 = (state_17497[(2)]);
var inst_17456__$1 = cljs.core.nth.call(null,inst_17455,(0),null);
var inst_17457__$1 = cljs.core.nth.call(null,inst_17455,(1),null);
var inst_17458 = (inst_17456__$1 == null);
var inst_17459 = cljs.core._EQ_.call(null,inst_17457__$1,change);
var inst_17460 = (inst_17458) || (inst_17459);
var state_17497__$1 = (function (){var statearr_17519 = state_17497;
(statearr_17519[(14)] = inst_17456__$1);

(statearr_17519[(11)] = inst_17457__$1);

return statearr_17519;
})();
if(cljs.core.truth_(inst_17460)){
var statearr_17520_17577 = state_17497__$1;
(statearr_17520_17577[(1)] = (23));

} else {
var statearr_17521_17578 = state_17497__$1;
(statearr_17521_17578[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (36))){
var inst_17449 = (state_17497[(12)]);
var inst_17427 = inst_17449;
var state_17497__$1 = (function (){var statearr_17522 = state_17497;
(statearr_17522[(7)] = inst_17427);

return statearr_17522;
})();
var statearr_17523_17579 = state_17497__$1;
(statearr_17523_17579[(2)] = null);

(statearr_17523_17579[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (29))){
var inst_17471 = (state_17497[(10)]);
var state_17497__$1 = state_17497;
var statearr_17524_17580 = state_17497__$1;
(statearr_17524_17580[(2)] = inst_17471);

(statearr_17524_17580[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (6))){
var state_17497__$1 = state_17497;
var statearr_17525_17581 = state_17497__$1;
(statearr_17525_17581[(2)] = false);

(statearr_17525_17581[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (28))){
var inst_17467 = (state_17497[(2)]);
var inst_17468 = calc_state.call(null);
var inst_17427 = inst_17468;
var state_17497__$1 = (function (){var statearr_17526 = state_17497;
(statearr_17526[(7)] = inst_17427);

(statearr_17526[(15)] = inst_17467);

return statearr_17526;
})();
var statearr_17527_17582 = state_17497__$1;
(statearr_17527_17582[(2)] = null);

(statearr_17527_17582[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (25))){
var inst_17493 = (state_17497[(2)]);
var state_17497__$1 = state_17497;
var statearr_17528_17583 = state_17497__$1;
(statearr_17528_17583[(2)] = inst_17493);

(statearr_17528_17583[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (34))){
var inst_17491 = (state_17497[(2)]);
var state_17497__$1 = state_17497;
var statearr_17529_17584 = state_17497__$1;
(statearr_17529_17584[(2)] = inst_17491);

(statearr_17529_17584[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (17))){
var state_17497__$1 = state_17497;
var statearr_17530_17585 = state_17497__$1;
(statearr_17530_17585[(2)] = false);

(statearr_17530_17585[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (3))){
var state_17497__$1 = state_17497;
var statearr_17531_17586 = state_17497__$1;
(statearr_17531_17586[(2)] = false);

(statearr_17531_17586[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (12))){
var inst_17495 = (state_17497[(2)]);
var state_17497__$1 = state_17497;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_17497__$1,inst_17495);
} else {
if((state_val_17498 === (2))){
var inst_17403 = (state_17497[(8)]);
var inst_17408 = inst_17403.cljs$lang$protocol_mask$partition0$;
var inst_17409 = (inst_17408 & (64));
var inst_17410 = inst_17403.cljs$core$ISeq$;
var inst_17411 = (inst_17409) || (inst_17410);
var state_17497__$1 = state_17497;
if(cljs.core.truth_(inst_17411)){
var statearr_17532_17587 = state_17497__$1;
(statearr_17532_17587[(1)] = (5));

} else {
var statearr_17533_17588 = state_17497__$1;
(statearr_17533_17588[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (23))){
var inst_17456 = (state_17497[(14)]);
var inst_17462 = (inst_17456 == null);
var state_17497__$1 = state_17497;
if(cljs.core.truth_(inst_17462)){
var statearr_17534_17589 = state_17497__$1;
(statearr_17534_17589[(1)] = (26));

} else {
var statearr_17535_17590 = state_17497__$1;
(statearr_17535_17590[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (35))){
var inst_17482 = (state_17497[(2)]);
var state_17497__$1 = state_17497;
if(cljs.core.truth_(inst_17482)){
var statearr_17536_17591 = state_17497__$1;
(statearr_17536_17591[(1)] = (36));

} else {
var statearr_17537_17592 = state_17497__$1;
(statearr_17537_17592[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (19))){
var inst_17427 = (state_17497[(7)]);
var inst_17446 = cljs.core.apply.call(null,cljs.core.hash_map,inst_17427);
var state_17497__$1 = state_17497;
var statearr_17538_17593 = state_17497__$1;
(statearr_17538_17593[(2)] = inst_17446);

(statearr_17538_17593[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (11))){
var inst_17427 = (state_17497[(7)]);
var inst_17431 = (inst_17427 == null);
var inst_17432 = cljs.core.not.call(null,inst_17431);
var state_17497__$1 = state_17497;
if(inst_17432){
var statearr_17539_17594 = state_17497__$1;
(statearr_17539_17594[(1)] = (13));

} else {
var statearr_17540_17595 = state_17497__$1;
(statearr_17540_17595[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (9))){
var inst_17403 = (state_17497[(8)]);
var state_17497__$1 = state_17497;
var statearr_17541_17596 = state_17497__$1;
(statearr_17541_17596[(2)] = inst_17403);

(statearr_17541_17596[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (5))){
var state_17497__$1 = state_17497;
var statearr_17542_17597 = state_17497__$1;
(statearr_17542_17597[(2)] = true);

(statearr_17542_17597[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (14))){
var state_17497__$1 = state_17497;
var statearr_17543_17598 = state_17497__$1;
(statearr_17543_17598[(2)] = false);

(statearr_17543_17598[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (26))){
var inst_17457 = (state_17497[(11)]);
var inst_17464 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_17457);
var state_17497__$1 = state_17497;
var statearr_17544_17599 = state_17497__$1;
(statearr_17544_17599[(2)] = inst_17464);

(statearr_17544_17599[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (16))){
var state_17497__$1 = state_17497;
var statearr_17545_17600 = state_17497__$1;
(statearr_17545_17600[(2)] = true);

(statearr_17545_17600[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (38))){
var inst_17487 = (state_17497[(2)]);
var state_17497__$1 = state_17497;
var statearr_17546_17601 = state_17497__$1;
(statearr_17546_17601[(2)] = inst_17487);

(statearr_17546_17601[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (30))){
var inst_17450 = (state_17497[(9)]);
var inst_17451 = (state_17497[(13)]);
var inst_17457 = (state_17497[(11)]);
var inst_17474 = cljs.core.empty_QMARK_.call(null,inst_17450);
var inst_17475 = inst_17451.call(null,inst_17457);
var inst_17476 = cljs.core.not.call(null,inst_17475);
var inst_17477 = (inst_17474) && (inst_17476);
var state_17497__$1 = state_17497;
var statearr_17547_17602 = state_17497__$1;
(statearr_17547_17602[(2)] = inst_17477);

(statearr_17547_17602[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (10))){
var inst_17403 = (state_17497[(8)]);
var inst_17423 = (state_17497[(2)]);
var inst_17424 = cljs.core.get.call(null,inst_17423,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_17425 = cljs.core.get.call(null,inst_17423,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_17426 = cljs.core.get.call(null,inst_17423,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_17427 = inst_17403;
var state_17497__$1 = (function (){var statearr_17548 = state_17497;
(statearr_17548[(16)] = inst_17424);

(statearr_17548[(17)] = inst_17426);

(statearr_17548[(7)] = inst_17427);

(statearr_17548[(18)] = inst_17425);

return statearr_17548;
})();
var statearr_17549_17603 = state_17497__$1;
(statearr_17549_17603[(2)] = null);

(statearr_17549_17603[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (18))){
var inst_17441 = (state_17497[(2)]);
var state_17497__$1 = state_17497;
var statearr_17550_17604 = state_17497__$1;
(statearr_17550_17604[(2)] = inst_17441);

(statearr_17550_17604[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (37))){
var state_17497__$1 = state_17497;
var statearr_17551_17605 = state_17497__$1;
(statearr_17551_17605[(2)] = null);

(statearr_17551_17605[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17498 === (8))){
var inst_17403 = (state_17497[(8)]);
var inst_17420 = cljs.core.apply.call(null,cljs.core.hash_map,inst_17403);
var state_17497__$1 = state_17497;
var statearr_17552_17606 = state_17497__$1;
(statearr_17552_17606[(2)] = inst_17420);

(statearr_17552_17606[(1)] = (10));


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
}
}
}
}
});})(c__8054__auto___17560,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__7989__auto__,c__8054__auto___17560,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__7990__auto__ = null;
var cljs$core$async$mix_$_state_machine__7990__auto____0 = (function (){
var statearr_17556 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17556[(0)] = cljs$core$async$mix_$_state_machine__7990__auto__);

(statearr_17556[(1)] = (1));

return statearr_17556;
});
var cljs$core$async$mix_$_state_machine__7990__auto____1 = (function (state_17497){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_17497);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e17557){if((e17557 instanceof Object)){
var ex__7993__auto__ = e17557;
var statearr_17558_17607 = state_17497;
(statearr_17558_17607[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_17497);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e17557;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17608 = state_17497;
state_17497 = G__17608;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__7990__auto__ = function(state_17497){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__7990__auto____1.call(this,state_17497);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__7990__auto____0;
cljs$core$async$mix_$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__7990__auto____1;
return cljs$core$async$mix_$_state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto___17560,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__8056__auto__ = (function (){var statearr_17559 = f__8055__auto__.call(null);
(statearr_17559[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto___17560);

return statearr_17559;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto___17560,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((!((p == null))) && (!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
var x__5216__auto__ = (((p == null))?null:p);
var m__5217__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__5216__auto__)]);
if(!((m__5217__auto__ == null))){
return m__5217__auto__.call(null,p,v,ch,close_QMARK_);
} else {
var m__5217__auto____$1 = (cljs.core.async.sub_STAR_["_"]);
if(!((m__5217__auto____$1 == null))){
return m__5217__auto____$1.call(null,p,v,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
}
});

cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
var x__5216__auto__ = (((p == null))?null:p);
var m__5217__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__5216__auto__)]);
if(!((m__5217__auto__ == null))){
return m__5217__auto__.call(null,p,v,ch);
} else {
var m__5217__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);
if(!((m__5217__auto____$1 == null))){
return m__5217__auto____$1.call(null,p,v,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var args17609 = [];
var len__5619__auto___17612 = arguments.length;
var i__5620__auto___17613 = (0);
while(true){
if((i__5620__auto___17613 < len__5619__auto___17612)){
args17609.push((arguments[i__5620__auto___17613]));

var G__17614 = (i__5620__auto___17613 + (1));
i__5620__auto___17613 = G__17614;
continue;
} else {
}
break;
}

var G__17611 = args17609.length;
switch (G__17611) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args17609.length)].join('')));

}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
var x__5216__auto__ = (((p == null))?null:p);
var m__5217__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5216__auto__)]);
if(!((m__5217__auto__ == null))){
return m__5217__auto__.call(null,p);
} else {
var m__5217__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__5217__auto____$1 == null))){
return m__5217__auto____$1.call(null,p);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
var x__5216__auto__ = (((p == null))?null:p);
var m__5217__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5216__auto__)]);
if(!((m__5217__auto__ == null))){
return m__5217__auto__.call(null,p,v);
} else {
var m__5217__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__5217__auto____$1 == null))){
return m__5217__auto____$1.call(null,p,v);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2;

/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var args17617 = [];
var len__5619__auto___17742 = arguments.length;
var i__5620__auto___17743 = (0);
while(true){
if((i__5620__auto___17743 < len__5619__auto___17742)){
args17617.push((arguments[i__5620__auto___17743]));

var G__17744 = (i__5620__auto___17743 + (1));
i__5620__auto___17743 = G__17744;
continue;
} else {
}
break;
}

var G__17619 = args17617.length;
switch (G__17619) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args17617.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = ((function (mults){
return (function (topic){
var or__4561__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);
if(cljs.core.truth_(or__4561__auto__)){
return or__4561__auto__;
} else {
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__4561__auto__,mults){
return (function (p1__17616_SHARP_){
if(cljs.core.truth_(p1__17616_SHARP_.call(null,topic))){
return p1__17616_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__17616_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__4561__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t_cljs$core$async17620 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async17620 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta17621){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta17621 = meta17621;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async17620.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_17622,meta17621__$1){
var self__ = this;
var _17622__$1 = this;
return (new cljs.core.async.t_cljs$core$async17620(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta17621__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async17620.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_17622){
var self__ = this;
var _17622__$1 = this;
return self__.meta17621;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async17620.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async17620.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async17620.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t_cljs$core$async17620.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async17620.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__4425__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);
if(cljs.core.truth_(temp__4425__auto__)){
var m = temp__4425__auto__;
return cljs.core.async.untap.call(null,m,ch__$1);
} else {
return null;
}
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async17620.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async17620.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async17620.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta17621","meta17621",-523784529,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async17620.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async17620.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async17620";

cljs.core.async.t_cljs$core$async17620.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"cljs.core.async/t_cljs$core$async17620");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t_cljs$core$async17620 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t_cljs$core$async17620(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta17621){
return (new cljs.core.async.t_cljs$core$async17620(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta17621));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t_cljs$core$async17620(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__8054__auto___17746 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto___17746,mults,ensure_mult,p){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto___17746,mults,ensure_mult,p){
return (function (state_17694){
var state_val_17695 = (state_17694[(1)]);
if((state_val_17695 === (7))){
var inst_17690 = (state_17694[(2)]);
var state_17694__$1 = state_17694;
var statearr_17696_17747 = state_17694__$1;
(statearr_17696_17747[(2)] = inst_17690);

(statearr_17696_17747[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (20))){
var state_17694__$1 = state_17694;
var statearr_17697_17748 = state_17694__$1;
(statearr_17697_17748[(2)] = null);

(statearr_17697_17748[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (1))){
var state_17694__$1 = state_17694;
var statearr_17698_17749 = state_17694__$1;
(statearr_17698_17749[(2)] = null);

(statearr_17698_17749[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (24))){
var inst_17673 = (state_17694[(7)]);
var inst_17682 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_17673);
var state_17694__$1 = state_17694;
var statearr_17699_17750 = state_17694__$1;
(statearr_17699_17750[(2)] = inst_17682);

(statearr_17699_17750[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (4))){
var inst_17625 = (state_17694[(8)]);
var inst_17625__$1 = (state_17694[(2)]);
var inst_17626 = (inst_17625__$1 == null);
var state_17694__$1 = (function (){var statearr_17700 = state_17694;
(statearr_17700[(8)] = inst_17625__$1);

return statearr_17700;
})();
if(cljs.core.truth_(inst_17626)){
var statearr_17701_17751 = state_17694__$1;
(statearr_17701_17751[(1)] = (5));

} else {
var statearr_17702_17752 = state_17694__$1;
(statearr_17702_17752[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (15))){
var inst_17667 = (state_17694[(2)]);
var state_17694__$1 = state_17694;
var statearr_17703_17753 = state_17694__$1;
(statearr_17703_17753[(2)] = inst_17667);

(statearr_17703_17753[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (21))){
var inst_17687 = (state_17694[(2)]);
var state_17694__$1 = (function (){var statearr_17704 = state_17694;
(statearr_17704[(9)] = inst_17687);

return statearr_17704;
})();
var statearr_17705_17754 = state_17694__$1;
(statearr_17705_17754[(2)] = null);

(statearr_17705_17754[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (13))){
var inst_17649 = (state_17694[(10)]);
var inst_17651 = cljs.core.chunked_seq_QMARK_.call(null,inst_17649);
var state_17694__$1 = state_17694;
if(inst_17651){
var statearr_17706_17755 = state_17694__$1;
(statearr_17706_17755[(1)] = (16));

} else {
var statearr_17707_17756 = state_17694__$1;
(statearr_17707_17756[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (22))){
var inst_17679 = (state_17694[(2)]);
var state_17694__$1 = state_17694;
if(cljs.core.truth_(inst_17679)){
var statearr_17708_17757 = state_17694__$1;
(statearr_17708_17757[(1)] = (23));

} else {
var statearr_17709_17758 = state_17694__$1;
(statearr_17709_17758[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (6))){
var inst_17675 = (state_17694[(11)]);
var inst_17673 = (state_17694[(7)]);
var inst_17625 = (state_17694[(8)]);
var inst_17673__$1 = topic_fn.call(null,inst_17625);
var inst_17674 = cljs.core.deref.call(null,mults);
var inst_17675__$1 = cljs.core.get.call(null,inst_17674,inst_17673__$1);
var state_17694__$1 = (function (){var statearr_17710 = state_17694;
(statearr_17710[(11)] = inst_17675__$1);

(statearr_17710[(7)] = inst_17673__$1);

return statearr_17710;
})();
if(cljs.core.truth_(inst_17675__$1)){
var statearr_17711_17759 = state_17694__$1;
(statearr_17711_17759[(1)] = (19));

} else {
var statearr_17712_17760 = state_17694__$1;
(statearr_17712_17760[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (25))){
var inst_17684 = (state_17694[(2)]);
var state_17694__$1 = state_17694;
var statearr_17713_17761 = state_17694__$1;
(statearr_17713_17761[(2)] = inst_17684);

(statearr_17713_17761[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (17))){
var inst_17649 = (state_17694[(10)]);
var inst_17658 = cljs.core.first.call(null,inst_17649);
var inst_17659 = cljs.core.async.muxch_STAR_.call(null,inst_17658);
var inst_17660 = cljs.core.async.close_BANG_.call(null,inst_17659);
var inst_17661 = cljs.core.next.call(null,inst_17649);
var inst_17635 = inst_17661;
var inst_17636 = null;
var inst_17637 = (0);
var inst_17638 = (0);
var state_17694__$1 = (function (){var statearr_17714 = state_17694;
(statearr_17714[(12)] = inst_17636);

(statearr_17714[(13)] = inst_17637);

(statearr_17714[(14)] = inst_17638);

(statearr_17714[(15)] = inst_17660);

(statearr_17714[(16)] = inst_17635);

return statearr_17714;
})();
var statearr_17715_17762 = state_17694__$1;
(statearr_17715_17762[(2)] = null);

(statearr_17715_17762[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (3))){
var inst_17692 = (state_17694[(2)]);
var state_17694__$1 = state_17694;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_17694__$1,inst_17692);
} else {
if((state_val_17695 === (12))){
var inst_17669 = (state_17694[(2)]);
var state_17694__$1 = state_17694;
var statearr_17716_17763 = state_17694__$1;
(statearr_17716_17763[(2)] = inst_17669);

(statearr_17716_17763[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (2))){
var state_17694__$1 = state_17694;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_17694__$1,(4),ch);
} else {
if((state_val_17695 === (23))){
var state_17694__$1 = state_17694;
var statearr_17717_17764 = state_17694__$1;
(statearr_17717_17764[(2)] = null);

(statearr_17717_17764[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (19))){
var inst_17675 = (state_17694[(11)]);
var inst_17625 = (state_17694[(8)]);
var inst_17677 = cljs.core.async.muxch_STAR_.call(null,inst_17675);
var state_17694__$1 = state_17694;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_17694__$1,(22),inst_17677,inst_17625);
} else {
if((state_val_17695 === (11))){
var inst_17649 = (state_17694[(10)]);
var inst_17635 = (state_17694[(16)]);
var inst_17649__$1 = cljs.core.seq.call(null,inst_17635);
var state_17694__$1 = (function (){var statearr_17718 = state_17694;
(statearr_17718[(10)] = inst_17649__$1);

return statearr_17718;
})();
if(inst_17649__$1){
var statearr_17719_17765 = state_17694__$1;
(statearr_17719_17765[(1)] = (13));

} else {
var statearr_17720_17766 = state_17694__$1;
(statearr_17720_17766[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (9))){
var inst_17671 = (state_17694[(2)]);
var state_17694__$1 = state_17694;
var statearr_17721_17767 = state_17694__$1;
(statearr_17721_17767[(2)] = inst_17671);

(statearr_17721_17767[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (5))){
var inst_17632 = cljs.core.deref.call(null,mults);
var inst_17633 = cljs.core.vals.call(null,inst_17632);
var inst_17634 = cljs.core.seq.call(null,inst_17633);
var inst_17635 = inst_17634;
var inst_17636 = null;
var inst_17637 = (0);
var inst_17638 = (0);
var state_17694__$1 = (function (){var statearr_17722 = state_17694;
(statearr_17722[(12)] = inst_17636);

(statearr_17722[(13)] = inst_17637);

(statearr_17722[(14)] = inst_17638);

(statearr_17722[(16)] = inst_17635);

return statearr_17722;
})();
var statearr_17723_17768 = state_17694__$1;
(statearr_17723_17768[(2)] = null);

(statearr_17723_17768[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (14))){
var state_17694__$1 = state_17694;
var statearr_17727_17769 = state_17694__$1;
(statearr_17727_17769[(2)] = null);

(statearr_17727_17769[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (16))){
var inst_17649 = (state_17694[(10)]);
var inst_17653 = cljs.core.chunk_first.call(null,inst_17649);
var inst_17654 = cljs.core.chunk_rest.call(null,inst_17649);
var inst_17655 = cljs.core.count.call(null,inst_17653);
var inst_17635 = inst_17654;
var inst_17636 = inst_17653;
var inst_17637 = inst_17655;
var inst_17638 = (0);
var state_17694__$1 = (function (){var statearr_17728 = state_17694;
(statearr_17728[(12)] = inst_17636);

(statearr_17728[(13)] = inst_17637);

(statearr_17728[(14)] = inst_17638);

(statearr_17728[(16)] = inst_17635);

return statearr_17728;
})();
var statearr_17729_17770 = state_17694__$1;
(statearr_17729_17770[(2)] = null);

(statearr_17729_17770[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (10))){
var inst_17636 = (state_17694[(12)]);
var inst_17637 = (state_17694[(13)]);
var inst_17638 = (state_17694[(14)]);
var inst_17635 = (state_17694[(16)]);
var inst_17643 = cljs.core._nth.call(null,inst_17636,inst_17638);
var inst_17644 = cljs.core.async.muxch_STAR_.call(null,inst_17643);
var inst_17645 = cljs.core.async.close_BANG_.call(null,inst_17644);
var inst_17646 = (inst_17638 + (1));
var tmp17724 = inst_17636;
var tmp17725 = inst_17637;
var tmp17726 = inst_17635;
var inst_17635__$1 = tmp17726;
var inst_17636__$1 = tmp17724;
var inst_17637__$1 = tmp17725;
var inst_17638__$1 = inst_17646;
var state_17694__$1 = (function (){var statearr_17730 = state_17694;
(statearr_17730[(12)] = inst_17636__$1);

(statearr_17730[(17)] = inst_17645);

(statearr_17730[(13)] = inst_17637__$1);

(statearr_17730[(14)] = inst_17638__$1);

(statearr_17730[(16)] = inst_17635__$1);

return statearr_17730;
})();
var statearr_17731_17771 = state_17694__$1;
(statearr_17731_17771[(2)] = null);

(statearr_17731_17771[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (18))){
var inst_17664 = (state_17694[(2)]);
var state_17694__$1 = state_17694;
var statearr_17732_17772 = state_17694__$1;
(statearr_17732_17772[(2)] = inst_17664);

(statearr_17732_17772[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17695 === (8))){
var inst_17637 = (state_17694[(13)]);
var inst_17638 = (state_17694[(14)]);
var inst_17640 = (inst_17638 < inst_17637);
var inst_17641 = inst_17640;
var state_17694__$1 = state_17694;
if(cljs.core.truth_(inst_17641)){
var statearr_17733_17773 = state_17694__$1;
(statearr_17733_17773[(1)] = (10));

} else {
var statearr_17734_17774 = state_17694__$1;
(statearr_17734_17774[(1)] = (11));

}

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
});})(c__8054__auto___17746,mults,ensure_mult,p))
;
return ((function (switch__7989__auto__,c__8054__auto___17746,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__7990__auto__ = null;
var cljs$core$async$state_machine__7990__auto____0 = (function (){
var statearr_17738 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17738[(0)] = cljs$core$async$state_machine__7990__auto__);

(statearr_17738[(1)] = (1));

return statearr_17738;
});
var cljs$core$async$state_machine__7990__auto____1 = (function (state_17694){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_17694);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e17739){if((e17739 instanceof Object)){
var ex__7993__auto__ = e17739;
var statearr_17740_17775 = state_17694;
(statearr_17740_17775[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_17694);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e17739;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17776 = state_17694;
state_17694 = G__17776;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$state_machine__7990__auto__ = function(state_17694){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__7990__auto____1.call(this,state_17694);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__7990__auto____0;
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__7990__auto____1;
return cljs$core$async$state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto___17746,mults,ensure_mult,p))
})();
var state__8056__auto__ = (function (){var statearr_17741 = f__8055__auto__.call(null);
(statearr_17741[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto___17746);

return statearr_17741;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto___17746,mults,ensure_mult,p))
);


return p;
});

cljs.core.async.pub.cljs$lang$maxFixedArity = 3;
/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var args17777 = [];
var len__5619__auto___17780 = arguments.length;
var i__5620__auto___17781 = (0);
while(true){
if((i__5620__auto___17781 < len__5619__auto___17780)){
args17777.push((arguments[i__5620__auto___17781]));

var G__17782 = (i__5620__auto___17781 + (1));
i__5620__auto___17781 = G__17782;
continue;
} else {
}
break;
}

var G__17779 = args17777.length;
switch (G__17779) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args17777.length)].join('')));

}
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.call(null,p,topic,ch,true);
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});

cljs.core.async.sub.cljs$lang$maxFixedArity = 4;
/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var args17784 = [];
var len__5619__auto___17787 = arguments.length;
var i__5620__auto___17788 = (0);
while(true){
if((i__5620__auto___17788 < len__5619__auto___17787)){
args17784.push((arguments[i__5620__auto___17788]));

var G__17789 = (i__5620__auto___17788 + (1));
i__5620__auto___17788 = G__17789;
continue;
} else {
}
break;
}

var G__17786 = args17784.length;
switch (G__17786) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args17784.length)].join('')));

}
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_.call(null,p);
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});

cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2;
/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var args17791 = [];
var len__5619__auto___17862 = arguments.length;
var i__5620__auto___17863 = (0);
while(true){
if((i__5620__auto___17863 < len__5619__auto___17862)){
args17791.push((arguments[i__5620__auto___17863]));

var G__17864 = (i__5620__auto___17863 + (1));
i__5620__auto___17863 = G__17864;
continue;
} else {
}
break;
}

var G__17793 = args17791.length;
switch (G__17793) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args17791.length)].join('')));

}
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.call(null,f,chs,null);
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec.call(null,chs);
var out = cljs.core.async.chan.call(null,buf_or_n);
var cnt = cljs.core.count.call(null,chs__$1);
var rets = cljs.core.object_array.call(null,cnt);
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){
return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,rets.slice((0)));
} else {
return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));
var c__8054__auto___17866 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto___17866,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto___17866,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_17832){
var state_val_17833 = (state_17832[(1)]);
if((state_val_17833 === (7))){
var state_17832__$1 = state_17832;
var statearr_17834_17867 = state_17832__$1;
(statearr_17834_17867[(2)] = null);

(statearr_17834_17867[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17833 === (1))){
var state_17832__$1 = state_17832;
var statearr_17835_17868 = state_17832__$1;
(statearr_17835_17868[(2)] = null);

(statearr_17835_17868[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17833 === (4))){
var inst_17796 = (state_17832[(7)]);
var inst_17798 = (inst_17796 < cnt);
var state_17832__$1 = state_17832;
if(cljs.core.truth_(inst_17798)){
var statearr_17836_17869 = state_17832__$1;
(statearr_17836_17869[(1)] = (6));

} else {
var statearr_17837_17870 = state_17832__$1;
(statearr_17837_17870[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17833 === (15))){
var inst_17828 = (state_17832[(2)]);
var state_17832__$1 = state_17832;
var statearr_17838_17871 = state_17832__$1;
(statearr_17838_17871[(2)] = inst_17828);

(statearr_17838_17871[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17833 === (13))){
var inst_17821 = cljs.core.async.close_BANG_.call(null,out);
var state_17832__$1 = state_17832;
var statearr_17839_17872 = state_17832__$1;
(statearr_17839_17872[(2)] = inst_17821);

(statearr_17839_17872[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17833 === (6))){
var state_17832__$1 = state_17832;
var statearr_17840_17873 = state_17832__$1;
(statearr_17840_17873[(2)] = null);

(statearr_17840_17873[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17833 === (3))){
var inst_17830 = (state_17832[(2)]);
var state_17832__$1 = state_17832;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_17832__$1,inst_17830);
} else {
if((state_val_17833 === (12))){
var inst_17818 = (state_17832[(8)]);
var inst_17818__$1 = (state_17832[(2)]);
var inst_17819 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_17818__$1);
var state_17832__$1 = (function (){var statearr_17841 = state_17832;
(statearr_17841[(8)] = inst_17818__$1);

return statearr_17841;
})();
if(cljs.core.truth_(inst_17819)){
var statearr_17842_17874 = state_17832__$1;
(statearr_17842_17874[(1)] = (13));

} else {
var statearr_17843_17875 = state_17832__$1;
(statearr_17843_17875[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17833 === (2))){
var inst_17795 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_17796 = (0);
var state_17832__$1 = (function (){var statearr_17844 = state_17832;
(statearr_17844[(9)] = inst_17795);

(statearr_17844[(7)] = inst_17796);

return statearr_17844;
})();
var statearr_17845_17876 = state_17832__$1;
(statearr_17845_17876[(2)] = null);

(statearr_17845_17876[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17833 === (11))){
var inst_17796 = (state_17832[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_17832,(10),Object,null,(9));
var inst_17805 = chs__$1.call(null,inst_17796);
var inst_17806 = done.call(null,inst_17796);
var inst_17807 = cljs.core.async.take_BANG_.call(null,inst_17805,inst_17806);
var state_17832__$1 = state_17832;
var statearr_17846_17877 = state_17832__$1;
(statearr_17846_17877[(2)] = inst_17807);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_17832__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17833 === (9))){
var inst_17796 = (state_17832[(7)]);
var inst_17809 = (state_17832[(2)]);
var inst_17810 = (inst_17796 + (1));
var inst_17796__$1 = inst_17810;
var state_17832__$1 = (function (){var statearr_17847 = state_17832;
(statearr_17847[(10)] = inst_17809);

(statearr_17847[(7)] = inst_17796__$1);

return statearr_17847;
})();
var statearr_17848_17878 = state_17832__$1;
(statearr_17848_17878[(2)] = null);

(statearr_17848_17878[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17833 === (5))){
var inst_17816 = (state_17832[(2)]);
var state_17832__$1 = (function (){var statearr_17849 = state_17832;
(statearr_17849[(11)] = inst_17816);

return statearr_17849;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_17832__$1,(12),dchan);
} else {
if((state_val_17833 === (14))){
var inst_17818 = (state_17832[(8)]);
var inst_17823 = cljs.core.apply.call(null,f,inst_17818);
var state_17832__$1 = state_17832;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_17832__$1,(16),out,inst_17823);
} else {
if((state_val_17833 === (16))){
var inst_17825 = (state_17832[(2)]);
var state_17832__$1 = (function (){var statearr_17850 = state_17832;
(statearr_17850[(12)] = inst_17825);

return statearr_17850;
})();
var statearr_17851_17879 = state_17832__$1;
(statearr_17851_17879[(2)] = null);

(statearr_17851_17879[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17833 === (10))){
var inst_17800 = (state_17832[(2)]);
var inst_17801 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_17832__$1 = (function (){var statearr_17852 = state_17832;
(statearr_17852[(13)] = inst_17800);

return statearr_17852;
})();
var statearr_17853_17880 = state_17832__$1;
(statearr_17853_17880[(2)] = inst_17801);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_17832__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17833 === (8))){
var inst_17814 = (state_17832[(2)]);
var state_17832__$1 = state_17832;
var statearr_17854_17881 = state_17832__$1;
(statearr_17854_17881[(2)] = inst_17814);

(statearr_17854_17881[(1)] = (5));


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
});})(c__8054__auto___17866,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__7989__auto__,c__8054__auto___17866,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__7990__auto__ = null;
var cljs$core$async$state_machine__7990__auto____0 = (function (){
var statearr_17858 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17858[(0)] = cljs$core$async$state_machine__7990__auto__);

(statearr_17858[(1)] = (1));

return statearr_17858;
});
var cljs$core$async$state_machine__7990__auto____1 = (function (state_17832){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_17832);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e17859){if((e17859 instanceof Object)){
var ex__7993__auto__ = e17859;
var statearr_17860_17882 = state_17832;
(statearr_17860_17882[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_17832);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e17859;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17883 = state_17832;
state_17832 = G__17883;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$state_machine__7990__auto__ = function(state_17832){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__7990__auto____1.call(this,state_17832);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__7990__auto____0;
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__7990__auto____1;
return cljs$core$async$state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto___17866,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__8056__auto__ = (function (){var statearr_17861 = f__8055__auto__.call(null);
(statearr_17861[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto___17866);

return statearr_17861;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto___17866,chs__$1,out,cnt,rets,dchan,dctr,done))
);


return out;
});

cljs.core.async.map.cljs$lang$maxFixedArity = 3;
/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var args17885 = [];
var len__5619__auto___17941 = arguments.length;
var i__5620__auto___17942 = (0);
while(true){
if((i__5620__auto___17942 < len__5619__auto___17941)){
args17885.push((arguments[i__5620__auto___17942]));

var G__17943 = (i__5620__auto___17942 + (1));
i__5620__auto___17942 = G__17943;
continue;
} else {
}
break;
}

var G__17887 = args17885.length;
switch (G__17887) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args17885.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__8054__auto___17945 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto___17945,out){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto___17945,out){
return (function (state_17917){
var state_val_17918 = (state_17917[(1)]);
if((state_val_17918 === (7))){
var inst_17897 = (state_17917[(7)]);
var inst_17896 = (state_17917[(8)]);
var inst_17896__$1 = (state_17917[(2)]);
var inst_17897__$1 = cljs.core.nth.call(null,inst_17896__$1,(0),null);
var inst_17898 = cljs.core.nth.call(null,inst_17896__$1,(1),null);
var inst_17899 = (inst_17897__$1 == null);
var state_17917__$1 = (function (){var statearr_17919 = state_17917;
(statearr_17919[(9)] = inst_17898);

(statearr_17919[(7)] = inst_17897__$1);

(statearr_17919[(8)] = inst_17896__$1);

return statearr_17919;
})();
if(cljs.core.truth_(inst_17899)){
var statearr_17920_17946 = state_17917__$1;
(statearr_17920_17946[(1)] = (8));

} else {
var statearr_17921_17947 = state_17917__$1;
(statearr_17921_17947[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17918 === (1))){
var inst_17888 = cljs.core.vec.call(null,chs);
var inst_17889 = inst_17888;
var state_17917__$1 = (function (){var statearr_17922 = state_17917;
(statearr_17922[(10)] = inst_17889);

return statearr_17922;
})();
var statearr_17923_17948 = state_17917__$1;
(statearr_17923_17948[(2)] = null);

(statearr_17923_17948[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17918 === (4))){
var inst_17889 = (state_17917[(10)]);
var state_17917__$1 = state_17917;
return cljs.core.async.ioc_alts_BANG_.call(null,state_17917__$1,(7),inst_17889);
} else {
if((state_val_17918 === (6))){
var inst_17913 = (state_17917[(2)]);
var state_17917__$1 = state_17917;
var statearr_17924_17949 = state_17917__$1;
(statearr_17924_17949[(2)] = inst_17913);

(statearr_17924_17949[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17918 === (3))){
var inst_17915 = (state_17917[(2)]);
var state_17917__$1 = state_17917;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_17917__$1,inst_17915);
} else {
if((state_val_17918 === (2))){
var inst_17889 = (state_17917[(10)]);
var inst_17891 = cljs.core.count.call(null,inst_17889);
var inst_17892 = (inst_17891 > (0));
var state_17917__$1 = state_17917;
if(cljs.core.truth_(inst_17892)){
var statearr_17926_17950 = state_17917__$1;
(statearr_17926_17950[(1)] = (4));

} else {
var statearr_17927_17951 = state_17917__$1;
(statearr_17927_17951[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17918 === (11))){
var inst_17889 = (state_17917[(10)]);
var inst_17906 = (state_17917[(2)]);
var tmp17925 = inst_17889;
var inst_17889__$1 = tmp17925;
var state_17917__$1 = (function (){var statearr_17928 = state_17917;
(statearr_17928[(11)] = inst_17906);

(statearr_17928[(10)] = inst_17889__$1);

return statearr_17928;
})();
var statearr_17929_17952 = state_17917__$1;
(statearr_17929_17952[(2)] = null);

(statearr_17929_17952[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17918 === (9))){
var inst_17897 = (state_17917[(7)]);
var state_17917__$1 = state_17917;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_17917__$1,(11),out,inst_17897);
} else {
if((state_val_17918 === (5))){
var inst_17911 = cljs.core.async.close_BANG_.call(null,out);
var state_17917__$1 = state_17917;
var statearr_17930_17953 = state_17917__$1;
(statearr_17930_17953[(2)] = inst_17911);

(statearr_17930_17953[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17918 === (10))){
var inst_17909 = (state_17917[(2)]);
var state_17917__$1 = state_17917;
var statearr_17931_17954 = state_17917__$1;
(statearr_17931_17954[(2)] = inst_17909);

(statearr_17931_17954[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17918 === (8))){
var inst_17898 = (state_17917[(9)]);
var inst_17897 = (state_17917[(7)]);
var inst_17889 = (state_17917[(10)]);
var inst_17896 = (state_17917[(8)]);
var inst_17901 = (function (){var cs = inst_17889;
var vec__17894 = inst_17896;
var v = inst_17897;
var c = inst_17898;
return ((function (cs,vec__17894,v,c,inst_17898,inst_17897,inst_17889,inst_17896,state_val_17918,c__8054__auto___17945,out){
return (function (p1__17884_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__17884_SHARP_);
});
;})(cs,vec__17894,v,c,inst_17898,inst_17897,inst_17889,inst_17896,state_val_17918,c__8054__auto___17945,out))
})();
var inst_17902 = cljs.core.filterv.call(null,inst_17901,inst_17889);
var inst_17889__$1 = inst_17902;
var state_17917__$1 = (function (){var statearr_17932 = state_17917;
(statearr_17932[(10)] = inst_17889__$1);

return statearr_17932;
})();
var statearr_17933_17955 = state_17917__$1;
(statearr_17933_17955[(2)] = null);

(statearr_17933_17955[(1)] = (2));


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
});})(c__8054__auto___17945,out))
;
return ((function (switch__7989__auto__,c__8054__auto___17945,out){
return (function() {
var cljs$core$async$state_machine__7990__auto__ = null;
var cljs$core$async$state_machine__7990__auto____0 = (function (){
var statearr_17937 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17937[(0)] = cljs$core$async$state_machine__7990__auto__);

(statearr_17937[(1)] = (1));

return statearr_17937;
});
var cljs$core$async$state_machine__7990__auto____1 = (function (state_17917){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_17917);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e17938){if((e17938 instanceof Object)){
var ex__7993__auto__ = e17938;
var statearr_17939_17956 = state_17917;
(statearr_17939_17956[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_17917);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e17938;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17957 = state_17917;
state_17917 = G__17957;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$state_machine__7990__auto__ = function(state_17917){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__7990__auto____1.call(this,state_17917);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__7990__auto____0;
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__7990__auto____1;
return cljs$core$async$state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto___17945,out))
})();
var state__8056__auto__ = (function (){var statearr_17940 = f__8055__auto__.call(null);
(statearr_17940[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto___17945);

return statearr_17940;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto___17945,out))
);


return out;
});

cljs.core.async.merge.cljs$lang$maxFixedArity = 2;
/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var args17958 = [];
var len__5619__auto___18007 = arguments.length;
var i__5620__auto___18008 = (0);
while(true){
if((i__5620__auto___18008 < len__5619__auto___18007)){
args17958.push((arguments[i__5620__auto___18008]));

var G__18009 = (i__5620__auto___18008 + (1));
i__5620__auto___18008 = G__18009;
continue;
} else {
}
break;
}

var G__17960 = args17958.length;
switch (G__17960) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args17958.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__8054__auto___18011 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto___18011,out){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto___18011,out){
return (function (state_17984){
var state_val_17985 = (state_17984[(1)]);
if((state_val_17985 === (7))){
var inst_17966 = (state_17984[(7)]);
var inst_17966__$1 = (state_17984[(2)]);
var inst_17967 = (inst_17966__$1 == null);
var inst_17968 = cljs.core.not.call(null,inst_17967);
var state_17984__$1 = (function (){var statearr_17986 = state_17984;
(statearr_17986[(7)] = inst_17966__$1);

return statearr_17986;
})();
if(inst_17968){
var statearr_17987_18012 = state_17984__$1;
(statearr_17987_18012[(1)] = (8));

} else {
var statearr_17988_18013 = state_17984__$1;
(statearr_17988_18013[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17985 === (1))){
var inst_17961 = (0);
var state_17984__$1 = (function (){var statearr_17989 = state_17984;
(statearr_17989[(8)] = inst_17961);

return statearr_17989;
})();
var statearr_17990_18014 = state_17984__$1;
(statearr_17990_18014[(2)] = null);

(statearr_17990_18014[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17985 === (4))){
var state_17984__$1 = state_17984;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_17984__$1,(7),ch);
} else {
if((state_val_17985 === (6))){
var inst_17979 = (state_17984[(2)]);
var state_17984__$1 = state_17984;
var statearr_17991_18015 = state_17984__$1;
(statearr_17991_18015[(2)] = inst_17979);

(statearr_17991_18015[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17985 === (3))){
var inst_17981 = (state_17984[(2)]);
var inst_17982 = cljs.core.async.close_BANG_.call(null,out);
var state_17984__$1 = (function (){var statearr_17992 = state_17984;
(statearr_17992[(9)] = inst_17981);

return statearr_17992;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_17984__$1,inst_17982);
} else {
if((state_val_17985 === (2))){
var inst_17961 = (state_17984[(8)]);
var inst_17963 = (inst_17961 < n);
var state_17984__$1 = state_17984;
if(cljs.core.truth_(inst_17963)){
var statearr_17993_18016 = state_17984__$1;
(statearr_17993_18016[(1)] = (4));

} else {
var statearr_17994_18017 = state_17984__$1;
(statearr_17994_18017[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17985 === (11))){
var inst_17961 = (state_17984[(8)]);
var inst_17971 = (state_17984[(2)]);
var inst_17972 = (inst_17961 + (1));
var inst_17961__$1 = inst_17972;
var state_17984__$1 = (function (){var statearr_17995 = state_17984;
(statearr_17995[(8)] = inst_17961__$1);

(statearr_17995[(10)] = inst_17971);

return statearr_17995;
})();
var statearr_17996_18018 = state_17984__$1;
(statearr_17996_18018[(2)] = null);

(statearr_17996_18018[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17985 === (9))){
var state_17984__$1 = state_17984;
var statearr_17997_18019 = state_17984__$1;
(statearr_17997_18019[(2)] = null);

(statearr_17997_18019[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17985 === (5))){
var state_17984__$1 = state_17984;
var statearr_17998_18020 = state_17984__$1;
(statearr_17998_18020[(2)] = null);

(statearr_17998_18020[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17985 === (10))){
var inst_17976 = (state_17984[(2)]);
var state_17984__$1 = state_17984;
var statearr_17999_18021 = state_17984__$1;
(statearr_17999_18021[(2)] = inst_17976);

(statearr_17999_18021[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17985 === (8))){
var inst_17966 = (state_17984[(7)]);
var state_17984__$1 = state_17984;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_17984__$1,(11),out,inst_17966);
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
});})(c__8054__auto___18011,out))
;
return ((function (switch__7989__auto__,c__8054__auto___18011,out){
return (function() {
var cljs$core$async$state_machine__7990__auto__ = null;
var cljs$core$async$state_machine__7990__auto____0 = (function (){
var statearr_18003 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_18003[(0)] = cljs$core$async$state_machine__7990__auto__);

(statearr_18003[(1)] = (1));

return statearr_18003;
});
var cljs$core$async$state_machine__7990__auto____1 = (function (state_17984){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_17984);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e18004){if((e18004 instanceof Object)){
var ex__7993__auto__ = e18004;
var statearr_18005_18022 = state_17984;
(statearr_18005_18022[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_17984);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18004;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18023 = state_17984;
state_17984 = G__18023;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$state_machine__7990__auto__ = function(state_17984){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__7990__auto____1.call(this,state_17984);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__7990__auto____0;
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__7990__auto____1;
return cljs$core$async$state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto___18011,out))
})();
var state__8056__auto__ = (function (){var statearr_18006 = f__8055__auto__.call(null);
(statearr_18006[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto___18011);

return statearr_18006;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto___18011,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async18031 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18031 = (function (map_LT_,f,ch,meta18032){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta18032 = meta18032;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async18031.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18033,meta18032__$1){
var self__ = this;
var _18033__$1 = this;
return (new cljs.core.async.t_cljs$core$async18031(self__.map_LT_,self__.f,self__.ch,meta18032__$1));
});

cljs.core.async.t_cljs$core$async18031.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18033){
var self__ = this;
var _18033__$1 = this;
return self__.meta18032;
});

cljs.core.async.t_cljs$core$async18031.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async18031.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async18031.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async18031.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async18031.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if(typeof cljs.core.async.t_cljs$core$async18034 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18034 = (function (map_LT_,f,ch,meta18032,_,fn1,meta18035){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta18032 = meta18032;
this._ = _;
this.fn1 = fn1;
this.meta18035 = meta18035;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async18034.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_18036,meta18035__$1){
var self__ = this;
var _18036__$1 = this;
return (new cljs.core.async.t_cljs$core$async18034(self__.map_LT_,self__.f,self__.ch,self__.meta18032,self__._,self__.fn1,meta18035__$1));
});})(___$1))
;

cljs.core.async.t_cljs$core$async18034.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_18036){
var self__ = this;
var _18036__$1 = this;
return self__.meta18035;
});})(___$1))
;

cljs.core.async.t_cljs$core$async18034.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async18034.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t_cljs$core$async18034.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__18024_SHARP_){
return f1.call(null,(((p1__18024_SHARP_ == null))?null:self__.f.call(null,p1__18024_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t_cljs$core$async18034.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta18032","meta18032",1446708335,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async18031","cljs.core.async/t_cljs$core$async18031",-1228067748,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta18035","meta18035",-1836404161,null)], null);
});})(___$1))
;

cljs.core.async.t_cljs$core$async18034.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async18034.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18034";

cljs.core.async.t_cljs$core$async18034.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"cljs.core.async/t_cljs$core$async18034");
});})(___$1))
;

cljs.core.async.__GT_t_cljs$core$async18034 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t_cljs$core$async18034(map_LT___$1,f__$1,ch__$1,meta18032__$1,___$2,fn1__$1,meta18035){
return (new cljs.core.async.t_cljs$core$async18034(map_LT___$1,f__$1,ch__$1,meta18032__$1,___$2,fn1__$1,meta18035));
});})(___$1))
;

}

return (new cljs.core.async.t_cljs$core$async18034(self__.map_LT_,self__.f,self__.ch,self__.meta18032,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__4549__auto__ = ret;
if(cljs.core.truth_(and__4549__auto__)){
return !((cljs.core.deref.call(null,ret) == null));
} else {
return and__4549__auto__;
}
})())){
return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else {
return ret;
}
});

cljs.core.async.t_cljs$core$async18031.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async18031.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t_cljs$core$async18031.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta18032","meta18032",1446708335,null)], null);
});

cljs.core.async.t_cljs$core$async18031.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async18031.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18031";

cljs.core.async.t_cljs$core$async18031.cljs$lang$ctorPrWriter = (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"cljs.core.async/t_cljs$core$async18031");
});

cljs.core.async.__GT_t_cljs$core$async18031 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async18031(map_LT___$1,f__$1,ch__$1,meta18032){
return (new cljs.core.async.t_cljs$core$async18031(map_LT___$1,f__$1,ch__$1,meta18032));
});

}

return (new cljs.core.async.t_cljs$core$async18031(cljs$core$async$map_LT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async18040 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18040 = (function (map_GT_,f,ch,meta18041){
this.map_GT_ = map_GT_;
this.f = f;
this.ch = ch;
this.meta18041 = meta18041;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async18040.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18042,meta18041__$1){
var self__ = this;
var _18042__$1 = this;
return (new cljs.core.async.t_cljs$core$async18040(self__.map_GT_,self__.f,self__.ch,meta18041__$1));
});

cljs.core.async.t_cljs$core$async18040.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18042){
var self__ = this;
var _18042__$1 = this;
return self__.meta18041;
});

cljs.core.async.t_cljs$core$async18040.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async18040.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async18040.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async18040.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async18040.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async18040.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t_cljs$core$async18040.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map>","map>",1676369295,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta18041","meta18041",710597953,null)], null);
});

cljs.core.async.t_cljs$core$async18040.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async18040.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18040";

cljs.core.async.t_cljs$core$async18040.cljs$lang$ctorPrWriter = (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"cljs.core.async/t_cljs$core$async18040");
});

cljs.core.async.__GT_t_cljs$core$async18040 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async18040(map_GT___$1,f__$1,ch__$1,meta18041){
return (new cljs.core.async.t_cljs$core$async18040(map_GT___$1,f__$1,ch__$1,meta18041));
});

}

return (new cljs.core.async.t_cljs$core$async18040(cljs$core$async$map_GT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t_cljs$core$async18046 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18046 = (function (filter_GT_,p,ch,meta18047){
this.filter_GT_ = filter_GT_;
this.p = p;
this.ch = ch;
this.meta18047 = meta18047;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async18046.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18048,meta18047__$1){
var self__ = this;
var _18048__$1 = this;
return (new cljs.core.async.t_cljs$core$async18046(self__.filter_GT_,self__.p,self__.ch,meta18047__$1));
});

cljs.core.async.t_cljs$core$async18046.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18048){
var self__ = this;
var _18048__$1 = this;
return self__.meta18047;
});

cljs.core.async.t_cljs$core$async18046.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async18046.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async18046.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async18046.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async18046.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async18046.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async18046.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t_cljs$core$async18046.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"filter>","filter>",-37644455,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta18047","meta18047",-1911162483,null)], null);
});

cljs.core.async.t_cljs$core$async18046.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async18046.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18046";

cljs.core.async.t_cljs$core$async18046.cljs$lang$ctorPrWriter = (function (this__5159__auto__,writer__5160__auto__,opt__5161__auto__){
return cljs.core._write.call(null,writer__5160__auto__,"cljs.core.async/t_cljs$core$async18046");
});

cljs.core.async.__GT_t_cljs$core$async18046 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async18046(filter_GT___$1,p__$1,ch__$1,meta18047){
return (new cljs.core.async.t_cljs$core$async18046(filter_GT___$1,p__$1,ch__$1,meta18047));
});

}

return (new cljs.core.async.t_cljs$core$async18046(cljs$core$async$filter_GT_,p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var args18049 = [];
var len__5619__auto___18093 = arguments.length;
var i__5620__auto___18094 = (0);
while(true){
if((i__5620__auto___18094 < len__5619__auto___18093)){
args18049.push((arguments[i__5620__auto___18094]));

var G__18095 = (i__5620__auto___18094 + (1));
i__5620__auto___18094 = G__18095;
continue;
} else {
}
break;
}

var G__18051 = args18049.length;
switch (G__18051) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18049.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__8054__auto___18097 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto___18097,out){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto___18097,out){
return (function (state_18072){
var state_val_18073 = (state_18072[(1)]);
if((state_val_18073 === (7))){
var inst_18068 = (state_18072[(2)]);
var state_18072__$1 = state_18072;
var statearr_18074_18098 = state_18072__$1;
(statearr_18074_18098[(2)] = inst_18068);

(statearr_18074_18098[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18073 === (1))){
var state_18072__$1 = state_18072;
var statearr_18075_18099 = state_18072__$1;
(statearr_18075_18099[(2)] = null);

(statearr_18075_18099[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18073 === (4))){
var inst_18054 = (state_18072[(7)]);
var inst_18054__$1 = (state_18072[(2)]);
var inst_18055 = (inst_18054__$1 == null);
var state_18072__$1 = (function (){var statearr_18076 = state_18072;
(statearr_18076[(7)] = inst_18054__$1);

return statearr_18076;
})();
if(cljs.core.truth_(inst_18055)){
var statearr_18077_18100 = state_18072__$1;
(statearr_18077_18100[(1)] = (5));

} else {
var statearr_18078_18101 = state_18072__$1;
(statearr_18078_18101[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18073 === (6))){
var inst_18054 = (state_18072[(7)]);
var inst_18059 = p.call(null,inst_18054);
var state_18072__$1 = state_18072;
if(cljs.core.truth_(inst_18059)){
var statearr_18079_18102 = state_18072__$1;
(statearr_18079_18102[(1)] = (8));

} else {
var statearr_18080_18103 = state_18072__$1;
(statearr_18080_18103[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18073 === (3))){
var inst_18070 = (state_18072[(2)]);
var state_18072__$1 = state_18072;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18072__$1,inst_18070);
} else {
if((state_val_18073 === (2))){
var state_18072__$1 = state_18072;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18072__$1,(4),ch);
} else {
if((state_val_18073 === (11))){
var inst_18062 = (state_18072[(2)]);
var state_18072__$1 = state_18072;
var statearr_18081_18104 = state_18072__$1;
(statearr_18081_18104[(2)] = inst_18062);

(statearr_18081_18104[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18073 === (9))){
var state_18072__$1 = state_18072;
var statearr_18082_18105 = state_18072__$1;
(statearr_18082_18105[(2)] = null);

(statearr_18082_18105[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18073 === (5))){
var inst_18057 = cljs.core.async.close_BANG_.call(null,out);
var state_18072__$1 = state_18072;
var statearr_18083_18106 = state_18072__$1;
(statearr_18083_18106[(2)] = inst_18057);

(statearr_18083_18106[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18073 === (10))){
var inst_18065 = (state_18072[(2)]);
var state_18072__$1 = (function (){var statearr_18084 = state_18072;
(statearr_18084[(8)] = inst_18065);

return statearr_18084;
})();
var statearr_18085_18107 = state_18072__$1;
(statearr_18085_18107[(2)] = null);

(statearr_18085_18107[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18073 === (8))){
var inst_18054 = (state_18072[(7)]);
var state_18072__$1 = state_18072;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18072__$1,(11),out,inst_18054);
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
});})(c__8054__auto___18097,out))
;
return ((function (switch__7989__auto__,c__8054__auto___18097,out){
return (function() {
var cljs$core$async$state_machine__7990__auto__ = null;
var cljs$core$async$state_machine__7990__auto____0 = (function (){
var statearr_18089 = [null,null,null,null,null,null,null,null,null];
(statearr_18089[(0)] = cljs$core$async$state_machine__7990__auto__);

(statearr_18089[(1)] = (1));

return statearr_18089;
});
var cljs$core$async$state_machine__7990__auto____1 = (function (state_18072){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_18072);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e18090){if((e18090 instanceof Object)){
var ex__7993__auto__ = e18090;
var statearr_18091_18108 = state_18072;
(statearr_18091_18108[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18072);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18090;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18109 = state_18072;
state_18072 = G__18109;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$state_machine__7990__auto__ = function(state_18072){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__7990__auto____1.call(this,state_18072);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__7990__auto____0;
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__7990__auto____1;
return cljs$core$async$state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto___18097,out))
})();
var state__8056__auto__ = (function (){var statearr_18092 = f__8055__auto__.call(null);
(statearr_18092[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto___18097);

return statearr_18092;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto___18097,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var args18110 = [];
var len__5619__auto___18113 = arguments.length;
var i__5620__auto___18114 = (0);
while(true){
if((i__5620__auto___18114 < len__5619__auto___18113)){
args18110.push((arguments[i__5620__auto___18114]));

var G__18115 = (i__5620__auto___18114 + (1));
i__5620__auto___18114 = G__18115;
continue;
} else {
}
break;
}

var G__18112 = args18110.length;
switch (G__18112) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18110.length)].join('')));

}
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.call(null,p,ch,null);
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});

cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3;
cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__8054__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto__){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto__){
return (function (state_18282){
var state_val_18283 = (state_18282[(1)]);
if((state_val_18283 === (7))){
var inst_18278 = (state_18282[(2)]);
var state_18282__$1 = state_18282;
var statearr_18284_18325 = state_18282__$1;
(statearr_18284_18325[(2)] = inst_18278);

(statearr_18284_18325[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18283 === (20))){
var inst_18248 = (state_18282[(7)]);
var inst_18259 = (state_18282[(2)]);
var inst_18260 = cljs.core.next.call(null,inst_18248);
var inst_18234 = inst_18260;
var inst_18235 = null;
var inst_18236 = (0);
var inst_18237 = (0);
var state_18282__$1 = (function (){var statearr_18285 = state_18282;
(statearr_18285[(8)] = inst_18236);

(statearr_18285[(9)] = inst_18234);

(statearr_18285[(10)] = inst_18259);

(statearr_18285[(11)] = inst_18237);

(statearr_18285[(12)] = inst_18235);

return statearr_18285;
})();
var statearr_18286_18326 = state_18282__$1;
(statearr_18286_18326[(2)] = null);

(statearr_18286_18326[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18283 === (1))){
var state_18282__$1 = state_18282;
var statearr_18287_18327 = state_18282__$1;
(statearr_18287_18327[(2)] = null);

(statearr_18287_18327[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18283 === (4))){
var inst_18223 = (state_18282[(13)]);
var inst_18223__$1 = (state_18282[(2)]);
var inst_18224 = (inst_18223__$1 == null);
var state_18282__$1 = (function (){var statearr_18288 = state_18282;
(statearr_18288[(13)] = inst_18223__$1);

return statearr_18288;
})();
if(cljs.core.truth_(inst_18224)){
var statearr_18289_18328 = state_18282__$1;
(statearr_18289_18328[(1)] = (5));

} else {
var statearr_18290_18329 = state_18282__$1;
(statearr_18290_18329[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18283 === (15))){
var state_18282__$1 = state_18282;
var statearr_18294_18330 = state_18282__$1;
(statearr_18294_18330[(2)] = null);

(statearr_18294_18330[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18283 === (21))){
var state_18282__$1 = state_18282;
var statearr_18295_18331 = state_18282__$1;
(statearr_18295_18331[(2)] = null);

(statearr_18295_18331[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18283 === (13))){
var inst_18236 = (state_18282[(8)]);
var inst_18234 = (state_18282[(9)]);
var inst_18237 = (state_18282[(11)]);
var inst_18235 = (state_18282[(12)]);
var inst_18244 = (state_18282[(2)]);
var inst_18245 = (inst_18237 + (1));
var tmp18291 = inst_18236;
var tmp18292 = inst_18234;
var tmp18293 = inst_18235;
var inst_18234__$1 = tmp18292;
var inst_18235__$1 = tmp18293;
var inst_18236__$1 = tmp18291;
var inst_18237__$1 = inst_18245;
var state_18282__$1 = (function (){var statearr_18296 = state_18282;
(statearr_18296[(8)] = inst_18236__$1);

(statearr_18296[(14)] = inst_18244);

(statearr_18296[(9)] = inst_18234__$1);

(statearr_18296[(11)] = inst_18237__$1);

(statearr_18296[(12)] = inst_18235__$1);

return statearr_18296;
})();
var statearr_18297_18332 = state_18282__$1;
(statearr_18297_18332[(2)] = null);

(statearr_18297_18332[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18283 === (22))){
var state_18282__$1 = state_18282;
var statearr_18298_18333 = state_18282__$1;
(statearr_18298_18333[(2)] = null);

(statearr_18298_18333[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18283 === (6))){
var inst_18223 = (state_18282[(13)]);
var inst_18232 = f.call(null,inst_18223);
var inst_18233 = cljs.core.seq.call(null,inst_18232);
var inst_18234 = inst_18233;
var inst_18235 = null;
var inst_18236 = (0);
var inst_18237 = (0);
var state_18282__$1 = (function (){var statearr_18299 = state_18282;
(statearr_18299[(8)] = inst_18236);

(statearr_18299[(9)] = inst_18234);

(statearr_18299[(11)] = inst_18237);

(statearr_18299[(12)] = inst_18235);

return statearr_18299;
})();
var statearr_18300_18334 = state_18282__$1;
(statearr_18300_18334[(2)] = null);

(statearr_18300_18334[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18283 === (17))){
var inst_18248 = (state_18282[(7)]);
var inst_18252 = cljs.core.chunk_first.call(null,inst_18248);
var inst_18253 = cljs.core.chunk_rest.call(null,inst_18248);
var inst_18254 = cljs.core.count.call(null,inst_18252);
var inst_18234 = inst_18253;
var inst_18235 = inst_18252;
var inst_18236 = inst_18254;
var inst_18237 = (0);
var state_18282__$1 = (function (){var statearr_18301 = state_18282;
(statearr_18301[(8)] = inst_18236);

(statearr_18301[(9)] = inst_18234);

(statearr_18301[(11)] = inst_18237);

(statearr_18301[(12)] = inst_18235);

return statearr_18301;
})();
var statearr_18302_18335 = state_18282__$1;
(statearr_18302_18335[(2)] = null);

(statearr_18302_18335[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18283 === (3))){
var inst_18280 = (state_18282[(2)]);
var state_18282__$1 = state_18282;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18282__$1,inst_18280);
} else {
if((state_val_18283 === (12))){
var inst_18268 = (state_18282[(2)]);
var state_18282__$1 = state_18282;
var statearr_18303_18336 = state_18282__$1;
(statearr_18303_18336[(2)] = inst_18268);

(statearr_18303_18336[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18283 === (2))){
var state_18282__$1 = state_18282;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18282__$1,(4),in$);
} else {
if((state_val_18283 === (23))){
var inst_18276 = (state_18282[(2)]);
var state_18282__$1 = state_18282;
var statearr_18304_18337 = state_18282__$1;
(statearr_18304_18337[(2)] = inst_18276);

(statearr_18304_18337[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18283 === (19))){
var inst_18263 = (state_18282[(2)]);
var state_18282__$1 = state_18282;
var statearr_18305_18338 = state_18282__$1;
(statearr_18305_18338[(2)] = inst_18263);

(statearr_18305_18338[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18283 === (11))){
var inst_18248 = (state_18282[(7)]);
var inst_18234 = (state_18282[(9)]);
var inst_18248__$1 = cljs.core.seq.call(null,inst_18234);
var state_18282__$1 = (function (){var statearr_18306 = state_18282;
(statearr_18306[(7)] = inst_18248__$1);

return statearr_18306;
})();
if(inst_18248__$1){
var statearr_18307_18339 = state_18282__$1;
(statearr_18307_18339[(1)] = (14));

} else {
var statearr_18308_18340 = state_18282__$1;
(statearr_18308_18340[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18283 === (9))){
var inst_18270 = (state_18282[(2)]);
var inst_18271 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_18282__$1 = (function (){var statearr_18309 = state_18282;
(statearr_18309[(15)] = inst_18270);

return statearr_18309;
})();
if(cljs.core.truth_(inst_18271)){
var statearr_18310_18341 = state_18282__$1;
(statearr_18310_18341[(1)] = (21));

} else {
var statearr_18311_18342 = state_18282__$1;
(statearr_18311_18342[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18283 === (5))){
var inst_18226 = cljs.core.async.close_BANG_.call(null,out);
var state_18282__$1 = state_18282;
var statearr_18312_18343 = state_18282__$1;
(statearr_18312_18343[(2)] = inst_18226);

(statearr_18312_18343[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18283 === (14))){
var inst_18248 = (state_18282[(7)]);
var inst_18250 = cljs.core.chunked_seq_QMARK_.call(null,inst_18248);
var state_18282__$1 = state_18282;
if(inst_18250){
var statearr_18313_18344 = state_18282__$1;
(statearr_18313_18344[(1)] = (17));

} else {
var statearr_18314_18345 = state_18282__$1;
(statearr_18314_18345[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18283 === (16))){
var inst_18266 = (state_18282[(2)]);
var state_18282__$1 = state_18282;
var statearr_18315_18346 = state_18282__$1;
(statearr_18315_18346[(2)] = inst_18266);

(statearr_18315_18346[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18283 === (10))){
var inst_18237 = (state_18282[(11)]);
var inst_18235 = (state_18282[(12)]);
var inst_18242 = cljs.core._nth.call(null,inst_18235,inst_18237);
var state_18282__$1 = state_18282;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18282__$1,(13),out,inst_18242);
} else {
if((state_val_18283 === (18))){
var inst_18248 = (state_18282[(7)]);
var inst_18257 = cljs.core.first.call(null,inst_18248);
var state_18282__$1 = state_18282;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18282__$1,(20),out,inst_18257);
} else {
if((state_val_18283 === (8))){
var inst_18236 = (state_18282[(8)]);
var inst_18237 = (state_18282[(11)]);
var inst_18239 = (inst_18237 < inst_18236);
var inst_18240 = inst_18239;
var state_18282__$1 = state_18282;
if(cljs.core.truth_(inst_18240)){
var statearr_18316_18347 = state_18282__$1;
(statearr_18316_18347[(1)] = (10));

} else {
var statearr_18317_18348 = state_18282__$1;
(statearr_18317_18348[(1)] = (11));

}

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
});})(c__8054__auto__))
;
return ((function (switch__7989__auto__,c__8054__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__7990__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__7990__auto____0 = (function (){
var statearr_18321 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18321[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__7990__auto__);

(statearr_18321[(1)] = (1));

return statearr_18321;
});
var cljs$core$async$mapcat_STAR__$_state_machine__7990__auto____1 = (function (state_18282){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_18282);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e18322){if((e18322 instanceof Object)){
var ex__7993__auto__ = e18322;
var statearr_18323_18349 = state_18282;
(statearr_18323_18349[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18282);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18322;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18350 = state_18282;
state_18282 = G__18350;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__7990__auto__ = function(state_18282){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__7990__auto____1.call(this,state_18282);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__7990__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__7990__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto__))
})();
var state__8056__auto__ = (function (){var statearr_18324 = f__8055__auto__.call(null);
(statearr_18324[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto__);

return statearr_18324;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto__))
);

return c__8054__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var args18351 = [];
var len__5619__auto___18354 = arguments.length;
var i__5620__auto___18355 = (0);
while(true){
if((i__5620__auto___18355 < len__5619__auto___18354)){
args18351.push((arguments[i__5620__auto___18355]));

var G__18356 = (i__5620__auto___18355 + (1));
i__5620__auto___18355 = G__18356;
continue;
} else {
}
break;
}

var G__18353 = args18351.length;
switch (G__18353) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18351.length)].join('')));

}
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.call(null,f,in$,null);
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return out;
});

cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var args18358 = [];
var len__5619__auto___18361 = arguments.length;
var i__5620__auto___18362 = (0);
while(true){
if((i__5620__auto___18362 < len__5619__auto___18361)){
args18358.push((arguments[i__5620__auto___18362]));

var G__18363 = (i__5620__auto___18362 + (1));
i__5620__auto___18362 = G__18363;
continue;
} else {
}
break;
}

var G__18360 = args18358.length;
switch (G__18360) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18358.length)].join('')));

}
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.call(null,f,out,null);
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return in$;
});

cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var args18365 = [];
var len__5619__auto___18416 = arguments.length;
var i__5620__auto___18417 = (0);
while(true){
if((i__5620__auto___18417 < len__5619__auto___18416)){
args18365.push((arguments[i__5620__auto___18417]));

var G__18418 = (i__5620__auto___18417 + (1));
i__5620__auto___18417 = G__18418;
continue;
} else {
}
break;
}

var G__18367 = args18365.length;
switch (G__18367) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18365.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__8054__auto___18420 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto___18420,out){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto___18420,out){
return (function (state_18391){
var state_val_18392 = (state_18391[(1)]);
if((state_val_18392 === (7))){
var inst_18386 = (state_18391[(2)]);
var state_18391__$1 = state_18391;
var statearr_18393_18421 = state_18391__$1;
(statearr_18393_18421[(2)] = inst_18386);

(statearr_18393_18421[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18392 === (1))){
var inst_18368 = null;
var state_18391__$1 = (function (){var statearr_18394 = state_18391;
(statearr_18394[(7)] = inst_18368);

return statearr_18394;
})();
var statearr_18395_18422 = state_18391__$1;
(statearr_18395_18422[(2)] = null);

(statearr_18395_18422[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18392 === (4))){
var inst_18371 = (state_18391[(8)]);
var inst_18371__$1 = (state_18391[(2)]);
var inst_18372 = (inst_18371__$1 == null);
var inst_18373 = cljs.core.not.call(null,inst_18372);
var state_18391__$1 = (function (){var statearr_18396 = state_18391;
(statearr_18396[(8)] = inst_18371__$1);

return statearr_18396;
})();
if(inst_18373){
var statearr_18397_18423 = state_18391__$1;
(statearr_18397_18423[(1)] = (5));

} else {
var statearr_18398_18424 = state_18391__$1;
(statearr_18398_18424[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18392 === (6))){
var state_18391__$1 = state_18391;
var statearr_18399_18425 = state_18391__$1;
(statearr_18399_18425[(2)] = null);

(statearr_18399_18425[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18392 === (3))){
var inst_18388 = (state_18391[(2)]);
var inst_18389 = cljs.core.async.close_BANG_.call(null,out);
var state_18391__$1 = (function (){var statearr_18400 = state_18391;
(statearr_18400[(9)] = inst_18388);

return statearr_18400;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18391__$1,inst_18389);
} else {
if((state_val_18392 === (2))){
var state_18391__$1 = state_18391;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18391__$1,(4),ch);
} else {
if((state_val_18392 === (11))){
var inst_18371 = (state_18391[(8)]);
var inst_18380 = (state_18391[(2)]);
var inst_18368 = inst_18371;
var state_18391__$1 = (function (){var statearr_18401 = state_18391;
(statearr_18401[(10)] = inst_18380);

(statearr_18401[(7)] = inst_18368);

return statearr_18401;
})();
var statearr_18402_18426 = state_18391__$1;
(statearr_18402_18426[(2)] = null);

(statearr_18402_18426[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18392 === (9))){
var inst_18371 = (state_18391[(8)]);
var state_18391__$1 = state_18391;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18391__$1,(11),out,inst_18371);
} else {
if((state_val_18392 === (5))){
var inst_18371 = (state_18391[(8)]);
var inst_18368 = (state_18391[(7)]);
var inst_18375 = cljs.core._EQ_.call(null,inst_18371,inst_18368);
var state_18391__$1 = state_18391;
if(inst_18375){
var statearr_18404_18427 = state_18391__$1;
(statearr_18404_18427[(1)] = (8));

} else {
var statearr_18405_18428 = state_18391__$1;
(statearr_18405_18428[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18392 === (10))){
var inst_18383 = (state_18391[(2)]);
var state_18391__$1 = state_18391;
var statearr_18406_18429 = state_18391__$1;
(statearr_18406_18429[(2)] = inst_18383);

(statearr_18406_18429[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18392 === (8))){
var inst_18368 = (state_18391[(7)]);
var tmp18403 = inst_18368;
var inst_18368__$1 = tmp18403;
var state_18391__$1 = (function (){var statearr_18407 = state_18391;
(statearr_18407[(7)] = inst_18368__$1);

return statearr_18407;
})();
var statearr_18408_18430 = state_18391__$1;
(statearr_18408_18430[(2)] = null);

(statearr_18408_18430[(1)] = (2));


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
});})(c__8054__auto___18420,out))
;
return ((function (switch__7989__auto__,c__8054__auto___18420,out){
return (function() {
var cljs$core$async$state_machine__7990__auto__ = null;
var cljs$core$async$state_machine__7990__auto____0 = (function (){
var statearr_18412 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_18412[(0)] = cljs$core$async$state_machine__7990__auto__);

(statearr_18412[(1)] = (1));

return statearr_18412;
});
var cljs$core$async$state_machine__7990__auto____1 = (function (state_18391){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_18391);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e18413){if((e18413 instanceof Object)){
var ex__7993__auto__ = e18413;
var statearr_18414_18431 = state_18391;
(statearr_18414_18431[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18391);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18413;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18432 = state_18391;
state_18391 = G__18432;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$state_machine__7990__auto__ = function(state_18391){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__7990__auto____1.call(this,state_18391);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__7990__auto____0;
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__7990__auto____1;
return cljs$core$async$state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto___18420,out))
})();
var state__8056__auto__ = (function (){var statearr_18415 = f__8055__auto__.call(null);
(statearr_18415[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto___18420);

return statearr_18415;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto___18420,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var args18433 = [];
var len__5619__auto___18503 = arguments.length;
var i__5620__auto___18504 = (0);
while(true){
if((i__5620__auto___18504 < len__5619__auto___18503)){
args18433.push((arguments[i__5620__auto___18504]));

var G__18505 = (i__5620__auto___18504 + (1));
i__5620__auto___18504 = G__18505;
continue;
} else {
}
break;
}

var G__18435 = args18433.length;
switch (G__18435) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18433.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__8054__auto___18507 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto___18507,out){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto___18507,out){
return (function (state_18473){
var state_val_18474 = (state_18473[(1)]);
if((state_val_18474 === (7))){
var inst_18469 = (state_18473[(2)]);
var state_18473__$1 = state_18473;
var statearr_18475_18508 = state_18473__$1;
(statearr_18475_18508[(2)] = inst_18469);

(statearr_18475_18508[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18474 === (1))){
var inst_18436 = (new Array(n));
var inst_18437 = inst_18436;
var inst_18438 = (0);
var state_18473__$1 = (function (){var statearr_18476 = state_18473;
(statearr_18476[(7)] = inst_18438);

(statearr_18476[(8)] = inst_18437);

return statearr_18476;
})();
var statearr_18477_18509 = state_18473__$1;
(statearr_18477_18509[(2)] = null);

(statearr_18477_18509[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18474 === (4))){
var inst_18441 = (state_18473[(9)]);
var inst_18441__$1 = (state_18473[(2)]);
var inst_18442 = (inst_18441__$1 == null);
var inst_18443 = cljs.core.not.call(null,inst_18442);
var state_18473__$1 = (function (){var statearr_18478 = state_18473;
(statearr_18478[(9)] = inst_18441__$1);

return statearr_18478;
})();
if(inst_18443){
var statearr_18479_18510 = state_18473__$1;
(statearr_18479_18510[(1)] = (5));

} else {
var statearr_18480_18511 = state_18473__$1;
(statearr_18480_18511[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18474 === (15))){
var inst_18463 = (state_18473[(2)]);
var state_18473__$1 = state_18473;
var statearr_18481_18512 = state_18473__$1;
(statearr_18481_18512[(2)] = inst_18463);

(statearr_18481_18512[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18474 === (13))){
var state_18473__$1 = state_18473;
var statearr_18482_18513 = state_18473__$1;
(statearr_18482_18513[(2)] = null);

(statearr_18482_18513[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18474 === (6))){
var inst_18438 = (state_18473[(7)]);
var inst_18459 = (inst_18438 > (0));
var state_18473__$1 = state_18473;
if(cljs.core.truth_(inst_18459)){
var statearr_18483_18514 = state_18473__$1;
(statearr_18483_18514[(1)] = (12));

} else {
var statearr_18484_18515 = state_18473__$1;
(statearr_18484_18515[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18474 === (3))){
var inst_18471 = (state_18473[(2)]);
var state_18473__$1 = state_18473;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18473__$1,inst_18471);
} else {
if((state_val_18474 === (12))){
var inst_18437 = (state_18473[(8)]);
var inst_18461 = cljs.core.vec.call(null,inst_18437);
var state_18473__$1 = state_18473;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18473__$1,(15),out,inst_18461);
} else {
if((state_val_18474 === (2))){
var state_18473__$1 = state_18473;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18473__$1,(4),ch);
} else {
if((state_val_18474 === (11))){
var inst_18453 = (state_18473[(2)]);
var inst_18454 = (new Array(n));
var inst_18437 = inst_18454;
var inst_18438 = (0);
var state_18473__$1 = (function (){var statearr_18485 = state_18473;
(statearr_18485[(7)] = inst_18438);

(statearr_18485[(10)] = inst_18453);

(statearr_18485[(8)] = inst_18437);

return statearr_18485;
})();
var statearr_18486_18516 = state_18473__$1;
(statearr_18486_18516[(2)] = null);

(statearr_18486_18516[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18474 === (9))){
var inst_18437 = (state_18473[(8)]);
var inst_18451 = cljs.core.vec.call(null,inst_18437);
var state_18473__$1 = state_18473;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18473__$1,(11),out,inst_18451);
} else {
if((state_val_18474 === (5))){
var inst_18446 = (state_18473[(11)]);
var inst_18438 = (state_18473[(7)]);
var inst_18441 = (state_18473[(9)]);
var inst_18437 = (state_18473[(8)]);
var inst_18445 = (inst_18437[inst_18438] = inst_18441);
var inst_18446__$1 = (inst_18438 + (1));
var inst_18447 = (inst_18446__$1 < n);
var state_18473__$1 = (function (){var statearr_18487 = state_18473;
(statearr_18487[(11)] = inst_18446__$1);

(statearr_18487[(12)] = inst_18445);

return statearr_18487;
})();
if(cljs.core.truth_(inst_18447)){
var statearr_18488_18517 = state_18473__$1;
(statearr_18488_18517[(1)] = (8));

} else {
var statearr_18489_18518 = state_18473__$1;
(statearr_18489_18518[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18474 === (14))){
var inst_18466 = (state_18473[(2)]);
var inst_18467 = cljs.core.async.close_BANG_.call(null,out);
var state_18473__$1 = (function (){var statearr_18491 = state_18473;
(statearr_18491[(13)] = inst_18466);

return statearr_18491;
})();
var statearr_18492_18519 = state_18473__$1;
(statearr_18492_18519[(2)] = inst_18467);

(statearr_18492_18519[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18474 === (10))){
var inst_18457 = (state_18473[(2)]);
var state_18473__$1 = state_18473;
var statearr_18493_18520 = state_18473__$1;
(statearr_18493_18520[(2)] = inst_18457);

(statearr_18493_18520[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18474 === (8))){
var inst_18446 = (state_18473[(11)]);
var inst_18437 = (state_18473[(8)]);
var tmp18490 = inst_18437;
var inst_18437__$1 = tmp18490;
var inst_18438 = inst_18446;
var state_18473__$1 = (function (){var statearr_18494 = state_18473;
(statearr_18494[(7)] = inst_18438);

(statearr_18494[(8)] = inst_18437__$1);

return statearr_18494;
})();
var statearr_18495_18521 = state_18473__$1;
(statearr_18495_18521[(2)] = null);

(statearr_18495_18521[(1)] = (2));


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
});})(c__8054__auto___18507,out))
;
return ((function (switch__7989__auto__,c__8054__auto___18507,out){
return (function() {
var cljs$core$async$state_machine__7990__auto__ = null;
var cljs$core$async$state_machine__7990__auto____0 = (function (){
var statearr_18499 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18499[(0)] = cljs$core$async$state_machine__7990__auto__);

(statearr_18499[(1)] = (1));

return statearr_18499;
});
var cljs$core$async$state_machine__7990__auto____1 = (function (state_18473){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_18473);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e18500){if((e18500 instanceof Object)){
var ex__7993__auto__ = e18500;
var statearr_18501_18522 = state_18473;
(statearr_18501_18522[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18473);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18500;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18523 = state_18473;
state_18473 = G__18523;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$state_machine__7990__auto__ = function(state_18473){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__7990__auto____1.call(this,state_18473);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__7990__auto____0;
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__7990__auto____1;
return cljs$core$async$state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto___18507,out))
})();
var state__8056__auto__ = (function (){var statearr_18502 = f__8055__auto__.call(null);
(statearr_18502[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto___18507);

return statearr_18502;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto___18507,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var args18524 = [];
var len__5619__auto___18598 = arguments.length;
var i__5620__auto___18599 = (0);
while(true){
if((i__5620__auto___18599 < len__5619__auto___18598)){
args18524.push((arguments[i__5620__auto___18599]));

var G__18600 = (i__5620__auto___18599 + (1));
i__5620__auto___18599 = G__18600;
continue;
} else {
}
break;
}

var G__18526 = args18524.length;
switch (G__18526) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18524.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__8054__auto___18602 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8054__auto___18602,out){
return (function (){
var f__8055__auto__ = (function (){var switch__7989__auto__ = ((function (c__8054__auto___18602,out){
return (function (state_18568){
var state_val_18569 = (state_18568[(1)]);
if((state_val_18569 === (7))){
var inst_18564 = (state_18568[(2)]);
var state_18568__$1 = state_18568;
var statearr_18570_18603 = state_18568__$1;
(statearr_18570_18603[(2)] = inst_18564);

(statearr_18570_18603[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18569 === (1))){
var inst_18527 = [];
var inst_18528 = inst_18527;
var inst_18529 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_18568__$1 = (function (){var statearr_18571 = state_18568;
(statearr_18571[(7)] = inst_18529);

(statearr_18571[(8)] = inst_18528);

return statearr_18571;
})();
var statearr_18572_18604 = state_18568__$1;
(statearr_18572_18604[(2)] = null);

(statearr_18572_18604[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18569 === (4))){
var inst_18532 = (state_18568[(9)]);
var inst_18532__$1 = (state_18568[(2)]);
var inst_18533 = (inst_18532__$1 == null);
var inst_18534 = cljs.core.not.call(null,inst_18533);
var state_18568__$1 = (function (){var statearr_18573 = state_18568;
(statearr_18573[(9)] = inst_18532__$1);

return statearr_18573;
})();
if(inst_18534){
var statearr_18574_18605 = state_18568__$1;
(statearr_18574_18605[(1)] = (5));

} else {
var statearr_18575_18606 = state_18568__$1;
(statearr_18575_18606[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18569 === (15))){
var inst_18558 = (state_18568[(2)]);
var state_18568__$1 = state_18568;
var statearr_18576_18607 = state_18568__$1;
(statearr_18576_18607[(2)] = inst_18558);

(statearr_18576_18607[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18569 === (13))){
var state_18568__$1 = state_18568;
var statearr_18577_18608 = state_18568__$1;
(statearr_18577_18608[(2)] = null);

(statearr_18577_18608[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18569 === (6))){
var inst_18528 = (state_18568[(8)]);
var inst_18553 = inst_18528.length;
var inst_18554 = (inst_18553 > (0));
var state_18568__$1 = state_18568;
if(cljs.core.truth_(inst_18554)){
var statearr_18578_18609 = state_18568__$1;
(statearr_18578_18609[(1)] = (12));

} else {
var statearr_18579_18610 = state_18568__$1;
(statearr_18579_18610[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18569 === (3))){
var inst_18566 = (state_18568[(2)]);
var state_18568__$1 = state_18568;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18568__$1,inst_18566);
} else {
if((state_val_18569 === (12))){
var inst_18528 = (state_18568[(8)]);
var inst_18556 = cljs.core.vec.call(null,inst_18528);
var state_18568__$1 = state_18568;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18568__$1,(15),out,inst_18556);
} else {
if((state_val_18569 === (2))){
var state_18568__$1 = state_18568;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18568__$1,(4),ch);
} else {
if((state_val_18569 === (11))){
var inst_18536 = (state_18568[(10)]);
var inst_18532 = (state_18568[(9)]);
var inst_18546 = (state_18568[(2)]);
var inst_18547 = [];
var inst_18548 = inst_18547.push(inst_18532);
var inst_18528 = inst_18547;
var inst_18529 = inst_18536;
var state_18568__$1 = (function (){var statearr_18580 = state_18568;
(statearr_18580[(11)] = inst_18546);

(statearr_18580[(7)] = inst_18529);

(statearr_18580[(12)] = inst_18548);

(statearr_18580[(8)] = inst_18528);

return statearr_18580;
})();
var statearr_18581_18611 = state_18568__$1;
(statearr_18581_18611[(2)] = null);

(statearr_18581_18611[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18569 === (9))){
var inst_18528 = (state_18568[(8)]);
var inst_18544 = cljs.core.vec.call(null,inst_18528);
var state_18568__$1 = state_18568;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18568__$1,(11),out,inst_18544);
} else {
if((state_val_18569 === (5))){
var inst_18536 = (state_18568[(10)]);
var inst_18529 = (state_18568[(7)]);
var inst_18532 = (state_18568[(9)]);
var inst_18536__$1 = f.call(null,inst_18532);
var inst_18537 = cljs.core._EQ_.call(null,inst_18536__$1,inst_18529);
var inst_18538 = cljs.core.keyword_identical_QMARK_.call(null,inst_18529,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_18539 = (inst_18537) || (inst_18538);
var state_18568__$1 = (function (){var statearr_18582 = state_18568;
(statearr_18582[(10)] = inst_18536__$1);

return statearr_18582;
})();
if(cljs.core.truth_(inst_18539)){
var statearr_18583_18612 = state_18568__$1;
(statearr_18583_18612[(1)] = (8));

} else {
var statearr_18584_18613 = state_18568__$1;
(statearr_18584_18613[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18569 === (14))){
var inst_18561 = (state_18568[(2)]);
var inst_18562 = cljs.core.async.close_BANG_.call(null,out);
var state_18568__$1 = (function (){var statearr_18586 = state_18568;
(statearr_18586[(13)] = inst_18561);

return statearr_18586;
})();
var statearr_18587_18614 = state_18568__$1;
(statearr_18587_18614[(2)] = inst_18562);

(statearr_18587_18614[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18569 === (10))){
var inst_18551 = (state_18568[(2)]);
var state_18568__$1 = state_18568;
var statearr_18588_18615 = state_18568__$1;
(statearr_18588_18615[(2)] = inst_18551);

(statearr_18588_18615[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18569 === (8))){
var inst_18536 = (state_18568[(10)]);
var inst_18528 = (state_18568[(8)]);
var inst_18532 = (state_18568[(9)]);
var inst_18541 = inst_18528.push(inst_18532);
var tmp18585 = inst_18528;
var inst_18528__$1 = tmp18585;
var inst_18529 = inst_18536;
var state_18568__$1 = (function (){var statearr_18589 = state_18568;
(statearr_18589[(7)] = inst_18529);

(statearr_18589[(14)] = inst_18541);

(statearr_18589[(8)] = inst_18528__$1);

return statearr_18589;
})();
var statearr_18590_18616 = state_18568__$1;
(statearr_18590_18616[(2)] = null);

(statearr_18590_18616[(1)] = (2));


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
});})(c__8054__auto___18602,out))
;
return ((function (switch__7989__auto__,c__8054__auto___18602,out){
return (function() {
var cljs$core$async$state_machine__7990__auto__ = null;
var cljs$core$async$state_machine__7990__auto____0 = (function (){
var statearr_18594 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18594[(0)] = cljs$core$async$state_machine__7990__auto__);

(statearr_18594[(1)] = (1));

return statearr_18594;
});
var cljs$core$async$state_machine__7990__auto____1 = (function (state_18568){
while(true){
var ret_value__7991__auto__ = (function (){try{while(true){
var result__7992__auto__ = switch__7989__auto__.call(null,state_18568);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7992__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7992__auto__;
}
break;
}
}catch (e18595){if((e18595 instanceof Object)){
var ex__7993__auto__ = e18595;
var statearr_18596_18617 = state_18568;
(statearr_18596_18617[(5)] = ex__7993__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18568);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18595;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7991__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18618 = state_18568;
state_18568 = G__18618;
continue;
} else {
return ret_value__7991__auto__;
}
break;
}
});
cljs$core$async$state_machine__7990__auto__ = function(state_18568){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__7990__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__7990__auto____1.call(this,state_18568);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__7990__auto____0;
cljs$core$async$state_machine__7990__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__7990__auto____1;
return cljs$core$async$state_machine__7990__auto__;
})()
;})(switch__7989__auto__,c__8054__auto___18602,out))
})();
var state__8056__auto__ = (function (){var statearr_18597 = f__8055__auto__.call(null);
(statearr_18597[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8054__auto___18602);

return statearr_18597;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8056__auto__);
});})(c__8054__auto___18602,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;

//# sourceMappingURL=async.js.map