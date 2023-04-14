"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[5071],{"./node_modules/@arcgis/core/chunks/lerc-wasm.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{l:()=>o});var process=__webpack_require__("./node_modules/process/browser.js");var n,e,r,i={};n={get exports(){return i},set exports(t){i=t}},e="undefined"!=typeof document&&document.currentScript?document.currentScript.src:void 0,"undefined"!=typeof __filename&&(e=e||__filename),r=function(t){var n,r;(t=void 0!==(t=t||{})?t:{}).ready=new Promise((function(t,e){n=t,r=e}));var i,o,u,s,a,c,f=Object.assign({},t),p="object"==typeof window,l="function"==typeof importScripts,h="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,d="";h?(d=l?require("path").dirname(d)+"/":__dirname+"/",c=()=>{a||(s=require("fs"),a=require("path"))},i=function(t,n){return c(),t=a.normalize(t),s.readFileSync(t,n?void 0:"utf8")},u=t=>{var n=i(t,!0);return n.buffer||(n=new Uint8Array(n)),n},o=(t,n,e)=>{c(),t=a.normalize(t),s.readFile(t,(function(t,r){t?e(t):n(r.buffer)}))},process.argv.length>1&&process.argv[1].replace(/\\/g,"/"),process.argv.slice(2),process.on("uncaughtException",(function(t){if(!(t instanceof ht))throw t})),process.on("unhandledRejection",(function(t){throw t})),t.inspect=function(){return"[Emscripten Module object]"}):(p||l)&&(l?d=self.location.href:"undefined"!=typeof document&&document.currentScript&&(d=document.currentScript.src),e&&(d=e),d=0!==d.indexOf("blob:")?d.substr(0,d.replace(/[?#].*/,"").lastIndexOf("/")+1):"",i=t=>{var n=new XMLHttpRequest;return n.open("GET",t,!1),n.send(null),n.responseText},l&&(u=t=>{var n=new XMLHttpRequest;return n.open("GET",t,!1),n.responseType="arraybuffer",n.send(null),new Uint8Array(n.response)}),o=(t,n,e)=>{var r=new XMLHttpRequest;r.open("GET",t,!0),r.responseType="arraybuffer",r.onload=()=>{200==r.status||0==r.status&&r.response?n(r.response):e()},r.onerror=e,r.send(null)}),t.print||console.log.bind(console);var _,y,g=t.printErr||console.warn.bind(console);Object.assign(t,f),f=null,t.arguments&&t.arguments,t.thisProgram&&t.thisProgram,t.quit&&t.quit,t.wasmBinary&&(_=t.wasmBinary),t.noExitRuntime,"object"!=typeof WebAssembly&&L("no native wasm support detected");var v,w,b,A,R,x,S=!1,P="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;function I(t,n){return t?function E(t,n,e){for(var r=n+e,i=n;t[i]&&!(i>=r);)++i;if(i-n>16&&t.buffer&&P)return P.decode(t.subarray(n,i));for(var o="";n<i;){var u=t[n++];if(128&u){var s=63&t[n++];if(192!=(224&u)){var a=63&t[n++];if((u=224==(240&u)?(15&u)<<12|s<<6|a:(7&u)<<18|s<<12|a<<6|63&t[n++])<65536)o+=String.fromCharCode(u);else{var c=u-65536;o+=String.fromCharCode(55296|c>>10,56320|1023&c)}}else o+=String.fromCharCode((31&u)<<6|s)}else o+=String.fromCharCode(u)}return o}(b,t,n):""}function j(n){v=n,t.HEAP8=w=new Int8Array(n),t.HEAP16=new Int16Array(n),t.HEAP32=A=new Int32Array(n),t.HEAPU8=b=new Uint8Array(n),t.HEAPU16=new Uint16Array(n),t.HEAPU32=R=new Uint32Array(n),t.HEAPF32=new Float32Array(n),t.HEAPF64=new Float64Array(n)}t.INITIAL_MEMORY;var T=[],D=[],H=[];function U(t){T.unshift(t)}function C(t){H.unshift(t)}var F=0,B=null;function L(n){t.onAbort&&t.onAbort(n),g(n="Aborted("+n+")"),S=!0,n+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(n);throw r(e),e}var G,X="data:application/octet-stream;base64,";function N(t){return t.startsWith(X)}function Y(t){return t.startsWith("file://")}function J(t){try{if(t==G&&_)return new Uint8Array(_);if(u)return u(t);throw"both async and sync fetching of the wasm failed"}catch(g){L(g)}}function K(){if(!_&&(p||l)){if("function"==typeof fetch&&!Y(G))return fetch(G,{credentials:"same-origin"}).then((function(t){if(!t.ok)throw"failed to load wasm binary file at '"+G+"'";return t.arrayBuffer()})).catch((function(){return J(G)}));if(o)return new Promise((function(t,n){o(G,(function(n){t(new Uint8Array(n))}),n)}))}return Promise.resolve().then((function(){return J(G)}))}function V(n){for(;n.length>0;){var e=n.shift();if("function"!=typeof e){var r=e.func;"number"==typeof r?void 0===e.arg?$(r)():$(r)(e.arg):r(void 0===e.arg?null:e.arg)}else e(t)}}N(G="lerc-wasm.wasm")||(G=function m(n){return t.locateFile?t.locateFile(n,d):d+n}(G));var Z=[];function $(t){var n=Z[t];return n||(t>=Z.length&&(Z.length=t+1),Z[t]=n=x.get(t)),n}function et(t){this.excPtr=t,this.ptr=t-24,this.set_type=function(t){R[this.ptr+4>>2]=t},this.get_type=function(){return R[this.ptr+4>>2]},this.set_destructor=function(t){R[this.ptr+8>>2]=t},this.get_destructor=function(){return R[this.ptr+8>>2]},this.set_refcount=function(t){A[this.ptr>>2]=t},this.set_caught=function(t){t=t?1:0,w[this.ptr+12>>0]=t},this.get_caught=function(){return 0!=w[this.ptr+12>>0]},this.set_rethrown=function(t){t=t?1:0,w[this.ptr+13>>0]=t},this.get_rethrown=function(){return 0!=w[this.ptr+13>>0]},this.init=function(t,n){this.set_adjusted_ptr(0),this.set_type(t),this.set_destructor(n),this.set_refcount(0),this.set_caught(!1),this.set_rethrown(!1)},this.add_ref=function(){var t=A[this.ptr>>2];A[this.ptr>>2]=t+1},this.release_ref=function(){var t=A[this.ptr>>2];return A[this.ptr>>2]=t-1,1===t},this.set_adjusted_ptr=function(t){R[this.ptr+16>>2]=t},this.get_adjusted_ptr=function(){return R[this.ptr+16>>2]},this.get_exception_ptr=function(){if(lt(this.get_type()))return R[this.excPtr>>2];var t=this.get_adjusted_ptr();return 0!==t?t:this.excPtr}}function st(t){try{return y.grow(t-v.byteLength+65535>>>16),j(y.buffer),1}catch(n){}}var ct={a:function tt(t,n,e,r){L("Assertion failed: "+I(t)+", at: "+[n?I(n):"unknown filename",e,r?I(r):"unknown function"])},c:function nt(t){return ft(t+24)+24},b:function rt(t,n,e){throw new et(t).init(n,e),t},d:function it(){L("")},f:function ot(t,n,e){b.copyWithin(t,n,n+e)},e:function at(t){var n=b.length,e=2147483648;if((t>>>=0)>e)return!1;let r=(t,n)=>t+(n-t%n)%n;for(var i=1;i<=4;i*=2){var o=n*(1+.2/i);if(o=Math.min(o,t+100663296),st(Math.min(e,r(Math.max(t,o),65536))))return!0}return!1}};(function Q(){var n={a:ct};function e(n,e){var r=n.exports;t.asm=r,j((y=t.asm.g).buffer),x=t.asm.m,function q(t){D.unshift(t)}(t.asm.h),function z(n){if(F--,t.monitorRunDependencies&&t.monitorRunDependencies(F),0==F&&B){var e=B;B=null,e()}}()}function i(t){e(t.instance)}function o(t){return K().then((function(t){return WebAssembly.instantiate(t,n)})).then((function(t){return t})).then(t,(function(t){g("failed to asynchronously prepare wasm: "+t),L(t)}))}if(function k(n){F++,t.monitorRunDependencies&&t.monitorRunDependencies(F)}(),t.instantiateWasm)try{return t.instantiateWasm(n,e)}catch(s){return g("Module.instantiateWasm callback failed with error: "+s),!1}return function u(){return _||"function"!=typeof WebAssembly.instantiateStreaming||N(G)||Y(G)||h||"function"!=typeof fetch?o(i):fetch(G,{credentials:"same-origin"}).then((function(t){return WebAssembly.instantiateStreaming(t,n).then(i,(function(t){return g("wasm streaming compile failed: "+t),g("falling back to ArrayBuffer instantiation"),o(i)}))}))}().catch(r),{}})(),t.___wasm_call_ctors=function(){return(t.___wasm_call_ctors=t.asm.h).apply(null,arguments)},t._lerc_getBlobInfo=function(){return(t._lerc_getBlobInfo=t.asm.i).apply(null,arguments)},t._lerc_getDataRanges=function(){return(t._lerc_getDataRanges=t.asm.j).apply(null,arguments)},t._lerc_decode=function(){return(t._lerc_decode=t.asm.k).apply(null,arguments)},t._lerc_decode_4D=function(){return(t._lerc_decode_4D=t.asm.l).apply(null,arguments)};var ft=t._malloc=function(){return(ft=t._malloc=t.asm.n).apply(null,arguments)};t._free=function(){return(t._free=t.asm.o).apply(null,arguments)};var pt,lt=t.___cxa_is_pointer_type=function(){return(lt=t.___cxa_is_pointer_type=t.asm.p).apply(null,arguments)};function ht(t){this.name="ExitStatus",this.message="Program terminated with exit("+t+")",this.status=t}function dt(e){function r(){pt||(pt=!0,t.calledRun=!0,S||(function O(){V(D)}(),n(t),t.onRuntimeInitialized&&t.onRuntimeInitialized(),function W(){if(t.postRun)for("function"==typeof t.postRun&&(t.postRun=[t.postRun]);t.postRun.length;)C(t.postRun.shift());V(H)}()))}F>0||(function M(){if(t.preRun)for("function"==typeof t.preRun&&(t.preRun=[t.preRun]);t.preRun.length;)U(t.preRun.shift());V(T)}(),F>0||(t.setStatus?(t.setStatus("Running..."),setTimeout((function(){setTimeout((function(){t.setStatus("")}),1),r()}),1)):r()))}if(B=function t(){pt||dt(),pt||(B=t)},t.run=dt,t.preInit)for("function"==typeof t.preInit&&(t.preInit=[t.preInit]);t.preInit.length>0;)t.preInit.pop()();return dt(),t.ready},n.exports=r;const o=function t(t,n){for(var e=0;e<n.length;e++){const r=n[e];if("string"!=typeof r&&!Array.isArray(r))for(const n in r)if("default"!==n&&!(n in t)){const e=Object.getOwnPropertyDescriptor(r,n);e&&Object.defineProperty(t,n,e.get?e:{enumerable:!0,get:()=>r[n]})}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}({__proto__:null,default:i},[i])}}]);