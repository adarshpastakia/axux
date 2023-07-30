"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[516],{"./packages/charts/stories/TimeSeries.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@faker-js/faker/dist/esm/index.mjs"),_src__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/charts/src/index.ts"),_axux_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/core/dist/index.js"),react__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/index.js");const __WEBPACK_DEFAULT_EXPORT__={component:_src__WEBPACK_IMPORTED_MODULE_2__.J.TimeSeries,title:"@charts/TimeSeries",tags:["autodocs"],parameters:{layout:"centered",controls:{exclude:"children"}}},Example={render:args=>{const[data,setData]=(0,react__WEBPACK_IMPORTED_MODULE_4__.useState)({}),loadData=(0,react__WEBPACK_IMPORTED_MODULE_4__.useCallback)((()=>{const categories=Array.from(Array(24),((_,i)=>new Date(2021,i,1)));setData({categoryAxisName:"Months",valueAxisName:"Items",categories,data:[{id:_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__.We.string.alphanumeric(5),label:_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__.We.animal.bear(),values:categories.map((c=>[c,_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__.We.number.int({min:100,max:500})]))},{id:_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__.We.string.alphanumeric(5),label:_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__.We.animal.bear(),values:categories.map((c=>[c,_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__.We.number.int({min:100,max:500})]))},{id:_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__.We.string.alphanumeric(5),label:_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__.We.animal.bear(),values:categories.map((c=>[c,_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__.We.number.int({min:100,max:500})]))}]})}),[]);return(0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)((()=>{loadData()}),[]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_axux_core__WEBPACK_IMPORTED_MODULE_3__.VE,{minHeight:420,minWidth:600,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_axux_core__WEBPACK_IMPORTED_MODULE_3__.Q6,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_axux_core__WEBPACK_IMPORTED_MODULE_3__.M,{children:"Time Series chart"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_axux_core__WEBPACK_IMPORTED_MODULE_3__.oG,{variant:"link",icon:"mdi mdi-refresh",onClick:loadData})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src__WEBPACK_IMPORTED_MODULE_2__.J.TimeSeries,{...args,...data})]})},args:{}};Example.parameters={...Example.parameters,docs:{...Example.parameters?.docs,source:{originalSource:'{\n  render: args => {\n    const [data, setData] = useState<AnyObject>({});\n    const loadData = useCallback(() => {\n      const categories = Array.from(Array(24), (_, i) => new Date(2021, i, 1));\n      setData({\n        categoryAxisName: "Months",\n        valueAxisName: "Items",\n        categories,\n        data: [{\n          id: faker.string.alphanumeric(5),\n          label: faker.animal.bear(),\n          values: categories.map(c => [c, faker.number.int({\n            min: 100,\n            max: 500\n          })])\n        }, {\n          id: faker.string.alphanumeric(5),\n          label: faker.animal.bear(),\n          values: categories.map(c => [c, faker.number.int({\n            min: 100,\n            max: 500\n          })])\n        }, {\n          id: faker.string.alphanumeric(5),\n          label: faker.animal.bear(),\n          values: categories.map(c => [c, faker.number.int({\n            min: 100,\n            max: 500\n          })])\n        }]\n      });\n    }, []);\n    useEffect(() => {\n      loadData();\n    }, []);\n    return <AxPanel minHeight={420} minWidth={600}>\n        <AxHeader>\n          <AxTitle>Time Series chart</AxTitle>\n          <AxButton variant="link" icon="mdi mdi-refresh" onClick={loadData} />\n        </AxHeader>\n        <AxChart.TimeSeries {...args} {...data} />\n      </AxPanel>;\n  },\n  args: {}\n}',...Example.parameters?.docs?.source}}};const __namedExportsOrder=["Example"]}}]);