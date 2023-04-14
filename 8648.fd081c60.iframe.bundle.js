"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[8648],{"./node_modules/@arcgis/core/core/fontUtils.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{BN:()=>s,Yc:()=>o,mx:()=>n});var _config_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/config.js");const t="woff2",r=new Map;async function n(n){const s=o(n);let a=r.get(s);if(a)return a;const i=new FontFace(n.family,`url('${_config_js__WEBPACK_IMPORTED_MODULE_0__.default.fontsUrl}/woff2/${s}.${t}') format('${t}')`),c=document.fonts;return c.has(i)&&"loading"===i.status?i.loaded:(a=i.load(),r.set(s,a),c.add(i),a)}function s(e){if(!e)return"arial-unicode-ms";const t=e.toLowerCase().split(" ").join("-");switch(t){case"serif":return"noto-serif";case"sans-serif":return"arial-unicode-ms";case"monospace":return"ubuntu-mono";case"fantasy":return"cabin-sketch";case"cursive":return"redressed";default:return t}}function o(e){const t=function a(e){if(!e.weight)return"";switch(e.weight.toLowerCase()){case"bold":case"bolder":return"-bold"}return""}(e)+function i(e){if(!e.style)return"";switch(e.style.toLowerCase()){case"italic":case"oblique":return"-italic"}return""}(e);return s(e.family)+(t.length>0?t:"-regular")}},"./node_modules/@arcgis/core/symbols/support/previewSymbol2D.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{getContrastingBackgroundTheme:()=>T,getRenderSymbolParameters:()=>D,previewSymbol2D:()=>O});var Color=__webpack_require__("./node_modules/@arcgis/core/Color.js"),Error=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),fontUtils=__webpack_require__("./node_modules/@arcgis/core/core/fontUtils.js"),screenUtils=__webpack_require__("./node_modules/@arcgis/core/core/screenUtils.js"),gfxUtils=__webpack_require__("./node_modules/@arcgis/core/symbols/support/gfxUtils.js"),previewUtils=__webpack_require__("./node_modules/@arcgis/core/symbols/support/previewUtils.js"),renderUtils=__webpack_require__("./node_modules/@arcgis/core/symbols/support/renderUtils.js");function e(r){let{r:n,g:a,b:o,a:e}=r;return e<1&&(n=Math.round(e*n+255*(1-e)),a=Math.round(e*a+255*(1-e)),o=Math.round(e*o+255*(1-e))),new Color.Z({r:n,g:a,b:o})}function u(t){const{r,g:n,b:a}=e(t);return.2126*r+.7152*n+.0722*a}const p="picture-fill",d="picture-marker",f="simple-fill",y="simple-line",w="simple-marker",g="text",v="Aa",b=previewUtils.b_.size,x=previewUtils.b_.maxSize,k=previewUtils.b_.maxOutlineSize,M=previewUtils.b_.lineWidth,z=225,L=document.createElement("canvas");function j(e,t){const a=L.getContext("2d"),n=[];return t&&(t.weight&&n.push(t.weight),t.size&&n.push(t.size+"px"),t.family&&n.push(t.family)),a.font=n.join(" "),a.measureText(e).width}const C=7.2/2.54,S=72/2.54;function F(e){if(0===e.length)return 0;if(e.length>2){const t=(0,screenUtils.Wz)(1),a=parseFloat(e);switch(e.slice(-2)){case"px":return a;case"pt":return a*t;case"in":return 72*a*t;case"pc":return 12*a*t;case"mm":return a*C*t;case"cm":return a*S*t}}return parseFloat(e)}function E(e){const t=e?.size;return{width:null!=t&&"object"==typeof t&&"width"in t?(0,screenUtils.F2)(t.width):null,height:null!=t&&"object"==typeof t&&"height"in t?(0,screenUtils.F2)(t.height):null}}function q(e,t){return e>t?"dark":"light"}function D(e,t){const a="number"==typeof t?.size?t?.size:null,l=null!=a?(0,screenUtils.F2)(a):null,o=null!=t?.maxSize?(0,screenUtils.F2)(t.maxSize):null,r=null!=t?.rotation?t.rotation:"angle"in e?e.angle:null,m=(0,gfxUtils._M)(e);let u=(0,gfxUtils.mx)(e);"dark"!==T(e,245)||t?.ignoreWhiteSymbols||(u={width:.75,...u,color:"#bdc3c7"});const h={shape:null,fill:m,stroke:u,offset:[0,0]};u?.width&&(u.width=Math.min(u.width,k));const z=u?.width||0;let L=null!=t?.size&&(null==t?.scale||t?.scale),C=0,S=0,U=!1;switch(e.type){case w:{const a=e.style,{width:i,height:s}=E(t),c=i===s&&null!=i?i:null!=l?l:Math.min((0,screenUtils.F2)(e.size),o||x);switch(C=c,S=c,a){case"circle":h.shape={type:"circle",cx:0,cy:0,r:.5*c},L||(C+=z,S+=z);break;case"cross":h.shape={type:"path",path:[{command:"M",values:[0,.5*S]},{command:"L",values:[C,.5*S]},{command:"M",values:[.5*C,0]},{command:"L",values:[.5*C,S]}]};break;case"diamond":h.shape={type:"path",path:[{command:"M",values:[0,.5*S]},{command:"L",values:[.5*C,0]},{command:"L",values:[C,.5*S]},{command:"L",values:[.5*C,S]},{command:"Z",values:[]}]},L||(C+=z,S+=z);break;case"square":h.shape={type:"path",path:[{command:"M",values:[0,0]},{command:"L",values:[C,0]},{command:"L",values:[C,S]},{command:"L",values:[0,S]},{command:"Z",values:[]}]},L||(C+=z,S+=z),r&&(U=!0);break;case"triangle":h.shape={type:"path",path:[{command:"M",values:[.5*C,0]},{command:"L",values:[C,S]},{command:"L",values:[0,S]},{command:"Z",values:[]}]},L||(C+=z,S+=z),r&&(U=!0);break;case"x":h.shape={type:"path",path:[{command:"M",values:[0,0]},{command:"L",values:[C,S]},{command:"M",values:[C,0]},{command:"L",values:[0,S]}]},r&&(U=!0);break;case"path":h.shape={type:"path",path:e.path||""},L||(C+=z,S+=z),r&&(U=!0),L=!0}break}case y:{const{width:e,height:a}=E(t),n=null!=a?a:null!=l?l:z,i=null!=e?e:M;u&&(u.width=n),C=i,S=n;const s=h?.stroke?.cap||"butt",o="round"===s;L=!0,h.stroke&&(h.stroke.cap="butt"===s?"square":s),h.shape={type:"path",path:[{command:"M",values:[o?n/2:0,S/2]},{command:"L",values:[o?C-n/2:C,S/2]}]};break}case p:case f:{const e="object"==typeof t?.symbolConfig&&t?.symbolConfig.isSquareFill,{width:a,height:n}=E(t);C=!e&&a!==n||null==a?null!=l?l:b:a,S=!e&&a!==n||null==n?C:n,L||(C+=z,S+=z),L=!0,h.shape=e?{type:"path",path:[{command:"M",values:[0,0]},{command:"L",values:[C,0]},{command:"L",values:[C,S]},{command:"L",values:[0,S]},{command:"L",values:[0,0]},{command:"Z",values:[]}]}:previewUtils.JZ.fill[0];break}case d:{const a=Math.min((0,screenUtils.F2)(e.width),o||x),i=Math.min((0,screenUtils.F2)(e.height),o||x),{width:s,height:c}=E(t),m=s===c&&null!=s?s:null!=l?l:Math.max(a,i),u=a/i;C=u<=1?Math.ceil(m*u):m,S=u<=1?m:Math.ceil(m/u),h.shape={type:"image",x:-Math.round(C/2),y:-Math.round(S/2),width:C,height:S,src:e.url||""},r&&(U=!0);break}case g:{const a=e,i=t?.overrideText||a.text||v,s=a.font,{width:r,height:c}=E(t),m=null!=c?c:null!=l?l:Math.min((0,screenUtils.F2)(s.size),o||x),u=j(i,{weight:s.weight,size:m,family:s.family}),p=/[\uE600-\uE6FF]/.test(i);C=r??(p?m:u),S=m;let d=.25*F((s?m:0).toString());p&&(d+=5),h.shape={type:"text",text:i,x:a.xoffset||0,y:a.yoffset||d,align:"middle",alignBaseline:a.verticalAlignment,decoration:s&&s.decoration,rotated:a.rotated,kerning:a.kerning},h.font=s&&{size:m,style:s.style,decoration:s.decoration,weight:s.weight,family:s.family};break}}return{shapeDescriptor:h,size:[C,S],renderOptions:{node:t?.node,scale:L,opacity:t?.opacity,rotation:r,useRotationSize:U,effectView:t?.effectView}}}async function O(e,a){const{shapeDescriptor:n,size:l,renderOptions:i}=D(e,a);if(!n.shape)throw new Error.Z("symbolPreview: renderPreviewHTML2D","symbol not supported.");await async function U(e,t){const a=t.fill,n=e.color;if("pattern"===a?.type&&n&&e.type!==p){const e=await(0,gfxUtils.Od)(a.src,n.toCss(!0));a.src=e,t.fill=a}}(e,n),await async function Z(e,t,n,l){if(!("font"in e)||!e.font||"text"!==t.shape.type)return;try{await(0,fontUtils.mx)(e.font)}catch{}const{width:i}=E(l),s=/[\uE600-\uE6FF]/.test(t.shape.text);null!=i||s||(n[0]=j(t.shape.text,{weight:t.font?.weight,size:t.font?.size,family:t.font?.family}))}(e,n,l,a);const s=[[n]];if("object"==typeof a?.symbolConfig&&a?.symbolConfig.applyColorModulation){const e=.6*l[0];s.unshift([{...n,offset:[-e,0],fill:(0,previewUtils.dc)(n.fill,-.3)}]),s.push([{...n,offset:[e,0],fill:(0,previewUtils.dc)(n.fill,.3)}]),l[0]+=2*e,i.scale=!1}return(0,renderUtils.wh)(s,l,i)}function T(t,a=z){const n=(0,gfxUtils._M)(t),l=(0,gfxUtils.mx)(t),o=!n||"type"in n?null:new Color.Z(n),r=l?.color?new Color.Z(l?.color):null,c=o?q(u(o),a):null,m=r?q(u(r),a):null;return m?c?c===m?c:a>=z?"light":"dark":m:c}}}]);