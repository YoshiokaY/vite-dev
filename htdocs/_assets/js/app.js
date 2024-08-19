var w=Object.defineProperty;var S=(l,t,r)=>t in l?w(l,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):l[t]=r;var L=(l,t,r)=>S(l,typeof t!="symbol"?t+"":t,r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))e(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const f of i.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&e(f)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function e(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();class x{constructor(t=250,r=768){L(this,"speed");L(this,"mq");this.speed=t,this.mq=r;const e=5,o="--pullHeightClosed",i="--pullHeightOpen";document.querySelectorAll(".c_pull").forEach(u=>{const c=u.querySelector(".c_pull_ttl"),d=u.querySelector(".c_pull_content"),n=u,a=u.classList.contains("-open");c==null||c.addEventListener("click",m=>{m.preventDefault();const g=c.offsetHeight;n.style.setProperty(o,`${g}px`),n.open?n.open&&(n.style.setProperty(i,`${g+d.offsetHeight}px`),setTimeout(()=>{u.classList.remove("-open")},e),setTimeout(()=>{n.open=!1},t+e)):(n.open=!0,n.style.setProperty(i,`${g+d.offsetHeight}px`),setTimeout(()=>{u.classList.add("-open")},e))}),u.addEventListener("toggle",()=>{n.open&&!a?u.classList.add("-open"):!n.open&&a&&u.classList.remove("-open")});function s(){const m=window.innerWidth;n.classList.contains("-spPull")&&(m<=r?(u.classList.remove("-open"),n.open=!1):(u.classList.add("-open"),n.open=!0))}s(),window.addEventListener("resize",s)})}}const b=l=>String(l).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),H=()=>{const l=document.querySelector("header"),t=l==null?void 0:l.clientHeight;let r=!1;t&&(setTimeout(()=>{document.documentElement.style.setProperty("--headerHeight",`${t}px`)},5),document.addEventListener("scroll",()=>{window.scrollY>t?r||(r=!0,l==null||l.classList.add("-fixed")):r&&(r=!1,l==null||l.classList.remove("-fixed"))}))};class _{constructor(){const t=document.querySelector("html"),r=document.querySelectorAll(".c_modal_btn");let e=document.querySelectorAll(".c_modal_close");r.forEach(c=>{c.addEventListener("click",d=>{let n=d.currentTarget,a=b((n==null?void 0:n.getAttribute("aria-controls"))||""),s=document.getElementById(a);const m=n.nextElementSibling;if(a)s=document.getElementById(a);else{let g=b(n.getAttribute("data-href"));if(!m){const h=/(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i.exec(g);let p="";p+='<dialog class="dialog"><div class="c_modal_content">',h?(p+='<button class="c_modal_close"><span class="txtHidden">モーダルウィンドウを閉じる</span></button>',p+=i(u("https://www.youtube"+(h[2]||"")+".com/embed/"+h[4],Object.assign({autoplay:1,rel:0},f(h[5]||""))))):p+=`<figure tabindex="1"><img src=${g} decoding="async"></figure>`,p+='<button class="c_modal_close"><span class="txtHidden">モーダルウィンドウを閉じる</span></button>',p+="</div></dialog>",n.insertAdjacentHTML("afterend",p)}s=n.nextElementSibling,e=document.querySelectorAll(".c_modal_close")}s==null||s.showModal(),t==null||t.classList.add("-disable"),a=null,e.forEach(g=>{g.addEventListener("click",()=>{o(s)})}),s==null||s.addEventListener("cancel",()=>{o(s)}),s==null||s.addEventListener("click",g=>{g.target===s&&o(s)})})});function o(c){c.close("cancelled"),c.querySelector(".frameWrapper")&&c.remove(),t==null||t.classList.remove("-disable")}function i(c){return'<div class="frameWrapper"><iframe frameborder="0" allow="autoplay; fullscreen" src="'+c+'"/></div>'}function f(c){for(var d=decodeURI(c.split("#")[0]).split("&"),n=new Map,a,s=0,m=d.length;s<m;s++)d[s]&&(a=d[s].split("="),n.set(a[0],a[1]));return n}function u(c,d){const a=Object.keys(d).map(s=>`${s}=${d[s]}`).join("&");return`${c}${c.includes("?")?"&":"?"}${a}`}}}class q{constructor(t=".headerNavi",r="-open"){L(this,"target");L(this,"open");this.target=t,this.open=r;const e=document.querySelector(t),o=e==null?void 0:e.querySelector(".ac_menu"),i=e==null?void 0:e.querySelector(".ac_menu span"),f=e==null?void 0:e.querySelector(".naviWrapper"),u=e==null?void 0:e.querySelector(".closeBtn");o==null||o.addEventListener("click",()=>{e==null||e.classList.toggle(r),e!=null&&e.classList.contains(r)?(o.setAttribute("aria-expanded","true"),i.textContent="メニューを閉じる"):(o.setAttribute("aria-expanded","false"),i.textContent="メニューを開く")}),u==null||u.addEventListener("click",()=>{c()}),f==null||f.addEventListener("click",n=>{n.target.closest("#navi")===null&&c()});const c=()=>{e==null||e.classList.remove(r),o.setAttribute("aria-expanded","false"),i.textContent="メニューを開く"};function d(){const n=document.querySelectorAll(".spAccordion"),a="--subHeightOpen",s=5;let m=!1;const g=250;n.forEach(y=>{y==null||y.addEventListener("click",h=>{var v;const p=(v=y.closest("div"))==null?void 0:v.nextElementSibling;if(m)m&&(p.style.setProperty(a,"0"),y.classList.remove("-open"),setTimeout(()=>{p.classList.remove("-open"),m=!1,p.style.setProperty(a,"auto")},g+s));else{p.classList.add("-open"),y.classList.add("-open");let E=p.offsetHeight;p.style.setProperty(a,"0"),setTimeout(()=>{p.style.setProperty(a,`${E}px`),m=!0},s)}})})}d()}}class O{constructor(t=".scrollIn,.scroll",r="-active"){L(this,"target");L(this,"active");this.target=t,this.active=r;const e=document.querySelectorAll(t),o=Array.prototype.slice.call(e),i={root:null,rootMargin:"0px 0px",threshold:0},f=new IntersectionObserver(u,i);o.forEach(c=>{f.observe(c)});function u(c){c.forEach((d,n)=>{const a=d.target;if(d.isIntersecting&&!a.classList.contains(r)){const s=n*100;setTimeout(()=>{a.classList.add(r)},s)}})}}}window.addEventListener("DOMContentLoaded",()=>{new _,new q,new O});window.addEventListener("load",()=>{new x,H()});
