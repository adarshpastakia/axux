/*! For license information please see 2165.82cf388d.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[2165],{"./node_modules/@esri/calcite-components/dist/components/calcite-list.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CalciteList:()=>CalciteList,defineCustomElement:()=>defineCustomElement});var _stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@stencil/core/internal/client/index.js"),_interactive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@esri/calcite-components/dist/components/interactive.js");const CSS_container="container",List=(0,_stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_0__.GH)(class extends _stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_0__.mv{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.disabled=!1}componentDidRender(){(0,_interactive_js__WEBPACK_IMPORTED_MODULE_1__.u)(this)}async setFocus(){const firstListItem=this.el.querySelector("calcite-list-item:not([non-interactive])");null==firstListItem||firstListItem.setFocus()}render(){return(0,_stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_0__.h)(_stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_0__.AA,{role:"list"},(0,_stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_0__.h)("div",{class:CSS_container},(0,_stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_0__.h)("slot",null)))}get el(){return this}static get style(){return"@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:block}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.container{box-sizing:border-box;display:flex;inline-size:100%;flex-direction:column;background-color:transparent}.container *{box-sizing:border-box}::slotted(calcite-list-item){margin-block-end:1px;--tw-shadow:0 1px 0 var(--calcite-ui-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}::slotted(calcite-list-item:last-child){--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}"}},[1,"calcite-list",{disabled:[516],headingLevel:[514,"heading-level"],setFocus:[64]}]);function defineCustomElement$1(){if("undefined"==typeof customElements)return;["calcite-list"].forEach((tagName=>{if("calcite-list"===tagName)customElements.get(tagName)||customElements.define(tagName,List)}))}defineCustomElement$1();const CalciteList=List,defineCustomElement=defineCustomElement$1},"./node_modules/@esri/calcite-components/dist/components/interactive.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{function noopClick(){}function updateHostInteraction(component,hostIsTabbable=!1){if(component.disabled)return component.el.setAttribute("tabindex","-1"),component.el.setAttribute("aria-disabled","true"),component.el.contains(document.activeElement)&&document.activeElement.blur(),void(component.el.click=noopClick);component.el.click=HTMLElement.prototype.click,"function"==typeof hostIsTabbable?component.el.setAttribute("tabindex",hostIsTabbable.call(component)?"0":"-1"):!0===hostIsTabbable?component.el.setAttribute("tabindex","0"):!1===hostIsTabbable&&component.el.removeAttribute("tabindex"),component.el.removeAttribute("aria-disabled")}__webpack_require__.d(__webpack_exports__,{u:()=>updateHostInteraction})}}]);