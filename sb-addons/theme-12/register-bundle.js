try{
var M=__STORYBOOKADDONS__,{addons:m,types:p,mockChannel:x}=__STORYBOOKADDONS__;var v=__STORYBOOKAPI__,{ActiveTabs:Y,Consumer:F,ManagerContext:V,Provider:W,addons:w,combineParameters:U,controlOrMetaKey:z,controlOrMetaSymbol:j,eventMatchesShortcut:q,eventToShortcut:Z,isMacLike:J,isShortcutTaken:Q,keyToSymbol:X,merge:$,mockChannel:ee,optionOrAltSymbol:te,shortcutMatchesShortcut:oe,shortcutToHumanString:re,types:ae,useAddonState:se,useArgTypes:ne,useArgs:le,useChannel:me,useGlobalTypes:ce,useGlobals:_,useParameter:g,useSharedState:Te,useStoryPrepared:ie,useStorybookApi:ue,useStorybookState:he}=__STORYBOOKAPI__;var de=__STORYBOOKCOMPONENTS__,{A:Oe,ActionBar:Ee,AddonPanel:Ce,Badge:be,Bar:ye,Blockquote:Ae,Button:fe,ClipboardCode:ke,Code:He,DL:Re,Div:Ie,DocumentWrapper:Pe,ErrorFormatter:Be,FlexBar:Le,Form:Me,H1:xe,H2:De,H3:Ge,H4:Ke,H5:Ne,H6:ve,HR:Ye,IconButton:S,IconButtonSkeleton:Fe,Icons:Ve,Img:We,LI:we,Link:Ue,ListItem:ze,Loader:je,OL:qe,P:Ze,Placeholder:Je,Pre:Qe,ResetWrapper:Xe,ScrollArea:$e,Separator:et,Spaced:tt,Span:ot,StorybookIcon:rt,StorybookLogo:at,Symbols:st,SyntaxHighlighter:nt,TT:lt,TabBar:mt,TabButton:ct,TabWrapper:Tt,Table:it,Tabs:ut,TabsState:ht,TooltipLinkList:pt,TooltipMessage:_t,TooltipNote:gt,UL:St,WithTooltip:dt,WithTooltipPure:Ot,Zoom:Et,codeCommon:Ct,components:bt,createCopyToClipboardFunction:yt,getStoryHref:At,icons:ft,interleaveSeparators:kt,nameSpaceClassNames:Ht,resetComponents:Rt,withReset:It}=__STORYBOOKCOMPONENTS__;var xt=__STORYBOOKTHEMING__,{CacheProvider:Dt,ClassNames:Gt,Global:Kt,ThemeProvider:Nt,background:vt,color:Yt,convert:Ft,create:Vt,createCache:Wt,createGlobal:wt,createReset:Ut,css:zt,darken:jt,ensure:qt,ignoreSsrWarning:Zt,isPropValid:Jt,jsx:Qt,keyframes:Xt,lighten:$t,styled:eo,themes:c,typography:to,useTheme:oo,withTheme:ro}=__STORYBOOKTHEMING__;var l=__REACT__,{Children:mo,Component:co,Fragment:To,Profiler:io,PureComponent:uo,StrictMode:ho,Suspense:po,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:_o,cloneElement:go,createContext:So,createElement:Oo,createFactory:Eo,createRef:Co,forwardRef:bo,isValidElement:yo,lazy:Ao,memo:fo,useCallback:T,useContext:ko,useDebugValue:Ho,useEffect:i,useImperativeHandle:Ro,useLayoutEffect:Io,useMemo:Po,useReducer:Bo,useRef:Lo,useState:d,version:Mo}=__REACT__;var O="storybook-theme",f="theme";var k=({api:a})=>{let[s,E]=_(),{darkTheme:u=c.dark,lightTheme:h=c.light}=g("themeToggle",{}),[e,C]=d(localStorage.getItem(O)??"light"),b=T((n,A)=>{a.setOptions({theme:A}),E({[f]:n}),a.getChannel()?.emit("THEME_CHANGED",n)},[]),y=T(()=>{let n=e==="dark"?"light":"dark";localStorage.setItem(O,n),C(n)},[e]);return i(()=>{a.getChannel()?.emit("LOCALE_CHANGED",s.locale)},[s.locale]),i(()=>{b(e,e==="dark"?u:h)},[e,u,h]),l.createElement(S,{key:"ThemeToggle",title:"Toggle theme",active:e==="dark",onClick:y},l.createElement("svg",{viewBox:"0 0 32 32"},l.createElement("path",{fill:"currentColor",d:"M10.895 7.574c0 7.55 5.179 13.67 11.567 13.67 1.588 0 3.101-0.38 4.479-1.063-1.695 4.46-5.996 7.636-11.051 7.636-6.533 0-11.83-5.297-11.83-11.83 0-4.82 2.888-8.959 7.023-10.803-0.116 0.778-0.188 1.573-0.188 2.39z"})))};m.register("storybook/theme-toggle",a=>{m.add("storybook/theme-toggle/button",{title:"Theme toggle",type:p.TOOL,match:({viewMode:s})=>s==="story"||s==="docs",render:()=>l.createElement(k,{api:a})})});
}catch(e){ console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e); }
//# sourceMappingURL=register-bundle.js.map