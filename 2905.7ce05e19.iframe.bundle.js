"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[2905],{"./node_modules/@arcgis/core/views/2d/layers/features/createSymbolSchema.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{createSymbolSchema:()=>o});var _engine_webgl_enums_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/enums.js"),_engine_webgl_materialKey_MaterialKey_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/materialKey/MaterialKey.js");function l(e){return"line-marker"===e.type?{type:"line-marker",color:e.color?.toJSON(),placement:e.placement,style:e.style}:e.constructor.fromJSON(e.toJSON()).toJSON()}function s(e){return(0,_engine_webgl_materialKey_MaterialKey_js__WEBPACK_IMPORTED_MODULE_1__.hF)(e)}function o(e,a,t=!1){if(!e)return null;switch(e.type){case"simple-fill":case"picture-fill":return function c(a,n,o){const i=(0,_engine_webgl_materialKey_MaterialKey_js__WEBPACK_IMPORTED_MODULE_1__.jj)(_engine_webgl_enums_js__WEBPACK_IMPORTED_MODULE_0__.LW.FILL,n),c=o?s(i):i,m=a.clone(),h=m.outline,y=(0,_engine_webgl_materialKey_MaterialKey_js__WEBPACK_IMPORTED_MODULE_1__.jy)(n.symbologyType);y||(m.outline=null);const u={materialKey:c,hash:m.hash(),...l(m)};if(y)return u;const p=[];if(p.push(u),h){const a=(0,_engine_webgl_materialKey_MaterialKey_js__WEBPACK_IMPORTED_MODULE_1__.jj)(_engine_webgl_enums_js__WEBPACK_IMPORTED_MODULE_0__.LW.LINE,{...n,isOutline:!0}),r={materialKey:o?s(a):a,hash:h.hash(),...l(h)};p.push(r)}return{type:"composite-symbol",layers:p,hash:p.reduce(((e,a)=>a.hash+e),"")}}(e,a,t);case"simple-marker":case"picture-marker":return function h(a,r,n){const o=(0,_engine_webgl_materialKey_MaterialKey_js__WEBPACK_IMPORTED_MODULE_1__.jj)(_engine_webgl_enums_js__WEBPACK_IMPORTED_MODULE_0__.LW.MARKER,r),i=n?s(o):o,c=l(a);return{materialKey:i,hash:a.hash(),...c,angle:a.angle,maxVVSize:r.maxVVSize}}(e,a,t);case"simple-line":return function m(n,o,i){const c=(0,_engine_webgl_materialKey_MaterialKey_js__WEBPACK_IMPORTED_MODULE_1__.jy)(o.symbologyType)?_engine_webgl_enums_js__WEBPACK_IMPORTED_MODULE_0__.mD.DEFAULT:o.symbologyType,m=(0,_engine_webgl_materialKey_MaterialKey_js__WEBPACK_IMPORTED_MODULE_1__.jj)(_engine_webgl_enums_js__WEBPACK_IMPORTED_MODULE_0__.LW.LINE,{...o,symbologyType:c}),h=i?s(m):m,y=n.clone(),u=y.marker;y.marker=null;const p=[];if(p.push({materialKey:h,hash:y.hash(),...l(y)}),u){const a=(0,_engine_webgl_materialKey_MaterialKey_js__WEBPACK_IMPORTED_MODULE_1__.jj)(_engine_webgl_enums_js__WEBPACK_IMPORTED_MODULE_0__.LW.MARKER,o),r=i?s(a):a;u.color=u.color??y.color,p.push({materialKey:r,hash:u.hash(),lineWidth:y.width,...l(u)})}return{type:"composite-symbol",layers:p,hash:p.reduce(((e,a)=>a.hash+e),"")}}(e,a,t);case"text":return function y(a,r,n){const o=(0,_engine_webgl_materialKey_MaterialKey_js__WEBPACK_IMPORTED_MODULE_1__.jj)(_engine_webgl_enums_js__WEBPACK_IMPORTED_MODULE_0__.LW.TEXT,r),i=n?s(o):o,c=l(a);return{materialKey:i,hash:a.hash(),...c,angle:a.angle,maxVVSize:r.maxVVSize}}(e,a,t);case"label":return function i(a,r,n){const l=a.toJSON(),o=(0,_engine_webgl_materialKey_MaterialKey_js__WEBPACK_IMPORTED_MODULE_1__.jj)(_engine_webgl_enums_js__WEBPACK_IMPORTED_MODULE_0__.LW.LABEL,{...r,placement:l.labelPlacement});return{materialKey:n?s(o):o,hash:a.hash(),...l,labelPlacement:l.labelPlacement}}(e,a,t);case"cim":return{type:"cim",rendererKey:a.vvFlags,data:e.data,maxVVSize:a.maxVVSize};case"CIMSymbolReference":return{type:"cim",rendererKey:a.vvFlags,data:e,maxVVSize:a.maxVVSize};case"web-style":return{...l(e),type:"web-style",hash:e.hash(),rendererKey:a.vvFlags,maxVVSize:a.maxVVSize};default:throw new Error(`symbol not supported ${e.type}`)}}}}]);