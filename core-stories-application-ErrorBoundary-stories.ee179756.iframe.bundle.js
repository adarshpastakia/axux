"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[2910],{"./packages/core/stories/application/ErrorBoundary.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ErrorBoundary:()=>ErrorBoundary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),_src__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/core/src/index.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"@core/Application/Error Boundary",component:_src__WEBPACK_IMPORTED_MODULE_2__._N,parameters:{layout:"fullscreen",controls:{exclude:"children"}}},BrokenComponent=()=>((0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)((()=>{throw Error("Unknown error")}),[]),null),ErrorBoundary={render:({children,...args})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:"min-h-[32rem] relative",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src__WEBPACK_IMPORTED_MODULE_2__.Oq,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src__WEBPACK_IMPORTED_MODULE_2__._N,{...args,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BrokenComponent,{})})})}),args:{}};ErrorBoundary.parameters={...ErrorBoundary.parameters,docs:{...ErrorBoundary.parameters?.docs,source:{originalSource:'{\n  render: ({\n    children,\n    ...args\n  }) => {\n    return <div className="min-h-[32rem] relative">\n        <AxViewport>\n          <AxErrorBoundary {...args}>\n            <BrokenComponent />\n          </AxErrorBoundary>\n        </AxViewport>\n      </div>;\n  },\n  args: {}\n}',...ErrorBoundary.parameters?.docs?.source}}};const __namedExportsOrder=["ErrorBoundary"]}}]);