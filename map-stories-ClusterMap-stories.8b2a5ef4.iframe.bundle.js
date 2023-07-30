"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[8483],{"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{aD:()=>chunk_AY7I2SME.aD});var chunk_AY7I2SME=__webpack_require__("./node_modules/@storybook/addon-actions/dist/chunk-AY7I2SME.mjs")},"./packages/map/stories/ClusterMap.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ClusterMap:()=>ClusterMap,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_axux_utilities__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/utilities/dist/index.js"),_faker_js_faker__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@faker-js/faker/dist/esm/index.mjs"),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),react__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/index.js"),_src__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/map/src/index.ts"),_locations_json__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./packages/map/stories/locations.json"),_sources__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./packages/map/stories/sources.ts");const meta={component:_src__WEBPACK_IMPORTED_MODULE_5__.Yh.layers.Cluster,title:"@map/Cluster Map",parameters:{layout:"fullscreen",controls:{exclude:"events"}}},events=_locations_json__WEBPACK_IMPORTED_MODULE_6__.map((l=>({...l,timestamp:_axux_utilities__WEBPACK_IMPORTED_MODULE_1__.Format.date(l.timestamp),image:_faker_js_faker__WEBPACK_IMPORTED_MODULE_2__.We.image.url()}))),__WEBPACK_DEFAULT_EXPORT__=meta,ClusterMap={render:args=>{const mapRef=(0,react__WEBPACK_IMPORTED_MODULE_4__.useRef)(null),[isLoading,setLoading]=(0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(!1),[exportContent,setExport]=(0,react__WEBPACK_IMPORTED_MODULE_4__.useState)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_src__WEBPACK_IMPORTED_MODULE_5__.Yh.Viewer,{defaultSource:"color",sources:_sources__WEBPACK_IMPORTED_MODULE_7__.x,mapRef,onLoading:setLoading,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src__WEBPACK_IMPORTED_MODULE_5__.Yh.tools.Zoom,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src__WEBPACK_IMPORTED_MODULE_5__.Yh.tools.Navigation,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src__WEBPACK_IMPORTED_MODULE_5__.Yh.tools.Basemap,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src__WEBPACK_IMPORTED_MODULE_5__.Yh.tools.Layers,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src__WEBPACK_IMPORTED_MODULE_5__.Yh.tools.Selection,{onUpdate:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_3__.aD)("select")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src__WEBPACK_IMPORTED_MODULE_5__.Yh.tools.Action,{tooltip:"Snapshot",icon:"esri-icon-bookmark",onClick:()=>{mapRef.current?.exportMap().then(setExport)},isDisabled:isLoading}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src__WEBPACK_IMPORTED_MODULE_5__.Yh.layers.Cluster,{...args})]}),exportContent&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:"flex flex-col p-16 absolute inset-0 bg-slate-200 bg-opacity-75 backdrop-blur-m",onClick:()=>setExport(void 0),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img",{className:"flex-1 object-contain bg-slate-800 overflow-hidden",src:exportContent.image}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:"text-center bg-slate-900 text-white",children:exportContent.extent})]})]})},args:{events,actions:[{id:"view",title:"View Event",type:"button",className:"esri-icon-hollow-eye"}],clusterActions:[{id:"filter",title:"Add Filter",type:"button",className:"esri-icon-filter"}],eventTitle:"<img src={image}/><span>Magnitude {mag} on {timestamp}</span>",eventContent:[{type:"media",mediaInfos:[{type:"image",value:{sourceURL:"{image}"}}]}],onActionClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_3__.aD)("action")}};ClusterMap.parameters={...ClusterMap.parameters,docs:{...ClusterMap.parameters?.docs,source:{originalSource:'{\n  render: args => {\n    const mapRef = useRef<AnyObject>(null);\n    const [isLoading, setLoading] = useState(false);\n    const [exportContent, setExport] = useState<AnyObject>();\n    const handleExport = () => {\n      void mapRef.current?.exportMap().then(setExport);\n    };\n    return <>\n        <AxMap.Viewer defaultSource="color" sources={MapSources} mapRef={mapRef} onLoading={setLoading}>\n          {/* Zoom tools */}\n          <AxMap.tools.Zoom />\n          {/* History navigation */}\n          <AxMap.tools.Navigation />\n          {/* Basemaps list */}\n          <AxMap.tools.Basemap />\n          {/* Layer list */}\n          <AxMap.tools.Layers />\n          <AxMap.tools.Selection onUpdate={action("select")} />\n          <AxMap.tools.Action tooltip="Snapshot" icon="esri-icon-bookmark" onClick={handleExport} isDisabled={isLoading} />\n\n          <AxMap.layers.Cluster {...args} />\n        </AxMap.Viewer>\n        {exportContent && <div className="flex flex-col p-16 absolute inset-0 bg-slate-200 bg-opacity-75 backdrop-blur-m" onClick={() => setExport(undefined)}>\n            <img className="flex-1 object-contain bg-slate-800 overflow-hidden" src={exportContent.image} />\n            <div className="text-center bg-slate-900 text-white">\n              {exportContent.extent}\n            </div>\n          </div>}\n      </>;\n  },\n  args: {\n    events,\n    actions: [{\n      id: "view",\n      title: "View Event",\n      type: "button",\n      className: "esri-icon-hollow-eye"\n    }],\n    clusterActions: [{\n      id: "filter",\n      title: "Add Filter",\n      type: "button",\n      className: "esri-icon-filter"\n    }],\n    eventTitle: `<img src={image}/><span>Magnitude {mag} on {timestamp}</span>`,\n    eventContent: [{\n      type: "media",\n      mediaInfos: [{\n        type: "image",\n        value: {\n          sourceURL: "{image}"\n        }\n      }]\n    }],\n    onActionClick: action("action")\n  }\n}',...ClusterMap.parameters?.docs?.source}}};const __namedExportsOrder=["ClusterMap"]}}]);