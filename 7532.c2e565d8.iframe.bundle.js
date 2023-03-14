"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[7532],{"./node_modules/@arcgis/core/views/2d/engine/webgl/GroupContainer.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G:()=>r});var _WGLContainer_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/WGLContainer.js"),_webgl_enums_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/enums.js");class r extends _WGLContainer_js__WEBPACK_IMPORTED_MODULE_0__.Z{constructor(){super(...arguments),this.requiresDedicatedFBO=!1}dispose(){}doRender(e){const r=this.createRenderParams(e),{context:s,painter:o,profiler:n}=r;this._prevFBO=s.getBoundFramebufferObject(),n.recordContainerStart(this.name);const i=this._getFbo(r),a=o.getRenderTarget();s.bindFramebuffer(i),o.setRenderTarget(i),s.setDepthWriteEnabled(!0),s.setColorMask(!0,!0,!0,!0),s.setClearColor(0,0,0,0),s.setClearDepth(1),s.clear(s.gl.COLOR_BUFFER_BIT|s.gl.DEPTH_BUFFER_BIT),s.setDepthWriteEnabled(!1);for(const t of this.children)t.beforeRender(e);for(const t of this.children)t.processRender(r);for(const t of this.children)t.afterRender(e);o.setRenderTarget(a),o.releaseFbo(i),s.bindFramebuffer(this._prevFBO),o.beforeRenderLayer(r,this._clippingInfos?255:0,this.computedOpacity),s.setStencilTestEnabled(!1),s.setStencilWriteMask(0),o.blitTexture(s,i.colorTexture,_webgl_enums_js__WEBPACK_IMPORTED_MODULE_1__.cw.NEAREST),o.compositeLayer(r,this.computedOpacity),n.recordContainerEnd()}createRenderParams(e){return{...super.createRenderParams(e),blendMode:this.blendMode,effects:this.computedEffects,globalOpacity:1}}_getFbo(e){const{context:t,painter:r}=e,{width:s,height:o}=t.getViewport();return r.acquireFbo(s,o)}}},"./node_modules/@arcgis/core/views/2d/layers/GroupLayerView2D.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>i});var tslib_es6=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),subclass=(__webpack_require__("./node_modules/@arcgis/core/core/Logger.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),__webpack_require__("./node_modules/@arcgis/core/core/has.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js")),GroupContainer=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/GroupContainer.js"),LayerView2D=__webpack_require__("./node_modules/@arcgis/core/views/2d/layers/LayerView2D.js"),Collection=__webpack_require__("./node_modules/@arcgis/core/core/Collection.js"),collectionUtils=__webpack_require__("./node_modules/@arcgis/core/core/collectionUtils.js"),maybe=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),reactiveUtils=__webpack_require__("./node_modules/@arcgis/core/core/reactiveUtils.js"),property=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),LayerView=__webpack_require__("./node_modules/@arcgis/core/views/layers/LayerView.js");let p=class extends LayerView.Z{constructor(i){super(i),this.type="group",this.layerViews=new Collection.Z}_allLayerViewVisibility(i){this.layerViews.forEach((e=>{e.visible=i}))}initialize(){this.handles.add([this.layerViews.on("change",(i=>this._layerViewsChangeHandler(i))),(0,reactiveUtils.YP)((()=>this.layer.visibilityMode),(()=>this._applyVisibility((()=>this._allLayerViewVisibility(this.visible)),(()=>this._applyExclusiveVisibility(null)))),reactiveUtils.Z_),(0,reactiveUtils.YP)((()=>this.visible),(i=>{this._applyVisibility((()=>this._allLayerViewVisibility(i)),(()=>{}))}),reactiveUtils.Z_)],"grouplayerview"),this._layerViewsChangeHandler({target:null,added:this.layerViews.toArray(),removed:[],moved:[]})}set layerViews(i){this._set("layerViews",(0,collectionUtils.Z)(i,this._get("layerViews")))}get updatingProgress(){return 0===this.layerViews.length?1:this.layerViews.reduce(((i,e)=>i+e.updatingProgress),0)/this.layerViews.length}isUpdating(){return this.layerViews.some((i=>i.updating))}_hasLayerViewVisibleOverrides(){return this.layerViews.some((i=>i._isOverridden("visible")))}_findLayerViewForLayer(i){return i&&this.layerViews.find((e=>e.layer===i))}_firstVisibleOnLayerOrder(){const i=this.layer.layers.find((i=>this._findLayerViewForLayer(i)?.visible));return i&&this._findLayerViewForLayer(i)}_applyExclusiveVisibility(i){(0,maybe.Wi)(i)&&(i=this._firstVisibleOnLayerOrder(),(0,maybe.Wi)(i)&&this.layerViews.length>0&&(i=this._findLayerViewForLayer(this.layer.layers.getItemAt(0)))),this.layerViews.forEach((e=>{e.visible=e===i}))}_layerViewsChangeHandler(i){this.handles.remove("grouplayerview:visible"),this.handles.add(this.layerViews.map((i=>(0,reactiveUtils.YP)((()=>i.visible),(e=>this._applyVisibility((()=>{e!==this.visible&&(i.visible=this.visible)}),(()=>this._applyExclusiveVisibility(e?i:null)))),reactiveUtils.Z_))).toArray(),"grouplayerview:visible");const e=i.added[i.added.length-1];this._applyVisibility((()=>this._allLayerViewVisibility(this.visible)),(()=>this._applyExclusiveVisibility(e?.visible?e:null)))}_applyVisibility(i,e){this._hasLayerViewVisibleOverrides()&&("inherited"===this.layer?.visibilityMode?i():"exclusive"===this.layer?.visibilityMode&&e())}};(0,tslib_es6._)([(0,property.Cb)({cast:collectionUtils.R})],p.prototype,"layerViews",null),(0,tslib_es6._)([(0,property.Cb)({readOnly:!0})],p.prototype,"updatingProgress",null),(0,tslib_es6._)([(0,property.Cb)()],p.prototype,"view",void 0),p=(0,tslib_es6._)([(0,subclass.j)("esri.views.layers.GroupLayerView")],p);const n=p;let a=class extends((0,LayerView2D.y)(n)){constructor(){super(...arguments),this.container=new GroupContainer.G}attach(){this._updateStageChildren(),this.handles.add(this.layerViews.on("after-changes",(()=>this._updateStageChildren())),"grouplayerview2d")}detach(){this.handles.remove("grouplayerview2d"),this.container.removeAllChildren()}update(e){}moveStart(){}viewChange(){}moveEnd(){}_updateStageChildren(){this.container.removeAllChildren(),this.layerViews.forEach(((e,r)=>this.container.addChildAt(e.container,r)))}};a=(0,tslib_es6._)([(0,subclass.j)("esri.views.2d.layers.GroupLayerView2D")],a);const i=a},"./node_modules/@arcgis/core/views/2d/layers/LayerView2D.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{y:()=>LayerView2D_y});var tslib_es6=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),Collection=__webpack_require__("./node_modules/@arcgis/core/core/Collection.js"),collectionUtils=__webpack_require__("./node_modules/@arcgis/core/core/collectionUtils.js"),Error=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),reactiveUtils=__webpack_require__("./node_modules/@arcgis/core/core/reactiveUtils.js"),property=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),subclass=(__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js")),Container=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/Container.js"),JSONSupport=__webpack_require__("./node_modules/@arcgis/core/core/JSONSupport.js");let t=class extends JSONSupport.wq{get version(){return this.commitVersionProperties(),(this._get("version")||0)+1}};(0,tslib_es6._)([(0,property.Cb)({readOnly:!0})],t.prototype,"version",null),t=(0,tslib_es6._)([(0,subclass.j)("esri.views.layers.support.ClipArea")],t);const p=t;var s;let i=s=class extends p{constructor(t){super(t),this.type="rect",this.left=null,this.right=null,this.top=null,this.bottom=null}clone(){return new s({left:this.left,right:this.right,top:this.top,bottom:this.bottom})}commitVersionProperties(){this.commitProperty("left"),this.commitProperty("right"),this.commitProperty("top"),this.commitProperty("bottom")}};(0,tslib_es6._)([(0,property.Cb)({type:[Number,String],json:{write:!0}})],i.prototype,"left",void 0),(0,tslib_es6._)([(0,property.Cb)({type:[Number,String],json:{write:!0}})],i.prototype,"right",void 0),(0,tslib_es6._)([(0,property.Cb)({type:[Number,String],json:{write:!0}})],i.prototype,"top",void 0),(0,tslib_es6._)([(0,property.Cb)({type:[Number,String],json:{write:!0}})],i.prototype,"bottom",void 0),i=s=(0,tslib_es6._)([(0,subclass.j)("esri.views.layers.support.ClipRect")],i);const ClipRect_p=i;__webpack_require__("./node_modules/@arcgis/core/geometry.js");var y,Geometry=__webpack_require__("./node_modules/@arcgis/core/geometry/Geometry.js"),jsonUtils=__webpack_require__("./node_modules/@arcgis/core/geometry/support/jsonUtils.js"),Extent=__webpack_require__("./node_modules/@arcgis/core/geometry/Extent.js"),Polygon=__webpack_require__("./node_modules/@arcgis/core/geometry/Polygon.js");const c={base:Geometry.Z,key:"type",typeMap:{extent:Extent.Z,polygon:Polygon.Z}};let n=y=class extends p{constructor(r){super(r),this.type="geometry",this.geometry=null}clone(){return new y({geometry:this.geometry?.clone()??null})}commitVersionProperties(){this.commitProperty("geometry")}};(0,tslib_es6._)([(0,property.Cb)({types:c,json:{read:jsonUtils.im,write:!0}})],n.prototype,"geometry",void 0),n=y=(0,tslib_es6._)([(0,subclass.j)("esri.views.layers.support.Geometry")],n);const a=n;let e=class extends p{constructor(r){super(r),this.type="path",this.path=[]}commitVersionProperties(){this.commitProperty("path")}};(0,tslib_es6._)([(0,property.Cb)({type:[[[Number]]],json:{write:!0}})],e.prototype,"path",void 0),e=(0,tslib_es6._)([(0,subclass.j)("esri.views.layers.support.Path")],e);const Path_p=e,u=Collection.Z.ofType({key:"type",base:null,typeMap:{rect:ClipRect_p,path:Path_p,geometry:a}}),LayerView2D_y=t=>{let h=class extends t{constructor(){super(...arguments),this.attached=!1,this.clips=new u,this.lastUpdateId=-1,this.moving=!1,this.updateRequested=!1,this.visibleAtCurrentScale=!1}initialize(){const e=this.view?.spatialReferenceLocked??!0,t=this.view?.spatialReference;t&&e&&!this.spatialReferenceSupported?this.addResolvingPromise(Promise.reject(new Error.Z("layerview:spatial-reference-incompatible","The spatial reference of this layer does not meet the requirements of the view",{layer:this.layer}))):(this.container||(this.container=new Container.W),this.container.fadeTransitionEnabled=!0,this.container.visible=!1,this.container.endTransitions(),this.handles.add([(0,reactiveUtils.YP)((()=>this.suspended),(e=>{this.container&&(this.container.visible=!e),this.view&&!e&&this.updateRequested&&this.view.requestUpdate()}),reactiveUtils.tX),(0,reactiveUtils.YP)((()=>this.layer?.opacity??1),(e=>{this.container&&(this.container.opacity=e)}),reactiveUtils.tX),(0,reactiveUtils.YP)((()=>this.layer&&"blendMode"in this.layer?this.layer.blendMode:"normal"),(e=>{this.container&&(this.container.blendMode=e)}),reactiveUtils.tX),(0,reactiveUtils.YP)((()=>this.layer&&"effect"in this.layer?this.layer.effect:null),(e=>{this.container&&(this.container.effect=e)}),reactiveUtils.tX),(0,reactiveUtils.on)((()=>this.clips),"change",(()=>{this.container&&(this.container.clips=this.clips)}),reactiveUtils.tX),(0,reactiveUtils.YP)((()=>({scale:this.view?.scale,scaleRange:this.layer&&"effectiveScaleRange"in this.layer?this.layer.effectiveScaleRange:null})),(({scale:e})=>{const t=e&&this.isVisibleAtScale(e);t!==this.visibleAtCurrentScale&&this._set("visibleAtCurrentScale",t)}),reactiveUtils.tX)]),this.view?.whenLayerView?this.view.whenLayerView(this.layer).then((e=>{e===this&&this.processAttach()}),(()=>{})):this.when().then((()=>{this.processAttach()}),(()=>{})))}destroy(){this.processDetach(),this.updateRequested=!1}get spatialReferenceSupported(){const e=this.view?.spatialReference;return null==e||this.supportsSpatialReference(e)}get updating(){return this.spatialReferenceSupported&&(!this.attached||!this.suspended&&(this.updateRequested||this.isUpdating())||!!this.updatingHandles?.updating)}processAttach(){this.isResolved()&&!this.attached&&!this.destroyed&&this.spatialReferenceSupported&&(this.attach(),this.attached=!0,this.requestUpdate())}processDetach(){this.attached&&(this.attached=!1,this.detach(),this.updateRequested=!1)}isVisibleAtScale(e){const t=this.layer&&"effectiveScaleRange"in this.layer?this.layer.effectiveScaleRange:null;if(!t)return!0;const{minScale:s,maxScale:i}=t;return(0===s||e<=s)&&(0===i||e>=i)}requestUpdate(){this.destroyed||this.updateRequested||(this.updateRequested=!0,this.suspended||this.view.requestUpdate())}processUpdate(e){!this.isFulfilled()||this.isResolved()?(this._set("updateParameters",e),this.updateRequested&&!this.suspended&&(this.updateRequested=!1,this.update(e))):this.updateRequested=!1}hitTest(e,t){return Promise.resolve(null)}supportsSpatialReference(e){return!0}canResume(){return!!this.spatialReferenceSupported&&!!super.canResume()&&this.visibleAtCurrentScale}getSuspendInfo(){const e=super.getSuspendInfo(),t=!this.spatialReferenceSupported,s=this.visibleAtCurrentScale;return t&&(e.spatialReferenceNotSupported=t),s&&(e.outsideScaleRange=s),e}};return(0,tslib_es6._)([(0,property.Cb)()],h.prototype,"attached",void 0),(0,tslib_es6._)([(0,property.Cb)({type:u,set(e){const t=(0,collectionUtils.Z)(e,this._get("clips"),u);this._set("clips",t)}})],h.prototype,"clips",void 0),(0,tslib_es6._)([(0,property.Cb)()],h.prototype,"container",void 0),(0,tslib_es6._)([(0,property.Cb)()],h.prototype,"moving",void 0),(0,tslib_es6._)([(0,property.Cb)({readOnly:!0})],h.prototype,"spatialReferenceSupported",null),(0,tslib_es6._)([(0,property.Cb)({readOnly:!0})],h.prototype,"updateParameters",void 0),(0,tslib_es6._)([(0,property.Cb)()],h.prototype,"updateRequested",void 0),(0,tslib_es6._)([(0,property.Cb)()],h.prototype,"updating",null),(0,tslib_es6._)([(0,property.Cb)()],h.prototype,"view",void 0),(0,tslib_es6._)([(0,property.Cb)({readOnly:!0})],h.prototype,"visibleAtCurrentScale",void 0),h=(0,tslib_es6._)([(0,subclass.j)("esri.views.2d.layers.LayerView2D")],h),h}},"./node_modules/@arcgis/core/views/layers/LayerView.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>u});var _chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),_core_Accessor_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/Accessor.js"),_core_Evented_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/Evented.js"),_core_HandleOwner_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/core/HandleOwner.js"),_core_Identifiable_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/core/Identifiable.js"),_core_Logger_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/core/Logger.js"),_core_maybe_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_core_Promise_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/core/Promise.js"),_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_9__=(__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js"));let d=class extends((0,_core_HandleOwner_js__WEBPACK_IMPORTED_MODULE_2__.p)((0,_core_Identifiable_js__WEBPACK_IMPORTED_MODULE_3__.IG)((0,_core_Promise_js__WEBPACK_IMPORTED_MODULE_5__.v)(_core_Evented_js__WEBPACK_IMPORTED_MODULE_1__.Z.EventedMixin(_core_Accessor_js__WEBPACK_IMPORTED_MODULE_0__.Z))))){constructor(e){super(e),this.layer=null,this.parent=null}initialize(){this.when().catch((e=>{if("layerview:create-error"!==e.name){const t=this.layer&&this.layer.id||"no id",r=this.layer&&this.layer.title||"no title";_core_Logger_js__WEBPACK_IMPORTED_MODULE_4__.Z.getLogger(this.declaredClass).error("#resolve()",`Failed to resolve layer view (layer title: '${r}', id: '${t}')`,e)}}))}get fullOpacity(){return(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_10__.Pt)(this.get("layer.opacity"),1)*(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_10__.Pt)(this.get("parent.fullOpacity"),1)}get suspended(){return!this.canResume()}get suspendInfo(){return this.getSuspendInfo()}get legendEnabled(){return!this.suspended&&!0===this.layer?.legendEnabled}get updating(){return!(!this.updatingHandles?.updating&&!this.isUpdating())}get updatingProgress(){return this.updating?0:1}get visible(){return!0===this.layer?.visible}set visible(e){this._overrideIfSome("visible",e)}canResume(){return this.visible&&this.layer?.loaded&&!this.parent?.suspended&&this.view?.ready||!1}getSuspendInfo(){const e=this.parent&&this.parent.suspended?this.parent.suspendInfo:{};return this.view&&this.view.ready||(e.viewNotReady=!0),this.layer&&this.layer.loaded||(e.layerNotLoaded=!0),this.visible||(e.layerInvisible=!0),e}isUpdating(){return!1}};(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_11__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_6__.Cb)()],d.prototype,"fullOpacity",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_11__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_6__.Cb)()],d.prototype,"layer",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_11__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_6__.Cb)()],d.prototype,"parent",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_11__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_6__.Cb)({readOnly:!0})],d.prototype,"suspended",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_11__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_6__.Cb)({readOnly:!0})],d.prototype,"suspendInfo",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_11__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_6__.Cb)({readOnly:!0})],d.prototype,"legendEnabled",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_11__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_6__.Cb)({type:Boolean,readOnly:!0})],d.prototype,"updating",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_11__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_6__.Cb)({readOnly:!0})],d.prototype,"updatingProgress",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_11__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_6__.Cb)()],d.prototype,"visible",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_11__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_6__.Cb)()],d.prototype,"view",void 0),d=(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_11__._)([(0,_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_9__.j)("esri.views.layers.LayerView")],d);const u=d}}]);