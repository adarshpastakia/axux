"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[70635,87805],{"./node_modules/@arcgis/core/geometry/geometryAdapters/hydrated.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{hydratedAdapter:()=>r});var _Extent_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/geometry/Extent.js"),_Multipoint_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/geometry/Multipoint.js"),_Point_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/geometry/Point.js"),_Polygon_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/geometry/Polygon.js"),_Polyline_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/geometry/Polyline.js");const r={convertToGEGeometry:function s(e,n){if(null==n)return null;let t="cache"in n?n.cache._geVersion:void 0;return null==t&&(t=e.convertJSONToGeometry(n),"cache"in n&&(n.cache._geVersion=t)),t},exportPoint:function a(e,n,o){const i=e.hasZ(n),r=e.hasM(n),s=new _Point_js__WEBPACK_IMPORTED_MODULE_2__.A({x:e.getPointX(n),y:e.getPointY(n),spatialReference:o});return i&&(s.z=e.getPointZ(n)),r&&(s.m=e.getPointM(n)),s.cache._geVersion=n,s},exportPolygon:function c(e,n,t){const i=new _Polygon_js__WEBPACK_IMPORTED_MODULE_3__.A({rings:e.exportPaths(n),hasZ:e.hasZ(n),hasM:e.hasM(n),spatialReference:t});return i.cache._geVersion=n,i},exportPolyline:function h(e,n,t){const o=new _Polyline_js__WEBPACK_IMPORTED_MODULE_4__.A({paths:e.exportPaths(n),hasZ:e.hasZ(n),hasM:e.hasM(n),spatialReference:t});return o.cache._geVersion=n,o},exportMultipoint:function m(e,t,o){const i=new _Multipoint_js__WEBPACK_IMPORTED_MODULE_1__.A({hasZ:e.hasZ(t),hasM:e.hasM(t),points:e.exportPoints(t),spatialReference:o});return i.cache._geVersion=t,i},exportExtent:function x(n,t,o){const i=n.hasZ(t),r=n.hasM(t),s=new _Extent_js__WEBPACK_IMPORTED_MODULE_0__.A({xmin:n.getXMin(t),ymin:n.getYMin(t),xmax:n.getXMax(t),ymax:n.getYMax(t),spatialReference:o});if(i){const e=n.getZExtent(t);s.zmin=e.vmin,s.zmax=e.vmax}if(r){const e=n.getMExtent(t);s.mmin=e.vmin,s.mmax=e.vmax}return s.cache._geVersion=t,s}}},"./node_modules/@arcgis/core/geometry/geometryEngine.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{buffer:()=>j,changeDefaultSpatialReferenceTolerance:()=>G,clearDefaultSpatialReferenceTolerance:()=>P,clip:()=>u,contains:()=>c,convexHull:()=>R,crosses:()=>o,cut:()=>i,densify:()=>B,difference:()=>x,disjoint:()=>d,distance:()=>f,equals:()=>s,extendedSpatialReferenceInfo:()=>r,flipHorizontal:()=>V,flipVertical:()=>v,generalize:()=>z,geodesicArea:()=>k,geodesicBuffer:()=>E,geodesicDensify:()=>H,geodesicLength:()=>q,intersect:()=>S,intersectLinesToPoints:()=>C,intersects:()=>a,isSimple:()=>h,nearestCoordinate:()=>J,nearestVertex:()=>L,nearestVertices:()=>N,offset:()=>D,overlaps:()=>m,planarArea:()=>I,planarLength:()=>b,relate:()=>g,rotate:()=>T,simplify:()=>w,symmetricDifference:()=>y,touches:()=>l,union:()=>A,within:()=>p});var _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/chunks/geometryEngineBase.js"),_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/geometry/geometryAdapters/hydrated.js");function t(n){return Array.isArray(n)?n[0].spatialReference:n&&n.spatialReference}function r(e){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.extendedSpatialReferenceInfo(e)}function u(r,u){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.clip(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u)}function i(r,u){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.cut(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u)}function c(r,u){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.contains(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u)}function o(r,u){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.crosses(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u)}function f(r,u,i){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.distance(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u,i)}function s(r,u){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.equals(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u)}function a(r,u){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.intersects(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u)}function l(r,u){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.touches(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u)}function p(r,u){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.within(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u)}function d(r,u){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.disjoint(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u)}function m(r,u){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.overlaps(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u)}function g(r,u,i){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.relate(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u,i)}function h(r){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.isSimple(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r)}function w(r){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.simplify(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r)}function R(r,u=!1){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.convexHull(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u)}function x(r,u){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.difference(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u)}function y(r,u){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.symmetricDifference(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u)}function S(r,u){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.intersect(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u)}function A(r,u=null){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.union(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u)}function D(r,u,i,c,o,f){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.offset(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u,i,c,o,f)}function j(r,u,i,c=!1){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.buffer(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u,i,c)}function E(r,u,i,c,o,f){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.geodesicBuffer(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u,i,c,o,f)}function J(r,u,i=!0){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.nearestCoordinate(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u,i)}function L(r,u){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.nearestVertex(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u)}function N(r,u,i,c){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.nearestVertices(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u,i,c)}function O(n){return"xmin"in n?"center"in n?n.center:null:"x"in n?n:"extent"in n?n.extent?.center??null:null}function T(e,t,r){if(null==e)throw new F;const u=e.spatialReference;if(null==(r=r??O(e)))throw new F;const i=e.constructor.fromJSON(_chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.rotate(e,t,r));return i.spatialReference=u,i}function V(e,t){if(null==e)throw new F;const r=e.spatialReference;if(null==(t=t??O(e)))throw new F;const u=e.constructor.fromJSON(_chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.flipHorizontal(e,t));return u.spatialReference=r,u}function v(e,t){if(null==e)throw new F;const r=e.spatialReference;if(null==(t=t??O(e)))throw new F;const u=e.constructor.fromJSON(_chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.flipVertical(e,t));return u.spatialReference=r,u}function z(r,u,i,c){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.generalize(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u,i,c)}function B(r,u,i){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.densify(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u,i)}function H(r,u,i,c=0){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.geodesicDensify(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u,i,c)}function I(r,u){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.planarArea(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u)}function b(r,u){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.planarLength(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u)}function k(r,u,i){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.geodesicArea(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u,i)}function q(r,u,i){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.geodesicLength(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u,i)}function C(r,u){return _chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.intersectLinesToPoints(_geometryAdapters_hydrated_js__WEBPACK_IMPORTED_MODULE_1__.hydratedAdapter,t(r),r,u)}function G(e,t){_chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.changeDefaultSpatialReferenceTolerance(e,t)}function P(e){_chunks_geometryEngineBase_js__WEBPACK_IMPORTED_MODULE_0__.G.clearDefaultSpatialReferenceTolerance(e)}class F extends Error{constructor(){super("Illegal Argument Exception")}}}}]);