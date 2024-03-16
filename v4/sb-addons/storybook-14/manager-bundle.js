try{
(()=>{var _=__STORYBOOK_ADDONS__,{addons:o,types:O,mockChannel:p}=__STORYBOOK_ADDONS__;o.setConfig({sidebar:{showRoots:!0}});var c=console.error;window.console.error=(...e)=>{/.*ReactDOM.render is no longer supported in React 18.*/.test(e[0])||/.*\:first-child.*/.test(e[0])||c.call(console,...e)};o.getChannel().on("PRIMARY_CHANGED",e=>{document.documentElement.dataset.primaryScheme=e});o.getChannel().on("ACCENT_CHANGED",e=>{document.documentElement.dataset.accentScheme=e});})();
}catch(e){ console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e); }
