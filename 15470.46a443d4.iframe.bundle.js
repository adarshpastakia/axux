"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[15470],{"./node_modules/@arcgis/core/layers/graphics/editingSupport.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{applyEdits:()=>A,r3:()=>b,uploadAssets:()=>M,zp:()=>F});var _Graphic_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/Graphic.js"),_core_Collection_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/Collection.js"),_core_Error_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),_core_lang_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/core/lang.js"),_core_Logger_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/core/Logger.js"),_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/core/promiseUtils.js"),_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@arcgis/core/core/urlUtils.js"),_core_uuid_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@arcgis/core/core/uuid.js"),_geometry_support_normalizeUtils_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/normalizeUtils.js"),_mixins_EditBusLayer_js__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/EditBusLayer.js"),_support_fieldUtils_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@arcgis/core/layers/support/fieldUtils.js"),_support_infoFor3D_js__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("./node_modules/@arcgis/core/layers/support/infoFor3D.js"),_support_layerUtils_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/@arcgis/core/layers/support/layerUtils.js");function y(e){return null!=e?.applyEdits}function g(e){return"object"==typeof e&&null!=e&&"objectId"in e&&!!e.objectId}function b(e){return e.every(g)}function w(e){return"object"==typeof e&&null!=e&&"globalId"in e&&!!e.globalId}function F(e){return e.every(w)}async function A(e,t,a,s={}){let i;const n="gdbVersion"in e?e.gdbVersion:null,d=s.gdbVersion??n;if((0,_mixins_EditBusLayer_js__WEBPACK_IMPORTED_MODULE_9__.Mk)(e)&&e.url)i=(0,_mixins_EditBusLayer_js__WEBPACK_IMPORTED_MODULE_9__.Zk)(e.url,e.layerId,d,"original-and-current-features"===s.returnServiceEditsOption);else{i=(0,_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_5__.Tw)(),i.promise.then((t=>{(t.addedFeatures.length||t.updatedFeatures.length||t.deletedFeatures.length||t.addedAttachments.length||t.updatedAttachments.length||t.deletedAttachments.length)&&e.emit("edits",t)}));const t={result:i.promise};e.emit("apply-edits",t)}try{const{results:o,edits:n}=await async function v(e,t,r,s){if(await e.load(),!y(t))throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${e.type}-layer:no-editing-support`,"Layer source does not support applyEdits capability",{layer:e});if(!(0,_support_layerUtils_js__WEBPACK_IMPORTED_MODULE_11__.tk)(e))throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${e.type}-layer:editing-disabled`,"Editing is disabled for layer",{layer:e});const{edits:o,options:i}=await async function I(e,t,r){const o=(0,_support_layerUtils_js__WEBPACK_IMPORTED_MODULE_11__.BR)(e),i=t&&(t.addFeatures||t.updateFeatures||t.deleteFeatures),n=t&&(t.addAttachments||t.updateAttachments||t.deleteAttachments),d=null!=e.infoFor3D;if(function T(e,t,r,s,o,i){if(!e||!s&&!o)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${i}:missing-parameters`,"'addFeatures', 'updateFeatures', 'deleteFeatures', 'addAttachments', 'updateAttachments' or 'deleteAttachments' parameter is required");if(!t.editing.supportsGlobalId&&r?.globalIdUsed)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${i}:invalid-parameter`,"This layer does not support 'globalIdUsed' parameter. See: 'capabilities.editing.supportsGlobalId'");if(!t.editing.supportsGlobalId&&o)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${i}:invalid-parameter`,"'addAttachments', 'updateAttachments' and 'deleteAttachments' are applicable only if the layer supports global ids. See: 'capabilities.editing.supportsGlobalId'");if(!r?.globalIdUsed&&o)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${i}:invalid-parameter`,"When 'addAttachments', 'updateAttachments' or 'deleteAttachments' is specified, globalIdUsed should be set to true")}(t,o,r,!!i,!!n,`${e.type}-layer`),!o.data.isVersioned&&r?.gdbVersion)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${e.type}-layer:invalid-parameter`,"'gdbVersion' is applicable only if the layer supports versioned data. See: 'capabilities.data.isVersioned'");if(!o.editing.supportsRollbackOnFailure&&r?.rollbackOnFailureEnabled)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${e.type}-layer:invalid-parameter`,"This layer does not support 'rollbackOnFailureEnabled' parameter. See: 'capabilities.editing.supportsRollbackOnFailure'");const l={...r};if(null!=l.rollbackOnFailureEnabled||o.editing.supportsRollbackOnFailure||(l.rollbackOnFailureEnabled=!0),l.rollbackOnFailureEnabled||"original-and-current-features"!==l.returnServiceEditsOption||(!1===l.rollbackOnFailureEnabled&&_core_Logger_js__WEBPACK_IMPORTED_MODULE_4__.A.getLogger("esri.layers.graphics.editingSupport").warn(`${e.type}-layer:invalid-parameter`,"'original-and-current-features' is valid for 'returnServiceEditsOption' only when 'rollBackOnFailure' is true, but 'rollBackOnFailure' was set to false. 'rollBackOnFailure' has been overwrritten and set to true."),l.rollbackOnFailureEnabled=!0),!o.editing.supportsReturnServiceEditsInSourceSpatialReference&&l.returnServiceEditsInSourceSR)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${e.type}-layer:invalid-parameter`,"This layer does not support 'returnServiceEditsInSourceSR' parameter. See: 'capabilities.editing.supportsReturnServiceEditsInSourceSpatialReference'");if(l.returnServiceEditsInSourceSR&&"original-and-current-features"!==l.returnServiceEditsOption)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${e.type}-layer:invalid-parameter`,"'returnServiceEditsInSourceSR' is valid only when 'returnServiceEditsOption' is set to 'original-and-current-features'");const u=function B(e,t,r){const s=function k(e){return{addFeatures:Array.from(e?.addFeatures??[]),updateFeatures:Array.from(e?.updateFeatures??[]),deleteFeatures:e&&_core_Collection_js__WEBPACK_IMPORTED_MODULE_1__.A.isCollection(e.deleteFeatures)?e.deleteFeatures.toArray():e.deleteFeatures||[],addAttachments:e.addAttachments||[],updateAttachments:e.updateAttachments||[],deleteAttachments:e.deleteAttachments||[]}}(e);if(s.addFeatures?.length&&!t.operations.supportsAdd)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${r}:unsupported-operation`,"Layer does not support adding features.");if(s.updateFeatures?.length&&!t.operations.supportsUpdate)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${r}:unsupported-operation`,"Layer does not support updating features.");if(s.deleteFeatures?.length&&!t.operations.supportsDelete)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${r}:unsupported-operation`,"Layer does not support deleting features.");return s.addFeatures=s.addFeatures.map(D),s.updateFeatures=s.updateFeatures.map(D),s.addAssetFeatures=[],s}(t,o,`${e.type}-layer`),p=r?.globalIdUsed||d,c=e.fields.filter((e=>"big-integer"===e.type||"oid"===e.type&&(e.length||0)>=8));if(p){const{globalIdField:t}=e;if(null==t)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${e.type}-layer:invalid-parameter`,"Layer does not specify a global id field.");u.addFeatures.forEach((e=>function U(e,t){const{attributes:a}=e;null==a[t]&&(a[t]=(0,_core_uuid_js__WEBPACK_IMPORTED_MODULE_7__.yS)())}(e,t)))}return u.addFeatures.forEach((t=>function S(e,t,a,r){$(e,t,a,r),E(e,t)}(t,e,p,c))),u.updateFeatures.forEach((t=>function j(e,t,r,s){$(e,t,r,s),E(e,t);const o=(0,_support_layerUtils_js__WEBPACK_IMPORTED_MODULE_11__.BR)(t);if("geometry"in e&&null!=e.geometry&&!o?.editing.supportsGeometryUpdate)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${t.type}-layer:unsupported-operation`,"Layer does not support geometry updates.")}(t,e,p,c))),u.deleteFeatures.forEach((t=>function R(e,t,a,r){$(e,t,a,r)}(t,e,p,c))),u.addAttachments.forEach((t=>O(t,e))),u.updateAttachments.forEach((t=>O(t,e))),d&&await async function G(e,t){if(null==t.infoFor3D)return;const{infoFor3D:r}=t,s=(0,_support_infoFor3D_js__WEBPACK_IMPORTED_MODULE_12__.R_)("model/gltf-binary",r.supportedFormats)??(0,_support_infoFor3D_js__WEBPACK_IMPORTED_MODULE_12__.E1)("glb",r.supportedFormats);if(!s||!r.editFormats.includes(s))throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${t.type}-layer:binary-gltf-asset-not-supported`,"3DObjectFeatureLayer requires binary glTF (.glb) support for updating mesh geometry.");e.addAssetFeatures??=[];const{addAssetFeatures:o}=e;for(const a of e.addFeatures??[])V(a)&&o.push(a);for(const a of e.updateFeatures??[])V(a)&&o.push(a)}(u,e),{edits:await L(u),options:l}}(e,r,s);return o.addFeatures?.length||o.updateFeatures?.length||o.deleteFeatures?.length||o.addAttachments?.length||o.updateAttachments?.length||o.deleteAttachments?.length?{edits:o,results:await t.applyEdits(o,i)}:{edits:o,results:{addFeatureResults:[],updateFeatureResults:[],deleteFeatureResults:[],addAttachmentResults:[],updateAttachmentResults:[],deleteAttachmentResults:[]}}}(e,t,a,s),d=e=>e.filter((e=>!e.error)).map(_core_lang_js__WEBPACK_IMPORTED_MODULE_3__.o8),l={edits:n,addedFeatures:d(o.addFeatureResults),updatedFeatures:d(o.updateFeatureResults),deletedFeatures:d(o.deleteFeatureResults),addedAttachments:d(o.addAttachmentResults),updatedAttachments:d(o.updateAttachmentResults),deletedAttachments:d(o.deleteAttachmentResults),exceededTransferLimit:!1,historicMoment:o.editMoment?new Date(o.editMoment):null,globalIdToObjectId:s.globalIdToObjectId};return o.editedFeatureResults?.length&&(l.editedFeatures=o.editedFeatureResults),i.resolve(l),o}catch(p){throw i.reject(p),p}}function $(e,t,r,s){if(r){if("attributes"in e&&!e.attributes[t.globalIdField])throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${t.type}-layer:invalid-parameter`,`Feature should have '${t.globalIdField}' when 'globalIdUsed' is true`);if(!("attributes"in e)&&!e.globalId)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${t.type}-layer:invalid-parameter`,"`'globalId' of the feature should be passed when 'globalIdUsed' is true")}if(s.length&&"attributes"in e)for(const o of s){const r=e.attributes[o.name];if(void 0!==r&&!(0,_support_fieldUtils_js__WEBPACK_IMPORTED_MODULE_10__.OG)(o,r))throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${t.type}-layer:invalid-parameter`,`Big-integer field '${o.name}' of the feature must be less than ${Number.MAX_SAFE_INTEGER}`,{feature:e})}if("geometry"in e&&null!=e.geometry){if(e.geometry.hasZ&&!1===t.capabilities?.data.supportsZ)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${t.type}-layer:z-unsupported`,"Layer does not support z values while feature has z values.");if(e.geometry.hasM&&!1===t.capabilities?.data.supportsM)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${t.type}-layer:m-unsupported`,"Layer does not support m values while feature has m values.")}}function E(e,t){if("geometry"in e&&"mesh"===e.geometry?.type&&null!=t.infoFor3D){const{geometry:r}=e;if(r.vertexSpace.isGeoreferenced)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${t.type}-layer:georeferenced-mesh-unsupported`,"Uploading georeferenced meshes to a layer is not supported.")}}function O(e,t){const{feature:r,attachment:s}=e;if(!r||"attributes"in r&&!r.attributes[t.globalIdField])throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${t.type}-layer:invalid-parameter`,"Attachment should have reference to a feature with 'globalId'");if(!("attributes"in r)&&!r.globalId)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${t.type}-layer:invalid-parameter`,"Attachment should have reference to 'globalId' of the parent feature");if(!s.globalId)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${t.type}-layer:invalid-parameter`,"Attachment should have 'globalId'");if(!s.data&&!s.uploadId)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${t.type}-layer:invalid-parameter`,"Attachment should have 'data' or 'uploadId'");if(!(s.data instanceof File&&s.data.name||s.name))throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${t.type}-layer:invalid-parameter`,"'name' is required when attachment is specified as Base64 encoded string using 'data'");if(!t.capabilities?.editing.supportsUploadWithItemId&&s.uploadId)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${t.type}-layer:invalid-parameter`,"This layer does not support 'uploadId' parameter. See: 'capabilities.editing.supportsUploadWithItemId'");if("string"==typeof s.data){const e=(0,_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_6__.r$)(s.data);if(e&&!e.isBase64)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${t.type}-layer:invalid-parameter`,"Attachment 'data' should be a Blob, File or Base64 encoded string")}}async function L(e){const t=e.addFeatures??[],a=e.updateFeatures??[],r=t.concat(a).map((e=>e.geometry)),s=await(0,_geometry_support_normalizeUtils_js__WEBPACK_IMPORTED_MODULE_8__.el)(r),o=t.length,i=a.length;return s.slice(0,o).forEach(((e,a)=>t[a].geometry=e)),s.slice(o,o+i).forEach(((e,t)=>a[t].geometry=e)),e}function D(t){const a=new _Graphic_js__WEBPACK_IMPORTED_MODULE_0__.A;return t.attributes||(t.attributes={}),a.geometry=t.geometry,a.attributes=t.attributes,a}function V(e){return"mesh"===e?.geometry?.type}function M(e,t,r,s){if(!y(t))throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${e.type}-layer:no-editing-support`,"Layer source does not support applyEdits capability",{layer:e});if(!t.uploadAssets)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__.A(`${e.type}-layer:no-asset-upload-support`,"Layer source does not support uploadAssets capability",{layer:e});return t.uploadAssets(r,s)}}}]);