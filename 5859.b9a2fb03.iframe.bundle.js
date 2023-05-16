"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[5859],{"./node_modules/@arcgis/core/core/CircularArray.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>s});var _maybe_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js");class s{constructor(t){this.size=0,this._start=0,this.maxSize=t,this._buffer=new Array(t)}get entries(){return this._buffer}enqueue(t){if(this.size===this.maxSize){const s=this._buffer[this._start];return this._buffer[this._start]=t,this._start=(this._start+1)%this.maxSize,s}return this._buffer[(this._start+this.size++)%this.maxSize]=t,null}dequeue(){if(0===this.size)return null;const t=this._buffer[this._start];return this._buffer[this._start]=null,this.size--,this._start=(this._start+1)%this.maxSize,t}peek(){return 0===this.size?null:this._buffer[this._start]}find(s){if(0===this.size)return null;for(const e of this._buffer)if((0,_maybe_js__WEBPACK_IMPORTED_MODULE_0__.pC)(e)&&s(e))return e;return null}clear(s){let e=this.dequeue();for(;(0,_maybe_js__WEBPACK_IMPORTED_MODULE_0__.pC)(e);)s&&s(e),e=this.dequeue()}}},"./node_modules/@arcgis/core/layers/graphics/data/spatialQuerySupport.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{hN:()=>I,P0:()=>P,cW:()=>v});var Error=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),contains=__webpack_require__("./node_modules/@arcgis/core/geometry/support/contains.js"),intersectsBase=__webpack_require__("./node_modules/@arcgis/core/geometry/support/intersectsBase.js");var jsonUtils=__webpack_require__("./node_modules/@arcgis/core/geometry/support/jsonUtils.js"),spatialReferenceUtils=__webpack_require__("./node_modules/@arcgis/core/geometry/support/spatialReferenceUtils.js");function n(n,t){return n?t?4:3:t?3:2}function contains_r(t,r,e,c,u,f){const s=n(u,f),{coords:i,lengths:l}=c;if(!l)return!1;for(let n=0,d=0;n<l.length;n++,d+=s)if(!o(t,r,e,i[d],i[d+1]))return!1;return!0}function o(t,r,o,c,u){if(!t)return!1;const f=n(r,o),{coords:s,lengths:i}=t;let l=!1,d=0;for(const n of i)l=e(l,s,f,d,n,c,u),d+=n*f;return l}function e(n,t,r,o,e,c,u){let f=n,s=o;for(let i=o,l=o+e*r;i<l;i+=r){s=i+r,s===l&&(s=o);const n=t[i],e=t[i+1],d=t[s],g=t[s+1];(e<u&&g>=u||g<u&&e>=u)&&n+(u-e)/(g-e)*(d-n)<c&&(f=!f)}return f}var featureConversionUtils=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/featureConversionUtils.js"),OptimizedGeometry=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/OptimizedGeometry.js"),projectionSupport=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/data/projectionSupport.js"),utils=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/data/utils.js");const c="feature-store:unsupported-query",R={esriSpatialRelIntersects:"intersects",esriSpatialRelContains:"contains",esriSpatialRelCrosses:"crosses",esriSpatialRelDisjoint:"disjoint",esriSpatialRelEnvelopeIntersects:"intersects",esriSpatialRelIndexIntersects:null,esriSpatialRelOverlaps:"overlaps",esriSpatialRelTouches:"touches",esriSpatialRelWithin:"within",esriSpatialRelRelation:null},S={spatialRelationship:{esriSpatialRelIntersects:!0,esriSpatialRelContains:!0,esriSpatialRelWithin:!0,esriSpatialRelCrosses:!0,esriSpatialRelDisjoint:!0,esriSpatialRelTouches:!0,esriSpatialRelOverlaps:!0,esriSpatialRelEnvelopeIntersects:!0,esriSpatialRelIndexIntersects:!1,esriSpatialRelRelation:!1},queryGeometry:{esriGeometryPoint:!0,esriGeometryMultipoint:!0,esriGeometryPolyline:!0,esriGeometryPolygon:!0,esriGeometryEnvelope:!0},layerGeometry:{esriGeometryPoint:!0,esriGeometryMultipoint:!0,esriGeometryPolyline:!0,esriGeometryPolygon:!0,esriGeometryEnvelope:!1}};function v(e,n,l,y,c){if((0,jsonUtils.oU)(n)&&"esriGeometryPoint"===l&&("esriSpatialRelIntersects"===e||"esriSpatialRelContains"===e)){const e=(0,featureConversionUtils.Uy)(new OptimizedGeometry.Z,n,!1,!1);return Promise.resolve((r=>function t(n,t,r,e){return o(n,t,r,e.coords[0],e.coords[1])}(e,!1,!1,r)))}if((0,jsonUtils.oU)(n)&&"esriGeometryMultipoint"===l){const r=(0,featureConversionUtils.Uy)(new OptimizedGeometry.Z,n,!1,!1);if("esriSpatialRelContains"===e)return Promise.resolve((e=>contains_r(r,!1,!1,e,y,c)))}if((0,jsonUtils.YX)(n)&&"esriGeometryPoint"===l&&("esriSpatialRelIntersects"===e||"esriSpatialRelContains"===e))return Promise.resolve((e=>(0,contains.aV)(n,(0,utils.Op)(l,y,c,e))));if((0,jsonUtils.YX)(n)&&"esriGeometryMultipoint"===l&&"esriSpatialRelContains"===e)return Promise.resolve((e=>(0,contains.lQ)(n,(0,utils.Op)(l,y,c,e))));if((0,jsonUtils.YX)(n)&&"esriSpatialRelIntersects"===e){const e=function s(s){return"mesh"===s?intersectsBase.h_:(0,intersectsBase.IY)(s)}(l);return Promise.resolve((r=>e(n,(0,utils.Op)(l,y,c,r))))}return function h(){return Promise.all([__webpack_require__.e(9067),__webpack_require__.e(3296)]).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/geometry/geometryEngineJSON.js"))}().then((r=>{const t=r[R[e]].bind(null,n.spatialReference,n);return e=>t((0,utils.Op)(l,y,c,e))}))}async function P(r,t,i){const{spatialRel:s,geometry:o}=r;if(o){if(!function G(e){return null!=e&&!0===S.spatialRelationship[e]}(s))throw new Error.Z(c,"Unsupported query spatial relationship",{query:r});if((0,spatialReferenceUtils.JY)(o.spatialReference)&&(0,spatialReferenceUtils.JY)(i)){if(!function g(e){return null!=e&&!0===S.queryGeometry[(0,jsonUtils.Ji)(e)]}(o))throw new Error.Z(c,"Unsupported query geometry type",{query:r});if(!function j(e){return null!=e&&!0===S.layerGeometry[e]}(t))throw new Error.Z(c,"Unsupported layer geometry type",{query:r});if(r.outSR)return(0,projectionSupport._W)(r.geometry&&r.geometry.spatialReference,r.outSR)}}}function I(e){if((0,jsonUtils.YX)(e))return!0;if((0,jsonUtils.oU)(e)){for(const r of e.rings){if(5!==r.length)return!1;if(r[0][0]!==r[1][0]||r[0][0]!==r[4][0]||r[2][0]!==r[3][0]||r[0][1]!==r[3][1]||r[0][1]!==r[4][1]||r[1][1]!==r[2][1])return!1}return!0}return!1}},"./node_modules/@arcgis/core/layers/graphics/data/timeSupport.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{async function t(t,n){if(!t)return null;const e=n.featureAdapter,{startTimeField:u,endTimeField:l}=t;let r=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;if(u&&l)await n.forEach((t=>{const n=e.getAttribute(t,u),a=e.getAttribute(t,l);null==n||isNaN(n)||(r=Math.min(r,n)),null==a||isNaN(a)||(i=Math.max(i,a))}));else{const t=u||l;await n.forEach((n=>{const u=e.getAttribute(n,t);null==u||isNaN(u)||(r=Math.min(r,u),i=Math.max(i,u))}))}return{start:r,end:i}}function n(t,n,r){if(!n||!t)return null;const{startTimeField:i,endTimeField:a}=t;if(!i&&!a)return null;const{start:o,end:s}=n;return null===o&&null===s?null:void 0===o&&void 0===s?()=>!1:i&&a?function e(t,n,e,u,l){return null!=u&&null!=l?r=>{const i=t.getAttribute(r,n),a=t.getAttribute(r,e);return(null==i||i<=l)&&(null==a||a>=u)}:null!=u?n=>{const l=t.getAttribute(n,e);return null==l||l>=u}:null!=l?e=>{const u=t.getAttribute(e,n);return null==u||u<=l}:void 0}(r,i,a,o,s):function u(t,n,e,u){return null!=e&&null!=u&&e===u?u=>t.getAttribute(u,n)===e:null!=e&&null!=u?l=>{const r=t.getAttribute(l,n);return r>=e&&r<=u}:null!=e?u=>t.getAttribute(u,n)>=e:null!=u?e=>t.getAttribute(e,n)<=u:void 0}(r,i||a,o,s)}__webpack_require__.d(__webpack_exports__,{R:()=>t,y:()=>n})},"./node_modules/@arcgis/core/layers/graphics/data/utils.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{EG:()=>b,Op:()=>v,S2:()=>E,Up:()=>z,j6:()=>J,vF:()=>F});var _core_jsonMap_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/jsonMap.js"),_core_maybe_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_core_unitUtils_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/unitUtils.js"),_geometry_projection_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/geometry/projection.js"),_geometry_support_extentUtils_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/extentUtils.js"),_geometry_support_jsonUtils_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/jsonUtils.js"),_geometry_support_normalizeUtils_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/normalizeUtils.js"),_geometry_support_spatialReferenceUtils_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/spatialReferenceUtils.js"),_featureConversionUtils_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/featureConversionUtils.js"),_OptimizedGeometry_js__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/OptimizedGeometry.js"),_projectionSupport_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/data/projectionSupport.js");const O=new _core_jsonMap_js__WEBPACK_IMPORTED_MODULE_0__.X({esriSRUnit_Meter:"meters",esriSRUnit_Kilometer:"kilometers",esriSRUnit_Foot:"feet",esriSRUnit_StatuteMile:"miles",esriSRUnit_NauticalMile:"nautical-miles",esriSRUnit_USNauticalMile:"us-nautical-miles"}),F=Object.freeze({}),N=new _OptimizedGeometry_js__WEBPACK_IMPORTED_MODULE_9__.Z,_=new _OptimizedGeometry_js__WEBPACK_IMPORTED_MODULE_9__.Z,G=new _OptimizedGeometry_js__WEBPACK_IMPORTED_MODULE_9__.Z,P={esriGeometryPoint:_featureConversionUtils_js__WEBPACK_IMPORTED_MODULE_7__.fQ,esriGeometryPolyline:_featureConversionUtils_js__WEBPACK_IMPORTED_MODULE_7__.J6,esriGeometryPolygon:_featureConversionUtils_js__WEBPACK_IMPORTED_MODULE_7__.eG,esriGeometryMultipoint:_featureConversionUtils_js__WEBPACK_IMPORTED_MODULE_7__.Iv};function b(e,i,r,n=e.hasZ,o=e.hasM){if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_10__.Wi)(i))return null;const s=e.hasZ&&n,a=e.hasM&&o;if(r){const t=(0,_featureConversionUtils_js__WEBPACK_IMPORTED_MODULE_7__.Nh)(G,i,e.hasZ,e.hasM,"esriGeometryPoint",r,n,o);return(0,_featureConversionUtils_js__WEBPACK_IMPORTED_MODULE_7__.fQ)(t,s,a)}return(0,_featureConversionUtils_js__WEBPACK_IMPORTED_MODULE_7__.fQ)(i,s,a)}function v(e,r,n,o,s,a,l=r,m=n){const f=r&&l,u=n&&m,c=(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_10__.pC)(o)?"coords"in o?o:o.geometry:null;if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_10__.Wi)(c))return null;if(s){let t=(0,_featureConversionUtils_js__WEBPACK_IMPORTED_MODULE_7__.zj)(_,c,r,n,e,s,l,m);return a&&(t=(0,_featureConversionUtils_js__WEBPACK_IMPORTED_MODULE_7__.Nh)(G,t,f,u,e,a)),P[e]?.(t,f,u)??null}if(a){const t=(0,_featureConversionUtils_js__WEBPACK_IMPORTED_MODULE_7__.Nh)(G,c,r,n,e,a,l,m);return P[e]?.(t,f,u)??null}return(0,_featureConversionUtils_js__WEBPACK_IMPORTED_MODULE_7__.hY)(N,c,r,n,l,m),P[e]?.(N,f,u)??null}async function z(e,t,i){const{outFields:r,orderByFields:n,groupByFieldsForStatistics:o,outStatistics:s}=e;if(r)for(let a=0;a<r.length;a++)r[a]=r[a].trim();if(n)for(let a=0;a<n.length;a++)n[a]=n[a].trim();if(o)for(let a=0;a<o.length;a++)o[a]=o[a].trim();if(s)for(let a=0;a<s.length;a++)s[a].onStatisticField&&(s[a].onStatisticField=s[a].onStatisticField.trim());return e.geometry&&!e.outSR&&(e.outSR=e.geometry.spatialReference),J(e,t,i)}async function J(e,i,r){if(!e)return null;let{where:n}=e;if(e.where=n=n&&n.trim(),(!n||/^1 *= *1$/.test(n)||i&&i===n)&&(e.where=null),!e.geometry)return e;let a=await async function Z(e){const{distance:t,units:i}=e,n=e.geometry;if(null==t||"vertexAttributes"in n)return n;const o=n.spatialReference,s=i?O.fromJSON(i):(0,_core_unitUtils_js__WEBPACK_IMPORTED_MODULE_1__.qE)(o),a=o&&((0,_geometry_support_spatialReferenceUtils_js__WEBPACK_IMPORTED_MODULE_6__.sT)(o)||(0,_geometry_support_spatialReferenceUtils_js__WEBPACK_IMPORTED_MODULE_6__.sS)(o))?n:await(0,_projectionSupport_js__WEBPACK_IMPORTED_MODULE_8__._W)(o,_geometry_support_spatialReferenceUtils_js__WEBPACK_IMPORTED_MODULE_6__.Zn).then((()=>(0,_projectionSupport_js__WEBPACK_IMPORTED_MODULE_8__.iV)(n,_geometry_support_spatialReferenceUtils_js__WEBPACK_IMPORTED_MODULE_6__.Zn)));return(await async function q(){return(await Promise.all([__webpack_require__.e(9067),__webpack_require__.e(3296)]).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/geometry/geometryEngineJSON.js"))).geodesicBuffer}())(a.spatialReference,a,t,s)}(e);if(e.distance=0,e.units=null,"esriSpatialRelEnvelopeIntersects"===e.spatialRel){const{spatialReference:t}=e.geometry;a=(0,_geometry_support_extentUtils_js__WEBPACK_IMPORTED_MODULE_3__.aO)(a),a.spatialReference=t}if(a){await(0,_projectionSupport_js__WEBPACK_IMPORTED_MODULE_8__._W)(a.spatialReference,r),a=function B(e,t){const i=e.spatialReference;return A(e,t)&&(0,_geometry_support_jsonUtils_js__WEBPACK_IMPORTED_MODULE_4__.YX)(e)?{spatialReference:i,rings:[[[e.xmin,e.ymin],[e.xmin,e.ymax],[e.xmax,e.ymax],[e.xmax,e.ymin],[e.xmin,e.ymin]]]}:e}(a,r);const i=(await(0,_geometry_support_normalizeUtils_js__WEBPACK_IMPORTED_MODULE_5__.aX)((0,_geometry_support_jsonUtils_js__WEBPACK_IMPORTED_MODULE_4__.im)(a)))[0];if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_10__.Wi)(i))throw F;const n="quantizationParameters"in e&&e.quantizationParameters?.tolerance||"maxAllowableOffset"in e&&e.maxAllowableOffset||0,o=n&&A(a,r)?{densificationStep:8*n}:void 0,l=i.toJSON(),m=await(0,_projectionSupport_js__WEBPACK_IMPORTED_MODULE_8__.iV)(l,l.spatialReference,r,o);if(!m)throw F;m.spatialReference=r,e.geometry=m}return e}function A(e,t){if(!e)return!1;const i=e.spatialReference;return((0,_geometry_support_jsonUtils_js__WEBPACK_IMPORTED_MODULE_4__.YX)(e)||(0,_geometry_support_jsonUtils_js__WEBPACK_IMPORTED_MODULE_4__.oU)(e)||(0,_geometry_support_jsonUtils_js__WEBPACK_IMPORTED_MODULE_4__.l9)(e))&&!(0,_geometry_support_spatialReferenceUtils_js__WEBPACK_IMPORTED_MODULE_6__.fS)(i,t)&&!(0,_geometry_projection_js__WEBPACK_IMPORTED_MODULE_2__.Up)(i,t)}function E(e){return e&&k in e?JSON.parse(JSON.stringify(e,C)):e}const k="_geVersion",C=(e,t)=>e!==k?t:void 0},"./node_modules/@arcgis/core/views/2d/layers/features/FeatureStore2D.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>p,p:()=>g});var _core_CircularArray_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@arcgis/core/core/CircularArray.js"),_core_Evented_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/Evented.js"),_core_maybe_js__WEBPACK_IMPORTED_MODULE_7__=(__webpack_require__("./node_modules/@arcgis/core/core/has.js"),__webpack_require__("./node_modules/@arcgis/core/core/maybe.js")),_chunks_rbush_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/chunks/rbush.js"),_geometry_support_aaBoundingBox_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/aaBoundingBox.js"),_Store2D_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/views/2d/layers/features/Store2D.js"),_support_FeatureSetReaderPBFIndirect_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/views/2d/layers/features/support/FeatureSetReaderPBFIndirect.js");const c=(0,_geometry_support_aaBoundingBox_js__WEBPACK_IMPORTED_MODULE_3__.Ue)();function I(t,e){return t<<16|e}function u(t){return(4294901760&t)>>>16}function l(t){return 65535&t}const p={getObjectId:t=>t.getObjectId(),getAttributes:t=>t.readAttributes(),getAttribute:(t,e)=>t.readAttribute(e),cloneWithGeometry:(t,e)=>t,getGeometry:t=>t.readHydratedGeometry(),getCentroid:(t,e)=>t.readCentroid()};class g extends _Store2D_js__WEBPACK_IMPORTED_MODULE_4__.J{constructor(s,a,r){super(s,a),this.featureAdapter=p,this.events=new _core_Evented_js__WEBPACK_IMPORTED_MODULE_0__.Z,this._featureSetsByInstance=new Map,this._objectIdToDisplayId=new Map,this._spatialIndexInvalid=!0,this._indexSearchCache=new _core_CircularArray_js__WEBPACK_IMPORTED_MODULE_6__.Z(50),this._index=(0,_chunks_rbush_js__WEBPACK_IMPORTED_MODULE_2__.r)(9,(t=>({minX:this._storage.getXMin(t),minY:this._storage.getYMin(t),maxX:this._storage.getXMax(t),maxY:this._storage.getYMax(t)}))),this.mode=r}get storeStatistics(){let t=0,e=0,s=0;return this.forEach((a=>{const r=a.readGeometry();r&&(e+=r.isPoint?1:r.lengths.reduce(((t,e)=>t+e),0),s+=r.isPoint?1:r.lengths.length,t+=1)})),{featureCount:t,vertexCount:e,ringCount:s}}hasInstance(t){return this._featureSetsByInstance.has(t)}onTileData(t,e){if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_7__.Wi)(e.addOrUpdate))return e;if(e.addOrUpdate.attachStorage(this._storage),"snapshot"===this.mode){const s=e.addOrUpdate.getCursor();for(;s.next();){const e=s.getDisplayId();this.setComputedAttributes(this._storage,s,e,t.scale)}return e}this._featureSetsByInstance.set(e.addOrUpdate.instance,e.addOrUpdate);const a=e.addOrUpdate.getCursor();for(;a.next();)this._insertFeature(a,t.scale);return this._spatialIndexInvalid=!0,this.events.emit("changed"),e}search(t){this._rebuildIndex();const e=t.id,s=this._indexSearchCache.find((t=>t.tileId===e));if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_7__.pC)(s))return s.readers;const r=new Map,n=this._searchIndex(t.bounds),i=[];for(const a of n){const t=this._storage.getInstanceId(a),e=u(t),s=l(t);r.has(e)||r.set(e,[]),r.get(e).push(s)}return r.forEach(((t,e)=>{const s=this._featureSetsByInstance.get(e);i.push(_support_FeatureSetReaderPBFIndirect_js__WEBPACK_IMPORTED_MODULE_5__.t.from(s,t))})),this._indexSearchCache.enqueue({tileId:e,readers:i}),i}insert(t){const e=t.getCursor(),s=this._storage;for(;e.next();){const t=I(e.instance,e.getIndex()),a=e.getObjectId(),r=this._objectIdToDisplayId.get(a)??this._storage.createDisplayId();e.setDisplayId(r),s.setInstanceId(r,t),this._objectIdToDisplayId.set(a,r)}this._featureSetsByInstance.set(t.instance,t),this._spatialIndexInvalid=!0}remove(t){const e=this._objectIdToDisplayId.get(t);if(!e)return;const s=this._storage.getInstanceId(e),a=l(s),r=u(s),n=this._featureSetsByInstance.get(r);this._objectIdToDisplayId.delete(t),this._storage.releaseDisplayId(e),n.removeAtIndex(a),n.isEmpty&&this._featureSetsByInstance.delete(r),this._spatialIndexInvalid=!0}forEach(t){this._objectIdToDisplayId.forEach((e=>{const s=this._storage.getInstanceId(e),a=this._lookupFeature(s);t(a)}))}forEachUnsafe(t){this._objectIdToDisplayId.forEach((e=>{const s=this._storage.getInstanceId(e),a=u(s),r=l(s),n=this._getFeatureSet(a);n.setIndex(r),t(n)}))}forEachInBounds(t,e){const s=this._searchIndex(t);for(const a of s){const t=this.lookupFeatureByDisplayId(a,this._storage);e((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_7__.Wg)(t))}}forEachBounds(t,e){this._rebuildIndex();for(const s of t){if(!s.readGeometry())continue;const t=s.getDisplayId();(0,_geometry_support_aaBoundingBox_js__WEBPACK_IMPORTED_MODULE_3__.bZ)(c,this._storage.getXMin(t),this._storage.getYMin(t),this._storage.getXMax(t),this._storage.getYMax(t)),e(c)}}sweepFeatures(t,e,s){this._spatialIndexInvalid=!0,this._objectIdToDisplayId.forEach(((a,r)=>{t.has(a)||(e.releaseDisplayId(a),s&&s.unsetAttributeData(a),this._objectIdToDisplayId.delete(r))})),this.events.emit("changed")}sweepFeatureSets(t){this._spatialIndexInvalid=!0,this._featureSetsByInstance.forEach(((e,s)=>{t.has(s)||this._featureSetsByInstance.delete(s)}))}lookupObjectId(t,e){const a=this.lookupFeatureByDisplayId(t,e);return(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_7__.Wi)(a)?null:a.getObjectId()}lookupDisplayId(t){return this._objectIdToDisplayId.get(t)}lookupFeatureByDisplayId(t,e){const s=e.getInstanceId(t);return this._lookupFeature(s)}lookupByDisplayIdUnsafe(t){const e=this._storage.getInstanceId(t),s=u(e),a=l(e),r=this._getFeatureSet(s);return r?(r.setIndex(a),r):null}_insertFeature(t,e){const s=this._storage,a=t.getObjectId(),r=I(t.instance,t.getIndex());s.getInstanceId(t.getDisplayId());let n=this._objectIdToDisplayId.get(a);n||(n=s.createDisplayId(),this._objectIdToDisplayId.set(a,n),this._spatialIndexInvalid=!0),t.setDisplayId(n),s.setInstanceId(n,r),this.setComputedAttributes(s,t,n,e)}_searchIndex(t){this._rebuildIndex();const e={minX:t[0],minY:t[1],maxX:t[2],maxY:t[3]};return this._index.search(e)}_rebuildIndex(){if(!this._spatialIndexInvalid)return;const t=[];"snapshot"===this.mode?this._featureSetsByInstance.forEach((e=>{const s=e.getCursor();for(;s.next();){const e=s.getDisplayId();this._storage.setBounds(e,s)&&t.push(e)}})):this._objectIdToDisplayId.forEach((e=>{const s=this._storage.getInstanceId(e);this._storage.setBounds(e,this._lookupFeature(s))&&t.push(e)})),this._index.clear(),this._index.load(t),this._indexSearchCache.clear(),this._spatialIndexInvalid=!1}_lookupFeature(t){const e=u(t),s=this._getFeatureSet(e);if(!s)return;const a=s.getCursor(),r=l(t);return a.setIndex(r),a}_getFeatureSet(t){return this._featureSetsByInstance.get(t)}}},"./node_modules/@arcgis/core/views/2d/layers/features/Store2D.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>c});var has=__webpack_require__("./node_modules/@arcgis/core/core/has.js"),maybe=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),diffUtils=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/diffUtils.js"),arcadeOnDemand=__webpack_require__("./node_modules/@arcgis/core/support/arcadeOnDemand.js"),Logger=__webpack_require__("./node_modules/@arcgis/core/core/Logger.js");const o=__webpack_require__.e(3667).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/support/labelFormatUtils.js"));class c{constructor(e,s){this._canCacheExpressionValue=!1,this._sourceInfo=e,this._storage=s,this._bitsets={computed:s.getBitset(s.createBitset())}}get storage(){return this._storage}invalidate(){this._bitsets.computed.clear()}async updateSchema(r,a){const o=(0,diffUtils.Hg)(this._schema,a);if(this._schema=a,!a||(0,maybe.Wi)(o)||!(0,diffUtils.uD)(o,"attributes"))return;(0,has.Z)("esri-2d-update-debug")&&console.debug("Applying Update - Store:",o),this._bitsets.computed.clear(),r.targets[a.name]=!0;const c=a.attributes,n=[],p=[];for(const e in c){const s=c[e];switch(s.type){case"field":break;case"expression":n.push(this._createArcadeComputedField(s));break;case"label-expression":n.push(this._createLabelArcadeComputedField(s));break;case"statistic":p.push(s)}}this._computedFields=await Promise.all(n),this._canCacheExpressionValue=!this._computedFields.some((e=>"expression"===e.type&&(0,maybe.pC)(e.expression)&&e.expression.referencesScale())),this._statisticFields=p}setComputedAttributes(e,s,t,i){const r=this._bitsets.computed;if(!this._canCacheExpressionValue||!r.has(t)){r.set(t);for(const r of this._computedFields){const a=this._evaluateField(s,r,i);switch(r.resultType){case"numeric":e.setComputedNumericAtIndex(t,r.fieldIndex,a);break;case"string":e.setComputedStringAtIndex(t,r.fieldIndex,a)}}}}async _createArcadeComputedField(e){const s=this._sourceInfo.spatialReference,t=this._sourceInfo.fieldsIndex;return{...e,expression:await(0,arcadeOnDemand.Yi)(e.valueExpression,s,t)}}async _createLabelArcadeComputedField(e){const s=this._sourceInfo.spatialReference,t=this._sourceInfo.fieldsIndex,{createLabelFunction:i}=await o,r=await i(e.label,t,s);return{...e,builder:r}}_evaluateField(e,s,t){switch(s.type){case"label-expression":{const t=e.readArcadeFeature();return s.builder.evaluate(t)||""}case"expression":{const{expression:i}=s;return function a(a,t,o){if((0,maybe.Wi)(a))return null;const u=t.readArcadeFeature();try{return a.evaluate({...o,$feature:u})}catch(n){return Logger.Z.getLogger("esri.views.2d.support.arcadeOnDemand").warn("Feature arcade evaluation failed:",n),null}}(i,e,{$view:{scale:t}})}}}}},"./node_modules/@arcgis/core/views/2d/layers/features/support/FeatureFilter.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>p});var Error=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),Logger=__webpack_require__("./node_modules/@arcgis/core/core/Logger.js"),maybe=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),aaBoundingRect=__webpack_require__("./node_modules/@arcgis/core/geometry/support/aaBoundingRect.js"),boundsUtils=__webpack_require__("./node_modules/@arcgis/core/geometry/support/boundsUtils.js"),spatialQuerySupport=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/data/spatialQuerySupport.js"),timeSupport=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/data/timeSupport.js"),utils=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/data/utils.js"),Query=__webpack_require__("./node_modules/@arcgis/core/rest/support/Query.js"),FeatureStore2D=__webpack_require__("./node_modules/@arcgis/core/views/2d/layers/features/FeatureStore2D.js");const t=Logger.Z.getLogger("esri.views.2d.layers.features.support.whereUtils"),a={getAttribute:(e,r)=>e.field(r)};async function s(r,s){const n=await __webpack_require__.e(3362).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/core/sql/WhereClause.js"));try{const o=n.WhereClause.create(r,s);if(!o.isStandardized){const r=new Error.Z("mapview - bad input","Unable to apply filter's definition expression, as expression is not standardized.",o);t.error(r)}return e=>{const r=e.readArcadeFeature();return o.testFeature(r,a)}}catch(o){return t.warn("mapview-bad-where-clause","Encountered an error when evaluating where clause",r),e=>!0}}class p{constructor(t){this._geometryBounds=(0,aaBoundingRect.Ue)(),this._idToVisibility=new Map,this._serviceInfo=t}get hash(){return this._hash}check(t){return this._applyFilter(t)}clear(){const t=this._resetAllHiddenIds();return this.update(),{show:t,hide:[]}}invalidate(){this._idToVisibility.forEach(((t,e)=>{this._idToVisibility.set(e,0)}))}setKnownIds(t){for(const e of t)this._idToVisibility.set(e,1)}setTrue(t){const e=[],i=[],s=new Set(t);return this._idToVisibility.forEach(((t,r)=>{const o=!!(1&this._idToVisibility.get(r)),h=s.has(r);!o&&h?e.push(r):o&&!h&&i.push(r),this._idToVisibility.set(r,h?3:0)})),{show:e,hide:i}}createQuery(){const{geometry:t,spatialRel:e,where:i,timeExtent:s,objectIds:r}=this;return Query.Z.fromJSON({geometry:t,spatialRel:e,where:i,timeExtent:s,objectIds:r})}async update(t,e){this._hash=JSON.stringify(t);const i=await(0,utils.j6)(t,null,e);await Promise.all([this._setGeometryFilter(i),this._setIdFilter(i),this._setAttributeFilter(i),this._setTimeFilter(i)])}async _setAttributeFilter(t){if(!t||!t.where)return this._clause=null,void(this.where=null);this._clause=await s(t.where,this._serviceInfo.fieldsIndex),this.where=t.where}_setIdFilter(t){this._idsToShow=t&&t.objectIds&&new Set(t.objectIds),this._idsToHide=t&&t.hiddenIds&&new Set(t.hiddenIds),this.objectIds=t&&t.objectIds}async _setGeometryFilter(t){if(!t||!t.geometry)return this._spatialQueryOperator=null,this.geometry=null,void(this.spatialRel=null);const e=t.geometry,i=t.spatialRel||"esriSpatialRelIntersects",s=await(0,spatialQuerySupport.cW)(i,e,this._serviceInfo.geometryType,this._serviceInfo.hasZ,this._serviceInfo.hasM);(0,boundsUtils.$P)(this._geometryBounds,e),this._spatialQueryOperator=s,this.geometry=e,this.spatialRel=i}_setTimeFilter(i){if(this.timeExtent=this._timeOperator=null,i&&i.timeExtent)if(this._serviceInfo.timeInfo)this.timeExtent=i.timeExtent,this._timeOperator=(0,timeSupport.y)(this._serviceInfo.timeInfo,i.timeExtent,FeatureStore2D.k);else{const s=new Error.Z("feature-layer-view:time-filter-not-available","Unable to apply time filter, as layer doesn't have time metadata.",i.timeExtent);Logger.Z.getLogger("esri.views.2d.layers.features.controllers.FeatureFilter").error(s)}}_applyFilter(t){return this._filterByGeometry(t)&&this._filterById(t)&&this._filterByTime(t)&&this._filterByExpression(t)}_filterByExpression(t){return!this.where||this._clause(t)}_filterById(t){return(!this._idsToHide||!this._idsToHide.size||!this._idsToHide.has(t.getObjectId()))&&(!this._idsToShow||!this._idsToShow.size||this._idsToShow.has(t.getObjectId()))}_filterByGeometry(t){if(!this.geometry)return!0;const e=t.readHydratedGeometry();return!!e&&this._spatialQueryOperator(e)}_filterByTime(t){return!!(0,maybe.Wi)(this._timeOperator)||this._timeOperator(t)}_resetAllHiddenIds(){const t=[];return this._idToVisibility.forEach(((e,i)=>{1&e||(this._idToVisibility.set(i,1),t.push(i))})),t}}},"./node_modules/@arcgis/core/views/2d/layers/features/support/FeatureSetReaderPBFIndirect.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{t:()=>r});var _FeatureSetReader_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/views/2d/layers/features/support/FeatureSetReader.js");class r extends _FeatureSetReader_js__WEBPACK_IMPORTED_MODULE_0__.s{static from(e,t){return new r(e.copy(),t)}constructor(r,t){super(_FeatureSetReader_js__WEBPACK_IMPORTED_MODULE_0__.s.createInstance(),r.fullSchema()),this._currentIndex=-1,this._reader=r,this._indices=t}get hasNext(){return this._currentIndex+1<this._indices.length}getSize(){return this._indices.length}getCursor(){return this.copy()}copy(){const e=new r(this._reader.copy(),this._indices);return e._currentIndex=this._currentIndex,e}next(){for(;this._nextIndex()&&!this._reader._getExists(););return this._currentIndex<this._indices.length}_nextIndex(){return++this._currentIndex<this._indices.length&&(this._reader.setIndex(this._indices[this._currentIndex]),!0)}setArcadeSpatialReference(e){this._reader.setArcadeSpatialReference(e)}attachStorage(e){this._reader.attachStorage(e)}get geometryType(){return this._reader.geometryType}get hasFeatures(){return this._reader.hasFeatures}get exceededTransferLimit(){return this._reader.exceededTransferLimit}get hasZ(){return this._reader.hasZ}get hasM(){return this._reader.hasM}getStorage(){return this._reader.getStorage()}getComputedNumeric(e){return this._reader.getComputedNumericAtIndex(0)}setComputedNumeric(e,r){return this._reader.setComputedNumericAtIndex(r,0)}getComputedString(e){return this._reader.getComputedStringAtIndex(0)}setComputedString(e,r){return this._reader.setComputedStringAtIndex(0,r)}getComputedNumericAtIndex(e){return this._reader.getComputedNumericAtIndex(e)}setComputedNumericAtIndex(e,r){this._reader.setComputedNumericAtIndex(e,r)}getComputedStringAtIndex(e){return this._reader.getComputedStringAtIndex(e)}setComputedStringAtIndex(e,r){return this._reader.setComputedStringAtIndex(e,r)}transform(e,r,t,d){const a=this.copy();return a._reader=this._reader.transform(e,r,t,d),a}readAttribute(e,r=!1){return this._reader.readAttribute(e,r)}readAttributes(){return this._reader.readAttributes()}joinAttributes(e){return this._reader.joinAttributes(e)}readArcadeFeature(){return this._reader.readArcadeFeature()}geometry(){return this._reader.geometry()}field(e){return this.readAttribute(e,!0)}hasField(e){return this._reader.hasField(e)}setField(e,r){return this._reader.setField(e,r)}keys(){return this._reader.keys()}castToText(e=!1){return this._reader.castToText(e)}getQuantizationTransform(){return this._reader.getQuantizationTransform()}getFieldNames(){return this._reader.getFieldNames()}getAttributeHash(){return this._reader.getAttributeHash()}getObjectId(){return this._reader.getObjectId()}getDisplayId(){return this._reader.getDisplayId()}setDisplayId(e){return this._reader.setDisplayId(e)}getGroupId(){return this._reader.getGroupId()}setGroupId(e){return this._reader.setGroupId(e)}getXHydrated(){return this._reader.getXHydrated()}getYHydrated(){return this._reader.getYHydrated()}getX(){return this._reader.getX()}getY(){return this._reader.getY()}setIndex(e){return this._reader.setIndex(e)}getIndex(){return this._reader.getIndex()}readLegacyFeature(){return this._reader.readLegacyFeature()}readOptimizedFeature(){return this._reader.readOptimizedFeature()}readLegacyPointGeometry(){return this._reader.readLegacyPointGeometry()}readLegacyGeometry(){return this._reader.readLegacyGeometry()}readLegacyCentroid(){return this._reader.readLegacyCentroid()}readGeometryArea(){return this._reader.readGeometryArea()}readUnquantizedGeometry(){return this._reader.readUnquantizedGeometry()}readHydratedGeometry(){return this._reader.readHydratedGeometry()}readGeometry(){return this._reader.readGeometry()}readCentroid(){return this._reader.readCentroid()}_readAttribute(e,r){throw new Error("Error: Should not be called. Underlying _reader should be used instead")}_readAttributes(){throw new Error("Error: Should not be called. Underlying _reader should be used instead")}}}}]);