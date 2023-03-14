"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[2902],{"./node_modules/@arcgis/core/core/libs/rbush/PooledRBush.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Q:()=>h});var _arrayUtils_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),_maybe_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_PooledArray_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/PooledArray.js"),_chunks_quickselect_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/chunks/quickselect.js");class h{constructor(t=9,i){this._compareMinX=l,this._compareMinY=c,this._toBBox=t=>t,this._maxEntries=Math.max(4,t||9),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),i&&("function"==typeof i?this._toBBox=i:this._initFormat(i)),this.clear()}destroy(){this.clear(),g.prune(),M.prune(),X.prune(),Y.prune()}all(t){this._all(this._data,t)}search(t,i){let n=this._data;const e=this._toBBox;if(f(t,n))for(g.clear();n;){for(let s=0,h=n.children.length;s<h;s++){const h=n.children[s],a=n.leaf?e(h):h;f(t,a)&&(n.leaf?i(h):x(t,a)?this._all(h,i):g.push(h))}n=g.pop()}}collides(t){let i=this._data;const n=this._toBBox;if(!f(t,i))return!1;for(g.clear();i;){for(let e=0,s=i.children.length;e<s;e++){const s=i.children[e],h=i.leaf?n(s):s;if(f(t,h)){if(i.leaf||x(t,h))return!0;g.push(s)}}i=g.pop()}return!1}load(t){if(!t.length)return this;if(t.length<this._minEntries){for(let i=0,n=t.length;i<n;i++)this.insert(t[i]);return this}let i=this._build(t.slice(0,t.length),0,t.length-1,0);if(this._data.children.length)if(this._data.height===i.height)this._splitRoot(this._data,i);else{if(this._data.height<i.height){const t=this._data;this._data=i,i=t}this._insert(i,this._data.height-i.height-1,!0)}else this._data=i;return this}insert(t){return t&&this._insert(t,this._data.height-1),this}clear(){return this._data=new b([]),this}remove(i){if(!i)return this;let e,s=this._data,h=null,a=0,r=!1;const o=this._toBBox(i);for(X.clear(),Y.clear();s||X.length>0;){if(s||(s=(0,_maybe_js__WEBPACK_IMPORTED_MODULE_3__.j0)(X.pop()),h=X.data[X.length-1],a=Y.pop()??0,r=!0),s.leaf&&(e=(0,_arrayUtils_js__WEBPACK_IMPORTED_MODULE_0__.cq)(s.children,i,s.children.length,s.indexHint),-1!==e))return s.children.splice(e,1),X.push(s),this._condense(X),this;r||s.leaf||!x(s,o)?h?(a++,s=h.children[a],r=!1):s=null:(X.push(s),Y.push(a),a=0,h=s,s=s.children[0])}return this}toJSON(){return this._data}fromJSON(t){return this._data=t,this}_all(t,i){let n=t;for(M.clear();n;){if(!0===n.leaf)for(const t of n.children)i(t);else M.pushArray(n.children);n=M.pop()??null}}_build(t,i,n,e){const s=n-i+1;let h=this._maxEntries;if(s<=h){const e=new b(t.slice(i,n+1));return a(e,this._toBBox),e}e||(e=Math.ceil(Math.log(s)/Math.log(h)),h=Math.ceil(s/h**(e-1)));const r=new j([]);r.height=e;const o=Math.ceil(s/h),l=o*Math.ceil(Math.sqrt(h));p(t,i,n,l,this._compareMinX);for(let a=i;a<=n;a+=l){const i=Math.min(a+l-1,n);p(t,a,i,o,this._compareMinY);for(let n=a;n<=i;n+=o){const s=Math.min(n+o-1,i);r.children.push(this._build(t,n,s,e-1))}}return a(r,this._toBBox),r}_chooseSubtree(t,i,n,e){for(;e.push(i),!0!==i.leaf&&e.length-1!==n;){let n,e=1/0,s=1/0;for(let h=0,a=i.children.length;h<a;h++){const a=i.children[h],r=m(a),o=u(t,a)-r;o<s?(s=o,e=r<e?r:e,n=a):o===s&&r<e&&(e=r,n=a)}i=n||i.children[0]}return i}_insert(t,i,n){const e=this._toBBox,s=n?t:e(t);X.clear();const h=this._chooseSubtree(s,this._data,i,X);for(h.children.push(t),o(h,s);i>=0&&X.data[i].children.length>this._maxEntries;)this._split(X,i),i--;this._adjustParentBBoxes(s,X,i)}_split(t,i){const n=t.data[i],e=n.children.length,s=this._minEntries;this._chooseSplitAxis(n,s,e);const h=this._chooseSplitIndex(n,s,e);if(!h)return void console.log("  Error: assertion failed at PooledRBush._split: no valid split index");const r=n.children.splice(h,n.children.length-h),o=n.leaf?new b(r):new j(r);o.height=n.height,a(n,this._toBBox),a(o,this._toBBox),i?t.data[i-1].children.push(o):this._splitRoot(n,o)}_splitRoot(t,i){this._data=new j([t,i]),this._data.height=t.height+1,a(this._data,this._toBBox)}_chooseSplitIndex(t,i,n){let e,s,h;e=s=1/0;for(let a=i;a<=n-i;a++){const i=r(t,0,a,this._toBBox),o=r(t,a,n,this._toBBox),l=_(i,o),c=m(i)+m(o);l<e?(e=l,h=a,s=c<s?c:s):l===e&&c<s&&(s=c,h=a)}return h}_chooseSplitAxis(t,i,n){const e=t.leaf?this._compareMinX:l,s=t.leaf?this._compareMinY:c;this._allDistMargin(t,i,n,e)<this._allDistMargin(t,i,n,s)&&t.children.sort(e)}_allDistMargin(t,i,n,e){t.children.sort(e);const s=this._toBBox,h=r(t,0,i,s),a=r(t,n-i,n,s);let l=d(h)+d(a);for(let r=i;r<n-i;r++){const i=t.children[r];o(h,t.leaf?s(i):i),l+=d(h)}for(let r=n-i-1;r>=i;r--){const i=t.children[r];o(a,t.leaf?s(i):i),l+=d(a)}return l}_adjustParentBBoxes(t,i,n){for(let e=n;e>=0;e--)o(i.data[e],t)}_condense(i){for(let n=i.length-1;n>=0;n--){const e=i.data[n];if(0===e.children.length)if(n>0){const s=i.data[n-1],h=s.children;h.splice((0,_arrayUtils_js__WEBPACK_IMPORTED_MODULE_0__.cq)(h,e,h.length,s.indexHint),1)}else this.clear();else a(e,this._toBBox)}}_initFormat(t){const i=["return a"," - b",";"];this._compareMinX=new Function("a","b",i.join(t[0])),this._compareMinY=new Function("a","b",i.join(t[1])),this._toBBox=new Function("a","return {minX: a"+t[0]+", minY: a"+t[1]+", maxX: a"+t[2]+", maxY: a"+t[3]+"};")}}function a(t,i){r(t,0,t.children.length,i,t)}function r(t,i,n,e,s){s||(s=new b([])),s.minX=1/0,s.minY=1/0,s.maxX=-1/0,s.maxY=-1/0;for(let h,a=i;a<n;a++)h=t.children[a],o(s,t.leaf?e(h):h);return s}function o(t,i){t.minX=Math.min(t.minX,i.minX),t.minY=Math.min(t.minY,i.minY),t.maxX=Math.max(t.maxX,i.maxX),t.maxY=Math.max(t.maxY,i.maxY)}function l(t,i){return t.minX-i.minX}function c(t,i){return t.minY-i.minY}function m(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function d(t){return t.maxX-t.minX+(t.maxY-t.minY)}function u(t,i){return(Math.max(i.maxX,t.maxX)-Math.min(i.minX,t.minX))*(Math.max(i.maxY,t.maxY)-Math.min(i.minY,t.minY))}function _(t,i){const n=Math.max(t.minX,i.minX),e=Math.max(t.minY,i.minY),s=Math.min(t.maxX,i.maxX),h=Math.min(t.maxY,i.maxY);return Math.max(0,s-n)*Math.max(0,h-e)}function x(t,i){return t.minX<=i.minX&&t.minY<=i.minY&&i.maxX<=t.maxX&&i.maxY<=t.maxY}function f(t,i){return i.minX<=t.maxX&&i.minY<=t.maxY&&i.maxX>=t.minX&&i.maxY>=t.minY}function p(t,i,e,h,a){const r=[i,e];for(;r.length;){const i=(0,_maybe_js__WEBPACK_IMPORTED_MODULE_3__.j0)(r.pop()),e=(0,_maybe_js__WEBPACK_IMPORTED_MODULE_3__.j0)(r.pop());if(i-e<=h)continue;const o=e+Math.ceil((i-e)/h/2)*h;(0,_chunks_quickselect_js__WEBPACK_IMPORTED_MODULE_2__.q)(t,o,e,i,a),r.push(e,o,o,i)}}const g=new _PooledArray_js__WEBPACK_IMPORTED_MODULE_1__.Z,M=new _PooledArray_js__WEBPACK_IMPORTED_MODULE_1__.Z,X=new _PooledArray_js__WEBPACK_IMPORTED_MODULE_1__.Z,Y=new _PooledArray_js__WEBPACK_IMPORTED_MODULE_1__.Z({deallocator:void 0});class w extends class B{constructor(){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0}}{constructor(){super(...arguments),this.height=1,this.indexHint=new _arrayUtils_js__WEBPACK_IMPORTED_MODULE_0__.SO}}class b extends w{constructor(t){super(),this.children=t,this.leaf=!0}}class j extends w{constructor(t){super(),this.children=t,this.leaf=!1}}},"./node_modules/@arcgis/core/geometry/support/MeshTransform.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>L});var T,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_19__=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),_core_JSONSupport_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/JSONSupport.js"),_core_maybe_js__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js")),_chunks_mat4_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/chunks/mat4.js"),_chunks_mat4f64_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@arcgis/core/chunks/mat4f64.js"),_chunks_quat_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@arcgis/core/chunks/quat.js"),_chunks_quatf64_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@arcgis/core/chunks/quatf64.js"),_chunks_vec3_js__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@arcgis/core/chunks/vec3.js"),_chunks_vec3f64_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@arcgis/core/chunks/vec3f64.js"),_Point_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/@arcgis/core/geometry/Point.js"),_projection_js__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("./node_modules/@arcgis/core/geometry/projection.js"),_projectionEllipsoid_js__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__("./node_modules/@arcgis/core/geometry/projectionEllipsoid.js"),_axisAngleDegrees_js__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/axisAngleDegrees.js"),_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/buffer/BufferView.js"),_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__("./node_modules/@arcgis/core/chunks/vec32.js"),_chunks_vec33_js__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__("./node_modules/@arcgis/core/chunks/vec33.js");let q=T=class extends _core_JSONSupport_js__WEBPACK_IMPORTED_MODULE_0__.wq{constructor(r){super(r),this.origin=(0,_chunks_vec3f64_js__WEBPACK_IMPORTED_MODULE_10__.c)(),this.translation=(0,_chunks_vec3f64_js__WEBPACK_IMPORTED_MODULE_10__.c)(),this.rotation=(0,_axisAngleDegrees_js__WEBPACK_IMPORTED_MODULE_14__.Ue)(),this.scale=(0,_chunks_vec3f64_js__WEBPACK_IMPORTED_MODULE_10__.f)(1,1,1),this.geographic=!0}get localMatrix(){const r=(0,_chunks_mat4f64_js__WEBPACK_IMPORTED_MODULE_6__.c)();return(0,_chunks_quat_js__WEBPACK_IMPORTED_MODULE_7__.s)(B,(0,_axisAngleDegrees_js__WEBPACK_IMPORTED_MODULE_14__.ZZ)(this.rotation),(0,_axisAngleDegrees_js__WEBPACK_IMPORTED_MODULE_14__.WH)(this.rotation)),(0,_chunks_mat4_js__WEBPACK_IMPORTED_MODULE_5__.g)(r,B,this.translation,this.scale),r}get localMatrixInverse(){return(0,_chunks_mat4_js__WEBPACK_IMPORTED_MODULE_5__.a)((0,_chunks_mat4f64_js__WEBPACK_IMPORTED_MODULE_6__.c)(),this.localMatrix)}applyLocal(r,o){return(0,_chunks_vec3_js__WEBPACK_IMPORTED_MODULE_9__.m)(o,r,this.localMatrix)}applyLocalInverse(r,o){return(0,_chunks_vec3_js__WEBPACK_IMPORTED_MODULE_9__.m)(o,r,this.localMatrixInverse)}project(r,o){const t=new Float64Array(r.length),s=_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_15__.fP.fromTypedArray(t),e=_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_15__.fP.fromTypedArray(r);if(this.geographic){const r=(0,_projectionEllipsoid_js__WEBPACK_IMPORTED_MODULE_13__.rS)(o),i=(0,_chunks_mat4f64_js__WEBPACK_IMPORTED_MODULE_6__.c)();return(0,_projection_js__WEBPACK_IMPORTED_MODULE_12__.Bm)(o,this.origin,i,r),(0,_chunks_mat4_js__WEBPACK_IMPORTED_MODULE_5__.m)(i,i,this.localMatrix),(0,_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_16__.t)(s,e,i),(0,_projection_js__WEBPACK_IMPORTED_MODULE_12__.CM)(t,r,0,t,o,0,t.length/3),t}const{localMatrix:i,origin:a}=this;(0,_chunks_mat4_js__WEBPACK_IMPORTED_MODULE_5__.h)(i,_chunks_mat4f64_js__WEBPACK_IMPORTED_MODULE_6__.I)?(0,_chunks_vec33_js__WEBPACK_IMPORTED_MODULE_17__.c)(s,e):(0,_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_16__.t)(s,e,i);for(let n=0;n<t.length;n+=3)t[n+0]+=a[0],t[n+1]+=a[1],t[n+2]+=a[2];return t}getOriginPoint(r){const[o,t,s]=this.origin;return new _Point_js__WEBPACK_IMPORTED_MODULE_11__.Z({x:o,y:t,z:s,spatialReference:r})}equals(r){return(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_18__.pC)(r)&&this.geographic===r.geographic&&(0,_chunks_vec3_js__WEBPACK_IMPORTED_MODULE_9__.k)(this.origin,r.origin)&&(0,_chunks_mat4_js__WEBPACK_IMPORTED_MODULE_5__.j)(this.localMatrix,r.localMatrix)}clone(){const r={origin:(0,_chunks_vec3f64_js__WEBPACK_IMPORTED_MODULE_10__.a)(this.origin),translation:(0,_chunks_vec3f64_js__WEBPACK_IMPORTED_MODULE_10__.a)(this.translation),rotation:(0,_axisAngleDegrees_js__WEBPACK_IMPORTED_MODULE_14__.Ue)(this.rotation),scale:(0,_chunks_vec3f64_js__WEBPACK_IMPORTED_MODULE_10__.a)(this.scale),geographic:this.geographic};return new T(r)}};(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_19__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:[Number],nonNullable:!0,json:{write:!0}})],q.prototype,"origin",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_19__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:[Number],nonNullable:!0,json:{write:!0}})],q.prototype,"translation",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_19__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:[Number],nonNullable:!0,json:{write:!0}})],q.prototype,"rotation",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_19__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:[Number],nonNullable:!0,json:{write:!0}})],q.prototype,"scale",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_19__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:Boolean,nonNullable:!0,json:{write:!0}})],q.prototype,"geographic",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_19__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)()],q.prototype,"localMatrix",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_19__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)()],q.prototype,"localMatrixInverse",null),q=T=(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_19__._)([(0,_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_4__.j)("esri.geometry.support.MeshTransform")],q);const B=(0,_chunks_quatf64_js__WEBPACK_IMPORTED_MODULE_8__.a)(),L=q},"./node_modules/@arcgis/core/geometry/support/axisAngleDegrees.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ue:()=>a,WH:()=>x,ZZ:()=>g,qC:()=>v,uT:()=>k});var _core_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/mathUtils.js"),_chunks_quat_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/chunks/quat.js"),_chunks_quatf64_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/chunks/quatf64.js"),_chunks_vec3_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/chunks/vec3.js");function a(n=b){return[n[0],n[1],n[2],n[3]]}function k(n,r,t=a()){return(0,_chunks_vec3_js__WEBPACK_IMPORTED_MODULE_3__.c)(t,n),t[3]=r,t}function v(r,c,f=a()){return(0,_chunks_quat_js__WEBPACK_IMPORTED_MODULE_1__.s)(d,r,x(r)),(0,_chunks_quat_js__WEBPACK_IMPORTED_MODULE_1__.s)(w,c,x(c)),(0,_chunks_quat_js__WEBPACK_IMPORTED_MODULE_1__.m)(d,w,d),function U(n,r){return n[3]=r,n}(f,(0,_core_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__.BV)((0,_chunks_quat_js__WEBPACK_IMPORTED_MODULE_1__.g)(f,d)))}function g(n){return n}function x(n){return(0,_core_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__.Vl)(n[3])}const b=[0,0,1,0],d=(0,_chunks_quatf64_js__WEBPACK_IMPORTED_MODULE_2__.a)(),w=(0,_chunks_quatf64_js__WEBPACK_IMPORTED_MODULE_2__.a)();a()},"./node_modules/@arcgis/core/geometry/support/meshUtils/ElevationSamplerWorker.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>n});var _core_has_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/has.js"),_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_core_libs_rbush_PooledRBush_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/libs/rbush/PooledRBush.js"),_georeference_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/meshUtils/georeference.js");class n{async createIndex(r,n){const o=new Array;if(!r.vertexAttributes||!r.vertexAttributes.position)return new _core_libs_rbush_PooledRBush_js__WEBPACK_IMPORTED_MODULE_1__.Q;const s=this._createMeshData(r),a=(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__.pC)(n)?await n.invoke("createIndexThread",s,{transferList:o}):this.createIndexThread(s).result;return this._createPooledRBush().fromJSON(a)}createIndexThread(e){const t=new Float64Array(e.position),r=this._createPooledRBush();return e.components?this._createIndexComponentsThread(r,t,e.components.map((e=>new Uint32Array(e)))):this._createIndexAllThread(r,t)}_createIndexAllThread(e,t){const r=new Array(t.length/9);let n=0;for(let s=0;s<t.length;s+=9)r[n++]=o(t,s+0,s+3,s+6);return e.load(r),{result:e.toJSON()}}_createIndexComponentsThread(e,t,r){let n=0;for(const o of r)n+=o.length/3;const s=new Array(n);let a=0;for(const i of r)for(let e=0;e<i.length;e+=3)s[a++]=o(t,3*i[e+0],3*i[e+1],3*i[e+2]);return e.load(s),{result:e.toJSON()}}_createMeshData(e){const t=(e.transform?(0,_georeference_js__WEBPACK_IMPORTED_MODULE_2__.I5)({position:e.vertexAttributes.position,normal:null,tangent:null},e.transform,e.spatialReference).position:e.vertexAttributes.position).buffer;return!e.components||e.components.some((e=>!e.faces))?{position:t}:{position:t,components:e.components.map((e=>e.faces))}}_createPooledRBush(){return new _core_libs_rbush_PooledRBush_js__WEBPACK_IMPORTED_MODULE_1__.Q(9,(0,_core_has_js__WEBPACK_IMPORTED_MODULE_0__.Z)("esri-csp-restrictions")?e=>e:[".minX",".minY",".maxX",".maxY"])}}function o(e,t,r,n){return{minX:Math.min(e[t+0],e[r+0],e[n+0]),maxX:Math.max(e[t+0],e[r+0],e[n+0]),minY:Math.min(e[t+1],e[r+1],e[n+1]),maxY:Math.max(e[t+1],e[r+1],e[n+1]),p0:[e[t+0],e[t+1],e[t+2]],p1:[e[r+0],e[r+1],e[r+2]],p2:[e[n+0],e[n+1],e[n+2]]}}},"./node_modules/@arcgis/core/geometry/support/meshUtils/geographicUtils.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{function r(r,e){return r.isGeographic||r.isWebMercator&&(e?.geographic??!0)}__webpack_require__.d(__webpack_exports__,{h:()=>r})},"./node_modules/@arcgis/core/geometry/support/meshUtils/georeference.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{FF:()=>b,I5:()=>k,Yq:()=>M,iv:()=>x,w1:()=>_});var _core_maybe_js__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_core_unitUtils_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/unitUtils.js"),_chunks_mat3f64_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/chunks/mat3f64.js"),_chunks_mat4_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/chunks/mat4.js"),_chunks_mat4f64_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/chunks/mat4f64.js"),_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/chunks/mat3.js"),_projection_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/geometry/projection.js"),_projectionEllipsoid_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@arcgis/core/geometry/projectionEllipsoid.js"),_MeshTransform_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/MeshTransform.js"),_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/buffer/BufferView.js"),_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@arcgis/core/chunks/vec32.js"),_geographicUtils_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/meshUtils/geographicUtils.js"),_projection_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/meshUtils/projection.js");function x(n,r,t){return(0,_geographicUtils_js__WEBPACK_IMPORTED_MODULE_11__.h)(r.spatialReference,t)?function B(n,r,t){const o=r.spatialReference,e=O(r,t,D),a=new Float64Array(n.position.length),i=function L(n,r,t,o){(0,_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_9__.t)(_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_8__.fP.fromTypedArray(o),_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_8__.fP.fromTypedArray(n),r);const e=new Float64Array(n.length);return(0,_projection_js__WEBPACK_IMPORTED_MODULE_10__.To)(o,e,t)}(n.position,e,o,a),l=(0,_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_4__.b)(I,e);return{position:i,normal:N(i,a,n.normal,l,o),tangent:S(i,a,n.tangent,l,o)}}(n,r,t):function P(n,r,t){const o=new Float64Array(n.position.length),e=n.position,a=r.x,i=r.y,l=r.z||0,{horizontal:s,vertical:f}=C(t?t.unit:null,r.spatialReference);for(let c=0;c<e.length;c+=3)o[c+0]=e[c+0]*s+a,o[c+1]=e[c+1]*s+i,o[c+2]=e[c+2]*f+l;return{position:o,normal:n.normal,tangent:n.tangent}}(n,r,t)}function k(t,o,e){const{position:a,normal:i,tangent:l}=t;if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_12__.Wi)(o))return{position:a,normal:i,tangent:l};const s=o.localMatrix;return x({position:(0,_projection_js__WEBPACK_IMPORTED_MODULE_10__.zZ)(a,new Float64Array(a.length),s),normal:(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_12__.pC)(i)?(0,_projection_js__WEBPACK_IMPORTED_MODULE_10__.w9)(i,new Float32Array(i.length),s):null,tangent:(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_12__.pC)(l)?(0,_projection_js__WEBPACK_IMPORTED_MODULE_10__.VS)(l,new Float32Array(l.length),s):null},o.getOriginPoint(e),{geographic:o.geographic})}function _(n,r,t){if(t?.useTransform){const{position:o,normal:e,tangent:a}=n;return{vertexAttributes:{position:o,normal:e,tangent:a},transform:new _MeshTransform_js__WEBPACK_IMPORTED_MODULE_7__.Z({origin:[r.x,r.y,r.z??0],geographic:(0,_geographicUtils_js__WEBPACK_IMPORTED_MODULE_11__.h)(r.spatialReference,t)})}}return{vertexAttributes:x(n,r,t),transform:null}}function b(n,r,t){return(0,_geographicUtils_js__WEBPACK_IMPORTED_MODULE_11__.h)(r.spatialReference,t)?G(n,r,t):Y(n,r,t)}function M(r,t,o,e){if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_12__.Wi)(t))return b(r,o,e);const a=k(r,t,o.spatialReference);return o.equals(t.getOriginPoint(o.spatialReference))?Y(a,o,e):(0,_geographicUtils_js__WEBPACK_IMPORTED_MODULE_11__.h)(o.spatialReference,e)?G(a,o,e):Y(a,o,e)}function N(r,t,o,e,a){if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_12__.Wi)(o))return null;const i=new Float32Array(o.length);return(0,_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_9__.a)(_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_8__.ct.fromTypedArray(i),_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_8__.ct.fromTypedArray(o),e),(0,_projection_js__WEBPACK_IMPORTED_MODULE_10__.Yk)(i,r,t,a,i),i}function S(r,t,o,e,a){if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_12__.Wi)(o))return null;const i=new Float32Array(o.length);(0,_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_9__.a)(_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_8__.ct.fromTypedArray(i,4*Float32Array.BYTES_PER_ELEMENT),_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_8__.ct.fromTypedArray(o,4*Float32Array.BYTES_PER_ELEMENT),e);for(let n=3;n<i.length;n+=4)i[n]=o[n];return(0,_projection_js__WEBPACK_IMPORTED_MODULE_10__.M2)(i,r,t,a,i),i}function Y(n,r,t){const o=new Float64Array(n.position.length),e=n.position,a=r.x,i=r.y,l=r.z||0,{horizontal:s,vertical:f}=C(t?t.unit:null,r.spatialReference);for(let c=0;c<e.length;c+=3)o[c+0]=(e[c+0]-a)/s,o[c+1]=(e[c+1]-i)/s,o[c+2]=(e[c+2]-l)/f;return{position:o,normal:n.normal,tangent:n.tangent}}function G(n,r,t){const o=r.spatialReference;O(r,t,D);const e=(0,_chunks_mat4_js__WEBPACK_IMPORTED_MODULE_2__.a)(H,D),a=new Float64Array(n.position.length),l=function U(n,r,t,o){const e=(0,_projection_js__WEBPACK_IMPORTED_MODULE_10__.XO)(n,r,o),a=_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_8__.fP.fromTypedArray(e),i=new Float64Array(e.length),l=_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_8__.fP.fromTypedArray(i);return(0,_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_9__.t)(l,a,t),i}(n.position,o,e,a),s=(0,_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_4__.b)(I,e);return{position:l,normal:q(n.normal,n.position,a,o,s),tangent:V(n.tangent,n.position,a,o,s)}}function O(n,r,t){(0,_projection_js__WEBPACK_IMPORTED_MODULE_5__.Bm)(n.spatialReference,[n.x,n.y,n.z||0],t,(0,_projectionEllipsoid_js__WEBPACK_IMPORTED_MODULE_6__.rS)(n.spatialReference));const{horizontal:o,vertical:e}=C(r?r.unit:null,n.spatialReference);return(0,_chunks_mat4_js__WEBPACK_IMPORTED_MODULE_2__.k)(t,t,[o,o,e]),t}function q(r,t,o,e,a){if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_12__.Wi)(r))return null;const i=(0,_projection_js__WEBPACK_IMPORTED_MODULE_10__.Iz)(r,t,o,e,new Float32Array(r.length)),l=_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_8__.ct.fromTypedArray(i);return(0,_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_9__.a)(l,l,a),i}function V(r,t,o,e,a){if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_12__.Wi)(r))return null;const i=(0,_projection_js__WEBPACK_IMPORTED_MODULE_10__.wi)(r,t,o,e,new Float32Array(r.length)),l=_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_8__.ct.fromTypedArray(i,4*Float32Array.BYTES_PER_ELEMENT);return(0,_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_9__.a)(l,l,a),i}function C(r,a){if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_12__.Wi)(r))return J;const i=a.isGeographic?1:(0,_core_unitUtils_js__WEBPACK_IMPORTED_MODULE_0__.c9)(a),l=a.isGeographic?1:(0,_core_unitUtils_js__WEBPACK_IMPORTED_MODULE_0__._R)(a),s=(0,_core_unitUtils_js__WEBPACK_IMPORTED_MODULE_0__.En)(1,r,"meters");return{horizontal:s*i,vertical:s*l}}const D=(0,_chunks_mat4f64_js__WEBPACK_IMPORTED_MODULE_3__.c)(),H=(0,_chunks_mat4f64_js__WEBPACK_IMPORTED_MODULE_3__.c)(),I=(0,_chunks_mat3f64_js__WEBPACK_IMPORTED_MODULE_1__.c)(),J={horizontal:1,vertical:1}},"./node_modules/@arcgis/core/geometry/support/meshUtils/projection.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Iz:()=>j,M2:()=>L,To:()=>O,VS:()=>V,XO:()=>M,Yk:()=>h,w9:()=>v,wi:()=>k,zZ:()=>R});var _core_Logger_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/Logger.js"),_core_maybe_js__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/chunks/mat3.js"),_chunks_mat3f64_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/chunks/mat3f64.js"),_chunks_mat4f64_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/chunks/mat4f64.js"),_chunks_vec3_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/chunks/vec3.js"),_chunks_vec3f64_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/chunks/vec3f64.js"),_projection_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@arcgis/core/geometry/projection.js"),_projectionEllipsoid_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@arcgis/core/geometry/projectionEllipsoid.js"),_spatialReferenceUtils_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/spatialReferenceUtils.js"),_webMercatorUtils_js__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/webMercatorUtils.js"),_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/buffer/BufferView.js"),_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/@arcgis/core/chunks/vec32.js");const g=_core_Logger_js__WEBPACK_IMPORTED_MODULE_0__.Z.getLogger("esri.geometry.support.meshUtils.normalProjection");function j(r,e,o,t,n){return B(t)?(b(Y.TO_PCPF,_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.ct.fromTypedArray(r),_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.fP.fromTypedArray(e),_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.fP.fromTypedArray(o),t,_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.ct.fromTypedArray(n)),n):(g.error("Cannot convert spatial reference to PCPF"),n)}function h(r,e,o,t,n){return B(t)?(b(Y.FROM_PCPF,_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.ct.fromTypedArray(r),_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.fP.fromTypedArray(e),_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.fP.fromTypedArray(o),t,_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.ct.fromTypedArray(n)),n):(g.error("Cannot convert to spatial reference from PCPF"),n)}function M(r,e,o){return(0,_projection_js__WEBPACK_IMPORTED_MODULE_6__.CM)(r,e,0,o,(0,_projectionEllipsoid_js__WEBPACK_IMPORTED_MODULE_7__.rS)(e),0,r.length/3),o}function O(r,e,o){return(0,_projection_js__WEBPACK_IMPORTED_MODULE_6__.CM)(r,(0,_projectionEllipsoid_js__WEBPACK_IMPORTED_MODULE_7__.rS)(o),0,e,o,0,r.length/3),e}function R(r,o,t){if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_12__.Wi)(r))return o;const n=_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.fP.fromTypedArray(r),f=_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.fP.fromTypedArray(o);return(0,_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_11__.t)(f,n,t),o}function v(r,n,f){if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_12__.Wi)(r))return n;(0,_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_1__.b)(x,f);const a=_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.ct.fromTypedArray(r),c=_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.ct.fromTypedArray(n);return(0,_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_11__.a)(c,a,x),(0,_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_1__.i)(x)||(0,_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_11__.n)(c,c),n}function V(r,n,f){if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_12__.Wi)(r))return n;(0,_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_1__.b)(x,f);const a=_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.ct.fromTypedArray(r,4*Float32Array.BYTES_PER_ELEMENT),c=_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.ct.fromTypedArray(n,4*Float32Array.BYTES_PER_ELEMENT);if((0,_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_11__.a)(c,a,x),(0,_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_1__.i)(x)||(0,_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_11__.n)(c,c),r!==n)for(let e=3;e<r.length;e+=4)n[e]=r[e];return n}function k(r,e,o,t,n){if(!B(t))return g.error("Cannot convert spatial reference to PCPF"),n;b(Y.TO_PCPF,_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.ct.fromTypedArray(r,4*Float32Array.BYTES_PER_ELEMENT),_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.fP.fromTypedArray(e),_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.fP.fromTypedArray(o),t,_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.ct.fromTypedArray(n,4*Float32Array.BYTES_PER_ELEMENT));for(let f=3;f<r.length;f+=4)n[f]=r[f];return n}function L(r,e,o,t,n){if(!B(t))return g.error("Cannot convert to spatial reference from PCPF"),n;b(Y.FROM_PCPF,_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.ct.fromTypedArray(r,16),_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.fP.fromTypedArray(e),_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.fP.fromTypedArray(o),t,_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_10__.ct.fromTypedArray(n,16));for(let f=3;f<r.length;f+=4)n[f]=r[f];return n}function b(r,e,o,t,a,c){if(!e)return;const i=o.count,y=(0,_projectionEllipsoid_js__WEBPACK_IMPORTED_MODULE_7__.rS)(a);if(S(a))for(let s=0;s<i;s++)t.getVec(s,U),e.getVec(s,w),(0,_projection_js__WEBPACK_IMPORTED_MODULE_6__.Bm)(y,U,W,y),(0,_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_1__.f)(x,W),r===Y.FROM_PCPF&&(0,_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_1__.t)(x,x),(0,_chunks_vec3_js__WEBPACK_IMPORTED_MODULE_4__.t)(w,w,x),c.setVec(s,w);else for(let u=0;u<i;u++){t.getVec(u,U),e.getVec(u,w),(0,_projection_js__WEBPACK_IMPORTED_MODULE_6__.Bm)(y,U,W,y),(0,_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_1__.f)(x,W);const a=(0,_webMercatorUtils_js__WEBPACK_IMPORTED_MODULE_9__.mZ)(o.get(u,1));let i=Math.cos(a);r===Y.TO_PCPF&&(i=1/i),x[0]*=i,x[1]*=i,x[2]*=i,x[3]*=i,x[4]*=i,x[5]*=i,r===Y.FROM_PCPF&&(0,_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_1__.t)(x,x),(0,_chunks_vec3_js__WEBPACK_IMPORTED_MODULE_4__.t)(w,w,x),(0,_chunks_vec3_js__WEBPACK_IMPORTED_MODULE_4__.n)(w,w),c.setVec(u,w)}return c}function B(r){return S(r)||function N(r){return r.isWebMercator}(r)}function S(r){return r.isWGS84||(0,_spatialReferenceUtils_js__WEBPACK_IMPORTED_MODULE_8__.yW)(r)||(0,_spatialReferenceUtils_js__WEBPACK_IMPORTED_MODULE_8__.BZ)(r)||(0,_spatialReferenceUtils_js__WEBPACK_IMPORTED_MODULE_8__.V2)(r)}var Y,r;(r=Y||(Y={}))[r.TO_PCPF=0]="TO_PCPF",r[r.FROM_PCPF=1]="FROM_PCPF";const U=(0,_chunks_vec3f64_js__WEBPACK_IMPORTED_MODULE_5__.c)(),w=(0,_chunks_vec3f64_js__WEBPACK_IMPORTED_MODULE_5__.c)(),W=(0,_chunks_mat4f64_js__WEBPACK_IMPORTED_MODULE_3__.c)(),x=(0,_chunks_mat3f64_js__WEBPACK_IMPORTED_MODULE_2__.c)()}}]);