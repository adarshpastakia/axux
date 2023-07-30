"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[7827],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./packages/map/stories/0-Introduction.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_storybook_addon_essentials_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_assets_thumbs_thumb_vec_png__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./assets/thumbs/thumb-vec.png"),_src__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/map/src/index.ts");function _createMdxContent(props){const _components=Object.assign({h1:"h1",ul:"ul",li:"li",code:"code",pre:"pre",h3:"h3"},(0,_storybook_addon_essentials_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_5__.ah)(),props.components);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_6__.h_,{title:"@map/Introduction"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img",{className:"h-48 w-full mb-16 overflow-hidden object-cover",src:_assets_thumbs_thumb_vec_png__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"using-mapviewer",children:"Using MapViewer"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_2__.dk,{of:_src__WEBPACK_IMPORTED_MODULE_4__.Yh.Viewer}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"shift+scroll"}),": zoom in/out"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"shift+drag"}),": zoom in"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"ctrl+drag"}),": draw circle selection (Requires selection tool)"]}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-tsx",children:'import { AxMap } from "@axux/map";\n\n<AxMap.Viewer\n    sources=[\n        { id:"key", title:"Title for basemap list", thumb:"png for basemap list",\n            type:"vector|raster", url:"layer source" }\n    ]\n    defaultSource="key"\n>\n    {/* Zoom tools */}\n    <AxMap.tools.Zoom />\n    {/* History navigation */}\n    <AxMap.tools.Navigation />\n    {/* Basemaps list */}\n    <AxMap.tools.Basemap />\n    {/* Layer list */}\n    <AxMap.tools.Layers />\n    {/* Selection tools */}\n    <AxMap.tools.Selection\n      filters="selected points"\n      onUpdate={handleUpdate}\n    />\n    {/* Custom action */}\n    <AxMap.tools.Action\n        icon="mdiIcon"\n        tooltip=""\n        position="top-start|top-end"\n        index={0}\n        isDisabled={false}\n        onClick={handler}\n     />\n    {/* Comparison tool */}\n     <AxMap.tools.Comparison\n        onCompareStart={() =>\n          Promise.resolve({ events, compareEvents })\n        }\n      />\n\n    <AxMap.layers.X />\n</AxMap.Viewer>\n\n'})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"axmapviewer",children:"AxMap.Viewer"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_2__.Ed,{sort:"requiredFirst",of:_src__WEBPACK_IMPORTED_MODULE_4__.Yh.Viewer}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"axmaptoolsaction",children:"AxMap.tools.Action"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_2__.Ed,{sort:"requiredFirst",of:_src__WEBPACK_IMPORTED_MODULE_4__.Yh.tools.Action}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"axmaptoolsselection",children:"AxMap.tools.Selection"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_2__.Ed,{sort:"requiredFirst",of:_src__WEBPACK_IMPORTED_MODULE_4__.Yh.tools.Selection}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"axmaptoolscomparison",children:"AxMap.tools.Comparison"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_2__.Ed,{sort:"requiredFirst",of:_src__WEBPACK_IMPORTED_MODULE_4__.Yh.tools.Comparison}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"axmaplayerscluster",children:"AxMap.layers.Cluster"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_2__.Ed,{sort:"requiredFirst",of:_src__WEBPACK_IMPORTED_MODULE_4__.Yh.layers.Cluster}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"axmaplayersheatmap",children:"AxMap.layers.Heatmap"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_2__.Ed,{sort:"requiredFirst",of:_src__WEBPACK_IMPORTED_MODULE_4__.Yh.layers.Heatmap}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"axmaplayerslocations",children:"AxMap.layers.Locations"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_2__.Ed,{sort:"requiredFirst",of:_src__WEBPACK_IMPORTED_MODULE_4__.Yh.layers.Locations})]})}const __WEBPACK_DEFAULT_EXPORT__=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_storybook_addon_essentials_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_5__.ah)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,Object.assign({},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,props)})):_createMdxContent(props)}}}]);