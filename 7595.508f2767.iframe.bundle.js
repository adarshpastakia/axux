"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[7595],{"./node_modules/@arcgis/core/views/interactive/snapping/featureSources/featureServiceSource/FeatureServiceSnappingSourceWorker.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>b});var tslib_es6=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),Evented=__webpack_require__("./node_modules/@arcgis/core/core/Evented.js"),Handles=__webpack_require__("./node_modules/@arcgis/core/core/Handles.js"),maybe=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),promiseUtils=__webpack_require__("./node_modules/@arcgis/core/core/promiseUtils.js"),reactiveUtils=__webpack_require__("./node_modules/@arcgis/core/core/reactiveUtils.js"),property=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),arrayUtils=(__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js")),subclass=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js"),WatchUpdatingTracking=__webpack_require__("./node_modules/@arcgis/core/core/support/WatchUpdatingTracking.js"),SpatialReference=__webpack_require__("./node_modules/@arcgis/core/geometry/SpatialReference.js"),FeatureStore=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/data/FeatureStore.js"),QueryEngine=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/data/QueryEngine.js"),TileInfo=__webpack_require__("./node_modules/@arcgis/core/layers/support/TileInfo.js"),Query=__webpack_require__("./node_modules/@arcgis/core/rest/support/Query.js"),ElevationInfo=__webpack_require__("./node_modules/@arcgis/core/symbols/support/ElevationInfo.js"),LRUCache=(__webpack_require__("./node_modules/@arcgis/core/core/has.js"),__webpack_require__("./node_modules/@arcgis/core/core/LRUCache.js")),MapUtils=__webpack_require__("./node_modules/@arcgis/core/core/MapUtils.js"),unitUtils=__webpack_require__("./node_modules/@arcgis/core/core/unitUtils.js"),unitConversionUtils=__webpack_require__("./node_modules/@arcgis/core/symbols/support/unitConversionUtils.js");function snappingCandidateElevationAlignment_r(e=!1,t){if(e){const{elevationInfo:e,alignPointsInFeatures:s,spatialReference:n}=t;return new l(e,s,n)}return new c}class c{async alignCandidates(e,t){return e}notifyElevationSourceChange(){}}class l{constructor(t,s,n){this._elevationInfo=t,this._alignPointsInFeatures=s,this.spatialReference=n,this._alignmentsCache=new LRUCache.Z(1024),this._cacheVersion=0,this._metersPerVerticalUnit=(0,unitUtils._R)(n)}async alignCandidates(e,t){const n=this._elevationInfo;return(0,maybe.pC)(n)&&"absolute-height"===n.mode&&!n.featureExpressionInfo?(this._alignAbsoluteElevationCandidates(e,n),e):this._alignComputedElevationCandidates(e,t)}notifyElevationSourceChange(){this._alignmentsCache.clear(),this._cacheVersion++}_alignAbsoluteElevationCandidates(e,t){const{offset:s,unit:o}=t;if((0,maybe.Wi)(s))return;const i=s*((0,unitConversionUtils.Z7)(o??"meters")/this._metersPerVerticalUnit);for(const n of e)switch(n.type){case"edge":n.start.z+=i,n.end.z+=i;continue;case"vertex":n.target.z+=i;continue}}async _alignComputedElevationCandidates(e,s){const n=new Map;for(const o of e)(0,MapUtils.s1)(n,o.objectId,p).push(o);const[i,a,r]=this._prepareQuery(n),c=await this._alignPointsInFeatures(i,s);if((0,promiseUtils.k_)(s),r!==this._cacheVersion)return this._alignComputedElevationCandidates(e,s);this._applyCacheAndResponse(i,c,a);const{drapedObjectIds:h,failedObjectIds:l}=c,d=[];for(const t of e){const{objectId:e}=t;h.has(e)&&"edge"===t.type&&(t.draped=!0),l.has(e)||d.push(t)}return d}_prepareQuery(e){const t=[],s=[];for(const[n,o]of e){const e=[];for(const t of o)this._addToQueriesOrCachedResult(n,t.target,e,s),"edge"===t.type&&(this._addToQueriesOrCachedResult(n,t.start,e,s),this._addToQueriesOrCachedResult(n,t.end,e,s));0!==e.length&&t.push({objectId:n,points:e})}return[t,s,this._cacheVersion]}_addToQueriesOrCachedResult(e,t,n,o){const i=u(e,t),a=this._alignmentsCache.get(i);(0,maybe.pC)(a)?o.push(new d(t,a)):n.push(t)}_applyCacheAndResponse(e,{elevations:t,drapedObjectIds:s,failedObjectIds:n},o){for(const r of o)r.apply();let i=0;const a=this._alignmentsCache;for(const{objectId:r,points:c}of e){if(n.has(r)){i+=c.length;continue}const e=!s.has(r);for(const s of c){const n=u(r,s),o=t[i++];s.z=o,e&&a.put(n,o,1)}}}}class d{constructor(e,t){this.point=e,this.z=t}apply(){this.point.z=this.z}}function u(e,{x:t,y:s,z:n}){return`${e}-${t}-${s}-${n??0}}`}function p(){return[]}class t{filter(t,n){return n}notifyElevationSourceChange(){}}class n{filter(t,n){const{point:r,distance:c}=t,{z:i}=r;if(null==i)return n;if(0===n.length)return n;const o=function s(t){return"number"==typeof t?{x:t,y:t,z:t}:t}(c),u=this._updateCandidatesTo3D(n,r,o).filter(e);return u.sort(a),u}_updateCandidatesTo3D(t,n,e){for(const r of t)switch(r.type){case"edge":snappingCandidateElevationFilter_c(r,n,e);continue;case"vertex":o(r,n,e);continue}return t}}function e(t){return t.distance<=1}function snappingCandidateElevationFilter_r(e=!1){return e?new n:new t}function snappingCandidateElevationFilter_c(t,n,{x:e,y:r,z:c}){const{start:o,end:s,target:a}=t;t.draped||function i(t,n,e,r){const c=r.x-e.x,i=r.y-e.y,o=r.z-e.z,s=c*c+i*i+o*o,a=(n.x-e.x)*c+(n.y-e.y)*i+o*(n.z-e.z),u=Math.min(1,Math.max(0,a/s)),d=e.x+c*u,f=e.y+i*u,x=e.z+o*u;t.x=d,t.y=f,t.z=x}(a,n,o,s);const u=(n.x-a.x)/e,d=(n.y-a.y)/r,f=(n.z-a.z)/c;t.distance=Math.sqrt(u*u+d*d+f*f)}function o(t,n,{x:e,y:r,z:c}){const{target:i}=t,o=(n.x-i.x)/e,s=(n.y-i.y)/r,a=(n.z-i.z)/c,u=Math.sqrt(o*o+s*s+a*a);t.distance=u}function a(t,n){return t.distance-n.distance}var lang=__webpack_require__("./node_modules/@arcgis/core/core/lang.js"),string=__webpack_require__("./node_modules/@arcgis/core/core/string.js");function symbologySnappingCandidates_n(t=!1,e){return t?new symbologySnappingCandidates_i(e):new symbologySnappingCandidates_c}class symbologySnappingCandidates_c{async fetch(){return[]}notifySymbologyChange(){}}class symbologySnappingCandidates_i{constructor(t){this._getSymbologyCandidates=t,this._candidatesCache=new LRUCache.Z(1024),this._cacheVersion=0}async fetch(e,o){if(0===e.length)return[];const n=[],c=[],r=this._candidatesCache;for(const s of e){const e=symbologySnappingCandidates_a(s),o=r.get(e);if(o)for(const s of o)c.push((0,lang.d9)(s));else n.push(s),r.put(e,[],1)}if(0===n.length)return c;const i=this._cacheVersion,{candidates:h,sourceCandidateIndices:d}=await this._getSymbologyCandidates(n,o);if((0,promiseUtils.k_)(o),i!==this._cacheVersion)return this.fetch(e,o);const f=[],{length:g}=h;for(let s=0;s<g;++s){const e=h[s],o=symbologySnappingCandidates_a(n[d[s]]),c=r.get(o);c.push(e),r.put(o,c,c.length),f.push((0,lang.d9)(e))}return c.concat(f)}notifySymbologyChange(){this._candidatesCache.clear(),this._cacheVersion++}}function symbologySnappingCandidates_a(t){switch(t.type){case"vertex":{const{objectId:e,target:s}=t,n=`${e}-vertex-${s.x}-${s.y}-${s.z??0}`;return(0,string.hP)(n).toString()}case"edge":{const{objectId:e,start:s,end:n}=t,c=`${e}-edge-${s.x}-${s.y}-${s.z??0}-to-${n.x}-${n.y}-${n.z??0}`;return(0,string.hP)(c).toString()}default:return""}}var Accessor=__webpack_require__("./node_modules/@arcgis/core/core/Accessor.js");let AsyncSequence_r=class extends Accessor.Z{constructor(){super(...arguments),this.updating=!1,this._pending=[]}push(s,t){this._pending.push({promise:s,callback:t}),1===this._pending.length&&this._process()}_process(){if(!this._pending.length)return void(this.updating=!1);this.updating=!0;const s=this._pending[0];s.promise.then((t=>s.callback(t))).catch((()=>{})).then((()=>{this._pending.shift(),this._process()}))}};(0,tslib_es6._)([(0,property.Cb)()],AsyncSequence_r.prototype,"updating",void 0),AsyncSequence_r=(0,tslib_es6._)([(0,subclass.j)("esri.core.AsyncSequence")],AsyncSequence_r);var PendingFeatureTile_u,asyncUtils=__webpack_require__("./node_modules/@arcgis/core/core/asyncUtils.js"),HandleOwner=__webpack_require__("./node_modules/@arcgis/core/core/HandleOwner.js"),handleUtils=__webpack_require__("./node_modules/@arcgis/core/core/handleUtils.js"),Logger=__webpack_require__("./node_modules/@arcgis/core/core/Logger.js"),Extent=__webpack_require__("./node_modules/@arcgis/core/geometry/Extent.js"),aaBoundingRect=__webpack_require__("./node_modules/@arcgis/core/geometry/support/aaBoundingRect.js"),featureConversionUtils=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/featureConversionUtils.js"),arcgisLayerUrl=__webpack_require__("./node_modules/@arcgis/core/layers/support/arcgisLayerUrl.js"),pbfOptimizedFeatureSet=__webpack_require__("./node_modules/@arcgis/core/rest/query/operations/pbfOptimizedFeatureSet.js"),query=__webpack_require__("./node_modules/@arcgis/core/rest/query/operations/query.js");class PendingFeatureTile_o{constructor(t,e){this.data=t,this.resolution=e,this.state={type:PendingFeatureTile_u.CREATED},this.alive=!0}process(t){switch(this.state.type){case PendingFeatureTile_u.CREATED:return this.state=this._gotoFetchCount(this.state,t),this.state.task.promise.then(t.resume,t.resume);case PendingFeatureTile_u.FETCH_COUNT:break;case PendingFeatureTile_u.FETCHED_COUNT:return this.state=this._gotoFetchFeatures(this.state,t),this.state.task.promise.then(t.resume,t.resume);case PendingFeatureTile_u.FETCH_FEATURES:break;case PendingFeatureTile_u.FETCHED_FEATURES:this.state=this._goToDone(this.state,t);case PendingFeatureTile_u.DONE:}return null}get debugInfo(){return{data:this.data,featureCount:this._featureCount,state:this._stateToString}}get _featureCount(){switch(this.state.type){case PendingFeatureTile_u.CREATED:case PendingFeatureTile_u.FETCH_COUNT:return 0;case PendingFeatureTile_u.FETCHED_COUNT:return this.state.featureCount;case PendingFeatureTile_u.FETCH_FEATURES:return this.state.previous.featureCount;case PendingFeatureTile_u.FETCHED_FEATURES:return this.state.features.length;case PendingFeatureTile_u.DONE:return this.state.previous.features.length}}get _stateToString(){switch(this.state.type){case PendingFeatureTile_u.CREATED:return"created";case PendingFeatureTile_u.FETCH_COUNT:return"fetch-count";case PendingFeatureTile_u.FETCHED_COUNT:return"fetched-count";case PendingFeatureTile_u.FETCH_FEATURES:return"fetch-features";case PendingFeatureTile_u.FETCHED_FEATURES:return"fetched-features";case PendingFeatureTile_u.DONE:return"done"}}_gotoFetchCount(s,a){return{type:PendingFeatureTile_u.FETCH_COUNT,previous:s,task:(0,asyncUtils.vr)((async t=>{const s=await(0,asyncUtils.mt)(a.fetchCount(this,t));this.state.type===PendingFeatureTile_u.FETCH_COUNT&&(this.state=this._gotoFetchedCount(this.state,s.ok?s.value:1/0))}))}}_gotoFetchedCount(t,e){return{type:PendingFeatureTile_u.FETCHED_COUNT,featureCount:e,previous:t}}_gotoFetchFeatures(s,a){return{type:PendingFeatureTile_u.FETCH_FEATURES,previous:s,task:(0,asyncUtils.vr)((async t=>{const r=await(0,asyncUtils.mt)(a.fetchFeatures(this,s.featureCount,t));this.state.type===PendingFeatureTile_u.FETCH_FEATURES&&(this.state=this._gotoFetchedFeatures(this.state,r.ok?r.value:[]))}))}}_gotoFetchedFeatures(t,e){return{type:PendingFeatureTile_u.FETCHED_FEATURES,previous:t,features:e}}_goToDone(t,e){return e.finish(this,t.features),{type:PendingFeatureTile_u.DONE,previous:t}}reset(){const t=this.state;switch(this.state={type:PendingFeatureTile_u.CREATED},t.type){case PendingFeatureTile_u.CREATED:case PendingFeatureTile_u.FETCHED_COUNT:case PendingFeatureTile_u.FETCHED_FEATURES:case PendingFeatureTile_u.DONE:break;case PendingFeatureTile_u.FETCH_COUNT:case PendingFeatureTile_u.FETCH_FEATURES:t.task.abort()}}intersects(t){return!(!(0,maybe.Wi)(t)&&this.data.extent)||((0,aaBoundingRect.oJ)(t,T),(0,aaBoundingRect.kK)(this.data.extent,T))}}!function(t){t[t.CREATED=0]="CREATED",t[t.FETCH_COUNT=1]="FETCH_COUNT",t[t.FETCHED_COUNT=2]="FETCHED_COUNT",t[t.FETCH_FEATURES=3]="FETCH_FEATURES",t[t.FETCHED_FEATURES=4]="FETCHED_FEATURES",t[t.DONE=5]="DONE"}(PendingFeatureTile_u||(PendingFeatureTile_u={}));const T=(0,aaBoundingRect.Ue)();let C=class extends HandleOwner.r{get _minimumVerticesPerFeature(){switch(this.store?.featureStore.geometryType){case"esriGeometryPoint":case"esriGeometryMultipoint":return 1;case"esriGeometryPolygon":return 4;case"esriGeometryPolyline":return 2}}set filter(e){const t=this._get("filter"),i=this._filterProperties(e);JSON.stringify(t)!==JSON.stringify(i)&&this._set("filter",i)}set customParameters(e){const t=this._get("customParameters");JSON.stringify(t)!==JSON.stringify(e)&&this._set("customParameters",e)}get _configuration(){return{filter:this.filter,customParameters:this.customParameters,tileInfo:this.tileInfo,tileSize:this.tileSize}}set tileInfo(e){const t=this._get("tileInfo");t!==e&&((0,maybe.pC)(e)&&(0,maybe.pC)(t)&&JSON.stringify(e)===JSON.stringify(t)||(this._set("tileInfo",e),this.store.tileInfo=e))}set tileSize(e){this._get("tileSize")!==e&&this._set("tileSize",e)}get updating(){return this.updatingExcludingEdits||this._pendingEdits.updating}get updatingExcludingEdits(){return this.updatingHandles.updating}get hasZ(){return this.store.featureStore.hasZ}constructor(e){super(e),this.tilesOfInterest=[],this.availability=0,this._pendingTiles=new Map,this._pendingEdits=new AsyncSequence_r,this._pendingEditsAbortController=new AbortController}initialize(){this._initializeFetchExtent(),this.updatingHandles.add((()=>this._configuration),(()=>this.refresh())),this.updatingHandles.add((()=>this.tilesOfInterest),((e,i)=>{(0,arrayUtils.fS)(e,i,(({id:e},{id:t})=>e===t))||this._process()}),reactiveUtils.Z_)}destroy(){this._pendingTiles.forEach((e=>this._deletePendingTile(e))),this._pendingTiles.clear(),this.store.destroy(),this.tilesOfInterest.length=0,this._pendingEditsAbortController.abort(),this._pendingEditsAbortController=null}refresh(){this.store.refresh(),this._pendingTiles.forEach((e=>this._deletePendingTile(e))),this._process()}applyEdits(e){this._pendingEdits.push(e,(async e=>{if(0===e.addedFeatures.length&&0===e.updatedFeatures.length&&0===e.deletedFeatures.length)return;for(const[,i]of this._pendingTiles)i.reset();const t={...e,deletedFeatures:e.deletedFeatures.map((({objectId:e,globalId:t})=>e&&-1!==e?e:this._lookupObjectIdByGlobalId(t)))};await this.updatingHandles.addPromise(this.store.processEdits(t,((e,t)=>this._queryFeaturesById(e,t)),this._pendingEditsAbortController.signal)),this._processPendingTiles()}))}_initializeFetchExtent(){if(!this.capabilities.query.supportsExtent||!(0,arcgisLayerUrl.M8)(this.url))return;const e=(0,asyncUtils.vr)((async e=>{try{const t=await(0,query.Vr)(this.url,new Query.Z({where:"1=1",outSpatialReference:this.spatialReference,cacheHint:!!this.capabilities.query.supportsCacheHint||void 0}),{query:this._configuration.customParameters,signal:e});this.store.extent=Extent.Z.fromJSON(t.data?.extent)}catch(t){(0,promiseUtils.r9)(t),Logger.Z.getLogger(this.declaredClass).warn("Failed to fetch data extent",t)}}));this.updatingHandles.addPromise(e.promise.then((()=>this._process()))),this.handles.add((0,handleUtils.kB)((()=>e.abort())))}get debugInfo(){return{numberOfFeatures:this.store.featureStore.numFeatures,tilesOfInterest:this.tilesOfInterest,pendingTiles:Array.from(this._pendingTiles.values()).map((e=>e.debugInfo)),storedTiles:this.store.debugInfo}}_process(){this._markTilesNotAlive(),this._createPendingTiles(),this._deletePendingTiles(),this._processPendingTiles()}_markTilesNotAlive(){for(const[,e]of this._pendingTiles)e.alive=!1}_createPendingTiles(){const e=this._collectMissingTilesInfo();if(this._setAvailability((0,maybe.Wi)(e)?1:e.coveredArea/e.fullArea),!(0,maybe.Wi)(e))for(const{data:t,resolution:i}of e.missingTiles){const e=this._pendingTiles.get(t.id);e?(e.resolution=i,e.alive=!0):this._createPendingTile(t,i)}}_collectMissingTilesInfo(){let e=null;for(let t=this.tilesOfInterest.length-1;t>=0;t--){const i=this.tilesOfInterest[t],s=this.store.process(i,((e,t)=>this._verifyTileComplexity(e,t)));(0,maybe.Wi)(e)?e=s:e.prepend(s)}return e}_deletePendingTiles(){for(const[,e]of this._pendingTiles)e.alive||this._deletePendingTile(e)}_processPendingTiles(){const e={fetchCount:(e,t)=>this._fetchCount(e,t),fetchFeatures:(e,t,i)=>this._fetchFeatures(e,t,i),finish:(e,t)=>this._finishPendingTile(e,t),resume:()=>this._processPendingTiles()};if(this._ensureFetchAllCounts(e))for(const[,t]of this._pendingTiles)this._verifyTileComplexity(this.store.getFeatureCount(t.data),t.resolution)&&this.updatingHandles.addPromise(t.process(e))}_verifyTileComplexity(e,t){return this._verifyVertexComplexity(e)&&this._verifyFeatureDensity(e,t)}_verifyVertexComplexity(e){return e*this._minimumVerticesPerFeature<x}_verifyFeatureDensity(e,t){if((0,maybe.Wi)(this.tileInfo))return!1;const i=this.tileSize*t;return e*(j/(i*i))<w}_ensureFetchAllCounts(e){let t=!0;for(const[,i]of this._pendingTiles)i.state.type<PendingFeatureTile_u.FETCHED_COUNT&&this.updatingHandles.addPromise(i.process(e)),i.state.type<=PendingFeatureTile_u.FETCH_COUNT&&(t=!1);return t}_finishPendingTile(e,t){this.store.add(e.data,t),this._deletePendingTile(e),this._updateAvailability()}_updateAvailability(){const e=this._collectMissingTilesInfo();this._setAvailability((0,maybe.Wi)(e)?1:e.coveredArea/e.fullArea)}_setAvailability(e){this._set("availability",e)}_createPendingTile(e,t){const i=new PendingFeatureTile_o(e,t);return this._pendingTiles.set(e.id,i),i}_deletePendingTile(e){e.reset(),this._pendingTiles.delete(e.data.id)}async _fetchCount(e,t){return this.store.fetchCount(e.data,this.url,this._createCountQuery(e),{query:this.customParameters,timeout:S,signal:t})}async _fetchFeatures(e,t,i){let s=0;const r=[];let o=0,n=t;for(;;){const a=this._createFeaturesQuery(e),l=this._setPagingParameters(a,s,n),{features:c,exceededTransferLimit:d}=await this._queryFeatures(a,i);l&&(s+=(0,maybe.Wg)(a.num)),o+=c.length;for(const e of c)r.push(e);if(n=t-o,!l||!d||n<=0)return r}}_filterProperties(e){return(0,maybe.Wi)(e)?{where:"1=1",gdbVersion:void 0,timeExtent:void 0}:{where:e.where||"1=1",timeExtent:e.timeExtent,gdbVersion:e.gdbVersion}}_lookupObjectIdByGlobalId(e){const t=this.globalIdField,i=this.objectIdField;if((0,maybe.Wi)(t))throw new Error("Expected globalIdField to be defined");let s=null;if(this.store.featureStore.forEach((r=>{e===r.attributes[t]&&(s=r.objectId??r.attributes[i])})),(0,maybe.Wi)(s))throw new Error(`Expected to find a feature with globalId ${e}`);return s}_queryFeaturesById(e,t){const i=this._createFeaturesQuery();return i.objectIds=e,this._queryFeatures(i,t)}_queryFeatures(e,t){return this.capabilities.query.supportsFormatPBF?this._queryFeaturesPBF(e,t):this._queryFeaturesJSON(e,t)}async _queryFeaturesPBF(e,t){const{sourceSpatialReference:i}=this,{data:s}=await(0,query.qp)(this.url,e,new pbfOptimizedFeatureSet.J({sourceSpatialReference:i}),{query:this._configuration.customParameters,timeout:S,signal:t});return(0,featureConversionUtils.lM)(s)}async _queryFeaturesJSON(e,t){const{sourceSpatialReference:i}=this,{data:s}=await(0,query.JT)(this.url,e,i,{query:this._configuration.customParameters,timeout:S,signal:t});return(0,featureConversionUtils.h_)(s,this.objectIdField)}_createCountQuery(e){const t=this._createBaseQuery(e);return this.capabilities.query.supportsCacheHint&&(t.cacheHint=!0),t}_createFeaturesQuery(e=null){const t=this._createBaseQuery(e);return t.outFields=this.globalIdField?[this.globalIdField,this.objectIdField]:[this.objectIdField],t.returnGeometry=!0,(0,maybe.pC)(e)&&(this.capabilities.query.supportsResultType?t.resultType="tile":this.capabilities.query.supportsCacheHint&&(t.cacheHint=!0)),t}_createBaseQuery(e){const t=new Query.Z({returnZ:this.hasZ,returnM:!1,geometry:(0,maybe.pC)(this.tileInfo)&&(0,maybe.pC)(e)?(0,aaBoundingRect.HH)(e.data.extent,this.tileInfo.spatialReference):void 0}),i=this._configuration.filter;return(0,maybe.pC)(i)&&(t.where=i.where,t.gdbVersion=i.gdbVersion,t.timeExtent=i.timeExtent),t.outSpatialReference=this.spatialReference,t}_setPagingParameters(e,t,i){if(!this.capabilities.query.supportsPagination)return!1;const{supportsMaxRecordCountFactor:s,supportsCacheHint:r,tileMaxRecordCount:o,maxRecordCount:n,supportsResultType:a}=this.capabilities.query,l=s?Query.Z.MAX_MAX_RECORD_COUNT_FACTOR:1,u=l*((a||r)&&o?o:n||E);return e.start=t,s?(e.maxRecordCountFactor=Math.min(l,Math.ceil(i/u)),e.num=Math.min(i,e.maxRecordCountFactor*u)):e.num=Math.min(i,u),!0}};(0,tslib_es6._)([(0,property.Cb)({constructOnly:!0})],C.prototype,"url",void 0),(0,tslib_es6._)([(0,property.Cb)({constructOnly:!0})],C.prototype,"objectIdField",void 0),(0,tslib_es6._)([(0,property.Cb)({constructOnly:!0})],C.prototype,"globalIdField",void 0),(0,tslib_es6._)([(0,property.Cb)({constructOnly:!0})],C.prototype,"capabilities",void 0),(0,tslib_es6._)([(0,property.Cb)({constructOnly:!0})],C.prototype,"sourceSpatialReference",void 0),(0,tslib_es6._)([(0,property.Cb)({constructOnly:!0})],C.prototype,"spatialReference",void 0),(0,tslib_es6._)([(0,property.Cb)({constructOnly:!0})],C.prototype,"store",void 0),(0,tslib_es6._)([(0,property.Cb)({readOnly:!0})],C.prototype,"_minimumVerticesPerFeature",null),(0,tslib_es6._)([(0,property.Cb)()],C.prototype,"filter",null),(0,tslib_es6._)([(0,property.Cb)()],C.prototype,"customParameters",null),(0,tslib_es6._)([(0,property.Cb)({readOnly:!0})],C.prototype,"_configuration",null),(0,tslib_es6._)([(0,property.Cb)()],C.prototype,"tileInfo",null),(0,tslib_es6._)([(0,property.Cb)()],C.prototype,"tileSize",null),(0,tslib_es6._)([(0,property.Cb)()],C.prototype,"tilesOfInterest",void 0),(0,tslib_es6._)([(0,property.Cb)({readOnly:!0})],C.prototype,"updating",null),(0,tslib_es6._)([(0,property.Cb)({readOnly:!0})],C.prototype,"updatingExcludingEdits",null),(0,tslib_es6._)([(0,property.Cb)({readOnly:!0})],C.prototype,"availability",void 0),(0,tslib_es6._)([(0,property.Cb)()],C.prototype,"hasZ",null),C=(0,tslib_es6._)([(0,subclass.j)("esri.views.interactive.snapping.featureSources.featureServiceSource.FeatureServiceTiledFetcher")],C);const E=2e3,S=6e5,x=1e6,j=25,w=1;var byteSizeEstimations=__webpack_require__("./node_modules/@arcgis/core/core/byteSizeEstimations.js"),BoundsStore=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/data/BoundsStore.js"),TileKey=__webpack_require__("./node_modules/@arcgis/core/layers/support/TileKey.js");class FeatureServiceTileCache_t{constructor(){this._store=new Map,this._byteSize=0}set(t,e){this.delete(t),this._store.set(t,e),this._byteSize+=e.byteSize}delete(t){const e=this._store.get(t);return!!this._store.delete(t)&&(null!=e&&(this._byteSize-=e.byteSize),!0)}get(t){return this._used(t),this._store.get(t)}has(t){return this._used(t),this._store.has(t)}clear(){this._store.clear()}applyByteSizeLimit(t,e){for(const[s,r]of this._store){if(this._byteSize<=t)break;this.delete(s),e(r)}}values(){return this._store.values()}[Symbol.iterator](){return this._store[Symbol.iterator]()}_used(t){const e=this._store.get(t);e&&(this._store.delete(t),this._store.set(t,e))}}let v=class extends Accessor.Z{constructor(e){super(e),this.tileInfo=null,this.extent=null,this.maximumByteSize=10*byteSizeEstimations.Y8.MEGABYTES,this._tileBounds=new BoundsStore.H,this._tiles=new FeatureServiceTileCache_t,this._refCounts=new Map,this._tileFeatureCounts=new Map,this._tmpBoundingRect=(0,aaBoundingRect.Ue)()}add(e,t){const s=[];for(const i of t)this._referenceFeature(i.objectId)===FeatureServiceTileStore_x.ADDED&&s.push(i);this._addTileStorage(e,new Set(t.map((e=>e.objectId))),function FeatureServiceTileStore_C(e){return e.reduce(((e,t)=>e+function FeatureServiceTileStore_E(e){return 32+function FeatureServiceTileStore_S(e){if((0,maybe.Wi)(e))return 0;const t=(0,byteSizeEstimations.do)(e.lengths,4);return 32+(0,byteSizeEstimations.do)(e.coords,8)+t}(e.geometry)+(0,byteSizeEstimations.f2)(e.attributes)}(t)),0)}(t)),this.featureStore.addMany(s),this._tiles.applyByteSizeLimit(this.maximumByteSize,(e=>this._removeTileStorage(e)))}destroy(){this.clear(),this._tileFeatureCounts.clear()}clear(){this.featureStore.clear(),this._tileBounds.clear(),this._tiles.clear(),this._refCounts.clear()}refresh(){this.clear(),this._tileFeatureCounts.clear()}processEdits(e,t,s){return this._processEditsDelete(e.deletedFeatures.concat(e.updatedFeatures)),this._processEditsRefetch(e.addedFeatures.concat(e.updatedFeatures),t,s)}_addTileStorage(e,t,s){const i=e.id;this._tiles.set(i,new FeatureServiceTileStore_T(e,t,s)),this._tileBounds.set(i,e.extent),this._tileFeatureCounts.set(i,t.size)}_remove({id:e}){const t=this._tiles.get(e);t&&this._removeTileStorage(t)}_removeTileStorage(e){const t=[];for(const i of e.objectIds)this._unreferenceFeature(i)===FeatureServiceTileStore_x.REMOVED&&t.push(i);this.featureStore.removeManyById(t);const s=e.data.id;this._tiles.delete(s),this._tileBounds.delete(s)}_processEditsDelete(e){this.featureStore.removeManyById(e);for(const[,t]of this._tiles){for(const s of e)t.objectIds.delete(s);this._tileFeatureCounts.set(t.data.id,t.objectIds.size)}for(const t of e)this._refCounts.delete(t)}async _processEditsRefetch(e,t,s){const i=(await t(e,s)).features,{hasZ:r,hasM:n}=this.featureStore;for(const l of i){const e=(0,featureConversionUtils.$)(this._tmpBoundingRect,l.geometry,r,n);(0,maybe.Wi)(e)||this._tileBounds.forEachInBounds(e,(e=>{const t=this._tiles.get(e);this.featureStore.add(l);const s=l.objectId;t.objectIds.has(s)||(t.objectIds.add(s),this._referenceFeature(s),this._tileFeatureCounts.set(t.data.id,t.objectIds.size))}))}}process(e,t=(()=>!0)){if((0,maybe.Wi)(this.tileInfo)||!e.extent||(0,maybe.pC)(this.extent)&&!(0,aaBoundingRect.kK)((0,aaBoundingRect.oJ)(this.extent,this._tmpBoundingRect),e.extent))return new I(e);if(this._tiles.has(e.id))return new I(e);const s=this._createTileTree(e,this.tileInfo);return this._simplify(s,t,null,0,1),this._collectMissingTiles(e,s,this.tileInfo)}get debugInfo(){return Array.from(this._tiles.values()).map((({data:e})=>({data:e,featureCount:this._tileFeatureCounts.get(e.id)||0})))}getFeatureCount(e){return this._tileFeatureCounts.get(e.id)??0}async fetchCount(e,t,s,i){const r=this._tileFeatureCounts.get(e.id);if(null!=r)return r;const o=await(0,query.hH)(t,s,i);return this._tileFeatureCounts.set(e.id,o.data.count),o.data.count}_createTileTree(e,t){const s=new F(e.level,e.row,e.col);return t.updateTileInfo(s,TileInfo.Z.ExtrapolateOptions.POWER_OF_TWO),this._tileBounds.forEachInBounds(e.extent,(i=>{const r=this._tiles.get(i)?.data;r&&this._tilesAreRelated(e,r)&&this._populateChildren(s,r,t,this._tileFeatureCounts.get(r.id)||0)})),s}_tilesAreRelated(e,t){if(!e||!t)return!1;if(e.level===t.level)return e.row===t.row&&e.col===t.col;const s=e.level<t.level,i=s?e:t,r=s?t:e,o=1<<r.level-i.level;return Math.floor(r.row/o)===i.row&&Math.floor(r.col/o)===i.col}_populateChildren(e,t,s,i){const r=t.level-e.level-1;if(r<0)return void(e.isLeaf=!0);const o=t.row>>r,l=t.col>>r,a=e.row<<1,c=l-(e.col<<1)+(o-a<<1),h=e.children[c];if((0,maybe.pC)(h))this._populateChildren(h,t,s,i);else{const r=new F(e.level+1,o,l);s.updateTileInfo(r,TileInfo.Z.ExtrapolateOptions.POWER_OF_TWO),e.children[c]=r,this._populateChildren(r,t,s,i)}}_simplify(e,t,s,i,r){const o=r*r;if(e.isLeaf)return t(this.getFeatureCount(e),r)?0:(this._remove(e),(0,maybe.pC)(s)&&(s.children[i]=null),o);const l=r/2,a=l*l;let c=0;for(let h=0;h<e.children.length;h++){const s=e.children[h];c+=(0,maybe.pC)(s)?this._simplify(s,t,e,h,l):a}return 0===c?this._mergeChildren(e):1-c/o<FeatureServiceTileStore_w&&(this._purge(e),(0,maybe.pC)(s)&&(s.children[i]=null),c=o),c}_mergeChildren(e){const t=new Set;let s=0;this._forEachLeaf(e,(e=>{const i=this._tiles.get(e.id);if(i){s+=i.byteSize;for(const e of i.objectIds)t.has(e)||(t.add(e),this._referenceFeature(e));this._remove(e)}})),this._addTileStorage(e,t,s),e.isLeaf=!0,e.children[0]=e.children[1]=e.children[2]=e.children[3]=null,this._tileFeatureCounts.set(e.id,t.size)}_forEachLeaf(e,t){for(const s of e.children)(0,maybe.Wi)(s)||(s.isLeaf?t(s):this._forEachLeaf(s,t))}_purge(e){if(!(0,maybe.Wi)(e))if(e.isLeaf)this._remove(e);else for(let t=0;t<e.children.length;t++){const s=e.children[t];this._purge(s),e.children[t]=null}}_collectMissingTiles(e,t,s){const i=new FeatureServiceTileStore_j(s,e,this.extent);return this._collectMissingTilesRecurse(t,i,1),i.info}_collectMissingTilesRecurse(e,t,s){if(e.isLeaf)return;if(!e.hasChildren)return void t.addMissing(e.level,e.row,e.col,s);const i=s/2;for(let r=0;r<e.children.length;r++){const s=e.children[r];(0,maybe.Wi)(s)?t.addMissing(e.level+1,(e.row<<1)+((2&r)>>1),(e.col<<1)+(1&r),i):this._collectMissingTilesRecurse(s,t,i)}}_referenceFeature(e){const t=(this._refCounts.get(e)||0)+1;return this._refCounts.set(e,t),1===t?FeatureServiceTileStore_x.ADDED:FeatureServiceTileStore_x.UNCHANGED}_unreferenceFeature(e){const t=(this._refCounts.get(e)||0)-1;return 0===t?(this._refCounts.delete(e),FeatureServiceTileStore_x.REMOVED):(t>0&&this._refCounts.set(e,t),FeatureServiceTileStore_x.UNCHANGED)}get test(){return{tiles:Array.from(this._tiles.values()).map((e=>`${e.data.id}:[${Array.from(e.objectIds)}]`)),featureReferences:Array.from(this._refCounts.keys()).map((e=>`${e}:${this._refCounts.get(e)}`))}}};(0,tslib_es6._)([(0,property.Cb)({constructOnly:!0})],v.prototype,"featureStore",void 0),(0,tslib_es6._)([(0,property.Cb)()],v.prototype,"tileInfo",void 0),(0,tslib_es6._)([(0,property.Cb)()],v.prototype,"extent",void 0),(0,tslib_es6._)([(0,property.Cb)()],v.prototype,"maximumByteSize",void 0),v=(0,tslib_es6._)([(0,subclass.j)("esri.views.interactive.snapping.featureSources.featureServiceSource.FeatureServiceTileStore")],v);class FeatureServiceTileStore_T{constructor(e,t,s){this.data=e,this.objectIds=t,this.byteSize=s}}class F{constructor(e,t,s){this.level=e,this.row=t,this.col=s,this.isLeaf=!1,this.extent=null,this.children=[null,null,null,null]}get hasChildren(){return!this.isLeaf&&((0,maybe.pC)(this.children[0])||(0,maybe.pC)(this.children[1])||(0,maybe.pC)(this.children[2])||(0,maybe.pC)(this.children[3]))}}class I{constructor(e,t=[]){this.missingTiles=t,this.fullArea=0,this.coveredArea=0,this.fullArea=(0,aaBoundingRect.SO)(e.extent),this.coveredArea=this.fullArea}prepend(e){this.missingTiles=e.missingTiles.concat(this.missingTiles),this.coveredArea+=e.coveredArea,this.fullArea+=e.fullArea}}class FeatureServiceTileStore_j{constructor(e,t,s){this._tileInfo=e,this._extent=null,this.info=new I(t),(0,maybe.pC)(s)&&(this._extent=(0,aaBoundingRect.oJ)(s))}addMissing(e,t,s,i){const r=new TileKey.f(null,e,t,s);this._tileInfo.updateTileInfo(r,TileInfo.Z.ExtrapolateOptions.POWER_OF_TWO),(0,maybe.Wi)(r.extent)||(0,maybe.pC)(this._extent)&&!(0,aaBoundingRect.kK)(this._extent,r.extent)||(this.info.missingTiles.push({data:r,resolution:i}),this.info.coveredArea-=(0,aaBoundingRect.SO)(r.extent))}}const FeatureServiceTileStore_w=.18751;var FeatureServiceTileStore_x;!function(e){e[e.ADDED=0]="ADDED",e[e.REMOVED=1]="REMOVED",e[e.UNCHANGED=2]="UNCHANGED"}(FeatureServiceTileStore_x||(FeatureServiceTileStore_x={}));let FeatureServiceSnappingSourceWorker_w=class extends Evented.Z.EventedAccessor{constructor(){super(...arguments),this._isInitializing=!0,this.remoteClient=null,this._whenSetup=(0,promiseUtils.dD)(),this._elevationAligner=snappingCandidateElevationAlignment_r(),this._elevationFilter=snappingCandidateElevationFilter_r(),this._symbologyCandidatesFetcher=symbologySnappingCandidates_n(),this._handles=new Handles.Z,this._updatingHandles=new WatchUpdatingTracking.t,this._editsUpdatingHandles=new WatchUpdatingTracking.t,this._pendingApplyEdits=new Map,this._alignPointsInFeatures=async(e,t)=>{const i={points:e},s=await this.remoteClient.invoke("alignElevation",i,{signal:t});return(0,promiseUtils.k_)(t),s},this._getSymbologyCandidates=async(e,t)=>{const i={candidates:e,spatialReference:this._spatialReference.toJSON()},s=await this.remoteClient.invoke("getSymbologyCandidates",i,{signal:t});return(0,promiseUtils.k_)(t),s}}get updating(){return this.updatingExcludingEdits||this._editsUpdatingHandles.updating||this._featureFetcher.updating}get updatingExcludingEdits(){return this._featureFetcher.updatingExcludingEdits||this._isInitializing||this._updatingHandles.updating}destroy(){this._featureFetcher?.destroy(),this._queryEngine?.destroy(),this._featureStore?.clear(),this._handles?.destroy()}async setup(e){if(this.destroyed)return{result:{}};const{geometryType:t,objectIdField:i,timeInfo:r,fields:n}=e.serviceInfo,{hasZ:o}=e,d=SpatialReference.Z.fromJSON(e.spatialReference);this._spatialReference=d,this._featureStore=new FeatureStore.Z({...e.serviceInfo,hasZ:o,hasM:!1}),this._queryEngine=new QueryEngine.q({spatialReference:e.spatialReference,featureStore:this._featureStore,geometryType:t,fields:n,hasZ:o,hasM:!1,objectIdField:i,timeInfo:r}),this._featureFetcher=new C({store:new v({featureStore:this._featureStore}),url:e.serviceInfo.url,objectIdField:e.serviceInfo.objectIdField,globalIdField:e.serviceInfo.globalIdField,capabilities:e.serviceInfo.capabilities,spatialReference:d,sourceSpatialReference:SpatialReference.Z.fromJSON(e.serviceInfo.spatialReference)});const p="3d"===e.configuration.viewType;return this._elevationAligner=snappingCandidateElevationAlignment_r(p,{elevationInfo:(0,maybe.pC)(e.elevationInfo)?ElevationInfo.Z.fromJSON(e.elevationInfo):null,alignPointsInFeatures:this._alignPointsInFeatures,spatialReference:d}),this._elevationFilter=snappingCandidateElevationFilter_r(p),this._handles.add([(0,reactiveUtils.YP)((()=>this._featureFetcher.availability),(e=>this.emit("notify-availability",{availability:e})),reactiveUtils.Z_),(0,reactiveUtils.YP)((()=>this.updating),(()=>this._notifyUpdating()))]),this._whenSetup.resolve(),this._isInitializing=!1,this.configure(e.configuration)}async configure(e){return await this._updatingHandles.addPromise(this._whenSetup.promise),this._updateFeatureFetcherConfiguration(e),{result:{}}}async fetchCandidates(e,t){await this._whenSetup.promise,(0,promiseUtils.k_)(t);const i=function FeatureServiceSnappingSourceWorker_E(e){return{point:e.point,mode:e.mode,distance:e.distance,types:e.types,query:(0,maybe.pC)(e.filter)?e.filter:{where:"1=1"}}}(e),r=(0,maybe.pC)(t)?t.signal:null,a=await this._queryEngine.executeQueryForSnapping(i,r);(0,promiseUtils.k_)(r);const o=await this._elevationAligner.alignCandidates(a.candidates,r);(0,promiseUtils.k_)(r);const l=await this._symbologyCandidatesFetcher.fetch(o,r);(0,promiseUtils.k_)(r);const d=0===l.length?o:o.concat(l);return{result:{candidates:this._elevationFilter.filter(i,d)}}}async updateTiles(e,t){return await this._updatingHandles.addPromise(this._whenSetup.promise),(0,promiseUtils.k_)(t),this._featureFetcher.tileSize=e.tileSize,this._featureFetcher.tilesOfInterest=e.tiles,this._featureFetcher.tileInfo=(0,maybe.pC)(e.tileInfo)?TileInfo.Z.fromJSON(e.tileInfo):null,FeatureServiceSnappingSourceWorker_j}async refresh(e,t){return await this._updatingHandles.addPromise(this._whenSetup.promise),(0,promiseUtils.k_)(t),this._featureFetcher.refresh(),FeatureServiceSnappingSourceWorker_j}async whenNotUpdating(e,t){return await this._updatingHandles.addPromise(this._whenSetup.promise),(0,promiseUtils.k_)(t),await(0,reactiveUtils.N1)((()=>!this.updatingExcludingEdits),t),(0,promiseUtils.k_)(t),FeatureServiceSnappingSourceWorker_j}async getDebugInfo(e,t){return(0,promiseUtils.k_)(t),{result:this._featureFetcher.debugInfo}}async beginApplyEdits(e,t){this._updatingHandles.addPromise(this._whenSetup.promise),(0,promiseUtils.k_)(t);const i=(0,promiseUtils.dD)();return this._pendingApplyEdits.set(e.id,i),this._featureFetcher.applyEdits(i.promise),this._editsUpdatingHandles.addPromise(i.promise),FeatureServiceSnappingSourceWorker_j}async endApplyEdits(e,t){const i=this._pendingApplyEdits.get(e.id);return i&&i.resolve(e.edits),(0,promiseUtils.k_)(t),FeatureServiceSnappingSourceWorker_j}async notifyElevationSourceChange(e,t){return this._elevationAligner.notifyElevationSourceChange(),FeatureServiceSnappingSourceWorker_j}async notifySymbologyChange(e,t){return this._symbologyCandidatesFetcher.notifySymbologyChange(),FeatureServiceSnappingSourceWorker_j}async setSymbologySnappingSupported(e){return this._symbologyCandidatesFetcher=symbologySnappingCandidates_n(e,this._getSymbologyCandidates),FeatureServiceSnappingSourceWorker_j}_updateFeatureFetcherConfiguration(e){this._featureFetcher.filter=(0,maybe.pC)(e.filter)?Query.Z.fromJSON(e.filter):null,this._featureFetcher.customParameters=e.customParameters}_notifyUpdating(){this.emit("notify-updating",{updating:this.updating})}};(0,tslib_es6._)([(0,property.Cb)({readOnly:!0})],FeatureServiceSnappingSourceWorker_w.prototype,"updating",null),(0,tslib_es6._)([(0,property.Cb)({readOnly:!0})],FeatureServiceSnappingSourceWorker_w.prototype,"updatingExcludingEdits",null),(0,tslib_es6._)([(0,property.Cb)()],FeatureServiceSnappingSourceWorker_w.prototype,"_isInitializing",void 0),FeatureServiceSnappingSourceWorker_w=(0,tslib_es6._)([(0,subclass.j)("esri.views.interactive.snapping.featureSources.featureServiceSource.FeatureServiceSnappingSourceWorker")],FeatureServiceSnappingSourceWorker_w);const b=FeatureServiceSnappingSourceWorker_w;const FeatureServiceSnappingSourceWorker_j={result:{}}}}]);