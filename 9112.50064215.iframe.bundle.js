"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[9112],{"./node_modules/@arcgis/core/layers/support/fetchService.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>r});var _support_requestPresets_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/support/requestPresets.js");async function r(r,s){const a=await(0,_support_requestPresets_js__WEBPACK_IMPORTED_MODULE_0__.T)(r,s);a.layers=a.layers.filter(t);const n={serviceJSON:a};if((a.currentVersion??0)<10.5)return n;const i=await(0,_support_requestPresets_js__WEBPACK_IMPORTED_MODULE_0__.T)(r+"/layers",s);return n.layersJSON={layers:i.layers.filter(t),tables:i.tables},n}function t(e){return!e.type||"Feature Layer"===e.type}},"./node_modules/@arcgis/core/portal/support/layersLoader.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{getFirstLayerOrTableId:()=>I,getNumLayersAndTables:()=>v,getSubtypeGroupLayerIds:()=>j,load:()=>p,preprocessFSItemData:()=>w});var _core_Error_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),_layers_Layer_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/layers/Layer.js"),_layers_support_arcgisLayerUrl_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/layers/support/arcgisLayerUrl.js"),_layers_support_fetchService_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/layers/support/fetchService.js"),_Portal_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/portal/Portal.js"),_PortalItem_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/portal/PortalItem.js"),_jsonContext_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@arcgis/core/portal/support/jsonContext.js"),_portalItemUtils_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@arcgis/core/portal/support/portalItemUtils.js"),_renderers_support_styleUtils_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@arcgis/core/renderers/support/styleUtils.js"),_support_requestPresets_js__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@arcgis/core/support/requestPresets.js");async function p(e,t){const r=e.instance.portalItem;if(r&&r.id)return await r.load(t),function c(t){const r=t.instance.portalItem;if(!r?.type||!t.supportedTypes.includes(r.type))throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_0__.Z("portal:invalid-layer-item-type","Invalid layer item type '${type}', expected '${expectedType}'",{type:r?.type,expectedType:t.supportedTypes.join(", ")})}(e),async function y(e,t){const r=e.instance,a=r.portalItem;if(!a)return;const{url:n,title:o}=a,s=(0,_jsonContext_js__WEBPACK_IMPORTED_MODULE_6__.h)(a);if("group"===r.type)return r.read({title:o},s),async function d(t,r){let a;const{portalItem:n}=t;if(!n)return;const o=n.type,l=r.layerModuleTypeMap,i=(0,_portalItemUtils_js__WEBPACK_IMPORTED_MODULE_7__._$)(n,"Oriented Imagery Layer")??!1;switch(o){case"Feature Service":a=i?l.OrientedImageryLayer:l.FeatureLayer;break;case"Stream Service":a=l.StreamLayer;break;case"Scene Service":a=l.SceneLayer;break;case"Feature Collection":a=l.FeatureLayer;break;default:throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_0__.Z("portal:unsupported-item-type-as-group",`The item type '${o}' is not supported as a 'IGroupLayer'`)}let[u,p]=await Promise.all([a(),h(r)]),c=()=>u;if("Feature Service"===o){if(p=n.url?await w(p,n.url):{},j(p).length){const e=l.SubtypeGroupLayer,t=await e();c=e=>"SubtypeGroupLayer"===e.layerType?t:u}return b(t,c,p,await async function P(e){const{layersJSON:t}=await(0,_layers_support_fetchService_js__WEBPACK_IMPORTED_MODULE_3__.V)(e);if(!t)return null;const r=[...t.layers,...t.tables];return e=>r.find((t=>t.id===e.id))}(n.url))}return v(p)>0?b(t,c,p):async function f(e,t){const{portalItem:r}=e;if(!r?.url)return;const a=await(0,_support_requestPresets_js__WEBPACK_IMPORTED_MODULE_9__.T)(r.url);a&&b(e,t,{layers:a.layers?.map(m),tables:a.tables?.map(m)})}(t,c)}(r,e);n&&r.read({url:n},s);const u=await h(e,t);return u&&r.read(u,s),r.resourceReferences={portalItem:a,paths:s.readResourcePaths??[]},"subtype-group"!==r.type&&r.read({title:o},s),(0,_renderers_support_styleUtils_js__WEBPACK_IMPORTED_MODULE_8__.y)(r,s)}(e,t)}function m(e){return{id:e.id,name:e.name}}function b(e,t,r,a){let n=r.layers||[];const o=r.tables||[];if("Feature Collection"===e.portalItem?.type&&(n.forEach((e=>{"Table"===e?.layerDefinition?.type&&o.push(e)})),n=n.filter((e=>"Table"!==e?.layerDefinition?.type))),"coverage"in r){const t=function T(a){const{coverage:n}=a;if(!n)return null;const l=new URL(n);if(n.toLowerCase().includes("item.html")){const e=l.searchParams.get("id"),r=l.origin;return _layers_Layer_js__WEBPACK_IMPORTED_MODULE_1__.Z.fromPortalItem({portalItem:new _PortalItem_js__WEBPACK_IMPORTED_MODULE_5__.default({id:e,url:r})})}if((0,_layers_support_arcgisLayerUrl_js__WEBPACK_IMPORTED_MODULE_2__.B5)(n))return _layers_Layer_js__WEBPACK_IMPORTED_MODULE_1__.Z.fromArcGISServerUrl({url:n});throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_0__.Z("portal:oriented-imagery-layer-coverage","the provided coverage url couldn't be loaded as a layer")}(r);t&&e.add(t)}n.reverse().forEach((n=>{const o=g(e,t(n),r,n,a?.(n));e.add(o)})),o.reverse().forEach((n=>{const o=g(e,t(n),r,n,a?.(n));e.tables.add(o)}))}function g(e,t,r,a,o){const l=e.portalItem,s=new t({portalItem:l.clone(),layerId:a.id});if("sourceJSON"in s&&(s.sourceJSON=o),"subtype-group"!==s.type&&(s.sublayerTitleMode="service-name"),"Feature Collection"===l.type){const e={origin:"portal-item",portal:l.portal||_Portal_js__WEBPACK_IMPORTED_MODULE_4__.Z.getDefault()};s.read(a,e);const t=r.showLegend;null!=t&&s.read({showLegend:t},e)}return s}async function h(e,t){if(!1===e.supportsData)return;const r=e.instance,a=r.portalItem;if(!a)return;let n=null;try{n=await a.fetchData("json",t)}catch(o){}if(function S(e){return"stream"!==e.type&&"oriented-imagery"!==e.type&&"layerId"in e}(r)){let e=null,t=!0;if(n&&v(n)>0){if(null==r.layerId){const e=j(n);r.layerId="subtype-group"===r.type?e?.[0]:I(n)}e=function L(e,t){const{layerId:r}=t,a=e.layers?.find((e=>e.id===r))||e.tables?.find((e=>e.id===r));return a&&function F(e,t){return!("feature"===t.type&&"layerType"in e&&"SubtypeGroupLayer"===e.layerType||"subtype-group"===t.type&&!("layerType"in e))}(a,t)?a:null}(n,r),e&&(1===v(n)&&(t=!1),null!=n.showLegend&&(e.showLegend=n.showLegend))}return t&&"service-name"!==r.sublayerTitleMode&&(r.sublayerTitleMode="item-title-and-service-name"),e}return n}async function w(e,t){if(null==e?.layers||null==e?.tables){const r=await(0,_support_requestPresets_js__WEBPACK_IMPORTED_MODULE_9__.T)(t);(e=e||{}).layers=e.layers||r?.layers,e.tables=e.tables||r?.tables}return e}function I(e){const t=e.layers;if(t&&t.length)return t[0].id;const r=e.tables;return r&&r.length?r[0].id:null}function v(e){return(e?.layers?.length??0)+(e?.tables?.length??0)}function j(e){const t=[];return e?.layers?.forEach((e=>{"SubtypeGroupLayer"===e.layerType&&t.push(e.id)})),t}},"./node_modules/@arcgis/core/support/requestPresets.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>t});var _request_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/request.js");async function t(t,o){const{data:r}=await(0,_request_js__WEBPACK_IMPORTED_MODULE_0__.default)(t,{responseType:"json",query:{f:"json",...o?.customParameters,token:o?.apiKey}});return r}}}]);