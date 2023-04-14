"use strict";(self.webpackChunkRemoteClient=self.webpackChunkRemoteClient||[]).push([[9070],{99070:(e,t,n)=>{n.r(t),n.d(t,{loadGLTFMesh:()=>I});var r=n(22303),o=n(3172),s=n(30175),a=n(22021),c=n(70586),i=n(21787),u=n(46521),l=n(65617),f=n(88669),p=n(62540),m=n(60746),g=n(91024),d=n(71630),x=n(56481),C=n(20773),T=n(11077),w=n(8323),h=n(66459),y=n(40270),b=n(91695),v=n(91911),A=n(15317),R=n(54388),E=n(57758),M=n(35371),S=n(56067),$=n(75488),B=n(10816);async function I(e,t,n){const a=new y.C(function(e){const t=e?.resolveFile;return t?{busy:!1,request:async(e,n,r)=>{const s=t(e),a="image"===n?"image":"binary"===n?"array-buffer":"json";return(await(0,o.default)(s,{responseType:a,signal:(0,c.pC)(r)?r.signal:null})).data}}:null}(n)),i=(await(0,b.Q)(a,t,n,!0)).model,u=i.lods.shift(),p=new Map,C=new Map;i.textures.forEach(((e,t)=>p.set(t,function(e){return new g.Z({data:((0,A.$A)(e.data),e.data),wrap:P(e.parameters.wrap)})}(e)))),i.materials.forEach(((e,t)=>C.set(t,function(e,t){const n=new r.Z(function(e,t){return(0,f.f)(D(e[0]),D(e[1]),D(e[2]),t)}(e.color,e.opacity)),o=e.emissiveFactor?new r.Z(function(e){return(0,l.f)(D(e[0]),D(e[1]),D(e[2]))}(e.emissiveFactor)):null;return new m.Z({color:n,colorTexture:(0,c.Wg)((0,c.yw)(e.textureColor,(e=>t.get(e)))),normalTexture:(0,c.Wg)((0,c.yw)(e.textureNormal,(e=>t.get(e)))),emissiveColor:o,emissiveTexture:(0,c.Wg)((0,c.yw)(e.textureEmissive,(e=>t.get(e)))),occlusionTexture:(0,c.Wg)((0,c.yw)(e.textureOcclusion,(e=>t.get(e)))),alphaMode:N(e.alphaMode),alphaCutoff:e.alphaCutoff,doubleSided:e.doubleSided,metallic:e.metallicFactor,roughness:e.roughnessFactor,metallicRoughnessTexture:(0,c.Wg)((0,c.yw)(e.textureMetallicRoughness,(e=>t.get(e)))),colorTextureTransform:e.colorTextureTransform,normalTextureTransform:e.normalTextureTransform,occlusionTextureTransform:e.occlusionTextureTransform,emissiveTextureTransform:e.emissiveTextureTransform,metallicRoughnessTextureTransform:e.metallicRoughnessTextureTransform})}(e,p))));const T=function(e){let t=0;const n={color:!1,tangent:!1,normal:!1,texCoord0:!1},r=new Map,o=new Map,a=[];for(const c of e.parts){const{attributes:{position:e,normal:i,color:u,tangent:l,texCoord0:f}}=c,p=`\n      ${k(e,r)}/\n      ${k(i,r)}/\n      ${k(u,r)}/\n      ${k(l,r)}/\n      ${k(f,r)}/\n      ${F(c.transform)}\n    `;let m=!1;const g=(0,s.s1)(o,p,(()=>(m=!0,{start:t,length:e.count})));m&&(t+=e.count),i&&(n.normal=!0),u&&(n.color=!0),l&&(n.tangent=!0),f&&(n.texCoord0=!0),a.push({gltf:c,writeVertices:m,region:g})}return{vertexAttributes:{position:(0,w.gS)(x.fP,t),normal:n.normal?(0,w.gS)(x.ct,t):null,tangent:n.tangent?(0,w.gS)(x.ek,t):null,color:n.color?(0,w.gS)(x.mc,t):null,texCoord0:n.texCoord0?(0,w.gS)(x.Eu,t):null},parts:a,components:[]}}(u);for(const e of T.parts)L(T,e,C);const{position:v,normal:R,tangent:E,color:M,texCoord0:S}=T.vertexAttributes,$={position:v.typedBuffer,normal:(0,c.pC)(R)?R.typedBuffer:null,tangent:(0,c.pC)(E)?E.typedBuffer:null,uv:(0,c.pC)(S)?S.typedBuffer:null,color:(0,c.pC)(M)?M.typedBuffer:null},B=(0,h.w1)($,e,n);return{transform:B.transform,components:T.components,spatialReference:e.spatialReference,vertexAttributes:new d.Q({position:B.vertexAttributes.position,normal:B.vertexAttributes.normal,tangent:B.vertexAttributes.tangent,color:$.color,uv:$.uv})}}function k(e,t){if((0,c.Wi)(e))return"-";const n=e.typedBuffer;return`${(0,s.s1)(t,n.buffer,(()=>t.size))}/${n.byteOffset}/${n.byteLength}`}function F(e){return(0,c.pC)(e)?e.toString():"-"}function L(e,t,n){t.writeVertices&&function(e,t){const{position:n,normal:r,tangent:o,color:s,texCoord0:l}=e.vertexAttributes,f=t.region.start,{attributes:p,transform:m}=t.gltf,g=p.position.count;if((0,C.t)(n.slice(f,g),p.position,m),(0,c.pC)(p.normal)&&(0,c.pC)(r)){const e=(0,i.b)((0,u.c)(),m),t=r.slice(f,g);(0,C.a)(t,p.normal,e),(0,a.oc)(e)&&(0,C.n)(t,t)}else(0,c.pC)(r)&&(0,S.f)(r,0,0,1,{dstIndex:f,count:g});if((0,c.pC)(p.tangent)&&(0,c.pC)(o)){const e=(0,i.b)((0,u.c)(),m),t=o.slice(f,g);(0,T.t)(t,p.tangent,e),(0,a.oc)(e)&&(0,T.n)(t,t)}else(0,c.pC)(o)&&(0,$.f)(o,0,0,1,1,{dstIndex:f,count:g});if((0,c.pC)(p.texCoord0)&&(0,c.pC)(l)?(0,B.n)(l.slice(f,g),p.texCoord0):(0,c.pC)(l)&&(0,B.f)(l,0,0,{dstIndex:f,count:g}),(0,c.pC)(p.color)&&(0,c.pC)(s)){const e=p.color,t=s.slice(f,g);if(4===e.elementCount)e instanceof x.ek?(0,T.s)(t,e,255):e instanceof x.mc?(0,$.c)(t,e):e instanceof x.v6&&(0,T.a)(t,e,8);else{(0,$.f)(t,255,255,255,255);const n=x.ne.fromTypedArray(t.typedBuffer,t.typedBufferStride);e instanceof x.ct?(0,C.s)(n,e,255):e instanceof x.ne?(0,S.c)(n,e):e instanceof x.mw&&(0,C.b)(n,e,8)}}else(0,c.pC)(s)&&(0,$.f)(s.slice(f,g),255,255,255,255)}(e,t);const r=t.gltf,o=function(e,t){switch(t){case M.MX.TRIANGLES:return(0,v.nh)(e,R.DX);case M.MX.TRIANGLE_STRIP:return(0,v.DA)(e);case M.MX.TRIANGLE_FAN:return(0,v.jX)(e)}}(r.indices||r.attributes.position.count,r.primitiveType),s=t.region.start;if(s)for(let e=0;e<o.length;e++)o[e]+=s;e.components.push(new p.Z({faces:o,material:n.get(r.material),trustSourceNormals:!0}))}function N(e){switch(e){case"OPAQUE":return"opaque";case"MASK":return"mask";case"BLEND":return"blend"}}function P(e){return{horizontal:W(e.s),vertical:W(e.t)}}function W(e){switch(e){case M.e8.CLAMP_TO_EDGE:return"clamp";case M.e8.MIRRORED_REPEAT:return"mirror";case M.e8.REPEAT:return"repeat"}}function D(e){return e**(1/E.K)*255}}}]);