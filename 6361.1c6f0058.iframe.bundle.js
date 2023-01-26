"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[6361],{"./node_modules/@arcgis/core/layers/support/arcgisLayers.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{fromUrl:()=>c});var _core_Error_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),_core_maybe_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/urlUtils.js"),_arcgisLayerUrl_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/layers/support/arcgisLayerUrl.js"),_fetchService_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/layers/support/fetchService.js"),_lazyLayerLoader_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/layers/support/lazyLayerLoader.js");async function c(e){const r=e.properties?.customParameters,a=await async function m(a,t){let s=(0,_arcgisLayerUrl_js__WEBPACK_IMPORTED_MODULE_2__.Qc)(a);if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_5__.Wi)(s)&&(s=await f(a,t)),(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_5__.Wi)(s))throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_0__.Z("arcgis-layers:url-mismatch","The url '${url}' is not a valid arcgis resource",{url:a});const{serverType:l,sublayer:u}=s;let y;const c={FeatureServer:"FeatureLayer",StreamServer:"StreamLayer",VectorTileServer:"VectorTileLayer"};switch(l){case"MapServer":y=null!=u?"FeatureLayer":async function b(e,r){return(await(0,_fetchService_js__WEBPACK_IMPORTED_MODULE_3__.C)(e,{customParameters:r})).tileInfo}(a,t).then((e=>e?"TileLayer":"MapImageLayer"));break;case"ImageServer":y=(0,_fetchService_js__WEBPACK_IMPORTED_MODULE_3__.C)(a,{customParameters:t}).then((e=>{const r=e.tileInfo&&e.tileInfo.format;return e.tileInfo?"LERC"!==r?.toUpperCase()||e.cacheType&&"elevation"!==e.cacheType.toLowerCase()?"ImageryTileLayer":"ElevationLayer":"ImageryLayer"}));break;case"SceneServer":y=(0,_fetchService_js__WEBPACK_IMPORTED_MODULE_3__.C)(s.url.path,{customParameters:t}).then((e=>{if(e){if("Voxel"===e?.layerType)return"VoxelLayer";if(e?.layers&&Array.isArray(e.layers)&&e.layers.length>0){const r={Point:"SceneLayer","3DObject":"SceneLayer",IntegratedMesh:"IntegratedMeshLayer",PointCloud:"PointCloudLayer",Building:"BuildingSceneLayer"},a=e.layers[0]?.layerType;if(null!=r[a])return r[a]}}return"SceneLayer"}));break;default:y=c[l]}const i={FeatureLayer:!0,SceneLayer:!0},d="FeatureServer"===l,m={parsedUrl:s,Constructor:null,layerOrTableId:d?u:null,sublayerIds:null,tableIds:null},p=await y;if(i[p]&&null==u){const e=await async function I(e,r,a){let t,s=!1;if("FeatureServer"===r){const r=await(0,_fetchService_js__WEBPACK_IMPORTED_MODULE_3__.V)(e,{customParameters:a});s=!!r.layersJSON,t=r.layersJSON||r.serviceJSON}else t=await(0,_fetchService_js__WEBPACK_IMPORTED_MODULE_3__.C)(e,{customParameters:a});const n=t?.layers,l=t?.tables;return{layerIds:n?.map((e=>e.id)).reverse()||[],tableIds:l?.map((e=>e.id)).reverse()||[],layerInfos:s?n:[],tableInfos:s?l:[]}}(a,l,t);d&&(m.sublayerInfos=e.layerInfos,m.tableInfos=e.tableInfos),1!==e.layerIds.length+e.tableIds.length?(m.sublayerIds=e.layerIds,m.tableIds=e.tableIds):d&&(m.layerOrTableId=e.layerIds[0]??e.tableIds[0],m.sourceJSON=e.layerInfos[0]??e.tableInfos[0])}return m.Constructor=await async function S(e){return(0,_lazyLayerLoader_js__WEBPACK_IMPORTED_MODULE_4__.T[e])()}(p),m}(e.url,r),t={...e.properties,url:e.url};if(!a.sublayerIds)return null!=a.layerOrTableId&&(t.layerId=a.layerOrTableId,t.sourceJSON=a.sourceJSON),new a.Constructor(t);const s=new(0,(await __webpack_require__.e(6753).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/GroupLayer.js"))).default)({title:a.parsedUrl.title});return function d(e,r,t){function s(e,s){const n={...t,layerId:e,sublayerTitleMode:"service-name"};return(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_5__.pC)(s)&&(n.sourceJSON=s),new r.Constructor(n)}r.sublayerIds.forEach((a=>{const t=s(a,i(r.sublayerInfos,a));e.add(t)})),r.tableIds.forEach((a=>{const t=s(a,i(r.tableInfos,a));e.tables.add(t)}))}(s,a,t),s}function i(e,r){return e?e.find((e=>e.id===r)):null}async function f(e,r){const n=await(0,_fetchService_js__WEBPACK_IMPORTED_MODULE_3__.C)(e,{customParameters:r});let u=null,y=null;const c=n.type;if("Feature Layer"===c||"Table"===c?(u="FeatureServer",y=n.id):"indexedVector"===c?u="VectorTileServer":n.hasOwnProperty("mapName")?u="MapServer":n.hasOwnProperty("bandCount")&&n.hasOwnProperty("pixelSizeX")?u="ImageServer":n.hasOwnProperty("maxRecordCount")&&n.hasOwnProperty("allowGeometryUpdates")?u="FeatureServer":n.hasOwnProperty("streamUrls")?u="StreamServer":p(n)?(u="SceneServer",y=n.id):n.hasOwnProperty("layers")&&p(n.layers?.[0])&&(u="SceneServer"),!u)return null;const i=null!=y?(0,_arcgisLayerUrl_js__WEBPACK_IMPORTED_MODULE_2__.DR)(e):null;return{title:(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_5__.pC)(i)&&n.name||(0,_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_1__.vt)(e),serverType:u,sublayer:y,url:{path:(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_5__.pC)(i)?i.serviceUrl:(0,_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_1__.mN)(e).path}}}function p(e){return e?.hasOwnProperty("store")&&e.hasOwnProperty("id")&&"number"==typeof e.id}},"./node_modules/@arcgis/core/layers/support/fetchService.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{C:()=>a,V:()=>r});var _request_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/request.js");async function r(e,r){let s=await a(e,r);s=s||{},s.layers=s.layers?.filter(t)||[];const n={serviceJSON:s};if((s.currentVersion??0)<10.5)return n;const o=await a(e+"/layers",r);return n.layersJSON={layers:o?.layers?.filter(t)||[],tables:o?.tables||[]},n}function t(e){return!e.type||"Feature Layer"===e.type}async function a(r,t){return(await(0,_request_js__WEBPACK_IMPORTED_MODULE_0__.default)(r,{responseType:"json",query:{f:"json",...t?.customParameters,token:t?.apiKey}})).data}},"./node_modules/@arcgis/core/layers/support/lazyLayerLoader.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>a});const a={BingMapsLayer:async()=>(await __webpack_require__.e(1968).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/BingMapsLayer.js"))).default,BuildingSceneLayer:async()=>(await Promise.all([__webpack_require__.e(5149),__webpack_require__.e(6273),__webpack_require__.e(349),__webpack_require__.e(9871)]).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/BuildingSceneLayer.js"))).default,CSVLayer:async()=>(await __webpack_require__.e(9849).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/CSVLayer.js"))).default,DimensionLayer:async()=>(await __webpack_require__.e(442).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/DimensionLayer.js"))).default,ElevationLayer:async()=>(await __webpack_require__.e(5171).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/ElevationLayer.js"))).default,FeatureLayer:async()=>(await Promise.resolve().then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/FeatureLayer.js"))).default,GroupLayer:async()=>(await __webpack_require__.e(6753).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/GroupLayer.js"))).default,GeoRSSLayer:async()=>(await __webpack_require__.e(4417).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/GeoRSSLayer.js"))).default,GeoJSONLayer:async()=>(await Promise.resolve().then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/GeoJSONLayer.js"))).default,ImageryLayer:async()=>(await Promise.all([__webpack_require__.e(1329),__webpack_require__.e(4733),__webpack_require__.e(6199),__webpack_require__.e(4019)]).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/ImageryLayer.js"))).default,ImageryTileLayer:async()=>(await Promise.all([__webpack_require__.e(1329),__webpack_require__.e(4733),__webpack_require__.e(906),__webpack_require__.e(6199),__webpack_require__.e(6329)]).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/ImageryTileLayer.js"))).default,IntegratedMeshLayer:async()=>(await Promise.all([__webpack_require__.e(5149),__webpack_require__.e(6479)]).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/IntegratedMeshLayer.js"))).default,KMLLayer:async()=>(await __webpack_require__.e(693).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/KMLLayer.js"))).default,LineOfSightLayer:async()=>(await __webpack_require__.e(4277).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/LineOfSightLayer.js"))).default,MapImageLayer:async()=>(await Promise.all([__webpack_require__.e(7153),__webpack_require__.e(9420)]).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/MapImageLayer.js"))).default,MapNotesLayer:async()=>(await __webpack_require__.e(849).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/MapNotesLayer.js"))).default,OGCFeatureLayer:async()=>(await __webpack_require__.e(3963).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/OGCFeatureLayer.js"))).default,OpenStreetMapLayer:async()=>(await __webpack_require__.e(3206).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/OpenStreetMapLayer.js"))).default,OrientedImageryLayer:async()=>(await __webpack_require__.e(3414).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/OrientedImageryLayer.js"))).default,PointCloudLayer:async()=>(await __webpack_require__.e(3108).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/PointCloudLayer.js"))).default,RouteLayer:async()=>(await Promise.all([__webpack_require__.e(3970),__webpack_require__.e(5015)]).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/RouteLayer.js"))).default,SceneLayer:async()=>(await Promise.all([__webpack_require__.e(5149),__webpack_require__.e(6273),__webpack_require__.e(349),__webpack_require__.e(4606)]).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/SceneLayer.js"))).default,StreamLayer:async()=>(await __webpack_require__.e(5609).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/StreamLayer.js"))).default,SubtypeGroupLayer:async()=>(await __webpack_require__.e(7764).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/SubtypeGroupLayer.js"))).default,TileLayer:async()=>(await Promise.all([__webpack_require__.e(7153),__webpack_require__.e(5369)]).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/TileLayer.js"))).default,UnknownLayer:async()=>(await __webpack_require__.e(81).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/UnknownLayer.js"))).default,UnsupportedLayer:async()=>(await __webpack_require__.e(4864).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/UnsupportedLayer.js"))).default,VectorTileLayer:async()=>(await Promise.resolve().then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/VectorTileLayer.js"))).default,VoxelLayer:async()=>(await __webpack_require__.e(5519).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/VoxelLayer.js"))).default,WebTileLayer:async()=>(await Promise.resolve().then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/WebTileLayer.js"))).default,WFSLayer:async()=>(await __webpack_require__.e(4420).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/WFSLayer.js"))).default,WMSLayer:async()=>(await __webpack_require__.e(1936).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/WMSLayer.js"))).default,WMTSLayer:async()=>(await __webpack_require__.e(9306).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/WMTSLayer.js"))).default}}}]);