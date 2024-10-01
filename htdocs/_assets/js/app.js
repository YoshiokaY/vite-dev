(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();class St{constructor(t=250,e=768){this.speed=t,this.mq=e;const s=5,i="--pullHeightClosed",o="--pullHeightOpen";document.querySelectorAll(".c_pull").forEach(c=>{const l=c.querySelector(".c_pull_ttl"),d=c.querySelector(".c_pull_content"),a=c,h=c.classList.contains("-open");l==null||l.addEventListener("click",p=>{p.preventDefault();const m=l.offsetHeight;a.style.setProperty(i,`${m}px`),a.open?a.open&&(a.style.setProperty(o,`${m+d.offsetHeight}px`),setTimeout(()=>{c.classList.remove("-open")},s),setTimeout(()=>{a.open=!1,d.focus({preventScroll:!0})},t+s)):(a.open=!0,a.style.setProperty(o,`${m+d.offsetHeight}px`),setTimeout(()=>{c.classList.add("-open")},s))}),c.addEventListener("toggle",()=>{a.open&&!h?c.classList.add("-open"):!a.open&&h&&c.classList.remove("-open")});function u(){const p=window.innerWidth;a.classList.contains("-spPull")&&(p<=e?(c.classList.remove("-open"),a.open=!1):(c.classList.add("-open"),a.open=!0))}u(),window.addEventListener("resize",u)})}}const N=r=>String(r).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),_t=r=>{const t=new Date(r.replace(/年|月|日/g,"/").replace("日",""));let e=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),i=String(t.getDate()).padStart(2,"0");return`${e}-${s}-${i}`},$t=r=>{let t=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/gi;if(!r.match(t))return r};class Et{constructor(t=".c_modal"){this.target=t;const e=document.querySelectorAll(t+"_btn");let s=document.querySelectorAll(t+"_close");e.forEach(l=>{l.addEventListener("click",d=>{const a=d.currentTarget;let h=N((a==null?void 0:a.getAttribute("aria-controls"))||""),u=document.getElementById(h);const p=a.nextElementSibling;if(h)u=document.getElementById(h);else{const m=N(a.getAttribute("data-src")),g=N(a.getAttribute("data-alt"));if(!p){const E=/(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i.exec(m);let y="";y+='<dialog class="c_modal"><div class="c_modal_content" tabindex="-1">',E?(y+='<button class="c_modal_close"><span class="txtHidden">モーダルウィンドウを閉じる</span></button>',y+=o(c("https://www.youtube"+(E[2]||"")+".com/embed/"+E[4],Object.assign({autoplay:1,rel:0},n(E[5]||""))))):y+=`<figure><img src=${m} decoding="async" alt=${g}></figure>`,y+='<button class="c_modal_close"><span class="txtHidden">モーダルウィンドウを閉じる</span></button>',y+="</div></div></dialog>",a.insertAdjacentHTML("afterend",y)}u=a.nextElementSibling,s=document.querySelectorAll(".c_modal_close")}u==null||u.showModal(),h=null,s.forEach(m=>{m.addEventListener("click",()=>{i(u)})}),u==null||u.addEventListener("cancel",()=>{i(u)}),u==null||u.addEventListener("click",m=>{m.target===u&&i(u)})})});function i(l){l.close("cancelled"),l.querySelector(".frameWrapper")&&l.remove()}function o(l){return'<div class="frameWrapper"><iframe frameborder="0" allow="autoplay; fullscreen" src="'+l+'"/></div>'}function n(l){const d=decodeURI(l.split("#")[0]).split("&"),a=new Map;let h;for(let u=0,p=d.length;u<p;u++)d[u]&&(h=d[u].split("="),a.set(h[0],h[1]));return a}function c(l,d){const h=Object.keys(d).map(u=>`${u}=${d[u]}`).join("&");return`${l}${l.includes("?")?"&":"?"}${h}`}}}class wt{constructor(t=".headerNavi",e="-open"){this.target=t,this.open=e;const s=document.querySelector(t),i=s==null?void 0:s.querySelector(".ac_menu"),o=s==null?void 0:s.querySelector(".ac_menu span"),n=s==null?void 0:s.querySelector(".naviWrapper"),c=s==null?void 0:s.querySelector(".closeBtn");i==null||i.addEventListener("click",()=>{s==null||s.classList.toggle(e),s!=null&&s.classList.contains(e)?(i.setAttribute("aria-expanded","true"),o.textContent="メニューを閉じる"):(i.setAttribute("aria-expanded","false"),o.textContent="メニューを開く")}),c==null||c.addEventListener("click",()=>{l()}),n==null||n.addEventListener("click",a=>{a.target.closest("#navi")===null&&l()});const l=()=>{s==null||s.classList.remove(e),i.setAttribute("aria-expanded","false"),o.textContent="メニューを開く"};function d(){const a=document.querySelectorAll(".spAccordion"),h="--subHeightOpen",u=5;let p=!1;const m=250;a.forEach(g=>{g==null||g.addEventListener("click",()=>{var E;const v=(E=g.closest("div"))==null?void 0:E.nextElementSibling;if(p)p&&(v.style.setProperty(h,"0"),g.classList.remove("-open"),setTimeout(()=>{v.classList.remove("-open"),p=!1,v.style.setProperty(h,"auto")},m+u));else{v.classList.add("-open"),g.classList.add("-open");const y=v.offsetHeight;v.style.setProperty(h,"0"),setTimeout(()=>{v.style.setProperty(h,`${y}px`),p=!0},u)}})})}d()}}class Ct{constructor(t=".scrollIn,.scroll",e="-active"){this.target=t,this.active=e;const s=document.querySelectorAll(t),i=Array.prototype.slice.call(s),o={root:null,rootMargin:"0px 0px",threshold:0},n=new IntersectionObserver(c,o);i.forEach(l=>{n.observe(l)});function c(l){l.forEach(d=>{const a=d.target;d.isIntersecting&&!a.classList.contains(e)&&setTimeout(()=>{a.classList.add(e)},5)})}}}class rt{constructor(t=".c_tab",e="-open"){this.target=t,this.open=e;const s=document.querySelectorAll(t+"_list li button");function i(o){const n=o.target,c=n.closest(t),l=c==null?void 0:c.querySelectorAll(t+"_content"),d=Array.prototype.slice.call(l),a=c==null?void 0:c.querySelectorAll(t+"_list li button"),h=Array.prototype.slice.call(a),u=h.indexOf(o.target);h.forEach(p=>{p.classList.remove(e),p.setAttribute("aria-pressed","false"),p.setAttribute("tabindex","0")}),n.classList.add(e),n.setAttribute("aria-pressed","true"),n.setAttribute("tabindex","-1"),d.forEach(p=>{p.setAttribute("hidden",""),p.setAttribute("tabindex","-1")}),d[u].removeAttribute("hidden"),d[u].focus({preventScroll:!0})}if(s.forEach(o=>{o.addEventListener("click",i)}),s.length>0){const n=new URL(window.location.href).hash;if(n){const c=Number(n.slice(-1));isNaN(c)||s[c-1].click()}}}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const W=globalThis,tt=W.ShadowRoot&&(W.ShadyCSS===void 0||W.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,gt=Symbol(),ot=new WeakMap;let Lt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==gt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(tt&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=ot.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ot.set(e,t))}return t}toString(){return this.cssText}};const xt=r=>new Lt(typeof r=="string"?r:r+"",void 0,gt),Pt=(r,t)=>{if(tt)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=W.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},nt=tt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return xt(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ot,defineProperty:Ht,getOwnPropertyDescriptor:Nt,getOwnPropertyNames:Mt,getOwnPropertySymbols:Ut,getPrototypeOf:Tt}=Object,S=globalThis,lt=S.trustedTypes,kt=lt?lt.emptyScript:"",Q=S.reactiveElementPolyfillSupport,I=(r,t)=>r,F={toAttribute(r,t){switch(t){case Boolean:r=r?kt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},et=(r,t)=>!Ot(r,t),ct={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:et};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),S.litPropertyMetadata??(S.litPropertyMetadata=new WeakMap);class H extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ct){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Ht(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=Nt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get(){return i==null?void 0:i.call(this)},set(n){const c=i==null?void 0:i.call(this);o.call(this,n),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ct}static _$Ei(){if(this.hasOwnProperty(I("elementProperties")))return;const t=Tt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(I("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(I("properties"))){const e=this.properties,s=[...Mt(e),...Ut(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(nt(i))}else t!==void 0&&e.push(nt(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Pt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var o;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const n=(((o=s.converter)==null?void 0:o.toAttribute)!==void 0?s.converter:F).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){var o;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const n=s.getPropertyOptions(i),c=typeof n.converter=="function"?{fromAttribute:n.converter}:((o=n.converter)==null?void 0:o.fromAttribute)!==void 0?n.converter:F;this._$Em=i,this[i]=c.fromAttribute(e,n.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??et)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,n]of i)n.wrapped!==!0||this._$AL.has(o)||this[o]===void 0||this.P(o,this[o],n)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var o;return(o=i.hostUpdate)==null?void 0:o.call(i)}),this.update(e)):this._$EU()}catch(i){throw t=!1,this._$EU(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}H.elementStyles=[],H.shadowRootOptions={mode:"open"},H[I("elementProperties")]=new Map,H[I("finalized")]=new Map,Q==null||Q({ReactiveElement:H}),(S.reactiveElementVersions??(S.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const q=globalThis,V=q.trustedTypes,at=V?V.createPolicy("lit-html",{createHTML:r=>r}):void 0,yt="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,At="?"+b,It=`<${At}>`,x=document,D=()=>x.createComment(""),R=r=>r===null||typeof r!="object"&&typeof r!="function",st=Array.isArray,qt=r=>st(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",Z=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ht=/-->/g,dt=/>/g,w=RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ut=/'/g,pt=/"/g,vt=/^(?:script|style|textarea|title)$/i,Dt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),_=Dt(1),P=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),ft=new WeakMap,C=x.createTreeWalker(x,129);function bt(r,t){if(!st(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return at!==void 0?at.createHTML(t):t}const Rt=(r,t)=>{const e=r.length-1,s=[];let i,o=t===2?"<svg>":t===3?"<math>":"",n=k;for(let c=0;c<e;c++){const l=r[c];let d,a,h=-1,u=0;for(;u<l.length&&(n.lastIndex=u,a=n.exec(l),a!==null);)u=n.lastIndex,n===k?a[1]==="!--"?n=ht:a[1]!==void 0?n=dt:a[2]!==void 0?(vt.test(a[2])&&(i=RegExp("</"+a[2],"g")),n=w):a[3]!==void 0&&(n=w):n===w?a[0]===">"?(n=i??k,h=-1):a[1]===void 0?h=-2:(h=n.lastIndex-a[2].length,d=a[1],n=a[3]===void 0?w:a[3]==='"'?pt:ut):n===pt||n===ut?n=w:n===ht||n===dt?n=k:(n=w,i=void 0);const p=n===w&&r[c+1].startsWith("/>")?" ":"";o+=n===k?l+It:h>=0?(s.push(d),l.slice(0,h)+yt+l.slice(h)+b+p):l+b+(h===-2?c:p)}return[bt(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class j{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const c=t.length-1,l=this.parts,[d,a]=Rt(t,e);if(this.el=j.createElement(d,s),C.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=C.nextNode())!==null&&l.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(const h of i.getAttributeNames())if(h.endsWith(yt)){const u=a[n++],p=i.getAttribute(h).split(b),m=/([.?@])?(.*)/.exec(u);l.push({type:1,index:o,name:m[2],strings:p,ctor:m[1]==="."?Bt:m[1]==="?"?zt:m[1]==="@"?Wt:Y}),i.removeAttribute(h)}else h.startsWith(b)&&(l.push({type:6,index:o}),i.removeAttribute(h));if(vt.test(i.tagName)){const h=i.textContent.split(b),u=h.length-1;if(u>0){i.textContent=V?V.emptyScript:"";for(let p=0;p<u;p++)i.append(h[p],D()),C.nextNode(),l.push({type:2,index:++o});i.append(h[u],D())}}}else if(i.nodeType===8)if(i.data===At)l.push({type:2,index:o});else{let h=-1;for(;(h=i.data.indexOf(b,h+1))!==-1;)l.push({type:7,index:o}),h+=b.length-1}o++}}static createElement(t,e){const s=x.createElement("template");return s.innerHTML=t,s}}function M(r,t,e=r,s){var n,c;if(t===P)return t;let i=s!==void 0?(n=e.o)==null?void 0:n[s]:e.l;const o=R(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==o&&((c=i==null?void 0:i._$AO)==null||c.call(i,!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,e,s)),s!==void 0?(e.o??(e.o=[]))[s]=i:e.l=i),i!==void 0&&(t=M(r,i._$AS(r,t.values),i,s)),t}class jt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??x).importNode(e,!0);C.currentNode=i;let o=C.nextNode(),n=0,c=0,l=s[0];for(;l!==void 0;){if(n===l.index){let d;l.type===2?d=new B(o,o.nextSibling,this,t):l.type===1?d=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(d=new Ft(o,this,t)),this._$AV.push(d),l=s[++c]}n!==(l==null?void 0:l.index)&&(o=C.nextNode(),n++)}return C.currentNode=x,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class B{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this.v}constructor(t,e,s,i){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this.v=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=M(this,t,e),R(t)?t===f||t==null||t===""?(this._$AH!==f&&this._$AR(),this._$AH=f):t!==this._$AH&&t!==P&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):qt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==f&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){var o;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=j.createElement(bt(s.h,s.h[0]),this.options)),s);if(((o=this._$AH)==null?void 0:o._$AD)===i)this._$AH.p(e);else{const n=new jt(i,this),c=n.u(this.options);n.p(e),this.T(c),this._$AH=n}}_$AC(t){let e=ft.get(t.strings);return e===void 0&&ft.set(t.strings,e=new j(t)),e}k(t){st(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new B(this.O(D()),this.O(D()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this.v=t,(e=this._$AP)==null||e.call(this,t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=f,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=f}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(o===void 0)t=M(this,t,e,0),n=!R(t)||t!==this._$AH&&t!==P,n&&(this._$AH=t);else{const c=t;let l,d;for(t=o[0],l=0;l<o.length-1;l++)d=M(this,c[s+l],e,l),d===P&&(d=this._$AH[l]),n||(n=!R(d)||d!==this._$AH[l]),d===f?t=f:t!==f&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}n&&!i&&this.j(t)}j(t){t===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Bt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===f?void 0:t}}class zt extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==f)}}class Wt extends Y{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=M(this,t,e,0)??f)===P)return;const s=this._$AH,i=t===f&&s!==f||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==f&&(s===f||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Ft{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}}const J=q.litHtmlPolyfillSupport;J==null||J(j,B),(q.litHtmlVersions??(q.litHtmlVersions=[])).push("3.2.0");const Vt=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const o=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new B(t.insertBefore(D(),o),o,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class L extends H{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.o=Vt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this.o)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.o)==null||t.setConnected(!1)}render(){return P}}var mt;L._$litElement$=!0,L.finalized=!0,(mt=globalThis.litElementHydrateSupport)==null||mt.call(globalThis,{LitElement:L});const X=globalThis.litElementPolyfillSupport;X==null||X({LitElement:L});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const it=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yt={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:et},Kt=(r=Yt,t,e)=>{const{kind:s,metadata:i}=e;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),o.set(e.name,r),s==="accessor"){const{name:n}=e;return{set(c){const l=t.get.call(this);t.set.call(this,c),this.requestUpdate(n,l,r)},init(c){return c!==void 0&&this.P(n,void 0,r),c}}}if(s==="setter"){const{name:n}=e;return function(c){const l=this[n];t.call(this,c),this.requestUpdate(n,l,r)}}throw Error("Unsupported decorator location: "+s)};function $(r){return(t,e)=>typeof e=="object"?Kt(r,t,e):((s,i,o)=>{const n=i.hasOwnProperty(o);return i.constructor.createProperty(o,n?{...s,wrapped:!0}:s),n?Object.getOwnPropertyDescriptor(i,o):void 0})(r,t,e)}var Qt=Object.defineProperty,Zt=Object.getOwnPropertyDescriptor,T=(r,t,e,s)=>{for(var i=s>1?void 0:s?Zt(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(i=(s?n(t,e,i):n(i))||i);return s&&i&&Qt(t,e,i),i};let A=class extends L{constructor(){super(...arguments),this.category=[],this.type="checkbox",this.search="AND",this.SHOW_CLASS_NAME="-visible",this.ALL_CARD_LIST=this.querySelectorAll(".c_filter_item"),this._targetElements=[],this._filterCats=[],this._matchedLists=[],this._maxCount=0,this._showCountNum=0,this._handleMoreButtonClick=()=>{if(!(this._matchedLists.length<1)){this.visible&&(this._maxCount=this._showCountNum+ +this.visible);for(let r=this._showCountNum;r<this._maxCount&&r<this._matchedLists.length;r++)this._matchedLists[r].classList.add(this.SHOW_CLASS_NAME),this._showCountNum++;this._showMoreBtn(this._showCountNum,this._matchedLists.length)}}}connectedCallback(){super.connectedCallback(),this._targetElements=[...this.children]}firstUpdated(){var t;const r=A.findSlots(this.children);for(const e of this._targetElements){let s=null;if(e.hasAttribute("slot")){const i=(t=e.attributes.getNamedItem("slot"))==null?void 0:t.value;s=r.find(o=>{var n;return((n=o.attributes.getNamedItem("name"))==null?void 0:n.value)===i})}else s=r[0];s&&(e.remove(),s.append(e))}this._targetElements=[],this._setCatAll()}render(){return _`
    <div class="c_filter">
      <ul class="c_filter_list grid grid-cols-5 mb-[1.6rem] gap-[0.8rem]">
        <li class=${this.all?"":"txtHidden"}>
          <input type=${this.type} @click=${this._handleClick} name="filter" value="allCat" id="cat0" />
          <label for="cat0">${this.all}</label>
        </li>
        ${this.category.map((r,t)=>_`
            <li>
              <input type=${this.type} @click=${this._handleClick} name="filter" value=${r} id="cat${t+1}" />
              <label for="cat${t+1}">${r}</label>
            </li>
          `)}
      </ul>
      <slot name="content"></slot>
      ${this.visible?_`
          <button class="c_filter_more" @click=${this._handleMoreButtonClick}>もっと見る</button>
        `:_``}
    </div>
    `}_handleClick(r){let t=r.target,e=t.value,s=t.checked?t.value:"";if(this.ALL_CARD_LIST){if(s==="allCat")this._setCatAll();else{const i=this.querySelector("#cat0");i&&(i.checked=!1),t.checked?(this.type==="radio"&&(this._filterCats=[]),this._filterCats.push(e)):this._filterCats=this._filterCats.filter(o=>o!==e),this._filterElements()}this._filterCats.length===0&&this._setCatAll()}}_filterElements(r){let t=this.visible?this.visible:this.ALL_CARD_LIST.length;this._matchedLists=[],this._showCountNum=0,this._maxCount=0,this.ALL_CARD_LIST.forEach(e=>{if(e.classList.remove(this.SHOW_CLASS_NAME),r)this._matchedLists.push(e);else{let s=[];e.querySelectorAll(".c_filter_cat").forEach(o=>{o.textContent&&s.push(o.textContent.toLowerCase())}),(this.search==="OR"?this._filterCats.some(o=>s.includes(o.toLowerCase())):this._filterCats.every(o=>s.includes(o.toLowerCase())))&&this._matchedLists.push(e)}});for(let e=0;e<t&&e<this._matchedLists.length;e++)this._matchedLists[e].classList.add(this.SHOW_CLASS_NAME),this._showCountNum++;console.log(this.querySelector(".c_filter_more")),this.visible&&this._showMoreBtn(this._showCountNum,this._matchedLists.length)}_showMoreBtn(r,t){const e=this.querySelector(".c_filter_more");r<t?e==null||e.classList.add(this.SHOW_CLASS_NAME):e==null||e.classList.remove(this.SHOW_CLASS_NAME)}_setCatAll(){const r=this.querySelector("#cat0");r&&(this.querySelectorAll("input").forEach((e,s)=>{s!==0&&(e.checked=!1)}),this._filterCats=[],r.checked=!0,this._filterElements(!0))}static findSlots(r){let t=[];for(const e of r)e.tagName==="SLOT"?t.push(e):e.tagName.indexOf("-")<0&&(t=t.concat(this.findSlots(e.children)));return t}createRenderRoot(){return this}};T([$({type:Array})],A.prototype,"category",2);T([$()],A.prototype,"all",2);T([$()],A.prototype,"visible",2);T([$()],A.prototype,"type",2);T([$()],A.prototype,"search",2);A=T([it("filter-list")],A);var Jt=Object.defineProperty,Xt=Object.getOwnPropertyDescriptor,z=(r,t,e,s)=>{for(var i=s>1?void 0:s?Xt(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(i=(s?n(t,e,i):n(i))||i);return s&&i&&Jt(t,e,i),i};let O=class extends L{constructor(){super(...arguments),this.src="",this.href="",this.data=[],this.limit=3}connectedCallback(){super.connectedCallback(),this.fetchData()}async fetchData(){try{const t=await(await fetch($t(N(this.src))+".json")).json();this.data=t}catch(r){console.error("Error fetching data:",r)}}render(){return this.data.length?_`
      <dl class="flex flex-col justify-between archiveList md:gap-y-[6.5rem] gap-y-[4.9rem]">
        ${this.data.map((r,t)=>{if(t<this.limit)return _`
              <div class="grid md:grid-cols-[13.1rem,auto] md:gap-[3rem] gap-[1.2rem]">
                <dt><time datetime=${_t(r.date)}>${r.date}</time></dt>
                <dd>
                  ${r.link?_`
                    <a href=${r.link} class="linkArrow block">${r.ttl}</a>`:this.href.includes("http")?_`
                    <span>${r.ttl}</span>`:_`
                    <a href=${N(this.href)+"#post"+t} class="linkArrow block">${r.ttl}</a>`}
                </dd>
              </div>
            `})}
      </dl>
    `:_`<div aria-busy="true">Coming soon...</div>`}createRenderRoot(){return this}};z([$()],O.prototype,"src",2);z([$()],O.prototype,"href",2);z([$({type:Array})],O.prototype,"data",2);z([$({type:Number})],O.prototype,"limit",2);O=z([it("news-list")],O);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Gt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},te=r=>(...t)=>({_$litDirective$:r,values:t});class ee{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this.t=t,this._$AM=e,this.i=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class G extends ee{constructor(t){if(super(t),this.it=f,t.type!==Gt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===f||t==null)return this._t=void 0,this.it=t;if(t===P)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}G.directiveName="unsafeHTML",G.resultType=1;const se=te(G);var ie=Object.defineProperty,re=Object.getOwnPropertyDescriptor,K=(r,t,e,s)=>{for(var i=s>1?void 0:s?re(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(i=(s?n(t,e,i):n(i))||i);return s&&i&&ie(t,e,i),i};let U=class extends L{constructor(){super(...arguments),this.src="",this.data=[],this._post=0}connectedCallback(){super.connectedCallback(),this.fetchData(),this._post=this.getQuery()}getQuery(){const r=Number(location.hash.split("#post")[1]);return this._post=r,r}srcCheck(r){let t=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/gi;if(!r.match(t))return r}async fetchData(){try{const t=await(await fetch($t(N(this.src))+".json")).json();this.data=t}catch(r){console.error("Error fetching data:",r)}}render(){if(!this.data.length)return _`<section class="md:pt-[6.4rem] pt-[3.6rem] md:pb-[6.3rem] pb-[3.1rem]">
          <div class="contentInner"><div aria-busy="true">Coming soon...</div></div></section>`;for(let r=0;r<this.data.length;r++)if(r===this._post){const t=this.data[r];return _`
        <!-- 下層タイトル -->
        <section class="md:pt-[6.4rem] pt-[3.6rem] md:pb-[6.3rem] pb-[3.1rem]">
          <div class="contentInner">
            <span class="block md:mb-[1rem] mb-[0.8rem]">
              <time datetime=${_t(t.date)}>${t.date}</time>
            </span>
            <h1 class="font-bold text-h1"><span class="c_ttl_h1__jp">${t.ttl}</span></h1>
          </div>
        </section><!-- /下層タイトル -->
        <!-- ニュース詳細 -->
        <section class="md:mb-[14rem] mb-[8rem]">
          <div class="contentInner">
            <div class="bg-body md:rounded-[8rem] rounded-[5.6rem] md:p-[8rem] p-[5.6rem_2.4rem]">
              <div class="postContent">
                ${t.img?_`
                      <figure class="mb-[2em]"><img src=${t.img} alt="" width="920" height="520" decoding="async" loading="lazy"></figure>`:_``}
                ${se(t.content.replace(/script>/g,"スクリプト&gt;").replace(/style>/g,"スタイル&gt;"))}
              </div>
            </div>
          </div>
        </section><!-- /ニュース詳細 -->
        `}}createRenderRoot(){return this}};K([$()],U.prototype,"src",2);K([$({type:Array})],U.prototype,"data",2);K([$({state:!0})],U.prototype,"_post",2);U=K([it("news-single")],U);class oe{constructor(t=!1){this.header_fix=t,document.querySelectorAll('a[href^="#"]').forEach(o=>{o.addEventListener("click",n=>{n.preventDefault();const c=o.getAttribute("href");let l;if(c){if(c==="#")l=document.body,s(l);else if(c){if(l=document.getElementById(c.replace("#","")),l&&this.header_fix){const d=document.querySelector("header"),a=d==null?void 0:d.clientHeight;l.style.scrollMarginBlockStart=String(a)+"px"}s(l)}}})});function s(o){const c=window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth";setTimeout(()=>{o==null||o.focus({preventScroll:!0}),document.activeElement!==o&&(o==null||o.setAttribute("tabindex","-1"),o==null||o.focus({preventScroll:!0})),o==null||o.scrollIntoView({behavior:c,inline:"end"})},0)}const i=location.hash;if(i){const o=document.querySelector(i);if(o){if(o&&this.header_fix){const n=document.querySelector("header"),c=n==null?void 0:n.clientHeight;o.style.scrollMarginBlockStart=String(c)+"px"}o.scrollIntoView({behavior:"instant",inline:"end"})}}}}window.addEventListener("DOMContentLoaded",()=>{new Et,new wt,new rt,new Ct,new rt,new A,new O,new U,new oe});window.addEventListener("load",()=>{new St});
