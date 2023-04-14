"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[451],{"./node_modules/@arcgis/core/layers/ElevationLayer.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>T});var tslib_es6=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),request=__webpack_require__("./node_modules/@arcgis/core/request.js"),Error=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),maybe=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),MultiOriginJSONSupport=__webpack_require__("./node_modules/@arcgis/core/core/MultiOriginJSONSupport.js"),promiseUtils=__webpack_require__("./node_modules/@arcgis/core/core/promiseUtils.js"),urlUtils=__webpack_require__("./node_modules/@arcgis/core/core/urlUtils.js"),property=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),arrayUtils=(__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js")),reader=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/reader.js"),subclass=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js"),HeightModelInfo=__webpack_require__("./node_modules/@arcgis/core/geometry/HeightModelInfo.js"),Layer=__webpack_require__("./node_modules/@arcgis/core/layers/Layer.js"),ArcGISCachedService=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/ArcGISCachedService.js"),ArcGISService=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/ArcGISService.js"),OperationalLayer=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/OperationalLayer.js"),PortalLayer=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/PortalLayer.js"),commonProperties=__webpack_require__("./node_modules/@arcgis/core/layers/support/commonProperties.js");class ElevationTileData_e{constructor(a,t,s,e){this._hasNoDataValues=null,this._minValue=null,this._maxValue=null,"pixelData"in a?(this.values=a.pixelData,this.width=a.width,this.height=a.height,this.noDataValue=a.noDataValue):(this.values=a,this.width=t,this.height=s,this.noDataValue=e)}get hasNoDataValues(){if((0,maybe.Wi)(this._hasNoDataValues)){const a=this.noDataValue;this._hasNoDataValues=this.values.includes(a)}return this._hasNoDataValues}get minValue(){return this._ensureBounds(),(0,maybe.Wg)(this._minValue)}get maxValue(){return this._ensureBounds(),(0,maybe.Wg)(this._maxValue)}_ensureBounds(){if((0,maybe.pC)(this._minValue))return;const{noDataValue:a,values:t}=this;let e=1/0,i=-1/0,h=!0;for(const s of t)s===a?this._hasNoDataValues=!0:(e=s<e?s:e,i=s>i?s:i,h=!1);h?(this._minValue=0,this._maxValue=0):(this._minValue=e,this._maxValue=i>-3e38?i:0)}}var handleUtils=__webpack_require__("./node_modules/@arcgis/core/core/handleUtils.js"),Logger=__webpack_require__("./node_modules/@arcgis/core/core/Logger.js"),workers=__webpack_require__("./node_modules/@arcgis/core/core/workers/workers.js");class h{constructor(e,t,s,i,h={}){this._mainMethod=t,this._transferLists=s,this._listeners=[],this._promise=(0,workers.bA)(e,{...h,schedule:i}).then((e=>{if(void 0===this._thread){this._thread=e,this._promise=null,h.hasInitialize&&this.broadcast({},"initialize");for(const e of this._listeners)this._connectListener(e)}else e.close()})),this._promise.catch((t=>Logger.Z.getLogger("esri.core.workers.WorkerHandle").error(`Failed to initialize ${e} worker: ${t}`)))}on(r,i){const o={removed:!1,eventName:r,callback:i,threadHandle:null};return this._listeners.push(o),this._connectListener(o),(0,handleUtils.kB)((()=>{o.removed=!0,(0,arrayUtils.Od)(this._listeners,o),this._thread&&(0,maybe.pC)(o.threadHandle)&&o.threadHandle.remove()}))}destroy(){this._thread&&(this._thread.close(),this._thread=null),this._promise=null}invoke(e,t){return this.invokeMethod(this._mainMethod,e,t)}invokeMethod(e,t,r){if(this._thread){const s=this._transferLists[e],i=s?s(t):[];return this._thread.invoke(e,t,{transferList:i,signal:r})}return this._promise?this._promise.then((()=>((0,promiseUtils.k_)(r),this.invokeMethod(e,t,r)))):Promise.reject(null)}broadcast(e,t){return this._thread?Promise.all(this._thread.broadcast(t,e)).then((()=>{})):this._promise?this._promise.then((()=>this.broadcast(e,t))):Promise.reject()}get promise(){return this._promise}_connectListener(e){this._thread&&this._thread.on(e.eventName,e.callback).then((t=>{e.removed||(e.threadHandle=t)}))}}class s extends h{constructor(e=null){super("LercWorker","_decode",{_decode:e=>[e.buffer]},e,{strategy:"dedicated"}),this.schedule=e,this.ref=0}decode(e,r,t){return e&&0!==e.byteLength?this.invoke({buffer:e,options:r},t):Promise.resolve(null)}release(){--this.ref<=0&&(o.forEach(((e,r)=>{e===this&&o.delete(r)})),this.destroy())}}const o=new Map;let w=class extends((0,ArcGISCachedService.Z)((0,ArcGISService.Y)((0,OperationalLayer.q)((0,PortalLayer.I)((0,MultiOriginJSONSupport.R)(Layer.Z)))))){constructor(...e){super(...e),this.copyright=null,this.heightModelInfo=null,this.path=null,this.minScale=void 0,this.maxScale=void 0,this.opacity=1,this.operationalLayerType="ArcGISTiledElevationServiceLayer",this.sourceJSON=null,this.type="elevation",this.url=null,this.version=null,this._lercDecoder=function n(t=null){let n=o.get((0,maybe.Wg)(t));return n||((0,maybe.pC)(t)?(n=new s((e=>t.immediate.schedule(e))),o.set(t,n)):(n=new s,o.set(null,n))),++n.ref,n}()}normalizeCtorArgs(e,r){return"string"==typeof e?{url:e,...r}:e}destroy(){this._lercDecoder=(0,maybe.RY)(this._lercDecoder)}readVersion(e,r){let t=r.currentVersion;return t||(t=9.3),t}load(e){const r=(0,maybe.pC)(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Image Service"],supportsData:!1,validateItem:e=>{for(let r=0;r<e.typeKeywords.length;r++)if("elevation 3d layer"===e.typeKeywords[r].toLowerCase())return!0;throw new Error.Z("portal:invalid-layer-item-type","Invalid layer item type '${type}', expected '${expectedType}' ",{type:"Image Service",expectedType:"Image Service Elevation 3D Layer"})}},e).catch(promiseUtils.r9).then((()=>this._fetchImageService(r)))),Promise.resolve(this)}fetchTile(e,t,o,s){const a=(0,maybe.pC)((s=s||{signal:null}).signal)?s.signal:s.signal=(new AbortController).signal,l={responseType:"array-buffer",signal:a},p={noDataValue:s.noDataValue,returnFileInfo:!0};return this.load().then((()=>this._fetchTileAvailability(e,t,o,s))).then((()=>(0,request.default)(this.getTileUrl(e,t,o),l))).then((e=>this._lercDecoder.decode(e.data,p,a))).then((e=>new ElevationTileData_e(e)))}getTileUrl(e,r,t){const o=!this.tilemapCache&&this.supportsBlankTile,i=(0,urlUtils.B7)({...this.parsedUrl.query,blankTile:!o&&null});return`${this.parsedUrl.path}/tile/${e}/${r}/${t}${i?"?"+i:""}`}async queryElevation(e,r){const{ElevationQuery:t}=await __webpack_require__.e(2420).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/support/ElevationQuery.js"));return(0,promiseUtils.k_)(r),(new t).query(this,e,r)}async createElevationSampler(e,r){const{ElevationQuery:t}=await __webpack_require__.e(2420).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/support/ElevationQuery.js"));return(0,promiseUtils.k_)(r),(new t).createSampler(this,e,r)}_fetchTileAvailability(e,r,t,o){return this.tilemapCache?this.tilemapCache.fetchAvailability(e,r,t,o):Promise.resolve("unknown")}async _fetchImageService(e){if(this.sourceJSON)return this.sourceJSON;const t={query:{f:"json",...this.parsedUrl.query},responseType:"json",signal:e},o=await(0,request.default)(this.parsedUrl.path,t);o.ssl&&(this.url=this.url?.replace(/^http:/i,"https:")),this.sourceJSON=o.data,this.read(o.data,{origin:"service",url:this.parsedUrl})}get hasOverriddenFetchTile(){return!this.fetchTile.__isDefault__}};(0,tslib_es6._)([(0,property.Cb)({json:{read:{source:"copyrightText"}}})],w.prototype,"copyright",void 0),(0,tslib_es6._)([(0,property.Cb)({readOnly:!0,type:HeightModelInfo.Z})],w.prototype,"heightModelInfo",void 0),(0,tslib_es6._)([(0,property.Cb)({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],w.prototype,"path",void 0),(0,tslib_es6._)([(0,property.Cb)({type:["show","hide"]})],w.prototype,"listMode",void 0),(0,tslib_es6._)([(0,property.Cb)({json:{read:!1,write:!1,origins:{service:{read:!1,write:!1},"portal-item":{read:!1,write:!1},"web-document":{read:!1,write:!1}}},readOnly:!0})],w.prototype,"minScale",void 0),(0,tslib_es6._)([(0,property.Cb)({json:{read:!1,write:!1,origins:{service:{read:!1,write:!1},"portal-item":{read:!1,write:!1},"web-document":{read:!1,write:!1}}},readOnly:!0})],w.prototype,"maxScale",void 0),(0,tslib_es6._)([(0,property.Cb)({json:{read:!1,write:!1,origins:{"web-document":{read:!1,write:!1}}}})],w.prototype,"opacity",void 0),(0,tslib_es6._)([(0,property.Cb)({type:["ArcGISTiledElevationServiceLayer"]})],w.prototype,"operationalLayerType",void 0),(0,tslib_es6._)([(0,property.Cb)()],w.prototype,"sourceJSON",void 0),(0,tslib_es6._)([(0,property.Cb)({json:{read:!1},value:"elevation",readOnly:!0})],w.prototype,"type",void 0),(0,tslib_es6._)([(0,property.Cb)(commonProperties.HQ)],w.prototype,"url",void 0),(0,tslib_es6._)([(0,property.Cb)()],w.prototype,"version",void 0),(0,tslib_es6._)([(0,reader.r)("version",["currentVersion"])],w.prototype,"readVersion",null),w=(0,tslib_es6._)([(0,subclass.j)("esri.layers.ElevationLayer")],w),w.prototype.fetchTile.__isDefault__=!0;const T=w}}]);