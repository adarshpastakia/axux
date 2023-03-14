"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[7680],{"./node_modules/@arcgis/core/geometry/support/meshUtils/exporters/gltf/imageutils.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$7:()=>g,$e:()=>i,E0:()=>c,N5:()=>s,lW:()=>o});__webpack_require__("./node_modules/@arcgis/core/core/has.js");var _core_Error_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/core/urlUtils.js");function i(e){const n=c(e);return(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__.pC)(n)?n.toDataURL():""}async function o(t){const r=c(t);if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__.Wi)(r))throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_1__.Z("imageToArrayBuffer","Unsupported image type");const a=await async function m(e){if(!(e instanceof HTMLImageElement))return"image/png";const t=e.src;if((0,_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_2__.HK)(t)){const e=(0,_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_2__.sJ)(t);return"image/jpeg"===e?.mediaType?e.mediaType:"image/png"}return/\.png$/i.test(t)?"image/png":/\.(jpg|jpeg)$/i.test(t)?"image/jpeg":"image/png"}(t),i=await new Promise((e=>r.toBlob(e,a)));if(!i)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_1__.Z("imageToArrayBuffer","Failed to encode image");return{data:await i.arrayBuffer(),type:a}}function c(e){if(e instanceof HTMLCanvasElement)return e;if(e instanceof HTMLVideoElement)return null;const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return e instanceof HTMLImageElement?n.drawImage(e,0,0,e.width,e.height):e instanceof ImageData&&n.putImageData(e,0,0),t}function s(e){const t=[],n=new Uint8Array(e);for(let r=0;r<n.length;r++)t.push(String.fromCharCode(n[r]));return"data:application/octet-stream;base64,"+btoa(t.join(""))}function g(e){if(e.byteLength<8)return!1;const t=new Uint8Array(e);return 137===t[0]&&80===t[1]&&78===t[2]&&71===t[3]&&13===t[4]&&10===t[5]&&26===t[6]&&10===t[7]}},"./node_modules/@arcgis/core/symbols/cim/CIMResourceManager.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CIMResourceManager_o});var i,request=__webpack_require__("./node_modules/@arcgis/core/request.js"),core_Error=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),promiseUtils=__webpack_require__("./node_modules/@arcgis/core/core/promiseUtils.js"),_commonjsHelpers=__webpack_require__("./node_modules/@arcgis/core/chunks/_commonjsHelpers.js"),time=__webpack_require__("./node_modules/@arcgis/core/core/time.js"),s={exports:{}};i=function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}return r.m=e,r.c=t,r.p="",r(0)}([function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.isNotPNG=function u(e){return e===a},t.isNotAPNG=function h(e){return e===o},t.default=function c(e){var t=new Uint8Array(e);if(Array.prototype.some.call(l,(function(e,r){return e!==t[r]})))return a;var r=!1;if(p(t,(function(e){return!(r="acTL"===e)})),!r)return o;var n=[],s=[],u=null,h=null,c=0,f=new i.APNG;if(p(t,(function(e,t,r,a){var o=new DataView(t.buffer);switch(e){case"IHDR":u=t.subarray(r+8,r+8+a),f.width=o.getUint32(r+8),f.height=o.getUint32(r+12);break;case"acTL":f.numPlays=o.getUint32(r+8+4);break;case"fcTL":h&&(f.frames.push(h),c++),(h=new i.Frame).width=o.getUint32(r+8+4),h.height=o.getUint32(r+8+8),h.left=o.getUint32(r+8+12),h.top=o.getUint32(r+8+16);var l=o.getUint16(r+8+20),p=o.getUint16(r+8+22);0===p&&(p=100),h.delay=1e3*l/p,h.delay<=10&&(h.delay=100),f.playTime+=h.delay,h.disposeOp=o.getUint8(r+8+24),h.blendOp=o.getUint8(r+8+25),h.dataParts=[],0===c&&2===h.disposeOp&&(h.disposeOp=1);break;case"fdAT":h&&h.dataParts.push(t.subarray(r+8+4,r+8+a));break;case"IDAT":h&&h.dataParts.push(t.subarray(r+8,r+8+a));break;case"IEND":s.push(v(t,r,12+a));break;default:n.push(v(t,r,12+a))}})),h&&f.frames.push(h),0==f.frames.length)return o;var m=new Blob(n),g=new Blob(s);return f.frames.forEach((function(e){var t=[];t.push(l),u.set(_(e.width),0),u.set(_(e.height),4),t.push(d("IHDR",u)),t.push(m),e.dataParts.forEach((function(e){return t.push(d("IDAT",e))})),t.push(g),e.imageData=new Blob(t,{type:"image/png"}),delete e.dataParts,t=null})),f};var n=function s(e){return e&&e.__esModule?e:{default:e}}(r(1)),i=r(2);var a=new Error("Not a PNG"),o=new Error("Not an animated PNG");var l=new Uint8Array([137,80,78,71,13,10,26,10]);function p(e,t){var r=new DataView(e.buffer),n=8,i=void 0,s=void 0,a=void 0;do{s=r.getUint32(n),a=t(i=f(e,n+4,4),e,n,s),n+=12+s}while(!1!==a&&"IEND"!=i&&n<e.length)}function f(e,t,r){var n=Array.prototype.slice.call(e.subarray(t,t+r));return String.fromCharCode.apply(String,n)}function v(e,t,r){var n=new Uint8Array(r);return n.set(e.subarray(t,t+r)),n}var d=function(e,t){var r=e.length+t.length,i=new Uint8Array(r+8),s=new DataView(i.buffer);s.setUint32(0,t.length),i.set(function m(e){for(var t=new Uint8Array(e.length),r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}(e),4),i.set(t,8);var a=(0,n.default)(i,4,r);return s.setUint32(r+4,a),i},_=function(e){return new Uint8Array([e>>>24&255,e>>>16&255,e>>>8&255,255&e])}},function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=-1,i=t,s=t+(arguments.length>2&&void 0!==arguments[2]?arguments[2]:e.length-t);i<s;i++)n=n>>>8^r[255&(n^e[i])];return-1^n};for(var r=new Uint32Array(256),n=0;n<256;n++){for(var i=n,s=0;s<8;s++)i=0!=(1&i)?3988292384^i>>>1:i>>>1;r[n]=i}},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.Frame=t.APNG=void 0;var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=function s(e){return e&&e.__esModule?e:{default:e}}(r(3));function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.APNG=function(){function e(){a(this,e),this.width=0,this.height=0,this.numPlays=0,this.playTime=0,this.frames=[]}return n(e,[{key:"createImages",value:function(){return Promise.all(this.frames.map((function(e){return e.createImage()})))}},{key:"getPlayer",value:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this.createImages().then((function(){return new i.default(t,e,r)}))}}]),e}(),t.Frame=function(){function e(){a(this,e),this.left=0,this.top=0,this.width=0,this.height=0,this.delay=0,this.disposeOp=0,this.blendOp=0,this.imageData=null,this.imageElement=null}return n(e,[{key:"createImage",value:function(){var e=this;return this.imageElement?Promise.resolve():new Promise((function(t,r){var n=URL.createObjectURL(e.imageData);e.imageElement=document.createElement("img"),e.imageElement.onload=function(){URL.revokeObjectURL(n),t()},e.imageElement.onerror=function(){URL.revokeObjectURL(n),e.imageElement=null,r(new Error("Image creation error"))},e.imageElement.src=n}))}}]),e}()},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();var u=function(e){function t(e,r,n){!function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var i=function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return i.playbackRate=1,i._currentFrameNumber=0,i._ended=!1,i._paused=!0,i._numPlays=0,i._apng=e,i.context=r,i.stop(),n&&i.play(),i}return function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),n(t,[{key:"renderNextFrame",value:function(){this._currentFrameNumber=(this._currentFrameNumber+1)%this._apng.frames.length,this._currentFrameNumber===this._apng.frames.length-1&&(this._numPlays++,0!==this._apng.numPlays&&this._numPlays>=this._apng.numPlays&&(this._ended=!0,this._paused=!0)),this._prevFrame&&1==this._prevFrame.disposeOp?this.context.clearRect(this._prevFrame.left,this._prevFrame.top,this._prevFrame.width,this._prevFrame.height):this._prevFrame&&2==this._prevFrame.disposeOp&&this.context.putImageData(this._prevFrameData,this._prevFrame.left,this._prevFrame.top);var e=this.currentFrame;this._prevFrame=e,this._prevFrameData=null,2==e.disposeOp&&(this._prevFrameData=this.context.getImageData(e.left,e.top,e.width,e.height)),0==e.blendOp&&this.context.clearRect(e.left,e.top,e.width,e.height),this.context.drawImage(e.imageElement,e.left,e.top),this.emit("frame",this._currentFrameNumber),this._ended&&this.emit("end")}},{key:"play",value:function(){var e=this;this.emit("play"),this._ended&&this.stop(),this._paused=!1;var t=performance.now()+this.currentFrame.delay/this.playbackRate;requestAnimationFrame((function r(n){if(!e._ended&&!e._paused){if(n>=t){for(;n-t>=e._apng.playTime/e.playbackRate;)t+=e._apng.playTime/e.playbackRate,e._numPlays++;do{e.renderNextFrame(),t+=e.currentFrame.delay/e.playbackRate}while(!e._ended&&n>t)}requestAnimationFrame(r)}}))}},{key:"pause",value:function(){this._paused||(this.emit("pause"),this._paused=!0)}},{key:"stop",value:function(){this.emit("stop"),this._numPlays=0,this._ended=!1,this._paused=!0,this._currentFrameNumber=-1,this.context.clearRect(0,0,this._apng.width,this._apng.height),this.renderNextFrame()}},{key:"currentFrameNumber",get:function(){return this._currentFrameNumber}},{key:"currentFrame",get:function(){return this._apng.frames[this._currentFrameNumber]}},{key:"paused",get:function(){return this._paused}},{key:"ended",get:function(){return this._ended}}]),t}(function i(e){return e&&e.__esModule?e:{default:e}}(r(4)).default);t.default=u},function(e,t){function r(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function n(e){return"function"==typeof e}function s(e){return"object"==typeof e&&null!==e}function a(e){return void 0===e}e.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._maxListeners=void 0,r.defaultMaxListeners=10,r.prototype.setMaxListeners=function(e){if(!function i(e){return"number"==typeof e}(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},r.prototype.emit=function(e){var t,r,i,o,u,h;if(this._events||(this._events={}),"error"===e&&(!this._events.error||s(this._events.error)&&!this._events.error.length)){if((t=arguments[1])instanceof Error)throw t;var l=new Error('Uncaught, unspecified "error" event. ('+t+")");throw l.context=t,l}if(a(r=this._events[e]))return!1;if(n(r))switch(arguments.length){case 1:r.call(this);break;case 2:r.call(this,arguments[1]);break;case 3:r.call(this,arguments[1],arguments[2]);break;default:o=Array.prototype.slice.call(arguments,1),r.apply(this,o)}else if(s(r))for(o=Array.prototype.slice.call(arguments,1),i=(h=r.slice()).length,u=0;u<i;u++)h[u].apply(this,o);return!0},r.prototype.addListener=function(e,t){var i;if(!n(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,n(t.listener)?t.listener:t),this._events[e]?s(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,s(this._events[e])&&!this._events[e].warned&&(i=a(this._maxListeners)?r.defaultMaxListeners:this._maxListeners)&&i>0&&this._events[e].length>i&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace()),this},r.prototype.on=r.prototype.addListener,r.prototype.once=function(e,t){if(!n(t))throw TypeError("listener must be a function");var r=!1;function i(){this.removeListener(e,i),r||(r=!0,t.apply(this,arguments))}return i.listener=t,this.on(e,i),this},r.prototype.removeListener=function(e,t){var r,i,a,o;if(!n(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(a=(r=this._events[e]).length,i=-1,r===t||n(r.listener)&&r.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(s(r)){for(o=a;o-- >0;)if(r[o]===t||r[o].listener&&r[o].listener===t){i=o;break}if(i<0)return this;1===r.length?(r.length=0,delete this._events[e]):r.splice(i,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},r.prototype.removeAllListeners=function(e){var t,r;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n(r=this._events[e]))this.removeListener(e,r);else if(r)for(;r.length;)this.removeListener(e,r[r.length-1]);return delete this._events[e],this},r.prototype.listeners=function(e){return this._events&&this._events[e]?n(this._events[e])?[this._events[e]]:this._events[e].slice():[]},r.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(n(t))return 1;if(t)return t.length}return 0},r.listenerCount=function(e,t){return e.listenerCount(t)}}])},s.exports=i();const a=(0,_commonjsHelpers.g)(s.exports);const u=[137,80,78,71,13,10,26,10];function l(e){if(!function h(e){const t=new Uint8Array(e);return!u.some(((e,r)=>e!==t[r]))}(e))return!1;const t=new DataView(e),r=new Uint8Array(e);let n,i=8;do{const e=t.getUint32(i);if(n=String.fromCharCode.apply(String,Array.prototype.slice.call(r.subarray(i+4,i+8))),"acTL"===n)return!0;i+=12+e}while("IEND"!==n&&i<r.length);return!1}var imageutils=__webpack_require__("./node_modules/@arcgis/core/geometry/support/meshUtils/exporters/gltf/imageutils.js"),t={},n={},gif_a={};Object.defineProperty(gif_a,"__esModule",{value:!0}),gif_a.loop=gif_a.conditional=gif_a.parse=void 0;gif_a.parse=function e(r,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:n;if(Array.isArray(t))t.forEach((function(t){return e(r,t,n,a)}));else if("function"==typeof t)t(r,n,a,e);else{var i=Object.keys(t)[0];Array.isArray(t[i])?(a[i]={},e(r,t[i],n,a[i])):a[i]=t[i](r,n,a,e)}return n};gif_a.conditional=function(e,r){return function(t,n,a,i){r(t,n,a)&&i(t,e,n,a)}};gif_a.loop=function(e,r){return function(t,n,a,i){for(var o=[],d=t.pos;r(t,n,a);){var s={};if(i(t,e,n,s),t.pos===d)break;d=t.pos,o.push(s)}return o}};var gif_s={};Object.defineProperty(gif_s,"__esModule",{value:!0}),gif_s.readBits=gif_s.readArray=gif_s.readUnsigned=gif_s.readString=gif_s.peekBytes=gif_s.readBytes=gif_s.peekByte=gif_s.readByte=gif_s.buildStream=void 0;gif_s.buildStream=function(e){return{data:e,pos:0}};var gif_u=function(){return function(e){return e.data[e.pos++]}};gif_s.readByte=gif_u;gif_s.peekByte=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return function(r){return r.data[r.pos+e]}};var gif_l=function(e){return function(r){return r.data.subarray(r.pos,r.pos+=e)}};gif_s.readBytes=gif_l;gif_s.peekBytes=function(e){return function(r){return r.data.subarray(r.pos,r.pos+e)}};gif_s.readString=function(e){return function(r){return Array.from(gif_l(e)(r)).map((function(e){return String.fromCharCode(e)})).join("")}};gif_s.readUnsigned=function(e){return function(r){var t=gif_l(2)(r);return e?(t[1]<<8)+t[0]:(t[0]<<8)+t[1]}};gif_s.readArray=function(e,r){return function(t,n,a){for(var i="function"==typeof r?r(t,n,a):r,o=gif_l(e),d=new Array(i),s=0;s<i;s++)d[s]=o(t);return d}};gif_s.readBits=function(e){return function(r){for(var t=function(e){return e.data[e.pos++]}(r),n=new Array(8),a=0;a<8;a++)n[7-a]=!!(t&1<<a);return Object.keys(e).reduce((function(r,t){var a=e[t];return a.length?r[t]=function(e,r,t){for(var n=0,a=0;a<t;a++)n+=e[r+a]&&Math.pow(2,t-a-1);return n}(n,a.index,a.length):r[t]=n[a.index],r}),{})}},function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=gif_a,t=gif_s,n={blocks:function(e){for(var n=[],a=e.data.length,i=0,o=(0,t.readByte)()(e);0!==o&&o;o=(0,t.readByte)()(e)){if(e.pos+o>=a){var d=a-e.pos;n.push((0,t.readBytes)(d)(e)),i+=d;break}n.push((0,t.readBytes)(o)(e)),i+=o}for(var s=new Uint8Array(i),c=0,u=0;u<n.length;u++)s.set(n[u],c),c+=n[u].length;return s}},i=(0,r.conditional)({gce:[{codes:(0,t.readBytes)(2)},{byteSize:(0,t.readByte)()},{extras:(0,t.readBits)({future:{index:0,length:3},disposal:{index:3,length:3},userInput:{index:6},transparentColorGiven:{index:7}})},{delay:(0,t.readUnsigned)(!0)},{transparentColorIndex:(0,t.readByte)()},{terminator:(0,t.readByte)()}]},(function(e){var r=(0,t.peekBytes)(2)(e);return 33===r[0]&&249===r[1]})),o=(0,r.conditional)({image:[{code:(0,t.readByte)()},{descriptor:[{left:(0,t.readUnsigned)(!0)},{top:(0,t.readUnsigned)(!0)},{width:(0,t.readUnsigned)(!0)},{height:(0,t.readUnsigned)(!0)},{lct:(0,t.readBits)({exists:{index:0},interlaced:{index:1},sort:{index:2},future:{index:3,length:2},size:{index:5,length:3}})}]},(0,r.conditional)({lct:(0,t.readArray)(3,(function(e,r,t){return Math.pow(2,t.descriptor.lct.size+1)}))},(function(e,r,t){return t.descriptor.lct.exists})),{data:[{minCodeSize:(0,t.readByte)()},n]}]},(function(e){return 44===(0,t.peekByte)()(e)})),d=(0,r.conditional)({text:[{codes:(0,t.readBytes)(2)},{blockSize:(0,t.readByte)()},{preData:function(e,r,n){return(0,t.readBytes)(n.text.blockSize)(e)}},n]},(function(e){var r=(0,t.peekBytes)(2)(e);return 33===r[0]&&1===r[1]})),c=(0,r.conditional)({application:[{codes:(0,t.readBytes)(2)},{blockSize:(0,t.readByte)()},{id:function(e,r,n){return(0,t.readString)(n.blockSize)(e)}},n]},(function(e){var r=(0,t.peekBytes)(2)(e);return 33===r[0]&&255===r[1]})),u=(0,r.conditional)({comment:[{codes:(0,t.readBytes)(2)},n]},(function(e){var r=(0,t.peekBytes)(2)(e);return 33===r[0]&&254===r[1]})),f=[{header:[{signature:(0,t.readString)(3)},{version:(0,t.readString)(3)}]},{lsd:[{width:(0,t.readUnsigned)(!0)},{height:(0,t.readUnsigned)(!0)},{gct:(0,t.readBits)({exists:{index:0},resolution:{index:1,length:3},sort:{index:4},size:{index:5,length:3}})},{backgroundColorIndex:(0,t.readByte)()},{pixelAspectRatio:(0,t.readByte)()}]},(0,r.conditional)({gct:(0,t.readArray)(3,(function(e,r){return Math.pow(2,r.lsd.gct.size+1)}))},(function(e,r){return r.lsd.gct.exists})),{frames:(0,r.loop)([i,c,u,o,d],(function(e){var r=(0,t.peekByte)()(e);return 33===r||44===r}))}];e.default=f}(n);var x={};Object.defineProperty(x,"__esModule",{value:!0}),x.deinterlace=void 0;x.deinterlace=function(e,r){for(var t=new Array(e.length),n=e.length/r,a=function(n,a){var i=e.slice(a*r,(a+1)*r);t.splice.apply(t,[n*r,r].concat(i))},i=[0,4,2,1],o=[8,8,4,2],d=0,s=0;s<4;s++)for(var c=i[s];c<n;c+=o[s])a(c,d),d++;return t};var w={};Object.defineProperty(w,"__esModule",{value:!0}),w.lzw=void 0;w.lzw=function(e,r,t){var n,a,i,o,d,s,c,u,f,l,p,g,y,v,h,m,x=4096,w=t,b=new Array(t),k=new Array(x),A=new Array(x),U=new Array(x+1);for(d=1+(a=1<<(l=e)),n=a+2,c=-1,i=(1<<(o=l+1))-1,u=0;u<a;u++)k[u]=0,A[u]=u;for(p=g=y=v=h=m=0,f=0;f<w;){if(0===v){if(g<o){p+=r[m]<<g,g+=8,m++;continue}if(u=p&i,p>>=o,g-=o,u>n||u==d)break;if(u==a){i=(1<<(o=l+1))-1,n=a+2,c=-1;continue}if(-1==c){U[v++]=A[u],c=u,y=u;continue}for(s=u,u==n&&(U[v++]=y,u=c);u>a;)U[v++]=A[u],u=k[u];y=255&A[u],U[v++]=y,n<x&&(k[n]=c,A[n]=y,0==(++n&i)&&n<x&&(o++,i+=n)),c=s}v--,b[h++]=U[v],f++}for(f=h;f<w;f++)b[f]=0;return b},Object.defineProperty(t,"__esModule",{value:!0});var k=t.decompressFrames=t.decompressFrame=C=t.parseGIF=void 0,A=function I(e){return e&&e.__esModule?e:{default:e}}(n),U=gif_a,S=gif_s,z=x,_=w;var C=t.parseGIF=function(e){var r=new Uint8Array(e);return(0,U.parse)((0,S.buildStream)(r),A.default)},O=function(e,r,t){if(e.image){var n=e.image,a=n.descriptor.width*n.descriptor.height,i=(0,_.lzw)(n.data.minCodeSize,n.data.blocks,a);n.descriptor.lct.interlaced&&(i=(0,z.deinterlace)(i,n.descriptor.width));var o={pixels:i,dims:{top:e.image.descriptor.top,left:e.image.descriptor.left,width:e.image.descriptor.width,height:e.image.descriptor.height}};return n.descriptor.lct&&n.descriptor.lct.exists?o.colorTable=n.lct:o.colorTable=r,e.gce&&(o.delay=10*(e.gce.delay||10),o.disposalType=e.gce.extras.disposal,e.gce.extras.transparentColorGiven&&(o.transparentIndex=e.gce.transparentColorIndex)),t&&(o.patch=function(e){for(var r=e.pixels.length,t=new Uint8ClampedArray(4*r),n=0;n<r;n++){var a=4*n,i=e.pixels[n],o=e.colorTable[i]||[0,0,0];t[a]=o[0],t[a+1]=o[1],t[a+2]=o[2],t[a+3]=i!==e.transparentIndex?255:0}return t}(o)),o}console.warn("gif frame does not have associated image.")};t.decompressFrame=O;k=t.decompressFrames=function(e,r){return e.frames.filter((function(e){return e.image})).map((function(t){return O(t,e.gct,r)}))};const F=[71,73,70];function G(e){if(!function P(e){const r=new Uint8Array(e);return!F.some(((e,t)=>e!==r[t]))}(e))return!1;const r=new DataView(e),t=r.getUint8(10);let n=13+(128&t?3*2**(1+(7&t)):0),a=0,i=!1;for(;!i;){switch(r.getUint8(n++)){case 33:if(!o())return!1;break;case 44:d();break;case 59:i=!0;break;default:return!1}if(a>1)return!0}function o(){switch(r.getUint8(n++)){case 249:!function s(){n++,n+=4,l()}();break;case 1:!function c(){a++,n++,n+=12,l()}();break;case 254:!function u(){l()}();break;case 255:!function f(){n++,n+=8,n+=3,l()}();break;default:return!1}return!0}function d(){a++,n+=8;const e=r.getUint8(n++);n+=128&e?3*2**(1+(7&e)):0,n++,l()}function l(){let e;for(;e=r.getUint8(n++);)n+=e}return!1}class CIMResourceManager_o{constructor(){this._resourceMap=new Map,this._inFlightResourceMap=new Map,this.geometryEngine=null}destroy(){this._inFlightResourceMap.clear(),this._resourceMap.clear()}getResource(e){return this._resourceMap.get(e)??null}async fetchResource(e,t){const r=this._resourceMap.get(e);if(r)return{width:r.width,height:r.height};const i=this._inFlightResourceMap.get(e);if(i)return i.then((e=>({width:e.width,height:e.height})));const s=async function CIMResourceManager_h(e,t){const{arrayBuffer:r,mediaType:o}=await async function CIMResourceManager_u(i,s){let n;const a=";base64,";if(i.includes(a)){const e=i.indexOf(a),t=i.indexOf(a)+a.length,r=i.substring(t),s=atob(r),o=new Uint8Array(s.length);for(let i=0;i<s.length;i++)o[i]=s.charCodeAt(i);n={arrayBuffer:o.buffer,mediaType:i.substring(0,e).replace("data:","")}}else try{const t=await(0,request.default)(i,{responseType:"array-buffer",...s});n={arrayBuffer:t.data,mediaType:t.getHeader("Content-Type")}}catch(o){if(!(0,promiseUtils.D_)(o))throw new core_Error.Z("mapview-invalid-resource",`Could not fetch requested resource at ${i}`)}return n}(e,t),h="image/png"===o;return"image/gif"===o&&G(r)?async function D(t,n){const a=C(t),i=k(a,!0),{width:o,height:d}=a.lsd,s=document.createElement("canvas");s.width=o,s.height=d;const c=s.getContext("2d"),u=[],f=[];for(const l of i){f.push((0,time.HA)(l.delay||100));const t=new ImageData(l.patch,l.dims.width,l.dims.height),n=(0,imageutils.E0)(t),a=3===l.disposalType&&c.getImageData(l.dims.left,l.dims.top,l.dims.width,l.dims.height);c.drawImage(n,l.dims.left,l.dims.top);const i=c.getImageData(0,0,o,d);u.push(i),1===l.disposalType||(2===l.disposalType?c.clearRect(l.dims.left,l.dims.top,l.dims.width,l.dims.height):3===l.disposalType&&c.putImageData(a,l.dims.left,l.dims.top))}return{frameDurations:f,getFrame:e=>u[e],width:o,height:d}}(r):h&&l(r)?async function apng_o(e,t){const i=a(e);if(i instanceof Error)throw i;await i.createImages(),(0,promiseUtils.k_)(t);const{frames:s,width:o,height:u}=i,h=document.createElement("canvas");h.width=o,h.height=u;const l=h.getContext("2d"),c=[],p=[];for(const r of s){p.push((0,time.HA)(r.delay||100));const e=r.imageElement;0===r.blendOp?l.globalCompositeOperation="copy":l.globalCompositeOperation="source-over";const t=2===r.disposeOp&&l.getImageData(r.left,r.top,r.width,r.height);l.drawImage(e,r.left,r.top);const i=l.getImageData(0,0,o,u);c.push(i),0===r.disposeOp||(1===r.disposeOp?l.clearRect(r.left,r.top,r.width,r.height):2===r.disposeOp&&l.putImageData(t,r.left,r.top))}return{frameDurations:p,getFrame:e=>c[e],width:o,height:u}}(r,t):async function CIMResourceManager_c(i,s){const n=window.URL.createObjectURL(i);try{const{data:t}=await(0,request.default)(n,{...s,responseType:"image"});return t}catch(a){if(!(0,promiseUtils.D_)(a))throw new core_Error.Z("mapview-invalid-resource",`Could not fetch requested resource at ${n}`);throw a}finally{window.URL.revokeObjectURL(n)}}(new Blob([r],{type:o}),t)}(e,t);return this._inFlightResourceMap.set(e,i),s.then((t=>(this._inFlightResourceMap.delete(e),this._resourceMap.set(e,t),{width:t.width,height:t.height})),(()=>({width:0,height:0})))}deleteResource(e){this._inFlightResourceMap.delete(e),this._resourceMap.delete(e)}}},"./node_modules/@arcgis/core/symbols/cim/Rasterizer.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>c});var _core_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/mathUtils.js"),_CIMSymbolHelper_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/symbols/cim/CIMSymbolHelper.js"),_rasterizingUtils_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/symbols/cim/rasterizingUtils.js"),_Rect_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/symbols/cim/Rect.js"),_SDFHelper_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/symbols/cim/SDFHelper.js"),_utils_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/symbols/cim/utils.js");class c{constructor(e){this._resourceManager=e}dispose(){this._rasterizationCanvas=null}rasterizeJSONResource(m,l,c){if(this._rasterizationCanvas||(this._rasterizationCanvas=document.createElement("canvas")),"simple-fill"===m.type||"esriSFS"===m.type){const[t,r,i]=(0,_rasterizingUtils_js__WEBPACK_IMPORTED_MODULE_2__.Y)(this._rasterizationCanvas,m.style,l);return{size:[r,i],image:new Uint32Array(t.buffer),sdf:!1,simplePattern:!0,anchorX:0,anchorY:0,rasterizationScale:(0,_core_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__.fp)(Math.ceil(l))}}if("simple-line"===m.type||"esriSLS"===m.type||"line"===m.type&&m.dashTemplate){let e,r;if("simple-line"===m.type||"esriSLS"===m.type)switch(e=(0,_CIMSymbolHelper_js__WEBPACK_IMPORTED_MODULE_1__.U1)(m.style,m.cap),m.cap){case"butt":r="Butt";break;case"square":r="Square";break;default:r="Round"}else e=m.dashTemplate,r=m.cim.capStyle;const[a,n,s]=(0,_rasterizingUtils_js__WEBPACK_IMPORTED_MODULE_2__.m)(e,r);return{size:[n,s],image:new Uint32Array(a.buffer),sdf:!0,simplePattern:!0,anchorX:0,anchorY:0}}let f,h,p,u=1;if("simple-marker"===m.type||"esriSMS"===m.type||"line-marker"===m.type?(f=_CIMSymbolHelper_js__WEBPACK_IMPORTED_MODULE_1__.B$.fromSimpleMarker(m),p=(0,_SDFHelper_js__WEBPACK_IMPORTED_MODULE_3__.Fp)(f)):m.cim&&"CIMHatchFill"===m.cim.type?(f=_CIMSymbolHelper_js__WEBPACK_IMPORTED_MODULE_1__.B$.fromCIMHatchFill(m.cim,l),h=new _Rect_js__WEBPACK_IMPORTED_MODULE_4__.Z(f.frame.xmin,-f.frame.ymax,f.frame.xmax-f.frame.xmin,f.frame.ymax-f.frame.ymin),u=l):m.cim.markerPlacement&&"CIMMarkerPlacementInsidePolygon"===m.cim.markerPlacement.type?(f=_CIMSymbolHelper_js__WEBPACK_IMPORTED_MODULE_1__.B$.fromCIMInsidePolygon(m.cim),h=new _Rect_js__WEBPACK_IMPORTED_MODULE_4__.Z(f.frame.xmin,-f.frame.ymax,f.frame.xmax-f.frame.xmin,f.frame.ymax-f.frame.ymin)):(f=m.cim,p=(0,_SDFHelper_js__WEBPACK_IMPORTED_MODULE_3__.Fp)(f)),p&&!c){const[e,t,r]=(0,_SDFHelper_js__WEBPACK_IMPORTED_MODULE_3__.RL)(p);return e?{size:[t,r],image:new Uint32Array(e.buffer),sdf:!0,simplePattern:!0,anchorX:0,anchorY:0,rasterizationScale:u}:null}const[y,d,g,C,z]=_CIMSymbolHelper_js__WEBPACK_IMPORTED_MODULE_1__.B$.rasterize(this._rasterizationCanvas,f,h,this._resourceManager,!c);return y?{size:[d,g],image:new Uint32Array(y.buffer),sdf:!1,simplePattern:!1,anchorX:C,anchorY:z}:null}rasterizeImageResource(e,t,r,a){this._rasterizationCanvas||(this._rasterizationCanvas=document.createElement("canvas")),this._rasterizationCanvas.width=e,this._rasterizationCanvas.height=t;const i=this._rasterizationCanvas.getContext("2d");r instanceof ImageData?i.putImageData(r,0,0):(r.setAttribute("width",`${e}px`),r.setAttribute("height",`${t}px`),i.drawImage(r,0,0,e,t));const n=i.getImageData(0,0,e,t),s=new Uint8Array(n.data);if(a)for(const m of a)if(m&&m.oldColor&&4===m.oldColor.length&&m.newColor&&4===m.newColor.length){const[e,t,r,a]=m.oldColor,[i,n,o,l]=m.newColor;if(e===i&&t===n&&r===o&&a===l)continue;for(let m=0;m<s.length;m+=4)e===s[m]&&t===s[m+1]&&r===s[m+2]&&a===s[m+3]&&(s[m]=i,s[m+1]=n,s[m+2]=o,s[m+3]=l)}let o;for(let m=0;m<s.length;m+=4)o=s[m+3]/255,s[m]=s[m]*o,s[m+1]=s[m+1]*o,s[m+2]=s[m+2]*o;let c=s,f=e,h=t;const p=512;if(f>=p||h>=p){const r=f/h;r>1?(f=p,h=Math.round(p/r)):(h=p,f=Math.round(p*r)),c=new Uint8Array(4*f*h);const a=new Uint8ClampedArray(c.buffer);(0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.TT)(s,e,t,a,f,h,!1)}return{size:[f,h],image:new Uint32Array(c.buffer),sdf:!1,simplePattern:!1,anchorX:0,anchorY:0}}}},"./node_modules/@arcgis/core/symbols/cim/rasterizingUtils.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Y:()=>r,m:()=>e});var _core_floatRGBA_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/floatRGBA.js"),_core_mathUtils_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/mathUtils.js");function r(o,r,e){const i=(0,_core_mathUtils_js__WEBPACK_IMPORTED_MODULE_1__.fp)(Math.ceil(e)),n=(o=>"vertical"===o||"horizontal"===o||"cross"===o||"esriSFSCross"===o||"esriSFSVertical"===o||"esriSFSHorizontal"===o)(r)?8*i:16*i,s=2*i;o.width=n,o.height=n;const l=o.getContext("2d");l.strokeStyle="#FFFFFF",l.lineWidth=i,l.beginPath(),"vertical"!==r&&"cross"!==r&&"esriSFSCross"!==r&&"esriSFSVertical"!==r||(l.moveTo(n/2,-s),l.lineTo(n/2,n+s)),"horizontal"!==r&&"cross"!==r&&"esriSFSCross"!==r&&"esriSFSHorizontal"!==r||(l.moveTo(-s,n/2),l.lineTo(n+s,n/2)),"forward-diagonal"!==r&&"diagonal-cross"!==r&&"esriSFSDiagonalCross"!==r&&"esriSFSForwardDiagonal"!==r||(l.moveTo(-s,-s),l.lineTo(n+s,n+s),l.moveTo(n-s,-s),l.lineTo(n+s,s),l.moveTo(-s,n-s),l.lineTo(s,n+s)),"backward-diagonal"!==r&&"diagonal-cross"!==r&&"esriSFSBackwardDiagonal"!==r&&"esriSFSDiagonalCross"!==r||(l.moveTo(n+s,-s),l.lineTo(-s,n+s),l.moveTo(s,-s),l.lineTo(-s,s),l.moveTo(n+s,n-s),l.lineTo(n-s,n+s)),l.stroke();const h=l.getImageData(0,0,o.width,o.height),c=new Uint8Array(h.data);let m;for(let t=0;t<c.length;t+=4)m=c[t+3]/255,c[t]=c[t]*m,c[t+1]=c[t+1]*m,c[t+2]=c[t+2]*m;return[c,o.width,o.height]}function e(t,a){const r="Butt"===a,e="Square"===a,i=!r&&!e;t.length%2==1&&(t=[...t,...t]);const n=15.5;let l=0;for(const o of t)l+=o;const h=Math.round(l*n),c=new Float32Array(31*h),m=7.75;let S=0,F=0,g=.5,T=!0;for(const o of t){for(S=F,F+=o*n;g<=F;){let o=.5;for(;o<31;){const t=(o-.5)*h+g-.5,a=i?(o-n)*(o-n):Math.abs(o-n);c[t]=T?r?Math.max(Math.max(S+m-g,a),Math.max(g-F+m,a)):a:i?Math.min((g-S)*(g-S)+a,(g-F)*(g-F)+a):e?Math.min(Math.max(g-S,a),Math.max(F-g,a)):Math.min(Math.max(g-S+m,a),Math.max(F+m-g,a)),o++}g++}T=!T}const d=c.length,f=new Uint8Array(4*d);for(let M=0;M<d;++M){const t=(i?Math.sqrt(c[M]):c[M])/n;(0,_core_floatRGBA_js__WEBPACK_IMPORTED_MODULE_0__.I)(t,f,4*M)}return[f,h,31]}}}]);