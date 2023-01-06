"use strict";(self.webpackChunkaxux=self.webpackChunkaxux||[]).push([[2209],{"./node_modules/@arcgis/core/arcade/functions/featuresetstring.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{registerFunctions:()=>A});var _Dictionary_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@arcgis/core/arcade/Dictionary.js"),_executionError_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@arcgis/core/arcade/executionError.js"),_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@arcgis/core/chunks/languageUtils.js"),_featureset_support_shared_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@arcgis/core/arcade/featureset/support/shared.js");function h(e){return e&&e.domain?"coded-value"===e.domain.type||"codedValue"===e.domain.type?_Dictionary_js__WEBPACK_IMPORTED_MODULE_0__.Z.convertObjectToArcadeDictionary({type:"codedValue",name:e.domain.name,dataType:_featureset_support_shared_js__WEBPACK_IMPORTED_MODULE_3__.yE[e.field.type],codedValues:e.domain.codedValues.map((n=>({name:n.name,code:n.code})))}):_Dictionary_js__WEBPACK_IMPORTED_MODULE_0__.Z.convertObjectToArcadeDictionary({type:"range",name:e.domain.name,dataType:_featureset_support_shared_js__WEBPACK_IMPORTED_MODULE_3__.yE[e.field.type],min:e.domain.min,max:e.domain.max}):null}function A(T){"async"===T.mode&&(T.functions.domain=function(n,u){return T.standardFunctionAsync(n,u,(async(m,f,l)=>{if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.y)(l,2,3,n,u),(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.w)(l[0]))return h((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.P)(l[0],(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.j)(l[1]),void 0===l[2]?void 0:(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.g)(l[2])));if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.T)(l[0]))return await l[0]._ensureLoaded(),h((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.Y)((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.j)(l[1]),l[0],null,void 0===l[2]?void 0:(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.g)(l[2])));throw new _executionError_js__WEBPACK_IMPORTED_MODULE_1__.aV(n,_executionError_js__WEBPACK_IMPORTED_MODULE_1__.rH.InvalidParameter,u)}))},T.functions.subtypes=function(o,i){return T.standardFunctionAsync(o,i,(async(c,d,m)=>{if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.y)(m,1,1,o,i),(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.w)(m[0])){const e=(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.O)(m[0]);return e?_Dictionary_js__WEBPACK_IMPORTED_MODULE_0__.Z.convertObjectToArcadeDictionary(e):null}if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.T)(m[0])){await m[0]._ensureLoaded();const e=m[0].subtypes();return e?_Dictionary_js__WEBPACK_IMPORTED_MODULE_0__.Z.convertObjectToArcadeDictionary(e):null}throw new _executionError_js__WEBPACK_IMPORTED_MODULE_1__.aV(o,_executionError_js__WEBPACK_IMPORTED_MODULE_1__.rH.InvalidParameter,i)}))},T.functions.domainname=function(n,o){return T.standardFunctionAsync(n,o,(async(u,l,y)=>{if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.y)(y,2,4,n,o),(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.w)(y[0]))return(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.Q)(y[0],(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.j)(y[1]),y[2],void 0===y[3]?void 0:(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.g)(y[3]));if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.T)(y[0])){await y[0]._ensureLoaded();const n=(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.Y)((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.j)(y[1]),y[0],null,void 0===y[3]?void 0:(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.g)(y[3]));return(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.Z)(n,y[2])}throw new _executionError_js__WEBPACK_IMPORTED_MODULE_1__.aV(n,_executionError_js__WEBPACK_IMPORTED_MODULE_1__.rH.InvalidParameter,o)}))},T.signatures.push({name:"domainname",min:2,max:4}),T.functions.domaincode=function(n,o){return T.standardFunctionAsync(n,o,(async(u,m,f)=>{if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.y)(f,2,4,n,o),(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.w)(f[0]))return(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.S)(f[0],(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.j)(f[1]),f[2],void 0===f[3]?void 0:(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.g)(f[3]));if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.T)(f[0])){await f[0]._ensureLoaded();const n=(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.Y)((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.j)(f[1]),f[0],null,void 0===f[3]?void 0:(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.g)(f[3]));return(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__._)(n,f[2])}throw new _executionError_js__WEBPACK_IMPORTED_MODULE_1__.aV(n,_executionError_js__WEBPACK_IMPORTED_MODULE_1__.rH.InvalidParameter,o)}))},T.signatures.push({name:"domaincode",min:2,max:4})),T.functions.text=function(n,e){return T.standardFunctionAsync(n,e,((a,r,o)=>{if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.y)(o,1,2,n,e),!(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.T)(o[0]))return(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.t)(o[0],o[1]);{const n=(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.A)(o[1],"");if(""===n)return o[0].castToText();if("schema"===n.toLowerCase())return o[0].convertToText("schema",a.abortSignal);if("featureset"===n.toLowerCase())return o[0].convertToText("featureset",a.abortSignal)}}))},T.functions.gdbversion=function(n,o){return T.standardFunctionAsync(n,o,(async(i,c,d)=>{if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.y)(d,1,1,n,o),(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.w)(d[0]))return d[0].gdbVersion();if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.T)(d[0]))return(await d[0].load()).gdbVersion;throw new _executionError_js__WEBPACK_IMPORTED_MODULE_1__.aV(n,_executionError_js__WEBPACK_IMPORTED_MODULE_1__.rH.InvalidParameter,o)}))},T.functions.schema=function(o,i){return T.standardFunctionAsync(o,i,(async(c,d,u)=>{if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.y)(u,1,1,o,i),(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.T)(u[0]))return await u[0].load(),_Dictionary_js__WEBPACK_IMPORTED_MODULE_0__.Z.convertObjectToArcadeDictionary(u[0].schema());if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.w)(u[0])){const e=(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.N)(u[0]);return e?_Dictionary_js__WEBPACK_IMPORTED_MODULE_0__.Z.convertObjectToArcadeDictionary(e):null}throw new _executionError_js__WEBPACK_IMPORTED_MODULE_1__.aV(o,_executionError_js__WEBPACK_IMPORTED_MODULE_1__.rH.InvalidParameter,i)}))}}}}]);