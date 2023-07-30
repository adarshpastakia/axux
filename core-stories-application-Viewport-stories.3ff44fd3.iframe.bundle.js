"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[701],{"./packages/core/stories/application/Viewport.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Viewport_stories});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),esm=__webpack_require__("./node_modules/@faker-js/faker/dist/esm/index.mjs"),src=__webpack_require__("./packages/core/src/index.ts");const logo_namespaceObject=__webpack_require__.p+"static/media/logo.c445ea83.png",Viewport_stories={component:src.Oq,title:"@core/Application/Viewport",parameters:{layout:"fullscreen",controls:{exclude:"children"}}},Example={render:args=>(0,jsx_runtime.jsx)("div",{className:"min-h-[32rem] relative",children:(0,jsx_runtime.jsx)(src.Oq,{...args})}),args:{children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsxs)(src.Q6,{className:"px-2",children:[(0,jsx_runtime.jsx)(src.Ng,{icon:logo_namespaceObject,className:"text-2xl"}),(0,jsx_runtime.jsx)(src.M,{className:"text-primary text-2xl flex-1",children:"Application Title"}),(0,jsx_runtime.jsxs)(src.oG.Dropdown,{size:"lg",icon:"mdi mdi-account-circle",showCaret:!1,variant:"link",className:"flush",children:[(0,jsx_runtime.jsx)(src.vs.Item,{label:"Account"}),(0,jsx_runtime.jsx)(src.vs.Item,{label:"Preferences"}),(0,jsx_runtime.jsx)(src.qm,{size:"xs"}),(0,jsx_runtime.jsx)(src.vs.Item,{label:"Sign Out"})]})]}),(0,jsx_runtime.jsx)(src.dj,{children:(0,jsx_runtime.jsxs)(src.vs,{children:[(0,jsx_runtime.jsx)(src.vs.Item,{label:"Route nav",isActive:!0}),(0,jsx_runtime.jsx)(src.vs.Item,{label:"Route nav"}),(0,jsx_runtime.jsx)(src.vs.Item,{label:"Route nav"})]})}),(0,jsx_runtime.jsx)(src.kk,{className:"text-xs bg-bw-500/50 px-4",children:(0,jsx_runtime.jsx)("span",{children:"Copyright © 2023"})}),(0,jsx_runtime.jsxs)(src.zb,{children:[(0,jsx_runtime.jsxs)(src.Q6,{className:"!bg-transparent pt-1 px-2",children:[(0,jsx_runtime.jsx)("div",{className:"flex-1",children:(0,jsx_runtime.jsx)(src.wv,{items:[{label:"",icon:"mdi mdi-home"},{label:"Section"},{label:"Page"}]})}),(0,jsx_runtime.jsx)(src.oG,{children:"Open something"})]}),(0,jsx_runtime.jsx)(src.Gg,{isPaper:!0,children:(0,jsx_runtime.jsxs)(src.aW,{children:[(0,jsx_runtime.jsx)("p",{className:"mb-4",children:esm.We.lorem.paragraphs(6)}),(0,jsx_runtime.jsx)("p",{className:"mb-4",children:esm.We.lorem.paragraphs(6)}),(0,jsx_runtime.jsx)("p",{className:"mb-4",children:esm.We.lorem.paragraphs(6)}),(0,jsx_runtime.jsx)("p",{className:"mb-4",children:esm.We.lorem.paragraphs(6)}),(0,jsx_runtime.jsx)("p",{className:"mb-4",children:esm.We.lorem.paragraphs(6)})]})})]})]})}};Example.parameters={...Example.parameters,docs:{...Example.parameters?.docs,source:{originalSource:'{\n  render: args => <div className="min-h-[32rem] relative">\n      <AxViewport {...args} />\n    </div>,\n  args: {\n    children: <>\n        <AxHeader className="px-2">\n          <AxIcon icon={logo} className="text-2xl" />\n          <AxTitle className="text-primary text-2xl flex-1">\n            Application Title\n          </AxTitle>\n          <AxButton.Dropdown size="lg" icon="mdi mdi-account-circle" showCaret={false} variant="link" className="flush">\n            <AxMenu.Item label="Account" />\n            <AxMenu.Item label="Preferences" />\n            <AxDivider size="xs" />\n            <AxMenu.Item label="Sign Out" />\n          </AxButton.Dropdown>\n        </AxHeader>\n        <AxAside>\n          <AxMenu>\n            <AxMenu.Item label="Route nav" isActive />\n            <AxMenu.Item label="Route nav" />\n            <AxMenu.Item label="Route nav" />\n          </AxMenu>\n        </AxAside>\n        <AxFooter className="text-xs bg-bw-500/50 px-4">\n          <span>Copyright © 2023</span>\n        </AxFooter>\n        <AxSection>\n          <AxHeader className="!bg-transparent pt-1 px-2">\n            <div className="flex-1">\n              <AxBreadcrumb items={[{\n              label: "",\n              icon: "mdi mdi-home"\n            }, {\n              label: "Section"\n            }, {\n              label: "Page"\n            }]} />\n            </div>\n            <AxButton>Open something</AxButton>\n          </AxHeader>\n          <AxPage isPaper>\n            <AxContent>\n              <p className="mb-4">{faker.lorem.paragraphs(6)}</p>\n              <p className="mb-4">{faker.lorem.paragraphs(6)}</p>\n              <p className="mb-4">{faker.lorem.paragraphs(6)}</p>\n              <p className="mb-4">{faker.lorem.paragraphs(6)}</p>\n              <p className="mb-4">{faker.lorem.paragraphs(6)}</p>\n            </AxContent>\n          </AxPage>\n        </AxSection>\n      </>\n  }\n}',...Example.parameters?.docs?.source}}};const __namedExportsOrder=["Example"]}}]);