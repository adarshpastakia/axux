"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[3944],{"./node_modules/@arcgis/core/chunks/Button.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>o,R:()=>n});var _Theme_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/chunks/Theme.js");class n extends _Theme_js__WEBPACK_IMPORTED_MODULE_0__.a5{_beforeChanged(){super._beforeChanged(),(this.isDirty("cornerRadiusTL")||this.isDirty("cornerRadiusTR")||this.isDirty("cornerRadiusBR")||this.isDirty("cornerRadiusBL"))&&(this._clear=!0)}_draw(){let e=this.width(),a=this.height(),r=e,n=a,o=r/Math.abs(e),h=n/Math.abs(a);if((0,_Theme_js__WEBPACK_IMPORTED_MODULE_0__.g)(r)&&(0,_Theme_js__WEBPACK_IMPORTED_MODULE_0__.g)(n)){let e=Math.min(r,n)/2,s=(0,_Theme_js__WEBPACK_IMPORTED_MODULE_0__.ar)(this.get("cornerRadiusTL",8),e),a=(0,_Theme_js__WEBPACK_IMPORTED_MODULE_0__.ar)(this.get("cornerRadiusTR",8),e),c=(0,_Theme_js__WEBPACK_IMPORTED_MODULE_0__.ar)(this.get("cornerRadiusBR",8),e),l=(0,_Theme_js__WEBPACK_IMPORTED_MODULE_0__.ar)(this.get("cornerRadiusBL",8),e),d=Math.min(Math.abs(r/2),Math.abs(n/2));s=(0,_Theme_js__WEBPACK_IMPORTED_MODULE_0__.aj)(s,0,d),a=(0,_Theme_js__WEBPACK_IMPORTED_MODULE_0__.aj)(a,0,d),c=(0,_Theme_js__WEBPACK_IMPORTED_MODULE_0__.aj)(c,0,d),l=(0,_Theme_js__WEBPACK_IMPORTED_MODULE_0__.aj)(l,0,d);const b=this._display;b.moveTo(s*o,0),b.lineTo(r-a*o,0),a>0&&b.arcTo(r,0,r,a*h,a),b.lineTo(r,n-c*h),c>0&&b.arcTo(r,n,r-c*o,n,c),b.lineTo(l*o,n),l>0&&b.arcTo(0,n,0,n-l*h,l),b.lineTo(0,s*h),s>0&&b.arcTo(0,0,s*o,0,s),b.closePath()}}}Object.defineProperty(n,"className",{enumerable:!0,configurable:!0,writable:!0,value:"RoundedRectangle"}),Object.defineProperty(n,"classNames",{enumerable:!0,configurable:!0,writable:!0,value:_Theme_js__WEBPACK_IMPORTED_MODULE_0__.a5.classNames.concat([n.className])});class o extends _Theme_js__WEBPACK_IMPORTED_MODULE_0__.a3{_afterNew(){this._settings.themeTags=(0,_Theme_js__WEBPACK_IMPORTED_MODULE_0__.ak)(this._settings.themeTags,["button"]),super._afterNew(),this._settings.background||this.set("background",n.new(this._root,{themeTags:(0,_Theme_js__WEBPACK_IMPORTED_MODULE_0__.ak)(this._settings.themeTags,["background"])}))}_prepareChildren(){if(super._prepareChildren(),this.isDirty("icon")){const e=this._prevSettings.icon,s=this.get("icon");s!==e&&(this._disposeProperty("icon"),e&&e.dispose(),s&&this.children.push(s),this._prevSettings.icon=s)}if(this.isDirty("label")){const e=this._prevSettings.label,s=this.get("label");s!==e&&(this._disposeProperty("label"),e&&e.dispose(),s&&this.children.push(s),this._prevSettings.label=s)}}}Object.defineProperty(o,"className",{enumerable:!0,configurable:!0,writable:!0,value:"Button"}),Object.defineProperty(o,"classNames",{enumerable:!0,configurable:!0,writable:!0,value:_Theme_js__WEBPACK_IMPORTED_MODULE_0__.a3.classNames.concat([o.className])})},"./node_modules/@arcgis/core/chunks/ColorSet.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{C:()=>s});var _Theme_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/chunks/Theme.js");class s extends _Theme_js__WEBPACK_IMPORTED_MODULE_0__.E{_afterNew(){super._afterNewApplyThemes(),this._dirty.colors=!1}_beforeChanged(){this.isDirty("colors")&&this.reset()}generateColors(){this.setPrivate("currentPass",this.getPrivate("currentPass",0)+1);const e=this.getPrivate("currentPass"),s=this.get("colors",[this.get("baseColor",_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(16711680))]);this.getPrivate("numColors")||this.setPrivate("numColors",s.length);const r=this.getPrivate("numColors"),i=this.get("passOptions"),o=this.get("reuse");for(let n=0;n<r;n++)if(o)s.push(s[n]);else{const r=s[n].toHSL();let a=r.h+(i.hue||0)*e;for(;a>1;)a-=1;let o=r.s+(i.saturation||0)*e;o>1&&(o=1),o<0&&(o=0);let l=r.l+(i.lightness||0)*e;for(;l>1;)l-=1;s.push(_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHSL(a,o,l))}}getIndex(e){const s=this.get("colors",[]),r=this.get("saturation");return e>=s.length?(this.generateColors(),this.getIndex(e)):null!=r?_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.saturate(s[e],r):s[e]}next(){let e=this.getPrivate("currentStep",this.get("startIndex",0));return this.setPrivate("currentStep",e+this.get("step",1)),this.getIndex(e)}reset(){this.setPrivate("currentStep",this.get("startIndex",0)),this.setPrivate("currentPass",0)}}Object.defineProperty(s,"className",{enumerable:!0,configurable:!0,writable:!0,value:"ColorSet"}),Object.defineProperty(s,"classNames",{enumerable:!0,configurable:!0,writable:!0,value:_Theme_js__WEBPACK_IMPORTED_MODULE_0__.E.classNames.concat([s.className])})},"./node_modules/@arcgis/core/widgets/Feature/FeatureMedia/chartCommon.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{AnimatedThemeAm5:()=>p,ColorSetAm5:()=>_chunks_ColorSet_js__WEBPACK_IMPORTED_MODULE_3__.C,DarkThemeAm5:()=>c,ResponsiveThemeAm5:()=>v,ScrollbarAm5:()=>m,ThemeAm5:()=>_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.am,TooltipAm5:()=>_chunks_Tooltip_js__WEBPACK_IMPORTED_MODULE_2__.T,colorAm5:()=>_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.a6});var _chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/chunks/Theme.js"),_chunks_Button_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/chunks/Button.js"),_chunks_Tooltip_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/chunks/Tooltip.js"),_chunks_ColorSet_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/chunks/ColorSet.js");class m extends _chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.a3{constructor(){super(...arguments),Object.defineProperty(this,"thumb",{enumerable:!0,configurable:!0,writable:!0,value:this._makeThumb()}),Object.defineProperty(this,"startGrip",{enumerable:!0,configurable:!0,writable:!0,value:this._makeButton()}),Object.defineProperty(this,"endGrip",{enumerable:!0,configurable:!0,writable:!0,value:this._makeButton()}),Object.defineProperty(this,"_thumbBusy",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"_startDown",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"_endDown",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"_thumbDown",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"_gripDown",{enumerable:!0,configurable:!0,writable:!0,value:void 0})}_addOrientationClass(){this._settings.themeTags=(0,_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.ak)(this._settings.themeTags,["scrollbar",this._settings.orientation]),this._settings.background||(this._settings.background=_chunks_Button_js__WEBPACK_IMPORTED_MODULE_1__.R.new(this._root,{themeTags:(0,_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.ak)(this._settings.themeTags,["main","background"])}))}_makeButton(){return this.children.push(_chunks_Button_js__WEBPACK_IMPORTED_MODULE_1__.B.new(this._root,{themeTags:["resize","button",this.get("orientation")],icon:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.a7.new(this._root,{themeTags:["icon"]})}))}_makeThumb(){return this.children.push(_chunks_Button_js__WEBPACK_IMPORTED_MODULE_1__.R.new(this._root,{themeTags:["thumb",this.get("orientation")]}))}_handleAnimation(t){t&&this._disposers.push(t.events.on("stopped",(()=>{this.setPrivateRaw("isBusy",!1),this._thumbBusy=!1})))}_afterNew(){this._addOrientationClass(),super._afterNew();const t=this.startGrip,e=this.endGrip,i=this.thumb,a=this.get("background");a&&this._disposers.push(a.events.on("click",(t=>{this.setPrivateRaw("isBusy",!0);const e=this._display.toLocal(t.point),s=this.width(),a=this.height(),n=this.get("orientation");let r,h,o;r="vertical"==n?(e.y-i.height()/2)/a:(e.x-i.width()/2)/s,"vertical"==n?(h=r*a,o="y"):(h=r*s,o="x");const l=this.get("animationDuration",0);l>0?(this._thumbBusy=!0,this._handleAnimation(this.thumb.animate({key:o,to:h,duration:l,easing:this.get("animationEasing")}))):(this.thumb.set(o,h),this._root.events.once("frameended",(()=>{this.setPrivateRaw("isBusy",!1)})))}))),this._disposers.push(i.events.on("dblclick",(t=>{if(!(0,_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.aq)(t.originalEvent,this))return;const e=this.get("animationDuration",0),i=this.get("animationEasing");this.animate({key:"start",to:0,duration:e,easing:i}),this.animate({key:"end",to:1,duration:e,easing:i})}))),this._disposers.push(t.events.on("pointerdown",(()=>{this.setPrivateRaw("isBusy",!0),this._startDown=!0,this._gripDown="start"}))),this._disposers.push(e.events.on("pointerdown",(()=>{this.setPrivateRaw("isBusy",!0),this._endDown=!0,this._gripDown="end"}))),this._disposers.push(i.events.on("pointerdown",(()=>{this.setPrivateRaw("isBusy",!0),this._thumbDown=!0,this._gripDown=void 0}))),this._disposers.push(t.events.on("globalpointerup",(()=>{this._startDown&&this.setPrivateRaw("isBusy",!1),this._startDown=!1}))),this._disposers.push(e.events.on("globalpointerup",(()=>{this._endDown&&this.setPrivateRaw("isBusy",!1),this._endDown=!1}))),this._disposers.push(i.events.on("globalpointerup",(()=>{this._thumbDown&&this.setPrivateRaw("isBusy",!1),this._thumbDown=!1}))),this._disposers.push(t.on("x",(()=>{this._updateThumb()}))),this._disposers.push(e.on("x",(()=>{this._updateThumb()}))),this._disposers.push(t.on("y",(()=>{this._updateThumb()}))),this._disposers.push(e.on("y",(()=>{this._updateThumb()}))),this._disposers.push(i.events.on("positionchanged",(()=>{this._updateGripsByThumb()}))),"vertical"==this.get("orientation")?(t.set("x",0),e.set("x",0),this._disposers.push(i.adapters.add("y",(t=>Math.max(Math.min(Number(t),this.height()-i.height()),0)))),this._disposers.push(i.adapters.add("x",(t=>this.width()/2))),this._disposers.push(t.adapters.add("x",(t=>this.width()/2))),this._disposers.push(e.adapters.add("x",(t=>this.width()/2))),this._disposers.push(t.adapters.add("y",(t=>Math.max(Math.min(Number(t),this.height()),0)))),this._disposers.push(e.adapters.add("y",(t=>Math.max(Math.min(Number(t),this.height()),0))))):(t.set("y",0),e.set("y",0),this._disposers.push(i.adapters.add("x",(t=>Math.max(Math.min(Number(t),this.width()-i.width()),0)))),this._disposers.push(i.adapters.add("y",(t=>this.height()/2))),this._disposers.push(t.adapters.add("y",(t=>this.height()/2))),this._disposers.push(e.adapters.add("y",(t=>this.height()/2))),this._disposers.push(t.adapters.add("x",(t=>Math.max(Math.min(Number(t),this.width()),0)))),this._disposers.push(e.adapters.add("x",(t=>Math.max(Math.min(Number(t),this.width()),0)))))}_updateChildren(){super._updateChildren(),(this.isDirty("end")||this.isDirty("start")||this._sizeDirty)&&this.updateGrips()}_changed(){if(super._changed(),this.isDirty("start")||this.isDirty("end")){const t="rangechanged";this.events.isEnabled(t)&&this.events.dispatch(t,{type:t,target:this,start:this.get("start",0),end:this.get("end",1),grip:this._gripDown})}}updateGrips(){const t=this.startGrip,e=this.endGrip,i=this.get("orientation"),s=this.height(),a=this.width();"vertical"==i?(t.set("y",s*this.get("start",0)),e.set("y",s*this.get("end",1))):(t.set("x",a*this.get("start",0)),e.set("x",a*this.get("end",1)));const n=this.getPrivate("positionTextFunction"),r=Math.round(100*this.get("start",0)),h=Math.round(100*this.get("end",0));let o,l;n?(o=n.call(this,this.get("start",0)),l=n.call(this,this.get("end",0))):(o=r+"%",l=h+"%"),t.set("ariaLabel",this._t("From %1",void 0,o)),t.set("ariaValueNow",""+r),t.set("ariaValueText",r+"%"),t.set("ariaValueMin","0"),t.set("ariaValueMax","100"),e.set("ariaLabel",this._t("To %1",void 0,l)),e.set("ariaValueNow",""+h),e.set("ariaValueText",h+"%"),e.set("ariaValueMin","0"),e.set("ariaValueMax","100")}_updateThumb(){const t=this.thumb,e=this.startGrip,i=this.endGrip,s=this.height(),n=this.width();let r=e.x(),h=i.x(),o=e.y(),l=i.y(),d=0,u=1;"vertical"==this.get("orientation")?(0,_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.g)(o)&&(0,_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.g)(l)&&(this._thumbBusy||t.isDragging()||(t.set("height",l-o),t.set("y",o)),d=o/s,u=l/s):(0,_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.g)(r)&&(0,_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.g)(h)&&(this._thumbBusy||t.isDragging()||(t.set("width",h-r),t.set("x",r)),d=r/n,u=h/n),!this.getPrivate("isBusy")||this.get("start")==d&&this.get("end")==u||(this.set("start",d),this.set("end",u));const g=this.getPrivate("positionTextFunction"),m=Math.round(100*this.get("start",0)),p=Math.round(100*this.get("end",0));let c,b;g?(c=g.call(this,this.get("start",0)),b=g.call(this,this.get("end",0))):(c=m+"%",b=p+"%"),t.set("ariaLabel",this._t("From %1 to %2",void 0,c,b)),t.set("ariaValueNow",""+m),t.set("ariaValueText",m+"%")}_updateGripsByThumb(){const t=this.thumb,e=this.startGrip,i=this.endGrip;if("vertical"==this.get("orientation")){const s=t.height();e.set("y",t.y()),i.set("y",t.y()+s)}else{const s=t.width();e.set("x",t.x()),i.set("x",t.x()+s)}}}Object.defineProperty(m,"className",{enumerable:!0,configurable:!0,writable:!0,value:"Scrollbar"}),Object.defineProperty(m,"classNames",{enumerable:!0,configurable:!0,writable:!0,value:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.a3.classNames.concat([m.className])});const p=class extends _chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.am{setupDefaultRules(){super.setupDefaultRules(),this.rule("Component").setAll({interpolationDuration:600}),this.rule("Hierarchy").set("animationDuration",600),this.rule("Scrollbar").set("animationDuration",600),this.rule("Tooltip").set("animationDuration",300),this.rule("MapChart").set("animationDuration",1e3),this.rule("MapChart").set("wheelDuration",300),this.rule("Entity").setAll({stateAnimationDuration:600}),this.rule("Sprite").states.create("default",{stateAnimationDuration:600}),this.rule("Tooltip",["axis"]).setAll({animationDuration:200}),this.rule("WordCloud").set("animationDuration",500)}},c=class extends _chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.am{setupDefaultRules(){super.setupDefaultRules(),this.rule("InterfaceColors").setAll({stroke:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(0),fill:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(2829099),primaryButton:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.lighten(_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(6788316),-.2),primaryButtonHover:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.lighten(_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(6779356),-.2),primaryButtonDown:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.lighten(_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(6872181),-.2),primaryButtonActive:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.lighten(_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(6872182),-.2),primaryButtonText:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(16777215),primaryButtonStroke:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.lighten(_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(6788316),-.2),secondaryButton:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(3881787),secondaryButtonHover:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.lighten(_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(3881787),.1),secondaryButtonDown:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.lighten(_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(3881787),.15),secondaryButtonActive:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.lighten(_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(3881787),.2),secondaryButtonText:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(12303291),secondaryButtonStroke:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.lighten(_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(3881787),-.2),grid:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(12303291),background:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(0),alternativeBackground:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(16777215),text:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(16777215),alternativeText:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(0),disabled:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(11382189),positive:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(5288704),negative:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.C.fromHex(11730944)})}};let b=class extends _chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.am{constructor(){super(...arguments),Object.defineProperty(this,"responsiveRules",{enumerable:!0,configurable:!0,writable:!0,value:[]})}static widthXXS(t,e){return t<=b.XXS}static widthXS(t,e){return t<=b.XS}static widthS(t,e){return t<=b.S}static widthM(t,e){return t<=b.M}static widthL(t,e){return t<=b.L}static widthXL(t,e){return t<=b.XL}static widthXXL(t,e){return t<=b.XXL}static heightXXS(t,e){return e<=b.XXS}static heightXS(t,e){return e<=b.XS}static heightS(t,e){return e<=b.S}static heightM(t,e){return e<=b.M}static heightL(t,e){return e<=b.L}static heightXL(t,e){return e<=b.XL}static heightXXL(t,e){return e<=b.XXL}static isXXS(t,e){return t<=b.XXS&&e<=b.XXS}static isXS(t,e){return t<=b.XS&&e<=b.XS}static isS(t,e){return t<=b.S&&e<=b.S}static isM(t,e){return t<=b.M&&e<=b.M}static isL(t,e){return t<=b.L&&e<=b.L}static isXL(t,e){return t<=b.XL&&e<=b.XL}static isXXL(t,e){return t<=b.XXL&&e<=b.XXL}static maybeXXS(t,e){return t<=b.XXS||e<=b.XXS}static maybeXS(t,e){return t<=b.XS||e<=b.XS}static maybeS(t,e){return t<=b.S||e<=b.S}static maybeM(t,e){return t<=b.M||e<=b.M}static maybeL(t,e){return t<=b.L||e<=b.L}static maybeXL(t,e){return t<=b.XL||e<=b.XL}static maybeXXL(t,e){return t<=b.XXL||e<=b.XXL}static newEmpty(t){return new this(t,!0)}addRule(t){return t.name&&!t.template&&(t.template=this.rule(t.name,t.tags)),t._dp=new _chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.M([this._root._rootContainer.onPrivate("width",(e=>{this._isUsed()&&this._applyRule(t)})),this._root._rootContainer.onPrivate("height",(e=>{this._isUsed()&&this._applyRule(t)}))]),this.responsiveRules.push(t),this._applyRule(t),t}removeRule(t){(0,_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.ad)(this.responsiveRules,t),t._dp&&t._dp.dispose()}_isUsed(){return-1!==this._root._rootContainer.get("themes").indexOf(this)}_applyRule(t){const e=this._root._rootContainer.getPrivate("width"),i=this._root._rootContainer.getPrivate("height"),s=t.relevant.call(t,e,i),a=t.applied;s?a||(t.applied=!0,t.template&&t.settings&&t.template.setAll(t.settings),t.applying&&t.applying.call(t)):a&&(t.applied=!1,t.template&&t.template.removeAll(),t.removing&&t.removing.call(t))}setupDefaultRules(){super.setupDefaultRules();const t=t=>this.addRule(t);t({name:"Chart",relevant:b.widthXXS,settings:{paddingLeft:0,paddingRight:0}}),t({name:"Chart",relevant:b.heightXXS,settings:{paddingTop:0,paddingBottom:0}}),t({name:"Bullet",relevant:b.isXS,settings:{forceHidden:!0}}),t({name:"Legend",relevant:b.isXS,settings:{forceHidden:!0}}),t({name:"HeatLegend",tags:["vertical"],relevant:b.widthXS,settings:{forceHidden:!0}}),t({name:"HeatLegend",tags:["horizontal"],relevant:b.heightXS,settings:{forceHidden:!0}}),t({name:"Label",tags:["heatlegend","start"],relevant:b.maybeXS,settings:{forceHidden:!0}}),t({name:"Label",tags:["heatlegend","end"],relevant:b.maybeXS,settings:{forceHidden:!0}}),t({name:"Button",tags:["resize"],relevant:b.maybeXS,settings:{forceHidden:!0}}),t({name:"AxisRendererX",relevant:b.heightXS,settings:{inside:!0}}),t({name:"AxisRendererY",relevant:b.widthXS,settings:{inside:!0}}),t({name:"AxisRendererXLabel",relevant:b.heightXS,settings:{minPosition:.1,maxPosition:.9}}),t({name:"AxisLabel",tags:["y"],relevant:b.widthXS,settings:{centerY:_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.a4,maxPosition:.9}}),t({name:"AxisLabel",tags:["x"],relevant:b.heightXXS,settings:{forceHidden:!0}}),t({name:"AxisLabel",tags:["y"],relevant:b.widthXXS,settings:{forceHidden:!0}}),t({name:"AxisTick",tags:["x"],relevant:b.heightXS,settings:{inside:!0,minPosition:.1,maxPosition:.9}}),t({name:"AxisTick",tags:["y"],relevant:b.widthXXS,settings:{inside:!0,minPosition:.1,maxPosition:.9}}),t({name:"Grid",relevant:b.maybeXXS,settings:{forceHidden:!0}}),t({name:"RadialLabel",tags:["radial"],relevant:b.maybeXS,settings:{forceHidden:!0}}),t({name:"RadialLabel",tags:["circular"],relevant:b.maybeS,settings:{inside:!0}}),t({name:"AxisTick",relevant:b.maybeS,settings:{inside:!0}}),t({name:"RadialLabel",tags:["circular"],relevant:b.maybeXS,settings:{forceHidden:!0}}),t({name:"AxisTick",tags:["circular"],relevant:b.maybeXS,settings:{inside:!0}}),t({name:"PieChart",relevant:b.maybeXS,settings:{radius:(0,_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.R)(99)}}),t({name:"PieChart",relevant:b.widthM,settings:{radius:(0,_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.R)(99)}}),t({name:"RadialLabel",tags:["pie"],relevant:b.maybeXS,settings:{forceHidden:!0}}),t({name:"RadialLabel",tags:["pie"],relevant:b.widthM,settings:{forceHidden:!0}}),t({name:"Tick",tags:["pie"],relevant:b.maybeXS,settings:{forceHidden:!0}}),t({name:"Tick",tags:["pie"],relevant:b.widthM,settings:{forceHidden:!0}}),t({name:"FunnelSeries",relevant:b.widthM,settings:{alignLabels:!1}}),t({name:"Label",tags:["funnel","vertical"],relevant:b.widthL,settings:{forceHidden:!0}}),t({name:"Tick",tags:["funnel","vertical"],relevant:b.widthL,settings:{forceHidden:!0}}),t({name:"Label",tags:["funnel","horizontal"],relevant:b.heightS,settings:{forceHidden:!0}}),t({name:"Tick",tags:["funnel","horizontal"],relevant:b.heightS,settings:{forceHidden:!0}}),t({name:"PyramidSeries",relevant:b.widthM,settings:{alignLabels:!1}}),t({name:"Label",tags:["pyramid","vertical"],relevant:b.widthL,settings:{forceHidden:!0}}),t({name:"Tick",tags:["pyramid","vertical"],relevant:b.widthL,settings:{forceHidden:!0}}),t({name:"Label",tags:["pyramid","horizontal"],relevant:b.heightS,settings:{forceHidden:!0}}),t({name:"Tick",tags:["pyramid","horizontal"],relevant:b.heightS,settings:{forceHidden:!0}}),t({name:"PictorialStackedSeries",relevant:b.widthM,settings:{alignLabels:!1}}),t({name:"Label",tags:["pictorial","vertical"],relevant:b.widthL,settings:{forceHidden:!0}}),t({name:"Tick",tags:["pictorial","vertical"],relevant:b.widthL,settings:{forceHidden:!0}}),t({name:"Label",tags:["pictorial","horizontal"],relevant:b.heightS,settings:{forceHidden:!0}}),t({name:"Tick",tags:["pictorial","horizontal"],relevant:b.heightS,settings:{forceHidden:!0}}),t({name:"Label",tags:["flow","horizontal"],relevant:b.widthS,settings:{forceHidden:!0}}),t({name:"Label",tags:["flow","vertical"],relevant:b.heightS,settings:{forceHidden:!0}}),t({name:"Chord",relevant:b.maybeXS,settings:{radius:(0,_chunks_Theme_js__WEBPACK_IMPORTED_MODULE_0__.R)(99)}}),t({name:"Label",tags:["hierarchy","node"],relevant:b.maybeXS,settings:{forceHidden:!0}})}};Object.defineProperty(b,"XXS",{enumerable:!0,configurable:!0,writable:!0,value:100}),Object.defineProperty(b,"XS",{enumerable:!0,configurable:!0,writable:!0,value:200}),Object.defineProperty(b,"S",{enumerable:!0,configurable:!0,writable:!0,value:300}),Object.defineProperty(b,"M",{enumerable:!0,configurable:!0,writable:!0,value:400}),Object.defineProperty(b,"L",{enumerable:!0,configurable:!0,writable:!0,value:600}),Object.defineProperty(b,"XL",{enumerable:!0,configurable:!0,writable:!0,value:800}),Object.defineProperty(b,"XXL",{enumerable:!0,configurable:!0,writable:!0,value:1e3});const v=b}}]);