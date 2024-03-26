/*! For license information please see 87863.62b96648.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[87863],{"./node_modules/@esri/calcite-components/dist/components/calcite-list-item-group.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CalciteListItemGroup:()=>CalciteListItemGroup,defineCustomElement:()=>defineCustomElement});var _stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@stencil/core/internal/client/index.js"),_interactive_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@esri/calcite-components/dist/components/interactive.js"),_utils3_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@esri/calcite-components/dist/components/utils3.js");const CSS_container="container",CSS_heading="heading",ListItemGroup=(0,_stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_2__.w$)(class extends _stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_2__.wt{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.calciteInternalListItemGroupDefaultSlotChange=(0,_stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_2__.lh)(this,"calciteInternalListItemGroupDefaultSlotChange",6),this.handleDefaultSlotChange=()=>{this.calciteInternalListItemGroupDefaultSlotChange.emit()},this.disabled=!1,this.heading=void 0,this.visualLevel=null}connectedCallback(){const{el}=this;this.visualLevel=(0,_utils3_js__WEBPACK_IMPORTED_MODULE_1__.a)(el,!0),(0,_interactive_js__WEBPACK_IMPORTED_MODULE_0__.c)(this)}componentDidRender(){(0,_interactive_js__WEBPACK_IMPORTED_MODULE_0__.u)(this)}disconnectedCallback(){(0,_interactive_js__WEBPACK_IMPORTED_MODULE_0__.d)(this)}render(){const{heading,visualLevel}=this;return(0,_stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_2__.h)(_stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_2__.xr,null,(0,_stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_2__.h)("tr",{class:CSS_container,style:{"--calcite-list-item-spacing-indent-multiplier":`${visualLevel}`}},(0,_stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_2__.h)("td",{class:CSS_heading,colSpan:_utils3_js__WEBPACK_IMPORTED_MODULE_1__.M},heading)),(0,_stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_2__.h)("slot",{onSlotchange:this.handleDefaultSlotChange}))}get el(){return this}static get style(){return":host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column;background-color:var(--calcite-ui-foreground-1);--calcite-list-item-spacing-indent:1rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.container{margin:0px;display:flex;flex:1 1 0%;background-color:var(--calcite-ui-foreground-2);padding:0.75rem;font-family:var(--calcite-sans-family);font-size:var(--calcite-font-size--1);font-weight:var(--calcite-font-weight-bold);color:var(--calcite-ui-text-2)}.heading{padding-inline-start:calc(var(--calcite-list-item-spacing-indent) * var(--calcite-list-item-spacing-indent-multiplier))}::slotted(calcite-list-item){--tw-shadow:0 -1px 0 var(--calcite-ui-border-3);--tw-shadow-colored:0 -1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);margin-block-start:1px}::slotted(calcite-list-item:nth-child(1 of :not([hidden]))){--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);margin-block-start:0px}:host([hidden]){display:none}[hidden]{display:none}"}},[1,"calcite-list-item-group",{disabled:[516],heading:[513],visualLevel:[32]}]);function defineCustomElement$1(){if("undefined"==typeof customElements)return;["calcite-list-item-group"].forEach((tagName=>{if("calcite-list-item-group"===tagName)customElements.get(tagName)||customElements.define(tagName,ListItemGroup)}))}defineCustomElement$1();const CalciteListItemGroup=ListItemGroup,defineCustomElement=defineCustomElement$1},"./node_modules/@esri/calcite-components/dist/components/interactive.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{c:()=>connectInteractive,d:()=>disconnectInteractive,u:()=>updateHostInteraction});var _stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@stencil/core/internal/client/index.js");const isFirefox=/firefox/i.test(function getUserAgentString(){if(!_stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_0__.L2.isBrowser)return"";const uaData=function getUserAgentData(){return navigator.userAgentData}();return uaData?.brands?uaData.brands.map((({brand,version})=>`${brand}/${version}`)).join(" "):navigator.userAgent}()),interactiveElementToParent=isFirefox?new WeakMap:null;function interceptedClick(){const{disabled}=this;disabled||HTMLElement.prototype.click.call(this)}function onPointerDown(event){const interactiveElement=event.target;if(isFirefox&&!interactiveElementToParent.get(interactiveElement))return;const{disabled}=interactiveElement;disabled&&event.preventDefault()}const nonBubblingWhenDisabledMouseEvents=["mousedown","mouseup","click"];function onNonBubblingWhenDisabledMouseEvent(event){if(isFirefox&&!interactiveElementToParent.get(event.target))return;const{disabled}=event.target;disabled&&(event.stopImmediatePropagation(),event.preventDefault())}const captureOnlyOptions={capture:!0};function updateHostInteraction(component,hostIsTabbable=!1){if(component.disabled)return component.el.setAttribute("tabindex","-1"),component.el.setAttribute("aria-disabled","true"),component.el.contains(document.activeElement)&&document.activeElement.blur(),void blockInteraction(component);restoreInteraction(component),"function"==typeof hostIsTabbable?component.el.setAttribute("tabindex",hostIsTabbable.call(component)?"0":"-1"):!0===hostIsTabbable?component.el.setAttribute("tabindex","0"):!1===hostIsTabbable&&component.el.removeAttribute("tabindex"),component.el.removeAttribute("aria-disabled")}function blockInteraction(component){component.el.click=interceptedClick,function addInteractionListeners(element){if(!element)return;element.addEventListener("pointerdown",onPointerDown,captureOnlyOptions),nonBubblingWhenDisabledMouseEvents.forEach((event=>element.addEventListener(event,onNonBubblingWhenDisabledMouseEvent,captureOnlyOptions)))}(isFirefox?getParentElement(component):component.el)}function getParentElement(component){return interactiveElementToParent.get(component.el)}function restoreInteraction(component){delete component.el.click,function removeInteractionListeners(element){if(!element)return;element.removeEventListener("pointerdown",onPointerDown,captureOnlyOptions),nonBubblingWhenDisabledMouseEvents.forEach((event=>element.removeEventListener(event,onNonBubblingWhenDisabledMouseEvent,captureOnlyOptions)))}(isFirefox?getParentElement(component):component.el)}function connectInteractive(component){if(!component.disabled||!isFirefox)return;const parent=component.el.parentElement||component.el;interactiveElementToParent.set(component.el,parent),blockInteraction(component)}function disconnectInteractive(component){isFirefox&&(interactiveElementToParent.delete(component.el),restoreInteraction(component))}},"./node_modules/@esri/calcite-components/dist/components/utils3.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{C:()=>CSS,I:()=>ICONS,M:()=>MAX_COLUMNS,S:()=>SLOTS,a:()=>getDepth,g:()=>getListItemChildren,u:()=>updateListItemChildren});var _stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@stencil/core/internal/client/index.js");const CSS={container:"container",containerBorderSelected:"container--border-selected",containerBorderUnselected:"container--border-unselected",contentContainer:"content-container",contentContainerSelectable:"content-container--selectable",contentContainerHasCenterContent:"content-container--has-center-content",nestedContainer:"nested-container",nestedContainerHidden:"nested-container--hidden",content:"content",customContent:"custom-content",actionsStart:"actions-start",contentStart:"content-start",label:"label",description:"description",contentEnd:"content-end",contentBottom:"content-bottom",actionsEnd:"actions-end",selectionContainer:"selection-container",openContainer:"open-container",dragContainer:"drag-container"},SLOTS={actionsStart:"actions-start",contentStart:"content-start",content:"content",contentBottom:"content-bottom",contentEnd:"content-end",actionsEnd:"actions-end"},MAX_COLUMNS=0,ICONS={selectedMultiple:"check-circle-f",selectedSingle:"circle-f",unselected:"blank",closedLTR:"caret-right",closedRTL:"caret-left",open:"caret-down",blank:"blank",close:"x"},listSelector="calcite-list",listItemGroupSelector="calcite-list-item-group",listItemSelector="calcite-list-item";function getListItemChildren(slotEl){const assignedElements=slotEl.assignedElements({flatten:!0}),listItemGroupChildren=assignedElements.filter((el=>el?.matches(listItemGroupSelector))).map((group=>Array.from(group.querySelectorAll(listItemSelector)))).reduce(((previousValue,currentValue)=>[...previousValue,...currentValue]),[]),listItemChildren=assignedElements.filter((el=>el?.matches(listItemSelector)));return[...assignedElements.filter((el=>el?.matches(listSelector))).map((list=>Array.from(list.querySelectorAll(listItemSelector)))).reduce(((previousValue,currentValue)=>[...previousValue,...currentValue]),[]),...listItemGroupChildren,...listItemChildren]}function updateListItemChildren(listItemChildren){listItemChildren.forEach((listItem=>{listItem.setPosition=listItemChildren.indexOf(listItem)+1,listItem.setSize=listItemChildren.length}))}function getDepth(element,includeGroup=!1){if(!_stencil_core_internal_client_index_js__WEBPACK_IMPORTED_MODULE_0__.L2.isBrowser)return 0;const expression=includeGroup?"ancestor::calcite-list-item | ancestor::calcite-list-item-group":"ancestor::calcite-list-item";return document.evaluate(expression,element,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength}}}]);