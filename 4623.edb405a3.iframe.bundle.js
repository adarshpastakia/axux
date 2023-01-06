"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[4623],{"./node_modules/@arcgis/core/portal/support/geometryServiceUtils.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{getGeometryServiceURL:()=>geometryServiceUtils_n,projectGeometry:()=>a});var config=__webpack_require__("./node_modules/@arcgis/core/config.js"),Error=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),Portal=__webpack_require__("./node_modules/@arcgis/core/portal/Portal.js"),request=__webpack_require__("./node_modules/@arcgis/core/request.js"),ensureType=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),jsonUtils=__webpack_require__("./node_modules/@arcgis/core/geometry/support/jsonUtils.js"),utils=__webpack_require__("./node_modules/@arcgis/core/rest/utils.js"),geometryService_utils=__webpack_require__("./node_modules/@arcgis/core/rest/geometryService/utils.js"),tslib_es6=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),JSONSupport=__webpack_require__("./node_modules/@arcgis/core/core/JSONSupport.js"),property=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),subclass=(__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js"));let i=class extends JSONSupport.wq{constructor(r){super(r),this.geometries=null,this.outSpatialReference=null,this.transformation=null,this.transformForward=null}toJSON(){const r=this.geometries.map((r=>r.toJSON())),t=this.geometries[0],o={};return o.outSR=this.outSpatialReference.wkid||JSON.stringify(this.outSpatialReference.toJSON()),o.inSR=t.spatialReference.wkid||JSON.stringify(t.spatialReference.toJSON()),o.geometries=JSON.stringify({geometryType:(0,jsonUtils.Ji)(t),geometries:r}),this.transformation&&(o.transformation=this.transformation.wkid||JSON.stringify(this.transformation)),null!=this.transformForward&&(o.transformForward=this.transformForward),o}};(0,tslib_es6._)([(0,property.Cb)()],i.prototype,"geometries",void 0),(0,tslib_es6._)([(0,property.Cb)({json:{read:{source:"outSR"}}})],i.prototype,"outSpatialReference",void 0),(0,tslib_es6._)([(0,property.Cb)()],i.prototype,"transformation",void 0),(0,tslib_es6._)([(0,property.Cb)()],i.prototype,"transformForward",void 0),i=(0,tslib_es6._)([(0,subclass.j)("esri.rest.support.ProjectParameters")],i);const ProjectParameters_a=i,project_i=(0,ensureType.se)(ProjectParameters_a);async function geometryServiceUtils_n(o=null,i){if(config.Z.geometryServiceUrl)return config.Z.geometryServiceUrl;if(!o)throw new Error.Z("internal:geometry-service-url-not-configured");let n;n="portal"in o?o.portal||Portal.Z.getDefault():o,await n.load({signal:i});const a=n.helperServices?.geometry?.url;if(!a)throw new Error.Z("internal:geometry-service-url-not-configured");return a}async function a(r,t,a=null,l){const c=await geometryServiceUtils_n(a,l),s=new ProjectParameters_a;s.geometries=[r],s.outSpatialReference=t;const m=await async function n(o,m,n){m=project_i(m);const u=(0,utils.en)(o),c={...u.query,f:"json",...m.toJSON()},j=m.outSpatialReference,a=(0,jsonUtils.Ji)(m.geometries[0]),f=(0,utils.lA)(c,n);return(0,request.default)(u.path+"/project",f).then((({data:{geometries:r}})=>(0,geometryService_utils.o)(r,a,j)))}(c,s,{signal:l});if(m&&Array.isArray(m)&&1===m.length)return m[0];throw new Error.Z("internal:geometry-service-projection-failed")}}}]);