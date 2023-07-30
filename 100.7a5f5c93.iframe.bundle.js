"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[100],{"./node_modules/@arcgis/core/views/2d/engine/webgl/GroupContainer.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G:()=>r});var _WGLContainer_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/WGLContainer.js"),_webgl_enums_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/enums.js");class r extends _WGLContainer_js__WEBPACK_IMPORTED_MODULE_0__.Z{constructor(){super(...arguments),this._prevFBO=void 0,this.requiresDedicatedFBO=!1}dispose(){}doRender(e){const r=this.createRenderParams(e),{context:o,painter:s,profiler:n}=r;this._prevFBO=o.getBoundFramebufferObject(),n.recordContainerStart(this.name);const i=this._getFbo(r),a=s.getRenderTarget();o.bindFramebuffer(i),s.setRenderTarget(i),o.setDepthWriteEnabled(!0),o.setColorMask(!0,!0,!0,!0),o.setClearColor(0,0,0,0),o.setClearDepth(1),o.clear(o.gl.COLOR_BUFFER_BIT|o.gl.DEPTH_BUFFER_BIT),o.setDepthWriteEnabled(!1);for(const t of this.children)t.beforeRender(e);for(const t of this.children)t.processRender(r);for(const t of this.children)t.afterRender(e);s.setRenderTarget(a),s.releaseFbo(i),o.bindFramebuffer(this._prevFBO),s.beforeRenderLayer(r,this._clippingInfos?255:0,this.computedOpacity),i.colorTexture&&(o.setStencilTestEnabled(!1),o.setStencilWriteMask(0),s.blitTexture(o,i.colorTexture,_webgl_enums_js__WEBPACK_IMPORTED_MODULE_1__.cw.NEAREST)),s.compositeLayer(r,this.computedOpacity),n.recordContainerEnd()}createRenderParams(e){return{...super.createRenderParams(e),blendMode:this.blendMode,effects:this.computedEffects,globalOpacity:1}}_getFbo(e){const{context:t,painter:r}=e,{width:o,height:s}=t.getViewport();return r.acquireFbo(o,s)}}},"./node_modules/@arcgis/core/views/2d/layers/GroupLayerView2D.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>i});var tslib_es6=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),subclass=(__webpack_require__("./node_modules/@arcgis/core/core/Logger.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/has.js"),__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js")),GroupContainer=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/GroupContainer.js"),LayerView2D=__webpack_require__("./node_modules/@arcgis/core/views/2d/layers/LayerView2D.js"),Collection=__webpack_require__("./node_modules/@arcgis/core/core/Collection.js"),collectionUtils=__webpack_require__("./node_modules/@arcgis/core/core/collectionUtils.js"),reactiveUtils=__webpack_require__("./node_modules/@arcgis/core/core/reactiveUtils.js"),property=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),LayerView=__webpack_require__("./node_modules/@arcgis/core/views/layers/LayerView.js");let h=class extends LayerView.Z{constructor(i){super(i),this.type="group",this.layerViews=new Collection.Z}destroy(){this.handles.removeAll(),this.layerViews.length=0}_allLayerViewVisibility(i){this.layerViews.forEach((e=>{e.visible=i}))}initialize(){this.handles.add([this.layerViews.on("change",(i=>this._layerViewsChangeHandler(i))),(0,reactiveUtils.YP)((()=>this.layer?.visibilityMode),(()=>{this.layer&&this._applyVisibility((()=>this._allLayerViewVisibility(this.visible)),(()=>this._applyExclusiveVisibility(null)))}),reactiveUtils.Z_),(0,reactiveUtils.YP)((()=>this.visible),(i=>{this._applyVisibility((()=>this._allLayerViewVisibility(i)),(()=>{}))}),reactiveUtils.Z_)],"grouplayerview"),this._layerViewsChangeHandler({target:null,added:this.layerViews.toArray(),removed:[],moved:[]})}set layerViews(i){this._set("layerViews",(0,collectionUtils.Z)(i,this._get("layerViews")))}get updatingProgress(){return 0===this.layerViews.length?1:this.layerViews.reduce(((i,e)=>i+e.updatingProgress),0)/this.layerViews.length}isUpdating(){return this.layerViews.some((i=>i.updating))}_hasLayerViewVisibleOverrides(){return this.layerViews.some((i=>i._isOverridden("visible")))}_findLayerViewForLayer(i){return i&&this.layerViews.find((e=>e.layer===i))}_firstVisibleOnLayerOrder(){const i=this.layer.layers.find((i=>{const e=this._findLayerViewForLayer(i);return!!e?.visible}));return i&&this._findLayerViewForLayer(i)}_applyExclusiveVisibility(i){null==i&&null==(i=this._firstVisibleOnLayerOrder())&&this.layerViews.length>0&&(i=this._findLayerViewForLayer(this.layer.layers.at(0))),this.layerViews.forEach((e=>{e.visible=e===i}))}_layerViewsChangeHandler(i){this.handles.remove("grouplayerview:visible"),this.handles.add(this.layerViews.map((i=>(0,reactiveUtils.YP)((()=>i.visible),(e=>this._applyVisibility((()=>{e!==this.visible&&(i.visible=this.visible)}),(()=>this._applyExclusiveVisibility(e?i:null)))),reactiveUtils.Z_))).toArray(),"grouplayerview:visible");const e=i.added[i.added.length-1];this._applyVisibility((()=>this._allLayerViewVisibility(this.visible)),(()=>this._applyExclusiveVisibility(e?.visible?e:null)))}_applyVisibility(i,e){this._hasLayerViewVisibleOverrides()&&("inherited"===this.layer?.visibilityMode?i():"exclusive"===this.layer?.visibilityMode&&e())}};(0,tslib_es6._)([(0,property.Cb)({cast:collectionUtils.R})],h.prototype,"layerViews",null),(0,tslib_es6._)([(0,property.Cb)({readOnly:!0})],h.prototype,"updatingProgress",null),(0,tslib_es6._)([(0,property.Cb)()],h.prototype,"view",void 0),h=(0,tslib_es6._)([(0,subclass.j)("esri.views.layers.GroupLayerView")],h);const n=h;let a=class extends((0,LayerView2D.y)(n)){constructor(){super(...arguments),this.container=new GroupContainer.G}attach(){this._updateStageChildren(),this.addAttachHandles(this.layerViews.on("after-changes",(()=>this._updateStageChildren())))}detach(){this.container.removeAllChildren()}update(e){}moveStart(){}viewChange(){}moveEnd(){}_updateStageChildren(){this.container.removeAllChildren(),this.layerViews.forEach(((e,r)=>this.container.addChildAt(e.container,r)))}};a=(0,tslib_es6._)([(0,subclass.j)("esri.views.2d.layers.GroupLayerView2D")],a);const i=a}}]);