"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[9091],{"./node_modules/@arcgis/core/views/2d/webglDeps.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BufferObject:()=>_webgl_BufferObject_js__WEBPACK_IMPORTED_MODULE_0__.f,FramebufferObject:()=>_webgl_FramebufferObject_js__WEBPACK_IMPORTED_MODULE_1__.X,Program:()=>_webgl_Program_js__WEBPACK_IMPORTED_MODULE_2__.$,ProgramCache:()=>_webgl_ProgramCache_js__WEBPACK_IMPORTED_MODULE_3__.G,Renderbuffer:()=>_webgl_Renderbuffer_js__WEBPACK_IMPORTED_MODULE_4__.r,ShaderCompiler:()=>_webgl_ShaderCompiler_js__WEBPACK_IMPORTED_MODULE_5__.B,Texture:()=>_webgl_Texture_js__WEBPACK_IMPORTED_MODULE_6__.x,VertexArrayObject:()=>_webgl_VertexArrayObject_js__WEBPACK_IMPORTED_MODULE_7__.U,createContextOrErrorHTML:()=>_webgl_context_util_js__WEBPACK_IMPORTED_MODULE_10__.sj,createProgram:()=>_webgl_ProgramTemplate_js__WEBPACK_IMPORTED_MODULE_9__.H,glslifyDefineMap:()=>_webgl_programUtils_js__WEBPACK_IMPORTED_MODULE_8__.K});var _webgl_BufferObject_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/BufferObject.js"),_webgl_FramebufferObject_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/FramebufferObject.js"),_webgl_Program_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/Program.js"),_webgl_ProgramCache_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/ProgramCache.js"),_webgl_Renderbuffer_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/Renderbuffer.js"),_webgl_ShaderCompiler_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/ShaderCompiler.js"),_webgl_Texture_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/Texture.js"),_webgl_VertexArrayObject_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/VertexArrayObject.js"),_webgl_programUtils_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/programUtils.js"),_webgl_ProgramTemplate_js__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/ProgramTemplate.js"),_webgl_context_util_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/context-util.js")},"./node_modules/@arcgis/core/views/webgl/ProgramCache.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G:()=>s});var maybe=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js");class t{constructor(){this._outer=new Map}clear(){this._outer.clear()}get empty(){return 0===this._outer.size}get(t,e){return this._outer.get(t)?.get(e)}set(t,e,r){const s=this._outer.get(t);s?s.set(e,r):this._outer.set(t,new Map([[e,r]]))}delete(t,e){const r=this._outer.get(t);r&&(r.delete(e),0===r.size&&this._outer.delete(t))}forEach(t){this._outer.forEach(((e,r)=>t(e,r)))}}var Program=__webpack_require__("./node_modules/@arcgis/core/views/webgl/Program.js");class s{constructor(r){this._rctx=r,this._store=new t}dispose(){this._store.forEach((r=>r.forEach((r=>r.dispose())))),this._store.clear()}acquire(t,s,o,c){const i=this._store.get(t,s);if((0,maybe.pC)(i))return i.ref(),i;const h=new Program.$(this._rctx,t,s,o,c);return h.ref(),this._store.set(t,s,h),h}get test(){let r=0;return this._store.forEach((t=>t.forEach((t=>r+=t.hasGLName?2:1)))),{cachedWebGLObjects:r}}}},"./node_modules/@arcgis/core/views/webgl/Texture.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{x:()=>E});__webpack_require__("./node_modules/@arcgis/core/core/has.js");var _core_mathUtils_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/mathUtils.js"),_core_maybe_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_checkWebGLError_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/checkWebGLError.js"),_context_util_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/context-util.js"),_enums_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/enums.js"),_capabilities_isWebGL2Context_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/capabilities/isWebGL2Context.js");const u={target:_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_2D,samplingMode:_enums_js__WEBPACK_IMPORTED_MODULE_4__.cw.LINEAR,wrapMode:_enums_js__WEBPACK_IMPORTED_MODULE_4__.e8.REPEAT,flipped:!1,hasMipmap:!1,isOpaque:!1,unpackAlignment:4,preMultiplyAlpha:!1,isImmutable:!1};class E{constructor(t,e,i=null){this._context=t,this.type="texture",this._glName=null,this._samplingModeDirty=!1,this._wrapModeDirty=!1,this._wasImmutablyAllocated=!1,t.instanceCounter.increment(_enums_js__WEBPACK_IMPORTED_MODULE_4__._g.Texture,this),this._descriptor={...u,...e};for(const r in u)void 0===this._descriptor[r]&&(this._descriptor[r]=u[r]);if(t.type!==_context_util_js__WEBPACK_IMPORTED_MODULE_3__.zO.WEBGL2&&(this._descriptor.isImmutable&&(this._descriptor.isImmutable=!1),A(this._descriptor.target)))throw new Error("3D and array textures are not supported in WebGL1");this._descriptor.target===_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_CUBE_MAP?this._setDataCubeMap(i):this.setData(i)}get glName(){return this._glName}get descriptor(){return this._descriptor}get isDirty(){return this._samplingModeDirty||this._wrapModeDirty}dispose(){this._context.gl&&this._glName&&(this._context.unbindTexture(this),this._context.gl.deleteTexture(this._glName),this._glName=null,this._context.instanceCounter.decrement(_enums_js__WEBPACK_IMPORTED_MODULE_4__._g.Texture,this))}release(){this.dispose()}resize(t,e){const i=this._descriptor;if(i.width!==t||i.height!==e){if(this._wasImmutablyAllocated)throw new Error("Immutable textures can't be resized!");i.width=t,i.height=e,this._descriptor.target===_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_CUBE_MAP?this._setDataCubeMap(null):this.setData(null)}}_setDataCubeMap(t=null){for(let e=_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_CUBE_MAP_POSITIVE_X;e<=_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_CUBE_MAP_NEGATIVE_Z;e++)this._setData(t,e)}setData(t){this._setData(t)}_setData(t,i){if(!this._context||!this._context.gl)return;const o=this._context.gl;this._glName||(this._glName=o.createTexture()),void 0===t&&(t=null);const s=this._descriptor,a=i??s.target,n=A(a);null===t&&(s.width=s.width||4,s.height=s.height||4,n&&(s.depth=s.depth??1));const l=this._context.bindTexture(this,E.TEXTURE_UNIT_FOR_UPDATES);this._context.setActiveTexture(E.TEXTURE_UNIT_FOR_UPDATES),E._validateTexture(this._context,s),this._configurePixelStorage(),(0,_checkWebGLError_js__WEBPACK_IMPORTED_MODULE_2__.zu)(o);const h=s.pixelFormat;let p=s.internalFormat??this._deriveInternalFormat(h,s.dataType);if(f(t)){let e=t.width,i=t.height;const l=1;t instanceof HTMLVideoElement&&(e=t.videoWidth,i=t.videoHeight),s.width&&s.height,n&&s.depth,s.isImmutable&&!this._wasImmutablyAllocated&&this._texStorage(a,p,s.hasMipmap,e,i,l),this._texImage(a,0,p,e,i,l,t),(0,_checkWebGLError_js__WEBPACK_IMPORTED_MODULE_2__.zu)(o),s.hasMipmap&&this.generateMipmap(),void 0===s.width&&(s.width=e),void 0===s.height&&(s.height=i),n&&void 0===s.depth&&(s.depth=l)}else{const{width:i,height:l,depth:h}=s;if(null==i||null==l)throw new Error("Width and height must be specified!");if(n&&null==h)throw new Error("Depth must be specified!");if(s.isImmutable&&!this._wasImmutablyAllocated&&this._texStorage(a,p,s.hasMipmap,i,l,h),o.DEPTH24_STENCIL8&&p===o.DEPTH_STENCIL&&(p=o.DEPTH24_STENCIL8),x(t)){const e=t.levels,r=w(a,i,l,h),n=Math.min(r-1,e.length-1);(0,_capabilities_isWebGL2Context_js__WEBPACK_IMPORTED_MODULE_5__.Z)(o)?o.texParameteri(s.target,o.TEXTURE_MAX_LEVEL,n):s.hasMipmap=s.hasMipmap&&r===e.length;const _=p;if(!function g(t){return t in _enums_js__WEBPACK_IMPORTED_MODULE_4__.q_}(_))throw new Error("Attempting to use compressed data with an umcompressed format!");this._forEachMipmapLevel(((t,i,r,o)=>{const s=e[Math.min(t,e.length-1)];this._compressedTexImage(a,t,_,i,r,o,s)}),n)}else(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_6__.pC)(t)?(this._texImage(a,0,p,i,l,h,t),(0,_checkWebGLError_js__WEBPACK_IMPORTED_MODULE_2__.zu)(o),s.hasMipmap&&this.generateMipmap()):this._forEachMipmapLevel(((t,e,i,s)=>{this._texImage(a,t,p,e,i,s,null),(0,_checkWebGLError_js__WEBPACK_IMPORTED_MODULE_2__.zu)(o)}))}E._applySamplingMode(o,this._descriptor),E._applyWrapMode(o,this._descriptor),E._applyAnisotropicFilteringParameters(this._context,this._descriptor),(0,_checkWebGLError_js__WEBPACK_IMPORTED_MODULE_2__.zu)(o),this._context.bindTexture(l,E.TEXTURE_UNIT_FOR_UPDATES)}updateData(t,e,i,r,o,s,a=0){s||console.error("An attempt to use uninitialized data!"),this._glName||console.error("An attempt to update uninitialized texture!");const n=this._context.gl,l=this._descriptor,{pixelFormat:h,dataType:p,target:_,isImmutable:m}=l,u=l.internalFormat??this._deriveInternalFormat(h,p);if(m&&!this._wasImmutablyAllocated)throw new Error("Cannot update immutable texture before allocation!");const c=this._context.bindTexture(this,E.TEXTURE_UNIT_FOR_UPDATES,!0);if((e<0||i<0||r>l.width||o>l.height||e+r>l.width||i+o>l.height)&&console.error("An attempt to update out of bounds of the texture!"),this._configurePixelStorage(),a){if(!(0,_capabilities_isWebGL2Context_js__WEBPACK_IMPORTED_MODULE_5__.Z)(n))return void console.error("Webgl2 must be enabled to use dataRowOffset!");n.pixelStorei(n.UNPACK_SKIP_ROWS,a)}if(f(s)?(0,_capabilities_isWebGL2Context_js__WEBPACK_IMPORTED_MODULE_5__.Z)(n)?n.texSubImage2D(_,t,e,i,r,o,h,p,s):n.texSubImage2D(_,t,e,i,h,p,s):x(s)?n.compressedTexSubImage2D(_,t,e,i,r,o,u,s.levels[t]):n.texSubImage2D(_,t,e,i,r,o,h,p,s),a){if(!(0,_capabilities_isWebGL2Context_js__WEBPACK_IMPORTED_MODULE_5__.Z)(n))return void console.error("Webgl2 must be enabled to use dataRowOffset!");n.pixelStorei(n.UNPACK_SKIP_ROWS,0)}this._context.bindTexture(c,E.TEXTURE_UNIT_FOR_UPDATES)}updateData3D(t,e,i,r,o,s,a,n){n||console.error("An attempt to use uninitialized data!"),this._glName||console.error("An attempt to update uninitialized texture!");const l=this._context.gl;if(!(0,_capabilities_isWebGL2Context_js__WEBPACK_IMPORTED_MODULE_5__.Z)(l))throw new Error("3D textures are not supported in WebGL1");const h=this._descriptor,{pixelFormat:p,dataType:_,isImmutable:m,target:u}=h,c=h.internalFormat??this._deriveInternalFormat(p,_);if(m&&!this._wasImmutablyAllocated)throw new Error("Cannot update immutable texture before allocation!");A(u)||console.warn("Attempting to set 3D texture data on a non-3D texture");const T=this._context.bindTexture(this,E.TEXTURE_UNIT_FOR_UPDATES);if(this._context.setActiveTexture(E.TEXTURE_UNIT_FOR_UPDATES),(e<0||i<0||r<0||o>h.width||s>h.height||a>h.depth||e+o>h.width||i+s>h.height||r+a>h.depth)&&console.error("An attempt to update out of bounds of the texture!"),this._configurePixelStorage(),x(n))n=n.levels[t],l.compressedTexSubImage3D(u,t,e,i,r,o,s,a,c,n);else{const h=n;l.texSubImage3D(u,t,e,i,r,o,s,a,p,_,h)}this._context.bindTexture(T,E.TEXTURE_UNIT_FOR_UPDATES)}generateMipmap(){const t=this._descriptor;if(!t.hasMipmap){if(this._wasImmutablyAllocated)throw new Error("Cannot add mipmaps to immutable texture after allocation");t.hasMipmap=!0,this._samplingModeDirty=!0,E._validateTexture(this._context,t)}t.samplingMode===_enums_js__WEBPACK_IMPORTED_MODULE_4__.cw.LINEAR?(this._samplingModeDirty=!0,t.samplingMode=_enums_js__WEBPACK_IMPORTED_MODULE_4__.cw.LINEAR_MIPMAP_NEAREST):t.samplingMode===_enums_js__WEBPACK_IMPORTED_MODULE_4__.cw.NEAREST&&(this._samplingModeDirty=!0,t.samplingMode=_enums_js__WEBPACK_IMPORTED_MODULE_4__.cw.NEAREST_MIPMAP_NEAREST);const e=this._context.bindTexture(this,E.TEXTURE_UNIT_FOR_UPDATES);this._context.setActiveTexture(E.TEXTURE_UNIT_FOR_UPDATES),this._context.gl.generateMipmap(t.target),this._context.bindTexture(e,E.TEXTURE_UNIT_FOR_UPDATES)}setSamplingMode(t){t!==this._descriptor.samplingMode&&(this._descriptor.samplingMode=t,this._samplingModeDirty=!0)}setWrapMode(t){t!==this._descriptor.wrapMode&&(this._descriptor.wrapMode=t,E._validateTexture(this._context,this._descriptor),this._wrapModeDirty=!0)}applyChanges(){const t=this._context.gl,e=this._descriptor;this._samplingModeDirty&&(E._applySamplingMode(t,e),this._samplingModeDirty=!1),this._wrapModeDirty&&(E._applyWrapMode(t,e),this._wrapModeDirty=!1)}_deriveInternalFormat(t,e){if(this._context.type===_context_util_js__WEBPACK_IMPORTED_MODULE_3__.zO.WEBGL1)return t;switch(e){case _enums_js__WEBPACK_IMPORTED_MODULE_4__.Br.FLOAT:switch(t){case _enums_js__WEBPACK_IMPORTED_MODULE_4__.VI.RGBA:return _enums_js__WEBPACK_IMPORTED_MODULE_4__.lP.RGBA32F;case _enums_js__WEBPACK_IMPORTED_MODULE_4__.VI.RGB:return _enums_js__WEBPACK_IMPORTED_MODULE_4__.lP.RGB32F;default:throw new Error("Unable to derive format")}case _enums_js__WEBPACK_IMPORTED_MODULE_4__.Br.UNSIGNED_BYTE:switch(t){case _enums_js__WEBPACK_IMPORTED_MODULE_4__.VI.RGBA:return _enums_js__WEBPACK_IMPORTED_MODULE_4__.lP.RGBA8;case _enums_js__WEBPACK_IMPORTED_MODULE_4__.VI.RGB:return _enums_js__WEBPACK_IMPORTED_MODULE_4__.lP.RGB8}default:return t}}_configurePixelStorage(){const t=this._context.gl,{unpackAlignment:e,flipped:i,preMultiplyAlpha:r}=this._descriptor;t.pixelStorei(t.UNPACK_ALIGNMENT,e),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,i?1:0),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r?1:0)}_texStorage(t,e,i,r,o,s){const a=this._context.gl;if(!(0,_capabilities_isWebGL2Context_js__WEBPACK_IMPORTED_MODULE_5__.Z)(a))throw new Error("Immutable textures are not supported in WebGL1");if(!function T(t){return t in _enums_js__WEBPACK_IMPORTED_MODULE_4__.lP}(e))throw new Error("Immutable textures must have a sized internal format");if(!this._descriptor.isImmutable)return;const n=i?w(t,r,o,s):1;if(A(t)){if(null==s)throw new Error("Missing depth dimension for 3D texture upload");a.texStorage3D(t,n,e,r,o,s)}else a.texStorage2D(t,n,e,r,o);this._wasImmutablyAllocated=!0}_texImage(t,r,s,a,n,l,h){const p=this._context.gl;let _=null;const m=this._context.type===_context_util_js__WEBPACK_IMPORTED_MODULE_3__.zO.WEBGL2,d=A(t),{isImmutable:u,pixelFormat:c,dataType:E}=this._descriptor;if(m&&(_=p),m||!f(h))if(u){if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_6__.pC)(h)){const e=h;if(d){if(null==l)throw new Error("Missing depth dimension for 3D texture upload");_.texSubImage3D(t,r,0,0,0,a,n,l,c,E,e)}else p.texSubImage2D(t,r,0,0,a,n,c,E,e)}}else{const e=(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_6__.Wg)(h);if(d){if(null==l)throw new Error("Missing depth dimension for 3D texture upload");_.texImage3D(t,r,s,a,n,l,0,c,E,e)}else p.texImage2D(t,r,s,a,n,0,c,E,e)}else p.texImage2D(t,0,s,c,E,h)}_compressedTexImage(t,i,r,s,a,n,l){const h=this._context.gl;let p=null;const _=A(t),m=this._descriptor.isImmutable;if(_){if(this._context.type!==_context_util_js__WEBPACK_IMPORTED_MODULE_3__.zO.WEBGL2)throw new Error("3D textures are not supported in WebGL1");p=h}if(m){if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_6__.pC)(l))if(_){if(null==n)throw new Error("Missing depth dimension for 3D texture upload");p.compressedTexSubImage3D(t,i,0,0,0,s,a,n,r,l)}else h.compressedTexSubImage2D(t,i,0,0,s,a,r,l)}else if(_){if(null==n)throw new Error("Missing depth dimension for 3D texture upload");p.compressedTexImage3D(t,i,r,s,a,n,0,l)}else h.compressedTexImage2D(t,i,r,s,a,0,l)}_forEachMipmapLevel(t,e=1/0){let{width:i,height:r,depth:o,hasMipmap:a,target:n}=this._descriptor;const l=n===_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_3D;if(null==i||null==r||l&&null==o)throw new Error("Missing texture dimensions for mipmap calculation");for(let s=0;t(s,i,r,o),a&&(1!==i||1!==r||l&&1!==o)&&!(s>=e);++s)i=Math.max(1,i>>1),r=Math.max(1,r>>1),l&&(o=Math.max(1,o>>1))}static _validateTexture(e,i){(null!=i.width&&i.width<0||null!=i.height&&i.height<0||null!=i.depth&&i.depth<0)&&console.error("Negative dimension parameters are not allowed!");const r=(0,_capabilities_isWebGL2Context_js__WEBPACK_IMPORTED_MODULE_5__.Z)(e.gl),o=null!=i.width&&(0,_core_mathUtils_js__WEBPACK_IMPORTED_MODULE_1__.wt)(i.width)&&null!=i.height&&(0,_core_mathUtils_js__WEBPACK_IMPORTED_MODULE_1__.wt)(i.height);r||!i.isImmutable&&!A(i.target)||console.error("Immutable and 3D-like textures are not supported in WebGL1!"),r||o||("number"==typeof i.wrapMode?i.wrapMode!==_enums_js__WEBPACK_IMPORTED_MODULE_4__.e8.CLAMP_TO_EDGE&&console.error("Non-power-of-two textures must have a wrap mode of CLAMP_TO_EDGE!"):i.wrapMode.s===_enums_js__WEBPACK_IMPORTED_MODULE_4__.e8.CLAMP_TO_EDGE&&i.wrapMode.t===_enums_js__WEBPACK_IMPORTED_MODULE_4__.e8.CLAMP_TO_EDGE||console.error("Non-power-of-two textures must have a wrap mode of CLAMP_TO_EDGE!"),i.hasMipmap&&console.error("Mipmapping requires power-of-two textures!"))}static _applySamplingMode(t,e){let i=e.samplingMode,r=e.samplingMode;i===_enums_js__WEBPACK_IMPORTED_MODULE_4__.cw.LINEAR_MIPMAP_NEAREST||i===_enums_js__WEBPACK_IMPORTED_MODULE_4__.cw.LINEAR_MIPMAP_LINEAR?(i=_enums_js__WEBPACK_IMPORTED_MODULE_4__.cw.LINEAR,e.hasMipmap||(r=_enums_js__WEBPACK_IMPORTED_MODULE_4__.cw.LINEAR)):i!==_enums_js__WEBPACK_IMPORTED_MODULE_4__.cw.NEAREST_MIPMAP_NEAREST&&i!==_enums_js__WEBPACK_IMPORTED_MODULE_4__.cw.NEAREST_MIPMAP_LINEAR||(i=_enums_js__WEBPACK_IMPORTED_MODULE_4__.cw.NEAREST,e.hasMipmap||(r=_enums_js__WEBPACK_IMPORTED_MODULE_4__.cw.NEAREST)),t.texParameteri(e.target,t.TEXTURE_MAG_FILTER,i),t.texParameteri(e.target,t.TEXTURE_MIN_FILTER,r)}static _applyWrapMode(t,e){"number"==typeof e.wrapMode?(t.texParameteri(e.target,t.TEXTURE_WRAP_S,e.wrapMode),t.texParameteri(e.target,t.TEXTURE_WRAP_T,e.wrapMode)):(t.texParameteri(e.target,t.TEXTURE_WRAP_S,e.wrapMode.s),t.texParameteri(e.target,t.TEXTURE_WRAP_T,e.wrapMode.t))}static _applyAnisotropicFilteringParameters(t,e){const i=t.capabilities.textureFilterAnisotropic;i&&t.gl.texParameterf(e.target,i.TEXTURE_MAX_ANISOTROPY,e.maxAnisotropy??1)}}function x(t){return(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_6__.pC)(t)&&"type"in t&&"compressed"===t.type}function f(t){return(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_6__.pC)(t)&&!x(t)&&!function M(t){return(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_6__.pC)(t)&&"byteLength"in t}(t)}function A(t){return t===_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_3D||t===_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_2D_ARRAY}function w(t,e,i,r=1){let o=Math.max(e,i);return t===_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_3D&&(o=Math.max(o,r)),Math.round(Math.log(o)/Math.LN2)+1}E.TEXTURE_UNIT_FOR_UPDATES=0},"./node_modules/@arcgis/core/views/webgl/capabilities/isWebGL2Context.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{function n(n){return window.WebGL2RenderingContext&&n instanceof window.WebGL2RenderingContext}__webpack_require__.d(__webpack_exports__,{Z:()=>n})},"./node_modules/@arcgis/core/views/webgl/checkWebGLError.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{CG:()=>c,hZ:()=>a,zu:()=>u});var _core_Error_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),_core_has_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/has.js");const o=__webpack_require__("./node_modules/@arcgis/core/core/Logger.js").Z.getLogger("esri.views.webgl.checkWebGLError");const n=!!(0,_core_has_js__WEBPACK_IMPORTED_MODULE_1__.Z)("enable-feature:webgl-debug");function a(){return n}function c(){return n}function u(r){if(a()){const n=r.getError();if(n){const a=function t(e,r){switch(r){case e.INVALID_ENUM:return"Invalid Enum. An unacceptable value has been specified for an enumerated argument.";case e.INVALID_VALUE:return"Invalid Value. A numeric argument is out of range.";case e.INVALID_OPERATION:return"Invalid Operation. The specified command is not allowed for the current state.";case e.INVALID_FRAMEBUFFER_OPERATION:return"Invalid Framebuffer operation. The currently bound framebuffer is not framebuffer complete when trying to render to or to read from it.";case e.OUT_OF_MEMORY:return"Out of memory. Not enough memory is left to execute the command.";case e.CONTEXT_LOST_WEBGL:return"WebGL context has been lost";default:return"Unknown error"}}(r,n),c=(new Error).stack;o.error(new _core_Error_js__WEBPACK_IMPORTED_MODULE_0__.Z("webgl-error","WebGL error occured",{message:a,stack:c}))}}}},"./node_modules/@arcgis/core/views/webgl/programUtils.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{function e(e){const{options:n,value:o}=e;return"number"==typeof n[o]}function n(n){let o="";for(const t in n){const i=n[t];if("boolean"==typeof i)i&&(o+=`#define ${t}\n`);else if("number"==typeof i)o+=`#define ${t} ${i.toFixed()}\n`;else if("object"==typeof i)if(e(i)){const{value:e,options:n,namespace:f}=i,s=f?`${f}_`:"";for(const t in n)o+=`#define ${s}${t} ${n[t].toFixed()}\n`;o+=`#define ${t} ${s}${e}\n`}else{const e=i.options;let n=0;for(const t in e)o+=`#define ${e[t]} ${(n++).toFixed()}\n`;o+=`#define ${t} ${e[i.value]}\n`}}return o}__webpack_require__.d(__webpack_exports__,{K:()=>n})}}]);