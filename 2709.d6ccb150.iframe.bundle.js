"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[2709],{"./node_modules/@arcgis/core/geometry/support/scaleUtils.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{dp:()=>r,yZ:()=>i});var _core_unitUtils_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/unitUtils.js");const e=96;function i(i,r){const o=r||i.extent,c=i.width,d=(0,_core_unitUtils_js__WEBPACK_IMPORTED_MODULE_0__.c9)(o&&o.spatialReference);return o&&c?o.width/c*d*_core_unitUtils_js__WEBPACK_IMPORTED_MODULE_0__.hd*e:0}function r(i,r){return i/((0,_core_unitUtils_js__WEBPACK_IMPORTED_MODULE_0__.c9)(r)*_core_unitUtils_js__WEBPACK_IMPORTED_MODULE_0__.hd*e)}},"./node_modules/@arcgis/core/layers/support/floorFilterUtils.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{function o(o){const n=o.layer;return"floorInfo"in n&&n.floorInfo?.floorField&&"floors"in o.view?l(o.view.floors,n.floorInfo.floorField):null}function n(o,n){return"floorInfo"in n&&n.floorInfo?.floorField?l(o,n.floorInfo.floorField):null}function l(o,n){if(!o?.length)return null;const l=o.filter((o=>""!==o)).map((o=>`'${o}'`));return l.push("''"),`${n} IN (${l.join(",")}) OR ${n} IS NULL`}__webpack_require__.d(__webpack_exports__,{c:()=>o,f:()=>n})},"./node_modules/@arcgis/core/layers/support/sublayerUtils.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{FN:()=>i,QV:()=>n,ac:()=>t});var _core_maybe_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_core_accessorSupport_PropertyOrigin_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/PropertyOrigin.js");function n(r,e,n){const i=e.flatten((({sublayers:r})=>r)).length;return i!==r.length||(!!r.some((r=>r.originIdOf("minScale")>n||r.originIdOf("maxScale")>n||r.originIdOf("renderer")>n||r.originIdOf("labelingInfo")>n||r.originIdOf("opacity")>n||r.originIdOf("labelsVisible")>n||r.originIdOf("source")>n))||!o(r,e))}function i(n,i,t){return!!n.some((n=>{const i=n.source;return!(!i||"map-layer"===i.type&&i.mapLayerId===n.id&&((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_1__.Wi)(i.gdbVersion)||i.gdbVersion===t))||n.originIdOf("renderer")>_core_accessorSupport_PropertyOrigin_js__WEBPACK_IMPORTED_MODULE_0__.s3.SERVICE||n.originIdOf("labelingInfo")>_core_accessorSupport_PropertyOrigin_js__WEBPACK_IMPORTED_MODULE_0__.s3.SERVICE||n.originIdOf("opacity")>_core_accessorSupport_PropertyOrigin_js__WEBPACK_IMPORTED_MODULE_0__.s3.SERVICE||n.originIdOf("labelsVisible")>_core_accessorSupport_PropertyOrigin_js__WEBPACK_IMPORTED_MODULE_0__.s3.SERVICE}))||!o(n,i)}function o(e,n){if(!e||!e.length||(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_1__.Wi)(n))return!0;const i=n.slice().reverse().flatten((({sublayers:r})=>r&&r.toArray().reverse())).map((r=>r.id)).toArray();if(e.length>i.length)return!1;let o=0;const t=i.length;for(const{id:r}of e){for(;o<t&&i[o]!==r;)o++;if(o>=t)return!1}return!0}function t(r){return!!r&&r.some((r=>null!=r.minScale||r.layerDefinition&&null!=r.layerDefinition.minScale))}},"./node_modules/@arcgis/core/views/2d/engine/FeatureContainer.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>o});var promiseUtils=__webpack_require__("./node_modules/@arcgis/core/core/promiseUtils.js"),Queue=__webpack_require__("./node_modules/@arcgis/core/core/Queue.js"),AttributeStoreView=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/AttributeStoreView.js"),TileContainer=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/TileContainer.js"),maybe=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),screenUtils=__webpack_require__("./node_modules/@arcgis/core/core/screenUtils.js"),unitUtils=__webpack_require__("./node_modules/@arcgis/core/core/unitUtils.js"),lengthUtils=__webpack_require__("./node_modules/@arcgis/core/renderers/support/lengthUtils.js"),Utils=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/Utils.js"),Technique=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/techniques/Technique.js"),utils=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/techniques/utils.js"),capabilities=__webpack_require__("./node_modules/@arcgis/core/views/webgl/capabilities.js");function c(e,t){const i=t.length;if(e<t[0].value||1===i)return t[0].size;for(let s=1;s<i;s++)if(e<t[s].value){const i=(e-t[s-1].value)/(t[s].value-t[s-1].value);return t[s-1].size+i*(t[s].size-t[s-1].size)}return t[i-1].size}class h{constructor(){this.symbolLevels=[],this.vvColorValues=new Float32Array(8),this.vvColors=new Float32Array(32),this.vvOpacityValues=new Float32Array(8),this.vvOpacities=new Float32Array(8),this.vvSizeMinMaxValue=new Float32Array(4),this.outsideLabelsVisible=!1,this._vvMaterialParameters={vvSizeEnabled:!1,vvColorEnabled:!1,vvRotationEnabled:!1,vvRotationType:"geographic",vvOpacityEnabled:!1},this._technique=Technique.v}getSizeVVFieldStops(i){const s=this._vvSizeFieldStops;if(s)switch(s.type){case"static":return s;case"level-dependent":return(0,maybe.Pt)(s.levels[i],(()=>{let e=1/0,a=0;for(const t in s.levels){const s=parseFloat(t),r=Math.abs(i-s);r<e&&(e=r,a=s)}if(e===1/0)return{sizes:new Float32Array([0,0,0,0,0,0]),values:new Float32Array([0,0,0,0,0,0])};const r=2**((i-a)/2),l=(0,maybe.Wg)(s.levels[a]),o=new Float32Array(l.values);return o[2]*=r,o[3]*=r,{sizes:(0,maybe.Wg)(l.sizes),values:o}}));default:return}}get vvMaterialParameters(){return this._vvMaterialParameters}update(e){(0,maybe.pC)(this._vvInfo)&&this._updateVisualVariables(this._vvInfo.vvRanges,e)}setInfo(e,t,i){this._updateEffects(i),this._vvInfo=t,this._technique=(0,utils.EJ)(e),this.rendererSchema=this._technique.createOrUpdateRendererSchema(this.rendererSchema,e)}getVariation(){return{...this._technique.getVariation(this.rendererSchema),outsideLabelsVisible:this.outsideLabelsVisible,supportsTextureFloat:(0,capabilities.hc)("2d").supportsTextureFloat}}getVariationHash(){return this._technique.getVariationHash(this.rendererSchema)<<1|(this.outsideLabelsVisible?1:0)}_updateEffects(e){(0,maybe.pC)(e)?this.outsideLabelsVisible=e.excludedLabelsVisible:this.outsideLabelsVisible=!1}_updateVisualVariables(e,t){const i=this._vvMaterialParameters;if(i.vvOpacityEnabled=!1,i.vvSizeEnabled=!1,i.vvColorEnabled=!1,i.vvRotationEnabled=!1,!e)return;const n=e.size;if(n){if(i.vvSizeEnabled=!0,n.minMaxValue){const e=n.minMaxValue;let i,a;if((0,Utils.$K)(e.minSize)&&(0,Utils.$K)(e.maxSize))if((0,Utils.hj)(e.minSize)&&(0,Utils.hj)(e.maxSize))i=(0,screenUtils.F2)(e.minSize),a=(0,screenUtils.F2)(e.maxSize);else{const r=t.scale;i=(0,screenUtils.F2)(c(r,e.minSize.stops)),a=(0,screenUtils.F2)(c(r,e.maxSize.stops))}this.vvSizeMinMaxValue.set([e.minDataValue,e.maxDataValue,i,a])}if(n.scaleStops&&(this.vvSizeScaleStopsValue=(0,screenUtils.F2)(c(t.scale,n.scaleStops.stops))),n.unitValue){const e=(0,unitUtils.c9)(t.spatialReference)/lengthUtils.a[n.unitValue.unit];this.vvSizeUnitValueToPixelsRatio=e/t.resolution}n.fieldStops&&(this._vvSizeFieldStops=n.fieldStops)}const v=e.color;v&&(i.vvColorEnabled=!0,this.vvColorValues.set(v.values),this.vvColors.set(v.colors));const u=e.opacity;u&&(i.vvOpacityEnabled=!0,this.vvOpacityValues.set(u.values),this.vvOpacities.set(u.opacities));const h=e.rotation;h&&(i.vvRotationEnabled=!0,i.vvRotationType=h.type)}}class o extends TileContainer.Z{constructor(e){super(e),this._rendererInfo=new h,this._materialItemsRequestQueue=new Queue.Z,this.attributeView=new AttributeStoreView.H((()=>this.onAttributeStoreUpdate()))}destroy(){this.children.forEach((e=>e.destroy())),this.removeAllChildren(),this.attributeView.destroy(),this._materialItemsRequestQueue.clear()}setRendererInfo(e,t,r){this._rendererInfo.setInfo(e,t,r),this.requestRender()}async getMaterialItems(t,r){if(!t||0===t.length)return[];const s=(0,promiseUtils.hh)();return this._materialItemsRequestQueue.push({items:t,abortOptions:r,resolver:s}),this.requestRender(),s.promise}doRender(e){if(e.context.capabilities.enable("textureFloat"),e.context.capabilities.enable("vao"),this._materialItemsRequestQueue.length>0){let t=this._materialItemsRequestQueue.pop();for(;t;)this._processMaterialItemRequest(e,t),t=this._materialItemsRequestQueue.pop()}super.doRender(e)}renderChildren(e){for(const t of this.children)t.commit(e);this._rendererInfo.update(e.state),super.renderChildren(e)}updateTransforms(e){if(this.children.some((e=>e.hasData)))for(const t of this.children)t.setTransform(e)}createRenderParams(e){const t=super.createRenderParams(e);return t.rendererInfo=this._rendererInfo,t.attributeView=this.attributeView,t}onAttributeStoreUpdate(){}_processMaterialItemRequest(e,{items:t,abortOptions:r,resolver:s}){const{painter:i,pixelRatio:o}=e,a=t.map((e=>i.textureManager.rasterizeItem(e.symbol,o,e.glyphIds,r)));Promise.all(a).then((e=>{if(!this.stage)return void s.reject();const r=e.map(((e,r)=>({id:t[r].id,mosaicItem:e})));s.resolve(r)}),s.reject)}}},"./node_modules/@arcgis/core/views/2d/engine/webgl/TileContainer.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>i});var _core_has_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/has.js"),_enums_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/enums.js"),_WGLContainer_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/WGLContainer.js"),_brushes_WGLBrushInfo_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/brushes/WGLBrushInfo.js"),_brushes_WGLBrushStencil_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/brushes/WGLBrushStencil.js");const n=(e,r)=>e.key.level-r.key.level!=0?e.key.level-r.key.level:e.key.row-r.key.row!=0?e.key.row-r.key.row:e.key.col-r.key.col;class i extends _WGLContainer_js__WEBPACK_IMPORTED_MODULE_2__.Z{constructor(e){super(),this._tileInfoView=e}get requiresDedicatedFBO(){return!1}renderChildren(e){this.sortChildren(n),this.setStencilReference(e),super.renderChildren(e)}createRenderParams(e){const{state:r}=e,s=super.createRenderParams(e);return s.requiredLevel=this._tileInfoView.getClosestInfoForScale(r.scale).level,s.displayLevel=this._tileInfoView.tileInfo.scaleToZoom(r.scale),s}prepareRenderPasses(r){const n=super.prepareRenderPasses(r);return n.push(r.registerRenderPass({name:"stencil",brushes:[_brushes_WGLBrushStencil_js__WEBPACK_IMPORTED_MODULE_4__.Z],drawPhase:_enums_js__WEBPACK_IMPORTED_MODULE_1__.jx.DEBUG|_enums_js__WEBPACK_IMPORTED_MODULE_1__.jx.MAP|_enums_js__WEBPACK_IMPORTED_MODULE_1__.jx.HIGHLIGHT,target:()=>this.getStencilTarget()})),(0,_core_has_js__WEBPACK_IMPORTED_MODULE_0__.Z)("esri-tiles-debug")&&n.push(r.registerRenderPass({name:"tileInfo",brushes:[_brushes_WGLBrushInfo_js__WEBPACK_IMPORTED_MODULE_3__.Z],drawPhase:_enums_js__WEBPACK_IMPORTED_MODULE_1__.jx.DEBUG,target:()=>this.children})),n}getStencilTarget(){return this.children}setStencilReference(e){let r=1;for(const s of this.children)s.stencilRef=r++}}},"./node_modules/@arcgis/core/views/2d/layers/graphics/BaseGraphicContainer.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>n});var maybe=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),FeatureContainer=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/FeatureContainer.js"),mat3=__webpack_require__("./node_modules/@arcgis/core/chunks/mat3.js"),mat3f32=__webpack_require__("./node_modules/@arcgis/core/chunks/mat3f32.js"),vec2f32=__webpack_require__("./node_modules/@arcgis/core/chunks/vec2f32.js"),vec3f32=__webpack_require__("./node_modules/@arcgis/core/chunks/vec3f32.js"),normalizeUtils=__webpack_require__("./node_modules/@arcgis/core/geometry/support/normalizeUtils.js"),DisplayObject=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/DisplayObject.js"),Utils=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/Utils.js"),BufferObject=__webpack_require__("./node_modules/@arcgis/core/views/webgl/BufferObject.js"),enums=__webpack_require__("./node_modules/@arcgis/core/views/webgl/enums.js"),VertexArrayObject=__webpack_require__("./node_modules/@arcgis/core/views/webgl/VertexArrayObject.js");const v=Math.PI/180;class b extends DisplayObject.s{constructor(t){super(),this._program=null,this._vao=null,this._vertexBuffer=null,this._indexBuffer=null,this._dvsMat3=(0,mat3f32.c)(),this._localOrigin={x:0,y:0},this._getBounds=t}destroy(){this._vao&&(this._vao.dispose(!0),this._vao=null,this._vertexBuffer=null,this._indexBuffer=null),this._program=(0,maybe.M2)(this._program)}doRender(t){const{context:e}=t,r=this._getBounds();if(r.length<1)return;this._createShaderProgram(e),this._updateMatricesAndLocalOrigin(t),this._updateBufferData(e,r),e.setBlendingEnabled(!0),e.setDepthTestEnabled(!1),e.setStencilWriteMask(0),e.setStencilTestEnabled(!1),e.setBlendFunction(enums.zi.ONE,enums.zi.ONE_MINUS_SRC_ALPHA),e.setColorMask(!0,!0,!0,!0);const s=this._program;e.bindVAO(this._vao),e.useProgram(s),s.setUniformMatrix3fv("u_dvsMat3",this._dvsMat3),e.gl.lineWidth(1),e.drawElements(enums.MX.LINES,8*r.length,enums.g.UNSIGNED_INT,0),e.bindVAO()}_createTransforms(){return{dvs:(0,mat3f32.c)()}}_createShaderProgram(t){if(this._program)return;this._program=t.programCache.acquire("precision highp float;\n        uniform mat3 u_dvsMat3;\n\n        attribute vec2 a_position;\n\n        void main() {\n          mediump vec3 pos = u_dvsMat3 * vec3(a_position, 1.0);\n          gl_Position = vec4(pos.xy, 0.0, 1.0);\n        }","precision mediump float;\n      void main() {\n        gl_FragColor = vec4(0.75, 0.0, 0.0, 0.75);\n      }",y().attributes)}_updateMatricesAndLocalOrigin(t){const{state:a}=t,{displayMat3:u,size:_,resolution:c,pixelRatio:h,rotation:m,viewpoint:d}=a,p=v*m,{x:g,y:x}=d.targetGeometry,b=(0,normalizeUtils.or)(g,a.spatialReference);this._localOrigin.x=b,this._localOrigin.y=x;const y=h*_[0],B=h*_[1],M=c*y,j=c*B,A=(0,mat3.g)(this._dvsMat3);(0,mat3.m)(A,A,u),(0,mat3.h)(A,A,(0,vec2f32.f)(y/2,B/2)),(0,mat3.d)(A,A,(0,vec3f32.f)(_[0]/M,-B/j,1)),(0,mat3.r)(A,A,-p)}_updateBufferData(t,e){const{x:r,y:s}=this._localOrigin,i=8*e.length,o=new Float32Array(i),a=new Uint32Array(8*e.length);let n=0,f=0;for(const l of e)l&&(o[2*n+0]=l[0]-r,o[2*n+1]=l[1]-s,o[2*n+2]=l[0]-r,o[2*n+3]=l[3]-s,o[2*n+4]=l[2]-r,o[2*n+5]=l[3]-s,o[2*n+6]=l[2]-r,o[2*n+7]=l[1]-s,a[f+0]=n+0,a[f+1]=n+3,a[f+2]=n+3,a[f+3]=n+2,a[f+4]=n+2,a[f+5]=n+1,a[f+6]=n+1,a[f+7]=n+0,n+=4,f+=8);if(this._vertexBuffer?this._vertexBuffer.setData(o.buffer):this._vertexBuffer=BufferObject.f.createVertex(t,enums.l1.DYNAMIC_DRAW,o.buffer),this._indexBuffer?this._indexBuffer.setData(a):this._indexBuffer=BufferObject.f.createIndex(t,enums.l1.DYNAMIC_DRAW,a),!this._vao){const e=y();this._vao=new VertexArrayObject.U(t,e.attributes,e.bufferLayouts,{geometry:this._vertexBuffer},this._indexBuffer)}}}const y=()=>(0,Utils.cM)("bounds",{geometry:[{location:0,name:"a_position",count:2,type:enums.g.FLOAT}]});let n=class extends FeatureContainer.T{constructor(e){super(e),this.hasHighlight=()=>!0}destroy(){super.destroy(),this._boundsRenderer=(0,maybe.SC)(this._boundsRenderer)}enableRenderingBounds(e){this._boundsRenderer=new b(e),this.requestRender()}get hasLabels(){return!1}onTileData(e,t){e.patch(t),this.contains(e)||this.addChild(e),this.requestRender()}onTileError(e){e.clear(),this.contains(e)||this.addChild(e)}_renderChildren(e,t){for(const r of this.children)r.isReady&&r.hasData&&(r.commit(e),e.context.setStencilFunction(enums.wb.EQUAL,r.stencilRef,255),r.getDisplayList().replay(e,r,t))}}},"./node_modules/@arcgis/core/views/2d/layers/graphics/HighlightGraphicContainer.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>n});var _chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__("./node_modules/@arcgis/core/core/Logger.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),__webpack_require__("./node_modules/@arcgis/core/core/has.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js")),_engine_webgl_enums_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/enums.js"),_BaseGraphicContainer_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@arcgis/core/views/2d/layers/graphics/BaseGraphicContainer.js"),_webgl_enums_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/enums.js");let i=class extends _BaseGraphicContainer_js__WEBPACK_IMPORTED_MODULE_7__.Z{doRender(e){e.drawPhase===_engine_webgl_enums_js__WEBPACK_IMPORTED_MODULE_6__.jx.HIGHLIGHT&&super.doRender(e)}renderChildren(e){if(this.attributeView.update(),!this.children.some((e=>e.hasData)))return;this.attributeView.bindTextures(e.context),super.renderChildren(e);const{painter:r}=e,s=r.effects.highlight;s.bind(e),e.context.setColorMask(!0,!0,!0,!0),e.context.clear(_webgl_enums_js__WEBPACK_IMPORTED_MODULE_8__.lk.COLOR_BUFFER_BIT),this._renderChildren(e,s.defines.concat(["highlightAll"])),s.draw(e),s.unbind()}};i=(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_9__._)([(0,_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_5__.j)("esri.views.2d.layers.support.HighlightGraphicContainer")],i);const n=i},"./node_modules/@arcgis/core/views/layers/support/MapServiceLayerViewHelper.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{VF:()=>S,Uf:()=>P});var tslib_es6=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),Graphic=__webpack_require__("./node_modules/@arcgis/core/Graphic.js"),Accessor=__webpack_require__("./node_modules/@arcgis/core/core/Accessor.js"),Collection=__webpack_require__("./node_modules/@arcgis/core/core/Collection.js"),Error=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),has=__webpack_require__("./node_modules/@arcgis/core/core/has.js"),MapUtils=__webpack_require__("./node_modules/@arcgis/core/core/MapUtils.js"),maybe=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),promiseUtils=__webpack_require__("./node_modules/@arcgis/core/core/promiseUtils.js"),reactiveUtils=__webpack_require__("./node_modules/@arcgis/core/core/reactiveUtils.js"),unitUtils=__webpack_require__("./node_modules/@arcgis/core/core/unitUtils.js"),property=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),ensureType=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),subclass=(__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js")),Extent=__webpack_require__("./node_modules/@arcgis/core/geometry/Extent.js"),scaleUtils=__webpack_require__("./node_modules/@arcgis/core/geometry/support/scaleUtils.js"),floorFilterUtils=__webpack_require__("./node_modules/@arcgis/core/layers/support/floorFilterUtils.js");function t(t,e){return e?"xoffset"in e&&e.xoffset?Math.max(t,Math.abs(e.xoffset)):"yoffset"in e&&e.yoffset?Math.max(t,Math.abs(e.yoffset||0)):t:t}function n(t,n){return"number"==typeof t?t:t&&t.stops&&t.stops.length?function e(t){let e=0,n=0;for(let r=0;r<t.length;r++){const s=t[r].size;"number"==typeof s&&(e+=s,n++)}return e/n}(t.stops):n}function r(t,e){if(!e)return t;const r=e.filter((t=>"size"===t.type)).map((e=>{const{maxSize:r,minSize:s}=e;return(n(r,t)+n(s,t))/2}));let s=0;const o=r.length;if(0===o)return t;for(let n=0;n<o;n++)s+=r[n];const f=Math.floor(s/o);return Math.max(f,t)}function clickToleranceUtils_s(e){const n=e&&e.renderer,s="touch"===(e&&e.event&&e.event.pointerType)?9:6;if(!n)return s;const o="visualVariables"in n?r(s,n.visualVariables):s;if("simple"===n.type)return t(o,n.symbol);if("unique-value"===n.type){let e=o;return n.uniqueValueInfos?.forEach((n=>{e=t(e,n.symbol)})),e}if("class-breaks"===n.type){let e=o;return n.classBreakInfos.forEach((n=>{e=t(e,n.symbol)})),e}return"dot-density"===n.type||n.type,o}var request=__webpack_require__("./node_modules/@arcgis/core/request.js"),normalizeUtils=__webpack_require__("./node_modules/@arcgis/core/geometry/support/normalizeUtils.js"),utils=__webpack_require__("./node_modules/@arcgis/core/rest/utils.js"),sql=__webpack_require__("./node_modules/@arcgis/core/core/sql.js"),jsonUtils=__webpack_require__("./node_modules/@arcgis/core/geometry/support/jsonUtils.js"),sublayerUtils=__webpack_require__("./node_modules/@arcgis/core/layers/support/sublayerUtils.js");const l=e=>e.spatialReference.wkid||JSON.stringify(e.spatialReference);function identify_a(r,t){const{dpi:n,gdbVersion:s,geometry:o,geometryPrecision:a,height:p,layerOption:m,mapExtent:y,maxAllowableOffset:c,returnFieldName:u,returnGeometry:d,returnUnformattedValues:g,returnZ:x,spatialReference:b,timeExtent:h,tolerance:E,width:O}=r.toJSON(),{dynamicLayers:S,layerDefs:j,layerIds:N}=f(r),J=t&&(0,maybe.pC)(t.geometry)?t.geometry:null,R={geometryPrecision:a,maxAllowableOffset:c,returnFieldName:u,returnGeometry:d,returnUnformattedValues:g,returnZ:x,tolerance:E},$=J&&J.toJSON()||o;if(R.imageDisplay=`${O},${p},${n}`,s&&(R.gdbVersion=s),$&&(delete $.spatialReference,R.geometry=JSON.stringify($),R.geometryType=(0,jsonUtils.Ji)($)),b?R.sr=b.wkid||JSON.stringify(b):$&&$.spatialReference?R.sr=l($):y&&y.spatialReference&&(R.sr=l(y)),R.time=h?[h.start,h.end].join(","):null,y){const{xmin:e,ymin:r,xmax:t,ymax:i}=y;R.mapExtent=`${e},${r},${t},${i}`}return j&&(R.layerDefs=j),S&&!j&&(R.dynamicLayers=S),R.layers="popup"===m?"visible":m,N&&!S&&(R.layers+=`:${N.join(",")}`),R}function f(r){const{mapExtent:t,floors:i,width:l,sublayers:a,layerIds:f,layerOption:m,gdbVersion:y}=r,c=a?.find((e=>null!=e.layer))?.layer?.serviceSublayers,u="popup"===m,d={},g=(0,scaleUtils.yZ)({extent:t,width:l,spatialReference:t?.spatialReference}),x=[],b=e=>{const r=0===g,t=0===e.minScale||g<=e.minScale,i=0===e.maxScale||g>=e.maxScale;if(e.visible&&(r||t&&i))if(e.sublayers)e.sublayers.forEach(b);else{if(!1===f?.includes(e.id)||u&&(!e.popupTemplate||!e.popupEnabled))return;x.unshift(e)}};if(a?.forEach(b),a&&!x.length)d.layerIds=[];else{const r=(0,sublayerUtils.FN)(x,c,y),t=x.map((e=>{const r=(0,floorFilterUtils.f)(i,e);return e.toExportImageJSON(r)}));if(r)d.dynamicLayers=JSON.stringify(t);else{if(a){let e=x.map((({id:e})=>e));f&&(e=e.filter((e=>f.includes(e)))),d.layerIds=e}else f?.length&&(d.layerIds=f);const r=function p(e,i){const n=!!e?.length,o=i.filter((e=>null!=e.definitionExpression||n&&null!=e.floorInfo));return o.length?o.map((i=>{const n=(0,floorFilterUtils.f)(e,i),o=(0,sql._)(n,i.definitionExpression);return{id:i.id,definitionExpression:(0,maybe.Pt)(o,void 0)}})):null}(i,x);if((0,maybe.pC)(r)&&r.length){const e={};for(const t of r)t.definitionExpression&&(e[t.id]=t.definitionExpression);Object.keys(e).length&&(d.layerDefs=JSON.stringify(e))}}}return d}var m,geometry=__webpack_require__("./node_modules/@arcgis/core/geometry.js"),TimeExtent=__webpack_require__("./node_modules/@arcgis/core/TimeExtent.js"),JSONSupport=__webpack_require__("./node_modules/@arcgis/core/core/JSONSupport.js"),SpatialReference=__webpack_require__("./node_modules/@arcgis/core/geometry/SpatialReference.js");let a=m=class extends JSONSupport.wq{static from(t){return(0,ensureType.TJ)(m,t)}constructor(t){super(t),this.dpi=96,this.floors=null,this.gdbVersion=null,this.geometry=null,this.geometryPrecision=null,this.height=400,this.layerIds=null,this.layerOption="top",this.mapExtent=null,this.maxAllowableOffset=null,this.returnFieldName=!0,this.returnGeometry=!1,this.returnM=!1,this.returnUnformattedValues=!0,this.returnZ=!1,this.spatialReference=null,this.sublayers=null,this.timeExtent=null,this.tolerance=null,this.width=400}};(0,tslib_es6._)([(0,property.Cb)({type:Number,json:{write:!0}})],a.prototype,"dpi",void 0),(0,tslib_es6._)([(0,property.Cb)()],a.prototype,"floors",void 0),(0,tslib_es6._)([(0,property.Cb)({type:String,json:{write:!0}})],a.prototype,"gdbVersion",void 0),(0,tslib_es6._)([(0,property.Cb)({types:geometry.qM,json:{read:jsonUtils.im,write:!0}})],a.prototype,"geometry",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Number,json:{write:!0}})],a.prototype,"geometryPrecision",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Number,json:{write:!0}})],a.prototype,"height",void 0),(0,tslib_es6._)([(0,property.Cb)({type:[Number],json:{write:!0}})],a.prototype,"layerIds",void 0),(0,tslib_es6._)([(0,property.Cb)({type:["top","visible","all","popup"],json:{write:!0}})],a.prototype,"layerOption",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Extent.Z,json:{write:!0}})],a.prototype,"mapExtent",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Number,json:{write:!0}})],a.prototype,"maxAllowableOffset",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Boolean,json:{write:!0}})],a.prototype,"returnFieldName",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Boolean,json:{write:!0}})],a.prototype,"returnGeometry",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Boolean,json:{write:!0}})],a.prototype,"returnM",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Boolean,json:{write:!0}})],a.prototype,"returnUnformattedValues",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Boolean,json:{write:!0}})],a.prototype,"returnZ",void 0),(0,tslib_es6._)([(0,property.Cb)({type:SpatialReference.Z,json:{write:!0}})],a.prototype,"spatialReference",void 0),(0,tslib_es6._)([(0,property.Cb)()],a.prototype,"sublayers",void 0),(0,tslib_es6._)([(0,property.Cb)({type:TimeExtent.Z,json:{write:!0}})],a.prototype,"timeExtent",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Number,json:{write:!0}})],a.prototype,"tolerance",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Number,json:{write:!0}})],a.prototype,"width",void 0),a=m=(0,tslib_es6._)([(0,subclass.j)("esri.rest.support.IdentifyParameters")],a);const IdentifyParameters_u=a;var reader=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/reader.js"),writer=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/writer.js"),typeUtils=__webpack_require__("./node_modules/@arcgis/core/geometry/support/typeUtils.js");let IdentifyResult_m=class extends JSONSupport.wq{constructor(r){super(r),this.displayFieldName=null,this.feature=null,this.layerId=null,this.layerName=null}readFeature(r,t){return Graphic.Z.fromJSON({attributes:{...t.attributes},geometry:{...t.geometry}})}writeFeature(r,e){if(!r)return;const{attributes:t,geometry:s}=r;t&&(e.attributes={...t}),(0,maybe.pC)(s)&&(e.geometry=s.toJSON(),e.geometryType=typeUtils.P.toJSON(s.type))}};(0,tslib_es6._)([(0,property.Cb)({type:String,json:{write:!0}})],IdentifyResult_m.prototype,"displayFieldName",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Graphic.Z})],IdentifyResult_m.prototype,"feature",void 0),(0,tslib_es6._)([(0,reader.r)("feature",["attributes","geometry"])],IdentifyResult_m.prototype,"readFeature",null),(0,tslib_es6._)([(0,writer.c)("feature")],IdentifyResult_m.prototype,"writeFeature",null),(0,tslib_es6._)([(0,property.Cb)({type:Number,json:{write:!0}})],IdentifyResult_m.prototype,"layerId",void 0),(0,tslib_es6._)([(0,property.Cb)({type:String,json:{write:!0}})],IdentifyResult_m.prototype,"layerName",void 0),IdentifyResult_m=(0,tslib_es6._)([(0,subclass.j)("esri.rest.support.IdentifyResult")],IdentifyResult_m);const y=IdentifyResult_m;async function identify_f(u,i,f){const c=(i=function rest_identify_a(r){return IdentifyParameters_u.from(r)}(i)).geometry?[i.geometry]:[],l=(0,utils.en)(u);return l.path+="/identify",(0,normalizeUtils.aX)(c).then((e=>{const t=identify_a(i,{geometry:e&&e[0]}),u=(0,utils.cv)({...l.query,f:"json",...t}),a=(0,utils.lA)(u,f);return(0,request.default)(l.path,a).then(identify_m).then((r=>function identify_p(r,e){if(!e?.length)return r;const t=new Map;function o(r){t.set(r.id,r),r.sublayers&&r.sublayers.forEach(o)}e.forEach(o);for(const s of r.results)s.feature.sourceLayer=t.get(s.layerId);return r}(r,i.sublayers)))}))}function identify_m(r){const e=r.data;return e.results=e.results||[],e.exceededTransferLimit=Boolean(e.exceededTransferLimit),e.results=e.results.map((r=>y.fromJSON(r))),e}var arcadeOnDemand=__webpack_require__("./node_modules/@arcgis/core/support/arcadeOnDemand.js"),SimpleMarkerSymbol=__webpack_require__("./node_modules/@arcgis/core/symbols/SimpleMarkerSymbol.js"),popupUtils=__webpack_require__("./node_modules/@arcgis/core/views/layers/support/popupUtils.js");let G=null;function P(e,t){return"tile"===t.type||"map-image"===t.type}let S=class extends Accessor.Z{constructor(e){super(e),this._featuresResolutions=new WeakMap,this.highlightGraphics=null,this.highlightGraphicUpdated=null,this.updateHighlightedFeatures=(0,promiseUtils.Ds)((async e=>{this.destroyed||this.updatingHandles.addPromise(this._updateHighlightedFeaturesGeometries(e).catch((()=>{})))}))}initialize(){const e=e=>{this.updatingHandles.addPromise(this._updateHighlightedFeaturesSymbols(e).catch((()=>{}))),this.updateHighlightedFeatures(this._highlightGeometriesResolution)};this.addHandles([(0,reactiveUtils.on)((()=>this.highlightGraphics),"change",(t=>e(t.added)),{onListenerAdd:t=>e(t)})])}async fetchPopupFeatures(e,t){const{layerView:{layer:r,view:{scale:s}}}=this;if(!e)throw new Error.Z("fetchPopupFeatures:invalid-area","Nothing to fetch without area",{layer:r});const o=function _(e,t,r){const s=[],i=e=>{const o=0===e.minScale||t<=e.minScale,n=0===e.maxScale||t>=e.maxScale;if(e.visible&&o&&n)if(e.sublayers)e.sublayers.forEach(i);else if(e.popupEnabled){const t=(0,popupUtils.V)(e,{...r,defaultPopupTemplateEnabled:!1});(0,maybe.pC)(t)&&s.unshift({sublayer:e,popupTemplate:t})}};return(e?.toArray()??[]).reverse().map(i),s}(r.sublayers,s,t);if(!o.length)return[];const a=await async function R(e,t){if(e.capabilities?.operations?.supportsQuery)return!0;try{return await Promise.any(t.map((({sublayer:e})=>e.load().then((()=>e.capabilities.operations.supportsQuery)))))}catch{return!1}}(r,o);if(!((r.capabilities?.operations?.supportsIdentify??1)&&r.version>=10.5||a))throw new Error.Z("fetchPopupFeatures:not-supported","query operation is disabled for this service",{layer:r});return a?this._fetchPopupFeaturesUsingQueries(e,o,t):this._fetchPopupFeaturesUsingIdentify(e,o,t)}clearHighlights(){this.highlightGraphics?.removeAll()}highlight(e){const r=this.highlightGraphics;if(!r)return{remove(){}};let i=null;if(e instanceof Graphic.Z?i=[e]:Collection.Z.isCollection(e)&&e.length>0?i=e.toArray():Array.isArray(e)&&e.length>0&&(i=e),i=i?.filter(maybe.pC),!i||!i.length)return{remove:()=>{}};for(const t of i){const e=t.sourceLayer;null!=e&&"geometryType"in e&&"point"===e.geometryType&&(t.visible=!1)}return r.addMany(i),{remove:()=>{r.removeMany(i??[])}}}async _updateHighlightedFeaturesSymbols(e){const{layerView:{view:t},highlightGraphics:r,highlightGraphicUpdated:s}=this;if(r&&s)for(const i of e){const e=i.sourceLayer&&"renderer"in i.sourceLayer&&i.sourceLayer.renderer;i.sourceLayer&&"geometryType"in i.sourceLayer&&"point"===i.sourceLayer.geometryType&&e&&"getSymbolAsync"in e&&e.getSymbolAsync(i).then((async o=>{o||(o=new SimpleMarkerSymbol.Z);let a=null;const n="visualVariables"in e?e.visualVariables?.find((e=>"size"===e.type)):void 0;n&&(G||(G=(await Promise.resolve().then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/renderers/visualVariables/support/visualVariableUtils.js"))).getSize),a=G(n,i,{view:t.type,scale:t.scale,shape:"simple-marker"===o.type?o.style:null})),a||(a="width"in o&&"height"in o&&null!=o.width&&null!=o.height?Math.max(o.width,o.height):"size"in o?o.size:16),r.includes(i)&&(i.symbol=new SimpleMarkerSymbol.Z({style:"square",size:a,xoffset:"xoffset"in o?o.xoffset:0,yoffset:"yoffset"in o?o.yoffset:0}),s(i,"symbol"),i.visible=!0)}))}}async _updateHighlightedFeaturesGeometries(e){const{layerView:{layer:t,view:r},highlightGraphics:s,highlightGraphicUpdated:i}=this;if(this._highlightGeometriesResolution=e,!i||!s?.length||!t.capabilities.operations.supportsQuery)return;const a=this._getTargetResolution(e),n=new Map;for(const c of s)if(!this._featuresResolutions.has(c)||this._featuresResolutions.get(c)>a){const e=c.sourceLayer;(0,MapUtils.s1)(n,e,(()=>new Map)).set(c.getObjectId(),c)}const l=Array.from(n,(([e,t])=>{const s=e.createQuery();return s.objectIds=[...t.keys()],s.outFields=[e.objectIdField],s.returnGeometry=!0,s.maxAllowableOffset=a,s.outSpatialReference=r.spatialReference,e.queryFeatures(s)})),p=await Promise.all(l);if(!this.destroyed)for(const{features:o}of p)for(const e of o){const t=e.sourceLayer,r=n.get(t).get(e.getObjectId());r&&s.includes(r)&&(r.geometry=e.geometry,i(r,"geometry"),this._featuresResolutions.set(r,a))}}_getTargetResolution(e){const t=e*(0,unitUtils.c9)(this.layerView.view.spatialReference),r=t/16;return r<=10?0:e/t*r}async _fetchPopupFeaturesUsingIdentify(e,t,r){const s=await this._createIdentifyParameters(e,t,r);if((0,maybe.Wi)(s))return[];const{results:i}=await identify_f(this.layerView.layer.parsedUrl,s);return i.map((e=>e.feature))}async _createIdentifyParameters(e,t,r){const{floors:s,layer:i,timeExtent:o,view:{spatialReference:n,scale:l}}=this.layerView,p=(0,maybe.pC)(r)?r.event:null;if(!t.length)return null;await Promise.all(t.map((({sublayer:e})=>e.load().catch((()=>{})))));const c=Math.min((0,has.Z)("mapservice-popup-identify-max-tolerance"),i.allSublayers.reduce(((e,t)=>t.renderer?clickToleranceUtils_s({renderer:t.renderer,event:p}):e),2)),u=this.createFetchPopupFeaturesQueryGeometry(e,c),h=(0,scaleUtils.dp)(l,n),y=Math.round(u.width/h),d=new Extent.Z({xmin:u.center.x-h*y,ymin:u.center.y-h*y,xmax:u.center.x+h*y,ymax:u.center.y+h*y,spatialReference:u.spatialReference});return new IdentifyParameters_u({floors:s,gdbVersion:"gdbVersion"in i?i.gdbVersion:void 0,geometry:e,height:y,layerOption:"popup",mapExtent:d,returnGeometry:!0,spatialReference:n,sublayers:i.sublayers,timeExtent:o,tolerance:c,width:y})}async _fetchPopupFeaturesUsingQueries(e,t,r){const{layerView:{floors:s,timeExtent:i}}=this,o=(0,maybe.pC)(r)?r.event:null,n=t.map((async({sublayer:t,popupTemplate:r})=>{if(await t.load().catch((()=>{})),t.capabilities&&!t.capabilities.operations.supportsQuery)return[];const n=t.createQuery(),l=clickToleranceUtils_s({renderer:t.renderer,event:o}),p=this.createFetchPopupFeaturesQueryGeometry(e,l);if(n.geometry=p,n.outFields=await(0,popupUtils.e)(t,r),n.timeExtent=i,s){const e=s.clone(),r=(0,floorFilterUtils.f)(e,t);(0,maybe.pC)(r)&&(n.where=n.where?`(${n.where}) AND (${r})`:r)}const c=this._getTargetResolution(p.width/l),u=await function U(e){return e.expressionInfos?.length||Array.isArray(e.content)&&e.content.some((e=>"expression"===e.type))?(0,arcadeOnDemand.LC)():Promise.resolve()}(r),h="point"===t.geometryType||u&&u.arcadeUtils.hasGeometryOperations(r);h||(n.maxAllowableOffset=c);let{features:y}=await t.queryFeatures(n);const m=h?0:c;y=await async function A(e,t){const r=e.renderer;return r&&"defaultSymbol"in r&&!r.defaultSymbol&&(t=r.valueExpression?await Promise.all(t.map((e=>r.getSymbolAsync(e).then((t=>t?e:null))))).then((e=>e.filter((e=>null!=e)))):t.filter((e=>null!=r.getSymbol(e)))),t}(t,y);for(const e of y)this._featuresResolutions.set(e,m);return y}));return(await(0,promiseUtils.as)(n)).reverse().reduce(((e,t)=>t.value?[...e,...t.value]:e),[]).filter((e=>null!=e))}};(0,tslib_es6._)([(0,property.Cb)({constructOnly:!0})],S.prototype,"createFetchPopupFeaturesQueryGeometry",void 0),(0,tslib_es6._)([(0,property.Cb)({constructOnly:!0})],S.prototype,"layerView",void 0),(0,tslib_es6._)([(0,property.Cb)({constructOnly:!0})],S.prototype,"highlightGraphics",void 0),(0,tslib_es6._)([(0,property.Cb)({constructOnly:!0})],S.prototype,"highlightGraphicUpdated",void 0),(0,tslib_es6._)([(0,property.Cb)({constructOnly:!0})],S.prototype,"updatingHandles",void 0),S=(0,tslib_es6._)([(0,subclass.j)("esri.views.layers.support.MapService")],S)},"./node_modules/@arcgis/core/views/layers/support/popupUtils.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>s,e:()=>d});var _core_maybe_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_layers_support_fieldUtils_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/layers/support/fieldUtils.js");async function d(l,d=l.popupTemplate){if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_1__.Wi)(d))return[];const s=await d.getRequiredFields(l.fieldsIndex),{lastEditInfoEnabled:i}=d,{objectIdField:n,typeIdField:u,globalIdField:a,relationships:o}=l;if(s.includes("*"))return["*"];const r=i?await(0,_layers_support_fieldUtils_js__WEBPACK_IMPORTED_MODULE_0__.CH)(l):[],f=(0,_layers_support_fieldUtils_js__WEBPACK_IMPORTED_MODULE_0__.Q0)(l.fieldsIndex,[...s,...r]);return u&&f.push(u),f&&n&&l.fieldsIndex?.has(n)&&!f.includes(n)&&f.push(n),f&&a&&l.fieldsIndex?.has(a)&&!f.includes(a)&&f.push(a),o&&o.forEach((e=>{const{keyField:p}=e;f&&p&&l.fieldsIndex?.has(p)&&!f.includes(p)&&f.push(p)})),f}function s(e,p){return e.popupTemplate?e.popupTemplate:(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_1__.pC)(p)&&p.defaultPopupTemplateEnabled&&(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_1__.pC)(e.defaultPopupTemplate)?e.defaultPopupTemplate:null}},"./node_modules/@arcgis/core/views/support/drapedUtils.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{K:()=>a});__webpack_require__("./node_modules/@arcgis/core/geometry.js");var _core_maybe_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_core_unitUtils_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/unitUtils.js"),_geometry_Extent_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/geometry/Extent.js");function a(t,n,a,o=new _geometry_Extent_js__WEBPACK_IMPORTED_MODULE_2__.Z){let s=0;if("2d"===a.type)s=n*(a.resolution??0);else if("3d"===a.type){const i=a.overlayPixelSizeInMapUnits(t),o=a.basemapSpatialReference;s=(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__.pC)(o)&&!o.equals(a.spatialReference)?(0,_core_unitUtils_js__WEBPACK_IMPORTED_MODULE_1__.c9)(o)/(0,_core_unitUtils_js__WEBPACK_IMPORTED_MODULE_1__.c9)(a.spatialReference):n*i}const m=t.x-s,p=t.y-s,c=t.x+s,l=t.y+s,{spatialReference:f}=a;return o.xmin=Math.min(m,c),o.ymin=Math.min(p,l),o.xmax=Math.max(m,c),o.ymax=Math.max(p,l),o.spatialReference=f,o}new _geometry_Extent_js__WEBPACK_IMPORTED_MODULE_2__.Z}}]);