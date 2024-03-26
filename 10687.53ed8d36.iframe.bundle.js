"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[10687],{"./node_modules/@arcgis/core/chunks/builtins.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{b:()=>n,l:()=>o,o:()=>g});var r,_commonjsHelpers_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/chunks/_commonjsHelpers.js"),t={exports:{}};t.exports,void 0!==(r=["precision","highp","mediump","lowp","attribute","const","uniform","varying","break","continue","do","for","while","if","else","in","out","inout","float","int","void","bool","true","false","discard","return","mat2","mat3","mat4","vec2","vec3","vec4","ivec2","ivec3","ivec4","bvec2","bvec3","bvec4","sampler1D","sampler2D","sampler3D","samplerCube","sampler1DShadow","sampler2DShadow","struct","asm","class","union","enum","typedef","template","this","packed","goto","switch","default","inline","noinline","volatile","public","static","extern","external","interface","long","short","double","half","fixed","unsigned","input","output","hvec2","hvec3","hvec4","dvec2","dvec3","dvec4","fvec2","fvec3","fvec4","sampler2DRect","sampler3DRect","sampler2DRectShadow","sizeof","cast","namespace","using"])&&(t.exports=r);const o=(0,_commonjsHelpers_js__WEBPACK_IMPORTED_MODULE_0__.g)(t.exports);var l,a={exports:{}};l=a,function(e){var r=["<<=",">>=","++","--","<<",">>","<=",">=","==","!=","&&","||","+=","-=","*=","/=","%=","&=","^^","^=","|=","(",")","[","]",".","!","~","*","/","%","+","-","<",">","&","^","|","?",":","=",",",";","{","}"];void 0!==r&&(l.exports=r)}();const g=(0,_commonjsHelpers_js__WEBPACK_IMPORTED_MODULE_0__.g)(a.exports);var e,i={exports:{}};e=i,function(r){var t=["abs","acos","all","any","asin","atan","ceil","clamp","cos","cross","dFdx","dFdy","degrees","distance","dot","equal","exp","exp2","faceforward","floor","fract","gl_BackColor","gl_BackLightModelProduct","gl_BackLightProduct","gl_BackMaterial","gl_BackSecondaryColor","gl_ClipPlane","gl_ClipVertex","gl_Color","gl_DepthRange","gl_DepthRangeParameters","gl_EyePlaneQ","gl_EyePlaneR","gl_EyePlaneS","gl_EyePlaneT","gl_Fog","gl_FogCoord","gl_FogFragCoord","gl_FogParameters","gl_FragColor","gl_FragCoord","gl_FragData","gl_FragDepth","gl_FragDepthEXT","gl_FrontColor","gl_FrontFacing","gl_FrontLightModelProduct","gl_FrontLightProduct","gl_FrontMaterial","gl_FrontSecondaryColor","gl_LightModel","gl_LightModelParameters","gl_LightModelProducts","gl_LightProducts","gl_LightSource","gl_LightSourceParameters","gl_MaterialParameters","gl_MaxClipPlanes","gl_MaxCombinedTextureImageUnits","gl_MaxDrawBuffers","gl_MaxFragmentUniformComponents","gl_MaxLights","gl_MaxTextureCoords","gl_MaxTextureImageUnits","gl_MaxTextureUnits","gl_MaxVaryingFloats","gl_MaxVertexAttribs","gl_MaxVertexTextureImageUnits","gl_MaxVertexUniformComponents","gl_ModelViewMatrix","gl_ModelViewMatrixInverse","gl_ModelViewMatrixInverseTranspose","gl_ModelViewMatrixTranspose","gl_ModelViewProjectionMatrix","gl_ModelViewProjectionMatrixInverse","gl_ModelViewProjectionMatrixInverseTranspose","gl_ModelViewProjectionMatrixTranspose","gl_MultiTexCoord0","gl_MultiTexCoord1","gl_MultiTexCoord2","gl_MultiTexCoord3","gl_MultiTexCoord4","gl_MultiTexCoord5","gl_MultiTexCoord6","gl_MultiTexCoord7","gl_Normal","gl_NormalMatrix","gl_NormalScale","gl_ObjectPlaneQ","gl_ObjectPlaneR","gl_ObjectPlaneS","gl_ObjectPlaneT","gl_Point","gl_PointCoord","gl_PointParameters","gl_PointSize","gl_Position","gl_ProjectionMatrix","gl_ProjectionMatrixInverse","gl_ProjectionMatrixInverseTranspose","gl_ProjectionMatrixTranspose","gl_SecondaryColor","gl_TexCoord","gl_TextureEnvColor","gl_TextureMatrix","gl_TextureMatrixInverse","gl_TextureMatrixInverseTranspose","gl_TextureMatrixTranspose","gl_Vertex","greaterThan","greaterThanEqual","inversesqrt","length","lessThan","lessThanEqual","log","log2","matrixCompMult","max","min","mix","mod","normalize","not","notEqual","pow","radians","reflect","refract","sign","sin","smoothstep","sqrt","step","tan","texture2D","texture2DLod","texture2DProj","texture2DProjLod","textureCube","textureCubeLod","texture2DLodEXT","texture2DProjLodEXT","textureCubeLodEXT","texture2DGradEXT","texture2DProjGradEXT","textureCubeGradEXT","textureSize","texelFetch"];void 0!==t&&(e.exports=t)}();const n=(0,_commonjsHelpers_js__WEBPACK_IMPORTED_MODULE_0__.g)(i.exports)},"./node_modules/@arcgis/core/views/webgl/Program.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>Program_m});var arrayUtils=__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),checkWebGLError=(__webpack_require__("./node_modules/@arcgis/core/core/has.js"),__webpack_require__("./node_modules/@arcgis/core/views/webgl/checkWebGLError.js")),contextUtils=__webpack_require__("./node_modules/@arcgis/core/views/webgl/contextUtils.js"),enums=__webpack_require__("./node_modules/@arcgis/core/views/webgl/enums.js");const e=["layout","centroid","smooth","case","mat2x2","mat2x3","mat2x4","mat3x2","mat3x3","mat3x4","mat4x2","mat4x3","mat4x4","uint","uvec2","uvec3","uvec4","samplerCubeShadow","sampler2DArray","sampler2DArrayShadow","isampler2D","isampler3D","isamplerCube","isampler2DArray","usampler2D","usampler3D","usamplerCube","usampler2DArray","coherent","restrict","readonly","writeonly","resource","atomic_uint","noperspective","patch","sample","subroutine","common","partition","active","filter","image1D","image2D","image3D","imageCube","iimage1D","iimage2D","iimage3D","iimageCube","uimage1D","uimage2D","uimage3D","uimageCube","image1DArray","image2DArray","iimage1DArray","iimage2DArray","uimage1DArray","uimage2DArray","image1DShadow","image2DShadow","image1DArrayShadow","image2DArrayShadow","imageBuffer","iimageBuffer","uimageBuffer","sampler1DArray","sampler1DArrayShadow","isampler1D","isampler1DArray","usampler1D","usampler1DArray","isampler2DRect","usampler2DRect","samplerBuffer","isamplerBuffer","usamplerBuffer","sampler2DMS","isampler2DMS","usampler2DMS","sampler2DMSArray","isampler2DMSArray","usampler2DMSArray","trunc","round","roundEven","isnan","isinf","floatBitsToInt","floatBitsToUint","intBitsToFloat","uintBitsToFloat","packSnorm2x16","unpackSnorm2x16","packUnorm2x16","unpackUnorm2x16","packHalf2x16","unpackHalf2x16","outerProduct","transpose","determinant","inverse","texture","textureSize","textureProj","textureLod","textureOffset","texelFetch","texelFetchOffset","textureProjOffset","textureLodOffset","textureProjLod","textureProjLodOffset","textureGrad","textureGradOffset","textureProjGrad","textureProjGradOffset"],testUtils_e={enableCache:!1};var builtins=__webpack_require__("./node_modules/@arcgis/core/chunks/builtins.js"),i=999,s=9999,c=0,p=1,u=2,f=3,d=4,l=5,h=6,y=7,w=8,g=9,m=10,k=11,b=["block-comment","line-comment","preprocessor","operator","integer","float","ident","builtin","keyword","whitespace","eof","integer"];function E(){var t,e,a,E=0,_=0,v=i,j=[],A=[],x=1,D=0,R=0,T=!1,S=!1,G="";return function(t){return A=[],null!==t?F(t.replace?t.replace(/\r\n/g,"\n"):t):function L(t){return j.length&&X(j.join("")),v=m,X("(eof)"),A}()};function X(t){t.length&&A.push({type:b[v],data:t,position:R,line:x,column:D})}function F(e){var r;for(E=0,a=(G+=e).length;t=G[E],E<a;){switch(r=E,v){case c:E=V();break;case p:case u:E=M();break;case f:E=O();break;case d:E=$();break;case k:E=W();break;case l:E=z();break;case s:E=I();break;case g:E=H();break;case i:E=C()}r!==E&&("\n"===G[r]?(D=0,++x):++D)}return _+=E,G=G.slice(E),A}function C(){return j=j.length?[]:j,"/"===e&&"*"===t?(R=_+E-1,v=c,e=t,E+1):"/"===e&&"/"===t?(R=_+E-1,v=p,e=t,E+1):"#"===t?(v=u,R=_+E,E):/\s/.test(t)?(v=g,R=_+E,E):(T=/\d/.test(t),S=/[^\w_]/.test(t),R=_+E,v=T?d:S?f:s,E)}function H(){return/[^\s]/g.test(t)?(X(j.join("")),v=i,E):(j.push(t),e=t,E+1)}function M(){return"\r"!==t&&"\n"!==t||"\\"===e?(j.push(t),e=t,E+1):(X(j.join("")),v=i,E)}function V(){return"/"===t&&"*"===e?(j.push(t),X(j.join("")),v=i,E+1):(j.push(t),e=t,E+1)}function O(){if("."===e&&/\d/.test(t))return v=l,E;if("/"===e&&"*"===t)return v=c,E;if("/"===e&&"/"===t)return v=p,E;if("."===t&&j.length){for(;N(j););return v=l,E}if(";"===t||")"===t||"("===t){if(j.length)for(;N(j););return X(t),v=i,E+1}var a=2===j.length&&"="!==t;if(/[\w_\d\s]/.test(t)||a){for(;N(j););return v=i,E}return j.push(t),e=t,E+1}function N(t){for(var e,a,n=0;;){if(e=builtins.o.indexOf(t.slice(0,t.length+n).join("")),a=builtins.o[e],-1===e){if(n--+t.length>0)continue;a=t.slice(0,1).join("")}return X(a),R+=a.length,(j=j.slice(a.length)).length}}function W(){return/[^a-fA-F0-9]/.test(t)?(X(j.join("")),v=i,E):(j.push(t),e=t,E+1)}function $(){return"."===t||/[eE]/.test(t)?(j.push(t),v=l,e=t,E+1):"x"===t&&1===j.length&&"0"===j[0]?(v=k,j.push(t),e=t,E+1):/[^\d]/.test(t)?(X(j.join("")),v=i,E):(j.push(t),e=t,E+1)}function z(){return"f"===t&&(j.push(t),e=t,E+=1),/[eE]/.test(t)||"-"===t&&/[eE]/.test(e)?(j.push(t),e=t,E+1):/[^\d]/.test(t)?(X(j.join("")),v=i,E):(j.push(t),e=t,E+1)}function I(){if(/[^\d\w_]/.test(t)){var a=j.join("");return v=builtins.l.indexOf(a)>-1?w:builtins.b.indexOf(a)>-1?y:h,X(j.join("")),v=i,E}return j.push(t),e=t,E+1}}function v(t){return function _(t){var e=E(),a=[];return(a=a.concat(e(t))).concat(e(null))}(t)}const A=new Set(["GL_OES_standard_derivatives","GL_EXT_frag_depth","GL_EXT_draw_buffers","GL_EXT_shader_texture_lod"]);function D(t,e){for(let a=e-1;a>=0;a--){const e=t[a];if("whitespace"!==e.type&&"block-comment"!==e.type){if("keyword"!==e.type)break;if("attribute"===e.data||"in"===e.data)return!0}}return!1}function R(t,e,a,r){r=r||a;for(const n of t)if("ident"===n.type&&n.data===a)return r in e?e[r]++:e[r]=0,R(t,e,r+"_"+e[r],r);return a}function T(t,e,a="afterVersion"){function r(t,e){for(let a=e;a<t.length;a++){const e=t[a];if("operator"===e.type&&";"===e.data)return a}return null}const o={data:"\n",type:"whitespace"},i=e=>e<t.length&&/[^\r\n]$/.test(t[e].data);let s=function n(t){let e=-1,n=0,o=-1;for(let i=0;i<t.length;i++){const s=t[i];if("preprocessor"===s.type&&(/\#(if|ifdef|ifndef)\s+.+/.test(s.data)?++n:/\#endif\s*.*/.test(s.data)&&--n),"afterVersion"!==a&&"afterPrecision"!==a||"preprocessor"===s.type&&s.data.startsWith("#version")&&(o=Math.max(o,i)),"afterPrecision"===a&&"keyword"===s.type&&"precision"===s.data){const e=r(t,i);if(null===e)throw new Error("precision statement not followed by any semicolons!");o=Math.max(o,e)}e<o&&0===n&&(e=i)}return e+1}(t);i(s-1)&&t.splice(s++,0,o);for(const c of e)t.splice(s++,0,c);i(s-1)&&i(s)&&t.splice(s,0,o)}function S(t,e,a,r="lowp"){T(t,[{type:"keyword",data:"out"},{type:"whitespace",data:" "},{type:"keyword",data:r},{type:"whitespace",data:" "},{type:"keyword",data:a},{type:"whitespace",data:" "},{type:"ident",data:e},{type:"operator",data:";"}],"afterPrecision")}function G(t,e,a,r,n="lowp"){T(t,[{type:"keyword",data:"layout"},{type:"operator",data:"("},{type:"keyword",data:"location"},{type:"whitespace",data:" "},{type:"operator",data:"="},{type:"whitespace",data:" "},{type:"integer",data:r.toString()},{type:"operator",data:")"},{type:"whitespace",data:" "},{type:"keyword",data:"out"},{type:"whitespace",data:" "},{type:"keyword",data:n},{type:"whitespace",data:" "},{type:"keyword",data:a},{type:"whitespace",data:" "},{type:"ident",data:e},{type:"operator",data:";"}],"afterPrecision")}function X(t,e){let a,r,n=-1;for(let o=e;o<t.length;o++){const e=t[o];if("operator"===e.type&&("["===e.data&&(a=o),"]"===e.data)){r=o;break}"integer"===e.type&&(n=parseInt(e.data,10))}return a&&r&&t.splice(a,r-a+1),n}function F(a,r){if(a.startsWith("#version 300"))return a;const n=function C(t){return testUtils_e.enableCache?L.get(t):null}(a);if(null!=n)return n;const o=v(a);if("300 es"===function x(t,e="100",a="300 es"){const r=/^\s*\#version\s+([0-9]+(\s+[a-zA-Z]+)?)\s*/;for(const n of t)if("preprocessor"===n.type){const t=r.exec(n.data);if(t){const r=t[1].replaceAll(/\s\s+/g," ");if(r===a)return r;if(r===e)return n.data="#version "+a,e;throw new Error("unknown glsl version: "+r)}}return t.splice(0,0,{type:"preprocessor",data:"#version "+a},{type:"whitespace",data:"\n"}),null}(o,"100","300 es"))return a;let i=null,s=null;const c={},p={};for(let u=0;u<o.length;++u){const a=o[u];switch(a.type){case"keyword":r===enums.Co.VERTEX_SHADER&&"attribute"===a.data?a.data="in":"varying"===a.data&&(a.data=r===enums.Co.VERTEX_SHADER?"out":"in");break;case"builtin":if(/^texture(2D|Cube)(Proj)?(Lod|Grad)?(EXT)?$/.test(a.data.trim())&&(a.data=a.data.replaceAll(/(2D|Cube|EXT)/g,"")),r===enums.Co.FRAGMENT_SHADER&&"gl_FragColor"===a.data&&(i||(i=R(o,c,"fragColor"),S(o,i,"vec4")),a.data=i),r===enums.Co.FRAGMENT_SHADER&&"gl_FragData"===a.data){const t=X(o,u+1),e=R(o,c,"fragData");G(o,e,"vec4",t,"mediump"),a.data=e}else r===enums.Co.FRAGMENT_SHADER&&"gl_FragDepthEXT"===a.data&&(s||(s=R(o,c,"gl_FragDepth")),a.data=s);break;case"ident":if(e.includes(a.data)){if(r===enums.Co.VERTEX_SHADER&&D(o,u))throw new Error("attribute in vertex shader uses a name that is a reserved word in glsl 300 es");a.data in p||(p[a.data]=R(o,c,a.data)),a.data=p[a.data]}}}for(let t=o.length-1;t>=0;--t){const e=o[t];if("preprocessor"===e.type){const a=e.data.match(/\#extension\s+(.*)\:/);if(a&&a[1]&&A.has(a[1].trim())){const e=o[t+1];o.splice(t,e&&"whitespace"===e.type?2:1)}const r=e.data.match(/\#ifdef\s+(.*)/);r&&r[1]&&A.has(r[1].trim())&&(e.data="#if 1");const n=e.data.match(/\#ifndef\s+(.*)/);n&&n[1]&&A.has(n[1].trim())&&(e.data="#if 0")}}return function H(t,e){return testUtils_e.enableCache&&L.set(t,e),e}(a,function j(t){return t.map((t=>"eof"!==t.type?t.data:"")).join("")}(o))}const L=new Map;class Program_m{constructor(t,m,h,f,c=new Map){this._context=t,this._locations=f,this._uniformBlockBindings=c,this._refCount=1,this._compiled=!1,this._linesOfCode=0,this._nameToUniformLocation=new Map,this._nameToUniform1=new Map,this._nameToUniform1v=new Map,this._nameToUniform2=new Map,this._nameToUniform3=new Map,this._nameToUniform4=new Map,this._nameToUniformMatrix3=new Map,this._nameToUniformMatrix4=new Map,t||console.error("RenderingContext isn't initialized!"),0===m.length&&console.error("Shaders source should not be empty!"),this._context.type===contextUtils.EL.WEBGL2&&(m=F(m,enums.Co.VERTEX_SHADER),h=F(h,enums.Co.FRAGMENT_SHADER)),this._vShader=a(this._context,enums.Co.VERTEX_SHADER,m),this._fShader=a(this._context,enums.Co.FRAGMENT_SHADER,h),Program_.enabled&&(this._linesOfCode=m.match(/\n/g).length+h.match(/\n/g).length+2,this._context.instanceCounter.increment(enums.vt.LinesOfCode,this._vShader,this._linesOfCode)),this._vShader&&this._fShader||console.error("Error loading shaders!"),this._context.instanceCounter.increment(enums.vt.Shader,this),(0,checkWebGLError.Xc)()&&(this.vertexShader=m,this.fragmentShader=h);const l=this._context.gl,g=l.createProgram();if(l.attachShader(g,this._vShader),l.attachShader(g,this._fShader),this._locations.forEach(((t,e)=>l.bindAttribLocation(g,t,e))),l.linkProgram(g),(0,checkWebGLError.Xc)()&&!l.getProgramParameter(g,l.LINK_STATUS)&&console.error(`Could not link shader\nvalidated: ${l.getProgramParameter(g,l.VALIDATE_STATUS)}, gl error ${l.getError()}, vertex: ${l.getShaderParameter(this._vShader,l.COMPILE_STATUS)}, fragment: ${l.getShaderParameter(this._fShader,l.COMPILE_STATUS)}, info log: ${l.getProgramInfoLog(g)}, vertex source: ${this.vertexShader}, fragment source: ${this.fragmentShader}`),this._context.type===contextUtils.EL.WEBGL2){const t=l;for(const[e,i]of this._uniformBlockBindings){const o=t.getUniformBlockIndex(g,e);o<4294967295&&t.uniformBlockBinding(g,o,i)}}this._glName=g,this._context.instanceCounter.increment(enums.vt.Program,this)}get glName(){return this._glName}get hasGLName(){return null!=this._glName}get compiled(){if(this._compiled)return!0;const t=this._context.gl.getExtension("KHR_parallel_shader_compile");return null==t||null==this.glName?(this._compiled=!0,!0):(this._compiled=!!this._context.gl.getProgramParameter(this.glName,t.COMPLETION_STATUS_KHR),this._compiled)}dispose(){if(--this._refCount>0)return;const t=this._context.gl,e=this._context.instanceCounter;this._nameToUniformLocation.forEach((t=>t&&e.decrement(enums.vt.Uniform,t))),this._nameToUniformLocation.clear(),this._vShader&&(this._linesOfCode>0&&(e.decrement(enums.vt.LinesOfCode,this._vShader,this._linesOfCode),this._linesOfCode=0),t.deleteShader(this._vShader),this._vShader=null,e.decrement(enums.vt.Shader,this)),this._fShader&&(t.deleteShader(this._fShader),this._fShader=null),this._glName&&(t.deleteProgram(this._glName),this._glName=null,e.decrement(enums.vt.Program,this))}ref(){++this._refCount}_getUniformLocation(t){const e=this._nameToUniformLocation.get(t);if(void 0!==e)return e;if(this.glName){const e=this._context.gl.getUniformLocation(this.glName,t);return this._nameToUniformLocation.set(t,e),e&&this._context.instanceCounter.increment(enums.vt.Uniform,e),e}return null}hasUniform(t){return null!=this._getUniformLocation(t)}setUniform1i(t,e){const i=this._nameToUniform1.get(t);void 0!==i&&e===i||(this._context.gl.uniform1i(this._getUniformLocation(t),e),this._nameToUniform1.set(t,e))}setUniform1iv(t,e){Program_c(this._nameToUniform1v,t,e)&&this._context.gl.uniform1iv(this._getUniformLocation(t),e)}setUniform2iv(t,e){Program_c(this._nameToUniform2,t,e)&&this._context.gl.uniform2iv(this._getUniformLocation(t),e)}setUniform3iv(t,e){Program_c(this._nameToUniform3,t,e)&&this._context.gl.uniform3iv(this._getUniformLocation(t),e)}setUniform4iv(t,e){Program_c(this._nameToUniform4,t,e)&&this._context.gl.uniform4iv(this._getUniformLocation(t),e)}setUniform1f(t,e){const i=this._nameToUniform1.get(t);void 0!==i&&e===i||(this._context.gl.uniform1f(this._getUniformLocation(t),e),this._nameToUniform1.set(t,e))}setUniform1fv(t,e){Program_c(this._nameToUniform1v,t,e)&&this._context.gl.uniform1fv(this._getUniformLocation(t),e)}setUniform2f(t,e,i){const o=this._nameToUniform2.get(t);void 0===o?(this._context.gl.uniform2f(this._getUniformLocation(t),e,i),this._nameToUniform2.set(t,[e,i])):e===o[0]&&i===o[1]||(this._context.gl.uniform2f(this._getUniformLocation(t),e,i),o[0]=e,o[1]=i)}setUniform2fv(t,e){Program_c(this._nameToUniform2,t,e)&&this._context.gl.uniform2fv(this._getUniformLocation(t),e)}setUniform3f(t,e,i,o){const n=this._nameToUniform3.get(t);void 0===n?(this._context.gl.uniform3f(this._getUniformLocation(t),e,i,o),this._nameToUniform3.set(t,[e,i,o])):e===n[0]&&i===n[1]&&o===n[2]||(this._context.gl.uniform3f(this._getUniformLocation(t),e,i,o),n[0]=e,n[1]=i,n[2]=o)}setUniform3fv(t,e){Program_c(this._nameToUniform3,t,e)&&this._context.gl.uniform3fv(this._getUniformLocation(t),e)}setUniform4f(t,e,i,o,n){const r=this._nameToUniform4.get(t);void 0===r?(this._context.gl.uniform4f(this._getUniformLocation(t),e,i,o,n),this._nameToUniform4.set(t,[e,i,o,n])):void 0!==r&&e===r[0]&&i===r[1]&&o===r[2]&&n===r[3]||(this._context.gl.uniform4f(this._getUniformLocation(t),e,i,o,n),r[0]=e,r[1]=i,r[2]=o,r[3]=n)}setUniform4fv(t,e){Program_c(this._nameToUniform4,t,e)&&this._context.gl.uniform4fv(this._getUniformLocation(t),e)}setUniformMatrix3fv(t,e,i=!1){Program_c(this._nameToUniformMatrix3,t,e)&&this._context.gl.uniformMatrix3fv(this._getUniformLocation(t),i,e)}setUniformMatrix4fv(t,e,i=!1){Program_c(this._nameToUniformMatrix4,t,e)&&this._context.gl.uniformMatrix4fv(this._getUniformLocation(t),i,e)}stop(){}}function a(t,i,n){const r=t.gl,s=r.createShader(i);return r.shaderSource(s,n),r.compileShader(s),(0,checkWebGLError.Xc)()&&!r.getShaderParameter(s,r.COMPILE_STATUS)&&(console.error("Compile error in ".concat(i===enums.Co.VERTEX_SHADER?"vertex":"fragment"," shader")),console.error(r.getShaderInfoLog(s)),console.error(function Program_h(t){let e=2;return t.replaceAll("\n",(()=>"\n"+function Program_f(t){return t>=1e3?t.toString():("  "+t).slice(-3)}(e++)+":"))}(n))),s}function Program_c(e,i,o){const n=e.get(i);return n?(0,arrayUtils.yo)(n,o):(e.set(i,Array.from(o)),!0)}const Program_={enabled:!1}},"./node_modules/@arcgis/core/views/webgl/ProgramTemplate.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>e});var _Program_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/views/webgl/Program.js");function e(e,t,a=""){return new _Program_js__WEBPACK_IMPORTED_MODULE_0__.B(e,a+t.shaders.vertexShader,a+t.shaders.fragmentShader,t.attributes)}},"./node_modules/@arcgis/core/views/webgl/ShaderCompiler.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>e});class e{constructor(e){this._readFile=e}resolveIncludes(e){return this._resolve(e)}_resolve(e,t=new Map){if(t.has(e))return t.get(e);const r=this._read(e);if(!r)throw new Error(`cannot find shader file ${e}`);const s=/^[^\S\n]*#include\s+<(\S+)>[^\S\n]?/gm;let n=s.exec(r);const l=[];for(;null!=n;)l.push({path:n[1],start:n.index,length:n[0].length}),n=s.exec(r);let a=0,h="";return l.forEach((e=>{h+=r.slice(a,e.start),h+=t.has(e.path)?"":this._resolve(e.path,t),a=e.start+e.length})),h+=r.slice(a),t.set(e,h),h}_read(e){return this._readFile(e)}}}}]);