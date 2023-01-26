"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[8205],{"./node_modules/@arcgis/core/layers/effects/EffectView.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{AM:()=>a});var _chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@arcgis/core/chunks/tslib.es6.js"),_core_Accessor_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/Accessor.js"),_core_has_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/has.js"),_core_lang_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/core/lang.js"),_core_Logger_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/core/Logger.js"),_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js"),_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_6__=(__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/ensureType.js"),__webpack_require__("./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js")),_parser_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@arcgis/core/layers/effects/parser.js"),_utils_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@arcgis/core/layers/effects/utils.js");const l=-1;let a=class extends _core_Accessor_js__WEBPACK_IMPORTED_MODULE_0__.Z{constructor(t){super(t),this._from=null,this._to=null,this._final=null,this._current=[],this._time=0,this.duration=(0,_core_has_js__WEBPACK_IMPORTED_MODULE_1__.Z)("mapview-transitions-duration"),this.effects=[]}set effect(t){if(this._get("effect")!==(t=t||"")){this._set("effect",t);try{this._transitionTo(h(t))}catch(e){this._transitionTo([]),_core_Logger_js__WEBPACK_IMPORTED_MODULE_3__.Z.getLogger(this.declaredClass).warn("Invalid Effect",{effect:t,error:e})}}}get hasEffects(){return this.transitioning||!!this.effects.length}set scale(t){this._updateForScale(t)}get transitioning(){return null!==this._to}canTransitionTo(t){try{return this.scale>0&&u(this._current,h(t),this.scale)}catch{return!1}}transitionStep(t,e){this._applyTimeTransition(t),this._updateForScale(e)}endTransitions(){this._applyTimeTransition(this.duration)}_transitionTo(t){this.scale>0&&u(this._current,t,this.scale)?(this._final=t,this._to=(0,_core_lang_js__WEBPACK_IMPORTED_MODULE_2__.d9)(t),function _(t,e,s){const r=t.length>e.length?t:e,i=t.length>e.length?e:t,n=i[i.length-1],c=n?.scale??s,o=n?.effects??[];for(let f=i.length;f<r.length;f++)i.push({scale:c,effects:[...o]});for(let a=0;a<r.length;a++)i[a].scale=i[a].scale===l?s:i[a].scale,r[a].scale=r[a].scale===l?s:r[a].scale,(0,_utils_js__WEBPACK_IMPORTED_MODULE_8__.uF)(i[a].effects,r[a].effects)}(this._current,this._to,this.scale),this._from=(0,_core_lang_js__WEBPACK_IMPORTED_MODULE_2__.d9)(this._current),this._time=0):(this._from=this._to=this._final=null,this._current=t),this._set("effects",this._current[0]?(0,_core_lang_js__WEBPACK_IMPORTED_MODULE_2__.d9)(this._current[0].effects):[])}_applyTimeTransition(t){if(!(this._to&&this._from&&this._current&&this._final))return;this._time+=t;const e=Math.min(1,this._time/this.duration);for(let s=0;s<this._current.length;s++){const t=this._current[s],r=this._from[s],i=this._to[s];t.scale=p(r.scale,i.scale,e);for(let s=0;s<t.effects.length;s++){const n=t.effects[s],c=r.effects[s],o=i.effects[s];n.interpolate(c,o,e)}}1===e&&(this._current=this._final,this._set("effects",this._current[0]?(0,_core_lang_js__WEBPACK_IMPORTED_MODULE_2__.d9)(this._current[0].effects):[]),this._from=this._to=this._final=null)}_updateForScale(t){if(this._set("scale",t),0===this._current.length)return;const e=this._current,s=this._current.length-1;let r,i,n=1;if(1===e.length||t>=e[0].scale)i=r=e[0].effects;else if(t<=e[s].scale)i=r=e[s].effects;else for(let c=0;c<s;c++){const s=e[c],o=e[c+1];if(s.scale>=t&&o.scale<=t){n=(t-s.scale)/(o.scale-s.scale),r=s.effects,i=o.effects;break}}for(let c=0;c<this.effects.length;c++)this.effects[c].interpolate(r[c],i[c],n)}};function h(t){const e=(0,_parser_js__WEBPACK_IMPORTED_MODULE_7__.Q)(t)||[];return function m(t){const e=t[0];return!!e&&"type"in e}(e)?[{scale:l,effects:e}]:e}function u(t,e,s){return!t[0]?.effects||!e[0]?.effects||!((t[0]?.scale===l||e[0]?.scale===l)&&(t.length>1||e.length>1)&&s<=0)&&(0,_utils_js__WEBPACK_IMPORTED_MODULE_8__.AS)(t[0].effects,e[0].effects)}function p(t,e,s){return t+(e-t)*s}(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_9__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_4__.Cb)()],a.prototype,"_to",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_9__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_4__.Cb)()],a.prototype,"duration",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_9__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_4__.Cb)({value:""})],a.prototype,"effect",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_9__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_4__.Cb)({readOnly:!0})],a.prototype,"effects",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_9__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_4__.Cb)({readOnly:!0})],a.prototype,"hasEffects",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_9__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_4__.Cb)({value:0})],a.prototype,"scale",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_9__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_4__.Cb)({readOnly:!0})],a.prototype,"transitioning",null),a=(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_9__._)([(0,_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_6__.j)("esri.layers.effects.EffectView")],a)},"./node_modules/@arcgis/core/views/2d/engine/Container.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>i});var _chunks_mat3f32_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/chunks/mat3f32.js"),_layers_effects_EffectView_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/layers/effects/EffectView.js"),_DisplayObject_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/DisplayObject.js");class i extends _DisplayObject_js__WEBPACK_IMPORTED_MODULE_2__.s{constructor(){super(...arguments),this._childrenSet=new Set,this._needsSort=!1,this.children=[],this._effectView=null}get blendMode(){return this._blendMode}set blendMode(e){this._blendMode=e,this.requestRender()}get clips(){return this._clips}set clips(e){this._clips=e,this.children.forEach((t=>t.clips=e))}get computedEffects(){return this._effectView?.effects??null}get effect(){return this._effectView?.effect??""}set effect(e){(this._effectView||e)&&(this._effectView||(this._effectView=new _layers_effects_EffectView_js__WEBPACK_IMPORTED_MODULE_1__.AM),this._effectView.effect=e,this.requestRender())}updateTransitionProperties(e,t){super.updateTransitionProperties(e,t),this._effectView&&(this._effectView.transitionStep(e,t),this._effectView.transitioning&&this.requestRender())}doRender(e){const t=this.createRenderParams(e);this.renderChildren(t)}addChild(e){return this.addChildAt(e,this.children.length)}addChildAt(e,t=this.children.length){if(!e)return e;if(this.contains(e))return e;this._needsSort=!0;const s=e.parent;return s&&s!==this&&s.removeChild(e),t>=this.children.length?this.children.push(e):this.children.splice(t,0,e),this._childrenSet.add(e),e.parent=this,e.stage=this.stage,this!==this.stage&&(e.clips=this.clips),this.requestRender(),e}contains(e){return this._childrenSet.has(e)}endTransitions(){super.endTransitions(),this._effectView&&(this._effectView.endTransitions(),this.requestRender())}removeAllChildren(){this._childrenSet.clear(),this._needsSort=!0;for(const e of this.children)this!==this.stage&&(e.clips=null),e.stage=null,e.parent=null;this.children.length=0}removeChild(e){return this.contains(e)?this.removeChildAt(this.children.indexOf(e)):e}removeChildAt(e){if(e<0||e>=this.children.length)return null;this._needsSort=!0;const t=this.children.splice(e,1)[0];return this._childrenSet.delete(t),this!==this.stage&&(t.clips=null),t.stage=null,t.parent=null,t}sortChildren(e){this._needsSort&&(this.children.sort(e),this._needsSort=!1)}beforeRender(e){super.beforeRender(e);for(const t of this.children)t.beforeRender(e)}afterRender(e){super.afterRender(e);for(const t of this.children)t.afterRender(e)}_createTransforms(){return{dvs:(0,_chunks_mat3f32_js__WEBPACK_IMPORTED_MODULE_0__.c)()}}onAttach(){super.onAttach();const e=this.stage;for(const t of this.children)t.stage=e}onDetach(){super.onDetach();for(const e of this.children)e.stage=null}renderChildren(e){for(const t of this.children)t.processRender(e)}createRenderParams(e){return{...e,blendMode:this.blendMode,effects:this.computedEffects,globalOpacity:e.globalOpacity*this.computedOpacity,inFadeTransition:this.inFadeTransition}}}},"./node_modules/@arcgis/core/views/2d/engine/DisplayObject.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>r});var _core_Evented_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/Evented.js"),_core_has_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/core/has.js"),_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/core/promiseUtils.js");const i=1/(0,_core_has_js__WEBPACK_IMPORTED_MODULE_1__.Z)("mapview-transitions-duration");class r extends _core_Evented_js__WEBPACK_IMPORTED_MODULE_0__.Z{constructor(){super(...arguments),this._fadeOutResolver=null,this._fadeInResolver=null,this._clips=null,this.computedVisible=!0,this.computedOpacity=1,this.fadeTransitionEnabled=!1,this.inFadeTransition=!1,this._isReady=!1,this._opacity=1,this._stage=null,this._visible=!0}get clips(){return this._clips}set clips(e){this._clips=e,this.requestRender()}get isReady(){return this._isReady}get opacity(){return this._opacity}set opacity(e){this._opacity!==e&&(this._opacity=Math.min(1,Math.max(e,0)),this.requestRender())}get stage(){return this._stage}set stage(e){if(this._stage===e)return;const t=this._stage;this._stage=e,e?this._stage.untrashDisplayObject(this)||(this.onAttach(),this.emit("attach")):t.trashDisplayObject(this)}get transforms(){return this._getTransforms()}_getTransforms(){return(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__.Wi)(this._transforms)&&(this._transforms=this._createTransforms()),this._transforms}get visible(){return this._visible}set visible(e){this._visible!==e&&(this._visible=e,this.requestRender())}fadeIn(){return this._fadeInResolver||(this._fadeOutResolver&&(this._fadeOutResolver(),this._fadeOutResolver=null),this.opacity=1,this.computedOpacity=0,this.fadeTransitionEnabled=!0,this._fadeInResolver=(0,_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_2__.hh)(),this.requestRender()),this._fadeInResolver.promise}fadeOut(){return this._fadeOutResolver||(this.opacity=0,this._fadeInResolver&&(this._fadeInResolver(),this._fadeInResolver=null),this.fadeTransitionEnabled=!0,this._fadeOutResolver=(0,_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_2__.hh)(),this.requestRender()),this._fadeOutResolver.promise}endTransitions(){this._fadeInResolver?.(),this._fadeInResolver=null,this._fadeOutResolver?.(),this._fadeOutResolver=null,this.computedOpacity=this.visible?this.opacity:0,this.requestRender()}beforeRender(e){this.updateTransitionProperties(e.deltaTime,e.state.scale)}afterRender(e){this._fadeInResolver&&this.computedOpacity===this.opacity?(this._fadeInResolver(),this._fadeInResolver=null):this._fadeOutResolver&&0===this.computedOpacity&&(this._fadeOutResolver(),this._fadeOutResolver=null)}remove(){this.parent?.removeChild(this)}setTransform(e){}processRender(e){this.stage&&this.computedVisible&&this.doRender(e)}requestRender(){this.stage&&this.stage.requestRender()}processDetach(){this._fadeInResolver&&(this._fadeInResolver(),this._fadeInResolver=null),this._fadeOutResolver&&(this._fadeOutResolver(),this._fadeOutResolver=null),this.onDetach(),this.emit("detach")}updateTransitionProperties(e,t){if(this.fadeTransitionEnabled){const t=this._fadeOutResolver||!this.visible?0:this.opacity,s=this.computedOpacity;if(s===t)this.computedVisible=this.visible;else{const r=e*i;this.computedOpacity=s>t?Math.max(t,s-r):Math.min(t,s+r),this.computedVisible=this.computedOpacity>0;const a=t===this.computedOpacity;this.inFadeTransition=!a,a||this.requestRender()}}else this.computedOpacity=this.opacity,this.computedVisible=this.visible}onAttach(){}onDetach(){}doRender(e){}ready(){this._isReady||(this._isReady=!0,this.emit("isReady"),this.requestRender())}}},"./node_modules/@arcgis/core/views/2d/engine/webgl/alignmentUtils.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{var e,t;function r(t){switch(t){case"left":return e.Left;case"right":return e.Right;case"center":return e.Center}}function n(e){switch(e){case"top":return t.Top;case"middle":return t.Center;case"baseline":return t.Baseline;case"bottom":return t.Bottom}}function a(r){switch(r){case"above-left":case"esriServerPointLabelPlacementAboveLeft":return[e.Right,t.Bottom];case"above-center":case"above-along":case"esriServerPointLabelPlacementAboveCenter":case"esriServerLinePlacementAboveAlong":return[e.Center,t.Bottom];case"above-right":case"esriServerPointLabelPlacementAboveRight":return[e.Left,t.Bottom];case"center-left":case"esriServerPointLabelPlacementCenterLeft":return[e.Right,t.Center];case"center-center":case"center-along":case"esriServerPointLabelPlacementCenterCenter":case"esriServerLinePlacementCenterAlong":case"always-horizontal":case"esriServerPolygonPlacementAlwaysHorizontal":return[e.Center,t.Center];case"center-right":case"esriServerPointLabelPlacementCenterRight":return[e.Left,t.Center];case"below-left":case"esriServerPointLabelPlacementBelowLeft":return[e.Right,t.Top];case"below-center":case"below-along":case"esriServerPointLabelPlacementBelowCenter":case"esriServerLinePlacementBelowAlong":return[e.Center,t.Top];case"below-right":case"esriServerPointLabelPlacementBelowRight":return[e.Left,t.Top];default:return console.debug(`Found invalid placement type ${r}`),[e.Center,t.Center]}}function c(t){switch(t){case e.Right:return-1;case e.Center:return 0;case e.Left:return 1;default:return console.debug(`Found invalid horizontal alignment ${t}`),0}}function o(e){switch(e){case t.Top:return 1;case t.Center:return 0;case t.Bottom:case t.Baseline:return-1;default:return console.debug(`Found invalid vertical alignment ${e}`),0}}function s(t){switch(t){case"left":return e.Left;case"right":return e.Right;case"center":return e.Center}}function i(e){switch(e){case"above-along":case"below-along":case"center-along":case"esriServerLinePlacementAboveAlong":case"esriServerLinePlacementBelowAlong":case"esriServerLinePlacementCenterAlong":return!0;default:return!1}}__webpack_require__.d(__webpack_exports__,{Hd:()=>s,M7:()=>e,NS:()=>i,TR:()=>t,b7:()=>n,g:()=>c,kH:()=>r,qv:()=>a,tf:()=>o}),function(e){e[e.Left=-1]="Left",e[e.Center=0]="Center",e[e.Right=1]="Right"}(e||(e={})),function(e){e[e.Top=1]="Top",e[e.Center=0]="Center",e[e.Bottom=-1]="Bottom",e[e.Baseline=2]="Baseline"}(t||(t={}))},"./node_modules/@arcgis/core/views/2d/engine/webgl/materialKey/MaterialKey.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{CA:()=>O,Gq:()=>Z,Xp:()=>b,a:()=>C,dk:()=>w,hF:()=>A,jj:()=>f,jy:()=>_,m2:()=>U,mE:()=>N,qr:()=>P});var _core_Error_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),_alignmentUtils_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/alignmentUtils.js"),_enums_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/enums.js");const M=Object.keys(_enums_js__WEBPACK_IMPORTED_MODULE_2__.mD).filter((t=>"number"==typeof _enums_js__WEBPACK_IMPORTED_MODULE_2__.mD[t])).reduce(((t,e)=>({...t,[e]:_enums_js__WEBPACK_IMPORTED_MODULE_2__.mD[e]})),{});function _(t){return t===_enums_js__WEBPACK_IMPORTED_MODULE_2__.mD.OUTLINE_FILL||t===_enums_js__WEBPACK_IMPORTED_MODULE_2__.mD.OUTLINE_FILL_SIMPLE}function b(t){return function I(t){return t===_enums_js__WEBPACK_IMPORTED_MODULE_2__.mD.SIMPLE||t===_enums_js__WEBPACK_IMPORTED_MODULE_2__.mD.OUTLINE_FILL_SIMPLE}(t.symbologyType)}function O(t){return _(t.symbologyType)}function f(t,e){switch(t){case _enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.FILL:return w.from(e);case _enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.LINE:return C.from(e);case _enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.MARKER:return N.from(e);case _enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.TEXT:return P.from(e);case _enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.LABEL:return Z.from(e);default:throw new Error(`Unable to createMaterialKey for unknown geometryType ${t}`)}}function A(t){switch(U.load(t).geometryType){case _enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.MARKER:return new N(t);case _enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.FILL:return new w(t);case _enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.LINE:return new C(t);case _enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.TEXT:return new P(t);case _enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.LABEL:return new Z(t)}}class U{constructor(t){this._data=0,this._data=t}static load(t){const e=this.shared;return e.data=t,e}set data(t){this._data=t}get data(){return this._data}get geometryType(){return this.bits(8,11)}set geometryType(t){this.setBits(t,8,11)}get mapAligned(){return!!this.bit(20)}set mapAligned(t){this.setBit(20,t)}get sdf(){return!!this.bit(11)}set sdf(t){this.setBit(11,t)}get pattern(){return!!this.bit(12)}set pattern(t){this.setBit(12,t)}get textureBinding(){return this.bits(0,8)}set textureBinding(t){this.setBits(t,0,8)}get symbologyType(){return this.bits(21,26)}set symbologyType(t){this.setBits(t,21,26)}get geometryTypeString(){switch(this.geometryType){case _enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.FILL:return"fill";case _enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.MARKER:return"marker";case _enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.LINE:return"line";case _enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.TEXT:return"text";case _enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.LABEL:return"label";default:throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_0__.Z(`Unable to handle unknown geometryType: ${this.geometryType}`)}}setBit(t,e){const s=1<<t;e?this._data|=s:this._data&=~s}bit(t){return(this._data&1<<t)>>t}setBits(t,e,s){for(let i=e,a=0;i<s;i++,a++)this.setBit(i,0!=(t&1<<a))}bits(t,e){let s=0;for(let i=t,a=0;i<e;i++,a++)s|=this.bit(i)<<a;return s}hasVV(){return!1}setVV(t,e){}getVariation(){return{mapAligned:this.mapAligned,pattern:this.pattern,sdf:this.sdf,symbologyType:{value:_enums_js__WEBPACK_IMPORTED_MODULE_2__.mD[this.symbologyType],options:M,namespace:"SYMBOLOGY_TYPE"}}}getVariationHash(){return this._data&~(7&this.textureBinding)}}U.shared=new U(0);const F=t=>class extends t{get vvSizeMinMaxValue(){return 0!==this.bit(16)}set vvSizeMinMaxValue(t){this.setBit(16,t)}get vvSizeScaleStops(){return 0!==this.bit(17)}set vvSizeScaleStops(t){this.setBit(17,t)}get vvSizeFieldStops(){return 0!==this.bit(18)}set vvSizeFieldStops(t){this.setBit(18,t)}get vvSizeUnitValue(){return 0!==this.bit(19)}set vvSizeUnitValue(t){this.setBit(19,t)}hasVV(){return super.hasVV()||this.vvSizeMinMaxValue||this.vvSizeScaleStops||this.vvSizeFieldStops||this.vvSizeUnitValue}setVV(t,e){super.setVV(t,e);const s=function n(t,e,s){const n=_enums_js__WEBPACK_IMPORTED_MODULE_2__.X.SIZE_FIELD_STOPS|_enums_js__WEBPACK_IMPORTED_MODULE_2__.X.SIZE_MINMAX_VALUE|_enums_js__WEBPACK_IMPORTED_MODULE_2__.X.SIZE_SCALE_STOPS|_enums_js__WEBPACK_IMPORTED_MODULE_2__.X.SIZE_UNIT_VALUE,o=(e&(_enums_js__WEBPACK_IMPORTED_MODULE_2__.mf.FIELD_TARGETS_OUTLINE|_enums_js__WEBPACK_IMPORTED_MODULE_2__.mf.MINMAX_TARGETS_OUTLINE|_enums_js__WEBPACK_IMPORTED_MODULE_2__.mf.SCALE_TARGETS_OUTLINE|_enums_js__WEBPACK_IMPORTED_MODULE_2__.mf.UNIT_TARGETS_OUTLINE))>>>4;return t===_enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.LINE&&s.isOutline||t===_enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.FILL&&_(s.symbologyType)?n&o:n&~o}(this.geometryType,t,e)&t;this.vvSizeMinMaxValue=!!(s&_enums_js__WEBPACK_IMPORTED_MODULE_2__.X.SIZE_MINMAX_VALUE),this.vvSizeFieldStops=!!(s&_enums_js__WEBPACK_IMPORTED_MODULE_2__.X.SIZE_FIELD_STOPS),this.vvSizeUnitValue=!!(s&_enums_js__WEBPACK_IMPORTED_MODULE_2__.X.SIZE_UNIT_VALUE),this.vvSizeScaleStops=!!(s&_enums_js__WEBPACK_IMPORTED_MODULE_2__.X.SIZE_SCALE_STOPS)}},x=t=>class extends t{get vvRotation(){return 0!==this.bit(15)}set vvRotation(t){this.setBit(15,t)}hasVV(){return super.hasVV()||this.vvRotation}setVV(t,e){super.setVV(t,e),this.vvRotation=!e.isOutline&&!!(t&_enums_js__WEBPACK_IMPORTED_MODULE_2__.X.ROTATION)}},B=t=>class extends t{get vvColor(){return 0!==this.bit(13)}set vvColor(t){this.setBit(13,t)}hasVV(){return super.hasVV()||this.vvColor}setVV(t,e){super.setVV(t,e),this.vvColor=!e.isOutline&&!!(t&_enums_js__WEBPACK_IMPORTED_MODULE_2__.X.COLOR)}},R=t=>class extends t{get vvOpacity(){return 0!==this.bit(14)}set vvOpacity(t){this.setBit(14,t)}hasVV(){return super.hasVV()||this.vvOpacity}setVV(t,e){super.setVV(t,e),this.vvOpacity=!e.isOutline&&!!(t&_enums_js__WEBPACK_IMPORTED_MODULE_2__.X.OPACITY)}};class w extends(B(R(F(U)))){static load(t){const e=this.shared;return e.data=t,e}static from(t){const{symbologyType:e,vvFlags:a}=t,r=this.load(0);return r.geometryType=_enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.FILL,r.symbologyType=e,e!==_enums_js__WEBPACK_IMPORTED_MODULE_2__.mD.DOT_DENSITY&&r.setVV(a,t),r.data}getVariation(){return{...super.getVariation(),vvColor:this.vvColor,vvOpacity:this.vvOpacity,vvSizeFieldStops:this.vvSizeFieldStops,vvSizeMinMaxValue:this.vvSizeMinMaxValue,vvSizeScaleStops:this.vvSizeScaleStops,vvSizeUnitValue:this.vvSizeUnitValue}}}w.shared=new w(0);class N extends(B(R(x(F(U))))){static load(t){const e=this.shared;return e.data=t,e}static from(t){const{symbologyType:e,vvFlags:a}=t,r=this.load(0);return r.geometryType=_enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.MARKER,r.symbologyType=e,e!==_enums_js__WEBPACK_IMPORTED_MODULE_2__.mD.HEATMAP&&r.setVV(a,t),r.data}getVariation(){return{...super.getVariation(),vvColor:this.vvColor,vvRotation:this.vvRotation,vvOpacity:this.vvOpacity,vvSizeFieldStops:this.vvSizeFieldStops,vvSizeMinMaxValue:this.vvSizeMinMaxValue,vvSizeScaleStops:this.vvSizeScaleStops,vvSizeUnitValue:this.vvSizeUnitValue}}}N.shared=new N(0);class C extends(B(R(F(U)))){static load(t){const e=this.shared;return e.data=t,e}static from(t){const e=this.load(0);return e.geometryType=_enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.LINE,e.symbologyType=t.symbologyType,e.setVV(t.vvFlags,t),e.data}getVariation(){return{...super.getVariation(),vvColor:this.vvColor,vvOpacity:this.vvOpacity,vvSizeFieldStops:this.vvSizeFieldStops,vvSizeMinMaxValue:this.vvSizeMinMaxValue,vvSizeScaleStops:this.vvSizeScaleStops,vvSizeUnitValue:this.vvSizeUnitValue}}}C.shared=new C(0);class P extends(B(R(x(F(U))))){static load(t){const e=this.shared;return e.data=t,e}static from(t){const e=this.load(0);return e.geometryType=_enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.TEXT,e.symbologyType=t.symbologyType,e.setVV(t.vvFlags,t),e.data}getVariation(){return{...super.getVariation(),vvColor:this.vvColor,vvOpacity:this.vvOpacity,vvRotation:this.vvRotation,vvSizeFieldStops:this.vvSizeFieldStops,vvSizeMinMaxValue:this.vvSizeMinMaxValue,vvSizeScaleStops:this.vvSizeScaleStops,vvSizeUnitValue:this.vvSizeUnitValue}}}P.shared=new P(0);class Z extends(F(U)){static load(t){const e=this.shared;return e.data=t,e}static from(t){const s=this.load(0);return s.geometryType=_enums_js__WEBPACK_IMPORTED_MODULE_2__.LW.LABEL,s.symbologyType=t.symbologyType,s.setVV(t.vvFlags,t),s.mapAligned=(0,_alignmentUtils_js__WEBPACK_IMPORTED_MODULE_1__.NS)(t.placement),s.data}getVariation(){return{...super.getVariation(),vvSizeFieldStops:this.vvSizeFieldStops,vvSizeMinMaxValue:this.vvSizeMinMaxValue,vvSizeScaleStops:this.vvSizeScaleStops,vvSizeUnitValue:this.vvSizeUnitValue}}}Z.shared=new Z(0)},"./node_modules/@arcgis/core/views/2d/engine/webgl/techniques/Technique.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{v:()=>e});var _core_maybe_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js");class e{static getStorageSpec(t){return null}static createOrUpdateRendererSchema(e,r){return(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_0__.pC)(e)&&"default"===e.type?e:{type:"default"}}static getVariation(t){return{}}static getVariationHash(t){return 0}}e.type="default",e.programSpec=null},"./node_modules/@arcgis/core/views/2d/engine/webgl/techniques/utils.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{t4:()=>s,a1:()=>p,EJ:()=>c});var Error=__webpack_require__("./node_modules/@arcgis/core/core/Error.js"),enums=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/enums.js"),MaterialKey=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/materialKey/MaterialKey.js"),Technique=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/techniques/Technique.js"),maybe=__webpack_require__("./node_modules/@arcgis/core/core/maybe.js"),color=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/color.js"),definitions=__webpack_require__("./node_modules/@arcgis/core/views/2d/engine/webgl/definitions.js"),webgl_enums=__webpack_require__("./node_modules/@arcgis/core/views/webgl/enums.js");class n extends Technique.v{static getStorageSpec({attributes:e}){return{visualVariables:!1,attributes:e??null}}static _createRendererSchema(){return{type:"dot-density",colors:new Float32Array(32),dotValue:-1,dotSize:-1,dotScale:-1,dotBlending:!1,backgroundColor:new Float32Array(4),activeDots:new Float32Array(8),seed:-1}}static createOrUpdateRendererSchema(r,a){const{attributes:n,dotValue:i,referenceScale:d,dotSize:l,dotBlendingEnabled:s,seed:c,backgroundColor:u}=a,m=(0,maybe.pC)(r)&&"dot-density"===r.type?r:this._createRendererSchema();m.dotValue=i,m.dotSize=l,m.dotScale=d,m.dotBlending=s,m.seed=c;const{colors:g,activeDots:p,backgroundColor:y}=m;for(let e=0;e<definitions.$0;e++){const o=e>=n.length?null:n[e].color;(0,color.Vs)(g,o,4*e)}for(let e=0;e<8;e++)p[e]=e<a.attributes.length?1:0;return(0,color.Vs)(y,u),m}static getVariation(e){return{ddDotBlending:e.dotBlending}}static getVariationHash(e){return e.dotBlending?1:0}}n.type="dot-density",n.programSpec={shader:"materials/fill",vertexLayout:{geometry:[{location:0,name:"a_pos",count:2,type:webgl_enums.g.SHORT},{location:1,name:"a_id",count:3,type:webgl_enums.g.UNSIGNED_BYTE},{location:2,name:"a_bitset",count:1,type:webgl_enums.g.UNSIGNED_BYTE},{location:3,name:"a_inverseArea",count:1,type:webgl_enums.g.FLOAT}]}};var screenUtils=__webpack_require__("./node_modules/@arcgis/core/core/screenUtils.js"),heatmapUtils=__webpack_require__("./node_modules/@arcgis/core/renderers/support/heatmapUtils.js");class TechniqueHeatmap_n extends Technique.v{static getStorageSpec({field:e,valueExpression:t}){return{visualVariables:!1,attributes:e||t?[{field:e,valueExpression:t}]:null}}static _createRendererSchema(){return{type:"heatmap",radius:-1,referenceScale:-1,isFieldActive:0,minDensity:-1,densityRange:-1,kernel:null,gradient:null,gradientHash:"invalid"}}static createOrUpdateRendererSchema(a,i){const{radius:n,minDensity:s,maxDensity:o,referenceScale:c,field:l,valueExpression:m,colorStops:p}=i,d=o-s,u=l||m?1:0,y=p.map((({color:e,ratio:t})=>`${t}:${e.toString()}`)).join();let h,S=!0;return(0,maybe.pC)(a)&&"heatmap"===a.type?(h=a,S=y!==a.gradientHash):h=this._createRendererSchema(),h.radius=(0,screenUtils.F2)(n),h.minDensity=s,h.densityRange=d,h.referenceScale=c,h.isFieldActive=u,S&&(h.gradient=(0,heatmapUtils.uI)(p),h.gradientHash=y),h}}TechniqueHeatmap_n.type="heatmap",TechniqueHeatmap_n.programSpec={shader:"materials/icon/heatmapAccumulate",vertexLayout:{geometry:[{location:0,name:"a_pos",count:2,type:webgl_enums.g.SHORT},{location:1,name:"a_vertexOffset",count:2,type:webgl_enums.g.SHORT},{location:4,name:"a_id",count:4,type:webgl_enums.g.UNSIGNED_BYTE}]}};var Color=__webpack_require__("./node_modules/@arcgis/core/Color.js");class l extends Technique.v{static getStorageSpec({attributes:e}){return{visualVariables:!0,attributes:e??null}}static _createRendererSchema(){return{type:"pie-chart",colors:new Float32Array(4*definitions.eV),defaultColor:new Float32Array(4),othersColor:new Float32Array(4),outlineColor:new Float32Array(4),holePercentage:0,sectorThreshold:0,outlineWidth:1,numberOfFields:10}}static createOrUpdateRendererSchema(n,i){const{attributes:l,defaultColor:s,holePercentage:c,othersCategory:m,outline:u}=i,d=(0,maybe.pC)(n)&&"pie-chart"===n.type?n:this._createRendererSchema();for(let t=0;t<definitions.eV;t++){const o=t>=l.length?new Color.Z([0,0,0,0]):l[t].color;(0,color.Vs)(d.colors,o,4*t)}return(0,color.Vs)(d.defaultColor,s),(0,color.Vs)(d.othersColor,m?.color),(0,color.Vs)(d.outlineColor,u?.color),d.outlineWidth=(0,screenUtils.F2)(u?.width||0),d.holePercentage=c,d.sectorThreshold=m?.threshold||0,d.numberOfFields=l.length,d}static getVariation(e){return{numberOfFields:e.numberOfFields}}static getVariationHash(e){return e.numberOfFields}}function s(r,t){if(r.type!==t)throw new Error.Z("material-view-model:unexpected-renderer-schema",`expected to find renderer schema of type "${t}" but found type "${r.type}"`)}function c(e){switch(e?.type){case"dot-density":return n;case"heatmap":return TechniqueHeatmap_n;case"pie-chart":return l;default:return Technique.v}}function p(e){const{geometryType:s,symbologyType:c}=MaterialKey.m2.load(e);switch(s){case enums.LW.FILL:if(c===enums.mD.DOT_DENSITY)return n;break;case enums.LW.MARKER:switch(c){case enums.mD.HEATMAP:return TechniqueHeatmap_n;case enums.mD.PIE_CHART:return l}}return Technique.v}l.type="pie-chart",l.programSpec={shader:"materials/pie",vertexLayout:{geometry:[{location:0,name:"a_pos",count:2,type:webgl_enums.g.SHORT},{location:1,name:"a_vertexOffset",count:2,type:webgl_enums.g.SHORT},{location:2,name:"a_texCoords",count:2,type:webgl_enums.g.UNSIGNED_SHORT},{location:3,name:"a_bitSetAndDistRatio",count:2,type:webgl_enums.g.UNSIGNED_SHORT},{location:4,name:"a_id",count:4,type:webgl_enums.g.UNSIGNED_BYTE},{location:5,name:"a_color",count:4,type:webgl_enums.g.UNSIGNED_BYTE,normalized:!0},{location:6,name:"a_outlineColor",count:4,type:webgl_enums.g.UNSIGNED_BYTE,normalized:!0},{location:7,name:"a_sizeAndOutlineWidth",count:4,type:webgl_enums.g.UNSIGNED_BYTE},{location:8,name:"a_zoomRange",count:2,type:webgl_enums.g.UNSIGNED_SHORT}]},hittestAttributes:["a_vertexOffset","a_texCoords"]}}}]);