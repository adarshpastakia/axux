/*! For license information please see 4165.fa7b561a.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[4165],{"./node_modules/@esri/calcite-components/dist/components/utils4.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{function offsetParent(element){for(let ancestor=element;ancestor;ancestor=flatTreeParent(ancestor))if(ancestor instanceof Element&&"none"===getComputedStyle(ancestor).display)return null;for(let ancestor=flatTreeParent(element);ancestor;ancestor=flatTreeParent(ancestor)){if(!(ancestor instanceof Element))continue;const style=getComputedStyle(ancestor);if("contents"!==style.display){if("static"!==style.position||"none"!==style.filter)return ancestor;if("BODY"===ancestor.tagName)return ancestor}}return null}function flatTreeParent(element){return element.assignedSlot?element.assignedSlot:element.parentNode instanceof ShadowRoot?element.parentNode.host:element.parentNode}__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{offsetParent:()=>offsetParent})}}]);