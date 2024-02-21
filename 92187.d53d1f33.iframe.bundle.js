"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[92187],{"./node_modules/@arcgis/core/core/memoize.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function t(t){let r,e,i=[],u=!1;return function f(...f){return u&&r===this&&function n(t,n){if(t.length!==n.length)return!1;for(let r=0;r<t.length;++r)if(t[r]!==n[r])return!1;return!0}(f,i)||(e=t.apply(this,f),r=this,i=f,u=!0),e}}__webpack_require__.d(__webpack_exports__,{B:()=>t})},"./node_modules/@arcgis/core/views/interactive/snapping/candidates/VertexSnappingCandidate.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{C:()=>r});var _sketch_constraints_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/views/interactive/sketch/constraints.js"),_FeatureSnappingCandidate_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/views/interactive/snapping/candidates/FeatureSnappingCandidate.js"),_hints_PointSnappingHint_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/views/interactive/snapping/hints/PointSnappingHint.js");class r extends _FeatureSnappingCandidate_js__WEBPACK_IMPORTED_MODULE_1__.w{constructor(n){super({...n,constraint:new _sketch_constraints_js__WEBPACK_IMPORTED_MODULE_0__.i7(n.targetPoint)})}get hints(){return[new _hints_PointSnappingHint_js__WEBPACK_IMPORTED_MODULE_2__._(this.targetPoint,this.isDraped,this.domain)]}}},"./node_modules/@arcgis/core/views/interactive/snapping/featureSources/FeatureCollectionSnappingSource.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{FeatureCollectionSnappingSource:()=>S});var _chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),_core_Accessor_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/Accessor.js"),_core_memoize_js__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__("./node_modules/@arcgis/core/core/memoize.js"),_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/core/promiseUtils.js"),_core_reactiveUtils_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/core/reactiveUtils.js"),_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_8__=(__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/has.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js")),_support_elevationInfoUtils_js__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@arcgis/core/support/elevationInfoUtils.js"),_snappingUtils_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@arcgis/core/views/interactive/snapping/snappingUtils.js"),_queryEngineUtils_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/@arcgis/core/views/interactive/snapping/featureSources/queryEngineUtils.js"),_snappingCandidateElevationAlignment_js__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("./node_modules/@arcgis/core/views/interactive/snapping/featureSources/snappingCandidateElevationAlignment.js"),_snappingCandidateElevationFilter_js__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__("./node_modules/@arcgis/core/views/interactive/snapping/featureSources/snappingCandidateElevationFilter.js"),_symbologySnappingCandidates_js__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__("./node_modules/@arcgis/core/views/interactive/snapping/featureSources/symbologySnappingCandidates.js");let S=class extends _core_Accessor_js__WEBPACK_IMPORTED_MODULE_1__.A{get availability(){return 1}get updating(){return this.layerSource.updating}get _snappingElevationAligner(){const{view:e}=this,{layer:t}=this.layerSource,i=null!=e&&"3d"===e.type;if(!i||"subtype-group"===t.type)return(0,_snappingCandidateElevationAlignment_js__WEBPACK_IMPORTED_MODULE_12__.n)();return(0,_snappingCandidateElevationAlignment_js__WEBPACK_IMPORTED_MODULE_12__.n)(i,{elevationInfo:t.elevationInfo,alignPointsInFeatures:async(i,o)=>(await(0,_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_2__.qr)(e.whenLayerView(t),o)).elevationAlignPointsInFeatures(i,o)})}get _snappingElevationFilter(){const{view:e}=this,t=null!=e&&"3d"===e.type&&"subtype-group"!==this.layerSource.layer.type;return(0,_snappingCandidateElevationFilter_js__WEBPACK_IMPORTED_MODULE_13__.z)(t)}get _symbologySnappingFetcher(){const{view:e}=this,{layer:t}=this.layerSource;return null!=e&&"3d"===e.type&&"subtype-group"!==t.type?(0,_symbologySnappingCandidates_js__WEBPACK_IMPORTED_MODULE_14__.H)(this._symbologySnappingSupported,(async(i,n)=>{const r=await e.whenLayerView(t);return(0,_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_2__.Te)(n),r.queryForSymbologySnapping({candidates:i,spatialReference:e.spatialReference},n)})):(0,_symbologySnappingCandidates_js__WEBPACK_IMPORTED_MODULE_14__.H)()}get _symbologySnappingSupported(){return null!=this._layerView3D&&this._layerView3D.symbologySnappingSupported}initialize(){const{view:e}=this,{layer:t}=this.layerSource;null!=e&&"3d"===e.type&&"subtype-group"!==t.type&&(e.whenLayerView(t).then((e=>this._layerView3D=e)),this.addHandles([e.elevationProvider.on("elevation-change",(({context:e})=>{const{elevationInfo:i}=t;(0,_support_elevationInfoUtils_js__WEBPACK_IMPORTED_MODULE_9__.Up)(e,i)&&this._snappingElevationAligner.notifyElevationSourceChange()})),(0,_core_reactiveUtils_js__WEBPACK_IMPORTED_MODULE_3__.wB)((()=>t.elevationInfo),(()=>this._snappingElevationAligner.notifyElevationSourceChange()),_core_reactiveUtils_js__WEBPACK_IMPORTED_MODULE_3__.Vh),(0,_core_reactiveUtils_js__WEBPACK_IMPORTED_MODULE_3__.wB)((()=>null!=this._layerView3D?this._layerView3D.processor?.renderer:null),(()=>this._symbologySnappingFetcher.notifySymbologyChange()),_core_reactiveUtils_js__WEBPACK_IMPORTED_MODULE_3__.Vh),(0,_core_reactiveUtils_js__WEBPACK_IMPORTED_MODULE_3__.on)((()=>this._layerView3D?.layer),["edits","apply-edits","graphic-update"],(()=>this._symbologySnappingFetcher.notifySymbologyChange()))]))}constructor(e){super(e),this.view=null,this._layerView3D=null,this._memoizedMakeGetGroundElevation=(0,_core_memoize_js__WEBPACK_IMPORTED_MODULE_15__.B)(_queryEngineUtils_js__WEBPACK_IMPORTED_MODULE_11__.p)}refresh(){}async fetchCandidates(e,t){const{layer:i}=this.layerSource,n=i.source;if(!n?.querySnapping)return[];const r=(0,_snappingUtils_js__WEBPACK_IMPORTED_MODULE_10__.HN)(i),a=(0,_snappingUtils_js__WEBPACK_IMPORTED_MODULE_10__.nf)(e,this.view?.type??"2d",r),s=await n.querySnapping(a,{signal:t});(0,_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_2__.Te)(t);const p=e.coordinateHelper.spatialReference,l=await this._snappingElevationAligner.alignCandidates(s.candidates,p,t);(0,_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_2__.Te)(t);const y=await this._symbologySnappingFetcher.fetch(l,t);(0,_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_2__.Te)(t);const h=0===y.length?l:[...l,...y],m=this._snappingElevationFilter.filter(a,h),d=this._memoizedMakeGetGroundElevation(this.view,p);return m.map((e=>(0,_queryEngineUtils_js__WEBPACK_IMPORTED_MODULE_11__.$)(e,d)))}};(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_4__.MZ)({constructOnly:!0})],S.prototype,"layerSource",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_4__.MZ)({constructOnly:!0})],S.prototype,"view",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_4__.MZ)()],S.prototype,"_snappingElevationAligner",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_4__.MZ)()],S.prototype,"_snappingElevationFilter",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_4__.MZ)()],S.prototype,"_symbologySnappingFetcher",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_4__.MZ)()],S.prototype,"_layerView3D",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_4__.MZ)()],S.prototype,"_symbologySnappingSupported",null),S=(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_8__.$)("esri.views.interactive.snapping.featureSources.FeatureCollectionSnappingSource")],S)},"./node_modules/@arcgis/core/views/interactive/snapping/featureSources/queryEngineUtils.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$:()=>a,p:()=>o});var _sketch_normalizedPoint_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/views/interactive/sketch/normalizedPoint.js"),_candidates_DrapedEdgeSnappingCandidate_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/views/interactive/snapping/candidates/DrapedEdgeSnappingCandidate.js"),_candidates_EdgeSnappingCandidate_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/views/interactive/snapping/candidates/EdgeSnappingCandidate.js"),_candidates_VertexSnappingCandidate_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/views/interactive/snapping/candidates/VertexSnappingCandidate.js");function r({x:t,y:n,z:d}){return(0,_sketch_normalizedPoint_js__WEBPACK_IMPORTED_MODULE_0__.fA)(t,n,d??0)}function a(e,a){switch(e.type){case"edge":return e.draped?new _candidates_DrapedEdgeSnappingCandidate_js__WEBPACK_IMPORTED_MODULE_1__.X({edgeStart:r(e.start),edgeEnd:r(e.end),targetPoint:r(e.target),objectId:e.objectId,getGroundElevation:a}):new _candidates_EdgeSnappingCandidate_js__WEBPACK_IMPORTED_MODULE_2__.z({edgeStart:r(e.start),edgeEnd:r(e.end),targetPoint:r(e.target),objectId:e.objectId,isDraped:!1});case"vertex":return new _candidates_VertexSnappingCandidate_js__WEBPACK_IMPORTED_MODULE_3__.C({targetPoint:r(e.target),objectId:e.objectId,isDraped:!1})}}function o(e,t){return null!=e&&"3d"===e.type?(n,d)=>e.elevationProvider.getElevation(n,d,0,t,"ground"):()=>null}},"./node_modules/@arcgis/core/views/interactive/snapping/featureSources/snappingCandidateElevationAlignment.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>i});__webpack_require__("./node_modules/@arcgis/core/core/has.js");var _core_LRUCache_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/LRUCache.js"),_core_MapUtils_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/core/MapUtils.js"),_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/core/promiseUtils.js"),_core_unitUtils_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/core/unitUtils.js"),_symbols_support_unitConversionUtils_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/symbols/support/unitConversionUtils.js");function i(e=!1,t){if(e){const{elevationInfo:e,alignPointsInFeatures:s}=t;return new c(e,s)}return new a}class a{async alignCandidates(e,t,s){return e}notifyElevationSourceChange(){}}class c{constructor(t,s){this._elevationInfo=t,this._alignPointsInFeatures=s,this._alignmentsCache=new _core_LRUCache_js__WEBPACK_IMPORTED_MODULE_1__.q(1024),this._cacheVersion=0}async alignCandidates(e,t,s){const n=this._elevationInfo;return null==n||"absolute-height"!==n.mode||n.featureExpressionInfo?this._alignComputedElevationCandidates(e,t,s):(this._alignAbsoluteElevationCandidates(e,t,n),e)}notifyElevationSourceChange(){this._alignmentsCache.clear(),this._cacheVersion++}_alignAbsoluteElevationCandidates(e,t,s){const{offset:i,unit:a}=s;if(null==i)return;const r=(0,_core_unitUtils_js__WEBPACK_IMPORTED_MODULE_3__.G9)(t),c=i*((0,_symbols_support_unitConversionUtils_js__WEBPACK_IMPORTED_MODULE_4__.Ao)(a??"meters")/r);for(const n of e)switch(n.type){case"edge":n.start.z+=c,n.end.z+=c;continue;case"vertex":n.target.z+=c;continue}}async _alignComputedElevationCandidates(e,n,o){const i=new Map;for(const s of e)(0,_core_MapUtils_js__WEBPACK_IMPORTED_MODULE_5__.tE)(i,s.objectId,d).push(s);const[a,r,c]=this._prepareQuery(i,n),l=await this._alignPointsInFeatures(a,o);if((0,_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_2__.Te)(o),c!==this._cacheVersion)return this._alignComputedElevationCandidates(e,n,o);this._applyCacheAndResponse(a,l,r);const{drapedObjectIds:h,failedObjectIds:u}=l,p=[];for(const t of e){const{objectId:e}=t;h.has(e)&&"edge"===t.type&&(t.draped=!0),u.has(e)||p.push(t)}return p}_prepareQuery(e,t){const s=[],n=[];for(const[o,i]of e){const e=[];for(const t of i)this._addToQueriesOrCachedResult(o,t.target,e,n),"edge"===t.type&&(this._addToQueriesOrCachedResult(o,t.start,e,n),this._addToQueriesOrCachedResult(o,t.end,e,n));0!==e.length&&s.push({objectId:o,points:e})}return[{spatialReference:t.toJSON(),pointsInFeatures:s},n,this._cacheVersion]}_addToQueriesOrCachedResult(e,t,s,n){const o=h(e,t),i=this._alignmentsCache.get(o);null==i?s.push(t):n.push(new l(t,i))}_applyCacheAndResponse(e,{elevations:t,drapedObjectIds:s,failedObjectIds:n},o){for(const r of o)r.apply();let i=0;const a=this._alignmentsCache;for(const{objectId:r,points:c}of e.pointsInFeatures){if(n.has(r)){i+=c.length;continue}const e=!s.has(r);for(const s of c){const n=h(r,s),o=t[i++];s.z=o,e&&a.put(n,o,1)}}}}class l{constructor(e,t){this.point=e,this.z=t}apply(){this.point.z=this.z}}function h(e,{x:t,y:s,z:n,spatialReference:o}){return`${e}-${t}-${s}-${n??0}}-wkid:${o?.wkid}`}function d(){return[]}},"./node_modules/@arcgis/core/views/interactive/snapping/featureSources/snappingCandidateElevationFilter.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>r});__webpack_require__("./node_modules/@arcgis/core/core/has.js");class t{filter(t,n){return n}notifyElevationSourceChange(){}}class n{filter(t,n){const{point:r,distance:c}=t,{z:i}=r;if(null==i)return n;if(0===n.length)return n;const o=function s(t){return"number"==typeof t?{x:t,y:t,z:t}:t}(c),u=this._updateCandidatesTo3D(n,r,o).filter(e);return u.sort(a),u}_updateCandidatesTo3D(t,n,e){for(const r of t)switch(r.type){case"edge":c(r,n,e);continue;case"vertex":o(r,n,e);continue}return t}}function e(t){return t.distance<=1}function r(e=!1){return e?new n:new t}function c(t,n,{x:e,y:r,z:c}){const{start:o,end:s,target:a}=t;t.draped||function i(t,n,e,r){const c=r.x-e.x,i=r.y-e.y,o=r.z-e.z,s=c*c+i*i+o*o,a=(n.x-e.x)*c+(n.y-e.y)*i+o*(n.z-e.z),u=Math.min(1,Math.max(0,a/s)),d=e.x+c*u,f=e.y+i*u,x=e.z+o*u;t.x=d,t.y=f,t.z=x}(a,n,o,s);const u=(n.x-a.x)/e,d=(n.y-a.y)/r,f=(n.z-a.z)/c;t.distance=Math.sqrt(u*u+d*d+f*f)}function o(t,n,{x:e,y:r,z:c}){const{target:i}=t,o=(n.x-i.x)/e,s=(n.y-i.y)/r,a=(n.z-i.z)/c,u=Math.sqrt(o*o+s*s+a*a);t.distance=u}function a(t,n){return t.distance-n.distance}},"./node_modules/@arcgis/core/views/interactive/snapping/featureSources/symbologySnappingCandidates.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{H:()=>n});__webpack_require__("./node_modules/@arcgis/core/core/has.js");var _core_lang_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/lang.js"),_core_LRUCache_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/core/LRUCache.js"),_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/core/promiseUtils.js"),_core_string_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/core/string.js");function n(t=!1,e){return t?new i(e):new c}class c{async fetch(){return[]}notifySymbologyChange(){}}class i{constructor(t){this._getSymbologyCandidates=t,this._candidatesCache=new _core_LRUCache_js__WEBPACK_IMPORTED_MODULE_2__.q(1024),this._cacheVersion=0}async fetch(e,o){if(0===e.length)return[];const n=[],c=[],r=this._candidatesCache;for(const s of e){const e=a(s),o=r.get(e);if(o)for(const s of o)c.push((0,_core_lang_js__WEBPACK_IMPORTED_MODULE_1__.o8)(s));else n.push(s),r.put(e,[],1)}if(0===n.length)return c;const i=this._cacheVersion,{candidates:h,sourceCandidateIndices:d}=await this._getSymbologyCandidates(n,o);if((0,_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_3__.Te)(o),i!==this._cacheVersion)return this.fetch(e,o);const f=[],{length:g}=h;for(let s=0;s<g;++s){const e=h[s],o=a(n[d[s]]),c=r.get(o);c.push(e),r.put(o,c,c.length),f.push((0,_core_lang_js__WEBPACK_IMPORTED_MODULE_1__.o8)(e))}return c.concat(f)}notifySymbologyChange(){this._candidatesCache.clear(),this._cacheVersion++}}function a(t){switch(t.type){case"vertex":{const{objectId:e,target:s}=t,n=`${e}-vertex-${s.x}-${s.y}-${s.z??0}`;return(0,_core_string_js__WEBPACK_IMPORTED_MODULE_4__.Wm)(n).toString()}case"edge":{const{objectId:e,start:s,end:n}=t,c=`${e}-edge-${s.x}-${s.y}-${s.z??0}-to-${n.x}-${n.y}-${n.z??0}`;return(0,_core_string_js__WEBPACK_IMPORTED_MODULE_4__.Wm)(c).toString()}default:return""}}},"./node_modules/@arcgis/core/views/interactive/snapping/hints/PointSnappingHint.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{_:()=>n});var _chunks_vec3_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/chunks/vec3.js"),_SnappingHint_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/views/interactive/snapping/hints/SnappingHint.js");class n extends _SnappingHint_js__WEBPACK_IMPORTED_MODULE_1__.m{constructor(t,s,n){super(s,n),this.point=t}equals(s){return s instanceof n&&(0,_chunks_vec3_js__WEBPACK_IMPORTED_MODULE_0__.h)(this.point,s.point)}}}}]);