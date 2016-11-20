(function(){var m,p=this;function q(a){a=a.split(".");for(var b=p,c;c=a.shift();)if(null!=b[c])b=b[c];else return null;return b}
function aa(){}
function ba(a){a.B=function(){return a.$?a.$:a.$=new a}}
function ca(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}
function da(a){var b=ca(a);return"array"==b||"object"==b&&"number"==typeof a.length}
function r(a){return"string"==typeof a}
function ea(a){return"function"==ca(a)}
function fa(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
var ia="closure_uid_"+(1E9*Math.random()>>>0),ja=0;function ka(a,b,c){return a.call.apply(a.bind,arguments)}
function la(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}
function t(a,b,c){t=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ka:la;return t.apply(null,arguments)}
function ma(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}}
var na=Date.now||function(){return+new Date};
function u(a,b){var c=a.split("."),d=p;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d[e]?d=d[e]:d=d[e]={}:d[e]=b}
function v(a,b){function c(){}
c.prototype=b.prototype;a.R=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Ja=function(a,c,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[c].apply(a,g)}}
;var oa;var pa=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};
function qa(a,b){return a<b?-1:a>b?1:0}
;var ra=Array.prototype.indexOf?function(a,b,c){return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;
if(r(a))return r(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},w=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=r(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},sa=Array.prototype.filter?function(a,b,c){return Array.prototype.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=r(a)?a.split(""):a,h=0;h<d;h++)if(h in g){var k=g[h];
b.call(c,k,h,a)&&(e[f++]=k)}return e},ta=Array.prototype.some?function(a,b,c){return Array.prototype.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=r(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;
return!1};
function va(a,b){var c;a:{c=a.length;for(var d=r(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){c=e;break a}c=-1}return 0>c?null:r(a)?a.charAt(c):a[c]}
function wa(a,b){return 0<=ra(a,b)}
function xa(a){return Array.prototype.concat.apply(Array.prototype,arguments)}
function ya(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}
function za(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(da(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}}
function Aa(a,b,c,d){return Array.prototype.splice.apply(a,Ba(arguments,1))}
function Ba(a,b,c){return 2>=arguments.length?Array.prototype.slice.call(a,b):Array.prototype.slice.call(a,b,c)}
;function Ca(a){if(a.classList)return a.classList;a=a.className;return r(a)&&a.match(/\S+/g)||[]}
function Da(a,b){return a.classList?a.classList.contains(b):wa(Ca(a),b)}
function Ea(a,b){a.classList?a.classList.add(b):Da(a,b)||(a.className+=0<a.className.length?" "+b:b)}
function Fa(a,b){a.classList?a.classList.remove(b):Da(a,b)&&(a.className=sa(Ca(a),function(a){return a!=b}).join(" "))}
function Ga(a,b,c){c?Ea(a,b):Fa(a,b)}
;function Ha(a,b){for(var c in a)b.call(void 0,a[c],c,a)}
function Ia(a){var b=Ja,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
var Ka="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function La(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<Ka.length;f++)c=Ka[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;var Ma;a:{var Na=p.navigator;if(Na){var Oa=Na.userAgent;if(Oa){Ma=Oa;break a}}Ma=""}function x(a){return-1!=Ma.indexOf(a)}
;function Pa(){this.f="";this.b=null}
function Qa(a,b){var c=new Pa;c.f=a;c.b=b;return c}
Qa("<!DOCTYPE html>",0);Qa("",0);Qa("<br>",0);function y(a,b){this.x=void 0!==a?a:0;this.y=void 0!==b?b:0}
y.prototype.clone=function(){return new y(this.x,this.y)};
y.prototype.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};
y.prototype.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};
y.prototype.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};function z(a,b){this.width=a;this.height=b}
z.prototype.clone=function(){return new z(this.width,this.height)};
z.prototype.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
z.prototype.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
z.prototype.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function Ra(a,b){var c=Sa;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)}
;var Ta=x("Opera"),A=x("Trident")||x("MSIE"),Ua=x("Edge"),Va=x("Gecko")&&!(-1!=Ma.toLowerCase().indexOf("webkit")&&!x("Edge"))&&!(x("Trident")||x("MSIE"))&&!x("Edge"),Wa=-1!=Ma.toLowerCase().indexOf("webkit")&&!x("Edge"),Xa=x("Windows");function Ya(){var a=p.document;return a?a.documentMode:void 0}
var Za;a:{var $a="",ab=function(){var a=Ma;if(Va)return/rv\:([^\);]+)(\)|;)/.exec(a);if(Ua)return/Edge\/([\d\.]+)/.exec(a);if(A)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Wa)return/WebKit\/(\S+)/.exec(a);if(Ta)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
ab&&($a=ab?ab[1]:"");if(A){var bb=Ya();if(null!=bb&&bb>parseFloat($a)){Za=String(bb);break a}}Za=$a}var cb=Za,Sa={};
function db(a){return Ra(a,function(){for(var b=0,c=pa(String(cb)).split("."),d=pa(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"";do{g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];h=/(\d*)(\D*)(.*)/.exec(h)||["","","",""];if(0==g[0].length&&0==h[0].length)break;b=qa(0==g[1].length?0:parseInt(g[1],10),0==h[1].length?0:parseInt(h[1],10))||qa(0==g[2].length,0==h[2].length)||qa(g[2],h[2]);g=g[3];h=h[3]}while(0==b)}return 0<=b})}
var eb=p.document,fb=eb&&A?Ya()||("CSS1Compat"==eb.compatMode?parseInt(cb,10):5):void 0;!Va&&!A||A&&9<=Number(fb)||Va&&db("1.9.1");var gb=A&&!db("9");function ib(a){return a?new jb(kb(a)):oa||(oa=new jb)}
function B(a){var b=document;return r(a)?b.getElementById(a):a}
function lb(a){var b=document;return b.querySelectorAll&&b.querySelector?b.querySelectorAll("."+a):mb(a,void 0)}
function mb(a,b){var c,d,e,f;c=document;c=b||c;if(c.querySelectorAll&&c.querySelector&&a)return c.querySelectorAll(""+(a?"."+a:""));if(a&&c.getElementsByClassName){var g=c.getElementsByClassName(a);return g}g=c.getElementsByTagName("*");if(a){f={};for(d=e=0;c=g[d];d++){var h=c.className;"function"==typeof h.split&&wa(h.split(/\s+/),a)&&(f[e++]=c)}f.length=e;return f}return g}
function nb(a){return"CSS1Compat"==a.compatMode}
function kb(a){return 9==a.nodeType?a:a.ownerDocument||a.document}
function ob(a,b){if("textContent"in a)a.textContent=b;else if(3==a.nodeType)a.data=b;else if(a.firstChild&&3==a.firstChild.nodeType){for(;a.lastChild!=a.firstChild;)a.removeChild(a.lastChild);a.firstChild.data=b}else{for(var c;c=a.firstChild;)a.removeChild(c);c=kb(a);a.appendChild(c.createTextNode(String(b)))}}
var pb={SCRIPT:1,STYLE:1,HEAD:1,IFRAME:1,OBJECT:1},qb={IMG:" ",BR:"\n"};function rb(a){if(gb&&null!==a&&"innerText"in a)a=a.innerText.replace(/(\r\n|\r|\n)/g,"\n");else{var b=[];sb(a,b,!0);a=b.join("")}a=a.replace(/ \xAD /g," ").replace(/\xAD/g,"");a=a.replace(/\u200B/g,"");gb||(a=a.replace(/ +/g," "));" "!=a&&(a=a.replace(/^\s*/,""));return a}
function sb(a,b,c){if(!(a.nodeName in pb))if(3==a.nodeType)c?b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,"")):b.push(a.nodeValue);else if(a.nodeName in qb)b.push(qb[a.nodeName]);else for(a=a.firstChild;a;)sb(a,b,c),a=a.nextSibling}
function tb(a){var b=ub.ma;return b?vb(a,function(a){return!b||r(a.className)&&wa(a.className.split(/\s+/),b)},!0,void 0):null}
function vb(a,b,c,d){c||(a=a.parentNode);for(c=0;a&&(null==d||c<=d);){if(b(a))return a;a=a.parentNode;c++}return null}
function jb(a){this.b=a||p.document||document}
jb.prototype.getElementsByTagName=function(a,b){return(b||this.b).getElementsByTagName(a)};
jb.prototype.createElement=function(a){return this.b.createElement(String(a))};
jb.prototype.isElement=function(a){return fa(a)&&1==a.nodeType};
jb.prototype.contains=function(a,b){if(!a||!b)return!1;if(a.contains&&1==b.nodeType)return a==b||a.contains(b);if("undefined"!=typeof a.compareDocumentPosition)return a==b||!!(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a};function wb(a){p.setTimeout(function(){throw a;},0)}
var xb;
function yb(){var a=p.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!x("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,a=t(function(a){if(("*"==d||a.origin==d)&&a.data==
c)this.port1.onmessage()},this);
b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});
if("undefined"!==typeof a&&!x("Trident")&&!x("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var a=c.X;c.X=null;a()}};
return function(a){d.next={X:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?function(a){var b=document.createElement("SCRIPT");
b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};
document.documentElement.appendChild(b)}:function(a){p.setTimeout(a,0)}}
;function zb(a,b,c){this.i=c;this.g=a;this.j=b;this.f=0;this.b=null}
zb.prototype.get=function(){var a;0<this.f?(this.f--,a=this.b,this.b=a.next,a.next=null):a=this.g();return a};function Ab(){this.f=this.b=null}
var Cb=new zb(function(){return new Bb},function(a){a.reset()},100);
Ab.prototype.remove=function(){var a=null;this.b&&(a=this.b,this.b=this.b.next,this.b||(this.f=null),a.next=null);return a};
function Bb(){this.next=this.f=this.b=null}
Bb.prototype.set=function(a,b){this.b=a;this.f=b;this.next=null};
Bb.prototype.reset=function(){this.next=this.f=this.b=null};function Db(a){Eb||Fb();Gb||(Eb(),Gb=!0);var b=Hb,c=Cb.get();c.set(a,void 0);b.f?b.f.next=c:b.b=c;b.f=c}
var Eb;function Fb(){if(p.Promise&&p.Promise.resolve){var a=p.Promise.resolve(void 0);Eb=function(){a.then(Ib)}}else Eb=function(){var a=Ib;
!ea(p.setImmediate)||p.Window&&p.Window.prototype&&!x("Edge")&&p.Window.prototype.setImmediate==p.setImmediate?(xb||(xb=yb()),xb(a)):p.setImmediate(a)}}
var Gb=!1,Hb=new Ab;function Ib(){for(var a;a=Hb.remove();){try{a.b.call(a.f)}catch(c){wb(c)}var b=Cb;b.j(a);b.f<b.i&&(b.f++,a.next=b.b,b.b=a)}Gb=!1}
;function Jb(){this.f=this.f;this.g=this.g}
Jb.prototype.f=!1;Jb.prototype.isDisposed=function(){return this.f};
Jb.prototype.dispose=function(){this.f||(this.f=!0,this.O())};
Jb.prototype.O=function(){if(this.g)for(;this.g.length;)this.g.shift()()};function C(a){Jb.call(this);this.C=1;this.i=[];this.j=0;this.b=[];this.l={};this.aa=!!a}
v(C,Jb);m=C.prototype;m.subscribe=function(a,b,c){var d=this.l[a];d||(d=this.l[a]=[]);var e=this.C;this.b[e]=a;this.b[e+1]=b;this.b[e+2]=c;this.C=e+3;d.push(e);return e};
m.unsubscribe=function(a,b,c){if(a=this.l[a]){var d=this.b;if(a=va(a,function(a){return d[a+1]==b&&d[a+2]==c}))return this.F(a)}return!1};
m.F=function(a){var b=this.b[a];if(b){var c=this.l[b];if(0!=this.j)this.i.push(a),this.b[a+1]=aa;else{if(c){var d=ra(c,a);0<=d&&Array.prototype.splice.call(c,d,1)}delete this.b[a];delete this.b[a+1];delete this.b[a+2]}}return!!b};
m.J=function(a,b){var c=this.l[a];if(c){for(var d=Array(arguments.length-1),e=1,f=arguments.length;e<f;e++)d[e-1]=arguments[e];if(this.aa)for(e=0;e<c.length;e++){var g=c[e];Kb(this.b[g+1],this.b[g+2],d)}else{this.j++;try{for(e=0,f=c.length;e<f;e++)g=c[e],this.b[g+1].apply(this.b[g+2],d)}finally{if(this.j--,0<this.i.length&&0==this.j)for(;c=this.i.pop();)this.F(c)}}return 0!=e}return!1};
function Kb(a,b,c){Db(function(){a.apply(b,c)})}
m.clear=function(a){if(a){var b=this.l[a];b&&(w(b,this.F,this),delete this.l[a])}else this.b.length=0,this.l={}};
function Lb(a,b){if(b){var c=a.l[b];return c?c.length:0}var c=0,d;for(d in a.l)c+=Lb(a,d);return c}
m.O=function(){C.R.O.call(this);this.clear();this.i.length=0};var Mb=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};u("yt.config_",Mb);u("yt.tokens_",window.yt&&window.yt.tokens_||{});var Nb=window.yt&&window.yt.msgs_||q("window.ytcfg.msgs")||{};u("yt.msgs_",Nb);function Ob(a){var b=arguments;if(1<b.length){var c=b[0];Mb[c]=b[1]}else for(c in b=b[0],b)Mb[c]=b[c]}
function D(a,b){return a in Mb?Mb[a]:b}
function Pb(a,b){ea(a)&&(a=Qb(a));return window.setTimeout(a,b)}
function Qb(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){throw Rb(b),b;}}:a}
function Rb(a){var b=q("yt.logging.errors.log");b?b(a,void 0,void 0,void 0,void 0):(b=D("ERRORS",[]),b.push([a,void 0,void 0,void 0,void 0]),Ob("ERRORS",b))}
;function Sb(a){var b=void 0;isNaN(b)&&(b=void 0);var c=q("yt.scheduler.instance.addJob");c?c(a,1,b):void 0===b?a():Pb(a,b||0)}
;function E(a,b){this.version=a;this.args=b}
function Tb(a){if(!a.ia){var b={};a.call(b);a.ia=b.version}return a.ia}
function Ub(a,b){function c(){a.apply(this,b.args)}
if(!b.args||!b.version)throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");var d;try{d=Tb(a)}catch(e){}if(!d||b.version!=d)throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");c.prototype=a.prototype;try{return new c}catch(e){throw e.message="yt.pubsub2.Data.deserialize(): "+e.message,e;}}
function F(a,b){this.b=a;this.G=b}
F.prototype.toString=function(){return this.b};var Vb=q("yt.pubsub2.instance_")||new C;C.prototype.subscribe=C.prototype.subscribe;C.prototype.unsubscribeByKey=C.prototype.F;C.prototype.publish=C.prototype.J;C.prototype.clear=C.prototype.clear;u("yt.pubsub2.instance_",Vb);var Wb=q("yt.pubsub2.subscribedKeys_")||{};u("yt.pubsub2.subscribedKeys_",Wb);var Xb=q("yt.pubsub2.topicToKeys_")||{};u("yt.pubsub2.topicToKeys_",Xb);var Yb=q("yt.pubsub2.isAsync_")||{};u("yt.pubsub2.isAsync_",Yb);u("yt.pubsub2.skipSubKey_",null);
function G(a,b){var c=Zb();return c?c.publish.call(c,a.toString(),a,b):!1}
function $b(a,b,c){window.yt.pubsub2.skipSubKey_=a;G.call(null,b,c);window.yt.pubsub2.skipSubKey_=null}
function H(a,b,c){var d=Zb();if(!d)return 0;var e=d.subscribe(a.toString(),function(d,g){if(!window.yt.pubsub2.skipSubKey_||window.yt.pubsub2.skipSubKey_!=e){var h=function(){if(Wb[e])try{if(g&&a instanceof F&&a!=d)try{g=Ub(a.G,g)}catch(h){throw h.message="yt.pubsub2 cross-binary conversion error for "+a.toString()+": "+h.message,h;}b.call(c||window,g)}catch(h){Rb(h)}};
Yb[a.toString()]?q("yt.scheduler.instance")?Sb(h):Pb(h,0):h()}});
Wb[e]=!0;Xb[a.toString()]||(Xb[a.toString()]=[]);Xb[a.toString()].push(e);return e}
function ac(a){var b=Zb();b&&("number"==typeof a&&(a=[a]),w(a,function(a){b.unsubscribeByKey(a);delete Wb[a]}))}
function Zb(){return q("yt.pubsub2.instance_")}
;var I=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function cc(a){return a?decodeURI(a):a}
function dc(a){if(a[1]){var b=a[0],c=b.indexOf("#");0<=c&&(a.push(b.substr(c)),a[0]=b=b.substr(0,c));c=b.indexOf("?");0>c?a[1]="?":c==b.length-1&&(a[1]=void 0)}return a.join("")}
function ec(a,b,c){if("array"==ca(b))for(var d=0;d<b.length;d++)ec(a,String(b[d]),c);else null!=b&&c.push("&",a,""===b?"":"=",encodeURIComponent(String(b)))}
function fc(a,b,c){for(c=c||0;c<b.length;c+=2)ec(b[c],b[c+1],a);return a}
function gc(a,b){for(var c in b)ec(c,b[c],a);return a}
function hc(a){a=gc([],a);a[0]="";return a.join("")}
function ic(a,b){return dc(2==arguments.length?fc([a],arguments[1],0):fc([a],arguments,1))}
;var jc={},kc=0;function lc(a){var b=new Image,c=""+kc++;jc[c]=b;b.onload=b.onerror=function(){delete jc[c]};
b.src=a}
;function mc(a){"?"==a.charAt(0)&&(a=a.substr(1));a=a.split("&");for(var b={},c=0,d=a.length;c<d;c++){var e=a[c].split("=");if(1==e.length&&e[0]||2==e.length){var f=decodeURIComponent((e[0]||"").replace(/\+/g," ")),e=decodeURIComponent((e[1]||"").replace(/\+/g," "));f in b?"array"==ca(b[f])?za(b[f],e):b[f]=[b[f],e]:b[f]=e}}return b}
function nc(a,b){var c=a.split("#",2);a=c[0];var c=1<c.length?"#"+c[1]:"",d=a.split("?",2);a=d[0];var d=mc(d[1]||""),e;for(e in b)d[e]=b[e];return dc(gc([a],d))+c}
;function oc(a){E.call(this,1,arguments);this.b=a}
v(oc,E);function J(a){E.call(this,1,arguments);this.b=a}
v(J,E);function pc(a,b){E.call(this,1,arguments);this.b=a;this.f=b}
v(pc,E);function qc(a,b,c,d,e){E.call(this,2,arguments);this.f=a;this.b=b;this.i=c||null;this.g=d||null;this.j=e||null}
v(qc,E);function rc(a,b,c){E.call(this,1,arguments);this.b=a;this.f=b}
v(rc,E);function sc(a,b,c,d,e,f,g){E.call(this,1,arguments);this.f=a;this.C=b;this.b=c;this.aa=d||null;this.i=e||null;this.g=f||null;this.j=g||null}
v(sc,E);
var tc=new F("subscription-batch-subscribe",oc),uc=new F("subscription-batch-unsubscribe",oc),vc=new F("subscription-pref-email",pc),wc=new F("subscription-subscribe",qc),xc=new F("subscription-subscribe-loading",J),yc=new F("subscription-subscribe-loaded",J),K=new F("subscription-subscribe-success",rc),zc=new F("subscription-subscribe-external",qc),Ac=new F("subscription-unsubscribe",sc),Bc=new F("subscription-unsubscirbe-loading",J),Cc=new F("subscription-unsubscribe-loaded",J),L=new F("subscription-unsubscribe-success",J),
Dc=new F("subscription-external-unsubscribe",sc),Ec=new F("subscription-enable-ypc",J),Fc=new F("subscription-disable-ypc",J);var Gc=q("yt.pubsub.instance_")||new C;C.prototype.subscribe=C.prototype.subscribe;C.prototype.unsubscribeByKey=C.prototype.F;C.prototype.publish=C.prototype.J;C.prototype.clear=C.prototype.clear;u("yt.pubsub.instance_",Gc);var Hc=q("yt.pubsub.subscribedKeys_")||{};u("yt.pubsub.subscribedKeys_",Hc);var Ic=q("yt.pubsub.topicToKeys_")||{};u("yt.pubsub.topicToKeys_",Ic);var Jc=q("yt.pubsub.isSynchronous_")||{};u("yt.pubsub.isSynchronous_",Jc);var Kc=q("yt.pubsub.skipSubId_")||null;
u("yt.pubsub.skipSubId_",Kc);function Lc(a,b,c){var d=Mc();if(d){var e=d.subscribe(a,function(){if(!Kc||Kc!=e){var d=arguments,g;g=function(){Hc[e]&&b.apply(c||window,d)};
try{Jc[a]?g():Pb(g,0)}catch(h){Rb(h)}}},c);
Hc[e]=!0;Ic[a]||(Ic[a]=[]);Ic[a].push(e);return e}return 0}
function Nc(a){var b=Mc();b&&("number"==typeof a?a=[a]:"string"==typeof a&&(a=[parseInt(a,10)]),w(a,function(a){b.unsubscribeByKey(a);delete Hc[a]}))}
function Oc(a,b){var c=Mc();return c?c.publish.apply(c,arguments):!1}
function Mc(){return q("yt.pubsub.instance_")}
;function Pc(a){var b=document.location.protocol+"//"+document.domain+"/post_login",b=ic(b,"mode","subscribe"),b=ic("/signin?context=popup","next",b),b=ic(b,"feature","sub_button");if(b=window.open(b,"loginPopup","width=375,height=440,resizable=yes,scrollbars=yes",!0)){var c=Lc("LOGGED_IN",function(b){Nc(D("LOGGED_IN_PUBSUB_KEY",void 0));Ob("LOGGED_IN",!0);a(b)});
Ob("LOGGED_IN_PUBSUB_KEY",c);b.moveTo((screen.width-375)/2,(screen.height-440)/2)}}
u("yt.pubsub.publish",Oc);function Qc(a){return eval("("+a+")")}
;var Rc=null;"undefined"!=typeof XMLHttpRequest?Rc=function(){return new XMLHttpRequest}:"undefined"!=typeof ActiveXObject&&(Rc=function(){return new ActiveXObject("Microsoft.XMLHTTP")});function Sc(a,b,c,d,e,f,g){function h(){4==(k&&"readyState"in k?k.readyState:0)&&b&&Qb(b)(k)}
var k=Rc&&Rc();if(!("open"in k))return null;"onloadend"in k?k.addEventListener("loadend",h,!1):k.onreadystatechange=h;c=(c||"GET").toUpperCase();d=d||"";k.open(c,a,!0);f&&(k.responseType=f);g&&(k.withCredentials=!0);f="POST"==c;if(e=Tc(a,e))for(var l in e)k.setRequestHeader(l,e[l]),"content-type"==l.toLowerCase()&&(f=!1);f&&k.setRequestHeader("Content-Type","application/x-www-form-urlencoded");k.send(d);return k}
function Tc(a,b){b=b||{};var c;c||(c=window.location.href);var d=a.match(I)[1]||null,e=cc(a.match(I)[3]||null);d&&e?(d=c,c=a.match(I),d=d.match(I),c=c[3]==d[3]&&c[1]==d[1]&&c[4]==d[4]):c=e?cc(c.match(I)[3]||null)==e&&(Number(c.match(I)[4]||null)||null)==(Number(a.match(I)[4]||null)||null):!0;for(var f in Uc){if((e=d=D(Uc[f]))&&!(e=c)){var e=f,g=D("CORS_HEADER_WHITELIST")||{},h=cc(a.match(I)[3]||null);e=h?(g=g[h])?wa(g,e):!1:!0}e&&(b[f]=d)}return b}
function Vc(a,b){var c=D("XSRF_FIELD_NAME",void 0),d;b.headers&&(d=b.headers["Content-Type"]);return!b.La&&(!cc(a.match(I)[3]||null)||b.withCredentials||cc(a.match(I)[3]||null)==document.location.hostname)&&"POST"==b.method&&(!d||"application/x-www-form-urlencoded"==d)&&!(b.w&&b.w[c])}
function Wc(a,b){var c=b.format||"JSON";b.Ma&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var d=D("XSRF_FIELD_NAME",void 0),e=D("XSRF_TOKEN",void 0),f=b.ha;f&&(f[d]&&delete f[d],a=nc(a,f||{}));var g=b.Na||"",f=b.w;Vc(a,b)&&(f||(f={}),f[d]=e);f&&r(g)&&(d=mc(g),La(d,f),g=b.Aa&&"JSON"==b.Aa?JSON.stringify(d):hc(d));var h=!1,k,l=Sc(a,function(a){if(!h){h=!0;k&&window.clearTimeout(k);var d;a:switch(a&&"status"in a?a.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:d=
!0;break a;default:d=!1}var e=null;if(d||400<=a.status&&500>a.status)e=Xc(c,a,b.Ka);if(d)a:{switch(c){case "XML":d=0==parseInt(e&&e.return_code,10);break a;case "RAW":d=!0;break a}d=!!e}var e=e||{},f=b.context||p;d?b.D&&b.D.call(f,a,e):b.onError&&b.onError.call(f,a,e);b.P&&b.P.call(f,a,e)}},b.method,g,b.headers,b.responseType,b.withCredentials);
b.ya&&0<b.timeout&&(k=Pb(function(){h||(h=!0,l.abort(),window.clearTimeout(k),b.ya.call(b.context||p,l))},b.timeout))}
function Xc(a,b,c){var d=null;switch(a){case "JSON":a=b.responseText;b=b.getResponseHeader("Content-Type")||"";a&&0<=b.indexOf("json")&&(d=Qc(a));break;case "XML":if(b=(b=b.responseXML)?Yc(b):null)d={},w(b.getElementsByTagName("*"),function(a){d[a.tagName]=Zc(a)})}c&&$c(d);
return d}
function $c(a){if(fa(a))for(var b in a){var c;(c="html_content"==b)||(c=b.length-5,c=0<=c&&b.indexOf("_html",c)==c);if(c){c=b;var d;d=Qa(a[b],null);a[c]=d}else $c(a[b])}}
function Yc(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&0<a.length?a[0]:null:null}
function Zc(a){var b="";w(a.childNodes,function(a){b+=a.nodeValue});
return b}
var Uc={"X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL","X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-YouTube-Variants-Checksum":"VARIANTS_CHECKSUM"};function ad(){var a=D("PLAYER_CONFIG");return a&&a.args&&void 0!==a.args.authuser?!0:!(!D("SESSION_INDEX")&&!D("LOGGED_IN"))}
;function bd(a,b,c,d){this.top=a;this.right=b;this.bottom=c;this.left=d}
m=bd.prototype;m.getHeight=function(){return this.bottom-this.top};
m.clone=function(){return new bd(this.top,this.right,this.bottom,this.left)};
m.contains=function(a){return this&&a?a instanceof bd?a.left>=this.left&&a.right<=this.right&&a.top>=this.top&&a.bottom<=this.bottom:a.x>=this.left&&a.x<=this.right&&a.y>=this.top&&a.y<=this.bottom:!1};
m.ceil=function(){this.top=Math.ceil(this.top);this.right=Math.ceil(this.right);this.bottom=Math.ceil(this.bottom);this.left=Math.ceil(this.left);return this};
m.floor=function(){this.top=Math.floor(this.top);this.right=Math.floor(this.right);this.bottom=Math.floor(this.bottom);this.left=Math.floor(this.left);return this};
m.round=function(){this.top=Math.round(this.top);this.right=Math.round(this.right);this.bottom=Math.round(this.bottom);this.left=Math.round(this.left);return this};function cd(a,b,c,d){this.left=a;this.top=b;this.width=c;this.height=d}
m=cd.prototype;m.clone=function(){return new cd(this.left,this.top,this.width,this.height)};
m.contains=function(a){return a instanceof y?a.x>=this.left&&a.x<=this.left+this.width&&a.y>=this.top&&a.y<=this.top+this.height:this.left<=a.left&&this.left+this.width>=a.left+a.width&&this.top<=a.top&&this.top+this.height>=a.top+a.height};
m.ceil=function(){this.left=Math.ceil(this.left);this.top=Math.ceil(this.top);this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
m.floor=function(){this.left=Math.floor(this.left);this.top=Math.floor(this.top);this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
m.round=function(){this.left=Math.round(this.left);this.top=Math.round(this.top);this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function M(a,b){var c=kb(a);return c.defaultView&&c.defaultView.getComputedStyle&&(c=c.defaultView.getComputedStyle(a,null))?c[b]||c.getPropertyValue(b)||"":""}
function dd(a,b){return M(a,b)||(a.currentStyle?a.currentStyle[b]:null)||a.style&&a.style[b]}
function ed(a){var b;try{b=a.getBoundingClientRect()}catch(c){return{left:0,top:0,right:0,bottom:0}}A&&a.ownerDocument.body&&(a=a.ownerDocument,b.left-=a.documentElement.clientLeft+a.body.clientLeft,b.top-=a.documentElement.clientTop+a.body.clientTop);return b}
function fd(a){"number"==typeof a&&(a+="px");return a}
function gd(a){var b=hd;if("none"!=dd(a,"display"))return b(a);var c=a.style,d=c.display,e=c.visibility,f=c.position;c.visibility="hidden";c.position="absolute";c.display="inline";a=b(a);c.display=d;c.position=f;c.visibility=e;return a}
function hd(a){var b=a.offsetWidth,c=a.offsetHeight,d=Wa&&!b&&!c;return(void 0===b||d)&&a.getBoundingClientRect?(a=ed(a),new z(a.right-a.left,a.bottom-a.top)):new z(b,c)}
function id(a,b){if(/^\d+px?$/.test(b))return parseInt(b,10);var c=a.style.left,d=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;a.style.left=b;var e=a.style.pixelLeft;a.style.left=c;a.runtimeStyle.left=d;return e}
function jd(a,b){var c=a.currentStyle?a.currentStyle[b]:null;return c?id(a,c):0}
var kd={thin:2,medium:4,thick:6};function ld(a,b){if("none"==(a.currentStyle?a.currentStyle[b+"Style"]:null))return 0;var c=a.currentStyle?a.currentStyle[b+"Width"]:null;return c in kd?kd[c]:id(a,c)}
;var md=q("yt.dom.getNextId_");if(!md){md=function(){return++nd};
u("yt.dom.getNextId_",md);var nd=0}function od(){var a=document,b;ta(["fullscreenElement","webkitFullscreenElement","mozFullScreenElement","msFullscreenElement"],function(c){b=a[c];return!!b});
return b}
;function pd(){var a=od();return a?a:null}
;function qd(a,b){(a=B(a))&&a.style&&(a.style.display=b?"":"none",Ga(a,"hid",!b))}
function rd(a){w(arguments,function(a){!da(a)||a instanceof Element?qd(a,!0):w(a,function(a){rd(a)})})}
function sd(a){w(arguments,function(a){!da(a)||a instanceof Element?qd(a,!1):w(a,function(a){sd(a)})})}
;function td(a){this.type="";this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.shiftKey=this.ctrlKey=this.altKey=!1;this.clientY=this.clientX=0;this.changedTouches=null;if(a=a||window.event){this.b=a;for(var b in a)b in ud||(this[b]=a[b]);(b=a.target||a.srcElement)&&3==b.nodeType&&(b=b.parentNode);this.target=b;if(b=a.relatedTarget)try{b=b.nodeName?b:null}catch(c){b=null}else"mouseover"==this.type?b=a.fromElement:"mouseout"==this.type&&(b=
a.toElement);this.relatedTarget=b;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey}}
td.prototype.preventDefault=function(){this.b&&(this.b.returnValue=!1,this.b.preventDefault&&this.b.preventDefault())};
td.prototype.stopPropagation=function(){this.b&&(this.b.cancelBubble=!0,this.b.stopPropagation&&this.b.stopPropagation())};
td.prototype.stopImmediatePropagation=function(){this.b&&(this.b.cancelBubble=!0,this.b.stopImmediatePropagation&&this.b.stopImmediatePropagation())};
var ud={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};var Ja=q("yt.events.listeners_")||{};u("yt.events.listeners_",Ja);var vd=q("yt.events.counter_")||{count:0};u("yt.events.counter_",vd);function wd(a,b,c,d){a.addEventListener&&("mouseenter"!=b||"onmouseenter"in document?"mouseleave"!=b||"onmouseenter"in document?"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return Ia(function(e){return e[0]==a&&e[1]==b&&e[2]==c&&e[4]==!!d})}
function N(a,b,c,d){if(a&&(a.addEventListener||a.attachEvent)){d=!!d;var e=wd(a,b,c,d);if(!e){var e=++vd.count+"",f=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document),g;g=f?function(d){d=new td(d);if(!vb(d.relatedTarget,function(b){return b==a},!0))return d.currentTarget=a,d.type=b,c.call(a,d)}:function(b){b=new td(b);
b.currentTarget=a;return c.call(a,b)};
g=Qb(g);a.addEventListener?("mouseenter"==b&&f?b="mouseover":"mouseleave"==b&&f?b="mouseout":"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),a.addEventListener(b,g,d)):a.attachEvent("on"+b,g);Ja[e]=[a,b,c,g,d]}}}
;var O={},xd="ontouchstart"in document;function yd(a,b,c){var d;switch(a){case "mouseover":case "mouseout":d=3;break;case "mouseenter":case "mouseleave":d=9}return vb(c,function(a){return Da(a,b)},!0,d)}
function P(a){var b="mouseover"==a.type&&"mouseenter"in O||"mouseout"==a.type&&"mouseleave"in O,c=a.type in O||b;if("HTML"!=a.target.tagName&&c){if(b){var b="mouseover"==a.type?"mouseenter":"mouseleave",c=O[b],d;for(d in c.l){var e=yd(b,d,a.target);e&&!vb(a.relatedTarget,function(a){return a==e},!0)&&c.J(d,e,b,a)}}if(b=O[a.type])for(d in b.l)(e=yd(a.type,d,a.target))&&b.J(d,e,a.type,a)}}
N(document,"blur",P,!0);N(document,"change",P,!0);N(document,"click",P);N(document,"focus",P,!0);N(document,"mouseover",P);N(document,"mouseout",P);N(document,"mousedown",P);N(document,"keydown",P);N(document,"keyup",P);N(document,"keypress",P);N(document,"cut",P);N(document,"paste",P);xd&&(N(document,"touchstart",P),N(document,"touchend",P),N(document,"touchcancel",P));function zd(a,b,c){a&&(a.dataset?a.dataset[Ad(b)]=c:a.setAttribute("data-"+b,c))}
function Q(a,b){return a?a.dataset?a.dataset[Ad(b)]:a.getAttribute("data-"+b):null}
function Bd(a,b){a&&(a.dataset?delete a.dataset[Ad(b)]:a.removeAttribute("data-"+b))}
var Cd={};function Ad(a){return Cd[a]||(Cd[a]=String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()}))}
;function Dd(a){this.j=a;this.g={};this.K=[];this.i=[]}
function R(a,b){return"yt-uix"+(a.j?"-"+a.j:"")+(b?"-"+b:"")}
Dd.prototype.unregister=function(){Nc(this.K);this.K.length=0;ac(this.i);this.i.length=0};
Dd.prototype.init=aa;Dd.prototype.dispose=aa;function Ed(a,b,c){a.i.push(H(b,c,a))}
function T(a,b,c){var d=R(a,void 0),e=t(c,a);b in O||(O[b]=new C);O[b].subscribe(d,e);a.g[c]=e}
function Fd(a,b,c){if(b in O){var d=O[b];d.unsubscribe(R(a,void 0),a.g[c]);0>=Lb(d)&&(d.dispose(),delete O[b])}delete a.g[c]}
function Gd(a,b){zd(a,"tooltip-text",b)}
;function Hd(){Dd.call(this,"tooltip");this.b=0;this.f={}}
v(Hd,Dd);ba(Hd);m=Hd.prototype;m.register=function(){T(this,"mouseover",this.H);T(this,"mouseout",this.v);T(this,"focus",this.Z);T(this,"blur",this.W);T(this,"click",this.v);T(this,"touchstart",this.ga);T(this,"touchend",this.L);T(this,"touchcancel",this.L)};
m.unregister=function(){Fd(this,"mouseover",this.H);Fd(this,"mouseout",this.v);Fd(this,"focus",this.Z);Fd(this,"blur",this.W);Fd(this,"click",this.v);Fd(this,"touchstart",this.ga);Fd(this,"touchend",this.L);Fd(this,"touchcancel",this.L);this.dispose();Hd.R.unregister.call(this)};
m.dispose=function(){for(var a in this.f)this.v(this.f[a]);this.f={}};
m.H=function(a){if(!(this.b&&1E3>na()-this.b)){var b=parseInt(Q(a,"tooltip-hide-timer"),10);b&&(Bd(a,"tooltip-hide-timer"),window.clearTimeout(b));var b=t(function(){Id(this,a);Bd(a,"tooltip-show-timer")},this),c=parseInt(Q(a,"tooltip-show-delay"),10)||0,b=Pb(b,c);
zd(a,"tooltip-show-timer",b.toString());a.title&&(Gd(a,Jd(a)),a.title="");b=(a[ia]||(a[ia]=++ja)).toString();this.f[b]=a}};
m.v=function(a){var b=parseInt(Q(a,"tooltip-show-timer"),10);b&&(window.clearTimeout(b),Bd(a,"tooltip-show-timer"));b=t(function(){if(a){var b=B(Kd(this,a));b&&(Ld(b),b&&b.parentNode&&b.parentNode.removeChild(b),Bd(a,"content-id"));(b=B(Kd(this,a,"arialabel")))&&b.parentNode&&b.parentNode.removeChild(b)}Bd(a,"tooltip-hide-timer")},this);
b=Pb(b,50);zd(a,"tooltip-hide-timer",b.toString());if(b=Q(a,"tooltip-text"))a.title=b;b=(a[ia]||(a[ia]=++ja)).toString();delete this.f[b]};
m.Z=function(a){this.b=0;this.H(a)};
m.W=function(a){this.b=0;this.v(a)};
m.ga=function(a,b,c){c.changedTouches&&(this.b=0,a=yd(b,R(this),c.changedTouches[0].target),this.H(a))};
m.L=function(a,b,c){c.changedTouches&&(this.b=na(),a=yd(b,R(this),c.changedTouches[0].target),this.v(a))};
function Md(a,b){Gd(a,b);var c=Q(a,"content-id");(c=B(c))&&ob(c,b)}
function Jd(a){return Q(a,"tooltip-text")||a.title}
function Id(a,b){if(b){var c=Jd(b);if(c){var d=B(Kd(a,b));if(!d){d=document.createElement("div");d.id=Kd(a,b);d.className=R(a,"tip");var e=document.createElement("div");e.className=R(a,"tip-body");var f=document.createElement("div");f.className=R(a,"tip-arrow");var g=document.createElement("div");g.setAttribute("aria-hidden","true");g.className=R(a,"tip-content");var h=Nd(a,b),k=Kd(a,b,"content");g.id=k;zd(b,"content-id",k);e.appendChild(g);h&&d.appendChild(h);d.appendChild(e);d.appendChild(f);var l=
rb(b),k=Kd(a,b,"arialabel"),f=document.createElement("div");Ea(f,R(a,"arialabel"));f.id=k;l=b.hasAttribute("aria-label")?b.getAttribute("aria-label"):"rtl"==document.body.getAttribute("dir")?c+" "+l:l+" "+c;ob(f,l);b.setAttribute("aria-labelledby",k);k=pd()||document.body;k.appendChild(f);k.appendChild(d);Md(b,c);(c=parseInt(Q(b,"tooltip-max-width"),10))&&e.offsetWidth>c&&(e.style.width=c+"px",Ea(g,R(a,"normal-wrap")));g=Da(b,R(a,"reverse"));Od(a,b,d,e,h,g)||Od(a,b,d,e,h,!g);var n=R(a,"tip-visible");
Pb(function(){Ea(d,n)},0)}}}}
function Od(a,b,c,d,e,f){Ga(c,R(a,"tip-reverse"),f);var g=0;f&&(g=1);a=gd(b);f=new y((a.width-10)/2,f?a.height:0);var h=kb(b),k=new y(0,0),l;l=h?kb(h):document;l=!A||9<=Number(fb)||nb(ib(l).b)?l.documentElement:l.body;if(b!=l){l=ed(b);var n=ib(h).b,h=n.scrollingElement?n.scrollingElement:!Wa&&nb(n)?n.documentElement:n.body||n.documentElement,n=n.parentWindow||n.defaultView,h=A&&db("10")&&n.pageYOffset!=h.scrollTop?new y(h.scrollLeft,h.scrollTop):new y(n.pageXOffset||h.scrollLeft,n.pageYOffset||h.scrollTop);
k.x=l.left+h.x;k.y=l.top+h.y}f=new y(k.x+f.x,k.y+f.y);f=f.clone();k=(g&8&&"rtl"==dd(c,"direction")?g^4:g)&-9;g=gd(c);l=g.clone();h=f.clone();l=l.clone();0!=k&&(k&4?h.x-=l.width+0:k&2&&(h.x-=l.width/2),k&1&&(h.y-=l.height+0));f=new cd(0,0,0,0);f.left=h.x;f.top=h.y;f.width=l.width;f.height=l.height;l=new y(f.left,f.top);l instanceof y?(k=l.x,l=l.y):(k=l,l=void 0);c.style.left=fd(k);c.style.top=fd(l);l=new z(f.width,f.height);if(!(g==l||g&&l&&g.width==l.width&&g.height==l.height))if(g=l,f=kb(c),k=nb(ib(f).b),
!A||db("10")||k&&db("8"))f=c.style,Va?f.MozBoxSizing="border-box":Wa?f.WebkitBoxSizing="border-box":f.boxSizing="border-box",f.width=Math.max(g.width,0)+"px",f.height=Math.max(g.height,0)+"px";else if(f=c.style,k){A?(k=jd(c,"paddingLeft"),l=jd(c,"paddingRight"),h=jd(c,"paddingTop"),n=jd(c,"paddingBottom"),k=new bd(h,l,n,k)):(k=M(c,"paddingLeft"),l=M(c,"paddingRight"),h=M(c,"paddingTop"),n=M(c,"paddingBottom"),k=new bd(parseFloat(h),parseFloat(l),parseFloat(n),parseFloat(k)));if(!A||9<=Number(fb))l=
M(c,"borderLeftWidth"),h=M(c,"borderRightWidth"),n=M(c,"borderTopWidth"),X=M(c,"borderBottomWidth"),l=new bd(parseFloat(n),parseFloat(h),parseFloat(X),parseFloat(l));else{l=ld(c,"borderLeft");var h=ld(c,"borderRight"),n=ld(c,"borderTop"),X=ld(c,"borderBottom");l=new bd(n,h,X,l)}f.pixelWidth=g.width-l.left-k.left-k.right-l.right;f.pixelHeight=g.height-l.top-k.top-k.bottom-l.bottom}else f.pixelWidth=g.width,f.pixelHeight=g.height;g=window.document;g=nb(g)?g.documentElement:g.body;f=new z(g.clientWidth,
g.clientHeight);1==c.nodeType?(c=ed(c),l=new y(c.left,c.top)):(c=c.changedTouches?c.changedTouches[0]:c,l=new y(c.clientX,c.clientY));c=gd(d);h=Math.floor(c.width/2);g=!!(f.height<l.y+a.height);a=!!(l.y<a.height);k=!!(l.x<h);f=!!(f.width<l.x+h);l=(c.width+3)/-2- -5;b=Q(b,"force-tooltip-direction");if("left"==b||k)l=-5;else if("right"==b||f)l=20-c.width-3;b=Math.floor(l)+"px";d.style.left=b;e&&(e.style.left=b,e.style.height=c.height+"px",e.style.width=c.width+"px");return!(g||a)}
function Kd(a,b,c){a=R(a);var d=b.__yt_uid_key;d||(d=md(),b.__yt_uid_key=d);b=a+d;c&&(b+="-"+c);return b}
function Nd(a,b){var c=null;Xa&&Da(b,R(a,"masked"))&&((c=B("yt-uix-tooltip-shared-mask"))?(c.parentNode.removeChild(c),rd(c)):(c=document.createElement("iframe"),c.src='javascript:""',c.id="yt-uix-tooltip-shared-mask",c.className=R(a,"tip-mask")));return c}
function Ld(a){var b=B("yt-uix-tooltip-shared-mask"),c=b&&vb(b,function(b){return b==a},!1,2);
b&&c&&(b.parentNode.removeChild(b),sd(b),document.body.appendChild(b))}
;function U(){Dd.call(this,"subscription-button");this.b=!1}
v(U,Dd);ba(U);U.prototype.register=function(){T(this,"click",this.M);Ed(this,xc,this.ca);Ed(this,yc,this.ba);Ed(this,K,this.Ba);Ed(this,Bc,this.ca);Ed(this,Cc,this.ba);Ed(this,L,this.Ca);Ed(this,Ec,this.xa);Ed(this,Fc,this.wa)};
U.prototype.unregister=function(){Fd(this,"click",this.M);U.R.unregister.call(this)};
U.prototype.f=function(a){return!!Q(a,"is-subscribed")};
var ub={S:"hover-enabled",ka:"yt-uix-button-subscribe",la:"yt-uix-button-subscribed",Da:"ypc-enabled",ma:"yt-uix-button-subscription-container",na:"yt-subscription-button-disabled-mask-container"},Pd={Ea:"channel-external-id",oa:"subscriber-count-show-when-subscribed",pa:"subscriber-count-tooltip",qa:"subscriber-count-title",Fa:"href",T:"is-subscribed",Ga:"parent-url",Ha:"clicktracking",ra:"style-type",U:"subscription-id",Ia:"target",sa:"ypc-enabled"};m=U.prototype;
m.M=function(a){var b=Q(a,"href"),c=ad();if(!b||this.b&&c)if(c){var b=Q(a,"channel-external-id"),c=Q(a,"clicktracking"),d;if(Q(a,"ypc-enabled")){d=Q(a,"ypc-item-type");var e=Q(a,"ypc-item-id");d={itemType:d,itemId:e,subscriptionElement:a}}else d=null;e=Q(a,"parent-url");if(Q(a,"is-subscribed")){var f=Q(a,"subscription-id");G(Ac,new sc(b,f,d,a,c,e))}else G(wc,new qc(b,d,c,e))}else Qd(this,a);else a=Q(a,"target")||"_self",window.open(b,a)};
m.ca=function(a){this.A(a.b,this.ea,!0)};
m.ba=function(a){this.A(a.b,this.ea,!1)};
m.Ba=function(a){this.A(a.b,this.fa,!0,a.f)};
m.Ca=function(a){this.A(a.b,this.fa,!1)};
m.xa=function(a){this.A(a.b,this.va)};
m.wa=function(a){this.A(a.b,this.ua)};
m.fa=function(a,b,c){b?(zd(a,Pd.T,"true"),c&&zd(a,Pd.U,c)):(Bd(a,Pd.T),Bd(a,Pd.U));Rd(a)};
m.ea=function(a,b){var c;c=tb(a);Ga(c,ub.na,b);a.setAttribute("aria-busy",b?"true":"false");a.disabled=b};
function Rd(a){var b=Q(a,Pd.ra),c=!!Q(a,"is-subscribed"),b="-"+b,d=ub.la+b;Ga(a,ub.ka+b,!c);Ga(a,d,c);Q(a,Pd.pa)&&!Q(a,Pd.oa)&&(b=R(Hd.B()),Ga(a,b,!c),a.title=c?"":Q(a,Pd.qa));c?Pb(function(){Ea(a,ub.S)},1E3):Fa(a,ub.S)}
m.va=function(a){var b=!!Q(a,"ypc-item-type"),c=!!Q(a,"ypc-item-id");!Q(a,"ypc-enabled")&&b&&c&&(Ea(a,"ypc-enabled"),zd(a,Pd.sa,"true"))};
m.ua=function(a){Q(a,"ypc-enabled")&&(Fa(a,"ypc-enabled"),Bd(a,"ypc-enabled"))};
function Sd(a,b){var c=lb(R(a));return sa(c,function(a){return b==Q(a,"channel-external-id")},a)}
m.ta=function(a,b,c){var d=Ba(arguments,2);w(a,function(a){b.apply(this,xa(a,d))},this)};
m.A=function(a,b,c){var d=Sd(this,a),d=xa([d],Ba(arguments,1));this.ta.apply(this,d)};
function Qd(a,b){var c=t(function(a){a.discoverable_subscriptions&&Ob("SUBSCRIBE_EMBED_DISCOVERABLE_SUBSCRIPTIONS",a.discoverable_subscriptions);this.M(b)},a);
Pc(c)}
;var Td=window.yt&&window.yt.uix&&window.yt.uix.widgets_||{};u("yt.uix.widgets_",Td);var Ud=window,Vd=document,Wd=Ud.location;function Xd(){}
var Yd=/\[native code\]/;function V(a,b,c){return a[b]=a[b]||c}
function Zd(a){for(var b=0;b<this.length;b++)if(this[b]===a)return b;return-1}
function $d(a){a=a.sort();for(var b=[],c=void 0,d=0;d<a.length;d++){var e=a[d];e!=c&&b.push(e);c=e}return b}
function W(){var a;if((a=Object.create)&&Yd.test(a))a=a(null);else{a={};for(var b in a)a[b]=void 0}return a}
var ae=V(Ud,"gapi",{});var Y;Y=V(Ud,"___jsl",W());V(Y,"I",0);V(Y,"hel",10);function be(){var a=Wd.href,b;if(Y.dpo)b=Y.h;else{b=Y.h;var c=RegExp("([#].*&|[#])jsh=([^&#]*)","g"),d=RegExp("([?#].*&|[?#])jsh=([^&#]*)","g");if(a=a&&(c.exec(a)||d.exec(a)))try{b=decodeURIComponent(a[2])}catch(e){}}return b}
function ce(a){var b=V(Y,"PQ",[]);Y.PQ=[];var c=b.length;if(0===c)a();else for(var d=0,e=function(){++d===c&&a()},f=0;f<c;f++)b[f](e)}
function de(a){return V(V(Y,"H",W()),a,W())}
;var ee=V(Y,"perf",W());V(ee,"g",W());var fe=V(ee,"i",W());V(ee,"r",[]);W();W();function ge(a,b,c){b&&0<b.length&&(b=he(b),c&&0<c.length&&(b+="___"+he(c)),28<b.length&&(b=b.substr(0,28)+(b.length-28)),c=b,b=V(fe,"_p",W()),V(b,c,W())[a]=(new Date).getTime(),b=ee.r,"function"===typeof b?b(a,"_p",c):b.push([a,"_p",c]))}
function he(a){return a.join("__").replace(/\./g,"_").replace(/\-/g,"_").replace(/\,/g,"_")}
;var ie=W(),je=[];function Z(a){throw Error("Bad hint"+(a?": "+a:""));}
;je.push(["jsl",function(a){for(var b in a)if(Object.prototype.hasOwnProperty.call(a,b)){var c=a[b];"object"==typeof c?Y[b]=V(Y,b,[]).concat(c):V(Y,b,c)}if(b=a.u)a=V(Y,"us",[]),a.push(b),(b=/^https:(.*)$/.exec(b))&&a.push("http:"+b[1])}]);var ke=/^(\/[a-zA-Z0-9_\-]+)+$/,le=/^[a-zA-Z0-9\-_\.,!]+$/,me=/^gapi\.loaded_[0-9]+$/,ne=/^[a-zA-Z0-9,._-]+$/;function oe(a,b,c,d){var e=a.split(";"),f=e.shift(),g=ie[f],h=null;g?h=g(e,b,c,d):Z("no hint processor for: "+f);h||Z("failed to generate load url");b=h;c=b.match(pe);(d=b.match(qe))&&1===d.length&&re.test(b)&&c&&1===c.length||Z("failed sanity: "+a);return h}
function se(a,b,c,d){function e(a){return encodeURIComponent(a).replace(/%2C/g,",")}
a=te(a);me.test(c)||Z("invalid_callback");b=ue(b);d=d&&d.length?ue(d):null;return[encodeURIComponent(a.za).replace(/%2C/g,",").replace(/%2F/g,"/"),"/k=",e(a.version),"/m=",e(b),d?"/exm="+e(d):"","/rt=j/sv=1/d=1/ed=1",a.V?"/am="+e(a.V):"",a.da?"/rs="+e(a.da):"",a.ja?"/t="+e(a.ja):"","/cb=",e(c)].join("")}
function te(a){"/"!==a.charAt(0)&&Z("relative path");for(var b=a.substring(1).split("/"),c=[];b.length;){a=b.shift();if(!a.length||0==a.indexOf("."))Z("empty/relative directory");else if(0<a.indexOf("=")){b.unshift(a);break}c.push(a)}a={};for(var d=0,e=b.length;d<e;++d){var f=b[d].split("="),g=decodeURIComponent(f[0]),h=decodeURIComponent(f[1]);2==f.length&&g&&h&&(a[g]=a[g]||h)}b="/"+c.join("/");ke.test(b)||Z("invalid_prefix");c=ve(a,"k",!0);d=ve(a,"am");e=ve(a,"rs");a=ve(a,"t");return{za:b,version:c,
V:d,da:e,ja:a}}
function ue(a){for(var b=[],c=0,d=a.length;c<d;++c){var e=a[c].replace(/\./g,"_").replace(/-/g,"_");ne.test(e)&&b.push(e)}return b.join(",")}
function ve(a,b,c){a=a[b];!a&&c&&Z("missing: "+b);if(a){if(le.test(a))return a;Z("invalid: "+b)}return null}
var re=/^https?:\/\/[a-z0-9_.-]+\.google\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,qe=/\/cb=/g,pe=/\/\//g;function we(){var a=be();if(!a)throw Error("Bad hint");return a}
ie.m=function(a,b,c,d){(a=a[0])||Z("missing_hint");return"https://apis.google.com"+se(a,b,c,d)};var xe=decodeURI("%73cript");function ye(a,b){for(var c=[],d=0;d<a.length;++d){var e=a[d];e&&0>Zd.call(b,e)&&c.push(e)}return c}
function ze(a){"loading"!=Vd.readyState?Ae(a):Vd.write("<"+xe+' src="'+encodeURI(a)+'"></'+xe+">")}
function Ae(a){var b=Vd.createElement(xe);b.setAttribute("src",a);b.async="true";(a=Vd.getElementsByTagName(xe)[0])?a.parentNode.insertBefore(b,a):(Vd.head||Vd.body||Vd.documentElement).appendChild(b)}
function Be(a,b){var c=b&&b._c;if(c)for(var d=0;d<je.length;d++){var e=je[d][0],f=je[d][1];f&&Object.prototype.hasOwnProperty.call(c,e)&&f(c[e],a,b)}}
function Ce(a,b,c){De(function(){var c;c=b===be()?V(ae,"_",W()):W();c=V(de(b),"_",c);a(c)},c)}
function Ee(a,b){var c=b||{};"function"==typeof b&&(c={},c.callback=b);Be(a,c);var d=a?a.split(":"):[],e=c.h||we(),f=V(Y,"ah",W());if(f["::"]&&d.length){for(var g=[],h=null;h=d.shift();){var k=h.split("."),k=f[h]||f[k[1]&&"ns:"+k[0]||""]||e,l=g.length&&g[g.length-1]||null,n=l;l&&l.hint==k||(n={hint:k,Y:[]},g.push(n));n.Y.push(h)}var X=g.length;if(1<X){var ua=c.callback;ua&&(c.callback=function(){0==--X&&ua()})}for(;d=g.shift();)Fe(d.Y,c,d.hint)}else Fe(d||[],c,e)}
function Fe(a,b,c){function d(a,b){if(X)return 0;Ud.clearTimeout(n);ua.push.apply(ua,S);var d=((ae||{}).config||{}).update;d?d(f):f&&V(Y,"cu",[]).push(f);if(b){ge("me0",a,hb);try{Ce(b,c,l)}finally{ge("me1",a,hb)}}return 1}
a=$d(a)||[];var e=b.callback,f=b.config,g=b.timeout,h=b.ontimeout,k=b.onerror,l=void 0;"function"==typeof k&&(l=k);var n=null,X=!1;if(g&&!h||!g&&h)throw"Timeout requires both the timeout parameter and ontimeout parameter to be set";var k=V(de(c),"r",[]).sort(),ua=V(de(c),"L",[]).sort(),hb=[].concat(k);0<g&&(n=Ud.setTimeout(function(){X=!0;h()},g));
var S=ye(a,ua);if(S.length){var S=ye(a,k),ga=V(Y,"CP",[]),ha=ga.length;ga[ha]=function(a){function b(){var a=ga[ha+1];a&&a()}
function c(b){ga[ha]=null;d(S,a)&&ce(function(){e&&e();b()})}
if(!a)return 0;ge("ml1",S,hb);0<ha&&ga[ha-1]?ga[ha]=function(){c(b)}:c(b)};
if(S.length){var bc="loaded_"+Y.I++;ae[bc]=function(a){ga[ha](a);ae[bc]=null};
a=oe(c,S,"gapi."+bc,k);k.push.apply(k,S);ge("ml0",S,hb);b.sync||Ud.___gapisync?ze(a):Ae(a)}else ga[ha](Xd)}else d(S)&&e&&e()}
;function De(a,b){if(Y.hee&&0<Y.hel)try{return a()}catch(c){b&&b(c),Y.hel--,Ee("debug_error",function(){try{window.___jsl.hefn(c)}catch(a){throw c;}})}else try{return a()}catch(c){throw b&&b(c),c;
}}
;ae.load=function(a,b){return De(function(){return Ee(a,b)})};function Ge(a){a=ea(a)?{callback:a}:a||{};if(a.gapiHintOverride||D("GAPI_HINT_OVERRIDE")){var b;b=document.location.href;-1!=b.indexOf("?")?(b=(b||"").split("#")[0],b=b.split("?",2),b=mc(1<b.length?b[1]:b[0])):b={};(b=b.gapi_jsh)&&La(a,{_c:{jsl:{h:b}}})}Ee("gapi.iframes:gapi.iframes.style.common",a)}
;function He(){return q("gapi.iframes.getContext")()}
function Ie(a){(He()||He()).connectIframes(a)}
function Je(a,b){He().addOnConnectHandler("yt",a,void 0,b)}
function Ke(){return He().getParentIframe()}
;var Le="http://www.youtube.com https://www.youtube.com https://plus.google.com https://plus.googleapis.com https://plus.sandbox.google.com https://plusone.google.com https://plusone.sandbox.google.com https://apis.google.com https://apis.sandbox.google.com".split(" "),Me=[xc,yc,K,Bc,Cc,L,zc,Dc],Ne=[xc,yc,K,Bc,Cc,L,Ec,Fc];function Oe(a){this.b=a;this.o=null;D("SUBSCRIBE_EMBED_HOVERCARD_URL")&&(Pe(this),N(this.b,"mouseover",t(this.i,this)),N(this.b,"mouseout",t(this.N,this)),N(this.b,"click",t(this.N,this)),H(K,ma(this.f,!0),this),H(L,ma(this.f,!1),this),Qe(this))}
function Pe(a){var b={url:D("SUBSCRIBE_EMBED_HOVERCARD_URL"),style:"bubble",hideClickDetection:!0,show:!1,anchor:a.b,relayOpen:"-1"};a=t(a.g,a);He().open(b,a)}
function Qe(a){ad()||Lc("LOGGED_IN",function(){this.o&&(this.N(),this.o.close(),this.o=null,Pe(this))},a)}
Oe.prototype.g=function(a){this.o=a;a=U.B().f(this.b);this.f(a)};
Oe.prototype.i=function(){this.o&&this.o.restyle({show:!0})};
Oe.prototype.N=function(){this.o&&this.o.restyle({show:!1})};
Oe.prototype.f=function(a){if(this.o){a={isSubscribed:a};try{var b=q("gapi.iframes.SAME_ORIGIN_IFRAMES_FILTER");this.o.send("msg-hovercard-subscription",a,void 0,b)}catch(c){}}};function Re(a){if(da(a))return Se(a);if(fa(a)&&!ea(a)&&!(fa(a)&&0<a.nodeType))return Te(a);try{return p.JSON.stringify(a),a}catch(b){}}
function Te(a){var b={};Ha(a,function(a,d){b[d]=Re(a)});
return b}
function Se(a){var b=[];w(a,function(a,d){b[d]=Re(a)});
return b}
;function Ue(a){this.f=null;this.b=a;a=Ke();var b=Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^na()).toString(36);a&&(Ie({role:"ytsubscribe",iframe:a,data:{id:b}}),Je(t(function(a){this.f=a},this),this.b))}
Ue.prototype.register=function(a,b){if(this.f)this.f.register(a,b,this.b);else{var c=t(this.register,this,a,b,this.b);Je(c,this.b)}};
Ue.prototype.send=function(a,b){if(this.f)this.f.send(a,b,void 0,this.b);else{var c=t(this.send,this,a,b);Je(c,this.b)}};function Ve(){this.b=this.f=null}
function We(a,b){var c=q("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER");try{var d=c||Xe(a),e=Ke();e&&e.send("onytevent",b,void 0,d)}catch(f){}}
Ve.prototype.g=function(a,b){if("pubsub2"==b.eventType){var c=b.topicString;c&&a(c,b.serializedData||null)}};
function Xe(a){if(!a.f){var b;b=q("gapi.iframes.makeWhiteListIframesFilter")(Le);a.f=b}return a.f}
;function Ye(){this.b=new Ve;this.g=!1;this.f={}}
function Ze(a){w(Me,function(a){if(!this.f[a.toString()]){var c=H(a,function(c){var e=c?{version:c.version,args:c.args}:null;c=this.b;c.b&&(e={eventType:"pubsub2",topicString:a.toString(),serializedData:Re(e)},c.b.send("msg-youtube-pubsub",e))},this);
c&&(this.f[a.toString()]=c)}},a)}
Ye.prototype.i=function(a,b){var c=va(Ne,function(b){return b.toString()==a});
if(c&&(!c.G||b)){var d;if(c.G)try{d=Ub(c.G,b)}catch(f){return}var e=this.f[c.toString()];e?$b(e,c,d):G(c,d)}};
Ye.prototype.j=function(a){$e(this)&&We(this.b,{eventType:"subscribe",channelExternalId:a.b})};
Ye.prototype.C=function(a){$e(this)&&We(this.b,{eventType:"unsubscribe",channelExternalId:a.b})};
function $e(a){return a.g||!!D("SUBSCRIBE_EMBED_DISCOVERABLE_SUBSCRIPTIONS")}
;function af(){Ge(function(){var a;a=gd(B("yt-subscribe"));a={width:a.width,height:a.height};var b=bf;He().ready(a,null,b)})}
function bf(a){if(a.length&&a[a.length-1]){var b=a[a.length-1];a=b.eurl;var b=b.notificationsPipeSupported,c=B("yt-subscribe"),d=U.B(),d=R(d),e=c||document,f=null;e.getElementsByClassName?f=e.getElementsByClassName(d)[0]:e.querySelectorAll&&e.querySelector?f=e.querySelector("."+d):f=mb(d,c)[0];c=f||null;a&&c&&(U.B(),zd(c,"parent-url",a));a=cf();b&&a&&(U.B().b=!0);c&&!a&&new Oe(c);a=new Ye;H(K,a.j,a);H(L,a.C,a);if(cf()){b=a.b;b.b=new Ue(Xe(b));Ze(a);b=a.b;c=t(a.i,a);if(b.b)try{b.b.register("cmd-youtube-pubsub",
ma(b.g,c))}catch(g){}a.g=!0}}}
function cf(){var a=Ke().getOrigin();return wa(Le,a)}
;function df(a){for(var b=0;b<a.length;b++){var c=a[b];"send_follow_on_ping_action"==c.name&&c.data&&c.data.follow_on_url&&(c=c.data.follow_on_url)&&lc(c)}}
;function ef(a){E.call(this,1,arguments);this.b=a}
v(ef,E);function ff(a,b){E.call(this,2,arguments);this.f=a;this.b=b}
v(ff,E);function gf(a,b,c,d){E.call(this,1,arguments);this.b=b;this.g=c||null;this.f=d||null}
v(gf,E);function hf(a,b){E.call(this,1,arguments);this.f=a;this.b=b||null}
v(hf,E);function jf(a){E.call(this,1,arguments)}
v(jf,E);var kf=new F("ypc-core-load",ef),lf=new F("ypc-guide-sync-success",ff),mf=new F("ypc-purchase-success",gf),nf=new F("ypc-subscription-cancel",jf),of=new F("ypc-subscription-cancel-success",hf),pf=new F("ypc-init-subscription",jf);var qf=!1,rf=[],sf=[];function tf(a){a.b?qf?G(zc,a):G(kf,new ef(function(){G(pf,new jf(a.b))})):uf(a.f,a.i,a.g,a.j)}
function vf(a){a.b?qf?G(Dc,a):G(kf,new ef(function(){G(nf,new jf(a.b))})):wf(a.f,a.C,a.i,a.g,a.j)}
function xf(a){yf(ya(a.b))}
function zf(a){Af(ya(a.b))}
function Bf(a){Cf(a.b,a.f,null)}
function Df(a,b,c,d){Cf(a,b,c,d)}
function Ef(a){var b=a.f,c=a.b.subscriptionId;b&&c&&G(K,new rc(b,c,a.b.channelInfo))}
function Ff(a){var b=a.b;Ha(a.f,function(a,d){G(K,new rc(d,a,b[d]))})}
function Gf(a){G(L,new J(a.f.itemId));a.b&&a.b.length&&(Hf(a.b,L),Hf(a.b,Ec))}
function uf(a,b,c,d){var e=new J(a);G(xc,e);var f={};f.c=a;c&&(f.eurl=c);d&&(f.source=d);c={};(d=D("PLAYBACK_ID"))&&(c.plid=d);(d=D("EVENT_ID"))&&(c.ei=d);b&&If(b,c);Wc("/subscription_ajax?action_create_subscription_to_channel=1",{method:"POST",ha:f,w:c,D:function(b,c){var d=c.response;G(K,new rc(a,d.id,d.channel_info));d.show_feed_privacy_dialog&&Oc("SHOW-FEED-PRIVACY-SUBSCRIBE-DIALOG",a);d.actions&&df(d.actions)},
P:function(){G(yc,e)}})}
function wf(a,b,c,d,e){var f=new J(a);G(Bc,f);var g={};d&&(g.eurl=d);e&&(g.source=e);d={};d.c=a;d.s=b;(a=D("PLAYBACK_ID"))&&(d.plid=a);(a=D("EVENT_ID"))&&(d.ei=a);c&&If(c,d);Wc("/subscription_ajax?action_remove_subscriptions=1",{method:"POST",ha:g,w:d,D:function(a,b){var c=b.response;G(L,f);c.actions&&df(c.actions)},
P:function(){G(Cc,f)}})}
function Cf(a,b,c,d){if(null!==b||null!==c){var e={};a&&(e.channel_id=a);null===b||(e.receive_all_updates=b);null===c||(e.receive_no_updates=c);Wc("/subscription_ajax?action_update_subscription_preferences=1",{method:"POST",w:e,onError:function(){d&&d()}})}}
function yf(a){if(a.length){var b=Aa(a,0,40);G("subscription-batch-subscribe-loading");Hf(b,xc);var c={};c.a=b.join(",");var d=function(){G("subscription-batch-subscribe-loaded");Hf(b,yc)};
Wc("/subscription_ajax?action_create_subscription_to_all=1",{method:"POST",w:c,D:function(c,f){d();var g=f.response,h=g.id;if("array"==ca(h)&&h.length==b.length){var k=g.channel_info_map;w(h,function(a,c){var d=b[c];G(K,new rc(d,a,k[d]))});
a.length?yf(a):G("subscription-batch-subscribe-finished")}},
onError:function(){d();G("subscription-batch-subscribe-failure")}})}}
function Af(a){if(a.length){var b=Aa(a,0,40);G("subscription-batch-unsubscribe-loading");Hf(b,Bc);var c={};c.c=b.join(",");var d=function(){G("subscription-batch-unsubscribe-loaded");Hf(b,Cc)};
Wc("/subscription_ajax?action_remove_subscriptions=1",{method:"POST",w:c,D:function(){d();Hf(b,L);a.length&&Af(a)},
onError:function(){d()}})}}
function Hf(a,b){w(a,function(a){G(b,new J(a))})}
function If(a,b){var c=mc(a),d;for(d in c)b[d]=c[d]}
;u("yt.setConfig",Ob);u("ytbin.www.subscribeembed.init",function(){qf=!0;sf.push(H(wc,tf),H(Ac,vf));qf||(sf.push(H(zc,tf),H(Dc,vf),H(tc,xf),H(uc,zf),H(vc,Bf)),rf.push(Lc("subscription-prefs",Df)),sf.push(H(mf,Ef),H(of,Gf),H(lf,Ff)));var a=U.B(),b=R(a);b in Td||(a.register(),a.K.push(Lc("yt-uix-init-"+b,a.init,a)),a.K.push(Lc("yt-uix-dispose-"+b,a.dispose,a)),Td[b]=a);af()});})();
