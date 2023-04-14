"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[7324,8611],{"./node_modules/@arcgis/core/core/accessorSupport/originUtils.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>i});var _multiOriginJSONSupportUtils_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/multiOriginJSONSupportUtils.js");function i(i){i&&i.writtenProperties&&i.writtenProperties.forEach((({target:i,propName:t,newOrigin:e})=>{(0,_multiOriginJSONSupportUtils_js__WEBPACK_IMPORTED_MODULE_0__.l)(i)&&e&&i.originOf(t)!==e&&i.updateOrigin(t,e)}))}},"./node_modules/@arcgis/core/core/multiOriginJSONSupportUtils.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{function i(i){return i&&"getAtOrigin"in i&&"originOf"in i}__webpack_require__.d(__webpack_exports__,{l:()=>i})},"./node_modules/@arcgis/core/layers/mixins/SceneService.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{xp:()=>L,Vt:()=>E});var tslib_es6=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),request=__webpack_require__("./node_modules/@arcgis/core/request.js"),Error=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),Logger=__webpack_require__("./node_modules/@arcgis/core/core/Logger.js"),maybe=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),promiseUtils=__webpack_require__("./node_modules/@arcgis/core/core/promiseUtils.js"),urlUtils=__webpack_require__("./node_modules/@arcgis/core/core/urlUtils.js"),property=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),reader=(__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/reader.js")),subclass=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js"),writer=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/writer.js"),originUtils=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/originUtils.js"),Extent=__webpack_require__("./node_modules/@arcgis/core/geometry/Extent.js"),HeightModelInfo=__webpack_require__("./node_modules/@arcgis/core/geometry/HeightModelInfo.js"),SpatialReference=__webpack_require__("./node_modules/@arcgis/core/geometry/SpatialReference.js"),arcgisLayerUrl=__webpack_require__("./node_modules/@arcgis/core/layers/support/arcgisLayerUrl.js"),commonProperties=__webpack_require__("./node_modules/@arcgis/core/layers/support/commonProperties.js"),I3SIndexInfo=__webpack_require__("./node_modules/@arcgis/core/layers/support/I3SIndexInfo.js");let n=null;function u(){return n}var Portal=__webpack_require__("./node_modules/@arcgis/core/portal/Portal.js"),PortalItem=__webpack_require__("./node_modules/@arcgis/core/portal/PortalItem.js"),asyncUtils=__webpack_require__("./node_modules/@arcgis/core/core/asyncUtils.js"),uuid=__webpack_require__("./node_modules/@arcgis/core/core/uuid.js"),resourceUtils=__webpack_require__("./node_modules/@arcgis/core/portal/support/resourceUtils.js");async function saveUtils_a(r,o,a){if(!o||!o.resources)return;const h=o.portalItem===r.portalItem?new Set(r.paths):new Set;r.paths.length=0,r.portalItem=o.portalItem;const i=new Set(o.resources.toKeep.map((r=>r.resource.path))),m=new Set,f=[];i.forEach((e=>{h.delete(e),r.paths.push(e)}));for(const e of o.resources.toUpdate)if(h.delete(e.resource.path),i.has(e.resource.path)||m.has(e.resource.path)){const{resource:o,content:t,finish:s,error:u}=e,h=(0,resourceUtils.getSiblingOfSameTypeI)(o,(0,uuid.D)());r.paths.push(h.path),f.push(saveUtils_n({resource:h,content:t,compress:e.compress,finish:s,error:u},a))}else r.paths.push(e.resource.path),f.push(saveUtils_u(e,a)),m.add(e.resource.path);for(const e of o.resources.toAdd)f.push(saveUtils_n(e,a)),r.paths.push(e.resource.path);if(h.forEach((r=>{if(o.portalItem){const e=o.portalItem.resourceFromPath(r);f.push(e.portalItem.removeResource(e).catch((()=>{})))}})),0===f.length)return;const l=await(0,promiseUtils.as)(f);(0,promiseUtils.k_)(a);const d=l.filter((r=>"error"in r)).map((r=>r.error));if(d.length>0)throw new Error.Z("save:resources","Failed to save one or more resources",{errors:d})}async function saveUtils_n(e,t){const s={...(0,maybe.pC)(t)?t:{},compress:e.compress},c=await(0,asyncUtils.q6)(e.resource.portalItem.addResource(e.resource,e.content,s));if(!0!==c.ok)throw e.error?.(c.error),c.error;e.finish?.(e.resource)}async function saveUtils_u(e,o){const t=await(0,asyncUtils.q6)(e.resource.update(e.content,o));if(!0!==t.ok)throw e.error?.(t.error),t.error;e.finish?.(e.resource)}const A="esri.layers.mixins.SceneService",N=Logger.Z.getLogger(A),E=o=>{let E=class extends o{constructor(){super(...arguments),this.spatialReference=null,this.fullExtent=null,this.heightModelInfo=null,this.minScale=0,this.maxScale=0,this.version={major:Number.NaN,minor:Number.NaN,versionString:""},this.copyright=null,this.sublayerTitleMode="item-title",this.title=null,this.layerId=null,this.indexInfo=null,this._debouncedSaveOperations=(0,promiseUtils.Ds)((async(e,t,r)=>{switch(e){case L.SAVE:return this._save(t);case L.SAVE_AS:return this._saveAs(r,t)}}))}readSpatialReference(e,t){return this._readSpatialReference(t)}_readSpatialReference(e){if(null!=e.spatialReference)return SpatialReference.Z.fromJSON(e.spatialReference);{const t=e.store,r=t.indexCRS||t.geographicCRS,o=r&&parseInt(r.substring(r.lastIndexOf("/")+1,r.length),10);return null!=o?new SpatialReference.Z(o):null}}readFullExtent(e,t,r){if(null!=e&&"object"==typeof e){const o=null==e.spatialReference?{...e,spatialReference:this._readSpatialReference(t)}:e;return Extent.Z.fromJSON(o,r)}const o=t.store,i=this._readSpatialReference(t);return null==i||null==o||null==o.extent||!Array.isArray(o.extent)||o.extent.some((e=>e<U))?null:new Extent.Z({xmin:o.extent[0],ymin:o.extent[1],xmax:o.extent[2],ymax:o.extent[3],spatialReference:i})}parseVersionString(e){const t={major:Number.NaN,minor:Number.NaN,versionString:e},r=e.split(".");return r.length>=2&&(t.major=parseInt(r[0],10),t.minor=parseInt(r[1],10)),t}readVersion(e,t){const r=t.store,o=null!=r.version?r.version.toString():"";return this.parseVersionString(o)}readTitlePortalItem(e){return"item-title"!==this.sublayerTitleMode?void 0:e}readTitleService(e,t){const r=this.portalItem&&this.portalItem.title;if("item-title"===this.sublayerTitleMode)return(0,arcgisLayerUrl.a7)(this.url,t.name);let o=t.name;if(!o&&this.url){const e=(0,arcgisLayerUrl.Qc)(this.url);(0,maybe.pC)(e)&&(o=e.title)}return"item-title-and-service-name"===this.sublayerTitleMode&&r&&(o=r+" - "+o),(0,arcgisLayerUrl.ld)(o)}set url(e){const t=(0,arcgisLayerUrl.XG)({layer:this,url:e,nonStandardUrlAllowed:!1,logger:N});this._set("url",t.url),null!=t.layerId&&this._set("layerId",t.layerId)}writeUrl(e,t,r,o){(0,arcgisLayerUrl.wH)(this,e,"layers",t,o)}get parsedUrl(){const e=this._get("url"),t=(0,urlUtils.mN)(e);return null!=this.layerId&&(t.path=`${t.path}/layers/${this.layerId}`),t}async _fetchIndexAndUpdateExtent(e,t){this.indexInfo=(0,I3SIndexInfo.T)(this.parsedUrl.path,this.rootNode,e,this.apiKey,N,t),null==this.fullExtent||this.fullExtent.hasZ||this._updateExtent(await this.indexInfo)}_updateExtent(e){if("page"===e?.type){const t=e.rootIndex%e.pageSize,o=e.rootPage?.nodes?.[t];if(null==o||null==o.obb||null==o.obb.center||null==o.obb.halfSize)throw new Error.Z("sceneservice:invalid-node-page","Invalid node page.");if(o.obb.center[0]<U||null==this.fullExtent||this.fullExtent.hasZ)return;const i=o.obb.halfSize,s=o.obb.center[2],a=Math.sqrt(i[0]*i[0]+i[1]*i[1]+i[2]*i[2]);this.fullExtent.zmin=s-a,this.fullExtent.zmax=s+a}else if("node"===e?.type){const t=e.rootNode?.mbs;if(!Array.isArray(t)||4!==t.length||t[0]<U)return;const r=t[2],o=t[3],{fullExtent:i}=this;i&&(i.zmin=r-o,i.zmax=r+o)}}async _fetchService(e){if(null==this.url)throw new Error.Z("sceneservice:url-not-set","Scene service can not be loaded without valid portal item or url");if(null==this.layerId&&/SceneServer\/*$/i.test(this.url)){const t=await this._fetchFirstLayerId(e);null!=t&&(this.layerId=t)}return this._fetchServiceLayer(e)}async _fetchFirstLayerId(e){const r=await(0,request.default)(this.url,{query:{f:"json",token:this.apiKey},responseType:"json",signal:e});if(r.data&&Array.isArray(r.data.layers)&&r.data.layers.length>0)return r.data.layers[0].id}async _fetchServiceLayer(e){const r=await(0,request.default)(this.parsedUrl?.path??"",{query:{f:"json",token:this.apiKey},responseType:"json",signal:e});r.ssl&&(this.url=this.url.replace(/^http:/i,"https:"));let o=!1;if(r.data.layerType&&"Voxel"===r.data.layerType&&(o=!0),o)return this._fetchVoxelServiceLayer();const i=r.data;this.read(i,this._getServiceContext()),this.validateLayer(i)}async _fetchVoxelServiceLayer(e){const r=(await(0,request.default)(this.parsedUrl?.path+"/layer",{query:{f:"json",token:this.apiKey},responseType:"json",signal:e})).data;this.read(r,this._getServiceContext()),this.validateLayer(r)}_getServiceContext(){return{origin:"service",portalItem:this.portalItem,portal:this.portalItem?.portal,url:this.parsedUrl}}async _ensureLoadBeforeSave(){await this.load(),"beforeSave"in this&&"function"==typeof this.beforeSave&&await this.beforeSave()}validateLayer(e){}_updateTypeKeywords(e,t,r){e.typeKeywords||(e.typeKeywords=[]);const o=t.getTypeKeywords();for(const i of o)e.typeKeywords.push(i);e.typeKeywords&&(e.typeKeywords=e.typeKeywords.filter(((e,t,r)=>r.indexOf(e)===t)),r===T.newItem&&(e.typeKeywords=e.typeKeywords.filter((e=>"Hosted Service"!==e))))}async _saveAs(e,t){const o={...K,...t};let i=PortalItem.default.from(e);i||(N.error("_saveAs(): requires a portal item parameter"),await Promise.reject(new Error.Z("sceneservice:portal-item-required","_saveAs() requires a portal item to save to"))),i.id&&(i=i.clone(),i.id=null);const s=i.portal||Portal.Z.getDefault();await this._ensureLoadBeforeSave(),i.type=O,i.portal=s;const a={origin:"portal-item",url:null,messages:[],portal:s,portalItem:i,writtenProperties:[],blockedRelativeUrls:[],resources:{toAdd:[],toUpdate:[],toKeep:[],pendingOperations:[]}},n={layers:[this.write({},a)]};return await Promise.all(a.resources.pendingOperations??[]),await this._validateAgainstJSONSchema(n,a,o),i.url=this.url,i.title||(i.title=this.title),this._updateTypeKeywords(i,o,T.newItem),await s.signIn(),await(s.user?.addItem({item:i,folder:o&&o.folder,data:n})),await saveUtils_a(this.resourceReferences,a,null),this.portalItem=i,(0,originUtils.D)(a),a.portalItem=i,i}async _save(e){const t={...K,...e};if(!this.portalItem)throw N.error("_save(): requires the .portalItem property to be set"),new Error.Z("sceneservice:portal-item-not-set","Portal item to save to has not been set on this SceneService");if(this.portalItem.type!==O)throw N.error("_save(): Non-matching portal item type. Got "+this.portalItem.type+", expected "+O),new Error.Z("sceneservice:portal-item-wrong-type",`Portal item needs to have type "${O}"`);await this._ensureLoadBeforeSave();const o={origin:"portal-item",url:this.portalItem.itemUrl&&(0,urlUtils.mN)(this.portalItem.itemUrl),messages:[],portal:this.portalItem.portal||Portal.Z.getDefault(),portalItem:this.portalItem,writtenProperties:[],blockedRelativeUrls:[],resources:{toAdd:[],toUpdate:[],toKeep:[],pendingOperations:[]}},i={layers:[this.write({},o)]};return await Promise.all(o.resources.pendingOperations??[]),await this._validateAgainstJSONSchema(i,o,t),this.portalItem.url=this.url,this.portalItem.title||(this.portalItem.title=this.title),this._updateTypeKeywords(this.portalItem,t,T.existingItem),await this.portalItem.update({data:i}),await saveUtils_a(this.resourceReferences,o,null),(0,originUtils.D)(o),this.portalItem}async _validateAgainstJSONSchema(e,t,o){let i=t.messages?.filter((e=>"error"===e.type)).map((e=>new Error.Z(e.name,e.message,e.details)))??[];o?.validationOptions?.ignoreUnsupported&&(i=i.filter((e=>"layer:unsupported"!==e.name&&"symbol:unsupported"!==e.name&&"symbol-layer:unsupported"!==e.name&&"property:unsupported"!==e.name&&"url:unsupported"!==e.name&&"scenemodification:unsupported"!==e.name)));const s=o?.validationOptions,a=s?.enabled,n=u();if(a&&n){const t=(await n()).validate(e,o.portalItemLayerType);if(t.length>0){const e=`Layer item did not validate:\n${t.join("\n")}`;if(N.error(`_validateAgainstJSONSchema(): ${e}`),"throw"===s.failPolicy){const e=t.map((e=>new Error.Z("sceneservice:schema-validation",e))).concat(i);throw new Error.Z("sceneservice-validate:error","Failed to save layer item due to schema validation, see `details.errors`.",{combined:e})}}}if(i.length>0)throw new Error.Z("sceneservice:save","Failed to save SceneService due to unsupported or invalid content. See 'details.errors' for more detailed information",{errors:i})}};return(0,tslib_es6._)([(0,property.Cb)(commonProperties.id)],E.prototype,"id",void 0),(0,tslib_es6._)([(0,property.Cb)({type:SpatialReference.Z})],E.prototype,"spatialReference",void 0),(0,tslib_es6._)([(0,reader.r)("spatialReference",["spatialReference","store.indexCRS","store.geographicCRS"])],E.prototype,"readSpatialReference",null),(0,tslib_es6._)([(0,property.Cb)({type:Extent.Z})],E.prototype,"fullExtent",void 0),(0,tslib_es6._)([(0,reader.r)("fullExtent",["fullExtent","store.extent","spatialReference","store.indexCRS","store.geographicCRS"])],E.prototype,"readFullExtent",null),(0,tslib_es6._)([(0,property.Cb)({readOnly:!0,type:HeightModelInfo.Z})],E.prototype,"heightModelInfo",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Number,json:{name:"layerDefinition.minScale",write:!0,origins:{service:{read:{source:"minScale"},write:!1}}}})],E.prototype,"minScale",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Number,json:{name:"layerDefinition.maxScale",write:!0,origins:{service:{read:{source:"maxScale"},write:!1}}}})],E.prototype,"maxScale",void 0),(0,tslib_es6._)([(0,property.Cb)({readOnly:!0})],E.prototype,"version",void 0),(0,tslib_es6._)([(0,reader.r)("version",["store.version"])],E.prototype,"readVersion",null),(0,tslib_es6._)([(0,property.Cb)({type:String,json:{read:{source:"copyrightText"}}})],E.prototype,"copyright",void 0),(0,tslib_es6._)([(0,property.Cb)({type:String,json:{read:!1}})],E.prototype,"sublayerTitleMode",void 0),(0,tslib_es6._)([(0,property.Cb)({type:String})],E.prototype,"title",void 0),(0,tslib_es6._)([(0,reader.r)("portal-item","title")],E.prototype,"readTitlePortalItem",null),(0,tslib_es6._)([(0,reader.r)("service","title",["name"])],E.prototype,"readTitleService",null),(0,tslib_es6._)([(0,property.Cb)({type:Number,json:{origins:{service:{read:{source:"id"}},"portal-item":{write:{target:"id",isRequired:!0,ignoreOrigin:!0},read:!1}}}})],E.prototype,"layerId",void 0),(0,tslib_es6._)([(0,property.Cb)(commonProperties.HQ)],E.prototype,"url",null),(0,tslib_es6._)([(0,writer.c)("url")],E.prototype,"writeUrl",null),(0,tslib_es6._)([(0,property.Cb)()],E.prototype,"parsedUrl",null),(0,tslib_es6._)([(0,property.Cb)({readOnly:!0})],E.prototype,"store",void 0),(0,tslib_es6._)([(0,property.Cb)({type:String,readOnly:!0,json:{read:{source:"store.rootNode"}}})],E.prototype,"rootNode",void 0),E=(0,tslib_es6._)([(0,subclass.j)(A)],E),E},U=-1e38;var T,e;(e=T||(T={}))[e.existingItem=0]="existingItem",e[e.newItem=1]="newItem";const O="Scene Service",K={getTypeKeywords:()=>[],portalItemLayerType:"unknown",validationOptions:{enabled:!0,ignoreUnsupported:!1,failPolicy:"throw"}};var L;!function(e){e[e.SAVE=0]="SAVE",e[e.SAVE_AS=1]="SAVE_AS"}(L||(L={}))},"./node_modules/@arcgis/core/layers/support/I3SIndexInfo.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>n});var _request_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/request.js"),_core_Error_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),_core_maybe_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js");async function n(n,t,s,a,i,d){let l=null;if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_2__.pC)(s)){const o=`${n}/nodepages/`,t=o+Math.floor(s.rootIndex/s.nodesPerPage);try{return{type:"page",rootPage:(await(0,_request_js__WEBPACK_IMPORTED_MODULE_0__.default)(t,{query:{f:"json",token:a},responseType:"json",signal:d})).data,rootIndex:s.rootIndex,pageSize:s.nodesPerPage,lodMetric:s.lodSelectionMetricType,urlPrefix:o}}catch(f){(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_2__.pC)(i)&&i.warn("#fetchIndexInfo()","Failed to load root node page. Falling back to node documents.",t,f),l=f}}if(!t)return null;const p=`${n}/nodes/`,c=p+(t&&t.split("/").pop());try{return{type:"node",rootNode:(await(0,_request_js__WEBPACK_IMPORTED_MODULE_0__.default)(c,{query:{f:"json",token:a},responseType:"json",signal:d})).data,urlPrefix:p}}catch(f){throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_1__.Z("sceneservice:root-node-missing","Root node missing.",{pageError:l,nodeError:f,url:c})}}},"./node_modules/@arcgis/core/layers/support/I3SLayerDefinitions.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{H3:()=>m,QI:()=>l,U4:()=>s,Yh:()=>u});var _chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),_core_JSONSupport_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/JSONSupport.js"),_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),_core_accessorSupport_decorators_enumeration_js__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/enumeration.js")),_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js");let s=class extends _core_JSONSupport_js__WEBPACK_IMPORTED_MODULE_0__.wq{constructor(){super(...arguments),this.nodesPerPage=null,this.rootIndex=0,this.lodSelectionMetricType=null}};(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:Number})],s.prototype,"nodesPerPage",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:Number})],s.prototype,"rootIndex",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:String})],s.prototype,"lodSelectionMetricType",void 0),s=(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_5__.j)("esri.layer.support.I3SNodePageDefinition")],s);let i=class extends _core_JSONSupport_js__WEBPACK_IMPORTED_MODULE_0__.wq{constructor(){super(...arguments),this.factor=1}};(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:Number,json:{read:{source:"textureSetDefinitionId"}}})],i.prototype,"id",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:Number})],i.prototype,"factor",void 0),i=(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_5__.j)("esri.layer.support.I3SMaterialTexture")],i);let a=class extends _core_JSONSupport_js__WEBPACK_IMPORTED_MODULE_0__.wq{constructor(){super(...arguments),this.baseColorFactor=[1,1,1,1],this.baseColorTexture=null,this.metallicRoughnessTexture=null,this.metallicFactor=1,this.roughnessFactor=1}};(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:[Number]})],a.prototype,"baseColorFactor",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:i})],a.prototype,"baseColorTexture",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:i})],a.prototype,"metallicRoughnessTexture",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:Number})],a.prototype,"metallicFactor",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:Number})],a.prototype,"roughnessFactor",void 0),a=(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_5__.j)("esri.layer.support.I3SMaterialPBRMetallicRoughness")],a);let l=class extends _core_JSONSupport_js__WEBPACK_IMPORTED_MODULE_0__.wq{constructor(){super(...arguments),this.alphaMode="opaque",this.alphaCutoff=.25,this.doubleSided=!1,this.cullFace="none",this.normalTexture=null,this.occlusionTexture=null,this.emissiveTexture=null,this.emissiveFactor=null,this.pbrMetallicRoughness=null}};(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_enumeration_js__WEBPACK_IMPORTED_MODULE_4__.J)({opaque:"opaque",mask:"mask",blend:"blend"})],l.prototype,"alphaMode",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:Number})],l.prototype,"alphaCutoff",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:Boolean})],l.prototype,"doubleSided",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_enumeration_js__WEBPACK_IMPORTED_MODULE_4__.J)({none:"none",back:"back",front:"front"})],l.prototype,"cullFace",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:i})],l.prototype,"normalTexture",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:i})],l.prototype,"occlusionTexture",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:i})],l.prototype,"emissiveTexture",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:[Number]})],l.prototype,"emissiveFactor",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:a})],l.prototype,"pbrMetallicRoughness",void 0),l=(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_5__.j)("esri.layer.support.I3SMaterialDefinition")],l);let n=class extends _core_JSONSupport_js__WEBPACK_IMPORTED_MODULE_0__.wq{};(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:String,json:{read:{source:["name","index"],reader:(e,t)=>null!=e?e:`${t.index}`}}})],n.prototype,"name",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_enumeration_js__WEBPACK_IMPORTED_MODULE_4__.J)({jpg:"jpg",png:"png",dds:"dds","ktx-etc2":"ktx-etc2",ktx2:"ktx2",basis:"basis"})],n.prototype,"format",void 0),n=(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_5__.j)("esri.layer.support.I3STextureFormat")],n);let u=class extends _core_JSONSupport_js__WEBPACK_IMPORTED_MODULE_0__.wq{constructor(){super(...arguments),this.atlas=!1}};(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:[n]})],u.prototype,"formats",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:Boolean})],u.prototype,"atlas",void 0),u=(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_5__.j)("esri.layer.support.I3STextureSetDefinition")],u);let y=class extends _core_JSONSupport_js__WEBPACK_IMPORTED_MODULE_0__.wq{};(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_enumeration_js__WEBPACK_IMPORTED_MODULE_4__.J)({Float32:"Float32",UInt64:"UInt64",UInt32:"UInt32",UInt16:"UInt16",UInt8:"UInt8"})],y.prototype,"type",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:Number})],y.prototype,"component",void 0),y=(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_5__.j)("esri.layer.support.I3SGeometryAttribute")],y);let d=class extends _core_JSONSupport_js__WEBPACK_IMPORTED_MODULE_0__.wq{};(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_enumeration_js__WEBPACK_IMPORTED_MODULE_4__.J)({draco:"draco"})],d.prototype,"encoding",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:[String]})],d.prototype,"attributes",void 0),d=(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_5__.j)("esri.layer.support.I3SGeometryCompressedAttributes")],d);let c=class extends _core_JSONSupport_js__WEBPACK_IMPORTED_MODULE_0__.wq{constructor(){super(...arguments),this.offset=0}};(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:Number})],c.prototype,"offset",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:y})],c.prototype,"position",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:y})],c.prototype,"normal",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:y})],c.prototype,"uv0",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:y})],c.prototype,"color",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:y})],c.prototype,"uvRegion",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:y})],c.prototype,"featureId",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:y})],c.prototype,"faceRange",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:d})],c.prototype,"compressedAttributes",void 0),c=(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_5__.j)("esri.layer.support.I3SGeometryBuffer")],c);let m=class extends _core_JSONSupport_js__WEBPACK_IMPORTED_MODULE_0__.wq{};(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_enumeration_js__WEBPACK_IMPORTED_MODULE_4__.J)({triangle:"triangle"})],m.prototype,"topology",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.Cb)()],m.prototype,"geometryBuffers",void 0),m=(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_6__._)([(0,_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_5__.j)("esri.layer.support.I3SGeometryDefinition")],m)},"./node_modules/@arcgis/core/portal/support/resourceUtils.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{addOrUpdateResource:()=>u,contentToBlob:()=>h,fetchResources:()=>c,getSiblingOfSameType:()=>f,getSiblingOfSameTypeI:()=>w,removeAllResources:()=>l,removeResource:()=>i,splitPrefixFileNameAndExtension:()=>d});var _request_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/request.js"),_core_Error_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/core/urlUtils.js");async function c(e,t={},a){await e.load(a);const o=(0,_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_2__.v_)(e.itemUrl,"resources"),{start:n=1,num:c=10,sortOrder:u="asc",sortField:i="created"}=t,l={query:{start:n,num:c,sortOrder:u,sortField:i,token:e.apiKey},signal:(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__.U2)(a,"signal")},p=await e.portal.request(o,l);return{total:p.total,nextStart:p.nextStart,resources:p.resources.map((({created:t,size:r,resource:a})=>({created:new Date(t),size:r,resource:e.resourceFromPath(a)})))}}async function u(e,o,n,c){if(!e.hasPath())throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_1__.Z(`portal-item-resource-${o}:invalid-path`,"Resource does not have a valid path");const u=e.portalItem;await u.load(c);const i=(0,_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_2__.v_)(u.userItemUrl,"add"===o?"addResources":"updateResources"),[l,d]=p(e.path),m=await h(n),f=new FormData;return l&&"."!==l&&f.append("resourcesPrefix",l),(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__.pC)(c)&&c.compress&&f.append("compress","true"),f.append("fileName",d),f.append("file",m,d),f.append("f","json"),(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__.pC)(c)&&c.access&&f.append("access",c.access),await u.portal.request(i,{method:"post",body:f,signal:(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__.U2)(c,"signal")}),e}async function i(e,a,o){if(!a.hasPath())throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_1__.Z("portal-item-resources-remove:invalid-path","Resource does not have a valid path");await e.load(o);const n=(0,_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_2__.v_)(e.userItemUrl,"removeResources");await e.portal.request(n,{method:"post",query:{resource:a.path},signal:(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__.U2)(o,"signal")}),a.portalItem=null}async function l(e,t){await e.load(t);const a=(0,_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_2__.v_)(e.userItemUrl,"removeResources");return e.portal.request(a,{method:"post",query:{deleteAll:!0},signal:(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__.U2)(t,"signal")})}function p(e){const t=e.lastIndexOf("/");return-1===t?[".",e]:[e.slice(0,t),e.slice(t+1)]}function d(e){const[t,r]=function m(e){const t=(0,_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_2__.Ml)(e);return(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__.Wi)(t)?[e,""]:[e.slice(0,e.length-t.length-1),`.${t}`]}(e),[a,o]=p(t);return[a,o,r]}async function h(t){return t instanceof Blob?t:(await(0,_request_js__WEBPACK_IMPORTED_MODULE_0__.default)(t.url,{responseType:"blob"})).data}function f(e,t){if(!e.hasPath())return null;const[r,,a]=d(e.path);return e.portalItem.resourceFromPath((0,_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_2__.v_)(r,t+a))}function w(e,t){if(!e.hasPath())return null;const[r,,a]=d(e.path);return e.portalItem.resourceFromPath((0,_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_2__.v_)(r,t+a))}}}]);