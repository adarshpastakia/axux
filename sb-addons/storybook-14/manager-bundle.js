try{
(()=>{var a=__STORYBOOK_ADDONS__,{addons:n,types:p,mockChannel:f}=__STORYBOOK_ADDONS__;n.setConfig({sidebar:{showRoots:!0}});var s=console.error;window.console.error=(...o)=>{/.*ReactDOM.render is no longer supported in React 18.*/.test(o[0])||/.*\:first-child.*/.test(o[0])||s.call(console,...o)};})();
}catch(e){ console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e); }
