"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[7708],{"./packages/media/stories/VideoPlayer.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,__namedExportsOrder:()=>__namedExportsOrder,default:()=>VideoPlayer_stories});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),src=__webpack_require__("./packages/media/src/index.ts");const small_video_namespaceObject=__webpack_require__.p+"static/media/small_video.5f55925d.mp4",VideoPlayer_stories={component:src.aA,title:"@media/VideoPlayer",tags:["autodocs"],parameters:{layout:"fullscreen",controls:{exclude:"children"}}},Example={render:args=>(0,jsx_runtime.jsx)("div",{className:"h-full min-h-[600px] grid overflow-hidden",children:(0,jsx_runtime.jsx)("div",{className:"w-full h-full ax-section grid-area-[unset]",children:(0,jsx_runtime.jsx)(src.aA,{...args})})}),args:{src:small_video_namespaceObject,markers:new Array(300).fill([]).map(((_,i)=>[90*Math.random(),Math.random()])),scenes:new Array(10).fill([]).map(((_,i)=>[30*Math.random(),"https://picsum.photos/192/108?"+i]))}};Example.parameters={...Example.parameters,docs:{...Example.parameters?.docs,source:{originalSource:'{\n  render: args => {\n    return <div className="h-full min-h-[600px] grid overflow-hidden">\n        <div className="w-full h-full ax-section grid-area-[unset]">\n          <AxVideoPlayer {...args} />\n        </div>\n      </div>;\n  },\n  args: {\n    src,\n    markers,\n    scenes\n  }\n}',...Example.parameters?.docs?.source}}};const __namedExportsOrder=["Example"]}}]);