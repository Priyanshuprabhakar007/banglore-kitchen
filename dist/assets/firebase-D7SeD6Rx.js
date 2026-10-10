var e={};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const t=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},n={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const t=e[i],s=i+1<e.length,o=s?e[i+1]:0,a=i+2<e.length,c=a?e[i+2]:0,u=t>>2,l=(3&t)<<4|o>>4;let h=(15&o)<<2|c>>6,d=63&c;a||(d=64,s||(h=64)),r.push(n[u],n[l],n[h],n[d])}return r.join("")},encodeString(e,n){return this.HAS_NATIVE_SUPPORT&&!n?btoa(e):this.encodeByteArray(t(e),n)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){const s=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(s>>10)),t[r++]=String.fromCharCode(56320+(1023&s))}else{const s=e[n++],o=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&o)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<e.length;){const t=n[e.charAt(s++)],o=s<e.length?n[e.charAt(s)]:0;++s;const a=s<e.length?n[e.charAt(s)]:64;++s;const c=s<e.length?n[e.charAt(s)]:64;if(++s,null==t||null==o||null==a||null==c)throw new r;const u=t<<2|o>>4;if(i.push(u),64!==a){const e=o<<4&240|a>>2;if(i.push(e),64!==c){const e=a<<6&192|c;i.push(e)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class r extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const i=function(e){return function(e){const r=t(e);return n.encodeByteArray(r,!0)}(e).replace(/\./g,"")},s=function(e){try{return n.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function o(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a=()=>{try{return o().__FIREBASE_DEFAULTS__||(()=>{if("undefined"==typeof process)return;const t=e.__FIREBASE_DEFAULTS__;return t?JSON.parse(t):void 0})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const t=e&&s(e[1]);return t&&JSON.parse(t)})()}catch(t){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`)}},c=e=>{var t,n;return null==(n=null==(t=a())?void 0:t.emulatorHosts)?void 0:n[e]},u=e=>{const t=c(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]},l=()=>{var e;return null==(e=a())?void 0:e.config},h=e=>{var t;return null==(t=a())?void 0:t[`_${e}`]};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class d{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",r=e.iat||0,s=e.sub||e.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...e};return[i(JSON.stringify({alg:"none",type:"JWT"})),i(JSON.stringify(o)),""].join(".")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function p(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function m(){var e;const t=null==(e=a())?void 0:e.forceEnvironment;if("node"===t)return!0;if("browser"===t)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(n){return!1}}function g(){return!m()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function y(){return!m()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function v(){try{return"object"==typeof indexedDB}catch(e){return!1}}class w extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,w.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,_.prototype.create)}}class _{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],s=i?function(e,t){return e.replace(I,(e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`})}(i,n):"Error",o=`${this.serviceName}: ${s} (${r}).`;return new w(r,o,n)}}const I=/\{\$([^}]+)}/g;function T(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const n=e[i],s=t[i];if(b(n)&&b(s)){if(!T(n,s))return!1}else if(n!==s)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function b(e){return null!==e&&"object"==typeof e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function E(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function S(e){const t={};return e.replace(/^\?/,"").split("&").forEach(e=>{if(e){const[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}}),t}function A(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}class C{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");r=function(e,t){if("object"!=typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===r.next&&(r.next=k),void 0===r.error&&(r.error=k),void 0===r.complete&&(r.complete=k);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}}),this.observers.push(r),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(n){"undefined"!=typeof console&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function k(){}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N(e){return e&&e._delegate?e._delegate:e}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function R(e){return(await fetch(e,{credentials:"include"})).ok}class O{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new d;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(n){}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),n=(null==e?void 0:e.optional)??!1;if(!this.isInitialized(t)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(n)return null;throw r}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e))try{this.getOrInitializeService({instanceIdentifier:P})}catch(t){}for(const[e,n]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:r});n.resolve(e)}catch(t){}}}}clearInstance(e=P){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=P){return this.instances.has(e)}getOptions(e=P){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,s]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(i)&&s.resolve(r)}return r}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(n)??new Set;r.add(e),this.onInitCallbacks.set(n,r);const i=this.instances.get(n);return i&&e(i,n),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const r of n)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(r=e,r===P?void 0:r),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}var r;return n||null}normalizeInstanceIdentifier(e=P){return this.component?this.component.multipleInstances?e:P:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class L{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new x(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var M,F;(F=M||(M={}))[F.DEBUG=0]="DEBUG",F[F.VERBOSE=1]="VERBOSE",F[F.INFO=2]="INFO",F[F.WARN=3]="WARN",F[F.ERROR=4]="ERROR",F[F.SILENT=5]="SILENT";const V={debug:M.DEBUG,verbose:M.VERBOSE,info:M.INFO,warn:M.WARN,error:M.ERROR,silent:M.SILENT},U=M.INFO,q={[M.DEBUG]:"log",[M.VERBOSE]:"log",[M.INFO]:"info",[M.WARN]:"warn",[M.ERROR]:"error"},B=(e,t,...n)=>{if(t<e.logLevel)return;const r=(new Date).toISOString(),i=q[t];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[i](`[${r}]  ${e.name}:`,...n)};class j{constructor(e){this.name=e,this._logLevel=U,this._logHandler=B,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in M))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?V[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,M.DEBUG,...e),this._logHandler(this,M.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,M.VERBOSE,...e),this._logHandler(this,M.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,M.INFO,...e),this._logHandler(this,M.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,M.WARN,...e),this._logHandler(this,M.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,M.ERROR,...e),this._logHandler(this,M.ERROR,...e)}}let z,$;const G=new WeakMap,K=new WeakMap,H=new WeakMap,W=new WeakMap,Q=new WeakMap;let J={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return K.get(e);if("objectStoreNames"===t)return e.objectStoreNames||H.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Z(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function Y(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?($||($=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(ee(this),t),Z(G.get(this))}:function(...t){return Z(e.apply(ee(this),t))}:function(t,...n){const r=e.call(ee(this),t,...n);return H.set(r,t.sort?t.sort():[t]),Z(r)}}function X(e){return"function"==typeof e?Y(e):(e instanceof IDBTransaction&&function(e){if(K.has(e))return;const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{t(),r()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)});K.set(e,t)}(e),t=e,(z||(z=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(e=>t instanceof e)?new Proxy(e,J):e);var t}function Z(e){if(e instanceof IDBRequest)return function(e){const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{t(Z(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&G.set(t,e)}).catch(()=>{}),Q.set(t,e),t}(e);if(W.has(e))return W.get(e);const t=X(e);return t!==e&&(W.set(e,t),Q.set(t,e)),t}const ee=e=>Q.get(e);const te=["get","getKey","getAll","getAllKeys","count"],ne=["put","add","delete","clear"],re=new Map;function ie(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(re.get(t))return re.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=ne.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!i&&!te.includes(n))return;const s=async function(e,...t){const s=this.transaction(e,i?"readwrite":"readonly");let o=s.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&s.done]))[0]};return re.set(t,s),s}J=(e=>({...e,get:(t,n,r)=>ie(t,n)||e.get(t,n,r),has:(t,n)=>!!ie(t,n)||e.has(t,n)}))(J);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class se{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}const oe="@firebase/app",ae="0.14.11",ce=new j("@firebase/app"),ue="@firebase/app-compat",le="@firebase/analytics-compat",he="@firebase/analytics",de="@firebase/app-check-compat",fe="@firebase/app-check",pe="@firebase/auth",me="@firebase/auth-compat",ge="@firebase/database",ye="@firebase/data-connect",ve="@firebase/database-compat",we="@firebase/functions",_e="@firebase/functions-compat",Ie="@firebase/installations",Te="@firebase/installations-compat",be="@firebase/messaging",Ee="@firebase/messaging-compat",Se="@firebase/performance",Ae="@firebase/performance-compat",Ce="@firebase/remote-config",ke="@firebase/remote-config-compat",Ne="@firebase/storage",De="@firebase/storage-compat",Re="@firebase/firestore",Oe="@firebase/ai",Pe="@firebase/firestore-compat",xe="firebase",Le="[DEFAULT]",Me={[oe]:"fire-core",[ue]:"fire-core-compat",[he]:"fire-analytics",[le]:"fire-analytics-compat",[fe]:"fire-app-check",[de]:"fire-app-check-compat",[pe]:"fire-auth",[me]:"fire-auth-compat",[ge]:"fire-rtdb",[ye]:"fire-data-connect",[ve]:"fire-rtdb-compat",[we]:"fire-fn",[_e]:"fire-fn-compat",[Ie]:"fire-iid",[Te]:"fire-iid-compat",[be]:"fire-fcm",[Ee]:"fire-fcm-compat",[Se]:"fire-perf",[Ae]:"fire-perf-compat",[Ce]:"fire-rc",[ke]:"fire-rc-compat",[Ne]:"fire-gcs",[De]:"fire-gcs-compat",[Re]:"fire-fst",[Pe]:"fire-fst-compat",[Oe]:"fire-vertex","fire-js":"fire-js",[xe]:"fire-js-all"},Fe=new Map,Ve=new Map,Ue=new Map;function qe(e,t){try{e.container.addComponent(t)}catch(n){ce.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function Be(e){const t=e.name;if(Ue.has(t))return ce.debug(`There were multiple attempts to register component ${t}.`),!1;Ue.set(t,e);for(const n of Fe.values())qe(n,e);for(const n of Ve.values())qe(n,e);return!0}function je(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function ze(e){return null!=e&&void 0!==e.settings}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $e=new _("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ge{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new O("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw $e.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ke="12.12.0";function He(e,t={}){let n=e;if("object"!=typeof t){t={name:t}}const r={name:Le,automaticDataCollectionEnabled:!0,...t},i=r.name;if("string"!=typeof i||!i)throw $e.create("bad-app-name",{appName:String(i)});if(n||(n=l()),!n)throw $e.create("no-options");const s=Fe.get(i);if(s){if(T(n,s.options)&&T(r,s.config))return s;throw $e.create("duplicate-app",{appName:i})}const o=new L(i);for(const c of Ue.values())o.addComponent(c);const a=new Ge(n,r,o);return Fe.set(i,a),a}function We(e=Le){const t=Fe.get(e);if(!t&&e===Le&&l())return He();if(!t)throw $e.create("no-app",{appName:e});return t}function Qe(e,t,n){let r=Me[e]??e;n&&(r+=`-${n}`);const i=r.match(/\s|\//),s=t.match(/\s|\//);if(i||s){const e=[`Unable to register library "${r}" with version "${t}":`];return i&&e.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&e.push("and"),s&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void ce.warn(e.join(" "))}Be(new O(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Je="firebase-heartbeat-store";let Ye=null;function Xe(){return Ye||(Ye=function(e,t,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(e,t),a=Z(o);return r&&o.addEventListener("upgradeneeded",e=>{r(Z(o.result),e.oldVersion,e.newVersion,Z(o.transaction),e)}),n&&o.addEventListener("blocked",e=>n(e.oldVersion,e.newVersion,e)),a.then(e=>{s&&e.addEventListener("close",()=>s()),i&&e.addEventListener("versionchange",e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),a}("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(Je)}catch(n){console.warn(n)}}}).catch(e=>{throw $e.create("idb-open",{originalErrorMessage:e.message})})),Ye}async function Ze(e,t){try{const n=(await Xe()).transaction(Je,"readwrite"),r=n.objectStore(Je);await r.put(t,et(e)),await n.done}catch(n){if(n instanceof w)ce.warn(n.message);else{const e=$e.create("idb-set",{originalErrorMessage:null==n?void 0:n.message});ce.warn(e.message)}}}function et(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new rt(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){var e,t;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=nt();if(null==(null==(e=this._heartbeatsCache)?void 0:e.heartbeats)&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==(null==(t=this._heartbeatsCache)?void 0:t.heartbeats)))return;if(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(e=>e.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>30){const e=function(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){ce.warn(n)}}async getHeartbeatsHeader(){var e;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null==(e=this._heartbeatsCache)?void 0:e.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const t=nt(),{heartbeatsToSend:n,unsentEntries:r}=function(e,t=1024){const n=[];let r=e.slice();for(const i of e){const e=n.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),it(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),it(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),s=i(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return ce.warn(t),""}}}function nt(){return(new Date).toISOString().substring(0,10)}class rt{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!v()&&new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null==(e=i.error)?void 0:e.message)||"")}}catch(n){t(n)}}).then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await Xe()).transaction(Je),n=await t.objectStore(Je).get(et(e));return await t.done,n}catch(t){if(t instanceof w)ce.warn(t.message);else{const e=$e.create("idb-get",{originalErrorMessage:null==t?void 0:t.message});ce.warn(e.message)}}}(this.app);return(null==e?void 0:e.heartbeats)?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return Ze(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return Ze(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function it(e){return i(JSON.stringify({version:2,heartbeats:e})).length}var st;st="",Be(new O("platform-logger",e=>new se(e),"PRIVATE")),Be(new O("heartbeat",e=>new tt(e),"PRIVATE")),Qe(oe,ae,st),Qe(oe,ae,"esm2020"),Qe("fire-js","");function ot(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const at=
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registered for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is incorrect, malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend.","unsupported-password-policy-schema-version":"The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.","password-does-not-meet-requirements":"The password does not meet the requirements.","invalid-hosting-link-domain":"The provided Hosting link domain is not configured in Firebase Hosting or is not owned by the current project. This cannot be a default Hosting domain (`web.app` or `firebaseapp.com`)."}},ct=ot,ut=new _("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),lt=new j("@firebase/auth");function ht(e,...t){lt.logLevel<=M.ERROR&&lt.error(`Auth (${Ke}): ${e}`,...t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dt(e,...t){throw yt(e,...t)}function ft(e,...t){return yt(e,...t)}function pt(e,t,n){const r={...ct(),[t]:n};return new _("auth","Firebase",r).create(t,{appName:e.name})}function mt(e){return pt(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function gt(e,t,n){if(!(t instanceof n))throw n.name!==t.constructor.name&&dt(e,"argument-error"),pt(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function yt(e,...t){if("string"!=typeof e){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return ut.create(e,...t)}function vt(e,t,...n){if(!e)throw yt(t,...n)}function wt(e){const t="INTERNAL ASSERTION FAILED: "+e;throw ht(t),new Error(t)}function _t(e,t){e||wt(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function It(){var e;return"undefined"!=typeof self&&(null==(e=self.location)?void 0:e.href)||""}function Tt(){return"http:"===bt()||"https:"===bt()}function bt(){var e;return"undefined"!=typeof self&&(null==(e=self.location)?void 0:e.protocol)||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Et(){return!("undefined"!=typeof navigator&&navigator&&"onLine"in navigator&&"boolean"==typeof navigator.onLine&&(Tt()||function(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}()||"connection"in navigator))||navigator.onLine}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class St{constructor(e,t){this.shortDelay=e,this.longDelay=t,_t(t>e,"Short delay should be less than long delay!"),this.isMobile="undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(p())||"object"==typeof navigator&&"ReactNative"===navigator.product}get(){return Et()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function At(e,t){_t(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void wt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void wt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void wt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kt={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},Nt=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Dt=new St(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rt(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function Ot(e,t,n,r,i={}){return Pt(e,i,async()=>{let i={},s={};r&&("GET"===t?s=r:i={body:JSON.stringify(r)});const o=E({key:e.config.apiKey,...s}).slice(1),a=await e._getAdditionalHeaders();a["Content-Type"]="application/json",e.languageCode&&(a["X-Firebase-Locale"]=e.languageCode);const c={method:t,headers:a,...i};return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent||(c.referrerPolicy="no-referrer"),e.emulatorConfig&&D(e.emulatorConfig.host)&&(c.credentials="include"),Ct.fetch()(await Lt(e,e.config.apiHost,n,o),c)})}async function Pt(e,t,n){e._canInitEmulator=!1;const r={...kt,...t};try{const t=new Ft(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const s=await i.json();if("needConfirmation"in s)throw Vt(e,"account-exists-with-different-credential",s);if(i.ok&&!("errorMessage"in s))return s;{const t=i.ok?s.errorMessage:s.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw Vt(e,"credential-already-in-use",s);if("EMAIL_EXISTS"===n)throw Vt(e,"email-already-in-use",s);if("USER_DISABLED"===n)throw Vt(e,"user-disabled",s);const a=r[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw pt(e,a,o);dt(e,a)}}catch(i){if(i instanceof w)throw i;dt(e,"network-request-failed",{message:String(i)})}}async function xt(e,t,n,r,i={}){const s=await Ot(e,t,n,r,i);return"mfaPendingCredential"in s&&dt(e,"multi-factor-auth-required",{_serverResponse:s}),s}async function Lt(e,t,n,r){const i=`${t}${n}?${r}`,s=e,o=s.config.emulator?At(e.config,i):`${e.config.apiScheme}://${i}`;if(Nt.includes(n)&&(await s._persistenceManagerAvailable,"COOKIE"===s._getPersistenceType())){return s._getPersistence()._getFinalTarget(o).toString()}return o}function Mt(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Ft{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(ft(this.auth,"network-request-failed")),Dt.get())})}}function Vt(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=ft(e,t,r);return i.customData._tokenResponse=n,i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ut(e){return void 0!==e&&void 0!==e.getResponse}function qt(e){return void 0!==e&&void 0!==e.enterprise}class Bt{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Mt(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jt(e,t){return Ot(e,"GET","/v2/recaptchaConfig",Rt(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zt(e,t){return Ot(e,"POST","/v1/accounts:lookup",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $t(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(t){}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gt(e,t=!1){const n=N(e),r=await n.getIdToken(t),i=Ht(r);vt(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s="object"==typeof i.firebase?i.firebase:void 0,o=null==s?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:$t(Kt(i.auth_time)),issuedAtTime:$t(Kt(i.iat)),expirationTime:$t(Kt(i.exp)),signInProvider:o||null,signInSecondFactor:(null==s?void 0:s.sign_in_second_factor)||null}}function Kt(e){return 1e3*Number(e)}function Ht(e){const[t,n,r]=e.split(".");if(void 0===t||void 0===n||void 0===r)return ht("JWT malformed, contained fewer than 3 sections"),null;try{const e=s(n);return e?JSON.parse(e):(ht("Failed to decode base64 JWT payload"),null)}catch(i){return ht("Caught error parsing JWT payload as JSON",null==i?void 0:i.toString()),null}}function Wt(e){const t=Ht(e);return vt(t,"internal-error"),vt(void 0!==t.exp,"internal-error"),vt(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qt(e,t,n=!1){if(n)return t;try{return await t}catch(r){throw r instanceof w&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(r)&&e.auth.currentUser===e&&await e.auth.signOut(),r}}class Jt{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===(null==e?void 0:e.code)&&this.schedule(!0))}this.schedule()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=$t(this.lastLoginAt),this.creationTime=$t(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xt(e){var t;const n=e.auth,r=await e.getIdToken(),i=await Qt(e,zt(n,{idToken:r}));vt(null==i?void 0:i.users.length,n,"internal-error");const s=i.users[0];e._notifyReloadListener(s);const o=(null==(t=s.providerUserInfo)?void 0:t.length)?en(s.providerUserInfo):[],a=(c=e.providerData,u=o,[...c.filter(e=>!u.some(t=>t.providerId===e.providerId)),...u]);var c,u;const l=e.isAnonymous,h=!(e.email&&s.passwordHash||(null==a?void 0:a.length)),d=!!l&&h,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Yt(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(e,f)}async function Zt(e){const t=N(e);await Xt(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function en(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class tn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){vt(e.idToken,"internal-error"),vt(void 0!==e.idToken,"internal-error"),vt(void 0!==e.refreshToken,"internal-error");const t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):Wt(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){vt(0!==e.length,"internal-error");const t=Wt(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(vt(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:r,expiresIn:i}=await async function(e,t){const n=await Pt(e,{},async()=>{const n=E({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:i}=e.config,s=await Lt(e,r,"/v1/token",`key=${i}`),o=await e._getAdditionalHeaders();o["Content-Type"]="application/x-www-form-urlencoded";const a={method:"POST",headers:o,body:n};return e.emulatorConfig&&D(e.emulatorConfig.host)&&(a.credentials="include"),Ct.fetch()(s,a)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(e,t);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:r,expirationTime:i}=t,s=new tn;return n&&(vt("string"==typeof n,"internal-error",{appName:e}),s.refreshToken=n),r&&(vt("string"==typeof r,"internal-error",{appName:e}),s.accessToken=r),i&&(vt("number"==typeof i,"internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new tn,this.toJSON())}_performRefresh(){return wt("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nn(e,t){vt("string"==typeof e||void 0===e,"internal-error",{appName:t})}class rn{constructor({uid:e,auth:t,stsTokenManager:n,...r}){this.providerId="firebase",this.proactiveRefresh=new Jt(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Yt(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await Qt(this,this.stsTokenManager.getToken(this.auth,e));return vt(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Gt(this,e)}reload(){return Zt(this)}_assign(e){this!==e&&(vt(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new rn({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){vt(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Xt(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ze(this.auth.app))return Promise.reject(mt(this.auth));const e=await this.getIdToken();return await Qt(this,async function(e,t){return Ot(e,"POST","/v1/accounts:delete",t)}(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,r=t.email??void 0,i=t.phoneNumber??void 0,s=t.photoURL??void 0,o=t.tenantId??void 0,a=t._redirectEventId??void 0,c=t.createdAt??void 0,u=t.lastLoginAt??void 0,{uid:l,emailVerified:h,isAnonymous:d,providerData:f,stsTokenManager:p}=t;vt(l&&p,e,"internal-error");const m=tn.fromJSON(this.name,p);vt("string"==typeof l,e,"internal-error"),nn(n,e.name),nn(r,e.name),vt("boolean"==typeof h,e,"internal-error"),vt("boolean"==typeof d,e,"internal-error"),nn(i,e.name),nn(s,e.name),nn(o,e.name),nn(a,e.name),nn(c,e.name),nn(u,e.name);const g=new rn({uid:l,auth:e,email:r,emailVerified:h,displayName:n,isAnonymous:d,photoURL:s,phoneNumber:i,tenantId:o,stsTokenManager:m,createdAt:c,lastLoginAt:u});return f&&Array.isArray(f)&&(g.providerData=f.map(e=>({...e}))),a&&(g._redirectEventId=a),g}static async _fromIdTokenResponse(e,t,n=!1){const r=new tn;r.updateFromServerResponse(t);const i=new rn({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await Xt(i),i}static async _fromGetAccountInfoResponse(e,t,n){const r=t.users[0];vt(void 0!==r.localId,"internal-error");const i=void 0!==r.providerUserInfo?en(r.providerUserInfo):[],s=!(r.email&&r.passwordHash||(null==i?void 0:i.length)),o=new tn;o.updateFromIdToken(n);const a=new rn({uid:r.localId,auth:e,stsTokenManager:o,isAnonymous:s}),c={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new Yt(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash||(null==i?void 0:i.length))};return Object.assign(a,c),a}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sn=new Map;function on(e){_t(e instanceof Function,"Expected a class definition");let t=sn.get(e);return t?(_t(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,sn.set(e,t),t)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}an.type="NONE";const cn=an;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function un(e,t,n){return`firebase:${e}:${t}:${n}`}class ln{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:r,name:i}=this.auth;this.fullUserKey=un(this.userKey,r.apiKey,i),this.fullPersistenceKey=un("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"==typeof e){const t=await zt(this.auth,{idToken:e}).catch(()=>{});return t?rn._fromGetAccountInfoResponse(this.auth,t,e):null}return rn._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new ln(on(cn),e,n);const r=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e);let i=r[0]||on(cn);const s=un(n,e.config.apiKey,e.name);let o=null;for(const c of t)try{const t=await c._get(s);if(t){let n;if("string"==typeof t){const r=await zt(e,{idToken:t}).catch(()=>{});if(!r)break;n=await rn._fromGetAccountInfoResponse(e,r,t)}else n=rn._fromJSON(e,t);c!==i&&(o=n),i=c;break}}catch{}const a=r.filter(e=>e._shouldAllowMigration);return i._shouldAllowMigration&&a.length?(i=a[0],o&&await i._set(s,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==i)try{await e._remove(s)}catch{}})),new ln(i,e,n)):new ln(i,e,n)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hn(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(mn(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(dn(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(yn(t))return"Blackberry";if(vn(t))return"Webos";if(fn(t))return"Safari";if((t.includes("chrome/")||pn(t))&&!t.includes("edge/"))return"Chrome";if(gn(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===(null==n?void 0:n.length))return n[1]}return"Other"}function dn(e=p()){return/firefox\//i.test(e)}function fn(e=p()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function pn(e=p()){return/crios\//i.test(e)}function mn(e=p()){return/iemobile/i.test(e)}function gn(e=p()){return/android/i.test(e)}function yn(e=p()){return/blackberry/i.test(e)}function vn(e=p()){return/webos/i.test(e)}function wn(e=p()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function _n(){return function(){const e=p();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}()&&10===document.documentMode}function In(e=p()){return wn(e)||gn(e)||vn(e)||yn(e)||/windows phone/i.test(e)||mn(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tn(e,t=[]){let n;switch(e){case"Browser":n=hn(p());break;case"Worker":n=`${hn(p())}-${e}`;break;default:n=e}const r=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ke}/${r}`}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise((n,r)=>{try{n(e(t))}catch(i){r(i)}});n.onAbort=t,this.queue.push(n);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const e of t)try{e()}catch(r){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==n?void 0:n.message})}}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(e){var t;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??6,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),void 0!==n.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),void 0!==n.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),void 0!==n.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),void 0!==n.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(null==(t=e.allowedNonAlphanumericCharacters)?void 0:t.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Cn(this),this.idTokenSubscription=new Cn(this),this.beforeStateQueue=new bn(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ut,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=on(t)),this._initializationPromise=this.queue(async()=>{var n,r,i;if(!this._deleted&&(this.persistenceManager=await ln.create(this,e),null==(n=this._resolvePersistenceManagerAvailable)||n.call(this),!this._deleted)){if(null==(r=this._popupRedirectResolver)?void 0:r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(s){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null==(i=this.currentUser)?void 0:i.uid)||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void(await this.currentUser.getIdToken())):void(await this._updateCurrentUser(e,!0)):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await zt(this,{idToken:e}),n=await rn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(ze(this.app)){const e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const n=null==(t=this.redirectUser)?void 0:t._redirectEventId,s=null==r?void 0:r._redirectEventId,o=await this.tryRedirectSignIn(e);n&&n!==s||!(null==o?void 0:o.user)||(r=o.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(s){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return vt(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(n){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Xt(e)}catch(t){if("auth/network-request-failed"!==(null==t?void 0:t.code))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ze(this.app))return Promise.reject(mt(this));const t=e?N(e):null;return t&&vt(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&vt(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ze(this.app)?Promise.reject(mt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ze(this.app)?Promise.reject(mt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(on(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await async function(e,t={}){return Ot(e,"GET","/v2/passwordPolicy",Rt(e,t))}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this),t=new En(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new _("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await async function(e,t){return Ot(e,"POST","/v2/accounts:revokeToken",Rt(e,t))}(this,t)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null==(e=this._currentUser)?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&on(e)||this._popupRedirectResolver;vt(t,this,"argument-error"),this.redirectPersistenceManager=await ln.create(this,[on(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),(null==(t=this._currentUser)?void 0:t._redirectEventId)===e?this._currentUser:(null==(n=this.redirectUser)?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=(null==(e=this.currentUser)?void 0:e.uid)??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};const i="function"==typeof t?t:t.next.bind(t);let s=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(vt(o,this,"internal-error"),o.then(()=>{s||i(this.currentUser)}),"function"==typeof t){const i=e.addObserver(t,n,r);return()=>{s=!0,i()}}{const n=e.addObserver(t);return()=>{s=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return vt(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Tn(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await(null==(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;if(ze(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await(null==(e=this.appCheckServiceProvider.getImmediate({optional:!0}))?void 0:e.getToken());return(null==t?void 0:t.error)&&function(e,...t){lt.logLevel<=M.WARN&&lt.warn(`Auth (${Ke}): ${e}`,...t)}(`Error while retrieving App Check token: ${t.error}`),null==t?void 0:t.token}}function An(e){return N(e)}class Cn{constructor(e){this.auth=e,this.observer=null,this.addObserver=function(e,t){const n=new C(e,t);return n.subscribe.bind(n)}(e=>this.observer=e)}get next(){return vt(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let kn={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Nn(e){return kn.loadJS(e)}function Dn(e){return`__${e}${Math.floor(1e6*Math.random())}`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rn=1e12;class On{constructor(e){this.auth=e,this.counter=Rn,this._widgets=new Map}render(e,t){const n=this.counter;return this._widgets.set(n,new Ln(e,this.auth.name,t||{})),this.counter++,n}reset(e){var t;const n=e||Rn;null==(t=this._widgets.get(n))||t.delete(),this._widgets.delete(n)}getResponse(e){var t;const n=e||Rn;return(null==(t=this._widgets.get(n))?void 0:t.getResponse())||""}async execute(e){var t;const n=e||Rn;return null==(t=this._widgets.get(n))||t.execute(),""}}class Pn{constructor(){this.enterprise=new xn}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class xn{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Ln{constructor(e,t,n){this.params=n,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const r="string"==typeof e?document.getElementById(e):e;vt(r,"argument-error",{appName:t}),this.container=r,this.isVisible="invisible"!==this.params.size,this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),this.timerId||(this.timerId=window.setTimeout(()=>{this.responseToken=function(e){const t=[],n="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<e;r++)t.push(n.charAt(Math.floor(Math.random()*n.length)));return t.join("")}(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch(n){}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch(n){}this.isVisible&&this.execute()},6e4)},500))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}const Mn="NO_RECAPTCHA";class Fn{constructor(e){this.type="recaptcha-enterprise",this.auth=An(e)}async verify(e="verify",t=!1){function n(t,n,r){const i=window.grecaptcha;qt(i)?i.enterprise.ready(()=>{i.enterprise.execute(t,{action:e}).then(e=>{n(e)}).catch(()=>{n(Mn)})}):r(Error("No reCAPTCHA enterprise script loaded."))}if(this.auth.settings.appVerificationDisabledForTesting){return(new Pn).execute("siteKey",{action:"verify"})}return new Promise((e,r)=>{(async function(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,n)=>{jt(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(r=>{if(void 0!==r.recaptchaKey){const n=new Bt(r);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}n(new Error("recaptcha Enterprise site key undefined"))}).catch(e=>{n(e)})})})(this.auth).then(i=>{if(!t&&qt(window.grecaptcha))n(i,e,r);else{if("undefined"==typeof window)return void r(new Error("RecaptchaVerifier is only supported in browser"));let t=kn.recaptchaEnterpriseScript;0!==t.length&&(t+=i),Nn(t).then(()=>{n(i,e,r)}).catch(e=>{r(e)})}}).catch(e=>{r(e)})})}}async function Vn(e,t,n,r=!1,i=!1){const s=new Fn(e);let o;if(i)o=Mn;else try{o=await s.verify(n)}catch(c){o=await s.verify(n,!0)}const a={...t};if("mfaSmsEnrollment"===n||"mfaSmsSignIn"===n){if("phoneEnrollmentInfo"in a){const e=a.phoneEnrollmentInfo.phoneNumber,t=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const e=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Un(e,t,n,r,i){var s,o;if("EMAIL_PASSWORD_PROVIDER"===i){if(null==(s=e._getRecaptchaConfig())?void 0:s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Vn(e,t,n,"getOobCode"===n);return r(e,i)}return r(e,t).catch(async i=>{if("auth/missing-recaptcha-token"===i.code){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const i=await Vn(e,t,n,"getOobCode"===n);return r(e,i)}return Promise.reject(i)})}if("PHONE_PROVIDER"===i){if(null==(o=e._getRecaptchaConfig())?void 0:o.isProviderEnabled("PHONE_PROVIDER")){const i=await Vn(e,t,n);return r(e,i).catch(async i=>{var s;if("AUDIT"===(null==(s=e._getRecaptchaConfig())?void 0:s.getProviderEnforcementState("PHONE_PROVIDER"))&&("auth/missing-recaptcha-token"===i.code||"auth/invalid-app-credential"===i.code)){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`);const i=await Vn(e,t,n,!1,!0);return r(e,i)}return Promise.reject(i)})}{const i=await Vn(e,t,n,!1,!0);return r(e,i)}}return Promise.reject(i+" provider is not supported.")}async function qn(e){const t=An(e),n=await jt(t,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new Bt(n);if(null==t.tenantId?t._agentRecaptchaConfig=r:t._tenantRecaptchaConfigs[t.tenantId]=r,r.isAnyProviderEnabled()){new Fn(t).verify()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bn(e,t){const n=je(e,"auth");if(n.isInitialized()){const e=n.getImmediate();if(T(n.getOptions(),t??{}))return e;dt(e,"already-initialized")}return n.initialize({options:t})}function jn(e,t,n){const r=An(e);vt(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const i=!!(null==n?void 0:n.disableWarnings),s=zn(t),{host:o,port:a}=function(e){const t=zn(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const e=i[1];return{host:e,port:$n(r.substr(e.length+1))}}{const[e,t]=r.split(":");return{host:e,port:$n(t)}}}(t),c=null===a?"":`:${a}`,u={url:`${s}//${o}${c}/`},l=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator)return vt(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),void vt(T(u,r.config.emulator)&&T(l,r.emulatorConfig),r,"emulator-config-failed");r.config.emulator=u,r.emulatorConfig=l,r.settings.appVerificationDisabledForTesting=!0,D(o)?R(`${s}//${o}${c}`):i||function(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */()}function zn(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function $n(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}class Gn{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return wt("not implemented")}_getIdTokenResponse(e){return wt("not implemented")}_linkToIdToken(e,t){return wt("not implemented")}_getReauthenticationResolver(e){return wt("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kn(e,t){return Ot(e,"POST","/v1/accounts:resetPassword",Rt(e,t))}async function Hn(e,t){return Ot(e,"POST","/v1/accounts:signUp",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Wn(e,t){return xt(e,"POST","/v1/accounts:signInWithPassword",Rt(e,t))}async function Qn(e,t){return Ot(e,"POST","/v1/accounts:sendOobCode",Rt(e,t))}async function Jn(e,t){return Qn(e,t)}async function Yn(e,t){return Qn(e,t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Xn extends Gn{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new Xn(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new Xn(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e;if((null==t?void 0:t.email)&&(null==t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return Un(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signInWithPassword",Wn,"EMAIL_PASSWORD_PROVIDER");case"emailLink":
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return async function(e,t){return xt(e,"POST","/v1/accounts:signInWithEmailLink",Rt(e,t))}(e,{email:this._email,oobCode:this._password});default:dt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return Un(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Hn,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return async function(e,t){return xt(e,"POST","/v1/accounts:signInWithEmailLink",Rt(e,t))}(e,{idToken:t,email:this._email,oobCode:this._password});default:dt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zn(e,t){return xt(e,"POST","/v1/accounts:signInWithIdp",Rt(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er extends Gn{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new er(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):dt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r,...i}=t;if(!n||!r)return null;const s=new er(n,r);return s.idToken=i.idToken||void 0,s.accessToken=i.accessToken||void 0,s.secret=i.secret,s.nonce=i.nonce,s.pendingToken=i.pendingToken||null,s}_getIdTokenResponse(e){return Zn(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Zn(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Zn(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=E(t)}return e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tr(e,t){return Ot(e,"POST","/v1/accounts:sendVerificationCode",Rt(e,t))}const nr={USER_NOT_FOUND:"user-not-found"};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class rr extends Gn{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new rr({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new rr({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return async function(e,t){return xt(e,"POST","/v1/accounts:signInWithPhoneNumber",Rt(e,t))}(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return async function(e,t){const n=await xt(e,"POST","/v1/accounts:signInWithPhoneNumber",Rt(e,t));if(n.temporaryProof)throw Vt(e,"account-exists-with-different-credential",n);return n}(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return async function(e,t){return xt(e,"POST","/v1/accounts:signInWithPhoneNumber",Rt(e,{...t,operation:"REAUTH"}),nr)}(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:r}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"==typeof e&&(e=JSON.parse(e));const{verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}=e;return n||t||r||i?new rr({verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}):null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{constructor(e){const t=S(A(e)),n=t.apiKey??null,r=t.oobCode??null,i=function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(t.mode??null);vt(n&&r&&i,"argument-error"),this.apiKey=n,this.operation=i,this.code=r,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=function(e){const t=S(A(e)).link,n=t?S(A(t)).deep_link_id:null,r=S(A(e)).deep_link_id;return(r?S(A(r)).link:null)||r||n||t||e}(e);try{return new ir(t)}catch{return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class sr{constructor(){this.providerId=sr.PROVIDER_ID}static credential(e,t){return Xn._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=ir.parseLink(t);return vt(n,"argument-error"),Xn._fromEmailAndCode(e,n.code,n.tenantId)}}sr.PROVIDER_ID="password",sr.EMAIL_PASSWORD_SIGN_IN_METHOD="password",sr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class or{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar extends or{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class cr extends ar{static credentialFromJSON(e){const t="string"==typeof e?JSON.parse(e):e;return vt("providerId"in t&&"signInMethod"in t,"argument-error"),er._fromParams(t)}credential(e){return this._credential({...e,nonce:e.rawNonce})}_credential(e){return vt(e.idToken||e.accessToken,"argument-error"),er._fromParams({...e,providerId:this.providerId,signInMethod:this.providerId})}static credentialFromResult(e){return cr.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return cr.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n,oauthTokenSecret:r,pendingToken:i,nonce:s,providerId:o}=e;if(!(n||r||t||i))return null;if(!o)return null;try{return new cr(o)._credential({idToken:t,accessToken:n,nonce:s,pendingToken:i})}catch(a){return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur extends ar{constructor(){super("facebook.com")}static credential(e){return er._fromParams({providerId:ur.PROVIDER_ID,signInMethod:ur.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ur.credentialFromTaggedObject(e)}static credentialFromError(e){return ur.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return ur.credential(e.oauthAccessToken)}catch{return null}}}ur.FACEBOOK_SIGN_IN_METHOD="facebook.com",ur.PROVIDER_ID="facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class lr extends ar{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return er._fromParams({providerId:lr.PROVIDER_ID,signInMethod:lr.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return lr.credentialFromTaggedObject(e)}static credentialFromError(e){return lr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return lr.credential(t,n)}catch{return null}}}lr.GOOGLE_SIGN_IN_METHOD="google.com",lr.PROVIDER_ID="google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class hr extends ar{constructor(){super("github.com")}static credential(e){return er._fromParams({providerId:hr.PROVIDER_ID,signInMethod:hr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return hr.credentialFromTaggedObject(e)}static credentialFromError(e){return hr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return hr.credential(e.oauthAccessToken)}catch{return null}}}hr.GITHUB_SIGN_IN_METHOD="github.com",hr.PROVIDER_ID="github.com";class dr extends Gn{constructor(e,t){super(e,e),this.pendingToken=t}_getIdTokenResponse(e){return Zn(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Zn(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Zn(e,t)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r,pendingToken:i}=t;return n&&r&&i&&n===r?new dr(n,i):null}static _create(e,t){return new dr(e,t)}buildRequest(){return{requestUri:"http://localhost",returnSecureToken:!0,pendingToken:this.pendingToken}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr extends or{constructor(e){vt(e.startsWith("saml."),"argument-error"),super(e)}static credentialFromResult(e){return fr.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return fr.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const t=dr.fromJSON(e);return vt(t,"argument-error"),t}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:t,providerId:n}=e;if(!t||!n)return null;try{return dr._create(n,t)}catch(r){return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr extends ar{constructor(){super("twitter.com")}static credential(e,t){return er._fromParams({providerId:pr.PROVIDER_ID,signInMethod:pr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return pr.credentialFromTaggedObject(e)}static credentialFromError(e){return pr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return pr.credential(t,n)}catch{return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function mr(e,t){return xt(e,"POST","/v1/accounts:signUp",Rt(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */pr.TWITTER_SIGN_IN_METHOD="twitter.com",pr.PROVIDER_ID="twitter.com";class gr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,r=!1){const i=await rn._fromIdTokenResponse(e,n,r),s=yr(n);return new gr({user:i,providerId:s,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const r=yr(n);return new gr({user:e,providerId:r,_tokenResponse:n,operationType:t})}}function yr(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vr(e){var t;if(ze(e.app))return Promise.reject(mt(e));const n=An(e);if(await n._initializationPromise,null==(t=n.currentUser)?void 0:t.isAnonymous)return new gr({user:n.currentUser,providerId:null,operationType:"signIn"});const r=await mr(n,{returnSecureToken:!0}),i=await gr._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(i.user),i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wr extends w{constructor(e,t,n,r){super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,wr.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new wr(e,t,n,r)}}function _r(e,t,n,r){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw wr._fromErrorAndOperation(e,n,t,r);throw n})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ir(e){return new Set(e.map(({providerId:e})=>e).filter(e=>!!e))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tr(e,t,n=!1){const r=await Qt(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return gr._forOperation(e,"link",r)}async function br(e,t,n){await Xt(t);const r=!1===e?"provider-already-linked":"no-such-provider";vt(Ir(t.providerData).has(n)===e,t.auth,r)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Er(e,t,n=!1){const{auth:r}=e;if(ze(r.app))return Promise.reject(mt(r));const i="reauthenticate";try{const s=await Qt(e,_r(r,i,t,e),n);vt(s.idToken,r,"internal-error");const o=Ht(s.idToken);vt(o,r,"internal-error");const{sub:a}=o;return vt(e.uid===a,r,"user-mismatch"),gr._forOperation(e,i,s)}catch(s){throw"auth/user-not-found"===(null==s?void 0:s.code)&&dt(r,"user-mismatch"),s}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sr(e,t,n=!1){if(ze(e.app))return Promise.reject(mt(e));const r="signIn",i=await _r(e,r,t),s=await gr._fromIdTokenResponse(e,r,i);return n||await e._updateCurrentUser(s.user),s}async function Ar(e,t){return Sr(An(e),t)}async function Cr(e,t){const n=N(e);return await br(!1,n,t.providerId),Tr(n,t)}async function kr(e,t){return Er(N(e),t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Nr{constructor(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}static _fromServerResponse(e,t){return"phoneInfo"in t?Dr._fromServerResponse(e,t):"totpInfo"in t?Rr._fromServerResponse(e,t):dt(e,"internal-error")}}class Dr extends Nr{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,t){return new Dr(t)}}class Rr extends Nr{constructor(e){super("totp",e)}static _fromServerResponse(e,t){return new Rr(t)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Or(e,t,n){var r;vt((null==(r=n.url)?void 0:r.length)>0,e,"invalid-continue-uri"),vt(void 0===n.dynamicLinkDomain||n.dynamicLinkDomain.length>0,e,"invalid-dynamic-link-domain"),vt(void 0===n.linkDomain||n.linkDomain.length>0,e,"invalid-hosting-link-domain"),t.continueUrl=n.url,t.dynamicLinkDomain=n.dynamicLinkDomain,t.linkDomain=n.linkDomain,t.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(vt(n.iOS.bundleId.length>0,e,"missing-ios-bundle-id"),t.iOSBundleId=n.iOS.bundleId),n.android&&(vt(n.android.packageName.length>0,e,"missing-android-pkg-name"),t.androidInstallApp=n.android.installApp,t.androidMinimumVersionCode=n.android.minimumVersion,t.androidPackageName=n.android.packageName)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pr(e){const t=An(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function xr(e,t){const n=N(e),r=await Kn(n,{oobCode:t}),i=r.requestType;switch(vt(i,n,"internal-error"),i){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":vt(r.newEmail,n,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":vt(r.mfaInfo,n,"internal-error");default:vt(r.email,n,"internal-error")}let s=null;return r.mfaInfo&&(s=Nr._fromServerResponse(An(n),r.mfaInfo)),{data:{email:("VERIFY_AND_CHANGE_EMAIL"===r.requestType?r.newEmail:r.email)||null,previousEmail:("VERIFY_AND_CHANGE_EMAIL"===r.requestType?r.email:r.newEmail)||null,multiFactorInfo:s},operation:i}}async function Lr(e,t,n){if(ze(e.app))return Promise.reject(mt(e));const r=An(e),i=Un(r,{returnSecureToken:!0,email:t,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",mr,"EMAIL_PASSWORD_PROVIDER"),s=await i.catch(t=>{throw"auth/password-does-not-meet-requirements"===t.code&&Pr(e),t}),o=await gr._fromIdTokenResponse(r,"signIn",s);return await r._updateCurrentUser(o.user),o}function Mr(e,t,n){return ze(e.app)?Promise.reject(mt(e)):Ar(N(e),sr.credential(t,n)).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&Pr(e),t})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fr(e,t,n){const{auth:r}=e,i={idToken:await e.getIdToken(),returnSecureToken:!0};t&&(i.email=t),n&&(i.password=n);const s=await Qt(e,async function(e,t){return Ot(e,"POST","/v1/accounts:update",t)}(r,i));await e._updateTokensIfNecessary(s,!0)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr{constructor(e,t,n={}){this.isNewUser=e,this.providerId=t,this.profile=n}}class Ur extends Vr{constructor(e,t,n,r){super(e,t,n),this.username=r}}class qr extends Vr{constructor(e,t){super(e,"facebook.com",t)}}class Br extends Ur{constructor(e,t){super(e,"github.com",t,"string"==typeof(null==t?void 0:t.login)?null==t?void 0:t.login:null)}}class jr extends Vr{constructor(e,t){super(e,"google.com",t)}}class zr extends Ur{constructor(e,t,n){super(e,"twitter.com",t,n)}}function $r(e,t,n,r){return N(e).onIdTokenChanged(t,n,r)}function Gr(e,t,n){return N(e).beforeAuthStateChanged(t,n)}function Kr(e,t,n,r){return N(e).onAuthStateChanged(t,n,r)}function Hr(e){return N(e).signOut()}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Wr{constructor(e,t,n){this.type=e,this.credential=t,this.user=n}static _fromIdtoken(e,t){return new Wr("enroll",e,t)}static _fromMfaPendingCredential(e){return new Wr("signin",e)}toJSON(){const e="enroll"===this.type?"idToken":"pendingCredential";return{multiFactorSession:{[e]:this.credential}}}static fromJSON(e){var t,n;if(null==e?void 0:e.multiFactorSession){if(null==(t=e.multiFactorSession)?void 0:t.pendingCredential)return Wr._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(null==(n=e.multiFactorSession)?void 0:n.idToken)return Wr._fromIdtoken(e.multiFactorSession.idToken)}return null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr{constructor(e,t,n){this.session=e,this.hints=t,this.signInResolver=n}static _fromError(e,t){const n=An(e),r=t.customData._serverResponse,i=(r.mfaInfo||[]).map(e=>Nr._fromServerResponse(n,e));vt(r.mfaPendingCredential,n,"internal-error");const s=Wr._fromMfaPendingCredential(r.mfaPendingCredential);return new Qr(s,i,async e=>{const i=await e._process(n,s);delete r.mfaInfo,delete r.mfaPendingCredential;const o={...r,idToken:i.idToken,refreshToken:i.refreshToken};switch(t.operationType){case"signIn":const e=await gr._fromIdTokenResponse(n,t.operationType,o);return await n._updateCurrentUser(e.user),e;case"reauthenticate":return vt(t.user,n,"internal-error"),gr._forOperation(t.user,t.operationType,o);default:dt(n,"internal-error")}})}async resolveSignIn(e){const t=e;return this.signInResolver(t)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Jr(e,t){return Ot(e,"POST","/v2/accounts/mfaEnrollment:start",Rt(e,t))}class Yr{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(t=>{t.mfaInfo&&(this.enrolledFactors=t.mfaInfo.map(t=>Nr._fromServerResponse(e.auth,t)))})}static _fromUser(e){return new Yr(e)}async getSession(){return Wr._fromIdtoken(await this.user.getIdToken(),this.user)}async enroll(e,t){const n=e,r=await this.getSession(),i=await Qt(this.user,n._process(this.user.auth,r,t));return await this.user._updateTokensIfNecessary(i),this.user.reload()}async unenroll(e){const t="string"==typeof e?e:e.uid,n=await this.user.getIdToken();try{const e=await Qt(this.user,(r=this.user.auth,i={idToken:n,mfaEnrollmentId:t},Ot(r,"POST","/v2/accounts/mfaEnrollment:withdraw",Rt(r,i))));this.enrolledFactors=this.enrolledFactors.filter(({uid:e})=>e!==t),await this.user._updateTokensIfNecessary(e),await this.user.reload()}catch(s){throw s}var r,i}}const Xr=new WeakMap;const Zr="__sak";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Zr,"1"),this.storage.removeItem(Zr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti extends ei{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=In(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});const n=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},i=this.storage.getItem(n);_n()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,10):r()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}ti.type="LOCAL";const ni=ti;
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ri(e){var t;const n=e.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),r=RegExp(`${n}=([^;]+)`);return(null==(t=document.cookie.match(r))?void 0:t[1])??null}function ii(e){return`${"http:"===window.location.protocol?"__dev_":"__HOST-"}FIREBASE_${e.split(":")[3]}`}class si{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(void 0===typeof window)return e;const t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return!("boolean"==typeof isSecureContext&&!isSecureContext)&&("undefined"!=typeof navigator&&"undefined"!=typeof document&&(navigator.cookieEnabled??!0))}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;const t=ii(e);if(window.cookieStore){const e=await window.cookieStore.get(t);return null==e?void 0:e.value}return ri(t)}async _remove(e){if(!this._isAvailable())return;if(!(await this._get(e)))return;const t=ii(e);document.cookie=`${t}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;const n=ii(e);if(window.cookieStore){const e=e=>{const r=e.changed.find(e=>e.name===n);r&&t(r.value);e.deleted.find(e=>e.name===n)&&t(null)},r=()=>window.cookieStore.removeEventListener("change",e);return this.listenerUnsubscribes.set(t,r),window.cookieStore.addEventListener("change",e)}let r=ri(n);const i=setInterval(()=>{const e=ri(n);e!==r&&(t(e),r=e)},1e3);this.listenerUnsubscribes.set(t,()=>clearInterval(i))}_removeListener(e,t){const n=this.listenerUnsubscribes.get(t);n&&(n(),this.listenerUnsubscribes.delete(t))}}si.type="COOKIE";const oi=si;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai extends ei{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}ai.type="SESSION";const ci=ai;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ui{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;const n=new ui(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:r,data:i}=t.data,s=this.handlersMap[r];if(!(null==s?void 0:s.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const o=Array.from(s).map(async e=>e(t.origin,i)),a=await function(e){return Promise.all(e.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function li(e="",t=10){let n="";for(let r=0;r<t;r++)n+=Math.floor(10*Math.random());return e+n}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ui.receivers=[];class hi{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const r="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,s;return new Promise((o,a)=>{const c=li("",20);r.port1.start();const u=setTimeout(()=>{a(new Error("unsupported_event"))},n);s={messageChannel:r,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),o(t.data.response);break;default:clearTimeout(u),clearTimeout(i),a(new Error("invalid_response"))}}},this.handlers.add(s),r.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[r.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function di(){return window}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function fi(){return void 0!==di().WorkerGlobalScope&&"function"==typeof di().importScripts}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const pi="firebaseLocalStorageDb",mi="firebaseLocalStorage",gi="fbase_key";class yi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function vi(e,t){return e.transaction([mi],t?"readwrite":"readonly").objectStore(mi)}function wi(){const e=indexedDB.open(pi,1);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const t=e.result;try{t.createObjectStore(mi,{keyPath:gi})}catch(r){n(r)}}),e.addEventListener("success",async()=>{const n=e.result;n.objectStoreNames.contains(mi)?t(n):(n.close(),await function(){const e=indexedDB.deleteDatabase(pi);return new yi(e).toPromise()}(),t(await wi()))})})}async function _i(e,t,n){const r=vi(e,!0).put({[gi]:t,value:n});return new yi(r).toPromise()}function Ii(e,t){const n=vi(e,!0).delete(t);return new yi(n).toPromise()}class Ti{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await wi()),this.db}async _withRetries(e){let t=0;for(;;)try{const t=await this._openDb();return await e(t)}catch(n){if(t++>3)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return fi()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ui._getInstance(fi()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await async function(){if(!(null==navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}(),!this.activeServiceWorker)return;this.sender=new hi(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&(null==(e=n[0])?void 0:e.fulfilled)&&(null==(t=n[0])?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null==(t=null==navigator?void 0:navigator.serviceWorker)?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await wi();return await _i(e,Zr,"1"),await Ii(e,Zr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>_i(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(t=>async function(e,t){const n=vi(e,!1).get(t),r=await new yi(n).toPromise();return void 0===r?null:r.value}(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ii(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(e=>{const t=vi(e,!1).getAll();return new yi(t).toPromise()});if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!n.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}Ti.type="LOCAL";const bi=Ti;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ei(e,t){return Ot(e,"POST","/v2/accounts/mfaSignIn:start",Rt(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Si=Dn("rcb"),Ai=new St(3e4,6e4);class Ci{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(null==(e=di().grecaptcha)?void 0:e.render)}load(e,t=""){return vt(function(e){return e.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(e)}(t),e,"argument-error"),this.shouldResolveImmediately(t)&&Ut(di().grecaptcha)?Promise.resolve(di().grecaptcha):new Promise((n,r)=>{const i=di().setTimeout(()=>{r(ft(e,"network-request-failed"))},Ai.get());di()[Si]=()=>{di().clearTimeout(i),delete di()[Si];const s=di().grecaptcha;if(!s||!Ut(s))return void r(ft(e,"internal-error"));const o=s.render;s.render=(e,t)=>{const n=o(e,t);return this.counter++,n},this.hostLanguage=t,n(s)};Nn(`${kn.recaptchaV2Script}?${E({onload:Si,render:"explicit",hl:t})}`).catch(()=>{clearTimeout(i),r(ft(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!(null==(t=di().grecaptcha)?void 0:t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}class ki{async load(e){return new On(e)}clearedOneInstance(){}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ni="recaptcha",Di={theme:"light",type:"image"};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ri{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=rr._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function Oi(e,t,n){var r;if(!e._getRecaptchaConfig())try{await qn(e)}catch(i){console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let i;if(i="string"==typeof t?{phoneNumber:t}:t,"session"in i){const t=i.session;if("phoneNumber"in i){vt("enroll"===t.type,e,"internal-error");const r={idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"}},s=Un(e,r,"mfaSmsEnrollment",async(e,t)=>{if(t.phoneEnrollmentInfo.captchaResponse===Mn){vt((null==n?void 0:n.type)===Ni,e,"argument-error");return Jr(e,await Pi(e,t,n))}return Jr(e,t)},"PHONE_PROVIDER");return(await s.catch(e=>Promise.reject(e))).phoneSessionInfo.sessionInfo}{vt("signin"===t.type,e,"internal-error");const s=(null==(r=i.multiFactorHint)?void 0:r.uid)||i.multiFactorUid;vt(s,e,"missing-multi-factor-info");const o={mfaPendingCredential:t.credential,mfaEnrollmentId:s,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}},a=Un(e,o,"mfaSmsSignIn",async(e,t)=>{if(t.phoneSignInInfo.captchaResponse===Mn){vt((null==n?void 0:n.type)===Ni,e,"argument-error");return Ei(e,await Pi(e,t,n))}return Ei(e,t)},"PHONE_PROVIDER");return(await a.catch(e=>Promise.reject(e))).phoneResponseInfo.sessionInfo}}{const t={phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"},r=Un(e,t,"sendVerificationCode",async(e,t)=>{if(t.captchaResponse===Mn){vt((null==n?void 0:n.type)===Ni,e,"argument-error");return tr(e,await Pi(e,t,n))}return tr(e,t)},"PHONE_PROVIDER");return(await r.catch(e=>Promise.reject(e))).sessionInfo}}finally{null==n||n._reset()}}async function Pi(e,t,n){vt(n.type===Ni,e,"argument-error");const r=await n.verify();vt("string"==typeof r,e,"argument-error");const i={...t};if("phoneEnrollmentInfo"in i){const e=i.phoneEnrollmentInfo.phoneNumber,t=i.phoneEnrollmentInfo.captchaResponse,n=i.phoneEnrollmentInfo.clientType,s=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:r,captchaResponse:t,clientType:n,recaptchaVersion:s}}),i}if("phoneSignInInfo"in i){const e=i.phoneSignInInfo.captchaResponse,t=i.phoneSignInInfo.clientType,n=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:e,clientType:t,recaptchaVersion:n}}),i}return Object.assign(i,{recaptchaToken:r}),i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xi{constructor(e){this.providerId=xi.PROVIDER_ID,this.auth=An(e)}verifyPhoneNumber(e,t){return Oi(this.auth,e,N(t))}static credential(e,t){return rr._fromVerification(e,t)}static credentialFromResult(e){const t=e;return xi.credentialFromTaggedObject(t)}static credentialFromError(e){return xi.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:n}=e;return t&&n?rr._fromTokenResponse(t,n):null}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Li(e,t){return t?on(t):(vt(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */xi.PROVIDER_ID="phone",xi.PHONE_SIGN_IN_METHOD="phone";class Mi extends Gn{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Zn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Zn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Zn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Fi(e){return Sr(e.auth,new Mi(e),e.bypassAuthState)}function Vi(e){const{auth:t,user:n}=e;return vt(n,t,"internal-error"),Er(n,new Mi(e),e.bypassAuthState)}async function Ui(e){const{auth:t,user:n}=e;return vt(n,t,"internal-error"),Tr(n,new Mi(e),e.bypassAuthState)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:s,type:o}=e;if(s)return void this.reject(s);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Fi;case"linkViaPopup":case"linkViaRedirect":return Ui;case"reauthViaPopup":case"reauthViaRedirect":return Vi;default:dt(this.auth,"internal-error")}}resolve(e){_t(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){_t(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bi=new St(2e3,1e4);async function ji(e,t,n){if(ze(e.app))return Promise.reject(ft(e,"operation-not-supported-in-this-environment"));const r=An(e);gt(e,t,or);const i=Li(r,n);return new zi(r,"signInViaPopup",t,i).executeNotNull()}class zi extends qi{constructor(e,t,n,r,i){super(e,t,r,i),this.provider=n,this.authWindow=null,this.pollId=null,zi.currentPopupAction&&zi.currentPopupAction.cancel(),zi.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return vt(e,this.auth,"internal-error"),e}async onExecution(){_t(1===this.filter.length,"Popup operations only handle one event");const e=li();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(ft(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return(null==(e=this.authWindow)?void 0:e.associatedEvent)||null}cancel(){this.reject(ft(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,zi.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;(null==(n=null==(t=this.authWindow)?void 0:t.window)?void 0:n.closed)?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ft(this.auth,"popup-closed-by-user"))},8e3):this.pollId=window.setTimeout(e,Bi.get())};e()}}zi.currentPopupAction=null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const $i=new Map;class Gi extends qi{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=$i.get(this.auth._key());if(!e){try{const t=await async function(e,t){const n=Qi(t),r=Wi(e);if(!(await r._isAvailable()))return!1;const i="true"===await r._get(n);return await r._remove(n),i}(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}$i.set(this.auth._key(),e)}return this.bypassAuthState||$i.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}async function Ki(e,t){return Wi(e)._set(Qi(t),"true")}function Hi(e,t){$i.set(e._key(),t)}function Wi(e){return on(e._redirectPersistence)}function Qi(e){return un("pendingRedirect",e.config.apiKey,e.name)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ji(e,t,n=!1){if(ze(e.app))return Promise.reject(mt(e));const r=An(e),i=Li(r,t),s=new Gi(r,i,n),o=await s.execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,t)),o}async function Yi(e){const t=li(`${e.uid}:::`);return e._redirectEventId=t,await e.auth._setRedirectUser(e),await e.auth._persistUserIfCurrent(e),t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return es(e);default:return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!es(e)){const r=(null==(n=e.error.code)?void 0:n.split("auth/")[1])||"internal-error";t.onError(ft(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(Zi(e))}saveEventToCache(e){this.cachedEventUids.add(Zi(e)),this.lastProcessedEventTime=Date.now()}}function Zi(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function es({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===(null==t?void 0:t.code)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ts=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,ns=/^https?/;async function rs(e){if(e.config.emulator)return;const{authorizedDomains:t}=await async function(e,t={}){return Ot(e,"GET","/v1/projects",t)}(e);for(const n of t)try{if(is(n))return}catch{}dt(e,"unauthorized-domain")}function is(e){const t=It(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const i=new URL(e);return""===i.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!ns.test(n))return!1;if(ts.test(e))return r===e;const i=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ss=new St(3e4,6e4);function os(){const e=di().___jsl;if(null==e?void 0:e.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}function as(e){return new Promise((t,n)=>{var r,i,s;function o(){os(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{os(),n(ft(e,"network-request-failed"))},timeout:ss.get()})}if(null==(i=null==(r=di().gapi)?void 0:r.iframes)?void 0:i.Iframe)t(gapi.iframes.getContext());else{if(!(null==(s=di().gapi)?void 0:s.load)){const t=Dn("iframefcb");return di()[t]=()=>{gapi.load?o():n(ft(e,"network-request-failed"))},Nn(`${kn.gapiScript}?onload=${t}`).catch(e=>n(e))}o()}}).catch(e=>{throw cs=null,e})}let cs=null;
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const us=new St(5e3,15e3),ls={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},hs=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function ds(e){const t=e.config;vt(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?At(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,r={apiKey:t.apiKey,appName:e.name,v:Ke},i=hs.get(e.config.apiHost);i&&(r.eid=i);const s=e._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${E(r).slice(1)}`}async function fs(e){const t=await function(e){return cs=cs||as(e),cs}(e),n=di().gapi;return vt(n,e,"internal-error"),t.open({where:document.body,url:ds(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ls,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});const i=ft(e,"network-request-failed"),s=di().setTimeout(()=>{r(i)},us.get());function o(){di().clearTimeout(s),n(t)}t.ping(o).then(o,()=>{r(i)})}))}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ps={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class ms{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function gs(e,t,n,r=500,i=600){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c={...ps,width:r.toString(),height:i.toString(),top:s,left:o},u=p().toLowerCase();n&&(a=pn(u)?"_blank":n),dn(u)&&(t=t||"http://localhost",c.scrollbars="yes");const l=Object.entries(c).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(function(e=p()){var t;return wn(e)&&!!(null==(t=window.navigator)?void 0:t.standalone)}(u)&&"_self"!==a)return function(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t||"",a),new ms(null);const h=window.open(t||"",a,l);vt(h,e,"popup-blocked");try{h.focus()}catch(d){}return new ms(h)}const ys="__/auth/handler",vs="emulator/auth/handler",ws=encodeURIComponent("fac");async function _s(e,t,n,r,i,s){vt(e.config.authDomain,e,"auth-domain-config-required"),vt(e.config.apiKey,e,"invalid-api-key");const o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:Ke,eventId:i};if(t instanceof or){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||"",function(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries({}))o[e]=t}if(t instanceof ar){const e=t.getScopes().filter(e=>""!==e);e.length>0&&(o.scopes=e.join(","))}e.tenantId&&(o.tid=e.tenantId);const a=o;for(const l of Object.keys(a))void 0===a[l]&&delete a[l];const c=await e._getAppCheckToken(),u=c?`#${ws}=${encodeURIComponent(c)}`:"";return`${function({config:e}){if(!e.emulator)return`https://${e.authDomain}/${ys}`;return At(e,vs)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)}?${E(a).slice(1)}${u}`}const Is="webStorageSupport";const Ts=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ci,this._completeRedirectFn=Ji,this._overrideRedirectResult=Hi}async _openPopup(e,t,n,r){var i;_t(null==(i=this.eventManagers[e._key()])?void 0:i.manager,"_initialize() not called before _openPopup()");return gs(e,await _s(e,t,n,It(),r),li())}async _openRedirect(e,t,n,r){await this._originValidation(e);return function(e){di().location.href=e}(await _s(e,t,n,It(),r)),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(_t(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await fs(e),n=new Xi(e);return t.register("authEvent",t=>{vt(null==t?void 0:t.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Is,{type:Is},n=>{var r;const i=null==(r=null==n?void 0:n[0])?void 0:r[Is];void 0!==i&&t(!!i),dt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=rs(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return In()||fn()||wn()}};class bs{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return wt("unexpected MultiFactorSessionType")}}}class Es extends bs{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new Es(e)}_finalizeEnroll(e,t,n){return function(e,t){return Ot(e,"POST","/v2/accounts/mfaEnrollment:finalize",Rt(e,t))}(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return function(e,t){return Ot(e,"POST","/v2/accounts/mfaSignIn:finalize",Rt(e,t))}(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class Ss{constructor(){}static assertion(e){return Es._fromCredential(e)}}Ss.FACTOR_ID="phone";class As{static assertionForEnrollment(e,t){return Cs._fromSecret(e,t)}static assertionForSignIn(e,t){return Cs._fromEnrollmentId(e,t)}static async generateSecret(e){var t;const n=e;vt(void 0!==(null==(t=n.user)?void 0:t.auth),"internal-error");const r=await(i=n.user.auth,s={idToken:n.credential,totpEnrollmentInfo:{}},Ot(i,"POST","/v2/accounts/mfaEnrollment:start",Rt(i,s)));var i,s;return ks._fromStartTotpMfaEnrollmentResponse(r,n.user.auth)}}As.FACTOR_ID="totp";class Cs extends bs{constructor(e,t,n){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=n}static _fromSecret(e,t){return new Cs(t,void 0,e)}static _fromEnrollmentId(e,t){return new Cs(t,e)}async _finalizeEnroll(e,t,n){return vt(void 0!==this.secret,e,"argument-error"),function(e,t){return Ot(e,"POST","/v2/accounts/mfaEnrollment:finalize",Rt(e,t))}(e,{idToken:t,displayName:n,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){vt(void 0!==this.enrollmentId&&void 0!==this.otp,e,"argument-error");const n={verificationCode:this.otp};return function(e,t){return Ot(e,"POST","/v2/accounts/mfaSignIn:finalize",Rt(e,t))}(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:n})}}class ks{constructor(e,t,n,r,i,s,o){this.sessionInfo=s,this.auth=o,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=n,this.codeIntervalSeconds=r,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new ks(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var n;let r=!1;return(Ns(e)||Ns(t))&&(r=!0),r&&(Ns(e)&&(e=(null==(n=this.auth.currentUser)?void 0:n.email)||"unknownuser"),Ns(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function Ns(e){return void 0===e||0===(null==e?void 0:e.length)}var Ds="@firebase/auth",Rs="1.13.0";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Os{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null==(e=this.auth.currentUser)?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){vt(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ps=h("authIdTokenMaxAge")||300;let xs=null;function Ls(e=We()){const t=je(e,"auth");if(t.isInitialized())return t.getImmediate();const n=Bn(e,{popupRedirectResolver:Ts,persistence:[bi,ni,ci]}),r=h("authTokenSyncURL");if(r&&"boolean"==typeof isSecureContext&&isSecureContext){const e=new URL(r,location.origin);if(location.origin===e.origin){const t=(i=e.toString(),async e=>{const t=e&&await e.getIdTokenResult(),n=t&&((new Date).getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>Ps)return;const r=null==t?void 0:t.token;xs!==r&&(xs=r,await fetch(i,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))});Gr(n,t,()=>t(n.currentUser)),$r(n,e=>t(e))}}var i;const s=c("auth");return s&&jn(n,`http://${s}`),n}var Ms;kn={loadJS:e=>new Promise((t,n)=>{const r=document.createElement("script");var i;r.setAttribute("src",e),r.onload=t,r.onerror=e=>{const t=ft("internal-error");t.customData=e,n(t)},r.type="text/javascript",r.charset="UTF-8",((null==(i=document.getElementsByTagName("head"))?void 0:i[0])??document).appendChild(r)}),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},Ms="Browser",Be(new O("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:s,authDomain:o}=n.options;vt(s&&!s.includes(":"),"invalid-api-key",{appName:n.name});const a={apiKey:s,authDomain:o,clientPlatform:Ms,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Tn(Ms)},c=new Sn(n,r,i,a);return function(e,t){const n=(null==t?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(on);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,null==t?void 0:t.popupRedirectResolver)}(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),Be(new O("auth-internal",e=>{const t=An(e.getProvider("auth").getImmediate());return new Os(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Qe(Ds,Rs,function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(Ms)),Qe(Ds,Rs,"esm2020");const Fs=Object.freeze(Object.defineProperty({__proto__:null,ActionCodeOperation:{EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"},ActionCodeURL:ir,AuthCredential:Gn,AuthErrorCodes:{ADMIN_ONLY_OPERATION:"auth/admin-restricted-operation",ARGUMENT_ERROR:"auth/argument-error",APP_NOT_AUTHORIZED:"auth/app-not-authorized",APP_NOT_INSTALLED:"auth/app-not-installed",CAPTCHA_CHECK_FAILED:"auth/captcha-check-failed",CODE_EXPIRED:"auth/code-expired",CORDOVA_NOT_READY:"auth/cordova-not-ready",CORS_UNSUPPORTED:"auth/cors-unsupported",CREDENTIAL_ALREADY_IN_USE:"auth/credential-already-in-use",CREDENTIAL_MISMATCH:"auth/custom-token-mismatch",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"auth/requires-recent-login",DEPENDENT_SDK_INIT_BEFORE_AUTH:"auth/dependent-sdk-initialized-before-auth",DYNAMIC_LINK_NOT_ACTIVATED:"auth/dynamic-link-not-activated",EMAIL_CHANGE_NEEDS_VERIFICATION:"auth/email-change-needs-verification",EMAIL_EXISTS:"auth/email-already-in-use",EMULATOR_CONFIG_FAILED:"auth/emulator-config-failed",EXPIRED_OOB_CODE:"auth/expired-action-code",EXPIRED_POPUP_REQUEST:"auth/cancelled-popup-request",INTERNAL_ERROR:"auth/internal-error",INVALID_API_KEY:"auth/invalid-api-key",INVALID_APP_CREDENTIAL:"auth/invalid-app-credential",INVALID_APP_ID:"auth/invalid-app-id",INVALID_AUTH:"auth/invalid-user-token",INVALID_AUTH_EVENT:"auth/invalid-auth-event",INVALID_CERT_HASH:"auth/invalid-cert-hash",INVALID_CODE:"auth/invalid-verification-code",INVALID_CONTINUE_URI:"auth/invalid-continue-uri",INVALID_CORDOVA_CONFIGURATION:"auth/invalid-cordova-configuration",INVALID_CUSTOM_TOKEN:"auth/invalid-custom-token",INVALID_DYNAMIC_LINK_DOMAIN:"auth/invalid-dynamic-link-domain",INVALID_EMAIL:"auth/invalid-email",INVALID_EMULATOR_SCHEME:"auth/invalid-emulator-scheme",INVALID_IDP_RESPONSE:"auth/invalid-credential",INVALID_LOGIN_CREDENTIALS:"auth/invalid-credential",INVALID_MESSAGE_PAYLOAD:"auth/invalid-message-payload",INVALID_MFA_SESSION:"auth/invalid-multi-factor-session",INVALID_OAUTH_CLIENT_ID:"auth/invalid-oauth-client-id",INVALID_OAUTH_PROVIDER:"auth/invalid-oauth-provider",INVALID_OOB_CODE:"auth/invalid-action-code",INVALID_ORIGIN:"auth/unauthorized-domain",INVALID_PASSWORD:"auth/wrong-password",INVALID_PERSISTENCE:"auth/invalid-persistence-type",INVALID_PHONE_NUMBER:"auth/invalid-phone-number",INVALID_PROVIDER_ID:"auth/invalid-provider-id",INVALID_RECIPIENT_EMAIL:"auth/invalid-recipient-email",INVALID_SENDER:"auth/invalid-sender",INVALID_SESSION_INFO:"auth/invalid-verification-id",INVALID_TENANT_ID:"auth/invalid-tenant-id",MFA_INFO_NOT_FOUND:"auth/multi-factor-info-not-found",MFA_REQUIRED:"auth/multi-factor-auth-required",MISSING_ANDROID_PACKAGE_NAME:"auth/missing-android-pkg-name",MISSING_APP_CREDENTIAL:"auth/missing-app-credential",MISSING_AUTH_DOMAIN:"auth/auth-domain-config-required",MISSING_CODE:"auth/missing-verification-code",MISSING_CONTINUE_URI:"auth/missing-continue-uri",MISSING_IFRAME_START:"auth/missing-iframe-start",MISSING_IOS_BUNDLE_ID:"auth/missing-ios-bundle-id",MISSING_OR_INVALID_NONCE:"auth/missing-or-invalid-nonce",MISSING_MFA_INFO:"auth/missing-multi-factor-info",MISSING_MFA_SESSION:"auth/missing-multi-factor-session",MISSING_PHONE_NUMBER:"auth/missing-phone-number",MISSING_PASSWORD:"auth/missing-password",MISSING_SESSION_INFO:"auth/missing-verification-id",MODULE_DESTROYED:"auth/app-deleted",NEED_CONFIRMATION:"auth/account-exists-with-different-credential",NETWORK_REQUEST_FAILED:"auth/network-request-failed",NULL_USER:"auth/null-user",NO_AUTH_EVENT:"auth/no-auth-event",NO_SUCH_PROVIDER:"auth/no-such-provider",OPERATION_NOT_ALLOWED:"auth/operation-not-allowed",OPERATION_NOT_SUPPORTED:"auth/operation-not-supported-in-this-environment",POPUP_BLOCKED:"auth/popup-blocked",POPUP_CLOSED_BY_USER:"auth/popup-closed-by-user",PROVIDER_ALREADY_LINKED:"auth/provider-already-linked",QUOTA_EXCEEDED:"auth/quota-exceeded",REDIRECT_CANCELLED_BY_USER:"auth/redirect-cancelled-by-user",REDIRECT_OPERATION_PENDING:"auth/redirect-operation-pending",REJECTED_CREDENTIAL:"auth/rejected-credential",SECOND_FACTOR_ALREADY_ENROLLED:"auth/second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"auth/maximum-second-factor-count-exceeded",TENANT_ID_MISMATCH:"auth/tenant-id-mismatch",TIMEOUT:"auth/timeout",TOKEN_EXPIRED:"auth/user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"auth/too-many-requests",UNAUTHORIZED_DOMAIN:"auth/unauthorized-continue-uri",UNSUPPORTED_FIRST_FACTOR:"auth/unsupported-first-factor",UNSUPPORTED_PERSISTENCE:"auth/unsupported-persistence-type",UNSUPPORTED_TENANT_OPERATION:"auth/unsupported-tenant-operation",UNVERIFIED_EMAIL:"auth/unverified-email",USER_CANCELLED:"auth/user-cancelled",USER_DELETED:"auth/user-not-found",USER_DISABLED:"auth/user-disabled",USER_MISMATCH:"auth/user-mismatch",USER_SIGNED_OUT:"auth/user-signed-out",WEAK_PASSWORD:"auth/weak-password",WEB_STORAGE_UNSUPPORTED:"auth/web-storage-unsupported",ALREADY_INITIALIZED:"auth/already-initialized",RECAPTCHA_NOT_ENABLED:"auth/recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"auth/missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"auth/invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"auth/invalid-recaptcha-action",MISSING_CLIENT_TYPE:"auth/missing-client-type",MISSING_RECAPTCHA_VERSION:"auth/missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"auth/invalid-recaptcha-version",INVALID_REQ_TYPE:"auth/invalid-req-type",INVALID_HOSTING_LINK_DOMAIN:"auth/invalid-hosting-link-domain"},EmailAuthCredential:Xn,EmailAuthProvider:sr,FacebookAuthProvider:ur,FactorId:{PHONE:"phone",TOTP:"totp"},GithubAuthProvider:hr,GoogleAuthProvider:lr,OAuthCredential:er,OAuthProvider:cr,OperationType:{LINK:"link",REAUTHENTICATE:"reauthenticate",SIGN_IN:"signIn"},PhoneAuthCredential:rr,PhoneAuthProvider:xi,PhoneMultiFactorGenerator:Ss,ProviderId:{FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",PHONE:"phone",TWITTER:"twitter.com"},RecaptchaVerifier:class{constructor(e,t,n={...Di}){this.parameters=n,this.type=Ni,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=An(e),this.isInvisible="invisible"===this.parameters.size,vt("undefined"!=typeof document,this.auth,"operation-not-supported-in-this-environment");const r="string"==typeof t?document.getElementById(t):t;vt(r,this.auth,"argument-error"),this.container=r,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new ki:new Ci,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),n=t.getResponse(e);return n||new Promise(n=>{const r=e=>{e&&(this.tokenChangeListeners.delete(r),n(e))};this.tokenChangeListeners.add(r),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise||(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e})),this.renderPromise}_reset(){this.assertNotDestroyed(),null!==this.widgetId&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){vt(!this.parameters.sitekey,this.auth,"argument-error"),vt(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),vt("undefined"!=typeof document,this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(e=>e(t)),"function"==typeof e)e(t);else if("string"==typeof e){const n=di()[e];"function"==typeof n&&n(t)}}}assertNotDestroyed(){vt(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){vt(Tt()&&!fi(),this.auth,"internal-error"),await function(){let e=null;return new Promise(t=>{"complete"!==document.readyState?(e=()=>t(),window.addEventListener("load",e)):t()}).catch(t=>{throw e&&window.removeEventListener("load",e),t})}(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await async function(e){return(await Ot(e,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}(this.auth);vt(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return vt(this.recaptcha,this.auth,"internal-error"),this.recaptcha}},SAMLAuthProvider:fr,SignInMethod:{EMAIL_LINK:"emailLink",EMAIL_PASSWORD:"password",FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PHONE:"phone",TWITTER:"twitter.com"},TotpMultiFactorGenerator:As,TotpSecret:ks,TwitterAuthProvider:pr,applyActionCode:async function(e,t){await async function(e,t){return Ot(e,"POST","/v1/accounts:update",Rt(e,t))}(N(e),{oobCode:t})},beforeAuthStateChanged:Gr,browserCookiePersistence:oi,browserLocalPersistence:ni,browserPopupRedirectResolver:Ts,browserSessionPersistence:ci,checkActionCode:xr,confirmPasswordReset:async function(e,t,n){await Kn(N(e),{oobCode:t,newPassword:n}).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&Pr(e),t})},connectAuthEmulator:jn,createUserWithEmailAndPassword:Lr,debugErrorMap:at,deleteUser:async function(e){return N(e).delete()},fetchSignInMethodsForEmail:
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e,t){const n={identifier:t,continueUri:Tt()?It():"http://localhost"},{signinMethods:r}=
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */await async function(e,t){return Ot(e,"POST","/v1/accounts:createAuthUri",Rt(e,t))}(N(e),n);return r||[]},getAdditionalUserInfo:function(e){const{user:t,_tokenResponse:n}=e;return t.isAnonymous&&!n?{providerId:null,isNewUser:!1,profile:null}:function(e){var t,n;if(!e)return null;const{providerId:r}=e,i=e.rawUserInfo?JSON.parse(e.rawUserInfo):{},s=e.isNewUser||"identitytoolkit#SignupNewUserResponse"===e.kind;if(!r&&(null==e?void 0:e.idToken)){const r=null==(n=null==(t=Ht(e.idToken))?void 0:t.firebase)?void 0:n.sign_in_provider;if(r)return new Vr(s,"anonymous"!==r&&"custom"!==r?r:null)}if(!r)return null;switch(r){case"facebook.com":return new qr(s,i);case"github.com":return new Br(s,i);case"google.com":return new jr(s,i);case"twitter.com":return new zr(s,i,e.screenName||null);case"custom":case"anonymous":return new Vr(s,null);default:return new Vr(s,r,i)}}(n)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,getAuth:Ls,getIdToken:function(e,t=!1){return N(e).getIdToken(t)},getIdTokenResult:Gt,getMultiFactorResolver:function(e,t){var n;const r=N(e),i=t;return vt(t.customData.operationType,r,"argument-error"),vt(null==(n=i.customData._serverResponse)?void 0:n.mfaPendingCredential,r,"argument-error"),Qr._fromError(r,i)},getRedirectResult:async function(e,t){return await An(e)._initializationPromise,Ji(e,t,!1)},inMemoryPersistence:cn,indexedDBLocalPersistence:bi,initializeAuth:Bn,initializeRecaptchaConfig:function(e){return qn(e)},isSignInWithEmailLink:function(e,t){const n=ir.parseLink(t);return"EMAIL_SIGNIN"===(null==n?void 0:n.operation)},linkWithCredential:Cr,linkWithPhoneNumber:async function(e,t,n){const r=N(e);await br(!1,r,"phone");const i=await Oi(r.auth,t,N(n));return new Ri(i,e=>Cr(r,e))},linkWithPopup:async function(e,t,n){const r=N(e);gt(r.auth,t,or);const i=Li(r.auth,n);return new zi(r.auth,"linkViaPopup",t,i,r).executeNotNull()},linkWithRedirect:function(e,t,n){return async function(e,t,n){const r=N(e);gt(r.auth,t,or),await r.auth._initializationPromise;const i=Li(r.auth,n);await br(!1,r,t.providerId),await Ki(i,r.auth);const s=await Yi(r);return i._openRedirect(r.auth,t,"linkViaRedirect",s)}(e,t,n)},multiFactor:function(e){const t=N(e);return Xr.has(t)||Xr.set(t,Yr._fromUser(t)),Xr.get(t)},onAuthStateChanged:Kr,onIdTokenChanged:$r,parseActionCodeURL:function(e){return ir.parseLink(e)},prodErrorMap:ct,reauthenticateWithCredential:kr,reauthenticateWithPhoneNumber:async function(e,t,n){const r=N(e);if(ze(r.auth.app))return Promise.reject(mt(r.auth));const i=await Oi(r.auth,t,N(n));return new Ri(i,e=>kr(r,e))},reauthenticateWithPopup:async function(e,t,n){const r=N(e);if(ze(r.auth.app))return Promise.reject(ft(r.auth,"operation-not-supported-in-this-environment"));gt(r.auth,t,or);const i=Li(r.auth,n);return new zi(r.auth,"reauthViaPopup",t,i,r).executeNotNull()},reauthenticateWithRedirect:function(e,t,n){return async function(e,t,n){const r=N(e);if(gt(r.auth,t,or),ze(r.auth.app))return Promise.reject(mt(r.auth));await r.auth._initializationPromise;const i=Li(r.auth,n);await Ki(i,r.auth);const s=await Yi(r);return i._openRedirect(r.auth,t,"reauthViaRedirect",s)}(e,t,n)},reload:Zt,revokeAccessToken:function(e,t){return An(e).revokeAccessToken(t)},sendEmailVerification:async function(e,t){const n=N(e),r={requestType:"VERIFY_EMAIL",idToken:await e.getIdToken()};t&&Or(n.auth,r,t);const{email:i}=await async function(e,t){return Qn(e,t)}(n.auth,r);i!==e.email&&await e.reload()},sendPasswordResetEmail:async function(e,t,n){const r=An(e),i={requestType:"PASSWORD_RESET",email:t,clientType:"CLIENT_TYPE_WEB"};n&&Or(r,i,n),await Un(r,i,"getOobCode",Jn,"EMAIL_PASSWORD_PROVIDER")},sendSignInLinkToEmail:async function(e,t,n){const r=An(e),i={requestType:"EMAIL_SIGNIN",email:t,clientType:"CLIENT_TYPE_WEB"};var s,o;s=i,vt((o=n).handleCodeInApp,r,"argument-error"),o&&Or(r,s,o),await Un(r,i,"getOobCode",Yn,"EMAIL_PASSWORD_PROVIDER")},setPersistence:function(e,t){return N(e).setPersistence(t)},signInAnonymously:vr,signInWithCredential:Ar,signInWithCustomToken:
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e,t){if(ze(e.app))return Promise.reject(mt(e));const n=An(e),r=await async function(e,t){return xt(e,"POST","/v1/accounts:signInWithCustomToken",Rt(e,t))}(n,{token:t,returnSecureToken:!0}),i=await gr._fromIdTokenResponse(n,"signIn",r);return await n._updateCurrentUser(i.user),i},signInWithEmailAndPassword:Mr,signInWithEmailLink:async function(e,t,n){if(ze(e.app))return Promise.reject(mt(e));const r=N(e),i=sr.credentialWithLink(t,n||It());return vt(i._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),Ar(r,i)},signInWithPhoneNumber:async function(e,t,n){if(ze(e.app))return Promise.reject(mt(e));const r=An(e),i=await Oi(r,t,N(n));return new Ri(i,e=>Ar(r,e))},signInWithPopup:ji,signInWithRedirect:function(e,t,n){return async function(e,t,n){if(ze(e.app))return Promise.reject(mt(e));const r=An(e);gt(e,t,or),await r._initializationPromise;const i=Li(r,n);return await Ki(i,r),i._openRedirect(r,t,"signInViaRedirect")}(e,t,n)},signOut:Hr,unlink:async function(e,t){const n=N(e);await br(!0,n,t);const{providerUserInfo:r}=await async function(e,t){return Ot(e,"POST","/v1/accounts:update",t)}(n.auth,{idToken:await n.getIdToken(),deleteProvider:[t]}),i=Ir(r||[]);return n.providerData=n.providerData.filter(e=>i.has(e.providerId)),i.has("phone")||(n.phoneNumber=null),await n.auth._persistUserIfCurrent(n),n},updateCurrentUser:function(e,t){return N(e).updateCurrentUser(t)},updateEmail:function(e,t){const n=N(e);return ze(n.auth.app)?Promise.reject(mt(n.auth)):Fr(n,t,null)},updatePassword:function(e,t){return Fr(N(e),null,t)},updatePhoneNumber:async function(e,t){const n=N(e);if(ze(n.auth.app))return Promise.reject(mt(n.auth));await Tr(n,t)},updateProfile:
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e,{displayName:t,photoURL:n}){if(void 0===t&&void 0===n)return;const r=N(e),i={idToken:await r.getIdToken(),displayName:t,photoUrl:n,returnSecureToken:!0},s=await Qt(r,
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e,t){return Ot(e,"POST","/v1/accounts:update",t)}(r.auth,i));r.displayName=s.displayName||null,r.photoURL=s.photoUrl||null;const o=r.providerData.find(({providerId:e})=>"password"===e);o&&(o.displayName=r.displayName,o.photoURL=r.photoURL),await r._updateTokensIfNecessary(s)},useDeviceLanguage:function(e){N(e).useDeviceLanguage()},validatePassword:async function(e,t){return An(e).validatePassword(t)},verifyBeforeUpdateEmail:async function(e,t,n){const r=N(e),i={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await e.getIdToken(),newEmail:t};n&&Or(r.auth,i,n);const{email:s}=await async function(e,t){return Qn(e,t)}(r.auth,i);s!==e.email&&await e.reload()},verifyPasswordResetCode:async function(e,t){const{data:n}=await xr(N(e),t);return n.email}},Symbol.toStringTag,{value:"Module"}));var Vs,Us,qs="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var e;
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */function t(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}function n(e,t,n){n||(n=0);const r=Array(16);if("string"==typeof t)for(var i=0;i<16;++i)r[i]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(i=0;i<16;++i)r[i]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],i=e.g[2];let s,o=e.g[3];s=t+(o^n&(i^o))+r[0]+3614090360&4294967295,s=o+(i^(t=n+(s<<7&4294967295|s>>>25))&(n^i))+r[1]+3905402710&4294967295,o=t+(s<<12&4294967295|s>>>20),s=i+(n^o&(t^n))+r[2]+606105819&4294967295,s=n+(t^(i=o+(s<<17&4294967295|s>>>15))&(o^t))+r[3]+3250441966&4294967295,s=t+(o^(n=i+(s<<22&4294967295|s>>>10))&(i^o))+r[4]+4118548399&4294967295,s=o+(i^(t=n+(s<<7&4294967295|s>>>25))&(n^i))+r[5]+1200080426&4294967295,o=t+(s<<12&4294967295|s>>>20),s=i+(n^o&(t^n))+r[6]+2821735955&4294967295,s=n+(t^(i=o+(s<<17&4294967295|s>>>15))&(o^t))+r[7]+4249261313&4294967295,s=t+(o^(n=i+(s<<22&4294967295|s>>>10))&(i^o))+r[8]+1770035416&4294967295,s=o+(i^(t=n+(s<<7&4294967295|s>>>25))&(n^i))+r[9]+2336552879&4294967295,o=t+(s<<12&4294967295|s>>>20),s=i+(n^o&(t^n))+r[10]+4294925233&4294967295,s=n+(t^(i=o+(s<<17&4294967295|s>>>15))&(o^t))+r[11]+2304563134&4294967295,s=t+(o^(n=i+(s<<22&4294967295|s>>>10))&(i^o))+r[12]+1804603682&4294967295,s=o+(i^(t=n+(s<<7&4294967295|s>>>25))&(n^i))+r[13]+4254626195&4294967295,o=t+(s<<12&4294967295|s>>>20),s=i+(n^o&(t^n))+r[14]+2792965006&4294967295,s=n+(t^(i=o+(s<<17&4294967295|s>>>15))&(o^t))+r[15]+1236535329&4294967295,s=t+(i^o&((n=i+(s<<22&4294967295|s>>>10))^i))+r[1]+4129170786&4294967295,s=o+(n^i&((t=n+(s<<5&4294967295|s>>>27))^n))+r[6]+3225465664&4294967295,o=t+(s<<9&4294967295|s>>>23),s=i+(t^n&(o^t))+r[11]+643717713&4294967295,s=n+(o^t&((i=o+(s<<14&4294967295|s>>>18))^o))+r[0]+3921069994&4294967295,s=t+(i^o&((n=i+(s<<20&4294967295|s>>>12))^i))+r[5]+3593408605&4294967295,s=o+(n^i&((t=n+(s<<5&4294967295|s>>>27))^n))+r[10]+38016083&4294967295,o=t+(s<<9&4294967295|s>>>23),s=i+(t^n&(o^t))+r[15]+3634488961&4294967295,s=n+(o^t&((i=o+(s<<14&4294967295|s>>>18))^o))+r[4]+3889429448&4294967295,s=t+(i^o&((n=i+(s<<20&4294967295|s>>>12))^i))+r[9]+568446438&4294967295,s=o+(n^i&((t=n+(s<<5&4294967295|s>>>27))^n))+r[14]+3275163606&4294967295,o=t+(s<<9&4294967295|s>>>23),s=i+(t^n&(o^t))+r[3]+4107603335&4294967295,s=n+(o^t&((i=o+(s<<14&4294967295|s>>>18))^o))+r[8]+1163531501&4294967295,s=t+(i^o&((n=i+(s<<20&4294967295|s>>>12))^i))+r[13]+2850285829&4294967295,s=o+(n^i&((t=n+(s<<5&4294967295|s>>>27))^n))+r[2]+4243563512&4294967295,o=t+(s<<9&4294967295|s>>>23),s=i+(t^n&(o^t))+r[7]+1735328473&4294967295,s=n+(o^t&((i=o+(s<<14&4294967295|s>>>18))^o))+r[12]+2368359562&4294967295,s=t+((n=i+(s<<20&4294967295|s>>>12))^i^o)+r[5]+4294588738&4294967295,s=o+((t=n+(s<<4&4294967295|s>>>28))^n^i)+r[8]+2272392833&4294967295,o=t+(s<<11&4294967295|s>>>21),s=i+(o^t^n)+r[11]+1839030562&4294967295,s=n+((i=o+(s<<16&4294967295|s>>>16))^o^t)+r[14]+4259657740&4294967295,s=t+((n=i+(s<<23&4294967295|s>>>9))^i^o)+r[1]+2763975236&4294967295,s=o+((t=n+(s<<4&4294967295|s>>>28))^n^i)+r[4]+1272893353&4294967295,o=t+(s<<11&4294967295|s>>>21),s=i+(o^t^n)+r[7]+4139469664&4294967295,s=n+((i=o+(s<<16&4294967295|s>>>16))^o^t)+r[10]+3200236656&4294967295,s=t+((n=i+(s<<23&4294967295|s>>>9))^i^o)+r[13]+681279174&4294967295,s=o+((t=n+(s<<4&4294967295|s>>>28))^n^i)+r[0]+3936430074&4294967295,o=t+(s<<11&4294967295|s>>>21),s=i+(o^t^n)+r[3]+3572445317&4294967295,s=n+((i=o+(s<<16&4294967295|s>>>16))^o^t)+r[6]+76029189&4294967295,s=t+((n=i+(s<<23&4294967295|s>>>9))^i^o)+r[9]+3654602809&4294967295,s=o+((t=n+(s<<4&4294967295|s>>>28))^n^i)+r[12]+3873151461&4294967295,o=t+(s<<11&4294967295|s>>>21),s=i+(o^t^n)+r[15]+530742520&4294967295,s=n+((i=o+(s<<16&4294967295|s>>>16))^o^t)+r[2]+3299628645&4294967295,s=t+(i^((n=i+(s<<23&4294967295|s>>>9))|~o))+r[0]+4096336452&4294967295,s=o+(n^((t=n+(s<<6&4294967295|s>>>26))|~i))+r[7]+1126891415&4294967295,o=t+(s<<10&4294967295|s>>>22),s=i+(t^(o|~n))+r[14]+2878612391&4294967295,s=n+(o^((i=o+(s<<15&4294967295|s>>>17))|~t))+r[5]+4237533241&4294967295,s=t+(i^((n=i+(s<<21&4294967295|s>>>11))|~o))+r[12]+1700485571&4294967295,s=o+(n^((t=n+(s<<6&4294967295|s>>>26))|~i))+r[3]+2399980690&4294967295,o=t+(s<<10&4294967295|s>>>22),s=i+(t^(o|~n))+r[10]+4293915773&4294967295,s=n+(o^((i=o+(s<<15&4294967295|s>>>17))|~t))+r[1]+2240044497&4294967295,s=t+(i^((n=i+(s<<21&4294967295|s>>>11))|~o))+r[8]+1873313359&4294967295,s=o+(n^((t=n+(s<<6&4294967295|s>>>26))|~i))+r[15]+4264355552&4294967295,o=t+(s<<10&4294967295|s>>>22),s=i+(t^(o|~n))+r[6]+2734768916&4294967295,s=n+(o^((i=o+(s<<15&4294967295|s>>>17))|~t))+r[13]+1309151649&4294967295,s=t+(i^((n=i+(s<<21&4294967295|s>>>11))|~o))+r[4]+4149444226&4294967295,s=o+(n^((t=n+(s<<6&4294967295|s>>>26))|~i))+r[11]+3174756917&4294967295,o=t+(s<<10&4294967295|s>>>22),s=i+(t^(o|~n))+r[2]+718787259&4294967295,s=n+(o^((i=o+(s<<15&4294967295|s>>>17))|~t))+r[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(i+(s<<21&4294967295|s>>>11))&4294967295,e.g[2]=e.g[2]+i&4294967295,e.g[3]=e.g[3]+o&4294967295}function r(e,t){this.h=t;const n=[];let r=!0;for(let i=e.length-1;i>=0;i--){const s=0|e[i];r&&s==t||(n[i]=s,r=!1)}this.g=n}!function(e,t){function n(){}n.prototype=t.prototype,e.F=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.D=function(e,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[n].apply(e,i)}}(t,function(){this.blockSize=-1}),t.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},t.prototype.v=function(e,t){void 0===t&&(t=e.length);const r=t-this.blockSize,i=this.C;let s=this.h,o=0;for(;o<t;){if(0==s)for(;o<=r;)n(this,e,o),o+=this.blockSize;if("string"==typeof e){for(;o<t;)if(i[s++]=e.charCodeAt(o++),s==this.blockSize){n(this,i),s=0;break}}else for(;o<t;)if(i[s++]=e[o++],s==this.blockSize){n(this,i),s=0;break}}this.h=s,this.o+=t},t.prototype.A=function(){var e=Array((this.h<56?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;t=8*this.o;for(var n=e.length-8;n<e.length;++n)e[n]=255&t,t/=256;for(this.v(e),e=Array(16),t=0,n=0;n<4;++n)for(let r=0;r<32;r+=8)e[t++]=this.g[n]>>>r&255;return e};var i={};function s(e){return-128<=e&&e<128?function(e,t){var n=i;return Object.prototype.hasOwnProperty.call(n,e)?n[e]:n[e]=t(e)}(e,function(e){return new r([0|e],e<0?-1:0)}):new r([0|e],e<0?-1:0)}function o(e){if(isNaN(e)||!isFinite(e))return a;if(e<0)return d(o(-e));const t=[];let n=1;for(let r=0;e>=n;r++)t[r]=e/n|0,n*=4294967296;return new r(t,0)}var a=s(0),c=s(1),u=s(16777216);function l(e){if(0!=e.h)return!1;for(let t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function h(e){return-1==e.h}function d(e){const t=e.g.length,n=[];for(let r=0;r<t;r++)n[r]=~e.g[r];return new r(n,~e.h).add(c)}function f(e,t){return e.add(d(t))}function p(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function m(e,t){this.g=e,this.h=t}function g(e,t){if(l(t))throw Error("division by zero");if(l(e))return new m(a,a);if(h(e))return t=g(d(e),t),new m(d(t.g),d(t.h));if(h(t))return t=g(e,d(t)),new m(d(t.g),t.h);if(e.g.length>30){if(h(e)||h(t))throw Error("slowDivide_ only works with positive integers.");for(var n=c,r=t;r.l(e)<=0;)n=y(n),r=y(r);var i=v(n,1),s=v(r,1);for(r=v(r,2),n=v(n,2);!l(r);){var u=s.add(r);u.l(e)<=0&&(i=i.add(n),s=u),r=v(r,1),n=v(n,1)}return t=f(e,i.j(t)),new m(i,t)}for(i=a;e.l(t)>=0;){for(n=Math.max(1,Math.floor(e.m()/t.m())),r=(r=Math.ceil(Math.log(n)/Math.LN2))<=48?1:Math.pow(2,r-48),u=(s=o(n)).j(t);h(u)||u.l(e)>0;)u=(s=o(n-=r)).j(t);l(s)&&(s=c),i=i.add(s),e=f(e,u)}return new m(i,e)}function y(e){const t=e.g.length+1,n=[];for(let r=0;r<t;r++)n[r]=e.i(r)<<1|e.i(r-1)>>>31;return new r(n,e.h)}function v(e,t){const n=t>>5;t%=32;const i=e.g.length-n,s=[];for(let r=0;r<i;r++)s[r]=t>0?e.i(r+n)>>>t|e.i(r+n+1)<<32-t:e.i(r+n);return new r(s,e.h)}(e=r.prototype).m=function(){if(h(this))return-d(this).m();let e=0,t=1;for(let n=0;n<this.g.length;n++){const r=this.i(n);e+=(r>=0?r:4294967296+r)*t,t*=4294967296}return e},e.toString=function(e){if((e=e||10)<2||36<e)throw Error("radix out of range: "+e);if(l(this))return"0";if(h(this))return"-"+d(this).toString(e);const t=o(Math.pow(e,6));var n=this;let r="";for(;;){const i=g(n,t).g;let s=(((n=f(n,i.j(t))).g.length>0?n.g[0]:n.h)>>>0).toString(e);if(l(n=i))return s+r;for(;s.length<6;)s="0"+s;r=s+r}},e.i=function(e){return e<0?0:e<this.g.length?this.g[e]:this.h},e.l=function(e){return h(e=f(this,e))?-1:l(e)?0:1},e.abs=function(){return h(this)?d(this):this},e.add=function(e){const t=Math.max(this.g.length,e.g.length),n=[];let i=0;for(let r=0;r<=t;r++){let t=i+(65535&this.i(r))+(65535&e.i(r)),s=(t>>>16)+(this.i(r)>>>16)+(e.i(r)>>>16);i=s>>>16,t&=65535,s&=65535,n[r]=s<<16|t}return new r(n,-2147483648&n[n.length-1]?-1:0)},e.j=function(e){if(l(this)||l(e))return a;if(h(this))return h(e)?d(this).j(d(e)):d(d(this).j(e));if(h(e))return d(this.j(d(e)));if(this.l(u)<0&&e.l(u)<0)return o(this.m()*e.m());const t=this.g.length+e.g.length,n=[];for(var i=0;i<2*t;i++)n[i]=0;for(i=0;i<this.g.length;i++)for(let t=0;t<e.g.length;t++){const r=this.i(i)>>>16,s=65535&this.i(i),o=e.i(t)>>>16,a=65535&e.i(t);n[2*i+2*t]+=s*a,p(n,2*i+2*t),n[2*i+2*t+1]+=r*a,p(n,2*i+2*t+1),n[2*i+2*t+1]+=s*o,p(n,2*i+2*t+1),n[2*i+2*t+2]+=r*o,p(n,2*i+2*t+2)}for(e=0;e<t;e++)n[e]=n[2*e+1]<<16|n[2*e];for(e=t;e<2*t;e++)n[e]=0;return new r(n,0)},e.B=function(e){return g(this,e).h},e.and=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)&e.i(r);return new r(n,this.h&e.h)},e.or=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)|e.i(r);return new r(n,this.h|e.h)},e.xor=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)^e.i(r);return new r(n,this.h^e.h)},t.prototype.digest=t.prototype.A,t.prototype.reset=t.prototype.u,t.prototype.update=t.prototype.v,Us=t,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.B,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=o,r.fromString=function e(t,n){if(0==t.length)throw Error("number format error: empty string");if((n=n||10)<2||36<n)throw Error("radix out of range: "+n);if("-"==t.charAt(0))return d(e(t.substring(1),n));if(t.indexOf("-")>=0)throw Error('number format error: interior "-" character');const r=o(Math.pow(n,8));let i=a;for(let a=0;a<t.length;a+=8){var s=Math.min(8,t.length-a);const e=parseInt(t.substring(a,a+s),n);s<8?(s=o(Math.pow(n,s)),i=i.j(s).add(o(e))):(i=i.j(r),i=i.add(o(e)))}return i},Vs=r}).apply(void 0!==qs?qs:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var Bs,js,zs,$s,Gs,Ks,Hs,Ws,Qs="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var e,t=Object.defineProperty;var n=function(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof Qs&&Qs];for(var t=0;t<e.length;++t){var n=e[t];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);function r(e,r){if(r)e:{var i=n;e=e.split(".");for(var s=0;s<e.length-1;s++){var o=e[s];if(!(o in i))break e;i=i[o]}(r=r(s=i[e=e[e.length-1]]))!=s&&null!=r&&t(i,e,{configurable:!0,writable:!0,value:r})}}r("Symbol.dispose",function(e){return e||Symbol("Symbol.dispose")}),r("Array.prototype.values",function(e){return e||function(){return this[Symbol.iterator]()}}),r("Object.entries",function(e){return e||function(e){var t,n=[];for(t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.push([t,e[t]]);return n}});
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
var i=i||{},s=this||self;function o(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function a(e,t,n){return e.call.apply(e.bind,arguments)}function c(e,t,n){return(c=a).apply(null,arguments)}function u(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function l(e,t){function n(){}n.prototype=t.prototype,e.Z=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Ob=function(e,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[n].apply(e,i)}}var h="undefined"!=typeof AsyncContext&&"function"==typeof AsyncContext.Snapshot?e=>e&&AsyncContext.Snapshot.wrap(e):e=>e;function d(e){const t=e.length;if(t>0){const n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function f(e,t){for(let r=1;r<arguments.length;r++){const t=arguments[r];var n=typeof t;if("array"==(n="object"!=n?n:t?Array.isArray(t)?"array":n:"null")||"object"==n&&"number"==typeof t.length){n=e.length||0;const r=t.length||0;e.length=n+r;for(let i=0;i<r;i++)e[n+i]=t[i]}else e.push(t)}}function p(e){s.setTimeout(()=>{throw e},0)}function m(){var e=_;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}var g=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return this.h>0?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new y,e=>e.reset());class y{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let v,w=!1,_=new class{constructor(){this.h=this.g=null}add(e,t){const n=g.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}},I=()=>{const e=Promise.resolve(void 0);v=()=>{e.then(T)}};function T(){for(var e;e=m();){try{e.h.call(e.g)}catch(n){p(n)}var t=g;t.j(e),t.h<100&&(t.h++,e.next=t.g,t.g=e)}w=!1}function b(){this.u=this.u,this.C=this.C}function E(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}b.prototype.u=!1,b.prototype.dispose=function(){this.u||(this.u=!0,this.N())},b.prototype[Symbol.dispose]=function(){this.dispose()},b.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},E.prototype.h=function(){this.defaultPrevented=!0};var S=function(){if(!s.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{const e=()=>{};s.addEventListener("test",e,t),s.removeEventListener("test",e,t)}catch(n){}return e}();function A(e){return/^[\s\xa0]*$/.test(e)}function C(e,t){E.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e&&this.init(e,t)}l(C,E),C.prototype.init=function(e,t){const n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;this.target=e.target||e.srcElement,this.g=t,(t=e.relatedTarget)||("mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement)),this.relatedTarget=t,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType=e.pointerType,this.state=e.state,this.i=e,e.defaultPrevented&&C.Z.h.call(this)},C.prototype.h=function(){C.Z.h.call(this);const e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var k="closure_listenable_"+(1e6*Math.random()|0),N=0;function D(e,t,n,r,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.ha=i,this.key=++N,this.da=this.fa=!1}function R(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function O(e,t,n){for(const r in e)t.call(n,e[r],r,e)}function P(e){const t={};for(const n in e)t[n]=e[n];return t}const x="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function L(e,t){let n,r;for(let i=1;i<arguments.length;i++){for(n in r=arguments[i],r)e[n]=r[n];for(let t=0;t<x.length;t++)n=x[t],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function M(e){this.src=e,this.g={},this.h=0}function F(e,t){const n=t.type;if(n in e.g){var r,i=e.g[n],s=Array.prototype.indexOf.call(i,t,void 0);(r=s>=0)&&Array.prototype.splice.call(i,s,1),r&&(R(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function V(e,t,n,r){for(let i=0;i<e.length;++i){const s=e[i];if(!s.da&&s.listener==t&&s.capture==!!n&&s.ha==r)return i}return-1}M.prototype.add=function(e,t,n,r,i){const s=e.toString();(e=this.g[s])||(e=this.g[s]=[],this.h++);const o=V(e,t,r,i);return o>-1?(t=e[o],n||(t.fa=!1)):((t=new D(t,this.src,s,!!r,i)).fa=n,e.push(t)),t};var U="closure_lm_"+(1e6*Math.random()|0),q={};function B(e,t,n,r,i){if(Array.isArray(t)){for(let s=0;s<t.length;s++)B(e,t[s],n,r,i);return null}return n=W(n),e&&e[k]?e.J(t,n,!!o(r)&&!!r.capture,i):function(e,t,n,r,i,s){if(!t)throw Error("Invalid event type");const a=o(i)?!!i.capture:!!i;let c=K(e);if(c||(e[U]=c=new M(e)),n=c.add(t,n,r,a,s),n.proxy)return n;if(r=function(){function e(n){return t.call(e.src,e.listener,n)}const t=G;return e}(),n.proxy=r,r.src=e,r.listener=n,e.addEventListener)S||(i=a),void 0===i&&(i=!1),e.addEventListener(t.toString(),r,i);else if(e.attachEvent)e.attachEvent($(t.toString()),r);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(r)}return n}(e,t,n,!1,r,i)}function j(e,t,n,r,i){if(Array.isArray(t))for(var s=0;s<t.length;s++)j(e,t[s],n,r,i);else r=o(r)?!!r.capture:!!r,n=W(n),e&&e[k]?(e=e.i,(s=String(t).toString())in e.g&&((n=V(t=e.g[s],n,r,i))>-1&&(R(t[n]),Array.prototype.splice.call(t,n,1),0==t.length&&(delete e.g[s],e.h--)))):e&&(e=K(e))&&(t=e.g[t.toString()],e=-1,t&&(e=V(t,n,r,i)),(n=e>-1?t[e]:null)&&z(n))}function z(e){if("number"!=typeof e&&e&&!e.da){var t=e.src;if(t&&t[k])F(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent($(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=K(t))?(F(n,e),0==n.h&&(n.src=null,t[U]=null)):R(e)}}}function $(e){return e in q?q[e]:q[e]="on"+e}function G(e,t){if(e.da)e=!0;else{t=new C(t,this);const n=e.listener,r=e.ha||e.src;e.fa&&z(e),e=n.call(r,t)}return e}function K(e){return(e=e[U])instanceof M?e:null}var H="__closure_events_fn_"+(1e9*Math.random()>>>0);function W(e){return"function"==typeof e?e:(e[H]||(e[H]=function(t){return e.handleEvent(t)}),e[H])}function Q(){b.call(this),this.i=new M(this),this.M=this,this.G=null}function J(e,t){var n,r=e.G;if(r)for(n=[];r;r=r.G)n.push(r);if(e=e.M,r=t.type||t,"string"==typeof t)t=new E(t,e);else if(t instanceof E)t.target=t.target||e;else{var i=t;L(t=new E(r,e),i)}let s,o;if(i=!0,n)for(o=n.length-1;o>=0;o--)s=t.g=n[o],i=Y(s,r,!0,t)&&i;if(s=t.g=e,i=Y(s,r,!0,t)&&i,i=Y(s,r,!1,t)&&i,n)for(o=0;o<n.length;o++)s=t.g=n[o],i=Y(s,r,!1,t)&&i}function Y(e,t,n,r){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();let i=!0;for(let s=0;s<t.length;++s){const o=t[s];if(o&&!o.da&&o.capture==n){const t=o.listener,n=o.ha||o.src;o.fa&&F(e.i,o),i=!1!==t.call(n,r)&&i}}return i&&!r.defaultPrevented}function X(e){e.g=function(e,t){if("function"!=typeof e){if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=c(e.handleEvent,e)}return Number(t)>2147483647?-1:s.setTimeout(e,t||0)}(()=>{e.g=null,e.i&&(e.i=!1,X(e))},e.l);const t=e.h;e.h=null,e.m.apply(null,t)}l(Q,b),Q.prototype[k]=!0,Q.prototype.removeEventListener=function(e,t,n,r){j(this,e,t,n,r)},Q.prototype.N=function(){if(Q.Z.N.call(this),this.i){var e=this.i;for(const t in e.g){const n=e.g[t];for(let e=0;e<n.length;e++)R(n[e]);delete e.g[t],e.h--}}this.G=null},Q.prototype.J=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)},Q.prototype.K=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};class Z extends b{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:X(this)}N(){super.N(),this.g&&(s.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ee(e){b.call(this),this.h=e,this.g={}}l(ee,b);var te=[];function ne(e){O(e.g,function(e,t){this.g.hasOwnProperty(t)&&z(e)},e),e.g={}}ee.prototype.N=function(){ee.Z.N.call(this),ne(this)},ee.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var re=s.JSON.stringify,ie=s.JSON.parse,se=class{stringify(e){return s.JSON.stringify(e,void 0)}parse(e){return s.JSON.parse(e,void 0)}};function oe(){}function ae(){}var ce={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ue(){E.call(this,"d")}function le(){E.call(this,"c")}l(ue,E),l(le,E);var he={},de=null;function fe(){return de=de||new Q}function pe(e){E.call(this,he.Ia,e)}function me(e){const t=fe();J(t,new pe(t))}function ge(e,t){E.call(this,he.STAT_EVENT,e),this.stat=t}function ye(e){const t=fe();J(t,new ge(t,e))}function ve(e,t){E.call(this,he.Ja,e),this.size=t}function we(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return s.setTimeout(function(){e()},t)}function _e(){this.g=!0}function Ie(e,t,n,r){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{const s=JSON.parse(t);if(s)for(e=0;e<s.length;e++)if(Array.isArray(s[e])){var n=s[e];if(!(n.length<2)){var r=n[1];if(Array.isArray(r)&&!(r.length<1)){var i=r[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(let e=1;e<r.length;e++)r[e]=""}}}return re(s)}catch(s){return t}}(e,n)+(r?" "+r:"")})}he.Ia="serverreachability",l(pe,E),he.STAT_EVENT="statevent",l(ge,E),he.Ja="timingevent",l(ve,E),_e.prototype.ua=function(){this.g=!1},_e.prototype.info=function(){};var Te,be={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ee={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"};function Se(){}function Ae(e){return encodeURIComponent(String(e))}function Ce(e){var t=1;e=e.split(":");const n=[];for(;t>0&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(":")),n}function ke(e,t,n,r){this.j=e,this.i=t,this.l=n,this.S=r||1,this.V=new ee(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ne}function Ne(){this.i=null,this.g="",this.h=!1}l(Se,oe),Se.prototype.g=function(){return new XMLHttpRequest},Te=new Se;var De={},Re={};function Oe(e,t,n){e.M=1,e.A=rt(Xe(t)),e.u=n,e.R=!0,Pe(e,null)}function Pe(e,t){e.F=Date.now(),Me(e),e.B=Xe(e.A);var n=e.B,r=e.S;Array.isArray(r)||(r=[String(r)]),yt(n.i,"t",r),e.C=0,n=e.j.L,e.h=new Ne,e.g=rn(e.j,n?t:null,!e.u),e.P>0&&(e.O=new Z(c(e.Y,e,e.g),e.P)),t=e.V,n=e.g,r=e.ba;var i="readystatechange";Array.isArray(i)||(i&&(te[0]=i.toString()),i=te);for(let s=0;s<i.length;s++){const e=B(n,i[s],r||t.handleEvent,!1,t.h||t);if(!e)break;t.g[e.key]=e}t=e.J?P(e.J):{},e.u?(e.v||(e.v="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.B,e.v,e.u,t)):(e.v="GET",e.g.ea(e.B,e.v,null,t)),me(),function(e,t,n,r,i,s){e.info(function(){if(e.g)if(s){var o="",a=s.split("&");for(let e=0;e<a.length;e++){var c=a[e].split("=");if(c.length>1){const e=c[0];c=c[1];const t=e.split("_");o=t.length>=2&&"type"==t[1]?o+(e+"=")+c+"&":o+(e+"=redacted&")}}}else o=null;else o=s;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+t+"\n"+n+"\n"+o})}(e.i,e.v,e.B,e.l,e.S,e.u)}function xe(e){return!!e.g&&("GET"==e.v&&2!=e.M&&e.j.Aa)}function Le(e,t){var n=e.C,r=t.indexOf("\n",n);return-1==r?Re:(n=Number(t.substring(n,r)),isNaN(n)?De:(r+=1)+n>t.length?Re:(t=t.slice(r,r+n),e.C=r+n,t))}function Me(e){e.T=Date.now()+e.H,Fe(e,e.H)}function Fe(e,t){if(null!=e.D)throw Error("WatchDog timer not null");e.D=we(c(e.aa,e),t)}function Ve(e){e.D&&(s.clearTimeout(e.D),e.D=null)}function Ue(e){0==e.j.I||e.K||Xt(e.j,e)}function qe(e){Ve(e);var t=e.O;t&&"function"==typeof t.dispose&&t.dispose(),e.O=null,ne(e.V),e.g&&(t=e.g,e.g=null,t.abort(),t.dispose())}function Be(e,t){try{var n=e.j;if(0!=n.I&&(n.g==e||Ke(n.h,e)))if(!e.L&&Ke(n.h,e)&&3==n.I){try{var r=n.Ba.g.parse(t)}catch(l){r=null}if(Array.isArray(r)&&3==r.length){var i=r;if(0==i[0]){e:if(!n.v){if(n.g){if(!(n.g.F+3e3<e.F))break e;Yt(n),Bt(n)}Wt(n),ye(18)}}else n.xa=i[1],0<n.xa-n.K&&i[2]<37500&&n.F&&0==n.A&&!n.C&&(n.C=we(c(n.Va,n),6e3));Ge(n.h)<=1&&n.ta&&(n.ta=void 0)}else en(n,11)}else if((e.L||n.g==e)&&Yt(n),!A(t))for(i=n.Ba.g.parse(t),t=0;t<i.length;t++){let c=i[t];const l=c[0];if(!(l<=n.K))if(n.K=l,c=c[1],2==n.I)if("c"==c[0]){n.M=c[1],n.ba=c[2];const t=c[3];null!=t&&(n.ka=t,n.j.info("VER="+n.ka));const i=c[4];null!=i&&(n.za=i,n.j.info("SVER="+n.za));const l=c[5];null!=l&&"number"==typeof l&&l>0&&(r=1.5*l,n.O=r,n.j.info("backChannelRequestTimeoutMs_="+r)),r=n;const h=e.g;if(h){const e=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var s=r.h;s.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(s.j=s.l,s.g=new Set,s.h&&(He(s,s.h),s.h=null))}if(r.G){const e=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(r.wa=e,nt(r.J,r.G,e))}}n.I=3,n.l&&n.l.ra(),n.aa&&(n.T=Date.now()-e.F,n.j.info("Handshake RTT: "+n.T+"ms"));var o=e;if((r=n).na=nn(r,r.L?r.ba:null,r.W),o.L){We(r.h,o);var a=o,u=r.O;u&&(a.H=u),a.D&&(Ve(a),Me(a)),r.g=o}else Ht(r);n.i.length>0&&zt(n)}else"stop"!=c[0]&&"close"!=c[0]||en(n,7);else 3==n.I&&("stop"==c[0]||"close"==c[0]?"stop"==c[0]?en(n,7):qt(n):"noop"!=c[0]&&n.l&&n.l.qa(c),n.A=0)}me()}catch(l){}}ke.prototype.ba=function(e){e=e.target;const t=this.O;t&&3==Mt(e)?t.j():this.Y(e)},ke.prototype.Y=function(e){try{if(e==this.g)e:{const c=Mt(this.g),u=this.g.ya();this.g.ca();if(!(c<3)&&(3!=c||this.g&&(this.h.h||this.g.la()||Ft(this.g)))){this.K||4!=c||7==u||me(),Ve(this);var t=this.g.ca();this.X=t;var n=function(e){if(!xe(e))return e.g.la();const t=Ft(e.g);if(""===t)return"";let n="";const r=t.length,i=4==Mt(e.g);if(!e.h.i){if("undefined"==typeof TextDecoder)return qe(e),Ue(e),"";e.h.i=new s.TextDecoder}for(let s=0;s<r;s++)e.h.h=!0,n+=e.h.i.decode(t[s],{stream:!(i&&s==r-1)});return t.length=0,e.h.g+=n,e.C=0,e.h.g}(this);if(this.o=200==t,function(e,t,n,r,i,s,o){e.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+t+"\n"+n+"\n"+s+" "+o})}(this.i,this.v,this.B,this.l,this.S,c,t),this.o){if(this.U&&!this.L){t:{if(this.g){var r,i=this.g;if((r=i.g?i.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!A(r)){var o=r;break t}}o=null}if(!(e=o)){this.o=!1,this.m=3,ye(12),qe(this),Ue(this);break e}Ie(this.i,this.l,e,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Be(this,e)}if(this.R){let t;for(e=!0;!this.K&&this.C<n.length;){if(t=Le(this,n),t==Re){4==c&&(this.m=4,ye(14),e=!1),Ie(this.i,this.l,null,"[Incomplete Response]");break}if(t==De){this.m=4,ye(15),Ie(this.i,this.l,n,"[Invalid Chunk]"),e=!1;break}Ie(this.i,this.l,t,null),Be(this,t)}if(xe(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=c||0!=n.length||this.h.h||(this.m=1,ye(16),e=!1),this.o=this.o&&e,e){if(n.length>0&&!this.W){this.W=!0;var a=this.j;a.g==this&&a.aa&&!a.P&&(a.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),Qt(a),a.P=!0,ye(11))}}else Ie(this.i,this.l,n,"[Invalid Chunked Response]"),qe(this),Ue(this)}else Ie(this.i,this.l,n,null),Be(this,n);4==c&&qe(this),this.o&&!this.K&&(4==c?Xt(this.j,this):(this.o=!1,Me(this)))}else(function(e){const t={};e=(e.g&&Mt(e)>=2&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let r=0;r<e.length;r++){if(A(e[r]))continue;var n=Ce(e[r]);const i=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const s=t[i]||[];t[i]=s,s.push(n)}!function(e,t){for(const n in e)t.call(void 0,e[n],n,e)}(t,function(e){return e.join(", ")})})(this.g),400==t&&n.indexOf("Unknown SID")>0?(this.m=3,ye(12)):(this.m=0,ye(13)),qe(this),Ue(this)}}}catch(c){}},ke.prototype.cancel=function(){this.K=!0,qe(this)},ke.prototype.aa=function(){this.D=null;const e=Date.now();e-this.T>=0?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.i,this.B),2!=this.M&&(me(),ye(17)),qe(this),this.m=2,Ue(this)):Fe(this,this.T-e)};var je=class{constructor(e,t){this.g=e,this.map=t}};function ze(e){this.l=e||10,s.PerformanceNavigationTiming?e=(e=s.performance.getEntriesByType("navigation")).length>0&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):e=!!(s.chrome&&s.chrome.loadTimes&&s.chrome.loadTimes()&&s.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function $e(e){return!!e.h||!!e.g&&e.g.size>=e.j}function Ge(e){return e.h?1:e.g?e.g.size:0}function Ke(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function He(e,t){e.g?e.g.add(t):e.h=t}function We(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function Qe(e){if(null!=e.h)return e.i.concat(e.h.G);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.G);return t}return d(e.i)}ze.prototype.cancel=function(){if(this.i=Qe(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}};var Je=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ye(e){let t;this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1,e instanceof Ye?(this.l=e.l,Ze(this,e.j),this.o=e.o,this.g=e.g,et(this,e.u),this.h=e.h,tt(this,vt(e.i)),this.m=e.m):e&&(t=String(e).match(Je))?(this.l=!1,Ze(this,t[1]||"",!0),this.o=it(t[2]||""),this.g=it(t[3]||"",!0),et(this,t[4]),this.h=it(t[5]||"",!0),tt(this,t[6]||"",!0),this.m=it(t[7]||"")):(this.l=!1,this.i=new dt(null,this.l))}function Xe(e){return new Ye(e)}function Ze(e,t,n){e.j=n?it(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function et(e,t){if(t){if(t=Number(t),isNaN(t)||t<0)throw Error("Bad port number "+t);e.u=t}else e.u=null}function tt(e,t,n){t instanceof dt?(e.i=t,function(e,t){t&&!e.j&&(ft(e),e.i=null,e.g.forEach(function(e,t){const n=t.toLowerCase();t!=n&&(pt(this,t),yt(this,n,e))},e)),e.j=t}(e.i,e.l)):(n||(t=st(t,lt)),e.i=new dt(t,e.l))}function nt(e,t,n){e.i.set(t,n)}function rt(e){return nt(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function it(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function st(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,ot),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function ot(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}Ye.prototype.toString=function(){const e=[];var t=this.j;t&&e.push(st(t,at,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(st(t,at,!0),"@"),e.push(Ae(n).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.u)&&e.push(":",String(n))),(n=this.h)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(st(n,"/"==n.charAt(0)?ut:ct,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.m)&&e.push("#",st(n,ht)),e.join("")},Ye.prototype.resolve=function(e){const t=Xe(this);let n=!!e.j;n?Ze(t,e.j):n=!!e.o,n?t.o=e.o:n=!!e.g,n?t.g=e.g:n=null!=e.u;var r=e.h;if(n)et(t,e.u);else if(n=!!e.h){if("/"!=r.charAt(0))if(this.g&&!this.h)r="/"+r;else{var i=t.h.lastIndexOf("/");-1!=i&&(r=t.h.slice(0,i+1)+r)}if(".."==(i=r)||"."==i)r="";else if(-1!=i.indexOf("./")||-1!=i.indexOf("/.")){r=0==i.lastIndexOf("/",0),i=i.split("/");const e=[];for(let t=0;t<i.length;){const n=i[t++];"."==n?r&&t==i.length&&e.push(""):".."==n?((e.length>1||1==e.length&&""!=e[0])&&e.pop(),r&&t==i.length&&e.push("")):(e.push(n),r=!0)}r=e.join("/")}else r=i}return n?t.h=r:n=""!==e.i.toString(),n?tt(t,vt(e.i)):n=!!e.m,n&&(t.m=e.m),t};var at=/[#\/\?@]/g,ct=/[#\?:]/g,ut=/[#\?]/g,lt=/[#\?@]/g,ht=/#/g;function dt(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function ft(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(let n=0;n<e.length;n++){const r=e[n].indexOf("=");let i,s=null;r>=0?(i=e[n].substring(0,r),s=e[n].substring(r+1)):i=e[n],t(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}function pt(e,t){ft(e),t=wt(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function mt(e,t){return ft(e),t=wt(e,t),e.g.has(t)}function gt(e,t){ft(e);let n=[];if("string"==typeof t)mt(e,t)&&(n=n.concat(e.g.get(wt(e,t))));else for(e=Array.from(e.g.values()),t=0;t<e.length;t++)n=n.concat(e[t]);return n}function yt(e,t,n){pt(e,t),n.length>0&&(e.i=null,e.g.set(wt(e,t),d(n)),e.h+=n.length)}function vt(e){const t=new dt;return t.i=e.i,e.g&&(t.g=new Map(e.g),t.h=e.h),t}function wt(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function _t(e,t,n,r,i){try{i&&(i.onload=null,i.onerror=null,i.onabort=null,i.ontimeout=null),r(n)}catch(s){}}function It(){this.g=new se}function Tt(e){this.i=e.Sb||null,this.h=e.ab||!1}function bt(e,t){Q.call(this),this.H=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}function Et(e){e.j.read().then(e.Ma.bind(e)).catch(e.ga.bind(e))}function St(e){e.readyState=4,e.l=null,e.j=null,e.B=null,At(e)}function At(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function Ct(e){let t="";return O(e,function(e,n){t+=n,t+=":",t+=e,t+="\r\n"}),t}function kt(e,t,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=Ct(n),"string"==typeof e?null!=n&&Ae(n):nt(e,t,n))}function Nt(e){Q.call(this),this.headers=new Map,this.L=e||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}(e=dt.prototype).add=function(e,t){ft(this),this.i=null,e=wt(this,e);let n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},e.forEach=function(e,t){ft(this),this.g.forEach(function(n,r){n.forEach(function(n){e.call(t,n,r,this)},this)},this)},e.set=function(e,t){return ft(this),this.i=null,mt(this,e=wt(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},e.get=function(e,t){return e&&(e=gt(this,e)).length>0?String(e[0]):t},e.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(let r=0;r<t.length;r++){var n=t[r];const i=Ae(n);n=gt(this,n);for(let t=0;t<n.length;t++){let r=i;""!==n[t]&&(r+="="+Ae(n[t])),e.push(r)}}return this.i=e.join("&")},l(Tt,oe),Tt.prototype.g=function(){return new bt(this.i,this.h)},l(bt,Q),(e=bt.prototype).open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.F=e,this.D=t,this.readyState=1,At(this)},e.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const t={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};e&&(t.body=e),(this.H||s).fetch(new Request(this.D,t)).then(this.Pa.bind(this),this.ga.bind(this))},e.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&4!=this.readyState&&(this.g=!1,St(this)),this.readyState=0},e.Pa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,At(this)),this.g&&(this.readyState=3,At(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(void 0!==s.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Et(this)}else e.text().then(this.Oa.bind(this),this.ga.bind(this))},e.Ma=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.B.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?St(this):At(this),3==this.readyState&&Et(this)}},e.Oa=function(e){this.g&&(this.response=this.responseText=e,St(this))},e.Na=function(e){this.g&&(this.response=e,St(this))},e.ga=function(){this.g&&St(this)},e.setRequestHeader=function(e,t){this.A.append(e,t)},e.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},e.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(bt.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),l(Nt,Q);var Dt=/^https?$/i,Rt=["POST","PUT"];function Ot(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.o=5,Pt(e),Lt(e)}function Pt(e){e.A||(e.A=!0,J(e,"complete"),J(e,"error"))}function xt(e){if(e.h&&void 0!==i)if(e.v&&4==Mt(e))setTimeout(e.Ca.bind(e),0);else if(J(e,"readystatechange"),4==Mt(e)){e.h=!1;try{const i=e.ca();e:switch(i){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var r;if(r=0===i){let t=String(e.D).match(Je)[1]||null;!t&&s.self&&s.self.location&&(t=s.self.location.protocol.slice(0,-1)),r=!Dt.test(t?t.toLowerCase():"")}n=r}if(n)J(e,"complete"),J(e,"success");else{e.o=6;try{var o=Mt(e)>2?e.g.statusText:""}catch(a){o=""}e.l=o+" ["+e.ca()+"]",Pt(e)}}finally{Lt(e)}}}function Lt(e,t){if(e.g){e.m&&(clearTimeout(e.m),e.m=null);const r=e.g;e.g=null,t||J(e,"ready");try{r.onreadystatechange=null}catch(n){}}}function Mt(e){return e.g?e.g.readyState:0}function Ft(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.F){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(t){return null}}function Vt(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function Ut(e){this.za=0,this.i=[],this.j=new _e,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Vt("failFast",!1,e),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Vt("baseRetryDelayMs",5e3,e),this.Za=Vt("retryDelaySeedMs",1e4,e),this.Ta=Vt("forwardChannelMaxRetries",2,e),this.va=Vt("forwardChannelRequestTimeoutMs",2e4,e),this.ma=e&&e.xmlHttpFactory||void 0,this.Ua=e&&e.Rb||void 0,this.Aa=e&&e.useFetchStreams||!1,this.O=void 0,this.L=e&&e.supportsCrossDomainXhr||!1,this.M="",this.h=new ze(e&&e.concurrentRequestLimit),this.Ba=new It,this.S=e&&e.fastHandshake||!1,this.R=e&&e.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=e&&e.Pb||!1,e&&e.ua&&this.j.ua(),e&&e.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&e&&e.detectBufferingProxy||!1,this.ia=void 0,e&&e.longPollingTimeout&&e.longPollingTimeout>0&&(this.ia=e.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}function qt(e){if(jt(e),3==e.I){var t=e.V++,n=Xe(e.J);if(nt(n,"SID",e.M),nt(n,"RID",t),nt(n,"TYPE","terminate"),Gt(e,n),(t=new ke(e,e.j,t)).M=2,t.A=rt(Xe(n)),n=!1,s.navigator&&s.navigator.sendBeacon)try{n=s.navigator.sendBeacon(t.A.toString(),"")}catch(r){}!n&&s.Image&&((new Image).src=t.A,n=!0),n||(t.g=rn(t.j,null),t.g.ea(t.A)),t.F=Date.now(),Me(t)}tn(e)}function Bt(e){e.g&&(Qt(e),e.g.cancel(),e.g=null)}function jt(e){Bt(e),e.v&&(s.clearTimeout(e.v),e.v=null),Yt(e),e.h.cancel(),e.m&&("number"==typeof e.m&&s.clearTimeout(e.m),e.m=null)}function zt(e){if(!$e(e.h)&&!e.m){e.m=!0;var t=e.Ea;v||I(),w||(v(),w=!0),_.add(t,e),e.D=0}}function $t(e,t){var n;n=t?t.l:e.V++;const r=Xe(e.J);nt(r,"SID",e.M),nt(r,"RID",n),nt(r,"AID",e.K),Gt(e,r),e.u&&e.o&&kt(r,e.u,e.o),n=new ke(e,e.j,n,e.D+1),null===e.u&&(n.J=e.o),t&&(e.i=t.G.concat(e.i)),t=Kt(e,n,1e3),n.H=Math.round(.5*e.va)+Math.round(.5*e.va*Math.random()),He(e.h,n),Oe(n,r,t)}function Gt(e,t){e.H&&O(e.H,function(e,n){nt(t,n,e)}),e.l&&O({},function(e,n){nt(t,n,e)})}function Kt(e,t,n){n=Math.min(e.i.length,n);const r=e.l?c(e.l.Ka,e.l,e):null;e:{var i=e.i;let t=-1;for(;;){const e=["count="+n];-1==t?n>0?(t=i[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let c=!0;for(let l=0;l<n;l++){var s=i[l].g;const n=i[l].map;if((s-=t)<0)t=Math.max(0,i[l].g-100),c=!1;else try{s="req"+s+"_"||"";try{var a=n instanceof Map?n:Object.entries(n);for(const[t,n]of a){let r=n;o(n)&&(r=re(n)),e.push(s+t+"="+encodeURIComponent(r))}}catch(u){throw e.push(s+"type="+encodeURIComponent("_badmap")),u}}catch(u){r&&r(n)}}if(c){a=e.join("&");break e}}a=void 0}return e=e.i.splice(0,n),t.G=e,a}function Ht(e){if(!e.g&&!e.v){e.Y=1;var t=e.Da;v||I(),w||(v(),w=!0),_.add(t,e),e.A=0}}function Wt(e){return!(e.g||e.v||e.A>=3)&&(e.Y++,e.v=we(c(e.Da,e),Zt(e,e.A)),e.A++,!0)}function Qt(e){null!=e.B&&(s.clearTimeout(e.B),e.B=null)}function Jt(e){e.g=new ke(e,e.j,"rpc",e.Y),null===e.u&&(e.g.J=e.o),e.g.P=0;var t=Xe(e.na);nt(t,"RID","rpc"),nt(t,"SID",e.M),nt(t,"AID",e.K),nt(t,"CI",e.F?"0":"1"),!e.F&&e.ia&&nt(t,"TO",e.ia),nt(t,"TYPE","xmlhttp"),Gt(e,t),e.u&&e.o&&kt(t,e.u,e.o),e.O&&(e.g.H=e.O);var n=e.g;e=e.ba,n.M=1,n.A=rt(Xe(t)),n.u=null,n.R=!0,Pe(n,e)}function Yt(e){null!=e.C&&(s.clearTimeout(e.C),e.C=null)}function Xt(e,t){var n=null;if(e.g==t){Yt(e),Qt(e),e.g=null;var r=2}else{if(!Ke(e.h,t))return;n=t.G,We(e.h,t),r=1}if(0!=e.I)if(t.o)if(1==r){n=t.u?t.u.length:0,t=Date.now()-t.F;var i=e.D;J(r=fe(),new ve(r,n)),zt(e)}else Ht(e);else if(3==(i=t.m)||0==i&&t.X>0||!(1==r&&function(e,t){return!(Ge(e.h)>=e.h.j-(e.m?1:0)||(e.m?(e.i=t.G.concat(e.i),0):1==e.I||2==e.I||e.D>=(e.Sa?0:e.Ta)||(e.m=we(c(e.Ea,e,t),Zt(e,e.D)),e.D++,0)))}(e,t)||2==r&&Wt(e)))switch(n&&n.length>0&&(t=e.h,t.i=t.i.concat(n)),i){case 1:en(e,5);break;case 4:en(e,10);break;case 3:en(e,6);break;default:en(e,2)}}function Zt(e,t){let n=e.Qa+Math.floor(Math.random()*e.Za);return e.isActive()||(n*=2),n*t}function en(e,t){if(e.j.info("Error code "+t),2==t){var n=c(e.bb,e),r=e.Ua;const t=!r;r=new Ye(r||"//www.google.com/images/cleardot.gif"),s.location&&"http"==s.location.protocol||Ze(r,"https"),rt(r),t?function(e,t){const n=new _e;if(s.Image){const r=new Image;r.onload=u(_t,n,"TestLoadImage: loaded",!0,t,r),r.onerror=u(_t,n,"TestLoadImage: error",!1,t,r),r.onabort=u(_t,n,"TestLoadImage: abort",!1,t,r),r.ontimeout=u(_t,n,"TestLoadImage: timeout",!1,t,r),s.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=e}else t(!1)}(r.toString(),n):function(e,t){new _e;const n=new AbortController,r=setTimeout(()=>{n.abort(),_t(0,0,!1,t)},1e4);fetch(e,{signal:n.signal}).then(e=>{clearTimeout(r),e.ok?_t(0,0,!0,t):_t(0,0,!1,t)}).catch(()=>{clearTimeout(r),_t(0,0,!1,t)})}(r.toString(),n)}else ye(2);e.I=0,e.l&&e.l.pa(t),tn(e),jt(e)}function tn(e){if(e.I=0,e.ja=[],e.l){const t=Qe(e.h);0==t.length&&0==e.i.length||(f(e.ja,t),f(e.ja,e.i),e.h.i.length=0,d(e.i),e.i.length=0),e.l.oa()}}function nn(e,t,n){var r=n instanceof Ye?Xe(n):new Ye(n);if(""!=r.g)t&&(r.g=t+"."+r.g),et(r,r.u);else{var i=s.location;r=i.protocol,t=t?t+"."+i.hostname:i.hostname,i=+i.port;const e=new Ye(null);r&&Ze(e,r),t&&(e.g=t),i&&et(e,i),n&&(e.h=n),r=e}return n=e.G,t=e.wa,n&&t&&nt(r,n,t),nt(r,"VER",e.ka),Gt(e,r),r}function rn(e,t,n){if(t&&!e.L)throw Error("Can't create secondary domain capable XhrIo object.");return(t=e.Aa&&!e.ma?new Nt(new Tt({ab:n})):new Nt(e.ma)).Fa(e.L),t}function sn(){}function on(){}function an(e,t){Q.call(this),this.g=new Ut(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.sa&&(e?e["X-WebChannel-Client-Profile"]=t.sa:e={"X-WebChannel-Client-Profile":t.sa}),this.g.U=e,(e=t&&t.Qb)&&!A(e)&&(this.g.u=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!A(t)&&(this.g.G=t,null!==(e=this.h)&&t in e&&(t in(e=this.h)&&delete e[t])),this.j=new ln(this)}function cn(e){ue.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function un(){le.call(this),this.status=1}function ln(e){this.g=e}(e=Nt.prototype).Fa=function(e){this.H=e},e.ea=function(e,t,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+e);t=t?t.toUpperCase():"GET",this.D=e,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Te.g(),this.g.onreadystatechange=h(c(this.Ca,this));try{this.B=!0,this.g.open(t,String(e),!0),this.B=!1}catch(o){return void Ot(this,o)}if(e=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var i in r)n.set(i,r[i]);else{if("function"!=typeof r.keys||"function"!=typeof r.get)throw Error("Unknown input type for opt_headers: "+String(r));for(const e of r.keys())n.set(e,r.get(e))}r=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),i=s.FormData&&e instanceof s.FormData,!(Array.prototype.indexOf.call(Rt,t,void 0)>=0)||r||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[s,a]of n)this.g.setRequestHeader(s,a);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(e),this.v=!1}catch(o){Ot(this,o)}},e.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=e||7,J(this,"complete"),J(this,"abort"),Lt(this))},e.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Lt(this,!0)),Nt.Z.N.call(this)},e.Ca=function(){this.u||(this.B||this.v||this.j?xt(this):this.Xa())},e.Xa=function(){xt(this)},e.isActive=function(){return!!this.g},e.ca=function(){try{return Mt(this)>2?this.g.status:-1}catch(e){return-1}},e.la=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},e.La=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),ie(t)}},e.ya=function(){return this.o},e.Ha=function(){return"string"==typeof this.l?this.l:String(this.l)},(e=Ut.prototype).ka=8,e.I=1,e.connect=function(e,t,n,r){ye(0),this.W=e,this.H=t||{},n&&void 0!==r&&(this.H.OSID=n,this.H.OAID=r),this.F=this.X,this.J=nn(this,null,this.W),zt(this)},e.Ea=function(e){if(this.m)if(this.m=null,1==this.I){if(!e){this.V=Math.floor(1e5*Math.random()),e=this.V++;const i=new ke(this,this.j,e);let s=this.o;if(this.U&&(s?(s=P(s),L(s,this.U)):s=this.U),null!==this.u||this.R||(i.J=s,s=null),this.S)e:{for(var t=0,n=0;n<this.i.length;n++){var r=this.i[n];if(void 0===(r="__data__"in r.map&&"string"==typeof(r=r.map.__data__)?r.length:void 0))break;if((t+=r)>4096){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=Kt(this,i,t),nt(n=Xe(this.J),"RID",e),nt(n,"CVER",22),this.G&&nt(n,"X-HTTP-Session-Id",this.G),Gt(this,n),s&&(this.R?t="headers="+Ae(Ct(s))+"&"+t:this.u&&kt(n,this.u,s)),He(this.h,i),this.Ra&&nt(n,"TYPE","init"),this.S?(nt(n,"$req",t),nt(n,"SID","null"),i.U=!0,Oe(i,n,null)):Oe(i,n,t),this.I=2}}else 3==this.I&&(e?$t(this,e):0==this.i.length||$e(this.h)||$t(this))},e.Da=function(){if(this.v=null,Jt(this),this.aa&&!(this.P||null==this.g||this.T<=0)){var e=4*this.T;this.j.info("BP detection timer enabled: "+e),this.B=we(c(this.Wa,this),e)}},e.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,ye(10),Bt(this),Jt(this))},e.Va=function(){null!=this.C&&(this.C=null,Bt(this),Wt(this),ye(19))},e.bb=function(e){e?(this.j.info("Successfully pinged google.com"),ye(2)):(this.j.info("Failed to ping google.com"),ye(1))},e.isActive=function(){return!!this.l&&this.l.isActive(this)},(e=sn.prototype).ra=function(){},e.qa=function(){},e.pa=function(){},e.oa=function(){},e.isActive=function(){return!0},e.Ka=function(){},on.prototype.g=function(e,t){return new an(e,t)},l(an,Q),an.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},an.prototype.close=function(){qt(this.g)},an.prototype.o=function(e){var t=this.g;if("string"==typeof e){var n={};n.__data__=e,e=n}else this.v&&((n={}).__data__=re(e),e=n);t.i.push(new je(t.Ya++,e)),3==t.I&&zt(t)},an.prototype.N=function(){this.g.l=null,delete this.j,qt(this.g),delete this.g,an.Z.N.call(this)},l(cn,ue),l(un,le),l(ln,sn),ln.prototype.ra=function(){J(this.g,"a")},ln.prototype.qa=function(e){J(this.g,new cn(e))},ln.prototype.pa=function(e){J(this.g,new un)},ln.prototype.oa=function(){J(this.g,"b")},on.prototype.createWebChannel=on.prototype.g,an.prototype.send=an.prototype.o,an.prototype.open=an.prototype.m,an.prototype.close=an.prototype.close,Ws=function(){return new on},Hs=function(){return fe()},Ks=he,Gs={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},be.NO_ERROR=0,be.TIMEOUT=8,be.HTTP_ERROR=6,$s=be,Ee.COMPLETE="complete",zs=Ee,ae.EventType=ce,ce.OPEN="a",ce.CLOSE="b",ce.ERROR="c",ce.MESSAGE="d",Q.prototype.listen=Q.prototype.J,js=ae,Nt.prototype.listenOnce=Nt.prototype.K,Nt.prototype.getLastError=Nt.prototype.Ha,Nt.prototype.getLastErrorCode=Nt.prototype.ya,Nt.prototype.getStatus=Nt.prototype.ca,Nt.prototype.getResponseJson=Nt.prototype.La,Nt.prototype.getResponseText=Nt.prototype.la,Nt.prototype.send=Nt.prototype.ea,Nt.prototype.setWithCredentials=Nt.prototype.Fa,Bs=Nt}).apply(void 0!==Qs?Qs:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Js{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Js.UNAUTHENTICATED=new Js(null),Js.GOOGLE_CREDENTIALS=new Js("google-credentials-uid"),Js.FIRST_PARTY=new Js("first-party-uid"),Js.MOCK_USER=new Js("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Ys="12.12.0";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Xs=new j("@firebase/firestore");function Zs(){return Xs.logLevel}function eo(e,...t){if(Xs.logLevel<=M.DEBUG){const n=t.map(ro);Xs.debug(`Firestore (${Ys}): ${e}`,...n)}}function to(e,...t){if(Xs.logLevel<=M.ERROR){const n=t.map(ro);Xs.error(`Firestore (${Ys}): ${e}`,...n)}}function no(e,...t){if(Xs.logLevel<=M.WARN){const n=t.map(ro);Xs.warn(`Firestore (${Ys}): ${e}`,...n)}}function ro(e){if("string"==typeof e)return e;try{return t=e,JSON.stringify(t)}catch(n){return e}var t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function io(e,t,n){let r="Unexpected state";"string"==typeof t?r=t:n=t,so(e,r,n)}function so(e,t,n){let r=`FIRESTORE (${Ys}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(i){r+=" CONTEXT: "+n}throw to(r),new Error(r)}function oo(e,t,n,r){let i="Unexpected state";"string"==typeof n?i=n:r=n,e||so(t,i,r)}function ao(e,t){return e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const co={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class uo extends w{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lo{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class fo{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Js.UNAUTHENTICATED))}shutdown(){}}class po{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class mo{constructor(e){this.t=e,this.currentUser=Js.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){oo(void 0===this.o,42304);let n=this.i;const r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let i=new lo;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new lo,e.enqueueRetryable(()=>r(this.currentUser))};const s=()=>{const t=i;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},o=e=>{eo("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),s())};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(eo("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new lo)}},0),s()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(eo("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(oo("string"==typeof t.accessToken,31837,{l:t}),new ho(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return oo(null===e||"string"==typeof e,2055,{h:e}),new Js(e)}}class go{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=Js.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class yo{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new go(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Js.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class vo{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class wo{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ze(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){oo(void 0===this.o,3512);const n=e=>{null!=e.error&&eo("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.m;return this.m=e.token,eo("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};const r=e=>{eo("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){const e=this.V.getImmediate({optional:!0});e?r(e):eo("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new vo(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(oo("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new vo(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _o(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let r=0;r<e;r++)n[r]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{static newId(){const e=62*Math.floor(256/62);let t="";for(;t.length<20;){const n=_o(40);for(let r=0;r<n.length;++r)t.length<20&&n[r]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[r]%62))}return t}}function To(e,t){return e<t?-1:e>t?1:0}function bo(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=e.charAt(r),i=t.charAt(r);if(n!==i)return Ao(n)===Ao(i)?To(n,i):Ao(n)?1:-1}return To(e.length,t.length)}const Eo=55296,So=57343;function Ao(e){const t=e.charCodeAt(0);return t>=Eo&&t<=So}function Co(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}function ko(e){return e+"\0"}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const No="__name__";class Do{constructor(e,t,n){void 0===t?t=0:t>e.length&&io(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&io(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===Do.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Do?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=Do.compareSegments(e.get(r),t.get(r));if(0!==n)return n}return To(e.length,t.length)}static compareSegments(e,t){const n=Do.isNumericId(e),r=Do.isNumericId(t);return n&&!r?-1:!n&&r?1:n&&r?Do.extractNumericId(e).compare(Do.extractNumericId(t)):bo(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Vs.fromString(e.substring(4,e.length-2))}}class Ro extends Do{construct(e,t,n){return new Ro(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new uo(co.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new Ro(t)}static emptyPath(){return new Ro([])}}const Oo=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Po extends Do{construct(e,t,n){return new Po(e,t,n)}static isValidIdentifier(e){return Oo.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Po.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===No}static keyField(){return new Po([No])}static fromServerFormat(e){const t=[];let n="",r=0;const i=()=>{if(0===n.length)throw new uo(co.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let s=!1;for(;r<e.length;){const t=e[r];if("\\"===t){if(r+1===e.length)throw new uo(co.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new uo(co.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(s=!s,r++):"."!==t||s?(n+=t,r++):(i(),r++)}if(i(),s)throw new uo(co.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Po(t)}static emptyPath(){return new Po([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo{constructor(e){this.path=e}static fromPath(e){return new xo(Ro.fromString(e))}static fromName(e){return new xo(Ro.fromString(e).popFirst(5))}static empty(){return new xo(Ro.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===Ro.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return Ro.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new xo(new Ro(e.slice()))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lo(e,t,n){if(!n)throw new uo(co.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function Mo(e,t,n,r){if(!0===t&&!0===r)throw new uo(co.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function Fo(e){if(!xo.isDocumentKey(e))throw new uo(co.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function Vo(e){if(xo.isDocumentKey(e))throw new uo(co.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function Uo(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function qo(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const n=(t=e).constructor?t.constructor.name:null;return n?`a custom ${n} object`:"an object"}}var t;return"function"==typeof e?"a function":io(12329,{type:typeof e})}function Bo(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new uo(co.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=qo(e);throw new uo(co.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}function jo(e,t){if(t<=0)throw new uo(co.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zo(e,t){const n={typeString:e};return t&&(n.value=t),n}function $o(e,t){if(!Uo(e))throw new uo(co.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in t)if(t[r]){const i=t[r].typeString,s="value"in t[r]?{value:t[r].value}:void 0;if(!(r in e)){n=`JSON missing required field: '${r}'`;break}const o=e[r];if(i&&typeof o!==i){n=`JSON field '${r}' must be a ${i}.`;break}if(void 0!==s&&o!==s.value){n=`Expected '${r}' field to equal '${s.value}'`;break}}if(n)throw new uo(co.INVALID_ARGUMENT,n);return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Go=-62135596800,Ko=1e6;class Ho{static now(){return Ho.fromMillis(Date.now())}static fromDate(e){return Ho.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*Ko);return new Ho(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new uo(co.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new uo(co.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Go)throw new uo(co.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new uo(co.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ko}_compareTo(e){return this.seconds===e.seconds?To(this.nanoseconds,e.nanoseconds):To(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ho._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if($o(e,Ho._jsonSchema))return new Ho(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Go;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ho._jsonSchemaVersion="firestore/timestamp/1.0",Ho._jsonSchema={type:zo("string",Ho._jsonSchemaVersion),seconds:zo("number"),nanoseconds:zo("number")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Wo{static fromTimestamp(e){return new Wo(e)}static min(){return new Wo(new Ho(0,0))}static max(){return new Wo(new Ho(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qo=-1;class Jo{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}function Yo(e){return e.fields.find(e=>2===e.kind)}function Xo(e){return e.fields.filter(e=>2!==e.kind)}function Zo(e,t){let n=To(e.collectionGroup,t.collectionGroup);if(0!==n)return n;for(let r=0;r<Math.min(e.fields.length,t.fields.length);++r)if(n=ta(e.fields[r],t.fields[r]),0!==n)return n;return To(e.fields.length,t.fields.length)}Jo.UNKNOWN_ID=-1;class ea{constructor(e,t){this.fieldPath=e,this.kind=t}}function ta(e,t){const n=Po.comparator(e.fieldPath,t.fieldPath);return 0!==n?n:To(e.kind,t.kind)}class na{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new na(0,sa.min())}}function ra(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,i=Wo.fromTimestamp(1e9===r?new Ho(n+1,0):new Ho(n,r));return new sa(i,xo.empty(),t)}function ia(e){return new sa(e.readTime,e.key,Qo)}class sa{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new sa(Wo.min(),xo.empty(),Qo)}static max(){return new sa(Wo.max(),xo.empty(),Qo)}}function oa(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=xo.comparator(e.documentKey,t.documentKey),0!==n?n:To(e.largestBatchId,t.largestBatchId)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */)}const aa="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ca{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ua(e){if(e.code!==co.FAILED_PRECONDITION||e.message!==aa)throw e;eo("LocalStore","Unexpectedly lost primary lease")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class la{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&io(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new la((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof la?t:la.resolve(t)}catch(t){return la.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):la.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):la.reject(t)}static resolve(e){return new la((t,n)=>{t(e)})}static reject(e){return new la((t,n)=>{n(e)})}static waitFor(e){return new la((t,n)=>{let r=0,i=0,s=!1;e.forEach(e=>{++r,e.next(()=>{++i,s&&i===r&&t()},e=>n(e))}),s=!0,i===r&&t()})}static or(e){let t=la.resolve(!1);for(const n of e)t=t.next(e=>e?la.resolve(e):n());return t}static forEach(e,t){const n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new la((n,r)=>{const i=e.length,s=new Array(i);let o=0;for(let a=0;a<i;a++){const c=a;t(e[c]).next(e=>{s[c]=e,++o,o===i&&n(s)},e=>r(e))}})}static doWhile(e,t){return new la((n,r)=>{const i=()=>{!0===e()?t().next(()=>{i()},r):n()};i()})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ha="SimpleDb";class da{static open(e,t,n,r){try{return new da(t,e.transaction(r,n))}catch(i){throw new ga(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new lo,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new ga(e,t.error)):this.S.resolve()},this.transaction.onerror=t=>{const n=Ia(t.target.error);this.S.reject(new ga(e,n))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(eo(ha,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||"function"!=typeof e.commit||e.commit()}store(e){const t=this.transaction.objectStore(e);return new va(t)}}class fa{static delete(e){return eo(ha,"Removing database:",e),wa(o().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!v())return!1;if(fa.F())return!0;const e=p(),t=fa.M(e),n=0<t&&t<10,r=pa(e),i=0<r&&r<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static F(){var e;return"undefined"!=typeof process&&"YES"===(null==(e=process.__PRIVATE_env)?void 0:e.__PRIVATE_USE_MOCK_PERSISTENCE)}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.N=n,this.B=null,12.2===fa.M(p())&&to("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(eo(ha,"Opening database:",this.name),this.db=await new Promise((t,n)=>{const r=indexedDB.open(this.name,this.version);r.onsuccess=e=>{const n=e.target.result;t(n)},r.onblocked=()=>{n(new ga(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=t=>{const r=t.target.error;"VersionError"===r.name?n(new uo(co.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):"InvalidStateError"===r.name?n(new uo(co.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+r)):n(new ga(e,r))},r.onupgradeneeded=e=>{eo(ha,'Database "'+this.name+'" requires upgrade from version:',e.oldVersion);const t=e.target.result;this.N.k(t,r.transaction,e.oldVersion,this.version).next(()=>{eo(ha,"Database upgrade to version "+this.version+" complete")})}})),this.q&&(this.db.onversionchange=e=>this.q(e)),this.db}K(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,r){const i="readonly"===t;let s=0;for(;;){++s;try{this.db=await this.L(e);const t=da.open(this.db,e,i?"readonly":"readwrite",n),s=r(t).next(e=>(t.C(),e)).catch(e=>(t.abort(e),la.reject(e))).toPromise();return s.catch(()=>{}),await t.D,s}catch(o){const e=o,t="FirebaseError"!==e.name&&s<3;if(eo(ha,"Transaction failed with error:",e.message,"Retrying:",t),this.close(),!t)return Promise.reject(e)}}}close(){this.db&&this.db.close(),this.db=void 0}}function pa(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}class ma{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return wa(this.U.delete())}}class ga extends uo{constructor(e,t){super(co.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function ya(e){return"IndexedDbTransactionError"===e.name}class va{constructor(e){this.store=e}put(e,t){let n;return void 0!==t?(eo(ha,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(eo(ha,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),wa(n)}add(e){return eo(ha,"ADD",this.store.name,e,e),wa(this.store.add(e))}get(e){return wa(this.store.get(e)).next(t=>(void 0===t&&(t=null),eo(ha,"GET",this.store.name,e,t),t))}delete(e){return eo(ha,"DELETE",this.store.name,e),wa(this.store.delete(e))}count(){return eo(ha,"COUNT",this.store.name),wa(this.store.count())}J(e,t){const n=this.options(e,t),r=n.index?this.store.index(n.index):this.store;if("function"==typeof r.getAll){const e=r.getAll(n.range);return new la((t,n)=>{e.onerror=e=>{n(e.target.error)},e.onsuccess=e=>{t(e.target.result)}})}{const e=this.cursor(n),t=[];return this.H(e,(e,n)=>{t.push(n)}).next(()=>t)}}Z(e,t){const n=this.store.getAll(e,null===t?void 0:t);return new la((e,t)=>{n.onerror=e=>{t(e.target.error)},n.onsuccess=t=>{e(t.target.result)}})}X(e,t){eo(ha,"DELETE ALL",this.store.name);const n=this.options(e,t);n.Y=!1;const r=this.cursor(n);return this.H(r,(e,t,n)=>n.delete())}ee(e,t){let n;t?n=e:(n={},t=e);const r=this.cursor(n);return this.H(r,t)}te(e){const t=this.cursor({});return new la((n,r)=>{t.onerror=e=>{const t=Ia(e.target.error);r(t)},t.onsuccess=t=>{const r=t.target.result;r?e(r.primaryKey,r.value).next(e=>{e?r.continue():n()}):n()}})}H(e,t){const n=[];return new la((r,i)=>{e.onerror=e=>{i(e.target.error)},e.onsuccess=e=>{const i=e.target.result;if(!i)return void r();const s=new ma(i),o=t(i.primaryKey,i.value,s);if(o instanceof la){const e=o.catch(e=>(s.done(),la.reject(e)));n.push(e)}s.isDone?r():null===s.G?i.continue():i.continue(s.G)}}).next(()=>la.waitFor(n))}options(e,t){let n;return void 0!==e&&("string"==typeof e?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.Y?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function wa(e){return new la((t,n)=>{e.onsuccess=e=>{const n=e.target.result;t(n)},e.onerror=e=>{const t=Ia(e.target.error);n(t)}})}let _a=!1;function Ia(e){const t=fa.M(p());if(t>=12.2&&t<13){const t="An internal error was encountered in the Indexed Database server";if(e.message.indexOf(t)>=0){const e=new uo("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return _a||(_a=!0,setTimeout(()=>{throw e},0)),e}}return e}const Ta="IndexBackfiller";class ba{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return null!==this.task}re(e){eo(Ta,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const e=await this.ne.ie();eo(Ta,`Documents written: ${e}`)}catch(e){ya(e)?eo(Ta,"Ignoring IndexedDB error during index backfill: ",e):await ua(e)}await this.re(6e4)})}}class Ea{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.se(t,e))}se(e,t){const n=new Set;let r=t,i=!0;return la.doWhile(()=>!0===i&&r>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(t=>{if(null!==t&&!n.has(t))return eo(Ta,`Processing collection: ${t}`),this.oe(e,t,r).next(e=>{r-=e,n.add(t)});i=!1})).next(()=>t-r)}oe(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(r=>this.localStore.localDocuments.getNextDocuments(e,t,r,n).next(n=>{const i=n.changes;return this.localStore.indexManager.updateIndexEntries(e,i).next(()=>this._e(r,n)).next(n=>(eo(Ta,`Updating offset: ${n}`),this.localStore.indexManager.updateCollectionGroup(e,t,n))).next(()=>i.size)}))}_e(e,t){let n=e;return t.changes.forEach((e,t)=>{const r=ia(t);oa(r,n)>0&&(n=r)}),new sa(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ae(e),this.ue=e=>t.writeSequenceNumber(e))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Sa.ce=-1;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Aa=-1;function Ca(e){return null==e}function ka(e){return 0===e&&1/e==-1/0}function Na(e){return"number"==typeof e&&Number.isInteger(e)&&!ka(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Da="";function Ra(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=Pa(t)),t=Oa(e.get(n),t);return Pa(t)}function Oa(e,t){let n=t;const r=e.length;for(let i=0;i<r;i++){const t=e.charAt(i);switch(t){case"\0":n+="";break;case Da:n+="";break;default:n+=t}}return n}function Pa(e){return e+Da+""}function xa(e){const t=e.length;if(oo(t>=2,64408,{path:e}),2===t)return oo(e.charAt(0)===Da&&""===e.charAt(1),56145,{path:e}),Ro.emptyPath();const n=t-2,r=[];let i="";for(let s=0;s<t;){const t=e.indexOf(Da,s);switch((t<0||t>n)&&io(50515,{path:e}),e.charAt(t+1)){case"":const n=e.substring(s,t);let o;0===i.length?o=n:(i+=n,o=i,i=""),r.push(o);break;case"":i+=e.substring(s,t),i+="\0";break;case"":i+=e.substring(s,t+1);break;default:io(61167,{path:e})}s=t+2}return new Ro(r)}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const La="remoteDocuments",Ma="owner",Fa="owner",Va="mutationQueues",Ua="mutations",qa="batchId",Ba="userMutationsIndex",ja=["userId","batchId"];
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function za(e,t){return[e,Ra(t)]}function $a(e,t,n){return[e,Ra(t),n]}const Ga={},Ka="documentMutations",Ha="remoteDocumentsV14",Wa=["prefixPath","collectionGroup","readTime","documentId"],Qa="documentKeyIndex",Ja=["prefixPath","collectionGroup","documentId"],Ya="collectionGroupIndex",Xa=["collectionGroup","readTime","prefixPath","documentId"],Za="remoteDocumentGlobal",ec="remoteDocumentGlobalKey",tc="targets",nc="queryTargetsIndex",rc=["canonicalId","targetId"],ic="targetDocuments",sc=["targetId","path"],oc="documentTargetsIndex",ac=["path","targetId"],cc="targetGlobalKey",uc="targetGlobal",lc="collectionParents",hc=["collectionId","parent"],dc="clientMetadata",fc="bundles",pc="namedQueries",mc="indexConfiguration",gc="collectionGroupIndex",yc="indexState",vc=["indexId","uid"],wc="sequenceNumberIndex",_c=["uid","sequenceNumber"],Ic="indexEntries",Tc=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],bc="documentKeyIndex",Ec=["indexId","uid","orderedDocumentKey"],Sc="documentOverlays",Ac=["userId","collectionPath","documentId"],Cc="collectionPathOverlayIndex",kc=["userId","collectionPath","largestBatchId"],Nc="collectionGroupOverlayIndex",Dc=["userId","collectionGroup","largestBatchId"],Rc="globals",Oc=[Va,Ua,Ka,La,tc,Ma,uc,ic,dc,Za,lc,fc,pc],Pc=[...Oc,Sc],xc=[Va,Ua,Ka,Ha,tc,Ma,uc,ic,dc,Za,lc,fc,pc,Sc],Lc=xc,Mc=[...Lc,mc,yc,Ic],Fc=Mc,Vc=[...Mc,Rc],Uc=Vc;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc extends ca{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function Bc(e,t){const n=ao(e);return fa.O(n.le,t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jc(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function zc(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function $c(e,t){const n=[];for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.push(t(e[r],r,e));return n}function Gc(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(e,t){this.comparator=e,this.root=t||Wc.EMPTY}insert(e,t){return new Kc(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Wc.BLACK,null,null))}remove(e){return new Kc(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Wc.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Hc(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Hc(this.root,e,this.comparator,!1)}getReverseIterator(){return new Hc(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Hc(this.root,e,this.comparator,!0)}}class Hc{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Wc{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:Wc.RED,this.left=null!=r?r:Wc.EMPTY,this.right=null!=i?i:Wc.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,i){return new Wc(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Wc.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return Wc.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Wc.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Wc.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw io(43730,{key:this.key,value:this.value});if(this.right.isRed())throw io(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw io(27949);return e+(this.isRed()?0:1)}}Wc.EMPTY=null,Wc.RED=!0,Wc.BLACK=!1,Wc.EMPTY=new class{constructor(){this.size=0}get key(){throw io(57766)}get value(){throw io(16141)}get color(){throw io(16727)}get left(){throw io(29726)}get right(){throw io(36894)}copy(e,t,n,r,i){return this}insert(e,t,n){return new Wc(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Qc{constructor(e){this.comparator=e,this.data=new Kc(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Jc(this.data.getIterator())}getIteratorFrom(e){return new Jc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof Qc))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Qc(this.comparator);return t.data=e,t}}class Jc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Yc(e){return e.hasNext()?e.getNext():void 0}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xc{constructor(e){this.fields=e,e.sort(Po.comparator)}static empty(){return new Xc([])}unionWith(e){let t=new Qc(Po.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Xc(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Co(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zc extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class eu{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(e){try{return atob(e)}catch(t){throw"undefined"!=typeof DOMException&&t instanceof DOMException?new Zc("Invalid base64 string: "+t):t}}(e);return new eu(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new eu(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return To(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}eu.EMPTY_BYTE_STRING=new eu("");const tu=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function nu(e){if(oo(!!e,39018),"string"==typeof e){let t=0;const n=tu.exec(e);if(oo(!!n,46558,{timestamp:e}),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:ru(e.seconds),nanos:ru(e.nanos)}}function ru(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function iu(e){return"string"==typeof e?eu.fromBase64String(e):eu.fromUint8Array(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const su="server_timestamp",ou="__type__",au="__previous_value__",cu="__local_write_time__";function uu(e){var t,n;return(null==(n=((null==(t=null==e?void 0:e.mapValue)?void 0:t.fields)||{})[ou])?void 0:n.stringValue)===su}function lu(e){const t=e.mapValue.fields[au];return uu(t)?lu(t):t}function hu(e){const t=nu(e.mapValue.fields[cu].timestampValue);return new Ho(t.seconds,t.nanos)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class du{constructor(e,t,n,r,i,s,o,a,c,u,l){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=c,this.isUsingEmulator=u,this.apiKey=l}}const fu="(default)";class pu{constructor(e,t){this.projectId=e,this.database=t||fu}static empty(){return new pu("","")}get isDefaultDatabase(){return this.database===fu}isEqual(e){return e instanceof pu&&e.projectId===this.projectId&&e.database===this.database}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const mu="__type__",gu="__max__",yu={mapValue:{fields:{__type__:{stringValue:gu}}}},vu="__vector__",wu="value",_u={nullValue:"NULL_VALUE"};function Iu(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?uu(e)?4:Vu(e)?9007199254740991:Mu(e)?10:11:io(28295,{value:e})}function Tu(e,t){if(e===t)return!0;const n=Iu(e);if(n!==Iu(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return hu(e).isEqual(hu(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=nu(e.timestampValue),r=nu(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return r=t,iu(e.bytesValue).isEqual(iu(r.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return ru(e.geoPointValue.latitude)===ru(t.geoPointValue.latitude)&&ru(e.geoPointValue.longitude)===ru(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return ru(e.integerValue)===ru(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=ru(e.doubleValue),r=ru(t.doubleValue);return n===r?ka(n)===ka(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return Co(e.arrayValue.values||[],t.arrayValue.values||[],Tu);case 10:case 11:return function(e,t){const n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(jc(n)!==jc(r))return!1;for(const i in n)if(n.hasOwnProperty(i)&&(void 0===r[i]||!Tu(n[i],r[i])))return!1;return!0}(e,t);default:return io(52216,{left:e})}var r}function bu(e,t){return void 0!==(e.values||[]).find(e=>Tu(e,t))}function Eu(e,t){if(e===t)return 0;const n=Iu(e),r=Iu(t);if(n!==r)return To(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return To(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=ru(e.integerValue||e.doubleValue),r=ru(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return Su(e.timestampValue,t.timestampValue);case 4:return Su(hu(e),hu(t));case 5:return bo(e.stringValue,t.stringValue);case 6:return function(e,t){const n=iu(e),r=iu(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),r=t.split("/");for(let i=0;i<n.length&&i<r.length;i++){const e=To(n[i],r[i]);if(0!==e)return e}return To(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=To(ru(e.latitude),ru(t.latitude));return 0!==n?n:To(ru(e.longitude),ru(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return Au(e.arrayValue,t.arrayValue);case 10:return function(e,t){var n,r,i,s;const o=e.fields||{},a=t.fields||{},c=null==(n=o[wu])?void 0:n.arrayValue,u=null==(r=a[wu])?void 0:r.arrayValue,l=To((null==(i=null==c?void 0:c.values)?void 0:i.length)||0,(null==(s=null==u?void 0:u.values)?void 0:s.length)||0);return 0!==l?l:Au(c,u)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===yu.mapValue&&t===yu.mapValue)return 0;if(e===yu.mapValue)return 1;if(t===yu.mapValue)return-1;const n=e.fields||{},r=Object.keys(n),i=t.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let o=0;o<r.length&&o<s.length;++o){const e=bo(r[o],s[o]);if(0!==e)return e;const t=Eu(n[r[o]],i[s[o]]);if(0!==t)return t}return To(r.length,s.length)}(e.mapValue,t.mapValue);default:throw io(23264,{he:n})}}function Su(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return To(e,t);const n=nu(e),r=nu(t),i=To(n.seconds,r.seconds);return 0!==i?i:To(n.nanos,r.nanos)}function Au(e,t){const n=e.values||[],r=t.values||[];for(let i=0;i<n.length&&i<r.length;++i){const e=Eu(n[i],r[i]);if(e)return e}return To(n.length,r.length)}function Cu(e){return ku(e)}function ku(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=nu(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?iu(e.bytesValue).toBase64():"referenceValue"in e?function(e){return xo.fromName(e).toString()}(e.referenceValue):"geoPointValue"in e?function(e){return`geo(${e.latitude},${e.longitude})`}(e.geoPointValue):"arrayValue"in e?function(e){let t="[",n=!0;for(const r of e.values||[])n?n=!1:t+=",",t+=ku(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",r=!0;for(const i of t)r?r=!1:n+=",",n+=`${i}:${ku(e.fields[i])}`;return n+"}"}(e.mapValue):io(61005,{value:e})}function Nu(e){switch(Iu(e)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=lu(e);return t?16+Nu(t):16;case 5:return 2*e.stringValue.length;case 6:return iu(e.bytesValue).approximateByteSize();case 7:return e.referenceValue.length;case 9:return(e.arrayValue.values||[]).reduce((e,t)=>e+Nu(t),0);case 10:case 11:return function(e){let t=0;return zc(e.fields,(e,n)=>{t+=e.length+Nu(n)}),t}(e.mapValue);default:throw io(13486,{value:e})}}function Du(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function Ru(e){return!!e&&"integerValue"in e}function Ou(e){return!!e&&"arrayValue"in e}function Pu(e){return!!e&&"nullValue"in e}function xu(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function Lu(e){return!!e&&"mapValue"in e}function Mu(e){var t,n;return(null==(n=((null==(t=null==e?void 0:e.mapValue)?void 0:t.fields)||{})[mu])?void 0:n.stringValue)===vu}function Fu(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){const t={mapValue:{fields:{}}};return zc(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=Fu(n)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=Fu(e.arrayValue.values[n]);return t}return{...e}}function Vu(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===gu}const Uu={mapValue:{fields:{[mu]:{stringValue:vu},[wu]:{arrayValue:{}}}}};function qu(e){return"nullValue"in e?_u:"booleanValue"in e?{booleanValue:!1}:"integerValue"in e||"doubleValue"in e?{doubleValue:NaN}:"timestampValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in e?{stringValue:""}:"bytesValue"in e?{bytesValue:""}:"referenceValue"in e?Du(pu.empty(),xo.empty()):"geoPointValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in e?{arrayValue:{}}:"mapValue"in e?Mu(e)?Uu:{mapValue:{}}:io(35942,{value:e})}function Bu(e){return"nullValue"in e?{booleanValue:!1}:"booleanValue"in e?{doubleValue:NaN}:"integerValue"in e||"doubleValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in e?{stringValue:""}:"stringValue"in e?{bytesValue:""}:"bytesValue"in e?Du(pu.empty(),xo.empty()):"referenceValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in e?{arrayValue:{}}:"arrayValue"in e?Uu:"mapValue"in e?Mu(e)?{mapValue:{}}:yu:io(61959,{value:e})}function ju(e,t){const n=Eu(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?-1:!e.inclusive&&t.inclusive?1:0}function zu(e,t){const n=Eu(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?1:!e.inclusive&&t.inclusive?-1:0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u{constructor(e){this.value=e}static empty(){return new $u({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Lu(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Fu(t)}setAll(e){let t=Po.emptyPath(),n={},r=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){const e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=i.popLast()}e?n[i.lastSegment()]=Fu(e):r.push(i.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,n,r)}delete(e){const t=this.field(e.popLast());Lu(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Tu(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];Lu(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){zc(t,(t,n)=>e[t]=n);for(const r of n)delete e[r]}clone(){return new $u(Fu(this.value))}}function Gu(e){const t=[];return zc(e.fields,(e,n)=>{const r=new Po([e]);if(Lu(n)){const e=Gu(n.mapValue).fields;if(0===e.length)t.push(r);else for(const n of e)t.push(r.child(n))}else t.push(r)}),new Xc(t)
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class Ku{constructor(e,t,n,r,i,s,o){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=i,this.data=s,this.documentState=o}static newInvalidDocument(e){return new Ku(e,0,Wo.min(),Wo.min(),Wo.min(),$u.empty(),0)}static newFoundDocument(e,t,n,r){return new Ku(e,1,t,Wo.min(),n,r,0)}static newNoDocument(e,t){return new Ku(e,2,t,Wo.min(),Wo.min(),$u.empty(),0)}static newUnknownDocument(e,t){return new Ku(e,3,t,Wo.min(),Wo.min(),$u.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Wo.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=$u.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=$u.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Wo.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof Ku&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ku(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hu{constructor(e,t){this.position=e,this.inclusive=t}}function Wu(e,t,n){let r=0;for(let i=0;i<e.position.length;i++){const s=t[i],o=e.position[i];if(r=s.field.isKeyField()?xo.comparator(xo.fromName(o.referenceValue),n.key):Eu(o,n.data.field(s.field)),"desc"===s.dir&&(r*=-1),0!==r)break}return r}function Qu(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!Tu(e.position[n],t.position[n]))return!1;return!0}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ju{constructor(e,t="asc"){this.field=e,this.dir=t}}function Yu(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xu{}class Zu extends Xu{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new ul(e,t,n):"array-contains"===t?new fl(e,n):"in"===t?new pl(e,n):"not-in"===t?new ml(e,n):"array-contains-any"===t?new gl(e,n):new Zu(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new ll(e,n):new hl(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(Eu(t,this.value)):null!==t&&Iu(this.value)===Iu(t)&&this.matchesComparison(Eu(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return io(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class el extends Xu{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new el(e,t)}matches(e){return tl(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Pe||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function tl(e){return"and"===e.op}function nl(e){return"or"===e.op}function rl(e){return il(e)&&tl(e)}function il(e){for(const t of e.filters)if(t instanceof el)return!1;return!0}function sl(e){if(e instanceof Zu)return e.field.canonicalString()+e.op.toString()+Cu(e.value);if(rl(e))return e.filters.map(e=>sl(e)).join(",");{const t=e.filters.map(e=>sl(e)).join(",");return`${e.op}(${t})`}}function ol(e,t){return e instanceof Zu?(n=e,(r=t)instanceof Zu&&n.op===r.op&&n.field.isEqual(r.field)&&Tu(n.value,r.value)):e instanceof el?function(e,t){return t instanceof el&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce((e,n,r)=>e&&ol(n,t.filters[r]),!0)}(e,t):void io(19439);var n,r}function al(e,t){const n=e.filters.concat(t);return el.create(n,e.op)}function cl(e){return e instanceof Zu?`${(t=e).field.canonicalString()} ${t.op} ${Cu(t.value)}`:e instanceof el?function(e){return e.op.toString()+" {"+e.getFilters().map(cl).join(" ,")+"}"}(e):"Filter";var t}class ul extends Zu{constructor(e,t,n){super(e,t,n),this.key=xo.fromName(n.referenceValue)}matches(e){const t=xo.comparator(e.key,this.key);return this.matchesComparison(t)}}class ll extends Zu{constructor(e,t){super(e,"in",t),this.keys=dl("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class hl extends Zu{constructor(e,t){super(e,"not-in",t),this.keys=dl("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function dl(e,t){var n;return((null==(n=t.arrayValue)?void 0:n.values)||[]).map(e=>xo.fromName(e.referenceValue))}class fl extends Zu{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ou(t)&&bu(t.arrayValue,this.value)}}class pl extends Zu{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&bu(this.value.arrayValue,t)}}class ml extends Zu{constructor(e,t){super(e,"not-in",t)}matches(e){if(bu(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!bu(this.value.arrayValue,t)}}class gl extends Zu{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ou(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>bu(this.value.arrayValue,e))}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{constructor(e,t=null,n=[],r=[],i=null,s=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=o,this.Te=null}}function vl(e,t=null,n=[],r=[],i=null,s=null,o=null){return new yl(e,t,n,r,i,s,o)}function wl(e){const t=ao(e);if(null===t.Te){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(e=>sl(e)).join(","),e+="|ob:",e+=t.orderBy.map(e=>{return(t=e).field.canonicalString()+t.dir;var t}).join(","),Ca(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(e=>Cu(e)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(e=>Cu(e)).join(",")),t.Te=e}return t.Te}function _l(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!Yu(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!ol(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!Qu(e.startAt,t.startAt)&&Qu(e.endAt,t.endAt)}function Il(e){return xo.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function Tl(e,t){return e.filters.filter(e=>e instanceof Zu&&e.field.isEqual(t))}function bl(e,t,n){let r=_u,i=!0;for(const s of Tl(e,t)){let e=_u,t=!0;switch(s.op){case"<":case"<=":e=qu(s.value);break;case"==":case"in":case">=":e=s.value;break;case">":e=s.value,t=!1;break;case"!=":case"not-in":e=_u}ju({value:r,inclusive:i},{value:e,inclusive:t})<0&&(r=e,i=t)}if(null!==n)for(let s=0;s<e.orderBy.length;++s)if(e.orderBy[s].field.isEqual(t)){const e=n.position[s];ju({value:r,inclusive:i},{value:e,inclusive:n.inclusive})<0&&(r=e,i=n.inclusive);break}return{value:r,inclusive:i}}function El(e,t,n){let r=yu,i=!0;for(const s of Tl(e,t)){let e=yu,t=!0;switch(s.op){case">=":case">":e=Bu(s.value),t=!1;break;case"==":case"in":case"<=":e=s.value;break;case"<":e=s.value,t=!1;break;case"!=":case"not-in":e=yu}zu({value:r,inclusive:i},{value:e,inclusive:t})>0&&(r=e,i=t)}if(null!==n)for(let s=0;s<e.orderBy.length;++s)if(e.orderBy[s].field.isEqual(t)){const e=n.position[s];zu({value:r,inclusive:i},{value:e,inclusive:n.inclusive})>0&&(r=e,i=n.inclusive);break}return{value:r,inclusive:i}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sl{constructor(e,t=null,n=[],r=[],i=null,s="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=o,this.endAt=a,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function Al(e,t,n,r,i,s,o,a){return new Sl(e,t,n,r,i,s,o,a)}function Cl(e){return new Sl(e)}function kl(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function Nl(e){return null!==e.collectionGroup}function Dl(e){const t=ao(e);if(null===t.Ee){t.Ee=[];const e=new Set;for(const r of t.explicitOrderBy)t.Ee.push(r),e.add(r.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(e){let t=new Qc(Po.comparator);return e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t})(t).forEach(r=>{e.has(r.canonicalString())||r.isKeyField()||t.Ee.push(new Ju(r,n))}),e.has(Po.keyField().canonicalString())||t.Ee.push(new Ju(Po.keyField(),n))}return t.Ee}function Rl(e){const t=ao(e);return t.Ie||(t.Ie=Pl(t,Dl(e))),t.Ie}function Ol(e){const t=ao(e);return t.Re||(t.Re=Pl(t,e.explicitOrderBy)),t.Re}function Pl(e,t){if("F"===e.limitType)return vl(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{const t="desc"===e.dir?"asc":"desc";return new Ju(e.field,t)});const n=e.endAt?new Hu(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new Hu(e.startAt.position,e.startAt.inclusive):null;return vl(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}function xl(e,t){const n=e.filters.concat([t]);return new Sl(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function Ll(e,t,n){return new Sl(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function Ml(e,t){return _l(Rl(e),Rl(t))&&e.limitType===t.limitType}function Fl(e){return`${wl(Rl(e))}|lt:${e.limitType}`}function Vl(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(e=>cl(e)).join(", ")}]`),Ca(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(e=>{return`${(t=e).field.canonicalString()} (${t.dir})`;var t}).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>Cu(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>Cu(e)).join(",")),`Target(${t})`}(Rl(e))}; limitType=${e.limitType})`}function Ul(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):xo.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of Dl(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&(r=t,!((n=e).startAt&&!function(e,t,n){const r=Wu(e,t,n);return e.inclusive?r<=0:r<0}(n.startAt,Dl(n),r)||n.endAt&&!function(e,t,n){const r=Wu(e,t,n);return e.inclusive?r>=0:r>0}(n.endAt,Dl(n),r)));var n,r}function ql(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function Bl(e){return(t,n)=>{let r=!1;for(const i of Dl(e)){const e=jl(i,t,n);if(0!==e)return e;r=r||i.field.isKeyField()}return 0}}function jl(e,t,n){const r=e.field.isKeyField()?xo.comparator(t.key,n.key):function(e,t,n){const r=t.data.field(e),i=n.data.field(e);return null!==r&&null!==i?Eu(r,i):io(42886)}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return io(19790,{direction:e.dir})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zl{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[r,i]of n)if(this.equalsFn(r,e))return i}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){zc(this.inner,(t,n)=>{for(const[r,i]of n)e(r,i)})}isEmpty(){return Gc(this.inner)}size(){return this.innerSize}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $l=new Kc(xo.comparator);function Gl(){return $l}const Kl=new Kc(xo.comparator);function Hl(...e){let t=Kl;for(const n of e)t=t.insert(n.key,n);return t}function Wl(e){let t=Kl;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function Ql(){return Yl()}function Jl(){return Yl()}function Yl(){return new zl(e=>e.toString(),(e,t)=>e.isEqual(t))}const Xl=new Kc(xo.comparator),Zl=new Qc(xo.comparator);function eh(...e){let t=Zl;for(const n of e)t=t.add(n);return t}const th=new Qc(To);function nh(){return th}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rh(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ka(t)?"-0":t}}function ih(e){return{integerValue:""+e}}function sh(e,t){return Na(t)?ih(t):rh(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(){this._=void 0}}function ah(e,t,n){return e instanceof lh?function(e,t){const n={fields:{[ou]:{stringValue:su},[cu]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&uu(t)&&(t=lu(t)),t&&(n.fields[au]=t),{mapValue:n}}(n,t):e instanceof hh?dh(e,t):e instanceof fh?ph(e,t):function(e,t){const n=uh(e,t),r=gh(n)+gh(e.Ae);return Ru(n)&&Ru(e.Ae)?ih(r):rh(e.serializer,r)}(e,t)}function ch(e,t,n){return e instanceof hh?dh(e,t):e instanceof fh?ph(e,t):n}function uh(e,t){return e instanceof mh?Ru(n=t)||(r=n)&&"doubleValue"in r?t:{integerValue:0}:null;var n,r}class lh extends oh{}class hh extends oh{constructor(e){super(),this.elements=e}}function dh(e,t){const n=yh(t);for(const r of e.elements)n.some(e=>Tu(e,r))||n.push(r);return{arrayValue:{values:n}}}class fh extends oh{constructor(e){super(),this.elements=e}}function ph(e,t){let n=yh(t);for(const r of e.elements)n=n.filter(e=>!Tu(e,r));return{arrayValue:{values:n}}}class mh extends oh{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function gh(e){return ru(e.integerValue||e.doubleValue)}function yh(e){return Ou(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vh{constructor(e,t){this.field=e,this.transform=t}}class wh{constructor(e,t){this.version=e,this.transformResults=t}}class _h{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new _h}static exists(e){return new _h(void 0,e)}static updateTime(e){return new _h(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ih(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class Th{}function bh(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new Ph(e.key,_h.none()):new kh(e.key,e.data,_h.none());{const n=e.data,r=$u.empty();let i=new Qc(Po.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),i=i.add(e)}return new Nh(e.key,r,new Xc(i.toArray()),_h.none())}}function Eh(e,t,n){var r;e instanceof kh?function(e,t,n){const r=e.value.clone(),i=Rh(e.fieldTransforms,t,n.transformResults);r.setAll(i),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof Nh?function(e,t,n){if(!Ih(e.precondition,t))return void t.convertToUnknownDocument(n.version);const r=Rh(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(Dh(e)),i.setAll(r),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(e,t,n):(r=n,t.convertToNoDocument(r.version).setHasCommittedMutations())}function Sh(e,t,n,r){return e instanceof kh?function(e,t,n,r){if(!Ih(e.precondition,t))return n;const i=e.value.clone(),s=Oh(e.fieldTransforms,r,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,r):e instanceof Nh?function(e,t,n,r){if(!Ih(e.precondition,t))return n;const i=Oh(e.fieldTransforms,r,t),s=t.data;return s.setAll(Dh(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):(i=t,s=n,Ih(e.precondition,i)?(i.convertToNoDocument(i.version).setHasLocalMutations(),null):s);var i,s}function Ah(e,t){let n=null;for(const r of e.fieldTransforms){const e=t.data.field(r.field),i=uh(r.transform,e||null);null!=i&&(null===n&&(n=$u.empty()),n.set(r.field,i))}return n||null}function Ch(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(n=e.fieldTransforms,r=t.fieldTransforms,!!(void 0===n&&void 0===r||n&&r&&Co(n,r,(e,t)=>function(e,t){return e.field.isEqual(t.field)&&(n=e.transform,r=t.transform,n instanceof hh&&r instanceof hh||n instanceof fh&&r instanceof fh?Co(n.elements,r.elements,Tu):n instanceof mh&&r instanceof mh?Tu(n.Ae,r.Ae):n instanceof lh&&r instanceof lh);var n,r}(e,t)))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask)));var n,r}class kh extends Th{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Nh extends Th{constructor(e,t,n,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Dh(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}}),t}function Rh(e,t,n){const r=new Map;oo(e.length===n.length,32656,{Ve:n.length,de:e.length});for(let i=0;i<n.length;i++){const s=e[i],o=s.transform,a=t.data.field(s.field);r.set(s.field,ch(o,a,n[i]))}return r}function Oh(e,t,n){const r=new Map;for(const i of e){const e=i.transform,s=n.data.field(i.field);r.set(i.field,ah(e,s,t))}return r}class Ph extends Th{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class xh extends Th{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lh{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const t=this.mutations[r];t.key.isEqual(e.key)&&Eh(t,e,n[r])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Sh(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Sh(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Jl();return this.mutations.forEach(r=>{const i=e.get(r.key),s=i.overlayedDocument;let o=this.applyToLocalView(s,i.mutatedFields);o=t.has(r.key)?null:o;const a=bh(s,o);null!==a&&n.set(r.key,a),s.isValidDocument()||s.convertToNoDocument(Wo.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),eh())}isEqual(e){return this.batchId===e.batchId&&Co(this.mutations,e.mutations,(e,t)=>Ch(e,t))&&Co(this.baseMutations,e.baseMutations,(e,t)=>Ch(e,t))}}class Mh{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){oo(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let r=function(){return Xl}();const i=e.mutations;for(let s=0;s<i.length;s++)r=r.insert(i[s].key,n[s].version);return new Mh(e,t,n,r)}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fh{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vh{constructor(e,t,n){this.alias=e,this.aggregateType=t,this.fieldPath=n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uh{constructor(e,t){this.count=e,this.unchangedNames=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var qh,Bh;function jh(e){switch(e){case co.OK:return io(64938);case co.CANCELLED:case co.UNKNOWN:case co.DEADLINE_EXCEEDED:case co.RESOURCE_EXHAUSTED:case co.INTERNAL:case co.UNAVAILABLE:case co.UNAUTHENTICATED:return!1;case co.INVALID_ARGUMENT:case co.NOT_FOUND:case co.ALREADY_EXISTS:case co.PERMISSION_DENIED:case co.FAILED_PRECONDITION:case co.ABORTED:case co.OUT_OF_RANGE:case co.UNIMPLEMENTED:case co.DATA_LOSS:return!0;default:return io(15467,{code:e})}}function zh(e){if(void 0===e)return to("GRPC error has no .code"),co.UNKNOWN;switch(e){case qh.OK:return co.OK;case qh.CANCELLED:return co.CANCELLED;case qh.UNKNOWN:return co.UNKNOWN;case qh.DEADLINE_EXCEEDED:return co.DEADLINE_EXCEEDED;case qh.RESOURCE_EXHAUSTED:return co.RESOURCE_EXHAUSTED;case qh.INTERNAL:return co.INTERNAL;case qh.UNAVAILABLE:return co.UNAVAILABLE;case qh.UNAUTHENTICATED:return co.UNAUTHENTICATED;case qh.INVALID_ARGUMENT:return co.INVALID_ARGUMENT;case qh.NOT_FOUND:return co.NOT_FOUND;case qh.ALREADY_EXISTS:return co.ALREADY_EXISTS;case qh.PERMISSION_DENIED:return co.PERMISSION_DENIED;case qh.FAILED_PRECONDITION:return co.FAILED_PRECONDITION;case qh.ABORTED:return co.ABORTED;case qh.OUT_OF_RANGE:return co.OUT_OF_RANGE;case qh.UNIMPLEMENTED:return co.UNIMPLEMENTED;case qh.DATA_LOSS:return co.DATA_LOSS;default:return io(39323,{code:e})}}(Bh=qh||(qh={}))[Bh.OK=0]="OK",Bh[Bh.CANCELLED=1]="CANCELLED",Bh[Bh.UNKNOWN=2]="UNKNOWN",Bh[Bh.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Bh[Bh.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Bh[Bh.NOT_FOUND=5]="NOT_FOUND",Bh[Bh.ALREADY_EXISTS=6]="ALREADY_EXISTS",Bh[Bh.PERMISSION_DENIED=7]="PERMISSION_DENIED",Bh[Bh.UNAUTHENTICATED=16]="UNAUTHENTICATED",Bh[Bh.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Bh[Bh.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Bh[Bh.ABORTED=10]="ABORTED",Bh[Bh.OUT_OF_RANGE=11]="OUT_OF_RANGE",Bh[Bh.UNIMPLEMENTED=12]="UNIMPLEMENTED",Bh[Bh.INTERNAL=13]="INTERNAL",Bh[Bh.UNAVAILABLE=14]="UNAVAILABLE",Bh[Bh.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let $h=null;
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Gh(){return new TextEncoder}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kh=new Vs([4294967295,4294967295],0);function Hh(e){const t=Gh().encode(e),n=new Us;return n.update(t),new Uint8Array(n.digest())}function Wh(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),r=t.getUint32(4,!0),i=t.getUint32(8,!0),s=t.getUint32(12,!0);return[new Vs([n,r],0),new Vs([i,s],0)]}class Qh{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new Jh(`Invalid padding: ${t}`);if(n<0)throw new Jh(`Invalid hash count: ${n}`);if(e.length>0&&0===this.hashCount)throw new Jh(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new Jh(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Vs.fromNumber(this.ge)}ye(e,t,n){let r=e.add(t.multiply(Vs.fromNumber(n)));return 1===r.compare(Kh)&&(r=new Vs([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.ge)return!1;const t=Hh(e),[n,r]=Wh(t);for(let i=0;i<this.hashCount;i++){const e=this.ye(n,r,i);if(!this.we(e))return!1}return!0}static create(e,t,n){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),s=new Qh(i,r,t);return n.forEach(e=>s.insert(e)),s}insert(e){if(0===this.ge)return;const t=Hh(e),[n,r]=Wh(t);for(let i=0;i<this.hashCount;i++){const e=this.ye(n,r,i);this.Se(e)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class Jh extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yh{constructor(e,t,n,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const r=new Map;return r.set(e,Xh.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Yh(Wo.min(),r,new Kc(To),Gl(),eh())}}class Xh{constructor(e,t,n,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Xh(n,t,eh(),eh(),eh())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zh{constructor(e,t,n,r){this.be=e,this.removedTargetIds=t,this.key=n,this.De=r}}class ed{constructor(e,t){this.targetId=e,this.Ce=t}}class td{constructor(e,t,n=eu.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class nd{constructor(){this.ve=0,this.Fe=sd(),this.Me=eu.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return 0!==this.ve}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=eh(),t=eh(),n=eh();return this.Fe.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:io(38017,{changeType:i})}}),new Xh(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=sd()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,oo(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class rd{constructor(e){this.Ge=e,this.ze=new Map,this.je=Gl(),this.Je=id(),this.He=id(),this.Ze=new Kc(To)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.We(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.We(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.Qe(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:io(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((e,n)=>{this.rt(n)&&t(n)})}st(e){const t=e.targetId,n=e.Ce.count,r=this.ot(t);if(r){const i=r.target;if(Il(i))if(0===n){const e=new xo(i.path);this.et(t,e,Ku.newNoDocument(e,Wo.min()))}else oo(1===n,20013,{expectedCount:n});else{const r=this._t(t);if(r!==n){const n=this.ut(e),i=n?this.ct(n,e,r):1;if(0!==i){this.it(t);const e=2===i?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,e)}null==$h||$h.o(function(e,t,n,r,i){var s,o,a;const c={localCacheCount:e,existenceFilterCount:t.count,databaseId:n.database,projectId:n.projectId},u=t.unchangedNames;return u&&(c.bloomFilter={applied:0===i,hashCount:(null==u?void 0:u.hashCount)??0,bitmapLength:(null==(o=null==(s=null==u?void 0:u.bits)?void 0:s.bitmap)?void 0:o.length)??0,padding:(null==(a=null==u?void 0:u.bits)?void 0:a.padding)??0,mightContain:e=>(null==r?void 0:r.mightContain(e))??!1}),c}(r,e.Ce,this.Ge.ht(),n,i))}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:r=0},hashCount:i=0}=t;let s,o;try{s=iu(n).toUint8Array()}catch(a){if(a instanceof Zc)return no("Decoding the base64 bloom filter in existence filter failed ("+a.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw a}try{o=new Qh(s,r,i)}catch(a){return no(a instanceof Jh?"BloomFilter error: ":"Applying bloom filter failed: ",a),null}return 0===o.ge?null:o}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let r=0;return n.forEach(n=>{const i=this.Ge.ht(),s=`projects/${i.projectId}/databases/${i.database}/documents/${n.path.canonicalString()}`;e.mightContain(s)||(this.et(t,n,null),r++)}),r}Tt(e){const t=new Map;this.ze.forEach((n,r)=>{const i=this.ot(r);if(i){if(n.current&&Il(i.target)){const t=new xo(i.target.path);this.Et(t).has(r)||this.It(r,t)||this.et(r,t,Ku.newNoDocument(t,e))}n.Be&&(t.set(r,n.ke()),n.qe())}});let n=eh();this.He.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{const t=this.ot(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.je.forEach((t,n)=>n.setReadTime(e));const r=new Yh(e,t,this.Ze,this.je,n);return this.je=Gl(),this.Je=id(),this.He=id(),this.Ze=new Kc(To),r}Ye(e,t){if(!this.rt(e))return;const n=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const r=this.nt(e);this.It(e,t)?r.Ke(t,1):r.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new nd,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new Qc(To),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new Qc(To),this.Je=this.Je.insert(e,t)),t}rt(e){const t=null!==this.ot(e);return t||eo("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new nd),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function id(){return new Kc(xo.comparator)}function sd(){return new Kc(xo.comparator)}const od=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),ad=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),cd=(()=>({and:"AND",or:"OR"}))();class ud{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ld(e,t){return e.useProto3Json||Ca(t)?t:{value:t}}function hd(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function dd(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function fd(e,t){return hd(e,t.toTimestamp())}function pd(e){return oo(!!e,49232),Wo.fromTimestamp(function(e){const t=nu(e);return new Ho(t.seconds,t.nanos)}(e))}function md(e,t){return gd(e,t).canonicalString()}function gd(e,t){const n=(r=e,new Ro(["projects",r.projectId,"databases",r.database])).child("documents");var r;return void 0===t?n:n.child(t)}function yd(e){const t=Ro.fromString(e);return oo(qd(t),10190,{key:t.toString()}),t}function vd(e,t){return md(e.databaseId,t.path)}function wd(e,t){const n=yd(t);if(n.get(1)!==e.databaseId.projectId)throw new uo(co.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new uo(co.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new xo(bd(n))}function _d(e,t){return md(e.databaseId,t)}function Id(e){const t=yd(e);return 4===t.length?Ro.emptyPath():bd(t)}function Td(e){return new Ro(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function bd(e){return oo(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function Ed(e,t,n){return{name:vd(e,t),fields:n.value.mapValue.fields}}function Sd(e,t,n){const r=wd(e,t.name),i=pd(t.updateTime),s=t.createTime?pd(t.createTime):Wo.min(),o=new $u({mapValue:{fields:t.fields}}),a=Ku.newFoundDocument(r,i,s,o);return n&&a.setHasCommittedMutations(),n?a.setHasCommittedMutations():a}function Ad(e,t){let n;if(t instanceof kh)n={update:Ed(e,t.key,t.value)};else if(t instanceof Ph)n={delete:vd(e,t.key)};else if(t instanceof Nh)n={update:Ed(e,t.key,t.data),updateMask:Ud(t.fieldMask)};else{if(!(t instanceof xh))return io(16599,{dt:t.type});n={verify:vd(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>function(e,t){const n=t.transform;if(n instanceof lh)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof hh)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof fh)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof mh)return{fieldPath:t.field.canonicalString(),increment:n.Ae};throw io(20930,{transform:t.transform})}(0,e))),t.precondition.isNone||(n.currentDocument=(r=e,void 0!==(i=t.precondition).updateTime?{updateTime:fd(r,i.updateTime)}:void 0!==i.exists?{exists:i.exists}:io(27497))),n;var r,i}function Cd(e,t){const n=t.currentDocument?void 0!==(i=t.currentDocument).updateTime?_h.updateTime(pd(i.updateTime)):void 0!==i.exists?_h.exists(i.exists):_h.none():_h.none(),r=t.updateTransforms?t.updateTransforms.map(t=>function(e,t){let n=null;if("setToServerValue"in t)oo("REQUEST_TIME"===t.setToServerValue,16630,{proto:t}),n=new lh;else if("appendMissingElements"in t){const e=t.appendMissingElements.values||[];n=new hh(e)}else if("removeAllFromArray"in t){const e=t.removeAllFromArray.values||[];n=new fh(e)}else"increment"in t?n=new mh(e,t.increment):io(16584,{proto:t});const r=Po.fromServerFormat(t.fieldPath);return new vh(r,n)}(e,t)):[];var i;if(t.update){t.update.name;const i=wd(e,t.update.name),s=new $u({mapValue:{fields:t.update.fields}});if(t.updateMask){const e=function(e){const t=e.fieldPaths||[];return new Xc(t.map(e=>Po.fromServerFormat(e)))}(t.updateMask);return new Nh(i,s,e,n,r)}return new kh(i,s,n,r)}if(t.delete){const r=wd(e,t.delete);return new Ph(r,n)}if(t.verify){const r=wd(e,t.verify);return new xh(r,n)}return io(1463,{proto:t})}function kd(e,t){return{documents:[_d(e,t.path)]}}function Nd(e,t){const n={structuredQuery:{}},r=t.path;let i;null!==t.collectionGroup?(i=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=_d(e,i);const s=function(e){if(0!==e.length)return Vd(el.create(e,"and"))}(t.filters);s&&(n.structuredQuery.where=s);const o=function(e){if(0!==e.length)return e.map(e=>{return{field:Md((t=e).field),direction:Pd(t.dir)};var t})}(t.orderBy);o&&(n.structuredQuery.orderBy=o);const a=ld(e,t.limit);return null!==a&&(n.structuredQuery.limit=a),t.startAt&&(n.structuredQuery.startAt={before:(c=t.startAt).inclusive,values:c.position}),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),{ft:n,parent:i};var c}function Dd(e,t,n,r){const{ft:i,parent:s}=Nd(e,t),o={},a=[];let c=0;return n.forEach(e=>{const t=r?e.alias:"aggregate_"+c++;o[t]=e.alias,"count"===e.aggregateType?a.push({alias:t,count:{}}):"avg"===e.aggregateType?a.push({alias:t,avg:{field:Md(e.fieldPath)}}):"sum"===e.aggregateType&&a.push({alias:t,sum:{field:Md(e.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:a,structuredQuery:i.structuredQuery},parent:i.parent},gt:o,parent:s}}function Rd(e){let t=Id(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){oo(1===r,65062);const e=n.from[0];e.allDescendants?i=e.collectionId:t=t.child(e.collectionId)}let s=[];n.where&&(s=function(e){const t=Od(e);return t instanceof el&&rl(t)?t.getFilters():[t]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(e=>{return new Ju(Fd((t=e).field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(t.direction));var t}));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,Ca(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new Hu(n,t)}(n.startAt));let u=null;return n.endAt&&(u=function(e){const t=!e.before,n=e.values||[];return new Hu(n,t)}(n.endAt)),Al(t,i,o,s,a,"F",c,u)}function Od(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=Fd(e.unaryFilter.field);return Zu.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=Fd(e.unaryFilter.field);return Zu.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Fd(e.unaryFilter.field);return Zu.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=Fd(e.unaryFilter.field);return Zu.create(i,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return io(61313);default:return io(60726)}}(e):void 0!==e.fieldFilter?(t=e,Zu.create(Fd(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return io(58110);default:return io(50506)}}(t.fieldFilter.op),t.fieldFilter.value)):void 0!==e.compositeFilter?function(e){return el.create(e.compositeFilter.filters.map(e=>Od(e)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return io(1026)}}(e.compositeFilter.op))}(e):io(30097,{filter:e});var t}function Pd(e){return od[e]}function xd(e){return ad[e]}function Ld(e){return cd[e]}function Md(e){return{fieldPath:e.canonicalString()}}function Fd(e){return Po.fromServerFormat(e.fieldPath)}function Vd(e){return e instanceof Zu?function(e){if("=="===e.op){if(xu(e.value))return{unaryFilter:{field:Md(e.field),op:"IS_NAN"}};if(Pu(e.value))return{unaryFilter:{field:Md(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(xu(e.value))return{unaryFilter:{field:Md(e.field),op:"IS_NOT_NAN"}};if(Pu(e.value))return{unaryFilter:{field:Md(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Md(e.field),op:xd(e.op),value:e.value}}}(e):e instanceof el?function(e){const t=e.getFilters().map(e=>Vd(e));return 1===t.length?t[0]:{compositeFilter:{op:Ld(e.op),filters:t}}}(e):io(54877,{filter:e})}function Ud(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function qd(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}function Bd(e){return!!e&&"function"==typeof e._toProto&&"ProtoValue"===e._protoValueType}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jd{constructor(e,t,n,r,i=Wo.min(),s=Wo.min(),o=eu.EMPTY_BYTE_STRING,a=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(e){return new jd(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new jd(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new jd(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new jd(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd{constructor(e){this.yt=e}}function $d(e,t){const n=t.key,r={prefixPath:n.getCollectionPath().popLast().toArray(),collectionGroup:n.collectionGroup,documentId:n.path.lastSegment(),readTime:Gd(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())r.document={name:vd(i=e.yt,(s=t).key),fields:s.data.value.mapValue.fields,updateTime:hd(i,s.version.toTimestamp()),createTime:hd(i,s.createTime.toTimestamp())};else if(t.isNoDocument())r.noDocument={path:n.path.toArray(),readTime:Kd(t.version)};else{if(!t.isUnknownDocument())return io(57904,{document:t});r.unknownDocument={path:n.path.toArray(),version:Kd(t.version)}}var i,s;return r}function Gd(e){const t=e.toTimestamp();return[t.seconds,t.nanoseconds]}function Kd(e){const t=e.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function Hd(e){const t=new Ho(e.seconds,e.nanoseconds);return Wo.fromTimestamp(t)}function Wd(e,t){const n=(t.baseMutations||[]).map(t=>Cd(e.yt,t));for(let s=0;s<t.mutations.length-1;++s){const e=t.mutations[s];if(s+1<t.mutations.length&&void 0!==t.mutations[s+1].transform){const n=t.mutations[s+1];e.updateTransforms=n.transform.fieldTransforms,t.mutations.splice(s+1,1),++s}}const r=t.mutations.map(t=>Cd(e.yt,t)),i=Ho.fromMillis(t.localWriteTimeMs);return new Lh(t.batchId,i,n,r)}function Qd(e){const t=Hd(e.readTime),n=void 0!==e.lastLimboFreeSnapshotVersion?Hd(e.lastLimboFreeSnapshotVersion):Wo.min();let r;return r=void 0!==e.query.documents?function(e){const t=e.documents.length;return oo(1===t,1966,{count:t}),Rl(Cl(Id(e.documents[0])))}(e.query):function(e){return Rl(Rd(e))}(e.query),new jd(r,e.targetId,"TargetPurposeListen",e.lastListenSequenceNumber,t,n,eu.fromBase64String(e.resumeToken))}function Jd(e,t){const n=Kd(t.snapshotVersion),r=Kd(t.lastLimboFreeSnapshotVersion);let i;i=Il(t.target)?kd(e.yt,t.target):Nd(e.yt,t.target).ft;const s=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:wl(t.target),readTime:n,resumeToken:s,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function Yd(e){const t=Rd({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?Ll(t,t.limit,"L"):t}function Xd(e,t){return new Fh(t.largestBatchId,Cd(e.yt,t.overlayMutation))}function Zd(e,t){const n=t.path.lastSegment();return[e,Ra(t.path.popLast()),n]}function ef(e,t,n,r){return{indexId:e,uid:t,sequenceNumber:n,readTime:Kd(r.readTime),documentKey:Ra(r.documentKey.path),largestBatchId:r.largestBatchId}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tf{getBundleMetadata(e,t){return nf(e).get(t).next(e=>{if(e)return{id:(t=e).bundleId,createTime:Hd(t.createTime),version:t.version};var t})}saveBundleMetadata(e,t){return nf(e).put({bundleId:(n=t).id,createTime:Kd(pd(n.createTime)),version:n.version});var n}getNamedQuery(e,t){return rf(e).get(t).next(e=>{if(e)return{name:(t=e).name,query:Yd(t.bundledQuery),readTime:Hd(t.readTime)};var t})}saveNamedQuery(e,t){return rf(e).put({name:(n=t).name,readTime:Kd(pd(n.readTime)),bundledQuery:n.bundledQuery});var n}}function nf(e){return Bc(e,fc)}function rf(e){return Bc(e,pc)}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const n=t.uid||"";return new sf(e,n)}getOverlay(e,t){return of(e).get(Zd(this.userId,t)).next(e=>e?Xd(this.serializer,e):null)}getOverlays(e,t){const n=Ql();return la.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){const r=[];return n.forEach((n,i)=>{const s=new Fh(t,i);r.push(this.St(e,s))}),la.waitFor(r)}removeOverlaysForBatchId(e,t,n){const r=new Set;t.forEach(e=>r.add(Ra(e.getCollectionPath())));const i=[];return r.forEach(t=>{const r=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,n+1],!1,!0);i.push(of(e).X(Cc,r))}),la.waitFor(i)}getOverlaysForCollection(e,t,n){const r=Ql(),i=Ra(t),s=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return of(e).J(Cc,s).next(e=>{for(const t of e){const e=Xd(this.serializer,t);r.set(e.getKey(),e)}return r})}getOverlaysForCollectionGroup(e,t,n,r){const i=Ql();let s;const o=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return of(e).ee({index:Nc,range:o},(e,t,n)=>{const o=Xd(this.serializer,t);i.size()<r||o.largestBatchId===s?(i.set(o.getKey(),o),s=o.largestBatchId):n.done()}).next(()=>i)}St(e,t){return of(e).put(function(e,t,n){const[r,i,s]=Zd(t,n.mutation.key);return{userId:t,collectionPath:i,documentId:s,collectionGroup:n.mutation.key.getCollectionGroup(),largestBatchId:n.largestBatchId,overlayMutation:Ad(e.yt,n.mutation)}}(this.serializer,this.userId,t))}}function of(e){return Bc(e,Sc)}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class af{bt(e){return Bc(e,Rc)}getSessionToken(e){return this.bt(e).get("sessionToken").next(e=>{const t=null==e?void 0:e.value;return t?eu.fromUint8Array(t):eu.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cf{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(ru(e.integerValue));else if("doubleValue"in e){const n=ru(e.doubleValue);isNaN(n)?this.Ft(t,13):(this.Ft(t,15),ka(n)?t.Mt(0):t.Mt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ft(t,20),"string"==typeof n&&(n=nu(n)),t.xt(`${n.seconds||""}`),t.Mt(n.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(iu(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ft(t,45),t.Mt(n.latitude||0),t.Mt(n.longitude||0)}else"mapValue"in e?Vu(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):Mu(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Kt(e.arrayValue,t),this.Nt(t)):io(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}qt(e,t){const n=e.fields||{};this.Ft(t,55);for(const r of Object.keys(n))this.Ot(r,t),this.Ct(n[r],t)}kt(e,t){var n,r;const i=e.fields||{};this.Ft(t,53);const s=wu,o=(null==(r=null==(n=i[s].arrayValue)?void 0:n.values)?void 0:r.length)||0;this.Ft(t,15),t.Mt(ru(o)),this.Ot(s,t),this.Ct(i[s],t)}Kt(e,t){const n=e.values||[];this.Ft(t,50);for(const r of n)this.Ct(r,t)}Lt(e,t){this.Ft(t,37),xo.fromName(e).path.forEach(e=>{this.Ft(t,60),this.$t(e,t)})}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}cf.Wt=new cf;
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const uf=255;function lf(e){if(0===e)return 8;let t=0;return e>>4||(t+=4,e<<=4),e>>6||(t+=2,e<<=2),e>>7||(t+=1),t}function hf(e){const t=64-function(e){let t=0;for(let n=0;n<8;++n){const r=lf(255&e[n]);if(t+=r,8!==r)break}return t}(e);return Math.ceil(t/8)}class df{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Gt(n.value),n=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Jt(n.value),n=t.next();this.Ht()}Zt(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.Gt(e);else if(e<2048)this.Gt(960|e>>>6),this.Gt(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Gt(480|e>>>12),this.Gt(128|63&e>>>6),this.Gt(128|63&e);else{const e=t.codePointAt(0);this.Gt(240|e>>>18),this.Gt(128|63&e>>>12),this.Gt(128|63&e>>>6),this.Gt(128|63&e)}}this.zt()}Xt(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.Jt(e);else if(e<2048)this.Jt(960|e>>>6),this.Jt(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Jt(480|e>>>12),this.Jt(128|63&e>>>6),this.Jt(128|63&e);else{const e=t.codePointAt(0);this.Jt(240|e>>>18),this.Jt(128|63&e>>>12),this.Jt(128|63&e>>>6),this.Jt(128|63&e)}}this.Ht()}Yt(e){const t=this.en(e),n=hf(t);this.tn(1+n),this.buffer[this.position++]=255&n;for(let r=t.length-n;r<t.length;++r)this.buffer[this.position++]=255&t[r]}nn(e){const t=this.en(e),n=hf(t);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let r=t.length-n;r<t.length;++r)this.buffer[this.position++]=~(255&t[r])}rn(){this.sn(uf),this.sn(255)}_n(){this.an(uf),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=function(e){const t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e,!1),new Uint8Array(t.buffer)}(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let r=1;r<t.length;++r)t[r]^=n?255:0;return t}Gt(e){const t=255&e;0===t?(this.sn(0),this.sn(255)):t===uf?(this.sn(uf),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;0===t?(this.an(0),this.an(255)):t===uf?(this.an(uf),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const r=new Uint8Array(n);r.set(this.buffer),this.buffer=r}}class ff{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class pf{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class mf{constructor(){this.cn=new df,this.ascending=new ff(this.cn),this.descending=new pf(this.cn)}seed(e){this.cn.seed(e)}ln(e){return 0===e?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gf{constructor(e,t,n,r){this.hn=e,this.Pn=t,this.Tn=n,this.En=r}In(){const e=this.En.length,t=0===e||255===this.En[e-1]?e+1:e,n=new Uint8Array(t);return n.set(this.En,0),t!==e?n.set([0],this.En.length):++n[n.length-1],new gf(this.hn,this.Pn,this.Tn,n)}Rn(e,t,n){return{indexId:this.hn,uid:e,arrayValue:wf(this.Tn),directionalValue:wf(this.En),orderedDocumentKey:wf(t),documentKey:n.path.toArray()}}An(e,t,n){const r=this.Rn(e,t,n);return[r.indexId,r.uid,r.arrayValue,r.directionalValue,r.orderedDocumentKey,r.documentKey]}}function yf(e,t){let n=e.hn-t.hn;return 0!==n?n:(n=vf(e.Tn,t.Tn),0!==n?n:(n=vf(e.En,t.En),0!==n?n:xo.comparator(e.Pn,t.Pn)))}function vf(e,t){for(let n=0;n<e.length&&n<t.length;++n){const r=e[n]-t[n];if(0!==r)return r}return e.length-t.length}function wf(e){return y()?function(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return t}(e):e}function _f(e){return"string"!=typeof e?e:function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(e)}class If{constructor(e){this.Vn=new Qc((e,t)=>Po.comparator(e.field,t.field)),this.collectionId=null!=e.collectionGroup?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const e=t;e.isInequality()?this.Vn=this.Vn.add(e):this.mn.push(e)}}get fn(){return this.Vn.size>1}gn(e){if(oo(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=Yo(e);if(void 0!==t&&!this.pn(t))return!1;const n=Xo(e);let r=new Set,i=0,s=0;for(;i<n.length&&this.pn(n[i]);++i)r=r.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Vn.size>0){const e=this.Vn.getIterator().getNext();if(!r.has(e.field.canonicalString())){const t=n[i];if(!this.yn(e,t)||!this.wn(this.dn[s++],t))return!1}++i}for(;i<n.length;++i){const e=n[i];if(s>=this.dn.length||!this.wn(this.dn[s++],e))return!1}return!0}Sn(){if(this.fn)return null;let e=new Qc(Po.comparator);const t=[];for(const n of this.mn)if(!n.field.isKeyField())if("array-contains"===n.op||"array-contains-any"===n.op)t.push(new ea(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new ea(n.field,0))}for(const n of this.dn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new ea(n.field,"asc"===n.dir?0:1)));return new Jo(Jo.UNKNOWN_ID,this.collectionId,t,na.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(void 0===e||!e.field.isEqual(t.fieldPath))return!1;const n="array-contains"===e.op||"array-contains-any"===e.op;return 2===t.kind===n}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(0===t.kind&&"asc"===e.dir||1===t.kind&&"desc"===e.dir)}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tf(e){var t,n;if(oo(e instanceof Zu||e instanceof el,20012),e instanceof Zu){if(e instanceof pl){const r=(null==(n=null==(t=e.value.arrayValue)?void 0:t.values)?void 0:n.map(t=>Zu.create(e.field,"==",t)))||[];return el.create(r,"or")}return e}const r=e.filters.map(e=>Tf(e));return el.create(r,e.op)}function bf(e){if(0===e.getFilters().length)return[];const t=Cf(Tf(e));return oo(Af(t),7391),Ef(t)||Sf(t)?[t]:t.getFilters()}function Ef(e){return e instanceof Zu}function Sf(e){return e instanceof el&&rl(e)}function Af(e){return Ef(e)||Sf(e)||function(e){if(e instanceof el&&nl(e)){for(const t of e.getFilters())if(!Ef(t)&&!Sf(t))return!1;return!0}return!1}(e)}function Cf(e){if(oo(e instanceof Zu||e instanceof el,34018),e instanceof Zu)return e;if(1===e.filters.length)return Cf(e.filters[0]);const t=e.filters.map(e=>Cf(e));let n=el.create(t,e.op);return n=Df(n),Af(n)?n:(oo(n instanceof el,64498),oo(tl(n),40251),oo(n.filters.length>1,57927),n.filters.reduce((e,t)=>kf(e,t)))}function kf(e,t){let n;return oo(e instanceof Zu||e instanceof el,38388),oo(t instanceof Zu||t instanceof el,25473),n=e instanceof Zu?t instanceof Zu?(r=e,i=t,el.create([r,i],"and")):Nf(e,t):t instanceof Zu?Nf(t,e):function(e,t){if(oo(e.filters.length>0&&t.filters.length>0,48005),tl(e)&&tl(t))return al(e,t.getFilters());const n=nl(e)?e:t,r=nl(e)?t:e,i=n.filters.map(e=>kf(e,r));return el.create(i,"or")}(e,t),Df(n);var r,i}function Nf(e,t){if(tl(t))return al(t,e.getFilters());{const n=t.filters.map(t=>kf(e,t));return el.create(n,"or")}}function Df(e){if(oo(e instanceof Zu||e instanceof el,11850),e instanceof Zu)return e;const t=e.getFilters();if(1===t.length)return Df(t[0]);if(il(e))return e;const n=t.map(e=>Df(e)),r=[];return n.forEach(t=>{t instanceof Zu?r.push(t):t instanceof el&&(t.op===e.op?r.push(...t.filters):r.push(t))}),1===r.length?r[0]:el.create(r,e.op)
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class Rf{constructor(){this.bn=new Of}addToCollectionParentIndex(e,t){return this.bn.add(t),la.resolve()}getCollectionParents(e,t){return la.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return la.resolve()}deleteFieldIndex(e,t){return la.resolve()}deleteAllFieldIndexes(e){return la.resolve()}createTargetIndexes(e,t){return la.resolve()}getDocumentsMatchingTarget(e,t){return la.resolve(null)}getIndexType(e,t){return la.resolve(0)}getFieldIndexes(e,t){return la.resolve([])}getNextCollectionGroupToUpdate(e){return la.resolve(null)}getMinOffset(e,t){return la.resolve(sa.min())}getMinOffsetFromCollectionGroup(e,t){return la.resolve(sa.min())}updateCollectionGroup(e,t,n){return la.resolve()}updateIndexEntries(e,t){return la.resolve()}}class Of{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new Qc(Ro.comparator),i=!r.has(n);return this.index[t]=r.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new Qc(Ro.comparator)).toArray()}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pf="IndexedDbIndexManager",xf=new Uint8Array(0);class Lf{constructor(e,t){this.databaseId=t,this.Dn=new Of,this.Cn=new zl(e=>wl(e),(e,t)=>_l(e,t)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const n=t.lastSegment(),r=t.popLast();e.addOnCommittedListener(()=>{this.Dn.add(t)});const i={collectionId:n,parent:Ra(r)};return Mf(e).put(i)}return la.resolve()}getCollectionParents(e,t){const n=[],r=IDBKeyRange.bound([t,""],[ko(t),""],!1,!0);return Mf(e).J(r).next(e=>{for(const r of e){if(r.collectionId!==t)break;n.push(xa(r.parent))}return n})}addFieldIndex(e,t){const n=Vf(e),r={indexId:(i=t).indexId,collectionGroup:i.collectionGroup,fields:i.fields.map(e=>[e.fieldPath.canonicalString(),e.kind])};var i;delete r.indexId;const s=n.add(r);if(t.indexState){const n=Uf(e);return s.next(e=>{n.put(ef(e,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const n=Vf(e),r=Uf(e),i=Ff(e);return n.delete(t.indexId).next(()=>r.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=Vf(e),n=Ff(e),r=Uf(e);return t.X().next(()=>n.X()).next(()=>r.X())}createTargetIndexes(e,t){return la.forEach(this.vn(t),t=>this.getIndexType(e,t).next(n=>{if(0===n||1===n){const n=new If(t).Sn();if(null!=n)return this.addFieldIndex(e,n)}}))}getDocumentsMatchingTarget(e,t){const n=Ff(e);let r=!0;const i=new Map;return la.forEach(this.vn(t),t=>this.Fn(e,t).next(e=>{r&&(r=!!e),i.set(t,e)})).next(()=>{if(r){let e=eh();const r=[];return la.forEach(i,(i,s)=>{var o;eo(Pf,`Using index ${o=i,`id=${o.indexId}|cg=${o.collectionGroup}|f=${o.fields.map(e=>`${e.fieldPath}:${e.kind}`).join(",")}`} to execute ${wl(t)}`);const a=function(e,t){const n=Yo(t);if(void 0===n)return null;for(const r of Tl(e,n.fieldPath))switch(r.op){case"array-contains-any":return r.value.arrayValue.values||[];case"array-contains":return[r.value]}return null}(s,i),c=function(e,t){const n=new Map;for(const r of Xo(t))for(const t of Tl(e,r.fieldPath))switch(t.op){case"==":case"in":n.set(r.fieldPath.canonicalString(),t.value);break;case"not-in":case"!=":return n.set(r.fieldPath.canonicalString(),t.value),Array.from(n.values())}return null}(s,i),u=function(e,t){const n=[];let r=!0;for(const i of Xo(t)){const t=0===i.kind?bl(e,i.fieldPath,e.startAt):El(e,i.fieldPath,e.startAt);n.push(t.value),r&&(r=t.inclusive)}return new Hu(n,r)}(s,i),l=function(e,t){const n=[];let r=!0;for(const i of Xo(t)){const t=0===i.kind?El(e,i.fieldPath,e.endAt):bl(e,i.fieldPath,e.endAt);n.push(t.value),r&&(r=t.inclusive)}return new Hu(n,r)}(s,i),h=this.Mn(i,s,u),d=this.Mn(i,s,l),f=this.xn(i,s,c),p=this.On(i.indexId,a,h,u.inclusive,d,l.inclusive,f);return la.forEach(p,i=>n.Z(i,t.limit).next(t=>{t.forEach(t=>{const n=xo.fromSegments(t.documentKey);e.has(n)||(e=e.add(n),r.push(n))})}))}).next(()=>r)}return la.resolve(null)})}vn(e){let t=this.Cn.get(e);return t||(t=0===e.filters.length?[e]:bf(el.create(e.filters,"and")).map(t=>vl(e.path,e.collectionGroup,e.orderBy,t.getFilters(),e.limit,e.startAt,e.endAt)),this.Cn.set(e,t),t)}On(e,t,n,r,i,s,o){const a=(null!=t?t.length:1)*Math.max(n.length,i.length),c=a/(null!=t?t.length:1),u=[];for(let l=0;l<a;++l){const a=t?this.Nn(t[l/c]):xf,h=this.Bn(e,a,n[l%c],r),d=this.Ln(e,a,i[l%c],s),f=o.map(t=>this.Bn(e,a,t,!0));u.push(...this.createRange(h,d,f))}return u}Bn(e,t,n,r){const i=new gf(e,xo.empty(),t,n);return r?i:i.In()}Ln(e,t,n,r){const i=new gf(e,xo.empty(),t,n);return r?i.In():i}Fn(e,t){const n=new If(t),r=null!=t.collectionGroup?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,r).next(e=>{let t=null;for(const r of e)n.gn(r)&&(!t||r.fields.length>t.fields.length)&&(t=r);return t})}getIndexType(e,t){let n=2;const r=this.vn(t);return la.forEach(r,t=>this.Fn(e,t).next(e=>{e?0!==n&&e.fields.length<function(e){let t=new Qc(Po.comparator),n=!1;for(const r of e.filters)for(const e of r.getFlattenedFilters())e.field.isKeyField()||("array-contains"===e.op||"array-contains-any"===e.op?n=!0:t=t.add(e.field));for(const r of e.orderBy)r.field.isKeyField()||(t=t.add(r.field));return t.size+(n?1:0)}(t)&&(n=1):n=0})).next(()=>null!==t.limit&&r.length>1&&2===n?1:n)}kn(e,t){const n=new mf;for(const r of Xo(e)){const e=t.data.field(r.fieldPath);if(null==e)return null;const i=n.ln(r.kind);cf.Wt.Dt(e,i)}return n.un()}Nn(e){const t=new mf;return cf.Wt.Dt(e,t.ln(0)),t.un()}qn(e,t){const n=new mf;return cf.Wt.Dt(Du(this.databaseId,t),n.ln(function(e){const t=Xo(e);return 0===t.length?0:t[t.length-1].kind}(e))),n.un()}xn(e,t,n){if(null===n)return[];let r=[];r.push(new mf);let i=0;for(const s of Xo(e)){const e=n[i++];for(const n of r)if(this.Kn(t,s.fieldPath)&&Ou(e))r=this.Un(r,s,e);else{const t=n.ln(s.kind);cf.Wt.Dt(e,t)}}return this.$n(r)}Mn(e,t,n){return this.xn(e,t,n.position)}$n(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].un();return t}Un(e,t,n){const r=[...e],i=[];for(const s of n.arrayValue.values||[])for(const e of r){const n=new mf;n.seed(e.un()),cf.Wt.Dt(s,n.ln(t.kind)),i.push(n)}return i}Kn(e,t){return!!e.filters.find(e=>e instanceof Zu&&e.field.isEqual(t)&&("in"===e.op||"not-in"===e.op))}getFieldIndexes(e,t){const n=Vf(e),r=Uf(e);return(t?n.J(gc,IDBKeyRange.bound(t,t)):n.J()).next(e=>{const t=[];return la.forEach(e,e=>r.get([e.indexId,this.uid]).next(n=>{t.push(function(e,t){const n=t?new na(t.sequenceNumber,new sa(Hd(t.readTime),new xo(xa(t.documentKey)),t.largestBatchId)):na.empty(),r=e.fields.map(([e,t])=>new ea(Po.fromServerFormat(e),t));return new Jo(e.indexId,e.collectionGroup,r,n)}(e,n))})).next(()=>t)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(e=>0===e.length?null:(e.sort((e,t)=>{const n=e.indexState.sequenceNumber-t.indexState.sequenceNumber;return 0!==n?n:To(e.collectionGroup,t.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(e,t,n){const r=Vf(e),i=Uf(e);return this.Wn(e).next(e=>r.J(gc,IDBKeyRange.bound(t,t)).next(t=>la.forEach(t,t=>i.put(ef(t.indexId,this.uid,e,n)))))}updateIndexEntries(e,t){const n=new Map;return la.forEach(t,(t,r)=>{const i=n.get(t.collectionGroup);return(i?la.resolve(i):this.getFieldIndexes(e,t.collectionGroup)).next(i=>(n.set(t.collectionGroup,i),la.forEach(i,n=>this.Qn(e,t,n).next(t=>{const i=this.Gn(r,n);return t.isEqual(i)?la.resolve():this.zn(e,r,n,t,i)}))))})}jn(e,t,n,r){return Ff(e).put(r.Rn(this.uid,this.qn(n,t.key),t.key))}Jn(e,t,n,r){return Ff(e).delete(r.An(this.uid,this.qn(n,t.key),t.key))}Qn(e,t,n){const r=Ff(e);let i=new Qc(yf);return r.ee({index:bc,range:IDBKeyRange.only([n.indexId,this.uid,wf(this.qn(n,t))])},(e,r)=>{i=i.add(new gf(n.indexId,t,_f(r.arrayValue),_f(r.directionalValue)))}).next(()=>i)}Gn(e,t){let n=new Qc(yf);const r=this.kn(t,e);if(null==r)return n;const i=Yo(t);if(null!=i){const s=e.data.field(i.fieldPath);if(Ou(s))for(const i of s.arrayValue.values||[])n=n.add(new gf(t.indexId,e.key,this.Nn(i),r))}else n=n.add(new gf(t.indexId,e.key,xf,r));return n}zn(e,t,n,r,i){eo(Pf,"Updating index entries for document '%s'",t.key);const s=[];return function(e,t,n,r,i){const s=e.getIterator(),o=t.getIterator();let a=Yc(s),c=Yc(o);for(;a||c;){let e=!1,t=!1;if(a&&c){const r=n(a,c);r<0?t=!0:r>0&&(e=!0)}else null!=a?t=!0:e=!0;e?(r(c),c=Yc(o)):t?(i(a),a=Yc(s)):(a=Yc(s),c=Yc(o))}}(r,i,yf,r=>{s.push(this.jn(e,t,n,r))},r=>{s.push(this.Jn(e,t,n,r))}),la.waitFor(s)}Wn(e){let t=1;return Uf(e).ee({index:wc,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(e,n,r)=>{r.done(),t=n.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((e,t)=>yf(e,t)).filter((e,t,n)=>!t||0!==yf(e,n[t-1]));const r=[];r.push(e);for(const s of n){const n=yf(s,e),i=yf(s,t);if(0===n)r[0]=e.In();else if(n>0&&i<0)r.push(s),r.push(s.In());else if(i>0)break}r.push(t);const i=[];for(let s=0;s<r.length;s+=2){if(this.Hn(r[s],r[s+1]))return[];const e=r[s].An(this.uid,xf,xo.empty()),t=r[s+1].An(this.uid,xf,xo.empty());i.push(IDBKeyRange.bound(e,t))}return i}Hn(e,t){return yf(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(qf)}getMinOffset(e,t){return la.mapArray(this.vn(t),t=>this.Fn(e,t).next(e=>e||io(44426))).next(qf)}}function Mf(e){return Bc(e,lc)}function Ff(e){return Bc(e,Ic)}function Vf(e){return Bc(e,mc)}function Uf(e){return Bc(e,yc)}function qf(e){oo(0!==e.length,28825);let t=e[0].indexState.offset,n=t.largestBatchId;for(let r=1;r<e.length;r++){const i=e[r].indexState.offset;oa(i,t)<0&&(t=i),n<i.largestBatchId&&(n=i.largestBatchId)}return new sa(t.readTime,t.documentKey,n)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},jf=41943040;class zf{static withCacheSize(e){return new zf(e,zf.DEFAULT_COLLECTION_PERCENTILE,zf.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $f(e,t,n){const r=e.store(Ua),i=e.store(Ka),s=[],o=IDBKeyRange.only(n.batchId);let a=0;const c=r.ee({range:o},(e,t,n)=>(a++,n.delete()));s.push(c.next(()=>{oo(1===a,47070,{batchId:n.batchId})}));const u=[];for(const l of n.mutations){const e=$a(t,l.key.path,n.batchId);s.push(i.delete(e)),u.push(l.key)}return la.waitFor(s).next(()=>u)}function Gf(e){if(!e)return 0;let t;if(e.document)t=e.document;else if(e.unknownDocument)t=e.unknownDocument;else{if(!e.noDocument)throw io(14731);t=e.noDocument}return JSON.stringify(t).length}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */zf.DEFAULT_COLLECTION_PERCENTILE=10,zf.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,zf.DEFAULT=new zf(jf,zf.DEFAULT_COLLECTION_PERCENTILE,zf.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),zf.DISABLED=new zf(-1,0,0);class Kf{constructor(e,t,n,r){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=r,this.Zn={}}static wt(e,t,n,r){oo(""!==e.uid,64387);const i=e.isAuthenticated()?e.uid:"";return new Kf(i,t,n,r)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Wf(e).ee({index:Ba,range:n},(e,n,r)=>{t=!1,r.done()}).next(()=>t)}addMutationBatch(e,t,n,r){const i=Qf(e),s=Wf(e);return s.add({}).next(o=>{oo("number"==typeof o,49019);const a=new Lh(o,t,n,r),c=function(e,t,n){const r=n.baseMutations.map(t=>Ad(e.yt,t)),i=n.mutations.map(t=>Ad(e.yt,t));return{userId:t,batchId:n.batchId,localWriteTimeMs:n.localWriteTime.toMillis(),baseMutations:r,mutations:i}}(this.serializer,this.userId,a),u=[];let l=new Qc((e,t)=>To(e.canonicalString(),t.canonicalString()));for(const e of r){const t=$a(this.userId,e.key.path,o);l=l.add(e.key.path.popLast()),u.push(s.put(c)),u.push(i.put(t,Ga))}return l.forEach(t=>{u.push(this.indexManager.addToCollectionParentIndex(e,t))}),e.addOnCommittedListener(()=>{this.Zn[o]=a.keys()}),la.waitFor(u).next(()=>a)})}lookupMutationBatch(e,t){return Wf(e).get(t).next(e=>e?(oo(e.userId===this.userId,48,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),Wd(this.serializer,e)):null)}Xn(e,t){return this.Zn[t]?la.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next(e=>{if(e){const n=e.keys();return this.Zn[t]=n,n}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return Wf(e).ee({index:Ba,range:r},(e,t,r)=>{t.userId===this.userId&&(oo(t.batchId>=n,47524,{Yn:n}),i=Wd(this.serializer,t)),r.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=Aa;return Wf(e).ee({index:Ba,range:t,reverse:!0},(e,t,r)=>{n=t.batchId,r.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,Aa],[this.userId,Number.POSITIVE_INFINITY]);return Wf(e).J(Ba,t).next(e=>e.map(e=>Wd(this.serializer,e)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=za(this.userId,t.path),r=IDBKeyRange.lowerBound(n),i=[];return Qf(e).ee({range:r},(n,r,s)=>{const[o,a,c]=n,u=xa(a);if(o===this.userId&&t.path.isEqual(u))return Wf(e).get(c).next(e=>{if(!e)throw io(61480,{er:n,batchId:c});oo(e.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:e.userId,batchId:c}),i.push(Wd(this.serializer,e))});s.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new Qc(To);const r=[];return t.forEach(t=>{const i=za(this.userId,t.path),s=IDBKeyRange.lowerBound(i),o=Qf(e).ee({range:s},(e,r,i)=>{const[s,o,a]=e,c=xa(o);s===this.userId&&t.path.isEqual(c)?n=n.add(a):i.done()});r.push(o)}),la.waitFor(r).next(()=>this.tr(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1,i=za(this.userId,n),s=IDBKeyRange.lowerBound(i);let o=new Qc(To);return Qf(e).ee({range:s},(e,t,i)=>{const[s,a,c]=e,u=xa(a);s===this.userId&&n.isPrefixOf(u)?u.length===r&&(o=o.add(c)):i.done()}).next(()=>this.tr(e,o))}tr(e,t){const n=[],r=[];return t.forEach(t=>{r.push(Wf(e).get(t).next(e=>{if(null===e)throw io(35274,{batchId:t});oo(e.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),n.push(Wd(this.serializer,e))}))}),la.waitFor(r).next(()=>n)}removeMutationBatch(e,t){return $f(e.le,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.nr(t.batchId)}),la.forEach(n,t=>this.referenceDelegate.markPotentiallyOrphaned(e,t))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return la.resolve();const n=IDBKeyRange.lowerBound(function(e){return[e]}(this.userId)),r=[];return Qf(e).ee({range:n},(e,t,n)=>{if(e[0]===this.userId){const t=xa(e[1]);r.push(t)}else n.done()}).next(()=>{oo(0===r.length,56720,{rr:r.map(e=>e.canonicalString())})})})}containsKey(e,t){return Hf(e,this.userId,t)}ir(e){return Jf(e).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:Aa,lastStreamToken:""})}}function Hf(e,t,n){const r=za(t,n.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return Qf(e).ee({range:s,Y:!0},(e,n,r)=>{const[s,a,c]=e;s===t&&a===i&&(o=!0),r.done()}).next(()=>o)}function Wf(e){return Bc(e,Ua)}function Qf(e){return Bc(e,Ka)}function Jf(e){return Bc(e,Va)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yf{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Yf(0)}static ar(){return new Yf(-1)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xf{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next(t=>{const n=new Yf(t.highestTargetId);return t.highestTargetId=n.next(),this.cr(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.ur(e).next(e=>Wo.fromTimestamp(new Ho(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.ur(e).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.ur(e).next(r=>(r.highestListenSequenceNumber=t,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),t>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=t),this.cr(e,r)))}addTargetData(e,t){return this.lr(e,t).next(()=>this.ur(e).next(n=>(n.targetCount+=1,this.hr(t,n),this.cr(e,n))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Zf(e).delete(t.targetId)).next(()=>this.ur(e)).next(t=>(oo(t.targetCount>0,8065),t.targetCount-=1,this.cr(e,t)))}removeTargets(e,t,n){let r=0;const i=[];return Zf(e).ee((s,o)=>{const a=Qd(o);a.sequenceNumber<=t&&null===n.get(a.targetId)&&(r++,i.push(this.removeTargetData(e,a)))}).next(()=>la.waitFor(i)).next(()=>r)}forEachTarget(e,t){return Zf(e).ee((e,n)=>{const r=Qd(n);t(r)})}ur(e){return ep(e).get(cc).next(e=>(oo(null!==e,2888),e))}cr(e,t){return ep(e).put(cc,t)}lr(e,t){return Zf(e).put(Jd(this.serializer,t))}hr(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.ur(e).next(e=>e.targetCount)}getTargetData(e,t){const n=wl(t),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return Zf(e).ee({range:r,index:nc},(e,n,r)=>{const s=Qd(n);_l(t,s.target)&&(i=s,r.done())}).next(()=>i)}addMatchingKeys(e,t,n){const r=[],i=tp(e);return t.forEach(t=>{const s=Ra(t.path);r.push(i.put({targetId:n,path:s})),r.push(this.referenceDelegate.addReference(e,n,t))}),la.waitFor(r)}removeMatchingKeys(e,t,n){const r=tp(e);return la.forEach(t,t=>{const i=Ra(t.path);return la.waitFor([r.delete([n,i]),this.referenceDelegate.removeReference(e,n,t)])})}removeMatchingKeysForTargetId(e,t){const n=tp(e),r=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),r=tp(e);let i=eh();return r.ee({range:n,Y:!0},(e,t,n)=>{const r=xa(e[1]),s=new xo(r);i=i.add(s)}).next(()=>i)}containsKey(e,t){const n=Ra(t.path),r=IDBKeyRange.bound([n],[ko(n)],!1,!0);let i=0;return tp(e).ee({index:oc,Y:!0,range:r},([e,t],n,r)=>{0!==e&&(i++,r.done())}).next(()=>i>0)}At(e,t){return Zf(e).get(t).next(e=>e?Qd(e):null)}}function Zf(e){return Bc(e,tc)}function ep(e){return Bc(e,uc)}function tp(e){return Bc(e,ic)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const np="LruGarbageCollector",rp=1048576;function ip([e,t],[n,r]){const i=To(e,n);return 0===i?To(t,r):i}class sp{constructor(e){this.Pr=e,this.buffer=new Qc(ip),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const e=this.buffer.last();ip(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class op{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return null!==this.Rr}Ar(e){eo(np,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){ya(e)?eo(np,"Ignoring IndexedDB error during garbage collection: ",e):await ua(e)}await this.Ar(3e5)})}}class ap{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return la.resolve(Sa.ce);const n=new sp(t);return this.Vr.forEachTarget(e,e=>n.Ir(e.sequenceNumber)).next(()=>this.Vr.mr(e,e=>n.Ir(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Vr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return-1===this.params.cacheSizeCollectionThreshold?(eo("LruGarbageCollector","Garbage collection skipped; disabled"),la.resolve(Bf)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(eo("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Bf):this.gr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let n,r,i,s,o,a,c;const u=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(eo("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,s=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,o=Date.now(),this.removeTargets(e,n,t))).next(t=>(i=t,a=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(c=Date.now(),Zs()<=M.DEBUG&&eo("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${s-u}ms\n\tDetermined least recently used ${r} in `+(o-s)+`ms\n\tRemoved ${i} targets in `+(a-o)+`ms\n\tRemoved ${e} documents in `+(c-a)+`ms\nTotal Duration: ${c-u}ms`),la.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:e})))}}function cp(e,t){return new ap(e,t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class up{constructor(e,t){this.db=e,this.garbageCollector=cp(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}pr(e){let t=0;return this.mr(e,e=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,(e,n)=>t(n))}addReference(e,t,n){return lp(e,n)}removeReference(e,t,n){return lp(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return lp(e,t)}wr(e,t){return function(e,t){let n=!1;return Jf(e).te(r=>Hf(e,r,t).next(e=>(e&&(n=!0),la.resolve(!e)))).next(()=>n)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[];let i=0;return this.yr(e,(s,o)=>{if(o<=t){const t=this.wr(e,s).next(t=>{if(!t)return i++,n.getEntry(e,s).next(()=>(n.removeEntry(s,Wo.min()),tp(e).delete([0,Ra(s.path)])))});r.push(t)}}).next(()=>la.waitFor(r)).next(()=>n.apply(e)).next(()=>i)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return lp(e,t)}yr(e,t){const n=tp(e);let r,i=Sa.ce;return n.ee({index:oc},([e,n],{path:s,sequenceNumber:o})=>{0===e?(i!==Sa.ce&&t(new xo(xa(r)),i),i=o,r=s):i=Sa.ce}).next(()=>{i!==Sa.ce&&t(new xo(xa(r)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function lp(e,t){return tp(e).put((n=t,r=e.currentSequenceNumber,{targetId:0,path:Ra(n.path),sequenceNumber:r}));var n,r}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hp{constructor(){this.changes=new zl(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ku.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?la.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dp{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return gp(e).put(n)}removeEntry(e,t,n){return gp(e).delete(function(e,t){const n=e.path.toArray();return[n.slice(0,n.length-2),n[n.length-2],Gd(t),n[n.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.Sr(e,n)))}getEntry(e,t){let n=Ku.newInvalidDocument(t);return gp(e).ee({index:Qa,range:IDBKeyRange.only(yp(t))},(e,r)=>{n=this.br(t,r)}).next(()=>n)}Dr(e,t){let n={size:0,document:Ku.newInvalidDocument(t)};return gp(e).ee({index:Qa,range:IDBKeyRange.only(yp(t))},(e,r)=>{n={document:this.br(t,r),size:Gf(r)}}).next(()=>n)}getEntries(e,t){let n=Gl();return this.Cr(e,t,(e,t)=>{const r=this.br(e,t);n=n.insert(e,r)}).next(()=>n)}vr(e,t){let n=Gl(),r=new Kc(xo.comparator);return this.Cr(e,t,(e,t)=>{const i=this.br(e,t);n=n.insert(e,i),r=r.insert(e,Gf(t))}).next(()=>({documents:n,Fr:r}))}Cr(e,t,n){if(t.isEmpty())return la.resolve();let r=new Qc(wp);t.forEach(e=>r=r.add(e));const i=IDBKeyRange.bound(yp(r.first()),yp(r.last())),s=r.getIterator();let o=s.getNext();return gp(e).ee({index:Qa,range:i},(e,t,r)=>{const i=xo.fromSegments([...t.prefixPath,t.collectionGroup,t.documentId]);for(;o&&wp(o,i)<0;)n(o,null),o=s.getNext();o&&o.isEqual(i)&&(n(o,t),o=s.hasNext()?s.getNext():null),o?r.j(yp(o)):r.done()}).next(()=>{for(;o;)n(o,null),o=s.hasNext()?s.getNext():null})}getDocumentsMatchingQuery(e,t,n,r,i){const s=t.path,o=[s.popLast().toArray(),s.lastSegment(),Gd(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],a=[s.popLast().toArray(),s.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return gp(e).J(IDBKeyRange.bound(o,a,!0)).next(e=>{null==i||i.incrementDocumentReadCount(e.length);let n=Gl();for(const i of e){const e=this.br(xo.fromSegments(i.prefixPath.concat(i.collectionGroup,i.documentId)),i);e.isFoundDocument()&&(Ul(t,e)||r.has(e.key))&&(n=n.insert(e.key,e))}return n})}getAllFromCollectionGroup(e,t,n,r){let i=Gl();const s=vp(t,n),o=vp(t,sa.max());return gp(e).ee({index:Ya,range:IDBKeyRange.bound(s,o,!0)},(e,t,n)=>{const s=this.br(xo.fromSegments(t.prefixPath.concat(t.collectionGroup,t.documentId)),t);i=i.insert(s.key,s),i.size===r&&n.done()}).next(()=>i)}newChangeBuffer(e){return new pp(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(e=>e.byteSize)}getMetadata(e){return mp(e).get(ec).next(e=>(oo(!!e,20021),e))}Sr(e,t){return mp(e).put(ec,t)}br(e,t){if(t){const e=function(e,t){let n;if(t.document)n=Sd(e.yt,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const e=xo.fromSegments(t.noDocument.path),r=Hd(t.noDocument.readTime);n=Ku.newNoDocument(e,r),t.hasCommittedMutations&&n.setHasCommittedMutations()}else{if(!t.unknownDocument)return io(56709);{const e=xo.fromSegments(t.unknownDocument.path),r=Hd(t.unknownDocument.version);n=Ku.newUnknownDocument(e,r)}}return t.readTime&&n.setReadTime(function(e){const t=new Ho(e[0],e[1]);return Wo.fromTimestamp(t)}(t.readTime)),n}(this.serializer,t);if(!e.isNoDocument()||!e.version.isEqual(Wo.min()))return e}return Ku.newInvalidDocument(e)}}function fp(e){return new dp(e)}class pp extends hp{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new zl(e=>e.toString(),(e,t)=>e.isEqual(t))}applyChanges(e){const t=[];let n=0,r=new Qc((e,t)=>To(e.canonicalString(),t.canonicalString()));return this.changes.forEach((i,s)=>{const o=this.Or.get(i);if(t.push(this.Mr.removeEntry(e,i,o.readTime)),s.isValidDocument()){const a=$d(this.Mr.serializer,s);r=r.add(i.path.popLast());const c=Gf(a);n+=c-o.size,t.push(this.Mr.addEntry(e,i,a))}else if(n-=o.size,this.trackRemovals){const n=$d(this.Mr.serializer,s.convertToNoDocument(Wo.min()));t.push(this.Mr.addEntry(e,i,n))}}),r.forEach(n=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,n))}),t.push(this.Mr.updateMetadata(e,n)),la.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next(e=>(this.Or.set(t,{size:e.size,readTime:e.document.readTime}),e.document))}getAllFromCache(e,t){return this.Mr.vr(e,t).next(({documents:e,Fr:t})=>(t.forEach((t,n)=>{this.Or.set(t,{size:n,readTime:e.get(t).readTime})}),e))}}function mp(e){return Bc(e,Za)}function gp(e){return Bc(e,Ha)}function yp(e){const t=e.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function vp(e,t){const n=t.documentKey.path.toArray();return[e,Gd(t.readTime),n.slice(0,n.length-2),n.length>0?n[n.length-1]:""]}function wp(e,t){const n=e.path.toArray(),r=t.path.toArray();let i=0;for(let s=0;s<n.length-2&&s<r.length-2;++s)if(i=To(n[s],r[s]),i)return i;return i=To(n.length,r.length),i||(i=To(n[n.length-2],r[r.length-2]),i||To(n[n.length-1],r[r.length-1])
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */)}class _p{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ip{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&Sh(n.mutation,e,Xc.empty(),Ho.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,eh()).next(()=>t))}getLocalViewOfDocuments(e,t,n=eh()){const r=Ql();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=Hl();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){const n=Ql();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,eh()))}populateOverlays(e,t,n){const r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let i=Gl();const s=Yl(),o=Yl();return t.forEach((e,t)=>{const o=n.get(t.key);r.has(t.key)&&(void 0===o||o.mutation instanceof Nh)?i=i.insert(t.key,t):void 0!==o?(s.set(t.key,o.mutation.getFieldMask()),Sh(o.mutation,t,o.mutation.getFieldMask(),Ho.now())):s.set(t.key,Xc.empty())}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>o.set(e,new _p(t,s.get(e)??null))),o))}recalculateAndSaveOverlays(e,t){const n=Yl();let r=new Kc((e,t)=>e-t),i=eh();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(const i of e)i.keys().forEach(e=>{const s=t.get(e);if(null===s)return;let o=n.get(e)||Xc.empty();o=i.applyToLocalView(s,o),n.set(e,o);const a=(r.get(i.batchId)||eh()).add(e);r=r.insert(i.batchId,a)})}).next(()=>{const s=[],o=r.getReverseIterator();for(;o.hasNext();){const r=o.getNext(),a=r.key,c=r.value,u=Jl();c.forEach(e=>{if(!i.has(e)){const r=bh(t.get(e),n.get(e));null!==r&&u.set(e,r),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,a,u))}return la.waitFor(s)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,r){return function(e){return xo.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Nl(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(i=>{const s=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-i.size):la.resolve(Ql());let o=Qo,a=i;return s.next(t=>la.forEach(t,(t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),i.get(t)?la.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{a=a.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,a,t,eh())).next(e=>({batchId:o,changes:Wl(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new xo(t)).next(e=>{let t=Hl();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){const i=t.collectionGroup;let s=Hl();return this.indexManager.getCollectionParents(e,i).next(o=>la.forEach(o,o=>{const a=(c=t,u=o.child(i),new Sl(u,null,c.explicitOrderBy.slice(),c.filters.slice(),c.limit,c.limitType,c.startAt,c.endAt));var c,u;return this.getDocumentsMatchingCollectionQuery(e,a,n,r).next(e=>{e.forEach((e,t)=>{s=s.insert(e,t)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,n,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,r))).next(e=>{i.forEach((t,n)=>{const r=n.getKey();null===e.get(r)&&(e=e.insert(r,Ku.newInvalidDocument(r)))});let n=Hl();return e.forEach((e,r)=>{const s=i.get(e);void 0!==s&&Sh(s.mutation,r,Xc.empty(),Ho.now()),Ul(t,r)&&(n=n.insert(e,r))}),n})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tp{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return la.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,{id:(n=t).id,version:n.version,createTime:pd(n.createTime)}),la.resolve();var n}getNamedQuery(e,t){return la.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,{name:(n=t).name,query:Yd(n.bundledQuery),readTime:pd(n.readTime)}),la.resolve();var n}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bp{constructor(){this.overlays=new Kc(xo.comparator),this.Lr=new Map}getOverlay(e,t){return la.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Ql();return la.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.St(e,t,r)}),la.resolve()}removeOverlaysForBatchId(e,t,n){const r=this.Lr.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.Lr.delete(n)),la.resolve()}getOverlaysForCollection(e,t,n){const r=Ql(),i=t.length+1,s=new xo(t.child("")),o=this.overlays.getIteratorFrom(s);for(;o.hasNext();){const e=o.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>n&&r.set(e.getKey(),e)}return la.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let i=new Kc((e,t)=>e-t);const s=this.overlays.getIterator();for(;s.hasNext();){const e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);null===t&&(t=Ql(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=Ql(),a=i.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((e,t)=>o.set(e,t)),!(o.size()>=r)););return la.resolve(o)}St(e,t,n){const r=this.overlays.get(n.key);if(null!==r){const e=this.Lr.get(r.largestBatchId).delete(n.key);this.Lr.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new Fh(t,n));let i=this.Lr.get(t);void 0===i&&(i=eh(),this.Lr.set(t,i)),this.Lr.set(t,i.add(n.key))}}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep{constructor(){this.sessionToken=eu.EMPTY_BYTE_STRING}getSessionToken(e){return la.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,la.resolve()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sp{constructor(){this.kr=new Qc(Ap.qr),this.Kr=new Qc(Ap.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const n=new Ap(e,t);this.kr=this.kr.add(n),this.Kr=this.Kr.add(n)}$r(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Wr(new Ap(e,t))}Qr(e,t){e.forEach(e=>this.removeReference(e,t))}Gr(e){const t=new xo(new Ro([])),n=new Ap(t,e),r=new Ap(t,e+1),i=[];return this.Kr.forEachInRange([n,r],e=>{this.Wr(e),i.push(e.key)}),i}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new xo(new Ro([])),n=new Ap(t,e),r=new Ap(t,e+1);let i=eh();return this.Kr.forEachInRange([n,r],e=>{i=i.add(e.key)}),i}containsKey(e){const t=new Ap(e,0),n=this.kr.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class Ap{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return xo.comparator(e.key,t.key)||To(e.Jr,t.Jr)}static Ur(e,t){return To(e.Jr,t.Jr)||xo.comparator(e.key,t.key)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cp{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new Qc(Ap.qr)}checkEmpty(e){return la.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const s=new Lh(i,t,n,r);this.mutationQueue.push(s);for(const o of r)this.Hr=this.Hr.add(new Ap(o.key,i)),this.indexManager.addToCollectionParentIndex(e,o.key.path.popLast());return la.resolve(s)}lookupMutationBatch(e,t){return la.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=this.Xr(n),i=r<0?0:r;return la.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return la.resolve(0===this.mutationQueue.length?Aa:this.Yn-1)}getAllMutationBatches(e){return la.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Ap(t,0),r=new Ap(t,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([n,r],e=>{const t=this.Zr(e.Jr);i.push(t)}),la.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new Qc(To);return t.forEach(e=>{const t=new Ap(e,0),r=new Ap(e,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([t,r],e=>{n=n.add(e.Jr)})}),la.resolve(this.Yr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1;let i=n;xo.isDocumentKey(i)||(i=i.child(""));const s=new Ap(new xo(i),0);let o=new Qc(To);return this.Hr.forEachWhile(e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(o=o.add(e.Jr)),!0)},s),la.resolve(this.Yr(o))}Yr(e){const t=[];return e.forEach(e=>{const n=this.Zr(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){oo(0===this.ei(t.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.Hr;return la.forEach(t.mutations,r=>{const i=new Ap(r.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Hr=n})}nr(e){}containsKey(e,t){const n=new Ap(t,0),r=this.Hr.firstAfterOrEqual(n);return la.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,la.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(e){this.ti=e,this.docs=new Kc(xo.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,r=this.docs.get(n),i=r?r.size:0,s=this.ti(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return la.resolve(n?n.document.mutableCopy():Ku.newInvalidDocument(t))}getEntries(e,t){let n=Gl();return t.forEach(e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():Ku.newInvalidDocument(e))}),la.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let i=Gl();const s=t.path,o=new xo(s.child("__id-9223372036854775808__")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:e,value:{document:o}}=a.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||oa(ia(o),n)<=0||(r.has(o.key)||Ul(t,o))&&(i=i.insert(o.key,o.mutableCopy()))}return la.resolve(i)}getAllFromCollectionGroup(e,t,n,r){io(9500)}ni(e,t){return la.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new Np(this)}getSize(e){return la.resolve(this.size)}}class Np extends hp{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.Mr.addEntry(e,r)):this.Mr.removeEntry(n)}),la.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dp{constructor(e){this.persistence=e,this.ri=new zl(e=>wl(e),_l),this.lastRemoteSnapshotVersion=Wo.min(),this.highestTargetId=0,this.ii=0,this.si=new Sp,this.targetCount=0,this.oi=Yf._r()}forEachTarget(e,t){return this.ri.forEach((e,n)=>t(n)),la.resolve()}getLastRemoteSnapshotVersion(e){return la.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return la.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),la.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.ii&&(this.ii=t),la.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Yf(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,la.resolve()}updateTargetData(e,t){return this.lr(t),la.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,la.resolve()}removeTargets(e,t,n){let r=0;const i=[];return this.ri.forEach((s,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.ri.delete(s),i.push(this.removeMatchingKeysForTargetId(e,o.targetId)),r++)}),la.waitFor(i).next(()=>r)}getTargetCount(e){return la.resolve(this.targetCount)}getTargetData(e,t){const n=this.ri.get(t)||null;return la.resolve(n)}addMatchingKeys(e,t,n){return this.si.$r(t,n),la.resolve()}removeMatchingKeys(e,t,n){this.si.Qr(t,n);const r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(t=>{i.push(r.markPotentiallyOrphaned(e,t))}),la.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),la.resolve()}getMatchingKeysForTargetId(e,t){const n=this.si.jr(t);return la.resolve(n)}containsKey(e,t){return la.resolve(this.si.containsKey(t))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rp{constructor(e,t){this._i={},this.overlays={},this.ai=new Sa(0),this.ui=!1,this.ui=!0,this.ci=new Ep,this.referenceDelegate=e(this),this.li=new Dp(this),this.indexManager=new Rf,this.remoteDocumentCache=new kp(e=>this.referenceDelegate.hi(e)),this.serializer=new zd(t),this.Pi=new Tp(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new bp,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this._i[e.toKey()];return n||(n=new Cp(t,this.referenceDelegate),this._i[e.toKey()]=n),n}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,n){eo("MemoryPersistence","Starting transaction:",e);const r=new Op(this.ai.next());return this.referenceDelegate.Ti(),n(r).next(e=>this.referenceDelegate.Ei(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}Ii(e,t){return la.or(Object.values(this._i).map(n=>()=>n.containsKey(e,t)))}}class Op extends ca{constructor(e){super(),this.currentSequenceNumber=e}}class Pp{constructor(e){this.persistence=e,this.Ri=new Sp,this.Ai=null}static Vi(e){return new Pp(e)}get di(){if(this.Ai)return this.Ai;throw io(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.di.delete(n.toString()),la.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.di.add(n.toString()),la.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),la.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach(e=>this.di.add(e.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.di.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return la.forEach(this.di,n=>{const r=xo.fromPath(n);return this.mi(e,r).next(e=>{e||t.removeEntry(r,Wo.min())})}).next(()=>(this.Ai=null,t.apply(e)))}updateLimboDocument(e,t){return this.mi(e,t).next(e=>{e?this.di.delete(t.toString()):this.di.add(t.toString())})}hi(e){return 0}mi(e,t){return la.or([()=>la.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class xp{constructor(e,t){this.persistence=e,this.fi=new zl(e=>Ra(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=cp(this,t)}static Vi(e,t){return new xp(e,t)}Ti(){}Ei(e){return la.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}pr(e){let t=0;return this.mr(e,e=>{t++}).next(()=>t)}mr(e,t){return la.forEach(this.fi,(n,r)=>this.wr(e,n,r).next(e=>e?la.resolve():t(r)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const r=this.persistence.getRemoteDocumentCache(),i=r.newChangeBuffer();return r.ni(e,r=>this.wr(e,r,t).next(e=>{e||(n++,i.removeEntry(r,Wo.min()))})).next(()=>i.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),la.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),la.resolve()}removeReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),la.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),la.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Nu(e.data.value)),t}wr(e,t,n){return la.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const e=this.fi.get(t);return la.resolve(void 0!==e&&e>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lp{constructor(e){this.serializer=e}k(e,t,n,r){const i=new da("createOrUpgrade",t);n<1&&r>=1&&(e.createObjectStore(Ma),function(e){e.createObjectStore(Va,{keyPath:"userId"});e.createObjectStore(Ua,{keyPath:qa,autoIncrement:!0}).createIndex(Ba,ja,{unique:!0}),e.createObjectStore(Ka)}(e),Mp(e),function(e){e.createObjectStore(La)}(e));let s=la.resolve();return n<3&&r>=3&&(0!==n&&(function(e){e.deleteObjectStore(ic),e.deleteObjectStore(tc),e.deleteObjectStore(uc)}(e),Mp(e)),s=s.next(()=>function(e){const t=e.store(uc),n={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:Wo.min().toTimestamp(),targetCount:0};return t.put(cc,n)}(i))),n<4&&r>=4&&(0!==n&&(s=s.next(()=>function(e,t){return t.store(Ua).J().next(n=>{e.deleteObjectStore(Ua),e.createObjectStore(Ua,{keyPath:qa,autoIncrement:!0}).createIndex(Ba,ja,{unique:!0});const r=t.store(Ua),i=n.map(e=>r.put(e));return la.waitFor(i)})}(e,i))),s=s.next(()=>{!function(e){e.createObjectStore(dc,{keyPath:"clientId"})}(e)})),n<5&&r>=5&&(s=s.next(()=>this.gi(i))),n<6&&r>=6&&(s=s.next(()=>(function(e){e.createObjectStore(Za)}(e),this.pi(i)))),n<7&&r>=7&&(s=s.next(()=>this.yi(i))),n<8&&r>=8&&(s=s.next(()=>this.wi(e,i))),n<9&&r>=9&&(s=s.next(()=>{!function(e){e.objectStoreNames.contains("remoteDocumentChanges")&&e.deleteObjectStore("remoteDocumentChanges")}(e)})),n<10&&r>=10&&(s=s.next(()=>this.Si(i))),n<11&&r>=11&&(s=s.next(()=>{!function(e){e.createObjectStore(fc,{keyPath:"bundleId"})}(e),function(e){e.createObjectStore(pc,{keyPath:"name"})}(e)})),n<12&&r>=12&&(s=s.next(()=>{!function(e){const t=e.createObjectStore(Sc,{keyPath:Ac});t.createIndex(Cc,kc,{unique:!1}),t.createIndex(Nc,Dc,{unique:!1})}(e)})),n<13&&r>=13&&(s=s.next(()=>function(e){const t=e.createObjectStore(Ha,{keyPath:Wa});t.createIndex(Qa,Ja),t.createIndex(Ya,Xa)}(e)).next(()=>this.bi(e,i)).next(()=>e.deleteObjectStore(La))),n<14&&r>=14&&(s=s.next(()=>this.Di(e,i))),n<15&&r>=15&&(s=s.next(()=>function(e){e.createObjectStore(mc,{keyPath:"indexId",autoIncrement:!0}).createIndex(gc,"collectionGroup",{unique:!1});e.createObjectStore(yc,{keyPath:vc}).createIndex(wc,_c,{unique:!1});e.createObjectStore(Ic,{keyPath:Tc}).createIndex(bc,Ec,{unique:!1})}(e))),n<16&&r>=16&&(s=s.next(()=>{t.objectStore(yc).clear()}).next(()=>{t.objectStore(Ic).clear()})),n<17&&r>=17&&(s=s.next(()=>{!function(e){e.createObjectStore(Rc,{keyPath:"name"})}(e)})),n<18&&r>=18&&y()&&(s=s.next(()=>{t.objectStore(yc).clear()}).next(()=>{t.objectStore(Ic).clear()})),s}pi(e){let t=0;return e.store(La).ee((e,n)=>{t+=Gf(n)}).next(()=>{const n={byteSize:t};return e.store(Za).put(ec,n)})}gi(e){const t=e.store(Va),n=e.store(Ua);return t.J().next(t=>la.forEach(t,t=>{const r=IDBKeyRange.bound([t.userId,Aa],[t.userId,t.lastAcknowledgedBatchId]);return n.J(Ba,r).next(n=>la.forEach(n,n=>{oo(n.userId===t.userId,18650,"Cannot process batch from unexpected user",{batchId:n.batchId});const r=Wd(this.serializer,n);return $f(e,t.userId,r).next(()=>{})}))}))}yi(e){const t=e.store(ic),n=e.store(La);return e.store(uc).get(cc).next(e=>{const r=[];return n.ee((n,i)=>{const s=new Ro(n),o=[0,Ra(s)];r.push(t.get(o).next(n=>{return n?la.resolve():(r=s,t.put({targetId:0,path:Ra(r),sequenceNumber:e.highestListenSequenceNumber}));var r}))}).next(()=>la.waitFor(r))})}wi(e,t){e.createObjectStore(lc,{keyPath:hc});const n=t.store(lc),r=new Of,i=e=>{if(r.add(e)){const t=e.lastSegment(),r=e.popLast();return n.put({collectionId:t,parent:Ra(r)})}};return t.store(La).ee({Y:!0},(e,t)=>{const n=new Ro(e);return i(n.popLast())}).next(()=>t.store(Ka).ee({Y:!0},([e,t,n],r)=>{const s=xa(t);return i(s.popLast())}))}Si(e){const t=e.store(tc);return t.ee((e,n)=>{const r=Qd(n),i=Jd(this.serializer,r);return t.put(i)})}bi(e,t){const n=t.store(La),r=[];return n.ee((e,n)=>{const i=t.store(Ha),s=(a=n,a.document?new xo(Ro.fromString(a.document.name).popFirst(5)):a.noDocument?xo.fromSegments(a.noDocument.path):a.unknownDocument?xo.fromSegments(a.unknownDocument.path):io(36783)).path.toArray(),o={prefixPath:s.slice(0,s.length-2),collectionGroup:s[s.length-2],documentId:s[s.length-1],readTime:n.readTime||[0,0],unknownDocument:n.unknownDocument,noDocument:n.noDocument,document:n.document,hasCommittedMutations:!!n.hasCommittedMutations};var a;r.push(i.put(o))}).next(()=>la.waitFor(r))}Di(e,t){const n=t.store(Ua),r=fp(this.serializer),i=new Rp(Pp.Vi,this.serializer.yt);return n.J().next(e=>{const n=new Map;return e.forEach(e=>{let t=n.get(e.userId)??eh();Wd(this.serializer,e).keys().forEach(e=>t=t.add(e)),n.set(e.userId,t)}),la.forEach(n,(e,n)=>{const s=new Js(n),o=sf.wt(this.serializer,s),a=i.getIndexManager(s),c=Kf.wt(s,this.serializer,a,i.referenceDelegate);return new Ip(r,c,o,a).recalculateAndSaveOverlaysForDocumentKeys(new qc(t,Sa.ce),e).next()})})}}function Mp(e){e.createObjectStore(ic,{keyPath:sc}).createIndex(oc,ac,{unique:!0}),e.createObjectStore(tc,{keyPath:"targetId"}).createIndex(nc,rc,{unique:!0}),e.createObjectStore(uc)}const Fp="IndexedDbPersistence",Vp=18e5,Up=5e3,qp="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",Bp="main";class jp{constructor(e,t,n,r,i,s,o,a,c,u,l=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Ci=i,this.window=s,this.document=o,this.Fi=c,this.Mi=u,this.xi=l,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=e=>Promise.resolve(),!jp.v())throw new uo(co.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new up(this,r),this.qi=t+Bp,this.serializer=new zd(a),this.Ki=new fa(this.qi,this.xi,new Lp(this.serializer)),this.ci=new af,this.li=new Xf(this.referenceDelegate,this.serializer),this.remoteDocumentCache=fp(this.serializer),this.Pi=new tf,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,!1===u&&to(Fp,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new uo(co.FAILED_PRECONDITION,qp);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.li.getHighestSequenceNumber(e))}).then(e=>{this.ai=new Sa(e,this.Fi)}).then(()=>{this.ui=!0}).catch(e=>(this.Ki&&this.Ki.close(),Promise.reject(e)))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ki.K(async t=>{null===t.newVersion&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget(async()=>{this.started&&await this.$i()}))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>$p(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.ji(e).next(e=>{e||(this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)))})}).next(()=>this.Ji(e)).next(t=>this.isPrimary&&!t?this.Hi(e).next(()=>!1):!!t&&this.Zi(e).next(()=>!0))).catch(e=>{if(ya(e))return eo(Fp,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return eo(Fp,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable(()=>this.ki(e)),this.isPrimary=e})}ji(e){return zp(e).get(Fa).next(e=>la.resolve(this.Xi(e)))}Yi(e){return $p(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,Vp)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{const t=Bc(e,dc);return t.J().next(e=>{const n=this.ns(e,Vp),r=e.filter(e=>-1===n.indexOf(e));return la.forEach(r,e=>t.delete(e.clientId)).next(()=>r)})}).catch(()=>[]);if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.$i().then(()=>this.es()).then(()=>this.Gi()))}Xi(e){return!!e&&e.ownerId===this.clientId}Ji(e){return this.Mi?la.resolve(!0):zp(e).get(Fa).next(t=>{if(null!==t&&this.ts(t.leaseTimestampMs,Up)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new uo(co.FAILED_PRECONDITION,qp);return!1}}return!(!this.networkEnabled||!this.inForeground)||$p(e).J().next(e=>void 0===this.ns(e,Up).find(e=>{if(this.clientId!==e.clientId){const t=!this.networkEnabled&&e.networkEnabled,n=!this.inForeground&&e.inForeground,r=this.networkEnabled===e.networkEnabled;if(t||n&&r)return!0}return!1}))}).next(e=>(this.isPrimary!==e&&eo(Fp,`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.Ki.runTransaction("shutdown","readwrite",[Ma,dc],e=>{const t=new qc(e,Sa.ce);return this.Hi(t).next(()=>this.Yi(t))}),this.Ki.close(),this.ls()}ns(e,t){return e.filter(e=>this.ts(e.updateTimeMs,t)&&!this.ss(e.clientId))}hs(){return this.runTransaction("getActiveClients","readonly",e=>$p(e).J().next(e=>this.ns(e,Vp).map(e=>e.clientId)))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return Kf.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new Lf(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return sf.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,n){eo(Fp,"Starting transaction:",e);const r="readonly"===t?"readonly":"readwrite",i=18===(s=this.xi)?Uc:17===s?Vc:16===s?Fc:15===s?Mc:14===s?Lc:13===s?xc:12===s?Pc:11===s?Oc:void io(60245);var s;let o;return this.Ki.runTransaction(e,r,i,r=>(o=new qc(r,this.ai?this.ai.next():Sa.ce),"readwrite-primary"===t?this.ji(o).next(e=>!!e||this.Ji(o)).next(t=>{if(!t)throw to(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)),new uo(co.FAILED_PRECONDITION,aa);return n(o)}).next(e=>this.Zi(o).next(()=>e)):this.Ps(o).next(()=>n(o)))).then(e=>(o.raiseOnCommittedEvent(),e))}Ps(e){return zp(e).get(Fa).next(e=>{if(null!==e&&this.ts(e.leaseTimestampMs,Up)&&!this.ss(e.ownerId)&&!this.Xi(e)&&!(this.Mi||this.allowTabSynchronization&&e.allowTabSynchronization))throw new uo(co.FAILED_PRECONDITION,qp)})}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return zp(e).put(Fa,t)}static v(){return fa.v()}Hi(e){const t=zp(e);return t.get(Fa).next(e=>this.Xi(e)?(eo(Fp,"Releasing primary lease."),t.delete(Fa)):la.resolve())}ts(e,t){const n=Date.now();return!(e<n-t||e>n&&(to(`Detected an update time that is in the future: ${e} > ${n}`),1))}Wi(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.Ni=()=>{this.Ci.enqueueAndForget(()=>(this.inForeground="visible"===this.document.visibilityState,this.$i()))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground="visible"===this.document.visibilityState)}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){var e;"function"==typeof(null==(e=this.window)?void 0:e.addEventListener)&&(this.Oi=()=>{this._s();const e=/(?:Version|Mobile)\/1[456]/;g()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){var t;try{const n=null!==(null==(t=this.Ui)?void 0:t.getItem(this.rs(e)));return eo(Fp,`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return to(Fp,"Failed to get zombied client id.",n),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){to("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch(e){}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function zp(e){return Bc(e,Ma)}function $p(e){return Bc(e,dc)}function Gp(e,t){let n=e.projectId;return e.isDefaultDatabase||(n+="."+e.database),"firestore/"+t+"/"+n+"/"
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class Kp{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.Ts=n,this.Es=r}static Is(e,t){let n=eh(),r=eh();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new Kp(e,t.fromCache,n,r)}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hp{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wp{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=g()?8:pa(p())>0?6:4}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,r){const i={result:null};return this.gs(e,t).next(e=>{i.result=e}).next(()=>{if(!i.result)return this.ps(e,t,r,n).next(e=>{i.result=e})}).next(()=>{if(i.result)return;const n=new Hp;return this.ys(e,t,n).next(r=>{if(i.result=r,this.As)return this.ws(e,t,n,r.size)})}).next(()=>i.result)}ws(e,t,n,r){return n.documentReadCount<this.Vs?(Zs()<=M.DEBUG&&eo("QueryEngine","SDK will not create cache indexes for query:",Vl(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),la.resolve()):(Zs()<=M.DEBUG&&eo("QueryEngine","Query:",Vl(t),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.ds*r?(Zs()<=M.DEBUG&&eo("QueryEngine","The SDK decides to create cache indexes for query:",Vl(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Rl(t))):la.resolve())}gs(e,t){if(kl(t))return la.resolve(null);let n=Rl(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(t=Ll(t,null,"F"),n=Rl(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{const i=eh(...r);return this.fs.getDocuments(e,i).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{const s=this.Ss(t,r);return this.bs(t,s,i,n.readTime)?this.gs(e,Ll(t,null,"F")):this.Ds(e,s,t,n)}))})))}ps(e,t,n,r){return kl(t)||r.isEqual(Wo.min())?la.resolve(null):this.fs.getDocuments(e,n).next(i=>{const s=this.Ss(t,i);return this.bs(t,s,n,r)?la.resolve(null):(Zs()<=M.DEBUG&&eo("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Vl(t)),this.Ds(e,s,t,ra(r,Qo)).next(e=>e))})}Ss(e,t){let n=new Qc(Bl(e));return t.forEach((t,r)=>{Ul(e,r)&&(n=n.add(r))}),n}bs(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}ys(e,t,n){return Zs()<=M.DEBUG&&eo("QueryEngine","Using full collection scan to execute query:",Vl(t)),this.fs.getDocumentsMatchingQuery(e,t,sa.min(),n)}Ds(e,t,n,r){return this.fs.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qp="LocalStore";class Jp{constructor(e,t,n,r){this.persistence=e,this.Cs=t,this.serializer=r,this.vs=new Kc(To),this.Fs=new zl(e=>wl(e),_l),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(n)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Ip(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.vs))}}function Yp(e,t,n,r){return new Jp(e,t,n,r)}async function Xp(e,t){const n=ao(e);return await n.persistence.runTransaction("Handle user change","readonly",e=>{let r;return n.mutationQueue.getAllMutationBatches(e).next(i=>(r=i,n.Os(t),n.mutationQueue.getAllMutationBatches(e))).next(t=>{const i=[],s=[];let o=eh();for(const e of r){i.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){s.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next(e=>({Ns:e,removedBatchIds:i,addedBatchIds:s}))})})}function Zp(e){const t=ao(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.li.getLastRemoteSnapshotVersion(e))}function em(e,t,n){let r=eh(),i=eh();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=Gl();return n.forEach((n,s)=>{const o=e.get(n);s.isFoundDocument()!==o.isFoundDocument()&&(i=i.add(n)),s.isNoDocument()&&s.version.isEqual(Wo.min())?(t.removeEntry(n,s.readTime),r=r.insert(n,s)):!o.isValidDocument()||s.version.compareTo(o.version)>0||0===s.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(s),r=r.insert(n,s)):eo(Qp,"Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",s.version)}),{Bs:r,Ls:i}})}function tm(e,t){const n=ao(e);return n.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=Aa),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}function nm(e,t){const n=ao(e);return n.persistence.runTransaction("Allocate target","readwrite",e=>{let r;return n.li.getTargetData(e,t).next(i=>i?(r=i,la.resolve(r)):n.li.allocateTargetId(e).next(i=>(r=new jd(t,i,"TargetPurposeListen",e.currentSequenceNumber),n.li.addTargetData(e,r).next(()=>r))))}).then(e=>{const r=n.vs.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.vs=n.vs.insert(e.targetId,e),n.Fs.set(t,e.targetId)),e})}async function rm(e,t,n){const r=ao(e),i=r.vs.get(t),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,e=>r.persistence.referenceDelegate.removeTarget(e,i))}catch(o){if(!ya(o))throw o;eo(Qp,`Failed to update sequence numbers for target ${t}: ${o}`)}r.vs=r.vs.remove(t),r.Fs.delete(i.target)}function im(e,t,n){const r=ao(e);let i=Wo.min(),s=eh();return r.persistence.runTransaction("Execute query","readwrite",e=>function(e,t,n){const r=ao(e),i=r.Fs.get(n);return void 0!==i?la.resolve(r.vs.get(i)):r.li.getTargetData(t,n)}(r,e,Rl(t)).next(t=>{if(t)return i=t.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(e,t.targetId).next(e=>{s=e})}).next(()=>r.Cs.getDocumentsMatchingQuery(e,t,n?i:Wo.min(),n?s:eh())).next(e=>(am(r,ql(t),e),{documents:e,ks:s})))}function sm(e,t){const n=ao(e),r=ao(n.li),i=n.vs.get(t);return i?Promise.resolve(i.target):n.persistence.runTransaction("Get target data","readonly",e=>r.At(e,t).next(e=>e?e.target:null))}function om(e,t){const n=ao(e),r=n.Ms.get(t)||Wo.min();return n.persistence.runTransaction("Get new document changes","readonly",e=>n.xs.getAllFromCollectionGroup(e,t,ra(r,Qo),Number.MAX_SAFE_INTEGER)).then(e=>(am(n,t,e),e))}function am(e,t,n){let r=e.Ms.get(t)||Wo.min();n.forEach((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)}),e.Ms.set(t,r)}async function cm(e,t,n=eh()){const r=await nm(e,Rl(Yd(t.bundledQuery))),i=ao(e);return i.persistence.runTransaction("Save named query","readwrite",e=>{const s=pd(t.readTime);if(r.snapshotVersion.compareTo(s)>=0)return i.Pi.saveNamedQuery(e,t);const o=r.withResumeToken(eu.EMPTY_BYTE_STRING,s);return i.vs=i.vs.insert(o.targetId,o),i.li.updateTargetData(e,o).next(()=>i.li.removeMatchingKeysForTargetId(e,r.targetId)).next(()=>i.li.addMatchingKeys(e,n,r.targetId)).next(()=>i.Pi.saveNamedQuery(e,t))})}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const um="firestore_clients";function lm(e,t){return`${um}_${e}_${t}`}const hm="firestore_mutations";function dm(e,t,n){let r=`${hm}_${e}_${n}`;return t.isAuthenticated()&&(r+=`_${t.uid}`),r}const fm="firestore_targets";function pm(e,t){return`${fm}_${e}_${t}`}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mm="SharedClientState";class gm{constructor(e,t,n,r){this.user=e,this.batchId=t,this.state=n,this.error=r}static $s(e,t,n){const r=JSON.parse(n);let i,s="object"==typeof r&&-1!==["pending","acknowledged","rejected"].indexOf(r.state)&&(void 0===r.error||"object"==typeof r.error);return s&&r.error&&(s="string"==typeof r.error.message&&"string"==typeof r.error.code,s&&(i=new uo(r.error.code,r.error.message))),s?new gm(e,t,r.state,i):(to(mm,`Failed to parse mutation state for ID '${t}': ${n}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class ym{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static $s(e,t){const n=JSON.parse(t);let r,i="object"==typeof n&&-1!==["not-current","current","rejected"].indexOf(n.state)&&(void 0===n.error||"object"==typeof n.error);return i&&n.error&&(i="string"==typeof n.error.message&&"string"==typeof n.error.code,i&&(r=new uo(n.error.code,n.error.message))),i?new ym(e,n.state,r):(to(mm,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class vm{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static $s(e,t){const n=JSON.parse(t);let r="object"==typeof n&&n.activeTargetIds instanceof Array,i=nh();for(let s=0;r&&s<n.activeTargetIds.length;++s)r=Na(n.activeTargetIds[s]),i=i.add(n.activeTargetIds[s]);return r?new vm(e,i):(to(mm,`Failed to parse client data for instance '${e}': ${t}`),null)}}class wm{constructor(e,t){this.clientId=e,this.onlineState=t}static $s(e){const t=JSON.parse(e);return"object"==typeof t&&-1!==["Unknown","Online","Offline"].indexOf(t.onlineState)&&"string"==typeof t.clientId?new wm(t.clientId,t.onlineState):(to(mm,`Failed to parse online state: ${e}`),null)}}class _m{constructor(){this.activeTargetIds=nh()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Im{constructor(e,t,n,r,i){this.window=e,this.Ci=t,this.persistenceKey=n,this.zs=r,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.js=this.Js.bind(this),this.Hs=new Kc(To),this.started=!1,this.Zs=[];const s=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Xs=lm(this.persistenceKey,this.zs),this.Ys=`firestore_sequence_number_${this.persistenceKey}`,this.Hs=this.Hs.insert(this.zs,new _m),this.eo=new RegExp(`^${um}_${s}_([^_]*)$`),this.no=new RegExp(`^${hm}_${s}_(\\d+)(?:_(.*))?$`),this.ro=new RegExp(`^${fm}_${s}_(\\d+)$`),this.io=function(e){return`firestore_online_state_${e}`}(this.persistenceKey),this.so=function(e){return`firestore_bundle_loaded_v2_${e}`}(this.persistenceKey),this.window.addEventListener("storage",this.js)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.hs();for(const n of e){if(n===this.zs)continue;const e=this.getItem(lm(this.persistenceKey,n));if(e){const t=vm.$s(n,e);t&&(this.Hs=this.Hs.insert(t.clientId,t))}}this.oo();const t=this.storage.getItem(this.io);if(t){const e=this._o(t);e&&this.ao(e)}for(const n of this.Zs)this.Js(n);this.Zs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ys,JSON.stringify(e))}getAllActiveQueryTargets(){return this.uo(this.Hs)}isActiveQueryTarget(e){let t=!1;return this.Hs.forEach((n,r)=>{r.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.co(e,"pending")}updateMutationState(e,t,n){this.co(e,t,n),this.lo(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const t=this.storage.getItem(pm(this.persistenceKey,e));if(t){const r=ym.$s(e,t);r&&(n=r.state)}}return t&&this.ho.Qs(e),this.oo(),n}removeLocalQueryTarget(e){this.ho.Gs(e),this.oo()}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(pm(this.persistenceKey,e))}updateQueryState(e,t,n){this.Po(e,t,n)}handleUserChange(e,t,n){t.forEach(e=>{this.lo(e)}),this.currentUser=e,n.forEach(e=>{this.addPendingMutation(e)})}setOnlineState(e){this.To(e)}notifyBundleLoaded(e){this.Eo(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return eo(mm,"READ",e,t),t}setItem(e,t){eo(mm,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){eo(mm,"REMOVE",e),this.storage.removeItem(e)}Js(e){const t=e;if(t.storageArea===this.storage){if(eo(mm,"EVENT",t.key,t.newValue),t.key===this.Xs)return void to("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ci.enqueueRetryable(async()=>{if(this.started){if(null!==t.key)if(this.eo.test(t.key)){if(null==t.newValue){const e=this.Io(t.key);return this.Ro(e,null)}{const e=this.Ao(t.key,t.newValue);if(e)return this.Ro(e.clientId,e)}}else if(this.no.test(t.key)){if(null!==t.newValue){const e=this.Vo(t.key,t.newValue);if(e)return this.mo(e)}}else if(this.ro.test(t.key)){if(null!==t.newValue){const e=this.fo(t.key,t.newValue);if(e)return this.po(e)}}else if(t.key===this.io){if(null!==t.newValue){const e=this._o(t.newValue);if(e)return this.ao(e)}}else if(t.key===this.Ys){const e=function(e){let t=Sa.ce;if(null!=e)try{const n=JSON.parse(e);oo("number"==typeof n,30636,{yo:e}),t=n}catch(n){to(mm,"Failed to read sequence number from WebStorage",n)}return t}(t.newValue);e!==Sa.ce&&this.sequenceNumberHandler(e)}else if(t.key===this.so){const e=this.wo(t.newValue);await Promise.all(e.map(e=>this.syncEngine.So(e)))}}else this.Zs.push(t)})}}get ho(){return this.Hs.get(this.zs)}oo(){this.setItem(this.Xs,this.ho.Ws())}co(e,t,n){const r=new gm(this.currentUser,e,t,n),i=dm(this.persistenceKey,this.currentUser,e);this.setItem(i,r.Ws())}lo(e){const t=dm(this.persistenceKey,this.currentUser,e);this.removeItem(t)}To(e){const t={clientId:this.zs,onlineState:e};this.storage.setItem(this.io,JSON.stringify(t))}Po(e,t,n){const r=pm(this.persistenceKey,e),i=new ym(e,t,n);this.setItem(r,i.Ws())}Eo(e){const t=JSON.stringify(Array.from(e));this.setItem(this.so,t)}Io(e){const t=this.eo.exec(e);return t?t[1]:null}Ao(e,t){const n=this.Io(e);return vm.$s(n,t)}Vo(e,t){const n=this.no.exec(e),r=Number(n[1]),i=void 0!==n[2]?n[2]:null;return gm.$s(new Js(i),r,t)}fo(e,t){const n=this.ro.exec(e),r=Number(n[1]);return ym.$s(r,t)}_o(e){return wm.$s(e)}wo(e){return JSON.parse(e)}async mo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.bo(e.batchId,e.state,e.error);eo(mm,`Ignoring mutation for non-active user ${e.user.uid}`)}po(e){return this.syncEngine.Do(e.targetId,e.state,e.error)}Ro(e,t){const n=t?this.Hs.insert(e,t):this.Hs.remove(e),r=this.uo(this.Hs),i=this.uo(n),s=[],o=[];return i.forEach(e=>{r.has(e)||s.push(e)}),r.forEach(e=>{i.has(e)||o.push(e)}),this.syncEngine.Co(s,o).then(()=>{this.Hs=n})}ao(e){this.Hs.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}uo(e){let t=nh();return e.forEach((e,n)=>{t=t.unionWith(n.activeTargetIds)}),t}}class Tm{constructor(){this.vo=new _m,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,n){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new _m,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bm{Mo(e){}shutdown(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Em="ConnectivityMonitor";class Sm{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){eo(Em,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){eo(Em,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Am=null;function Cm(){return null===Am?Am=268435456+Math.round(2147483648*Math.random()):Am++,"0x"+Am.toString(16)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const km="RestConnection",Nm={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class Dm{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${n}/databases/${r}`,this.$o=this.databaseId.database===fu?`project_id=${n}`:`project_id=${n}&database_id=${r}`}Wo(e,t,n,r,i){const s=Cm(),o=this.Qo(e,t.toUriEncodedString());eo(km,`Sending RPC '${e}' ${s}:`,o,n);const a={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(a,r,i);const{host:c}=new URL(o),u=D(c);return this.zo(e,o,a,n,u).then(t=>(eo(km,`Received RPC '${e}' ${s}: `,t),t),t=>{throw no(km,`RPC '${e}' ${s} failed with error: `,t,"url: ",o,"request:",n),t})}jo(e,t,n,r,i,s){return this.Wo(e,t,n,r,i)}Go(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+Ys,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}Qo(e,t){const n=Nm[e];let r=`${this.Ko}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(r=`${r}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),r}terminate(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rm{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Om="WebChannelConnection",Pm=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(t){setTimeout(()=>{throw t},0)}})};class xm extends Dm{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!xm.c_){const e=Hs();Pm(e,Ks.STAT_EVENT,e=>{e.stat===Gs.PROXY?eo(Om,"STAT_EVENT: detected buffering proxy"):e.stat===Gs.NOPROXY&&eo(Om,"STAT_EVENT: detected no buffering proxy")}),xm.c_=!0}}zo(e,t,n,r,i){const s=Cm();return new Promise((i,o)=>{const a=new Bs;a.setWithCredentials(!0),a.listenOnce(zs.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case $s.NO_ERROR:const t=a.getResponseJson();eo(Om,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(t)),i(t);break;case $s.TIMEOUT:eo(Om,`RPC '${e}' ${s} timed out`),o(new uo(co.DEADLINE_EXCEEDED,"Request time out"));break;case $s.HTTP_ERROR:const n=a.getStatus();if(eo(Om,`RPC '${e}' ${s} failed with status:`,n,"response text:",a.getResponseText()),n>0){let e=a.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=null==e?void 0:e.error;if(t&&t.status&&t.message){const e=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(co).indexOf(t)>=0?t:co.UNKNOWN}(t.status);o(new uo(e,t.message))}else o(new uo(co.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new uo(co.UNAVAILABLE,"Connection failed."));break;default:io(9055,{l_:e,streamId:s,h_:a.getLastErrorCode(),P_:a.getLastError()})}}finally{eo(Om,`RPC '${e}' ${s} completed.`)}});const c=JSON.stringify(r);eo(Om,`RPC '${e}' ${s} sending request:`,r),a.send(t,"POST",c,n,15)})}T_(e,t,n){const r=Cm(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],s=this.createWebChannelTransport(),o={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},a=this.longPollingOptions.timeoutSeconds;void 0!==a&&(o.longPollingTimeout=Math.round(1e3*a)),this.useFetchStreams&&(o.useFetchStreams=!0),this.Go(o.initMessageHeaders,t,n),o.encodeInitMessageHeaders=!0;const c=i.join("");eo(Om,`Creating RPC '${e}' stream ${r}: ${c}`,o);const u=s.createWebChannel(c,o);this.E_(u);let l=!1,h=!1;const d=new Rm({Jo:t=>{h?eo(Om,`Not sending because RPC '${e}' stream ${r} is closed:`,t):(l||(eo(Om,`Opening RPC '${e}' stream ${r} transport.`),u.open(),l=!0),eo(Om,`RPC '${e}' stream ${r} sending:`,t),u.send(t))},Ho:()=>u.close()});return Pm(u,js.EventType.OPEN,()=>{h||(eo(Om,`RPC '${e}' stream ${r} transport opened.`),d.i_())}),Pm(u,js.EventType.CLOSE,()=>{h||(h=!0,eo(Om,`RPC '${e}' stream ${r} transport closed`),d.o_(),this.I_(u))}),Pm(u,js.EventType.ERROR,t=>{h||(h=!0,no(Om,`RPC '${e}' stream ${r} transport errored. Name:`,t.name,"Message:",t.message),d.o_(new uo(co.UNAVAILABLE,"The operation could not be completed")))}),Pm(u,js.EventType.MESSAGE,t=>{var n;if(!h){const i=t.data[0];oo(!!i,16349);const s=i,o=(null==s?void 0:s.error)||(null==(n=s[0])?void 0:n.error);if(o){eo(Om,`RPC '${e}' stream ${r} received error:`,o);const t=o.status;let n=function(e){const t=qh[e];if(void 0!==t)return zh(t)}(t),i=o.message;"NOT_FOUND"===t&&i.includes("database")&&i.includes("does not exist")&&i.includes(this.databaseId.database)&&no(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),void 0===n&&(n=co.INTERNAL,i="Unknown error status: "+t+" with message "+o.message),h=!0,d.o_(new uo(n,i)),u.close()}else eo(Om,`RPC '${e}' stream ${r} received:`,i),d.__(i)}}),xm.u_(),setTimeout(()=>{d.s_()},0),d}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter(t=>t===e)}Go(e,t,n){super.Go(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Ws()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Lm(){return"undefined"!=typeof window?window:null}function Mm(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fm(e){return new ud(e,!0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */xm.c_=!1;class Vm{constructor(e,t,n=1e3,r=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=n,this.A_=r,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),n=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-n);r>0&&eo("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){null!==this.m_&&(this.m_.skipDelay(),this.m_=null)}cancel(){null!==this.m_&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Um="PersistentStream";class qm{constructor(e,t,n,r,i,s,o,a){this.Ci=e,this.S_=n,this.b_=r,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Vm(e,t)}x_(){return 1===this.state||5===this.state||this.O_()}O_(){return 2===this.state||3===this.state}start(){this.F_=0,4!==this.state?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&null===this.C_&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,4!==e?this.M_.reset():t&&t.code===co.RESOURCE_EXHAUSTED?(to(t.toString()),to("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===co.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.D_===t&&this.G_(e,n)},t=>{e(()=>{const e=new uo(co.UNKNOWN,"Fetching auth token failed: "+t.message);return this.z_(e)})})}G_(e,t){const n=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo(()=>{n(()=>this.listener.Zo())}),this.stream.Yo(()=>{n(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(e=>{n(()=>this.z_(e))}),this.stream.onMessage(e=>{n(()=>1==++this.F_?this.J_(e):this.onNext(e))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return eo(Um,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget(()=>this.D_===e?t():(eo(Um,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Bm extends qm{constructor(e,t,n,r,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=function(e,t){let n;if("targetChange"in t){t.targetChange;const i="NO_CHANGE"===(r=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===r?1:"REMOVE"===r?2:"CURRENT"===r?3:"RESET"===r?4:io(39313,{state:r}),s=t.targetChange.targetIds||[],o=function(e,t){return e.useProto3Json?(oo(void 0===t||"string"==typeof t,58123),eu.fromBase64String(t||"")):(oo(void 0===t||t instanceof Buffer||t instanceof Uint8Array,16193),eu.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),a=t.targetChange.cause,c=a&&function(e){const t=void 0===e.code?co.UNKNOWN:zh(e.code);return new uo(t,e.message||"")}(a);n=new td(i,s,o,c||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const i=wd(e,r.document.name),s=pd(r.document.updateTime),o=r.document.createTime?pd(r.document.createTime):Wo.min(),a=new $u({mapValue:{fields:r.document.fields}}),c=Ku.newFoundDocument(i,s,o,a),u=r.targetIds||[],l=r.removedTargetIds||[];n=new Zh(u,l,c.key,c)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const i=wd(e,r.document),s=r.readTime?pd(r.readTime):Wo.min(),o=Ku.newNoDocument(i,s),a=r.removedTargetIds||[];n=new Zh([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const i=wd(e,r.document),s=r.removedTargetIds||[];n=new Zh([],s,i,null)}else{if(!("filter"in t))return io(11601,{Vt:t});{t.filter;const e=t.filter;e.targetId;const{count:r=0,unchangedNames:i}=e,s=new Uh(r,i),o=e.targetId;n=new ed(o,s)}}var r;return n}(this.serializer,e),n=function(e){if(!("targetChange"in e))return Wo.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?Wo.min():t.readTime?pd(t.readTime):Wo.min()}(e);return this.listener.H_(t,n)}Z_(e){const t={};t.database=Td(this.serializer),t.addTarget=function(e,t){let n;const r=t.target;if(n=Il(r)?{documents:kd(e,r)}:{query:Nd(e,r).ft},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=dd(e,t.resumeToken);const r=ld(e,t.expectedCount);null!==r&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(Wo.min())>0){n.readTime=hd(e,t.snapshotVersion.toTimestamp());const r=ld(e,t.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,e);const n=function(e,t){const n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return io(28987,{purpose:e})}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,e);n&&(t.labels=n),this.q_(t)}X_(e){const t={};t.database=Td(this.serializer),t.removeTarget=e,this.q_(t)}}class jm extends qm{constructor(e,t,n,r,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return oo(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,oo(!e.writeResults||0===e.writeResults.length,55816),this.listener.ta()}onNext(e){oo(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=function(e,t){return e&&e.length>0?(oo(void 0!==t,14353),e.map(e=>function(e,t){let n=e.updateTime?pd(e.updateTime):pd(t);return n.isEqual(Wo.min())&&(n=pd(t)),new wh(n,e.transformResults||[])}(e,t))):[]}(e.writeResults,e.commitTime),n=pd(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=Td(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(e=>Ad(this.serializer,e))};this.q_(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zm{}class $m extends zm{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new uo(co.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,n,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.Wo(e,gd(t,n),r,i,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===co.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new uo(co.UNKNOWN,e.toString())})}jo(e,t,n,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.jo(e,gd(t,n),r,s,o,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===co.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new uo(co.UNKNOWN,e.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class Gm{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){0===this.oa&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){"Online"===this.state?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,"Online"===e&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(to(t),this.aa=!1):eo("OnlineStateTracker",t)}Pa(){null!==this._a&&(this._a.cancel(),this._a=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Km="RemoteStore";class Hm{constructor(e,t,n,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo(e=>{n.enqueueAndForget(async()=>{ng(this)&&(eo(Km,"Restarting streams for network reachability change."),await async function(e){const t=ao(e);t.Ia.add(4),await Qm(t),t.Va.set("Unknown"),t.Ia.delete(4),await Wm(t)}(this))})}),this.Va=new Gm(n,r)}}async function Wm(e){if(ng(e))for(const t of e.Ra)await t(!0)}async function Qm(e){for(const t of e.Ra)await t(!1)}function Jm(e,t){const n=ao(e);n.Ea.has(t.targetId)||(n.Ea.set(t.targetId,t),tg(n)?eg(n):Ig(n).O_()&&Xm(n,t))}function Ym(e,t){const n=ao(e),r=Ig(n);n.Ea.delete(t),r.O_()&&Zm(n,t),0===n.Ea.size&&(r.O_()?r.L_():ng(n)&&n.Va.set("Unknown"))}function Xm(e,t){if(e.da.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(Wo.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}Ig(e).Z_(t)}function Zm(e,t){e.da.$e(t),Ig(e).X_(t)}function eg(e){e.da=new rd({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),At:t=>e.Ea.get(t)||null,ht:()=>e.datastore.serializer.databaseId}),Ig(e).start(),e.Va.ua()}function tg(e){return ng(e)&&!Ig(e).x_()&&e.Ea.size>0}function ng(e){return 0===ao(e).Ia.size}function rg(e){e.da=void 0}async function ig(e){e.Va.set("Online")}async function sg(e){e.Ea.forEach((t,n)=>{Xm(e,t)})}async function og(e,t){rg(e),tg(e)?(e.Va.ha(t),eg(e)):e.Va.set("Unknown")}async function ag(e,t,n){if(e.Va.set("Online"),t instanceof td&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const r of t.targetIds)e.Ea.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.Ea.delete(r),e.da.removeTarget(r))}(e,t)}catch(r){eo(Km,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await cg(e,r)}else if(t instanceof Zh?e.da.Xe(t):t instanceof ed?e.da.st(t):e.da.tt(t),!n.isEqual(Wo.min()))try{const t=await Zp(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.da.Tt(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const i=e.Ea.get(r);i&&e.Ea.set(r,i.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{const r=e.Ea.get(t);if(!r)return;e.Ea.set(t,r.withResumeToken(eu.EMPTY_BYTE_STRING,r.snapshotVersion)),Zm(e,t);const i=new jd(r.target,t,n,r.sequenceNumber);Xm(e,i)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(i){eo(Km,"Failed to raise snapshot:",i),await cg(e,i)}}async function cg(e,t,n){if(!ya(t))throw t;e.Ia.add(1),await Qm(e),e.Va.set("Offline"),n||(n=()=>Zp(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{eo(Km,"Retrying IndexedDB access"),await n(),e.Ia.delete(1),await Wm(e)})}function ug(e,t){return t().catch(n=>cg(e,n,t))}async function lg(e){const t=ao(e),n=Tg(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:Aa;for(;hg(t);)try{const e=await tm(t.localStore,r);if(null===e){0===t.Ta.length&&n.L_();break}r=e.batchId,dg(t,e)}catch(i){await cg(t,i)}fg(t)&&pg(t)}function hg(e){return ng(e)&&e.Ta.length<10}function dg(e,t){e.Ta.push(t);const n=Tg(e);n.O_()&&n.Y_&&n.ea(t.mutations)}function fg(e){return ng(e)&&!Tg(e).x_()&&e.Ta.length>0}function pg(e){Tg(e).start()}async function mg(e){Tg(e).ra()}async function gg(e){const t=Tg(e);for(const n of e.Ta)t.ea(n.mutations)}async function yg(e,t,n){const r=e.Ta.shift(),i=Mh.from(r,t,n);await ug(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await lg(e)}async function vg(e,t){t&&Tg(e).Y_&&await async function(e,t){if(jh(n=t.code)&&n!==co.ABORTED){const n=e.Ta.shift();Tg(e).B_(),await ug(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await lg(e)}var n}(e,t),fg(e)&&pg(e)}async function wg(e,t){const n=ao(e);n.asyncQueue.verifyOperationInProgress(),eo(Km,"RemoteStore received new credentials");const r=ng(n);n.Ia.add(3),await Qm(n),r&&n.Va.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.Ia.delete(3),await Wm(n)}async function _g(e,t){const n=ao(e);t?(n.Ia.delete(2),await Wm(n)):t||(n.Ia.add(2),await Qm(n),n.Va.set("Unknown"))}function Ig(e){return e.ma||(e.ma=function(e,t,n){const r=ao(e);return r.sa(),new Bm(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Zo:ig.bind(null,e),Yo:sg.bind(null,e),t_:og.bind(null,e),H_:ag.bind(null,e)}),e.Ra.push(async t=>{t?(e.ma.B_(),tg(e)?eg(e):e.Va.set("Unknown")):(await e.ma.stop(),rg(e))})),e.ma}function Tg(e){return e.fa||(e.fa=function(e,t,n){const r=ao(e);return r.sa(),new jm(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Zo:()=>Promise.resolve(),Yo:mg.bind(null,e),t_:vg.bind(null,e),ta:gg.bind(null,e),na:yg.bind(null,e)}),e.Ra.push(async t=>{t?(e.fa.B_(),await lg(e)):(await e.fa.stop(),e.Ta.length>0&&(eo(Km,`Stopping write stream with ${e.Ta.length} pending writes`),e.Ta=[]))})),e.fa
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class bg{constructor(e,t,n,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new lo,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,r,i){const s=Date.now()+n,o=new bg(e,t,s,r,i);return o.start(n),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new uo(co.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Eg(e,t){if(to("AsyncQueue",`${t}: ${e}`),ya(e))return new uo(co.UNAVAILABLE,`${t}: ${e}`);throw e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sg{static emptySet(e){return new Sg(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||xo.comparator(t.key,n.key):(e,t)=>xo.comparator(e.key,t.key),this.keyedMap=Hl(),this.sortedSet=new Kc(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Sg))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new Sg;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ag{constructor(){this.ga=new Kc(xo.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?0!==e.type&&3===n.type?this.ga=this.ga.insert(t,e):3===e.type&&1!==n.type?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.ga=this.ga.remove(t):1===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):io(63341,{Vt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,n)=>{e.push(n)}),e}}class Cg{constructor(e,t,n,r,i,s,o,a,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,r,i){const s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new Cg(e,t,Sg.emptySet(t),s,n,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ml(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==n[r].type||!t[r].doc.isEqual(n[r].doc))return!1;return!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kg{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class Ng{constructor(){this.queries=Dg(),this.onlineState="Unknown",this.Ca=new Set}terminate(){!function(e,t){const n=ao(e),r=n.queries;n.queries=Dg(),r.forEach((e,n)=>{for(const r of n.Sa)r.onError(t)})}(this,new uo(co.ABORTED,"Firestore shutting down"))}}function Dg(){return new zl(e=>Fl(e),Ml)}async function Rg(e,t){const n=ao(e);let r=3;const i=t.query;let s=n.queries.get(i);s?!s.ba()&&t.Da()&&(r=2):(s=new kg,r=t.Da()?0:1);try{switch(r){case 0:s.wa=await n.onListen(i,!0);break;case 1:s.wa=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(o){const e=Eg(o,`Initialization of query '${Vl(t.query)}' failed`);return void t.onError(e)}n.queries.set(i,s),s.Sa.push(t),t.va(n.onlineState),s.wa&&t.Fa(s.wa)&&Lg(n)}async function Og(e,t){const n=ao(e),r=t.query;let i=3;const s=n.queries.get(r);if(s){const e=s.Sa.indexOf(t);e>=0&&(s.Sa.splice(e,1),0===s.Sa.length?i=t.Da()?0:1:!s.ba()&&t.Da()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function Pg(e,t){const n=ao(e);let r=!1;for(const i of t){const e=i.query,t=n.queries.get(e);if(t){for(const e of t.Sa)e.Fa(i)&&(r=!0);t.wa=i}}r&&Lg(n)}function xg(e,t,n){const r=ao(e),i=r.queries.get(t);if(i)for(const s of i.Sa)s.onError(n);r.queries.delete(t)}function Lg(e){e.Ca.forEach(e=>{e.next()})}var Mg,Fg;(Fg=Mg||(Mg={})).Ma="default",Fg.Cache="cache";class Vg{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new Cg(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache)return!0;if(!this.Da())return!0;const n="Offline"!==t;return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}ka(e){e=Cg.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Mg.Cache}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(e,t){this.Ka=e,this.byteLength=t}Ua(){return"metadata"in this.Ka}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qg{constructor(e){this.serializer=e}qs(e){return wd(this.serializer,e)}Ks(e){return e.metadata.exists?Sd(this.serializer,e.document,!1):Ku.newNoDocument(this.qs(e.metadata.name),this.Us(e.metadata.readTime))}Us(e){return pd(e)}}class Bg{constructor(e,t){this.$a=e,this.serializer=t,this.Wa=[],this.Qa=[],this.collectionGroups=new Set,this.progress=jg(e)}get queries(){return this.Wa}get documents(){return this.Qa}Ga(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.Ka.namedQuery)this.Wa.push(e.Ka.namedQuery);else if(e.Ka.documentMetadata){this.Qa.push({metadata:e.Ka.documentMetadata}),e.Ka.documentMetadata.exists||++t;const n=Ro.fromString(e.Ka.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.Ka.document&&(this.Qa[this.Qa.length-1].document=e.Ka.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}za(e){const t=new Map,n=new qg(this.serializer);for(const r of e)if(r.metadata.queries){const e=n.qs(r.metadata.name);for(const n of r.metadata.queries){const r=(t.get(n)||eh()).add(e);t.set(n,r)}}return t}async ja(e){const t=await async function(e,t,n,r){const i=ao(e);let s=eh(),o=Gl();for(const l of n){const e=t.qs(l.metadata.name);l.document&&(s=s.add(e));const n=t.Ks(l);n.setReadTime(t.Us(l.metadata.readTime)),o=o.insert(e,n)}const a=i.xs.newChangeBuffer({trackRemovals:!0}),c=await nm(i,(u=r,Rl(Cl(Ro.fromString(`__bundle__/docs/${u}`)))));var u;return i.persistence.runTransaction("Apply bundle documents","readwrite",e=>em(e,a,o).next(t=>(a.apply(e),t)).next(t=>i.li.removeMatchingKeysForTargetId(e,c.targetId).next(()=>i.li.addMatchingKeys(e,s,c.targetId)).next(()=>i.localDocuments.getLocalViewOfDocuments(e,t.Bs,t.Ls)).next(()=>t.Bs)))}(e,new qg(this.serializer),this.Qa,this.$a.id),n=this.za(this.documents);for(const r of this.Wa)await cm(e,r,n.get(r.name));return this.progress.taskState="Success",{progress:this.progress,Ja:this.collectionGroups,Ha:t}}}function jg(e){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zg{constructor(e){this.key=e}}class $g{constructor(e){this.key=e}}class Gg{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=eh(),this.mutatedKeys=eh(),this.eu=Bl(e),this.tu=new Sg(this.eu)}get nu(){return this.Za}ru(e,t){const n=t?t.iu:new Ag,r=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,s=r,o=!1;const a="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,c="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{const u=r.get(e),l=Ul(this.query,t)?t:null,h=!!u&&this.mutatedKeys.has(u.key),d=!!l&&(l.hasLocalMutations||this.mutatedKeys.has(l.key)&&l.hasCommittedMutations);let f=!1;u&&l?u.data.isEqual(l.data)?h!==d&&(n.track({type:3,doc:l}),f=!0):this.su(u,l)||(n.track({type:2,doc:l}),f=!0,(a&&this.eu(l,a)>0||c&&this.eu(l,c)<0)&&(o=!0)):!u&&l?(n.track({type:0,doc:l}),f=!0):u&&!l&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(l?(s=s.add(l),i=d?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){const e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{tu:s,iu:n,bs:o,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,r){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const s=e.iu.ya();s.sort((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return io(20277,{Vt:e})}};return n(e)-n(t)}(e.type,t.type)||this.eu(e.doc,t.doc)),this.ou(n),r=r??!1;const o=t&&!r?this._u():[],a=0===this.Ya.size&&this.current&&!r?1:0,c=a!==this.Xa;return this.Xa=a,0!==s.length||c?{snapshot:new Cg(this.query,e.tu,i,s,e.mutatedKeys,0===a,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:o}:{au:o}}va(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Ag,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(e=>this.Za=this.Za.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Za=this.Za.delete(e)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=eh(),this.tu.forEach(e=>{this.uu(e.key)&&(this.Ya=this.Ya.add(e.key))});const t=[];return e.forEach(e=>{this.Ya.has(e)||t.push(new $g(e))}),this.Ya.forEach(n=>{e.has(n)||t.push(new zg(n))}),t}cu(e){this.Za=e.ks,this.Ya=eh();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Cg.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,0===this.Xa,this.hasCachedResults)}}const Kg="SyncEngine";class Hg{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class Wg{constructor(e){this.key=e,this.hu=!1}}class Qg{constructor(e,t,n,r,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.Pu={},this.Tu=new zl(e=>Fl(e),Ml),this.Eu=new Map,this.Iu=new Set,this.Ru=new Kc(xo.comparator),this.Au=new Map,this.Vu=new Sp,this.du={},this.mu=new Map,this.fu=Yf.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return!0===this.gu}}async function Jg(e,t,n=!0){const r=Sy(e);let i;const s=r.Tu.get(t);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.lu()):i=await Xg(r,t,n,!0),i}async function Yg(e,t){const n=Sy(e);await Xg(n,t,!0,!1)}async function Xg(e,t,n,r){const i=await nm(e.localStore,Rl(t)),s=i.targetId,o=e.sharedClientState.addLocalQueryTarget(s,n);let a;return r&&(a=await Zg(e,t,s,"current"===o,i.resumeToken)),e.isPrimaryClient&&n&&Jm(e.remoteStore,i),a}async function Zg(e,t,n,r,i){e.pu=(t,n,r)=>async function(e,t,n,r){let i=t.view.ru(n);i.bs&&(i=await im(e.localStore,t.query,!1).then(({documents:e})=>t.view.ru(e,i)));const s=r&&r.targetChanges.get(t.targetId),o=r&&null!=r.targetMismatches.get(t.targetId),a=t.view.applyChanges(i,e.isPrimaryClient,s,o);return hy(e,t.targetId,a.au),a.snapshot}(e,t,n,r);const s=await im(e.localStore,t,!0),o=new Gg(t,s.ks),a=o.ru(s.documents),c=Xh.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,i),u=o.applyChanges(a,e.isPrimaryClient,c);hy(e,n,u.au);const l=new Hg(t,n,o);return e.Tu.set(t,l),e.Eu.has(n)?e.Eu.get(n).push(t):e.Eu.set(n,[t]),u.snapshot}async function ey(e,t,n){const r=ao(e),i=r.Tu.get(t),s=r.Eu.get(i.targetId);if(s.length>1)return r.Eu.set(i.targetId,s.filter(e=>!Ml(e,t))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await rm(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&Ym(r.remoteStore,i.targetId),uy(r,i.targetId)}).catch(ua)):(uy(r,i.targetId),await rm(r.localStore,i.targetId,!0))}async function ty(e,t){const n=ao(e),r=n.Tu.get(t),i=n.Eu.get(r.targetId);n.isPrimaryClient&&1===i.length&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Ym(n.remoteStore,r.targetId))}async function ny(e,t){const n=ao(e);try{const e=await function(e,t){const n=ao(e),r=t.snapshotVersion;let i=n.vs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{const s=n.xs.newChangeBuffer({trackRemovals:!0});i=n.vs;const o=[];t.targetChanges.forEach((s,a)=>{const c=i.get(a);if(!c)return;o.push(n.li.removeMatchingKeys(e,s.removedDocuments,a).next(()=>n.li.addMatchingKeys(e,s.addedDocuments,a)));let u=c.withSequenceNumber(e.currentSequenceNumber);var l,h,d;null!==t.targetMismatches.get(a)?u=u.withResumeToken(eu.EMPTY_BYTE_STRING,Wo.min()).withLastLimboFreeSnapshotVersion(Wo.min()):s.resumeToken.approximateByteSize()>0&&(u=u.withResumeToken(s.resumeToken,r)),i=i.insert(a,u),h=u,d=s,(0===(l=c).resumeToken.approximateByteSize()||h.snapshotVersion.toMicroseconds()-l.snapshotVersion.toMicroseconds()>=3e8||d.addedDocuments.size+d.modifiedDocuments.size+d.removedDocuments.size>0)&&o.push(n.li.updateTargetData(e,u))});let a=Gl(),c=eh();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))}),o.push(em(e,s,t.documentUpdates).next(e=>{a=e.Bs,c=e.Ls})),!r.isEqual(Wo.min())){const t=n.li.getLastRemoteSnapshotVersion(e).next(t=>n.li.setTargetsMetadata(e,e.currentSequenceNumber,r));o.push(t)}return la.waitFor(o).next(()=>s.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,a,c)).next(()=>a)}).then(e=>(n.vs=i,e))}(n.localStore,t);t.targetChanges.forEach((e,t)=>{const r=n.Au.get(t);r&&(oo(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1,22616),e.addedDocuments.size>0?r.hu=!0:e.modifiedDocuments.size>0?oo(r.hu,14607):e.removedDocuments.size>0&&(oo(r.hu,42227),r.hu=!1))}),await py(n,e,t)}catch(r){await ua(r)}}function ry(e,t,n){const r=ao(e);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const e=[];r.Tu.forEach((n,r)=>{const i=r.view.va(t);i.snapshot&&e.push(i.snapshot)}),function(e,t){const n=ao(e);n.onlineState=t;let r=!1;n.queries.forEach((e,n)=>{for(const i of n.Sa)i.va(t)&&(r=!0)}),r&&Lg(n)}(r.eventManager,t),e.length&&r.Pu.H_(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function iy(e,t,n){const r=ao(e);r.sharedClientState.updateQueryState(t,"rejected",n);const i=r.Au.get(t),s=i&&i.key;if(s){let e=new Kc(xo.comparator);e=e.insert(s,Ku.newNoDocument(s,Wo.min()));const n=eh().add(s),i=new Yh(Wo.min(),new Map,new Kc(To),e,n);await ny(r,i),r.Ru=r.Ru.remove(s),r.Au.delete(t),fy(r)}else await rm(r.localStore,t,!1).then(()=>uy(r,t,n)).catch(ua)}async function sy(e,t){const n=ao(e),r=t.batch.batchId;try{const e=await function(e,t){const n=ao(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{const r=t.batch.keys(),i=n.xs.newChangeBuffer({trackRemovals:!0});return function(e,t,n,r){const i=n.batch,s=i.keys();let o=la.resolve();return s.forEach(e=>{o=o.next(()=>r.getEntry(t,e)).next(t=>{const s=n.docVersions.get(e);oo(null!==s,48541),t.version.compareTo(s)<0&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),o.next(()=>e.mutationQueue.removeMutationBatch(t,i))}(n,e,t,i).next(()=>i.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=eh();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,r))})}(n.localStore,t);cy(n,r,null),ay(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await py(n,e)}catch(i){await ua(i)}}async function oy(e,t,n){const r=ao(e);try{const e=await function(e,t){const n=ao(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(oo(null!==t,37113),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))})}(r.localStore,t);cy(r,t,n),ay(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await py(r,e)}catch(i){await ua(i)}}function ay(e,t){(e.mu.get(t)||[]).forEach(e=>{e.resolve()}),e.mu.delete(t)}function cy(e,t,n){const r=ao(e);let i=r.du[r.currentUser.toKey()];if(i){const e=i.get(t);e&&(n?e.reject(n):e.resolve(),i=i.remove(t)),r.du[r.currentUser.toKey()]=i}}function uy(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.Eu.get(t))e.Tu.delete(r),n&&e.Pu.yu(r,n);e.Eu.delete(t),e.isPrimaryClient&&e.Vu.Gr(t).forEach(t=>{e.Vu.containsKey(t)||ly(e,t)})}function ly(e,t){e.Iu.delete(t.path.canonicalString());const n=e.Ru.get(t);null!==n&&(Ym(e.remoteStore,n),e.Ru=e.Ru.remove(t),e.Au.delete(n),fy(e))}function hy(e,t,n){for(const r of n)r instanceof zg?(e.Vu.addReference(r.key,t),dy(e,r)):r instanceof $g?(eo(Kg,"Document no longer in limbo: "+r.key),e.Vu.removeReference(r.key,t),e.Vu.containsKey(r.key)||ly(e,r.key)):io(19791,{wu:r})}function dy(e,t){const n=t.key,r=n.path.canonicalString();e.Ru.get(n)||e.Iu.has(r)||(eo(Kg,"New document in limbo: "+n),e.Iu.add(r),fy(e))}function fy(e){for(;e.Iu.size>0&&e.Ru.size<e.maxConcurrentLimboResolutions;){const t=e.Iu.values().next().value;e.Iu.delete(t);const n=new xo(Ro.fromString(t)),r=e.fu.next();e.Au.set(r,new Wg(n)),e.Ru=e.Ru.insert(n,r),Jm(e.remoteStore,new jd(Rl(Cl(n.path)),r,"TargetPurposeLimboResolution",Sa.ce))}}async function py(e,t,n){const r=ao(e),i=[],s=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((e,a)=>{o.push(r.pu(a,t,n).then(e=>{var t;if((e||n)&&r.isPrimaryClient){const i=e?!e.fromCache:null==(t=null==n?void 0:n.targetChanges.get(a.targetId))?void 0:t.current;r.sharedClientState.updateQueryState(a.targetId,i?"current":"not-current")}if(e){i.push(e);const t=Kp.Is(a.targetId,e);s.push(t)}}))}),await Promise.all(o),r.Pu.H_(i),await async function(e,t){const n=ao(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>la.forEach(t,t=>la.forEach(t.Ts,r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r)).next(()=>la.forEach(t.Es,r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))}catch(r){if(!ya(r))throw r;eo(Qp,"Failed to update sequence numbers: "+r)}for(const i of t){const e=i.targetId;if(!i.fromCache){const t=n.vs.get(e),r=t.snapshotVersion,i=t.withLastLimboFreeSnapshotVersion(r);n.vs=n.vs.insert(e,i)}}}(r.localStore,s))}async function my(e,t){const n=ao(e);if(!n.currentUser.isEqual(t)){eo(Kg,"User change. New user:",t.toKey());const e=await Xp(n.localStore,t);n.currentUser=t,i="'waitForPendingWrites' promise is rejected due to a user change.",(r=n).mu.forEach(e=>{e.forEach(e=>{e.reject(new uo(co.CANCELLED,i))})}),r.mu.clear(),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await py(n,e.Ns)}var r,i}function gy(e,t){const n=ao(e),r=n.Au.get(t);if(r&&r.hu)return eh().add(r.key);{let e=eh();const r=n.Eu.get(t);if(!r)return e;for(const t of r){const r=n.Tu.get(t);e=e.unionWith(r.view.nu)}return e}}async function yy(e,t){const n=ao(e),r=await im(n.localStore,t.query,!0),i=t.view.cu(r);return n.isPrimaryClient&&hy(n,t.targetId,i.au),i}async function vy(e,t){const n=ao(e);return om(n.localStore,t).then(e=>py(n,e))}async function wy(e,t,n,r){const i=ao(e),s=await function(e,t){const n=ao(e),r=ao(n.mutationQueue);return n.persistence.runTransaction("Lookup mutation documents","readonly",e=>r.Xn(e,t).next(t=>t?n.localDocuments.getDocuments(e,t):la.resolve(null)))}(i.localStore,t);var o,a;null!==s?("pending"===n?await lg(i.remoteStore):"acknowledged"===n||"rejected"===n?(cy(i,t,r||null),ay(i,t),o=i.localStore,a=t,ao(ao(o).mutationQueue).nr(a)):io(6720,"Unknown batchState",{Su:n}),await py(i,s)):eo(Kg,"Cannot apply mutation batch with id: "+t)}async function _y(e,t,n){const r=ao(e),i=[],s=[];for(const o of t){let e;const t=r.Eu.get(o);if(t&&0!==t.length){e=await nm(r.localStore,Rl(t[0]));for(const e of t){const t=r.Tu.get(e),n=await yy(r,t);n.snapshot&&s.push(n.snapshot)}}else{const t=await sm(r.localStore,o);e=await nm(r.localStore,t),await Zg(r,Iy(t),o,!1,e.resumeToken)}i.push(e)}return r.Pu.H_(s),i}function Iy(e){return Al(e.path,e.collectionGroup,e.orderBy,e.filters,e.limit,"F",e.startAt,e.endAt)}function Ty(e){return t=ao(e).localStore,ao(ao(t).persistence).hs();var t}async function by(e,t,n,r){const i=ao(e);if(i.gu)return void eo(Kg,"Ignoring unexpected query state notification.");const s=i.Eu.get(t);if(s&&s.length>0)switch(n){case"current":case"not-current":{const e=await om(i.localStore,ql(s[0])),r=Yh.createSynthesizedRemoteEventForCurrentChange(t,"current"===n,eu.EMPTY_BYTE_STRING);await py(i,e,r);break}case"rejected":await rm(i.localStore,t,!0),uy(i,t,r);break;default:io(64155,n)}}async function Ey(e,t,n){const r=Sy(e);if(r.gu){for(const e of t){if(r.Eu.has(e)&&r.sharedClientState.isActiveQueryTarget(e)){eo(Kg,"Adding an already active target "+e);continue}const t=await sm(r.localStore,e),n=await nm(r.localStore,t);await Zg(r,Iy(t),n.targetId,!1,n.resumeToken),Jm(r.remoteStore,n)}for(const e of n)r.Eu.has(e)&&await rm(r.localStore,e,!1).then(()=>{Ym(r.remoteStore,e),uy(r,e)}).catch(ua)}}function Sy(e){const t=ao(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=ny.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=gy.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=iy.bind(null,t),t.Pu.H_=Pg.bind(null,t.eventManager),t.Pu.yu=xg.bind(null,t.eventManager),t}function Ay(e){const t=ao(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=sy.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=oy.bind(null,t),t}class Cy{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Fm(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Yp(this.persistence,new Wp,e.initialUser,this.serializer)}Cu(e){return new Rp(Pp.Vi,this.serializer)}Du(e){return new Tm}async terminate(){var e,t;null==(e=this.gcScheduler)||e.stop(),null==(t=this.indexBackfillerScheduler)||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Cy.provider={build:()=>new Cy};class ky extends Cy{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){oo(this.persistence.referenceDelegate instanceof xp,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new op(n,e.asyncQueue,t)}Cu(e){const t=void 0!==this.cacheSizeBytes?zf.withCacheSize(this.cacheSizeBytes):zf.DEFAULT;return new Rp(e=>xp.Vi(e,t),this.serializer)}}class Ny extends Cy{constructor(e,t,n){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await Ay(this.xu.syncEngine),await lg(this.xu.remoteStore),await this.persistence.zi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){return Yp(this.persistence,new Wp,e.initialUser,this.serializer)}Fu(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new op(n,e.asyncQueue,t)}Mu(e,t){const n=new Ea(t,this.persistence);return new ba(e.asyncQueue,n)}Cu(e){const t=Gp(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?zf.withCacheSize(this.cacheSizeBytes):zf.DEFAULT;return new jp(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,Lm(),Mm(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new Tm}}class Dy extends Ny{constructor(e,t){super(e,t,!1),this.xu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.xu.syncEngine;this.sharedClientState instanceof Im&&(this.sharedClientState.syncEngine={bo:wy.bind(null,t),Do:by.bind(null,t),Co:Ey.bind(null,t),hs:Ty.bind(null,t),So:vy.bind(null,t)},await this.sharedClientState.start()),await this.persistence.zi(async e=>{await async function(e,t){const n=ao(e);if(Sy(n),Ay(n),!0===t&&!0!==n.gu){const e=n.sharedClientState.getAllActiveQueryTargets(),t=await _y(n,e.toArray());n.gu=!0,await _g(n.remoteStore,!0);for(const r of t)Jm(n.remoteStore,r)}else if(!1===t&&!1!==n.gu){const e=[];let t=Promise.resolve();n.Eu.forEach((r,i)=>{n.sharedClientState.isLocalQueryTarget(i)?e.push(i):t=t.then(()=>(uy(n,i),rm(n.localStore,i,!0))),Ym(n.remoteStore,i)}),await t,await _y(n,e),function(e){const t=ao(e);t.Au.forEach((e,n)=>{Ym(t.remoteStore,n)}),t.Vu.zr(),t.Au=new Map,t.Ru=new Kc(xo.comparator)}(n),n.gu=!1,await _g(n.remoteStore,!1)}}(this.xu.syncEngine,e),this.gcScheduler&&(e&&!this.gcScheduler.started?this.gcScheduler.start():e||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(e&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():e||this.indexBackfillerScheduler.stop())})}Du(e){const t=Lm();if(!Im.v(t))throw new uo(co.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=Gp(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Im(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class Ry{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>ry(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=my.bind(null,this.syncEngine),await _g(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new Ng}createDatastore(e){const t=Fm(e.databaseInfo.databaseId),n=function(e){return new xm(e)}(e.databaseInfo);return function(e,t,n,r){return new $m(e,t,n,r)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return t=this.localStore,n=this.datastore,r=e.asyncQueue,i=e=>ry(this.syncEngine,e,0),s=Sm.v()?new Sm:new bm,new Hm(t,n,r,i,s);var t,n,r,i,s}createSyncEngine(e,t){return function(e,t,n,r,i,s,o){const a=new Qg(e,t,n,r,i,s);return o&&(a.gu=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(e){const t=ao(e);eo(Km,"RemoteStore shutting down."),t.Ia.add(5),await Qm(t),t.Aa.shutdown(),t.Va.set("Unknown")}(this.remoteStore),null==(e=this.datastore)||e.terminate(),null==(t=this.eventManager)||t.terminate()}}function Oy(e,t=10240){let n=0;return{async read(){if(n<e.byteLength){const r={value:e.slice(n,n+t),done:!1};return n+=t,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ry.provider={build:()=>new Ry};class Py{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):to("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xy{constructor(e,t){this.Bu=e,this.serializer=t,this.metadata=new lo,this.buffer=new Uint8Array,this.Lu=new TextDecoder("utf-8"),this.ku().then(e=>{e&&e.Ua()?this.metadata.resolve(e.Ka.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(null==e?void 0:e.Ka)}`))},e=>this.metadata.reject(e))}close(){return this.Bu.cancel()}async getMetadata(){return this.metadata.promise}async bu(){return await this.getMetadata(),this.ku()}async ku(){const e=await this.qu();if(null===e)return null;const t=this.Lu.decode(e),n=Number(t);isNaN(n)&&this.Ku(`length string (${t}) is not valid number`);const r=await this.Uu(n);return new Ug(JSON.parse(r),e.length+n)}$u(){return this.buffer.findIndex(e=>e==="{".charCodeAt(0))}async qu(){for(;this.$u()<0&&!(await this.Wu()););if(0===this.buffer.length)return null;const e=this.$u();e<0&&this.Ku("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Uu(e){for(;this.buffer.length<e;)await this.Wu()&&this.Ku("Reached the end of bundle when more is expected.");const t=this.Lu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Ku(e){throw this.Bu.cancel(),new Error(`Invalid bundle format: ${e}`)}async Wu(){const e=await this.Bu.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ly{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let n=this.bu();if(!n||!n.Ua())throw new Error(`The first element of the bundle is not a metadata object, it is\n         ${JSON.stringify(null==n?void 0:n.Ka)}`);this.metadata=n;do{n=this.bu(),null!==n&&this.elements.push(n)}while(null!==n)}getMetadata(){return this.metadata}Qu(){return this.elements}bu(){if(this.cursor===this.bundleData.length)return null;const e=this.qu(),t=this.Uu(e);return new Ug(JSON.parse(t),e)}Uu(e){if(this.cursor+e>this.bundleData.length)throw new uo(co.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}qu(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if("{"===this.bundleData[t]){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let My=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new uo(co.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(e,t){const n=ao(e),r={documents:t.map(e=>vd(n.serializer,e))},i=await n.jo("BatchGetDocuments",n.serializer.databaseId,Ro.emptyPath(),r,t.length),s=new Map;i.forEach(e=>{const t=function(e,t){return"found"in t?function(e,t){oo(!!t.found,43571),t.found.name,t.found.updateTime;const n=wd(e,t.found.name),r=pd(t.found.updateTime),i=t.found.createTime?pd(t.found.createTime):Wo.min(),s=new $u({mapValue:{fields:t.found.fields}});return Ku.newFoundDocument(n,r,i,s)}(e,t):"missing"in t?function(e,t){oo(!!t.missing,3894),oo(!!t.readTime,22933);const n=wd(e,t.missing),r=pd(t.readTime);return Ku.newNoDocument(n,r)}(e,t):io(7234,{result:t})}(n.serializer,e);s.set(t.key.toString(),t)});const o=[];return t.forEach(e=>{const t=s.get(e.toString());oo(!!t,55234,{key:e}),o.push(t)}),o}(this.datastore,e);return t.forEach(e=>this.recordVersion(e)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(n){this.lastTransactionError=n}this.writtenDocs.add(e.toString())}delete(e){this.write(new Ph(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((e,t)=>{const n=xo.fromPath(t);this.mutations.push(new xh(n,this.precondition(n)))}),await async function(e,t){const n=ao(e),r={writes:t.map(e=>Ad(n.serializer,e))};await n.Wo("Commit",n.serializer.databaseId,Ro.emptyPath(),r)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw io(50498,{Gu:e.constructor.name});t=Wo.min()}const n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new uo(co.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(Wo.min())?_h.exists(!1):_h.updateTime(t):_h.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(Wo.min()))throw new uo(co.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return _h.updateTime(t)}return _h.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fy{constructor(e,t,n,r,i){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=r,this.deferred=i,this.zu=n.maxAttempts,this.M_=new Vm(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_(async()=>{const e=new My(this.datastore),t=this.Hu(e);t&&t.then(t=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(t)}).catch(e=>{this.Zu(e)}))}).catch(e=>{this.Zu(e)})})}Hu(e){try{const t=this.updateFunction(e);return!Ca(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}Zu(e){this.zu>0&&this.Xu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget(()=>(this.Ju(),Promise.resolve()))):this.deferred.reject(e)}Xu(e){if("FirebaseError"===(null==e?void 0:e.name)){const t=e.code;return"aborted"===t||"failed-precondition"===t||"already-exists"===t||!jh(t)}return!1}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vy="FirestoreClient";class Uy{constructor(e,t,n,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=r,this.user=Js.UNAUTHENTICATED,this.clientId=Io.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async e=>{eo(Vy,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(eo(Vy,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new lo;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Eg(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function qy(e,t){e.asyncQueue.verifyOperationInProgress(),eo(Vy,"Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await Xp(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function By(e,t){e.asyncQueue.verifyOperationInProgress();const n=await jy(e);eo(Vy,"Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener(e=>wg(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>wg(t.remoteStore,n)),e._onlineComponents=t}async function jy(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){eo(Vy,"Using user provided OfflineComponentProvider");try{await qy(e,e._uninitializedComponentsProvider._offline)}catch(n){const r=n;if(!("FirebaseError"===(t=r).name?t.code===co.FAILED_PRECONDITION||t.code===co.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&t instanceof DOMException)||22===t.code||20===t.code||11===t.code))throw r;no("Error using user provided cache. Falling back to memory cache: "+r),await qy(e,new Cy)}}else eo(Vy,"Using default OfflineComponentProvider"),await qy(e,new ky(void 0));var t;return e._offlineComponents}async function zy(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(eo(Vy,"Using user provided OnlineComponentProvider"),await By(e,e._uninitializedComponentsProvider._online)):(eo(Vy,"Using default OnlineComponentProvider"),await By(e,new Ry))),e._onlineComponents}function $y(e){return jy(e).then(e=>e.persistence)}function Gy(e){return jy(e).then(e=>e.localStore)}function Ky(e){return zy(e).then(e=>e.remoteStore)}function Hy(e){return zy(e).then(e=>e.syncEngine)}function Wy(e){return zy(e).then(e=>e.datastore)}async function Qy(e){const t=await zy(e),n=t.eventManager;return n.onListen=Jg.bind(null,t.syncEngine),n.onUnlisten=ey.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=Yg.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=ty.bind(null,t.syncEngine),n}function Jy(e,t,n={}){const r=new lo;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,i){const s=new Py({next:a=>{s.Nu(),t.enqueueAndForget(()=>Og(e,o));const c=a.docs.has(n);!c&&a.fromCache?i.reject(new uo(co.UNAVAILABLE,"Failed to get document because the client is offline.")):c&&a.fromCache&&r&&"server"===r.source?i.reject(new uo(co.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(a)},error:e=>i.reject(e)}),o=new Vg(Cl(n.path),s,{includeMetadataChanges:!0,qa:!0});return Rg(e,o)}(await Qy(e),e.asyncQueue,t,n,r)),r.promise}function Yy(e,t,n={}){const r=new lo;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,i){const s=new Py({next:n=>{s.Nu(),t.enqueueAndForget(()=>Og(e,o)),n.fromCache&&"server"===r.source?i.reject(new uo(co.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(n)},error:e=>i.reject(e)}),o=new Vg(n,s,{includeMetadataChanges:!0,qa:!0});return Rg(e,o)}(await Qy(e),e.asyncQueue,t,n,r)),r.promise}function Xy(e,t){const n=new lo;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){const r=Ay(e);try{const e=await function(e,t){const n=ao(e),r=Ho.now(),i=t.reduce((e,t)=>e.add(t.key),eh());let s,o;return n.persistence.runTransaction("Locally write mutations","readwrite",e=>{let a=Gl(),c=eh();return n.xs.getEntries(e,i).next(e=>{a=e,a.forEach((e,t)=>{t.isValidDocument()||(c=c.add(e))})}).next(()=>n.localDocuments.getOverlayedDocuments(e,a)).next(i=>{s=i;const o=[];for(const e of t){const t=Ah(e,s.get(e.key).overlayedDocument);null!=t&&o.push(new Nh(e.key,t,Gu(t.value.mapValue),_h.exists(!0)))}return n.mutationQueue.addMutationBatch(e,r,o,t)}).next(t=>{o=t;const r=t.applyToLocalDocumentSet(s,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,r)})}).then(()=>({batchId:o.batchId,changes:Wl(s)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let r=e.du[e.currentUser.toKey()];r||(r=new Kc(To)),r=r.insert(t,n),e.du[e.currentUser.toKey()]=r}(r,e.batchId,n),await py(r,e.changes),await lg(r.remoteStore)}catch(i){const e=Eg(i,"Failed to persist write");n.reject(e)}}(await Hy(e),t,n)),n.promise}function Zy(e,t,n,r){const i=function(e,t){let n;return n="string"==typeof e?Gh().encode(e):e,r=function(e,t){if(e instanceof Uint8Array)return Oy(e,t);if(e instanceof ArrayBuffer)return Oy(new Uint8Array(e),t);if(e instanceof ReadableStream)return e.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(n),new xy(r,t);var r}(n,Fm(t));e.asyncQueue.enqueueAndForget(async()=>{!function(e,t,n){const r=ao(e);(async function(e,t,n){try{const i=await t.getMetadata();if(await function(e,t){const n=ao(e),r=pd(t.createTime);return n.persistence.runTransaction("hasNewerBundle","readonly",e=>n.Pi.getBundleMetadata(e,t.id)).then(e=>!!e&&e.createTime.compareTo(r)>=0)}(e.localStore,i))return await t.close(),n._completeWith({taskState:"Success",documentsLoaded:(r=i).totalDocuments,bytesLoaded:r.totalBytes,totalDocuments:r.totalDocuments,totalBytes:r.totalBytes}),Promise.resolve(new Set);n._updateProgress(jg(i));const s=new Bg(i,t.serializer);let o=await t.bu();for(;o;){const e=await s.Ga(o);e&&n._updateProgress(e),o=await t.bu()}const a=await s.ja(e.localStore);return await py(e,a.Ha,void 0),await function(e,t){const n=ao(e);return n.persistence.runTransaction("Save bundle","readwrite",e=>n.Pi.saveBundleMetadata(e,t))}(e.localStore,i),n._completeWith(a.progress),Promise.resolve(a.Ja)}catch(r){return no(Kg,`Loading bundle failed with ${r}`),n._failWith(r),Promise.resolve(new Set)}var r})(r,t,n).then(e=>{r.sharedClientState.notifyBundleLoaded(e)})}(await Hy(e),i,r)})}function ev(e,t){return new Ly(e,t)}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function tv(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const nv=new Map;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const rv="firestore.googleapis.com",iv=!0;class sv{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new uo(co.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=rv,this.ssl=iv}else this.host=e.host,this.ssl=e.ssl??iv;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=jf;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<rp)throw new uo(co.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Mo("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=tv(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new uo(co.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new uo(co.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new uo(co.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,n=e.experimentalLongPollingOptions,t.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams;var t,n}}class ov{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new sv({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new uo(co.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new uo(co.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new sv(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new fo;switch(e.type){case"firstParty":return new yo(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new uo(co.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=nv.get(e);t&&(eo("ComponentProvider","Removing Datastore"),nv.delete(e),t.terminate())}(this),Promise.resolve()}}function av(e,t,n,r={}){var i;e=Bo(e,ov);const s=D(t),o=e._getSettings(),a={...o,emulatorOptions:e._getEmulatorOptions()},c=`${t}:${n}`;s&&R(`https://${c}`),o.host!==rv&&o.host!==c&&no("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...o,host:c,ssl:s,emulatorOptions:r};if(!T(u,a)&&(e._setSettings(u),r.mockUserToken)){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=Js.MOCK_USER;else{t=f(r.mockUserToken,null==(i=e._app)?void 0:i.options.projectId);const s=r.mockUserToken.sub||r.mockUserToken.user_id;if(!s)throw new uo(co.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new Js(s)}e._authCredentials=new po(new ho(t,n))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cv{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new cv(this.firestore,e,this._query)}}class uv{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new lv(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new uv(this.firestore,e,this._key)}toJSON(){return{type:uv._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if($o(t,uv._jsonSchema))return new uv(e,n||null,new xo(Ro.fromString(t.referencePath)))}}uv._jsonSchemaVersion="firestore/documentReference/1.0",uv._jsonSchema={type:zo("string",uv._jsonSchemaVersion),referencePath:zo("string")};class lv extends cv{constructor(e,t,n){super(e,t,Cl(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new uv(this.firestore,null,new xo(e))}withConverter(e){return new lv(this.firestore,e,this._path)}}function hv(e,t,...n){if(e=N(e),Lo("collection","path",t),e instanceof ov){const r=Ro.fromString(t,...n);return Vo(r),new lv(e,null,r)}{if(!(e instanceof uv||e instanceof lv))throw new uo(co.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(Ro.fromString(t,...n));return Vo(r),new lv(e.firestore,null,r)}}function dv(e,t,...n){if(e=N(e),1===arguments.length&&(t=Io.newId()),Lo("doc","path",t),e instanceof ov){const r=Ro.fromString(t,...n);return Fo(r),new uv(e,null,new xo(r))}{if(!(e instanceof uv||e instanceof lv))throw new uo(co.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(Ro.fromString(t,...n));return Fo(r),new uv(e.firestore,e instanceof lv?e.converter:null,new xo(r))}}function fv(e,t){return e=N(e),t=N(t),e instanceof cv&&t instanceof cv&&e.firestore===t.firestore&&Ml(e._query,t._query)&&e.converter===t.converter
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const pv="AsyncQueue";class mv{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Vm(this,"async_queue_retry"),this._c=()=>{const e=Mm();e&&eo(pv,"Visibility state changed to "+e.visibilityState),this.M_.w_()},this.ac=e;const t=Mm();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Mm();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new lo;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(0!==this.Yu.length){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!ya(e))throw e;eo(pv,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(e=>{throw this.nc=e,this.rc=!1,to("INTERNAL UNHANDLED ERROR: ",gv(e)),e}).then(e=>(this.rc=!1,e))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const r=bg.createAndSchedule(this,e,t,n,e=>this.hc(e));return this.tc.push(r),r}uc(){this.nc&&io(47125,{Pc:gv(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do{e=this.ac,await e}while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then(()=>{this.tc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function gv(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class yv{constructor(){this._progressObserver={},this._taskCompletionResolver=new lo,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vv extends ov{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new mv,this._persistenceKey=(null==r?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new mv(e),this._firestoreClient=void 0,await e}}}function wv(e,t,n){n||(n=fu);const r=je(e,"firestore");if(r.isInitialized(n)){const e=r.getImmediate({identifier:n});if(T(r.getOptions(n),t))return e;throw new uo(co.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(void 0!==t.cacheSizeBytes&&void 0!==t.localCache)throw new uo(co.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(void 0!==t.cacheSizeBytes&&-1!==t.cacheSizeBytes&&t.cacheSizeBytes<rp)throw new uo(co.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return t.host&&D(t.host)&&R(t.host),r.initialize({options:t,instanceIdentifier:n})}function _v(e){if(e._terminated)throw new uo(co.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||Iv(e),e._firestoreClient}function Iv(e){var t,n,r,i;const s=e._freezeSettings(),o=function(e,t,n,r,i){return new du(e,t,n,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,tv(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator,r)}(e._databaseId,(null==(t=e._app)?void 0:t.options.appId)||"",e._persistenceKey,null==(n=e._app)?void 0:n.options.apiKey,s);e._componentsProvider||(null==(r=s.localCache)?void 0:r._offlineComponentProvider)&&(null==(i=s.localCache)?void 0:i._onlineComponentProvider)&&(e._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),e._firestoreClient=new Uy(e._authCredentials,e._appCheckCredentials,e._queue,o,e._componentsProvider&&function(e){const t=null==e?void 0:e._online.build();return{_offline:null==e?void 0:e._offline.build(t),_online:t}}(e._componentsProvider))}function Tv(e,t,n){if((e=Bo(e,vv))._firestoreClient||e._terminated)throw new uo(co.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(e._componentsProvider||e._getSettings().localCache)throw new uo(co.FAILED_PRECONDITION,"SDK cache is already specified.");e._componentsProvider={_online:t,_offline:n},Iv(e)}function bv(e,t){const n=_v(e=Bo(e,vv)),r=new yv;return Zy(n,e._databaseId,t,r),r}function Ev(e,t){return function(e,t){return e.asyncQueue.enqueue(async()=>function(e,t){const n=ao(e);return n.persistence.runTransaction("Get named query","readonly",e=>n.Pi.getNamedQuery(e,t))}(await Gy(e),t))}(_v(e=Bo(e,vv)),t).then(t=>t?new cv(e,null,t.query):null)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sv{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Sv(eu.fromBase64String(e))}catch(t){throw new uo(co.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Sv(eu.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Sv._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if($o(e,Sv._jsonSchema))return Sv.fromBase64String(e.bytes)}}Sv._jsonSchemaVersion="firestore/bytes/1.0",Sv._jsonSchema={type:zo("string",Sv._jsonSchemaVersion),bytes:zo("string")};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Av{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new uo(co.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Po(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Cv{constructor(e){this._methodName=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kv{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new uo(co.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new uo(co.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return To(this._lat,e._lat)||To(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:kv._jsonSchemaVersion}}static fromJSON(e){if($o(e,kv._jsonSchema))return new kv(e.latitude,e.longitude)}}kv._jsonSchemaVersion="firestore/geoPoint/1.0",kv._jsonSchema={type:zo("string",kv._jsonSchemaVersion),latitude:zo("number"),longitude:zo("number")};
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Nv{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Nv._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if($o(e,Nv._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new Nv(e.vectorValues);throw new uo(co.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Nv._jsonSchemaVersion="firestore/vectorValue/1.0",Nv._jsonSchema={type:zo("string",Nv._jsonSchemaVersion),vectorValues:zo("object")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Dv=/^__.*__$/;class Rv{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new Nh(e,this.data,this.fieldMask,t,this.fieldTransforms):new kh(e,this.data,t,this.fieldTransforms)}}class Ov{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new Nh(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Pv(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw io(40011,{dataSource:e})}}class xv{constructor(e,t,n,r,i,s){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===i&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new xv({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var t;const n=null==(t=this.path)?void 0:t.child(e),r=this.i({path:n,arrayElement:!1});return r.mc(e),r}fc(e){var t;const n=null==(t=this.path)?void 0:t.child(e),r=this.i({path:n,arrayElement:!1});return r.Ac(),r}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return ew(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(0===e.length)throw this.yc("Document fields must not be empty");if(Pv(this.dataSource)&&Dv.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class Lv{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Fm(e)}I(e,t,n,r=!1){return new xv({dataSource:e,methodName:t,targetDoc:n,path:Po.emptyPath(),arrayElement:!1,hasConverter:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Mv(e){const t=e._freezeSettings(),n=Fm(e._databaseId);return new Lv(e._databaseId,!!t.ignoreUndefinedProperties,n)}function Fv(e,t,n,r,i,s={}){const o=e.I(s.merge||s.mergeFields?2:0,t,n,i);Jv("Data must be an object, but it was:",o,r);const a=Wv(r,o);let c,u;if(s.merge)c=new Xc(o.fieldMask),u=o.fieldTransforms;else if(s.mergeFields){const e=[];for(const r of s.mergeFields){const i=Yv(t,r,n);if(!o.contains(i))throw new uo(co.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);tw(e,i)||e.push(i)}c=new Xc(e),u=o.fieldTransforms.filter(e=>c.covers(e.field))}else c=null,u=o.fieldTransforms;return new Rv(new $u(a),c,u)}class Vv extends Cv{_toFieldTransform(e){if(2!==e.dataSource)throw 1===e.dataSource?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Vv}}function Uv(e,t,n){return new xv({dataSource:3,targetDoc:t.settings.targetDoc,methodName:e._methodName,arrayElement:n},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class qv extends Cv{_toFieldTransform(e){return new vh(e.path,new lh)}isEqual(e){return e instanceof qv}}class Bv extends Cv{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){const t=Uv(this,e,!0),n=this.Sc.map(e=>Hv(e,t)),r=new hh(n);return new vh(e.path,r)}isEqual(e){return e instanceof Bv&&T(this.Sc,e.Sc)}}class jv extends Cv{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){const t=Uv(this,e,!0),n=this.Sc.map(e=>Hv(e,t)),r=new fh(n);return new vh(e.path,r)}isEqual(e){return e instanceof jv&&T(this.Sc,e.Sc)}}class zv extends Cv{constructor(e,t){super(e),this.bc=t}_toFieldTransform(e){const t=new mh(e.serializer,sh(e.serializer,this.bc));return new vh(e.path,t)}isEqual(e){return e instanceof zv&&this.bc===e.bc}}function $v(e,t,n,r){const i=e.I(1,t,n);Jv("Data must be an object, but it was:",i,r);const s=[],o=$u.empty();zc(r,(e,r)=>{const a=Zv(t,e,n);r=N(r);const c=i.fc(a);if(r instanceof Vv)s.push(a);else{const e=Hv(r,c);null!=e&&(s.push(a),o.set(a,e))}});const a=new Xc(s);return new Ov(o,a,i.fieldTransforms)}function Gv(e,t,n,r,i,s){const o=e.I(1,t,n),a=[Yv(t,r,n)],c=[i];if(s.length%2!=0)throw new uo(co.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<s.length;d+=2)a.push(Yv(t,s[d])),c.push(s[d+1]);const u=[],l=$u.empty();for(let d=a.length-1;d>=0;--d)if(!tw(u,a[d])){const e=a[d];let t=c[d];t=N(t);const n=o.fc(e);if(t instanceof Vv)u.push(e);else{const r=Hv(t,n);null!=r&&(u.push(e),l.set(e,r))}}const h=new Xc(u);return new Ov(l,h,o.fieldTransforms)}function Kv(e,t,n,r=!1){return Hv(n,e.I(r?4:3,t))}function Hv(e,t){if(Qv(e=N(e)))return Jv("Unsupported field value:",t,e),Wv(e,t);if(e instanceof Cv)return function(e,t){if(!Pv(t.dataSource))throw t.yc(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.yc(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.arrayElement&&4!==t.dataSource)throw t.yc("Nested arrays are not supported");return function(e,t){const n=[];let r=0;for(const i of e){let e=Hv(i,t.gc(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=N(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return sh(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=Ho.fromDate(e);return{timestampValue:hd(t.serializer,n)}}if(e instanceof Ho){const n=new Ho(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:hd(t.serializer,n)}}if(e instanceof kv)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof Sv)return{bytesValue:dd(t.serializer,e._byteString)};if(e instanceof uv){const n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.yc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:md(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof Nv)return function(e,t){const n=e instanceof Nv?e.toArray():e;return{mapValue:{fields:{[mu]:{stringValue:vu},[wu]:{arrayValue:{values:n.map(e=>{if("number"!=typeof e)throw t.yc("VectorValues must only contain numeric values.");return rh(t.serializer,e)})}}}}}}(e,t);if(Bd(e))return e._toProto(t.serializer);throw t.yc(`Unsupported field value: ${qo(e)}`)}(e,t)}function Wv(e,t){const n={};return Gc(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):zc(e,(e,r)=>{const i=Hv(r,t.dc(e));null!=i&&(n[e]=i)}),{mapValue:{fields:n}}}function Qv(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof Ho||e instanceof kv||e instanceof Sv||e instanceof uv||e instanceof Cv||e instanceof Nv||Bd(e))}function Jv(e,t,n){if(!Qv(n)||!Uo(n)){const r=qo(n);throw"an object"===r?t.yc(e+" a custom object"):t.yc(e+" "+r)}}function Yv(e,t,n){if((t=N(t))instanceof Av)return t._internalPath;if("string"==typeof t)return Zv(e,t);throw ew("Field path arguments must be of type string or ",e,!1,void 0,n)}const Xv=new RegExp("[~\\*/\\[\\]]");function Zv(e,t,n){if(t.search(Xv)>=0)throw ew(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new Av(...t.split("."))._internalPath}catch(r){throw ew(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function ew(e,t,n,r,i){const s=r&&!r.isEmpty(),o=void 0!==i;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=")"),new uo(co.INVALID_ARGUMENT,a+e+c)}function tw(e,t){return e.some(e=>e.isEqual(t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nw{convertValue(e,t="none"){switch(Iu(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ru(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(iu(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw io(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return zc(e,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertVectorValue(e){var t,n,r;const i=null==(r=null==(n=null==(t=e.fields)?void 0:t[wu].arrayValue)?void 0:n.values)?void 0:r.map(e=>ru(e.doubleValue));return new Nv(i)}convertGeoPoint(e){return new kv(ru(e.latitude),ru(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=lu(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(hu(e));default:return null}}convertTimestamp(e){const t=nu(e);return new Ho(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=Ro.fromString(e);oo(qd(n),9688,{name:e});const r=new pu(n.get(1),n.get(3)),i=new xo(n.popFirst(5));return r.isEqual(t)||to(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rw extends nw{constructor(e){super(),this.firestore=e}convertBytes(e){return new Sv(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new uv(this.firestore,null,t)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iw(){return new qv("serverTimestamp")}const sw="@firebase/firestore",ow="4.14.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aw(e){return function(e,t){if("object"!=typeof e||null===e)return!1;const n=e;for(const r of t)if(r in n&&"function"==typeof n[r])return!0;return!1}(e,["next","error","complete"])}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cw{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class uw{constructor(e,t,n){this._userDataWriter=t,this._data=n,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new $u({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lw{constructor(e,t,n,r,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new uv(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new hw(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return(null==(e=this._document)?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Yv("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class hw extends lw{data(){return super.data()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dw(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new uo(co.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class fw{}class pw extends fw{}function mw(e,t,...n){let r=[];t instanceof fw&&r.push(t),r=r.concat(n),function(e){const t=e.filter(e=>e instanceof vw).length,n=e.filter(e=>e instanceof gw).length;if(t>1||t>0&&n>0)throw new uo(co.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)e=i._apply(e);return e}class gw extends pw{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new gw(e,t,n)}_apply(e){const t=this._parse(e);return kw(e._query,t),new cv(e.firestore,e.converter,xl(e._query,t))}_parse(e){const t=Mv(e.firestore);return function(e,t,n,r,i,s,o){let a;if(i.isKeyField()){if("array-contains"===s||"array-contains-any"===s)throw new uo(co.INVALID_ARGUMENT,`Invalid Query. You can't perform '${s}' queries on documentId().`);if("in"===s||"not-in"===s){Cw(o,s);const t=[];for(const n of o)t.push(Aw(r,e,n));a={arrayValue:{values:t}}}else a=Aw(r,e,o)}else"in"!==s&&"not-in"!==s&&"array-contains-any"!==s||Cw(o,s),a=Kv(n,t,o,"in"===s||"not-in"===s);return Zu.create(i,s,a)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function yw(e,t,n){const r=t,i=Yv("where",e);return gw._create(i,r,n)}class vw extends fw{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new vw(e,t)}_parse(e){const t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:el.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e;const r=t.getFlattenedFilters();for(const i of r)kw(n,i),n=xl(n,i)}(e._query,t),new cv(e.firestore,e.converter,xl(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}class ww extends pw{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new ww(e,t)}_apply(e){const t=function(e,t,n){if(null!==e.startAt)throw new uo(co.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new uo(co.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ju(t,n)}(e._query,this._field,this._direction);return new cv(e.firestore,e.converter,function(e,t){const n=e.explicitOrderBy.concat([t]);return new Sl(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}}function _w(e,t="asc"){const n=t,r=Yv("orderBy",e);return ww._create(r,n)}class Iw extends pw{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new Iw(e,t,n)}_apply(e){return new cv(e.firestore,e.converter,Ll(e._query,this._limit,this._limitType))}}function Tw(e){return jo("limit",e),Iw._create("limit",e,"F")}class bw extends pw{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new bw(e,t,n)}_apply(e){const t=Sw(e,this.type,this._docOrFields,this._inclusive);return new cv(e.firestore,e.converter,function(e,t){return new Sl(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,t,e.endAt)}(e._query,t))}}class Ew extends pw{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new Ew(e,t,n)}_apply(e){const t=Sw(e,this.type,this._docOrFields,this._inclusive);return new cv(e.firestore,e.converter,function(e,t){return new Sl(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,t)}(e._query,t))}}function Sw(e,t,n,r){if(n[0]=N(n[0]),n[0]instanceof lw)return function(e,t,n,r,i){if(!r)throw new uo(co.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${n}().`);const s=[];for(const o of Dl(e))if(o.field.isKeyField())s.push(Du(t,r.key));else{const e=r.data.field(o.field);if(uu(e))throw new uo(co.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+o.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(null===e){const e=o.field.canonicalString();throw new uo(co.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${e}' (used as the orderBy) does not exist.`)}s.push(e)}return new Hu(s,i)}(e._query,e.firestore._databaseId,t,n[0]._document,r);{const i=Mv(e.firestore);return function(e,t,n,r,i,s){const o=e.explicitOrderBy;if(i.length>o.length)throw new uo(co.INVALID_ARGUMENT,`Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const a=[];for(let c=0;c<i.length;c++){const s=i[c];if(o[c].field.isKeyField()){if("string"!=typeof s)throw new uo(co.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof s}`);if(!Nl(e)&&-1!==s.indexOf("/"))throw new uo(co.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${r}() must be a plain document ID, but '${s}' contains a slash.`);const n=e.path.child(Ro.fromString(s));if(!xo.isDocumentKey(n))throw new uo(co.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);const i=new xo(n);a.push(Du(t,i))}else{const e=Kv(n,r,s);a.push(e)}}return new Hu(a,s)}(e._query,e.firestore._databaseId,i,t,n,r)}}function Aw(e,t,n){if("string"==typeof(n=N(n))){if(""===n)throw new uo(co.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Nl(t)&&-1!==n.indexOf("/"))throw new uo(co.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=t.path.child(Ro.fromString(n));if(!xo.isDocumentKey(r))throw new uo(co.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Du(e,new xo(r))}if(n instanceof uv)return Du(e,n._key);throw new uo(co.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${qo(n)}.`)}function Cw(e,t){if(!Array.isArray(e)||0===e.length)throw new uo(co.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function kw(e,t){const n=function(e,t){for(const n of e)for(const e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new uo(co.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new uo(co.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}function Nw(e,t){if(!(t instanceof gw||t instanceof vw))throw new uo(co.INVALID_ARGUMENT,`Function ${e}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}function Dw(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}class Rw extends nw{constructor(e){super(),this.firestore=e}convertBytes(e){return new Sv(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new uv(this.firestore,null,t)}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ow(){return new cw("count")}function Pw(e,t){const n=Bo(e.firestore,vv),r=_v(n),i=$c(t,(e,t)=>new Vh(t,e.aggregateType,e._internalFieldPath));return function(e,t,n){const r=new lo;return e.asyncQueue.enqueueAndForget(async()=>{try{const i=await Wy(e);r.resolve(async function(e,t,n){var r;const i=ao(e),{request:s,gt:o,parent:a}=Dd(i.serializer,Ol(t),n);i.connection.qo||delete s.parent;const c=(await i.jo("RunAggregationQuery",i.serializer.databaseId,a,s,1)).filter(e=>!!e.result);oo(1===c.length,64727);const u=null==(r=c[0].result)?void 0:r.aggregateFields;return Object.keys(u).reduce((e,t)=>(e[o[t]]=u[t],e),{})}(i,t,n))}catch(i){r.reject(i)}}),r.promise}(r,e._query,i).then(t=>function(e,t,n){const r=new rw(e);return new uw(t,r,n)}(n,e,t))}class xw{constructor(e){this.kind="memory",this._onlineComponentProvider=Ry.provider,this._offlineComponentProvider=(null==e?void 0:e.garbageCollector)?e.garbageCollector._offlineComponentProvider:{build:()=>new ky(void 0)}}toJSON(){return{kind:this.kind}}}class Lw{constructor(e){let t;this.kind="persistent",(null==e?void 0:e.tabManager)?(e.tabManager._initialize(e),t=e.tabManager):(t=qw(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class Mw{constructor(){this.kind="memoryEager",this._offlineComponentProvider=Cy.provider}toJSON(){return{kind:this.kind}}}class Fw{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new ky(e)}}toJSON(){return{kind:this.kind}}}class Vw{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ry.provider,this._offlineComponentProvider={build:t=>new Ny(t,null==e?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class Uw{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ry.provider,this._offlineComponentProvider={build:t=>new Dy(t,null==e?void 0:e.cacheSizeBytes)}}}function qw(e){return new Vw(null==e?void 0:e.forceOwnership)}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Bw="NOT SUPPORTED";class jw{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class zw extends lw{constructor(e,t,n,r,i,s){super(e,t,n,r,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new $w(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Yv("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new uo(co.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=zw._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),e&&e.isValidDocument()&&e.isFoundDocument()?(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t):t}}zw._jsonSchemaVersion="firestore/documentSnapshot/1.0",zw._jsonSchema={type:zo("string",zw._jsonSchemaVersion),bundleSource:zo("string","DocumentSnapshot"),bundleName:zo("string"),bundle:zo("string")};class $w extends zw{data(e={}){return super.data(e)}}class Gw{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new jw(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new $w(this._firestore,this._userDataWriter,n.key,n,new jw(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new uo(co.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{const r=new $w(e._firestore,e._userDataWriter,n.doc.key,n.doc,new jw(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{const r=new $w(e._firestore,e._userDataWriter,t.doc.key,t.doc,new jw(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let i=-1,s=-1;return 0!==t.type&&(i=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),s=n.indexOf(t.doc.key)),{type:Kw(t.type),doc:r,oldIndex:i,newIndex:s}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new uo(co.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Gw._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Io.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],r=[];return this.docs.forEach(e=>{null!==e._document&&(t.push(e._document),n.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields,"previous")),r.push(e.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Kw(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return io(61501,{type:e})}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Gw._jsonSchemaVersion="firestore/querySnapshot/1.0",Gw._jsonSchema={type:zo("string",Gw._jsonSchemaVersion),bundleSource:zo("string","QuerySnapshot"),bundleName:zo("string"),bundle:zo("string")};const Hw={maxAttempts:5};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ww{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Mv(e)}set(e,t,n){this._verifyNotCommitted();const r=Qw(e,this._firestore),i=Dw(r.converter,t,n),s=Fv(this._dataReader,"WriteBatch.set",r._key,i,null!==r.converter,n);return this._mutations.push(s.toMutation(r._key,_h.none())),this}update(e,t,n,...r){this._verifyNotCommitted();const i=Qw(e,this._firestore);let s;return s="string"==typeof(t=N(t))||t instanceof Av?Gv(this._dataReader,"WriteBatch.update",i._key,t,n,r):$v(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(s.toMutation(i._key,_h.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Qw(e,this._firestore);return this._mutations=this._mutations.concat(new Ph(t._key,_h.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new uo(co.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Qw(e,t){if((e=N(e)).firestore!==t)throw new uo(co.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jw{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=Mv(e)}get(e){const t=Qw(e,this._firestore),n=new Rw(this._firestore);return this._transaction.lookup([t._key]).then(e=>{if(!e||1!==e.length)return io(24041);const r=e[0];if(r.isFoundDocument())return new lw(this._firestore,n,r.key,r,t.converter);if(r.isNoDocument())return new lw(this._firestore,n,t._key,null,t.converter);throw io(18433,{doc:r})})}set(e,t,n){const r=Qw(e,this._firestore),i=Dw(r.converter,t,n),s=Fv(this._dataReader,"Transaction.set",r._key,i,null!==r.converter,n);return this._transaction.set(r._key,s),this}update(e,t,n,...r){const i=Qw(e,this._firestore);let s;return s="string"==typeof(t=N(t))||t instanceof Av?Gv(this._dataReader,"Transaction.update",i._key,t,n,r):$v(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,s),this}delete(e){const t=Qw(e,this._firestore);return this._transaction.delete(t._key),this}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yw extends Jw{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Qw(e,this._firestore),n=new rw(this._firestore);return super.get(e).then(e=>new zw(this._firestore,n,t._key,e._document,new jw(!1,!1),t.converter))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Xw(e){e=Bo(e,uv);const t=Bo(e.firestore,vv);return Jy(_v(t),e._key).then(n=>a_(t,e,n))}function Zw(e){e=Bo(e,uv);const t=Bo(e.firestore,vv);return Jy(_v(t),e._key,{source:"server"}).then(n=>a_(t,e,n))}function e_(e){e=Bo(e,cv);const t=Bo(e.firestore,vv),n=_v(t),r=new rw(t);return dw(e._query),Yy(n,e._query).then(n=>new Gw(t,r,e,n))}function t_(e,t,n){e=Bo(e,uv);const r=Bo(e.firestore,vv),i=Dw(e.converter,t,n);return o_(r,[Fv(Mv(r),"setDoc",e._key,i,null!==e.converter,n).toMutation(e._key,_h.none())])}function n_(e,t,n,...r){e=Bo(e,uv);const i=Bo(e.firestore,vv),s=Mv(i);let o;return o="string"==typeof(t=N(t))||t instanceof Av?Gv(s,"updateDoc",e._key,t,n,r):$v(s,"updateDoc",e._key,t),o_(i,[o.toMutation(e._key,_h.exists(!0))])}function r_(e){return o_(Bo(e.firestore,vv),[new Ph(e._key,_h.none())])}function i_(e,t){const n=Bo(e.firestore,vv),r=dv(e),i=Dw(e.converter,t);return o_(n,[Fv(Mv(e.firestore),"addDoc",r._key,i,null!==e.converter,{}).toMutation(r._key,_h.exists(!1))]).then(()=>r)}function s_(e,...t){var n,r,i;e=N(e);let s={includeMetadataChanges:!1,source:"default"},o=0;"object"!=typeof t[o]||aw(t[o])||(s=t[o++]);const a={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(aw(t[o])){const e=t[o];t[o]=null==(n=e.next)?void 0:n.bind(e),t[o+1]=null==(r=e.error)?void 0:r.bind(e),t[o+2]=null==(i=e.complete)?void 0:i.bind(e)}let c,u,l;if(e instanceof uv)u=Bo(e.firestore,vv),l=Cl(e._key.path),c={next:n=>{t[o]&&t[o](a_(u,e,n))},error:t[o+1],complete:t[o+2]};else{const n=Bo(e,cv);u=Bo(n.firestore,vv),l=n._query;const r=new rw(u);c={next:e=>{t[o]&&t[o](new Gw(u,r,n,e))},error:t[o+1],complete:t[o+2]},dw(e._query)}return function(e,t,n,r){const i=new Py(r),s=new Vg(t,i,n);return e.asyncQueue.enqueueAndForget(async()=>Rg(await Qy(e),s)),()=>{i.Nu(),e.asyncQueue.enqueueAndForget(async()=>Og(await Qy(e),s))}}(_v(u),l,a,c)}function o_(e,t){return Xy(_v(e),t)}function a_(e,t,n){const r=n.docs.get(t._key),i=new rw(e);return new zw(e,i,t._key,r,new jw(n.hasPendingWrites,n.fromCache),t.converter)}function c_(e,t){if("string"!=typeof e[t])throw new uo(co.INVALID_ARGUMENT,"Missing string value for: "+t);return e[t]}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u_{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function l_(e,t){(function(e,t){return e.asyncQueue.enqueue(async()=>{return n=await Gy(e),r=t,void(ao(n).Cs.As=r);var n,r})})(_v(e._firestore),t).then(e=>eo(`setting persistent cache index auto creation isEnabled=${t} succeeded`)).catch(e=>no(`setting persistent cache index auto creation isEnabled=${t} failed`,e))}const h_=new WeakMap;
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d_{constructor(){this.t=new Map}static get instance(){return f_||(f_=new d_,function(e){if($h)throw new Error("a TestingHooksSpi instance is already set");$h=e}(f_)),f_}o(e){this.t.forEach(t=>t(e))}onExistenceFilterMismatch(e){const t=Symbol(),n=this.t;return n.set(t,e),()=>n.delete(t)}}let f_=null;!function(e,t=!0){Ys=Ke,Be(new O("firestore",(e,{instanceIdentifier:n,options:r})=>{const i=e.getProvider("app").getImmediate(),s=new vv(new mo(e.getProvider("auth-internal")),new wo(i,e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new uo(co.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new pu(e.options.projectId,t)}(i,n),i);return r={useFetchStreams:t,...r},s._setSettings(r),s},"PUBLIC").setMultipleInstances(!0)),Qe(sw,ow,e),Qe(sw,ow,"esm2020")}();const p_=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:nw,AggregateField:cw,AggregateQuerySnapshot:uw,Bytes:Sv,CACHE_SIZE_UNLIMITED:-1,CollectionReference:lv,DocumentReference:uv,DocumentSnapshot:zw,FieldPath:Av,FieldValue:Cv,Firestore:vv,FirestoreError:uo,GeoPoint:kv,LoadBundleTask:yv,PersistentCacheIndexManager:u_,Query:cv,QueryCompositeFilterConstraint:vw,QueryConstraint:pw,QueryDocumentSnapshot:$w,QueryEndAtConstraint:Ew,QueryFieldFilterConstraint:gw,QueryLimitConstraint:Iw,QueryOrderByConstraint:ww,QuerySnapshot:Gw,QueryStartAtConstraint:bw,SnapshotMetadata:jw,Timestamp:Ho,Transaction:Yw,VectorValue:Nv,WriteBatch:Ww,_AutoId:Io,_ByteString:eu,_DatabaseId:pu,_DocumentKey:xo,_EmptyAppCheckTokenProvider:class{getToken(){return Promise.resolve(new vo(""))}invalidateToken(){}start(e,t){}shutdown(){}},_EmptyAuthCredentialsProvider:fo,_FieldPath:Po,_TestingHooks:class{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return d_.instance.onExistenceFilterMismatch(e)}},_cast:Bo,_debugAssert:function(e,t){e||io(57014,t)},_internalAggregationQueryToProtoRunAggregationQueryRequest:function(e,t){var n;const r=$c(t,(e,t)=>new Vh(t,e.aggregateType,e._internalFieldPath)),i=null==(n=_v(Bo(e.firestore,vv))._onlineComponents)?void 0:n.datastore.serializer;return void 0===i?null:Dd(i,Ol(e._query),r,!0).request},_internalQueryToProtoQueryTarget:
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e){var t;const n=null==(t=_v(Bo(e.firestore,vv))._onlineComponents)?void 0:t.datastore.serializer;return void 0===n?null:Nd(n,Rl(e._query)).ft},_isBase64Available:function(){return"undefined"!=typeof atob},_logWarn:no,_validateIsNotUsedTogether:Mo,addDoc:i_,aggregateFieldEqual:function(e,t){var n,r;return e instanceof cw&&t instanceof cw&&e.aggregateType===t.aggregateType&&(null==(n=e._internalFieldPath)?void 0:n.canonicalString())===(null==(r=t._internalFieldPath)?void 0:r.canonicalString())},aggregateQuerySnapshotEqual:function(e,t){return fv(e.query,t.query)&&T(e.data(),t.data())}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,and:function(...e){return e.forEach(e=>Nw("and",e)),vw._create("and",e)},arrayRemove:function(...e){return new jv("arrayRemove",e)},arrayUnion:function(...e){return new Bv("arrayUnion",e)},average:function(e){return new cw("avg",Yv("average",e))},clearIndexedDbPersistence:function(e){if(e._initialized&&!e._terminated)throw new uo(co.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const t=new lo;return e._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(e){if(!fa.v())return Promise.resolve();const t=e+Bp;await fa.delete(t)}(Gp(e._databaseId,e._persistenceKey)),t.resolve()}catch(n){t.reject(n)}}),t.promise},collection:hv,collectionGroup:function(e,t){if(e=Bo(e,ov),Lo("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new uo(co.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new cv(e,null,(n=t,new Sl(Ro.emptyPath(),n)));var n},connectFirestoreEmulator:av,count:Ow,deleteAllPersistentCacheIndexes:function(e){(function(e){return e.asyncQueue.enqueue(async()=>function(e){const t=ao(e),n=t.indexManager;return t.persistence.runTransaction("Delete All Indexes","readwrite",e=>n.deleteAllFieldIndexes(e))}(await Gy(e)))})(_v(e._firestore)).then(e=>eo("deleting all persistent cache indexes succeeded")).catch(e=>no("deleting all persistent cache indexes failed",e))},deleteDoc:r_,deleteField:function(){return new Vv("deleteField")},disableNetwork:function(e){return function(e){return e.asyncQueue.enqueue(async()=>{const t=await $y(e),n=await Ky(e);return t.setNetworkEnabled(!1),async function(e){const t=ao(e);t.Ia.add(0),await Qm(t),t.Va.set("Offline")}(n)})}(_v(e=Bo(e,vv)))},disablePersistentCacheIndexAutoCreation:function(e){l_(e,!1)},doc:dv,documentId:function(){return new Av(No)},documentSnapshotFromJSON:function(e,t,n){if($o(t,zw._jsonSchema)){if(t.bundle===Bw)throw new uo(co.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=Fm(e._databaseId),i=ev(t.bundle,r),s=i.Qu(),o=new Bg(i.getMetadata(),r);for(const e of s)o.Ga(e);const a=o.documents;if(1!==a.length)throw new uo(co.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${a.length} documents.`);const c=Sd(r,a[0].document),u=new xo(Ro.fromString(t.bundleName));return new zw(e,new Rw(e),u,c,new jw(!1,!1),n||null)}},enableIndexedDbPersistence:function(e,t){no("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const n=e._freezeSettings();return Tv(e,Ry.provider,{build:e=>new Ny(e,n.cacheSizeBytes,null==t?void 0:t.forceOwnership)}),Promise.resolve()},enableMultiTabIndexedDbPersistence:async function(e){no("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=e._freezeSettings();Tv(e,Ry.provider,{build:e=>new Dy(e,t.cacheSizeBytes)})},enableNetwork:function(e){return function(e){return e.asyncQueue.enqueue(async()=>{const t=await $y(e),n=await Ky(e);return t.setNetworkEnabled(!0),function(e){const t=ao(e);return t.Ia.delete(0),Wm(t)}(n)})}(_v(e=Bo(e,vv)))},enablePersistentCacheIndexAutoCreation:function(e){l_(e,!0)},endAt:function(...e){return Ew._create("endAt",e,!0)},endBefore:function(...e){return Ew._create("endBefore",e,!1)},ensureFirestoreConfigured:_v,executeWrite:o_,getAggregateFromServer:Pw,getCountFromServer:function(e){return Pw(e,{count:Ow()})},getDoc:Xw,getDocFromCache:function(e){e=Bo(e,uv);const t=Bo(e.firestore,vv),n=_v(t),r=new rw(t);return function(e,t){const n=new lo;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){try{const r=await function(e,t){const n=ao(e);return n.persistence.runTransaction("read document","readonly",e=>n.localDocuments.getDocument(e,t))}(e,t);r.isFoundDocument()?n.resolve(r):r.isNoDocument()?n.resolve(null):n.reject(new uo(co.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(r){const e=Eg(r,`Failed to get document '${t} from cache`);n.reject(e)}}(await Gy(e),t,n)),n.promise}(n,e._key).then(n=>new zw(t,r,e._key,n,new jw(null!==n&&n.hasLocalMutations,!0),e.converter))},getDocFromServer:Zw,getDocs:e_,getDocsFromCache:function(e){e=Bo(e,cv);const t=Bo(e.firestore,vv),n=_v(t),r=new rw(t);return function(e,t){const n=new lo;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){try{const r=await im(e,t,!0),i=new Gg(t,r.ks),s=i.ru(r.documents),o=i.applyChanges(s,!1);n.resolve(o.snapshot)}catch(r){const e=Eg(r,`Failed to execute query '${t} against cache`);n.reject(e)}}(await Gy(e),t,n)),n.promise}(n,e._query).then(n=>new Gw(t,r,e,n))},getDocsFromServer:function(e){e=Bo(e,cv);const t=Bo(e.firestore,vv),n=_v(t),r=new rw(t);return Yy(n,e._query,{source:"server"}).then(n=>new Gw(t,r,e,n))},getFirestore:function(e,t){const n="object"==typeof e?e:We(),r="string"==typeof e?e:t||fu,i=je(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const e=u("firestore");e&&av(i,...e)}return i},getPersistentCacheIndexManager:function(e){var t;e=Bo(e,vv);const n=h_.get(e);if(n)return n;if("persistent"!==(null==(t=_v(e)._uninitializedComponentsProvider)?void 0:t._offline.kind))return null;const r=new u_(e);return h_.set(e,r),r},increment:function(e){return new zv("increment",e)},initializeFirestore:wv,limit:Tw,limitToLast:function(e){return jo("limitToLast",e),Iw._create("limitToLast",e,"L")},loadBundle:bv,memoryEagerGarbageCollector:function(){return new Mw},memoryLocalCache:function(e){return new xw(e)},memoryLruGarbageCollector:function(e){return new Fw(null==e?void 0:e.cacheSizeBytes)},namedQuery:Ev,onSnapshot:s_,onSnapshotResume:function(e,t,...n){const r=N(e),i=function(e){const t={bundle:"",bundleName:"",bundleSource:""},n=["bundle","bundleName","bundleSource"];for(const r of n){if(!(r in e)){t.error=`snapshotJson missing required field: ${r}`;break}const n=e[r];if("string"!=typeof n){t.error=`snapshotJson field '${r}' must be a string.`;break}if(0===n.length){t.error=`snapshotJson field '${r}' cannot be an empty string.`;break}"bundle"===r?t.bundle=n:"bundleName"===r?t.bundleName=n:"bundleSource"===r&&(t.bundleSource=n)}return t}(t);if(i.error)throw new uo(co.INVALID_ARGUMENT,i.error);let s,o=0;if("object"!=typeof n[o]||aw(n[o])||(s=n[o++]),"QuerySnapshot"===i.bundleSource){let e=null;if("object"==typeof n[o]&&aw(n[o])){const t=n[o++];e={next:t.next,error:t.error,complete:t.complete}}else e={next:n[o++],error:n[o++],complete:n[o++]};return function(e,t,n,r,i){let s,o=!1;return bv(e,t.bundle).then(()=>Ev(e,t.bundleName)).then(e=>{e&&!o&&(i&&e.withConverter(i),s=s_(e,n||{},r))}).catch(e=>(r.error&&r.error(e),()=>{})),()=>{o||(o=!0,s&&s())}}(r,i,s,e,n[o])}if("DocumentSnapshot"===i.bundleSource){let e=null;if("object"==typeof n[o]&&aw(n[o])){const t=n[o++];e={next:t.next,error:t.error,complete:t.complete}}else e={next:n[o++],error:n[o++],complete:n[o++]};return function(e,t,n,r,i){let s,o=!1;return bv(e,t.bundle).then(()=>{if(!o){const o=new uv(e,i||null,xo.fromPath(t.bundleName));s=s_(o,n||{},r)}}).catch(e=>(r.error&&r.error(e),()=>{})),()=>{o||(o=!0,s&&s())}}(r,i,s,e,n[o])}throw new uo(co.INVALID_ARGUMENT,`unsupported bundle source: ${i.bundleSource}`)},onSnapshotsInSync:function(e,t){return function(e,t){const n=new Py(t);return e.asyncQueue.enqueueAndForget(async()=>{return t=await Qy(e),r=n,ao(t).Ca.add(r),void r.next();var t,r}),()=>{n.Nu(),e.asyncQueue.enqueueAndForget(async()=>{return t=await Qy(e),r=n,void ao(t).Ca.delete(r);var t,r})}}(_v(e=Bo(e,vv)),aw(t)?t:{next:t})},or:function(...e){return e.forEach(e=>Nw("or",e)),vw._create("or",e)},orderBy:_w,persistentLocalCache:function(e){return new Lw(e)},persistentMultipleTabManager:function(){return new Uw},persistentSingleTabManager:qw,query:mw,queryEqual:fv,querySnapshotFromJSON:function(e,t,n){if($o(t,Gw._jsonSchema)){if(t.bundle===Bw)throw new uo(co.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=Fm(e._databaseId),i=ev(t.bundle,r),s=i.Qu(),o=new Bg(i.getMetadata(),r);for(const e of s)o.Ga(e);if(1!==o.queries.length)throw new uo(co.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${o.queries.length} queries.`);const a=Yd(o.queries[0].bundledQuery),c=o.documents;let u=new Sg;c.map(e=>{const t=Sd(r,e.document);u=u.add(t)});const l=Cg.fromInitialDocuments(a,u,eh(),!1,!1),h=new cv(e,n||null,a);return new Gw(e,new Rw(e),h,l)}},refEqual:function(e,t){return e=N(e),t=N(t),(e instanceof uv||e instanceof lv)&&(t instanceof uv||t instanceof lv)&&e.firestore===t.firestore&&e.path===t.path&&e.converter===t.converter},runTransaction:function(e,t,n){e=Bo(e,vv);const r={...Hw,...n};return function(e){if(e.maxAttempts<1)throw new uo(co.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(e,t,n){const r=new lo;return e.asyncQueue.enqueueAndForget(async()=>{const i=await Wy(e);new Fy(e.asyncQueue,i,n,t,r).ju()}),r.promise}(_v(e),n=>t(new Yw(e,n)),r)},serverTimestamp:iw,setDoc:t_,setIndexConfiguration:
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e,t){const n=_v(e=Bo(e,vv));return n._uninitializedComponentsProvider&&"memory"!==n._uninitializedComponentsProvider._offline.kind?function(e,t){return e.asyncQueue.enqueue(async()=>async function(e,t){const n=ao(e),r=n.indexManager,i=[];return n.persistence.runTransaction("Configure indexes","readwrite",e=>r.getFieldIndexes(e).next(n=>
/**
      * @license
      * Copyright 2017 Google LLC
      *
      * Licensed under the Apache License, Version 2.0 (the "License");
      * you may not use this file except in compliance with the License.
      * You may obtain a copy of the License at
      *
      *   http://www.apache.org/licenses/LICENSE-2.0
      *
      * Unless required by applicable law or agreed to in writing, software
      * distributed under the License is distributed on an "AS IS" BASIS,
      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      * See the License for the specific language governing permissions and
      * limitations under the License.
      */function(e,t,n,r,i){e=[...e],t=[...t],e.sort(n),t.sort(n);const s=e.length,o=t.length;let a=0,c=0;for(;a<o&&c<s;){const s=n(e[c],t[a]);s<0?i(e[c++]):s>0?r(t[a++]):(a++,c++)}for(;a<o;)r(t[a++]);for(;c<s;)i(e[c++])}(n,t,Zo,t=>{i.push(r.addFieldIndex(e,t))},t=>{i.push(r.deleteFieldIndex(e,t))})).next(()=>la.waitFor(i)))}(await Gy(e),t))}(n,function(e){const t="string"==typeof e?function(e){try{return JSON.parse(e)}catch(t){throw new uo(co.INVALID_ARGUMENT,"Failed to parse JSON: "+(null==t?void 0:t.message))}}(e):e,n=[];if(Array.isArray(t.indexes))for(const r of t.indexes){const e=c_(r,"collectionGroup"),t=[];if(Array.isArray(r.fields))for(const n of r.fields){const e=Zv("setIndexConfiguration",c_(n,"fieldPath"));"CONTAINS"===n.arrayConfig?t.push(new ea(e,2)):"ASCENDING"===n.order?t.push(new ea(e,0)):"DESCENDING"===n.order&&t.push(new ea(e,1))}n.push(new Jo(Jo.UNKNOWN_ID,e,t,na.empty()))}return n}(t)):(no("Cannot enable indexes when persistence is disabled"),Promise.resolve())},setLogLevel:function(e){Xs.setLogLevel(e)},snapshotEqual:function(e,t){return e instanceof zw&&t instanceof zw?e._firestore===t._firestore&&e._key.isEqual(t._key)&&(null===e._document?null===t._document:e._document.isEqual(t._document))&&e._converter===t._converter:e instanceof Gw&&t instanceof Gw&&e._firestore===t._firestore&&fv(e.query,t.query)&&e.metadata.isEqual(t.metadata)&&e._snapshot.isEqual(t._snapshot)},startAfter:function(...e){return bw._create("startAfter",e,!1)},startAt:function(...e){return bw._create("startAt",e,!0)},sum:function(e){return new cw("sum",Yv("sum",e))},terminate:function(e){return function(e,t,n=Le){je(e,t).clearInstance(n)}(e.app,"firestore",e._databaseId.database),e._delete()},updateDoc:n_,vector:function(e){return new Nv(e)},waitForPendingWrites:function(e){return function(e){const t=new lo;return e.asyncQueue.enqueueAndForget(async()=>async function(t,n){const r=ao(t);ng(r.remoteStore)||eo(Kg,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const e=await function(e){const t=ao(e);return t.persistence.runTransaction("Get highest unacknowledged batch id","readonly",e=>t.mutationQueue.getHighestUnacknowledgedBatchId(e))}(r.localStore);if(e===Aa)return void n.resolve();const t=r.mu.get(e)||[];t.push(n),r.mu.set(e,t)}catch(e){const r=Eg(e,"Initialization of waitForPendingWrites() operation failed");n.reject(r)}}(await Hy(e),t)),t.promise}(_v(e=Bo(e,vv)))},where:yw,writeBatch:function(e){return _v(e=Bo(e,vv)),new Ww(e,t=>o_(e,t))}},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Qe("firebase","12.12.1","app");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const m_="firebasestorage.googleapis.com",g_="storageBucket";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class y_ extends w{constructor(e,t,n=0){super(T_(e),`Firebase Storage: ${t} (${T_(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,y_.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return T_(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}var v_,w_,__,I_;function T_(e){return"storage/"+e}function b_(){return new y_(v_.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function E_(e){return new y_(v_.INVALID_ARGUMENT,e)}function S_(){return new y_(v_.APP_DELETED,"The Firebase app was deleted.")}function A_(e,t){return new y_(v_.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function C_(e){throw new y_(v_.INTERNAL_ERROR,"Internal error: "+e)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(w_=v_||(v_={})).UNKNOWN="unknown",w_.OBJECT_NOT_FOUND="object-not-found",w_.BUCKET_NOT_FOUND="bucket-not-found",w_.PROJECT_NOT_FOUND="project-not-found",w_.QUOTA_EXCEEDED="quota-exceeded",w_.UNAUTHENTICATED="unauthenticated",w_.UNAUTHORIZED="unauthorized",w_.UNAUTHORIZED_APP="unauthorized-app",w_.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",w_.INVALID_CHECKSUM="invalid-checksum",w_.CANCELED="canceled",w_.INVALID_EVENT_NAME="invalid-event-name",w_.INVALID_URL="invalid-url",w_.INVALID_DEFAULT_BUCKET="invalid-default-bucket",w_.NO_DEFAULT_BUCKET="no-default-bucket",w_.CANNOT_SLICE_BLOB="cannot-slice-blob",w_.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",w_.NO_DOWNLOAD_URL="no-download-url",w_.INVALID_ARGUMENT="invalid-argument",w_.INVALID_ARGUMENT_COUNT="invalid-argument-count",w_.APP_DELETED="app-deleted",w_.INVALID_ROOT_OPERATION="invalid-root-operation",w_.INVALID_FORMAT="invalid-format",w_.INTERNAL_ERROR="internal-error",w_.UNSUPPORTED_ENVIRONMENT="unsupported-environment";class k_{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=k_.makeFromUrl(e,t)}catch(i){return new k_(e,"")}if(""===n.path)return n;throw r=e,new y_(v_.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+r+"'.");var r}static makeFromUrl(e,t){let n=null;const r="([A-Za-z0-9.\\-_]+)";const i=new RegExp("^gs://"+r+"(/(.*))?$","i");function s(e){e.path_=decodeURIComponent(e.path)}const o=t.replace(/[.]/g,"\\."),a=[{regex:i,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${o}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:s},{regex:new RegExp(`^https?://${t===m_?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${r}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:s}];for(let c=0;c<a.length;c++){const t=a[c],r=t.regex.exec(e);if(r){const e=r[t.indices.bucket];let i=r[t.indices.path];i||(i=""),n=new k_(e,i),t.postModify(n);break}}if(null==n)throw function(e){return new y_(v_.INVALID_URL,"Invalid URL '"+e+"'.")}(e);return n}}class N_{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D_(e){return"string"==typeof e||e instanceof String}function R_(e){return O_()&&e instanceof Blob}function O_(){return"undefined"!=typeof Blob}function P_(e,t,n,r){if(r<t)throw E_(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw E_(`Invalid value for '${e}'. Expected ${n} or less.`)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x_(e,t,n){let r=t;return null==n&&(r=`https://${t}`),`${n}://${r}/v0${e}`}function L_(e){const t=encodeURIComponent;let n="?";for(const r in e)if(e.hasOwnProperty(r)){n=n+(t(r)+"="+t(e[r]))+"&"}return n=n.slice(0,-1),n}(I_=__||(__={}))[I_.NO_ERROR=0]="NO_ERROR",I_[I_.NETWORK_ERROR=1]="NETWORK_ERROR",I_[I_.ABORT=2]="ABORT";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class M_{constructor(e,t,n,r,i,s,o,a,c,u,l,h=!0,d=!1){this.url_=e,this.method_=t,this.headers_=n,this.body_=r,this.successCodes_=i,this.additionalRetryCodes_=s,this.callback_=o,this.errorCallback_=a,this.timeout_=c,this.progressCallback_=u,this.connectionFactory_=l,this.retry=h,this.isUsingEmulator=d,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){const e=(e,t)=>{if(t)return void e(!1,new F_(!1,null,!0));const n=this.connectionFactory_();this.pendingConnection_=n;const r=e=>{const t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;const t=n.getErrorCode()===__.NO_ERROR,i=n.getStatus();if(!t||
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e,t){const n=e>=500&&e<600,r=-1!==[408,429].indexOf(e),i=-1!==t.indexOf(e);return n||r||i}(i,this.additionalRetryCodes_)&&this.retry){const t=n.getErrorCode()===__.ABORT;return void e(!1,new F_(!1,null,t))}const s=-1!==this.successCodes_.indexOf(i);e(!0,new F_(s,n))})},t=(e,t)=>{const n=this.resolve_,r=this.reject_,i=t.connection;if(t.wasSuccessCode)try{const e=this.callback_(i,i.getResponse());!
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e){return void 0!==e}(e)?n():n(e)}catch(s){r(s)}else if(null!==i){const e=b_();e.serverResponse=i.getErrorText(),this.errorCallback_?r(this.errorCallback_(i,e)):r(e)}else if(t.canceled){r(this.appDelete_?S_():new y_(v_.CANCELED,"User canceled the upload/download."))}else{r(new y_(v_.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again."))}};this.canceled_?t(0,new F_(!1,null,!0)):this.backoffId_=function(e,t,n){let r=1,i=null,s=null,o=!1,a=0;function c(){return 2===a}let u=!1;function l(...e){u||(u=!0,t.apply(null,e))}function h(t){i=setTimeout(()=>{i=null,e(f,c())},t)}function d(){s&&clearTimeout(s)}function f(e,...t){if(u)return void d();if(e)return d(),void l.call(null,e,...t);if(c()||o)return d(),void l.call(null,e,...t);let n;r<64&&(r*=2),1===a?(a=2,n=0):n=1e3*(r+Math.random()),h(n)}let p=!1;function m(e){p||(p=!0,d(),u||(null!==i?(e||(a=2),clearTimeout(i),h(0)):e||(a=1)))}return h(0),s=setTimeout(()=>{o=!0,m(!0)},n),m}(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class F_{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}function V_(...e){const t="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0;if(void 0!==t){const n=new t;for(let t=0;t<e.length;t++)n.append(e[t]);return n.getBlob()}if(O_())return new Blob(e);throw new y_(v_.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function U_(e){if("undefined"==typeof atob)throw t="base-64",new y_(v_.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`);var t;return atob(e)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const q_="raw",B_="base64",j_="base64url",z_="data_url";class $_{constructor(e,t){this.data=e,this.contentType=t||null}}function G_(e,t){switch(e){case q_:return new $_(K_(t));case B_:case j_:return new $_(H_(e,t));case z_:return new $_(function(e){const t=new W_(e);return t.base64?H_(B_,t.rest):function(e){let t;try{t=decodeURIComponent(e)}catch(n){throw A_(z_,"Malformed data URL.")}return K_(t)}(t.rest)}(t),new W_(t).contentType)}throw b_()}function K_(e){const t=[];for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|63&r);else if(55296==(64512&r)){if(n<e.length-1&&56320==(64512&e.charCodeAt(n+1))){r=65536|(1023&r)<<10|1023&e.charCodeAt(++n),t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r)}else t.push(239,191,189)}else 56320==(64512&r)?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|63&r)}return new Uint8Array(t)}function H_(e,t){switch(e){case B_:{const n=-1!==t.indexOf("-"),r=-1!==t.indexOf("_");if(n||r){throw A_(e,"Invalid character '"+(n?"-":"_")+"' found: is it base64url encoded?")}break}case j_:{const n=-1!==t.indexOf("+"),r=-1!==t.indexOf("/");if(n||r){throw A_(e,"Invalid character '"+(n?"+":"/")+"' found: is it base64 encoded?")}t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=U_(t)}catch(i){if(i.message.includes("polyfill"))throw i;throw A_(e,"Invalid character found")}const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}class W_{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(null===t)throw A_(z_,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=t[1]||null;null!=n&&(this.base64=function(e,t){if(!(e.length>=t.length))return!1;return e.substring(e.length-t.length)===t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=e.substring(e.indexOf(",")+1)}}class Q_{constructor(e,t){let n=0,r="";R_(e)?(this.data_=e,n=e.size,r=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),n=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),n=e.length),this.size_=n,this.type_=r}size(){return this.size_}type(){return this.type_}slice(e,t){if(R_(this.data_)){const s=this.data_,o=(r=e,i=t,(n=s).webkitSlice?n.webkitSlice(r,i):n.mozSlice?n.mozSlice(r,i):n.slice?n.slice(r,i):null);return null===o?null:new Q_(o)}{const n=new Uint8Array(this.data_.buffer,e,t-e);return new Q_(n,!0)}var n,r,i}static getBlob(...e){if(O_()){const t=e.map(e=>e instanceof Q_?e.data_:e);return new Q_(V_.apply(null,t))}{const t=e.map(e=>D_(e)?G_(q_,e).data:e.data_);let n=0;t.forEach(e=>{n+=e.byteLength});const r=new Uint8Array(n);let i=0;return t.forEach(e=>{for(let t=0;t<e.length;t++)r[i++]=e[t]}),new Q_(r,!0)}}uploadData(){return this.data_}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J_(e){let t;try{t=JSON.parse(e)}catch(n){return null}return function(e){return"object"==typeof e&&!Array.isArray(e)}(t)?t:null}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y_(e){const t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X_(e,t){return t}class Z_{constructor(e,t,n,r){this.server=e,this.local=t||e,this.writable=!!n,this.xform=r||X_}}let eI=null;function tI(){if(eI)return eI;const e=[];e.push(new Z_("bucket")),e.push(new Z_("generation")),e.push(new Z_("metageneration")),e.push(new Z_("name","fullPath",!0));const t=new Z_("name");t.xform=function(e,t){return function(e){return!D_(e)||e.length<2?e:Y_(e)}(t)},e.push(t);const n=new Z_("size");return n.xform=function(e,t){return void 0!==t?Number(t):t},e.push(n),e.push(new Z_("timeCreated")),e.push(new Z_("updated")),e.push(new Z_("md5Hash",null,!0)),e.push(new Z_("cacheControl",null,!0)),e.push(new Z_("contentDisposition",null,!0)),e.push(new Z_("contentEncoding",null,!0)),e.push(new Z_("contentLanguage",null,!0)),e.push(new Z_("contentType",null,!0)),e.push(new Z_("metadata","customMetadata",!0)),eI=e,eI}function nI(e,t,n){const r={type:"file"},i=n.length;for(let s=0;s<i;s++){const e=n[s];r[e.local]=e.xform(r,t[e.server])}return function(e,t){Object.defineProperty(e,"ref",{get:function(){const n=e.bucket,r=e.fullPath,i=new k_(n,r);return t._makeStorageReference(i)}})}(r,e),r}function rI(e,t,n){const r=J_(t);if(null===r)return null;return nI(e,r,n)}class iI{constructor(e,t,n,r){this.url=e,this.method=t,this.handler=n,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sI(e){if(!e)throw b_()}function oI(e,t){return function(n,r){const i=rI(e,r,t);return sI(null!==i),function(e,t,n,r){const i=J_(t);if(null===i)return null;if(!D_(i.downloadTokens))return null;const s=i.downloadTokens;if(0===s.length)return null;const o=encodeURIComponent;return s.split(",").map(t=>{const i=e.bucket,s=e.fullPath;return x_("/b/"+o(i)+"/o/"+o(s),n,r)+L_({alt:"media",token:t})})[0]}(i,r,e.host,e._protocol)}}function aI(e){return function(t,n){let r;var i,s;return 401===t.getStatus()?r=t.getErrorText().includes("Firebase App Check token is invalid")?new y_(v_.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project."):new y_(v_.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(s=e.bucket,r=new y_(v_.QUOTA_EXCEEDED,"Quota for bucket '"+s+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(i=e.path,r=new y_(v_.UNAUTHORIZED,"User does not have permission to access '"+i+"'.")):r=n,r.status=t.getStatus(),r.serverResponse=n.serverResponse,r}}function cI(e){const t=aI(e);return function(n,r){let i=t(n,r);var s;return 404===n.getStatus()&&(s=e.path,i=new y_(v_.OBJECT_NOT_FOUND,"Object '"+s+"' does not exist.")),i.serverResponse=r.serverResponse,i}}function uI(e,t,n,r,i){const s=t.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};const a=function(){let e="";for(let t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();o["Content-Type"]="multipart/related; boundary="+a;const c=function(e,t,n){const r=Object.assign({},n);return r.fullPath=e.path,r.size=t.size(),r.contentType||(r.contentType=function(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}(null,t)),r}(t,r,i),u=function(e,t){const n={},r=t.length;for(let i=0;i<r;i++){const r=t[i];r.writable&&(n[r.server]=e[r.local])}return JSON.stringify(n)}(c,n),l="--"+a+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+u+"\r\n--"+a+"\r\nContent-Type: "+c.contentType+"\r\n\r\n",h="\r\n--"+a+"--",d=Q_.getBlob(l,r,h);if(null===d)throw new y_(v_.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.");const f={name:c.fullPath},p=x_(s,e.host,e._protocol),m=e.maxUploadRetryTime,g=new iI(p,"POST",function(e,t){return function(n,r){const i=rI(e,r,t);return sI(null!==i),i}}(e,n),m);return g.urlParams=f,g.headers=o,g.body=d.uploadData(),g.errorHandler=aI(t),g}class lI{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=__.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=__.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=__.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,n,r,i){if(this.sent_)throw C_("cannot .send() more than once");if(D(e)&&n&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==i)for(const s in i)i.hasOwnProperty(s)&&this.xhr_.setRequestHeader(s,i[s].toString());return void 0!==r?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw C_("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw C_("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return-1}}getResponse(){if(!this.sent_)throw C_("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw C_("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}class hI extends lI{initXhr(){this.xhr_.responseType="text"}}function dI(){return new hI}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fI{constructor(e,t){this._service=e,this._location=t instanceof k_?t:k_.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new fI(e,t)}get root(){const e=new k_(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Y_(this._location.path)}get storage(){return this._service}get parent(){const e=function(e){if(0===e.length)return null;const t=e.lastIndexOf("/");return-1===t?"":e.slice(0,t)}(this._location.path);if(null===e)return null;const t=new k_(this._location.bucket,e);return new fI(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw function(e){return new y_(v_.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(e)}}function pI(e){e._throwIfRoot("getDownloadURL");const t=function(e,t,n){const r=x_(t.fullServerUrl(),e.host,e._protocol),i=e.maxOperationRetryTime,s=new iI(r,"GET",oI(e,n),i);return s.errorHandler=cI(t),s}(e.storage,e._location,tI());return e.storage.makeRequestWithTokens(t,dI).then(e=>{if(null===e)throw new y_(v_.NO_DOWNLOAD_URL,"The given file does not have any download URLs.");return e})}function mI(e){e._throwIfRoot("deleteObject");const t=function(e,t){const n=x_(t.fullServerUrl(),e.host,e._protocol),r=e.maxOperationRetryTime,i=new iI(n,"DELETE",function(e,t){},r);return i.successCodes=[200,204],i.errorHandler=cI(t),i}(e.storage,e._location);return e.storage.makeRequestWithTokens(t,dI)}function gI(e,t){if(e instanceof wI){const n=e;if(null==n._bucket)throw new y_(v_.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+g_+"' property when initializing the app?");const r=new fI(n,n._bucket);return null!=t?gI(r,t):r}return void 0!==t?function(e,t){const n=function(e,t){const n=t.split("/").filter(e=>e.length>0).join("/");return 0===e.length?n:e+"/"+n}(e._location.path,t),r=new k_(e._location.bucket,n);return new fI(e.storage,r)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,t):e}function yI(e,t){if(t&&/^[A-Za-z]+:\/\//.test(t)){if(e instanceof wI)return new fI(e,t);throw E_("To use ref(service, url), the first argument must be a Storage instance.")}return gI(e,t)}function vI(e,t){const n=null==t?void 0:t[g_];return null==n?null:k_.makeFromBucketSpec(n,e)}class wI{constructor(e,t,n,r,i,s=!1){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=r,this._firebaseVersion=i,this._isUsingEmulator=s,this._bucket=null,this._host=m_,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=r?k_.makeFromBucketSpec(r,this._host):vI(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=k_.makeFromBucketSpec(this._url,e):this._bucket=vI(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){P_("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){P_("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){if(ze(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});if(e){return(await e.getToken()).token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new fI(this,e)}_makeRequest(e,t,n,r,i=!0){if(this._deleted)return new N_(S_());{const s=function(e,t,n,r,i,s,o=!0,a=!1){const c=L_(e.urlParams),u=e.url+c,l=Object.assign({},e.headers);return function(e,t){t&&(e["X-Firebase-GMPID"]=t)}(l,t),function(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}(l,n),function(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}(l,s),function(e,t){null!==t&&(e["X-Firebase-AppCheck"]=t)}(l,r),new M_(u,e.method,l,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i,o,a)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,this._appId,n,r,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(s),s.getPromise().then(()=>this._requests.delete(s),()=>this._requests.delete(s)),s}}async makeRequestWithTokens(e,t){const[n,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,r).getPromise()}}const _I="@firebase/storage",II="0.14.2",TI="storage";function bI(e,t,n){return function(e,t,n){e._throwIfRoot("uploadBytes");const r=uI(e.storage,e._location,tI(),new Q_(t,!0),n);return e.storage.makeRequestWithTokens(r,dI).then(t=>({metadata:t,ref:e}))}(e=N(e),t,n)}function EI(e){return pI(e=N(e))}function SI(e){return mI(e=N(e))}function AI(e,t){return yI(e=N(e),t)}function CI(e=We(),t){const n=je(e=N(e),TI).getImmediate({identifier:t}),r=u("storage");return r&&function(e,t,n,r={}){!function(e,t,n,r={}){e.host=`${t}:${n}`;const i=D(t);i&&R(`https://${e.host}/b`),e._isUsingEmulator=!0,e._protocol=i?"https":"http";const{mockUserToken:s}=r;s&&(e._overrideAuthToken="string"==typeof s?s:f(s,e.app.options.projectId))}(e,t,n,r)}(n,...r),n}function kI(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return new wI(n,r,i,t,Ke)}Be(new O(TI,kI,"PUBLIC").setMultipleInstances(!0)),Qe(_I,II,""),Qe(_I,II,"esm2020");export{i_ as A,r_ as B,Lr as C,Fs as D,p_ as E,lr as G,Ho as T,wv as a,CI as b,Zw as c,dv as d,iw as e,Hr as f,Ls as g,Mr as h,He as i,vr as j,ji as k,Xw as l,s_ as m,_w as n,Kr as o,hv as p,mw as q,Tw as r,t_ as s,AI as t,bI as u,EI as v,yw as w,SI as x,e_ as y,n_ as z};
