"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[5034],{"./node_modules/@arcgis/core/layers/StreamLayer.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>X});var t,tslib_es6=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),PopupTemplate=(__webpack_require__("./node_modules/@arcgis/core/geometry.js"),__webpack_require__("./node_modules/@arcgis/core/PopupTemplate.js")),jsonUtils=(__webpack_require__("./node_modules/@arcgis/core/renderers/ClassBreaksRenderer.js"),__webpack_require__("./node_modules/@arcgis/core/renderers/DictionaryRenderer.js"),__webpack_require__("./node_modules/@arcgis/core/renderers/DotDensityRenderer.js"),__webpack_require__("./node_modules/@arcgis/core/renderers/HeatmapRenderer.js"),__webpack_require__("./node_modules/@arcgis/core/renderers/PieChartRenderer.js"),__webpack_require__("./node_modules/@arcgis/core/renderers/Renderer.js"),__webpack_require__("./node_modules/@arcgis/core/renderers/SimpleRenderer.js"),__webpack_require__("./node_modules/@arcgis/core/renderers/UniqueValueRenderer.js"),__webpack_require__("./node_modules/@arcgis/core/renderers/support/jsonUtils.js")),types=__webpack_require__("./node_modules/@arcgis/core/renderers/support/types.js"),request=__webpack_require__("./node_modules/@arcgis/core/request.js"),Error=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),handleUtils=__webpack_require__("./node_modules/@arcgis/core/core/handleUtils.js"),Logger=__webpack_require__("./node_modules/@arcgis/core/core/Logger.js"),MultiOriginJSONSupport=__webpack_require__("./node_modules/@arcgis/core/core/MultiOriginJSONSupport.js"),promiseUtils=__webpack_require__("./node_modules/@arcgis/core/core/promiseUtils.js"),property=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),ensureType=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),reader=(__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/has.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/reader.js")),subclass=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js"),typeUtils=__webpack_require__("./node_modules/@arcgis/core/geometry/support/typeUtils.js"),Layer=__webpack_require__("./node_modules/@arcgis/core/layers/Layer.js"),ArcGISService=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/ArcGISService.js"),BlendLayer=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/BlendLayer.js"),CustomParametersMixin=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/CustomParametersMixin.js"),FeatureEffectLayer=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/FeatureEffectLayer.js"),FeatureReductionLayer=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/FeatureReductionLayer.js"),OperationalLayer=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/OperationalLayer.js"),PortalLayer=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/PortalLayer.js"),RefreshableLayer=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/RefreshableLayer.js"),ScaleRangeLayer=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/ScaleRangeLayer.js"),TemporalLayer=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/TemporalLayer.js"),commonProperties=__webpack_require__("./node_modules/@arcgis/core/layers/support/commonProperties.js"),featureLayerUtils=__webpack_require__("./node_modules/@arcgis/core/layers/support/featureLayerUtils.js"),Field=__webpack_require__("./node_modules/@arcgis/core/layers/support/Field.js"),fieldProperties=__webpack_require__("./node_modules/@arcgis/core/layers/support/fieldProperties.js"),fieldUtils=__webpack_require__("./node_modules/@arcgis/core/layers/support/fieldUtils.js"),LabelClass=__webpack_require__("./node_modules/@arcgis/core/layers/support/LabelClass.js"),labelingInfo=__webpack_require__("./node_modules/@arcgis/core/layers/support/labelingInfo.js"),JSONSupport=__webpack_require__("./node_modules/@arcgis/core/core/JSONSupport.js");let i=t=class extends JSONSupport.wq{constructor(){super(...arguments),this.age=null,this.ageReceived=null,this.displayCount=null,this.maxObservations=1}clone(){return new t({age:this.age,ageReceived:this.ageReceived,displayCount:this.displayCount,maxObservations:this.maxObservations})}};(0,tslib_es6._)([(0,property.Cb)({type:Number,json:{write:!0}})],i.prototype,"age",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Number,json:{write:!0}})],i.prototype,"ageReceived",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Number,json:{write:!0}})],i.prototype,"displayCount",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Number,json:{write:!0}})],i.prototype,"maxObservations",void 0),i=t=(0,tslib_es6._)([(0,subclass.j)("esri.layers.support.PurgeOptions")],i);const p=i;var styleUtils=__webpack_require__("./node_modules/@arcgis/core/renderers/support/styleUtils.js"),Query=__webpack_require__("./node_modules/@arcgis/core/rest/support/Query.js"),popupUtils=__webpack_require__("./node_modules/@arcgis/core/support/popupUtils.js"),ElevationInfo=__webpack_require__("./node_modules/@arcgis/core/symbols/support/ElevationInfo.js"),SpatialReference=__webpack_require__("./node_modules/@arcgis/core/geometry/SpatialReference.js"),Extent=__webpack_require__("./node_modules/@arcgis/core/geometry/Extent.js");const Q=(0,fieldProperties.v)();function H(e,t){return new Error.Z("layer:unsupported",`Layer (${e.title}, ${e.id}) of type '${e.declaredClass}' ${t}`,{layer:e})}let K=class extends((0,FeatureReductionLayer.M)((0,FeatureEffectLayer.b)((0,BlendLayer.h)((0,TemporalLayer.n)((0,ScaleRangeLayer.M)((0,RefreshableLayer.Q)((0,ArcGISService.Y)((0,OperationalLayer.q)((0,PortalLayer.I)((0,MultiOriginJSONSupport.R)((0,CustomParametersMixin.N)(Layer.Z)))))))))))){constructor(...e){super(...e),this.copyright=null,this.definitionExpression=null,this.displayField=null,this.elevationInfo=null,this.fields=null,this.fieldsIndex=null,this.geometryDefinition=null,this.geometryType=null,this.labelsVisible=!0,this.labelingInfo=null,this.legendEnabled=!0,this.maxReconnectionAttempts=0,this.maxReconnectionInterval=20,this.maxScale=0,this.minScale=0,this.objectIdField=null,this.operationalLayerType="ArcGISStreamLayer",this.popupEnabled=!0,this.popupTemplate=null,this.purgeOptions=new p,this.refreshInterval=0,this.screenSizePerspectiveEnabled=!0,this.sourceJSON=null,this.spatialReference=SpatialReference.Z.WGS84,this.type="stream",this.url=null,this.updateInterval=300,this.useViewTime=!0,this.webSocketUrl=null}normalizeCtorArgs(e,t){return"string"==typeof e?{url:e,...t}:e}load(e){if(!("WebSocket"in globalThis))return this.addResolvingPromise(Promise.reject(new Error.Z("stream-layer:websocket-unsupported","WebSocket is not supported in this browser. StreamLayer will not have real-time connection with the stream service."))),Promise.resolve(this);const t=null!=e?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Stream Service","Feed"]},e).catch(promiseUtils.r9).then((()=>this._fetchService(t)))),Promise.resolve(this)}get defaultPopupTemplate(){return this.createPopupTemplate()}set featureReduction(e){const t=this._normalizeFeatureReduction(e);this._set("featureReduction",t)}set renderer(e){(0,fieldUtils.YN)(e,this.fieldsIndex),this._set("renderer",e)}readRenderer(e,t,i){t=t.layerDefinition||t;const o=t.drawingInfo?.renderer;if(o){const e=(0,jsonUtils.a)(o,t,i)||void 0;return e||Logger.Z.getLogger(this).error("Failed to create renderer",{rendererDefinition:t.drawingInfo.renderer,layer:this,context:i}),e}return(0,featureLayerUtils.Ob)(t,i)}async connect(e){const[{createConnection:t}]=await Promise.all([Promise.all([__webpack_require__.e(8537),__webpack_require__.e(7833)]).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/layers/graphics/sources/connections/createConnection.js")),this.load()]),r=this.geometryType?typeUtils.M.toJSON(this.geometryType):null,{customParameters:i=null,definitionExpression:o=null,geometryDefinition:s=null,maxReconnectionAttempts:n=0,maxReconnectionInterval:p=20,spatialReference:l=this.spatialReference}=e||this.createConnectionParameters(),m=t(this.parsedUrl,this.spatialReference,l,r,{geometry:s,where:o},n,p,i??void 0),d=(0,handleUtils.AL)([this.on("send-message-to-socket",(e=>m.sendMessageToSocket(e))),this.on("send-message-to-client",(e=>m.sendMessageToClient(e)))]);return m.once("destroy",d.remove),m}createConnectionParameters(){return{spatialReference:this.spatialReference,customParameters:this.customParameters,definitionExpression:this.definitionExpression,geometryDefinition:this.geometryDefinition,maxReconnectionAttempts:this.maxReconnectionAttempts,maxReconnectionInterval:this.maxReconnectionInterval}}createPopupTemplate(e){return(0,popupUtils.eZ)(this,e)}createQuery(){const e=new Query.Z;return e.returnGeometry=!0,e.outFields=["*"],e.where=this.definitionExpression||"1=1",e}getFieldDomain(e,t){if(!this.fields)return null;let r=null;return this.fields.some((t=>(t.name===e&&(r=t.domain),!!r))),r}getField(e){return this.fieldsIndex.get(e)}serviceSupportsSpatialReference(e){return!0}sendMessageToSocket(e){this.emit("send-message-to-socket",e)}sendMessageToClient(e){this.emit("send-message-to-client",e)}write(e,t){const r=t?.messages;return this.webSocketUrl?(r?.push(H(this,"using a custom websocket connection cannot be written to web scenes and web maps")),null):this.parsedUrl?super.write(e,t):(r?.push(H(this,"using a client-side only connection without a url cannot be written to web scenes and web maps")),null)}async _fetchService(e){if(!this.webSocketUrl&&this.parsedUrl){if(!this.sourceJSON){const{data:t}=await(0,request.default)(this.parsedUrl.path,{query:{f:"json",...this.customParameters,...this.parsedUrl.query},responseType:"json",signal:e});this.sourceJSON=t}}else{if(!this.timeInfo?.trackIdField)throw new Error.Z("stream-layer:missing-metadata","The stream layer trackIdField must be specified.");if(!this.objectIdField){const e=this.fields.find((e=>"oid"===e.type))?.name;if(!e)throw new Error.Z("stream-layer:missing-metadata","The stream layer objectIdField must be specified.");this.objectIdField=e}if(!this.fields)throw new Error.Z("stream-layer:missing-metadata","The stream layer fields must be specified.");if(this.fields.some((e=>e.name===this.objectIdField))||this.fields.push(new Field.Z({name:this.objectIdField,alias:this.objectIdField,type:"oid"})),!this.geometryType)throw new Error.Z("stream-layer:missing-metadata","The stream layer geometryType must be specified.");this.webSocketUrl&&(this.url=this.webSocketUrl)}return this.read(this.sourceJSON,{origin:"service",portalItem:this.portalItem,portal:this.portalItem?.portal,url:this.parsedUrl}),(0,fieldUtils.YN)(this.renderer,this.fieldsIndex),(0,fieldUtils.UF)(this.timeInfo,this.fieldsIndex),this.objectIdField||(this.objectIdField="__esri_stream_id__"),(0,styleUtils.y)(this,{origin:"service"})}};(0,tslib_es6._)([(0,property.Cb)({type:String})],K.prototype,"copyright",void 0),(0,tslib_es6._)([(0,property.Cb)({readOnly:!0})],K.prototype,"defaultPopupTemplate",null),(0,tslib_es6._)([(0,property.Cb)({type:String,json:{name:"layerDefinition.definitionExpression",write:{enabled:!0,allowNull:!0}}})],K.prototype,"definitionExpression",void 0),(0,tslib_es6._)([(0,property.Cb)({type:String})],K.prototype,"displayField",void 0),(0,tslib_es6._)([(0,property.Cb)({type:ElevationInfo.Z})],K.prototype,"elevationInfo",void 0),(0,tslib_es6._)([(0,property.Cb)({json:{origins:{"web-map":{read:!1,write:!1},"portal-item":{read:!1,write:!1},"web-scene":{read:!1,write:!1}}}})],K.prototype,"featureReduction",null),(0,tslib_es6._)([(0,property.Cb)(Q.fields)],K.prototype,"fields",void 0),(0,tslib_es6._)([(0,property.Cb)(Q.fieldsIndex)],K.prototype,"fieldsIndex",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Extent.Z,json:{name:"layerDefinition.definitionGeometry",write:!0}})],K.prototype,"geometryDefinition",void 0),(0,tslib_es6._)([(0,property.Cb)({type:typeUtils.M.apiValues,json:{read:{reader:typeUtils.M.read}}})],K.prototype,"geometryType",void 0),(0,tslib_es6._)([(0,property.Cb)(commonProperties.iR)],K.prototype,"labelsVisible",void 0),(0,tslib_es6._)([(0,property.Cb)({type:[LabelClass.Z],json:{read:{source:"layerDefinition.drawingInfo.labelingInfo",reader:labelingInfo.r},write:{target:"layerDefinition.drawingInfo.labelingInfo"}}})],K.prototype,"labelingInfo",void 0),(0,tslib_es6._)([(0,property.Cb)(commonProperties.rn)],K.prototype,"legendEnabled",void 0),(0,tslib_es6._)([(0,property.Cb)({type:["show","hide"]})],K.prototype,"listMode",void 0),(0,tslib_es6._)([(0,property.Cb)({type:ensureType.z8})],K.prototype,"maxReconnectionAttempts",void 0),(0,tslib_es6._)([(0,property.Cb)({type:ensureType.z8})],K.prototype,"maxReconnectionInterval",void 0),(0,tslib_es6._)([(0,property.Cb)(commonProperties.u1)],K.prototype,"maxScale",void 0),(0,tslib_es6._)([(0,property.Cb)(commonProperties.rO)],K.prototype,"minScale",void 0),(0,tslib_es6._)([(0,property.Cb)({type:String})],K.prototype,"objectIdField",void 0),(0,tslib_es6._)([(0,property.Cb)({value:"ArcGISStreamLayer",type:["ArcGISStreamLayer"]})],K.prototype,"operationalLayerType",void 0),(0,tslib_es6._)([(0,property.Cb)(commonProperties.C_)],K.prototype,"popupEnabled",void 0),(0,tslib_es6._)([(0,property.Cb)({type:PopupTemplate.Z,json:{name:"popupInfo",write:!0}})],K.prototype,"popupTemplate",void 0),(0,tslib_es6._)([(0,property.Cb)({type:p})],K.prototype,"purgeOptions",void 0),(0,tslib_es6._)([(0,property.Cb)({json:{read:!1,write:!1}})],K.prototype,"refreshInterval",void 0),(0,tslib_es6._)([(0,property.Cb)({types:types.A,json:{origins:{service:{write:{target:"drawingInfo.renderer",enabled:!1}},"web-scene":{name:"layerDefinition.drawingInfo.renderer",types:types.o,write:!0}},write:{target:"layerDefinition.drawingInfo.renderer"}}})],K.prototype,"renderer",null),(0,tslib_es6._)([(0,reader.r)("service","renderer",["drawingInfo.renderer","defaultSymbol"]),(0,reader.r)("renderer",["layerDefinition.drawingInfo.renderer","layerDefinition.defaultSymbol"])],K.prototype,"readRenderer",null),(0,tslib_es6._)([(0,property.Cb)(commonProperties.YI)],K.prototype,"screenSizePerspectiveEnabled",void 0),(0,tslib_es6._)([(0,property.Cb)()],K.prototype,"sourceJSON",void 0),(0,tslib_es6._)([(0,property.Cb)({type:SpatialReference.Z,json:{origins:{service:{read:{source:"spatialReference"}}}}})],K.prototype,"spatialReference",void 0),(0,tslib_es6._)([(0,property.Cb)({json:{read:!1}})],K.prototype,"type",void 0),(0,tslib_es6._)([(0,property.Cb)(commonProperties.HQ)],K.prototype,"url",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Number})],K.prototype,"updateInterval",void 0),(0,tslib_es6._)([(0,property.Cb)({json:{read:!1,write:!1}})],K.prototype,"useViewTime",void 0),(0,tslib_es6._)([(0,property.Cb)({type:String})],K.prototype,"webSocketUrl",void 0),K=(0,tslib_es6._)([(0,subclass.j)("esri.layers.StreamLayer")],K);const X=K},"./node_modules/@arcgis/core/renderers/support/styleUtils.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{y:()=>t});var _core_asyncUtils_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/asyncUtils.js"),_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/promiseUtils.js"),_core_Warning_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/core/Warning.js");async function t(t,i,n){const s=t&&t.getAtOrigin&&t.getAtOrigin("renderer",i.origin);if(s&&"unique-value"===s.type&&s.styleOrigin){const a=await(0,_core_asyncUtils_js__WEBPACK_IMPORTED_MODULE_0__.q6)(s.populateFromStyle());if((0,_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_1__.k_)(n),!1===a.ok){const e=a.error;i&&i.messages&&i.messages.push(new _core_Warning_js__WEBPACK_IMPORTED_MODULE_2__.Z("renderer:style-reference",`Failed to create unique value renderer from style reference: ${e.message}`,{error:e,context:i})),t.clear("renderer",i?.origin)}}}}}]);