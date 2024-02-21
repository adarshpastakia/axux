"use strict";(self.webpackChunkRemoteClient=self.webpackChunkRemoteClient||[]).push([[821],{65845:(e,t,r)=>{r.d(t,{D:()=>o});var a=r(81153);function o(e){e?.writtenProperties&&e.writtenProperties.forEach((({target:e,propName:t,newOrigin:r})=>{(0,a.l)(e)&&r&&e.originOf(t)!==r&&e.updateOrigin(t,r)}))}},81153:(e,t,r)=>{function a(e){return e&&"getAtOrigin"in e&&"originOf"in e}r.d(t,{l:()=>a})},30821:(e,t,r)=>{r.d(t,{save:()=>y,saveAs:()=>w});var a=r(64383),o=r(33516),n=r(14661),i=r(35755);const s="Group Layer",l="group-layer-save",u="group-layer-save-as",p=n.Kz.GROUP_LAYER_MAP;function c(e){return{isValid:"group"===e.type,errorMessage:"Layer.type should be 'group'"}}function d(e){return{isValid:(0,n._$)(e,p),errorMessage:`Layer.portalItem.typeKeywords should have '${p}'`}}function m(e){const t=e.layerJSON;return Promise.resolve(t&&Object.keys(t).length?t:null)}async function f(e,t){t.title||=e.title,(0,n.qj)(t,p)}async function y(e,t){return(0,a.a1)({layer:e,itemType:s,validateLayer:c,validateItem:d,createJSONContext:t=>(0,o.M4)(t,e),createItemData:m,errorNamePrefix:l,saveResources:async(t,r)=>(e.sourceIsPortalItem||await t.removeAllResources().catch((()=>{})),(0,i.Hn)(e.resourceReferences,r))},t)}async function w(e,t,r){return(0,a.po)({layer:e,itemType:s,validateLayer:c,createJSONContext:t=>(0,o.M4)(t,e),createItemData:m,errorNamePrefix:u,newItem:t,setItemProperties:f,saveResources:(t,r)=>(0,i.Hn)(e.resourceReferences,r)},r)}},64383:(e,t,r)=>{r.d(t,{a1:()=>v,po:()=>g});var a=r(20102),o=r(65845),n=r(48522),i=r(15235),s=r(33516),l=r(14661),u=r(14769);async function p(e){const{layer:t,errorNamePrefix:r,validateLayer:o}=e;await t.load(),function(e,t,r){const o=r(e);if(!o.isValid)throw new a.Z(`${t}:invalid-parameters`,o.errorMessage,{layer:e})}(t,r,o)}function c(e,t){return`Layer (title: ${e.title}, id: ${e.id}) of type '${e.declaredClass}' ${t}`}function d(e){const{item:t,itemType:r,errorNamePrefix:o,layer:n,validateItem:i}=e;if((0,u.w)(t),t.type!==r)throw new a.Z(`${o}:portal-item-wrong-type`,`Portal item type should be "${r}"`,{item:t,layer:n});if(i){const e=i(t);if(!e.isValid)throw new a.Z(`${o}:invalid-parameters`,e.errorMessage,{layer:n})}}function m(e){const{layer:t,errorNamePrefix:r}=e,{portalItem:o}=t;if(!o)throw new a.Z(`${r}:portal-item-not-set`,c(t,"requires the portalItem property to be set"));if(!o.loaded)throw new a.Z(`${r}:portal-item-not-loaded`,c(t,"cannot be saved to a portal item that does not exist or is inaccessible"));d({...e,item:o})}function f(e){const{newItem:t,itemType:r}=e;let a=i.default.from(t);return a.id&&(a=a.clone(),a.id=null),a.type??=r,a.portal??=n.Z.getDefault(),d({...e,item:a}),a}async function y(e,t,r){"beforeSave"in e&&"function"==typeof e.beforeSave&&await e.beforeSave();const o=e.write({},t);return await Promise.all(t.resources?.pendingOperations??[]),function(e,t){let r=(e.messages??[]).filter((({type:e})=>"error"===e)).map((({name:e,message:t,details:r})=>new a.Z(e,t,r)));if(e.blockedRelativeUrls&&(r=r.concat(e.blockedRelativeUrls.map((e=>new a.Z("url:unsupported",`Relative url '${e}' is not supported`))))),t?.ignoreUnsupported&&(r=r.filter((({name:e})=>"layer:unsupported"!==e&&"symbol:unsupported"!==e&&"symbol-layer:unsupported"!==e&&"property:unsupported"!==e&&"url:unsupported"!==e))),r.length>0)throw new a.Z("layer-write:unsupported","Failed to save layer due to unsupported or invalid content. See 'details.errors' for more detailed information",{errors:r})}(t,r),o}function w(e){(0,l.qj)(e,l.Kz.JSAPI),e.typeKeywords&&(e.typeKeywords=e.typeKeywords.filter(((e,t,r)=>r.indexOf(e)===t)))}async function v(e,t){const{layer:r,createItemData:a,createJSONContext:n,saveResources:i}=e;await p(e),m(e);const l=r.portalItem,u=n?n(l):(0,s.Yv)(l),c=await y(r,u,t),d=await a({layer:r,layerJSON:c},l);return w(l),await l.update({data:d}),(0,o.D)(u),await(i?.(l,u)),l}async function g(e,t){const{layer:r,createItemData:a,createJSONContext:n,setItemProperties:i,saveResources:l}=e;await p(e);const u=f(e),c=n?n(u):(0,s.Yv)(u),d=await y(r,c,t),m=await a({layer:r,layerJSON:d},u);return await i(r,u),w(u),await async function(e,t,r){const a=e.portal;await a.signIn(),await(a.user?.addItem({item:e,data:t,folder:r?.folder}))}(u,m,t),r.portalItem=u,(0,o.D)(c),await(l?.(u,c)),u}},33516:(e,t,r)=>{r.d(t,{M4:()=>l,Yv:()=>i,ht:()=>n,wk:()=>s});var a=r(17452),o=r(48522);function n(e){return{origin:"portal-item",url:(0,a.mN)(e.itemUrl),portal:e.portal||o.Z.getDefault(),portalItem:e,readResourcePaths:[]}}function i(e){const t=(0,a.mN)(e.itemUrl);return{origin:"portal-item",messages:[],writtenProperties:[],url:t,portal:e.portal||o.Z.getDefault(),portalItem:e,verifyItemRelativeUrls:t?{rootPath:t.path,writtenUrls:[]}:null,blockedRelativeUrls:[]}}function s(e){return{origin:"web-map",url:(0,a.mN)(e.itemUrl),portal:e.portal||o.Z.getDefault(),portalItem:e,readResourcePaths:[]}}function l(e,t){const r=(0,a.mN)(e.itemUrl);return{origin:"web-map",messages:[],writtenProperties:[],url:r,portal:e.portal||o.Z.getDefault(),portalItem:e,initiator:t,verifyItemRelativeUrls:r?{rootPath:r.path,writtenUrls:[]}:null,blockedRelativeUrls:[],resources:{toAdd:[],toUpdate:[],toKeep:[],pendingOperations:[]}}}},14769:(e,t,r)=>{r.d(t,{w:()=>i});var a=r(68773),o=r(20102),n=r(71058);function i(e){if(a.default.apiKey&&(0,n.r)(e.portal.url))throw new o.Z("save-api-key-utils:api-key-not-supported",`Saving is not supported on ${e.portal.url} when using an api key`)}}}]);