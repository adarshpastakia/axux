"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[7562],{"./packages/form/stories/fields/List.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{List:()=>List,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_src__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/form/src/index.ts"),_axux_utilities__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/utilities/dist/index.js");const __WEBPACK_DEFAULT_EXPORT__={title:"@form/Select",component:_src__WEBPACK_IMPORTED_MODULE_1__.z.List,parameters:{layout:"centered",controls:{exclude:["options","renderer","makeLabel"]}}},List={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src__WEBPACK_IMPORTED_MODULE_1__.z.List,{...args,width:"30rem"}),args:{label:"Listbox",options:_axux_utilities__WEBPACK_IMPORTED_MODULE_2__.Countries.list,valueProperty:"iso2",labelProperty:"name",value:["AE"],isEditable:!0,makeLabel:c=>`${c.emoji} ${c.name}`,renderer:opt=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:"flex gap-1 items-center",children:[opt.emoji," ",opt.name]}),onQuery:void 0}};List.parameters={...List.parameters,docs:{...List.parameters?.docs,source:{originalSource:'{\n  render: args => {\n    return <AxField.List {...args} width="30rem" />;\n  },\n  args: {\n    label: "Listbox",\n    options: Countries.list,\n    valueProperty: "iso2",\n    labelProperty: "name",\n    value: ["AE"],\n    isEditable: true,\n    makeLabel: c => `${c.emoji} ${c.name}`,\n    renderer(opt) {\n      return <div className="flex gap-1 items-center">\n          {opt.emoji} {opt.name}\n        </div>;\n    },\n    onQuery: undefined\n  }\n}',...List.parameters?.docs?.source}}};const __namedExportsOrder=["List"]}}]);