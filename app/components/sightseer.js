!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.sightseer=e():t.sightseer=e()}(this,(()=>{return t={744:function(t,e){var n,r;void 0===ArrayBuffer.isView&&(ArrayBuffer.isView=function(t){return null!=t&&null!=t.__proto__&&t.__proto__.__proto__===Int8Array.prototype.__proto__}),void 0===(r="function"==typeof(n=function(t){"use strict";var e,n,r,o,i,a,u,c,s=ArrayBuffer.isView;function p(t,e,n,r,o,i,a){return function(t,e,n,r,o,i,a,u){e.a(r);var c=0,s=t,p=0,l=s.length;t:for(;p<l;){var f=s[p];if(p=p+1|0,(c=c+1|0)>1&&e.a(n),!(i<0||c<=i))break t;_(e,f,u)}return i>=0&&c>i&&e.a(a),e.a(o),e}(t,tt(),e,n,r,o,i,a).toString()}function l(t,e,n,r,o,i,a){return function(t,e,n,r,o,i,a,u){e.a(r);var c=0,s=t.b();t:for(;s.c();){var p=s.d();if((c=c+1|0)>1&&e.a(n),!(i<0||c<=i))break t;_(e,p,u)}return i>=0&&c>i&&e.a(a),e.a(o),e}(t,tt(),e,n,r,o,i,a).toString()}function f(){}function h(){e=this}function y(){return null==e&&new h,e}function d(){}function _(t,e,n){var r,o;null!=n?t.a(n(e)):null==e||("string"==typeof(r=e)||wt(r,function(t){return(t instanceof L?t:vt()).j1()}((o=v,Array.isArray(o)?function(t){var e;switch(t.length){case 1:e=Q(t[0]);break;case 0:e=N();break;default:e=new z}return e}(o):Q(o)))))?t.a(e):e instanceof rt?t.j(e.i_1):t.a(pt(e))}function v(){}function m(){}function b(){}function g(){}function $(){}function w(){}function C(){}function j(){n=this}function O(){return null==n&&new j,n}function A(){f.call(this)}function x(t){this.o_1=t,this.m_1=0,this.n_1=-1}function I(t,e){this.w_1=t,x.call(this,t),y().g(e,this.w_1.e()),this.p(e)}function E(){A.call(this),this.r_1=0}function k(t,e){return y().f(e,t.e()),e}function P(t){E.call(this),this.f1_1=t,this.g1_1=!1}function M(){}function S(){}function L(t){this.i1_1=t}function q(t,e,n){L.call(this,t),this.m1_1=e,this.n1_1=n}function B(){r=this,L.call(this,Object),this.p1_1="Nothing"}function N(){return null==r&&new B,r}function z(){}function F(t){L.call(this,t);var e,n=t.$metadata$;e=null==n?null:n.simpleName,this.r1_1=e}function T(){return a||(a=!0,t=function(t,e){var n=0,r=t.length-1|0;if(n<=r)do{var o=n;n=n+1|0,t[o]=e}while(o!==r);return t}(Array(0),null),o=t),o;var t}function R(){return function(t){return"number"==typeof(e=t)||e instanceof mt;var e}}function D(){return function(t){return null!=t&&(!!$t(e=t)&&!e.$type$);var e}}function K(){return function(t){return null!=t&&(!!$t(e=t)&&"BooleanArray"===e.$type$);var e}}function H(){return function(t){return null!=t&&(!!Jt(e=t,Uint16Array)&&"CharArray"===e.$type$);var e}}function U(){return function(t){return null!=t&&Jt(t,Int8Array)}}function Y(){return function(t){return null!=t&&Jt(t,Int16Array)}}function V(){return function(t){return null!=t&&Jt(t,Int32Array)}}function W(){return function(t){return null!=t&&(!!$t(e=t)&&"LongArray"===e.$type$);var e}}function X(){return function(t){return null!=t&&Jt(t,Float32Array)}}function J(){return function(t){return null!=t&&Jt(t,Float64Array)}}function G(){i=this;var t=Object;this.s1_1=new q(t,"Any",(function(t){return It(t)}));var e=Number;this.t1_1=new q(e,"Number",R()),this.u1_1=N();var n=Boolean;this.v1_1=new q(n,"Boolean",(function(t){return null!=t&&"boolean"==typeof t}));var r=Number;this.w1_1=new q(r,"Byte",(function(t){return null!=t&&"number"==typeof t}));var o=Number;this.x1_1=new q(o,"Short",(function(t){return null!=t&&"number"==typeof t}));var a=Number;this.y1_1=new q(a,"Int",(function(t){return null!=t&&"number"==typeof t}));var u=Number;this.z1_1=new q(u,"Float",(function(t){return null!=t&&"number"==typeof t}));var c=Number;this.a2_1=new q(c,"Double",(function(t){return null!=t&&"number"==typeof t}));var s=Array;this.b2_1=new q(s,"Array",D());var p=String;this.c2_1=new q(p,"String",(function(t){return null!=t&&"string"==typeof t}));var l=Error;this.d2_1=new q(l,"Throwable",(function(t){return t instanceof Error}));var f=Array;this.e2_1=new q(f,"BooleanArray",K());var h=Uint16Array;this.f2_1=new q(h,"CharArray",H());var y=Int8Array;this.g2_1=new q(y,"ByteArray",U());var d=Int16Array;this.h2_1=new q(d,"ShortArray",Y());var _=Int32Array;this.i2_1=new q(_,"IntArray",V());var v=Array;this.j2_1=new q(v,"LongArray",W());var m=Float32Array;this.k2_1=new q(m,"FloatArray",X());var b=Float64Array;this.l2_1=new q(b,"DoubleArray",J())}function Q(t){if(t===String)return(null==i&&new G,i).c2_1;var e,n=t.$metadata$;if(null!=n){var r;if(null==n.$kClass$){var o=new F(t);n.$kClass$=o,r=o}else r=n.$kClass$;e=r}else e=new F(t);return e}function Z(){}function tt(){return t=Object.create(et.prototype),et.call(t,""),t;var t}function et(t){this.g3_1=void 0!==t?t:""}function nt(){u=this,this.h3_1=0,this.i3_1=65535,this.j3_1=55296,this.k3_1=56319,this.l3_1=56320,this.m3_1=57343,this.n3_1=55296,this.o3_1=57343,this.p3_1=2,this.q3_1=16}function rt(t){null==u&&new nt,this.i_1=t}function ot(){}function it(){}function at(){}function ut(){}function ct(){}function st(){}function pt(t){var e=null==t?null:ft(t);return null==e?"null":e}function lt(t){return e=", ",n="[",r="]",o=0,i=null,a=function(t){return ft(t)},0!=(1&(u=24))&&(e=", "),0!=(2&u)&&(n=""),0!=(4&u)&&(r=""),0!=(8&u)&&(o=-1),0!=(16&u)&&(i="..."),0!=(32&u)&&(a=null),p(t,e,n,r,o,i,a);var e,n,r,o,i,a,u}function ft(t){return null==t?"null":function(t){return!!$t(t)||s(t)}(t)?"[...]":t.toString()}function ht(t,e){return null==t?null==e:null!=e&&("object"==typeof t&&"function"==typeof t.equals?t.equals(e):t!=t?e!=e:"number"==typeof t&&"number"==typeof e?t===e&&(0!==t||1/t==1/e):t===e)}function yt(t,e){null!=Error.captureStackTrace?Error.captureStackTrace(t,e):t.stack=(new Error).stack}function dt(t,e,n){Error.call(t),function(t,e,n){if(!_t(t,"message")){var r;if(null==e){var o;if(null!==e){var i=null==n?null:n.toString();o=null==i?void 0:i}else o=void 0;r=o}else r=e;t.message=r}_t(t,"cause")||(t.cause=n),t.name=Object.getPrototypeOf(t).constructor.name}(t,e,n)}function _t(t,e){return Object.getPrototypeOf(t).hasOwnProperty(e)}function vt(){throw Yt()}function mt(){}function bt(t,e,n,r,o,i){return gt("class",t,e,n,r,o,i)}function gt(t,e,n,r,o,i,a){return{kind:t,simpleName:e,interfaceId:"interface"===t?-1:void 0,interfaces:n||[],associatedObjectKey:r,associatedObjects:o,suspendArity:i,fastPrototype:a,$kClass$:void 0,interfacesCache:{isComplete:void 0===a&&(void 0===n||0===n.length),implementInterfaceMemo:{}}}}function $t(t){return Array.isArray(t)}function wt(t,e){var n=t.constructor;return null!=n&&Ct(n,e)}function Ct(t,e){if(t===e)return!0;var n=t.$metadata$;null!=n&&null==n.interfacesCache&&(n.interfacesCache={isComplete:!1,implementInterfaceMemo:{}});var r,o=null==n?null:n.interfacesCache;if(null!=o){o.isComplete||jt(t);var i=e.$metadata$,a=null==i?null:i.interfaceId;if(null==a)return!1;var u=a;r=!!o.implementInterfaceMemo[u]}else{var c=Ot(t),s=null==c?null:c.constructor;if(null==s)return!1;r=Ct(s,e)}return r}function jt(t){var e=t.$metadata$;null!=e&&null==e.interfacesCache&&(e.interfacesCache={isComplete:!1,implementInterfaceMemo:{}});var n,r=null==e?null:e.interfacesCache;if(null!=r){if(!0===r.isComplete)return r;for(var o=e.interfaces,i=0,a=o.length;i<a;){var u=o[i];i=i+1|0,n=u,r.implementInterfaceMemo[function(t){var e,n=t.$metadata$,r=n.interfaceId,o=null==r?-1:r;if(ht(o,-1)){var i=c;c=i+1|0;var a=i;n.interfaceId=a,e=a}else e=o;return e}(n)]=!0,At(r,jt(u))}}var s,p=Ot(t),l=null==p?null:p.constructor,f=null==l?null:jt(l),h=r;return null==h?s=null:(At(h,f),h.isComplete=!0,s=h),null==s?f:s}function Ot(t){var e,n=t.$metadata$;null==n?e=null:(null==n.fastPrototype&&(n.fastPrototype=xt(t)),e=n.fastPrototype);var r=e;return null==r?xt(t):r}function At(t,e){var n=null==e?null:e.implementInterfaceMemo;if(null==n)return O();var r=n;Object.assign(t.implementInterfaceMemo,r)}function xt(t){var e=t.prototype;return null==e?null:Object.getPrototypeOf(e)}function It(t){switch(typeof t){case"string":case"number":case"boolean":case"function":return!0;default:return Jt(t,Object)}}function Et(t,e,n,r,o){return gt("interface",t,e,n,r,o,void 0)}function kt(t,e,n,r,o,i){return gt("object",t,e,n,r,o,i)}function Pt(){yt(this,Pt)}function Mt(){var t,e=(Lt(t=Object.create(St.prototype)),St.call(t),t);return yt(e,Mt),e}function St(){yt(this,St)}function Lt(t){return function(t){dt(t,void 0,void 0),Pt.call(t)}(t),Bt.call(t),t}function qt(t,e){return function(t,e){dt(e,t,void 0),Pt.call(e)}(t,e),Bt.call(e),e}function Bt(){yt(this,Bt)}function Nt(t){var e=function(t,e){return qt(t,e),zt.call(e),e}(t,Object.create(zt.prototype));return yt(e,Nt),e}function zt(){yt(this,zt)}function Ft(){var t,e=(Lt(t=Object.create(Rt.prototype)),Rt.call(t),t);return yt(e,Ft),e}function Tt(t){var e=function(t,e){return qt(t,e),Rt.call(e),e}(t,Object.create(Rt.prototype));return yt(e,Tt),e}function Rt(){yt(this,Rt)}function Dt(t){var e=function(t,e){return qt(t,e),Kt.call(e),e}(t,Object.create(Kt.prototype));return yt(e,Dt),e}function Kt(){yt(this,Kt)}function Ht(){var t,e=(Lt(t=Object.create(Ut.prototype)),Ut.call(t),t);return yt(e,Ht),e}function Ut(){yt(this,Ut)}function Yt(){var t,e=(Lt(t=Object.create(Vt.prototype)),Vt.call(t),t);return yt(e,Yt),e}function Vt(){yt(this,Vt)}function Wt(t){var e=function(t,e){return qt(t,e),Xt.call(e),e}(t,Object.create(Xt.prototype));return yt(e,Wt),e}function Xt(){yt(this,Xt)}function Jt(t,e){return t instanceof e}return A.prototype=Object.create(f.prototype),A.prototype.constructor=A,I.prototype=Object.create(x.prototype),I.prototype.constructor=I,E.prototype=Object.create(A.prototype),E.prototype.constructor=E,P.prototype=Object.create(E.prototype),P.prototype.constructor=P,q.prototype=Object.create(L.prototype),q.prototype.constructor=q,B.prototype=Object.create(L.prototype),B.prototype.constructor=B,F.prototype=Object.create(L.prototype),F.prototype.constructor=F,mt.prototype=Object.create(C.prototype),mt.prototype.constructor=mt,Pt.prototype=Object.create(Error.prototype),Pt.prototype.constructor=Pt,Bt.prototype=Object.create(Pt.prototype),Bt.prototype.constructor=Bt,St.prototype=Object.create(Bt.prototype),St.prototype.constructor=St,zt.prototype=Object.create(Bt.prototype),zt.prototype.constructor=zt,Rt.prototype=Object.create(Bt.prototype),Rt.prototype.constructor=Rt,Kt.prototype=Object.create(Bt.prototype),Kt.prototype.constructor=Kt,Ut.prototype=Object.create(Bt.prototype),Ut.prototype.constructor=Ut,Vt.prototype=Object.create(Bt.prototype),Vt.prototype.constructor=Vt,Xt.prototype=Object.create(Bt.prototype),Xt.prototype.constructor=Xt,f.prototype.toString=function(){return t=", ",e="[",n="]",r=0,o=null,u=this,i=function(t){return t===u?"(this Collection)":pt(t)},0!=(1&(a=24))&&(t=", "),0!=(2&a)&&(e=""),0!=(4&a)&&(n=""),0!=(8&a)&&(r=-1),0!=(16&a)&&(o="..."),0!=(32&a)&&(i=null),l(this,t,e,n,r,o,i);var t,e,n,r,o,i,a,u},f.prototype.toArray=function(){return function(t){for(var e=[],n=t.b();n.c();)e.push(n.d());return e}(this)},f.$metadata$=bt("AbstractCollection",[ut]),h.prototype.f=function(t,e){if(t<0||t>=e)throw Dt("index: "+t+", size: "+e)},h.prototype.g=function(t,e){if(t<0||t>e)throw Dt("index: "+t+", size: "+e)},h.prototype.h=function(t,e){if(t.e()!==e.e())return!1;for(var n=e.b(),r=t.b();r.c();)if(!ht(r.d(),n.d()))return!1;return!0},h.$metadata$=kt("Companion"),d.$metadata$=Et("KClassifier"),v.$metadata$=Et("CharSequence"),m.$metadata$=Et("Comparable"),b.$metadata$=Et("Iterator"),g.$metadata$=Et("ListIterator",[b]),$.$metadata$=Et("MutableIterator",[b]),w.$metadata$=Et("MutableListIterator",[g,$]),C.$metadata$=bt("Number"),j.prototype.toString=function(){return"kotlin.Unit"},j.$metadata$=kt("Unit"),A.prototype.toJSON=function(){return this.toArray()},A.prototype.l=function(){},A.$metadata$=bt("AbstractMutableCollection",[ct],void 0,void 0,void 0,f.prototype),x.prototype.p=function(t){this.m_1=t},x.prototype.c=function(){return this.m_1<this.o_1.e()},x.prototype.d=function(){if(!this.c())throw Mt();var t=this.m_1;return this.m_1=t+1|0,this.n_1=t,this.o_1.q(this.n_1)},x.prototype.k=function(){if(-1===this.n_1)throw Nt(ft("Call next() or previous() before removing element from the iterator."));this.o_1.s(this.n_1),this.m_1=this.n_1,this.n_1=-1},x.$metadata$=bt("IteratorImpl",[$]),I.$metadata$=bt("ListIteratorImpl",[w],void 0,void 0,void 0,x.prototype),E.prototype.x=function(t){this.r_1=t},E.prototype.y=function(){return this.r_1},E.prototype.a1=function(t){return this.l(),this.z(this.e(),t),!0},E.prototype.b1=function(){this.l(),this.c1(0,this.e())},E.prototype.b=function(){return new x(this)},E.prototype.d1=function(t){return new I(this,t)},E.prototype.c1=function(t,e){var n=this.d1(t),r=e-t|0,o=0;if(o<r)do{o=o+1|0,n.d(),n.k()}while(o<r)},E.prototype.equals=function(t){return t===this||!(null==t||!wt(t,it))&&y().h(this,t)},E.$metadata$=bt("AbstractMutableList",[at],void 0,void 0,void 0,A.prototype),P.prototype.e=function(){return this.f1_1.length},P.prototype.q=function(t){var e=this.f1_1[k(this,t)];return null==e||It(e)?e:vt()},P.prototype.a1=function(t){this.l(),this.f1_1.push(t);var e=this.y();return this.x(e+1|0),!0},P.prototype.z=function(t,e){this.l(),this.f1_1.splice(function(t,e){return y().g(e,t.e()),e}(this,t),0,e);var n=this.y();this.x(n+1|0)},P.prototype.s=function(t){this.l(),k(this,t);var e=this.y();return this.x(e+1|0),t===(this.e()-1|0)?this.f1_1.pop():this.f1_1.splice(t,1)[0]},P.prototype.c1=function(t,e){this.l();var n=this.y();this.x(n+1|0),this.f1_1.splice(t,e-t|0)},P.prototype.b1=function(){var t;this.l(),t=[],this.f1_1=t;var e=this.y();this.x(e+1|0)},P.prototype.toString=function(){return lt(this.f1_1)},P.prototype.h1=function(){return[].slice.call(this.f1_1)},P.prototype.toArray=function(){return this.h1()},P.prototype.l=function(){if(this.g1_1)throw Ft()},P.$metadata$=bt("ArrayList",[at,M],void 0,void 0,void 0,E.prototype),M.$metadata$=Et("RandomAccess"),S.$metadata$=Et("KClass",[d]),L.prototype.j1=function(){return this.i1_1},L.prototype.equals=function(t){return t instanceof L&&ht(this.j1(),t.j1())},L.prototype.toString=function(){return"class "+this.k1()},L.$metadata$=bt("KClassImpl",[S]),q.prototype.equals=function(t){return t instanceof q&&!!L.prototype.equals.call(this,t)&&this.m1_1===t.m1_1},q.prototype.k1=function(){return this.m1_1},q.$metadata$=bt("PrimitiveKClassImpl",void 0,void 0,void 0,void 0,L.prototype),B.prototype.k1=function(){return this.p1_1},B.prototype.j1=function(){throw Tt("There's no native JS class for Nothing type")},B.prototype.equals=function(t){return t===this},B.$metadata$=kt("NothingKClassImpl",void 0,void 0,void 0,void 0,L.prototype),z.prototype.equals=function(t){return t===this},z.$metadata$=bt("ErrorKClass",[S]),F.prototype.k1=function(){return this.r1_1},F.$metadata$=bt("SimpleKClassImpl",void 0,void 0,void 0,void 0,L.prototype),G.prototype.m2=function(){return this.s1_1},G.prototype.n2=function(){return this.t1_1},G.prototype.o2=function(){return this.u1_1},G.prototype.p2=function(){return this.v1_1},G.prototype.q2=function(){return this.w1_1},G.prototype.r2=function(){return this.x1_1},G.prototype.s2=function(){return this.y1_1},G.prototype.t2=function(){return this.z1_1},G.prototype.u2=function(){return this.a2_1},G.prototype.v2=function(){return this.b2_1},G.prototype.w2=function(){return this.c2_1},G.prototype.x2=function(){return this.d2_1},G.prototype.y2=function(){return this.e2_1},G.prototype.z2=function(){return this.f2_1},G.prototype.a3=function(){return this.g2_1},G.prototype.b3=function(){return this.h2_1},G.prototype.c3=function(){return this.i2_1},G.prototype.d3=function(){return this.j2_1},G.prototype.e3=function(){return this.k2_1},G.prototype.f3=function(){return this.l2_1},G.prototype.functionClass=function(t){var e,n,r=T()[t];if(null==r){var o=new q(Function,"Function"+t,(n=t,function(t){return"function"==typeof t&&t.length===n}));T()[t]=o,e=o}else e=r;return e},G.$metadata$=kt("PrimitiveClasses"),Object.defineProperty(G.prototype,"anyClass",{configurable:!0,get:G.prototype.m2}),Object.defineProperty(G.prototype,"numberClass",{configurable:!0,get:G.prototype.n2}),Object.defineProperty(G.prototype,"nothingClass",{configurable:!0,get:G.prototype.o2}),Object.defineProperty(G.prototype,"booleanClass",{configurable:!0,get:G.prototype.p2}),Object.defineProperty(G.prototype,"byteClass",{configurable:!0,get:G.prototype.q2}),Object.defineProperty(G.prototype,"shortClass",{configurable:!0,get:G.prototype.r2}),Object.defineProperty(G.prototype,"intClass",{configurable:!0,get:G.prototype.s2}),Object.defineProperty(G.prototype,"floatClass",{configurable:!0,get:G.prototype.t2}),Object.defineProperty(G.prototype,"doubleClass",{configurable:!0,get:G.prototype.u2}),Object.defineProperty(G.prototype,"arrayClass",{configurable:!0,get:G.prototype.v2}),Object.defineProperty(G.prototype,"stringClass",{configurable:!0,get:G.prototype.w2}),Object.defineProperty(G.prototype,"throwableClass",{configurable:!0,get:G.prototype.x2}),Object.defineProperty(G.prototype,"booleanArrayClass",{configurable:!0,get:G.prototype.y2}),Object.defineProperty(G.prototype,"charArrayClass",{configurable:!0,get:G.prototype.z2}),Object.defineProperty(G.prototype,"byteArrayClass",{configurable:!0,get:G.prototype.a3}),Object.defineProperty(G.prototype,"shortArrayClass",{configurable:!0,get:G.prototype.b3}),Object.defineProperty(G.prototype,"intArrayClass",{configurable:!0,get:G.prototype.c3}),Object.defineProperty(G.prototype,"longArrayClass",{configurable:!0,get:G.prototype.d3}),Object.defineProperty(G.prototype,"floatArrayClass",{configurable:!0,get:G.prototype.e3}),Object.defineProperty(G.prototype,"doubleArrayClass",{configurable:!0,get:G.prototype.f3}),Z.$metadata$=Et("Appendable"),et.prototype.j=function(t){return this.g3_1=this.g3_1+new rt(t),this},et.prototype.a=function(t){return this.g3_1=this.g3_1+pt(t),this},et.prototype.toString=function(){return this.g3_1},et.$metadata$=bt("StringBuilder",[Z,v]),nt.$metadata$=kt("Companion"),rt.prototype.equals=function(t){return function(t,e){return e instanceof rt&&t===e.i_1}(this.i_1,t)},rt.prototype.toString=function(){return t=this.i_1,String.fromCharCode(t);var t},rt.$metadata$=bt("Char",[m]),ot.$metadata$=Et("Iterable"),it.$metadata$=Et("List",[ut]),at.$metadata$=Et("MutableList",[it,ct]),ut.$metadata$=Et("Collection",[ot]),ct.$metadata$=Et("MutableCollection",[ut,st]),st.$metadata$=Et("MutableIterable",[ot]),mt.$metadata$=bt("Long",[m],void 0,void 0,void 0,C.prototype),Pt.$metadata$=bt("Exception",void 0,void 0,void 0,void 0,Error.prototype),St.$metadata$=bt("NoSuchElementException",void 0,void 0,void 0,void 0,Bt.prototype),Bt.$metadata$=bt("RuntimeException",void 0,void 0,void 0,void 0,Pt.prototype),zt.$metadata$=bt("IllegalStateException",void 0,void 0,void 0,void 0,Bt.prototype),Rt.$metadata$=bt("UnsupportedOperationException",void 0,void 0,void 0,void 0,Bt.prototype),Kt.$metadata$=bt("IndexOutOfBoundsException",void 0,void 0,void 0,void 0,Bt.prototype),Ut.$metadata$=bt("NullPointerException",void 0,void 0,void 0,void 0,Bt.prototype),Vt.$metadata$=bt("ClassCastException",void 0,void 0,void 0,void 0,Bt.prototype),Xt.$metadata$=bt("UninitializedPropertyAccessException",void 0,void 0,void 0,void 0,Bt.prototype),c=0,t.$_$=t.$_$||{},t.$_$.a=function(){return t=Object.create(P.prototype),e=[],P.call(t,e),t;var t,e},t.$_$.b=O,t.$_$.c=bt,t.$_$.d=vt,t.$_$.e=function(t){var e;return null==t?function(){throw Ht()}():e=t,e},t.$_$.f=function(t){throw Wt("lateinit property "+t+" has not been initialized")},t})?n.apply(e,[e]):n)||(t.exports=r)},671:function(t,e,n){var r,o,i;o=[e,n(744)],void 0===(i="function"==typeof(r=function(t,e){"use strict";var n,r=e.$_$.f,o=e.$_$.b,i=e.$_$.d,a=e.$_$.a,u=e.$_$.e,c=e.$_$.c;function s(t){var e=t.t3_1;if(null!=e)return e;r("canvas")}function p(t){var e=t.u3_1;if(null!=e)return e;r("ctx")}function l(t){var e=t.v3_1;if(null!=e)return e;r("cropButton")}function f(t){var e=t.w3_1;if(null!=e)return e;r("saveButton")}function h(t,e){return function(n){var r=t,a=e.result;r.g4_1=null!=a&&"string"==typeof a?a:i();var u=new Image;u.src=t.g4_1,u.onload=function(t,e){return function(n){if(null!=t.t3_1&&null!=t.u3_1){p(t).clearRect(0,0,s(t).width,s(t).height);var r=s(t).width/e.width,i=s(t).height/e.height,a=Math.min(r,i),u=e.width*a*t.c4_1,c=e.height*a*t.c4_1,l=(s(t).width-u)/2+t.l4_1,f=(s(t).height-c)/2+t.m4_1;p(t).drawImage(e,l,f,u,c)}return o()}}(t,u);var c=n.target,l=(c instanceof FileReader?c:i()).result,f=null!=l&&"string"==typeof l?l:null,h=null==f?"":f;return u.setAttribute("src",h),o()}}function y(){var t=document.createElement("canvas");this.x3_1=t instanceof HTMLCanvasElement?t:i();var e=this.x3_1.getContext("2d");this.y3_1=e instanceof CanvasRenderingContext2D?e:i(),this.z3_1=!1,this.a4_1=0,this.b4_1=0,this.c4_1=1,this.d4_1=.1;var n;n=a(),this.e4_1=n,this.f4_1=0,this.g4_1="",this.h4_1=0,this.i4_1=0,this.j4_1=0,this.k4_1=0,this.l4_1=0,this.m4_1=0,this.n4_1=!1,this.o4_1=0,this.p4_1=0}return y.prototype.draw=function(){var t=document.getElementById("canvas-container"),e=null==t?null:t.firstChild;if(null==e){var n=document.createElement("canvas");e=n instanceof HTMLCanvasElement?n:i(),null==t||t.appendChild(s(this))}this.t3_1=e instanceof HTMLCanvasElement?e:i();var r=s(this).getContext("2d");this.u3_1=r instanceof CanvasRenderingContext2D?r:i(),s(this).width=500,s(this).height=500,p(this).fillStyle="blue",p(this).fillRect(50,50,200,200);var a=document.createElement("input"),u=a instanceof HTMLInputElement?a:i(),c=document.createElement("button");this.v3_1=c instanceof HTMLButtonElement?c:i(),l(this).setAttribute("disabled","true");var h=document.createElement("button");this.w3_1=h instanceof HTMLButtonElement?h:i();var y,d=document.createElement("div"),_=d instanceof HTMLDivElement?d:i(),v=_.style;v.position="fixed",v.top="20px",v.right="20px",v.display="flex",v.flexDirection="column",u.setAttribute("webkitdirectory","true"),u.type="file",u.multiple=!0,u.accept="image/*",u.addEventListener("change",(y=this,function(t){return y.onFileInputChange(t),o()})),s(this).width=window.innerWidth,s(this).height=window.innerHeight,this.x3_1.width=window.innerWidth,this.x3_1.height=window.innerHeight;var m=this.x3_1.style;m.position="absolute",m.top="0px",m.left="0px",this.x3_1.style.setProperty("pointer-events","none"),l(this).textContent="Crop",l(this).addEventListener("click",function(t){return function(e){return t.cropImage(),o()}}(this)),f(this).textContent="Save",f(this).addEventListener("click",function(t){return function(e){return t.saveImage(),o()}}(this));var b=document.body,g=null==b?null:b.style;null==g||(g.margin="0",g.padding="0");var $=document.body;null==$||$.append(s(this),_),_.append(u,l(this),f(this));var w=document.body;null==w||w.insertBefore(this.x3_1,s(this).nextSibling),document.addEventListener("keydown",function(t){return function(e){var n=e instanceof KeyboardEvent?e:i();if(37===n.keyCode){if(t.f4_1>0){var r=t,a=r.f4_1;r.f4_1=a-1|0,t.loadImage(t.e4_1.q(t.f4_1)),t.c4_1=1,t.l4_1=0,t.m4_1=0,o()}}else if(39===n.keyCode&&t.f4_1<(t.e4_1.e()-1|0)){var u=t,c=u.f4_1;u.f4_1=c+1|0,t.loadImage(t.e4_1.q(t.f4_1)),t.c4_1=1,t.l4_1=0,t.m4_1=0,o()}return o()}}(this)),s(this).addEventListener("mousedown",function(t){return function(e){return t.onMouseDown(e),o()}}(this)),s(this).addEventListener("mousemove",function(t){return function(e){return t.onMouseMove(e),o()}}(this)),s(this).addEventListener("mouseup",function(t){return function(e){return t.onMouseUp(),o()}}(this)),s(this).addEventListener("wheel",function(t){return function(e){var n=e instanceof WheelEvent?e:i();if(n.ctrlKey){n.preventDefault();var r=t;r.c4_1=r.c4_1+(n.deltaY>0?-t.d4_1:t.d4_1),t.loadImage(t.e4_1.q(t.f4_1))}return o()}}(this))},y.prototype.onFileInputChange=function(t){var e=t.target,n=(e instanceof HTMLInputElement?e:i()).files;if(null!=n&&n.length>0){this.e4_1.b1();var r=0,o=n.length;if(r<o)do{var a,c=r;r=r+1|0,a=n[c];var s=u(a);this.e4_1.a1(s)}while(r<o);this.loadImage(this.e4_1.q(0))}},y.prototype.loadImage=function(t){var e=new FileReader;e.onload=h(this,e),e.readAsDataURL(t)},y.prototype.onMouseDown=function(t){var e=t instanceof MouseEvent?t:i();e.shiftKey?(this.n4_1=!0,this.o4_1=e.clientX,this.p4_1=e.clientY):(this.z3_1=!0,this.a4_1=e.clientX,this.b4_1=e.clientY)},y.prototype.onMouseMove=function(t){var e=t instanceof MouseEvent?t:i(),n=e.clientX,r=e.clientY;if(this.z3_1&&(this.j4_1=n-this.a4_1,this.k4_1=r-this.b4_1,this.drawTempCanvas()),this.n4_1){this.l4_1=this.l4_1+(n-this.o4_1);this.m4_1=this.m4_1+(r-this.p4_1),this.o4_1=n,this.p4_1=r,this.loadImage(this.e4_1.q(this.f4_1))}},y.prototype.onMouseUp=function(){this.z3_1&&(this.h4_1=this.a4_1,this.i4_1=this.b4_1,this.z3_1=!1,l(this).removeAttribute("disabled")),this.n4_1&&(this.n4_1=!1)},y.prototype.drawTempCanvas=function(){this.y3_1.clearRect(0,0,this.x3_1.width,this.x3_1.height),this.y3_1.beginPath(),this.y3_1.rect(this.a4_1,this.b4_1,this.j4_1,this.k4_1),this.y3_1.strokeStyle="#FF0000",this.y3_1.stroke()},y.prototype.cropImage=function(){if(this.j4_1<=0||this.k4_1<=0)return window.alert("Please select a valid area to crop."),o();var t,e,n=new Image;n.src=this.g4_1,n.onload=(t=this,e=n,function(n){var r=s(t).width/e.width,i=s(t).height/e.height,a=Math.min(r,i),u=(s(t).width-e.width*a)/2,c=(s(t).height-e.height*a)/2,l=(t.h4_1-u)/a,f=(t.i4_1-c)/a,h=t.j4_1/a,y=t.k4_1/a;return p(t).clearRect(0,0,s(t).width,s(t).height),p(t).drawImage(e,l,f,h,y,t.h4_1,t.i4_1,t.j4_1,t.k4_1),o()})},y.prototype.saveImage=function(){window.open(s(this).toDataURL("image/png"),"_blank")},y.$metadata$=c("Sightseer"),function(t){t.Sightseer=y}(t),n=new y,window.sightseer=n,t})?r.apply(e,o):r)||(t.exports=i)}},e={},function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r].call(i.exports,i,i.exports,n),i.exports}(671);var t,e}));
//# sourceMappingURL=sightseer.js.map