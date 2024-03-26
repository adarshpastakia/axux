"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[32481],{"./node_modules/@arcgis/core/arcade/functions/featuresetgeom.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{registerFunctions:()=>R});var _executionError_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/arcade/executionError.js"),_kernel_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/arcade/kernel.js"),_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/chunks/languageUtils.js"),_featureset_actions_SpatialFilter_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/arcade/featureset/actions/SpatialFilter.js"),_featureset_sources_Empty_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/arcade/featureset/sources/Empty.js"),_geometry_Geometry_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/geometry/Geometry.js"),_geometry_geometryEngineAsync_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@arcgis/core/geometry/geometryEngineAsync.js");function y(e){return e instanceof _geometry_Geometry_js__WEBPACK_IMPORTED_MODULE_5__.A}function S(i,a,c,S){return S(i,a,(async(S,R,v)=>{if(v.length<2)throw new _executionError_js__WEBPACK_IMPORTED_MODULE_0__.D$(i,_executionError_js__WEBPACK_IMPORTED_MODULE_0__.TX.WrongNumberOfParameters,a);if(null===(v=(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.F)(v))[0]&&null===v[1])return!1;if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.u)(v[0])){if(v[1]instanceof _geometry_Geometry_js__WEBPACK_IMPORTED_MODULE_5__.A)return new _featureset_actions_SpatialFilter_js__WEBPACK_IMPORTED_MODULE_3__.A({parentfeatureset:v[0],relation:c,relationGeom:v[1]});if(null===v[1])return new _featureset_sources_Empty_js__WEBPACK_IMPORTED_MODULE_4__.A({parentfeatureset:v[0]});throw new _executionError_js__WEBPACK_IMPORTED_MODULE_0__.D$(i,_executionError_js__WEBPACK_IMPORTED_MODULE_0__.TX.InvalidParameter,a)}if(y(v[0])){if(y(v[1])){switch(c){case"esriSpatialRelEnvelopeIntersects":return(0,_geometry_geometryEngineAsync_js__WEBPACK_IMPORTED_MODULE_6__.HY)((0,_kernel_js__WEBPACK_IMPORTED_MODULE_1__.Yc)(v[0]),(0,_kernel_js__WEBPACK_IMPORTED_MODULE_1__.Yc)(v[1]));case"esriSpatialRelIntersects":return(0,_geometry_geometryEngineAsync_js__WEBPACK_IMPORTED_MODULE_6__.HY)(v[0],v[1]);case"esriSpatialRelContains":return(0,_geometry_geometryEngineAsync_js__WEBPACK_IMPORTED_MODULE_6__.gR)(v[0],v[1]);case"esriSpatialRelOverlaps":return(0,_geometry_geometryEngineAsync_js__WEBPACK_IMPORTED_MODULE_6__.$f)(v[0],v[1]);case"esriSpatialRelWithin":return(0,_geometry_geometryEngineAsync_js__WEBPACK_IMPORTED_MODULE_6__.ux)(v[0],v[1]);case"esriSpatialRelTouches":return(0,_geometry_geometryEngineAsync_js__WEBPACK_IMPORTED_MODULE_6__.yI)(v[0],v[1]);case"esriSpatialRelCrosses":return(0,_geometry_geometryEngineAsync_js__WEBPACK_IMPORTED_MODULE_6__.NN)(v[0],v[1])}throw new _executionError_js__WEBPACK_IMPORTED_MODULE_0__.D$(i,_executionError_js__WEBPACK_IMPORTED_MODULE_0__.TX.InvalidParameter,a)}if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.u)(v[1]))return new _featureset_actions_SpatialFilter_js__WEBPACK_IMPORTED_MODULE_3__.A({parentfeatureset:v[1],relation:c,relationGeom:v[0]});if(null===v[1])return!1;throw new _executionError_js__WEBPACK_IMPORTED_MODULE_0__.D$(i,_executionError_js__WEBPACK_IMPORTED_MODULE_0__.TX.InvalidParameter,a)}if(null!==v[0])throw new _executionError_js__WEBPACK_IMPORTED_MODULE_0__.D$(i,_executionError_js__WEBPACK_IMPORTED_MODULE_0__.TX.InvalidParameter,a);return(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.u)(v[1])?new _featureset_sources_Empty_js__WEBPACK_IMPORTED_MODULE_4__.A({parentfeatureset:v[1]}):!(v[1]instanceof _geometry_Geometry_js__WEBPACK_IMPORTED_MODULE_5__.A||null===v[1])&&void 0}))}function R(t){"async"===t.mode&&(t.functions.intersects=function(e,n){return S(e,n,"esriSpatialRelIntersects",t.standardFunctionAsync)},t.functions.envelopeintersects=function(e,n){return S(e,n,"esriSpatialRelEnvelopeIntersects",t.standardFunctionAsync)},t.signatures.push({name:"envelopeintersects",min:2,max:2}),t.functions.contains=function(e,n){return S(e,n,"esriSpatialRelContains",t.standardFunctionAsync)},t.functions.overlaps=function(e,n){return S(e,n,"esriSpatialRelOverlaps",t.standardFunctionAsync)},t.functions.within=function(e,n){return S(e,n,"esriSpatialRelWithin",t.standardFunctionAsync)},t.functions.touches=function(e,n){return S(e,n,"esriSpatialRelTouches",t.standardFunctionAsync)},t.functions.crosses=function(e,n){return S(e,n,"esriSpatialRelCrosses",t.standardFunctionAsync)},t.functions.relate=function(u,f){return t.standardFunctionAsync(u,f,((t,p,m)=>{if(m=(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.F)(m),(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.E)(m,3,3,u,f),y(m[0])&&y(m[1]))return(0,_geometry_geometryEngineAsync_js__WEBPACK_IMPORTED_MODULE_6__.c7)(m[0],m[1],(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.j)(m[2]));if(m[0]instanceof _geometry_Geometry_js__WEBPACK_IMPORTED_MODULE_5__.A&&null===m[1])return!1;if(m[1]instanceof _geometry_Geometry_js__WEBPACK_IMPORTED_MODULE_5__.A&&null===m[0])return!1;if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.u)(m[0])&&null===m[1])return new _featureset_sources_Empty_js__WEBPACK_IMPORTED_MODULE_4__.A({parentfeatureset:m[0]});if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.u)(m[1])&&null===m[0])return new _featureset_sources_Empty_js__WEBPACK_IMPORTED_MODULE_4__.A({parentfeatureset:m[1]});if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.u)(m[0])&&m[1]instanceof _geometry_Geometry_js__WEBPACK_IMPORTED_MODULE_5__.A)return m[0].relate(m[1],(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.j)(m[2]));if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.u)(m[1])&&m[0]instanceof _geometry_Geometry_js__WEBPACK_IMPORTED_MODULE_5__.A)return m[1].relate(m[0],(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.j)(m[2]));if(null===m[0]&&null===m[1])return!1;throw new _executionError_js__WEBPACK_IMPORTED_MODULE_0__.D$(u,_executionError_js__WEBPACK_IMPORTED_MODULE_0__.TX.InvalidParameter,f)}))})}}}]);