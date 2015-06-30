// Compiled by ClojureScript 0.0-3269 {}
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(f){
if(typeof cljs.core.async.t39720 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t39720 = (function (fn_handler,f,meta39721){
this.fn_handler = fn_handler;
this.f = f;
this.meta39721 = meta39721;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t39720.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_39722,meta39721__$1){
var self__ = this;
var _39722__$1 = this;
return (new cljs.core.async.t39720(self__.fn_handler,self__.f,meta39721__$1));
});

cljs.core.async.t39720.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_39722){
var self__ = this;
var _39722__$1 = this;
return self__.meta39721;
});

cljs.core.async.t39720.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t39720.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t39720.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t39720.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"fn-handler","fn-handler",648785851,null),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"meta39721","meta39721",157554659,null)], null);
});

cljs.core.async.t39720.cljs$lang$type = true;

cljs.core.async.t39720.cljs$lang$ctorStr = "cljs.core.async/t39720";

cljs.core.async.t39720.cljs$lang$ctorPrWriter = (function (this__29844__auto__,writer__29845__auto__,opt__29846__auto__){
return cljs.core._write.call(null,writer__29845__auto__,"cljs.core.async/t39720");
});

cljs.core.async.__GT_t39720 = (function cljs$core$async$fn_handler_$___GT_t39720(fn_handler__$1,f__$1,meta39721){
return (new cljs.core.async.t39720(fn_handler__$1,f__$1,meta39721));
});

}

return (new cljs.core.async.t39720(cljs$core$async$fn_handler,f,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 * val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 * buffered, but oldest elements in buffer will be dropped (not
 * transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full.
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
var G__39724 = buff;
if(G__39724){
var bit__29939__auto__ = null;
if(cljs.core.truth_((function (){var or__29265__auto__ = bit__29939__auto__;
if(cljs.core.truth_(or__29265__auto__)){
return or__29265__auto__;
} else {
return G__39724.cljs$core$async$impl$protocols$UnblockingBuffer$;
}
})())){
return true;
} else {
if((!G__39724.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__39724);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__39724);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 * (filter p) etc or a composition thereof), and an optional exception handler.
 * If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 * transducer is supplied a buffer must be specified. ex-handler must be a
 * fn of one argument - if an exception occurs during transformation it will be called
 * with the thrown value as an argument, and any non-nil return value will be placed
 * in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(){
var G__39726 = arguments.length;
switch (G__39726) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

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
 * return nil if closed. Will park if nothing is available.
 * Returns true unless port is already closed
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
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(){
var G__39729 = arguments.length;
switch (G__39729) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_39731 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_39731);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_39731,ret){
return (function (){
return fn1.call(null,val_39731);
});})(val_39731,ret))
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
 * inside a (go ...) block. Will park if no buffer space is available.
 * Returns true unless port is already closed.
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
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(){
var G__39733 = arguments.length;
switch (G__39733) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__4421__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__4421__auto__)){
var ret = temp__4421__auto__;
return cljs.core.deref.call(null,ret);
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.call(null,port,val,fn1,true);
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__4421__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(temp__4421__auto__)){
var retb = temp__4421__auto__;
var ret = cljs.core.deref.call(null,retb);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,ret);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (ret,retb,temp__4421__auto__){
return (function (){
return fn1.call(null,ret);
});})(ret,retb,temp__4421__auto__))
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
var n__30150__auto___39735 = n;
var x_39736 = (0);
while(true){
if((x_39736 < n__30150__auto___39735)){
(a[x_39736] = (0));

var G__39737 = (x_39736 + (1));
x_39736 = G__39737;
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

var G__39738 = (i + (1));
i = G__39738;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if(typeof cljs.core.async.t39742 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t39742 = (function (alt_flag,flag,meta39743){
this.alt_flag = alt_flag;
this.flag = flag;
this.meta39743 = meta39743;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t39742.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_39744,meta39743__$1){
var self__ = this;
var _39744__$1 = this;
return (new cljs.core.async.t39742(self__.alt_flag,self__.flag,meta39743__$1));
});})(flag))
;

cljs.core.async.t39742.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_39744){
var self__ = this;
var _39744__$1 = this;
return self__.meta39743;
});})(flag))
;

cljs.core.async.t39742.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t39742.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t39742.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t39742.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"alt-flag","alt-flag",-1794972754,null),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta39743","meta39743",1262580585,null)], null);
});})(flag))
;

cljs.core.async.t39742.cljs$lang$type = true;

cljs.core.async.t39742.cljs$lang$ctorStr = "cljs.core.async/t39742";

cljs.core.async.t39742.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__29844__auto__,writer__29845__auto__,opt__29846__auto__){
return cljs.core._write.call(null,writer__29845__auto__,"cljs.core.async/t39742");
});})(flag))
;

cljs.core.async.__GT_t39742 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t39742(alt_flag__$1,flag__$1,meta39743){
return (new cljs.core.async.t39742(alt_flag__$1,flag__$1,meta39743));
});})(flag))
;

}

return (new cljs.core.async.t39742(cljs$core$async$alt_flag,flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t39748 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t39748 = (function (alt_handler,flag,cb,meta39749){
this.alt_handler = alt_handler;
this.flag = flag;
this.cb = cb;
this.meta39749 = meta39749;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t39748.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_39750,meta39749__$1){
var self__ = this;
var _39750__$1 = this;
return (new cljs.core.async.t39748(self__.alt_handler,self__.flag,self__.cb,meta39749__$1));
});

cljs.core.async.t39748.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_39750){
var self__ = this;
var _39750__$1 = this;
return self__.meta39749;
});

cljs.core.async.t39748.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t39748.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t39748.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t39748.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"alt-handler","alt-handler",963786170,null),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta39749","meta39749",1093683234,null)], null);
});

cljs.core.async.t39748.cljs$lang$type = true;

cljs.core.async.t39748.cljs$lang$ctorStr = "cljs.core.async/t39748";

cljs.core.async.t39748.cljs$lang$ctorPrWriter = (function (this__29844__auto__,writer__29845__auto__,opt__29846__auto__){
return cljs.core._write.call(null,writer__29845__auto__,"cljs.core.async/t39748");
});

cljs.core.async.__GT_t39748 = (function cljs$core$async$alt_handler_$___GT_t39748(alt_handler__$1,flag__$1,cb__$1,meta39749){
return (new cljs.core.async.t39748(alt_handler__$1,flag__$1,cb__$1,meta39749));
});

}

