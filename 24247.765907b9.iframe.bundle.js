"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[24247],{"./node_modules/@arcgis/core/layers/support/ExportWMSImageParameters.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>o});var _chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),_core_Accessor_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/Accessor.js"),_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_6__=(__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/has.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js"));const a={visible:"visibleSublayers"};let o=class extends _core_Accessor_js__WEBPACK_IMPORTED_MODULE_1__.A{constructor(e){super(e),this.scale=0}set layer(e){this._get("layer")!==e&&(this._set("layer",e),this.removeHandles("layer"),e&&this.addHandles([e.sublayers.on("change",(()=>this.notifyChange("visibleSublayers"))),e.on("wms-sublayer-update",(e=>this.notifyChange(a[e.propertyName])))],"layer"))}get layers(){return this.visibleSublayers.filter((({name:e})=>e)).map((({name:e})=>e)).join()}get version(){this.commitProperty("layers");const e=this.layer;return e&&e.commitProperty("imageTransparency"),(this._get("version")||0)+1}get visibleSublayers(){const{layer:e,scale:r}=this,s=e?.sublayers,t=[],a=e=>{const{minScale:s,maxScale:o,sublayers:l,visible:i}=e;i&&(0===r||(0===s||r<=s)&&(0===o||r>=o))&&(l?l.forEach(a):t.push(e))};return s?.forEach(a),t}toJSON(){const{layer:e,layers:r}=this,{imageFormat:s,imageTransparency:t,version:a}=e;return{format:s,request:"GetMap",service:"WMS",styles:"",transparent:t?"TRUE":"FALSE",version:a,layers:r}}};(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_2__.MZ)()],o.prototype,"layer",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_2__.MZ)({readOnly:!0})],o.prototype,"layers",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_2__.MZ)({type:Number})],o.prototype,"scale",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_2__.MZ)({readOnly:!0})],o.prototype,"version",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_2__.MZ)({readOnly:!0})],o.prototype,"visibleSublayers",null),o=(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_6__.$)("esri.layers.support.ExportWMSImageParameters")],o)},"./node_modules/@arcgis/core/views/2d/engine/Bitmap.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{LG:()=>f,mb:()=>b,yr:()=>w});var _core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/promiseUtils.js"),_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/chunks/mat3.js"),_chunks_mat3f32_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/chunks/mat3f32.js"),_chunks_vec2f32_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/chunks/vec2f32.js"),_DisplayObject_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/DisplayObject.js"),_ImageryBitmapSource_js__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/ImageryBitmapSource.js"),_webgl_contextUtils_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/contextUtils.js"),_webgl_enums_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/enums.js"),_webgl_Texture_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/Texture.js"),_webgl_TextureDescriptor_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/TextureDescriptor.js");function f(t){return t&&"render"in t}function w(t){const e=document.createElement("canvas");return e.width=t.width,e.height=t.height,t.render(e.getContext("2d")),e}class b extends _DisplayObject_js__WEBPACK_IMPORTED_MODULE_4__.q{constructor(t=null,e=!1){super(),this.blendFunction="standard",this._sourceWidth=0,this._sourceHeight=0,this._textureInvalidated=!1,this._texture=null,this.stencilRef=0,this.coordScale=[1,1],this._height=void 0,this.pixelRatio=1,this.resolution=0,this.rotation=0,this._source=null,this._width=void 0,this.x=0,this.y=0,this.immutable=e,this.source=t,this.requestRender=this.requestRender.bind(this)}destroy(){this._texture&&(this._texture.dispose(),this._texture=null),null!=this._uploadStatus&&(this._uploadStatus.controller.abort(),this._uploadStatus=null)}get isSourceScaled(){return this.width!==this._sourceWidth||this.height!==this._sourceHeight}get height(){return void 0!==this._height?this._height:this._sourceHeight}set height(t){this._height=t}get source(){return this._source}set source(t){null==t&&null==this._source||(this._source=t,this.invalidateTexture(),this.requestRender())}get width(){return void 0!==this._width?this._width:this._sourceWidth}set width(t){this._width=t}beforeRender(t){super.beforeRender(t),this.updateTexture(t)}async setSourceAsync(s,i){null!=this._uploadStatus&&this._uploadStatus.controller.abort();const r=new AbortController,h=(0,_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_0__.Tw)();return(0,_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_0__.NY)(i,(()=>r.abort())),(0,_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_0__.NY)(r,(t=>h.reject(t))),this._uploadStatus={controller:r,resolver:h},this.source=s,h.promise}invalidateTexture(){this._textureInvalidated||(this._textureInvalidated=!0,this._source instanceof HTMLImageElement?(this._sourceHeight=this._source.naturalHeight,this._sourceWidth=this._source.naturalWidth):this._source&&(this._sourceHeight=this._source.height,this._sourceWidth=this._source.width))}updateTransitionProperties(t,e){t>=64&&(this.fadeTransitionEnabled=!1,this.inFadeTransition=!1),super.updateTransitionProperties(t,e)}setTransform(t){const e=(0,_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_1__.g)(this.transforms.dvs),[s,a]=t.toScreenNoRotation([0,0],[this.x,this.y]),d=this.resolution/this.pixelRatio/t.resolution,l=d*this.width,c=d*this.height,_=Math.PI*this.rotation/180;(0,_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_1__.h)(e,e,(0,_chunks_vec2f32_js__WEBPACK_IMPORTED_MODULE_3__.f)(s,a)),(0,_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_1__.h)(e,e,(0,_chunks_vec2f32_js__WEBPACK_IMPORTED_MODULE_3__.f)(l/2,c/2)),(0,_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_1__.r)(e,e,-_),(0,_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_1__.h)(e,e,(0,_chunks_vec2f32_js__WEBPACK_IMPORTED_MODULE_3__.f)(-l/2,-c/2)),(0,_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_1__.l)(e,e,(0,_chunks_vec2f32_js__WEBPACK_IMPORTED_MODULE_3__.f)(l,c)),(0,_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_1__.m)(this.transforms.dvs,t.displayViewMat3,e)}setSamplingProfile(t){this._texture&&(t.mips&&!this._texture.descriptor.hasMipmap&&this._texture.generateMipmap(),this._texture.setSamplingMode(t.samplingMode))}bind(t,e){this._texture&&t.bindTexture(this._texture,e)}async updateTexture({context:t,painter:e}){if(!this._textureInvalidated)return;if(this._textureInvalidated=!1,this._texture||(this._texture=this._createTexture(t)),!this.source)return void this._texture.setData(null);this._texture.resize(this._sourceWidth,this._sourceHeight);const i=function v(t){return f(t)?t instanceof _ImageryBitmapSource_js__WEBPACK_IMPORTED_MODULE_9__.A?t.getRenderedRasterPixels()?.renderedRasterPixels:w(t):t}(this.source);try{if(null!=this._uploadStatus){const{controller:t,resolver:s}=this._uploadStatus,r={signal:t.signal},{width:h,height:o}=this,u=this._texture,a=e.textureUploadManager;await a.enqueueTextureUpdate({data:i,texture:u,width:h,height:o},r),s.resolve(),this._uploadStatus=null}else this._texture.setData(i);this.ready()}catch(r){(0,_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_0__.jH)(r)}}onDetach(){this.destroy()}_createTransforms(){return{dvs:(0,_chunks_mat3f32_js__WEBPACK_IMPORTED_MODULE_2__.c)()}}_createTexture(t){const e=this.immutable&&t.type===_webgl_contextUtils_js__WEBPACK_IMPORTED_MODULE_5__.EL.WEBGL2,s=new _webgl_TextureDescriptor_js__WEBPACK_IMPORTED_MODULE_8__.R;return s.internalFormat=e?_webgl_enums_js__WEBPACK_IMPORTED_MODULE_6__.H0.RGBA8:_webgl_enums_js__WEBPACK_IMPORTED_MODULE_6__.Ab.RGBA,s.wrapMode=_webgl_enums_js__WEBPACK_IMPORTED_MODULE_6__.pF.CLAMP_TO_EDGE,s.isImmutable=e,s.width=this._sourceWidth,s.height=this._sourceHeight,new _webgl_Texture_js__WEBPACK_IMPORTED_MODULE_7__.g(t,s)}}},"./node_modules/@arcgis/core/views/2d/engine/BitmapContainer.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{l:()=>a});var _brushes_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/brushes.js"),_webgl_enums_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/enums.js"),_webgl_WGLContainer_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/WGLContainer.js");class a extends _webgl_WGLContainer_js__WEBPACK_IMPORTED_MODULE_2__.A{constructor(){super(...arguments),this._hasCrossfade=!1}get requiresDedicatedFBO(){return super.requiresDedicatedFBO||this._hasCrossfade}beforeRender(e){super.beforeRender(e),this._manageFade()}prepareRenderPasses(s){const a=s.registerRenderPass({name:"bitmap",brushes:[_brushes_js__WEBPACK_IMPORTED_MODULE_0__.d.bitmap],target:()=>this.children,drawPhase:_webgl_enums_js__WEBPACK_IMPORTED_MODULE_1__.S5.MAP});return[...super.prepareRenderPasses(s),a]}_manageFade(){this.children.reduce(((e,r)=>e+(r.inFadeTransition?1:0)),0)>=2?(this.children.forEach((e=>e.blendFunction="additive")),this._hasCrossfade=!0):(this.children.forEach((e=>e.blendFunction="standard")),this._hasCrossfade=!1)}}},"./node_modules/@arcgis/core/views/2d/engine/ImageryBitmapSource.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>l});class l{constructor(l,e,t){this.pixelBlock=l,this.extent=e,this.originalPixelBlock=t}get width(){return null!=this.pixelBlock?this.pixelBlock.width:0}get height(){return null!=this.pixelBlock?this.pixelBlock.height:0}render(l){const e=this.pixelBlock;if(null==e)return;const t=this.filter({extent:this.extent,pixelBlock:this.originalPixelBlock??e});if(null==t.pixelBlock)return;t.pixelBlock.maskIsAlpha&&(t.pixelBlock.premultiplyAlpha=!0);const i=t.pixelBlock.getAsRGBA(),h=l.createImageData(t.pixelBlock.width,t.pixelBlock.height);h.data.set(i),l.putImageData(h,0,0)}getRenderedRasterPixels(){const l=this.filter({extent:this.extent,pixelBlock:this.pixelBlock});return null==l.pixelBlock?null:(l.pixelBlock.maskIsAlpha&&(l.pixelBlock.premultiplyAlpha=!0),{width:l.pixelBlock.width,height:l.pixelBlock.height,renderedRasterPixels:new Uint8Array(l.pixelBlock.getAsRGBA().buffer)})}}},"./node_modules/@arcgis/core/views/2d/layers/WMSLayerView2D.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>g});var tslib_es6=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),Logger=__webpack_require__("./node_modules/@arcgis/core/core/Logger.js"),maybe=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),promiseUtils=__webpack_require__("./node_modules/@arcgis/core/core/promiseUtils.js"),reactiveUtils=__webpack_require__("./node_modules/@arcgis/core/core/reactiveUtils.js"),property=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),subclass=(__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/has.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js")),Extent=__webpack_require__("./node_modules/@arcgis/core/geometry/Extent.js"),BitmapContainer=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/BitmapContainer.js"),LayerView2D=__webpack_require__("./node_modules/@arcgis/core/views/2d/layers/LayerView2D.js"),ExportStrategy=__webpack_require__("./node_modules/@arcgis/core/views/2d/layers/support/ExportStrategy.js"),LayerView=__webpack_require__("./node_modules/@arcgis/core/views/layers/LayerView.js"),RefreshableLayerView=__webpack_require__("./node_modules/@arcgis/core/views/layers/RefreshableLayerView.js"),Error=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),commonProperties=__webpack_require__("./node_modules/@arcgis/core/layers/support/commonProperties.js"),ExportWMSImageParameters=__webpack_require__("./node_modules/@arcgis/core/layers/support/ExportWMSImageParameters.js");const i=i=>{let m=class extends i{initialize(){this.exportImageParameters=new ExportWMSImageParameters.r({layer:this.layer})}destroy(){this.exportImageParameters=(0,maybe.pR)(this.exportImageParameters)}get exportImageVersion(){return this.exportImageParameters?.commitProperty("version"),this.commitProperty("timeExtent"),(this._get("exportImageVersion")||0)+1}fetchPopupFeatures(e){const{layer:t}=this;if(!e)return Promise.reject(new Error.A("wmslayerview:fetchPopupFeatures","Nothing to fetch without area",{layer:t}));const{popupEnabled:o}=t;if(!o)return Promise.reject(new Error.A("wmslayerview:fetchPopupFeatures","popupEnabled should be true",{popupEnabled:o}));const s=this.createFetchPopupFeaturesQuery(e);if(!s)return Promise.resolve([]);const{extent:p,width:a,height:i,x:m,y:n}=s;if(!(p&&a&&i))throw new Error.A("wmslayerview:fetchPopupFeatures","WMSLayer does not support fetching features.",{extent:p,width:a,height:i});return t.fetchFeatureInfo(p,a,i,m,n)}};return(0,tslib_es6._)([(0,property.MZ)()],m.prototype,"exportImageParameters",void 0),(0,tslib_es6._)([(0,property.MZ)({readOnly:!0})],m.prototype,"exportImageVersion",null),(0,tslib_es6._)([(0,property.MZ)()],m.prototype,"layer",void 0),(0,tslib_es6._)([(0,property.MZ)(commonProperties.ui)],m.prototype,"timeExtent",void 0),m=(0,tslib_es6._)([(0,subclass.$)("esri.layers.mixins.WMSLayerView")],m),m};let y=class extends(i((0,RefreshableLayerView.A)((0,LayerView2D.e)(LayerView.A)))){constructor(){super(...arguments),this.bitmapContainer=new BitmapContainer.l}supportsSpatialReference(e){return this.layer.serviceSupportsSpatialReference(e)}update(e){this.strategy.update(e).catch((e=>{(0,promiseUtils.zf)(e)||Logger.A.getLogger(this).error(e)}))}attach(){const{layer:e}=this,{imageMaxHeight:t,imageMaxWidth:r}=e;this.bitmapContainer=new BitmapContainer.l,this.container.addChild(this.bitmapContainer),this.strategy=new ExportStrategy.A({container:this.bitmapContainer,fetchSource:this.fetchImage.bind(this),requestUpdate:this.requestUpdate.bind(this),imageMaxHeight:t,imageMaxWidth:r,imageRotationSupported:!1,imageNormalizationSupported:!1,hidpi:!1}),this.addAttachHandles((0,reactiveUtils.wB)((()=>this.exportImageVersion),(()=>this.requestUpdate())))}detach(){this.strategy=(0,maybe.pR)(this.strategy),this.container.removeAllChildren()}moveStart(){}viewChange(){}moveEnd(){this.requestUpdate()}createFetchPopupFeaturesQuery(e){const{view:t,bitmapContainer:r}=this,{x:i,y:s}=e,{spatialReference:a}=t;let o,n=0,m=0;if(r.children.some((e=>{const{width:t,height:r,resolution:h,x:c,y:d}=e,u=c+h*t,y=d-h*r;return i>=c&&i<=u&&s<=d&&s>=y&&(o=new Extent.A({xmin:c,ymin:y,xmax:u,ymax:d,spatialReference:a}),n=t,m=r,!0)})),!o)return null;const h=o.width/n,c=Math.round((i-o.xmin)/h),d=Math.round((o.ymax-s)/h);return{extent:o,width:n,height:m,x:c,y:d}}async doRefresh(){this.requestUpdate()}isUpdating(){return this.strategy.updating||this.updateRequested}fetchImage(e,t,r,i){return this.layer.fetchImageBitmap(e,t,r,{timeExtent:this.timeExtent,...i})}};(0,tslib_es6._)([(0,property.MZ)()],y.prototype,"strategy",void 0),(0,tslib_es6._)([(0,property.MZ)()],y.prototype,"updating",void 0),y=(0,tslib_es6._)([(0,subclass.$)("esri.views.2d.layers.WMSLayerView2D")],y);const g=y},"./node_modules/@arcgis/core/views/2d/layers/support/ExportStrategy.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>v});var tslib_es6=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),Accessor=__webpack_require__("./node_modules/@arcgis/core/core/Accessor.js"),promiseUtils=(__webpack_require__("./node_modules/@arcgis/core/core/has.js"),__webpack_require__("./node_modules/@arcgis/core/core/promiseUtils.js")),property=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),subclass=(__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js")),aaBoundingRect=__webpack_require__("./node_modules/@arcgis/core/geometry/support/aaBoundingRect.js"),spatialReferenceUtils=__webpack_require__("./node_modules/@arcgis/core/geometry/support/spatialReferenceUtils.js"),TileInfo=__webpack_require__("./node_modules/@arcgis/core/layers/support/TileInfo.js");const t=Math.PI/180;function n(n){return n*t}function o(t,o){const a=n(o.rotation),r=Math.abs(Math.cos(a)),s=Math.abs(Math.sin(a)),[u,c]=o.size;return t[0]=Math.round(c*s+u*r),t[1]=Math.round(c*r+u*s),t}var Bitmap=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/Bitmap.js"),TileInfoView=__webpack_require__("./node_modules/@arcgis/core/views/2d/tiling/TileInfoView.js"),TileKey=__webpack_require__("./node_modules/@arcgis/core/views/2d/tiling/TileKey.js");const y=(0,aaBoundingRect.vt)(),x=[0,0],S=new TileKey.A(0,0,0,0),__imageMaxWidth=2048,__imageMaxHeight=2048,__imageRotationSupported=!1,__imageNormalizationSupported=!1,__hidpi=!1;let w=class extends Accessor.A{constructor(t){super(t),this._imagePromise=null,this.bitmaps=[],this.hidpi=__hidpi,this.imageMaxWidth=__imageMaxWidth,this.imageMaxHeight=__imageMaxHeight,this.imageRotationSupported=__imageRotationSupported,this.imageNormalizationSupported=__imageNormalizationSupported,this.update=(0,promiseUtils.sg)((async(t,e)=>{if((0,promiseUtils.Te)(e),!t.stationary||this.destroyed)return;const i=t.state,s=(0,spatialReferenceUtils.Vp)(i.spatialReference),a=this.hidpi?t.pixelRatio:1,p=this.imageNormalizationSupported&&i.worldScreenWidth&&i.worldScreenWidth<i.size[0],n=this.imageMaxWidth??0,m=this.imageMaxHeight??0;p?(x[0]=i.worldScreenWidth,x[1]=i.size[1]):this.imageRotationSupported?(x[0]=i.size[0],x[1]=i.size[1]):o(x,i);const h=Math.floor(x[0]*a)>n||Math.floor(x[1]*a)>m,c=s&&(i.extent.xmin<s.valid[0]||i.extent.xmax>s.valid[1]),u=!this.imageNormalizationSupported&&c,g=!h&&!u,f=this.imageRotationSupported?i.rotation:0,y=this.container.children.slice();if(g){const t=p?i.paddedViewState.center:i.center;this._imagePromise&&console.error("Image promise was not defined!"),this._imagePromise=this._singleExport(i,x,t,i.resolution,f,a,e)}else{let t=Math.min(n,m);u&&(t=Math.min(i.worldScreenWidth,t)),this._imagePromise=this._tiledExport(i,t,a,e)}try{const t=await this._imagePromise??[];(0,promiseUtils.Te)(e);const i=[];if(this._imagePromise=null,this.destroyed)return;this.bitmaps=t;for(const e of y)t.includes(e)||i.push(e.fadeOut().then((()=>{e.remove(),e.destroy()})));for(const e of t)i.push(e.fadeIn());await Promise.all(i)}catch(S){this._imagePromise=null,(0,promiseUtils.QP)(S)}}),5e3),this.updateExports=(0,promiseUtils.sg)((async t=>{const e=[];for(const i of this.container.children){if(!i.visible||!i.stage)return;e.push(t(i).then((()=>{i.invalidateTexture(),i.requestRender()})))}this._imagePromise=(0,promiseUtils.Lx)(e).then((()=>this._imagePromise=null)),await this._imagePromise}))}destroy(){this.bitmaps.forEach((t=>t.destroy())),this.bitmaps=[]}get updating(){return!this.destroyed&&null!==this._imagePromise}async _export(t,e,i,r,s,a){const p=await this.fetchSource(t,Math.floor(e*s),Math.floor(i*s),{rotation:r,pixelRatio:s,signal:a});(0,promiseUtils.Te)(a);const n=new Bitmap.mb(null,!0);return n.x=t.xmin,n.y=t.ymax,n.resolution=t.width/e,n.rotation=r,n.pixelRatio=s,n.opacity=0,this.container.addChild(n),await n.setSourceAsync(p,a),(0,promiseUtils.Te)(a),n}async _singleExport(t,e,i,o,r,s,a){!function viewStateUtils_a(t,n,o,a){const[r,s]=n,[u,c]=a,h=.5*o;return t[0]=r-h*u,t[1]=s-h*c,t[2]=r+h*u,t[3]=s+h*c,t}(y,i,o,e);const p=(0,aaBoundingRect.w1)(y,t.spatialReference);return[await this._export(p,e[0],e[1],r,s,a)]}_tiledExport(t,e,i,o){const r=TileInfo.A.create({size:e,spatialReference:t.spatialReference,scales:[t.scale]}),s=new TileInfoView.A(r),a=s.getTileCoverage(t);if(!a)return null;const p=[];return a.forEach(((r,a,n,l)=>{S.set(r,a,n,0),s.getTileBounds(y,S);const h=(0,aaBoundingRect.w1)(y,t.spatialReference);p.push(this._export(h,e,e,0,i,o).then((t=>(0!==l&&(S.set(r,a,n,l),s.getTileBounds(y,S),t.x=y[0],t.y=y[3]),t))))})),Promise.all(p)}};(0,tslib_es6._)([(0,property.MZ)()],w.prototype,"_imagePromise",void 0),(0,tslib_es6._)([(0,property.MZ)()],w.prototype,"bitmaps",void 0),(0,tslib_es6._)([(0,property.MZ)()],w.prototype,"container",void 0),(0,tslib_es6._)([(0,property.MZ)()],w.prototype,"fetchSource",void 0),(0,tslib_es6._)([(0,property.MZ)()],w.prototype,"hidpi",void 0),(0,tslib_es6._)([(0,property.MZ)()],w.prototype,"imageMaxWidth",void 0),(0,tslib_es6._)([(0,property.MZ)()],w.prototype,"imageMaxHeight",void 0),(0,tslib_es6._)([(0,property.MZ)()],w.prototype,"imageRotationSupported",void 0),(0,tslib_es6._)([(0,property.MZ)()],w.prototype,"imageNormalizationSupported",void 0),(0,tslib_es6._)([(0,property.MZ)()],w.prototype,"requestUpdate",void 0),(0,tslib_es6._)([(0,property.MZ)()],w.prototype,"updating",null),w=(0,tslib_es6._)([(0,subclass.$)("esri.views.2d.layers.support.ExportStrategy")],w);const v=w},"./node_modules/@arcgis/core/views/layers/RefreshableLayerView.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>a});var _chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),_core_Logger_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/Logger.js"),_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/core/promiseUtils.js"),_core_reactiveUtils_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/core/reactiveUtils.js"),_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_8__=(__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/has.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js"));const a=a=>{let c=class extends a{initialize(){this.addHandles((0,_core_reactiveUtils_js__WEBPACK_IMPORTED_MODULE_3__.on)((()=>this.layer),"refresh",(r=>{this.doRefresh(r.dataChanged).catch((r=>{(0,_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_2__.zf)(r)||_core_Logger_js__WEBPACK_IMPORTED_MODULE_1__.A.getLogger(this).error(r)}))})),"RefreshableLayerView")}};return(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_4__.MZ)()],c.prototype,"layer",void 0),c=(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_8__.$)("esri.layers.mixins.RefreshableLayerView")],c),c}}}]);