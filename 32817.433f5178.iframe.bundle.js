"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[32817,99158,99252],{"./node_modules/@arcgis/core/core/libs/rbush/PooledRBush.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{w:()=>s});var _arrayUtils_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),_PooledArray_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/PooledArray.js"),_chunks_quickselect_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/chunks/quickselect.js");class s{constructor(t=9,i){this._compareMinX=o,this._compareMinY=l,this._toBBox=t=>t,this._maxEntries=Math.max(4,t||9),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),i&&("function"==typeof i?this._toBBox=i:this._initFormat(i)),this.clear()}destroy(){this.clear(),p.prune(),g.prune(),M.prune(),X.prune()}all(t){this._all(this._data,t)}search(t,i){let n=this._data;const e=this._toBBox;if(x(t,n))for(p.clear();n;){for(let s=0,h=n.children.length;s<h;s++){const h=n.children[s],a=n.leaf?e(h):h;x(t,a)&&(n.leaf?i(h):_(t,a)?this._all(h,i):p.push(h))}n=p.pop()}}collides(t){let i=this._data;const n=this._toBBox;if(!x(t,i))return!1;for(p.clear();i;){for(let e=0,s=i.children.length;e<s;e++){const s=i.children[e],h=i.leaf?n(s):s;if(x(t,h)){if(i.leaf||_(t,h))return!0;p.push(s)}}i=p.pop()}return!1}load(t){if(!t.length)return this;if(t.length<this._minEntries){for(let i=0,n=t.length;i<n;i++)this.insert(t[i]);return this}let i=this._build(t.slice(0,t.length),0,t.length-1,0);if(this._data.children.length)if(this._data.height===i.height)this._splitRoot(this._data,i);else{if(this._data.height<i.height){const t=this._data;this._data=i,i=t}this._insert(i,this._data.height-i.height-1,!0)}else this._data=i;return this}insert(t){return t&&this._insert(t,this._data.height-1),this}clear(){return this._data=new w([]),this}remove(i){if(!i)return this;let n,e=this._data,s=null,h=0,a=!1;const r=this._toBBox(i);for(M.clear(),X.clear();e||M.length>0;){if(e||(e=M.pop(),s=M.data[M.length-1],h=X.pop()??0,a=!0),e.leaf&&(n=(0,_arrayUtils_js__WEBPACK_IMPORTED_MODULE_0__.qh)(e.children,i,e.children.length,e.indexHint),-1!==n))return e.children.splice(n,1),M.push(e),this._condense(M),this;a||e.leaf||!_(e,r)?s?(h++,e=s.children[h],a=!1):e=null:(M.push(e),X.push(h),h=0,s=e,e=e.children[0])}return this}toJSON(){return this._data}fromJSON(t){return this._data=t,this}_all(t,i){let n=t;for(g.clear();n;){if(!0===n.leaf)for(const t of n.children)i(t);else g.pushArray(n.children);n=g.pop()??null}}_build(t,i,n,e){const s=n-i+1;let a=this._maxEntries;if(s<=a){const e=new w(t.slice(i,n+1));return h(e,this._toBBox),e}e||(e=Math.ceil(Math.log(s)/Math.log(a)),a=Math.ceil(s/a**(e-1)));const r=new b([]);r.height=e;const o=Math.ceil(s/a),l=o*Math.ceil(Math.sqrt(a));f(t,i,n,l,this._compareMinX);for(let h=i;h<=n;h+=l){const i=Math.min(h+l-1,n);f(t,h,i,o,this._compareMinY);for(let n=h;n<=i;n+=o){const s=Math.min(n+o-1,i);r.children.push(this._build(t,n,s,e-1))}}return h(r,this._toBBox),r}_chooseSubtree(t,i,n,e){for(;e.push(i),!0!==i.leaf&&e.length-1!==n;){let n,e=1/0,s=1/0;for(let h=0,a=i.children.length;h<a;h++){const a=i.children[h],r=c(a),o=d(t,a)-r;o<s?(s=o,e=r<e?r:e,n=a):o===s&&r<e&&(e=r,n=a)}i=n||i.children[0]}return i}_insert(t,i,n){const e=this._toBBox,s=n?t:e(t);M.clear();const h=this._chooseSubtree(s,this._data,i,M);for(h.children.push(t),r(h,s);i>=0&&M.data[i].children.length>this._maxEntries;)this._split(M,i),i--;this._adjustParentBBoxes(s,M,i)}_split(t,i){const n=t.data[i],e=n.children.length,s=this._minEntries;this._chooseSplitAxis(n,s,e);const a=this._chooseSplitIndex(n,s,e);if(!a)return void console.log("  Error: assertion failed at PooledRBush._split: no valid split index");const r=n.children.splice(a,n.children.length-a),o=n.leaf?new w(r):new b(r);o.height=n.height,h(n,this._toBBox),h(o,this._toBBox),i?t.data[i-1].children.push(o):this._splitRoot(n,o)}_splitRoot(t,i){this._data=new b([t,i]),this._data.height=t.height+1,h(this._data,this._toBBox)}_chooseSplitIndex(t,i,n){let e,s,h;e=s=1/0;for(let r=i;r<=n-i;r++){const i=a(t,0,r,this._toBBox),o=a(t,r,n,this._toBBox),l=u(i,o),m=c(i)+c(o);l<e?(e=l,h=r,s=m<s?m:s):l===e&&m<s&&(s=m,h=r)}return h}_chooseSplitAxis(t,i,n){const e=t.leaf?this._compareMinX:o,s=t.leaf?this._compareMinY:l;this._allDistMargin(t,i,n,e)<this._allDistMargin(t,i,n,s)&&t.children.sort(e)}_allDistMargin(t,i,n,e){t.children.sort(e);const s=this._toBBox,h=a(t,0,i,s),o=a(t,n-i,n,s);let l=m(h)+m(o);for(let a=i;a<n-i;a++){const i=t.children[a];r(h,t.leaf?s(i):i),l+=m(h)}for(let a=n-i-1;a>=i;a--){const i=t.children[a];r(o,t.leaf?s(i):i),l+=m(o)}return l}_adjustParentBBoxes(t,i,n){for(let e=n;e>=0;e--)r(i.data[e],t)}_condense(i){for(let n=i.length-1;n>=0;n--){const e=i.data[n];if(0===e.children.length)if(n>0){const s=i.data[n-1],h=s.children;h.splice((0,_arrayUtils_js__WEBPACK_IMPORTED_MODULE_0__.qh)(h,e,h.length,s.indexHint),1)}else this.clear();else h(e,this._toBBox)}}_initFormat(t){const i=["return a"," - b",";"];this._compareMinX=new Function("a","b",i.join(t[0])),this._compareMinY=new Function("a","b",i.join(t[1])),this._toBBox=new Function("a","return {minX: a"+t[0]+", minY: a"+t[1]+", maxX: a"+t[2]+", maxY: a"+t[3]+"};")}}function h(t,i){a(t,0,t.children.length,i,t)}function a(t,i,n,e,s){s||(s=new w([])),s.minX=1/0,s.minY=1/0,s.maxX=-1/0,s.maxY=-1/0;for(let h,a=i;a<n;a++)h=t.children[a],r(s,t.leaf?e(h):h);return s}function r(t,i){t.minX=Math.min(t.minX,i.minX),t.minY=Math.min(t.minY,i.minY),t.maxX=Math.max(t.maxX,i.maxX),t.maxY=Math.max(t.maxY,i.maxY)}function o(t,i){return t.minX-i.minX}function l(t,i){return t.minY-i.minY}function c(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function m(t){return t.maxX-t.minX+(t.maxY-t.minY)}function d(t,i){return(Math.max(i.maxX,t.maxX)-Math.min(i.minX,t.minX))*(Math.max(i.maxY,t.maxY)-Math.min(i.minY,t.minY))}function u(t,i){const n=Math.max(t.minX,i.minX),e=Math.max(t.minY,i.minY),s=Math.min(t.maxX,i.maxX),h=Math.min(t.maxY,i.maxY);return Math.max(0,s-n)*Math.max(0,h-e)}function _(t,i){return t.minX<=i.minX&&t.minY<=i.minY&&i.maxX<=t.maxX&&i.maxY<=t.maxY}function x(t,i){return i.minX<=t.maxX&&i.minY<=t.maxY&&i.maxX>=t.minX&&i.maxY>=t.minY}function f(t,i,n,s,h){const a=[i,n];for(;a.length;){const i=a.pop(),n=a.pop();if(i-n<=s)continue;const r=n+Math.ceil((i-n)/s/2)*s;(0,_chunks_quickselect_js__WEBPACK_IMPORTED_MODULE_2__.q)(t,r,n,i,h),a.push(n,r,r,i)}}const p=new _PooledArray_js__WEBPACK_IMPORTED_MODULE_1__.A,g=new _PooledArray_js__WEBPACK_IMPORTED_MODULE_1__.A,M=new _PooledArray_js__WEBPACK_IMPORTED_MODULE_1__.A,X=new _PooledArray_js__WEBPACK_IMPORTED_MODULE_1__.A({deallocator:void 0});class Y{constructor(){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0}}class B extends Y{constructor(){super(...arguments),this.height=1,this.indexHint=new _arrayUtils_js__WEBPACK_IMPORTED_MODULE_0__.vW}}class w extends B{constructor(t){super(),this.children=t,this.leaf=!0}}class b extends B{constructor(t){super(),this.children=t,this.leaf=!1}}},"./node_modules/@arcgis/core/layers/graphics/OptimizedFeature.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ib:()=>e,N3:()=>s,Om:()=>t});class t{constructor(t=null,s={},e,h){this.geometry=t,this.attributes=s,this.centroid=e,this.objectId=h,this.displayId=0,this.geohashX=0,this.geohashY=0}weakClone(){const s=new t(this.geometry,this.attributes,this.centroid,this.objectId);return s.displayId=this.displayId,s.geohashX=this.geohashX,s.geohashY=this.geohashY,s}}function s(t){return!!t.geometry?.coords?.length}class e extends t{}},"./node_modules/@arcgis/core/layers/graphics/OptimizedFeatureSet.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>e});class e{constructor(){this.objectIdFieldName=null,this.globalIdFieldName=null,this.geohashFieldName=null,this.geometryProperties=null,this.geometryType=null,this.spatialReference=null,this.hasZ=!1,this.hasM=!1,this.features=[],this.fields=[],this.transform=null,this.exceededTransferLimit=!1,this.uniqueIdField=null,this.queryGeometryType=null,this.queryGeometry=null}weakClone(){const t=new e;return t.objectIdFieldName=this.objectIdFieldName,t.globalIdFieldName=this.globalIdFieldName,t.geohashFieldName=this.geohashFieldName,t.geometryProperties=this.geometryProperties,t.geometryType=this.geometryType,t.spatialReference=this.spatialReference,t.hasZ=this.hasZ,t.hasM=this.hasM,t.features=this.features,t.fields=this.fields,t.transform=this.transform,t.exceededTransferLimit=this.exceededTransferLimit,t.uniqueIdField=this.uniqueIdField,t.queryGeometry=this.queryGeometry,t.queryGeometryType=this.queryGeometryType,t}}},"./node_modules/@arcgis/core/layers/graphics/OptimizedGeometry.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>t});class t{constructor(t=[],e=[],s=!1){this.lengths=t??[],this.coords=e??[],this.hasIndeterminateRingOrder=s}static fromRect(e){const[s,h,n,r]=e,i=n-s,o=r-h;return new t([5],[s,h,i,0,0,o,-i,0,0,-o])}get isPoint(){return 0===this.lengths.length}get maxLength(){return Math.max(...this.lengths)}get size(){return this.lengths.reduce(((t,e)=>t+e))}forEachVertex(t){let e=0;this.lengths.length||t(this.coords[0],this.coords[1]);for(let s=0;s<this.lengths.length;s++){const h=this.lengths[s];for(let s=0;s<h;s++)t(this.coords[2*(s+e)],this.coords[2*(s+e)+1]);e+=h}}clone(e){return e?(e.set(this.coords),new t(this.lengths.slice(),e,this.hasIndeterminateRingOrder)):new t(this.lengths.slice(),this.coords.slice(),this.hasIndeterminateRingOrder)}}},"./node_modules/@arcgis/core/layers/graphics/data/optimizedFeatureQueryEngineAdapter.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function t(t,n){return t?n?4:3:n?3:2}function n(n,I,o,u,N){if(!I?.lengths.length)return null;const l="upperLeft"===N?.originPosition?-1:1;n.lengths.length&&(n.lengths.length=0),n.coords.length&&(n.coords.length=0);const s=n.coords,c=[],f=o?[Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY]:[Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY],{lengths:T,coords:i}=I,h=t(o,u);let g=0;for(const t of T){const n=e(f,i,g,t,o,u,l);n&&c.push(n),g+=t*h}if(c.sort(((t,n)=>{let e=l*t[2]-l*n[2];return 0===e&&o&&(e=t[4]-n[4]),e})),c.length){let t=6*c[0][2];s[0]=c[0][0]/t,s[1]=c[0][1]/t,o&&(t=6*c[0][4],s[2]=0!==t?c[0][3]/t:0),(s[0]<f[0]||s[0]>f[1]||s[1]<f[2]||s[1]>f[3]||o&&(s[2]<f[4]||s[2]>f[5]))&&(s.length=0)}if(!s.length){const t=I.lengths[0]?r(i,0,T[0],o,u):null;if(!t)return null;s[0]=t[0],s[1]=t[1],o&&t.length>2&&(s[2]=t[2])}return n}function e(n,e,r,I,o,u,N=1){const l=t(o,u);let s=r,c=r+l,f=0,T=0,i=0,h=0,g=0;for(let t=0,b=I-1;t<b;t++,s+=l,c+=l){const t=e[s],r=e[s+1],I=e[s+2],u=e[c],N=e[c+1],l=e[c+2];let E=t*N-u*r;h+=E,f+=(t+u)*E,T+=(r+N)*E,o&&(E=t*l-u*I,i+=(I+l)*E,g+=E),t<n[0]&&(n[0]=t),t>n[1]&&(n[1]=t),r<n[2]&&(n[2]=r),r>n[3]&&(n[3]=r),o&&(I<n[4]&&(n[4]=I),I>n[5]&&(n[5]=I))}if(h*N>0&&(h*=-1),g*N>0&&(g*=-1),!h)return null;const E=[f,T,.5*h];return o&&(E[3]=i,E[4]=.5*g),E}function r(n,e,r,l,s){const c=t(l,s);let f=e,T=e+c,i=0,h=0,g=0,E=0;for(let t=0,b=r-1;t<b;t++,f+=c,T+=c){const t=n[f],e=n[f+1],r=n[f+2],s=n[T],c=n[T+1],b=n[T+2],m=l?o(t,e,r,s,c,b):I(t,e,s,c);if(m)if(i+=m,l){const n=N(t,e,r,s,c,b);h+=m*n[0],g+=m*n[1],E+=m*n[2]}else{const n=u(t,e,s,c);h+=m*n[0],g+=m*n[1]}}return i>0?l?[h/i,g/i,E/i]:[h/i,g/i]:r>0?l?[n[e],n[e+1],n[e+2]]:[n[e],n[e+1]]:null}function I(t,n,e,r){const I=e-t,o=r-n;return Math.sqrt(I*I+o*o)}function o(t,n,e,r,I,o){const u=r-t,N=I-n,l=o-e;return Math.sqrt(u*u+N*N+l*l)}function u(t,n,e,r){return[t+.5*(e-t),n+.5*(r-n)]}function N(t,n,e,r,I,o){return[t+.5*(r-t),n+.5*(I-n),e+.5*(o-e)]}__webpack_require__.d(__webpack_exports__,{T:()=>optimizedFeatureQueryEngineAdapter_o});var OptimizedFeature=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/OptimizedFeature.js"),OptimizedGeometry=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/OptimizedGeometry.js");const optimizedFeatureQueryEngineAdapter_o={getObjectId:t=>t.objectId,getAttributes:t=>t.attributes,getAttribute:(t,e)=>t.attributes[e],cloneWithGeometry:(t,r)=>new OptimizedFeature.Om(r,t.attributes,null,t.objectId),getGeometry:t=>t.geometry,getCentroid:(e,o)=>(null==e.centroid&&(e.centroid=n(new OptimizedGeometry.A,e.geometry,o.hasZ,o.hasM)),e.centroid)}},"./node_modules/@arcgis/core/layers/graphics/featureConversionUtils.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ap:()=>C,B2:()=>N,BW:()=>$,Ch:()=>It,DF:()=>P,Di:()=>et,E2:()=>tt,IE:()=>M,Nl:()=>ht,Q4:()=>bt,Rk:()=>Nt,Ux:()=>rt,X9:()=>ot,Ye:()=>K,ZF:()=>ct,eU:()=>Q,eY:()=>ft,jH:()=>at,jQ:()=>yt,kz:()=>dt,oN:()=>nt,q3:()=>it,qK:()=>U,qN:()=>L,z5:()=>H,zv:()=>st});var _core_Error_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),_core_Logger_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/Logger.js"),_core_maybe_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_geometry_support_aaBoundingBox_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/aaBoundingBox.js"),_geometry_support_aaBoundingRect_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/aaBoundingRect.js"),_geometry_support_jsonUtils_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/jsonUtils.js"),_OptimizedFeature_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/OptimizedFeature.js"),_OptimizedFeatureSet_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/OptimizedFeatureSet.js"),_OptimizedGeometry_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/OptimizedGeometry.js");function d(t,e){return t?e?4:3:e?3:2}const m=_core_Logger_js__WEBPACK_IMPORTED_MODULE_1__.A.getLogger("esri.layers.graphics.featureConversionUtils"),g={esriGeometryPoint:0,esriGeometryPolyline:2,esriGeometryPolygon:3,esriGeometryMultipoint:0,esriGeometryEnvelope:0},y=(t,e,o,n,r,s)=>{t[o]=r,t[o+1]=s},p=(t,e,o,n,r,s)=>{t[o]=r,t[o+1]=s,t[o+2]=e[n+2]},I=(t,e,o,n,r,s)=>{t[o]=r,t[o+1]=s,t[o+2]=e[n+3]},b=(t,e,o,n,r,s)=>{t[o]=r,t[o+1]=s,t[o+2]=e[n+2],t[o+3]=e[n+3]};function w(t,e,o,n){if(t){if(o)return e&&n?b:p;if(e&&n)return I}else if(e&&n)return p;return y}function M({scale:t,translate:e},o){return Math.round((o-e[0])/t[0])}function N({scale:t,translate:e},o){return Math.round((e[1]-o)/t[1])}function F({scale:t,translate:e},o,n){return o*t[n]+e[n]}function P(t,e,o){return t?e?o?z(t):Z(t):o?v(t):x(t):null}function x(t){const e=t.coords;return{x:e[0],y:e[1]}}function j(t,e){return t.coords[0]=e.x,t.coords[1]=e.y,t}function Z(t){const e=t.coords;return{x:e[0],y:e[1],z:e[2]}}function k(t,e){return t.coords[0]=e.x,t.coords[1]=e.y,t.coords[2]=e.z,t}function v(t){const e=t.coords;return{x:e[0],y:e[1],m:e[2]}}function E(t,e){return t.coords[0]=e.x,t.coords[1]=e.y,t.coords[2]=e.m,t}function z(t){const e=t.coords;return{x:e[0],y:e[1],z:e[2],m:e[3]}}function S(t,e){return t.coords[0]=e.x,t.coords[1]=e.y,t.coords[2]=e.z,t.coords[3]=e.m,t}function Y(t,e){return t&&e?S:t?k:e?E:j}function _(t,e,o,n,r){const s=Y(o,n);for(const{geometry:u,attributes:l}of e){const e=null!=u?s(new _OptimizedGeometry_js__WEBPACK_IMPORTED_MODULE_5__.A,u):null;t.push(new _OptimizedFeature_js__WEBPACK_IMPORTED_MODULE_6__.Om(e,l,null,r?l[r]:void 0))}return t}function L(t,e,o=Y(null!=e.z,null!=e.m)){return o(t,e)}function U(t,e,o){if(null==t)return null;const n=d(e,o),r=[];for(let s=0;s<t.coords.length;s+=n){const e=[];for(let o=0;o<n;o++)e.push(t.coords[s+o]);r.push(e)}return e?o?{points:r,hasZ:e,hasM:o}:{points:r,hasZ:e}:o?{points:r,hasM:o}:{points:r}}function A(t,e,o,n,r){const s=d(o,n);for(const{geometry:u,attributes:l}of e){const e=null!=u?q(new _OptimizedGeometry_js__WEBPACK_IMPORTED_MODULE_5__.A,u,s):null;t.push(new _OptimizedFeature_js__WEBPACK_IMPORTED_MODULE_6__.Om(e,l,null,r?l[r]:void 0))}return t}function q(t,e,o=d(e.hasZ,e.hasM)){t.lengths[0]=e.points.length;const n=t.coords;let r=0;for(const s of e.points)for(let t=0;t<o;t++)n[r++]=s[t];return t}function $(t,e,o){if(!t)return null;const n=d(e,o),{coords:r,lengths:s}=t,u=[];let l=0;for(const c of s){const t=[];for(let e=0;e<c;e++){const e=[];for(let t=0;t<n;t++)e.push(r[l++]);t.push(e)}u.push(t)}return e?o?{paths:u,hasZ:e,hasM:o}:{paths:u,hasZ:e}:o?{paths:u,hasM:o}:{paths:u}}function B(t,e,o,n,r){const s=d(o,n);for(const{geometry:u,attributes:l}of e){const e=null!=u?C(new _OptimizedGeometry_js__WEBPACK_IMPORTED_MODULE_5__.A,u,s):null;t.push(new _OptimizedFeature_js__WEBPACK_IMPORTED_MODULE_6__.Om(e,l,null,r?l[r]:void 0))}return t}function C(t,e,o=d(e.hasZ,e.hasM)){const{lengths:n,coords:r}=t;let s=0;for(const u of e.paths){for(const t of u)for(let e=0;e<o;e++)r[s++]=t[e];n.push(u.length)}return t}function H(t,e,o){if(!t)return null;const n=d(e,o),{coords:r,lengths:s}=t,u=[];let l=0;for(const c of s){const t=[];for(let e=0;e<c;e++){const e=[];for(let t=0;t<n;t++)e.push(r[l++]);t.push(e)}u.push(t)}return e?o?{rings:u,hasZ:e,hasM:o}:{rings:u,hasZ:e}:o?{rings:u,hasM:o}:{rings:u}}function J(t,e,o,n,r){for(const{geometry:s,centroid:u,attributes:l}of e){const e=null!=s?K(new _OptimizedGeometry_js__WEBPACK_IMPORTED_MODULE_5__.A,s,o,n):null,c=r?l[r]:void 0;null!=u?t.push(new _OptimizedFeature_js__WEBPACK_IMPORTED_MODULE_6__.Om(e,l,j(new _OptimizedGeometry_js__WEBPACK_IMPORTED_MODULE_5__.A,u),c)):t.push(new _OptimizedFeature_js__WEBPACK_IMPORTED_MODULE_6__.Om(e,l,null,c))}return t}function K(t,e,o=e.hasZ,n=e.hasM){return Q(t,e.rings,o,n)}function Q(t,e,o,n){const r=d(o,n),{lengths:s,coords:u}=t;let l=0;Ft(t);for(const c of e){for(const t of c)for(let e=0;e<r;e++)u[l++]=t[e];s.push(c.length)}return t}const W=[],X=[];function tt(t,e,o,n,r){W[0]=t;const[s]=et(X,W,e,o,n,r);return Pt(W),Pt(X),s}function et(e,o,n,r,s,u){if(Pt(e),!n){for(const t of o){const o=u?t.attributes[u]:void 0;e.push(new _OptimizedFeature_js__WEBPACK_IMPORTED_MODULE_6__.Om(null,t.attributes,null,o))}return e}switch(n){case"esriGeometryPoint":return _(e,o,r,s,u);case"esriGeometryMultipoint":return A(e,o,r,s,u);case"esriGeometryPolyline":return B(e,o,r,s,u);case"esriGeometryPolygon":return J(e,o,r,s,u);default:m.error("convertToFeatureSet:unknown-geometry",new _core_Error_js__WEBPACK_IMPORTED_MODULE_0__.A(`Unable to parse unknown geometry type '${n}'`)),Pt(e)}return e}function ot(e,o,n,r,s,u){const l=e.length;switch(n){case"esriGeometryPoint":_(e,o,r,s,u);break;case"esriGeometryMultipoint":A(e,o,r,s,u);break;case"esriGeometryPolyline":B(e,o,r,s,u);break;case"esriGeometryPolygon":J(e,o,r,s,u);break;default:m.error("convertToFeatureSet:unknown-geometry",new _core_Error_js__WEBPACK_IMPORTED_MODULE_0__.A(`Unable to parse unknown geometry type '${n}'`))}for(let t=0;t<o.length;t++)e[t+l].geometryType=n,e[t+l].insertAfter=o[t].insertAfter,e[t+l].groupId=o[t].groupId;return e}function nt(t,e,o,n){X[0]=t,lt(W,X,e,o,n);const r=W[0];return Pt(W),Pt(X),r}function rt(e,o,n){if(null==e)return null;const r=new _OptimizedGeometry_js__WEBPACK_IMPORTED_MODULE_5__.A;return"hasZ"in e&&null==o&&(o=e.hasZ),"hasM"in e&&null==n&&(n=e.hasM),(0,_geometry_support_jsonUtils_js__WEBPACK_IMPORTED_MODULE_4__.fT)(e)?Y(null!=o?o:null!=e.z,null!=n?n:null!=e.m)(r,e):(0,_geometry_support_jsonUtils_js__WEBPACK_IMPORTED_MODULE_4__.Bi)(e)?K(r,e,o,n):(0,_geometry_support_jsonUtils_js__WEBPACK_IMPORTED_MODULE_4__.Rg)(e)?C(r,e,d(o,n)):(0,_geometry_support_jsonUtils_js__WEBPACK_IMPORTED_MODULE_4__.U9)(e)?q(r,e,d(o,n)):void m.error("convertFromGeometry:unknown-geometry",new _core_Error_js__WEBPACK_IMPORTED_MODULE_0__.A(`Unable to parse unknown geometry type '${e}'`))}function st(e,o,n,r){const s=e&&("coords"in e?e:e.geometry);if(null==s)return null;switch(o){case"esriGeometryPoint":{let t=x;return n&&r?t=z:n?t=Z:r&&(t=v),t(s)}case"esriGeometryMultipoint":return U(s,n,r);case"esriGeometryPolyline":return $(s,n,r);case"esriGeometryPolygon":return H(s,n,r);default:return m.error("convertToGeometry:unknown-geometry",new _core_Error_js__WEBPACK_IMPORTED_MODULE_0__.A(`Unable to parse unknown geometry type '${o}'`)),null}}function lt(e,o,n,r,s){if(Pt(e),null==n)return function ut(t,e){for(const o of e)t.push({attributes:o.attributes});return t}(e,o);switch(n){case"esriGeometryPoint":return function V(t,e,o,n){let r=x;o&&n?r=z:o?r=Z:n&&(r=v);for(const s of e){const{geometry:e,attributes:o}=s,n=null!=e?r(e):null;t.push({attributes:o,geometry:n})}return t}(e,o,r,s);case"esriGeometryMultipoint":return function O(t,e,o,n){for(const{geometry:r,attributes:s}of e)t.push({attributes:s,geometry:null!=r?U(r,o,n):null});return t}(e,o,r,s);case"esriGeometryPolyline":return function R(t,e,o,n){for(const{geometry:r,attributes:s}of e)t.push({attributes:s,geometry:null!=r?$(r,o,n):null});return t}(e,o,r,s);case"esriGeometryPolygon":return function D(t,e,o,n){for(const{geometry:r,attributes:s,centroid:u}of e){const e=null!=r?H(r,o,n):null;if(null!=u){const o=x(u);t.push({attributes:s,centroid:o,geometry:e})}else t.push({attributes:s,geometry:e})}return t}(e,o,r,s);default:m.error("convertToFeatureSet:unknown-geometry",new _core_Error_js__WEBPACK_IMPORTED_MODULE_0__.A(`Unable to parse unknown geometry type '${n}'`))}return e}function ct(t){const{objectIdFieldName:e,spatialReference:o,transform:n,fields:r,hasM:s,hasZ:u,features:l,geometryType:c,exceededTransferLimit:i,uniqueIdField:f,queryGeometry:a,queryGeometryType:h}=t,d={features:lt([],l,c,u,s),fields:r,geometryType:c,objectIdFieldName:e,spatialReference:o,uniqueIdField:f,queryGeometry:st(a,h,!1,!1)};return n&&(d.transform=n),i&&(d.exceededTransferLimit=i),s&&(d.hasM=s),u&&(d.hasZ=u),d}function it(e,o){const n=new _OptimizedFeatureSet_js__WEBPACK_IMPORTED_MODULE_7__.A,{hasM:r,hasZ:s,features:u,objectIdFieldName:l,spatialReference:c,geometryType:i,exceededTransferLimit:f,transform:h,fields:d}=e;return d&&(n.fields=d),n.geometryType=i??null,n.objectIdFieldName=l??o??null,n.spatialReference=c??null,n.objectIdFieldName?(u&&et(n.features,u,i,s,r,n.objectIdFieldName),f&&(n.exceededTransferLimit=f),r&&(n.hasM=r),s&&(n.hasZ=s),h&&(n.transform=h),n):(m.error(new _core_Error_js__WEBPACK_IMPORTED_MODULE_0__.A("optimized-features:invalid-objectIdFieldName","objectIdFieldName is missing")),n)}function ft(t){const{transform:e,features:o,hasM:n,hasZ:r}=t;if(!e)return t;for(const s of o)null!=s.geometry&&It(s.geometry,s.geometry,n,r,e),null!=s.centroid&&It(s.centroid,s.centroid,n,r,e);return t.transform=null,t}function at(t,e){const{geometryType:o,features:n,hasM:r,hasZ:s}=e;if(!t)return e;for(let u=0;u<n.length;u++){const e=n[u],l=e.weakClone();l.geometry=new _OptimizedGeometry_js__WEBPACK_IMPORTED_MODULE_5__.A,ht(l.geometry,e.geometry,r,s,o,t),e.centroid&&(l.centroid=new _OptimizedGeometry_js__WEBPACK_IMPORTED_MODULE_5__.A,ht(l.centroid,e.centroid,r,s,"esriGeometryPoint",t)),n[u]=l}return e.transform=t,e}function ht(t,e,o,n,r,s,u=o,l=n){if(Ft(t),!e?.coords.length)return null;const c=g[r],{coords:i,lengths:f}=e,a=d(o,n),h=d(o&&u,n&&l),m=w(o,n,u,l);if(!f.length)return m(t.coords,i,0,0,M(s,i[0]),N(s,i[1])),Ft(t,a,0),t;let y,p,I,b,G=0,T=0,F=T;for(const d of f){if(d<c)continue;let e=0;T=F,I=y=M(s,i[G]),b=p=N(s,i[G+1]),m(t.coords,i,T,G,I,b),e++,G+=a,T+=h;for(let o=1;o<d;o++,G+=a)I=M(s,i[G]),b=N(s,i[G+1]),I===y&&b===p||(m(t.coords,i,T,G,I-y,b-p),T+=h,e++,y=I,p=b);e>=c&&(t.lengths.push(e),F=T)}return Pt(t.coords,F),t.coords.length?t:null}function dt(t,e,o,n,r,s,u=o,l=n){if(Ft(t),!e?.coords.length)return null;const c=g[r],{coords:i,lengths:f}=e,a=d(o,n),h=d(o&&u,n&&l),m=w(o,n,u,l);if(!f.length)return m(t.coords,i,0,0,i[0],i[1]),Ft(t,a,0),t;let y=0;const p=s*s;for(const d of f){if(d<c){y+=d*a;continue}const e=t.coords.length/h,o=y,n=y+(d-1)*a;m(t.coords,i,t.coords.length,o,i[o],i[o+1]),gt(t.coords,i,a,p,m,o,n),m(t.coords,i,t.coords.length,n,i[n],i[n+1]);const r=t.coords.length/h-e;r>=c?t.lengths.push(r):Pt(t.coords,e*h),y+=d*a}return t.coords.length?t:null}function mt(t,e,o,n){const r=t[e],s=t[e+1],u=t[o],l=t[o+1],c=t[n],i=t[n+1];let f=u,a=l,h=c-f,d=i-a;if(0!==h||0!==d){const t=((r-f)*h+(s-a)*d)/(h*h+d*d);t>1?(f=c,a=i):t>0&&(f+=h*t,a+=d*t)}return h=r-f,d=s-a,h*h+d*d}function gt(t,e,o,n,r,s,u){let l,c=n,i=0;for(let f=s+o;f<u;f+=o)l=mt(e,f,s,u),l>c&&(i=f,c=l);c>n&&(i-s>o&&gt(t,e,o,n,r,s,i),r(t,e,t.length,i,e[i],e[i+1]),u-i>o&&gt(t,e,o,n,r,i,u))}function yt(t,e,o,u){if(!e?.coords?.length)return null;const l=d(o,u);let c=Number.POSITIVE_INFINITY,i=Number.POSITIVE_INFINITY,f=Number.NEGATIVE_INFINITY,a=Number.NEGATIVE_INFINITY;if(e&&e.coords){const t=e.coords;for(let e=0;e<t.length;e+=l){const o=t[e],n=t[e+1];c=Math.min(c,o),f=Math.max(f,o),i=Math.min(i,n),a=Math.max(a,n)}}return(0,_geometry_support_aaBoundingBox_js__WEBPACK_IMPORTED_MODULE_2__.is)(t)?(0,_geometry_support_aaBoundingBox_js__WEBPACK_IMPORTED_MODULE_2__.BI)(t,c,i,f,a):(0,_geometry_support_aaBoundingRect_js__WEBPACK_IMPORTED_MODULE_3__.fA)(c,i,f,a,t),t}function It(t,e,n,r,s){const{coords:u,lengths:l}=e,c=d(n,r);if(!u.length)return t!==e&&Ft(t),t;(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_8__.Lw)(s);const{originPosition:i,scale:f,translate:a}=s,h=xt;h.originPosition=i;const m=h.scale;m[0]=f[0]??1,m[1]=-(f[1]??1),m[2]=f[2]??1,m[3]=f[3]??1;const g=h.translate;if(g[0]=a[0]??0,g[1]=a[1]??0,g[2]=a[2]??0,g[3]=a[3]??0,!l.length){for(let e=0;e<c;++e)t.coords[e]=F(h,u[e],e);return t!==e&&Ft(t,c,0),t}let y=0;for(let o=0;o<l.length;o++){const e=l[o];t.lengths[o]=e;for(let o=0;o<c;++o)t.coords[y+o]=F(h,u[y+o],o);let n=t.coords[y],r=t.coords[y+1];y+=c;for(let o=1;o<e;o++,y+=c){n+=u[y]*m[0],r+=u[y+1]*m[1],t.coords[y]=n,t.coords[y+1]=r;for(let e=2;e<c;++e)t.coords[y+e]=F(h,u[y+e],e)}}return t!==e&&Ft(t,u.length,l.length),t}function bt(t,e,o,n,r,s){if(Ft(t),t.lengths.push(...e.lengths),o===r&&n===s)for(let u=0;u<e.coords.length;u++)t.coords.push(e.coords[u]);else{const u=d(o,n),l=w(o,n,r,s),c=e.coords;for(let e=0;e<c.length;e+=u)l(t.coords,c,t.coords.length,e,c[e],c[e+1])}return t}function Mt(t,e,o,n){let r=0,s=t[n*e],u=t[n*(e+1)];for(let l=1;l<o;l++){const o=s+t[n*(e+l)],c=u+t[n*(e+l)+1],i=(o-s)*(c+u);s=o,u=c,r+=i}return.5*r}function Nt(t,e){const{coords:o,lengths:n}=t;let r=0,s=0;for(let u=0;u<n.length;u++){const t=n[u];s+=Mt(o,r,t,e),r+=t}return Math.abs(s)}function Ft(t,e=0,o=0){Pt(t.lengths,o),Pt(t.coords,e)}function Pt(t,e=0){t.length!==e&&(t.length=e)}const xt={originPosition:"lowerLeft",scale:[1,1,1,1],translate:[0,0,0,0]}}}]);