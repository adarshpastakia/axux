"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[1968],{"./node_modules/@arcgis/core/layers/BingMapsLayer.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>v});var h,tslib_es6=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),request=(__webpack_require__("./node_modules/@arcgis/core/geometry.js"),__webpack_require__("./node_modules/@arcgis/core/request.js")),Error=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),jsonMap=__webpack_require__("./node_modules/@arcgis/core/core/jsonMap.js"),maybe=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),MultiOriginJSONSupport=__webpack_require__("./node_modules/@arcgis/core/core/MultiOriginJSONSupport.js"),property=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),subclass=(__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/arrayUtils.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js")),SpatialReference=__webpack_require__("./node_modules/@arcgis/core/geometry/SpatialReference.js"),Extent=__webpack_require__("./node_modules/@arcgis/core/geometry/Extent.js"),aaBoundingRect=__webpack_require__("./node_modules/@arcgis/core/geometry/support/aaBoundingRect.js"),Layer=__webpack_require__("./node_modules/@arcgis/core/layers/Layer.js"),BlendLayer=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/BlendLayer.js"),RefreshableLayer=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/RefreshableLayer.js"),ScaleRangeLayer=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/ScaleRangeLayer.js"),imageBitmapUtils=__webpack_require__("./node_modules/@arcgis/core/layers/support/imageBitmapUtils.js"),TileInfo=__webpack_require__("./node_modules/@arcgis/core/layers/support/TileInfo.js");const d=new(__webpack_require__("./node_modules/@arcgis/core/layers/support/TileKey.js").f)("0/0/0",0,0,0,void 0);let g=h=class extends((0,BlendLayer.h)((0,ScaleRangeLayer.M)((0,RefreshableLayer.Q)(Layer.Z)))){constructor(){super(...arguments),this.tileInfo=TileInfo.Z.create({spatialReference:SpatialReference.Z.WebMercator,size:256}),this.type="base-tile",this.fullExtent=new Extent.Z(-20037508.342787,-20037508.34278,20037508.34278,20037508.342787,SpatialReference.Z.WebMercator),this.spatialReference=SpatialReference.Z.WebMercator}getTileBounds(e,t,r,o){const s=o||(0,aaBoundingRect.Ue)();return d.level=e,d.row=t,d.col=r,d.extent=s,this.tileInfo.updateTileInfo(d),d.extent=void 0,s}fetchTile(e,r,o,s={}){const{signal:i}=s,a=this.getTileUrl(e,r,o),l={responseType:"image",signal:i,query:{...this.refreshParameters}};return(0,request.default)(a??"",l).then((e=>e.data))}async fetchImageBitmapTile(e,o,s,i={}){const{signal:a}=i;if(this.fetchTile!==h.prototype.fetchTile){const t=await this.fetchTile(e,o,s,i);try{return createImageBitmap(t)}catch(m){throw new Error.Z("request:server",`Unable to load tile ${e}/${o}/${s}`,{error:m,level:e,row:o,col:s})}}const l=this.getTileUrl(e,o,s)??"",p={responseType:"blob",signal:a,query:{...this.refreshParameters}},{data:n}=await(0,request.default)(l,p);return(0,imageBitmapUtils.g)(n,l)}getTileUrl(){throw new Error.Z("basetilelayer:gettileurl-not-implemented","getTileUrl() is not implemented")}};(0,tslib_es6._)([(0,property.Cb)({type:TileInfo.Z})],g.prototype,"tileInfo",void 0),(0,tslib_es6._)([(0,property.Cb)({type:["show","hide"]})],g.prototype,"listMode",void 0),(0,tslib_es6._)([(0,property.Cb)({readOnly:!0,value:"base-tile"})],g.prototype,"type",void 0),(0,tslib_es6._)([(0,property.Cb)({nonNullable:!0})],g.prototype,"fullExtent",void 0),(0,tslib_es6._)([(0,property.Cb)()],g.prototype,"spatialReference",void 0),g=h=(0,tslib_es6._)([(0,subclass.j)("esri.layers.BaseTileLayer")],g);const j=g;var OperationalLayer=__webpack_require__("./node_modules/@arcgis/core/layers/mixins/OperationalLayer.js"),LOD=__webpack_require__("./node_modules/@arcgis/core/layers/support/LOD.js"),Point=__webpack_require__("./node_modules/@arcgis/core/geometry/Point.js");const BingMapsLayer_h=new jsonMap.X({BingMapsAerial:"aerial",BingMapsRoad:"road",BingMapsHybrid:"hybrid"});let w=class extends((0,BlendLayer.h)((0,OperationalLayer.q)((0,MultiOriginJSONSupport.R)(j)))){constructor(e){super(e),this.type="bing-maps",this.tileInfo=new TileInfo.Z({size:[256,256],dpi:96,origin:new Point.Z({x:-20037508.342787,y:20037508.342787,spatialReference:SpatialReference.Z.WebMercator}),spatialReference:SpatialReference.Z.WebMercator,lods:[new LOD.Z({level:1,resolution:78271.5169639999,scale:295828763.795777}),new LOD.Z({level:2,resolution:39135.7584820001,scale:147914381.897889}),new LOD.Z({level:3,resolution:19567.8792409999,scale:73957190.948944}),new LOD.Z({level:4,resolution:9783.93962049996,scale:36978595.474472}),new LOD.Z({level:5,resolution:4891.96981024998,scale:18489297.737236}),new LOD.Z({level:6,resolution:2445.98490512499,scale:9244648.868618}),new LOD.Z({level:7,resolution:1222.99245256249,scale:4622324.434309}),new LOD.Z({level:8,resolution:611.49622628138,scale:2311162.217155}),new LOD.Z({level:9,resolution:305.748113140558,scale:1155581.108577}),new LOD.Z({level:10,resolution:152.874056570411,scale:577790.554289}),new LOD.Z({level:11,resolution:76.4370282850732,scale:288895.277144}),new LOD.Z({level:12,resolution:38.2185141425366,scale:144447.638572}),new LOD.Z({level:13,resolution:19.1092570712683,scale:72223.819286}),new LOD.Z({level:14,resolution:9.55462853563415,scale:36111.909643}),new LOD.Z({level:15,resolution:4.77731426794937,scale:18055.954822}),new LOD.Z({level:16,resolution:2.38865713397468,scale:9027.977411}),new LOD.Z({level:17,resolution:1.19432856685505,scale:4513.988705}),new LOD.Z({level:18,resolution:.597164283559817,scale:2256.994353}),new LOD.Z({level:19,resolution:.298582141647617,scale:1128.497176}),new LOD.Z({level:20,resolution:.1492910708238085,scale:564.248588})]}),this.key=null,this.style="road",this.culture="en-US",this.region=null,this.portalUrl=null,this.hasAttributionData=!0}get bingMetadata(){return this._get("bingMetadata")}set bingMetadata(e){this._set("bingMetadata",e)}get copyright(){return(0,maybe.pC)(this.bingMetadata)?this.bingMetadata.copyright:null}get operationalLayerType(){return BingMapsLayer_h.toJSON(this.style)}get bingLogo(){return(0,maybe.pC)(this.bingMetadata)?this.bingMetadata.brandLogoUri:null}load(e){return this.key?this.addResolvingPromise(this._getMetadata()):this.portalUrl?this.addResolvingPromise(this._getPortalBingKey().then((()=>this._getMetadata()))):this.addResolvingPromise(Promise.reject(new Error.Z("bingmapslayer:load","Bing layer must have bing key."))),Promise.resolve(this)}getTileUrl(e,t,r){if(!this.loaded||(0,maybe.Wi)(this.bingMetadata))return null;const o=this.bingMetadata.resourceSets[0].resources[0],a=o.imageUrlSubdomains[t%o.imageUrlSubdomains.length],i=this._getQuadKey(e,t,r);return o.imageUrl.replace("{subdomain}",a).replace("{quadkey}",i)}async fetchAttributionData(){return this.load().then((()=>(0,maybe.Wi)(this.bingMetadata)?null:{contributors:this.bingMetadata.resourceSets[0].resources[0].imageryProviders.map((e=>({attribution:e.attribution,coverageAreas:e.coverageAreas.map((e=>({zoomMin:e.zoomMin,zoomMax:e.zoomMax,score:1,bbox:[e.bbox[0],e.bbox[1],e.bbox[2],e.bbox[3]]})))})))}))}_getMetadata(){const e={road:"roadOnDemand",aerial:"aerial",hybrid:"aerialWithLabelsOnDemand"}[this.style];return(0,request.default)(`https://dev.virtualearth.net/REST/v1/Imagery/Metadata/${e}`,{responseType:"json",query:{include:"ImageryProviders",uriScheme:"https",key:this.key,suppressStatus:!0,output:"json",culture:this.culture,userRegion:this.region}}).then((e=>{const t=e.data;if(200!==t.statusCode)throw new Error.Z("bingmapslayer:getmetadata",t.statusDescription);if(this.bingMetadata=t,0===this.bingMetadata.resourceSets.length)throw new Error.Z("bingmapslayer:getmetadata","no bing resourcesets");if(0===this.bingMetadata.resourceSets[0].resources.length)throw new Error.Z("bingmapslayer:getmetadata","no bing resources")})).catch((e=>{throw new Error.Z("bingmapslayer:getmetadata",e.message)}))}_getPortalBingKey(){return(0,request.default)(this.portalUrl??"",{responseType:"json",authMode:"no-prompt",query:{f:"json"}}).then((e=>{if(!e.data.bingKey)throw new Error.Z("bingmapslayer:getportalbingkey","The referenced Portal does not contain a valid bing key");this.key=e.data.bingKey})).catch((e=>{throw new Error.Z("bingmapslayer:getportalbingkey",e.message)}))}_getQuadKey(e,t,r){let o="";for(let a=e;a>0;a--){let e=0;const s=1<<a-1;0!=(r&s)&&(e+=1),0!=(t&s)&&(e+=2),o+=e.toString()}return o}};(0,tslib_es6._)([(0,property.Cb)({json:{read:!1,write:!1},value:null})],w.prototype,"bingMetadata",null),(0,tslib_es6._)([(0,property.Cb)({json:{read:!1,write:!1},value:"bing-maps",readOnly:!0})],w.prototype,"type",void 0),(0,tslib_es6._)([(0,property.Cb)({type:TileInfo.Z})],w.prototype,"tileInfo",void 0),(0,tslib_es6._)([(0,property.Cb)({type:String,readOnly:!0,json:{read:!1,write:!1}})],w.prototype,"copyright",null),(0,tslib_es6._)([(0,property.Cb)({type:String,json:{write:!1,read:!1}})],w.prototype,"key",void 0),(0,tslib_es6._)([(0,property.Cb)({type:BingMapsLayer_h.apiValues,nonNullable:!0,json:{read:{source:"layerType",reader:BingMapsLayer_h.read}}})],w.prototype,"style",void 0),(0,tslib_es6._)([(0,property.Cb)({type:["BingMapsAerial","BingMapsHybrid","BingMapsRoad"]})],w.prototype,"operationalLayerType",null),(0,tslib_es6._)([(0,property.Cb)({type:String,json:{write:!1,read:!1}})],w.prototype,"culture",void 0),(0,tslib_es6._)([(0,property.Cb)({type:String,json:{write:!1,read:!1}})],w.prototype,"region",void 0),(0,tslib_es6._)([(0,property.Cb)({type:String,json:{write:!0,read:!0}})],w.prototype,"portalUrl",void 0),(0,tslib_es6._)([(0,property.Cb)({type:Boolean,json:{write:!1,read:!1}})],w.prototype,"hasAttributionData",void 0),(0,tslib_es6._)([(0,property.Cb)({type:String,readOnly:!0})],w.prototype,"bingLogo",null),w=(0,tslib_es6._)([(0,subclass.j)("esri.layers.BingMapsLayer")],w);const v=w}}]);