"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[895],{"./node_modules/@arcgis/core/rest/query/executeForTopIds.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{executeForTopIds:()=>s});var _utils_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/rest/utils.js"),_operations_queryTopFeatures_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/rest/query/operations/queryTopFeatures.js"),_support_TopFeaturesQuery_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/rest/support/TopFeaturesQuery.js");async function s(s,e,p){const a=(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.en)(s);return(await(0,_operations_queryTopFeatures_js__WEBPACK_IMPORTED_MODULE_1__.w7)(a,_support_TopFeaturesQuery_js__WEBPACK_IMPORTED_MODULE_2__.Z.from(e),{...p})).data.objectIds}},"./node_modules/@arcgis/core/rest/query/operations/queryTopFeatures.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{IJ:()=>d,m5:()=>p,vB:()=>a,w7:()=>m});var _request_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/request.js"),_core_maybe_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/urlUtils.js"),_geometry_support_jsonUtils_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/jsonUtils.js"),_geometry_support_normalizeUtils_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/geometry/support/normalizeUtils.js"),_operations_urlUtils_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@arcgis/core/rest/operations/urlUtils.js"),_queryZScale_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/rest/query/operations/queryZScale.js");const l="Layer does not support extent calculation.";function y(t,r){const o=t.geometry,i=t.toJSON(),s=i;if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_5__.pC)(o)&&(s.geometry=JSON.stringify(o),s.geometryType=(0,_geometry_support_jsonUtils_js__WEBPACK_IMPORTED_MODULE_2__.Ji)(o),s.inSR=o.spatialReference.wkid||JSON.stringify(o.spatialReference)),i.topFilter?.groupByFields&&(s.topFilter.groupByFields=i.topFilter.groupByFields.join(",")),i.topFilter?.orderByFields&&(s.topFilter.orderByFields=i.topFilter.orderByFields.join(",")),i.topFilter&&(s.topFilter=JSON.stringify(s.topFilter)),i.objectIds&&(s.objectIds=i.objectIds.join(",")),i.orderByFields&&(s.orderByFields=i.orderByFields.join(",")),i.outFields&&!(r?.returnCountOnly||r?.returnExtentOnly||r?.returnIdsOnly)?i.outFields.includes("*")?s.outFields="*":s.outFields=i.outFields.join(","):delete s.outFields,i.outSR?s.outSR=i.outSR.wkid||JSON.stringify(i.outSR):o&&i.returnGeometry&&(s.outSR=s.inSR),i.returnGeometry&&delete i.returnGeometry,i.timeExtent){const t=i.timeExtent,{start:e,end:r}=t;null==e&&null==r||(s.time=e===r?e:`${e??"null"},${r??"null"}`),delete i.timeExtent}return s}async function d(t,e,r,o){const n=await c(t,e,"json",o);return(0,_queryZScale_js__WEBPACK_IMPORTED_MODULE_4__.p)(e,r,n.data),n}async function m(t,r,o){return(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_5__.pC)(r.timeExtent)&&r.timeExtent.isEmpty?{data:{objectIds:[]}}:c(t,r,"json",o,{returnIdsOnly:!0})}async function p(t,r,o){return(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_5__.pC)(r.timeExtent)&&r.timeExtent.isEmpty?{data:{count:0,extent:null}}:c(t,r,"json",o,{returnExtentOnly:!0,returnCountOnly:!0}).then((t=>{const e=t.data;if(e.hasOwnProperty("extent"))return t;if(e.features)throw new Error(l);if(e.hasOwnProperty("count"))throw new Error(l);return t}))}function a(t,r,o){return(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_5__.pC)(r.timeExtent)&&r.timeExtent.isEmpty?Promise.resolve({data:{count:0}}):c(t,r,"json",o,{returnIdsOnly:!0,returnCountOnly:!0})}function c(n,u,l,d={},m={}){const p="string"==typeof n?(0,_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_1__.mN)(n):n,a=u.geometry?[u.geometry]:[];return d.responseType="pbf"===l?"array-buffer":"json",(0,_geometry_support_normalizeUtils_js__WEBPACK_IMPORTED_MODULE_3__.aX)(a,null,d).then((r=>{const n=r&&r[0];(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_5__.pC)(n)&&((u=u.clone()).geometry=n);const i=(0,_operations_urlUtils_js__WEBPACK_IMPORTED_MODULE_6__.A)({...p.query,f:l,...m,...y(u,m)});return(0,_request_js__WEBPACK_IMPORTED_MODULE_0__.default)((0,_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_1__.v_)(p.path,"queryTopFeatures"),{...d,query:{...i,...d.query}})}))}}}]);