return (new cljs.core.async.t39748(cljs$core$async$alt_handler,flag,cb,cljs.core.PersistentArrayMap.EMPTY));
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
return (function (p1__39751_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__39751_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__39752_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__39752_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__29265__auto__ = wport;
if(cljs.core.truth_(or__29265__auto__)){
return or__29265__auto__;
} else {
return port;
}
})()], null));
} else {
var G__39753 = (i + (1));
i = G__39753;
continue;
}
} else {
return null;
}
break;
}
})();
var or__29265__auto__ = ret;
if(cljs.core.truth_(or__29265__auto__)){
return or__29265__auto__;
} else {
if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__4423__auto__ = (function (){var and__29253__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);
if(cljs.core.truth_(and__29253__auto__)){
return cljs.core.async.impl.protocols.commit.call(null,flag);
} else {
return and__29253__auto__;
}
})();
if(cljs.core.truth_(temp__4423__auto__)){
var got = temp__4423__auto__;
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
 * [channel-to-put-to val-to-put], in any combination. Takes will be
 * made as if by <!, and puts will be made as if by >!. Unless
 * the :priority option is true, if more than one port operation is
 * ready a non-deterministic choice will be made. If no operation is
 * ready and a :default value is supplied, [default-val :default] will
 * be returned, otherwise alts! will park until the first operation to
 * become ready completes. Returns [val port] of the completed
 * operation, where val is the value taken for takes, and a
 * boolean (true unless already closed, as per put!) for puts.
 * 
 * opts are passed as :key val ... Supported options:
 * 
 * :default val - the value to use if none of the operations are immediately ready
 * :priority true - (default nil) when true, the operations will be tried in order.
 * 
 * Note: there is no guarantee that the port exps or val exprs will be
 * used, nor in what order should they be, so they should not be
 * depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(){
var argseq__30305__auto__ = ((((1) < arguments.length))?(new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,(1)),(0))):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__30305__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__39756){
var map__39757 = p__39756;
var map__39757__$1 = ((cljs.core.seq_QMARK_.call(null,map__39757))?cljs.core.apply.call(null,cljs.core.hash_map,map__39757):map__39757);
var opts = map__39757__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq39754){
var G__39755 = cljs.core.first.call(null,seq39754);
var seq39754__$1 = cljs.core.next.call(null,seq39754);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__39755,seq39754__$1);
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(){
var G__39759 = arguments.length;
switch (G__39759) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__32551__auto___39808 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto___39808){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto___39808){
return (function (state_39783){
var state_val_39784 = (state_39783[(1)]);
if((state_val_39784 === (7))){
var inst_39779 = (state_39783[(2)]);
var state_39783__$1 = state_39783;
var statearr_39785_39809 = state_39783__$1;
(statearr_39785_39809[(2)] = inst_39779);

(statearr_39785_39809[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39784 === (1))){
var state_39783__$1 = state_39783;
var statearr_39786_39810 = state_39783__$1;
(statearr_39786_39810[(2)] = null);

(statearr_39786_39810[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39784 === (4))){
var inst_39762 = (state_39783[(7)]);
var inst_39762__$1 = (state_39783[(2)]);
var inst_39763 = (inst_39762__$1 == null);
var state_39783__$1 = (function (){var statearr_39787 = state_39783;
(statearr_39787[(7)] = inst_39762__$1);

return statearr_39787;
})();
if(cljs.core.truth_(inst_39763)){
var statearr_39788_39811 = state_39783__$1;
(statearr_39788_39811[(1)] = (5));

} else {
var statearr_39789_39812 = state_39783__$1;
(statearr_39789_39812[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39784 === (13))){
var state_39783__$1 = state_39783;
var statearr_39790_39813 = state_39783__$1;
(statearr_39790_39813[(2)] = null);

(statearr_39790_39813[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39784 === (6))){
var inst_39762 = (state_39783[(7)]);
var state_39783__$1 = state_39783;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_39783__$1,(11),to,inst_39762);
} else {
if((state_val_39784 === (3))){
var inst_39781 = (state_39783[(2)]);
var state_39783__$1 = state_39783;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_39783__$1,inst_39781);
} else {
if((state_val_39784 === (12))){
var state_39783__$1 = state_39783;
var statearr_39791_39814 = state_39783__$1;
(statearr_39791_39814[(2)] = null);

(statearr_39791_39814[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39784 === (2))){
var state_39783__$1 = state_39783;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39783__$1,(4),from);
} else {
if((state_val_39784 === (11))){
var inst_39772 = (state_39783[(2)]);
var state_39783__$1 = state_39783;
if(cljs.core.truth_(inst_39772)){
var statearr_39792_39815 = state_39783__$1;
(statearr_39792_39815[(1)] = (12));

} else {
var statearr_39793_39816 = state_39783__$1;
(statearr_39793_39816[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39784 === (9))){
var state_39783__$1 = state_39783;
var statearr_39794_39817 = state_39783__$1;
(statearr_39794_39817[(2)] = null);

(statearr_39794_39817[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39784 === (5))){
var state_39783__$1 = state_39783;
if(cljs.core.truth_(close_QMARK_)){
var statearr_39795_39818 = state_39783__$1;
(statearr_39795_39818[(1)] = (8));

} else {
var statearr_39796_39819 = state_39783__$1;
(statearr_39796_39819[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39784 === (14))){
var inst_39777 = (state_39783[(2)]);
var state_39783__$1 = state_39783;
var statearr_39797_39820 = state_39783__$1;
(statearr_39797_39820[(2)] = inst_39777);

(statearr_39797_39820[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39784 === (10))){
var inst_39769 = (state_39783[(2)]);
var state_39783__$1 = state_39783;
var statearr_39798_39821 = state_39783__$1;
(statearr_39798_39821[(2)] = inst_39769);

(statearr_39798_39821[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39784 === (8))){
var inst_39766 = cljs.core.async.close_BANG_.call(null,to);
var state_39783__$1 = state_39783;
var statearr_39799_39822 = state_39783__$1;
(statearr_39799_39822[(2)] = inst_39766);

(statearr_39799_39822[(1)] = (10));


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
});})(c__32551__auto___39808))
;
return ((function (switch__32489__auto__,c__32551__auto___39808){
return (function() {
var cljs$core$async$state_machine__32490__auto__ = null;
var cljs$core$async$state_machine__32490__auto____0 = (function (){
var statearr_39803 = [null,null,null,null,null,null,null,null];
(statearr_39803[(0)] = cljs$core$async$state_machine__32490__auto__);

(statearr_39803[(1)] = (1));

return statearr_39803;
});
var cljs$core$async$state_machine__32490__auto____1 = (function (state_39783){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_39783);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e39804){if((e39804 instanceof Object)){
var ex__32493__auto__ = e39804;
var statearr_39805_39823 = state_39783;
(statearr_39805_39823[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_39783);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e39804;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39824 = state_39783;
state_39783 = G__39824;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$state_machine__32490__auto__ = function(state_39783){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32490__auto____1.call(this,state_39783);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32490__auto____0;
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32490__auto____1;
return cljs$core$async$state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto___39808))
})();
var state__32553__auto__ = (function (){var statearr_39806 = f__32552__auto__.call(null);
(statearr_39806[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___39808);

return statearr_39806;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto___39808))
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
return (function (p__40008){
var vec__40009 = p__40008;
var v = cljs.core.nth.call(null,vec__40009,(0),null);
var p = cljs.core.nth.call(null,vec__40009,(1),null);
var job = vec__40009;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__32551__auto___40191 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto___40191,res,vec__40009,v,p,job,jobs,results){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto___40191,res,vec__40009,v,p,job,jobs,results){
return (function (state_40014){
var state_val_40015 = (state_40014[(1)]);
if((state_val_40015 === (1))){
var state_40014__$1 = state_40014;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40014__$1,(2),res,v);
} else {
if((state_val_40015 === (2))){
var inst_40011 = (state_40014[(2)]);
var inst_40012 = cljs.core.async.close_BANG_.call(null,res);
var state_40014__$1 = (function (){var statearr_40016 = state_40014;
(statearr_40016[(7)] = inst_40011);

return statearr_40016;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40014__$1,inst_40012);
} else {
return null;
}
}
});})(c__32551__auto___40191,res,vec__40009,v,p,job,jobs,results))
;
return ((function (switch__32489__auto__,c__32551__auto___40191,res,vec__40009,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____0 = (function (){
var statearr_40020 = [null,null,null,null,null,null,null,null];
(statearr_40020[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__);

(statearr_40020[(1)] = (1));

return statearr_40020;
});
var cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____1 = (function (state_40014){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_40014);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e40021){if((e40021 instanceof Object)){
var ex__32493__auto__ = e40021;
var statearr_40022_40192 = state_40014;
(statearr_40022_40192[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40014);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40021;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40193 = state_40014;
state_40014 = G__40193;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__ = function(state_40014){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____1.call(this,state_40014);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto___40191,res,vec__40009,v,p,job,jobs,results))
})();
var state__32553__auto__ = (function (){var statearr_40023 = f__32552__auto__.call(null);
(statearr_40023[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___40191);

return statearr_40023;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto___40191,res,vec__40009,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__40024){
var vec__40025 = p__40024;
var v = cljs.core.nth.call(null,vec__40025,(0),null);
var p = cljs.core.nth.call(null,vec__40025,(1),null);
var job = vec__40025;
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
var n__30150__auto___40194 = n;
var __40195 = (0);
while(true){
if((__40195 < n__30150__auto___40194)){
var G__40026_40196 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__40026_40196) {
case "compute":
var c__32551__auto___40198 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__40195,c__32551__auto___40198,G__40026_40196,n__30150__auto___40194,jobs,results,process,async){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (__40195,c__32551__auto___40198,G__40026_40196,n__30150__auto___40194,jobs,results,process,async){
return (function (state_40039){
var state_val_40040 = (state_40039[(1)]);
if((state_val_40040 === (1))){
var state_40039__$1 = state_40039;
var statearr_40041_40199 = state_40039__$1;
(statearr_40041_40199[(2)] = null);

(statearr_40041_40199[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40040 === (2))){
var state_40039__$1 = state_40039;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40039__$1,(4),jobs);
} else {
if((state_val_40040 === (3))){
var inst_40037 = (state_40039[(2)]);
var state_40039__$1 = state_40039;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40039__$1,inst_40037);
} else {
if((state_val_40040 === (4))){
var inst_40029 = (state_40039[(2)]);
var inst_40030 = process.call(null,inst_40029);
var state_40039__$1 = state_40039;
if(cljs.core.truth_(inst_40030)){
var statearr_40042_40200 = state_40039__$1;
(statearr_40042_40200[(1)] = (5));

} else {
var statearr_40043_40201 = state_40039__$1;
(statearr_40043_40201[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40040 === (5))){
var state_40039__$1 = state_40039;
var statearr_40044_40202 = state_40039__$1;
(statearr_40044_40202[(2)] = null);

(statearr_40044_40202[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40040 === (6))){
var state_40039__$1 = state_40039;
var statearr_40045_40203 = state_40039__$1;
(statearr_40045_40203[(2)] = null);

(statearr_40045_40203[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40040 === (7))){
var inst_40035 = (state_40039[(2)]);
var state_40039__$1 = state_40039;
var statearr_40046_40204 = state_40039__$1;
(statearr_40046_40204[(2)] = inst_40035);

(statearr_40046_40204[(1)] = (3));


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
});})(__40195,c__32551__auto___40198,G__40026_40196,n__30150__auto___40194,jobs,results,process,async))
;
return ((function (__40195,switch__32489__auto__,c__32551__auto___40198,G__40026_40196,n__30150__auto___40194,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____0 = (function (){
var statearr_40050 = [null,null,null,null,null,null,null];
(statearr_40050[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__);

(statearr_40050[(1)] = (1));

return statearr_40050;
});
var cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____1 = (function (state_40039){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_40039);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e40051){if((e40051 instanceof Object)){
var ex__32493__auto__ = e40051;
var statearr_40052_40205 = state_40039;
(statearr_40052_40205[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40039);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40051;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40206 = state_40039;
state_40039 = G__40206;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__ = function(state_40039){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____1.call(this,state_40039);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__;
})()
;})(__40195,switch__32489__auto__,c__32551__auto___40198,G__40026_40196,n__30150__auto___40194,jobs,results,process,async))
})();
var state__32553__auto__ = (function (){var statearr_40053 = f__32552__auto__.call(null);
(statearr_40053[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___40198);

return statearr_40053;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(__40195,c__32551__auto___40198,G__40026_40196,n__30150__auto___40194,jobs,results,process,async))
);


break;
case "async":
var c__32551__auto___40207 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__40195,c__32551__auto___40207,G__40026_40196,n__30150__auto___40194,jobs,results,process,async){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (__40195,c__32551__auto___40207,G__40026_40196,n__30150__auto___40194,jobs,results,process,async){
return (function (state_40066){
var state_val_40067 = (state_40066[(1)]);
if((state_val_40067 === (1))){
var state_40066__$1 = state_40066;
var statearr_40068_40208 = state_40066__$1;
(statearr_40068_40208[(2)] = null);

(statearr_40068_40208[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40067 === (2))){
var state_40066__$1 = state_40066;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40066__$1,(4),jobs);
} else {
if((state_val_40067 === (3))){
var inst_40064 = (state_40066[(2)]);
var state_40066__$1 = state_40066;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40066__$1,inst_40064);
} else {
if((state_val_40067 === (4))){
var inst_40056 = (state_40066[(2)]);
var inst_40057 = async.call(null,inst_40056);
var state_40066__$1 = state_40066;
if(cljs.core.truth_(inst_40057)){
var statearr_40069_40209 = state_40066__$1;
(statearr_40069_40209[(1)] = (5));

} else {
var statearr_40070_40210 = state_40066__$1;
(statearr_40070_40210[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40067 === (5))){
var state_40066__$1 = state_40066;
var statearr_40071_40211 = state_40066__$1;
(statearr_40071_40211[(2)] = null);

(statearr_40071_40211[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40067 === (6))){
var state_40066__$1 = state_40066;
var statearr_40072_40212 = state_40066__$1;
(statearr_40072_40212[(2)] = null);

(statearr_40072_40212[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40067 === (7))){
var inst_40062 = (state_40066[(2)]);
var state_40066__$1 = state_40066;
var statearr_40073_40213 = state_40066__$1;
(statearr_40073_40213[(2)] = inst_40062);

(statearr_40073_40213[(1)] = (3));


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
});})(__40195,c__32551__auto___40207,G__40026_40196,n__30150__auto___40194,jobs,results,process,async))
;
return ((function (__40195,switch__32489__auto__,c__32551__auto___40207,G__40026_40196,n__30150__auto___40194,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____0 = (function (){
var statearr_40077 = [null,null,null,null,null,null,null];
(statearr_40077[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__);

(statearr_40077[(1)] = (1));

return statearr_40077;
});
var cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____1 = (function (state_40066){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_40066);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e40078){if((e40078 instanceof Object)){
var ex__32493__auto__ = e40078;
var statearr_40079_40214 = state_40066;
(statearr_40079_40214[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40066);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40078;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40215 = state_40066;
state_40066 = G__40215;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__ = function(state_40066){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____1.call(this,state_40066);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__;
})()
;})(__40195,switch__32489__auto__,c__32551__auto___40207,G__40026_40196,n__30150__auto___40194,jobs,results,process,async))
})();
var state__32553__auto__ = (function (){var statearr_40080 = f__32552__auto__.call(null);
(statearr_40080[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___40207);

return statearr_40080;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(__40195,c__32551__auto___40207,G__40026_40196,n__30150__auto___40194,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__40216 = (__40195 + (1));
__40195 = G__40216;
continue;
} else {
}
break;
}

var c__32551__auto___40217 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto___40217,jobs,results,process,async){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto___40217,jobs,results,process,async){
return (function (state_40102){
var state_val_40103 = (state_40102[(1)]);
if((state_val_40103 === (1))){
var state_40102__$1 = state_40102;
var statearr_40104_40218 = state_40102__$1;
(statearr_40104_40218[(2)] = null);

(statearr_40104_40218[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40103 === (2))){
var state_40102__$1 = state_40102;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40102__$1,(4),from);
} else {
if((state_val_40103 === (3))){
var inst_40100 = (state_40102[(2)]);
var state_40102__$1 = state_40102;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40102__$1,inst_40100);
} else {
if((state_val_40103 === (4))){
var inst_40083 = (state_40102[(7)]);
var inst_40083__$1 = (state_40102[(2)]);
var inst_40084 = (inst_40083__$1 == null);
var state_40102__$1 = (function (){var statearr_40105 = state_40102;
(statearr_40105[(7)] = inst_40083__$1);

return statearr_40105;
})();
if(cljs.core.truth_(inst_40084)){
var statearr_40106_40219 = state_40102__$1;
(statearr_40106_40219[(1)] = (5));

} else {
var statearr_40107_40220 = state_40102__$1;
(statearr_40107_40220[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40103 === (5))){
var inst_40086 = cljs.core.async.close_BANG_.call(null,jobs);
var state_40102__$1 = state_40102;
var statearr_40108_40221 = state_40102__$1;
(statearr_40108_40221[(2)] = inst_40086);

(statearr_40108_40221[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40103 === (6))){
var inst_40083 = (state_40102[(7)]);
var inst_40088 = (state_40102[(8)]);
var inst_40088__$1 = cljs.core.async.chan.call(null,(1));
var inst_40089 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_40090 = [inst_40083,inst_40088__$1];
var inst_40091 = (new cljs.core.PersistentVector(null,2,(5),inst_40089,inst_40090,null));
var state_40102__$1 = (function (){var statearr_40109 = state_40102;
(statearr_40109[(8)] = inst_40088__$1);

return statearr_40109;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40102__$1,(8),jobs,inst_40091);
} else {
if((state_val_40103 === (7))){
var inst_40098 = (state_40102[(2)]);
var state_40102__$1 = state_40102;
var statearr_40110_40222 = state_40102__$1;
(statearr_40110_40222[(2)] = inst_40098);

(statearr_40110_40222[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40103 === (8))){
var inst_40088 = (state_40102[(8)]);
var inst_40093 = (state_40102[(2)]);
var state_40102__$1 = (function (){var statearr_40111 = state_40102;
(statearr_40111[(9)] = inst_40093);

return statearr_40111;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40102__$1,(9),results,inst_40088);
} else {
if((state_val_40103 === (9))){
var inst_40095 = (state_40102[(2)]);
var state_40102__$1 = (function (){var statearr_40112 = state_40102;
(statearr_40112[(10)] = inst_40095);

return statearr_40112;
})();
var statearr_40113_40223 = state_40102__$1;
(statearr_40113_40223[(2)] = null);

(statearr_40113_40223[(1)] = (2));


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
});})(c__32551__auto___40217,jobs,results,process,async))
;
return ((function (switch__32489__auto__,c__32551__auto___40217,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____0 = (function (){
var statearr_40117 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_40117[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__);

(statearr_40117[(1)] = (1));

return statearr_40117;
});
var cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____1 = (function (state_40102){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_40102);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e40118){if((e40118 instanceof Object)){
var ex__32493__auto__ = e40118;
var statearr_40119_40224 = state_40102;
(statearr_40119_40224[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40102);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40118;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40225 = state_40102;
state_40102 = G__40225;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__ = function(state_40102){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____1.call(this,state_40102);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto___40217,jobs,results,process,async))
})();
var state__32553__auto__ = (function (){var statearr_40120 = f__32552__auto__.call(null);
(statearr_40120[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___40217);

return statearr_40120;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto___40217,jobs,results,process,async))
);


var c__32551__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto__,jobs,results,process,async){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto__,jobs,results,process,async){
return (function (state_40158){
var state_val_40159 = (state_40158[(1)]);
if((state_val_40159 === (7))){
var inst_40154 = (state_40158[(2)]);
var state_40158__$1 = state_40158;
var statearr_40160_40226 = state_40158__$1;
(statearr_40160_40226[(2)] = inst_40154);

(statearr_40160_40226[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40159 === (20))){
var state_40158__$1 = state_40158;
var statearr_40161_40227 = state_40158__$1;
(statearr_40161_40227[(2)] = null);

(statearr_40161_40227[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40159 === (1))){
var state_40158__$1 = state_40158;
var statearr_40162_40228 = state_40158__$1;
(statearr_40162_40228[(2)] = null);

(statearr_40162_40228[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40159 === (4))){
var inst_40123 = (state_40158[(7)]);
var inst_40123__$1 = (state_40158[(2)]);
var inst_40124 = (inst_40123__$1 == null);
var state_40158__$1 = (function (){var statearr_40163 = state_40158;
(statearr_40163[(7)] = inst_40123__$1);

return statearr_40163;
})();
if(cljs.core.truth_(inst_40124)){
var statearr_40164_40229 = state_40158__$1;
(statearr_40164_40229[(1)] = (5));

} else {
var statearr_40165_40230 = state_40158__$1;
(statearr_40165_40230[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40159 === (15))){
var inst_40136 = (state_40158[(8)]);
var state_40158__$1 = state_40158;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40158__$1,(18),to,inst_40136);
} else {
if((state_val_40159 === (21))){
var inst_40149 = (state_40158[(2)]);
var state_40158__$1 = state_40158;
var statearr_40166_40231 = state_40158__$1;
(statearr_40166_40231[(2)] = inst_40149);

(statearr_40166_40231[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40159 === (13))){
var inst_40151 = (state_40158[(2)]);
var state_40158__$1 = (function (){var statearr_40167 = state_40158;
(statearr_40167[(9)] = inst_40151);

return statearr_40167;
})();
var statearr_40168_40232 = state_40158__$1;
(statearr_40168_40232[(2)] = null);

(statearr_40168_40232[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40159 === (6))){
var inst_40123 = (state_40158[(7)]);
var state_40158__$1 = state_40158;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40158__$1,(11),inst_40123);
} else {
if((state_val_40159 === (17))){
var inst_40144 = (state_40158[(2)]);
var state_40158__$1 = state_40158;
if(cljs.core.truth_(inst_40144)){
var statearr_40169_40233 = state_40158__$1;
(statearr_40169_40233[(1)] = (19));

} else {
var statearr_40170_40234 = state_40158__$1;
(statearr_40170_40234[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40159 === (3))){
var inst_40156 = (state_40158[(2)]);
var state_40158__$1 = state_40158;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40158__$1,inst_40156);
} else {
if((state_val_40159 === (12))){
var inst_40133 = (state_40158[(10)]);
var state_40158__$1 = state_40158;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40158__$1,(14),inst_40133);
} else {
if((state_val_40159 === (2))){
var state_40158__$1 = state_40158;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40158__$1,(4),results);
} else {
if((state_val_40159 === (19))){
var state_40158__$1 = state_40158;
var statearr_40171_40235 = state_40158__$1;
(statearr_40171_40235[(2)] = null);

(statearr_40171_40235[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40159 === (11))){
var inst_40133 = (state_40158[(2)]);
var state_40158__$1 = (function (){var statearr_40172 = state_40158;
(statearr_40172[(10)] = inst_40133);

return statearr_40172;
})();
var statearr_40173_40236 = state_40158__$1;
(statearr_40173_40236[(2)] = null);

(statearr_40173_40236[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40159 === (9))){
var state_40158__$1 = state_40158;
var statearr_40174_40237 = state_40158__$1;
(statearr_40174_40237[(2)] = null);

(statearr_40174_40237[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40159 === (5))){
var state_40158__$1 = state_40158;
if(cljs.core.truth_(close_QMARK_)){
var statearr_40175_40238 = state_40158__$1;
(statearr_40175_40238[(1)] = (8));

} else {
var statearr_40176_40239 = state_40158__$1;
(statearr_40176_40239[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40159 === (14))){
var inst_40138 = (state_40158[(11)]);
var inst_40136 = (state_40158[(8)]);
var inst_40136__$1 = (state_40158[(2)]);
var inst_40137 = (inst_40136__$1 == null);
var inst_40138__$1 = cljs.core.not.call(null,inst_40137);
var state_40158__$1 = (function (){var statearr_40177 = state_40158;
(statearr_40177[(11)] = inst_40138__$1);

(statearr_40177[(8)] = inst_40136__$1);

return statearr_40177;
})();
if(inst_40138__$1){
var statearr_40178_40240 = state_40158__$1;
(statearr_40178_40240[(1)] = (15));

} else {
var statearr_40179_40241 = state_40158__$1;
(statearr_40179_40241[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40159 === (16))){
var inst_40138 = (state_40158[(11)]);
var state_40158__$1 = state_40158;
var statearr_40180_40242 = state_40158__$1;
(statearr_40180_40242[(2)] = inst_40138);

(statearr_40180_40242[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40159 === (10))){
var inst_40130 = (state_40158[(2)]);
var state_40158__$1 = state_40158;
var statearr_40181_40243 = state_40158__$1;
(statearr_40181_40243[(2)] = inst_40130);

(statearr_40181_40243[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40159 === (18))){
var inst_40141 = (state_40158[(2)]);
var state_40158__$1 = state_40158;
var statearr_40182_40244 = state_40158__$1;
(statearr_40182_40244[(2)] = inst_40141);

(statearr_40182_40244[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40159 === (8))){
var inst_40127 = cljs.core.async.close_BANG_.call(null,to);
var state_40158__$1 = state_40158;
var statearr_40183_40245 = state_40158__$1;
(statearr_40183_40245[(2)] = inst_40127);

(statearr_40183_40245[(1)] = (10));


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
});})(c__32551__auto__,jobs,results,process,async))
;
return ((function (switch__32489__auto__,c__32551__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____0 = (function (){
var statearr_40187 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_40187[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__);

(statearr_40187[(1)] = (1));

return statearr_40187;
});
var cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____1 = (function (state_40158){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_40158);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e40188){if((e40188 instanceof Object)){
var ex__32493__auto__ = e40188;
var statearr_40189_40246 = state_40158;
(statearr_40189_40246[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40158);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40188;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40247 = state_40158;
state_40158 = G__40247;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__ = function(state_40158){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____1.call(this,state_40158);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__32490__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto__,jobs,results,process,async))
})();
var state__32553__auto__ = (function (){var statearr_40190 = f__32552__auto__.call(null);
(statearr_40190[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto__);

return statearr_40190;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto__,jobs,results,process,async))
);

return c__32551__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel, subject to the async function af, with parallelism n. af
 * must be a function of two arguments, the first an input value and
 * the second a channel on which to place the result(s). af must close!
 * the channel before returning.  The presumption is that af will
 * return immediately, having launched some asynchronous operation
 * whose completion/callback will manipulate the result channel. Outputs
 * will be returned in order relative to  the inputs. By default, the to
 * channel will be closed when the from channel closes, but can be
 * determined by the close?  parameter. Will stop consuming the from
 * channel if the to channel closes.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(){
var G__40249 = arguments.length;
switch (G__40249) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

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
 * channel, subject to the transducer xf, with parallelism n. Because
 * it is parallel, the transducer will be applied independently to each
 * element, not across elements, and may produce zero or more outputs
 * per input.  Outputs will be returned in order relative to the
 * inputs. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes.
 * 
 * Note this is supplied for API compatibility with the Clojure version.
 * Values of N > 1 will not result in actual concurrency in a
 * single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(){
var G__40252 = arguments.length;
switch (G__40252) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

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
 * channels, the first of which will contain the values for which the
 * predicate returned true, the second those for which it returned
 * false.
 * 
 * The out channels will be unbuffered by default, or two buf-or-ns can
 * be supplied. The channels will close after the source channel has
 * closed.
 */
cljs.core.async.split = (function cljs$core$async$split(){
var G__40255 = arguments.length;
switch (G__40255) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__32551__auto___40307 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto___40307,tc,fc){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto___40307,tc,fc){
return (function (state_40281){
var state_val_40282 = (state_40281[(1)]);
if((state_val_40282 === (7))){
var inst_40277 = (state_40281[(2)]);
var state_40281__$1 = state_40281;
var statearr_40283_40308 = state_40281__$1;
(statearr_40283_40308[(2)] = inst_40277);

(statearr_40283_40308[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40282 === (1))){
var state_40281__$1 = state_40281;
var statearr_40284_40309 = state_40281__$1;
(statearr_40284_40309[(2)] = null);

(statearr_40284_40309[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40282 === (4))){
var inst_40258 = (state_40281[(7)]);
var inst_40258__$1 = (state_40281[(2)]);
var inst_40259 = (inst_40258__$1 == null);
var state_40281__$1 = (function (){var statearr_40285 = state_40281;
(statearr_40285[(7)] = inst_40258__$1);

return statearr_40285;
})();
if(cljs.core.truth_(inst_40259)){
var statearr_40286_40310 = state_40281__$1;
(statearr_40286_40310[(1)] = (5));

} else {
var statearr_40287_40311 = state_40281__$1;
(statearr_40287_40311[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40282 === (13))){
var state_40281__$1 = state_40281;
var statearr_40288_40312 = state_40281__$1;
(statearr_40288_40312[(2)] = null);

(statearr_40288_40312[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40282 === (6))){
var inst_40258 = (state_40281[(7)]);
var inst_40264 = p.call(null,inst_40258);
var state_40281__$1 = state_40281;
if(cljs.core.truth_(inst_40264)){
var statearr_40289_40313 = state_40281__$1;
(statearr_40289_40313[(1)] = (9));

} else {
var statearr_40290_40314 = state_40281__$1;
(statearr_40290_40314[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40282 === (3))){
var inst_40279 = (state_40281[(2)]);
var state_40281__$1 = state_40281;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40281__$1,inst_40279);
} else {
if((state_val_40282 === (12))){
var state_40281__$1 = state_40281;
var statearr_40291_40315 = state_40281__$1;
(statearr_40291_40315[(2)] = null);

(statearr_40291_40315[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40282 === (2))){
var state_40281__$1 = state_40281;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40281__$1,(4),ch);
} else {
if((state_val_40282 === (11))){
var inst_40258 = (state_40281[(7)]);
var inst_40268 = (state_40281[(2)]);
var state_40281__$1 = state_40281;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40281__$1,(8),inst_40268,inst_40258);
} else {
if((state_val_40282 === (9))){
var state_40281__$1 = state_40281;
var statearr_40292_40316 = state_40281__$1;
(statearr_40292_40316[(2)] = tc);

(statearr_40292_40316[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40282 === (5))){
var inst_40261 = cljs.core.async.close_BANG_.call(null,tc);
var inst_40262 = cljs.core.async.close_BANG_.call(null,fc);
var state_40281__$1 = (function (){var statearr_40293 = state_40281;
(statearr_40293[(8)] = inst_40261);

return statearr_40293;
})();
var statearr_40294_40317 = state_40281__$1;
(statearr_40294_40317[(2)] = inst_40262);

(statearr_40294_40317[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40282 === (14))){
var inst_40275 = (state_40281[(2)]);
var state_40281__$1 = state_40281;
var statearr_40295_40318 = state_40281__$1;
(statearr_40295_40318[(2)] = inst_40275);

(statearr_40295_40318[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40282 === (10))){
var state_40281__$1 = state_40281;
var statearr_40296_40319 = state_40281__$1;
(statearr_40296_40319[(2)] = fc);

(statearr_40296_40319[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40282 === (8))){
var inst_40270 = (state_40281[(2)]);
var state_40281__$1 = state_40281;
if(cljs.core.truth_(inst_40270)){
var statearr_40297_40320 = state_40281__$1;
(statearr_40297_40320[(1)] = (12));

} else {
var statearr_40298_40321 = state_40281__$1;
(statearr_40298_40321[(1)] = (13));

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
});})(c__32551__auto___40307,tc,fc))
;
return ((function (switch__32489__auto__,c__32551__auto___40307,tc,fc){
return (function() {
var cljs$core$async$state_machine__32490__auto__ = null;
var cljs$core$async$state_machine__32490__auto____0 = (function (){
var statearr_40302 = [null,null,null,null,null,null,null,null,null];
(statearr_40302[(0)] = cljs$core$async$state_machine__32490__auto__);

(statearr_40302[(1)] = (1));

return statearr_40302;
});
var cljs$core$async$state_machine__32490__auto____1 = (function (state_40281){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_40281);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e40303){if((e40303 instanceof Object)){
var ex__32493__auto__ = e40303;
var statearr_40304_40322 = state_40281;
(statearr_40304_40322[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40281);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40303;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40323 = state_40281;
state_40281 = G__40323;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$state_machine__32490__auto__ = function(state_40281){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32490__auto____1.call(this,state_40281);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32490__auto____0;
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32490__auto____1;
return cljs$core$async$state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto___40307,tc,fc))
})();
var state__32553__auto__ = (function (){var statearr_40305 = f__32552__auto__.call(null);
(statearr_40305[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___40307);

return statearr_40305;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto___40307,tc,fc))
);


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});

cljs.core.async.split.cljs$lang$maxFixedArity = 4;
/**
 * f should be a function of 2 arguments. Returns a channel containing
 * the single result of applying f to init and the first item from the
 * channel, then applying f to that result and the 2nd item, etc. If
 * the channel closes without yielding items, returns init and f is not
 * called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__32551__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto__){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto__){
return (function (state_40370){
var state_val_40371 = (state_40370[(1)]);
if((state_val_40371 === (1))){
var inst_40356 = init;
var state_40370__$1 = (function (){var statearr_40372 = state_40370;
(statearr_40372[(7)] = inst_40356);

return statearr_40372;
})();
var statearr_40373_40388 = state_40370__$1;
(statearr_40373_40388[(2)] = null);

(statearr_40373_40388[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40371 === (2))){
var state_40370__$1 = state_40370;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40370__$1,(4),ch);
} else {
if((state_val_40371 === (3))){
var inst_40368 = (state_40370[(2)]);
var state_40370__$1 = state_40370;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40370__$1,inst_40368);
} else {
if((state_val_40371 === (4))){
var inst_40359 = (state_40370[(8)]);
var inst_40359__$1 = (state_40370[(2)]);
var inst_40360 = (inst_40359__$1 == null);
var state_40370__$1 = (function (){var statearr_40374 = state_40370;
(statearr_40374[(8)] = inst_40359__$1);

return statearr_40374;
})();
if(cljs.core.truth_(inst_40360)){
var statearr_40375_40389 = state_40370__$1;
(statearr_40375_40389[(1)] = (5));

} else {
var statearr_40376_40390 = state_40370__$1;
(statearr_40376_40390[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40371 === (5))){
var inst_40356 = (state_40370[(7)]);
var state_40370__$1 = state_40370;
var statearr_40377_40391 = state_40370__$1;
(statearr_40377_40391[(2)] = inst_40356);

(statearr_40377_40391[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40371 === (6))){
var inst_40356 = (state_40370[(7)]);
var inst_40359 = (state_40370[(8)]);
var inst_40363 = f.call(null,inst_40356,inst_40359);
var inst_40356__$1 = inst_40363;
var state_40370__$1 = (function (){var statearr_40378 = state_40370;
(statearr_40378[(7)] = inst_40356__$1);

return statearr_40378;
})();
var statearr_40379_40392 = state_40370__$1;
(statearr_40379_40392[(2)] = null);

(statearr_40379_40392[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40371 === (7))){
var inst_40366 = (state_40370[(2)]);
var state_40370__$1 = state_40370;
var statearr_40380_40393 = state_40370__$1;
(statearr_40380_40393[(2)] = inst_40366);

(statearr_40380_40393[(1)] = (3));


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
});})(c__32551__auto__))
;
return ((function (switch__32489__auto__,c__32551__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__32490__auto__ = null;
var cljs$core$async$reduce_$_state_machine__32490__auto____0 = (function (){
var statearr_40384 = [null,null,null,null,null,null,null,null,null];
(statearr_40384[(0)] = cljs$core$async$reduce_$_state_machine__32490__auto__);

(statearr_40384[(1)] = (1));

return statearr_40384;
});
var cljs$core$async$reduce_$_state_machine__32490__auto____1 = (function (state_40370){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_40370);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e40385){if((e40385 instanceof Object)){
var ex__32493__auto__ = e40385;
var statearr_40386_40394 = state_40370;
(statearr_40386_40394[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40370);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40385;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40395 = state_40370;
state_40370 = G__40395;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__32490__auto__ = function(state_40370){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__32490__auto____1.call(this,state_40370);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__32490__auto____0;
cljs$core$async$reduce_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__32490__auto____1;
return cljs$core$async$reduce_$_state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto__))
})();
var state__32553__auto__ = (function (){var statearr_40387 = f__32552__auto__.call(null);
(statearr_40387[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto__);

return statearr_40387;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto__))
);

return c__32551__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 * By default the channel will be closed after the items are copied,
 * but can be determined by the close? parameter.
 * 
 * Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(){
var G__40397 = arguments.length;
switch (G__40397) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__32551__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto__){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto__){
return (function (state_40422){
var state_val_40423 = (state_40422[(1)]);
if((state_val_40423 === (7))){
var inst_40404 = (state_40422[(2)]);
var state_40422__$1 = state_40422;
var statearr_40424_40448 = state_40422__$1;
(statearr_40424_40448[(2)] = inst_40404);

(statearr_40424_40448[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40423 === (1))){
var inst_40398 = cljs.core.seq.call(null,coll);
var inst_40399 = inst_40398;
var state_40422__$1 = (function (){var statearr_40425 = state_40422;
(statearr_40425[(7)] = inst_40399);

return statearr_40425;
})();
var statearr_40426_40449 = state_40422__$1;
(statearr_40426_40449[(2)] = null);

(statearr_40426_40449[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40423 === (4))){
var inst_40399 = (state_40422[(7)]);
var inst_40402 = cljs.core.first.call(null,inst_40399);
var state_40422__$1 = state_40422;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40422__$1,(7),ch,inst_40402);
} else {
if((state_val_40423 === (13))){
var inst_40416 = (state_40422[(2)]);
var state_40422__$1 = state_40422;
var statearr_40427_40450 = state_40422__$1;
(statearr_40427_40450[(2)] = inst_40416);

(statearr_40427_40450[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40423 === (6))){
var inst_40407 = (state_40422[(2)]);
var state_40422__$1 = state_40422;
if(cljs.core.truth_(inst_40407)){
var statearr_40428_40451 = state_40422__$1;
(statearr_40428_40451[(1)] = (8));

} else {
var statearr_40429_40452 = state_40422__$1;
(statearr_40429_40452[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40423 === (3))){
var inst_40420 = (state_40422[(2)]);
var state_40422__$1 = state_40422;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40422__$1,inst_40420);
} else {
if((state_val_40423 === (12))){
var state_40422__$1 = state_40422;
var statearr_40430_40453 = state_40422__$1;
(statearr_40430_40453[(2)] = null);

(statearr_40430_40453[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40423 === (2))){
var inst_40399 = (state_40422[(7)]);
var state_40422__$1 = state_40422;
if(cljs.core.truth_(inst_40399)){
var statearr_40431_40454 = state_40422__$1;
(statearr_40431_40454[(1)] = (4));

} else {
var statearr_40432_40455 = state_40422__$1;
(statearr_40432_40455[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40423 === (11))){
var inst_40413 = cljs.core.async.close_BANG_.call(null,ch);
var state_40422__$1 = state_40422;
var statearr_40433_40456 = state_40422__$1;
(statearr_40433_40456[(2)] = inst_40413);

(statearr_40433_40456[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40423 === (9))){
var state_40422__$1 = state_40422;
if(cljs.core.truth_(close_QMARK_)){
var statearr_40434_40457 = state_40422__$1;
(statearr_40434_40457[(1)] = (11));

} else {
var statearr_40435_40458 = state_40422__$1;
(statearr_40435_40458[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40423 === (5))){
var inst_40399 = (state_40422[(7)]);
var state_40422__$1 = state_40422;
var statearr_40436_40459 = state_40422__$1;
(statearr_40436_40459[(2)] = inst_40399);

(statearr_40436_40459[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40423 === (10))){
var inst_40418 = (state_40422[(2)]);
var state_40422__$1 = state_40422;
var statearr_40437_40460 = state_40422__$1;
(statearr_40437_40460[(2)] = inst_40418);

(statearr_40437_40460[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40423 === (8))){
var inst_40399 = (state_40422[(7)]);
var inst_40409 = cljs.core.next.call(null,inst_40399);
var inst_40399__$1 = inst_40409;
var state_40422__$1 = (function (){var statearr_40438 = state_40422;
(statearr_40438[(7)] = inst_40399__$1);

return statearr_40438;
})();
var statearr_40439_40461 = state_40422__$1;
(statearr_40439_40461[(2)] = null);

(statearr_40439_40461[(1)] = (2));


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
});})(c__32551__auto__))
;
return ((function (switch__32489__auto__,c__32551__auto__){
return (function() {
var cljs$core$async$state_machine__32490__auto__ = null;
var cljs$core$async$state_machine__32490__auto____0 = (function (){
var statearr_40443 = [null,null,null,null,null,null,null,null];
(statearr_40443[(0)] = cljs$core$async$state_machine__32490__auto__);

(statearr_40443[(1)] = (1));

return statearr_40443;
});
var cljs$core$async$state_machine__32490__auto____1 = (function (state_40422){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_40422);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e40444){if((e40444 instanceof Object)){
var ex__32493__auto__ = e40444;
var statearr_40445_40462 = state_40422;
(statearr_40445_40462[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40422);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40444;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40463 = state_40422;
state_40422 = G__40463;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$state_machine__32490__auto__ = function(state_40422){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32490__auto____1.call(this,state_40422);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32490__auto____0;
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32490__auto____1;
return cljs$core$async$state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto__))
})();
var state__32553__auto__ = (function (){var statearr_40446 = f__32552__auto__.call(null);
(statearr_40446[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto__);

return statearr_40446;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto__))
);

return c__32551__auto__;
});

cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3;
/**
 * Creates and returns a channel which contains the contents of coll,
 * closing when exhausted.
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));
cljs.core.async.onto_chan.call(null,ch,coll);

return ch;
});

cljs.core.async.Mux = (function (){var obj40465 = {};
return obj40465;
})();

cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((function (){var and__29253__auto__ = _;
if(and__29253__auto__){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1;
} else {
return and__29253__auto__;
}
})()){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
var x__29901__auto__ = (((_ == null))?null:_);
return (function (){var or__29265__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
})().call(null,_);
}
});


cljs.core.async.Mult = (function (){var obj40467 = {};
return obj40467;
})();

cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((function (){var and__29253__auto__ = m;
if(and__29253__auto__){
return m.cljs$core$async$Mult$tap_STAR_$arity$3;
} else {
return and__29253__auto__;
}
})()){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
var x__29901__auto__ = (((m == null))?null:m);
return (function (){var or__29265__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (cljs.core.async.tap_STAR_["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
})().call(null,m,ch,close_QMARK_);
}
});

cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((function (){var and__29253__auto__ = m;
if(and__29253__auto__){
return m.cljs$core$async$Mult$untap_STAR_$arity$2;
} else {
return and__29253__auto__;
}
})()){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
var x__29901__auto__ = (((m == null))?null:m);
return (function (){var or__29265__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (cljs.core.async.untap_STAR_["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
})().call(null,m,ch);
}
});

cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((function (){var and__29253__auto__ = m;
if(and__29253__auto__){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1;
} else {
return and__29253__auto__;
}
})()){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
var x__29901__auto__ = (((m == null))?null:m);
return (function (){var or__29265__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
})().call(null,m);
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 * containing copies of the channel can be created with 'tap', and
 * detached with 'untap'.
 * 
 * Each item is distributed to all taps in parallel and synchronously,
 * i.e. each tap must accept before the next item is distributed. Use
 * buffering/windowing to prevent slow taps from holding up the mult.
 * 
 * Items received when there are no taps get dropped.
 * 
 * If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if(typeof cljs.core.async.t40689 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t40689 = (function (mult,ch,cs,meta40690){
this.mult = mult;
this.ch = ch;
this.cs = cs;
this.meta40690 = meta40690;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t40689.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_40691,meta40690__$1){
var self__ = this;
var _40691__$1 = this;
return (new cljs.core.async.t40689(self__.mult,self__.ch,self__.cs,meta40690__$1));
});})(cs))
;

cljs.core.async.t40689.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_40691){
var self__ = this;
var _40691__$1 = this;
return self__.meta40690;
});})(cs))
;

cljs.core.async.t40689.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t40689.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t40689.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t40689.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t40689.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t40689.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t40689.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"mult","mult",-1187640995,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta40690","meta40690",749500739,null)], null);
});})(cs))
;

cljs.core.async.t40689.cljs$lang$type = true;

cljs.core.async.t40689.cljs$lang$ctorStr = "cljs.core.async/t40689";

cljs.core.async.t40689.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__29844__auto__,writer__29845__auto__,opt__29846__auto__){
return cljs.core._write.call(null,writer__29845__auto__,"cljs.core.async/t40689");
});})(cs))
;

cljs.core.async.__GT_t40689 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t40689(mult__$1,ch__$1,cs__$1,meta40690){
return (new cljs.core.async.t40689(mult__$1,ch__$1,cs__$1,meta40690));
});})(cs))
;

}

return (new cljs.core.async.t40689(cljs$core$async$mult,ch,cs,cljs.core.PersistentArrayMap.EMPTY));
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
var c__32551__auto___40910 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto___40910,cs,m,dchan,dctr,done){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto___40910,cs,m,dchan,dctr,done){
return (function (state_40822){
var state_val_40823 = (state_40822[(1)]);
if((state_val_40823 === (7))){
var inst_40818 = (state_40822[(2)]);
var state_40822__$1 = state_40822;
var statearr_40824_40911 = state_40822__$1;
(statearr_40824_40911[(2)] = inst_40818);

(statearr_40824_40911[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (20))){
var inst_40723 = (state_40822[(7)]);
var inst_40733 = cljs.core.first.call(null,inst_40723);
var inst_40734 = cljs.core.nth.call(null,inst_40733,(0),null);
var inst_40735 = cljs.core.nth.call(null,inst_40733,(1),null);
var state_40822__$1 = (function (){var statearr_40825 = state_40822;
(statearr_40825[(8)] = inst_40734);

return statearr_40825;
})();
if(cljs.core.truth_(inst_40735)){
var statearr_40826_40912 = state_40822__$1;
(statearr_40826_40912[(1)] = (22));

} else {
var statearr_40827_40913 = state_40822__$1;
(statearr_40827_40913[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (27))){
var inst_40765 = (state_40822[(9)]);
var inst_40763 = (state_40822[(10)]);
var inst_40770 = (state_40822[(11)]);
var inst_40694 = (state_40822[(12)]);
var inst_40770__$1 = cljs.core._nth.call(null,inst_40763,inst_40765);
var inst_40771 = cljs.core.async.put_BANG_.call(null,inst_40770__$1,inst_40694,done);
var state_40822__$1 = (function (){var statearr_40828 = state_40822;
(statearr_40828[(11)] = inst_40770__$1);

return statearr_40828;
})();
if(cljs.core.truth_(inst_40771)){
var statearr_40829_40914 = state_40822__$1;
(statearr_40829_40914[(1)] = (30));

} else {
var statearr_40830_40915 = state_40822__$1;
(statearr_40830_40915[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (1))){
var state_40822__$1 = state_40822;
var statearr_40831_40916 = state_40822__$1;
(statearr_40831_40916[(2)] = null);

(statearr_40831_40916[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (24))){
var inst_40723 = (state_40822[(7)]);
var inst_40740 = (state_40822[(2)]);
var inst_40741 = cljs.core.next.call(null,inst_40723);
var inst_40703 = inst_40741;
var inst_40704 = null;
var inst_40705 = (0);
var inst_40706 = (0);
var state_40822__$1 = (function (){var statearr_40832 = state_40822;
(statearr_40832[(13)] = inst_40704);

(statearr_40832[(14)] = inst_40740);

(statearr_40832[(15)] = inst_40703);

(statearr_40832[(16)] = inst_40706);

(statearr_40832[(17)] = inst_40705);

return statearr_40832;
})();
var statearr_40833_40917 = state_40822__$1;
(statearr_40833_40917[(2)] = null);

(statearr_40833_40917[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (39))){
var state_40822__$1 = state_40822;
var statearr_40837_40918 = state_40822__$1;
(statearr_40837_40918[(2)] = null);

(statearr_40837_40918[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (4))){
var inst_40694 = (state_40822[(12)]);
var inst_40694__$1 = (state_40822[(2)]);
var inst_40695 = (inst_40694__$1 == null);
var state_40822__$1 = (function (){var statearr_40838 = state_40822;
(statearr_40838[(12)] = inst_40694__$1);

return statearr_40838;
})();
if(cljs.core.truth_(inst_40695)){
var statearr_40839_40919 = state_40822__$1;
(statearr_40839_40919[(1)] = (5));

} else {
var statearr_40840_40920 = state_40822__$1;
(statearr_40840_40920[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (15))){
var inst_40704 = (state_40822[(13)]);
var inst_40703 = (state_40822[(15)]);
var inst_40706 = (state_40822[(16)]);
var inst_40705 = (state_40822[(17)]);
var inst_40719 = (state_40822[(2)]);
var inst_40720 = (inst_40706 + (1));
var tmp40834 = inst_40704;
var tmp40835 = inst_40703;
var tmp40836 = inst_40705;
var inst_40703__$1 = tmp40835;
var inst_40704__$1 = tmp40834;
var inst_40705__$1 = tmp40836;
var inst_40706__$1 = inst_40720;
var state_40822__$1 = (function (){var statearr_40841 = state_40822;
(statearr_40841[(13)] = inst_40704__$1);

(statearr_40841[(18)] = inst_40719);

(statearr_40841[(15)] = inst_40703__$1);

(statearr_40841[(16)] = inst_40706__$1);

(statearr_40841[(17)] = inst_40705__$1);

return statearr_40841;
})();
var statearr_40842_40921 = state_40822__$1;
(statearr_40842_40921[(2)] = null);

(statearr_40842_40921[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (21))){
var inst_40744 = (state_40822[(2)]);
var state_40822__$1 = state_40822;
var statearr_40846_40922 = state_40822__$1;
(statearr_40846_40922[(2)] = inst_40744);

(statearr_40846_40922[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (31))){
var inst_40770 = (state_40822[(11)]);
var inst_40774 = done.call(null,null);
var inst_40775 = cljs.core.async.untap_STAR_.call(null,m,inst_40770);
var state_40822__$1 = (function (){var statearr_40847 = state_40822;
(statearr_40847[(19)] = inst_40774);

return statearr_40847;
})();
var statearr_40848_40923 = state_40822__$1;
(statearr_40848_40923[(2)] = inst_40775);

(statearr_40848_40923[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (32))){
var inst_40765 = (state_40822[(9)]);
var inst_40763 = (state_40822[(10)]);
var inst_40762 = (state_40822[(20)]);
var inst_40764 = (state_40822[(21)]);
var inst_40777 = (state_40822[(2)]);
var inst_40778 = (inst_40765 + (1));
var tmp40843 = inst_40763;
var tmp40844 = inst_40762;
var tmp40845 = inst_40764;
var inst_40762__$1 = tmp40844;
var inst_40763__$1 = tmp40843;
var inst_40764__$1 = tmp40845;
var inst_40765__$1 = inst_40778;
var state_40822__$1 = (function (){var statearr_40849 = state_40822;
(statearr_40849[(9)] = inst_40765__$1);

(statearr_40849[(10)] = inst_40763__$1);

(statearr_40849[(20)] = inst_40762__$1);

(statearr_40849[(21)] = inst_40764__$1);

(statearr_40849[(22)] = inst_40777);

return statearr_40849;
})();
var statearr_40850_40924 = state_40822__$1;
(statearr_40850_40924[(2)] = null);

(statearr_40850_40924[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (40))){
var inst_40790 = (state_40822[(23)]);
var inst_40794 = done.call(null,null);
var inst_40795 = cljs.core.async.untap_STAR_.call(null,m,inst_40790);
var state_40822__$1 = (function (){var statearr_40851 = state_40822;
(statearr_40851[(24)] = inst_40794);

return statearr_40851;
})();
var statearr_40852_40925 = state_40822__$1;
(statearr_40852_40925[(2)] = inst_40795);

(statearr_40852_40925[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (33))){
var inst_40781 = (state_40822[(25)]);
var inst_40783 = cljs.core.chunked_seq_QMARK_.call(null,inst_40781);
var state_40822__$1 = state_40822;
if(inst_40783){
var statearr_40853_40926 = state_40822__$1;
(statearr_40853_40926[(1)] = (36));

} else {
var statearr_40854_40927 = state_40822__$1;
(statearr_40854_40927[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (13))){
var inst_40713 = (state_40822[(26)]);
var inst_40716 = cljs.core.async.close_BANG_.call(null,inst_40713);
var state_40822__$1 = state_40822;
var statearr_40855_40928 = state_40822__$1;
(statearr_40855_40928[(2)] = inst_40716);

(statearr_40855_40928[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (22))){
var inst_40734 = (state_40822[(8)]);
var inst_40737 = cljs.core.async.close_BANG_.call(null,inst_40734);
var state_40822__$1 = state_40822;
var statearr_40856_40929 = state_40822__$1;
(statearr_40856_40929[(2)] = inst_40737);

(statearr_40856_40929[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (36))){
var inst_40781 = (state_40822[(25)]);
var inst_40785 = cljs.core.chunk_first.call(null,inst_40781);
var inst_40786 = cljs.core.chunk_rest.call(null,inst_40781);
var inst_40787 = cljs.core.count.call(null,inst_40785);
var inst_40762 = inst_40786;
var inst_40763 = inst_40785;
var inst_40764 = inst_40787;
var inst_40765 = (0);
var state_40822__$1 = (function (){var statearr_40857 = state_40822;
(statearr_40857[(9)] = inst_40765);

(statearr_40857[(10)] = inst_40763);

(statearr_40857[(20)] = inst_40762);

(statearr_40857[(21)] = inst_40764);

return statearr_40857;
})();
var statearr_40858_40930 = state_40822__$1;
(statearr_40858_40930[(2)] = null);

(statearr_40858_40930[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (41))){
var inst_40781 = (state_40822[(25)]);
var inst_40797 = (state_40822[(2)]);
var inst_40798 = cljs.core.next.call(null,inst_40781);
var inst_40762 = inst_40798;
var inst_40763 = null;
var inst_40764 = (0);
var inst_40765 = (0);
var state_40822__$1 = (function (){var statearr_40859 = state_40822;
(statearr_40859[(9)] = inst_40765);

(statearr_40859[(10)] = inst_40763);

(statearr_40859[(20)] = inst_40762);

(statearr_40859[(27)] = inst_40797);

(statearr_40859[(21)] = inst_40764);

return statearr_40859;
})();
var statearr_40860_40931 = state_40822__$1;
(statearr_40860_40931[(2)] = null);

(statearr_40860_40931[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (43))){
var state_40822__$1 = state_40822;
var statearr_40861_40932 = state_40822__$1;
(statearr_40861_40932[(2)] = null);

(statearr_40861_40932[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (29))){
var inst_40806 = (state_40822[(2)]);
var state_40822__$1 = state_40822;
var statearr_40862_40933 = state_40822__$1;
(statearr_40862_40933[(2)] = inst_40806);

(statearr_40862_40933[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (44))){
var inst_40815 = (state_40822[(2)]);
var state_40822__$1 = (function (){var statearr_40863 = state_40822;
(statearr_40863[(28)] = inst_40815);

return statearr_40863;
})();
var statearr_40864_40934 = state_40822__$1;
(statearr_40864_40934[(2)] = null);

(statearr_40864_40934[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (6))){
var inst_40754 = (state_40822[(29)]);
var inst_40753 = cljs.core.deref.call(null,cs);
var inst_40754__$1 = cljs.core.keys.call(null,inst_40753);
var inst_40755 = cljs.core.count.call(null,inst_40754__$1);
var inst_40756 = cljs.core.reset_BANG_.call(null,dctr,inst_40755);
var inst_40761 = cljs.core.seq.call(null,inst_40754__$1);
var inst_40762 = inst_40761;
var inst_40763 = null;
var inst_40764 = (0);
var inst_40765 = (0);
var state_40822__$1 = (function (){var statearr_40865 = state_40822;
(statearr_40865[(9)] = inst_40765);

(statearr_40865[(30)] = inst_40756);

(statearr_40865[(10)] = inst_40763);

(statearr_40865[(20)] = inst_40762);

(statearr_40865[(21)] = inst_40764);

(statearr_40865[(29)] = inst_40754__$1);

return statearr_40865;
})();
var statearr_40866_40935 = state_40822__$1;
(statearr_40866_40935[(2)] = null);

(statearr_40866_40935[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (28))){
var inst_40781 = (state_40822[(25)]);
var inst_40762 = (state_40822[(20)]);
var inst_40781__$1 = cljs.core.seq.call(null,inst_40762);
var state_40822__$1 = (function (){var statearr_40867 = state_40822;
(statearr_40867[(25)] = inst_40781__$1);

return statearr_40867;
})();
if(inst_40781__$1){
var statearr_40868_40936 = state_40822__$1;
(statearr_40868_40936[(1)] = (33));

} else {
var statearr_40869_40937 = state_40822__$1;
(statearr_40869_40937[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (25))){
var inst_40765 = (state_40822[(9)]);
var inst_40764 = (state_40822[(21)]);
var inst_40767 = (inst_40765 < inst_40764);
var inst_40768 = inst_40767;
var state_40822__$1 = state_40822;
if(cljs.core.truth_(inst_40768)){
var statearr_40870_40938 = state_40822__$1;
(statearr_40870_40938[(1)] = (27));

} else {
var statearr_40871_40939 = state_40822__$1;
(statearr_40871_40939[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (34))){
var state_40822__$1 = state_40822;
var statearr_40872_40940 = state_40822__$1;
(statearr_40872_40940[(2)] = null);

(statearr_40872_40940[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (17))){
var state_40822__$1 = state_40822;
var statearr_40873_40941 = state_40822__$1;
(statearr_40873_40941[(2)] = null);

(statearr_40873_40941[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (3))){
var inst_40820 = (state_40822[(2)]);
var state_40822__$1 = state_40822;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40822__$1,inst_40820);
} else {
if((state_val_40823 === (12))){
var inst_40749 = (state_40822[(2)]);
var state_40822__$1 = state_40822;
var statearr_40874_40942 = state_40822__$1;
(statearr_40874_40942[(2)] = inst_40749);

(statearr_40874_40942[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (2))){
var state_40822__$1 = state_40822;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40822__$1,(4),ch);
} else {
if((state_val_40823 === (23))){
var state_40822__$1 = state_40822;
var statearr_40875_40943 = state_40822__$1;
(statearr_40875_40943[(2)] = null);

(statearr_40875_40943[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (35))){
var inst_40804 = (state_40822[(2)]);
var state_40822__$1 = state_40822;
var statearr_40876_40944 = state_40822__$1;
(statearr_40876_40944[(2)] = inst_40804);

(statearr_40876_40944[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (19))){
var inst_40723 = (state_40822[(7)]);
var inst_40727 = cljs.core.chunk_first.call(null,inst_40723);
var inst_40728 = cljs.core.chunk_rest.call(null,inst_40723);
var inst_40729 = cljs.core.count.call(null,inst_40727);
var inst_40703 = inst_40728;
var inst_40704 = inst_40727;
var inst_40705 = inst_40729;
var inst_40706 = (0);
var state_40822__$1 = (function (){var statearr_40877 = state_40822;
(statearr_40877[(13)] = inst_40704);

(statearr_40877[(15)] = inst_40703);

(statearr_40877[(16)] = inst_40706);

(statearr_40877[(17)] = inst_40705);

return statearr_40877;
})();
var statearr_40878_40945 = state_40822__$1;
(statearr_40878_40945[(2)] = null);

(statearr_40878_40945[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (11))){
var inst_40703 = (state_40822[(15)]);
var inst_40723 = (state_40822[(7)]);
var inst_40723__$1 = cljs.core.seq.call(null,inst_40703);
var state_40822__$1 = (function (){var statearr_40879 = state_40822;
(statearr_40879[(7)] = inst_40723__$1);

return statearr_40879;
})();
if(inst_40723__$1){
var statearr_40880_40946 = state_40822__$1;
(statearr_40880_40946[(1)] = (16));

} else {
var statearr_40881_40947 = state_40822__$1;
(statearr_40881_40947[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (9))){
var inst_40751 = (state_40822[(2)]);
var state_40822__$1 = state_40822;
var statearr_40882_40948 = state_40822__$1;
(statearr_40882_40948[(2)] = inst_40751);

(statearr_40882_40948[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (5))){
var inst_40701 = cljs.core.deref.call(null,cs);
var inst_40702 = cljs.core.seq.call(null,inst_40701);
var inst_40703 = inst_40702;
var inst_40704 = null;
var inst_40705 = (0);
var inst_40706 = (0);
var state_40822__$1 = (function (){var statearr_40883 = state_40822;
(statearr_40883[(13)] = inst_40704);

(statearr_40883[(15)] = inst_40703);

(statearr_40883[(16)] = inst_40706);

(statearr_40883[(17)] = inst_40705);

return statearr_40883;
})();
var statearr_40884_40949 = state_40822__$1;
(statearr_40884_40949[(2)] = null);

(statearr_40884_40949[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (14))){
var state_40822__$1 = state_40822;
var statearr_40885_40950 = state_40822__$1;
(statearr_40885_40950[(2)] = null);

(statearr_40885_40950[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (45))){
var inst_40812 = (state_40822[(2)]);
var state_40822__$1 = state_40822;
var statearr_40886_40951 = state_40822__$1;
(statearr_40886_40951[(2)] = inst_40812);

(statearr_40886_40951[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (26))){
var inst_40754 = (state_40822[(29)]);
var inst_40808 = (state_40822[(2)]);
var inst_40809 = cljs.core.seq.call(null,inst_40754);
var state_40822__$1 = (function (){var statearr_40887 = state_40822;
(statearr_40887[(31)] = inst_40808);

return statearr_40887;
})();
if(inst_40809){
var statearr_40888_40952 = state_40822__$1;
(statearr_40888_40952[(1)] = (42));

} else {
var statearr_40889_40953 = state_40822__$1;
(statearr_40889_40953[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (16))){
var inst_40723 = (state_40822[(7)]);
var inst_40725 = cljs.core.chunked_seq_QMARK_.call(null,inst_40723);
var state_40822__$1 = state_40822;
if(inst_40725){
var statearr_40890_40954 = state_40822__$1;
(statearr_40890_40954[(1)] = (19));

} else {
var statearr_40891_40955 = state_40822__$1;
(statearr_40891_40955[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (38))){
var inst_40801 = (state_40822[(2)]);
var state_40822__$1 = state_40822;
var statearr_40892_40956 = state_40822__$1;
(statearr_40892_40956[(2)] = inst_40801);

(statearr_40892_40956[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (30))){
var state_40822__$1 = state_40822;
var statearr_40893_40957 = state_40822__$1;
(statearr_40893_40957[(2)] = null);

(statearr_40893_40957[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (10))){
var inst_40704 = (state_40822[(13)]);
var inst_40706 = (state_40822[(16)]);
var inst_40712 = cljs.core._nth.call(null,inst_40704,inst_40706);
var inst_40713 = cljs.core.nth.call(null,inst_40712,(0),null);
var inst_40714 = cljs.core.nth.call(null,inst_40712,(1),null);
var state_40822__$1 = (function (){var statearr_40894 = state_40822;
(statearr_40894[(26)] = inst_40713);

return statearr_40894;
})();
if(cljs.core.truth_(inst_40714)){
var statearr_40895_40958 = state_40822__$1;
(statearr_40895_40958[(1)] = (13));

} else {
var statearr_40896_40959 = state_40822__$1;
(statearr_40896_40959[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (18))){
var inst_40747 = (state_40822[(2)]);
var state_40822__$1 = state_40822;
var statearr_40897_40960 = state_40822__$1;
(statearr_40897_40960[(2)] = inst_40747);

(statearr_40897_40960[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (42))){
var state_40822__$1 = state_40822;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40822__$1,(45),dchan);
} else {
if((state_val_40823 === (37))){
var inst_40781 = (state_40822[(25)]);
var inst_40790 = (state_40822[(23)]);
var inst_40694 = (state_40822[(12)]);
var inst_40790__$1 = cljs.core.first.call(null,inst_40781);
var inst_40791 = cljs.core.async.put_BANG_.call(null,inst_40790__$1,inst_40694,done);
var state_40822__$1 = (function (){var statearr_40898 = state_40822;
(statearr_40898[(23)] = inst_40790__$1);

return statearr_40898;
})();
if(cljs.core.truth_(inst_40791)){
var statearr_40899_40961 = state_40822__$1;
(statearr_40899_40961[(1)] = (39));

} else {
var statearr_40900_40962 = state_40822__$1;
(statearr_40900_40962[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40823 === (8))){
var inst_40706 = (state_40822[(16)]);
var inst_40705 = (state_40822[(17)]);
var inst_40708 = (inst_40706 < inst_40705);
var inst_40709 = inst_40708;
var state_40822__$1 = state_40822;
if(cljs.core.truth_(inst_40709)){
var statearr_40901_40963 = state_40822__$1;
(statearr_40901_40963[(1)] = (10));

} else {
var statearr_40902_40964 = state_40822__$1;
(statearr_40902_40964[(1)] = (11));

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
});})(c__32551__auto___40910,cs,m,dchan,dctr,done))
;
return ((function (switch__32489__auto__,c__32551__auto___40910,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__32490__auto__ = null;
var cljs$core$async$mult_$_state_machine__32490__auto____0 = (function (){
var statearr_40906 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_40906[(0)] = cljs$core$async$mult_$_state_machine__32490__auto__);

(statearr_40906[(1)] = (1));

return statearr_40906;
});
var cljs$core$async$mult_$_state_machine__32490__auto____1 = (function (state_40822){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_40822);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e40907){if((e40907 instanceof Object)){
var ex__32493__auto__ = e40907;
var statearr_40908_40965 = state_40822;
(statearr_40908_40965[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40822);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40907;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40966 = state_40822;
state_40822 = G__40966;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__32490__auto__ = function(state_40822){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__32490__auto____1.call(this,state_40822);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__32490__auto____0;
cljs$core$async$mult_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__32490__auto____1;
return cljs$core$async$mult_$_state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto___40910,cs,m,dchan,dctr,done))
})();
var state__32553__auto__ = (function (){var statearr_40909 = f__32552__auto__.call(null);
(statearr_40909[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___40910);

return statearr_40909;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto___40910,cs,m,dchan,dctr,done))
);


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 * By default the channel will be closed when the source closes,
 * but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(){
var G__40968 = arguments.length;
switch (G__40968) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

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

cljs.core.async.Mix = (function (){var obj40971 = {};
return obj40971;
})();

cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((function (){var and__29253__auto__ = m;
if(and__29253__auto__){
return m.cljs$core$async$Mix$admix_STAR_$arity$2;
} else {
return and__29253__auto__;
}
})()){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
var x__29901__auto__ = (((m == null))?null:m);
return (function (){var or__29265__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (cljs.core.async.admix_STAR_["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
})().call(null,m,ch);
}
});

cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((function (){var and__29253__auto__ = m;
if(and__29253__auto__){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2;
} else {
return and__29253__auto__;
}
})()){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
var x__29901__auto__ = (((m == null))?null:m);
return (function (){var or__29265__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
})().call(null,m,ch);
}
});

cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((function (){var and__29253__auto__ = m;
if(and__29253__auto__){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1;
} else {
return and__29253__auto__;
}
})()){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
var x__29901__auto__ = (((m == null))?null:m);
return (function (){var or__29265__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
})().call(null,m);
}
});

cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((function (){var and__29253__auto__ = m;
if(and__29253__auto__){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2;
} else {
return and__29253__auto__;
}
})()){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
var x__29901__auto__ = (((m == null))?null:m);
return (function (){var or__29265__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
})().call(null,m,state_map);
}
});

cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((function (){var and__29253__auto__ = m;
if(and__29253__auto__){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2;
} else {
return and__29253__auto__;
}
})()){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
var x__29901__auto__ = (((m == null))?null:m);
return (function (){var or__29265__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
})().call(null,m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(){
var argseq__30305__auto__ = ((((3) < arguments.length))?(new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,(3)),(0))):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__30305__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__40976){
var map__40977 = p__40976;
var map__40977__$1 = ((cljs.core.seq_QMARK_.call(null,map__40977))?cljs.core.apply.call(null,cljs.core.hash_map,map__40977):map__40977);
var opts = map__40977__$1;
var statearr_40978_40981 = state;
(statearr_40978_40981[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__4423__auto__ = cljs.core.async.do_alts.call(null,((function (map__40977,map__40977__$1,opts){
return (function (val){
var statearr_40979_40982 = state;
(statearr_40979_40982[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__40977,map__40977__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__4423__auto__)){
var cb = temp__4423__auto__;
var statearr_40980_40983 = state;
(statearr_40980_40983[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq40972){
var G__40973 = cljs.core.first.call(null,seq40972);
var seq40972__$1 = cljs.core.next.call(null,seq40972);
var G__40974 = cljs.core.first.call(null,seq40972__$1);
var seq40972__$2 = cljs.core.next.call(null,seq40972__$1);
var G__40975 = cljs.core.first.call(null,seq40972__$2);
var seq40972__$3 = cljs.core.next.call(null,seq40972__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__40973,G__40974,G__40975,seq40972__$3);
});
/**
 * Creates and returns a mix of one or more input channels which will
 * be put on the supplied out channel. Input sources can be added to
 * the mix with 'admix', and removed with 'unmix'. A mix supports
 * soloing, muting and pausing multiple inputs atomically using
 * 'toggle', and can solo using either muting or pausing as determined
 * by 'solo-mode'.
 * 
 * Each channel can have zero or more boolean modes set via 'toggle':
 * 
 * :solo - when true, only this (ond other soloed) channel(s) will appear
 * in the mix output channel. :mute and :pause states of soloed
 * channels are ignored. If solo-mode is :mute, non-soloed
 * channels are muted, if :pause, non-soloed channels are
 * paused.
 * 
 * :mute - muted channels will have their contents consumed but not included in the mix
 * :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
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
if(typeof cljs.core.async.t41103 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t41103 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta41104){
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
this.meta41104 = meta41104;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t41103.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_41105,meta41104__$1){
var self__ = this;
var _41105__$1 = this;
return (new cljs.core.async.t41103(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta41104__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t41103.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_41105){
var self__ = this;
var _41105__$1 = this;
return self__.meta41104;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t41103.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t41103.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t41103.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t41103.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t41103.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t41103.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t41103.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t41103.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
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

cljs.core.async.t41103.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"mix","mix",2121373763,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta41104","meta41104",-409532154,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t41103.cljs$lang$type = true;

cljs.core.async.t41103.cljs$lang$ctorStr = "cljs.core.async/t41103";

cljs.core.async.t41103.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__29844__auto__,writer__29845__auto__,opt__29846__auto__){
return cljs.core._write.call(null,writer__29845__auto__,"cljs.core.async/t41103");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t41103 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t41103(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta41104){
return (new cljs.core.async.t41103(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta41104));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t41103(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__32551__auto___41222 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto___41222,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto___41222,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_41175){
var state_val_41176 = (state_41175[(1)]);
if((state_val_41176 === (7))){
var inst_41119 = (state_41175[(7)]);
var inst_41124 = cljs.core.apply.call(null,cljs.core.hash_map,inst_41119);
var state_41175__$1 = state_41175;
var statearr_41177_41223 = state_41175__$1;
(statearr_41177_41223[(2)] = inst_41124);

(statearr_41177_41223[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (20))){
var inst_41134 = (state_41175[(8)]);
var state_41175__$1 = state_41175;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_41175__$1,(23),out,inst_41134);
} else {
if((state_val_41176 === (1))){
var inst_41109 = (state_41175[(9)]);
var inst_41109__$1 = calc_state.call(null);
var inst_41110 = cljs.core.seq_QMARK_.call(null,inst_41109__$1);
var state_41175__$1 = (function (){var statearr_41178 = state_41175;
(statearr_41178[(9)] = inst_41109__$1);

return statearr_41178;
})();
if(inst_41110){
var statearr_41179_41224 = state_41175__$1;
(statearr_41179_41224[(1)] = (2));

} else {
var statearr_41180_41225 = state_41175__$1;
(statearr_41180_41225[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (24))){
var inst_41127 = (state_41175[(10)]);
var inst_41119 = inst_41127;
var state_41175__$1 = (function (){var statearr_41181 = state_41175;
(statearr_41181[(7)] = inst_41119);

return statearr_41181;
})();
var statearr_41182_41226 = state_41175__$1;
(statearr_41182_41226[(2)] = null);

(statearr_41182_41226[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (4))){
var inst_41109 = (state_41175[(9)]);
var inst_41115 = (state_41175[(2)]);
var inst_41116 = cljs.core.get.call(null,inst_41115,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_41117 = cljs.core.get.call(null,inst_41115,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_41118 = cljs.core.get.call(null,inst_41115,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_41119 = inst_41109;
var state_41175__$1 = (function (){var statearr_41183 = state_41175;
(statearr_41183[(11)] = inst_41118);

(statearr_41183[(7)] = inst_41119);

(statearr_41183[(12)] = inst_41117);

(statearr_41183[(13)] = inst_41116);

return statearr_41183;
})();
var statearr_41184_41227 = state_41175__$1;
(statearr_41184_41227[(2)] = null);

(statearr_41184_41227[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (15))){
var state_41175__$1 = state_41175;
var statearr_41185_41228 = state_41175__$1;
(statearr_41185_41228[(2)] = null);

(statearr_41185_41228[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (21))){
var inst_41127 = (state_41175[(10)]);
var inst_41119 = inst_41127;
var state_41175__$1 = (function (){var statearr_41186 = state_41175;
(statearr_41186[(7)] = inst_41119);

return statearr_41186;
})();
var statearr_41187_41229 = state_41175__$1;
(statearr_41187_41229[(2)] = null);

(statearr_41187_41229[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (13))){
var inst_41171 = (state_41175[(2)]);
var state_41175__$1 = state_41175;
var statearr_41188_41230 = state_41175__$1;
(statearr_41188_41230[(2)] = inst_41171);

(statearr_41188_41230[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (22))){
var inst_41169 = (state_41175[(2)]);
var state_41175__$1 = state_41175;
var statearr_41189_41231 = state_41175__$1;
(statearr_41189_41231[(2)] = inst_41169);

(statearr_41189_41231[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (6))){
var inst_41173 = (state_41175[(2)]);
var state_41175__$1 = state_41175;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_41175__$1,inst_41173);
} else {
if((state_val_41176 === (25))){
var state_41175__$1 = state_41175;
var statearr_41190_41232 = state_41175__$1;
(statearr_41190_41232[(2)] = null);

(statearr_41190_41232[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (17))){
var inst_41149 = (state_41175[(14)]);
var state_41175__$1 = state_41175;
var statearr_41191_41233 = state_41175__$1;
(statearr_41191_41233[(2)] = inst_41149);

(statearr_41191_41233[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (3))){
var inst_41109 = (state_41175[(9)]);
var state_41175__$1 = state_41175;
var statearr_41192_41234 = state_41175__$1;
(statearr_41192_41234[(2)] = inst_41109);

(statearr_41192_41234[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (12))){
var inst_41149 = (state_41175[(14)]);
var inst_41128 = (state_41175[(15)]);
var inst_41135 = (state_41175[(16)]);
var inst_41149__$1 = inst_41128.call(null,inst_41135);
var state_41175__$1 = (function (){var statearr_41193 = state_41175;
(statearr_41193[(14)] = inst_41149__$1);

return statearr_41193;
})();
if(cljs.core.truth_(inst_41149__$1)){
var statearr_41194_41235 = state_41175__$1;
(statearr_41194_41235[(1)] = (17));

} else {
var statearr_41195_41236 = state_41175__$1;
(statearr_41195_41236[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (2))){
var inst_41109 = (state_41175[(9)]);
var inst_41112 = cljs.core.apply.call(null,cljs.core.hash_map,inst_41109);
var state_41175__$1 = state_41175;
var statearr_41196_41237 = state_41175__$1;
(statearr_41196_41237[(2)] = inst_41112);

(statearr_41196_41237[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (23))){
var inst_41160 = (state_41175[(2)]);
var state_41175__$1 = state_41175;
if(cljs.core.truth_(inst_41160)){
var statearr_41197_41238 = state_41175__$1;
(statearr_41197_41238[(1)] = (24));

} else {
var statearr_41198_41239 = state_41175__$1;
(statearr_41198_41239[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (19))){
var inst_41157 = (state_41175[(2)]);
var state_41175__$1 = state_41175;
if(cljs.core.truth_(inst_41157)){
var statearr_41199_41240 = state_41175__$1;
(statearr_41199_41240[(1)] = (20));

} else {
var statearr_41200_41241 = state_41175__$1;
(statearr_41200_41241[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (11))){
var inst_41134 = (state_41175[(8)]);
var inst_41140 = (inst_41134 == null);
var state_41175__$1 = state_41175;
if(cljs.core.truth_(inst_41140)){
var statearr_41201_41242 = state_41175__$1;
(statearr_41201_41242[(1)] = (14));

} else {
var statearr_41202_41243 = state_41175__$1;
(statearr_41202_41243[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (9))){
var inst_41127 = (state_41175[(10)]);
var inst_41127__$1 = (state_41175[(2)]);
var inst_41128 = cljs.core.get.call(null,inst_41127__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_41129 = cljs.core.get.call(null,inst_41127__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_41130 = cljs.core.get.call(null,inst_41127__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_41175__$1 = (function (){var statearr_41203 = state_41175;
(statearr_41203[(17)] = inst_41129);

(statearr_41203[(15)] = inst_41128);

(statearr_41203[(10)] = inst_41127__$1);

return statearr_41203;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_41175__$1,(10),inst_41130);
} else {
if((state_val_41176 === (5))){
var inst_41119 = (state_41175[(7)]);
var inst_41122 = cljs.core.seq_QMARK_.call(null,inst_41119);
var state_41175__$1 = state_41175;
if(inst_41122){
var statearr_41204_41244 = state_41175__$1;
(statearr_41204_41244[(1)] = (7));

} else {
var statearr_41205_41245 = state_41175__$1;
(statearr_41205_41245[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (14))){
var inst_41135 = (state_41175[(16)]);
var inst_41142 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_41135);
var state_41175__$1 = state_41175;
var statearr_41206_41246 = state_41175__$1;
(statearr_41206_41246[(2)] = inst_41142);

(statearr_41206_41246[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (26))){
var inst_41165 = (state_41175[(2)]);
var state_41175__$1 = state_41175;
var statearr_41207_41247 = state_41175__$1;
(statearr_41207_41247[(2)] = inst_41165);

(statearr_41207_41247[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (16))){
var inst_41145 = (state_41175[(2)]);
var inst_41146 = calc_state.call(null);
var inst_41119 = inst_41146;
var state_41175__$1 = (function (){var statearr_41208 = state_41175;
(statearr_41208[(7)] = inst_41119);

(statearr_41208[(18)] = inst_41145);

return statearr_41208;
})();
var statearr_41209_41248 = state_41175__$1;
(statearr_41209_41248[(2)] = null);

(statearr_41209_41248[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (10))){
var inst_41134 = (state_41175[(8)]);
var inst_41135 = (state_41175[(16)]);
var inst_41133 = (state_41175[(2)]);
var inst_41134__$1 = cljs.core.nth.call(null,inst_41133,(0),null);
var inst_41135__$1 = cljs.core.nth.call(null,inst_41133,(1),null);
var inst_41136 = (inst_41134__$1 == null);
var inst_41137 = cljs.core._EQ_.call(null,inst_41135__$1,change);
var inst_41138 = (inst_41136) || (inst_41137);
var state_41175__$1 = (function (){var statearr_41210 = state_41175;
(statearr_41210[(8)] = inst_41134__$1);

(statearr_41210[(16)] = inst_41135__$1);

return statearr_41210;
})();
if(cljs.core.truth_(inst_41138)){
var statearr_41211_41249 = state_41175__$1;
(statearr_41211_41249[(1)] = (11));

} else {
var statearr_41212_41250 = state_41175__$1;
(statearr_41212_41250[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (18))){
var inst_41129 = (state_41175[(17)]);
var inst_41128 = (state_41175[(15)]);
var inst_41135 = (state_41175[(16)]);
var inst_41152 = cljs.core.empty_QMARK_.call(null,inst_41128);
var inst_41153 = inst_41129.call(null,inst_41135);
var inst_41154 = cljs.core.not.call(null,inst_41153);
var inst_41155 = (inst_41152) && (inst_41154);
var state_41175__$1 = state_41175;
var statearr_41213_41251 = state_41175__$1;
(statearr_41213_41251[(2)] = inst_41155);

(statearr_41213_41251[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41176 === (8))){
var inst_41119 = (state_41175[(7)]);
var state_41175__$1 = state_41175;
var statearr_41214_41252 = state_41175__$1;
(statearr_41214_41252[(2)] = inst_41119);

(statearr_41214_41252[(1)] = (9));


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
});})(c__32551__auto___41222,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__32489__auto__,c__32551__auto___41222,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__32490__auto__ = null;
var cljs$core$async$mix_$_state_machine__32490__auto____0 = (function (){
var statearr_41218 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_41218[(0)] = cljs$core$async$mix_$_state_machine__32490__auto__);

(statearr_41218[(1)] = (1));

return statearr_41218;
});
var cljs$core$async$mix_$_state_machine__32490__auto____1 = (function (state_41175){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_41175);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e41219){if((e41219 instanceof Object)){
var ex__32493__auto__ = e41219;
var statearr_41220_41253 = state_41175;
(statearr_41220_41253[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_41175);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e41219;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__41254 = state_41175;
state_41175 = G__41254;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__32490__auto__ = function(state_41175){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__32490__auto____1.call(this,state_41175);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__32490__auto____0;
cljs$core$async$mix_$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__32490__auto____1;
return cljs$core$async$mix_$_state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto___41222,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__32553__auto__ = (function (){var statearr_41221 = f__32552__auto__.call(null);
(statearr_41221[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___41222);

return statearr_41221;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto___41222,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
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
 * state map is a map of channels -> channel-state-map. A
 * channel-state-map is a map of attrs -> boolean, where attr is one or
 * more of :mute, :pause or :solo. Any states supplied are merged with
 * the current state.
 * 
 * Note that channels can be added to a mix via toggle, which can be
 * used to add channels in a particular (e.g. paused) state.
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

cljs.core.async.Pub = (function (){var obj41256 = {};
return obj41256;
})();

cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((function (){var and__29253__auto__ = p;
if(and__29253__auto__){
return p.cljs$core$async$Pub$sub_STAR_$arity$4;
} else {
return and__29253__auto__;
}
})()){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
var x__29901__auto__ = (((p == null))?null:p);
return (function (){var or__29265__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (cljs.core.async.sub_STAR_["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
})().call(null,p,v,ch,close_QMARK_);
}
});

cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((function (){var and__29253__auto__ = p;
if(and__29253__auto__){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3;
} else {
return and__29253__auto__;
}
})()){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
var x__29901__auto__ = (((p == null))?null:p);
return (function (){var or__29265__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
})().call(null,p,v,ch);
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(){
var G__41258 = arguments.length;
switch (G__41258) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((function (){var and__29253__auto__ = p;
if(and__29253__auto__){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1;
} else {
return and__29253__auto__;
}
})()){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
var x__29901__auto__ = (((p == null))?null:p);
return (function (){var or__29265__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p);
}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((function (){var and__29253__auto__ = p;
if(and__29253__auto__){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2;
} else {
return and__29253__auto__;
}
})()){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
var x__29901__auto__ = (((p == null))?null:p);
return (function (){var or__29265__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__29901__auto__)]);
if(or__29265__auto__){
return or__29265__auto__;
} else {
var or__29265__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(or__29265__auto____$1){
return or__29265__auto____$1;
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p,v);
}
});

cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2;

/**
 * Creates and returns a pub(lication) of the supplied channel,
 * partitioned into topics by the topic-fn. topic-fn will be applied to
 * each value on the channel and the result will determine the 'topic'
 * on which that value will be put. Channels can be subscribed to
 * receive copies of topics using 'sub', and unsubscribed using
 * 'unsub'. Each topic will be handled by an internal mult on a
 * dedicated channel. By default these internal channels are
 * unbuffered, but a buf-fn can be supplied which, given a topic,
 * creates a buffer with desired properties.
 * 
 * Each item is distributed to all subs in parallel and synchronously,
 * i.e. each sub must accept before the next item is distributed. Use
 * buffering/windowing to prevent slow subs from holding up the pub.
 * 
 * Items received when there are no matching subs get dropped.
 * 
 * Note that if buf-fns are used then each topic is handled
 * asynchronously, i.e. if a channel is subscribed to more than one
 * topic it should not expect them to be interleaved identically with
 * the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(){
var G__41262 = arguments.length;
switch (G__41262) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = ((function (mults){
return (function (topic){
var or__29265__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);
if(cljs.core.truth_(or__29265__auto__)){
return or__29265__auto__;
} else {
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__29265__auto__,mults){
return (function (p1__41260_SHARP_){
if(cljs.core.truth_(p1__41260_SHARP_.call(null,topic))){
return p1__41260_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__41260_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__29265__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t41263 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t41263 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta41264){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta41264 = meta41264;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t41263.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_41265,meta41264__$1){
var self__ = this;
var _41265__$1 = this;
return (new cljs.core.async.t41263(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta41264__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t41263.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_41265){
var self__ = this;
var _41265__$1 = this;
return self__.meta41264;
});})(mults,ensure_mult))
;

cljs.core.async.t41263.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t41263.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t41263.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t41263.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t41263.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__4423__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);
if(cljs.core.truth_(temp__4423__auto__)){
var m = temp__4423__auto__;
return cljs.core.async.untap.call(null,m,ch__$1);
} else {
return null;
}
});})(mults,ensure_mult))
;

cljs.core.async.t41263.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t41263.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t41263.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta41264","meta41264",-393524574,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t41263.cljs$lang$type = true;

cljs.core.async.t41263.cljs$lang$ctorStr = "cljs.core.async/t41263";

cljs.core.async.t41263.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__29844__auto__,writer__29845__auto__,opt__29846__auto__){
return cljs.core._write.call(null,writer__29845__auto__,"cljs.core.async/t41263");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t41263 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t41263(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta41264){
return (new cljs.core.async.t41263(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta41264));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t41263(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__32551__auto___41386 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto___41386,mults,ensure_mult,p){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto___41386,mults,ensure_mult,p){
return (function (state_41337){
var state_val_41338 = (state_41337[(1)]);
if((state_val_41338 === (7))){
var inst_41333 = (state_41337[(2)]);
var state_41337__$1 = state_41337;
var statearr_41339_41387 = state_41337__$1;
(statearr_41339_41387[(2)] = inst_41333);

(statearr_41339_41387[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (20))){
var state_41337__$1 = state_41337;
var statearr_41340_41388 = state_41337__$1;
(statearr_41340_41388[(2)] = null);

(statearr_41340_41388[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (1))){
var state_41337__$1 = state_41337;
var statearr_41341_41389 = state_41337__$1;
(statearr_41341_41389[(2)] = null);

(statearr_41341_41389[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (24))){
var inst_41316 = (state_41337[(7)]);
var inst_41325 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_41316);
var state_41337__$1 = state_41337;
var statearr_41342_41390 = state_41337__$1;
(statearr_41342_41390[(2)] = inst_41325);

(statearr_41342_41390[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (4))){
var inst_41268 = (state_41337[(8)]);
var inst_41268__$1 = (state_41337[(2)]);
var inst_41269 = (inst_41268__$1 == null);
var state_41337__$1 = (function (){var statearr_41343 = state_41337;
(statearr_41343[(8)] = inst_41268__$1);

return statearr_41343;
})();
if(cljs.core.truth_(inst_41269)){
var statearr_41344_41391 = state_41337__$1;
(statearr_41344_41391[(1)] = (5));

} else {
var statearr_41345_41392 = state_41337__$1;
(statearr_41345_41392[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (15))){
var inst_41310 = (state_41337[(2)]);
var state_41337__$1 = state_41337;
var statearr_41346_41393 = state_41337__$1;
(statearr_41346_41393[(2)] = inst_41310);

(statearr_41346_41393[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (21))){
var inst_41330 = (state_41337[(2)]);
var state_41337__$1 = (function (){var statearr_41347 = state_41337;
(statearr_41347[(9)] = inst_41330);

return statearr_41347;
})();
var statearr_41348_41394 = state_41337__$1;
(statearr_41348_41394[(2)] = null);

(statearr_41348_41394[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (13))){
var inst_41292 = (state_41337[(10)]);
var inst_41294 = cljs.core.chunked_seq_QMARK_.call(null,inst_41292);
var state_41337__$1 = state_41337;
if(inst_41294){
var statearr_41349_41395 = state_41337__$1;
(statearr_41349_41395[(1)] = (16));

} else {
var statearr_41350_41396 = state_41337__$1;
(statearr_41350_41396[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (22))){
var inst_41322 = (state_41337[(2)]);
var state_41337__$1 = state_41337;
if(cljs.core.truth_(inst_41322)){
var statearr_41351_41397 = state_41337__$1;
(statearr_41351_41397[(1)] = (23));

} else {
var statearr_41352_41398 = state_41337__$1;
(statearr_41352_41398[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (6))){
var inst_41316 = (state_41337[(7)]);
var inst_41318 = (state_41337[(11)]);
var inst_41268 = (state_41337[(8)]);
var inst_41316__$1 = topic_fn.call(null,inst_41268);
var inst_41317 = cljs.core.deref.call(null,mults);
var inst_41318__$1 = cljs.core.get.call(null,inst_41317,inst_41316__$1);
var state_41337__$1 = (function (){var statearr_41353 = state_41337;
(statearr_41353[(7)] = inst_41316__$1);

(statearr_41353[(11)] = inst_41318__$1);

return statearr_41353;
})();
if(cljs.core.truth_(inst_41318__$1)){
var statearr_41354_41399 = state_41337__$1;
(statearr_41354_41399[(1)] = (19));

} else {
var statearr_41355_41400 = state_41337__$1;
(statearr_41355_41400[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (25))){
var inst_41327 = (state_41337[(2)]);
var state_41337__$1 = state_41337;
var statearr_41356_41401 = state_41337__$1;
(statearr_41356_41401[(2)] = inst_41327);

(statearr_41356_41401[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (17))){
var inst_41292 = (state_41337[(10)]);
var inst_41301 = cljs.core.first.call(null,inst_41292);
var inst_41302 = cljs.core.async.muxch_STAR_.call(null,inst_41301);
var inst_41303 = cljs.core.async.close_BANG_.call(null,inst_41302);
var inst_41304 = cljs.core.next.call(null,inst_41292);
var inst_41278 = inst_41304;
var inst_41279 = null;
var inst_41280 = (0);
var inst_41281 = (0);
var state_41337__$1 = (function (){var statearr_41357 = state_41337;
(statearr_41357[(12)] = inst_41278);

(statearr_41357[(13)] = inst_41281);

(statearr_41357[(14)] = inst_41279);

(statearr_41357[(15)] = inst_41303);

(statearr_41357[(16)] = inst_41280);

return statearr_41357;
})();
var statearr_41358_41402 = state_41337__$1;
(statearr_41358_41402[(2)] = null);

(statearr_41358_41402[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (3))){
var inst_41335 = (state_41337[(2)]);
var state_41337__$1 = state_41337;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_41337__$1,inst_41335);
} else {
if((state_val_41338 === (12))){
var inst_41312 = (state_41337[(2)]);
var state_41337__$1 = state_41337;
var statearr_41359_41403 = state_41337__$1;
(statearr_41359_41403[(2)] = inst_41312);

(statearr_41359_41403[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (2))){
var state_41337__$1 = state_41337;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_41337__$1,(4),ch);
} else {
if((state_val_41338 === (23))){
var state_41337__$1 = state_41337;
var statearr_41360_41404 = state_41337__$1;
(statearr_41360_41404[(2)] = null);

(statearr_41360_41404[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (19))){
var inst_41318 = (state_41337[(11)]);
var inst_41268 = (state_41337[(8)]);
var inst_41320 = cljs.core.async.muxch_STAR_.call(null,inst_41318);
var state_41337__$1 = state_41337;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_41337__$1,(22),inst_41320,inst_41268);
} else {
if((state_val_41338 === (11))){
var inst_41278 = (state_41337[(12)]);
var inst_41292 = (state_41337[(10)]);
var inst_41292__$1 = cljs.core.seq.call(null,inst_41278);
var state_41337__$1 = (function (){var statearr_41361 = state_41337;
(statearr_41361[(10)] = inst_41292__$1);

return statearr_41361;
})();
if(inst_41292__$1){
var statearr_41362_41405 = state_41337__$1;
(statearr_41362_41405[(1)] = (13));

} else {
var statearr_41363_41406 = state_41337__$1;
(statearr_41363_41406[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (9))){
var inst_41314 = (state_41337[(2)]);
var state_41337__$1 = state_41337;
var statearr_41364_41407 = state_41337__$1;
(statearr_41364_41407[(2)] = inst_41314);

(statearr_41364_41407[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (5))){
var inst_41275 = cljs.core.deref.call(null,mults);
var inst_41276 = cljs.core.vals.call(null,inst_41275);
var inst_41277 = cljs.core.seq.call(null,inst_41276);
var inst_41278 = inst_41277;
var inst_41279 = null;
var inst_41280 = (0);
var inst_41281 = (0);
var state_41337__$1 = (function (){var statearr_41365 = state_41337;
(statearr_41365[(12)] = inst_41278);

(statearr_41365[(13)] = inst_41281);

(statearr_41365[(14)] = inst_41279);

(statearr_41365[(16)] = inst_41280);

return statearr_41365;
})();
var statearr_41366_41408 = state_41337__$1;
(statearr_41366_41408[(2)] = null);

(statearr_41366_41408[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (14))){
var state_41337__$1 = state_41337;
var statearr_41370_41409 = state_41337__$1;
(statearr_41370_41409[(2)] = null);

(statearr_41370_41409[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (16))){
var inst_41292 = (state_41337[(10)]);
var inst_41296 = cljs.core.chunk_first.call(null,inst_41292);
var inst_41297 = cljs.core.chunk_rest.call(null,inst_41292);
var inst_41298 = cljs.core.count.call(null,inst_41296);
var inst_41278 = inst_41297;
var inst_41279 = inst_41296;
var inst_41280 = inst_41298;
var inst_41281 = (0);
var state_41337__$1 = (function (){var statearr_41371 = state_41337;
(statearr_41371[(12)] = inst_41278);

(statearr_41371[(13)] = inst_41281);

(statearr_41371[(14)] = inst_41279);

(statearr_41371[(16)] = inst_41280);

return statearr_41371;
})();
var statearr_41372_41410 = state_41337__$1;
(statearr_41372_41410[(2)] = null);

(statearr_41372_41410[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (10))){
var inst_41278 = (state_41337[(12)]);
var inst_41281 = (state_41337[(13)]);
var inst_41279 = (state_41337[(14)]);
var inst_41280 = (state_41337[(16)]);
var inst_41286 = cljs.core._nth.call(null,inst_41279,inst_41281);
var inst_41287 = cljs.core.async.muxch_STAR_.call(null,inst_41286);
var inst_41288 = cljs.core.async.close_BANG_.call(null,inst_41287);
var inst_41289 = (inst_41281 + (1));
var tmp41367 = inst_41278;
var tmp41368 = inst_41279;
var tmp41369 = inst_41280;
var inst_41278__$1 = tmp41367;
var inst_41279__$1 = tmp41368;
var inst_41280__$1 = tmp41369;
var inst_41281__$1 = inst_41289;
var state_41337__$1 = (function (){var statearr_41373 = state_41337;
(statearr_41373[(12)] = inst_41278__$1);

(statearr_41373[(13)] = inst_41281__$1);

(statearr_41373[(14)] = inst_41279__$1);

(statearr_41373[(16)] = inst_41280__$1);

(statearr_41373[(17)] = inst_41288);

return statearr_41373;
})();
var statearr_41374_41411 = state_41337__$1;
(statearr_41374_41411[(2)] = null);

(statearr_41374_41411[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (18))){
var inst_41307 = (state_41337[(2)]);
var state_41337__$1 = state_41337;
var statearr_41375_41412 = state_41337__$1;
(statearr_41375_41412[(2)] = inst_41307);

(statearr_41375_41412[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41338 === (8))){
var inst_41281 = (state_41337[(13)]);
var inst_41280 = (state_41337[(16)]);
var inst_41283 = (inst_41281 < inst_41280);
var inst_41284 = inst_41283;
var state_41337__$1 = state_41337;
if(cljs.core.truth_(inst_41284)){
var statearr_41376_41413 = state_41337__$1;
(statearr_41376_41413[(1)] = (10));

} else {
var statearr_41377_41414 = state_41337__$1;
(statearr_41377_41414[(1)] = (11));

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
});})(c__32551__auto___41386,mults,ensure_mult,p))
;
return ((function (switch__32489__auto__,c__32551__auto___41386,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__32490__auto__ = null;
var cljs$core$async$state_machine__32490__auto____0 = (function (){
var statearr_41381 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_41381[(0)] = cljs$core$async$state_machine__32490__auto__);

(statearr_41381[(1)] = (1));

return statearr_41381;
});
var cljs$core$async$state_machine__32490__auto____1 = (function (state_41337){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_41337);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e41382){if((e41382 instanceof Object)){
var ex__32493__auto__ = e41382;
var statearr_41383_41415 = state_41337;
(statearr_41383_41415[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_41337);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e41382;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__41416 = state_41337;
state_41337 = G__41416;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$state_machine__32490__auto__ = function(state_41337){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32490__auto____1.call(this,state_41337);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32490__auto____0;
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32490__auto____1;
return cljs$core$async$state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto___41386,mults,ensure_mult,p))
})();
var state__32553__auto__ = (function (){var statearr_41384 = f__32552__auto__.call(null);
(statearr_41384[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___41386);

return statearr_41384;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto___41386,mults,ensure_mult,p))
);


return p;
});

cljs.core.async.pub.cljs$lang$maxFixedArity = 3;
/**
 * Subscribes a channel to a topic of a pub.
 * 
 * By default the channel will be closed when the source closes,
 * but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(){
var G__41418 = arguments.length;
switch (G__41418) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

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
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(){
var G__41421 = arguments.length;
switch (G__41421) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

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
 * channel which contains the values produced by applying f to the set
 * of first items taken from each source channel, followed by applying
 * f to the set of second items from each channel, until any one of the
 * channels is closed, at which point the output channel will be
 * closed. The returned channel will be unbuffered by default, or a
 * buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(){
var G__41424 = arguments.length;
switch (G__41424) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

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
var c__32551__auto___41494 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto___41494,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto___41494,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_41463){
var state_val_41464 = (state_41463[(1)]);
if((state_val_41464 === (7))){
var state_41463__$1 = state_41463;
var statearr_41465_41495 = state_41463__$1;
(statearr_41465_41495[(2)] = null);

(statearr_41465_41495[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41464 === (1))){
var state_41463__$1 = state_41463;
var statearr_41466_41496 = state_41463__$1;
(statearr_41466_41496[(2)] = null);

(statearr_41466_41496[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41464 === (4))){
var inst_41427 = (state_41463[(7)]);
var inst_41429 = (inst_41427 < cnt);
var state_41463__$1 = state_41463;
if(cljs.core.truth_(inst_41429)){
var statearr_41467_41497 = state_41463__$1;
(statearr_41467_41497[(1)] = (6));

} else {
var statearr_41468_41498 = state_41463__$1;
(statearr_41468_41498[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41464 === (15))){
var inst_41459 = (state_41463[(2)]);
var state_41463__$1 = state_41463;
var statearr_41469_41499 = state_41463__$1;
(statearr_41469_41499[(2)] = inst_41459);

(statearr_41469_41499[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41464 === (13))){
var inst_41452 = cljs.core.async.close_BANG_.call(null,out);
var state_41463__$1 = state_41463;
var statearr_41470_41500 = state_41463__$1;
(statearr_41470_41500[(2)] = inst_41452);

(statearr_41470_41500[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41464 === (6))){
var state_41463__$1 = state_41463;
var statearr_41471_41501 = state_41463__$1;
(statearr_41471_41501[(2)] = null);

(statearr_41471_41501[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41464 === (3))){
var inst_41461 = (state_41463[(2)]);
var state_41463__$1 = state_41463;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_41463__$1,inst_41461);
} else {
if((state_val_41464 === (12))){
var inst_41449 = (state_41463[(8)]);
var inst_41449__$1 = (state_41463[(2)]);
var inst_41450 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_41449__$1);
var state_41463__$1 = (function (){var statearr_41472 = state_41463;
(statearr_41472[(8)] = inst_41449__$1);

return statearr_41472;
})();
if(cljs.core.truth_(inst_41450)){
var statearr_41473_41502 = state_41463__$1;
(statearr_41473_41502[(1)] = (13));

} else {
var statearr_41474_41503 = state_41463__$1;
(statearr_41474_41503[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41464 === (2))){
var inst_41426 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_41427 = (0);
var state_41463__$1 = (function (){var statearr_41475 = state_41463;
(statearr_41475[(7)] = inst_41427);

(statearr_41475[(9)] = inst_41426);

return statearr_41475;
})();
var statearr_41476_41504 = state_41463__$1;
(statearr_41476_41504[(2)] = null);

(statearr_41476_41504[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41464 === (11))){
var inst_41427 = (state_41463[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_41463,(10),Object,null,(9));
var inst_41436 = chs__$1.call(null,inst_41427);
var inst_41437 = done.call(null,inst_41427);
var inst_41438 = cljs.core.async.take_BANG_.call(null,inst_41436,inst_41437);
var state_41463__$1 = state_41463;
var statearr_41477_41505 = state_41463__$1;
(statearr_41477_41505[(2)] = inst_41438);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_41463__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41464 === (9))){
var inst_41427 = (state_41463[(7)]);
var inst_41440 = (state_41463[(2)]);
var inst_41441 = (inst_41427 + (1));
var inst_41427__$1 = inst_41441;
var state_41463__$1 = (function (){var statearr_41478 = state_41463;
(statearr_41478[(7)] = inst_41427__$1);

(statearr_41478[(10)] = inst_41440);

return statearr_41478;
})();
var statearr_41479_41506 = state_41463__$1;
(statearr_41479_41506[(2)] = null);

(statearr_41479_41506[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41464 === (5))){
var inst_41447 = (state_41463[(2)]);
var state_41463__$1 = (function (){var statearr_41480 = state_41463;
(statearr_41480[(11)] = inst_41447);

return statearr_41480;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_41463__$1,(12),dchan);
} else {
if((state_val_41464 === (14))){
var inst_41449 = (state_41463[(8)]);
var inst_41454 = cljs.core.apply.call(null,f,inst_41449);
var state_41463__$1 = state_41463;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_41463__$1,(16),out,inst_41454);
} else {
if((state_val_41464 === (16))){
var inst_41456 = (state_41463[(2)]);
var state_41463__$1 = (function (){var statearr_41481 = state_41463;
(statearr_41481[(12)] = inst_41456);

return statearr_41481;
})();
var statearr_41482_41507 = state_41463__$1;
(statearr_41482_41507[(2)] = null);

(statearr_41482_41507[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41464 === (10))){
var inst_41431 = (state_41463[(2)]);
var inst_41432 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_41463__$1 = (function (){var statearr_41483 = state_41463;
(statearr_41483[(13)] = inst_41431);

return statearr_41483;
})();
var statearr_41484_41508 = state_41463__$1;
(statearr_41484_41508[(2)] = inst_41432);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_41463__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41464 === (8))){
var inst_41445 = (state_41463[(2)]);
var state_41463__$1 = state_41463;
var statearr_41485_41509 = state_41463__$1;
(statearr_41485_41509[(2)] = inst_41445);

(statearr_41485_41509[(1)] = (5));


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
});})(c__32551__auto___41494,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__32489__auto__,c__32551__auto___41494,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__32490__auto__ = null;
var cljs$core$async$state_machine__32490__auto____0 = (function (){
var statearr_41489 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_41489[(0)] = cljs$core$async$state_machine__32490__auto__);

(statearr_41489[(1)] = (1));

return statearr_41489;
});
var cljs$core$async$state_machine__32490__auto____1 = (function (state_41463){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_41463);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e41490){if((e41490 instanceof Object)){
var ex__32493__auto__ = e41490;
var statearr_41491_41510 = state_41463;
(statearr_41491_41510[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_41463);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e41490;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__41511 = state_41463;
state_41463 = G__41511;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$state_machine__32490__auto__ = function(state_41463){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32490__auto____1.call(this,state_41463);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32490__auto____0;
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32490__auto____1;
return cljs$core$async$state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto___41494,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__32553__auto__ = (function (){var statearr_41492 = f__32552__auto__.call(null);
(statearr_41492[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___41494);

return statearr_41492;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto___41494,chs__$1,out,cnt,rets,dchan,dctr,done))
);


return out;
});

cljs.core.async.map.cljs$lang$maxFixedArity = 3;
/**
 * Takes a collection of source channels and returns a channel which
 * contains all values taken from them. The returned channel will be
 * unbuffered by default, or a buf-or-n can be supplied. The channel
 * will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(){
var G__41514 = arguments.length;
switch (G__41514) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__32551__auto___41569 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto___41569,out){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto___41569,out){
return (function (state_41544){
var state_val_41545 = (state_41544[(1)]);
if((state_val_41545 === (7))){
var inst_41523 = (state_41544[(7)]);
var inst_41524 = (state_41544[(8)]);
var inst_41523__$1 = (state_41544[(2)]);
var inst_41524__$1 = cljs.core.nth.call(null,inst_41523__$1,(0),null);
var inst_41525 = cljs.core.nth.call(null,inst_41523__$1,(1),null);
var inst_41526 = (inst_41524__$1 == null);
var state_41544__$1 = (function (){var statearr_41546 = state_41544;
(statearr_41546[(7)] = inst_41523__$1);

(statearr_41546[(9)] = inst_41525);

(statearr_41546[(8)] = inst_41524__$1);

return statearr_41546;
})();
if(cljs.core.truth_(inst_41526)){
var statearr_41547_41570 = state_41544__$1;
(statearr_41547_41570[(1)] = (8));

} else {
var statearr_41548_41571 = state_41544__$1;
(statearr_41548_41571[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41545 === (1))){
var inst_41515 = cljs.core.vec.call(null,chs);
var inst_41516 = inst_41515;
var state_41544__$1 = (function (){var statearr_41549 = state_41544;
(statearr_41549[(10)] = inst_41516);

return statearr_41549;
})();
var statearr_41550_41572 = state_41544__$1;
(statearr_41550_41572[(2)] = null);

(statearr_41550_41572[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41545 === (4))){
var inst_41516 = (state_41544[(10)]);
var state_41544__$1 = state_41544;
return cljs.core.async.ioc_alts_BANG_.call(null,state_41544__$1,(7),inst_41516);
} else {
if((state_val_41545 === (6))){
var inst_41540 = (state_41544[(2)]);
var state_41544__$1 = state_41544;
var statearr_41551_41573 = state_41544__$1;
(statearr_41551_41573[(2)] = inst_41540);

(statearr_41551_41573[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41545 === (3))){
var inst_41542 = (state_41544[(2)]);
var state_41544__$1 = state_41544;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_41544__$1,inst_41542);
} else {
if((state_val_41545 === (2))){
var inst_41516 = (state_41544[(10)]);
var inst_41518 = cljs.core.count.call(null,inst_41516);
var inst_41519 = (inst_41518 > (0));
var state_41544__$1 = state_41544;
if(cljs.core.truth_(inst_41519)){
var statearr_41553_41574 = state_41544__$1;
(statearr_41553_41574[(1)] = (4));

} else {
var statearr_41554_41575 = state_41544__$1;
(statearr_41554_41575[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41545 === (11))){
var inst_41516 = (state_41544[(10)]);
var inst_41533 = (state_41544[(2)]);
var tmp41552 = inst_41516;
var inst_41516__$1 = tmp41552;
var state_41544__$1 = (function (){var statearr_41555 = state_41544;
(statearr_41555[(11)] = inst_41533);

(statearr_41555[(10)] = inst_41516__$1);

return statearr_41555;
})();
var statearr_41556_41576 = state_41544__$1;
(statearr_41556_41576[(2)] = null);

(statearr_41556_41576[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41545 === (9))){
var inst_41524 = (state_41544[(8)]);
var state_41544__$1 = state_41544;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_41544__$1,(11),out,inst_41524);
} else {
if((state_val_41545 === (5))){
var inst_41538 = cljs.core.async.close_BANG_.call(null,out);
var state_41544__$1 = state_41544;
var statearr_41557_41577 = state_41544__$1;
(statearr_41557_41577[(2)] = inst_41538);

(statearr_41557_41577[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41545 === (10))){
var inst_41536 = (state_41544[(2)]);
var state_41544__$1 = state_41544;
var statearr_41558_41578 = state_41544__$1;
(statearr_41558_41578[(2)] = inst_41536);

(statearr_41558_41578[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41545 === (8))){
var inst_41523 = (state_41544[(7)]);
var inst_41525 = (state_41544[(9)]);
var inst_41524 = (state_41544[(8)]);
var inst_41516 = (state_41544[(10)]);
var inst_41528 = (function (){var cs = inst_41516;
var vec__41521 = inst_41523;
var v = inst_41524;
var c = inst_41525;
return ((function (cs,vec__41521,v,c,inst_41523,inst_41525,inst_41524,inst_41516,state_val_41545,c__32551__auto___41569,out){
return (function (p1__41512_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__41512_SHARP_);
});
;})(cs,vec__41521,v,c,inst_41523,inst_41525,inst_41524,inst_41516,state_val_41545,c__32551__auto___41569,out))
})();
var inst_41529 = cljs.core.filterv.call(null,inst_41528,inst_41516);
var inst_41516__$1 = inst_41529;
var state_41544__$1 = (function (){var statearr_41559 = state_41544;
(statearr_41559[(10)] = inst_41516__$1);

return statearr_41559;
})();
var statearr_41560_41579 = state_41544__$1;
(statearr_41560_41579[(2)] = null);

(statearr_41560_41579[(1)] = (2));


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
});})(c__32551__auto___41569,out))
;
return ((function (switch__32489__auto__,c__32551__auto___41569,out){
return (function() {
var cljs$core$async$state_machine__32490__auto__ = null;
var cljs$core$async$state_machine__32490__auto____0 = (function (){
var statearr_41564 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_41564[(0)] = cljs$core$async$state_machine__32490__auto__);

(statearr_41564[(1)] = (1));

return statearr_41564;
});
var cljs$core$async$state_machine__32490__auto____1 = (function (state_41544){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_41544);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e41565){if((e41565 instanceof Object)){
var ex__32493__auto__ = e41565;
var statearr_41566_41580 = state_41544;
(statearr_41566_41580[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_41544);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e41565;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__41581 = state_41544;
state_41544 = G__41581;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$state_machine__32490__auto__ = function(state_41544){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32490__auto____1.call(this,state_41544);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32490__auto____0;
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32490__auto____1;
return cljs$core$async$state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto___41569,out))
})();
var state__32553__auto__ = (function (){var statearr_41567 = f__32552__auto__.call(null);
(statearr_41567[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___41569);

return statearr_41567;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto___41569,out))
);


return out;
});

cljs.core.async.merge.cljs$lang$maxFixedArity = 2;
/**
 * Returns a channel containing the single (collection) result of the
 * items taken from the channel conjoined to the supplied
 * collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 * The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(){
var G__41583 = arguments.length;
switch (G__41583) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__32551__auto___41631 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto___41631,out){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto___41631,out){
return (function (state_41607){
var state_val_41608 = (state_41607[(1)]);
if((state_val_41608 === (7))){
var inst_41589 = (state_41607[(7)]);
var inst_41589__$1 = (state_41607[(2)]);
var inst_41590 = (inst_41589__$1 == null);
var inst_41591 = cljs.core.not.call(null,inst_41590);
var state_41607__$1 = (function (){var statearr_41609 = state_41607;
(statearr_41609[(7)] = inst_41589__$1);

return statearr_41609;
})();
if(inst_41591){
var statearr_41610_41632 = state_41607__$1;
(statearr_41610_41632[(1)] = (8));

} else {
var statearr_41611_41633 = state_41607__$1;
(statearr_41611_41633[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41608 === (1))){
var inst_41584 = (0);
var state_41607__$1 = (function (){var statearr_41612 = state_41607;
(statearr_41612[(8)] = inst_41584);

return statearr_41612;
})();
var statearr_41613_41634 = state_41607__$1;
(statearr_41613_41634[(2)] = null);

(statearr_41613_41634[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41608 === (4))){
var state_41607__$1 = state_41607;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_41607__$1,(7),ch);
} else {
if((state_val_41608 === (6))){
var inst_41602 = (state_41607[(2)]);
var state_41607__$1 = state_41607;
var statearr_41614_41635 = state_41607__$1;
(statearr_41614_41635[(2)] = inst_41602);

(statearr_41614_41635[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41608 === (3))){
var inst_41604 = (state_41607[(2)]);
var inst_41605 = cljs.core.async.close_BANG_.call(null,out);
var state_41607__$1 = (function (){var statearr_41615 = state_41607;
(statearr_41615[(9)] = inst_41604);

return statearr_41615;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_41607__$1,inst_41605);
} else {
if((state_val_41608 === (2))){
var inst_41584 = (state_41607[(8)]);
var inst_41586 = (inst_41584 < n);
var state_41607__$1 = state_41607;
if(cljs.core.truth_(inst_41586)){
var statearr_41616_41636 = state_41607__$1;
(statearr_41616_41636[(1)] = (4));

} else {
var statearr_41617_41637 = state_41607__$1;
(statearr_41617_41637[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41608 === (11))){
var inst_41584 = (state_41607[(8)]);
var inst_41594 = (state_41607[(2)]);
var inst_41595 = (inst_41584 + (1));
var inst_41584__$1 = inst_41595;
var state_41607__$1 = (function (){var statearr_41618 = state_41607;
(statearr_41618[(8)] = inst_41584__$1);

(statearr_41618[(10)] = inst_41594);

return statearr_41618;
})();
var statearr_41619_41638 = state_41607__$1;
(statearr_41619_41638[(2)] = null);

(statearr_41619_41638[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41608 === (9))){
var state_41607__$1 = state_41607;
var statearr_41620_41639 = state_41607__$1;
(statearr_41620_41639[(2)] = null);

(statearr_41620_41639[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41608 === (5))){
var state_41607__$1 = state_41607;
var statearr_41621_41640 = state_41607__$1;
(statearr_41621_41640[(2)] = null);

(statearr_41621_41640[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41608 === (10))){
var inst_41599 = (state_41607[(2)]);
var state_41607__$1 = state_41607;
var statearr_41622_41641 = state_41607__$1;
(statearr_41622_41641[(2)] = inst_41599);

(statearr_41622_41641[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41608 === (8))){
var inst_41589 = (state_41607[(7)]);
var state_41607__$1 = state_41607;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_41607__$1,(11),out,inst_41589);
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
});})(c__32551__auto___41631,out))
;
return ((function (switch__32489__auto__,c__32551__auto___41631,out){
return (function() {
var cljs$core$async$state_machine__32490__auto__ = null;
var cljs$core$async$state_machine__32490__auto____0 = (function (){
var statearr_41626 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_41626[(0)] = cljs$core$async$state_machine__32490__auto__);

(statearr_41626[(1)] = (1));

return statearr_41626;
});
var cljs$core$async$state_machine__32490__auto____1 = (function (state_41607){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_41607);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e41627){if((e41627 instanceof Object)){
var ex__32493__auto__ = e41627;
var statearr_41628_41642 = state_41607;
(statearr_41628_41642[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_41607);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e41627;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__41643 = state_41607;
state_41607 = G__41643;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$state_machine__32490__auto__ = function(state_41607){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32490__auto____1.call(this,state_41607);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32490__auto____0;
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32490__auto____1;
return cljs$core$async$state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto___41631,out))
})();
var state__32553__auto__ = (function (){var statearr_41629 = f__32552__auto__.call(null);
(statearr_41629[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___41631);

return statearr_41629;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto___41631,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t41651 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t41651 = (function (map_LT_,f,ch,meta41652){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta41652 = meta41652;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t41651.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_41653,meta41652__$1){
var self__ = this;
var _41653__$1 = this;
return (new cljs.core.async.t41651(self__.map_LT_,self__.f,self__.ch,meta41652__$1));
});

cljs.core.async.t41651.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_41653){
var self__ = this;
var _41653__$1 = this;
return self__.meta41652;
});

cljs.core.async.t41651.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t41651.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t41651.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t41651.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t41651.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if(typeof cljs.core.async.t41654 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t41654 = (function (map_LT_,f,ch,meta41652,_,fn1,meta41655){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta41652 = meta41652;
this._ = _;
this.fn1 = fn1;
this.meta41655 = meta41655;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t41654.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_41656,meta41655__$1){
var self__ = this;
var _41656__$1 = this;
return (new cljs.core.async.t41654(self__.map_LT_,self__.f,self__.ch,self__.meta41652,self__._,self__.fn1,meta41655__$1));
});})(___$1))
;

cljs.core.async.t41654.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_41656){
var self__ = this;
var _41656__$1 = this;
return self__.meta41655;
});})(___$1))
;

cljs.core.async.t41654.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t41654.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t41654.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__41644_SHARP_){
return f1.call(null,(((p1__41644_SHARP_ == null))?null:self__.f.call(null,p1__41644_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t41654.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta41652","meta41652",1818543263,null),new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta41655","meta41655",1200835570,null)], null);
});})(___$1))
;

cljs.core.async.t41654.cljs$lang$type = true;

cljs.core.async.t41654.cljs$lang$ctorStr = "cljs.core.async/t41654";

cljs.core.async.t41654.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__29844__auto__,writer__29845__auto__,opt__29846__auto__){
return cljs.core._write.call(null,writer__29845__auto__,"cljs.core.async/t41654");
});})(___$1))
;

cljs.core.async.__GT_t41654 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t41654(map_LT___$1,f__$1,ch__$1,meta41652__$1,___$2,fn1__$1,meta41655){
return (new cljs.core.async.t41654(map_LT___$1,f__$1,ch__$1,meta41652__$1,___$2,fn1__$1,meta41655));
});})(___$1))
;

}

return (new cljs.core.async.t41654(self__.map_LT_,self__.f,self__.ch,self__.meta41652,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__29253__auto__ = ret;
if(cljs.core.truth_(and__29253__auto__)){
return !((cljs.core.deref.call(null,ret) == null));
} else {
return and__29253__auto__;
}
})())){
return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else {
return ret;
}
});

cljs.core.async.t41651.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t41651.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t41651.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta41652","meta41652",1818543263,null)], null);
});

cljs.core.async.t41651.cljs$lang$type = true;

cljs.core.async.t41651.cljs$lang$ctorStr = "cljs.core.async/t41651";

cljs.core.async.t41651.cljs$lang$ctorPrWriter = (function (this__29844__auto__,writer__29845__auto__,opt__29846__auto__){
return cljs.core._write.call(null,writer__29845__auto__,"cljs.core.async/t41651");
});

cljs.core.async.__GT_t41651 = (function cljs$core$async$map_LT__$___GT_t41651(map_LT___$1,f__$1,ch__$1,meta41652){
return (new cljs.core.async.t41651(map_LT___$1,f__$1,ch__$1,meta41652));
});

}

return (new cljs.core.async.t41651(cljs$core$async$map_LT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t41660 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t41660 = (function (map_GT_,f,ch,meta41661){
this.map_GT_ = map_GT_;
this.f = f;
this.ch = ch;
this.meta41661 = meta41661;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t41660.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_41662,meta41661__$1){
var self__ = this;
var _41662__$1 = this;
return (new cljs.core.async.t41660(self__.map_GT_,self__.f,self__.ch,meta41661__$1));
});

cljs.core.async.t41660.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_41662){
var self__ = this;
var _41662__$1 = this;
return self__.meta41661;
});

cljs.core.async.t41660.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t41660.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t41660.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t41660.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t41660.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t41660.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t41660.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"map>","map>",1676369295,null),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta41661","meta41661",-845326680,null)], null);
});

cljs.core.async.t41660.cljs$lang$type = true;

cljs.core.async.t41660.cljs$lang$ctorStr = "cljs.core.async/t41660";

cljs.core.async.t41660.cljs$lang$ctorPrWriter = (function (this__29844__auto__,writer__29845__auto__,opt__29846__auto__){
return cljs.core._write.call(null,writer__29845__auto__,"cljs.core.async/t41660");
});

cljs.core.async.__GT_t41660 = (function cljs$core$async$map_GT__$___GT_t41660(map_GT___$1,f__$1,ch__$1,meta41661){
return (new cljs.core.async.t41660(map_GT___$1,f__$1,ch__$1,meta41661));
});

}

return (new cljs.core.async.t41660(cljs$core$async$map_GT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t41666 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t41666 = (function (filter_GT_,p,ch,meta41667){
this.filter_GT_ = filter_GT_;
this.p = p;
this.ch = ch;
this.meta41667 = meta41667;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t41666.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_41668,meta41667__$1){
var self__ = this;
var _41668__$1 = this;
return (new cljs.core.async.t41666(self__.filter_GT_,self__.p,self__.ch,meta41667__$1));
});

cljs.core.async.t41666.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_41668){
var self__ = this;
var _41668__$1 = this;
return self__.meta41667;
});

cljs.core.async.t41666.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t41666.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t41666.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t41666.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t41666.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t41666.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t41666.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t41666.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"filter>","filter>",-37644455,null),new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta41667","meta41667",1390059238,null)], null);
});

cljs.core.async.t41666.cljs$lang$type = true;

cljs.core.async.t41666.cljs$lang$ctorStr = "cljs.core.async/t41666";

cljs.core.async.t41666.cljs$lang$ctorPrWriter = (function (this__29844__auto__,writer__29845__auto__,opt__29846__auto__){
return cljs.core._write.call(null,writer__29845__auto__,"cljs.core.async/t41666");
});

cljs.core.async.__GT_t41666 = (function cljs$core$async$filter_GT__$___GT_t41666(filter_GT___$1,p__$1,ch__$1,meta41667){
return (new cljs.core.async.t41666(filter_GT___$1,p__$1,ch__$1,meta41667));
});

}

return (new cljs.core.async.t41666(cljs$core$async$filter_GT_,p,ch,cljs.core.PersistentArrayMap.EMPTY));
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
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(){
var G__41670 = arguments.length;
switch (G__41670) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__32551__auto___41713 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto___41713,out){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto___41713,out){
return (function (state_41691){
var state_val_41692 = (state_41691[(1)]);
if((state_val_41692 === (7))){
var inst_41687 = (state_41691[(2)]);
var state_41691__$1 = state_41691;
var statearr_41693_41714 = state_41691__$1;
(statearr_41693_41714[(2)] = inst_41687);

(statearr_41693_41714[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41692 === (1))){
var state_41691__$1 = state_41691;
var statearr_41694_41715 = state_41691__$1;
(statearr_41694_41715[(2)] = null);

(statearr_41694_41715[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41692 === (4))){
var inst_41673 = (state_41691[(7)]);
var inst_41673__$1 = (state_41691[(2)]);
var inst_41674 = (inst_41673__$1 == null);
var state_41691__$1 = (function (){var statearr_41695 = state_41691;
(statearr_41695[(7)] = inst_41673__$1);

return statearr_41695;
})();
if(cljs.core.truth_(inst_41674)){
var statearr_41696_41716 = state_41691__$1;
(statearr_41696_41716[(1)] = (5));

} else {
var statearr_41697_41717 = state_41691__$1;
(statearr_41697_41717[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41692 === (6))){
var inst_41673 = (state_41691[(7)]);
var inst_41678 = p.call(null,inst_41673);
var state_41691__$1 = state_41691;
if(cljs.core.truth_(inst_41678)){
var statearr_41698_41718 = state_41691__$1;
(statearr_41698_41718[(1)] = (8));

} else {
var statearr_41699_41719 = state_41691__$1;
(statearr_41699_41719[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41692 === (3))){
var inst_41689 = (state_41691[(2)]);
var state_41691__$1 = state_41691;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_41691__$1,inst_41689);
} else {
if((state_val_41692 === (2))){
var state_41691__$1 = state_41691;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_41691__$1,(4),ch);
} else {
if((state_val_41692 === (11))){
var inst_41681 = (state_41691[(2)]);
var state_41691__$1 = state_41691;
var statearr_41700_41720 = state_41691__$1;
(statearr_41700_41720[(2)] = inst_41681);

(statearr_41700_41720[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41692 === (9))){
var state_41691__$1 = state_41691;
var statearr_41701_41721 = state_41691__$1;
(statearr_41701_41721[(2)] = null);

(statearr_41701_41721[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41692 === (5))){
var inst_41676 = cljs.core.async.close_BANG_.call(null,out);
var state_41691__$1 = state_41691;
var statearr_41702_41722 = state_41691__$1;
(statearr_41702_41722[(2)] = inst_41676);

(statearr_41702_41722[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41692 === (10))){
var inst_41684 = (state_41691[(2)]);
var state_41691__$1 = (function (){var statearr_41703 = state_41691;
(statearr_41703[(8)] = inst_41684);

return statearr_41703;
})();
var statearr_41704_41723 = state_41691__$1;
(statearr_41704_41723[(2)] = null);

(statearr_41704_41723[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41692 === (8))){
var inst_41673 = (state_41691[(7)]);
var state_41691__$1 = state_41691;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_41691__$1,(11),out,inst_41673);
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
});})(c__32551__auto___41713,out))
;
return ((function (switch__32489__auto__,c__32551__auto___41713,out){
return (function() {
var cljs$core$async$state_machine__32490__auto__ = null;
var cljs$core$async$state_machine__32490__auto____0 = (function (){
var statearr_41708 = [null,null,null,null,null,null,null,null,null];
(statearr_41708[(0)] = cljs$core$async$state_machine__32490__auto__);

(statearr_41708[(1)] = (1));

return statearr_41708;
});
var cljs$core$async$state_machine__32490__auto____1 = (function (state_41691){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_41691);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e41709){if((e41709 instanceof Object)){
var ex__32493__auto__ = e41709;
var statearr_41710_41724 = state_41691;
(statearr_41710_41724[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_41691);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e41709;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__41725 = state_41691;
state_41691 = G__41725;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$state_machine__32490__auto__ = function(state_41691){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32490__auto____1.call(this,state_41691);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32490__auto____0;
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32490__auto____1;
return cljs$core$async$state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto___41713,out))
})();
var state__32553__auto__ = (function (){var statearr_41711 = f__32552__auto__.call(null);
(statearr_41711[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___41713);

return statearr_41711;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto___41713,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(){
var G__41727 = arguments.length;
switch (G__41727) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

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
var c__32551__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto__){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto__){
return (function (state_41894){
var state_val_41895 = (state_41894[(1)]);
if((state_val_41895 === (7))){
var inst_41890 = (state_41894[(2)]);
var state_41894__$1 = state_41894;
var statearr_41896_41937 = state_41894__$1;
(statearr_41896_41937[(2)] = inst_41890);

(statearr_41896_41937[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41895 === (20))){
var inst_41860 = (state_41894[(7)]);
var inst_41871 = (state_41894[(2)]);
var inst_41872 = cljs.core.next.call(null,inst_41860);
var inst_41846 = inst_41872;
var inst_41847 = null;
var inst_41848 = (0);
var inst_41849 = (0);
var state_41894__$1 = (function (){var statearr_41897 = state_41894;
(statearr_41897[(8)] = inst_41849);

(statearr_41897[(9)] = inst_41847);

(statearr_41897[(10)] = inst_41846);

(statearr_41897[(11)] = inst_41871);

(statearr_41897[(12)] = inst_41848);

return statearr_41897;
})();
var statearr_41898_41938 = state_41894__$1;
(statearr_41898_41938[(2)] = null);

(statearr_41898_41938[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41895 === (1))){
var state_41894__$1 = state_41894;
var statearr_41899_41939 = state_41894__$1;
(statearr_41899_41939[(2)] = null);

(statearr_41899_41939[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41895 === (4))){
var inst_41835 = (state_41894[(13)]);
var inst_41835__$1 = (state_41894[(2)]);
var inst_41836 = (inst_41835__$1 == null);
var state_41894__$1 = (function (){var statearr_41900 = state_41894;
(statearr_41900[(13)] = inst_41835__$1);

return statearr_41900;
})();
if(cljs.core.truth_(inst_41836)){
var statearr_41901_41940 = state_41894__$1;
(statearr_41901_41940[(1)] = (5));

} else {
var statearr_41902_41941 = state_41894__$1;
(statearr_41902_41941[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41895 === (15))){
var state_41894__$1 = state_41894;
var statearr_41906_41942 = state_41894__$1;
(statearr_41906_41942[(2)] = null);

(statearr_41906_41942[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41895 === (21))){
var state_41894__$1 = state_41894;
var statearr_41907_41943 = state_41894__$1;
(statearr_41907_41943[(2)] = null);

(statearr_41907_41943[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41895 === (13))){
var inst_41849 = (state_41894[(8)]);
var inst_41847 = (state_41894[(9)]);
var inst_41846 = (state_41894[(10)]);
var inst_41848 = (state_41894[(12)]);
var inst_41856 = (state_41894[(2)]);
var inst_41857 = (inst_41849 + (1));
var tmp41903 = inst_41847;
var tmp41904 = inst_41846;
var tmp41905 = inst_41848;
var inst_41846__$1 = tmp41904;
var inst_41847__$1 = tmp41903;
var inst_41848__$1 = tmp41905;
var inst_41849__$1 = inst_41857;
var state_41894__$1 = (function (){var statearr_41908 = state_41894;
(statearr_41908[(8)] = inst_41849__$1);

(statearr_41908[(9)] = inst_41847__$1);

(statearr_41908[(14)] = inst_41856);

(statearr_41908[(10)] = inst_41846__$1);

(statearr_41908[(12)] = inst_41848__$1);

return statearr_41908;
})();
var statearr_41909_41944 = state_41894__$1;
(statearr_41909_41944[(2)] = null);

(statearr_41909_41944[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41895 === (22))){
var state_41894__$1 = state_41894;
var statearr_41910_41945 = state_41894__$1;
(statearr_41910_41945[(2)] = null);

(statearr_41910_41945[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41895 === (6))){
var inst_41835 = (state_41894[(13)]);
var inst_41844 = f.call(null,inst_41835);
var inst_41845 = cljs.core.seq.call(null,inst_41844);
var inst_41846 = inst_41845;
var inst_41847 = null;
var inst_41848 = (0);
var inst_41849 = (0);
var state_41894__$1 = (function (){var statearr_41911 = state_41894;
(statearr_41911[(8)] = inst_41849);

(statearr_41911[(9)] = inst_41847);

(statearr_41911[(10)] = inst_41846);

(statearr_41911[(12)] = inst_41848);

return statearr_41911;
})();
var statearr_41912_41946 = state_41894__$1;
(statearr_41912_41946[(2)] = null);

(statearr_41912_41946[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41895 === (17))){
var inst_41860 = (state_41894[(7)]);
var inst_41864 = cljs.core.chunk_first.call(null,inst_41860);
var inst_41865 = cljs.core.chunk_rest.call(null,inst_41860);
var inst_41866 = cljs.core.count.call(null,inst_41864);
var inst_41846 = inst_41865;
var inst_41847 = inst_41864;
var inst_41848 = inst_41866;
var inst_41849 = (0);
var state_41894__$1 = (function (){var statearr_41913 = state_41894;
(statearr_41913[(8)] = inst_41849);

(statearr_41913[(9)] = inst_41847);

(statearr_41913[(10)] = inst_41846);

(statearr_41913[(12)] = inst_41848);

return statearr_41913;
})();
var statearr_41914_41947 = state_41894__$1;
(statearr_41914_41947[(2)] = null);

(statearr_41914_41947[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41895 === (3))){
var inst_41892 = (state_41894[(2)]);
var state_41894__$1 = state_41894;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_41894__$1,inst_41892);
} else {
if((state_val_41895 === (12))){
var inst_41880 = (state_41894[(2)]);
var state_41894__$1 = state_41894;
var statearr_41915_41948 = state_41894__$1;
(statearr_41915_41948[(2)] = inst_41880);

(statearr_41915_41948[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41895 === (2))){
var state_41894__$1 = state_41894;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_41894__$1,(4),in$);
} else {
if((state_val_41895 === (23))){
var inst_41888 = (state_41894[(2)]);
var state_41894__$1 = state_41894;
var statearr_41916_41949 = state_41894__$1;
(statearr_41916_41949[(2)] = inst_41888);

(statearr_41916_41949[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41895 === (19))){
var inst_41875 = (state_41894[(2)]);
var state_41894__$1 = state_41894;
var statearr_41917_41950 = state_41894__$1;
(statearr_41917_41950[(2)] = inst_41875);

(statearr_41917_41950[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41895 === (11))){
var inst_41860 = (state_41894[(7)]);
var inst_41846 = (state_41894[(10)]);
var inst_41860__$1 = cljs.core.seq.call(null,inst_41846);
var state_41894__$1 = (function (){var statearr_41918 = state_41894;
(statearr_41918[(7)] = inst_41860__$1);

return statearr_41918;
})();
if(inst_41860__$1){
var statearr_41919_41951 = state_41894__$1;
(statearr_41919_41951[(1)] = (14));

} else {
var statearr_41920_41952 = state_41894__$1;
(statearr_41920_41952[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41895 === (9))){
var inst_41882 = (state_41894[(2)]);
var inst_41883 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_41894__$1 = (function (){var statearr_41921 = state_41894;
(statearr_41921[(15)] = inst_41882);

return statearr_41921;
})();
if(cljs.core.truth_(inst_41883)){
var statearr_41922_41953 = state_41894__$1;
(statearr_41922_41953[(1)] = (21));

} else {
var statearr_41923_41954 = state_41894__$1;
(statearr_41923_41954[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41895 === (5))){
var inst_41838 = cljs.core.async.close_BANG_.call(null,out);
var state_41894__$1 = state_41894;
var statearr_41924_41955 = state_41894__$1;
(statearr_41924_41955[(2)] = inst_41838);

(statearr_41924_41955[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41895 === (14))){
var inst_41860 = (state_41894[(7)]);
var inst_41862 = cljs.core.chunked_seq_QMARK_.call(null,inst_41860);
var state_41894__$1 = state_41894;
if(inst_41862){
var statearr_41925_41956 = state_41894__$1;
(statearr_41925_41956[(1)] = (17));

} else {
var statearr_41926_41957 = state_41894__$1;
(statearr_41926_41957[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41895 === (16))){
var inst_41878 = (state_41894[(2)]);
var state_41894__$1 = state_41894;
var statearr_41927_41958 = state_41894__$1;
(statearr_41927_41958[(2)] = inst_41878);

(statearr_41927_41958[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41895 === (10))){
var inst_41849 = (state_41894[(8)]);
var inst_41847 = (state_41894[(9)]);
var inst_41854 = cljs.core._nth.call(null,inst_41847,inst_41849);
var state_41894__$1 = state_41894;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_41894__$1,(13),out,inst_41854);
} else {
if((state_val_41895 === (18))){
var inst_41860 = (state_41894[(7)]);
var inst_41869 = cljs.core.first.call(null,inst_41860);
var state_41894__$1 = state_41894;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_41894__$1,(20),out,inst_41869);
} else {
if((state_val_41895 === (8))){
var inst_41849 = (state_41894[(8)]);
var inst_41848 = (state_41894[(12)]);
var inst_41851 = (inst_41849 < inst_41848);
var inst_41852 = inst_41851;
var state_41894__$1 = state_41894;
if(cljs.core.truth_(inst_41852)){
var statearr_41928_41959 = state_41894__$1;
(statearr_41928_41959[(1)] = (10));

} else {
var statearr_41929_41960 = state_41894__$1;
(statearr_41929_41960[(1)] = (11));

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
});})(c__32551__auto__))
;
return ((function (switch__32489__auto__,c__32551__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__32490__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__32490__auto____0 = (function (){
var statearr_41933 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_41933[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__32490__auto__);

(statearr_41933[(1)] = (1));

return statearr_41933;
});
var cljs$core$async$mapcat_STAR__$_state_machine__32490__auto____1 = (function (state_41894){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_41894);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e41934){if((e41934 instanceof Object)){
var ex__32493__auto__ = e41934;
var statearr_41935_41961 = state_41894;
(statearr_41935_41961[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_41894);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e41934;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__41962 = state_41894;
state_41894 = G__41962;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__32490__auto__ = function(state_41894){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__32490__auto____1.call(this,state_41894);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__32490__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__32490__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto__))
})();
var state__32553__auto__ = (function (){var statearr_41936 = f__32552__auto__.call(null);
(statearr_41936[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto__);

return statearr_41936;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto__))
);

return c__32551__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(){
var G__41964 = arguments.length;
switch (G__41964) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

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
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(){
var G__41967 = arguments.length;
switch (G__41967) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

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
cljs.core.async.unique = (function cljs$core$async$unique(){
var G__41970 = arguments.length;
switch (G__41970) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__32551__auto___42020 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto___42020,out){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto___42020,out){
return (function (state_41994){
var state_val_41995 = (state_41994[(1)]);
if((state_val_41995 === (7))){
var inst_41989 = (state_41994[(2)]);
var state_41994__$1 = state_41994;
var statearr_41996_42021 = state_41994__$1;
(statearr_41996_42021[(2)] = inst_41989);

(statearr_41996_42021[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41995 === (1))){
var inst_41971 = null;
var state_41994__$1 = (function (){var statearr_41997 = state_41994;
(statearr_41997[(7)] = inst_41971);

return statearr_41997;
})();
var statearr_41998_42022 = state_41994__$1;
(statearr_41998_42022[(2)] = null);

(statearr_41998_42022[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41995 === (4))){
var inst_41974 = (state_41994[(8)]);
var inst_41974__$1 = (state_41994[(2)]);
var inst_41975 = (inst_41974__$1 == null);
var inst_41976 = cljs.core.not.call(null,inst_41975);
var state_41994__$1 = (function (){var statearr_41999 = state_41994;
(statearr_41999[(8)] = inst_41974__$1);

return statearr_41999;
})();
if(inst_41976){
var statearr_42000_42023 = state_41994__$1;
(statearr_42000_42023[(1)] = (5));

} else {
var statearr_42001_42024 = state_41994__$1;
(statearr_42001_42024[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41995 === (6))){
var state_41994__$1 = state_41994;
var statearr_42002_42025 = state_41994__$1;
(statearr_42002_42025[(2)] = null);

(statearr_42002_42025[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41995 === (3))){
var inst_41991 = (state_41994[(2)]);
var inst_41992 = cljs.core.async.close_BANG_.call(null,out);
var state_41994__$1 = (function (){var statearr_42003 = state_41994;
(statearr_42003[(9)] = inst_41991);

return statearr_42003;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_41994__$1,inst_41992);
} else {
if((state_val_41995 === (2))){
var state_41994__$1 = state_41994;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_41994__$1,(4),ch);
} else {
if((state_val_41995 === (11))){
var inst_41974 = (state_41994[(8)]);
var inst_41983 = (state_41994[(2)]);
var inst_41971 = inst_41974;
var state_41994__$1 = (function (){var statearr_42004 = state_41994;
(statearr_42004[(10)] = inst_41983);

(statearr_42004[(7)] = inst_41971);

return statearr_42004;
})();
var statearr_42005_42026 = state_41994__$1;
(statearr_42005_42026[(2)] = null);

(statearr_42005_42026[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41995 === (9))){
var inst_41974 = (state_41994[(8)]);
var state_41994__$1 = state_41994;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_41994__$1,(11),out,inst_41974);
} else {
if((state_val_41995 === (5))){
var inst_41974 = (state_41994[(8)]);
var inst_41971 = (state_41994[(7)]);
var inst_41978 = cljs.core._EQ_.call(null,inst_41974,inst_41971);
var state_41994__$1 = state_41994;
if(inst_41978){
var statearr_42007_42027 = state_41994__$1;
(statearr_42007_42027[(1)] = (8));

} else {
var statearr_42008_42028 = state_41994__$1;
(statearr_42008_42028[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41995 === (10))){
var inst_41986 = (state_41994[(2)]);
var state_41994__$1 = state_41994;
var statearr_42009_42029 = state_41994__$1;
(statearr_42009_42029[(2)] = inst_41986);

(statearr_42009_42029[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41995 === (8))){
var inst_41971 = (state_41994[(7)]);
var tmp42006 = inst_41971;
var inst_41971__$1 = tmp42006;
var state_41994__$1 = (function (){var statearr_42010 = state_41994;
(statearr_42010[(7)] = inst_41971__$1);

return statearr_42010;
})();
var statearr_42011_42030 = state_41994__$1;
(statearr_42011_42030[(2)] = null);

(statearr_42011_42030[(1)] = (2));


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
});})(c__32551__auto___42020,out))
;
return ((function (switch__32489__auto__,c__32551__auto___42020,out){
return (function() {
var cljs$core$async$state_machine__32490__auto__ = null;
var cljs$core$async$state_machine__32490__auto____0 = (function (){
var statearr_42015 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_42015[(0)] = cljs$core$async$state_machine__32490__auto__);

(statearr_42015[(1)] = (1));

return statearr_42015;
});
var cljs$core$async$state_machine__32490__auto____1 = (function (state_41994){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_41994);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e42016){if((e42016 instanceof Object)){
var ex__32493__auto__ = e42016;
var statearr_42017_42031 = state_41994;
(statearr_42017_42031[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_41994);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e42016;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42032 = state_41994;
state_41994 = G__42032;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$state_machine__32490__auto__ = function(state_41994){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32490__auto____1.call(this,state_41994);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32490__auto____0;
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32490__auto____1;
return cljs$core$async$state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto___42020,out))
})();
var state__32553__auto__ = (function (){var statearr_42018 = f__32552__auto__.call(null);
(statearr_42018[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___42020);

return statearr_42018;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto___42020,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(){
var G__42034 = arguments.length;
switch (G__42034) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__32551__auto___42103 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto___42103,out){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto___42103,out){
return (function (state_42072){
var state_val_42073 = (state_42072[(1)]);
if((state_val_42073 === (7))){
var inst_42068 = (state_42072[(2)]);
var state_42072__$1 = state_42072;
var statearr_42074_42104 = state_42072__$1;
(statearr_42074_42104[(2)] = inst_42068);

(statearr_42074_42104[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42073 === (1))){
var inst_42035 = (new Array(n));
var inst_42036 = inst_42035;
var inst_42037 = (0);
var state_42072__$1 = (function (){var statearr_42075 = state_42072;
(statearr_42075[(7)] = inst_42037);

(statearr_42075[(8)] = inst_42036);

return statearr_42075;
})();
var statearr_42076_42105 = state_42072__$1;
(statearr_42076_42105[(2)] = null);

(statearr_42076_42105[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42073 === (4))){
var inst_42040 = (state_42072[(9)]);
var inst_42040__$1 = (state_42072[(2)]);
var inst_42041 = (inst_42040__$1 == null);
var inst_42042 = cljs.core.not.call(null,inst_42041);
var state_42072__$1 = (function (){var statearr_42077 = state_42072;
(statearr_42077[(9)] = inst_42040__$1);

return statearr_42077;
})();
if(inst_42042){
var statearr_42078_42106 = state_42072__$1;
(statearr_42078_42106[(1)] = (5));

} else {
var statearr_42079_42107 = state_42072__$1;
(statearr_42079_42107[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42073 === (15))){
var inst_42062 = (state_42072[(2)]);
var state_42072__$1 = state_42072;
var statearr_42080_42108 = state_42072__$1;
(statearr_42080_42108[(2)] = inst_42062);

(statearr_42080_42108[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42073 === (13))){
var state_42072__$1 = state_42072;
var statearr_42081_42109 = state_42072__$1;
(statearr_42081_42109[(2)] = null);

(statearr_42081_42109[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42073 === (6))){
var inst_42037 = (state_42072[(7)]);
var inst_42058 = (inst_42037 > (0));
var state_42072__$1 = state_42072;
if(cljs.core.truth_(inst_42058)){
var statearr_42082_42110 = state_42072__$1;
(statearr_42082_42110[(1)] = (12));

} else {
var statearr_42083_42111 = state_42072__$1;
(statearr_42083_42111[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42073 === (3))){
var inst_42070 = (state_42072[(2)]);
var state_42072__$1 = state_42072;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_42072__$1,inst_42070);
} else {
if((state_val_42073 === (12))){
var inst_42036 = (state_42072[(8)]);
var inst_42060 = cljs.core.vec.call(null,inst_42036);
var state_42072__$1 = state_42072;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_42072__$1,(15),out,inst_42060);
} else {
if((state_val_42073 === (2))){
var state_42072__$1 = state_42072;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42072__$1,(4),ch);
} else {
if((state_val_42073 === (11))){
var inst_42052 = (state_42072[(2)]);
var inst_42053 = (new Array(n));
var inst_42036 = inst_42053;
var inst_42037 = (0);
var state_42072__$1 = (function (){var statearr_42084 = state_42072;
(statearr_42084[(7)] = inst_42037);

(statearr_42084[(10)] = inst_42052);

(statearr_42084[(8)] = inst_42036);

return statearr_42084;
})();
var statearr_42085_42112 = state_42072__$1;
(statearr_42085_42112[(2)] = null);

(statearr_42085_42112[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42073 === (9))){
var inst_42036 = (state_42072[(8)]);
var inst_42050 = cljs.core.vec.call(null,inst_42036);
var state_42072__$1 = state_42072;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_42072__$1,(11),out,inst_42050);
} else {
if((state_val_42073 === (5))){
var inst_42045 = (state_42072[(11)]);
var inst_42037 = (state_42072[(7)]);
var inst_42036 = (state_42072[(8)]);
var inst_42040 = (state_42072[(9)]);
var inst_42044 = (inst_42036[inst_42037] = inst_42040);
var inst_42045__$1 = (inst_42037 + (1));
var inst_42046 = (inst_42045__$1 < n);
var state_42072__$1 = (function (){var statearr_42086 = state_42072;
(statearr_42086[(11)] = inst_42045__$1);

(statearr_42086[(12)] = inst_42044);

return statearr_42086;
})();
if(cljs.core.truth_(inst_42046)){
var statearr_42087_42113 = state_42072__$1;
(statearr_42087_42113[(1)] = (8));

} else {
var statearr_42088_42114 = state_42072__$1;
(statearr_42088_42114[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42073 === (14))){
var inst_42065 = (state_42072[(2)]);
var inst_42066 = cljs.core.async.close_BANG_.call(null,out);
var state_42072__$1 = (function (){var statearr_42090 = state_42072;
(statearr_42090[(13)] = inst_42065);

return statearr_42090;
})();
var statearr_42091_42115 = state_42072__$1;
(statearr_42091_42115[(2)] = inst_42066);

(statearr_42091_42115[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42073 === (10))){
var inst_42056 = (state_42072[(2)]);
var state_42072__$1 = state_42072;
var statearr_42092_42116 = state_42072__$1;
(statearr_42092_42116[(2)] = inst_42056);

(statearr_42092_42116[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42073 === (8))){
var inst_42045 = (state_42072[(11)]);
var inst_42036 = (state_42072[(8)]);
var tmp42089 = inst_42036;
var inst_42036__$1 = tmp42089;
var inst_42037 = inst_42045;
var state_42072__$1 = (function (){var statearr_42093 = state_42072;
(statearr_42093[(7)] = inst_42037);

(statearr_42093[(8)] = inst_42036__$1);

return statearr_42093;
})();
var statearr_42094_42117 = state_42072__$1;
(statearr_42094_42117[(2)] = null);

(statearr_42094_42117[(1)] = (2));


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
});})(c__32551__auto___42103,out))
;
return ((function (switch__32489__auto__,c__32551__auto___42103,out){
return (function() {
var cljs$core$async$state_machine__32490__auto__ = null;
var cljs$core$async$state_machine__32490__auto____0 = (function (){
var statearr_42098 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_42098[(0)] = cljs$core$async$state_machine__32490__auto__);

(statearr_42098[(1)] = (1));

return statearr_42098;
});
var cljs$core$async$state_machine__32490__auto____1 = (function (state_42072){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_42072);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e42099){if((e42099 instanceof Object)){
var ex__32493__auto__ = e42099;
var statearr_42100_42118 = state_42072;
(statearr_42100_42118[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_42072);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e42099;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42119 = state_42072;
state_42072 = G__42119;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$state_machine__32490__auto__ = function(state_42072){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32490__auto____1.call(this,state_42072);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32490__auto____0;
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32490__auto____1;
return cljs$core$async$state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto___42103,out))
})();
var state__32553__auto__ = (function (){var statearr_42101 = f__32552__auto__.call(null);
(statearr_42101[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___42103);

return statearr_42101;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto___42103,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(){
var G__42121 = arguments.length;
switch (G__42121) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__32551__auto___42194 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__32551__auto___42194,out){
return (function (){
var f__32552__auto__ = (function (){var switch__32489__auto__ = ((function (c__32551__auto___42194,out){
return (function (state_42163){
var state_val_42164 = (state_42163[(1)]);
if((state_val_42164 === (7))){
var inst_42159 = (state_42163[(2)]);
var state_42163__$1 = state_42163;
var statearr_42165_42195 = state_42163__$1;
(statearr_42165_42195[(2)] = inst_42159);

(statearr_42165_42195[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42164 === (1))){
var inst_42122 = [];
var inst_42123 = inst_42122;
var inst_42124 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_42163__$1 = (function (){var statearr_42166 = state_42163;
(statearr_42166[(7)] = inst_42124);

(statearr_42166[(8)] = inst_42123);

return statearr_42166;
})();
var statearr_42167_42196 = state_42163__$1;
(statearr_42167_42196[(2)] = null);

(statearr_42167_42196[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42164 === (4))){
var inst_42127 = (state_42163[(9)]);
var inst_42127__$1 = (state_42163[(2)]);
var inst_42128 = (inst_42127__$1 == null);
var inst_42129 = cljs.core.not.call(null,inst_42128);
var state_42163__$1 = (function (){var statearr_42168 = state_42163;
(statearr_42168[(9)] = inst_42127__$1);

return statearr_42168;
})();
if(inst_42129){
var statearr_42169_42197 = state_42163__$1;
(statearr_42169_42197[(1)] = (5));

} else {
var statearr_42170_42198 = state_42163__$1;
(statearr_42170_42198[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42164 === (15))){
var inst_42153 = (state_42163[(2)]);
var state_42163__$1 = state_42163;
var statearr_42171_42199 = state_42163__$1;
(statearr_42171_42199[(2)] = inst_42153);

(statearr_42171_42199[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42164 === (13))){
var state_42163__$1 = state_42163;
var statearr_42172_42200 = state_42163__$1;
(statearr_42172_42200[(2)] = null);

(statearr_42172_42200[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42164 === (6))){
var inst_42123 = (state_42163[(8)]);
var inst_42148 = inst_42123.length;
var inst_42149 = (inst_42148 > (0));
var state_42163__$1 = state_42163;
if(cljs.core.truth_(inst_42149)){
var statearr_42173_42201 = state_42163__$1;
(statearr_42173_42201[(1)] = (12));

} else {
var statearr_42174_42202 = state_42163__$1;
(statearr_42174_42202[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42164 === (3))){
var inst_42161 = (state_42163[(2)]);
var state_42163__$1 = state_42163;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_42163__$1,inst_42161);
} else {
if((state_val_42164 === (12))){
var inst_42123 = (state_42163[(8)]);
var inst_42151 = cljs.core.vec.call(null,inst_42123);
var state_42163__$1 = state_42163;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_42163__$1,(15),out,inst_42151);
} else {
if((state_val_42164 === (2))){
var state_42163__$1 = state_42163;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42163__$1,(4),ch);
} else {
if((state_val_42164 === (11))){
var inst_42131 = (state_42163[(10)]);
var inst_42127 = (state_42163[(9)]);
var inst_42141 = (state_42163[(2)]);
var inst_42142 = [];
var inst_42143 = inst_42142.push(inst_42127);
var inst_42123 = inst_42142;
var inst_42124 = inst_42131;
var state_42163__$1 = (function (){var statearr_42175 = state_42163;
(statearr_42175[(7)] = inst_42124);

(statearr_42175[(11)] = inst_42143);

(statearr_42175[(8)] = inst_42123);

(statearr_42175[(12)] = inst_42141);

return statearr_42175;
})();
var statearr_42176_42203 = state_42163__$1;
(statearr_42176_42203[(2)] = null);

(statearr_42176_42203[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42164 === (9))){
var inst_42123 = (state_42163[(8)]);
var inst_42139 = cljs.core.vec.call(null,inst_42123);
var state_42163__$1 = state_42163;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_42163__$1,(11),out,inst_42139);
} else {
if((state_val_42164 === (5))){
var inst_42124 = (state_42163[(7)]);
var inst_42131 = (state_42163[(10)]);
var inst_42127 = (state_42163[(9)]);
var inst_42131__$1 = f.call(null,inst_42127);
var inst_42132 = cljs.core._EQ_.call(null,inst_42131__$1,inst_42124);
var inst_42133 = cljs.core.keyword_identical_QMARK_.call(null,inst_42124,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_42134 = (inst_42132) || (inst_42133);
var state_42163__$1 = (function (){var statearr_42177 = state_42163;
(statearr_42177[(10)] = inst_42131__$1);

return statearr_42177;
})();
if(cljs.core.truth_(inst_42134)){
var statearr_42178_42204 = state_42163__$1;
(statearr_42178_42204[(1)] = (8));

} else {
var statearr_42179_42205 = state_42163__$1;
(statearr_42179_42205[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42164 === (14))){
var inst_42156 = (state_42163[(2)]);
var inst_42157 = cljs.core.async.close_BANG_.call(null,out);
var state_42163__$1 = (function (){var statearr_42181 = state_42163;
(statearr_42181[(13)] = inst_42156);

return statearr_42181;
})();
var statearr_42182_42206 = state_42163__$1;
(statearr_42182_42206[(2)] = inst_42157);

(statearr_42182_42206[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42164 === (10))){
var inst_42146 = (state_42163[(2)]);
var state_42163__$1 = state_42163;
var statearr_42183_42207 = state_42163__$1;
(statearr_42183_42207[(2)] = inst_42146);

(statearr_42183_42207[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42164 === (8))){
var inst_42131 = (state_42163[(10)]);
var inst_42127 = (state_42163[(9)]);
var inst_42123 = (state_42163[(8)]);
var inst_42136 = inst_42123.push(inst_42127);
var tmp42180 = inst_42123;
var inst_42123__$1 = tmp42180;
var inst_42124 = inst_42131;
var state_42163__$1 = (function (){var statearr_42184 = state_42163;
(statearr_42184[(7)] = inst_42124);

(statearr_42184[(14)] = inst_42136);

(statearr_42184[(8)] = inst_42123__$1);

return statearr_42184;
})();
var statearr_42185_42208 = state_42163__$1;
(statearr_42185_42208[(2)] = null);

(statearr_42185_42208[(1)] = (2));


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
});})(c__32551__auto___42194,out))
;
return ((function (switch__32489__auto__,c__32551__auto___42194,out){
return (function() {
var cljs$core$async$state_machine__32490__auto__ = null;
var cljs$core$async$state_machine__32490__auto____0 = (function (){
var statearr_42189 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_42189[(0)] = cljs$core$async$state_machine__32490__auto__);

(statearr_42189[(1)] = (1));

return statearr_42189;
});
var cljs$core$async$state_machine__32490__auto____1 = (function (state_42163){
while(true){
var ret_value__32491__auto__ = (function (){try{while(true){
var result__32492__auto__ = switch__32489__auto__.call(null,state_42163);
if(cljs.core.keyword_identical_QMARK_.call(null,result__32492__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__32492__auto__;
}
break;
}
}catch (e42190){if((e42190 instanceof Object)){
var ex__32493__auto__ = e42190;
var statearr_42191_42209 = state_42163;
(statearr_42191_42209[(5)] = ex__32493__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_42163);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e42190;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__32491__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42210 = state_42163;
state_42163 = G__42210;
continue;
} else {
return ret_value__32491__auto__;
}
break;
}
});
cljs$core$async$state_machine__32490__auto__ = function(state_42163){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__32490__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__32490__auto____1.call(this,state_42163);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__32490__auto____0;
cljs$core$async$state_machine__32490__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__32490__auto____1;
return cljs$core$async$state_machine__32490__auto__;
})()
;})(switch__32489__auto__,c__32551__auto___42194,out))
})();
var state__32553__auto__ = (function (){var statearr_42192 = f__32552__auto__.call(null);
(statearr_42192[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__32551__auto___42194);

return statearr_42192;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__32553__auto__);
});})(c__32551__auto___42194,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;

//# sourceMappingURL=async.js.map