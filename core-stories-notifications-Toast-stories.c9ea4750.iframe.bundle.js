"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[8183],{"./packages/core/stories/notifications/Toast.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Toast:()=>Toast,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_axux_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/core/dist/index.js"),_src__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/core/src/index.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"@core/Notifications",component:__webpack_require__("./packages/core/src/overlays/Toast.tsx").i,parameters:{layout:"centered",controls:{exclude:"children"}}},Toast={render:args=>{const{toast}=(0,_axux_core__WEBPACK_IMPORTED_MODULE_1__.Mo)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src__WEBPACK_IMPORTED_MODULE_2__.oG,{onClick:()=>toast(args),children:"Open Toast"})},args:{title:"Sample toast",message:"Toast message goes here"}};Toast.parameters={...Toast.parameters,docs:{...Toast.parameters?.docs,source:{originalSource:'{\n  render: args => {\n    const {\n      toast\n    } = useNotificationService();\n    return <AxButton onClick={() => toast(args)}>Open Toast</AxButton>;\n  },\n  args: {\n    title: "Sample toast",\n    message: "Toast message goes here"\n  }\n}',...Toast.parameters?.docs?.source}}};const __namedExportsOrder=["Toast"]}}]);