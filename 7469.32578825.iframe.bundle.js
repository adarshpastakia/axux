"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[7469],{"./node_modules/@arcgis/core/layers/graphics/sources/FeatureLayerSource.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>A});var E,tslib_es6=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),Graphic=(__webpack_require__("./node_modules/@arcgis/core/geometry.js"),__webpack_require__("./node_modules/@arcgis/core/Graphic.js")),request=__webpack_require__("./node_modules/@arcgis/core/request.js"),TimeExtent=__webpack_require__("./node_modules/@arcgis/core/TimeExtent.js"),core_Error=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),has=__webpack_require__("./node_modules/@arcgis/core/core/has.js"),jsonMap=__webpack_require__("./node_modules/@arcgis/core/core/jsonMap.js"),Loadable=__webpack_require__("./node_modules/@arcgis/core/core/Loadable.js"),maybe=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),object=__webpack_require__("./node_modules/@arcgis/core/core/object.js"),promiseUtils=__webpack_require__("./node_modules/@arcgis/core/core/promiseUtils.js"),urlUtils=__webpack_require__("./node_modules/@arcgis/core/core/urlUtils.js"),property=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),subclass=(__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js")),Extent=__webpack_require__("./node_modules/@arcgis/core/geometry/Extent.js"),jsonUtils=__webpack_require__("./node_modules/@arcgis/core/geometry/support/jsonUtils.js");!function(E){E[E.PROJECT_VERTICES=1]="PROJECT_VERTICES"}(E||(E={}));var clientSideDefaults=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/sources/support/clientSideDefaults.js"),DataLayerSource=__webpack_require__("./node_modules/@arcgis/core/layers/support/source/DataLayerSource.js"),executeQueryJSON=__webpack_require__("./node_modules/@arcgis/core/rest/query/executeQueryJSON.js"),utils=__webpack_require__("./node_modules/@arcgis/core/rest/utils.js"),zscale=__webpack_require__("./node_modules/@arcgis/core/geometry/support/zscale.js"),featureConversionUtils=__webpack_require__("./node_modules/@arcgis/core/layers/graphics/featureConversionUtils.js");function n(e,t){return t}function pbfJSONFeatureSet_a(e,t,r,s){switch(r){case 0:return c(e,t+s,0);case 1:return"lowerLeft"===e.originPosition?c(e,t+s,1):function l({translate:e,scale:t},r,s){return e[s]-r*t[s]}(e,t+s,1)}}function h(e,t,r,s){return 2===r?c(e,t,2):pbfJSONFeatureSet_a(e,t,r,s)}function u(e,t,r,s){return 2===r?c(e,t,3):pbfJSONFeatureSet_a(e,t,r,s)}function d(e,t,r,s){return 3===r?c(e,t,3):h(e,t,r,s)}function c({translate:e,scale:t},r,s){return e[s]+r*t[s]}class pbfJSONFeatureSet_f{constructor(e){this._options=e,this.geometryTypes=["esriGeometryPoint","esriGeometryMultipoint","esriGeometryPolyline","esriGeometryPolygon"],this._previousCoordinate=[0,0],this._transform=null,this._applyTransform=n,this._lengths=[],this._currentLengthIndex=0,this._toAddInCurrentPath=0,this._vertexDimension=0,this._coordinateBuffer=null,this._coordinateBufferPtr=0,this._attributesConstructor=class{}}createFeatureResult(){return{fields:[],features:[]}}finishFeatureResult(t){if(this._options.applyTransform&&(t.transform=null),this._attributesConstructor=class{},this._coordinateBuffer=null,this._lengths.length=0,!t.hasZ)return;const r=(0,zscale.k)(t.geometryType,this._options.sourceSpatialReference,t.spatialReference);if(!(0,maybe.Wi)(r))for(const e of t.features)r(e.geometry)}createSpatialReference(){return{}}addField(e,r){const s=e.fields;(0,maybe.O3)(s),s.push(r);const o=s.map((e=>e.name));this._attributesConstructor=function(){for(const e of o)this[e]=null}}addFeature(e,t){e.features.push(t)}prepareFeatures(e){switch(this._transform=e.transform,this._options.applyTransform&&e.transform&&(this._applyTransform=this._deriveApplyTransform(e)),this._vertexDimension=2,e.hasZ&&this._vertexDimension++,e.hasM&&this._vertexDimension++,e.geometryType){case"esriGeometryPoint":this.addCoordinate=(e,t,r)=>this.addCoordinatePoint(e,t,r),this.createGeometry=e=>this.createPointGeometry(e);break;case"esriGeometryPolygon":this.addCoordinate=(e,t,r)=>this._addCoordinatePolygon(e,t,r),this.createGeometry=e=>this._createPolygonGeometry(e);break;case"esriGeometryPolyline":this.addCoordinate=(e,t,r)=>this._addCoordinatePolyline(e,t,r),this.createGeometry=e=>this._createPolylineGeometry(e);break;case"esriGeometryMultipoint":this.addCoordinate=(e,t,r)=>this._addCoordinateMultipoint(e,t,r),this.createGeometry=e=>this._createMultipointGeometry(e)}}createFeature(){return this._lengths.length=0,this._currentLengthIndex=0,this._previousCoordinate[0]=0,this._previousCoordinate[1]=0,this._coordinateBuffer=null,this._coordinateBufferPtr=0,{attributes:new this._attributesConstructor}}allocateCoordinates(){}addLength(e,t,r){0===this._lengths.length&&(this._toAddInCurrentPath=t),this._lengths.push(t)}addQueryGeometry(e,t){const{queryGeometry:r,queryGeometryType:s}=t,n=(0,featureConversionUtils.$g)(r.clone(),r,!1,!1,this._transform),a=(0,featureConversionUtils.di)(n,s,!1,!1);e.queryGeometryType=s,e.queryGeometry={...a}}createPointGeometry(e){const t={x:0,y:0,spatialReference:e.spatialReference};return e.hasZ&&(t.z=0),e.hasM&&(t.m=0),t}addCoordinatePoint(e,t,s){const o=(0,maybe.s3)(this._transform,"transform");switch(t=this._applyTransform(o,t,s,0),s){case 0:e.x=t;break;case 1:e.y=t;break;case 2:"z"in e?e.z=t:e.m=t;break;case 3:e.m=t}}_transformPathLikeValue(e,t){let s=0;t<=1&&(s=this._previousCoordinate[t],this._previousCoordinate[t]+=e);const o=(0,maybe.s3)(this._transform,"transform");return this._applyTransform(o,e,t,s)}_addCoordinatePolyline(e,t,r){this._dehydratedAddPointsCoordinate(e.paths,t,r)}_addCoordinatePolygon(e,t,r){this._dehydratedAddPointsCoordinate(e.rings,t,r)}_addCoordinateMultipoint(e,t,r){0===r&&e.points.push([]);const s=this._transformPathLikeValue(t,r);e.points[e.points.length-1].push(s)}_createPolygonGeometry(e){return{rings:[[]],spatialReference:e.spatialReference,hasZ:!!e.hasZ,hasM:!!e.hasM}}_createPolylineGeometry(e){return{paths:[[]],spatialReference:e.spatialReference,hasZ:!!e.hasZ,hasM:!!e.hasM}}_createMultipointGeometry(e){return{points:[],spatialReference:e.spatialReference,hasZ:!!e.hasZ,hasM:!!e.hasM}}_dehydratedAddPointsCoordinate(e,t,r){0===r&&0==this._toAddInCurrentPath--&&(e.push([]),this._toAddInCurrentPath=this._lengths[++this._currentLengthIndex]-1,this._previousCoordinate[0]=0,this._previousCoordinate[1]=0);const s=this._transformPathLikeValue(t,r),o=e[e.length-1];0===r&&(this._coordinateBufferPtr=0,this._coordinateBuffer=new Array(this._vertexDimension),o.push(this._coordinateBuffer)),this._coordinateBuffer[this._coordinateBufferPtr++]=s}_deriveApplyTransform(e){const{hasZ:t,hasM:r}=e;return t&&r?d:t?h:r?u:pbfJSONFeatureSet_a}}var query=__webpack_require__("./node_modules/@arcgis/core/rest/query/operations/query.js"),FeatureSet=__webpack_require__("./node_modules/@arcgis/core/rest/support/FeatureSet.js"),Query=__webpack_require__("./node_modules/@arcgis/core/rest/support/Query.js");async function executeQueryPBF_n(o,s,n){const p=(0,utils.en)(o),i={...n},u=Query.Z.from(s),m=!u.quantizationParameters,{data:f}=await(0,query.executeQueryPBF)(p,u,new pbfJSONFeatureSet_f({sourceSpatialReference:u.sourceSpatialReference,applyTransform:m}),i);return f}var kernel=__webpack_require__("./node_modules/@arcgis/core/kernel.js"),operations_urlUtils=__webpack_require__("./node_modules/@arcgis/core/rest/operations/urlUtils.js"),AttachmentInfo=__webpack_require__("./node_modules/@arcgis/core/rest/query/support/AttachmentInfo.js");function queryAttachments_n(t){const o=t.toJSON();return o.attachmentTypes&&(o.attachmentTypes=o.attachmentTypes.join(",")),o.keywords&&(o.keywords=o.keywords.join(",")),o.globalIds&&(o.globalIds=o.globalIds.join(",")),o.objectIds&&(o.objectIds=o.objectIds.join(",")),o.size&&(o.size=o.size.join(",")),o}function queryAttachments_a(o,r){const n={};for(const a of o){const{parentObjectId:o,parentGlobalId:c,attachmentInfos:i}=a;for(const a of i){const{id:i}=a,m=(0,urlUtils.qg)((0,kernel.Dp)(`${r}/${o}/attachments/${i}`)),p=AttachmentInfo.Z.fromJSON(a);p.set({url:m,parentObjectId:o,parentGlobalId:c}),n[o]?n[o].push(p):n[o]=[p]}}return n}var AttachmentQuery=__webpack_require__("./node_modules/@arcgis/core/rest/support/AttachmentQuery.js");async function executeAttachmentQuery_a(a,m,n){const s=(0,utils.en)(a);return function queryAttachments_c(t,e,s){let a={query:(0,operations_urlUtils.A)({...t.query,f:"json",...queryAttachments_n(e)})};return s&&(a={...s,...a,query:{...s.query,...a.query}}),(0,request.default)(t.path+"/queryAttachments",a)}(s,AttachmentQuery.Z.from(m),{...n}).then((t=>queryAttachments_a(t.data.attachmentGroups,s.path)))}var executeForCount=__webpack_require__("./node_modules/@arcgis/core/rest/query/executeForCount.js");var executeForIds=__webpack_require__("./node_modules/@arcgis/core/rest/query/executeForIds.js");function queryRelatedRecords_o(e,t){const o=e.toJSON();return o.objectIds&&(o.objectIds=o.objectIds.join(",")),o.orderByFields&&(o.orderByFields=o.orderByFields.join(",")),o.outFields&&!t?.returnCountOnly?o.outFields.includes("*")?o.outFields="*":o.outFields=o.outFields.join(","):delete o.outFields,o.outSpatialReference&&(o.outSR=o.outSR.wkid||JSON.stringify(o.outSR.toJSON()),delete o.outSpatialReference),o.dynamicDataSource&&(o.layer=JSON.stringify({source:o.dynamicDataSource}),delete o.dynamicDataSource),o}async function queryRelatedRecords_s(r,n,s={},a){const d=(0,operations_urlUtils.A)({...r.query,f:"json",...a,...queryRelatedRecords_o(n,a)});return(0,request.default)(r.path+"/queryRelatedRecords",{...s,query:{...s.query,...d}})}var RelationshipQuery=__webpack_require__("./node_modules/@arcgis/core/rest/support/RelationshipQuery.js");async function executeRelationshipQuery_n(e,n,u){n=RelationshipQuery.Z.from(n);return async function r(e,t,o){const r=await queryRelatedRecords_s(e,t,o),n=r.data,a=n.geometryType,d=n.spatialReference,c={};for(const s of n.relatedRecordGroups){const e={fields:void 0,objectIdFieldName:void 0,geometryType:a,spatialReference:d,hasZ:!!n.hasZ,hasM:!!n.hasM,features:s.relatedRecords};if(null!=s.objectId)c[s.objectId]=e;else for(const t in s)s.hasOwnProperty(t)&&"relatedRecords"!==t&&(c[s[t]]=e)}return{...r,data:c}}((0,utils.en)(e),n,u).then((t=>{const r=t.data,e={};return Object.keys(r).forEach((t=>e[t]=FeatureSet.default.fromJSON(r[t]))),e}))}async function executeRelationshipQuery_u(r,o,n){o=RelationshipQuery.Z.from(o);return async function queryRelatedRecords_n(e,t,o){const r=await queryRelatedRecords_s(e,t,o,{returnCountOnly:!0}),n=r.data,a={};for(const s of n.relatedRecordGroups)null!=s.objectId&&(a[s.objectId]=s.count);return{...r,data:a}}((0,utils.en)(r),o,{...n}).then((t=>t.data))}var normalizeUtils=__webpack_require__("./node_modules/@arcgis/core/geometry/support/normalizeUtils.js"),queryZScale=__webpack_require__("./node_modules/@arcgis/core/rest/query/operations/queryZScale.js");function y(t,r){const o=t.geometry,i=t.toJSON(),s=i;if((0,maybe.pC)(o)&&(s.geometry=JSON.stringify(o),s.geometryType=(0,jsonUtils.Ji)(o),s.inSR=o.spatialReference.wkid||JSON.stringify(o.spatialReference)),i.topFilter?.groupByFields&&(s.topFilter.groupByFields=i.topFilter.groupByFields.join(",")),i.topFilter?.orderByFields&&(s.topFilter.orderByFields=i.topFilter.orderByFields.join(",")),i.topFilter&&(s.topFilter=JSON.stringify(s.topFilter)),i.objectIds&&(s.objectIds=i.objectIds.join(",")),i.orderByFields&&(s.orderByFields=i.orderByFields.join(",")),i.outFields&&!(r?.returnCountOnly||r?.returnExtentOnly||r?.returnIdsOnly)?i.outFields.includes("*")?s.outFields="*":s.outFields=i.outFields.join(","):delete s.outFields,i.outSR?s.outSR=i.outSR.wkid||JSON.stringify(i.outSR):o&&i.returnGeometry&&(s.outSR=s.inSR),i.returnGeometry&&delete i.returnGeometry,i.timeExtent){const t=i.timeExtent,{start:e,end:r}=t;null==e&&null==r||(s.time=e===r?e:`${e??"null"},${r??"null"}`),delete i.timeExtent}return s}function queryTopFeatures_c(n,u,l,d={},m={}){const p="string"==typeof n?(0,urlUtils.mN)(n):n,a=u.geometry?[u.geometry]:[];return d.responseType="pbf"===l?"array-buffer":"json",(0,normalizeUtils.aX)(a,null,d).then((r=>{const n=r&&r[0];(0,maybe.pC)(n)&&((u=u.clone()).geometry=n);const i=(0,operations_urlUtils.A)({...p.query,f:l,...m,...y(u,m)});return(0,request.default)((0,urlUtils.v_)(p.path,"queryTopFeatures"),{...d,query:{...i,...d.query}})}))}var TopFeaturesQuery=__webpack_require__("./node_modules/@arcgis/core/rest/support/TopFeaturesQuery.js");async function executeTopFeaturesQuery_s(s,p,u,a){const m=(0,utils.en)(s),i={...a},{data:f}=await async function queryTopFeatures_d(t,e,r,o){const n=await queryTopFeatures_c(t,e,"json",o);return(0,queryZScale.p)(e,r,n.data),n}(m,TopFeaturesQuery.Z.from(p),u,i);return FeatureSet.default.fromJSON(f)}async function executeForTopIds_s(s,e,p){const a=(0,utils.en)(s);return(await async function queryTopFeatures_m(t,r,o){return(0,maybe.pC)(r.timeExtent)&&r.timeExtent.isEmpty?{data:{objectIds:[]}}:queryTopFeatures_c(t,r,"json",o,{returnIdsOnly:!0})}(a,TopFeaturesQuery.Z.from(e),{...p})).data.objectIds}async function executeForTopExtents_m(m,s,n){const p=(0,utils.en)(m),a=await async function queryTopFeatures_p(t,r,o){return(0,maybe.pC)(r.timeExtent)&&r.timeExtent.isEmpty?{data:{count:0,extent:null}}:queryTopFeatures_c(t,r,"json",o,{returnExtentOnly:!0,returnCountOnly:!0}).then((t=>{const e=t.data;if(e.hasOwnProperty("extent"))return t;if(e.features)throw new Error("Layer does not support extent calculation.");if(e.hasOwnProperty("count"))throw new Error("Layer does not support extent calculation.");return t}))}(p,TopFeaturesQuery.Z.from(s),{...n});return{count:a.data.count,extent:Extent.Z.fromJSON(a.data.extent)}}async function executeForTopCount_s(s,e,p){const u=(0,utils.en)(s);return(await function queryTopFeatures_a(t,r,o){return(0,maybe.pC)(r.timeExtent)&&r.timeExtent.isEmpty?Promise.resolve({data:{count:0}}):queryTopFeatures_c(t,r,"json",o,{returnIdsOnly:!0,returnCountOnly:!0})}(u,TopFeaturesQuery.Z.from(e),{...p})).data.count}var Accessor=__webpack_require__("./node_modules/@arcgis/core/core/Accessor.js");let i=class extends Accessor.Z{constructor(...r){super(...r),this.requestOptions=null,this.url=null}normalizeCtorArgs(r,s){return"string"!=typeof r?r:{url:r,...s}}get parsedUrl(){return this._parseUrl(this.url)}_parseUrl(r){return(0,urlUtils.mN)(r)}_encode(r,s,t){const e={};for(const o in r){if("declaredClass"===o)continue;const i=r[o];if(null!=i&&"function"!=typeof i)if(Array.isArray(i)){e[o]=[];for(let r=0;r<i.length;r++)e[o][r]=this._encode(i[r])}else if("object"==typeof i)if(i.toJSON){const r=i.toJSON(t&&t[o]);e[o]=s?r:JSON.stringify(r)}else e[o]=s?i:JSON.stringify(i);else e[o]=i}return e}};(0,tslib_es6._)([(0,property.Cb)({readOnly:!0})],i.prototype,"parsedUrl",null),(0,tslib_es6._)([(0,property.Cb)()],i.prototype,"requestOptions",void 0),(0,tslib_es6._)([(0,property.Cb)({type:String})],i.prototype,"url",void 0),i=(0,tslib_es6._)([(0,subclass.j)("esri.tasks.Task")],i);const p=i;let q=class extends p{constructor(t){super(t),this.dynamicDataSource=null,this.fieldsIndex=null,this.format="json",this.gdbVersion=null,this.infoFor3D=null,this.sourceSpatialReference=null}async execute(t,e){const r=await this.executeJSON(t,e);return this.featureSetFromJSON(t,r,e)}async executeJSON(t,e){const r={...this.requestOptions,...e},o=this._normalizeQuery(t),s=null!=t.outStatistics?.[0],i=(0,has.Z)("featurelayer-pbf-statistics"),u=!s||i;let n;if("pbf"===this.format&&u)try{n=await executeQueryPBF_n(this.url,o,r)}catch(p){if("query:parsing-pbf"!==p.name)throw p;this.format="json"}return"json"!==this.format&&u||(n=await(0,executeQueryJSON.F)(this.url,o,r)),this._normalizeFields(n.fields),n}async featureSetFromJSON(t,e,o){if(!this._queryIs3DObjectFormat(t)||(0,maybe.Wi)(this.infoFor3D)||!e.assetMaps||!e.features||!e.features.length)return FeatureSet.default.fromJSON(e);const{meshFeatureSetFromJSON:i}=await(0,promiseUtils.Hl)(Promise.all([__webpack_require__.e(7312),__webpack_require__.e(1588)]).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@arcgis/core/rest/support/meshFeatureSet.js")),o);return i(t,this.infoFor3D,e)}executeForCount(t,e){const r={...this.requestOptions,...e},o=this._normalizeQuery(t);return(0,executeForCount.P)(this.url,o,r)}executeForExtent(t,e){const r={...this.requestOptions,...e},o=this._normalizeQuery(t);return async function m(m,n,s){const p=(0,utils.en)(m);return(0,query.executeQueryForExtent)(p,Query.Z.from(n),{...s}).then((t=>({count:t.data.count,extent:Extent.Z.fromJSON(t.data.extent)})))}(this.url,o,r)}executeForIds(t,e){const r={...this.requestOptions,...e},o=this._normalizeQuery(t);return(0,executeForIds.G)(this.url,o,r)}executeRelationshipQuery(t,e){t=RelationshipQuery.Z.from(t);const r={...this.requestOptions,...e};return(this.gdbVersion||this.dynamicDataSource)&&((t=t.clone()).gdbVersion=t.gdbVersion||this.gdbVersion,t.dynamicDataSource=t.dynamicDataSource||this.dynamicDataSource),executeRelationshipQuery_n(this.url,t,r)}executeRelationshipQueryForCount(t,e){t=RelationshipQuery.Z.from(t);const r={...this.requestOptions,...e};return(this.gdbVersion||this.dynamicDataSource)&&((t=t.clone()).gdbVersion=t.gdbVersion||this.gdbVersion,t.dynamicDataSource=t.dynamicDataSource||this.dynamicDataSource),executeRelationshipQuery_u(this.url,t,r)}executeAttachmentQuery(t,e){const r={...this.requestOptions,...e};return executeAttachmentQuery_a(this.url,t,r)}executeTopFeaturesQuery(t,e){const r={...this.requestOptions,...e};return executeTopFeaturesQuery_s(this.parsedUrl,t,this.sourceSpatialReference,r)}executeForTopIds(t,e){const r={...this.requestOptions,...e};return executeForTopIds_s(this.parsedUrl,t,r)}executeForTopExtents(t,e){const r={...this.requestOptions,...e};return executeForTopExtents_m(this.parsedUrl,t,r)}executeForTopCount(t,e){const r={...this.requestOptions,...e};return executeForTopCount_s(this.parsedUrl,t,r)}_normalizeQuery(t){let s=Query.Z.from(t);if(s.sourceSpatialReference=s.sourceSpatialReference||this.sourceSpatialReference,(this.gdbVersion||this.dynamicDataSource)&&(s=s===t?s.clone():s,s.gdbVersion=t.gdbVersion||this.gdbVersion,s.dynamicDataSource=t.dynamicDataSource?DataLayerSource.n.from(t.dynamicDataSource):this.dynamicDataSource),(0,maybe.pC)(this.infoFor3D)&&this._queryIs3DObjectFormat(t)){s=s===t?s.clone():s,s.formatOf3DObjects=null;for(const t of this.infoFor3D.queryFormats){if("3D_glb"===t){s.formatOf3DObjects=t;break}"3D_gltf"!==t||s.formatOf3DObjects||(s.formatOf3DObjects=t)}if(!s.formatOf3DObjects)throw new core_Error.Z("query:unsupported-3d-query-formats","Could not find any supported 3D object query format. Only supported formats are 3D_glb and 3D_gltf");if((0,maybe.Wi)(s.outFields)||!s.outFields.includes("*")){s=s===t?s.clone():s,(0,maybe.Wi)(s.outFields)&&(s.outFields=[]);const{originX:e,originY:o,originZ:i,translationX:u,translationY:n,translationZ:a,scaleX:c,scaleY:p,scaleZ:m,rotationX:f,rotationY:l,rotationZ:h,rotationDeg:d}=this.infoFor3D.transformFieldRoles;s.outFields.push(e,o,i,u,n,a,c,p,m,f,l,h,d)}}return s}_normalizeFields(t){if((0,maybe.pC)(this.fieldsIndex)&&(0,maybe.pC)(t))for(const e of t){const t=this.fieldsIndex.get(e.name);t&&Object.assign(e,t.toJSON())}}_queryIs3DObjectFormat(t){return(0,maybe.pC)(this.infoFor3D)&&t.returnGeometry&&"xyFootprint"!==t.multipatchOption&&!t.outStatistics}};(0,tslib_es6._)([(0,property.Cb)({type:DataLayerSource.n})],q.prototype,"dynamicDataSource",void 0),(0,tslib_es6._)([(0,property.Cb)()],q.prototype,"fieldsIndex",void 0),(0,tslib_es6._)([(0,property.Cb)()],q.prototype,"format",void 0),(0,tslib_es6._)([(0,property.Cb)()],q.prototype,"gdbVersion",void 0),(0,tslib_es6._)([(0,property.Cb)()],q.prototype,"infoFor3D",void 0),(0,tslib_es6._)([(0,property.Cb)()],q.prototype,"sourceSpatialReference",void 0),q=(0,tslib_es6._)([(0,subclass.j)("esri.tasks.QueryTask")],q);const g=q;var arcgisLayerUrl=__webpack_require__("./node_modules/@arcgis/core/layers/support/arcgisLayerUrl.js"),editsZScale=__webpack_require__("./node_modules/@arcgis/core/rest/query/operations/editsZScale.js"),SpatialReference=__webpack_require__("./node_modules/@arcgis/core/geometry/SpatialReference.js");const O=new jsonMap.X({originalAndCurrentFeatures:"original-and-current-features",none:"none"});async function FeatureLayerSource_E(e){if("string"==typeof e){return(0,urlUtils.sJ)(e)||{data:e}}return new Promise(((t,s)=>{const a=new FileReader;a.readAsDataURL(e),a.onload=()=>t((0,urlUtils.sJ)(a.result)),a.onerror=e=>s(e)}))}const S=new Set(["Feature Layer","Table"]),j=new jsonMap.X({Started:"published",Publishing:"publishing",Stopped:"unavailable"});let T=class extends Loadable.Z{constructor(){super(...arguments),this.type="feature-layer",this.refresh=(0,promiseUtils.Ds)((async()=>{await this.load();const e=this.sourceJSON.editingInfo?.lastEditDate;if(null==e)return{dataChanged:!0,updates:{}};try{await this._fetchService(null)}catch{return{dataChanged:!0,updates:{}}}const t=e!==this.sourceJSON.editingInfo?.lastEditDate;return{dataChanged:t,updates:t?{editingInfo:this.sourceJSON.editingInfo,extent:this.sourceJSON.extent}:null}}))}load(e){const t=(0,maybe.pC)(e)?e.signal:null;return this.addResolvingPromise(this._fetchService(this.layer.sourceJSON,t)),Promise.resolve(this)}get queryTask(){const{capabilities:{query:{supportsFormatPBF:e}},parsedUrl:t,dynamicDataSource:s,infoFor3D:a,gdbVersion:r,spatialReference:o,fieldsIndex:i}=this.layer,n=(0,has.Z)("featurelayer-pbf")&&e&&(0,maybe.Wi)(a)?"pbf":"json";return new g({url:t.path,format:n,fieldsIndex:i,infoFor3D:a,dynamicDataSource:s,gdbVersion:r,sourceSpatialReference:o})}async addAttachment(e,t){await this.load();const a=e.attributes[this.layer.objectIdField],r=this.layer.parsedUrl.path+"/"+a+"/addAttachment",o=this._getLayerRequestOptions(),i=this._getFormDataForAttachment(t,o.query);try{const e=await(0,request.default)(r,{body:i});return this._createFeatureEditResult(e.data.addAttachmentResult)}catch(n){throw this._createAttachmentErrorResult(a,n)}}async updateAttachment(e,t,a){await this.load();const r=e.attributes[this.layer.objectIdField],o=this.layer.parsedUrl.path+"/"+r+"/updateAttachment",i=this._getLayerRequestOptions({query:{attachmentId:t}}),n=this._getFormDataForAttachment(a,i.query);try{const e=await(0,request.default)(o,{body:n});return this._createFeatureEditResult(e.data.updateAttachmentResult)}catch(u){throw this._createAttachmentErrorResult(r,u)}}async applyEdits(e,t){await this.load();const a=this.layer.infoFor3D,r=(0,maybe.pC)(a),o=r||t?.globalIdUsed,i=e.addFeatures.map((e=>this._serializeFeature(e,a))),u=e.updateFeatures.map((e=>this._serializeFeature(e,a))),d=this._getFeatureIds(e.deleteFeatures,o);(0,editsZScale.P)(i,u,this.layer.spatialReference);const c=[],p=[],h=[...e.deleteAttachments];for(const s of e.addAttachments)c.push(await this._serializeAttachment(s));for(const s of e.updateAttachments)p.push(await this._serializeAttachment(s));const y=c.length||p.length||h.length?{adds:c,updates:p,deletes:h}:null;let m,f=null;if(r){f=new Map;const t=[];for(const a of e.addAssets)t.push(this._serializeAssetMapEditAndUploadAssets(a,f));const s=await Promise.all(t);m=s.length?{adds:s,updates:[],deletes:[]}:void 0}const g={gdbVersion:t?.gdbVersion||this.layer.gdbVersion,rollbackOnFailure:t?.rollbackOnFailureEnabled,useGlobalIds:o,returnEditMoment:t?.returnEditMoment,usePreviousEditMoment:t?.usePreviousEditMoment,sessionId:t?.sessionId};t?.returnServiceEditsOption?(g.edits=JSON.stringify([{id:this.layer.layerId,adds:i,updates:u,deletes:d,attachments:y,assetMaps:(0,maybe.Wg)(m)}]),g.returnServiceEditsOption=O.toJSON(t?.returnServiceEditsOption),g.returnServiceEditsInSourceSR=t?.returnServiceEditsInSourceSR):(g.adds=i.length?JSON.stringify(i):null,g.updates=u.length?JSON.stringify(u):null,g.deletes=d.length?o?JSON.stringify(d):d.join(","):null,g.attachments=y&&JSON.stringify(y),g.assetMaps=(0,maybe.pC)(m)?JSON.stringify(m):void 0);const R=this._getLayerRequestOptions({method:"post",query:g}),F=t?.returnServiceEditsOption?this.layer.url:this.layer.parsedUrl.path,b=await(0,request.default)(F+"/applyEdits",R);if(r&&null!=b.data&&null!=b.data.assetMaps){const e=b.data,t=this.layer.objectIdField,a=[];for(const s of e.addResults)s.success&&a.push(s.objectId);for(const s of e.updateResults)s.success&&a.push(s.objectId);const r=this._createRequestQueryOptions(),o=await(0,request.default)(F+"/query",{...r,query:{f:"json",formatOf3DObjects:"3D_glb",where:`OBJECTID IN (${a.join(",")})`,outFields:`${t}`}});if(o&&o.data&&o.data.assetMaps&&(0,maybe.pC)(f)){const e=o.data.assetMaps;for(const t of e){const e=f.get(t.parentGlobalId).geometry;(0,maybe.pC)(e)&&"mesh"===e.type&&e.updateExternalSource({source:[{name:t.assetName,source:t.assetName}],extent:e.extent})}}}return this._createEditsResult(b)}async deleteAttachments(e,t){await this.load();const a=e.attributes[this.layer.objectIdField],r=this.layer.parsedUrl.path+"/"+a+"/deleteAttachments";try{return(await(0,request.default)(r,this._getLayerRequestOptions({query:{attachmentIds:t.join(",")},method:"post"}))).data.deleteAttachmentResults.map(this._createFeatureEditResult)}catch(o){throw this._createAttachmentErrorResult(a,o)}}fetchRecomputedExtents(e={}){const t=e.signal;return this.load({signal:t}).then((async()=>{const t=this._getLayerRequestOptions({...e,query:{returnUpdates:!0}}),{layerId:r,url:o}=this.layer,{data:i}=await(0,request.default)(`${o}/${r}`,t),{id:n,extent:u,fullExtent:l,timeExtent:d}=i,c=u||l;return{id:n,fullExtent:c&&Extent.Z.fromJSON(c),timeExtent:d&&TimeExtent.Z.fromJSON({start:d[0],end:d[1]})}}))}async queryAttachments(e,t={}){const{parsedUrl:a}=this.layer,r=a.path;await this.load();const o=this._getLayerRequestOptions(t);if(!this.layer.get("capabilities.operations.supportsQueryAttachments")){const{objectIds:t}=e,a=[];for(const e of t){const t=r+"/"+e+"/attachments";a.push((0,request.default)(t,o))}return Promise.all(a).then((e=>t.map(((t,s)=>({parentObjectId:t,attachmentInfos:e[s].data.attachmentInfos}))))).then((e=>queryAttachments_a(e,r)))}return this.queryTask.executeAttachmentQuery(e,o)}async queryFeatures(e,t){return await this.load(),this.queryTask.execute(e,{...t,query:this._createRequestQueryOptions(t)})}async queryFeaturesJSON(e,t){return await this.load(),this.queryTask.executeJSON(e,{...t,query:this._createRequestQueryOptions(t)})}async queryObjectIds(e,t){return await this.load(),this.queryTask.executeForIds(e,{...t,query:this._createRequestQueryOptions(t)})}async queryFeatureCount(e,t){return await this.load(),this.queryTask.executeForCount(e,{...t,query:this._createRequestQueryOptions(t)})}async queryExtent(e,t){return await this.load(),this.queryTask.executeForExtent(e,{...t,query:this._createRequestQueryOptions(t)})}async queryRelatedFeatures(e,t){return await this.load(),this.queryTask.executeRelationshipQuery(e,{...t,query:this._createRequestQueryOptions(t)})}async queryRelatedFeaturesCount(e,t){return await this.load(),this.queryTask.executeRelationshipQueryForCount(e,{...t,query:this._createRequestQueryOptions(t)})}async queryTopFeatures(e,t){return await this.load(),this.queryTask.executeTopFeaturesQuery(e,{...t,query:this._createRequestQueryOptions(t)})}async queryTopObjectIds(e,t){return await this.load(),this.queryTask.executeForTopIds(e,{...t,query:this._createRequestQueryOptions(t)})}async queryTopExtents(e,t){return await this.load(),this.queryTask.executeForTopExtents(e,{...t,query:this._createRequestQueryOptions(t)})}async queryTopCount(e,t){return await this.load(),this.queryTask.executeForTopCount(e,{...t,query:this._createRequestQueryOptions(t)})}async fetchPublishingStatus(){if(!(0,arcgisLayerUrl.M8)(this.layer.url))return"unavailable";const e=(0,urlUtils.v_)(this.layer.url,"status"),t=await(0,request.default)(e,{query:{f:"json"}});return j.fromJSON(t.data.status)}_createRequestQueryOptions(e){const t={...this.layer.customParameters,token:this.layer.apiKey,...e?.query};return this.layer.datesInUnknownTimezone&&(t.timeReferenceUnknownClient=!0),t}async _fetchService(e,t){if(!e){const{data:a}=await(0,request.default)(this.layer.parsedUrl.path,this._getLayerRequestOptions({query:(0,has.Z)("featurelayer-advanced-symbols")?{returnAdvancedSymbols:!0}:{},signal:t}));e=a}this.sourceJSON=this._patchServiceJSON(e);const a=e.type;if(!S.has(a))throw new core_Error.Z("feature-layer-source:unsupported-type",`Source type "${a}" is not supported`)}_patchServiceJSON(e){if("Table"!==e.type&&e.geometryType&&!e?.drawingInfo?.renderer&&!e.defaultSymbol){const t=(0,clientSideDefaults.bU)(e.geometryType).renderer;(0,object.RB)("drawingInfo.renderer",t,e)}return"esriGeometryMultiPatch"===e.geometryType&&e.infoFor3D&&(e.geometryType="mesh"),e}_serializeFeature(e,t){const{geometry:s,attributes:a}=e;if((0,maybe.pC)(t)&&(0,maybe.pC)(e.geometry)&&"mesh"===e.geometry.type){const s={...a},r=e.geometry,o=r.origin,i=r.transform;if(s[t.transformFieldRoles.originX]=o.x,s[t.transformFieldRoles.originY]=o.y,s[t.transformFieldRoles.originZ]=o.z,(0,maybe.pC)(i)){const e=i.translation,a=i.scale,r=i.rotation;s[t.transformFieldRoles.translationX]=e[0],s[t.transformFieldRoles.translationY]=e[1],s[t.transformFieldRoles.translationZ]=e[2],s[t.transformFieldRoles.scaleX]=a[0],s[t.transformFieldRoles.scaleY]=a[1],s[t.transformFieldRoles.scaleZ]=a[2],s[t.transformFieldRoles.rotationX]=r[0],s[t.transformFieldRoles.rotationY]=r[1],s[t.transformFieldRoles.rotationZ]=r[2],s[t.transformFieldRoles.rotationDeg]=r[3]}return{geometry:null,attributes:s}}return(0,maybe.Wi)(s)?{attributes:a}:"mesh"===s.type||"extent"===s.type?null:{geometry:s.toJSON(),attributes:a}}async _serializeAttachment(e){const{feature:t,attachment:s}=e,{globalId:a,name:r,contentType:o,data:i,uploadId:n}=s,u={globalId:a,parentGlobalId:null,contentType:null,name:null,uploadId:null,data:null};if(t&&(u.parentGlobalId="attributes"in t?t.attributes&&t.attributes[this.layer.globalIdField]:t.globalId),n)u.uploadId=n;else if(i){const e=await FeatureLayerSource_E(i);u.contentType=e.mediaType,u.data=e.data,i instanceof File&&(u.name=i.name)}return r&&(u.name=r),o&&(u.contentType=o),u}async _serializeAssetMapEditAndUploadAssets(e,t){const a=this.layer.url;let o=null;try{const t=new Blob([e.data],{type:e.mimeType}),i=new FormData;i.append("f","json"),i.append("file",t,`${e.assetName}`);const n={body:i,method:"post",responseType:"json"},{data:u}=await(0,request.default)(`${a}/uploads/upload`,n);if(!u.success)throw new core_Error.Z("feature-layer-source:upload-failure","Expected upload to be successfull.");o={assetType:e.assetType,assetUploadId:u.item.itemID}}catch(h){o=null}if((0,maybe.Wi)(o)){const t=await FeatureLayerSource_E(new Blob([e.data]));if(!t.isBase64)throw new core_Error.Z("feature-layer-source:uploadAssets-failure","Expected gltf data in base64 format after conversion.");o={assetType:e.assetType,assetData:t.data}}if((0,maybe.Wi)(o))throw new core_Error.Z("feature-layer-source:uploadAssets-failure","Unable to prepare uploadAsset request options.");const i={method:"post",query:{f:"json",assets:JSON.stringify([o])},responseType:"json"},n=await(0,request.default)((0,urlUtils.v_)(this.layer.parsedUrl.path,"uploadAssets"),i);if(1!==n.data.uploadResults.length||!n.data.uploadResults[0].success)throw new core_Error.Z("feature-layer-source:uploadAssets-failure","Bad response.");const l=n.data.uploadResults[0].assetHash,d=[];e.flags&E.PROJECT_VERTICES&&d.push("PROJECT_VERTICES");const c={globalId:e.assetMapGlobalId,parentGlobalId:e.featureGlobalId,assetName:e.assetName,assetHash:l,flags:d};return t.set(e.featureGlobalId,e.feature),c}_getFeatureIds(e,t){const s=e[0];return s?this._canUseGlobalIds(t,e)?this._getGlobalIdsFromFeatureIdentifier(e):"objectId"in s?this._getObjectIdsFromFeatureIdentifier(e):this._getIdsFromFeatures(e):[]}_getIdsFromFeatures(e){const t=this.layer.objectIdField;return e.map((e=>e.attributes&&e.attributes[t]))}_canUseGlobalIds(e,t){return e&&"globalId"in t[0]}_getObjectIdsFromFeatureIdentifier(e){return e.map((e=>e.objectId))}_getGlobalIdsFromFeatureIdentifier(e){return e.map((e=>e.globalId))}_createEditsResult(e){const t=e.data,{layerId:s}=this.layer,a=[];let r=null;if(Array.isArray(t))for(const n of t)a.push({id:n.id,editedFeatures:n.editedFeatures}),n.id===s&&(r={addResults:n.addResults,updateResults:n.updateResults,deleteResults:n.deleteResults,attachments:n.attachments,editMoment:n.editMoment});else r=t;const o=r?.attachments,i={addFeatureResults:r.addResults?r.addResults.map(this._createFeatureEditResult,this):[],updateFeatureResults:r.updateResults?r.updateResults.map(this._createFeatureEditResult,this):[],deleteFeatureResults:r.deleteResults?r.deleteResults.map(this._createFeatureEditResult,this):[],addAttachmentResults:o&&o.addResults?o.addResults.map(this._createFeatureEditResult,this):[],updateAttachmentResults:o&&o.updateResults?o.updateResults.map(this._createFeatureEditResult,this):[],deleteAttachmentResults:o&&o.deleteResults?o.deleteResults.map(this._createFeatureEditResult,this):[]};if(r.editMoment&&(i.editMoment=r.editMoment),a.length>0){i.editedFeatureResults=[];for(const e of a){const{adds:t,updates:s,deletes:a,spatialReference:r}=e.editedFeatures,o=r?new SpatialReference.Z(r):null;i.editedFeatureResults.push({layerId:e.id,editedFeatures:{adds:t?.map((e=>this._createEditedFeature(e,o)))||[],updates:s?.map((e=>({original:this._createEditedFeature(e[0],o),current:this._createEditedFeature(e[1],o)})))||[],deletes:a?.map((e=>this._createEditedFeature(e,o)))||[],spatialReference:o}})}}return i}_createEditedFeature(e,s){return new Graphic.Z({attributes:e.attributes,geometry:(0,jsonUtils.im)({...e.geometry,spatialReference:s})})}_createFeatureEditResult(e){const t=!0===e.success?null:e.error||{code:void 0,description:void 0};return{objectId:e.objectId,globalId:e.globalId,error:t?new core_Error.Z("feature-layer-source:edit-failure",t.description,{code:t.code}):null}}_createAttachmentErrorResult(e,t){const s=t.details.messages&&t.details.messages[0]||t.message,a=t.details.httpStatus||t.details.messageCode;return{objectId:e,globalId:null,error:new core_Error.Z("feature-layer-source:attachment-failure",s,{code:a})}}_getFormDataForAttachment(e,t){const s=e instanceof FormData?e:e&&e.elements?new FormData(e):null;if(s)for(const a in t){const e=t[a];null!=e&&(s.set?s.set(a,e):s.append(a,e))}return s}_getLayerRequestOptions(e={}){const{parsedUrl:t,gdbVersion:s,dynamicDataSource:a}=this.layer;return{...e,query:{gdbVersion:s,layer:a?JSON.stringify({source:a}):void 0,...t.query,f:"json",...this._createRequestQueryOptions(e)},responseType:"json"}}};(0,tslib_es6._)([(0,property.Cb)()],T.prototype,"type",void 0),(0,tslib_es6._)([(0,property.Cb)({constructOnly:!0})],T.prototype,"layer",void 0),(0,tslib_es6._)([(0,property.Cb)({readOnly:!0})],T.prototype,"queryTask",null),T=(0,tslib_es6._)([(0,subclass.j)("esri.layers.graphics.sources.FeatureLayerSource")],T);const A=T},"./node_modules/@arcgis/core/rest/query/executeForCount.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{P:()=>n});var _utils_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/rest/utils.js"),_operations_query_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/rest/query/operations/query.js"),_support_Query_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/rest/support/Query.js");async function n(n,s,m){const p=(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.en)(n);return(0,_operations_query_js__WEBPACK_IMPORTED_MODULE_1__.executeQueryForCount)(p,_support_Query_js__WEBPACK_IMPORTED_MODULE_2__.Z.from(s),{...m}).then((o=>o.data.count))}},"./node_modules/@arcgis/core/rest/query/executeForIds.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G:()=>s});var _utils_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/rest/utils.js"),_operations_query_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/rest/query/operations/query.js"),_support_Query_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/rest/support/Query.js");async function s(s,e,m){const n=(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.en)(s);return(0,_operations_query_js__WEBPACK_IMPORTED_MODULE_1__.executeQueryForIds)(n,_support_Query_js__WEBPACK_IMPORTED_MODULE_2__.Z.from(e),{...m}).then((o=>o.data.objectIds))}}}]);