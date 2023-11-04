/*! For license information please see 771.3a72f97e.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[771],{"./packages/data/dist/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{PH:()=>AxList,XA:()=>AxTreePanel});var dist=__webpack_require__("./packages/core/dist/index.js");const ar_namespaceObject=JSON.parse('{"label":{"noRecords":"لا تسجيلات"},"tree":{"noItems":"لا توجد عناصر","error":"خطأ في تحميل العناصر","loading":"تحميل العناصر…"},"datagrid":{"empty":"لا توجد سجلات متاحة"},"json":{"empty":"لا توجد خصائص بيانات","true":"نعم","false":"رقم"},"checkList":{"empty":"لا توجد عناصر قائمة"},"histogram":{"empty":"لا توجد رسوم بيانية"},"action":{"find":"تجد…","copy":"قيمة النسخ","filter":"منقي…","showShortcuts":"اختصارات لوحة المفاتيح…","collapseAll":"انهيار جميع","expandAll":"توسيع الكل","checkAll":"تحقق من الكل","uncheckAll":"الغاءالكل","addFilter":"أضف عامل تصفية","addFilterNot":"إضافة لا تصفية"}}'),en_namespaceObject=JSON.parse('{"label":{"noRecords":"No Records"},"tree":{"noItems":"No items","error":"Error loading items","loading":"Loading items..."},"datagrid":{"empty":"No records available"},"json":{"empty":"No data properties","true":"Yes","false":"No"},"checkList":{"empty":"No list items"},"histogram":{"empty":"No histograms"},"action":{"find":"Find...","copy":"Copy Value","filter":"Filter...","showShortcuts":"Keyboard shortcuts...","collapseAll":"Collapse All","expandAll":"Expand All","checkAll":"Check All","uncheckAll":"Uncheck All","addFilter":"Add Filter","addFilterNot":"Add not Filter"}}');(0,dist.a3)("data",{en:en_namespaceObject,ar:ar_namespaceObject});var react=__webpack_require__("./node_modules/react/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),hooks_useBadge=__webpack_require__("./packages/core/dist/hooks/useBadge.js"),appIcons=__webpack_require__("./packages/core/dist/types/appIcons.js"),utilities_dist=__webpack_require__("./packages/utilities/dist/index.js"),es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");var animations=__webpack_require__("./packages/core/dist/animations/index.js"),handlers=__webpack_require__("./packages/utilities/dist/handlers.js"),date_dist=__webpack_require__("./packages/date/dist/index.js");const DatagridContext=(0,react.createContext)({}),DatagridProvider=({children,columns=[],data=[],className,isSelectable,onRowSelect,sort,onSort,onRowExpand,datagridRef,lastScroll,onScroll,canExpand,...props})=>{const ghostRef=(0,react.useRef)(null),[widths,setWidths]=(0,react.useState)(new Map),refBody=(0,react.useRef)(null);(0,react.useEffect)((()=>{refBody.current?.scrollTo({top:0,behavior:"auto"})}),[data]),(0,react.useImperativeHandle)(datagridRef,(()=>({hilight:row=>{refBody.current?.querySelectorAll(".ax-datagrid__row.hilight").forEach((el=>el?.classList.remove("hilight")));const el=refBody.current?.querySelector(`[data-row="${row}"]`);el?.scrollIntoView({behavior:"smooth",block:"center"}),el?.classList.add("hilight")},unhilight:()=>{refBody.current?.querySelectorAll(".ax-datagrid__row.hilight").forEach((el=>el?.classList.remove("hilight")))},scrollTo:row=>{const el=refBody.current?.querySelector(`[data-row="${row}"]`);el?.scrollIntoView({behavior:"smooth"})}})),[]),(0,react.useEffect)((()=>{setWidths(new Map(columns.map((({name,width,minWidth=0,maxWidth=999})=>[name.toString(),width??Math.min(Math.max(180,minWidth),maxWidth)]))))}),[columns]);const startResize=(0,react.useCallback)((e=>{const colEl=e.currentTarget.closest(".ax-datagrid__header--cell");colEl&&null!=ghostRef.current&&((colEl,ghostEl,callback)=>{const placeholder=ghostEl.firstElementChild,isRtl="rtl"===getComputedStyle(colEl).direction,onResize=evt=>{const box=colEl.getBoundingClientRect(),x=isRtl?box.left-evt.clientX:evt.clientX-box.right;placeholder.style.width=`${colEl.offsetWidth+x}px`},onResizeEnd=()=>{callback(placeholder.offsetWidth),ghostEl.style.display="none",document.removeEventListener("mousemove",onResize),document.removeEventListener("mouseup",onResizeEnd)},box=colEl.getBoundingClientRect();if(null!=colEl.parentElement){const parentBox=colEl.parentElement?.getBoundingClientRect();isRtl?(placeholder.style.left="unset",placeholder.style.right=parentBox.right-box.right+"px"):(placeholder.style.right="unset",placeholder.style.left=parentBox.left-box.left+"px")}placeholder.style.width=`${colEl.offsetWidth}px`,placeholder.style.minWidth=colEl.style.minWidth||"48px",placeholder.style.maxWidth=colEl.style.maxWidth||"75vw",ghostEl.style.display="block",document.addEventListener("mousemove",onResize),document.addEventListener("mouseup",onResizeEnd)})(colEl,ghostRef.current,(width=>{setWidths(new Map(widths.set(colEl.dataset.name??"",width)))}))}),[widths]);return(0,react.useEffect)((()=>{refBody?.current?.scrollTo({top:lastScroll,behavior:"instant"})}),[]),(0,jsx_runtime.jsx)(DatagridContext.Provider,{value:{columns,data,widths,startResize,onRowExpand,isSelectable,onRowSelect,canExpand,sort,onSort},children:(0,jsx_runtime.jsxs)("div",{className:`ax-datagrid ${className??""}`,children:[(0,jsx_runtime.jsx)("div",{className:`ax-datagrid__wrapper ${className??""}`,onScroll:e=>onScroll?.(e.currentTarget.scrollTop),ref:refBody,children}),(0,jsx_runtime.jsx)("div",{className:"ax-datagrid__resize--ghost",ref:ghostRef,children:(0,jsx_runtime.jsx)("div",{})})]})})},useDatagridContext=()=>(0,react.useContext)(DatagridContext),BodyCell=(0,react.memo)((({row,name,minWidth,maxWidth,type,align,format,valueMap,render,record})=>{const{widths}=useDatagridContext(),width=(0,react.useMemo)((()=>widths.get(name.toString())??180),[widths,name]),content=(0,react.useMemo)((()=>{const value=(0,utilities_dist.getByPath)(record,name.toString());if(null!=render)return render(value,record,row);if("boolean"===type){return(valueMap??{true:"Yes",false:"no"})[""+((0,utilities_dist.isTrue)(value)?"true":"false")]}return null!=valueMap&&"string"===type&&value in valueMap?valueMap[value]:"date"===type?(0,jsx_runtime.jsx)(date_dist.$7,{date:value,format}):"number"===type?utilities_dist.Format.number(value,format):value??""}),[name,record,render,format,row,type,valueMap]);return(0,jsx_runtime.jsx)("div",{"data-name":name,"data-align":align,className:"ax-datagrid__body--cell",style:{minWidth,maxWidth,width},children:content})}));BodyCell.displayName="AxDatagrid.BodyCell";const BodyRow=(0,react.memo)((({row,record})=>{const{columns,isSelectable,onRowSelect,onRowExpand,canExpand}=useDatagridContext(),[isExpanded,setExpanded]=(0,react.useState)(!1),[expandedNode,setExpandedNode]=(0,react.useState)(),handleExpand=(0,react.useCallback)((()=>{if(!expandedNode){const node=onRowExpand?.(record);return setExpandedNode(node),setExpanded(!!node)}setExpanded(!isExpanded)}),[isExpanded,expandedNode,record,onRowExpand]),[start,end,cols]=(0,react.useMemo)((()=>[columns.filter((col=>!0===col.isLocked||"start"===col.isLocked)),columns.filter((col=>"end"===col.isLocked)),columns.filter((col=>!col.isLocked))]),[columns]);return(0,jsx_runtime.jsxs)("div",{className:"ax-datagrid__row","data-row":row,children:[(0,jsx_runtime.jsxs)("div",{className:"ax-datagrid__row--flex","data-selectable":isSelectable,onClick:isSelectable?(0,handlers.qk)((()=>onRowSelect?.(record))):void 0,children:[(0,jsx_runtime.jsxs)("div",{className:"ax-datagrid__fixStart",children:[!(null==onRowExpand)&&(0,jsx_runtime.jsx)("div",{className:"ax-datagrid__body--cell "+(!1!==canExpand?.(record)?"cursor-pointer":"opacity-30 pointer-events-none"),onClick:(0,handlers.qk)(handleExpand,{stopPropagation:!0}),children:(0,jsx_runtime.jsx)(dist.Ng,{icon:isExpanded?appIcons.U.iconCollapseMinus:appIcons.U.iconExpandPlus})}),start.map(((props,column)=>(0,jsx_runtime.jsx)(BodyCell,{...props,record,row},column)))]}),cols.map(((props,column)=>(0,jsx_runtime.jsx)(BodyCell,{...props,record,row},column))),(0,jsx_runtime.jsx)("div",{className:"ax-datagrid__fixEnd",children:end.map(((props,column)=>(0,jsx_runtime.jsx)(BodyCell,{...props,record,row},column)))})]}),isExpanded&&expandedNode]})}));BodyRow.displayName="AxDatagrid.BodyRow";const EmptyRow=()=>{const{columns,widths,onRowExpand}=useDatagridContext(),[start,end,cols]=(0,react.useMemo)((()=>[columns.filter((col=>!0===col.isLocked||"start"===col.isLocked)),columns.filter((col=>"end"===col.isLocked)),columns.filter((col=>!col.isLocked))]),[columns]);return(0,jsx_runtime.jsx)("div",{className:"ax-datagrid__row flex-1 pointer-events-none",children:(0,jsx_runtime.jsxs)("div",{className:"ax-datagrid__row--flex min-h-full",children:[(0,jsx_runtime.jsxs)("div",{className:"ax-datagrid__fixStart",children:[!(null==onRowExpand)&&(0,jsx_runtime.jsx)("div",{className:"ax-datagrid__body--cell",children:(0,jsx_runtime.jsx)(dist.Ng,{icon:""})}),start.map((({minWidth,maxWidth,name},column)=>(0,jsx_runtime.jsx)("div",{className:"ax-datagrid__body--cell",style:{minWidth,maxWidth,width:widths.get(name.toString())??180}},column)))]}),cols.map((({name,minWidth,maxWidth},column)=>(0,jsx_runtime.jsx)("div",{className:"ax-datagrid__body--cell",style:{minWidth,maxWidth,width:widths.get(name.toString())??180}},column))),(0,jsx_runtime.jsx)("div",{className:"ax-datagrid__fixEnd",children:end.map((({minWidth,maxWidth,name},column)=>(0,jsx_runtime.jsx)("div",{className:"ax-datagrid__body--cell",style:{minWidth,maxWidth,width:widths.get(name.toString())??180}},column)))})]})})},Body=(0,react.memo)((()=>{const{data}=useDatagridContext();return(0,jsx_runtime.jsxs)("div",{className:"ax-datagrid__body",children:[data.map(((record,row)=>(0,jsx_runtime.jsx)(BodyRow,{record,row},row))),(0,jsx_runtime.jsx)(EmptyRow,{})]})}));Body.displayName="AxDatagrid.Body";const HeaderCell=(0,react.memo)((({icon,name,isPrimary,isResizeable,isSortable,tooltip,rtlFlip,label,minWidth,maxWidth})=>{const{startResize,widths,sort,onSort}=useDatagridContext(),width=(0,react.useMemo)((()=>widths.get(name.toString())??180),[widths,name]),tooltipContent=(0,react.useMemo)((()=>tooltip?`${isPrimary?"🔑":""}${!0!==tooltip?tooltip:label}`:""),[isPrimary,label,tooltip]),handleSort=(0,react.useCallback)((()=>{onSort?.(name.toString(),sort?.name===name&&"asc"===sort.order?"desc":"asc")}),[onSort,name,sort]);return(0,jsx_runtime.jsxs)("div",{"data-name":name,className:"ax-datagrid__header--cell",style:{minWidth,maxWidth,width},children:[(0,jsx_runtime.jsxs)("div",{className:"ax-datagrid__header--label","data-sortable":isSortable,"data-centered":!label&&!!icon,onClick:(0,handlers.qk)(handleSort),"data-tooltip":tooltipContent,"data-tooltip-placement":"bottom-start",children:[icon&&(0,jsx_runtime.jsx)(dist.Ng,{icon,rtlFlip}),isPrimary&&(0,jsx_runtime.jsx)(dist.Ng,{rtlFlip:!0,icon:"M4 6.5C4 4 6 2 8.5 2S13 4 13 6.5C13 8.46 11.75 10.13 10 10.74V15H13V18H10V22H7V10.74C5.25 10.13 4 8.46 4 6.5M7 6.5C7 7.33 7.67 8 8.5 8S10 7.33 10 6.5 9.33 5 8.5 5 7 5.67 7 6.5"}),(0,jsx_runtime.jsx)("label",{children:label}),isSortable&&(0,jsx_runtime.jsxs)("div",{className:"ax-datagrid__header--sort","data-sort":sort?.name===name&&sort?.order,children:[(0,jsx_runtime.jsx)("span",{children:"▼"}),(0,jsx_runtime.jsx)("span",{children:"▲"})]})]}),isResizeable&&(0,jsx_runtime.jsx)("div",{onMouseDown:startResize,className:"ax-datagrid__header--resize"})]})}));HeaderCell.displayName="AxDatagrid.HeaderCell";const Header=(0,react.memo)((()=>{const{columns,onRowExpand}=useDatagridContext(),[start,end,cols]=(0,react.useMemo)((()=>[columns.filter((col=>!0===col.isLocked||"start"===col.isLocked)),columns.filter((col=>"end"===col.isLocked)),columns.filter((col=>!col.isLocked))]),[columns]);return(0,jsx_runtime.jsxs)("div",{className:"ax-datagrid__header",children:[(0,jsx_runtime.jsxs)("div",{className:"ax-datagrid__fixStart",children:[!(null==onRowExpand)&&(0,jsx_runtime.jsx)("div",{className:"ax-datagrid__header--cell px-2",children:(0,jsx_runtime.jsx)(dist.Ng,{icon:""})}),start.map(((props,index)=>(0,jsx_runtime.jsx)(HeaderCell,{...props},index)))]}),cols.map(((props,index)=>(0,jsx_runtime.jsx)(HeaderCell,{...props},index))),(0,jsx_runtime.jsx)("div",{className:"ax-datagrid__fixEnd",children:end.map(((props,index)=>(0,jsx_runtime.jsx)(HeaderCell,{...props},index)))})]})}));Header.displayName="AxDatagrid.Header";const AxDatagridComponent=({data=[],emptyDisplay,children,isLoading,...props})=>{const{t}=(0,es.$G)("data");return(0,jsx_runtime.jsxs)(DatagridProvider,{...props,data,onRowExpand:children,children:[(0,jsx_runtime.jsx)(Header,{}),data.length>0&&(0,jsx_runtime.jsx)(Body,{}),isLoading&&(0,jsx_runtime.jsx)("div",{className:"ax-datagrid__loader",children:(0,jsx_runtime.jsx)(animations.z$,{})}),!isLoading&&0===data.length&&(0,jsx_runtime.jsx)(react.Fragment,{children:emptyDisplay&&!(0,utilities_dist.isString)(emptyDisplay)?emptyDisplay:(0,jsx_runtime.jsx)(dist.aW.Empty,{size:"sm",message:emptyDisplay??t("datagrid.empty")})})]})};AxDatagridComponent.displayName="AxDatagrid";(0,react.memo)(AxDatagridComponent);__webpack_require__("./node_modules/@monaco-editor/react/dist/index.mjs");var useIsRtl=__webpack_require__("./packages/core/dist/hooks/useIsRtl.js"),form_dist=__webpack_require__("./packages/form/dist/index.js"),react_virtualized_auto_sizer_esm=__webpack_require__("./node_modules/react-virtualized-auto-sizer/dist/react-virtualized-auto-sizer.esm.js"),index_esm=__webpack_require__("./node_modules/react-window/dist/index.esm.js");const TreeNode=(0,react.memo)((({style,isCheckable,isSelectable,checkLevel=0,onToggleCheck,onToggleExpand,nodesSelectable,onSelect,node,...props})=>{const{t}=(0,es.$G)("data"),BadgeEl=(0,hooks_useBadge.Q)(node.badge),borders=(0,react.useMemo)((()=>props.lines.map(((l,i)=>(0,jsx_runtime.jsx)("span",{className:"ax-tree__spacer","data-border":l},i)))),[props.lines]),placeholder=(0,react.useMemo)((()=>props.isEmpty?props.isError?(0,jsx_runtime.jsx)("div",{className:"ax-tree__label","data-error":"true",children:t("tree.error")}):props.isLoading?(0,jsx_runtime.jsxs)("div",{className:"ax-tree__label","data-empty":"true",children:[(0,jsx_runtime.jsx)(dist.Xr.Spinner,{className:"text-base"})," ",t("tree.loading")]}):(0,jsx_runtime.jsx)("div",{className:"ax-tree__label","data-empty":"true",children:t("tree.noItems")}):null),[props.isEmpty,props.isLoading]);return(0,jsx_runtime.jsxs)("div",{style,className:"ax-tree__node",children:[borders,!props.isLeaf&&(0,jsx_runtime.jsx)("div",{className:"ax-tree__spacer",onClick:onToggleExpand,children:(0,jsx_runtime.jsx)(dist.Ng,{icon:props.isOpen?node.iconOpen??appIcons.U.iconFolderOpen:node.iconClosed??appIcons.U.iconFolderClosed})}),placeholder,null==placeholder&&(0,jsx_runtime.jsxs)("div",{...node.props??{},className:`ax-tree__label ${node.labelClassName??""}`,onClick:()=>isCheckable?onToggleCheck(node.id):props.isLeaf||nodesSelectable?isSelectable&&onSelect(node.id):onToggleExpand(node.id),onDoubleClick:onToggleExpand,"data-selected":!isCheckable&&props.isSelected,"data-disabled":node.isDisabled,"data-child-selected":props.childSelected,children:[isCheckable&&props.level>=checkLevel&&(0,jsx_runtime.jsx)(dist.Ng,{icon:2===props.isChecked?appIcons.U.iconCheckboxInt:1===props.isChecked?appIcons.U.iconCheckboxOn:appIcons.U.iconCheckboxOff}),node.icon&&(0,jsx_runtime.jsx)(dist.Ng,{icon:node.icon??""}),(0,jsx_runtime.jsx)(dist.Qi.Ellipsis,{children:node.label}),BadgeEl]})]})}));TreeNode.displayName="AxTree.Node";const TreeTools=(0,react.memo)((({title,onExpand,onCollapse,onCheckAll,onUncheckAll,isCheckable})=>{const{t}=(0,es.$G)("data");return(0,jsx_runtime.jsxs)("div",{className:"ax-tree__tools",children:[(0,jsx_runtime.jsx)("div",{className:"flex-1 self-center px-2 truncate",children:title}),(0,jsx_runtime.jsx)(dist.oG,{size:"sm",variant:"link",onClick:onExpand,icon:appIcons.U.iconExpandAll,tooltip:t("action.expandAll")}),(0,jsx_runtime.jsx)(dist.oG,{size:"sm",variant:"link",onClick:onCollapse,icon:appIcons.U.iconCollapseAll,tooltip:t("action.collapseAll")}),isCheckable&&(0,jsx_runtime.jsxs)(react.Fragment,{children:[(0,jsx_runtime.jsx)(dist.qm,{vertical:!0,size:"xs"}),(0,jsx_runtime.jsx)(dist.oG,{size:"sm",variant:"link",onClick:onUncheckAll,icon:appIcons.U.iconCheckboxOff,tooltip:t("action.uncheckAll")}),(0,jsx_runtime.jsx)(dist.oG,{size:"sm",variant:"link",onClick:onCheckAll,icon:appIcons.U.iconCheckAll,tooltip:t("action.checkAll")})]})]})}));TreeTools.displayName="AxTree.Tools";const sorter=(a,b)=>!!a.isLeaf!=!!b.isLeaf?a.isLeaf?1:-1:(0,utilities_dist.compareValues)()(a.label,b.label),refactorNode=({node:{children,...node},index=0,isLast=!1,parent="",parentQuery="",level=0,lines=[],sortable=!0,...rest})=>{const internalId=`${parent}.${index}`,query=`${parentQuery}~${node.label}`,innerChildren=sortable?children?.sort(sorter):children,newLines=[...lines,isLast?0:1];return{internalId,parent,node,level,query,...rest,lines:newLines,isLeaf:!!node.isLeaf,isSelected:!1,childSelected:!1,isOpen:!!node.isOpen,isChecked:0,children:innerChildren?.map(((child,idx)=>refactorNode({node:child,index:idx,lines:newLines,isLast:idx+1===innerChildren.length,parent:internalId,parentQuery:query,level:level+1,sortable})))}},createTreeMap=nodes=>{const map=new Map,makeMap=nodes=>{nodes.forEach((node=>{map.set(node.internalId,node),null!=node.children&&makeMap(node.children)}))};return makeMap(nodes),map},createIdMap=nodes=>{const map=new Map,makeMap=nodes=>{nodes.forEach((node=>{node.node.id&&map.set(node.node.id,node.internalId),null!=node.children&&makeMap(node.children)}))};return makeMap(nodes),map},createNodeList=(nodes,sortable)=>{const list=[];return nodes.forEach((node=>{!1!==node.isFiltered&&list.push(node),node.isOpen&&(null!=node.children&&node.children.length>0?list.push(...createNodeList(node.children,sortable)):void 0!==node.isFiltered||node.isLeaf||list.push(refactorNode({node:{isLeaf:!0},index:0,isLast:!0,isEmpty:!0,isLoading:node.isLoading,isError:node.isError,lines:node.lines,parent:node.internalId,level:node.level+1,sortable})))})),list},toggleProperty=(nodes,prop,value,checkChildren=!1)=>{nodes.forEach((node=>{prop in node&&(!checkChildren||checkChildren&&node.children?.length>0)&&(node[prop]=value),null!=node.children&&toggleProperty(node.children,prop,value,checkChildren)}))},getNodeById=(state,id)=>state.treeMap.get(state.idMap.get(id??"")??""),toggleExpand=(state,id,canLoad=!1,isSortable=!0,force)=>{const parent=getNodeById(state,id);if(parent){const index=state.items.indexOf(parent);parent.isOpen=force??!parent.isOpen,parent.isOpen?(0,utilities_dist.isNil)(parent.children)?(parent.isLoading=canLoad,state.items.splice(index+1,0,refactorNode({node:{isLeaf:!0},index:0,isLast:!0,isEmpty:!0,isLoading:canLoad,isError:parent.isError,lines:parent.lines,parent:parent.internalId,level:parent.level+1}))):state.items.splice(index+1,0,...createNodeList(parent.children,isSortable)):state.items=state.items.filter((item=>!(item.internalId!==parent.internalId&&item.internalId.startsWith(parent.internalId))))}return{...state}},AxTreePanel=(0,react.memo)((({className,data,title,actions,selected,nodesSelectable,isSortable=!0,isSearchable,isCheckable,isSelectable,checkLevel=0,onChange,onLoad,onSelect,treeRef:ref,...rest})=>{const isRtl=(0,useIsRtl.n)(),listRef=(0,react.useRef)(null),panelRef=(0,react.useRef)(null),[,startTransition]=(0,react.useTransition)(),initState=(0,react.useCallback)(((data=[])=>{const treeData=(nodes=data,((sortable=isSortable)?nodes.sort(sorter):nodes).map(((node,index)=>refactorNode({node,index,isLast:index+1===nodes.length,sortable}))));var nodes,sortable;return{treeData,treeMap:createTreeMap(treeData),idMap:createIdMap(treeData),items:createNodeList(treeData,isSortable),autoScroll:!1}}),[]),fireCheckChange=(0,react.useCallback)((items=>{const checkList=items.map((node=>1===node.isChecked&&node.isLeaf?node.node.id:void 0)).filter(Boolean);onChange?.(checkList)}),[onChange]),reducer=(0,react.useCallback)(((state,action)=>{if(state.autoScroll=!1,"init"===action.type&&action.newState)return{...action.newState};if("toggleExpand"===action.type)return toggleExpand(state,action.id,!(null==onLoad),isSortable);if("open"===action.type)return toggleExpand(state,action.id,!(null==onLoad),isSortable,!0);if("toggleCheck"===action.type){const newState=((state,id)=>{const node=getNodeById(state,id);if(node){node.isChecked=0===node.isChecked?1:0,null!=node.children&&toggleProperty(node.children,"isChecked",node.isChecked);let parent=state.treeMap.get(node.parent??"");const parentCheck=parent?.children?.some((n=>n.isChecked!==node.isChecked))?2:node.isChecked;for(;null!=parent;)parent.isChecked=parentCheck,parent=state.treeMap.get(parent.parent??"")}return{...state}})(state,action.id);return startTransition((()=>fireCheckChange?.(Array.from(newState.treeMap.values())))),newState}if("loadItems"===action.type){const parent=getNodeById(state,action.id);if(parent){parent.isLoading=!1,parent.isError=!1;const index=state.items.indexOf(parent);((parent,children,sortable)=>{const list=sortable?children.sort(sorter):children;parent.children=list.map(((child,idx)=>refactorNode({node:child,index:idx,lines:parent.lines,isLast:idx+1===children.length,parent:parent.internalId,level:parent.level+1})))})(parent,action.items??[],isSortable),state.idMap=createIdMap(state.treeData),state.treeMap=createTreeMap(state.treeData),state.items.splice(index+1,1,...((parent,sortable)=>null!=parent.children&&parent.children?.length>0?createNodeList(parent.children,sortable):[refactorNode({node:{isLeaf:!0},index:0,isLast:!0,isEmpty:!0,isLoading:parent.isLoading,isError:parent.isError,lines:parent.lines,parent:parent.internalId,level:parent.level+1,sortable})])(parent,isSortable))}}if("loadError"===action.type){const parent=getNodeById(state,action.id);if(parent){const index=state.items.indexOf(parent),item=state.items[index+1];item&&(item.isLoading=!1,item.isError=!0),parent.isLoading=!1,parent.isError=!0}}return"expandAll"===action.type&&(toggleProperty(state.treeData,"isOpen",!0,!0),state.items=createNodeList(state.treeData,isSortable)),"collapseAll"===action.type&&(toggleProperty(state.treeData,"isOpen",!1),state.items=createNodeList(state.treeData,isSortable)),"checkAll"===action.type&&(toggleProperty(state.treeData,"isChecked",1),setTimeout((()=>startTransition((()=>fireCheckChange?.(Array.from(state.treeMap.values()))))),100)),"uncheckAll"===action.type&&(toggleProperty(state.treeData,"isChecked",0),setTimeout((()=>startTransition((()=>fireCheckChange?.(Array.from(state.treeMap.values()))))),100)),"select"===action.type&&(state.autoScroll=!0,((state,id,isSortable=!0,scroll=!1)=>{const node=getNodeById(state,id);if(node){Array.from(state.treeMap.values()).forEach((n=>{n.isSelected=!1,n.childSelected=!1})),node.isSelected=!0;let parent=state.treeMap.get(node.parent??"");for(;null!=parent;)parent.isOpen=!0,parent.childSelected=!0,parent=state.treeMap.get(parent.parent??"");return state.items=createNodeList(state.treeData,isSortable),state.autoScroll=scroll,!node.isLeaf}})(state,action.id,isSortable,action.propChange),!action.propChange&&setTimeout((()=>startTransition((()=>{action.id&&onSelect?.(action.id)}))),100)),"search"===action.type&&(Array.from(state.treeMap.values()).forEach((item=>{if(item.isFiltered=action.search?(0,utilities_dist.matchString)(item.query,action.search):void 0,item.parent&&item.isFiltered){let parent=state.treeMap.get(item.parent);for(;null!=parent;)!action.search&&(parent.isOpen=!1),parent.isFiltered=item.isFiltered,parent=state.treeMap.get(parent.parent??"")}})),state.autoScroll=!0,state.items=createNodeList(state.treeData,isSortable)),{...state}}),[onLoad,onSelect,fireCheckChange,isSortable]),[state,dispatch]=(0,react.useReducer)(reducer,{treeData:[],treeMap:new Map,idMap:new Map,items:[],autoScroll:!1},(()=>initState()));(0,react.useEffect)((()=>{dispatch({type:"init",newState:initState(data)})}),[data]);const itemHeight=(0,react.useCallback)((el=>{const h=null!=el?1.5*parseInt(getComputedStyle(el).fontSize??"16"):0;return isNaN(h)?0:h}),[state.items]);(0,react.useEffect)((()=>{selected&&dispatch({type:"select",id:selected,propChange:!0})}),[data,selected]);const loadNodes=(0,react.useCallback)((id=>{startTransition((()=>{if(id){const ret=onLoad?.(id)??[];Promise.resolve(ret).then((resp=>{dispatch({type:"loadItems",id,items:resp??[]})})).catch((()=>dispatch({type:"loadError",id})))}}))}),[onLoad]),handleExpand=(0,react.useCallback)((index=>{const parent=state.items[index];dispatch({type:"toggleExpand",id:parent.node.id}),!parent.isOpen&&(0,utilities_dist.isNil)(parent.children)&&loadNodes(parent.node.id)}),[state,loadNodes]);return(0,react.useImperativeHandle)(ref,(()=>({select:id=>dispatch({type:"select",id,propChange:!0}),open:id=>{dispatch({type:"open",id,propChange:!0});const parent=state.treeMap.get(state.idMap.get(id)??"");parent&&(0,utilities_dist.isNil)(parent?.children)&&loadNodes(parent.node.id)}})),[state,loadNodes]),(0,react.useLayoutEffect)((()=>{state.autoScroll&&startTransition((()=>{const item=Array.from(state.treeMap.values()).find((n=>n.isSelected));if(null!=item){const focusIndex=state.items.indexOf(item);focusIndex>-1&&listRef.current?.scrollToItem(focusIndex,"center")}}))}),[state]),(0,jsx_runtime.jsxs)("div",{...rest,ref:panelRef,className:`ax-tree__panel ${className??""}`,children:[(0,jsx_runtime.jsx)(TreeTools,{title,isCheckable,onExpand:()=>dispatch({type:"expandAll"}),onCollapse:()=>dispatch({type:"collapseAll"}),onCheckAll:()=>dispatch({type:"checkAll"}),onUncheckAll:()=>dispatch({type:"uncheckAll"})}),isSearchable&&(0,jsx_runtime.jsx)(form_dist.z.Search,{isPlain:!0,onChange:search=>dispatch({type:"search",search}),className:"ax-tree__search"}),(0,jsx_runtime.jsx)("div",{className:"ax-tree__list",children:(0,jsx_runtime.jsx)(react_virtualized_auto_sizer_esm.ZP,{children:({width,height})=>(0,jsx_runtime.jsx)(index_esm.t7,{ref:listRef,useIsScrolling:!0,width,height,itemSize:itemHeight(panelRef.current),itemCount:state.items.length,direction:isRtl?"rtl":"ltr",style:{paddingBottom:"2rem"},children:({index,style})=>(0,jsx_runtime.jsx)(TreeNode,{style,...state.items[index],checkLevel,isCheckable,isSelectable,nodesSelectable,onSelect:id=>dispatch({type:"select",id}),onToggleCheck:id=>dispatch({type:"toggleCheck",id}),onToggleExpand:()=>handleExpand(index)})})})})]})}));AxTreePanel.displayName="AxTree.Panel";var memoize_one_esm=__webpack_require__("./node_modules/memoize-one/dist/memoize-one.esm.js"),ResizeObserver_es=__webpack_require__("./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js");const Wrapper=(maxWidth=1100,hideScroller=!1)=>{const El=(0,react.forwardRef)((({children,width,...props},ref)=>{const scrollerRef=(0,react.useRef)(null),[,startTransition]=(0,react.useTransition)(),[isLoading,setLoading]=(0,react.useState)(!1);(0,react.useImperativeHandle)(ref,(()=>{const el=scrollerRef.current;return el.setLoading=setLoading,el}),[]);const[noScrollUp,setNoScrollUp]=(0,react.useState)(),[noScrollDown,setNoScrollDown]=(0,react.useState)();(0,react.useLayoutEffect)((()=>{const el=scrollerRef.current;if(null!=el){const cb=()=>{setNoScrollUp(0===el.scrollTop),setNoScrollDown(el.scrollTop+el.offsetHeight>=el.scrollHeight-96),el.scrollTop+el.offsetHeight>=el.scrollHeight-16&&fireEvent("loadMore")};return el?.addEventListener("scroll",cb),cb(),()=>{el?.removeEventListener("scroll",cb)}}}),[children]);const fireEvent=(0,react.useCallback)((event=>{scrollerRef.current?.dispatchEvent(new Event(event,{bubbles:!0}))}),[]);return(0,react.useEffect)((()=>{const el=scrollerRef.current;startTransition((()=>{el&&el.scrollTop+el.offsetHeight>=el.scrollHeight-16&&(el.scrollTop-=96)}))}),[isLoading]),(0,jsx_runtime.jsxs)("div",{...props,className:"ax-virtual__wrapper",ref:scrollerRef,children:[(0,jsx_runtime.jsxs)("div",{style:{minWidth:Math.min(.8*props.style.width,maxWidth)},children:[children,(0,jsx_runtime.jsx)(dist.Xr.Card,{showIcon:!0,className:isLoading?"visible":"invisible"})]}),!hideScroller&&(0,jsx_runtime.jsx)("div",{className:"ax-virtual__scroll",children:(0,jsx_runtime.jsx)("div",{children:(0,jsx_runtime.jsxs)(dist.oG.Group,{isVertical:!0,variant:"flat",children:[(0,jsx_runtime.jsx)(dist.oG,{size:"sm",variant:"link",className:"flush","aria-label":"scroll to top",icon:appIcons.U.iconChevronUp,onClick:()=>fireEvent("scrollFirst"),isDisabled:noScrollUp}),(0,jsx_runtime.jsx)(dist.oG,{size:"sm",variant:"link",className:"flush","aria-label":"scroll up",icon:appIcons.U.iconCaretUp,onClick:()=>fireEvent("scrollUp"),isDisabled:noScrollUp}),(0,jsx_runtime.jsx)(dist.oG,{size:"sm",variant:"link",className:"flush","aria-label":"scroll down",icon:appIcons.U.iconCaretDown,onClick:()=>fireEvent("scrollDown"),isDisabled:noScrollDown}),(0,jsx_runtime.jsx)(dist.oG,{size:"sm",variant:"link",className:"flush","aria-label":"scroll to bottom",icon:appIcons.U.iconChevronDown,onClick:()=>fireEvent("scrollLast"),isDisabled:noScrollDown})]})})})]})}));return El.displayName="VirtualWrapper",El},Item=(0,react.memo)((({style,index,rowIndex,columnIndex,children,updateHeight})=>{const itemRef=(0,react.useRef)(null);return(0,react.useLayoutEffect)((()=>{const ob=new ResizeObserver_es.Z((()=>{const el=itemRef.current;null!=el&&updateHeight(rowIndex,columnIndex,el.offsetHeight)}));return null!=itemRef.current&&ob.observe(itemRef.current),()=>{ob.disconnect()}}),[rowIndex,columnIndex,parent]),(0,jsx_runtime.jsx)("div",{style,className:"overflow-hidden",children:(0,jsx_runtime.jsx)("div",{ref:itemRef,className:"ax-grid__item","data-index":index,children})})}),index_esm.wy),createItemList=(0,memoize_one_esm.Z)((items=>items)),AxGridViewComponent=({className,children,items,colHeight=48,colWidth=550,listRef:ref,isLoading,lastScroll=0,onLoadMore,onScroll,...rest})=>{const isRtl=(0,useIsRtl.n)(),containerRef=(0,react.useRef)(null),[listRef,setList]=(0,react.useState)(),cache=(0,react.useMemo)((()=>new Map),[]),count=(0,react.useDeferredValue)(items.length),itemList=createItemList(items),colCount=(0,react.useRef)(0);(0,react.useEffect)((()=>{listRef?._outerRef?.setLoading(isLoading),!isLoading&&setTimeout((()=>{listRef?.scrollToItem({align:"start",columnIndex:0,rowIndex:lastScroll})}),50)}),[listRef,isLoading]),(0,react.useImperativeHandle)(ref,(()=>listRef&&{hilight:idx=>{idx>=0&&(listRef.scrollToItem({align:"smart",rowIndex:Math.floor(idx/(colCount.current||1)),columnIndex:0}),containerRef.current?.querySelector(".hilight")?.classList.remove("hilight"),setTimeout((()=>{containerRef.current?.querySelector(`[data-index="${idx}"]`)?.classList.add("hilight")}),500))},unhilight:()=>containerRef.current?.querySelector(".hilight")?.classList.remove("hilight"),scrollTo:(...args)=>listRef?.scrollTo(...args),scrollToItem:(...args)=>listRef?.scrollToItem(...args)}),[listRef]),(0,react.useEffect)((()=>{const el=containerRef.current,handlers_scrollFirst=()=>listRef.scrollToItem({rowIndex:0,columnIndex:0}),handlers_scrollLast=()=>listRef.scrollToItem({align:"smart",rowIndex:listRef.props.rowCount,columnIndex:0}),handlers_scrollDown=()=>listRef.scrollTo({scrollTop:listRef.state.scrollTop+listRef.props.height}),handlers_scrollUp=()=>listRef.scrollTo({scrollTop:listRef.state.scrollTop-listRef.props.height}),handlers_loadMore=()=>{!isLoading&&onLoadMore?.()};return el?.addEventListener("scrollFirst",handlers_scrollFirst),el?.addEventListener("scrollLast",handlers_scrollLast),el?.addEventListener("scrollDown",handlers_scrollDown),el?.addEventListener("scrollUp",handlers_scrollUp),el?.addEventListener("loadMore",handlers_loadMore),()=>{el?.removeEventListener("scrollFirst",handlers_scrollFirst),el?.removeEventListener("scrollLast",handlers_scrollLast),el?.removeEventListener("scrollDown",handlers_scrollDown),el?.removeEventListener("scrollUp",handlers_scrollUp),el?.removeEventListener("loadMore",handlers_loadMore)}}),[listRef,count,isLoading,onLoadMore]);const updateCache=(0,react.useCallback)(((rowIndex,columnIndex,height)=>{const size=cache.get(rowIndex)??[];(height!==size[columnIndex]??colHeight)&&(size[columnIndex]=height,cache.set(rowIndex,size),listRef.resetAfterRowIndex(rowIndex))}),[listRef]),outerElement=(0,react.useMemo)((()=>Wrapper()),[]);return(0,jsx_runtime.jsx)("div",{...rest,ref:containerRef,className:`ax-virtual__container ${className??""}`,children:(0,jsx_runtime.jsx)(react_virtualized_auto_sizer_esm.ZP,{children:({width,height})=>{const cc=Math.floor((width-84)/colWidth);return colCount.current=cc,(0,jsx_runtime.jsx)(index_esm.cd,{ref:setList,useIsScrolling:!0,width,height,rowCount:Math.ceil(count/cc),itemData:itemList,columnCount:cc,direction:isRtl?"rtl":"ltr",outerElementType:outerElement,onItemsRendered:e=>onScroll?.(e.visibleRowStartIndex),columnWidth:()=>Math.min(colWidth,(width-84)/cc),rowHeight:index=>Math.max(...cache.get(index)??[],colHeight),children:props=>children({...props,index:props.rowIndex*cc+props.columnIndex,data:props.data.length>props.rowIndex*cc+props.columnIndex?props.data[props.rowIndex*cc+props.columnIndex]:null,updateHeight:updateCache})})}})})};AxGridViewComponent.displayName="AxGridView";const AxGridView=(0,react.memo)(AxGridViewComponent);AxGridView.Item=Item,AxGridView.Item.displayName="AxGridView.Item";const List_Item=(0,react.memo)((({style,index,children,updateSize,className,isScrolling,...rest})=>{const itemRef=(0,react.useRef)(null);return(0,react.useLayoutEffect)((()=>{const ob=new ResizeObserver_es.Z((()=>{const el=itemRef.current;null!=el&&updateSize?.(index,[el.offsetWidth,el.offsetHeight])}));return null!=itemRef.current&&ob.observe(itemRef.current),()=>{ob.disconnect()}}),[index,parent]),(0,jsx_runtime.jsx)("div",{style,className:"overflow-hidden",children:(0,jsx_runtime.jsx)("div",{...rest,ref:itemRef,className:`ax-list__item ${className??""}`,children})})}),index_esm.wy),List_createItemList=(0,memoize_one_esm.Z)((items=>items)),AxListComponent=({className,children,layout,items,listRef:ref,stickies=0,...rest})=>{const isRtl=(0,useIsRtl.n)(),[listRef,setList]=(0,react.useState)(),cache=(0,react.useMemo)((()=>new Map),[]);(0,react.useImperativeHandle)(ref,(()=>listRef),[listRef]);const count=(0,react.useDeferredValue)(items.length),itemList=List_createItemList(items);(0,react.useEffect)((()=>{cache.clear()}),[layout]);const updateCache=(0,react.useCallback)(((index,[width,height])=>{width===(cache.get(index)?.[0]??48)&&height===(cache.get(index)?.[1]??48)||(cache.set(index,[width,height]),listRef.resetAfterIndex(index))}),[listRef]),getSize=(0,react.useCallback)((index=>cache.get(index)?.["horizontal"===layout?0:1]??48),[layout]),StickyList=(0,react.forwardRef)((({children:innerChildren,...rest},ref)=>(0,jsx_runtime.jsxs)("div",{ref,...rest,children:[(0,jsx_runtime.jsx)("div",{className:"ax-list__sticky","data-layout":layout,children:stickies>0&&items.slice(0,stickies).map(((data,index)=>children({data,key:index})))}),innerChildren]})));return(0,jsx_runtime.jsx)("div",{...rest,className:`ax-virtual__container ${className??""}`,children:(0,jsx_runtime.jsx)(react_virtualized_auto_sizer_esm.ZP,{children:({width,height})=>(0,jsx_runtime.jsx)(index_esm.S_,{ref:setList,useIsScrolling:!0,width,height,layout,itemCount:count,itemData:itemList,direction:isRtl?"rtl":"ltr",innerElementType:StickyList,itemSize:getSize,style:{paddingBottom:"2rem"},children:props=>children({...props,updateSize:updateCache,data:props.data.length>props.index?props.data[props.index]:null})})})})};AxListComponent.displayName="AxList";const AxList=(0,react.memo)(AxListComponent);AxList.Item=List_Item,AxList.Item.displayName="AxList.Item";const Timeline_Item=(0,react.memo)((({style,index,children,lastChild,isScrolling,updateHeight,noLine,reverse,className,iconClassName,icon=appIcons.U.iconFace,bg,color,rtlFlip,size,viewBox,animate,...rest})=>{const itemRef=(0,react.useRef)(null);return(0,react.useLayoutEffect)((()=>{const ob=new ResizeObserver_es.Z((()=>{const el=itemRef.current;null!=el&&updateHeight(index,el.offsetHeight)}));return null!=itemRef.current&&ob.observe(itemRef.current),()=>{ob.disconnect()}}),[index,parent]),(0,jsx_runtime.jsx)("div",{style,className:"overflow-hidden",children:(0,jsx_runtime.jsxs)("div",{...rest,ref:itemRef,"data-size":size,"data-index":index,"data-noline":noLine,"data-reverse":reverse,"data-last-child":lastChild,className:"ax-timeline__item",children:[(0,jsx_runtime.jsx)("div",{className:isScrolling?"animate-pulse":"",children:(0,jsx_runtime.jsxs)("div",{className:"ax-timeline__avatar",children:[(0,utilities_dist.isString)(icon)&&(0,jsx_runtime.jsx)(dist.Ng,{className:iconClassName,icon,bg,color,rtlFlip,viewBox,animate}),!(0,utilities_dist.isString)(icon)&&icon]})}),(0,jsx_runtime.jsx)("div",{className,children})]})})}),index_esm.wy),Timeline_createItemList=(0,memoize_one_esm.Z)((items=>items)),AxTimelineComponent=({className,children,items,maxWidth,minHeight=48,isLoading,hideScroller,onLoadMore,onScroll,lastScroll=0,listRef:ref,...rest})=>{const isRtl=(0,useIsRtl.n)(),containerRef=(0,react.useRef)(null),[listRef,setList]=(0,react.useState)(),cache=(0,react.useMemo)((()=>new Map),[]),count=(0,react.useDeferredValue)(items.length),itemList=Timeline_createItemList(items);(0,react.useEffect)((()=>{listRef?._outerRef.setLoading(isLoading),!isLoading&&setTimeout((()=>{listRef?.scrollToItem(lastScroll??0,"start")}),50)}),[listRef,isLoading]),(0,react.useImperativeHandle)(ref,(()=>listRef&&{hilight:idx=>{idx>=0&&(listRef.scrollToItem(idx,"smart"),containerRef.current?.querySelector(".hilight")?.classList.remove("hilight"),setTimeout((()=>{containerRef.current?.querySelector(`[data-index="${idx}"]`)?.classList.add("hilight")}),500))},unhilight:()=>containerRef.current?.querySelector(".hilight")?.classList.remove("hilight"),scrollTo:(...args)=>listRef?.scrollTo(...args),scrollToItem:(...args)=>listRef?.scrollToItem(...args)}),[listRef]),(0,react.useEffect)((()=>{const el=containerRef.current,handlers_scrollFirst=()=>listRef.scrollToItem(0),handlers_scrollLast=()=>listRef.scrollToItem(count,"smart"),handlers_scrollDown=()=>listRef.scrollTo(listRef.state.scrollOffset+listRef.props.height),handlers_scrollUp=()=>listRef.scrollTo(listRef.state.scrollOffset-listRef.props.height),handlers_loadMore=()=>!isLoading&&onLoadMore?.();return el?.addEventListener("scrollFirst",handlers_scrollFirst),el?.addEventListener("scrollLast",handlers_scrollLast),el?.addEventListener("scrollDown",handlers_scrollDown),el?.addEventListener("scrollUp",handlers_scrollUp),el?.addEventListener("loadMore",handlers_loadMore),()=>{el?.removeEventListener("scrollFirst",handlers_scrollFirst),el?.removeEventListener("scrollLast",handlers_scrollLast),el?.removeEventListener("scrollDown",handlers_scrollDown),el?.removeEventListener("scrollUp",handlers_scrollUp),el?.removeEventListener("loadMore",handlers_loadMore)}}),[listRef,count,isLoading,onLoadMore]);const updateCache=(0,react.useCallback)(((index,height)=>{height!==(cache.get(index)??minHeight)&&(cache.set(index,height),listRef.resetAfterIndex(index))}),[listRef]),outerElement=(0,react.useMemo)((()=>Wrapper(maxWidth,hideScroller)),[maxWidth,hideScroller]);return(0,jsx_runtime.jsx)("div",{...rest,ref:containerRef,style:{"--maxw":maxWidth},className:`ax-virtual__container ax-timeline ${className??""}`,children:(0,jsx_runtime.jsx)(react_virtualized_auto_sizer_esm.ZP,{children:({width,height})=>(0,jsx_runtime.jsx)(index_esm.S_,{ref:setList,useIsScrolling:!0,width,height,itemCount:count,itemData:itemList,direction:isRtl?"rtl":"ltr",outerElementType:outerElement,itemSize:index=>cache.get(index)??Math.max(minHeight,...Array.from(cache.values())),onItemsRendered:e=>onScroll?.(e.visibleStartIndex),children:props=>children({...props,updateHeight:updateCache,data:props.data.length>props.index?props.data[props.index]:null,lastChild:props.index===count-1})})})})};AxTimelineComponent.displayName="AxTimeline";const AxTimeline=(0,react.memo)(AxTimelineComponent);AxTimeline.Item=Timeline_Item,AxTimeline.Item.displayName="AxTimeline.Item"}}]);