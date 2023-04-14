"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[3086],{"./node_modules/@arcgis/core/views/webgl/BufferObject.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{f:()=>E});var _core_arrayUtils_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),_core_Logger_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/Logger.js"),_core_maybe_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_core_typedArrayUtil_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@arcgis/core/core/typedArrayUtil.js"),_checkWebGLError_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/checkWebGLError.js"),_context_util_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/context-util.js"),_enums_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/enums.js");const c=_core_Logger_js__WEBPACK_IMPORTED_MODULE_1__.Z.getLogger("esri.views.webgl.BufferObject");class E{static createIndex(e,t,r){return new E(e,_enums_js__WEBPACK_IMPORTED_MODULE_4__.w0.ELEMENT_ARRAY_BUFFER,t,r)}static createVertex(e,t,r){return new E(e,_enums_js__WEBPACK_IMPORTED_MODULE_4__.w0.ARRAY_BUFFER,t,r)}static createUniform(e,t,r){if(e.type!==_context_util_js__WEBPACK_IMPORTED_MODULE_3__.zO.WEBGL2)throw new Error("Uniform buffers are supported in WebGL2 only!");return new E(e,_enums_js__WEBPACK_IMPORTED_MODULE_4__.w0.UNIFORM_BUFFER,t,r)}static createPixelPack(e,t=_enums_js__WEBPACK_IMPORTED_MODULE_4__.l1.STREAM_READ,r){if(e.type!==_context_util_js__WEBPACK_IMPORTED_MODULE_3__.zO.WEBGL2)throw new Error("Pixel pack buffers are supported in WebGL2 only!");const i=new E(e,_enums_js__WEBPACK_IMPORTED_MODULE_4__.w0.PIXEL_PACK_BUFFER,t);return r&&i.setSize(r),i}static createPixelUnpack(e,t=_enums_js__WEBPACK_IMPORTED_MODULE_4__.l1.STREAM_DRAW,r){if(e.type!==_context_util_js__WEBPACK_IMPORTED_MODULE_3__.zO.WEBGL2)throw new Error("Pixel unpack buffers are supported in WebGL2 only!");return new E(e,_enums_js__WEBPACK_IMPORTED_MODULE_4__.w0.PIXEL_UNPACK_BUFFER,t,r)}constructor(e,t,r,i){this._context=e,this.bufferType=t,this.usage=r,this._glName=null,this._size=-1,this._indexType=void 0,e.instanceCounter.increment(_enums_js__WEBPACK_IMPORTED_MODULE_4__._g.BufferObject,this),this._glName=this._context.gl.createBuffer(),(0,_checkWebGLError_js__WEBPACK_IMPORTED_MODULE_2__.zu)(this._context.gl),i&&this.setData(i)}get glName(){return this._glName}get size(){return this._size}get indexType(){return this._indexType}get byteSize(){return this.bufferType===_enums_js__WEBPACK_IMPORTED_MODULE_4__.w0.ELEMENT_ARRAY_BUFFER?this._indexType===_enums_js__WEBPACK_IMPORTED_MODULE_4__.g.UNSIGNED_INT?4*this._size:2*this._size:this._size}get _isVAOAware(){return this.bufferType===_enums_js__WEBPACK_IMPORTED_MODULE_4__.w0.ELEMENT_ARRAY_BUFFER||this.bufferType===_enums_js__WEBPACK_IMPORTED_MODULE_4__.w0.ARRAY_BUFFER}dispose(){this._context?.gl?(this._glName&&(this._context.gl.deleteBuffer(this._glName),this._glName=null),this._context.instanceCounter.decrement(_enums_js__WEBPACK_IMPORTED_MODULE_4__._g.BufferObject,this),this._context=(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_5__.wN)(this._context)):this._glName&&c.warn("Leaked WebGL buffer object")}setSize(e,t=null){if(e<=0&&c.error("Buffer size needs to be positive!"),this.bufferType===_enums_js__WEBPACK_IMPORTED_MODULE_4__.w0.ELEMENT_ARRAY_BUFFER&&(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_5__.pC)(t))switch(this._indexType=t,t){case _enums_js__WEBPACK_IMPORTED_MODULE_4__.g.UNSIGNED_SHORT:e*=2;break;case _enums_js__WEBPACK_IMPORTED_MODULE_4__.g.UNSIGNED_INT:e*=4}this._setBufferData(e)}setData(e){if(!e)return;let t=e.byteLength;this.bufferType===_enums_js__WEBPACK_IMPORTED_MODULE_4__.w0.ELEMENT_ARRAY_BUFFER&&((0,_core_typedArrayUtil_js__WEBPACK_IMPORTED_MODULE_6__.Uc)(e)&&(t/=2,this._indexType=_enums_js__WEBPACK_IMPORTED_MODULE_4__.g.UNSIGNED_SHORT),(0,_core_typedArrayUtil_js__WEBPACK_IMPORTED_MODULE_6__.ZY)(e)&&(t/=4,this._indexType=_enums_js__WEBPACK_IMPORTED_MODULE_4__.g.UNSIGNED_INT)),this._setBufferData(t,e)}_setBufferData(e,t=null){this._size=e;const r=this._context.getBoundVAO();this._isVAOAware&&this._context.bindVAO(null),this._context.bindBuffer(this);const s=this._context.gl;(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_5__.pC)(t)?s.bufferData(this.bufferType,t,this.usage):s.bufferData(this.bufferType,e,this.usage),(0,_checkWebGLError_js__WEBPACK_IMPORTED_MODULE_2__.zu)(s),this._isVAOAware&&this._context.bindVAO(r)}setSubData(e,t,r,i){if(!e)return;(t<0||t*e.BYTES_PER_ELEMENT>=this.byteSize)&&c.error("offset is out of range!"),r>=i&&c.error("end must be bigger than start!"),(t+(i-r))*e.BYTES_PER_ELEMENT>this.byteSize&&c.error("An attempt to write beyond the end of the buffer!");const s=this._context.getBoundVAO();this._isVAOAware&&this._context.bindVAO(null),this._context.bindBuffer(this);const n=this._context.gl;if(this._context.type===_context_util_js__WEBPACK_IMPORTED_MODULE_3__.zO.WEBGL2)n.bufferSubData(this.bufferType,t*e.BYTES_PER_ELEMENT,e,r,i-r);else{const s=0===r&&i===e.length?e:e.subarray(r,i);n.bufferSubData(this.bufferType,t*e.BYTES_PER_ELEMENT,s)}(0,_checkWebGLError_js__WEBPACK_IMPORTED_MODULE_2__.zu)(n),this._isVAOAware&&this._context.bindVAO(s)}getSubData(e,t=0,r,i){if(this._context.type!==_context_util_js__WEBPACK_IMPORTED_MODULE_3__.zO.WEBGL2)return void c.error("Get buffer subdata is supported in WebGL2 only!");if(r<0||i<0)return void c.error("Problem getting subdata: offset and length were less than zero!");const s=function b(t){return(0,_core_arrayUtils_js__WEBPACK_IMPORTED_MODULE_0__.zG)(t)}(e)?e.BYTES_PER_ELEMENT:1;if(s*((r??0)+(i??0))>e.byteLength)return void c.error("Problem getting subdata: offset and length exceeded destination size!");t+s*(i??0)>this.byteSize&&c.warn("Potential problem getting subdata: requested data exceeds buffer size!");const n=this._context.gl;this._context.bindBuffer(this,_enums_js__WEBPACK_IMPORTED_MODULE_4__.w0.COPY_READ_BUFFER),n.getBufferSubData(_enums_js__WEBPACK_IMPORTED_MODULE_4__.w0.COPY_READ_BUFFER,t,e,r,i),this._context.unbindBuffer(_enums_js__WEBPACK_IMPORTED_MODULE_4__.w0.COPY_READ_BUFFER)}async getSubDataAsync(e,t=0,r,i){this._context.type===_context_util_js__WEBPACK_IMPORTED_MODULE_3__.zO.WEBGL2?(await this._context.clientWaitAsync(),this.getSubData(e,t,r,i)):c.error("Get buffer subdata is supported in WebGL2 only!")}}},"./node_modules/@arcgis/core/views/webgl/FramebufferObject.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>x});var _core_Logger_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/Logger.js"),_core_maybe_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_BufferObject_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/BufferObject.js"),_checkWebGLError_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/checkWebGLError.js"),_context_util_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/context-util.js"),_enums_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/enums.js"),_Renderbuffer_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/Renderbuffer.js"),_Texture_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/Texture.js"),_Util_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/Util.js");class x{constructor(t,i,r=null,h=null){if(this._context=t,this._glName=null,this._depthAttachment=null,this._stencilAttachment=null,this._colorAttachments=new Map,this._depthStencilTexture=null,this._initialized=!1,this._desc={...i},t.instanceCounter.increment(_enums_js__WEBPACK_IMPORTED_MODULE_4__._g.FramebufferObject,this),(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_8__.pC)(r)){Array.isArray(r)||(r=[r]);for(let t=0;t<r.length;++t){const e=r[t],i=_enums_js__WEBPACK_IMPORTED_MODULE_4__.VY.COLOR_ATTACHMENT0+t;let h;C(e)?(b(e)?(h=e.descriptor,this._colorAttachments.set(i,e)):(h=e,this._colorAttachments.set(i,new _Texture_js__WEBPACK_IMPORTED_MODULE_6__.x(this._context,h))),U(h,this._desc)):(D(e)?(h=e.descriptor,this._colorAttachments.set(i,e)):(h=e,this._colorAttachments.set(i,new _Renderbuffer_js__WEBPACK_IMPORTED_MODULE_5__.r(this._context,h))),H(h,this._desc)),this._validateColorAttachmentPoint(i)}}if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_8__.pC)(h)){let t,e;if(C(h))this._context.capabilities.depthTexture||console.error("Setting the depth/stencil texture as an attachment requires WEBGL_depth_texture or WebGL2"),b(h)?(e=h.descriptor,this._depthStencilTexture=h):(e=h,this._depthStencilTexture=new _Texture_js__WEBPACK_IMPORTED_MODULE_6__.x(this._context,e)),U(e,this._desc);else{D(h)?(e=h.descriptor,t=h):(e=h,t=new _Renderbuffer_js__WEBPACK_IMPORTED_MODULE_5__.r(this._context,e));const i=this._desc.depthStencilTarget??_enums_js__WEBPACK_IMPORTED_MODULE_4__.OU.DEPTH_STENCIL_RENDER_BUFFER;i===_enums_js__WEBPACK_IMPORTED_MODULE_4__.OU.STENCIL_RENDER_BUFFER?this._stencilAttachment=t:i===_enums_js__WEBPACK_IMPORTED_MODULE_4__.OU.DEPTH_RENDER_BUFFER||i===_enums_js__WEBPACK_IMPORTED_MODULE_4__.OU.DEPTH_STENCIL_RENDER_BUFFER?this._depthAttachment=t:console.error('If a Renderbuffer is provided, "depthStencilTarget" must be one of STENCIL_RENDER_BUFFER, DEPTH_RENDER_BUFFER or DEPTH_STENCIL_RENDER_BUFFER'),this._desc.depthStencilTarget=i,H(e,this._desc)}}}dispose(){if(!this._desc)return;const t=this._context.getBoundFramebufferObject();this._disposeColorAttachments(),this._disposeDepthStencilAttachments(),this._glName&&(this._context.gl.deleteFramebuffer(this._glName),this._glName=null),this._context.bindFramebuffer(t),this._context.instanceCounter.decrement(_enums_js__WEBPACK_IMPORTED_MODULE_4__._g.FramebufferObject,this),this._desc=null}get glName(){return this._glName}get descriptor(){return this._desc}get colorTexture(){const t=this._colorAttachments.get(_enums_js__WEBPACK_IMPORTED_MODULE_4__.VY.COLOR_ATTACHMENT0);return t&&b(t)?t:null}get colorAttachment(){return this._colorAttachments.get(_enums_js__WEBPACK_IMPORTED_MODULE_4__.VY.COLOR_ATTACHMENT0)}get depthStencilAttachment(){return this._depthStencilTexture||this._depthAttachment||this._stencilAttachment}get depthStencilTexture(){return this._depthStencilTexture}get width(){return this._desc.width??0}get height(){return this._desc.height??0}get gpuMemoryUsage(){return[...this._colorAttachments].reduce(((t,[e,i])=>t+(0,_Util_js__WEBPACK_IMPORTED_MODULE_7__.un)(i)),0)+(0,_Util_js__WEBPACK_IMPORTED_MODULE_7__.un)(this.depthStencilAttachment)}getColorTexture(t){const e=this._colorAttachments.get(t);return e&&b(e)?e:null}attachColorTexture(t,e=_enums_js__WEBPACK_IMPORTED_MODULE_4__.VY.COLOR_ATTACHMENT0){t&&(this._validateColorAttachmentPoint(e),U(t.descriptor,this._desc),this._disposeColorAttachments(),this._initialized&&(this._context.bindFramebuffer(this),this._framebufferTexture2D(t.glName,e)),this._colorAttachments.set(e,t))}detachColorTexture(t=_enums_js__WEBPACK_IMPORTED_MODULE_4__.VY.COLOR_ATTACHMENT0){const e=this._colorAttachments.get(t);if(b(e)){const i=e;return this._initialized&&(this._context.bindFramebuffer(this),this._framebufferTexture2D(null,t)),this._colorAttachments.delete(t),i}}setColorTextureTarget(t,e=_enums_js__WEBPACK_IMPORTED_MODULE_4__.VY.COLOR_ATTACHMENT0){const i=this._colorAttachments.get(e);b(i)&&this._framebufferTexture2D(i.glName,e,t)}attachDepthStencilTexture(t){if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_8__.Wi)(t))return;const e=t.descriptor;e.pixelFormat!==_enums_js__WEBPACK_IMPORTED_MODULE_4__.VI.DEPTH_STENCIL&&console.error("Depth/Stencil texture must have a pixel type of DEPTH_STENCIL!"),e.dataType!==_enums_js__WEBPACK_IMPORTED_MODULE_4__.Br.UNSIGNED_INT_24_8&&console.error("Depth/Stencil texture must have data type of UNSIGNED_INT_24_8!"),this._context.capabilities.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture!"),U(e,this._desc),this._desc.depthStencilTarget&&this._desc.depthStencilTarget!==_enums_js__WEBPACK_IMPORTED_MODULE_4__.OU.DEPTH_STENCIL_TEXTURE&&(this._desc.depthStencilTarget=_enums_js__WEBPACK_IMPORTED_MODULE_4__.OU.DEPTH_STENCIL_TEXTURE),this._disposeDepthStencilAttachments(),this._initialized&&(this._context.bindFramebuffer(this),this._framebufferTexture2D(t.glName,_enums_js__WEBPACK_IMPORTED_MODULE_4__.Lu)),this._depthStencilTexture=t}detachDepthStencilTexture(){const t=this._depthStencilTexture;return t&&this._initialized&&(this._context.bindFramebuffer(this),this._framebufferTexture2D(null,_enums_js__WEBPACK_IMPORTED_MODULE_4__.Lu)),this._depthStencilTexture=null,t}attachDepthStencilBuffer(t){if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_8__.Wi)(t))return;const e=t.descriptor;if(e.internalFormat!==_enums_js__WEBPACK_IMPORTED_MODULE_4__.Tg.DEPTH_STENCIL&&e.internalFormat!==_enums_js__WEBPACK_IMPORTED_MODULE_4__.Tg.DEPTH_COMPONENT16&&console.error("Depth/Stencil buffer must have correct internalFormat"),H(e,this._desc),this._disposeDepthStencilAttachments(),this._desc.depthStencilTarget=e.internalFormat===_enums_js__WEBPACK_IMPORTED_MODULE_4__.Tg.DEPTH_STENCIL?_enums_js__WEBPACK_IMPORTED_MODULE_4__.OU.DEPTH_STENCIL_RENDER_BUFFER:_enums_js__WEBPACK_IMPORTED_MODULE_4__.OU.DEPTH_RENDER_BUFFER,this._initialized){this._context.bindFramebuffer(this);const e=this._context.gl,i=this._desc.depthStencilTarget===_enums_js__WEBPACK_IMPORTED_MODULE_4__.OU.DEPTH_RENDER_BUFFER?e.DEPTH_ATTACHMENT:e.DEPTH_STENCIL_ATTACHMENT;e.framebufferRenderbuffer(_enums_js__WEBPACK_IMPORTED_MODULE_4__.qi.FRAMEBUFFER,i,e.RENDERBUFFER,t.glName)}this._depthAttachment=t}detachDepthStencilBuffer(){const t=this._context.gl,e=this._depthAttachment;if(e&&this._initialized){this._context.bindFramebuffer(this);const e=this._desc.depthStencilTarget===_enums_js__WEBPACK_IMPORTED_MODULE_4__.OU.DEPTH_RENDER_BUFFER?t.DEPTH_ATTACHMENT:t.DEPTH_STENCIL_ATTACHMENT;t.framebufferRenderbuffer(_enums_js__WEBPACK_IMPORTED_MODULE_4__.qi.FRAMEBUFFER,e,t.RENDERBUFFER,null)}return this._depthAttachment=null,e}detachAll(){this._colorAttachments.forEach(((t,e)=>this._detachColorAttachment(e))),this.detachDepthStencilBuffer(),this.detachDepthStencilTexture()}copyToTexture(t,e,i,r,h,s,n){(t<0||e<0||h<0||s<0)&&console.error("Offsets cannot be negative!"),(i<=0||r<=0)&&console.error("Copy width and height must be greater than zero!");const c=this._desc,o=n.descriptor;n.descriptor.target!==_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_2D&&console.error("Texture target must be TEXTURE_2D!"),(null==c?.width||null==c?.height||null==o?.width||null==o?.height||t+i>c.width||e+r>c.height||h+i>o.width||s+r>o.height)&&console.error("Bad dimensions, the current input values will attempt to read or copy out of bounds!");const _=this._context,a=_.bindTexture(n,_Texture_js__WEBPACK_IMPORTED_MODULE_6__.x.TEXTURE_UNIT_FOR_UPDATES);_.setActiveTexture(_Texture_js__WEBPACK_IMPORTED_MODULE_6__.x.TEXTURE_UNIT_FOR_UPDATES),_.bindFramebuffer(this),_.gl.copyTexSubImage2D(_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_2D,0,h,s,t,e,i,r),_.bindTexture(a,_Texture_js__WEBPACK_IMPORTED_MODULE_6__.x.TEXTURE_UNIT_FOR_UPDATES)}readPixels(t,e,i,r,h,s,n){(i<=0||r<=0)&&console.error("Copy width and height must be greater than zero!"),n||console.error("Target memory is not initialized!"),this._context.bindFramebuffer(this),this._context.gl.readPixels(t,e,i,r,h,s,n)}async readPixelsAsync(t,e,i,n,c,o,_){if(this._context.type!==_context_util_js__WEBPACK_IMPORTED_MODULE_3__.zO.WEBGL2)return(0,_checkWebGLError_js__WEBPACK_IMPORTED_MODULE_2__.hZ)()&&console.warn("Attempting to read pixels using pixel buffer object without WebGL2"),void this.readPixels(t,e,i,n,c,o,_);const a=this._context.gl,l=_BufferObject_js__WEBPACK_IMPORTED_MODULE_1__.f.createPixelPack(this._context,_enums_js__WEBPACK_IMPORTED_MODULE_4__.l1.STREAM_READ,_.byteLength);this._context.bindBuffer(l),this._context.bindFramebuffer(this),a.readPixels(t,e,i,n,c,o,0),this._context.unbindBuffer(_enums_js__WEBPACK_IMPORTED_MODULE_4__.w0.PIXEL_PACK_BUFFER),await l.getSubDataAsync(_),l.dispose()}resize(t,e){const i=this._desc;if(i.width!==t||i.height!==e){if(i.width=t,i.height=e,!this._initialized)return this._colorAttachments.forEach((i=>{i&&i.resize(t,e)})),void(this._depthStencilTexture&&this._depthStencilTexture.resize(t,e));this._colorAttachments.forEach((i=>{i&&i.resize(t,e)})),null!=this._depthStencilTexture?this._depthStencilTexture.resize(t,e):(this._depthAttachment||this._stencilAttachment)&&(this._depthAttachment&&this._depthAttachment.resize(t,e),this._stencilAttachment&&this._stencilAttachment.resize(t,e)),this._context.getBoundFramebufferObject()===this&&this._context.bindFramebuffer(null),this._initialized=!1}}initializeAndBind(t=_enums_js__WEBPACK_IMPORTED_MODULE_4__.qi.FRAMEBUFFER){const e=this._context.gl;if(this._initialized)return void e.bindFramebuffer(t,this.glName);this._glName&&e.deleteFramebuffer(this._glName);const i=this._context,r=e.createFramebuffer(),s=this._desc,n=s.colorTarget??_enums_js__WEBPACK_IMPORTED_MODULE_4__.Lm.RENDER_BUFFER,l=s.width??1,u=s.height??1;if(e.bindFramebuffer(t,r),0===this._colorAttachments.size)if(n===_enums_js__WEBPACK_IMPORTED_MODULE_4__.Lm.TEXTURE||n===_enums_js__WEBPACK_IMPORTED_MODULE_4__.Lm.CUBEMAP)this._colorAttachments.set(_enums_js__WEBPACK_IMPORTED_MODULE_4__.VY.COLOR_ATTACHMENT0,function S(t,e,i){return new _Texture_js__WEBPACK_IMPORTED_MODULE_6__.x(t,{target:i,pixelFormat:_enums_js__WEBPACK_IMPORTED_MODULE_4__.VI.RGBA,dataType:_enums_js__WEBPACK_IMPORTED_MODULE_4__.Br.UNSIGNED_BYTE,samplingMode:_enums_js__WEBPACK_IMPORTED_MODULE_4__.cw.NEAREST,wrapMode:_enums_js__WEBPACK_IMPORTED_MODULE_4__.e8.CLAMP_TO_EDGE,width:e.width,height:e.height})}(i,s,this.descriptor.colorTarget===_enums_js__WEBPACK_IMPORTED_MODULE_4__.Lm.CUBEMAP?_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_CUBE_MAP:_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_2D));else{const t=new _Renderbuffer_js__WEBPACK_IMPORTED_MODULE_5__.r(i,{internalFormat:_enums_js__WEBPACK_IMPORTED_MODULE_4__.lP.RGBA4,width:l,height:u});this._colorAttachments.set(_enums_js__WEBPACK_IMPORTED_MODULE_4__.VY.COLOR_ATTACHMENT0,t)}this._colorAttachments.forEach(((i,r)=>{i&&(b(i)?this._framebufferTexture2D(i.glName,r,P(i),t):e.framebufferRenderbuffer(t,r,e.RENDERBUFFER,i.glName))}));const f=s.depthStencilTarget??_enums_js__WEBPACK_IMPORTED_MODULE_4__.OU.NONE;switch(f){case _enums_js__WEBPACK_IMPORTED_MODULE_4__.OU.DEPTH_RENDER_BUFFER:case _enums_js__WEBPACK_IMPORTED_MODULE_4__.OU.DEPTH_STENCIL_RENDER_BUFFER:{this._depthAttachment||(this._depthAttachment=new _Renderbuffer_js__WEBPACK_IMPORTED_MODULE_5__.r(i,{internalFormat:s.depthStencilTarget===_enums_js__WEBPACK_IMPORTED_MODULE_4__.OU.DEPTH_RENDER_BUFFER?_enums_js__WEBPACK_IMPORTED_MODULE_4__.Tg.DEPTH_COMPONENT16:_enums_js__WEBPACK_IMPORTED_MODULE_4__.Tg.DEPTH_STENCIL,width:l,height:u}));const r=f===_enums_js__WEBPACK_IMPORTED_MODULE_4__.OU.DEPTH_RENDER_BUFFER?e.DEPTH_ATTACHMENT:e.DEPTH_STENCIL_ATTACHMENT;e.framebufferRenderbuffer(t,r,e.RENDERBUFFER,this._depthAttachment.glName);break}case _enums_js__WEBPACK_IMPORTED_MODULE_4__.OU.STENCIL_RENDER_BUFFER:this._stencilAttachment||(this._stencilAttachment=new _Renderbuffer_js__WEBPACK_IMPORTED_MODULE_5__.r(i,{internalFormat:_enums_js__WEBPACK_IMPORTED_MODULE_4__.Tg.STENCIL_INDEX8,width:l,height:u})),e.framebufferRenderbuffer(t,e.STENCIL_ATTACHMENT,e.RENDERBUFFER,this._stencilAttachment.glName);break;case _enums_js__WEBPACK_IMPORTED_MODULE_4__.OU.DEPTH_STENCIL_TEXTURE:if(!this._depthStencilTexture){i.capabilities.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture as an attachment!");const t={target:_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_2D,pixelFormat:_enums_js__WEBPACK_IMPORTED_MODULE_4__.VI.DEPTH_STENCIL,dataType:_enums_js__WEBPACK_IMPORTED_MODULE_4__.Br.UNSIGNED_INT_24_8,samplingMode:_enums_js__WEBPACK_IMPORTED_MODULE_4__.cw.NEAREST,wrapMode:_enums_js__WEBPACK_IMPORTED_MODULE_4__.e8.CLAMP_TO_EDGE,width:l,height:u};this._depthStencilTexture=new _Texture_js__WEBPACK_IMPORTED_MODULE_6__.x(i,t)}this._framebufferTexture2D(this._depthStencilTexture.glName,e.DEPTH_STENCIL_ATTACHMENT,P(this._depthStencilTexture),t)}(0,_checkWebGLError_js__WEBPACK_IMPORTED_MODULE_2__.hZ)()&&e.checkFramebufferStatus(t)!==e.FRAMEBUFFER_COMPLETE&&console.error("Framebuffer is incomplete!"),this._glName=r,this._initialized=!0}_framebufferTexture2D(t,e=_enums_js__WEBPACK_IMPORTED_MODULE_4__.VY.COLOR_ATTACHMENT0,i=_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_2D,r=_enums_js__WEBPACK_IMPORTED_MODULE_4__.qi.FRAMEBUFFER,h=0){this._context.gl.framebufferTexture2D(r,e,i,t,h)}_detachColorAttachment(t){(0,_checkWebGLError_js__WEBPACK_IMPORTED_MODULE_2__.hZ)()&&console.warn("Detaching an FBO attachment can be a slow due to invalidating framebuffer completeness!");const e=this._context.gl,i=this._colorAttachments.get(t);return b(i)?this._initialized&&(this._context.bindFramebuffer(this),this._framebufferTexture2D(null,t)):this._initialized&&(this._context.bindFramebuffer(this),e.framebufferRenderbuffer(_enums_js__WEBPACK_IMPORTED_MODULE_4__.qi.FRAMEBUFFER,t,e.RENDERBUFFER,null)),this._colorAttachments.delete(t),i}_disposeColorAttachments(){this._colorAttachments.forEach(((t,e)=>{this._detachColorAttachment(e),t.dispose()})),this._colorAttachments.clear()}_disposeDepthStencilAttachments(){const t=this._context.gl;if(this._depthAttachment){if(this._initialized){this._context.bindFramebuffer(this);const e=this._desc.depthStencilTarget===_enums_js__WEBPACK_IMPORTED_MODULE_4__.OU.DEPTH_RENDER_BUFFER?t.DEPTH_ATTACHMENT:t.DEPTH_STENCIL_ATTACHMENT;t.framebufferRenderbuffer(_enums_js__WEBPACK_IMPORTED_MODULE_4__.qi.FRAMEBUFFER,e,t.RENDERBUFFER,null)}this._depthAttachment.dispose(),this._depthAttachment=null}this._stencilAttachment&&(this._initialized&&(this._context.bindFramebuffer(this),t.framebufferRenderbuffer(_enums_js__WEBPACK_IMPORTED_MODULE_4__.qi.FRAMEBUFFER,t.STENCIL_ATTACHMENT,t.RENDERBUFFER,null)),this._stencilAttachment.dispose(),this._stencilAttachment=null),this._depthStencilTexture&&(this._initialized&&(this._context.bindFramebuffer(this),this._framebufferTexture2D(null,t.DEPTH_STENCIL_ATTACHMENT)),this._depthStencilTexture.dispose(),this._depthStencilTexture=null)}_validateColorAttachmentPoint(e){if(-1===x._MAX_COLOR_ATTACHMENTS){const t=this._context.capabilities.drawBuffers;if(t){const e=this._context.gl;x._MAX_COLOR_ATTACHMENTS=e.getParameter(t.MAX_COLOR_ATTACHMENTS)}else x._MAX_COLOR_ATTACHMENTS=1}const i=e-_enums_js__WEBPACK_IMPORTED_MODULE_4__.VY.COLOR_ATTACHMENT0;i+1>x._MAX_COLOR_ATTACHMENTS&&_core_Logger_js__WEBPACK_IMPORTED_MODULE_0__.Z.getLogger("esri.views.webgl.FrameBufferObject").error("esri.FrameBufferObject",`illegal attachment point for color attachment: ${i+1}. Implementation supports up to ${x._MAX_COLOR_ATTACHMENTS} color attachments`)}}function b(t){return null!=t&&"type"in t&&"texture"===t.type}function D(t){return null!=t&&"type"in t&&"renderbuffer"===t.type}function C(t){return b(t)||null!=t&&"pixelFormat"in t}function U(t,e){t.target!==_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_2D&&t.target!==_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_CUBE_MAP&&console.error("Texture type must be TEXTURE_2D or TEXTURE_CUBE_MAP!"),void 0!==e.width&&e.width>=0&&void 0!==e.height&&e.height>=0?e.width===t.width&&e.height===t.height||console.error("Color attachment texture must match the framebuffer's!"):(e.width=t.width,e.height=t.height)}function H(t,e){void 0!==e.width&&e.width>=0&&void 0!==e.height&&e.height>=0?e.width===t.width&&e.height===t.height||console.error("Renderbuffer dimensions must match the framebuffer's!"):(e.width=t.width,e.height=t.height)}function P(t){return t.descriptor.target===_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_CUBE_MAP?_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_CUBE_MAP_POSITIVE_X:_enums_js__WEBPACK_IMPORTED_MODULE_4__.No.TEXTURE_2D}x._MAX_COLOR_ATTACHMENTS=-1},"./node_modules/@arcgis/core/views/webgl/Renderbuffer.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>s});var _core_maybe_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_context_util_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/context-util.js"),_enums_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/enums.js");class s{constructor(e,s){this._context=e,this._desc=s,this.type="renderbuffer",this._context.instanceCounter.increment(_enums_js__WEBPACK_IMPORTED_MODULE_1__._g.Renderbuffer,this);const i=this._context.gl;this.glName=i.createRenderbuffer(),this._context.bindRenderbuffer(this);const{width:n,height:o,internalFormat:h,multisampled:c}=s;if(c){if(this._context.type!==_context_util_js__WEBPACK_IMPORTED_MODULE_0__.zO.WEBGL2)throw new Error("Multisampled renderbuffers are not supported in WebGL1!");i.renderbufferStorageMultisample(i.RENDERBUFFER,this.samples,h,n,o)}else i.renderbufferStorage(i.RENDERBUFFER,h,n,o)}get descriptor(){return this._desc}get samples(){const e=this._desc.samples,t=this._context.parameters.maxSamples;return e?Math.min(e,t):t}resize(e,t){const r=this._desc;if(r.width===e&&r.height===t)return;r.width=e,r.height=t;const s=this._context.gl;this._context.bindRenderbuffer(this),r.multisampled?s.renderbufferStorageMultisample(s.RENDERBUFFER,this.samples,r.internalFormat,r.width,r.height):s.renderbufferStorage(s.RENDERBUFFER,r.internalFormat,r.width,r.height)}dispose(){this._context&&(this._context.gl.deleteRenderbuffer(this.glName),this._context.instanceCounter.decrement(_enums_js__WEBPACK_IMPORTED_MODULE_1__._g.Renderbuffer,this),this._context=(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_2__.wN)(this._context))}}},"./node_modules/@arcgis/core/views/webgl/Util.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{HH:()=>i,RG:()=>_,UF:()=>E,XP:()=>R,_V:()=>n,un:()=>u});__webpack_require__("./node_modules/@arcgis/core/core/has.js");var _core_maybe_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_enums_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/enums.js");function i(e){const r=e.gl;switch(r.getError()){case r.NO_ERROR:return null;case r.INVALID_ENUM:return"An unacceptable value has been specified for an enumerated argument";case r.INVALID_VALUE:return"An unacceptable value has been specified for an argument";case r.INVALID_OPERATION:return"The specified command is not allowed for the current state";case r.INVALID_FRAMEBUFFER_OPERATION:return"The currently bound framebuffer is not framebuffer complete";case r.OUT_OF_MEMORY:return"Not enough memory is left to execute the command";case r.CONTEXT_LOST_WEBGL:return"WebGL context is lost"}return"Unknown error"}function n(e,r){return e.vertexBuffers[r].size/function o(e){return e[0].stride}(e.layout[r])}function R(e,r,t,s,a=0){const c=e.gl,i=e.capabilities.instancing;e.bindBuffer(t);for(const n of s){const e=r.get(n.name);void 0===e&&console.error(`There is no location for vertex attribute '${n.name}' defined.`);const t=a*n.stride;if(n.count<=4)c.vertexAttribPointer(e,n.count,n.type,n.normalized,n.stride,n.offset+t),c.enableVertexAttribArray(e),n.divisor>0&&i&&i.vertexAttribDivisor(e,n.divisor);else if(9===n.count)for(let r=0;r<3;r++)c.vertexAttribPointer(e+r,3,n.type,n.normalized,n.stride,n.offset+12*r+t),c.enableVertexAttribArray(e+r),n.divisor>0&&i&&i.vertexAttribDivisor(e+r,n.divisor);else if(16===n.count)for(let r=0;r<4;r++)c.vertexAttribPointer(e+r,4,n.type,n.normalized,n.stride,n.offset+16*r+t),c.enableVertexAttribArray(e+r),n.divisor>0&&i&&i.vertexAttribDivisor(e+r,n.divisor);else console.error("Unsupported vertex attribute element count: "+n.count)}}function E(e,t,s,a){const c=e.gl,i=e.capabilities.instancing;e.bindBuffer(s);for(const r of a){const e=t.get(r.name);if(r.count<=4)c.disableVertexAttribArray(e),r.divisor&&r.divisor>0&&i&&i.vertexAttribDivisor(e,0);else if(9===r.count)for(let t=0;t<3;t++)c.disableVertexAttribArray(e+t),r.divisor&&r.divisor>0&&i&&i.vertexAttribDivisor(e+t,0);else if(16===r.count)for(let t=0;t<4;t++)c.disableVertexAttribArray(e+t),r.divisor&&r.divisor>0&&i&&i.vertexAttribDivisor(e+t,0);else console.error("Unsupported vertex attribute element count: "+r.count)}e.unbindBuffer(_enums_js__WEBPACK_IMPORTED_MODULE_1__.w0.ARRAY_BUFFER)}function _(e){switch(e){case _enums_js__WEBPACK_IMPORTED_MODULE_1__.VI.ALPHA:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.VI.LUMINANCE:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.VI.RED:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.VI.RED_INTEGER:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.R8:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.R8I:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.R8UI:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.R8_SNORM:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.Tg.STENCIL_INDEX8:return 1;case _enums_js__WEBPACK_IMPORTED_MODULE_1__.VI.LUMINANCE_ALPHA:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.VI.RG:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.VI.RG_INTEGER:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGBA4:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.R16F:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.R16I:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.R16UI:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RG8:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RG8I:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RG8UI:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RG8_SNORM:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGB565:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGB5_A1:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.Tg.DEPTH_COMPONENT16:return 2;case _enums_js__WEBPACK_IMPORTED_MODULE_1__.VI.DEPTH_COMPONENT:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.VI.RGB:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.VI.RGB_INTEGER:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGB8:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGB8I:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGB8UI:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGB8_SNORM:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.SRGB8:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.Tg.DEPTH_COMPONENT24:return 3;case _enums_js__WEBPACK_IMPORTED_MODULE_1__.VI.DEPTH_STENCIL:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.VI.RGBA:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.VI.RGBA_INTEGER:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGBA8:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.R32F:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.R11F_G11F_B10F:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RG16F:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.R32I:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.R32UI:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RG16I:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RG16UI:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGBA8I:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGBA8UI:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGBA8_SNORM:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.SRGB8_ALPHA8:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGB9_E5:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGB10_A2UI:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGB10_A2:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.Tg.DEPTH_STENCIL:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.Tg.DEPTH_COMPONENT32F:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.Tg.DEPTH24_STENCIL8:return 4;case _enums_js__WEBPACK_IMPORTED_MODULE_1__.Tg.DEPTH32F_STENCIL8:return 5;case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGB16F:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGB16I:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGB16UI:return 6;case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RG32F:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RG32I:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RG32UI:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGBA16F:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGBA16I:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGBA16UI:return 8;case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGB32F:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGB32I:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGB32UI:return 12;case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGBA32F:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGBA32I:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.lP.RGBA32UI:return 16;case _enums_js__WEBPACK_IMPORTED_MODULE_1__.q_.COMPRESSED_RGB_S3TC_DXT1_EXT:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.q_.COMPRESSED_RGBA_S3TC_DXT1_EXT:return.5;case _enums_js__WEBPACK_IMPORTED_MODULE_1__.q_.COMPRESSED_RGBA_S3TC_DXT3_EXT:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.q_.COMPRESSED_RGBA_S3TC_DXT5_EXT:return 1;case _enums_js__WEBPACK_IMPORTED_MODULE_1__.q_.COMPRESSED_R11_EAC:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.q_.COMPRESSED_SIGNED_R11_EAC:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.q_.COMPRESSED_RGB8_ETC2:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.q_.COMPRESSED_SRGB8_ETC2:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.q_.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.q_.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2:return.5;case _enums_js__WEBPACK_IMPORTED_MODULE_1__.q_.COMPRESSED_RG11_EAC:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.q_.COMPRESSED_SIGNED_RG11_EAC:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.q_.COMPRESSED_RGBA8_ETC2_EAC:case _enums_js__WEBPACK_IMPORTED_MODULE_1__.q_.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:return 1}return 0}function u(r){if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_2__.Wi)(r))return 0;if("descriptor"in r)return r.glName?u(r.descriptor):0;const t=r.internalFormat||"pixelFormat"in r&&r.pixelFormat;if(!t)return 0;const s="hasMipmap"in r&&r.hasMipmap?1.3:1,a=r.width*r.height;return _(t)*a*s}},"./node_modules/@arcgis/core/views/webgl/VertexArrayObject.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{U:()=>f});var _core_Logger_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/Logger.js"),_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_enums_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/enums.js"),_Util_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/Util.js");const a=_core_Logger_js__WEBPACK_IMPORTED_MODULE_0__.Z.getLogger("esri.views.webgl.VertexArrayObject");let f=class{constructor(t,e,i,r,n=null){this._context=t,this._locations=e,this._layout=i,this._buffers=r,this._indexBuffer=n,this._glName=null,this._initialized=!1,t.instanceCounter.increment(_enums_js__WEBPACK_IMPORTED_MODULE_1__._g.VertexArrayObject,this)}get glName(){return this._glName}get context(){return this._context}get vertexBuffers(){return this._buffers}get indexBuffer(){return this._indexBuffer}get size(){return Object.keys(this._buffers).reduce(((t,e)=>t+this._buffers[e].size),(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__.pC)(this._indexBuffer)?this._indexBuffer.size:0)}get layout(){return this._layout}get locations(){return this._locations}dispose(t=!0){if(this._context){if(this._glName){const t=this._context?.capabilities?.vao;t?(t.deleteVertexArray(this._glName),this._glName=null):a.warn("Leaked WebGL VAO")}if(this._context.getBoundVAO()===this&&this._context.bindVAO(null),t){for(const t in this._buffers)this._buffers[t]?.dispose(),delete this._buffers[t];this._indexBuffer=(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__.M2)(this._indexBuffer)}this._context.instanceCounter.decrement(_enums_js__WEBPACK_IMPORTED_MODULE_1__._g.VertexArrayObject,this),this._context=(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__.wN)(this._context)}else(this._glName||t&&Object.getOwnPropertyNames(this._buffers).length>0)&&a.warn("Leaked WebGL VAO")}initialize(){if(this._initialized)return;const t=this._context.capabilities.vao;if(t){const e=t.createVertexArray();t.bindVertexArray(e),this._bindLayout(),t.bindVertexArray(null),this._glName=e}this._initialized=!0}bind(){this.initialize();const t=this._context.capabilities.vao;t?t.bindVertexArray(this.glName):(this._context.bindVAO(null),this._bindLayout())}_bindLayout(){const{_buffers:t,_layout:i,_indexBuffer:r}=this;t||a.error("Vertex buffer dictionary is empty!");const s=this._context.gl;for(const e in t){const r=t[e];r||a.error("Vertex buffer is uninitialized!");const s=i[e];s||a.error("Vertex element descriptor is empty!"),(0,_Util_js__WEBPACK_IMPORTED_MODULE_2__.XP)(this._context,this._locations,r,s)}(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__.pC)(r)&&(this._context.capabilities.vao?s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,r.glName):this._context.bindBuffer(r))}unbind(){this.initialize();const t=this._context.capabilities.vao;t?t.bindVertexArray(null):this._unbindLayout()}_unbindLayout(){const{_buffers:t,_layout:i}=this;t||a.error("Vertex buffer dictionary is empty!");for(const e in t){const r=t[e];r||a.error("Vertex buffer is uninitialized!");const s=i[e];(0,_Util_js__WEBPACK_IMPORTED_MODULE_2__.UF)(this._context,this._locations,r,s)}(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__.pC)(this._indexBuffer)&&this._context.unbindBuffer(this._indexBuffer.bufferType)}}}}]);