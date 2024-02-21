"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[57912],{"./node_modules/@arcgis/core/views/2d/layers/StreamLayerView2D.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>y});var tslib_es6=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),Error=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),handleUtils=__webpack_require__("./node_modules/@arcgis/core/core/handleUtils.js"),reactiveUtils=__webpack_require__("./node_modules/@arcgis/core/core/reactiveUtils.js"),property=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),subclass=(__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/has.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js")),FeatureSet=__webpack_require__("./node_modules/@arcgis/core/rest/support/FeatureSet.js"),FeatureLayerView2D=__webpack_require__("./node_modules/@arcgis/core/views/2d/layers/FeatureLayerView2D.js"),util=__webpack_require__("./node_modules/@arcgis/core/views/2d/layers/support/util.js"),FeatureFilter=__webpack_require__("./node_modules/@arcgis/core/layers/support/FeatureFilter.js");const o=o=>{let i=class extends o{resume(){this._isUserPaused=!1,this.suspended||this._doResume()}pause(){this._isUserPaused=!0,this.suspended||this._doPause()}constructor(...s){super(...s),this._isUserPaused=!1,this.filter=null}get connectionStatus(){return this._isUserPaused?"paused":this._streamConnectionStatus}_onSuspendedChange(s){s?this._doPause():this._isUserPaused||this._doResume()}};return(0,tslib_es6._)([(0,property.MZ)()],i.prototype,"_isUserPaused",void 0),(0,tslib_es6._)([(0,property.MZ)({readOnly:!0})],i.prototype,"connectionStatus",null),(0,tslib_es6._)([(0,property.MZ)({type:FeatureFilter.A})],i.prototype,"filter",void 0),i=(0,tslib_es6._)([(0,subclass.$)("esri.layers.mixins.StreamLayerView")],i),i};function u(e,t){if(null==e&&null==t)return null;const r={};return null!=t&&(r.geometry=t.toJSON()),null!=e&&(r.where=e),r}let d=class extends(o(FeatureLayerView2D.default)){constructor(){super(...arguments),this.pipelineConnectionStatus="disconnected",this.pipelineErrorString=null,this._enabledEventTypes=new Set}initialize(){this.addHandles([(0,reactiveUtils.wB)((()=>this.layer.customParameters),(e=>this._proxy.updateCustomParameters(e))),this.layer.on("send-message-to-socket",(e=>this._proxy.sendMessageToSocket(e))),this.layer.on("send-message-to-client",(e=>this._proxy.sendMessageToClient(e))),(0,reactiveUtils.wB)((()=>this.layer.purgeOptions),(()=>this._update())),(0,reactiveUtils.wB)((()=>this.suspended),this._onSuspendedChange.bind(this))],"constructor")}get connectionError(){return this.pipelineErrorString?new Error.A("stream-controller",this.pipelineErrorString):null}on(e,t){if(Array.isArray(e))return(0,handleUtils.vE)(e.map((e=>this.on(e,t))));const i=["data-received","message-received"].includes(e);i&&(this._enabledEventTypes.add(e),this._proxy.enableEvent(e,!0));const n=super.on(e,t),o=this;return(0,handleUtils.hA)((()=>{n.remove(),i&&(o._proxy.closed||o.hasEventListener(e)||o._proxy.enableEvent(e,!1))}))}queryLatestObservations(e,r){if(!(this.layer.timeInfo?.endField||this.layer.timeInfo?.startField||this.layer.timeInfo?.trackIdField))throw new Error.A("streamlayer-no-timeField","queryLatestObservation can only be used with services that define a TrackIdField");return this._proxy.queryLatestObservations(this._cleanUpQuery(e),r).then((e=>{const t=FeatureSet.A.fromJSON(e);return t.features.forEach((e=>{e.layer=this.layer,e.sourceLayer=this.layer})),t}))}detach(){super.detach(),this.pipelineConnectionStatus="disconnected"}get _streamConnectionStatus(){return this.pipelineConnectionStatus}_doPause(){this._proxy?.pauseStream()}_doResume(){this._proxy?.resumeStream()}_createClientOptions(){return{...super._createClientOptions(),setProperty:e=>{this.set(e.propertyName,e.value)}}}_createTileRendererHash(e){const t=`${JSON.stringify(this.layer.purgeOptions)}.${JSON.stringify(u(this.layer.definitionExpression,this.layer.geometryDefinition))})`;return super._createTileRendererHash(e)+t}async _createServiceOptions(){const e=this.layer,{objectIdField:t}=e,r=e.fields.map((e=>e.toJSON())),s=(0,util.eh)(e.geometryType),i=e.timeInfo?.toJSON()||null,n=e.spatialReference?e.spatialReference.toJSON():null;return{type:"stream",isPaused:this._isUserPaused,fields:r,fieldsIndex:this.layer.fieldsIndex.toJSON(),geometryType:s,objectIdField:t,timeInfo:i,source:this.layer.parsedUrl,serviceFilter:u(this.layer.definitionExpression,this.layer.geometryDefinition),purgeOptions:this.layer.purgeOptions.toJSON(),enabledEventTypes:Array.from(this._enabledEventTypes.values()),spatialReference:n,maxReconnectionAttempts:this.layer.maxReconnectionAttempts,maxReconnectionInterval:this.layer.maxReconnectionInterval,updateInterval:this.layer.updateInterval,customParameters:e.customParameters}}};(0,tslib_es6._)([(0,property.MZ)()],d.prototype,"pipelineConnectionStatus",void 0),(0,tslib_es6._)([(0,property.MZ)()],d.prototype,"pipelineErrorString",void 0),(0,tslib_es6._)([(0,property.MZ)({readOnly:!0})],d.prototype,"connectionError",null),(0,tslib_es6._)([(0,property.MZ)({readOnly:!0})],d.prototype,"_streamConnectionStatus",null),d=(0,tslib_es6._)([(0,subclass.$)("esri.views.2d.layers.StreamLayerView2D")],d);const y=d}}]);