(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=e(n);fetch(n.href,s)}})();class Fi{constructor(t=250,e=768){this.speed=t,this.mq=e;const i=5,n="--pullHeightClosed",s="--pullHeightOpen";document.querySelectorAll(".c_pull").forEach(c=>{const a=c.querySelector(".c_pull_ttl"),u=c.querySelector(".c_pull_content"),l=c,f=c.classList.contains("-open");a==null||a.addEventListener("click",p=>{p.preventDefault();const d=a.offsetHeight;l.style.setProperty(n,`${d}px`),l.open?l.open&&(l.style.setProperty(s,`${d+u.offsetHeight}px`),setTimeout(()=>{c.classList.remove("-open")},i),setTimeout(()=>{l.open=!1},t+i)):(l.open=!0,l.style.setProperty(s,`${d+u.offsetHeight}px`),setTimeout(()=>{c.classList.add("-open"),u==null||u.focus({preventScroll:!0}),document.activeElement!==u&&(u==null||u.setAttribute("tabindex","-1"),u==null||u.focus({preventScroll:!0}))},i))}),c.addEventListener("toggle",()=>{l.open&&!f?c.classList.add("-open"):!l.open&&f&&c.classList.remove("-open")});function h(){const p=window.innerWidth;l.classList.contains("-spPull")&&(p<=e?(c.classList.remove("-open"),l.open=!1):(c.classList.add("-open"),l.open=!0))}h(),window.addEventListener("resize",h)})}}const jt=r=>String(r).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),Wi=()=>{const r=document.querySelector("header"),t=r==null?void 0:r.clientHeight;t&&setTimeout(()=>{document.documentElement.style.setProperty("--headerHeight",`${t}px`)},5)},Qe=r=>{const t=new Date(r.replace(/年|月|日/g,"/").replace("日",""));let e=t.getFullYear(),i=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${e}-${i}-${n}`},oi=r=>{let t=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/gi;if(!r.match(t))return r};class ji{constructor(t=".c_modal"){this.target=t;const e=document.querySelectorAll(t+"_btn");let i=document.querySelectorAll(t+"_close");e.forEach(a=>{a.addEventListener("click",u=>{const l=u.currentTarget;let f=jt((l==null?void 0:l.getAttribute("aria-controls"))||""),h=document.getElementById(f);const p=l.nextElementSibling;if(f)h=document.getElementById(f);else{const v=jt(l.getAttribute("data-src")),m=jt(l.getAttribute("data-alt"));if(!p){const _=/(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i.exec(v);let g="";g+='<dialog class="c_modal"><div class="c_modal_content" tabindex="-1">',_?(g+='<button class="c_modal_close"><span class="txtHidden">モーダルウィンドウを閉じる</span></button>',g+=s(c("https://www.youtube"+(_[2]||"")+".com/embed/"+_[4],Object.assign({autoplay:1,rel:0},o(_[5]||""))))):g+=`<figure><img src=${v} decoding="async" alt=${m}></figure>`,g+='<button class="c_modal_close"><span class="txtHidden">モーダルウィンドウを閉じる</span></button>',g+="</div></div></dialog>",l.insertAdjacentHTML("afterend",g)}h=l.nextElementSibling,i=document.querySelectorAll(".c_modal_close")}h==null||h.showModal();const d=h.querySelector(t+"_content");setTimeout(()=>{d==null||d.focus({preventScroll:!0}),document.activeElement!==d&&(d==null||d.setAttribute("tabindex","-1"),d==null||d.focus({preventScroll:!0}))},0),f=null,i.forEach(v=>{v.addEventListener("click",()=>{n(h)})}),h==null||h.addEventListener("cancel",()=>{n(h)}),h==null||h.addEventListener("click",v=>{v.target===h&&n(h)})})});function n(a){a.close("cancelled"),a.querySelector(".frameWrapper")&&a.remove()}function s(a){return'<div class="frameWrapper"><iframe frameborder="0" allow="autoplay; fullscreen" src="'+a+'"/></div>'}function o(a){const u=decodeURI(a.split("#")[0]).split("&"),l=new Map;let f;for(let h=0,p=u.length;h<p;h++)u[h]&&(f=u[h].split("="),l.set(f[0],f[1]));return l}function c(a,u){const f=Object.keys(u).map(h=>`${h}=${u[h]}`).join("&");return`${a}${a.includes("?")?"&":"?"}${f}`}}}class Gi{constructor(t=".headerNavi",e="-open"){this.target=t,this.open=e;const i=document.querySelector(t),n=i==null?void 0:i.querySelector(".ac_menu"),s=i==null?void 0:i.querySelector(".ac_menu span"),o=i==null?void 0:i.querySelector(".naviWrapper"),c=i==null?void 0:i.querySelector(".closeBtn");n==null||n.addEventListener("click",()=>{i==null||i.classList.toggle(e),i!=null&&i.classList.contains(e)?(n.setAttribute("aria-expanded","true"),s.textContent="メニューを閉じる"):(n.setAttribute("aria-expanded","false"),s.textContent="メニューを開く")}),c==null||c.addEventListener("click",()=>{a()}),o==null||o.addEventListener("click",l=>{l.target.closest("#navi")===null&&a()});const a=()=>{i==null||i.classList.remove(e),n.setAttribute("aria-expanded","false"),s.textContent="メニューを開く"};function u(){const l=document.querySelectorAll(".spAccordion"),f="--subHeightOpen",h=5;let p=!1;const d=250;l.forEach(v=>{v==null||v.addEventListener("click",()=>{var y;const m=(y=v.closest("div"))==null?void 0:y.nextElementSibling;if(p)p&&(m.style.setProperty(f,"0"),v.classList.remove("-open"),setTimeout(()=>{m.classList.remove("-open"),p=!1,m.style.setProperty(f,"auto")},d+h));else{m.classList.add("-open"),v.classList.add("-open");const _=m.offsetHeight;m.style.setProperty(f,"0"),setTimeout(()=>{m.style.setProperty(f,`${_}px`),p=!0},h)}})})}u()}}class Yi{constructor(t=".scrollIn,.scroll",e="-active"){this.target=t,this.active=e;const i=document.querySelectorAll(t),n=Array.prototype.slice.call(i),s={root:null,rootMargin:"0px 0px",threshold:0},o=new IntersectionObserver(c,s);n.forEach(a=>{o.observe(a)});function c(a){a.forEach(u=>{const l=u.target;u.isIntersecting&&!l.classList.contains(e)&&setTimeout(()=>{l.classList.add(e)},5)})}}}class Rr{constructor(t=".c_tab",e="-open"){this.target=t,this.open=e;const i=document.querySelectorAll(t+"_list li button");function n(s){const o=s.target,c=o.closest(t),a=c==null?void 0:c.querySelectorAll(t+"_content"),u=Array.prototype.slice.call(a),l=c==null?void 0:c.querySelectorAll(t+"_list li button"),f=Array.prototype.slice.call(l),h=f.indexOf(s.target);f.forEach(p=>{p.classList.remove(e),p.setAttribute("aria-pressed","false"),p.setAttribute("tabindex","0")}),o.classList.add(e),o.setAttribute("aria-pressed","true"),o.setAttribute("tabindex","-1"),u.forEach(p=>{p.setAttribute("hidden",""),p.setAttribute("tabindex","-1")}),u[h].removeAttribute("hidden"),u[h].focus({preventScroll:!0})}if(i.forEach(s=>{s.addEventListener("click",n)}),i.length>0){const o=new URL(window.location.href).hash;if(o){const c=Number(o.slice(-1));isNaN(c)||i[c-1].click()}}}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xe=globalThis,vr=xe.ShadowRoot&&(xe.ShadyCSS===void 0||xe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,pr=Symbol(),Dr=new WeakMap;let ai=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==pr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(vr&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=Dr.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Dr.set(e,t))}return t}toString(){return this.cssText}};const Xi=r=>new ai(typeof r=="string"?r:r+"",void 0,pr),Ki=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((i,n,s)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+r[s+1],r[0]);return new ai(e,r,pr)},Zi=(r,t)=>{if(vr)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),n=xe.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=e.cssText,r.appendChild(i)}},Mr=vr?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Xi(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Qi,defineProperty:Ji,getOwnPropertyDescriptor:tn,getOwnPropertyNames:en,getOwnPropertySymbols:rn,getPrototypeOf:nn}=Object,$t=globalThis,kr=$t.trustedTypes,sn=kr?kr.emptyScript:"",Je=$t.reactiveElementPolyfillSupport,ie=(r,t)=>r,Re={toAttribute(r,t){switch(t){case Boolean:r=r?sn:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},gr=(r,t)=>!Qi(r,t),Hr={attribute:!0,type:String,converter:Re,reflect:!1,hasChanged:gr};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$t.litPropertyMetadata??($t.litPropertyMetadata=new WeakMap);class qt extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Hr){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);n!==void 0&&Ji(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:s}=tn(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return n==null?void 0:n.call(this)},set(o){const c=n==null?void 0:n.call(this);s.call(this,o),this.requestUpdate(t,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Hr}static _$Ei(){if(this.hasOwnProperty(ie("elementProperties")))return;const t=nn(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ie("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ie("properties"))){const e=this.properties,i=[...en(e),...rn(e)];for(const n of i)this.createProperty(n,e[n])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,n]of e)this.elementProperties.set(i,n)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const n=this._$Eu(e,i);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const n of i)e.unshift(Mr(n))}else t!==void 0&&e.push(Mr(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Zi(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){var s;const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(n!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:Re).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){var s;const i=this.constructor,n=i._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const o=i.getPropertyOptions(n),c=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:Re;this._$Em=n,this[n]=c.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,i){if(t!==void 0){if(i??(i=this.constructor.getPropertyOptions(t)),!(i.hasChanged??gr)(this[t],e))return;this.P(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[s,o]of n)o.wrapped!==!0||this._$AL.has(s)||this[s]===void 0||this.P(s,this[s],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(n=>{var s;return(s=n.hostUpdate)==null?void 0:s.call(n)}),this.update(e)):this._$EU()}catch(n){throw t=!1,this._$EU(),n}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var n;return(n=i.hostUpdated)==null?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}qt.elementStyles=[],qt.shadowRootOptions={mode:"open"},qt[ie("elementProperties")]=new Map,qt[ie("finalized")]=new Map,Je==null||Je({ReactiveElement:qt}),($t.reactiveElementVersions??($t.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ne=globalThis,De=ne.trustedTypes,Ur=De?De.createPolicy("lit-html",{createHTML:r=>r}):void 0,ci="$lit$",bt=`lit$${Math.random().toFixed(9).slice(2)}$`,li="?"+bt,on=`<${li}>`,Mt=document,ae=()=>Mt.createComment(""),ce=r=>r===null||typeof r!="object"&&typeof r!="function",mr=Array.isArray,an=r=>mr(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",tr=`[ 	
\f\r]`,re=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,zr=/-->/g,Vr=/>/g,It=RegExp(`>|${tr}(?:([^\\s"'>=/]+)(${tr}*=${tr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),qr=/'/g,Br=/"/g,ui=/^(?:script|style|textarea|title)$/i,cn=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),N=cn(1),kt=Symbol.for("lit-noChange"),X=Symbol.for("lit-nothing"),Fr=new WeakMap,Ot=Mt.createTreeWalker(Mt,129);function hi(r,t){if(!mr(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ur!==void 0?Ur.createHTML(t):t}const ln=(r,t)=>{const e=r.length-1,i=[];let n,s=t===2?"<svg>":t===3?"<math>":"",o=re;for(let c=0;c<e;c++){const a=r[c];let u,l,f=-1,h=0;for(;h<a.length&&(o.lastIndex=h,l=o.exec(a),l!==null);)h=o.lastIndex,o===re?l[1]==="!--"?o=zr:l[1]!==void 0?o=Vr:l[2]!==void 0?(ui.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=It):l[3]!==void 0&&(o=It):o===It?l[0]===">"?(o=n??re,f=-1):l[1]===void 0?f=-2:(f=o.lastIndex-l[2].length,u=l[1],o=l[3]===void 0?It:l[3]==='"'?Br:qr):o===Br||o===qr?o=It:o===zr||o===Vr?o=re:(o=It,n=void 0);const p=o===It&&r[c+1].startsWith("/>")?" ":"";s+=o===re?a+on:f>=0?(i.push(u),a.slice(0,f)+ci+a.slice(f)+bt+p):a+bt+(f===-2?c:p)}return[hi(r,s+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class le{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let s=0,o=0;const c=t.length-1,a=this.parts,[u,l]=ln(t,e);if(this.el=le.createElement(u,i),Ot.currentNode=this.el.content,e===2||e===3){const f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(n=Ot.nextNode())!==null&&a.length<c;){if(n.nodeType===1){if(n.hasAttributes())for(const f of n.getAttributeNames())if(f.endsWith(ci)){const h=l[o++],p=n.getAttribute(f).split(bt),d=/([.?@])?(.*)/.exec(h);a.push({type:1,index:s,name:d[2],strings:p,ctor:d[1]==="."?hn:d[1]==="?"?dn:d[1]==="@"?fn:Ve}),n.removeAttribute(f)}else f.startsWith(bt)&&(a.push({type:6,index:s}),n.removeAttribute(f));if(ui.test(n.tagName)){const f=n.textContent.split(bt),h=f.length-1;if(h>0){n.textContent=De?De.emptyScript:"";for(let p=0;p<h;p++)n.append(f[p],ae()),Ot.nextNode(),a.push({type:2,index:++s});n.append(f[h],ae())}}}else if(n.nodeType===8)if(n.data===li)a.push({type:2,index:s});else{let f=-1;for(;(f=n.data.indexOf(bt,f+1))!==-1;)a.push({type:7,index:s}),f+=bt.length-1}s++}}static createElement(t,e){const i=Mt.createElement("template");return i.innerHTML=t,i}}function Xt(r,t,e=r,i){var o,c;if(t===kt)return t;let n=i!==void 0?(o=e.o)==null?void 0:o[i]:e.l;const s=ce(t)?void 0:t._$litDirective$;return(n==null?void 0:n.constructor)!==s&&((c=n==null?void 0:n._$AO)==null||c.call(n,!1),s===void 0?n=void 0:(n=new s(r),n._$AT(r,e,i)),i!==void 0?(e.o??(e.o=[]))[i]=n:e.l=n),n!==void 0&&(t=Xt(r,n._$AS(r,t.values),n,i)),t}class un{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=((t==null?void 0:t.creationScope)??Mt).importNode(e,!0);Ot.currentNode=n;let s=Ot.nextNode(),o=0,c=0,a=i[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new _e(s,s.nextSibling,this,t):a.type===1?u=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(u=new vn(s,this,t)),this._$AV.push(u),a=i[++c]}o!==(a==null?void 0:a.index)&&(s=Ot.nextNode(),o++)}return Ot.currentNode=Mt,n}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class _e{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this.v}constructor(t,e,i,n){this.type=2,this._$AH=X,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this.v=(n==null?void 0:n.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Xt(this,t,e),ce(t)?t===X||t==null||t===""?(this._$AH!==X&&this._$AR(),this._$AH=X):t!==this._$AH&&t!==kt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):an(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==X&&ce(this._$AH)?this._$AA.nextSibling.data=t:this.T(Mt.createTextNode(t)),this._$AH=t}$(t){var s;const{values:e,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=le.createElement(hi(i.h,i.h[0]),this.options)),i);if(((s=this._$AH)==null?void 0:s._$AD)===n)this._$AH.p(e);else{const o=new un(n,this),c=o.u(this.options);o.p(e),this.T(c),this._$AH=o}}_$AC(t){let e=Fr.get(t.strings);return e===void 0&&Fr.set(t.strings,e=new le(t)),e}k(t){mr(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const s of t)n===e.length?e.push(i=new _e(this.O(ae()),this.O(ae()),this,this.options)):i=e[n],i._$AI(s),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t&&t!==this._$AB;){const n=t.nextSibling;t.remove(),t=n}}setConnected(t){var e;this._$AM===void 0&&(this.v=t,(e=this._$AP)==null||e.call(this,t))}}class Ve{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,s){this.type=1,this._$AH=X,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=X}_$AI(t,e=this,i,n){const s=this.strings;let o=!1;if(s===void 0)t=Xt(this,t,e,0),o=!ce(t)||t!==this._$AH&&t!==kt,o&&(this._$AH=t);else{const c=t;let a,u;for(t=s[0],a=0;a<s.length-1;a++)u=Xt(this,c[i+a],e,a),u===kt&&(u=this._$AH[a]),o||(o=!ce(u)||u!==this._$AH[a]),u===X?t=X:t!==X&&(t+=(u??"")+s[a+1]),this._$AH[a]=u}o&&!n&&this.j(t)}j(t){t===X?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class hn extends Ve{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===X?void 0:t}}class dn extends Ve{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==X)}}class fn extends Ve{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){if((t=Xt(this,t,e,0)??X)===kt)return;const i=this._$AH,n=t===X&&i!==X||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==X&&(i===X||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class vn{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Xt(this,t)}}const er=ne.litHtmlPolyfillSupport;er==null||er(le,_e),(ne.litHtmlVersions??(ne.litHtmlVersions=[])).push("3.2.0");const pn=(r,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let n=i._$litPart$;if(n===void 0){const s=(e==null?void 0:e.renderBefore)??null;i._$litPart$=n=new _e(t.insertBefore(ae(),s),s,void 0,e??{})}return n._$AI(r),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Rt extends qt{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.o=pn(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this.o)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.o)==null||t.setConnected(!1)}render(){return kt}}var si;Rt._$litElement$=!0,Rt.finalized=!0,(si=globalThis.litElementHydrateSupport)==null||si.call(globalThis,{LitElement:Rt});const rr=globalThis.litElementPolyfillSupport;rr==null||rr({LitElement:Rt});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _r=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gn={attribute:!0,type:String,converter:Re,reflect:!1,hasChanged:gr},mn=(r=gn,t,e)=>{const{kind:i,metadata:n}=e;let s=globalThis.litPropertyMetadata.get(n);if(s===void 0&&globalThis.litPropertyMetadata.set(n,s=new Map),s.set(e.name,r),i==="accessor"){const{name:o}=e;return{set(c){const a=t.get.call(this);t.set.call(this,c),this.requestUpdate(o,a,r)},init(c){return c!==void 0&&this.P(o,void 0,r),c}}}if(i==="setter"){const{name:o}=e;return function(c){const a=this[o];t.call(this,c),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+i)};function G(r){return(t,e)=>typeof e=="object"?mn(r,t,e):((i,n,s)=>{const o=n.hasOwnProperty(s);return n.constructor.createProperty(s,o?{...i,wrapped:!0}:i),o?Object.getOwnPropertyDescriptor(n,s):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _n(r){return G({...r,state:!0,attribute:!1})}var yn=Object.defineProperty,En=Object.getOwnPropertyDescriptor,ft=(r,t,e,i)=>{for(var n=i>1?void 0:i?En(t,e):t,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(t,e,n):o(n))||n);return i&&n&&yn(t,e,n),n};let it=class extends Rt{constructor(){super(...arguments),this.category=[],this.type="checkbox",this.search="AND",this.src=null,this.data=[],this.array=[],this.show=0,this.SHOW_CLASS_NAME="-visible",this.ALL_CARD_LIST=this.querySelectorAll(".c_filter_item"),this._targetElements=[],this._filterCats=[],this._matchedLists=[],this._matchedCount=0,this._maxCount=0,this._handleMoreButtonClick=()=>{if(!(this._matchedCount<1)){this.visible&&(this._maxCount=this.show+ +this.visible);for(let r=this.show;r<this._maxCount&&r<this._matchedCount;r++)this.src||this._matchedLists[r].classList.add(this.SHOW_CLASS_NAME),this.show++;this._showMoreBtn(this.show,this._matchedCount)}}}async fetchData(){if(this.src)try{const t=await(await fetch(oi(jt(this.src))+".json")).json();this.data=t,this.array=JSON.parse(JSON.stringify(this.data))}catch(r){console.error("Error fetching data:",r)}}connectedCallback(){super.connectedCallback(),this.fetchData(),this._targetElements=[...this.children]}firstUpdated(){var t;const r=it.findSlots(this.children);for(const e of this._targetElements){let i=null;if(e.hasAttribute("slot")){const n=(t=e.attributes.getNamedItem("slot"))==null?void 0:t.value;i=r.find(s=>{var o;return((o=s.attributes.getNamedItem("name"))==null?void 0:o.value)===n})}else i=r[0];i&&(e.remove(),i.append(e))}this._targetElements=[],setTimeout(()=>{this._setCatAll()},400)}render(){return this.src&&!this.data.length?N`<div aria-busy="true">Coming soon...</div>`:N`
    <div class="c_filter">
      <ul class="c_filter_list grid grid-cols-5 mb-[1.6rem] gap-[0.8rem]">
      ${this.all?N`
        <li class=${this.all?"":"txtHidden"}>
          <input type=${this.type} @click=${this._handleClick} name="filter" value="allCat" id="cat0" />
          <label for="cat0">${this.all}</label>
        </li>
        `:null}
        ${this.category.map((r,t)=>N`
            <li>
              <input type=${this.type} @click=${this._handleClick} name="filter" value=${r} id="cat${t+1}" />
              <label for="cat${t+1}">${r}</label>
            </li>
          `)}
      </ul>
      ${this.src?N`
          <div class="grid grid-cols-3 gap-[3.2rem]">
            ${this.array.map((r,t)=>N`
              ${t<this.show?N`
                <div class="border-prime c_filter_item border-[0.1rem] -visible">
                  <img src="${r.img.src}" width="${r.img.size[0]}" height="${r.img.size[1]}" decoding="async" loading="lazy">
                  <div class="p-[2.4rem]">
                    <div class="flex gap-[1.6rem] mb-[1.2rem]">
                      ${r.cat.map(e=>N`
                          <span class="c_filter_cat bg-prime text-reversal text-sm p-[0.1em_0.5em]">${e}</span>
                        `)}
                    </div>
                    <h3 class="text-prime font-bold mb-[0.8rem]">
                      <span class="block.text-sm"> No.${t+1}</span>
                      <span class="text-lg">${r.ttl}さん</span>
                    </h3>
                    <p>${r.txt}</p>
                  </div>
                </div>
                `:""}
              `)}
          </div>
          `:N`<slot name="content"></slot>`}
      ${this.visible?N`
          <button class="c_filter_more" @click=${this._handleMoreButtonClick}>もっと見る</button>
        `:N``}
    </div>
    `}_handleClick(r){const t=r.target,e=t.value,i=t.checked?t.value:"";if(this.ALL_CARD_LIST){if(i==="allCat")this._setCatAll();else{const n=this.querySelector("#cat0");n&&(n.checked=!1),t.checked?(this.type==="radio"&&(this._filterCats=[]),this._filterCats.push(e)):this._filterCats=this._filterCats.filter(s=>s!==e),this._filterElements()}this._filterCats.length===0&&this._setCatAll()}}_filterElements(r){this.ALL_CARD_LIST=this.querySelectorAll(".c_filter_item"),this._matchedLists=[],this._matchedCount=0,this.show=0,this._maxCount=0,this.src?(this.search==="OR"?this.array=this.data.filter(e=>this._filterCats.some(i=>e.cat.includes(i))):this.array=this.data.filter(e=>this._filterCats.every(i=>e.cat.includes(i))),this._matchedCount=this.array.length):(this.ALL_CARD_LIST.forEach(e=>{if(e.classList.remove(this.SHOW_CLASS_NAME),r)this._matchedLists.push(e);else{const i=[];e.querySelectorAll(".c_filter_cat").forEach(s=>{s.textContent&&i.push(s.textContent.toLowerCase())}),(this.search==="OR"?this._filterCats.some(s=>i.includes(s.toLowerCase())):this._filterCats.every(s=>i.includes(s.toLowerCase())))&&this._matchedLists.push(e)}}),this._matchedCount=this._matchedLists.length);const t=this.visible?this.visible:this._matchedCount;for(let e=0;e<t&&e<this._matchedCount;e++)this.src||this._matchedLists[e].classList.add(this.SHOW_CLASS_NAME),this.show++;this.visible&&this._showMoreBtn(this.show,this._matchedCount)}_showMoreBtn(r,t){const e=this.querySelector(".c_filter_more");r<t?e==null||e.classList.add(this.SHOW_CLASS_NAME):e==null||e.classList.remove(this.SHOW_CLASS_NAME)}_setCatAll(){const r=this.querySelector("#cat0");r&&(this.querySelectorAll("input").forEach((e,i)=>{i!==0&&(e.checked=!1)}),this._filterCats=[],r.checked=!0,this._filterElements(!0))}static findSlots(r){let t=[];for(const e of r)e.tagName==="SLOT"?t.push(e):e.tagName.indexOf("-")<0&&(t=t.concat(this.findSlots(e.children)));return t}createRenderRoot(){return this}};ft([G({type:Array})],it.prototype,"category",2);ft([G()],it.prototype,"all",2);ft([G()],it.prototype,"visible",2);ft([G()],it.prototype,"type",2);ft([G()],it.prototype,"search",2);ft([G()],it.prototype,"src",2);ft([G({type:Array})],it.prototype,"data",2);ft([G({type:Array})],it.prototype,"array",2);ft([G()],it.prototype,"show",2);it=ft([_r("filter-list")],it);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const An={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},bn=r=>(...t)=>({_$litDirective$:r,values:t});class Sn{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this.t=t,this._$AM=e,this.i=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ar extends Sn{constructor(t){if(super(t),this.it=X,t.type!==An.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===X||t==null)return this._t=void 0,this.it=t;if(t===kt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}ar.directiveName="unsafeHTML",ar.resultType=1;const $n=bn(ar);var wn=Object.defineProperty,Cn=Object.getOwnPropertyDescriptor,vt=(r,t,e,i)=>{for(var n=i>1?void 0:i?Cn(t,e):t,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(t,e,n):o(n))||n);return i&&n&&wn(t,e,n),n};let ot=class extends Rt{constructor(){super(...arguments),this.src="",this.href="",this.data=[],this.visible=3,this.headline=3,this.show=0,this.page=1,this.single=!1,this.post=0,this.ACTIVE_CLASS_NAME="-current",this._maxCount=0,this._archiveUrl=""}connectedCallback(){super.connectedCallback(),this.fetchData(),window.addEventListener("popstate",this._handlePopstate.bind(this))}disconnectedCallback(){super.disconnectedCallback(),this.fetchData(),window.removeEventListener("popstate",this._handlePopstate.bind(this))}async fetchData(){try{const t=await(await fetch(oi(jt(this.src))+".json")).json();this.data=t}catch(r){console.error("Error fetching data:",r)}}firstUpdated(){this._maxCount=this.visible,this._archiveUrl=jt(this.href),this.getQuery()&&(this.post=this.getQuery(),this.single=!0)}render(){if(!this.data.length)return N`<div aria-busy="true" class="fadeIn"></div>`;const r=Math.ceil(this.data.length/this.visible);return N`
    ${this.href!==""?N`
      <dl class="flex flex-col justify-between archiveList md:gap-y-[6.5rem] gap-y-[4.9rem]">
        ${this.data.map((t,e)=>{if(e<this.headline)return N`
              <div class="grid md:grid-cols-[13.1rem,auto] md:gap-[3rem] gap-[1.2rem]">
                <dt>
                  ${t.date?N`
                      <time datetime=${Qe(t.date)}>${t.date}</time>
                      `:null}
                </dt>
                <dd>
                  <a href="${t.link?t.link:this.href.includes("http")?null:this._archiveUrl+"#post-"+(e+1)}" class="linkArrow block">${t.ttl?t.ttl:null}</a>
                </dd>
              </div>
            `})}
      </dl>
      `:N`
      <div class="grid gap-[3.2rem]">
        ${this.data.map((t,e)=>N`
            ${this.single!==!0?N`
              ${this.show-1<=e&&e<=this._maxCount-1?N`
                <div class="border-prime border-[0.1rem] rounded-[1rem] overflow-hidden fadeUp">
                  <a href="${t.link?t.link:this.href.includes("http")?null:this._archiveUrl+"#post-"+(e+1)}" class="grid grid-cols-[auto_1fr] gap-[3rem] items-center" @click=${()=>this._showSingle(e+1)}>
                    ${t.img?N`
                      <img src="${t.img.src}" width="${t.img.size&&t.img.size[0]?t.img.size[0]:null}" height="${t.img.size&&t.img.size[1]?t.img.size[1]:null}" decoding="async" loading="lazy" class="aspect-[240/160] object-cover w-full max-w-[48rem]">
                      `:N`
                      <img src="/_assets/img/top/noimage.jpg" width="480" height="320" decoding="async" loading="lazy" class="aspect-[240/160] object-cover w-full">
                      `}
                    <div>
                    ${t.tag?N`
                      <div class="flex gap-[1.6rem] mb-[1.2rem]">
                        ${t.tag.map(i=>N`
                            <span class="bg-prime text-reversal text-sm p-[0.1em_0.5em]">${i}</span>
                          `)}
                      </div>
                      `:null}
                    ${t.date?N`
                      <time datetime=${Qe(t.date)}>${t.date}</time>
                      `:null}
                    ${t.ttl?N`
                      <h3 class="text-prime font-bold mb-[0.8rem]">${t.ttl}</h3>
                      `:null}
                    </div>
                  </a>
                </div>
                `:null}`:N`
                ${e==this.post-1?N`
                    <div class="fadeUp">
                    <section class="md:pt-[6.4rem] pt-[3.6rem] mb-[3.2rem]">
                      <div class="contentInner">
                        ${t.date?N`
                          <span class="block md:mb-[1rem] mb-[0.8rem]">
                            <time datetime=${Qe(t.date)}>${t.date}</time>
                          </span>
                          `:null}
                        ${t.tag?N`
                          <div class="flex gap-[1.6rem] mb-[1.2rem]">
                            ${t.tag.map(i=>N`
                                <span class="bg-prime text-reversal text-sm p-[0.1em_0.5em]">${i}</span>
                              `)}
                          </div>
                          `:null}
                        ${t.ttl?N`
                          <h1 class="font-bold text-h1"><span class="c_ttl_h1__jp">${t.ttl}</span></h1>
                          `:null}
                      </div>
                    </section><!-- /下層タイトル -->
                    <section class="md:mb-[2.4rem] mb-[1.6rem]">
                      <div class="contentInner">
                        <div class="bg-highlight md:rounded-[4rem] rounded-[5.6rem] md:p-[8rem] p-[5.6rem_2.4rem]">
                          <div class="overflow-hidden rounded-[0.8rem] mb-[3.6rem]">
                            ${t.img?N`
                              <img src="${t.img.src}" width="${t.img.size&&t.img.size[0]?t.img.size[0]:null}" height="${t.img.size&&t.img.size[1]?t.img.size[1]:null}" decoding="async" loading="lazy" class="aspect-[240/160] object-cover w-full">
                              `:N`
                              <img src="/_assets/img/top/noimage.jpg" width="480" height="320" decoding="async" loading="lazy" class="aspect-[240/160] object-cover w-full">
                              `}
                          </div>
                          <div class="postContent">
                            ${t.content?N`
                              ${$n(t.content.replace(/script>/g,"スクリプト&gt;").replace(/style>/g,"スタイル&gt;"))}
                              `:N`<div>Coming soon...</div>`}
                          </div>
                        </div>
                      </div>
                    </section><!-- /ニュース詳細 -->
                    <div class="contentInner">
                      <a href="#" class="c_btn max-w-[24rem]">記事一覧に戻る</a>
                    </div>
                  </div>
                `:null}
                `}
        `)}
      </div>
      ${this.single!==!0&&this.data.length>this.visible?N`
          <nav aria-label="ページ送り">
            <ol class="c_pager fadeUp">
              ${this.page>1?N`
              <li class="c_pager_item">
                  <button class="c_pager_btn -arrow -prev"  @click=${()=>this._changePage(this.page-1)}><span class="txtHidden">前のページ</span></button>
                </li>
              `:null}
              ${Array.from({length:r}).map((t,e)=>N`
                <li class="c_pager_item">
                  <button class="c_pager_btn -number ${e==0?this.ACTIVE_CLASS_NAME:null}"  @click=${()=>this._changePage(e+1)}>${e+1}<span class="txtHidden">ページ</span></button>
                </li>
              `)}
              ${this.page<r?N`
              <li class="c_pager_item">
                  <button class="c_pager_btn -arrow -next"  @click=${()=>this._changePage(this.page+1)}><span>次のページ</span></button>
                </li>
              `:null}
            </ol>
          </nav>
          `:null}
        `}
    `}_changePage(r){const t=this.querySelectorAll(".c_pager_btn.-number");t.forEach(e=>{e.classList.remove(this.ACTIVE_CLASS_NAME)}),t[r-1].classList.add(this.ACTIVE_CLASS_NAME),this.page=r,this._maxCount=this.visible*r,this.show=this._maxCount-this.visible+1}_showSingle(r){this.post=r,this.single=!0}getQuery(){return Number(location.hash.split("#post-")[1])}_handlePopstate(){this.getQuery()?(this.post=this.getQuery(),this.single=!0):(this.single=!1,setTimeout(()=>{this._changePage(this.page)},200))}createRenderRoot(){return this}};vt([G()],ot.prototype,"src",2);vt([G()],ot.prototype,"href",2);vt([G({type:Array})],ot.prototype,"data",2);vt([G()],ot.prototype,"visible",2);vt([G()],ot.prototype,"headline",2);vt([G()],ot.prototype,"show",2);vt([G()],ot.prototype,"page",2);vt([G()],ot.prototype,"single",2);vt([G()],ot.prototype,"post",2);ot=vt([_r("news-archive")],ot);class Ln{constructor(t=!1){this.header_fix=t,document.querySelectorAll('a[href^="#"]').forEach(s=>{s.addEventListener("click",o=>{o.preventDefault();const c=s.getAttribute("href");let a;if(c){if(c==="#")a=document.body,i(a);else if(c){if(a=document.getElementById(c.replace("#","")),a&&this.header_fix){const u=document.querySelector("header"),l=u==null?void 0:u.clientHeight;a.style.scrollMarginBlockStart=String(l)+"px"}i(a)}}})});function i(s){const c=window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth";setTimeout(()=>{s==null||s.focus({preventScroll:!0}),document.activeElement!==s&&(s==null||s.setAttribute("tabindex","-1"),s==null||s.focus({preventScroll:!0})),s==null||s.scrollIntoView({behavior:c,inline:"end"})},0)}const n=location.hash;if(n){const s=document.querySelector(n);if(s){if(s&&this.header_fix){const o=document.querySelector("header"),c=o==null?void 0:o.clientHeight;s.style.scrollMarginBlockStart=String(c)+"px"}s.scrollIntoView({behavior:"instant",inline:"end"})}}}}var Tn=Object.defineProperty,xn=Object.getOwnPropertyDescriptor,qe=(r,t,e,i)=>{for(var n=i>1?void 0:i?xn(t,e):t,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(t,e,n):o(n))||n);return i&&n&&Tn(t,e,n),n};let Ht=class extends Rt{constructor(){super(...arguments),this.targets=[],this.currentIndex=0,this.prev="前のステップ",this.next="次のステップ"}connectedCallback(){super.connectedCallback();const r=this.querySelectorAll(".c_help_txt");this.targets=[...r].map(t=>t.getAttribute("slot"))}render(){const r=this.targets[this.currentIndex];return document.querySelector(`#${r}`)?N`
      <div class="c_help">
        <slot name="helpOpen" @click=${this._popoverOpen}></slot>
        <div class="c_help_pop" id="modal1" popover="manual">
          <div class="c_help_container">
            <div class="c_help_txt">
              <p class="c_help_ttl">
                <span class="c_help_icon">
                  <svg class="progress-svg -bg" viewBox="0 0 30 30">
                    <circle cx="15" cy="15" r="12"></circle>
                  </svg>
                  <svg class="progress-svg -bar" viewBox="0 0 30 30">
                    <circle cx="15" cy="15" r="12"></circle>
                  </svg>
                </span>
                <span class="stepNum">ステップ：<span class="stepNum-current">${this.currentIndex+1}</span><span class="stepNum-all">${this.targets.length}</span></span>
              </p>
              <slot name="${r}"></slot>
              ${this.currentIndex+1===this.targets.length?N`
                <span class="c_help_caution">※最後のステップです</span>`:null}
            </div>
            <button class="c_help_arrow -prev${this.currentIndex===0?" -disable":null}" tabindex="${this.currentIndex===0?-1:0}" @click=${this._handleClick}><span class="txtHidden">${this.prev}</span></button>
            <button class="c_help_arrow -next" @click=${this._handleClick}><span class="txtHidden">${this.next}</span></button>
            <button class="c_help_close" @click=${this._popoverClose}><span class="txtHidden">ヘルプを閉じる</span></button>
          </div>
        </div>
      </div>
    `:N``}_popoverOpen(){var t;const r=(t=this.shadowRoot)==null?void 0:t.querySelector(".c_help_pop");r==null||r.showPopover(),this._popSwitch()}_popoverClose(){var e,i;const r=(e=this.shadowRoot)==null?void 0:e.querySelector(".c_help_pop");r==null||r.hidePopover();const t=(i=this.shadowRoot)==null?void 0:i.querySelector(".c_help_pop");t.classList.remove("-visible"),t.style.setProperty("--targetHeight","0"),t.style.setProperty("--popY","0")}_handleClick(r){var n,s;const e=(n=r.target.querySelector(".txtHidden"))==null?void 0:n.textContent,i=(s=this.shadowRoot)==null?void 0:s.querySelector(".c_help_pop");i.classList.contains("-visible")&&i.classList.remove("-visible"),setTimeout(()=>{e===this.next&&this.currentIndex+1===this.targets.length?this._popoverClose():e===this.next&&this.currentIndex<this.targets.length?this.currentIndex++:e===this.prev&&this.currentIndex>0&&this.currentIndex--,this._popSwitch()},100)}_popSwitch(){const r=this.targets[this.currentIndex];if(r){const t=document.getElementById(r);if(t){this.smoothScroll(t);const e=new IntersectionObserver(i=>{i.forEach(n=>{n.isIntersecting&&(e.disconnect(),setTimeout(()=>{this._setPopup(t)},500))})});e.observe(t)}}}_setPopup(r){var u;const t=(u=this.shadowRoot)==null?void 0:u.querySelector(".c_help_pop"),e=r.offsetHeight,i=r.getBoundingClientRect().top,n=r.getBoundingClientRect().left,s=window.innerHeight,o=t.offsetHeight,c=s/2<i,a=Number(c===!1?e+i:i-o);t&&(t.style.setProperty("--targetHeight",`${e}px`),t.style.setProperty("--targetY",`${Number(e+i)}px`),t.style.setProperty("--popY",`${Number(a)}px`),t.style.setProperty("--popX",`${n}px`),t.style.setProperty("--progress",`${Number(24*3.14*(this.currentIndex+1)/this.targets.length)}`),t.classList.add("-visible"),c?t.classList.add("-reversal"):t.classList.remove("-reversal"))}smoothScroll(r){if(r){const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",i=document.querySelector("header");if(i){const o=window.getComputedStyle(i).position==="fixed"?i.clientHeight:0;r.scrollIntoView({behavior:e,inline:"end",block:"center"}),r.style.scrollMarginBlockStart=o+"px"}}}};Ht.styles=Ki`
    /* オーバーレイのスタイル */

    .c_help_pop {
      border: 0;
      background: none;
      position: fixed;
      inset: var(--popY) 0 auto;
      margin: auto;
      z-index: 999;
      width: fit-content;
      height: fit-content;
      padding-block: 1.5rem;

    }
    .c_help_pop::before,
    .c_help_pop::after {
      content: '';
      margin: auto;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: calc(var(--targetY) - var(--targetHeight));
      background-color: var(--color-txt);
      z-index: -1;
      opacity: 0.5;
    }

    .c_help_pop::after {
      top: auto;
      bottom: 0;
      height: calc(100% - var(--targetY));
    }

    .c_help_pop::backdrop {
      height: 0;
      pointer-events: none;
    }

    .c_help_container {
      max-width: calc(100% - 3rem);
      position: relative;
      background-color: var(--help-body);
      padding: 1rem 6.5rem 2rem;
      color: var(--color-txt);
      border-radius: 0.5rem;
      box-shadow: 0 0.22rem 0.4rem rgba(0, 0, 0, 0.2);
      opacity: 0;
      transition: opacity 0.1s;
    }
    .c_help_container::before {
      content: '';
      position: absolute;
      inset: -1rem 0 auto;
      margin: auto;
      width: 2rem;
      height: 1.5rem;
      background-color: var(--help-body);
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }
    .c_help_pop.-reversal .c_help_container::before {
      top: auto;
      bottom: -1rem;
      rotate: 180deg;
    }
    .c_help_pop.-visible .c_help_container {
      opacity: 1;
    }

    .c_help_ttl {
      display: flex;
      align-items: center;
      gap: 0.5em;
      font-size: 2.4rem;
      font-weight: bold;
      margin: 0 auto 1.6rem;
    }

    .c_help_icon {
      position: relative;
      height: 3.5rem;
      aspect-ratio: 1/1;
      display: inline-block;
    }

    .c_help_icon::after {
      content: '';
      position: absolute;
      inset: 0;
      margin: auto;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.6rem;
      font-weight: bold;
      color: var(--help-body);
    }

    .progress-svg {
      position: absolute;
      inset: 0;
      margin: auto;
      fill: none;
      stroke: var(--help-stroke);
      width: 100%;
      height: 100%;
      stroke-dasharray: calc(24 * 3.14), calc(24 * 3.14);
      stroke-width: 0.5rem;
      transform: rotate(-90deg);
    }

    .progress-svg.-bar {
      stroke-dasharray: var(--progress), calc(24 * 3.14);
      stroke: var(--help-fill);
    }

    .c_help_arrow,
    .c_help_close {
      position: absolute;
      inset: 0 0.5rem;
      margin: auto;
      height: 3rem;
      aspect-ratio: 1/1;
      background-color: var(--help-btn);
      border-radius: 50%;
      border: 0.1rem solid var(--help-border);
      cursor: pointer;
      box-shadow: 0 0.2rem 0 0 #212121;
      transition:
        translate 0.2s,
        box-shadow 0.2s;
    }

    .c_help_arrow.-disable {
      opacity: 0.35;
      pointer-events: none;
    }

    @media (hover: hover) {
      .c_help_arrow:hover,
      .c_help_close:hover {
        box-shadow: none;
        translate: 0 0.2rem;
      }
    }

    .c_help_arrow.-prev {
      right: auto;
    }

    .c_help_arrow.-next {
      left: auto;
    }

    .c_help_arrow::after {
      content: '';
      position: absolute;
      inset: 0 0.4rem 0 0;
      margin: auto;
      height: 0.8rem;
      aspect-ratio: 1/1;
      display: flex;
      border: 0.2rem solid var(--help-arrow);
      border-width: 0.2rem 0.2rem 0 0;
      rotate: 45deg;
    }

    .c_help_arrow.-prev::after {
      rotate: 225deg;
      inset: 0 0 0 0.4rem;
    }

    .c_help_close {
      inset: 0.5rem 0.5rem auto auto;
      height: 2rem;
    }

    .c_help_close::before,
    .c_help_close::after {
      content: '';
      position: absolute;
      inset: 0;
      margin: auto;
      width: 0.2rem;
      height: 60%;
      background-color: var(--help-arrow);
    }

    .c_help_close::before {
      rotate: 45deg;
    }
    .c_help_close::after {
      rotate: -45deg;
    }

    .txtHidden {
      position: absolute;
      width: 0.1rem;
      height: 0.1rem;
      overflow: hidden;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      white-space: nowrap;
    }

    .c_help_caution {
      color: var(--help-caution);
      font-weight: 500;
    }

    .stepNum-current {
      font-size: 120%;
      position: relative;
      padding-right: 0.3em;
      color: var(--help-fill);
    }
    .stepNum-current::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 0.3rem;
      height: 70%;
      background-color: var(--help-stroke);
      rotate: 25deg;
    }
    .stepNum-all {
      font-size: 70%;
      vertical-align: bottom;
      font-weight: 600;
      margin-left: 0.3em;
      color: var(--help-stroke);
    }
    @media screen and (width >= 768px) {
      .c_help_pop {
        right: auto;
        left:  var(--popX);
        padding-right: 2rem;
      }
      .c_help_container::before {
        right: auto;
        left: 1rem;
      }
    }

  `;qe([G({type:Array})],Ht.prototype,"targets",2);qe([_n()],Ht.prototype,"currentIndex",2);qe([G()],Ht.prototype,"prev",2);Ht=qe([_r("guide-tour")],Ht);function Pn(r,t){for(var e=0;e<t.length;e++){var i=t[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(r,i.key,i)}}function In(r,t,e){return t&&Pn(r.prototype,t),Object.defineProperty(r,"prototype",{writable:!1}),r}/*!
 * Splide.js
 * Version  : 4.1.4
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */var Wr="(prefers-reduced-motion: reduce)",Wt=1,Nn=2,Kt=3,Qt=4,ye=5,Pe=6,Me=7,On={CREATED:Wt,MOUNTED:Nn,IDLE:Kt,MOVING:Qt,SCROLLING:ye,DRAGGING:Pe,DESTROYED:Me};function Et(r){r.length=0}function Tt(r,t,e){return Array.prototype.slice.call(r,t,e)}function q(r){return r.bind.apply(r,[null].concat(Tt(arguments,1)))}var di=setTimeout,cr=function(){};function jr(r){return requestAnimationFrame(r)}function Be(r,t){return typeof t===r}function ue(r){return!Er(r)&&Be("object",r)}var yr=Array.isArray,fi=q(Be,"function"),wt=q(Be,"string"),Ee=q(Be,"undefined");function Er(r){return r===null}function vi(r){try{return r instanceof(r.ownerDocument.defaultView||window).HTMLElement}catch{return!1}}function Ae(r){return yr(r)?r:[r]}function at(r,t){Ae(r).forEach(t)}function Ar(r,t){return r.indexOf(t)>-1}function Ie(r,t){return r.push.apply(r,Ae(t)),r}function mt(r,t,e){r&&at(t,function(i){i&&r.classList[e?"add":"remove"](i)})}function ht(r,t){mt(r,wt(t)?t.split(" "):t,!0)}function be(r,t){at(t,r.appendChild.bind(r))}function br(r,t){at(r,function(e){var i=(t||e).parentNode;i&&i.insertBefore(e,t)})}function he(r,t){return vi(r)&&(r.msMatchesSelector||r.matches).call(r,t)}function pi(r,t){var e=r?Tt(r.children):[];return t?e.filter(function(i){return he(i,t)}):e}function Se(r,t){return t?pi(r,t)[0]:r.firstElementChild}var de=Object.keys;function Dt(r,t,e){return r&&(e?de(r).reverse():de(r)).forEach(function(i){i!=="__proto__"&&t(r[i],i)}),r}function fe(r){return Tt(arguments,1).forEach(function(t){Dt(t,function(e,i){r[i]=t[i]})}),r}function St(r){return Tt(arguments,1).forEach(function(t){Dt(t,function(e,i){yr(e)?r[i]=e.slice():ue(e)?r[i]=St({},ue(r[i])?r[i]:{},e):r[i]=e})}),r}function Gr(r,t){at(t||de(r),function(e){delete r[e]})}function dt(r,t){at(r,function(e){at(t,function(i){e&&e.removeAttribute(i)})})}function k(r,t,e){ue(t)?Dt(t,function(i,n){k(r,n,i)}):at(r,function(i){Er(e)||e===""?dt(i,t):i.setAttribute(t,String(e))})}function Gt(r,t,e){var i=document.createElement(r);return t&&(wt(t)?ht(i,t):k(i,t)),e&&be(e,i),i}function ct(r,t,e){if(Ee(e))return getComputedStyle(r)[t];Er(e)||(r.style[t]=""+e)}function ve(r,t){ct(r,"display",t)}function gi(r){r.setActive&&r.setActive()||r.focus({preventScroll:!0})}function lt(r,t){return r.getAttribute(t)}function Yr(r,t){return r&&r.classList.contains(t)}function nt(r){return r.getBoundingClientRect()}function Ut(r){at(r,function(t){t&&t.parentNode&&t.parentNode.removeChild(t)})}function mi(r){return Se(new DOMParser().parseFromString(r,"text/html").body)}function gt(r,t){r.preventDefault(),t&&(r.stopPropagation(),r.stopImmediatePropagation())}function _i(r,t){return r&&r.querySelector(t)}function Sr(r,t){return t?Tt(r.querySelectorAll(t)):[]}function _t(r,t){mt(r,t,!1)}function lr(r){return r.timeStamp}function Nt(r){return wt(r)?r:r?r+"px":""}var $e="splide",$r="data-"+$e;function se(r,t){if(!r)throw new Error("["+$e+"] "+(t||""))}var Ct=Math.min,ke=Math.max,He=Math.floor,pe=Math.ceil,et=Math.abs;function yi(r,t,e){return et(r-t)<e}function Ne(r,t,e,i){var n=Ct(t,e),s=ke(t,e);return i?n<r&&r<s:n<=r&&r<=s}function Bt(r,t,e){var i=Ct(t,e),n=ke(t,e);return Ct(ke(i,r),n)}function ur(r){return+(r>0)-+(r<0)}function hr(r,t){return at(t,function(e){r=r.replace("%s",""+e)}),r}function wr(r){return r<10?"0"+r:""+r}var Xr={};function Rn(r){return""+r+wr(Xr[r]=(Xr[r]||0)+1)}function Ei(){var r=[];function t(o,c,a,u){n(o,c,function(l,f,h){var p="addEventListener"in l,d=p?l.removeEventListener.bind(l,f,a,u):l.removeListener.bind(l,a);p?l.addEventListener(f,a,u):l.addListener(a),r.push([l,f,h,a,d])})}function e(o,c,a){n(o,c,function(u,l,f){r=r.filter(function(h){return h[0]===u&&h[1]===l&&h[2]===f&&(!a||h[3]===a)?(h[4](),!1):!0})})}function i(o,c,a){var u,l=!0;return typeof CustomEvent=="function"?u=new CustomEvent(c,{bubbles:l,detail:a}):(u=document.createEvent("CustomEvent"),u.initCustomEvent(c,l,!1,a)),o.dispatchEvent(u),u}function n(o,c,a){at(o,function(u){u&&at(c,function(l){l.split(" ").forEach(function(f){var h=f.split(".");a(u,h[0],h[1])})})})}function s(){r.forEach(function(o){o[4]()}),Et(r)}return{bind:t,unbind:e,dispatch:i,destroy:s}}var Vt="mounted",Kr="ready",Lt="move",we="moved",Ai="click",Dn="active",Mn="inactive",kn="visible",Hn="hidden",K="refresh",rt="updated",ge="resize",Cr="resized",Un="drag",zn="dragging",Vn="dragged",Lr="scroll",Jt="scrolled",qn="overflow",bi="destroy",Bn="arrows:mounted",Fn="arrows:updated",Wn="pagination:mounted",jn="pagination:updated",Si="navigation:mounted",$i="autoplay:play",Gn="autoplay:playing",wi="autoplay:pause",Ci="lazyload:loaded",Li="sk",Ti="sh",Ue="ei";function W(r){var t=r?r.event.bus:document.createDocumentFragment(),e=Ei();function i(s,o){e.bind(t,Ae(s).join(" "),function(c){o.apply(o,yr(c.detail)?c.detail:[])})}function n(s){e.dispatch(t,s,Tt(arguments,1))}return r&&r.event.on(bi,e.destroy),fe(e,{bus:t,on:i,off:q(e.unbind,t),emit:n})}function Fe(r,t,e,i){var n=Date.now,s,o=0,c,a=!0,u=0;function l(){if(!a){if(o=r?Ct((n()-s)/r,1):1,e&&e(o),o>=1&&(t(),s=n(),i&&++u>=i))return h();c=jr(l)}}function f(y){y||d(),s=n()-(y?o*r:0),a=!1,c=jr(l)}function h(){a=!0}function p(){s=n(),o=0,e&&e(o)}function d(){c&&cancelAnimationFrame(c),o=0,c=0,a=!0}function v(y){r=y}function m(){return a}return{start:f,rewind:p,pause:h,cancel:d,set:v,isPaused:m}}function Yn(r){var t=r;function e(n){t=n}function i(n){return Ar(Ae(n),t)}return{set:e,is:i}}function Xn(r,t){var e=Fe(0,r,null,1);return function(){e.isPaused()&&e.start()}}function Kn(r,t,e){var i=r.state,n=e.breakpoints||{},s=e.reducedMotion||{},o=Ei(),c=[];function a(){var d=e.mediaQuery==="min";de(n).sort(function(v,m){return d?+v-+m:+m-+v}).forEach(function(v){l(n[v],"("+(d?"min":"max")+"-width:"+v+"px)")}),l(s,Wr),f()}function u(d){d&&o.destroy()}function l(d,v){var m=matchMedia(v);o.bind(m,"change",f),c.push([d,m])}function f(){var d=i.is(Me),v=e.direction,m=c.reduce(function(y,_){return St(y,_[1].matches?_[0]:{})},{});Gr(e),p(m),e.destroy?r.destroy(e.destroy==="completely"):d?(u(!0),r.mount()):v!==e.direction&&r.refresh()}function h(d){matchMedia(Wr).matches&&(d?St(e,s):Gr(e,de(s)))}function p(d,v,m){St(e,d),v&&St(Object.getPrototypeOf(e),d),(m||!i.is(Wt))&&r.emit(rt,e)}return{setup:a,destroy:u,reduce:h,set:p}}var We="Arrow",je=We+"Left",Ge=We+"Right",xi=We+"Up",Pi=We+"Down",Zr="rtl",Ye="ttb",ir={width:["height"],left:["top","right"],right:["bottom","left"],x:["y"],X:["Y"],Y:["X"],ArrowLeft:[xi,Ge],ArrowRight:[Pi,je]};function Zn(r,t,e){function i(s,o,c){c=c||e.direction;var a=c===Zr&&!o?1:c===Ye?0:-1;return ir[s]&&ir[s][a]||s.replace(/width|left|right/i,function(u,l){var f=ir[u.toLowerCase()][a]||u;return l>0?f.charAt(0).toUpperCase()+f.slice(1):f})}function n(s){return s*(e.direction===Zr?1:-1)}return{resolve:i,orient:n}}var yt="role",Yt="tabindex",Qn="disabled",ut="aria-",Ce=ut+"controls",Ii=ut+"current",Qr=ut+"selected",st=ut+"label",Tr=ut+"labelledby",Ni=ut+"hidden",xr=ut+"orientation",me=ut+"roledescription",Jr=ut+"live",ti=ut+"busy",ei=ut+"atomic",Pr=[yt,Yt,Qn,Ce,Ii,st,Tr,Ni,xr,me],pt=$e+"__",xt="is-",nr=$e,ri=pt+"track",Jn=pt+"list",Xe=pt+"slide",Oi=Xe+"--clone",ts=Xe+"__container",Ir=pt+"arrows",Ke=pt+"arrow",Ri=Ke+"--prev",Di=Ke+"--next",Ze=pt+"pagination",Mi=Ze+"__page",es=pt+"progress",rs=es+"__bar",is=pt+"toggle",ns=pt+"spinner",ss=pt+"sr",os=xt+"initialized",zt=xt+"active",ki=xt+"prev",Hi=xt+"next",dr=xt+"visible",fr=xt+"loading",Ui=xt+"focus-in",zi=xt+"overflow",as=[zt,dr,ki,Hi,fr,Ui,zi],cs={slide:Xe,clone:Oi,arrows:Ir,arrow:Ke,prev:Ri,next:Di,pagination:Ze,page:Mi,spinner:ns};function ls(r,t){if(fi(r.closest))return r.closest(t);for(var e=r;e&&e.nodeType===1&&!he(e,t);)e=e.parentElement;return e}var us=5,ii=200,Vi="touchstart mousedown",sr="touchmove mousemove",or="touchend touchcancel mouseup click";function hs(r,t,e){var i=W(r),n=i.on,s=i.bind,o=r.root,c=e.i18n,a={},u=[],l=[],f=[],h,p,d;function v(){g(),O(),_()}function m(){n(K,y),n(K,v),n(rt,_),s(document,Vi+" keydown",function(A){d=A.type==="keydown"},{capture:!0}),s(o,"focusin",function(){mt(o,Ui,!!d)})}function y(A){var T=Pr.concat("style");Et(u),_t(o,l),_t(h,f),dt([h,p],T),dt(o,A?T:["style",me])}function _(){_t(o,l),_t(h,f),l=D(nr),f=D(ri),ht(o,l),ht(h,f),k(o,st,e.label),k(o,Tr,e.labelledby)}function g(){h=L("."+ri),p=Se(h,"."+Jn),se(h&&p,"A track/list element is missing."),Ie(u,pi(p,"."+Xe+":not(."+Oi+")")),Dt({arrows:Ir,pagination:Ze,prev:Ri,next:Di,bar:rs,toggle:is},function(A,T){a[T]=L("."+A)}),fe(a,{root:o,track:h,list:p,slides:u})}function O(){var A=o.id||Rn($e),T=e.role;o.id=A,h.id=h.id||A+"-track",p.id=p.id||A+"-list",!lt(o,yt)&&o.tagName!=="SECTION"&&T&&k(o,yt,T),k(o,me,c.carousel),k(p,yt,"presentation")}function L(A){var T=_i(o,A);return T&&ls(T,"."+nr)===o?T:void 0}function D(A){return[A+"--"+e.type,A+"--"+e.direction,e.drag&&A+"--draggable",e.isNavigation&&A+"--nav",A===nr&&zt]}return fe(a,{setup:v,mount:m,destroy:y})}var Zt="slide",te="loop",Le="fade";function ds(r,t,e,i){var n=W(r),s=n.on,o=n.emit,c=n.bind,a=r.Components,u=r.root,l=r.options,f=l.isNavigation,h=l.updateOnMove,p=l.i18n,d=l.pagination,v=l.slideFocus,m=a.Direction.resolve,y=lt(i,"style"),_=lt(i,st),g=e>-1,O=Se(i,"."+ts),L;function D(){g||(i.id=u.id+"-slide"+wr(t+1),k(i,yt,d?"tabpanel":"group"),k(i,me,p.slide),k(i,st,_||hr(p.slideLabel,[t+1,r.length]))),A()}function A(){c(i,"click",q(o,Ai,R)),c(i,"keydown",q(o,Li,R)),s([we,Ti,Jt],S),s(Si,U),h&&s(Lt,I)}function T(){L=!0,n.destroy(),_t(i,as),dt(i,Pr),k(i,"style",y),k(i,st,_||"")}function U(){var P=r.splides.map(function(b){var x=b.splide.Components.Slides.getAt(t);return x?x.slide.id:""}).join(" ");k(i,st,hr(p.slideX,(g?e:t)+1)),k(i,Ce,P),k(i,yt,v?"button":""),v&&dt(i,me)}function I(){L||S()}function S(){if(!L){var P=r.index;$(),w(),mt(i,ki,t===P-1),mt(i,Hi,t===P+1)}}function $(){var P=H();P!==Yr(i,zt)&&(mt(i,zt,P),k(i,Ii,f&&P||""),o(P?Dn:Mn,R))}function w(){var P=j(),b=!P&&(!H()||g);if(r.state.is([Qt,ye])||k(i,Ni,b||""),k(Sr(i,l.focusableNodes||""),Yt,b?-1:""),v&&k(i,Yt,b?-1:0),P!==Yr(i,dr)&&(mt(i,dr,P),o(P?kn:Hn,R)),!P&&document.activeElement===i){var x=a.Slides.getAt(r.index);x&&gi(x.slide)}}function M(P,b,x){ct(x&&O||i,P,b)}function H(){var P=r.index;return P===t||l.cloneStatus&&P===e}function j(){if(r.is(Le))return H();var P=nt(a.Elements.track),b=nt(i),x=m("left",!0),z=m("right",!0);return He(P[x])<=pe(b[x])&&He(b[z])<=pe(P[z])}function F(P,b){var x=et(P-t);return!g&&(l.rewind||r.is(te))&&(x=Ct(x,r.length-x)),x<=b}var R={index:t,slideIndex:e,slide:i,container:O,isClone:g,mount:D,destroy:T,update:S,style:M,isWithin:F};return R}function fs(r,t,e){var i=W(r),n=i.on,s=i.emit,o=i.bind,c=t.Elements,a=c.slides,u=c.list,l=[];function f(){h(),n(K,p),n(K,h)}function h(){a.forEach(function(S,$){v(S,$,-1)})}function p(){L(function(S){S.destroy()}),Et(l)}function d(){L(function(S){S.update()})}function v(S,$,w){var M=ds(r,$,w,S);M.mount(),l.push(M),l.sort(function(H,j){return H.index-j.index})}function m(S){return S?D(function($){return!$.isClone}):l}function y(S){var $=t.Controller,w=$.toIndex(S),M=$.hasFocus()?1:e.perPage;return D(function(H){return Ne(H.index,w,w+M-1)})}function _(S){return D(S)[0]}function g(S,$){at(S,function(w){if(wt(w)&&(w=mi(w)),vi(w)){var M=a[$];M?br(w,M):be(u,w),ht(w,e.classes.slide),T(w,q(s,ge))}}),s(K)}function O(S){Ut(D(S).map(function($){return $.slide})),s(K)}function L(S,$){m($).forEach(S)}function D(S){return l.filter(fi(S)?S:function($){return wt(S)?he($.slide,S):Ar(Ae(S),$.index)})}function A(S,$,w){L(function(M){M.style(S,$,w)})}function T(S,$){var w=Sr(S,"img"),M=w.length;M?w.forEach(function(H){o(H,"load error",function(){--M||$()})}):$()}function U(S){return S?a.length:l.length}function I(){return l.length>e.perPage}return{mount:f,destroy:p,update:d,register:v,get:m,getIn:y,getAt:_,add:g,remove:O,forEach:L,filter:D,style:A,getLength:U,isEnough:I}}function vs(r,t,e){var i=W(r),n=i.on,s=i.bind,o=i.emit,c=t.Slides,a=t.Direction.resolve,u=t.Elements,l=u.root,f=u.track,h=u.list,p=c.getAt,d=c.style,v,m,y;function _(){g(),s(window,"resize load",Xn(q(o,ge))),n([rt,K],g),n(ge,O)}function g(){v=e.direction===Ye,ct(l,"maxWidth",Nt(e.width)),ct(f,a("paddingLeft"),L(!1)),ct(f,a("paddingRight"),L(!0)),O(!0)}function O(R){var P=nt(l);(R||m.width!==P.width||m.height!==P.height)&&(ct(f,"height",D()),d(a("marginRight"),Nt(e.gap)),d("width",T()),d("height",U(),!0),m=P,o(Cr),y!==(y=F())&&(mt(l,zi,y),o(qn,y)))}function L(R){var P=e.padding,b=a(R?"right":"left");return P&&Nt(P[b]||(ue(P)?0:P))||"0px"}function D(){var R="";return v&&(R=A(),se(R,"height or heightRatio is missing."),R="calc("+R+" - "+L(!1)+" - "+L(!0)+")"),R}function A(){return Nt(e.height||nt(h).width*e.heightRatio)}function T(){return e.autoWidth?null:Nt(e.fixedWidth)||(v?"":I())}function U(){return Nt(e.fixedHeight)||(v?e.autoHeight?null:I():A())}function I(){var R=Nt(e.gap);return"calc((100%"+(R&&" + "+R)+")/"+(e.perPage||1)+(R&&" - "+R)+")"}function S(){return nt(h)[a("width")]}function $(R,P){var b=p(R||0);return b?nt(b.slide)[a("width")]+(P?0:H()):0}function w(R,P){var b=p(R);if(b){var x=nt(b.slide)[a("right")],z=nt(h)[a("left")];return et(x-z)+(P?0:H())}return 0}function M(R){return w(r.length-1)-w(0)+$(0,R)}function H(){var R=p(0);return R&&parseFloat(ct(R.slide,a("marginRight")))||0}function j(R){return parseFloat(ct(f,a("padding"+(R?"Right":"Left"))))||0}function F(){return r.is(Le)||M(!0)>S()}return{mount:_,resize:O,listSize:S,slideSize:$,sliderSize:M,totalSize:w,getPadding:j,isOverflow:F}}var ps=2;function gs(r,t,e){var i=W(r),n=i.on,s=t.Elements,o=t.Slides,c=t.Direction.resolve,a=[],u;function l(){n(K,f),n([rt,ge],p),(u=m())&&(d(u),t.Layout.resize(!0))}function f(){h(),l()}function h(){Ut(a),Et(a),i.destroy()}function p(){var y=m();u!==y&&(u<y||!y)&&i.emit(K)}function d(y){var _=o.get().slice(),g=_.length;if(g){for(;_.length<y;)Ie(_,_);Ie(_.slice(-y),_.slice(0,y)).forEach(function(O,L){var D=L<y,A=v(O.slide,L);D?br(A,_[0].slide):be(s.list,A),Ie(a,A),o.register(A,L-y+(D?0:g),O.index)})}}function v(y,_){var g=y.cloneNode(!0);return ht(g,e.classes.clone),g.id=r.root.id+"-clone"+wr(_+1),g}function m(){var y=e.clones;if(!r.is(te))y=0;else if(Ee(y)){var _=e[c("fixedWidth")]&&t.Layout.slideSize(0),g=_&&pe(nt(s.track)[c("width")]/_);y=g||e[c("autoWidth")]&&r.length||e.perPage*ps}return y}return{mount:l,destroy:h}}function ms(r,t,e){var i=W(r),n=i.on,s=i.emit,o=r.state.set,c=t.Layout,a=c.slideSize,u=c.getPadding,l=c.totalSize,f=c.listSize,h=c.sliderSize,p=t.Direction,d=p.resolve,v=p.orient,m=t.Elements,y=m.list,_=m.track,g;function O(){g=t.Transition,n([Vt,Cr,rt,K],L)}function L(){t.Controller.isBusy()||(t.Scroll.cancel(),A(r.index),t.Slides.update())}function D(b,x,z,Q){b!==x&&R(b>z)&&(S(),T(I(M(),b>z),!0)),o(Qt),s(Lt,x,z,b),g.start(x,function(){o(Kt),s(we,x,z,b),Q&&Q()})}function A(b){T(w(b,!0))}function T(b,x){if(!r.is(Le)){var z=x?b:U(b);ct(y,"transform","translate"+d("X")+"("+z+"px)"),b!==z&&s(Ti)}}function U(b){if(r.is(te)){var x=$(b),z=x>t.Controller.getEnd(),Q=x<0;(Q||z)&&(b=I(b,z))}return b}function I(b,x){var z=b-F(x),Q=h();return b-=v(Q*(pe(et(z)/Q)||1))*(x?1:-1),b}function S(){T(M(),!0),g.cancel()}function $(b){for(var x=t.Slides.get(),z=0,Q=1/0,Z=0;Z<x.length;Z++){var At=x[Z].index,E=et(w(At,!0)-b);if(E<=Q)Q=E,z=At;else break}return z}function w(b,x){var z=v(l(b-1)-j(b));return x?H(z):z}function M(){var b=d("left");return nt(y)[b]-nt(_)[b]+v(u(!1))}function H(b){return e.trimSpace&&r.is(Zt)&&(b=Bt(b,0,v(h(!0)-f()))),b}function j(b){var x=e.focus;return x==="center"?(f()-a(b,!0))/2:+x*a(b)||0}function F(b){return w(b?t.Controller.getEnd():0,!!e.trimSpace)}function R(b){var x=v(I(M(),b));return b?x>=0:x<=y[d("scrollWidth")]-nt(_)[d("width")]}function P(b,x){x=Ee(x)?M():x;var z=b!==!0&&v(x)<v(F(!1)),Q=b!==!1&&v(x)>v(F(!0));return z||Q}return{mount:O,move:D,jump:A,translate:T,shift:I,cancel:S,toIndex:$,toPosition:w,getPosition:M,getLimit:F,exceededLimit:P,reposition:L}}function _s(r,t,e){var i=W(r),n=i.on,s=i.emit,o=t.Move,c=o.getPosition,a=o.getLimit,u=o.toPosition,l=t.Slides,f=l.isEnough,h=l.getLength,p=e.omitEnd,d=r.is(te),v=r.is(Zt),m=q(M,!1),y=q(M,!0),_=e.start||0,g,O=_,L,D,A;function T(){U(),n([rt,K,Ue],U),n(Cr,I)}function U(){L=h(!0),D=e.perMove,A=e.perPage,g=R();var E=Bt(_,0,p?g:L-1);E!==_&&(_=E,o.reposition())}function I(){g!==R()&&s(Ue)}function S(E,V,tt){if(!At()){var Y=w(E),J=F(Y);J>-1&&(V||J!==_)&&(z(J),o.move(Y,J,O,tt))}}function $(E,V,tt,Y){t.Scroll.scroll(E,V,tt,function(){var J=F(o.toIndex(c()));z(p?Ct(J,g):J),Y&&Y()})}function w(E){var V=_;if(wt(E)){var tt=E.match(/([+\-<>])(\d+)?/)||[],Y=tt[1],J=tt[2];Y==="+"||Y==="-"?V=H(_+ +(""+Y+(+J||1)),_):Y===">"?V=J?P(+J):m(!0):Y==="<"&&(V=y(!0))}else V=d?E:Bt(E,0,g);return V}function M(E,V){var tt=D||(Z()?1:A),Y=H(_+tt*(E?-1:1),_,!(D||Z()));return Y===-1&&v&&!yi(c(),a(!E),1)?E?0:g:V?Y:F(Y)}function H(E,V,tt){if(f()||Z()){var Y=j(E);Y!==E&&(V=E,E=Y,tt=!1),E<0||E>g?!D&&(Ne(0,E,V,!0)||Ne(g,V,E,!0))?E=P(b(E)):d?E=tt?E<0?-(L%A||A):L:E:e.rewind?E=E<0?g:0:E=-1:tt&&E!==V&&(E=P(b(V)+(E<V?-1:1)))}else E=-1;return E}function j(E){if(v&&e.trimSpace==="move"&&E!==_)for(var V=c();V===u(E,!0)&&Ne(E,0,r.length-1,!e.rewind);)E<_?--E:++E;return E}function F(E){return d?(E+L)%L||0:E}function R(){for(var E=L-(Z()||d&&D?1:A);p&&E-- >0;)if(u(L-1,!0)!==u(E,!0)){E++;break}return Bt(E,0,L-1)}function P(E){return Bt(Z()?E:A*E,0,g)}function b(E){return Z()?Ct(E,g):He((E>=g?L-1:E)/A)}function x(E){var V=o.toIndex(E);return v?Bt(V,0,g):V}function z(E){E!==_&&(O=_,_=E)}function Q(E){return E?O:_}function Z(){return!Ee(e.focus)||e.isNavigation}function At(){return r.state.is([Qt,ye])&&!!e.waitForTransition}return{mount:T,go:S,scroll:$,getNext:m,getPrev:y,getAdjacent:M,getEnd:R,setIndex:z,getIndex:Q,toIndex:P,toPage:b,toDest:x,hasFocus:Z,isBusy:At}}var ys="http://www.w3.org/2000/svg",Es="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z",Te=40;function As(r,t,e){var i=W(r),n=i.on,s=i.bind,o=i.emit,c=e.classes,a=e.i18n,u=t.Elements,l=t.Controller,f=u.arrows,h=u.track,p=f,d=u.prev,v=u.next,m,y,_={};function g(){L(),n(rt,O)}function O(){D(),g()}function L(){var $=e.arrows;$&&!(d&&v)&&U(),d&&v&&(fe(_,{prev:d,next:v}),ve(p,$?"":"none"),ht(p,y=Ir+"--"+e.direction),$&&(A(),S(),k([d,v],Ce,h.id),o(Bn,d,v)))}function D(){i.destroy(),_t(p,y),m?(Ut(f?[d,v]:p),d=v=null):dt([d,v],Pr)}function A(){n([Vt,we,K,Jt,Ue],S),s(v,"click",q(T,">")),s(d,"click",q(T,"<"))}function T($){l.go($,!0)}function U(){p=f||Gt("div",c.arrows),d=I(!0),v=I(!1),m=!0,be(p,[d,v]),!f&&br(p,h)}function I($){var w='<button class="'+c.arrow+" "+($?c.prev:c.next)+'" type="button"><svg xmlns="'+ys+'" viewBox="0 0 '+Te+" "+Te+'" width="'+Te+'" height="'+Te+'" focusable="false"><path d="'+(e.arrowPath||Es)+'" />';return mi(w)}function S(){if(d&&v){var $=r.index,w=l.getPrev(),M=l.getNext(),H=w>-1&&$<w?a.last:a.prev,j=M>-1&&$>M?a.first:a.next;d.disabled=w<0,v.disabled=M<0,k(d,st,H),k(v,st,j),o(Fn,d,v,w,M)}}return{arrows:_,mount:g,destroy:D,update:S}}var bs=$r+"-interval";function Ss(r,t,e){var i=W(r),n=i.on,s=i.bind,o=i.emit,c=Fe(e.interval,r.go.bind(r,">"),A),a=c.isPaused,u=t.Elements,l=t.Elements,f=l.root,h=l.toggle,p=e.autoplay,d,v,m=p==="pause";function y(){p&&(_(),h&&k(h,Ce,u.track.id),m||g(),D())}function _(){e.pauseOnHover&&s(f,"mouseenter mouseleave",function(U){d=U.type==="mouseenter",L()}),e.pauseOnFocus&&s(f,"focusin focusout",function(U){v=U.type==="focusin",L()}),h&&s(h,"click",function(){m?g():O(!0)}),n([Lt,Lr,K],c.rewind),n(Lt,T)}function g(){a()&&t.Slides.isEnough()&&(c.start(!e.resetProgress),v=d=m=!1,D(),o($i))}function O(U){U===void 0&&(U=!0),m=!!U,D(),a()||(c.pause(),o(wi))}function L(){m||(d||v?O(!1):g())}function D(){h&&(mt(h,zt,!m),k(h,st,e.i18n[m?"play":"pause"]))}function A(U){var I=u.bar;I&&ct(I,"width",U*100+"%"),o(Gn,U)}function T(U){var I=t.Slides.getAt(U);c.set(I&&+lt(I.slide,bs)||e.interval)}return{mount:y,destroy:c.cancel,play:g,pause:O,isPaused:a}}function $s(r,t,e){var i=W(r),n=i.on;function s(){e.cover&&(n(Ci,q(c,!0)),n([Vt,rt,K],q(o,!0)))}function o(a){t.Slides.forEach(function(u){var l=Se(u.container||u.slide,"img");l&&l.src&&c(a,l,u)})}function c(a,u,l){l.style("background",a?'center/cover no-repeat url("'+u.src+'")':"",!0),ve(u,a?"none":"")}return{mount:s,destroy:q(o,!1)}}var ws=10,Cs=600,Ls=.6,Ts=1.5,xs=800;function Ps(r,t,e){var i=W(r),n=i.on,s=i.emit,o=r.state.set,c=t.Move,a=c.getPosition,u=c.getLimit,l=c.exceededLimit,f=c.translate,h=r.is(Zt),p,d,v=1;function m(){n(Lt,O),n([rt,K],L)}function y(A,T,U,I,S){var $=a();if(O(),U&&(!h||!l())){var w=t.Layout.sliderSize(),M=ur(A)*w*He(et(A)/w)||0;A=c.toPosition(t.Controller.toDest(A%w))+M}var H=yi($,A,1);v=1,T=H?0:T||ke(et(A-$)/Ts,xs),d=I,p=Fe(T,_,q(g,$,A,S),1),o(ye),s(Lr),p.start()}function _(){o(Kt),d&&d(),s(Jt)}function g(A,T,U,I){var S=a(),$=A+(T-A)*D(I),w=($-S)*v;f(S+w),h&&!U&&l()&&(v*=Ls,et(w)<ws&&y(u(l(!0)),Cs,!1,d,!0))}function O(){p&&p.cancel()}function L(){p&&!p.isPaused()&&(O(),_())}function D(A){var T=e.easingFunc;return T?T(A):1-Math.pow(1-A,4)}return{mount:m,destroy:O,scroll:y,cancel:L}}var Ft={passive:!1,capture:!0};function Is(r,t,e){var i=W(r),n=i.on,s=i.emit,o=i.bind,c=i.unbind,a=r.state,u=t.Move,l=t.Scroll,f=t.Controller,h=t.Elements.track,p=t.Media.reduce,d=t.Direction,v=d.resolve,m=d.orient,y=u.getPosition,_=u.exceededLimit,g,O,L,D,A,T=!1,U,I,S;function $(){o(h,sr,cr,Ft),o(h,or,cr,Ft),o(h,Vi,M,Ft),o(h,"click",F,{capture:!0}),o(h,"dragstart",gt),n([Vt,rt],w)}function w(){var C=e.drag;Or(!C),D=C==="free"}function M(C){if(U=!1,!I){var B=J(C);Y(C.target)&&(B||!C.button)&&(f.isBusy()?gt(C,!0):(S=B?h:window,A=a.is([Qt,ye]),L=null,o(S,sr,H,Ft),o(S,or,j,Ft),u.cancel(),l.cancel(),R(C)))}}function H(C){if(a.is(Pe)||(a.set(Pe),s(Un)),C.cancelable)if(A){u.translate(g+tt(Z(C)));var B=At(C)>ii,Pt=T!==(T=_());(B||Pt)&&R(C),U=!0,s(zn),gt(C)}else x(C)&&(A=b(C),gt(C))}function j(C){a.is(Pe)&&(a.set(Kt),s(Vn)),A&&(P(C),gt(C)),c(S,sr,H),c(S,or,j),A=!1}function F(C){!I&&U&&gt(C,!0)}function R(C){L=O,O=C,g=y()}function P(C){var B=z(C),Pt=Q(B),ee=e.rewind&&e.rewindByDrag;p(!1),D?f.scroll(Pt,0,e.snap):r.is(Le)?f.go(m(ur(B))<0?ee?"<":"-":ee?">":"+"):r.is(Zt)&&T&&ee?f.go(_(!0)?">":"<"):f.go(f.toDest(Pt),!0),p(!0)}function b(C){var B=e.dragMinThreshold,Pt=ue(B),ee=Pt&&B.mouse||0,Bi=(Pt?B.touch:+B)||10;return et(Z(C))>(J(C)?Bi:ee)}function x(C){return et(Z(C))>et(Z(C,!0))}function z(C){if(r.is(te)||!T){var B=At(C);if(B&&B<ii)return Z(C)/B}return 0}function Q(C){return y()+ur(C)*Ct(et(C)*(e.flickPower||600),D?1/0:t.Layout.listSize()*(e.flickMaxPages||1))}function Z(C,B){return V(C,B)-V(E(C),B)}function At(C){return lr(C)-lr(E(C))}function E(C){return O===C&&L||O}function V(C,B){return(J(C)?C.changedTouches[0]:C)["page"+v(B?"Y":"X")]}function tt(C){return C/(T&&r.is(Zt)?us:1)}function Y(C){var B=e.noDrag;return!he(C,"."+Mi+", ."+Ke)&&(!B||!he(C,B))}function J(C){return typeof TouchEvent<"u"&&C instanceof TouchEvent}function qi(){return A}function Or(C){I=C}return{mount:$,disable:Or,isDragging:qi}}var Ns={Spacebar:" ",Right:Ge,Left:je,Up:xi,Down:Pi};function Nr(r){return r=wt(r)?r:r.key,Ns[r]||r}var ni="keydown";function Os(r,t,e){var i=W(r),n=i.on,s=i.bind,o=i.unbind,c=r.root,a=t.Direction.resolve,u,l;function f(){h(),n(rt,p),n(rt,h),n(Lt,v)}function h(){var y=e.keyboard;y&&(u=y==="global"?window:c,s(u,ni,m))}function p(){o(u,ni)}function d(y){l=y}function v(){var y=l;l=!0,di(function(){l=y})}function m(y){if(!l){var _=Nr(y);_===a(je)?r.go("<"):_===a(Ge)&&r.go(">")}}return{mount:f,destroy:p,disable:d}}var oe=$r+"-lazy",Oe=oe+"-srcset",Rs="["+oe+"], ["+Oe+"]";function Ds(r,t,e){var i=W(r),n=i.on,s=i.off,o=i.bind,c=i.emit,a=e.lazyLoad==="sequential",u=[we,Jt],l=[];function f(){e.lazyLoad&&(h(),n(K,h))}function h(){Et(l),p(),a?y():(s(u),n(u,d),d())}function p(){t.Slides.forEach(function(_){Sr(_.slide,Rs).forEach(function(g){var O=lt(g,oe),L=lt(g,Oe);if(O!==g.src||L!==g.srcset){var D=e.classes.spinner,A=g.parentElement,T=Se(A,"."+D)||Gt("span",D,A);l.push([g,_,T]),g.src||ve(g,"none")}})})}function d(){l=l.filter(function(_){var g=e.perPage*((e.preloadPages||1)+1)-1;return _[1].isWithin(r.index,g)?v(_):!0}),l.length||s(u)}function v(_){var g=_[0];ht(_[1].slide,fr),o(g,"load error",q(m,_)),k(g,"src",lt(g,oe)),k(g,"srcset",lt(g,Oe)),dt(g,oe),dt(g,Oe)}function m(_,g){var O=_[0],L=_[1];_t(L.slide,fr),g.type!=="error"&&(Ut(_[2]),ve(O,""),c(Ci,O,L),c(ge)),a&&y()}function y(){l.length&&v(l.shift())}return{mount:f,destroy:q(Et,l),check:d}}function Ms(r,t,e){var i=W(r),n=i.on,s=i.emit,o=i.bind,c=t.Slides,a=t.Elements,u=t.Controller,l=u.hasFocus,f=u.getIndex,h=u.go,p=t.Direction.resolve,d=a.pagination,v=[],m,y;function _(){g(),n([rt,K,Ue],_);var I=e.pagination;d&&ve(d,I?"":"none"),I&&(n([Lt,Lr,Jt],U),O(),U(),s(Wn,{list:m,items:v},T(r.index)))}function g(){m&&(Ut(d?Tt(m.children):m),_t(m,y),Et(v),m=null),i.destroy()}function O(){var I=r.length,S=e.classes,$=e.i18n,w=e.perPage,M=l()?u.getEnd()+1:pe(I/w);m=d||Gt("ul",S.pagination,a.track.parentElement),ht(m,y=Ze+"--"+A()),k(m,yt,"tablist"),k(m,st,$.select),k(m,xr,A()===Ye?"vertical":"");for(var H=0;H<M;H++){var j=Gt("li",null,m),F=Gt("button",{class:S.page,type:"button"},j),R=c.getIn(H).map(function(b){return b.slide.id}),P=!l()&&w>1?$.pageX:$.slideX;o(F,"click",q(L,H)),e.paginationKeyboard&&o(F,"keydown",q(D,H)),k(j,yt,"presentation"),k(F,yt,"tab"),k(F,Ce,R.join(" ")),k(F,st,hr(P,H+1)),k(F,Yt,-1),v.push({li:j,button:F,page:H})}}function L(I){h(">"+I,!0)}function D(I,S){var $=v.length,w=Nr(S),M=A(),H=-1;w===p(Ge,!1,M)?H=++I%$:w===p(je,!1,M)?H=(--I+$)%$:w==="Home"?H=0:w==="End"&&(H=$-1);var j=v[H];j&&(gi(j.button),h(">"+H),gt(S,!0))}function A(){return e.paginationDirection||e.direction}function T(I){return v[u.toPage(I)]}function U(){var I=T(f(!0)),S=T(f());if(I){var $=I.button;_t($,zt),dt($,Qr),k($,Yt,-1)}if(S){var w=S.button;ht(w,zt),k(w,Qr,!0),k(w,Yt,"")}s(jn,{list:m,items:v},I,S)}return{items:v,mount:_,destroy:g,getAt:T,update:U}}var ks=[" ","Enter"];function Hs(r,t,e){var i=e.isNavigation,n=e.slideFocus,s=[];function o(){r.splides.forEach(function(d){d.isParent||(u(r,d.splide),u(d.splide,r))}),i&&l()}function c(){s.forEach(function(d){d.destroy()}),Et(s)}function a(){c(),o()}function u(d,v){var m=W(d);m.on(Lt,function(y,_,g){v.go(v.is(te)?g:y)}),s.push(m)}function l(){var d=W(r),v=d.on;v(Ai,h),v(Li,p),v([Vt,rt],f),s.push(d),d.emit(Si,r.splides)}function f(){k(t.Elements.list,xr,e.direction===Ye?"vertical":"")}function h(d){r.go(d.index)}function p(d,v){Ar(ks,Nr(v))&&(h(d),gt(v))}return{setup:q(t.Media.set,{slideFocus:Ee(n)?i:n},!0),mount:o,destroy:c,remount:a}}function Us(r,t,e){var i=W(r),n=i.bind,s=0;function o(){e.wheel&&n(t.Elements.track,"wheel",c,Ft)}function c(u){if(u.cancelable){var l=u.deltaY,f=l<0,h=lr(u),p=e.wheelMinThreshold||0,d=e.wheelSleep||0;et(l)>p&&h-s>d&&(r.go(f?"<":">"),s=h),a(f)&&gt(u)}}function a(u){return!e.releaseWheel||r.state.is(Qt)||t.Controller.getAdjacent(u)!==-1}return{mount:o}}var zs=90;function Vs(r,t,e){var i=W(r),n=i.on,s=t.Elements.track,o=e.live&&!e.isNavigation,c=Gt("span",ss),a=Fe(zs,q(l,!1));function u(){o&&(h(!t.Autoplay.isPaused()),k(s,ei,!0),c.textContent="…",n($i,q(h,!0)),n(wi,q(h,!1)),n([we,Jt],q(l,!0)))}function l(p){k(s,ti,p),p?(be(s,c),a.start()):(Ut(c),a.cancel())}function f(){dt(s,[Jr,ei,ti]),Ut(c)}function h(p){o&&k(s,Jr,p?"off":"polite")}return{mount:u,disable:h,destroy:f}}var qs=Object.freeze({__proto__:null,Media:Kn,Direction:Zn,Elements:hs,Slides:fs,Layout:vs,Clones:gs,Move:ms,Controller:_s,Arrows:As,Autoplay:Ss,Cover:$s,Scroll:Ps,Drag:Is,Keyboard:Os,LazyLoad:Ds,Pagination:Ms,Sync:Hs,Wheel:Us,Live:Vs}),Bs={prev:"Previous slide",next:"Next slide",first:"Go to first slide",last:"Go to last slide",slideX:"Go to slide %s",pageX:"Go to page %s",play:"Start autoplay",pause:"Pause autoplay",carousel:"carousel",slide:"slide",select:"Select a slide to show",slideLabel:"%s of %s"},Fs={type:"slide",role:"region",speed:400,perPage:1,cloneStatus:!0,arrows:!0,pagination:!0,paginationKeyboard:!0,interval:5e3,pauseOnHover:!0,pauseOnFocus:!0,resetProgress:!0,easing:"cubic-bezier(0.25, 1, 0.5, 1)",drag:!0,direction:"ltr",trimSpace:!0,focusableNodes:"a, button, textarea, input, select, iframe",live:!0,classes:cs,i18n:Bs,reducedMotion:{speed:0,rewindSpeed:0,autoplay:"pause"}};function Ws(r,t,e){var i=t.Slides;function n(){W(r).on([Vt,K],s)}function s(){i.forEach(function(c){c.style("transform","translateX(-"+100*c.index+"%)")})}function o(c,a){i.style("transition","opacity "+e.speed+"ms "+e.easing),di(a)}return{mount:n,start:o,cancel:cr}}function js(r,t,e){var i=t.Move,n=t.Controller,s=t.Scroll,o=t.Elements.list,c=q(ct,o,"transition"),a;function u(){W(r).bind(o,"transitionend",function(p){p.target===o&&a&&(f(),a())})}function l(p,d){var v=i.toPosition(p,!0),m=i.getPosition(),y=h(p);et(v-m)>=1&&y>=1?e.useScroll?s.scroll(v,y,!1,d):(c("transform "+y+"ms "+e.easing),i.translate(v,!0),a=d):(i.jump(p),d())}function f(){c(""),s.cancel()}function h(p){var d=e.rewindSpeed;if(r.is(Zt)&&d){var v=n.getIndex(!0),m=n.getEnd();if(v===0&&p>=m||v>=m&&p===0)return d}return e.speed}return{mount:u,start:l,cancel:f}}var Gs=function(){function r(e,i){this.event=W(),this.Components={},this.state=Yn(Wt),this.splides=[],this._o={},this._E={};var n=wt(e)?_i(document,e):e;se(n,n+" is invalid."),this.root=n,i=St({label:lt(n,st)||"",labelledby:lt(n,Tr)||""},Fs,r.defaults,i||{});try{St(i,JSON.parse(lt(n,$r)))}catch{se(!1,"Invalid JSON")}this._o=Object.create(St({},i))}var t=r.prototype;return t.mount=function(i,n){var s=this,o=this.state,c=this.Components;se(o.is([Wt,Me]),"Already mounted!"),o.set(Wt),this._C=c,this._T=n||this._T||(this.is(Le)?Ws:js),this._E=i||this._E;var a=fe({},qs,this._E,{Transition:this._T});return Dt(a,function(u,l){var f=u(s,c,s._o);c[l]=f,f.setup&&f.setup()}),Dt(c,function(u){u.mount&&u.mount()}),this.emit(Vt),ht(this.root,os),o.set(Kt),this.emit(Kr),this},t.sync=function(i){return this.splides.push({splide:i}),i.splides.push({splide:this,isParent:!0}),this.state.is(Kt)&&(this._C.Sync.remount(),i.Components.Sync.remount()),this},t.go=function(i){return this._C.Controller.go(i),this},t.on=function(i,n){return this.event.on(i,n),this},t.off=function(i){return this.event.off(i),this},t.emit=function(i){var n;return(n=this.event).emit.apply(n,[i].concat(Tt(arguments,1))),this},t.add=function(i,n){return this._C.Slides.add(i,n),this},t.remove=function(i){return this._C.Slides.remove(i),this},t.is=function(i){return this._o.type===i},t.refresh=function(){return this.emit(K),this},t.destroy=function(i){i===void 0&&(i=!0);var n=this.event,s=this.state;return s.is(Wt)?W(this).on(Kr,this.destroy.bind(this,i)):(Dt(this._C,function(o){o.destroy&&o.destroy(i)},!0),n.emit(bi),n.destroy(),i&&Et(this.splides),s.set(Me)),this},In(r,[{key:"options",get:function(){return this._o},set:function(i){this._C.Media.set(i,!0,!0)}},{key:"length",get:function(){return this._C.Slides.getLength(!0)}},{key:"index",get:function(){return this._C.Controller.getIndex()}}]),r}(),ze=Gs;ze.defaults={};ze.STATES=On;function Ys(r,t=4e3,e=4,i=!0,n=!0,s=!1,o){const c=document.querySelectorAll(r),a=Array.prototype.slice.call(c);c.length>0&&a.forEach(u=>{const l=u.querySelectorAll(".splide__slide").length,f=new ze(u,{arrows:!1,pagination:i,speed:1,autoplay:n,rewind:s===!0,interval:t,pauseOnFocus:!0,pauseOnHover:!0,type:"fade",isNavigation:!0});{const h=new ze(o,{arrows:!1,pagination:!1,speed:10,rewind:!1,type:"slide",perPage:l<e?l:e,isNavigation:!0,perMove:1,gap:"1.6rem"});f.mount(),h.sync(f),h.mount()}})}Ys(".mv_slide_main",4e3,4,!1,!1,!1,".mv_slide_thumb");window.addEventListener("DOMContentLoaded",()=>{new ji,new Gi,new Rr,new Yi,new Rr,new it,new ot,new Ln,new Ht});window.addEventListener("load",()=>{new Fi,Wi()});
