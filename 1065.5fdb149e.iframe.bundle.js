"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[1065],{"./node_modules/@arcgis/core/layers/GroupLayer.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>M});var tslib_es6=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),CollectionFlattener=__webpack_require__("./node_modules/@arcgis/core/core/CollectionFlattener.js"),loadAll=__webpack_require__("./node_modules/@arcgis/core/core/loadAll.js"),Logger=__webpack_require__("./node_modules/@arcgis/core/core/Logger.js"),MultiOriginJSONSupport=__webpack_require__("./node_modules/@arcgis/core/core/MultiOriginJSONSupport.js"),reactiveUtils=__webpack_require__("./node_modules/@arcgis/core/core/reactiveUtils.js"),property=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),utils=(__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/has.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/utils.js")),subclass=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js"),writer=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/writer.js"),Layer=__webpack_require__("./node_modules/@arcgis/core/layers/Layer.js"),BlendLayer=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/BlendLayer.js"),OperationalLayer=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/OperationalLayer.js"),PortalLayer=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/PortalLayer.js"),ScaleRangeLayer=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/ScaleRangeLayer.js"),lazyLayerLoader=__webpack_require__("./node_modules/@arcgis/core/layers/support/lazyLayerLoader.js"),collectionUtils=__webpack_require__("./node_modules/@arcgis/core/support/collectionUtils.js"),LayersMixin=__webpack_require__("./node_modules/@arcgis/core/support/LayersMixin.js"),TablesMixin=__webpack_require__("./node_modules/@arcgis/core/support/TablesMixin.js");const tagSymbols_e=Symbol("WebScene");var writeUtils=__webpack_require__("./node_modules/@arcgis/core/webdoc/support/writeUtils.js");let w=class extends((0,BlendLayer.h)((0,ScaleRangeLayer.M)((0,OperationalLayer.q)((0,PortalLayer.I)((0,TablesMixin.Q)((0,LayersMixin.K)((0,MultiOriginJSONSupport.R)(Layer.Z)))))))){constructor(e){super(e),this.allLayers=new CollectionFlattener.Z({getCollections:()=>[this.layers],getChildrenFunction:e=>"layers"in e?e.layers:null}),this.allTables=(0,collectionUtils.a)(this),this.fullExtent=void 0,this.operationalLayerType="GroupLayer",this.spatialReference=void 0,this.type="group"}initialize(){this._enforceVisibility(this.visibilityMode,this.visible),this.addHandles([(0,reactiveUtils.YP)((()=>{let e=this.parent;for(;e&&"parent"in e&&e.parent;)e=e.parent;return e&&tagSymbols_e in e}),(e=>{const i="prevent-adding-tables";this.removeHandles(i),e&&(this.tables.removeAll(),this.addHandles((0,reactiveUtils.on)((()=>this.tables),"before-add",(e=>{e.preventDefault(),Logger.Z.getLogger(this).errorOnce("tables","Tables are not yet supported in a WebScene so they can't be added.")})),i))}),reactiveUtils.tX),(0,reactiveUtils.YP)((()=>this.visible),this._onVisibilityChange.bind(this),reactiveUtils.Z_)])}destroy(){this.allLayers.destroy(),this.allTables.destroy()}_writeLayers(e,i,t,r){const s=[];if(!e)return s;e.forEach((e=>{const i=(0,writeUtils.Nw)(e,r.webmap?r.webmap.getLayerJSONFromResourceInfo(e):null,r);null!=i&&i.layerType&&s.push(i)})),i.layers=s}set portalItem(e){this._set("portalItem",e)}set visibilityMode(e){const i=this._get("visibilityMode")!==e;this._set("visibilityMode",e),i&&this._enforceVisibility(e,this.visible)}load(e){return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Feature Service","Feature Collection","Scene Service"],layerModuleTypeMap:lazyLayerLoader.T},e)),Promise.resolve(this)}async loadAll(){return(0,loadAll.G)(this,(e=>{e(this.layers,this.tables)}))}layerAdded(e){e.visible&&"exclusive"===this.visibilityMode?this._turnOffOtherLayers(e):"inherited"===this.visibilityMode&&(e.visible=this.visible),this.hasHandles(e.uid)?console.error(`Layer readded to Grouplayer: uid=${e.uid}`):this.addHandles((0,reactiveUtils.YP)((()=>e.visible),(i=>this._onChildVisibilityChange(e,i)),reactiveUtils.Z_),e.uid)}layerRemoved(e){this.removeHandles(e.uid),this._enforceVisibility(this.visibilityMode,this.visible)}_turnOffOtherLayers(e){this.layers.forEach((i=>{i!==e&&(i.visible=!1)}))}_enforceVisibility(e,i){if(!(0,utils.vw)(this).initialized)return;const t=this.layers;let r=t.find((e=>e.visible));switch(e){case"exclusive":t.length&&!r&&(r=t.at(0),r.visible=!0),this._turnOffOtherLayers(r);break;case"inherited":t.forEach((e=>{e.visible=i}))}}_onVisibilityChange(e){"inherited"===this.visibilityMode&&this.layers.forEach((i=>{i.visible=e}))}_onChildVisibilityChange(e,i){switch(this.visibilityMode){case"exclusive":i?this._turnOffOtherLayers(e):this._isAnyLayerVisible()||(e.visible=!0);break;case"inherited":e.visible=this.visible}}_isAnyLayerVisible(){return this.layers.some((e=>e.visible))}};(0,tslib_es6._)([(0,property.Cb)({readOnly:!0,dependsOn:[]})],w.prototype,"allLayers",void 0),(0,tslib_es6._)([(0,property.Cb)({readOnly:!0})],w.prototype,"allTables",void 0),(0,tslib_es6._)([(0,property.Cb)()],w.prototype,"fullExtent",void 0),(0,tslib_es6._)([(0,property.Cb)({json:{read:!0,write:!0}})],w.prototype,"blendMode",void 0),(0,tslib_es6._)([(0,property.Cb)({json:{read:!1,write:{ignoreOrigin:!0}}})],w.prototype,"layers",void 0),(0,tslib_es6._)([(0,writer.c)("layers")],w.prototype,"_writeLayers",null),(0,tslib_es6._)([(0,property.Cb)({type:["GroupLayer"]})],w.prototype,"operationalLayerType",void 0),(0,tslib_es6._)([(0,property.Cb)({json:{origins:{"web-document":{read:!1,write:!1}}}})],w.prototype,"portalItem",null),(0,tslib_es6._)([(0,property.Cb)()],w.prototype,"spatialReference",void 0),(0,tslib_es6._)([(0,property.Cb)({json:{read:!1},readOnly:!0,value:"group"})],w.prototype,"type",void 0),(0,tslib_es6._)([(0,property.Cb)({type:["independent","inherited","exclusive"],value:"independent",json:{write:!0,origins:{"web-map":{type:["independent","exclusive"],write:(e,i,t)=>{"inherited"!==e&&(i[t]=e)}}}}})],w.prototype,"visibilityMode",null),w=(0,tslib_es6._)([(0,subclass.j)("esri.layers.GroupLayer")],w);const M=w}}]);