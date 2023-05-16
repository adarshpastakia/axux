/*! For license information please see 3483.556e1740.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[3483],{"./node_modules/@esri/calcite-components/dist/components/calcite-flow.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CalciteFlow:()=>CalciteFlow,defineCustomElement:()=>defineCustomElement});var _stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@stencil/core/internal/client/index.js"),_observers_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@esri/calcite-components/dist/components/observers.js");const CSS_frame="frame",CSS_frameAdvancing="frame--advancing",CSS_frameRetreating="frame--retreating",Flow=(0,_stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_0__.GH)(class extends _stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_0__.mv{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.itemMutationObserver=(0,_observers_js__WEBPACK_IMPORTED_MODULE_1__.c)("mutation",(()=>this.updateFlowProps())),this.getFlowDirection=(oldFlowItemCount,newFlowItemCount)=>oldFlowItemCount&&newFlowItemCount>1||oldFlowItemCount>1?newFlowItemCount<oldFlowItemCount?"retreating":"advancing":null,this.updateFlowProps=()=>{const{el,items}=this,newItems=Array.from(el.querySelectorAll("calcite-flow-item")).filter((flowItem=>flowItem.closest("calcite-flow")===el)),oldItemCount=items.length,newItemCount=newItems.length,activeItem=newItems[newItemCount-1],previousItem=newItems[newItemCount-2];if(newItemCount&&activeItem&&newItems.forEach((itemNode=>{itemNode.showBackButton=itemNode===activeItem&&newItemCount>1,itemNode.hidden=itemNode!==activeItem})),previousItem&&(previousItem.menuOpen=!1),this.items=newItems,oldItemCount!==newItemCount){const flowDirection=this.getFlowDirection(oldItemCount,newItemCount);this.itemCount=newItemCount,this.flowDirection=flowDirection}},this.flowDirection=null,this.itemCount=0,this.items=[]}async back(){const{items}=this,lastItem=items[items.length-1];if(!lastItem)return;return(lastItem.beforeBack?lastItem.beforeBack:()=>Promise.resolve()).call(lastItem).then((()=>(lastItem.remove(),lastItem)))}connectedCallback(){this.itemMutationObserver?.observe(this.el,{childList:!0,subtree:!0}),this.updateFlowProps()}disconnectedCallback(){this.itemMutationObserver?.disconnect()}handleItemBackClick(){this.back()}render(){const{flowDirection}=this,frameDirectionClasses={[CSS_frame]:!0,[CSS_frameAdvancing]:"advancing"===flowDirection,[CSS_frameRetreating]:"retreating"===flowDirection};return(0,_stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_0__.h)("div",{class:frameDirectionClasses},(0,_stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_0__.h)("slot",null))}get el(){return this}static get style(){return"@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host{position:relative;display:flex;inline-size:100%;flex:1 1 auto;align-items:stretch;overflow:hidden;background-color:transparent}:host .frame{position:relative;margin:0px;display:flex;inline-size:100%;flex:1 1 auto;flex-direction:column;align-items:stretch;padding:0px}:host ::slotted(calcite-flow-item),:host ::slotted(calcite-panel){block-size:100%}:host ::slotted(.calcite-match-height:last-child){display:flex;flex:1 1 auto;overflow:hidden}:host .frame--advancing{animation:calcite-frame-advance var(--calcite-animation-timing)}:host .frame--retreating{animation:calcite-frame-retreat var(--calcite-animation-timing)}@keyframes calcite-frame-advance{0%{--tw-bg-opacity:0.5;transform:translate3d(50px, 0, 0)}100%{--tw-bg-opacity:1;transform:translate3d(0, 0, 0)}}@keyframes calcite-frame-retreat{0%{--tw-bg-opacity:0.5;transform:translate3d(-50px, 0, 0)}100%{--tw-bg-opacity:1;transform:translate3d(0, 0, 0)}}"}},[1,"calcite-flow",{flowDirection:[32],itemCount:[32],items:[32],back:[64]},[[0,"calciteFlowItemBack","handleItemBackClick"]]]);function defineCustomElement$1(){if("undefined"==typeof customElements)return;["calcite-flow"].forEach((tagName=>{if("calcite-flow"===tagName)customElements.get(tagName)||customElements.define(tagName,Flow)}))}defineCustomElement$1();const CalciteFlow=Flow,defineCustomElement=defineCustomElement$1},"./node_modules/@esri/calcite-components/dist/components/observers.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{c:()=>createObserver});var _stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@stencil/core/internal/client/index.js");function createObserver(type,callback,options){if(!_stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_0__.Z5.isBrowser)return;const Observer=function getObserver(type){class ExtendedMutationObserver extends window.MutationObserver{constructor(callback){super(callback),this.observedEntry=[],this.callback=callback}observe(target,options){return this.observedEntry.push({target,options}),super.observe(target,options)}unobserve(target){const newObservedEntries=this.observedEntry.filter((observed=>observed.target!==target));this.observedEntry=[],this.callback(super.takeRecords(),this),this.disconnect(),newObservedEntries.forEach((observed=>this.observe(observed.target,observed.options)))}}return"intersection"===type?window.IntersectionObserver:"mutation"===type?ExtendedMutationObserver:window.ResizeObserver}(type);return new Observer(callback,options)}}}]);