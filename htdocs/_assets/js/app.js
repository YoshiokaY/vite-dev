var _a;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
class Accordion {
  constructor(SPEED = 250, MQ = 768) {
    this.speed = SPEED;
    this.mq = MQ;
    const OFFSET_TIME = 5;
    const HEIGHT_CLOSED = "--pullHeightClosed";
    const HEIGHT = "--pullHeightOpen";
    const accordions = document.querySelectorAll(".c_pull");
    accordions.forEach((accordion) => {
      const ttl = accordion.querySelector(".c_pull_ttl");
      const content = accordion.querySelector(".c_pull_content");
      const target = accordion;
      const hasOpenedClass = accordion.classList.contains("-open");
      ttl == null ? void 0 : ttl.addEventListener("click", (e2) => {
        e2.preventDefault();
        const ttlHeight = ttl.offsetHeight;
        target.style.setProperty(HEIGHT_CLOSED, `${ttlHeight}px`);
        if (!target.open) {
          target.open = true;
          target.style.setProperty(HEIGHT, `${ttlHeight + content.offsetHeight}px`);
          setTimeout(() => {
            accordion.classList.add("-open");
            content == null ? void 0 : content.focus({ preventScroll: true });
            if (document.activeElement !== content) {
              content == null ? void 0 : content.setAttribute("tabindex", "-1");
              content == null ? void 0 : content.focus({ preventScroll: true });
            }
          }, OFFSET_TIME);
        } else if (target.open) {
          target.style.setProperty(HEIGHT, `${ttlHeight + content.offsetHeight}px`);
          setTimeout(() => {
            accordion.classList.remove("-open");
          }, OFFSET_TIME);
          setTimeout(() => {
            target.open = false;
          }, SPEED + OFFSET_TIME);
        }
      });
      accordion.addEventListener("toggle", () => {
        if (target.open && !hasOpenedClass) {
          accordion.classList.add("-open");
        } else if (!target.open && hasOpenedClass) {
          accordion.classList.remove("-open");
        }
      });
      function spPull() {
        const ww = window.innerWidth;
        if (target.classList.contains("-spPull")) {
          if (ww <= MQ) {
            accordion.classList.remove("-open");
            target.open = false;
          } else {
            accordion.classList.add("-open");
            target.open = true;
          }
        }
      }
      spPull();
      window.addEventListener("resize", spPull);
    });
  }
}
const sanitize = (str) => {
  return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};
const getHeader = () => {
  const header = document.querySelector("header");
  const headerHeight = header == null ? void 0 : header.clientHeight;
  if (headerHeight) {
    setTimeout(() => {
      document.documentElement.style.setProperty("--headerHeight", `${headerHeight}px`);
    }, 5);
  }
};
const getTime = (date) => {
  const formattedDate = new Date(date.replace(/年|月|日/g, "/").replace("日", ""));
  let year = formattedDate.getFullYear();
  let month = String(formattedDate.getMonth() + 1).padStart(2, "0");
  let day = String(formattedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const srcCheck = (src) => {
  let regExp = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/gi;
  if (!src.match(regExp)) {
    return src;
  }
};
class Modal {
  constructor(TARGET = ".c_modal") {
    this.target = TARGET;
    const modalBtn = document.querySelectorAll(TARGET + "_btn");
    let closes = document.querySelectorAll(TARGET + "_close");
    modalBtn.forEach((a2) => {
      a2.addEventListener("click", (e2) => {
        const event = e2.currentTarget;
        let modalID = sanitize((event == null ? void 0 : event.getAttribute("aria-controls")) || "");
        let modal = document.getElementById(modalID);
        const targetNext = event.nextElementSibling;
        if (modalID) {
          modal = document.getElementById(modalID);
        } else {
          const modalSrc = sanitize(event.getAttribute("data-src"));
          const modalAlt = sanitize(event.getAttribute("data-alt"));
          if (!targetNext) {
            const YOUTUBE = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i;
            const youtube_uri = YOUTUBE.exec(modalSrc);
            let dialog = "";
            dialog += '<dialog class="c_modal"><div class="c_modal_content" tabindex="-1">';
            if (youtube_uri) {
              dialog += '<button class="c_modal_close"><span class="txtHidden">モーダルウィンドウを閉じる</span></button>';
              dialog += setFrame(
                appendQueryParams(
                  "https://www.youtube" + (youtube_uri[2] || "") + ".com/embed/" + youtube_uri[4],
                  //youtubeのオプションを記述
                  Object.assign(
                    {
                      autoplay: 1,
                      rel: 0
                    },
                    parseQueryParams(youtube_uri[5] || "")
                  )
                )
              );
            } else {
              dialog += `<figure><img src=${modalSrc} decoding="async" alt=${modalAlt}></figure>`;
            }
            dialog += '<button class="c_modal_close"><span class="txtHidden">モーダルウィンドウを閉じる</span></button>';
            dialog += "</div></div></dialog>";
            event.insertAdjacentHTML("afterend", dialog);
          }
          modal = event.nextElementSibling;
          closes = document.querySelectorAll(".c_modal_close");
        }
        modal == null ? void 0 : modal.showModal();
        const content = modal.querySelector(TARGET + "_content");
        setTimeout(() => {
          content == null ? void 0 : content.focus({ preventScroll: true });
          if (document.activeElement !== content) {
            content == null ? void 0 : content.setAttribute("tabindex", "-1");
            content == null ? void 0 : content.focus({ preventScroll: true });
          }
        }, 0);
        modalID = null;
        closes.forEach((close) => {
          close.addEventListener("click", () => {
            closeModal(modal);
          });
        });
        modal == null ? void 0 : modal.addEventListener("cancel", () => {
          closeModal(modal);
        });
        modal == null ? void 0 : modal.addEventListener("click", (e22) => {
          const event2 = e22.target;
          if (event2 === modal) {
            closeModal(modal);
          }
        });
      });
    });
    function closeModal(modal) {
      modal.close("cancelled");
      if (modal.querySelector(".frameWrapper")) {
        modal.remove();
      }
    }
    function setFrame(target) {
      return '<div class="frameWrapper"><iframe frameborder="0" allow="autoplay; fullscreen" src="' + target + '"/></div>';
    }
    function parseQueryParams(params) {
      const pairs = decodeURI(params.split("#")[0]).split("&");
      const obj = /* @__PURE__ */ new Map();
      let p2;
      for (let i2 = 0, n3 = pairs.length; i2 < n3; i2++) {
        if (!pairs[i2]) {
          continue;
        }
        p2 = pairs[i2].split("=");
        obj.set(p2[0], p2[1]);
      }
      return obj;
    }
    function appendQueryParams(url, params) {
      const keys = Object.keys(params);
      const query2 = keys.map((key) => `${key}=${params[key]}`).join("&");
      return `${url}${url.includes("?") ? "&" : "?"}${query2}`;
    }
  }
}
class Hamburger {
  constructor(TARGET = ".headerNavi", OPEN = "-open") {
    this.target = TARGET;
    this.open = OPEN;
    const nav = document.querySelector(TARGET);
    const btn = nav == null ? void 0 : nav.querySelector(".ac_menu");
    const btn_label = nav == null ? void 0 : nav.querySelector(".ac_menu span");
    const wrap = nav == null ? void 0 : nav.querySelector(".naviWrapper");
    const close_btn = nav == null ? void 0 : nav.querySelector(".closeBtn");
    btn == null ? void 0 : btn.addEventListener("click", () => {
      nav == null ? void 0 : nav.classList.toggle(OPEN);
      if (nav == null ? void 0 : nav.classList.contains(OPEN)) {
        btn.setAttribute("aria-expanded", "true");
        btn_label.textContent = "メニューを閉じる";
      } else {
        btn.setAttribute("aria-expanded", "false");
        btn_label.textContent = "メニューを開く";
      }
    });
    close_btn == null ? void 0 : close_btn.addEventListener("click", () => {
      menuClose();
    });
    wrap == null ? void 0 : wrap.addEventListener("click", (e2) => {
      const target = e2.target;
      if (target.closest("#navi") === null) {
        menuClose();
      }
    });
    const menuClose = () => {
      nav == null ? void 0 : nav.classList.remove(OPEN);
      btn.setAttribute("aria-expanded", "false");
      btn_label.textContent = "メニューを開く";
    };
    function subMenu() {
      const ac = document.querySelectorAll(".spAccordion");
      const HEIGHT = "--subHeightOpen";
      const OFFSET_TIME = 5;
      let openFlg = false;
      const SPEED = 250;
      ac.forEach((btn2) => {
        btn2 == null ? void 0 : btn2.addEventListener("click", () => {
          var _a2;
          const subMenu2 = (_a2 = btn2.closest("div")) == null ? void 0 : _a2.nextElementSibling;
          if (!openFlg) {
            subMenu2.classList.add("-open");
            btn2.classList.add("-open");
            const height = subMenu2.offsetHeight;
            subMenu2.style.setProperty(HEIGHT, "0");
            setTimeout(() => {
              subMenu2.style.setProperty(HEIGHT, `${height}px`);
              openFlg = true;
            }, OFFSET_TIME);
          } else if (openFlg) {
            subMenu2.style.setProperty(HEIGHT, "0");
            btn2.classList.remove("-open");
            setTimeout(() => {
              subMenu2.classList.remove("-open");
              openFlg = false;
              subMenu2.style.setProperty(HEIGHT, "auto");
            }, SPEED + OFFSET_TIME);
          }
        });
      });
    }
    subMenu();
  }
}
class ScrollAnimation {
  constructor(TARGET = ".scrollIn,.scroll", ACTIVE = "-active") {
    this.target = TARGET;
    this.active = ACTIVE;
    const elements = document.querySelectorAll(TARGET);
    const elementArr = Array.prototype.slice.call(elements);
    const options = {
      root: null,
      // ビューポートをルート要素とする
      rootMargin: "0px 0px",
      // ビューポートの中心を判定基準にする
      threshold: 0
      // 閾値は0
    };
    const observer = new IntersectionObserver(callback, options);
    elementArr.forEach((box) => {
      observer.observe(box);
    });
    function callback(entries) {
      entries.forEach((entry) => {
        const target = entry.target;
        if (entry.isIntersecting && !target.classList.contains(ACTIVE)) {
          setTimeout(() => {
            target.classList.add(ACTIVE);
          }, 5);
        }
      });
    }
  }
}
class Tab {
  constructor(TARGET = ".c_tab", OPEN = "-open") {
    this.target = TARGET;
    this.open = OPEN;
    const btns = document.querySelectorAll(TARGET + "_list li button");
    function onTabClick(e2) {
      const event = e2.target;
      const parent = event.closest(TARGET);
      const tabContents = parent == null ? void 0 : parent.querySelectorAll(TARGET + "_content");
      const tabArr = Array.prototype.slice.call(tabContents);
      const item = parent == null ? void 0 : parent.querySelectorAll(TARGET + "_list li button");
      const itemArr = Array.prototype.slice.call(item);
      const index = itemArr.indexOf(e2.target);
      itemArr.forEach((el) => {
        el.classList.remove(OPEN);
        el.setAttribute("aria-pressed", "false");
        el.setAttribute("tabindex", "0");
      });
      event.classList.add(OPEN);
      event.setAttribute("aria-pressed", "true");
      event.setAttribute("tabindex", "-1");
      tabArr.forEach((tab) => {
        tab.setAttribute("hidden", "");
        tab.setAttribute("tabindex", "-1");
      });
      tabArr[index].removeAttribute("hidden");
      tabArr[index].focus({ preventScroll: true });
    }
    btns.forEach((btn) => {
      btn.addEventListener("click", onTabClick);
    });
    if (btns.length > 0) {
      const url = new URL(window.location.href);
      const hash = url.hash;
      if (hash) {
        const number = Number(hash.slice(-1));
        if (!isNaN(number)) {
          btns[number - 1].click();
        }
      }
    }
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = globalThis, e$2 = t$2.ShadowRoot && (void 0 === t$2.ShadyCSS || t$2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s = Symbol(), o$2 = /* @__PURE__ */ new WeakMap();
let n$3 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$2 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$2.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$2.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$3 = (t2) => new n$3("string" == typeof t2 ? t2 : t2 + "", void 0, s), i$2 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$) return t3.cssText;
    if ("number" == typeof t3) return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1], t2[0]);
  return new n$3(o2, t2, s);
}, S$1 = (s2, o2) => {
  if (e$2) s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t$2.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$2 = e$2 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$3(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$1, defineProperty: e$1, getOwnPropertyDescriptor: r$2, getOwnPropertyNames: h$2, getOwnPropertySymbols: o$1, getPrototypeOf: n$2 } = Object, a = globalThis, c$1 = a.trustedTypes, l = c$1 ? c$1.emptyScript : "", p = a.reactiveElementPolyfillSupport, d = (t2, s2) => t2, u = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i2 = t2;
  switch (s2) {
    case Boolean:
      i2 = null !== t2;
      break;
    case Number:
      i2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i2 = JSON.parse(t2);
      } catch (t3) {
        i2 = null;
      }
  }
  return i2;
} }, f$2 = (t2, s2) => !i$1(t2, s2), y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f$2 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a.litPropertyMetadata ?? (a.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class b extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = y) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i2 = Symbol(), r2 = this.getPropertyDescriptor(t2, i2, s2);
      void 0 !== r2 && e$1(this.prototype, t2, r2);
    }
  }
  static getPropertyDescriptor(t2, s2, i2) {
    const { get: e2, set: h2 } = r$2(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get() {
      return e2 == null ? void 0 : e2.call(this);
    }, set(s3) {
      const r2 = e2 == null ? void 0 : e2.call(this);
      h2.call(this, s3), this.requestUpdate(t2, r2, i2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t2 = n$2(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t3 = this.properties, s2 = [...h$2(t3), ...o$1(t3)];
      for (const i2 of s2) this.createProperty(i2, t3[i2]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i2] of s2) this.elementProperties.set(t3, i2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i2 = this._$Eu(t3, s2);
      void 0 !== i2 && this._$Eh.set(i2, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i2 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i2.unshift(c$2(s3));
    } else void 0 !== s2 && i2.push(c$2(s2));
    return i2;
  }
  static _$Eu(t2, s2) {
    const i2 = s2.attribute;
    return false === i2 ? void 0 : "string" == typeof i2 ? i2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a2;
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a2 = this.constructor.l) == null ? void 0 : _a2.forEach((t2) => t2(this));
  }
  addController(t2) {
    var _a2;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && ((_a2 = t2.hostConnected) == null ? void 0 : _a2.call(t2));
  }
  removeController(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i2 of s2.keys()) this.hasOwnProperty(i2) && (t2.set(i2, this[i2]), delete this[i2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var _a2;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostConnected) == null ? void 0 : _a3.call(t2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostDisconnected) == null ? void 0 : _a3.call(t2);
    });
  }
  attributeChangedCallback(t2, s2, i2) {
    this._$AK(t2, i2);
  }
  _$EC(t2, s2) {
    var _a2;
    const i2 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i2);
    if (void 0 !== e2 && true === i2.reflect) {
      const r2 = (void 0 !== ((_a2 = i2.converter) == null ? void 0 : _a2.toAttribute) ? i2.converter : u).toAttribute(s2, i2.type);
      this._$Em = t2, null == r2 ? this.removeAttribute(e2) : this.setAttribute(e2, r2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    var _a2;
    const i2 = this.constructor, e2 = i2._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i2.getPropertyOptions(e2), r2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a2 = t3.converter) == null ? void 0 : _a2.fromAttribute) ? t3.converter : u;
      this._$Em = e2, this[e2] = r2.fromAttribute(s2, t3.type), this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i2) {
    if (void 0 !== t2) {
      if (i2 ?? (i2 = this.constructor.getPropertyOptions(t2)), !(i2.hasChanged ?? f$2)(this[t2], s2)) return;
      this.P(t2, s2, i2);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t2, s2, i2) {
    this._$AL.has(t2) || this._$AL.set(t2, s2), true === i2.reflect && this._$Em !== t2 && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t2);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t4, s3] of this._$Ep) this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s3, i2] of t3) true !== i2.wrapped || this._$AL.has(s3) || void 0 === this[s3] || this.P(s3, this[s3], i2);
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
        var _a3;
        return (_a3 = t3.hostUpdate) == null ? void 0 : _a3.call(t3);
      }), this.update(s2)) : this._$EU();
    } catch (s3) {
      throw t2 = false, this._$EU(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
      var _a3;
      return (_a3 = t3.hostUpdated) == null ? void 0 : _a3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((t3) => this._$EC(t3, this[t3]))), this._$EU();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d("elementProperties")] = /* @__PURE__ */ new Map(), b[d("finalized")] = /* @__PURE__ */ new Map(), p == null ? void 0 : p({ ReactiveElement: b }), (a.reactiveElementVersions ?? (a.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$1 = globalThis, c = n$1.trustedTypes, h$1 = c ? c.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, f$1 = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, m = "?" + v, _ = `<${m}>`, w = document, lt = () => w.createComment(""), st = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, g = Array.isArray, $ = (t2) => g(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]), x = "[ 	\n\f\r]", T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, E = /-->/g, k = />/g, O = RegExp(`>|${x}(?:([^\\s"'>=/]+)(${x}*=${x}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), S = /'/g, j = /"/g, M = /^(?:script|style|textarea|title)$/i, P = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), ke = P(1), R = Symbol.for("lit-noChange"), D = Symbol.for("lit-nothing"), V = /* @__PURE__ */ new WeakMap(), I = w.createTreeWalker(w, 129);
function N(t2, i2) {
  if (!g(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== h$1 ? h$1.createHTML(i2) : i2;
}
const U = (t2, i2) => {
  const s2 = t2.length - 1, e2 = [];
  let h2, o2 = 2 === i2 ? "<svg>" : 3 === i2 ? "<math>" : "", n3 = T;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let r2, l2, c2 = -1, a2 = 0;
    for (; a2 < s3.length && (n3.lastIndex = a2, l2 = n3.exec(s3), null !== l2); ) a2 = n3.lastIndex, n3 === T ? "!--" === l2[1] ? n3 = E : void 0 !== l2[1] ? n3 = k : void 0 !== l2[2] ? (M.test(l2[2]) && (h2 = RegExp("</" + l2[2], "g")), n3 = O) : void 0 !== l2[3] && (n3 = O) : n3 === O ? ">" === l2[0] ? (n3 = h2 ?? T, c2 = -1) : void 0 === l2[1] ? c2 = -2 : (c2 = n3.lastIndex - l2[2].length, r2 = l2[1], n3 = void 0 === l2[3] ? O : '"' === l2[3] ? j : S) : n3 === j || n3 === S ? n3 = O : n3 === E || n3 === k ? n3 = T : (n3 = O, h2 = void 0);
    const u2 = n3 === O && t2[i3 + 1].startsWith("/>") ? " " : "";
    o2 += n3 === T ? s3 + _ : c2 >= 0 ? (e2.push(r2), s3.slice(0, c2) + f$1 + s3.slice(c2) + v + u2) : s3 + v + (-2 === c2 ? i3 : u2);
  }
  return [N(t2, o2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : 3 === i2 ? "</math>" : "")), e2];
};
class B {
  constructor({ strings: t2, _$litType$: i2 }, s2) {
    let e2;
    this.parts = [];
    let h2 = 0, o2 = 0;
    const n3 = t2.length - 1, r2 = this.parts, [l2, a2] = U(t2, i2);
    if (this.el = B.createElement(l2, s2), I.currentNode = this.el.content, 2 === i2 || 3 === i2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (e2 = I.nextNode()) && r2.length < n3; ) {
      if (1 === e2.nodeType) {
        if (e2.hasAttributes()) for (const t3 of e2.getAttributeNames()) if (t3.endsWith(f$1)) {
          const i3 = a2[o2++], s3 = e2.getAttribute(t3).split(v), n4 = /([.?@])?(.*)/.exec(i3);
          r2.push({ type: 1, index: h2, name: n4[2], strings: s3, ctor: "." === n4[1] ? Y : "?" === n4[1] ? Z : "@" === n4[1] ? q : G }), e2.removeAttribute(t3);
        } else t3.startsWith(v) && (r2.push({ type: 6, index: h2 }), e2.removeAttribute(t3));
        if (M.test(e2.tagName)) {
          const t3 = e2.textContent.split(v), i3 = t3.length - 1;
          if (i3 > 0) {
            e2.textContent = c ? c.emptyScript : "";
            for (let s3 = 0; s3 < i3; s3++) e2.append(t3[s3], lt()), I.nextNode(), r2.push({ type: 2, index: ++h2 });
            e2.append(t3[i3], lt());
          }
        }
      } else if (8 === e2.nodeType) if (e2.data === m) r2.push({ type: 2, index: h2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = e2.data.indexOf(v, t3 + 1)); ) r2.push({ type: 7, index: h2 }), t3 += v.length - 1;
      }
      h2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = w.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function z(t2, i2, s2 = t2, e2) {
  var _a2, _b;
  if (i2 === R) return i2;
  let h2 = void 0 !== e2 ? (_a2 = s2.o) == null ? void 0 : _a2[e2] : s2.l;
  const o2 = st(i2) ? void 0 : i2._$litDirective$;
  return (h2 == null ? void 0 : h2.constructor) !== o2 && ((_b = h2 == null ? void 0 : h2._$AO) == null ? void 0 : _b.call(h2, false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2.o ?? (s2.o = []))[e2] = h2 : s2.l = h2), void 0 !== h2 && (i2 = z(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
}
class F {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = ((t2 == null ? void 0 : t2.creationScope) ?? w).importNode(i2, true);
    I.currentNode = e2;
    let h2 = I.nextNode(), o2 = 0, n3 = 0, r2 = s2[0];
    for (; void 0 !== r2; ) {
      if (o2 === r2.index) {
        let i3;
        2 === r2.type ? i3 = new et(h2, h2.nextSibling, this, t2) : 1 === r2.type ? i3 = new r2.ctor(h2, r2.name, r2.strings, this, t2) : 6 === r2.type && (i3 = new K(h2, this, t2)), this._$AV.push(i3), r2 = s2[++n3];
      }
      o2 !== (r2 == null ? void 0 : r2.index) && (h2 = I.nextNode(), o2++);
    }
    return I.currentNode = w, e2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class et {
  get _$AU() {
    var _a2;
    return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this.v;
  }
  constructor(t2, i2, s2, e2) {
    this.type = 2, this._$AH = D, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this.v = (e2 == null ? void 0 : e2.isConnected) ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === (t2 == null ? void 0 : t2.nodeType) && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = z(this, t2, i2), st(t2) ? t2 === D || null == t2 || "" === t2 ? (this._$AH !== D && this._$AR(), this._$AH = D) : t2 !== this._$AH && t2 !== R && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : $(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== D && st(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(w.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var _a2;
    const { values: i2, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = B.createElement(N(s2.h, s2.h[0]), this.options)), s2);
    if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e2) this._$AH.p(i2);
    else {
      const t3 = new F(e2, this), s3 = t3.u(this.options);
      t3.p(i2), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = V.get(t2.strings);
    return void 0 === i2 && V.set(t2.strings, i2 = new B(t2)), i2;
  }
  k(t2) {
    g(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i2.length ? i2.push(s2 = new et(this.O(lt()), this.O(lt()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var _a2;
    for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var _a2;
    void 0 === this._$AM && (this.v = t2, (_a2 = this._$AP) == null ? void 0 : _a2.call(this, t2));
  }
}
class G {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s2, e2, h2) {
    this.type = 1, this._$AH = D, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = D;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = z(this, t2, i2, 0), o2 = !st(t2) || t2 !== this._$AH && t2 !== R, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = z(this, e3[s2 + n3], i2, n3), r2 === R && (r2 = this._$AH[n3]), o2 || (o2 = !st(r2) || r2 !== this._$AH[n3]), r2 === D ? t2 = D : t2 !== D && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === D ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class Y extends G {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === D ? void 0 : t2;
  }
}
class Z extends G {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== D);
  }
}
class q extends G {
  constructor(t2, i2, s2, e2, h2) {
    super(t2, i2, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    if ((t2 = z(this, t2, i2, 0) ?? D) === R) return;
    const s2 = this._$AH, e2 = t2 === D && s2 !== D || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== D && (s2 === D || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var _a2;
    "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class K {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    z(this, t2);
  }
}
const Re = n$1.litHtmlPolyfillSupport;
Re == null ? void 0 : Re(B, et), (n$1.litHtmlVersions ?? (n$1.litHtmlVersions = [])).push("3.2.0");
const Q = (t2, i2, s2) => {
  const e2 = (s2 == null ? void 0 : s2.renderBefore) ?? i2;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = (s2 == null ? void 0 : s2.renderBefore) ?? null;
    e2._$litPart$ = h2 = new et(i2.insertBefore(lt(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class h extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this.o = void 0;
  }
  createRenderRoot() {
    var _a2;
    const t2 = super.createRenderRoot();
    return (_a2 = this.renderOptions).renderBefore ?? (_a2.renderBefore = t2.firstChild), t2;
  }
  update(t2) {
    const e2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this.o = Q(e2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a2;
    super.connectedCallback(), (_a2 = this.o) == null ? void 0 : _a2.setConnected(true);
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback(), (_a2 = this.o) == null ? void 0 : _a2.setConnected(false);
  }
  render() {
    return R;
  }
}
h._$litElement$ = true, h["finalized"] = true, (_a = globalThis.litElementHydrateSupport) == null ? void 0 : _a.call(globalThis, { LitElement: h });
const f = globalThis.litElementPolyfillSupport;
f == null ? void 0 : f({ LitElement: h });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = (t2) => (e2, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t2, e2);
  }) : customElements.define(t2, e2);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f$2 }, r$1 = (t2 = o, e2, r2) => {
  const { kind: n3, metadata: i2 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i2);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i2, s2 = /* @__PURE__ */ new Map()), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2);
    }, init(e3) {
      return void 0 !== e3 && this.P(o2, void 0, t2), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n2(t2) {
  return (e2, o2) => "object" == typeof o2 ? r$1(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, r2 ? { ...t3, wrapped: true } : t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r(r2) {
  return n2({ ...r2, state: true, attribute: false });
}
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$2(target, key, result);
  return result;
};
let Filter = class extends h {
  constructor() {
    super(...arguments);
    this.category = [];
    this.type = "checkbox";
    this.search = "AND";
    this.src = null;
    this.data = [];
    this.array = [];
    this.show = 0;
    this.SHOW_CLASS_NAME = "-visible";
    this.ALL_CARD_LIST = this.querySelectorAll(".c_filter_item");
    this._targetElements = [];
    this._filterCats = [];
    this._matchedLists = [];
    this._matchedCount = 0;
    this._maxCount = 0;
    this._handleMoreButtonClick = () => {
      if (this._matchedCount < 1) {
        return;
      }
      if (this.visible) {
        this._maxCount = this.show + +this.visible;
      }
      for (let i2 = this.show; i2 < this._maxCount && i2 < this._matchedCount; i2++) {
        if (!this.src) {
          this._matchedLists[i2].classList.add(this.SHOW_CLASS_NAME);
        }
        this.show++;
      }
      this._showMoreBtn(this.show, this._matchedCount);
    };
  }
  // 最大表示件数
  // private show: number = 0; // 現在の表示件数
  async fetchData() {
    if (this.src) {
      try {
        const response = await fetch(srcCheck(sanitize(this.src)) + ".json");
        const data = await response.json();
        this.data = data;
        this.array = JSON.parse(JSON.stringify(this.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }
  // DOM描画
  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
    this._targetElements = [...this.children];
  }
  // 初期描画
  firstUpdated() {
    var _a2;
    const slots = Filter.findSlots(this.children);
    for (const child2 of this._targetElements) {
      let targetSlot = null;
      if (child2.hasAttribute("slot")) {
        const slotName = (_a2 = child2.attributes.getNamedItem("slot")) == null ? void 0 : _a2.value;
        targetSlot = slots.find((slot) => {
          var _a3;
          return ((_a3 = slot.attributes.getNamedItem("name")) == null ? void 0 : _a3.value) === slotName;
        });
      } else {
        targetSlot = slots[0];
      }
      if (targetSlot) {
        child2.remove();
        targetSlot.append(child2);
      }
    }
    this._targetElements = [];
    setTimeout(() => {
      this._setCatAll();
    }, 400);
  }
  // DOM構造
  render() {
    if (this.src && !this.data.length) {
      return ke`<div aria-busy="true">Coming soon...</div>`;
    }
    return ke`
    <div class="c_filter">
      <ul class="c_filter_list grid grid-cols-5 mb-[1.6rem] gap-[0.8rem]">
      ${// 「すべて選択」が必要な場合
    this.all ? ke`
        <li class=${!this.all ? "txtHidden" : ""}>
          <input type=${this.type} @click=${this._handleClick} name="filter" value="allCat" id="cat0" />
          <label for="cat0">${this.all}</label>
        </li>
        ` : null}
        ${// categoryの分だけボタンを描画
    this.category.map(
      (cat, i2) => ke`
            <li>
              <input type=${this.type} @click=${this._handleClick} name="filter" value=${cat} id="cat${i2 + 1}" />
              <label for="cat${i2 + 1}">${cat}</label>
            </li>
          `
    )}
      </ul>
      ${// jsonからDOMを作る場合
    this.src ? ke`
          <div class="grid grid-cols-3 gap-[3.2rem]">
            ${this.array.map((item, i2) => {
      return ke`
              ${i2 < this.show ? ke`
                <div class="border-prime c_filter_item border-[0.1rem] -visible">
                  <img src="${item.img.src}" width="${item.img.size[0]}" height="${item.img.size[1]}" decoding="async" loading="lazy">
                  <div class="p-[2.4rem]">
                    <div class="flex gap-[1.6rem] mb-[1.2rem]">
                      ${item.cat.map((cat) => {
        return ke`
                          <span class="c_filter_cat bg-prime text-reversal text-sm p-[0.1em_0.5em]">${cat}</span>
                        `;
      })}
                    </div>
                    <h3 class="text-prime font-bold mb-[0.8rem]">
                      <span class="block.text-sm"> No.${i2 + 1}</span>
                      <span class="text-lg">${item.ttl}さん</span>
                    </h3>
                    <p>${item.txt}</p>
                  </div>
                </div>
                ` : ``}
              `;
    })}
          </div>
          ` : ke`<slot name="content"></slot>`}
      ${// visibleオプションが設定されている場合にmoreボタン描画
    this.visible ? ke`
          <button class="c_filter_more" @click=${this._handleMoreButtonClick}>もっと見る</button>
        ` : ke``}
    </div>
    `;
  }
  // -----------------------------------------
  // カテゴリー選択時のイベントハンドラ
  // -----------------------------------------
  _handleClick(e2) {
    const target = e2.target;
    const keyword = target.value;
    const cateStr = target.checked ? target.value : "";
    if (!this.ALL_CARD_LIST) {
      return;
    }
    if (cateStr === "allCat") {
      this._setCatAll();
    } else {
      const checkAll = this.querySelector("#cat0");
      if (checkAll) {
        checkAll.checked = false;
      }
      if (target.checked) {
        if (this.type === "radio") {
          this._filterCats = [];
        }
        this._filterCats.push(keyword);
      } else {
        this._filterCats = this._filterCats.filter((k2) => k2 !== keyword);
      }
      this._filterElements();
    }
    if (this._filterCats.length === 0) {
      this._setCatAll();
    }
  }
  // フィルタリング
  _filterElements(all) {
    this.ALL_CARD_LIST = this.querySelectorAll(".c_filter_item");
    this._matchedLists = [];
    this._matchedCount = 0;
    this.show = 0;
    this._maxCount = 0;
    if (this.src) {
      if (this.search === "OR") {
        this.array = this.data.filter((item) => this._filterCats.some((tag) => item.cat.includes(tag)));
      } else {
        this.array = this.data.filter((item) => this._filterCats.every((tag) => item.cat.includes(tag)));
      }
      this._matchedCount = this.array.length;
    } else {
      this.ALL_CARD_LIST.forEach((card) => {
        card.classList.remove(this.SHOW_CLASS_NAME);
        if (all) {
          this._matchedLists.push(card);
        } else {
          const cardTexts = [];
          card.querySelectorAll(".c_filter_cat").forEach((cat) => {
            if (cat.textContent) {
              cardTexts.push(cat.textContent.toLowerCase());
            }
          });
          const isMatch = this.search === "OR" ? this._filterCats.some((keyword) => cardTexts.includes(keyword.toLowerCase())) : this._filterCats.every((keyword) => cardTexts.includes(keyword.toLowerCase()));
          if (isMatch) {
            this._matchedLists.push(card);
          }
        }
      });
      this._matchedCount = this._matchedLists.length;
    }
    const firstShowNum = this.visible ? this.visible : this._matchedCount;
    for (let i2 = 0; i2 < firstShowNum && i2 < this._matchedCount; i2++) {
      if (!this.src) {
        this._matchedLists[i2].classList.add(this.SHOW_CLASS_NAME);
      }
      this.show++;
    }
    if (this.visible) {
      this._showMoreBtn(this.show, this._matchedCount);
    }
  }
  // -----------------------------------------
  // moreボタンの表示関数
  // -----------------------------------------
  // 現在表示件数が一致件数よりも少ない場合はmoreボタンを表示
  _showMoreBtn(showCountNum, matchedListNum) {
    const MORE_BTN = this.querySelector(".c_filter_more");
    if (showCountNum < matchedListNum) {
      MORE_BTN == null ? void 0 : MORE_BTN.classList.add(this.SHOW_CLASS_NAME);
    } else {
      MORE_BTN == null ? void 0 : MORE_BTN.classList.remove(this.SHOW_CLASS_NAME);
    }
  }
  // -----------------------------------------
  // 全件表示の関数
  // -----------------------------------------
  _setCatAll() {
    const checkAll = this.querySelector("#cat0");
    if (checkAll) {
      const checkbox = this.querySelectorAll("input");
      checkbox.forEach((input, i2) => {
        if (i2 !== 0) {
          input.checked = false;
        }
      });
      this._filterCats = [];
      checkAll.checked = true;
      this._filterElements(true);
    }
  }
  /**
   * カスタムエレメントからslotを取得してLight DOMでも表示できるようにする
   * @param children target children
   * @returns Element[] slot elements
   */
  static findSlots(children2) {
    let slots = [];
    for (const child2 of children2) {
      if (child2.tagName === "SLOT") {
        slots.push(child2);
      } else if (child2.tagName.indexOf("-") < 0) {
        slots = slots.concat(this.findSlots(child2.children));
      }
    }
    return slots;
  }
  // DOM描画
  createRenderRoot() {
    return this;
  }
};
__decorateClass$2([
  n2({ type: Array })
], Filter.prototype, "category", 2);
__decorateClass$2([
  n2()
], Filter.prototype, "all", 2);
__decorateClass$2([
  n2()
], Filter.prototype, "visible", 2);
__decorateClass$2([
  n2()
], Filter.prototype, "type", 2);
__decorateClass$2([
  n2()
], Filter.prototype, "search", 2);
__decorateClass$2([
  n2()
], Filter.prototype, "src", 2);
__decorateClass$2([
  n2({ type: Array })
], Filter.prototype, "data", 2);
__decorateClass$2([
  n2({ type: Array })
], Filter.prototype, "array", 2);
__decorateClass$2([
  n2()
], Filter.prototype, "show", 2);
Filter = __decorateClass$2([
  t$1("filter-list")
], Filter);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, e = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
class i {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i2) {
    this.t = t2, this._$AM = e2, this.i = i2;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class le extends i {
  constructor(i2) {
    if (super(i2), this.it = D, i2.type !== t.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t2) {
    if (t2 === D || null == t2) return this._t = void 0, this.it = t2;
    if (t2 === R) return t2;
    if ("string" != typeof t2) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t2 === this.it) return this._t;
    this.it = t2;
    const i2 = [t2];
    return i2.raw = i2, this._t = { _$litType$: this.constructor.resultType, strings: i2, values: [] };
  }
}
le.directiveName = "unsafeHTML", le.resultType = 1;
const ae = e(le);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
let NewsArchive = class extends h {
  constructor() {
    super(...arguments);
    this.src = "";
    this.href = "";
    this.data = [];
    this.visible = 3;
    this.headline = 3;
    this.show = 0;
    this.page = 1;
    this.single = false;
    this.post = 0;
    this.ACTIVE_CLASS_NAME = "-current";
    this._maxCount = 0;
    this._archiveUrl = "";
  }
  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
    window.addEventListener("popstate", this._handlePopstate.bind(this));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.fetchData();
    window.removeEventListener("popstate", this._handlePopstate.bind(this));
  }
  async fetchData() {
    try {
      const response = await fetch(srcCheck(sanitize(this.src)) + ".json");
      const data = await response.json();
      this.data = data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  // 初期描画
  firstUpdated() {
    this._maxCount = this.visible;
    this._archiveUrl = sanitize(this.href);
    if (this.getQuery()) {
      this.post = this.getQuery();
      this.single = true;
    }
  }
  render() {
    if (!this.data.length) {
      return ke`<div aria-busy="true" class="fadeIn"></div>`;
    }
    const pageCount = Math.ceil(this.data.length / this.visible);
    return ke`
    ${this.href !== "" ? ke`
      <dl class="flex flex-col justify-between archiveList md:gap-y-[6.5rem] gap-y-[4.9rem]">
        ${this.data.map((item, i2) => {
      if (i2 < this.headline) {
        return ke`
              <div class="grid md:grid-cols-[13.1rem,auto] md:gap-[3rem] gap-[1.2rem]">
                <dt>
                  ${// 日付
        item.date ? ke`
                      <time datetime=${getTime(item.date)}>${item.date}</time>
                      ` : null}
                </dt>
                <dd>
                  <a href="${item.link ? item.link : this.href.includes("http") ? null : this._archiveUrl + "#post-" + (i2 + 1)}" class="linkArrow block">${item.ttl ? item.ttl : null}</a>
                </dd>
              </div>
            `;
      }
    })}
      </dl>
      ` : ke`
      <div class="grid gap-[3.2rem]">
        ${this.data.map((item, i2) => {
      return ke`
            ${this.single !== true ? ke`
              ${// アーカイブ
      this.show - 1 <= i2 && i2 <= this._maxCount - 1 ? ke`
                <div class="border-prime border-[0.1rem] rounded-[1rem] overflow-hidden fadeUp">
                  <a href="${item.link ? item.link : this.href.includes("http") ? null : this._archiveUrl + "#post-" + (i2 + 1)}" class="grid grid-cols-[auto_1fr] gap-[3rem] items-center" @click=${() => this._showSingle(i2 + 1)}>
                    ${// 画像
      item.img ? ke`
                      <img src="${item.img.src}" width="${item.img.size && item.img.size[0] ? item.img.size[0] : null}" height="${item.img.size && item.img.size[1] ? item.img.size[1] : null}" decoding="async" loading="lazy" class="aspect-[240/160] object-cover w-full max-w-[48rem]">
                      ` : ke`
                      <img src="/_assets/img/top/noimage.jpg" width="480" height="320" decoding="async" loading="lazy" class="aspect-[240/160] object-cover w-full">
                      `}
                    <div>
                    ${// タグ
      item.tag ? ke`
                      <div class="flex gap-[1.6rem] mb-[1.2rem]">
                        ${item.tag.map((tag) => {
        return ke`
                            <span class="bg-prime text-reversal text-sm p-[0.1em_0.5em]">${tag}</span>
                          `;
      })}
                      </div>
                      ` : null}
                    ${// 日付
      item.date ? ke`
                      <time datetime=${getTime(item.date)}>${item.date}</time>
                      ` : null}
                    ${// タイトル
      item.ttl ? ke`
                      <h3 class="text-prime font-bold mb-[0.8rem]">${item.ttl}</h3>
                      ` : null}
                    </div>
                  </a>
                </div>
                ` : null}` : ke`
                ${i2 == this.post - 1 ? ke`
                    <div class="fadeUp">
                    <section class="md:pt-[6.4rem] pt-[3.6rem] mb-[3.2rem]">
                      <div class="contentInner">
                        ${// 日付
      item.date ? ke`
                          <span class="block md:mb-[1rem] mb-[0.8rem]">
                            <time datetime=${getTime(item.date)}>${item.date}</time>
                          </span>
                          ` : null}
                        ${// タグ
      item.tag ? ke`
                          <div class="flex gap-[1.6rem] mb-[1.2rem]">
                            ${item.tag.map((tag) => {
        return ke`
                                <span class="bg-prime text-reversal text-sm p-[0.1em_0.5em]">${tag}</span>
                              `;
      })}
                          </div>
                          ` : null}
                        ${// タイトル
      item.ttl ? ke`
                          <h1 class="font-bold text-h1"><span class="c_ttl_h1__jp">${item.ttl}</span></h1>
                          ` : null}
                      </div>
                    </section><!-- /下層タイトル -->
                    <section class="md:mb-[2.4rem] mb-[1.6rem]">
                      <div class="contentInner">
                        <div class="bg-highlight md:rounded-[4rem] rounded-[5.6rem] md:p-[8rem] p-[5.6rem_2.4rem]">
                          <div class="overflow-hidden rounded-[0.8rem] mb-[3.6rem]">
                            ${// 画像
      item.img ? ke`
                              <img src="${item.img.src}" width="${item.img.size && item.img.size[0] ? item.img.size[0] : null}" height="${item.img.size && item.img.size[1] ? item.img.size[1] : null}" decoding="async" loading="lazy" class="aspect-[240/160] object-cover w-full">
                              ` : ke`
                              <img src="/_assets/img/top/noimage.jpg" width="480" height="320" decoding="async" loading="lazy" class="aspect-[240/160] object-cover w-full">
                              `}
                          </div>
                          <div class="postContent">
                            ${// コンテンツ
      item.content ? ke`
                              ${ae(item.content.replace(/script>/g, "スクリプト&gt;").replace(/style>/g, "スタイル&gt;"))}
                              ` : ke`<div>Coming soon...</div>`}
                          </div>
                        </div>
                      </div>
                    </section><!-- /ニュース詳細 -->
                    <div class="contentInner">
                      <a href="#" class="c_btn max-w-[24rem]">記事一覧に戻る</a>
                    </div>
                  </div>
                ` : null}
                `}
        `;
    })}
      </div>
      ${// ページャー
    this.single !== true && this.data.length > this.visible ? ke`
          <nav aria-label="ページ送り">
            <ol class="c_pager fadeUp">
              ${this.page > 1 ? ke`
              <li class="c_pager_item">
                  <button class="c_pager_btn -arrow -prev"  @click=${() => this._changePage(this.page - 1)}><span class="txtHidden">前のページ</span></button>
                </li>
              ` : null}
              ${Array.from({ length: pageCount }).map(
      (_2, i2) => ke`
                <li class="c_pager_item">
                  <button class="c_pager_btn -number ${i2 == 0 ? this.ACTIVE_CLASS_NAME : null}"  @click=${() => this._changePage(i2 + 1)}>${i2 + 1}<span class="txtHidden">ページ</span></button>
                </li>
              `
    )}
              ${this.page < pageCount ? ke`
              <li class="c_pager_item">
                  <button class="c_pager_btn -arrow -next"  @click=${() => this._changePage(this.page + 1)}><span>次のページ</span></button>
                </li>
              ` : null}
            </ol>
          </nav>
          ` : null}
        `}
    `;
  }
  // -----------------------------------------
  // ページャークリック時のイベントハンドラ
  // -----------------------------------------
  _changePage(page) {
    const btns = this.querySelectorAll(".c_pager_btn.-number");
    btns.forEach((btn) => {
      btn.classList.remove(this.ACTIVE_CLASS_NAME);
    });
    btns[page - 1].classList.add(this.ACTIVE_CLASS_NAME);
    this.page = page;
    this._maxCount = this.visible * page;
    this.show = this._maxCount - this.visible + 1;
  }
  // -----------------------------------------
  // 記事クリック時のイベントハンドラ
  // -----------------------------------------
  _showSingle(id) {
    this.post = id;
    this.single = true;
  }
  // -----------------------------------------
  // URLに直接入力し場合の処理
  // -----------------------------------------
  // getQuery()メソッド内で、ハッシュ値を取得し、_postを更新
  getQuery() {
    const urlHash = Number(location.hash.split("#post-")[1]);
    return urlHash;
  }
  _handlePopstate() {
    if (this.getQuery()) {
      this.post = this.getQuery();
      this.single = true;
    } else {
      this.single = false;
      setTimeout(() => {
        this._changePage(this.page);
      }, 200);
    }
  }
  // DOM描画
  createRenderRoot() {
    return this;
  }
};
__decorateClass$1([
  n2()
], NewsArchive.prototype, "src", 2);
__decorateClass$1([
  n2()
], NewsArchive.prototype, "href", 2);
__decorateClass$1([
  n2({ type: Array })
], NewsArchive.prototype, "data", 2);
__decorateClass$1([
  n2()
], NewsArchive.prototype, "visible", 2);
__decorateClass$1([
  n2()
], NewsArchive.prototype, "headline", 2);
__decorateClass$1([
  n2()
], NewsArchive.prototype, "show", 2);
__decorateClass$1([
  n2()
], NewsArchive.prototype, "page", 2);
__decorateClass$1([
  n2()
], NewsArchive.prototype, "single", 2);
__decorateClass$1([
  n2()
], NewsArchive.prototype, "post", 2);
NewsArchive = __decorateClass$1([
  t$1("news-archive")
], NewsArchive);
class SmoothScroll {
  constructor(HEADER_FIX = false) {
    this.header_fix = HEADER_FIX;
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (e2) => {
        e2.preventDefault();
        const href = anchor.getAttribute("href");
        let target;
        if (!href) {
          return;
        }
        if (href === "#") {
          target = document.body;
          smoothScroll(target);
        } else if (href) {
          target = document.getElementById(href.replace("#", ""));
          if (target && this.header_fix) {
            const header = document.querySelector("header");
            const headerHeight = header == null ? void 0 : header.clientHeight;
            target.style.scrollMarginBlockStart = String(headerHeight) + "px";
          }
          smoothScroll(target);
        }
      });
    });
    function smoothScroll(target) {
      const isPrefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const scrollBehavior = isPrefersReduced ? "instant" : "smooth";
      setTimeout(() => {
        target == null ? void 0 : target.focus({ preventScroll: true });
        if (document.activeElement !== target) {
          target == null ? void 0 : target.setAttribute("tabindex", "-1");
          target == null ? void 0 : target.focus({ preventScroll: true });
        }
        target == null ? void 0 : target.scrollIntoView({ behavior: scrollBehavior, inline: "end" });
      }, 0);
    }
    const urlHash = location.hash;
    if (urlHash) {
      const urlTarget = document.querySelector(urlHash);
      if (urlTarget) {
        if (urlTarget && this.header_fix) {
          const header = document.querySelector("header");
          const headerHeight = header == null ? void 0 : header.clientHeight;
          urlTarget.style.scrollMarginBlockStart = String(headerHeight) + "px";
        }
        urlTarget.scrollIntoView({ behavior: "instant", inline: "end" });
      }
    }
  }
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
let GuideTour = class extends h {
  constructor() {
    super(...arguments);
    this.targets = [];
    this.currentIndex = 0;
    this.prev = "前のステップ";
    this.next = "次のステップ";
  }
  connectedCallback() {
    super.connectedCallback();
    const slots = this.querySelectorAll(".c_help_txt");
    this.targets = [...slots].map((slot) => slot.getAttribute("slot"));
  }
  render() {
    const currentTargetId = this.targets[this.currentIndex];
    const target = document.querySelector(`#${currentTargetId}`);
    if (!target) return ke``;
    return ke`
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
                <span class="stepNum">ステップ：<span class="stepNum-current">${this.currentIndex + 1}</span><span class="stepNum-all">${this.targets.length}</span></span>
              </p>
              <slot name="${currentTargetId}"></slot>
              ${this.currentIndex + 1 === this.targets.length ? ke`
                <span class="c_help_caution">※最後のステップです</span>` : null}
            </div>
            <button class="c_help_arrow -prev${this.currentIndex === 0 ? " -disable" : null}" tabindex="${this.currentIndex === 0 ? -1 : 0}" @click=${this._handleClick}><span class="txtHidden">${this.prev}</span></button>
            <button class="c_help_arrow -next" @click=${this._handleClick}><span class="txtHidden">${this.next}</span></button>
            <button class="c_help_close" @click=${this._popoverClose}><span class="txtHidden">ヘルプを閉じる</span></button>
          </div>
        </div>
      </div>
    `;
  }
  // popoverの表示
  _popoverOpen() {
    var _a2;
    const popover = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector(".c_help_pop");
    popover == null ? void 0 : popover.showPopover();
    this._popSwitch();
  }
  // popoverの非表示
  _popoverClose() {
    var _a2, _b;
    const popover = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector(".c_help_pop");
    popover == null ? void 0 : popover.hidePopover();
    const pop = (_b = this.shadowRoot) == null ? void 0 : _b.querySelector(".c_help_pop");
    pop.classList.remove("-visible");
    pop.style.setProperty("--targetHeight", "0");
    pop.style.setProperty("--popY", "0");
  }
  // テキストを更新する
  _handleClick(e2) {
    var _a2, _b;
    const target = e2.target;
    const text = (_a2 = target.querySelector(".txtHidden")) == null ? void 0 : _a2.textContent;
    const pop = (_b = this.shadowRoot) == null ? void 0 : _b.querySelector(".c_help_pop");
    if (pop.classList.contains("-visible")) {
      pop.classList.remove("-visible");
    }
    setTimeout(() => {
      if (text === this.next && this.currentIndex + 1 === this.targets.length) {
        this._popoverClose();
      } else if (text === this.next && this.currentIndex < this.targets.length) {
        this.currentIndex++;
      } else if (text === this.prev && this.currentIndex > 0) {
        this.currentIndex--;
      }
      this._popSwitch();
    }, 100);
  }
  // 交差オブザーバーでスクロール後に要素が画面内に入るのを待機
  _popSwitch() {
    const targetId = this.targets[this.currentIndex];
    if (targetId) {
      const scrollTarget = document.getElementById(targetId);
      if (scrollTarget) {
        this.smoothScroll(scrollTarget);
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              observer.disconnect();
              setTimeout(() => {
                this._setPopup(scrollTarget);
              }, 500);
            }
          });
        });
        observer.observe(scrollTarget);
      }
    }
  }
  // ポップを表示する
  _setPopup(scrollTarget) {
    var _a2;
    const pop = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector(".c_help_pop");
    const targetHeight = scrollTarget.offsetHeight;
    const targetY = scrollTarget.getBoundingClientRect().top;
    const targetX = scrollTarget.getBoundingClientRect().left;
    const windowHeight = window.innerHeight;
    const popHeight = pop.offsetHeight;
    const flag = windowHeight / 2 < targetY ? true : false;
    const popY = flag === false ? Number(targetHeight + targetY) : Number(targetY - popHeight);
    if (pop) {
      pop.style.setProperty("--targetHeight", `${targetHeight}px`);
      pop.style.setProperty("--targetY", `${Number(targetHeight + targetY)}px`);
      pop.style.setProperty("--popY", `${Number(popY)}px`);
      pop.style.setProperty("--popX", `${targetX}px`);
      pop.style.setProperty("--progress", `${Number(24 * 3.14 * (this.currentIndex + 1) / this.targets.length)}`);
      pop.classList.add("-visible");
      if (flag) {
        pop.classList.add("-reversal");
      } else {
        pop.classList.remove("-reversal");
      }
    }
  }
  // スムーススクロール
  smoothScroll(target) {
    if (target) {
      const isPrefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const scrollBehavior = isPrefersReduced ? "instant" : "smooth";
      const header = document.querySelector("header");
      if (header) {
        const computedStyle = window.getComputedStyle(header);
        const position = computedStyle.position;
        const headerHeight = position === "fixed" ? header.clientHeight : 0;
        target.scrollIntoView({ behavior: scrollBehavior, inline: "end", block: "center" });
        target.style.scrollMarginBlockStart = String(headerHeight + "px");
      }
    }
  }
};
GuideTour.styles = i$2`
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
      width: 3rem;
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
      width: 2rem;
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

  `;
__decorateClass([
  n2({ type: Array })
], GuideTour.prototype, "targets", 2);
__decorateClass([
  r()
], GuideTour.prototype, "currentIndex", 2);
__decorateClass([
  n2()
], GuideTour.prototype, "prev", 2);
GuideTour = __decorateClass([
  t$1("guide-tour")
], GuideTour);
function _defineProperties(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
/*!
 * Splide.js
 * Version  : 4.1.4
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
var MEDIA_PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
var CREATED = 1;
var MOUNTED = 2;
var IDLE = 3;
var MOVING = 4;
var SCROLLING = 5;
var DRAGGING = 6;
var DESTROYED = 7;
var STATES = {
  CREATED,
  MOUNTED,
  IDLE,
  MOVING,
  SCROLLING,
  DRAGGING,
  DESTROYED
};
function empty(array) {
  array.length = 0;
}
function slice(arrayLike, start, end) {
  return Array.prototype.slice.call(arrayLike, start, end);
}
function apply(func) {
  return func.bind.apply(func, [null].concat(slice(arguments, 1)));
}
var nextTick = setTimeout;
var noop = function noop2() {
};
function raf(func) {
  return requestAnimationFrame(func);
}
function typeOf(type, subject) {
  return typeof subject === type;
}
function isObject(subject) {
  return !isNull(subject) && typeOf("object", subject);
}
var isArray = Array.isArray;
var isFunction = apply(typeOf, "function");
var isString = apply(typeOf, "string");
var isUndefined = apply(typeOf, "undefined");
function isNull(subject) {
  return subject === null;
}
function isHTMLElement(subject) {
  try {
    return subject instanceof (subject.ownerDocument.defaultView || window).HTMLElement;
  } catch (e2) {
    return false;
  }
}
function toArray(value) {
  return isArray(value) ? value : [value];
}
function forEach(values, iteratee) {
  toArray(values).forEach(iteratee);
}
function includes(array, value) {
  return array.indexOf(value) > -1;
}
function push(array, items) {
  array.push.apply(array, toArray(items));
  return array;
}
function toggleClass(elm, classes, add) {
  if (elm) {
    forEach(classes, function(name) {
      if (name) {
        elm.classList[add ? "add" : "remove"](name);
      }
    });
  }
}
function addClass(elm, classes) {
  toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
}
function append(parent, children2) {
  forEach(children2, parent.appendChild.bind(parent));
}
function before(nodes, ref) {
  forEach(nodes, function(node) {
    var parent = (ref || node).parentNode;
    if (parent) {
      parent.insertBefore(node, ref);
    }
  });
}
function matches(elm, selector) {
  return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
}
function children(parent, selector) {
  var children2 = parent ? slice(parent.children) : [];
  return selector ? children2.filter(function(child2) {
    return matches(child2, selector);
  }) : children2;
}
function child(parent, selector) {
  return selector ? children(parent, selector)[0] : parent.firstElementChild;
}
var ownKeys = Object.keys;
function forOwn(object, iteratee, right) {
  if (object) {
    (right ? ownKeys(object).reverse() : ownKeys(object)).forEach(function(key) {
      key !== "__proto__" && iteratee(object[key], key);
    });
  }
  return object;
}
function assign(object) {
  slice(arguments, 1).forEach(function(source) {
    forOwn(source, function(value, key) {
      object[key] = source[key];
    });
  });
  return object;
}
function merge(object) {
  slice(arguments, 1).forEach(function(source) {
    forOwn(source, function(value, key) {
      if (isArray(value)) {
        object[key] = value.slice();
      } else if (isObject(value)) {
        object[key] = merge({}, isObject(object[key]) ? object[key] : {}, value);
      } else {
        object[key] = value;
      }
    });
  });
  return object;
}
function omit(object, keys) {
  forEach(keys || ownKeys(object), function(key) {
    delete object[key];
  });
}
function removeAttribute(elms, attrs) {
  forEach(elms, function(elm) {
    forEach(attrs, function(attr) {
      elm && elm.removeAttribute(attr);
    });
  });
}
function setAttribute(elms, attrs, value) {
  if (isObject(attrs)) {
    forOwn(attrs, function(value2, name) {
      setAttribute(elms, name, value2);
    });
  } else {
    forEach(elms, function(elm) {
      isNull(value) || value === "" ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
    });
  }
}
function create(tag, attrs, parent) {
  var elm = document.createElement(tag);
  if (attrs) {
    isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
  }
  parent && append(parent, elm);
  return elm;
}
function style(elm, prop, value) {
  if (isUndefined(value)) {
    return getComputedStyle(elm)[prop];
  }
  if (!isNull(value)) {
    elm.style[prop] = "" + value;
  }
}
function display(elm, display2) {
  style(elm, "display", display2);
}
function focus(elm) {
  elm["setActive"] && elm["setActive"]() || elm.focus({
    preventScroll: true
  });
}
function getAttribute(elm, attr) {
  return elm.getAttribute(attr);
}
function hasClass(elm, className) {
  return elm && elm.classList.contains(className);
}
function rect(target) {
  return target.getBoundingClientRect();
}
function remove(nodes) {
  forEach(nodes, function(node) {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}
function parseHtml(html) {
  return child(new DOMParser().parseFromString(html, "text/html").body);
}
function prevent(e2, stopPropagation) {
  e2.preventDefault();
  if (stopPropagation) {
    e2.stopPropagation();
    e2.stopImmediatePropagation();
  }
}
function query(parent, selector) {
  return parent && parent.querySelector(selector);
}
function queryAll(parent, selector) {
  return selector ? slice(parent.querySelectorAll(selector)) : [];
}
function removeClass(elm, classes) {
  toggleClass(elm, classes, false);
}
function timeOf(e2) {
  return e2.timeStamp;
}
function unit(value) {
  return isString(value) ? value : value ? value + "px" : "";
}
var PROJECT_CODE = "splide";
var DATA_ATTRIBUTE = "data-" + PROJECT_CODE;
function assert(condition, message) {
  if (!condition) {
    throw new Error("[" + PROJECT_CODE + "] " + (message || ""));
  }
}
var min = Math.min, max = Math.max, floor = Math.floor, ceil = Math.ceil, abs = Math.abs;
function approximatelyEqual(x2, y2, epsilon) {
  return abs(x2 - y2) < epsilon;
}
function between(number, x2, y2, exclusive) {
  var minimum = min(x2, y2);
  var maximum = max(x2, y2);
  return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
}
function clamp(number, x2, y2) {
  var minimum = min(x2, y2);
  var maximum = max(x2, y2);
  return min(max(minimum, number), maximum);
}
function sign(x2) {
  return +(x2 > 0) - +(x2 < 0);
}
function format(string, replacements) {
  forEach(replacements, function(replacement) {
    string = string.replace("%s", "" + replacement);
  });
  return string;
}
function pad(number) {
  return number < 10 ? "0" + number : "" + number;
}
var ids = {};
function uniqueId(prefix) {
  return "" + prefix + pad(ids[prefix] = (ids[prefix] || 0) + 1);
}
function EventBinder() {
  var listeners = [];
  function bind(targets, events, callback, options) {
    forEachEvent(targets, events, function(target, event, namespace) {
      var isEventTarget = "addEventListener" in target;
      var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
      isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
      listeners.push([target, event, namespace, callback, remover]);
    });
  }
  function unbind(targets, events, callback) {
    forEachEvent(targets, events, function(target, event, namespace) {
      listeners = listeners.filter(function(listener) {
        if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
          listener[4]();
          return false;
        }
        return true;
      });
    });
  }
  function dispatch(target, type, detail) {
    var e2;
    var bubbles = true;
    if (typeof CustomEvent === "function") {
      e2 = new CustomEvent(type, {
        bubbles,
        detail
      });
    } else {
      e2 = document.createEvent("CustomEvent");
      e2.initCustomEvent(type, bubbles, false, detail);
    }
    target.dispatchEvent(e2);
    return e2;
  }
  function forEachEvent(targets, events, iteratee) {
    forEach(targets, function(target) {
      target && forEach(events, function(events2) {
        events2.split(" ").forEach(function(eventNS) {
          var fragment = eventNS.split(".");
          iteratee(target, fragment[0], fragment[1]);
        });
      });
    });
  }
  function destroy() {
    listeners.forEach(function(data) {
      data[4]();
    });
    empty(listeners);
  }
  return {
    bind,
    unbind,
    dispatch,
    destroy
  };
}
var EVENT_MOUNTED = "mounted";
var EVENT_READY = "ready";
var EVENT_MOVE = "move";
var EVENT_MOVED = "moved";
var EVENT_CLICK = "click";
var EVENT_ACTIVE = "active";
var EVENT_INACTIVE = "inactive";
var EVENT_VISIBLE = "visible";
var EVENT_HIDDEN = "hidden";
var EVENT_REFRESH = "refresh";
var EVENT_UPDATED = "updated";
var EVENT_RESIZE = "resize";
var EVENT_RESIZED = "resized";
var EVENT_DRAG = "drag";
var EVENT_DRAGGING = "dragging";
var EVENT_DRAGGED = "dragged";
var EVENT_SCROLL = "scroll";
var EVENT_SCROLLED = "scrolled";
var EVENT_OVERFLOW = "overflow";
var EVENT_DESTROY = "destroy";
var EVENT_ARROWS_MOUNTED = "arrows:mounted";
var EVENT_ARROWS_UPDATED = "arrows:updated";
var EVENT_PAGINATION_MOUNTED = "pagination:mounted";
var EVENT_PAGINATION_UPDATED = "pagination:updated";
var EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
var EVENT_AUTOPLAY_PLAY = "autoplay:play";
var EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
var EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
var EVENT_LAZYLOAD_LOADED = "lazyload:loaded";
var EVENT_SLIDE_KEYDOWN = "sk";
var EVENT_SHIFTED = "sh";
var EVENT_END_INDEX_CHANGED = "ei";
function EventInterface(Splide2) {
  var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
  var binder = EventBinder();
  function on(events, callback) {
    binder.bind(bus, toArray(events).join(" "), function(e2) {
      callback.apply(callback, isArray(e2.detail) ? e2.detail : []);
    });
  }
  function emit(event) {
    binder.dispatch(bus, event, slice(arguments, 1));
  }
  if (Splide2) {
    Splide2.event.on(EVENT_DESTROY, binder.destroy);
  }
  return assign(binder, {
    bus,
    on,
    off: apply(binder.unbind, bus),
    emit
  });
}
function RequestInterval(interval, onInterval, onUpdate, limit) {
  var now = Date.now;
  var startTime;
  var rate = 0;
  var id;
  var paused = true;
  var count = 0;
  function update() {
    if (!paused) {
      rate = interval ? min((now() - startTime) / interval, 1) : 1;
      onUpdate && onUpdate(rate);
      if (rate >= 1) {
        onInterval();
        startTime = now();
        if (limit && ++count >= limit) {
          return pause();
        }
      }
      id = raf(update);
    }
  }
  function start(resume) {
    resume || cancel();
    startTime = now() - (resume ? rate * interval : 0);
    paused = false;
    id = raf(update);
  }
  function pause() {
    paused = true;
  }
  function rewind() {
    startTime = now();
    rate = 0;
    if (onUpdate) {
      onUpdate(rate);
    }
  }
  function cancel() {
    id && cancelAnimationFrame(id);
    rate = 0;
    id = 0;
    paused = true;
  }
  function set(time) {
    interval = time;
  }
  function isPaused() {
    return paused;
  }
  return {
    start,
    rewind,
    pause,
    cancel,
    set,
    isPaused
  };
}
function State(initialState) {
  var state = initialState;
  function set(value) {
    state = value;
  }
  function is(states) {
    return includes(toArray(states), state);
  }
  return {
    set,
    is
  };
}
function Throttle(func, duration) {
  var interval = RequestInterval(0, func, null, 1);
  return function() {
    interval.isPaused() && interval.start();
  };
}
function Media(Splide2, Components2, options) {
  var state = Splide2.state;
  var breakpoints = options.breakpoints || {};
  var reducedMotion = options.reducedMotion || {};
  var binder = EventBinder();
  var queries = [];
  function setup() {
    var isMin = options.mediaQuery === "min";
    ownKeys(breakpoints).sort(function(n3, m2) {
      return isMin ? +n3 - +m2 : +m2 - +n3;
    }).forEach(function(key) {
      register(breakpoints[key], "(" + (isMin ? "min" : "max") + "-width:" + key + "px)");
    });
    register(reducedMotion, MEDIA_PREFERS_REDUCED_MOTION);
    update();
  }
  function destroy(completely) {
    if (completely) {
      binder.destroy();
    }
  }
  function register(options2, query2) {
    var queryList = matchMedia(query2);
    binder.bind(queryList, "change", update);
    queries.push([options2, queryList]);
  }
  function update() {
    var destroyed = state.is(DESTROYED);
    var direction = options.direction;
    var merged = queries.reduce(function(merged2, entry) {
      return merge(merged2, entry[1].matches ? entry[0] : {});
    }, {});
    omit(options);
    set(merged);
    if (options.destroy) {
      Splide2.destroy(options.destroy === "completely");
    } else if (destroyed) {
      destroy(true);
      Splide2.mount();
    } else {
      direction !== options.direction && Splide2.refresh();
    }
  }
  function reduce(enable) {
    if (matchMedia(MEDIA_PREFERS_REDUCED_MOTION).matches) {
      enable ? merge(options, reducedMotion) : omit(options, ownKeys(reducedMotion));
    }
  }
  function set(opts, base, notify) {
    merge(options, opts);
    base && merge(Object.getPrototypeOf(options), opts);
    if (notify || !state.is(CREATED)) {
      Splide2.emit(EVENT_UPDATED, options);
    }
  }
  return {
    setup,
    destroy,
    reduce,
    set
  };
}
var ARROW = "Arrow";
var ARROW_LEFT = ARROW + "Left";
var ARROW_RIGHT = ARROW + "Right";
var ARROW_UP = ARROW + "Up";
var ARROW_DOWN = ARROW + "Down";
var RTL = "rtl";
var TTB = "ttb";
var ORIENTATION_MAP = {
  width: ["height"],
  left: ["top", "right"],
  right: ["bottom", "left"],
  x: ["y"],
  X: ["Y"],
  Y: ["X"],
  ArrowLeft: [ARROW_UP, ARROW_RIGHT],
  ArrowRight: [ARROW_DOWN, ARROW_LEFT]
};
function Direction(Splide2, Components2, options) {
  function resolve(prop, axisOnly, direction) {
    direction = direction || options.direction;
    var index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
    return ORIENTATION_MAP[prop] && ORIENTATION_MAP[prop][index] || prop.replace(/width|left|right/i, function(match, offset) {
      var replacement = ORIENTATION_MAP[match.toLowerCase()][index] || match;
      return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
    });
  }
  function orient(value) {
    return value * (options.direction === RTL ? 1 : -1);
  }
  return {
    resolve,
    orient
  };
}
var ROLE = "role";
var TAB_INDEX = "tabindex";
var DISABLED = "disabled";
var ARIA_PREFIX = "aria-";
var ARIA_CONTROLS = ARIA_PREFIX + "controls";
var ARIA_CURRENT = ARIA_PREFIX + "current";
var ARIA_SELECTED = ARIA_PREFIX + "selected";
var ARIA_LABEL = ARIA_PREFIX + "label";
var ARIA_LABELLEDBY = ARIA_PREFIX + "labelledby";
var ARIA_HIDDEN = ARIA_PREFIX + "hidden";
var ARIA_ORIENTATION = ARIA_PREFIX + "orientation";
var ARIA_ROLEDESCRIPTION = ARIA_PREFIX + "roledescription";
var ARIA_LIVE = ARIA_PREFIX + "live";
var ARIA_BUSY = ARIA_PREFIX + "busy";
var ARIA_ATOMIC = ARIA_PREFIX + "atomic";
var ALL_ATTRIBUTES = [ROLE, TAB_INDEX, DISABLED, ARIA_CONTROLS, ARIA_CURRENT, ARIA_LABEL, ARIA_LABELLEDBY, ARIA_HIDDEN, ARIA_ORIENTATION, ARIA_ROLEDESCRIPTION];
var CLASS_PREFIX = PROJECT_CODE + "__";
var STATUS_CLASS_PREFIX = "is-";
var CLASS_ROOT = PROJECT_CODE;
var CLASS_TRACK = CLASS_PREFIX + "track";
var CLASS_LIST = CLASS_PREFIX + "list";
var CLASS_SLIDE = CLASS_PREFIX + "slide";
var CLASS_CLONE = CLASS_SLIDE + "--clone";
var CLASS_CONTAINER = CLASS_SLIDE + "__container";
var CLASS_ARROWS = CLASS_PREFIX + "arrows";
var CLASS_ARROW = CLASS_PREFIX + "arrow";
var CLASS_ARROW_PREV = CLASS_ARROW + "--prev";
var CLASS_ARROW_NEXT = CLASS_ARROW + "--next";
var CLASS_PAGINATION = CLASS_PREFIX + "pagination";
var CLASS_PAGINATION_PAGE = CLASS_PAGINATION + "__page";
var CLASS_PROGRESS = CLASS_PREFIX + "progress";
var CLASS_PROGRESS_BAR = CLASS_PROGRESS + "__bar";
var CLASS_TOGGLE = CLASS_PREFIX + "toggle";
var CLASS_SPINNER = CLASS_PREFIX + "spinner";
var CLASS_SR = CLASS_PREFIX + "sr";
var CLASS_INITIALIZED = STATUS_CLASS_PREFIX + "initialized";
var CLASS_ACTIVE = STATUS_CLASS_PREFIX + "active";
var CLASS_PREV = STATUS_CLASS_PREFIX + "prev";
var CLASS_NEXT = STATUS_CLASS_PREFIX + "next";
var CLASS_VISIBLE = STATUS_CLASS_PREFIX + "visible";
var CLASS_LOADING = STATUS_CLASS_PREFIX + "loading";
var CLASS_FOCUS_IN = STATUS_CLASS_PREFIX + "focus-in";
var CLASS_OVERFLOW = STATUS_CLASS_PREFIX + "overflow";
var STATUS_CLASSES = [CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING, CLASS_FOCUS_IN, CLASS_OVERFLOW];
var CLASSES = {
  slide: CLASS_SLIDE,
  clone: CLASS_CLONE,
  arrows: CLASS_ARROWS,
  arrow: CLASS_ARROW,
  prev: CLASS_ARROW_PREV,
  next: CLASS_ARROW_NEXT,
  pagination: CLASS_PAGINATION,
  page: CLASS_PAGINATION_PAGE,
  spinner: CLASS_SPINNER
};
function closest(from, selector) {
  if (isFunction(from.closest)) {
    return from.closest(selector);
  }
  var elm = from;
  while (elm && elm.nodeType === 1) {
    if (matches(elm, selector)) {
      break;
    }
    elm = elm.parentElement;
  }
  return elm;
}
var FRICTION = 5;
var LOG_INTERVAL = 200;
var POINTER_DOWN_EVENTS = "touchstart mousedown";
var POINTER_MOVE_EVENTS = "touchmove mousemove";
var POINTER_UP_EVENTS = "touchend touchcancel mouseup click";
function Elements(Splide2, Components2, options) {
  var _EventInterface = EventInterface(Splide2), on = _EventInterface.on, bind = _EventInterface.bind;
  var root = Splide2.root;
  var i18n = options.i18n;
  var elements = {};
  var slides = [];
  var rootClasses = [];
  var trackClasses = [];
  var track;
  var list;
  var isUsingKey;
  function setup() {
    collect();
    init();
    update();
  }
  function mount() {
    on(EVENT_REFRESH, destroy);
    on(EVENT_REFRESH, setup);
    on(EVENT_UPDATED, update);
    bind(document, POINTER_DOWN_EVENTS + " keydown", function(e2) {
      isUsingKey = e2.type === "keydown";
    }, {
      capture: true
    });
    bind(root, "focusin", function() {
      toggleClass(root, CLASS_FOCUS_IN, !!isUsingKey);
    });
  }
  function destroy(completely) {
    var attrs = ALL_ATTRIBUTES.concat("style");
    empty(slides);
    removeClass(root, rootClasses);
    removeClass(track, trackClasses);
    removeAttribute([track, list], attrs);
    removeAttribute(root, completely ? attrs : ["style", ARIA_ROLEDESCRIPTION]);
  }
  function update() {
    removeClass(root, rootClasses);
    removeClass(track, trackClasses);
    rootClasses = getClasses(CLASS_ROOT);
    trackClasses = getClasses(CLASS_TRACK);
    addClass(root, rootClasses);
    addClass(track, trackClasses);
    setAttribute(root, ARIA_LABEL, options.label);
    setAttribute(root, ARIA_LABELLEDBY, options.labelledby);
  }
  function collect() {
    track = find("." + CLASS_TRACK);
    list = child(track, "." + CLASS_LIST);
    assert(track && list, "A track/list element is missing.");
    push(slides, children(list, "." + CLASS_SLIDE + ":not(." + CLASS_CLONE + ")"));
    forOwn({
      arrows: CLASS_ARROWS,
      pagination: CLASS_PAGINATION,
      prev: CLASS_ARROW_PREV,
      next: CLASS_ARROW_NEXT,
      bar: CLASS_PROGRESS_BAR,
      toggle: CLASS_TOGGLE
    }, function(className, key) {
      elements[key] = find("." + className);
    });
    assign(elements, {
      root,
      track,
      list,
      slides
    });
  }
  function init() {
    var id = root.id || uniqueId(PROJECT_CODE);
    var role = options.role;
    root.id = id;
    track.id = track.id || id + "-track";
    list.id = list.id || id + "-list";
    if (!getAttribute(root, ROLE) && root.tagName !== "SECTION" && role) {
      setAttribute(root, ROLE, role);
    }
    setAttribute(root, ARIA_ROLEDESCRIPTION, i18n.carousel);
    setAttribute(list, ROLE, "presentation");
  }
  function find(selector) {
    var elm = query(root, selector);
    return elm && closest(elm, "." + CLASS_ROOT) === root ? elm : void 0;
  }
  function getClasses(base) {
    return [base + "--" + options.type, base + "--" + options.direction, options.drag && base + "--draggable", options.isNavigation && base + "--nav", base === CLASS_ROOT && CLASS_ACTIVE];
  }
  return assign(elements, {
    setup,
    mount,
    destroy
  });
}
var SLIDE = "slide";
var LOOP = "loop";
var FADE = "fade";
function Slide$1(Splide2, index, slideIndex, slide) {
  var event = EventInterface(Splide2);
  var on = event.on, emit = event.emit, bind = event.bind;
  var Components = Splide2.Components, root = Splide2.root, options = Splide2.options;
  var isNavigation = options.isNavigation, updateOnMove = options.updateOnMove, i18n = options.i18n, pagination = options.pagination, slideFocus = options.slideFocus;
  var resolve = Components.Direction.resolve;
  var styles = getAttribute(slide, "style");
  var label = getAttribute(slide, ARIA_LABEL);
  var isClone = slideIndex > -1;
  var container = child(slide, "." + CLASS_CONTAINER);
  var destroyed;
  function mount() {
    if (!isClone) {
      slide.id = root.id + "-slide" + pad(index + 1);
      setAttribute(slide, ROLE, pagination ? "tabpanel" : "group");
      setAttribute(slide, ARIA_ROLEDESCRIPTION, i18n.slide);
      setAttribute(slide, ARIA_LABEL, label || format(i18n.slideLabel, [index + 1, Splide2.length]));
    }
    listen();
  }
  function listen() {
    bind(slide, "click", apply(emit, EVENT_CLICK, self));
    bind(slide, "keydown", apply(emit, EVENT_SLIDE_KEYDOWN, self));
    on([EVENT_MOVED, EVENT_SHIFTED, EVENT_SCROLLED], update);
    on(EVENT_NAVIGATION_MOUNTED, initNavigation);
    if (updateOnMove) {
      on(EVENT_MOVE, onMove);
    }
  }
  function destroy() {
    destroyed = true;
    event.destroy();
    removeClass(slide, STATUS_CLASSES);
    removeAttribute(slide, ALL_ATTRIBUTES);
    setAttribute(slide, "style", styles);
    setAttribute(slide, ARIA_LABEL, label || "");
  }
  function initNavigation() {
    var controls = Splide2.splides.map(function(target) {
      var Slide2 = target.splide.Components.Slides.getAt(index);
      return Slide2 ? Slide2.slide.id : "";
    }).join(" ");
    setAttribute(slide, ARIA_LABEL, format(i18n.slideX, (isClone ? slideIndex : index) + 1));
    setAttribute(slide, ARIA_CONTROLS, controls);
    setAttribute(slide, ROLE, slideFocus ? "button" : "");
    slideFocus && removeAttribute(slide, ARIA_ROLEDESCRIPTION);
  }
  function onMove() {
    if (!destroyed) {
      update();
    }
  }
  function update() {
    if (!destroyed) {
      var curr = Splide2.index;
      updateActivity();
      updateVisibility();
      toggleClass(slide, CLASS_PREV, index === curr - 1);
      toggleClass(slide, CLASS_NEXT, index === curr + 1);
    }
  }
  function updateActivity() {
    var active = isActive();
    if (active !== hasClass(slide, CLASS_ACTIVE)) {
      toggleClass(slide, CLASS_ACTIVE, active);
      setAttribute(slide, ARIA_CURRENT, isNavigation && active || "");
      emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
    }
  }
  function updateVisibility() {
    var visible = isVisible();
    var hidden = !visible && (!isActive() || isClone);
    if (!Splide2.state.is([MOVING, SCROLLING])) {
      setAttribute(slide, ARIA_HIDDEN, hidden || "");
    }
    setAttribute(queryAll(slide, options.focusableNodes || ""), TAB_INDEX, hidden ? -1 : "");
    if (slideFocus) {
      setAttribute(slide, TAB_INDEX, hidden ? -1 : 0);
    }
    if (visible !== hasClass(slide, CLASS_VISIBLE)) {
      toggleClass(slide, CLASS_VISIBLE, visible);
      emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self);
    }
    if (!visible && document.activeElement === slide) {
      var Slide2 = Components.Slides.getAt(Splide2.index);
      Slide2 && focus(Slide2.slide);
    }
  }
  function style$1(prop, value, useContainer) {
    style(useContainer && container || slide, prop, value);
  }
  function isActive() {
    var curr = Splide2.index;
    return curr === index || options.cloneStatus && curr === slideIndex;
  }
  function isVisible() {
    if (Splide2.is(FADE)) {
      return isActive();
    }
    var trackRect = rect(Components.Elements.track);
    var slideRect = rect(slide);
    var left = resolve("left", true);
    var right = resolve("right", true);
    return floor(trackRect[left]) <= ceil(slideRect[left]) && floor(slideRect[right]) <= ceil(trackRect[right]);
  }
  function isWithin(from, distance) {
    var diff = abs(from - index);
    if (!isClone && (options.rewind || Splide2.is(LOOP))) {
      diff = min(diff, Splide2.length - diff);
    }
    return diff <= distance;
  }
  var self = {
    index,
    slideIndex,
    slide,
    container,
    isClone,
    mount,
    destroy,
    update,
    style: style$1,
    isWithin
  };
  return self;
}
function Slides(Splide2, Components2, options) {
  var _EventInterface2 = EventInterface(Splide2), on = _EventInterface2.on, emit = _EventInterface2.emit, bind = _EventInterface2.bind;
  var _Components2$Elements = Components2.Elements, slides = _Components2$Elements.slides, list = _Components2$Elements.list;
  var Slides2 = [];
  function mount() {
    init();
    on(EVENT_REFRESH, destroy);
    on(EVENT_REFRESH, init);
  }
  function init() {
    slides.forEach(function(slide, index) {
      register(slide, index, -1);
    });
  }
  function destroy() {
    forEach$1(function(Slide2) {
      Slide2.destroy();
    });
    empty(Slides2);
  }
  function update() {
    forEach$1(function(Slide2) {
      Slide2.update();
    });
  }
  function register(slide, index, slideIndex) {
    var object = Slide$1(Splide2, index, slideIndex, slide);
    object.mount();
    Slides2.push(object);
    Slides2.sort(function(Slide1, Slide2) {
      return Slide1.index - Slide2.index;
    });
  }
  function get(excludeClones) {
    return excludeClones ? filter(function(Slide2) {
      return !Slide2.isClone;
    }) : Slides2;
  }
  function getIn(page) {
    var Controller2 = Components2.Controller;
    var index = Controller2.toIndex(page);
    var max2 = Controller2.hasFocus() ? 1 : options.perPage;
    return filter(function(Slide2) {
      return between(Slide2.index, index, index + max2 - 1);
    });
  }
  function getAt(index) {
    return filter(index)[0];
  }
  function add(items, index) {
    forEach(items, function(slide) {
      if (isString(slide)) {
        slide = parseHtml(slide);
      }
      if (isHTMLElement(slide)) {
        var ref = slides[index];
        ref ? before(slide, ref) : append(list, slide);
        addClass(slide, options.classes.slide);
        observeImages(slide, apply(emit, EVENT_RESIZE));
      }
    });
    emit(EVENT_REFRESH);
  }
  function remove$1(matcher) {
    remove(filter(matcher).map(function(Slide2) {
      return Slide2.slide;
    }));
    emit(EVENT_REFRESH);
  }
  function forEach$1(iteratee, excludeClones) {
    get(excludeClones).forEach(iteratee);
  }
  function filter(matcher) {
    return Slides2.filter(isFunction(matcher) ? matcher : function(Slide2) {
      return isString(matcher) ? matches(Slide2.slide, matcher) : includes(toArray(matcher), Slide2.index);
    });
  }
  function style2(prop, value, useContainer) {
    forEach$1(function(Slide2) {
      Slide2.style(prop, value, useContainer);
    });
  }
  function observeImages(elm, callback) {
    var images = queryAll(elm, "img");
    var length = images.length;
    if (length) {
      images.forEach(function(img) {
        bind(img, "load error", function() {
          if (!--length) {
            callback();
          }
        });
      });
    } else {
      callback();
    }
  }
  function getLength(excludeClones) {
    return excludeClones ? slides.length : Slides2.length;
  }
  function isEnough() {
    return Slides2.length > options.perPage;
  }
  return {
    mount,
    destroy,
    update,
    register,
    get,
    getIn,
    getAt,
    add,
    remove: remove$1,
    forEach: forEach$1,
    filter,
    style: style2,
    getLength,
    isEnough
  };
}
function Layout(Splide2, Components2, options) {
  var _EventInterface3 = EventInterface(Splide2), on = _EventInterface3.on, bind = _EventInterface3.bind, emit = _EventInterface3.emit;
  var Slides2 = Components2.Slides;
  var resolve = Components2.Direction.resolve;
  var _Components2$Elements2 = Components2.Elements, root = _Components2$Elements2.root, track = _Components2$Elements2.track, list = _Components2$Elements2.list;
  var getAt = Slides2.getAt, styleSlides = Slides2.style;
  var vertical;
  var rootRect;
  var overflow;
  function mount() {
    init();
    bind(window, "resize load", Throttle(apply(emit, EVENT_RESIZE)));
    on([EVENT_UPDATED, EVENT_REFRESH], init);
    on(EVENT_RESIZE, resize);
  }
  function init() {
    vertical = options.direction === TTB;
    style(root, "maxWidth", unit(options.width));
    style(track, resolve("paddingLeft"), cssPadding(false));
    style(track, resolve("paddingRight"), cssPadding(true));
    resize(true);
  }
  function resize(force) {
    var newRect = rect(root);
    if (force || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
      style(track, "height", cssTrackHeight());
      styleSlides(resolve("marginRight"), unit(options.gap));
      styleSlides("width", cssSlideWidth());
      styleSlides("height", cssSlideHeight(), true);
      rootRect = newRect;
      emit(EVENT_RESIZED);
      if (overflow !== (overflow = isOverflow())) {
        toggleClass(root, CLASS_OVERFLOW, overflow);
        emit(EVENT_OVERFLOW, overflow);
      }
    }
  }
  function cssPadding(right) {
    var padding = options.padding;
    var prop = resolve(right ? "right" : "left");
    return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
  }
  function cssTrackHeight() {
    var height = "";
    if (vertical) {
      height = cssHeight();
      assert(height, "height or heightRatio is missing.");
      height = "calc(" + height + " - " + cssPadding(false) + " - " + cssPadding(true) + ")";
    }
    return height;
  }
  function cssHeight() {
    return unit(options.height || rect(list).width * options.heightRatio);
  }
  function cssSlideWidth() {
    return options.autoWidth ? null : unit(options.fixedWidth) || (vertical ? "" : cssSlideSize());
  }
  function cssSlideHeight() {
    return unit(options.fixedHeight) || (vertical ? options.autoHeight ? null : cssSlideSize() : cssHeight());
  }
  function cssSlideSize() {
    var gap = unit(options.gap);
    return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
  }
  function listSize() {
    return rect(list)[resolve("width")];
  }
  function slideSize(index, withoutGap) {
    var Slide2 = getAt(index || 0);
    return Slide2 ? rect(Slide2.slide)[resolve("width")] + (withoutGap ? 0 : getGap()) : 0;
  }
  function totalSize(index, withoutGap) {
    var Slide2 = getAt(index);
    if (Slide2) {
      var right = rect(Slide2.slide)[resolve("right")];
      var left = rect(list)[resolve("left")];
      return abs(right - left) + (withoutGap ? 0 : getGap());
    }
    return 0;
  }
  function sliderSize(withoutGap) {
    return totalSize(Splide2.length - 1) - totalSize(0) + slideSize(0, withoutGap);
  }
  function getGap() {
    var Slide2 = getAt(0);
    return Slide2 && parseFloat(style(Slide2.slide, resolve("marginRight"))) || 0;
  }
  function getPadding(right) {
    return parseFloat(style(track, resolve("padding" + (right ? "Right" : "Left")))) || 0;
  }
  function isOverflow() {
    return Splide2.is(FADE) || sliderSize(true) > listSize();
  }
  return {
    mount,
    resize,
    listSize,
    slideSize,
    sliderSize,
    totalSize,
    getPadding,
    isOverflow
  };
}
var MULTIPLIER = 2;
function Clones(Splide2, Components2, options) {
  var event = EventInterface(Splide2);
  var on = event.on;
  var Elements2 = Components2.Elements, Slides2 = Components2.Slides;
  var resolve = Components2.Direction.resolve;
  var clones = [];
  var cloneCount;
  function mount() {
    on(EVENT_REFRESH, remount);
    on([EVENT_UPDATED, EVENT_RESIZE], observe);
    if (cloneCount = computeCloneCount()) {
      generate(cloneCount);
      Components2.Layout.resize(true);
    }
  }
  function remount() {
    destroy();
    mount();
  }
  function destroy() {
    remove(clones);
    empty(clones);
    event.destroy();
  }
  function observe() {
    var count = computeCloneCount();
    if (cloneCount !== count) {
      if (cloneCount < count || !count) {
        event.emit(EVENT_REFRESH);
      }
    }
  }
  function generate(count) {
    var slides = Slides2.get().slice();
    var length = slides.length;
    if (length) {
      while (slides.length < count) {
        push(slides, slides);
      }
      push(slides.slice(-count), slides.slice(0, count)).forEach(function(Slide2, index) {
        var isHead = index < count;
        var clone = cloneDeep(Slide2.slide, index);
        isHead ? before(clone, slides[0].slide) : append(Elements2.list, clone);
        push(clones, clone);
        Slides2.register(clone, index - count + (isHead ? 0 : length), Slide2.index);
      });
    }
  }
  function cloneDeep(elm, index) {
    var clone = elm.cloneNode(true);
    addClass(clone, options.classes.clone);
    clone.id = Splide2.root.id + "-clone" + pad(index + 1);
    return clone;
  }
  function computeCloneCount() {
    var clones2 = options.clones;
    if (!Splide2.is(LOOP)) {
      clones2 = 0;
    } else if (isUndefined(clones2)) {
      var fixedSize = options[resolve("fixedWidth")] && Components2.Layout.slideSize(0);
      var fixedCount = fixedSize && ceil(rect(Elements2.track)[resolve("width")] / fixedSize);
      clones2 = fixedCount || options[resolve("autoWidth")] && Splide2.length || options.perPage * MULTIPLIER;
    }
    return clones2;
  }
  return {
    mount,
    destroy
  };
}
function Move(Splide2, Components2, options) {
  var _EventInterface4 = EventInterface(Splide2), on = _EventInterface4.on, emit = _EventInterface4.emit;
  var set = Splide2.state.set;
  var _Components2$Layout = Components2.Layout, slideSize = _Components2$Layout.slideSize, getPadding = _Components2$Layout.getPadding, totalSize = _Components2$Layout.totalSize, listSize = _Components2$Layout.listSize, sliderSize = _Components2$Layout.sliderSize;
  var _Components2$Directio = Components2.Direction, resolve = _Components2$Directio.resolve, orient = _Components2$Directio.orient;
  var _Components2$Elements3 = Components2.Elements, list = _Components2$Elements3.list, track = _Components2$Elements3.track;
  var Transition;
  function mount() {
    Transition = Components2.Transition;
    on([EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH], reposition);
  }
  function reposition() {
    if (!Components2.Controller.isBusy()) {
      Components2.Scroll.cancel();
      jump(Splide2.index);
      Components2.Slides.update();
    }
  }
  function move(dest, index, prev, callback) {
    if (dest !== index && canShift(dest > prev)) {
      cancel();
      translate(shift(getPosition(), dest > prev), true);
    }
    set(MOVING);
    emit(EVENT_MOVE, index, prev, dest);
    Transition.start(index, function() {
      set(IDLE);
      emit(EVENT_MOVED, index, prev, dest);
      callback && callback();
    });
  }
  function jump(index) {
    translate(toPosition(index, true));
  }
  function translate(position, preventLoop) {
    if (!Splide2.is(FADE)) {
      var destination = preventLoop ? position : loop(position);
      style(list, "transform", "translate" + resolve("X") + "(" + destination + "px)");
      position !== destination && emit(EVENT_SHIFTED);
    }
  }
  function loop(position) {
    if (Splide2.is(LOOP)) {
      var index = toIndex(position);
      var exceededMax = index > Components2.Controller.getEnd();
      var exceededMin = index < 0;
      if (exceededMin || exceededMax) {
        position = shift(position, exceededMax);
      }
    }
    return position;
  }
  function shift(position, backwards) {
    var excess = position - getLimit(backwards);
    var size = sliderSize();
    position -= orient(size * (ceil(abs(excess) / size) || 1)) * (backwards ? 1 : -1);
    return position;
  }
  function cancel() {
    translate(getPosition(), true);
    Transition.cancel();
  }
  function toIndex(position) {
    var Slides2 = Components2.Slides.get();
    var index = 0;
    var minDistance = Infinity;
    for (var i2 = 0; i2 < Slides2.length; i2++) {
      var slideIndex = Slides2[i2].index;
      var distance = abs(toPosition(slideIndex, true) - position);
      if (distance <= minDistance) {
        minDistance = distance;
        index = slideIndex;
      } else {
        break;
      }
    }
    return index;
  }
  function toPosition(index, trimming) {
    var position = orient(totalSize(index - 1) - offset(index));
    return trimming ? trim(position) : position;
  }
  function getPosition() {
    var left = resolve("left");
    return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
  }
  function trim(position) {
    if (options.trimSpace && Splide2.is(SLIDE)) {
      position = clamp(position, 0, orient(sliderSize(true) - listSize()));
    }
    return position;
  }
  function offset(index) {
    var focus2 = options.focus;
    return focus2 === "center" ? (listSize() - slideSize(index, true)) / 2 : +focus2 * slideSize(index) || 0;
  }
  function getLimit(max2) {
    return toPosition(max2 ? Components2.Controller.getEnd() : 0, !!options.trimSpace);
  }
  function canShift(backwards) {
    var shifted = orient(shift(getPosition(), backwards));
    return backwards ? shifted >= 0 : shifted <= list[resolve("scrollWidth")] - rect(track)[resolve("width")];
  }
  function exceededLimit(max2, position) {
    position = isUndefined(position) ? getPosition() : position;
    var exceededMin = max2 !== true && orient(position) < orient(getLimit(false));
    var exceededMax = max2 !== false && orient(position) > orient(getLimit(true));
    return exceededMin || exceededMax;
  }
  return {
    mount,
    move,
    jump,
    translate,
    shift,
    cancel,
    toIndex,
    toPosition,
    getPosition,
    getLimit,
    exceededLimit,
    reposition
  };
}
function Controller(Splide2, Components2, options) {
  var _EventInterface5 = EventInterface(Splide2), on = _EventInterface5.on, emit = _EventInterface5.emit;
  var Move2 = Components2.Move;
  var getPosition = Move2.getPosition, getLimit = Move2.getLimit, toPosition = Move2.toPosition;
  var _Components2$Slides = Components2.Slides, isEnough = _Components2$Slides.isEnough, getLength = _Components2$Slides.getLength;
  var omitEnd = options.omitEnd;
  var isLoop = Splide2.is(LOOP);
  var isSlide = Splide2.is(SLIDE);
  var getNext = apply(getAdjacent, false);
  var getPrev = apply(getAdjacent, true);
  var currIndex = options.start || 0;
  var endIndex;
  var prevIndex = currIndex;
  var slideCount;
  var perMove;
  var perPage;
  function mount() {
    init();
    on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], init);
    on(EVENT_RESIZED, onResized);
  }
  function init() {
    slideCount = getLength(true);
    perMove = options.perMove;
    perPage = options.perPage;
    endIndex = getEnd();
    var index = clamp(currIndex, 0, omitEnd ? endIndex : slideCount - 1);
    if (index !== currIndex) {
      currIndex = index;
      Move2.reposition();
    }
  }
  function onResized() {
    if (endIndex !== getEnd()) {
      emit(EVENT_END_INDEX_CHANGED);
    }
  }
  function go(control, allowSameIndex, callback) {
    if (!isBusy()) {
      var dest = parse(control);
      var index = loop(dest);
      if (index > -1 && (allowSameIndex || index !== currIndex)) {
        setIndex(index);
        Move2.move(dest, index, prevIndex, callback);
      }
    }
  }
  function scroll(destination, duration, snap, callback) {
    Components2.Scroll.scroll(destination, duration, snap, function() {
      var index = loop(Move2.toIndex(getPosition()));
      setIndex(omitEnd ? min(index, endIndex) : index);
      callback && callback();
    });
  }
  function parse(control) {
    var index = currIndex;
    if (isString(control)) {
      var _ref = control.match(/([+\-<>])(\d+)?/) || [], indicator = _ref[1], number = _ref[2];
      if (indicator === "+" || indicator === "-") {
        index = computeDestIndex(currIndex + +("" + indicator + (+number || 1)), currIndex);
      } else if (indicator === ">") {
        index = number ? toIndex(+number) : getNext(true);
      } else if (indicator === "<") {
        index = getPrev(true);
      }
    } else {
      index = isLoop ? control : clamp(control, 0, endIndex);
    }
    return index;
  }
  function getAdjacent(prev, destination) {
    var number = perMove || (hasFocus() ? 1 : perPage);
    var dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex, !(perMove || hasFocus()));
    if (dest === -1 && isSlide) {
      if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) {
        return prev ? 0 : endIndex;
      }
    }
    return destination ? dest : loop(dest);
  }
  function computeDestIndex(dest, from, snapPage) {
    if (isEnough() || hasFocus()) {
      var index = computeMovableDestIndex(dest);
      if (index !== dest) {
        from = dest;
        dest = index;
        snapPage = false;
      }
      if (dest < 0 || dest > endIndex) {
        if (!perMove && (between(0, dest, from, true) || between(endIndex, from, dest, true))) {
          dest = toIndex(toPage(dest));
        } else {
          if (isLoop) {
            dest = snapPage ? dest < 0 ? -(slideCount % perPage || perPage) : slideCount : dest;
          } else if (options.rewind) {
            dest = dest < 0 ? endIndex : 0;
          } else {
            dest = -1;
          }
        }
      } else {
        if (snapPage && dest !== from) {
          dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
        }
      }
    } else {
      dest = -1;
    }
    return dest;
  }
  function computeMovableDestIndex(dest) {
    if (isSlide && options.trimSpace === "move" && dest !== currIndex) {
      var position = getPosition();
      while (position === toPosition(dest, true) && between(dest, 0, Splide2.length - 1, !options.rewind)) {
        dest < currIndex ? --dest : ++dest;
      }
    }
    return dest;
  }
  function loop(index) {
    return isLoop ? (index + slideCount) % slideCount || 0 : index;
  }
  function getEnd() {
    var end = slideCount - (hasFocus() || isLoop && perMove ? 1 : perPage);
    while (omitEnd && end-- > 0) {
      if (toPosition(slideCount - 1, true) !== toPosition(end, true)) {
        end++;
        break;
      }
    }
    return clamp(end, 0, slideCount - 1);
  }
  function toIndex(page) {
    return clamp(hasFocus() ? page : perPage * page, 0, endIndex);
  }
  function toPage(index) {
    return hasFocus() ? min(index, endIndex) : floor((index >= endIndex ? slideCount - 1 : index) / perPage);
  }
  function toDest(destination) {
    var closest2 = Move2.toIndex(destination);
    return isSlide ? clamp(closest2, 0, endIndex) : closest2;
  }
  function setIndex(index) {
    if (index !== currIndex) {
      prevIndex = currIndex;
      currIndex = index;
    }
  }
  function getIndex(prev) {
    return prev ? prevIndex : currIndex;
  }
  function hasFocus() {
    return !isUndefined(options.focus) || options.isNavigation;
  }
  function isBusy() {
    return Splide2.state.is([MOVING, SCROLLING]) && !!options.waitForTransition;
  }
  return {
    mount,
    go,
    scroll,
    getNext,
    getPrev,
    getAdjacent,
    getEnd,
    setIndex,
    getIndex,
    toIndex,
    toPage,
    toDest,
    hasFocus,
    isBusy
  };
}
var XML_NAME_SPACE = "http://www.w3.org/2000/svg";
var PATH = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z";
var SIZE = 40;
function Arrows(Splide2, Components2, options) {
  var event = EventInterface(Splide2);
  var on = event.on, bind = event.bind, emit = event.emit;
  var classes = options.classes, i18n = options.i18n;
  var Elements2 = Components2.Elements, Controller2 = Components2.Controller;
  var placeholder = Elements2.arrows, track = Elements2.track;
  var wrapper = placeholder;
  var prev = Elements2.prev;
  var next = Elements2.next;
  var created;
  var wrapperClasses;
  var arrows = {};
  function mount() {
    init();
    on(EVENT_UPDATED, remount);
  }
  function remount() {
    destroy();
    mount();
  }
  function init() {
    var enabled = options.arrows;
    if (enabled && !(prev && next)) {
      createArrows();
    }
    if (prev && next) {
      assign(arrows, {
        prev,
        next
      });
      display(wrapper, enabled ? "" : "none");
      addClass(wrapper, wrapperClasses = CLASS_ARROWS + "--" + options.direction);
      if (enabled) {
        listen();
        update();
        setAttribute([prev, next], ARIA_CONTROLS, track.id);
        emit(EVENT_ARROWS_MOUNTED, prev, next);
      }
    }
  }
  function destroy() {
    event.destroy();
    removeClass(wrapper, wrapperClasses);
    if (created) {
      remove(placeholder ? [prev, next] : wrapper);
      prev = next = null;
    } else {
      removeAttribute([prev, next], ALL_ATTRIBUTES);
    }
  }
  function listen() {
    on([EVENT_MOUNTED, EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED, EVENT_END_INDEX_CHANGED], update);
    bind(next, "click", apply(go, ">"));
    bind(prev, "click", apply(go, "<"));
  }
  function go(control) {
    Controller2.go(control, true);
  }
  function createArrows() {
    wrapper = placeholder || create("div", classes.arrows);
    prev = createArrow(true);
    next = createArrow(false);
    created = true;
    append(wrapper, [prev, next]);
    !placeholder && before(wrapper, track);
  }
  function createArrow(prev2) {
    var arrow = '<button class="' + classes.arrow + " " + (prev2 ? classes.prev : classes.next) + '" type="button"><svg xmlns="' + XML_NAME_SPACE + '" viewBox="0 0 ' + SIZE + " " + SIZE + '" width="' + SIZE + '" height="' + SIZE + '" focusable="false"><path d="' + (options.arrowPath || PATH) + '" />';
    return parseHtml(arrow);
  }
  function update() {
    if (prev && next) {
      var index = Splide2.index;
      var prevIndex = Controller2.getPrev();
      var nextIndex = Controller2.getNext();
      var prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
      var nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
      prev.disabled = prevIndex < 0;
      next.disabled = nextIndex < 0;
      setAttribute(prev, ARIA_LABEL, prevLabel);
      setAttribute(next, ARIA_LABEL, nextLabel);
      emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
    }
  }
  return {
    arrows,
    mount,
    destroy,
    update
  };
}
var INTERVAL_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-interval";
function Autoplay(Splide2, Components2, options) {
  var _EventInterface6 = EventInterface(Splide2), on = _EventInterface6.on, bind = _EventInterface6.bind, emit = _EventInterface6.emit;
  var interval = RequestInterval(options.interval, Splide2.go.bind(Splide2, ">"), onAnimationFrame);
  var isPaused = interval.isPaused;
  var Elements2 = Components2.Elements, _Components2$Elements4 = Components2.Elements, root = _Components2$Elements4.root, toggle = _Components2$Elements4.toggle;
  var autoplay = options.autoplay;
  var hovered;
  var focused;
  var stopped = autoplay === "pause";
  function mount() {
    if (autoplay) {
      listen();
      toggle && setAttribute(toggle, ARIA_CONTROLS, Elements2.track.id);
      stopped || play();
      update();
    }
  }
  function listen() {
    if (options.pauseOnHover) {
      bind(root, "mouseenter mouseleave", function(e2) {
        hovered = e2.type === "mouseenter";
        autoToggle();
      });
    }
    if (options.pauseOnFocus) {
      bind(root, "focusin focusout", function(e2) {
        focused = e2.type === "focusin";
        autoToggle();
      });
    }
    if (toggle) {
      bind(toggle, "click", function() {
        stopped ? play() : pause(true);
      });
    }
    on([EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH], interval.rewind);
    on(EVENT_MOVE, onMove);
  }
  function play() {
    if (isPaused() && Components2.Slides.isEnough()) {
      interval.start(!options.resetProgress);
      focused = hovered = stopped = false;
      update();
      emit(EVENT_AUTOPLAY_PLAY);
    }
  }
  function pause(stop) {
    if (stop === void 0) {
      stop = true;
    }
    stopped = !!stop;
    update();
    if (!isPaused()) {
      interval.pause();
      emit(EVENT_AUTOPLAY_PAUSE);
    }
  }
  function autoToggle() {
    if (!stopped) {
      hovered || focused ? pause(false) : play();
    }
  }
  function update() {
    if (toggle) {
      toggleClass(toggle, CLASS_ACTIVE, !stopped);
      setAttribute(toggle, ARIA_LABEL, options.i18n[stopped ? "play" : "pause"]);
    }
  }
  function onAnimationFrame(rate) {
    var bar = Elements2.bar;
    bar && style(bar, "width", rate * 100 + "%");
    emit(EVENT_AUTOPLAY_PLAYING, rate);
  }
  function onMove(index) {
    var Slide2 = Components2.Slides.getAt(index);
    interval.set(Slide2 && +getAttribute(Slide2.slide, INTERVAL_DATA_ATTRIBUTE) || options.interval);
  }
  return {
    mount,
    destroy: interval.cancel,
    play,
    pause,
    isPaused
  };
}
function Cover(Splide2, Components2, options) {
  var _EventInterface7 = EventInterface(Splide2), on = _EventInterface7.on;
  function mount() {
    if (options.cover) {
      on(EVENT_LAZYLOAD_LOADED, apply(toggle, true));
      on([EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH], apply(cover, true));
    }
  }
  function cover(cover2) {
    Components2.Slides.forEach(function(Slide2) {
      var img = child(Slide2.container || Slide2.slide, "img");
      if (img && img.src) {
        toggle(cover2, img, Slide2);
      }
    });
  }
  function toggle(cover2, img, Slide2) {
    Slide2.style("background", cover2 ? 'center/cover no-repeat url("' + img.src + '")' : "", true);
    display(img, cover2 ? "none" : "");
  }
  return {
    mount,
    destroy: apply(cover, false)
  };
}
var BOUNCE_DIFF_THRESHOLD = 10;
var BOUNCE_DURATION = 600;
var FRICTION_FACTOR = 0.6;
var BASE_VELOCITY = 1.5;
var MIN_DURATION = 800;
function Scroll(Splide2, Components2, options) {
  var _EventInterface8 = EventInterface(Splide2), on = _EventInterface8.on, emit = _EventInterface8.emit;
  var set = Splide2.state.set;
  var Move2 = Components2.Move;
  var getPosition = Move2.getPosition, getLimit = Move2.getLimit, exceededLimit = Move2.exceededLimit, translate = Move2.translate;
  var isSlide = Splide2.is(SLIDE);
  var interval;
  var callback;
  var friction = 1;
  function mount() {
    on(EVENT_MOVE, clear);
    on([EVENT_UPDATED, EVENT_REFRESH], cancel);
  }
  function scroll(destination, duration, snap, onScrolled, noConstrain) {
    var from = getPosition();
    clear();
    if (snap && (!isSlide || !exceededLimit())) {
      var size = Components2.Layout.sliderSize();
      var offset = sign(destination) * size * floor(abs(destination) / size) || 0;
      destination = Move2.toPosition(Components2.Controller.toDest(destination % size)) + offset;
    }
    var noDistance = approximatelyEqual(from, destination, 1);
    friction = 1;
    duration = noDistance ? 0 : duration || max(abs(destination - from) / BASE_VELOCITY, MIN_DURATION);
    callback = onScrolled;
    interval = RequestInterval(duration, onEnd, apply(update, from, destination, noConstrain), 1);
    set(SCROLLING);
    emit(EVENT_SCROLL);
    interval.start();
  }
  function onEnd() {
    set(IDLE);
    callback && callback();
    emit(EVENT_SCROLLED);
  }
  function update(from, to, noConstrain, rate) {
    var position = getPosition();
    var target = from + (to - from) * easing(rate);
    var diff = (target - position) * friction;
    translate(position + diff);
    if (isSlide && !noConstrain && exceededLimit()) {
      friction *= FRICTION_FACTOR;
      if (abs(diff) < BOUNCE_DIFF_THRESHOLD) {
        scroll(getLimit(exceededLimit(true)), BOUNCE_DURATION, false, callback, true);
      }
    }
  }
  function clear() {
    if (interval) {
      interval.cancel();
    }
  }
  function cancel() {
    if (interval && !interval.isPaused()) {
      clear();
      onEnd();
    }
  }
  function easing(t2) {
    var easingFunc = options.easingFunc;
    return easingFunc ? easingFunc(t2) : 1 - Math.pow(1 - t2, 4);
  }
  return {
    mount,
    destroy: clear,
    scroll,
    cancel
  };
}
var SCROLL_LISTENER_OPTIONS = {
  passive: false,
  capture: true
};
function Drag(Splide2, Components2, options) {
  var _EventInterface9 = EventInterface(Splide2), on = _EventInterface9.on, emit = _EventInterface9.emit, bind = _EventInterface9.bind, unbind = _EventInterface9.unbind;
  var state = Splide2.state;
  var Move2 = Components2.Move, Scroll2 = Components2.Scroll, Controller2 = Components2.Controller, track = Components2.Elements.track, reduce = Components2.Media.reduce;
  var _Components2$Directio2 = Components2.Direction, resolve = _Components2$Directio2.resolve, orient = _Components2$Directio2.orient;
  var getPosition = Move2.getPosition, exceededLimit = Move2.exceededLimit;
  var basePosition;
  var baseEvent;
  var prevBaseEvent;
  var isFree;
  var dragging;
  var exceeded = false;
  var clickPrevented;
  var disabled;
  var target;
  function mount() {
    bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
    bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
    bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
    bind(track, "click", onClick, {
      capture: true
    });
    bind(track, "dragstart", prevent);
    on([EVENT_MOUNTED, EVENT_UPDATED], init);
  }
  function init() {
    var drag = options.drag;
    disable(!drag);
    isFree = drag === "free";
  }
  function onPointerDown(e2) {
    clickPrevented = false;
    if (!disabled) {
      var isTouch = isTouchEvent(e2);
      if (isDraggable(e2.target) && (isTouch || !e2.button)) {
        if (!Controller2.isBusy()) {
          target = isTouch ? track : window;
          dragging = state.is([MOVING, SCROLLING]);
          prevBaseEvent = null;
          bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
          bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
          Move2.cancel();
          Scroll2.cancel();
          save(e2);
        } else {
          prevent(e2, true);
        }
      }
    }
  }
  function onPointerMove(e2) {
    if (!state.is(DRAGGING)) {
      state.set(DRAGGING);
      emit(EVENT_DRAG);
    }
    if (e2.cancelable) {
      if (dragging) {
        Move2.translate(basePosition + constrain(diffCoord(e2)));
        var expired = diffTime(e2) > LOG_INTERVAL;
        var hasExceeded = exceeded !== (exceeded = exceededLimit());
        if (expired || hasExceeded) {
          save(e2);
        }
        clickPrevented = true;
        emit(EVENT_DRAGGING);
        prevent(e2);
      } else if (isSliderDirection(e2)) {
        dragging = shouldStart(e2);
        prevent(e2);
      }
    }
  }
  function onPointerUp(e2) {
    if (state.is(DRAGGING)) {
      state.set(IDLE);
      emit(EVENT_DRAGGED);
    }
    if (dragging) {
      move(e2);
      prevent(e2);
    }
    unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
    unbind(target, POINTER_UP_EVENTS, onPointerUp);
    dragging = false;
  }
  function onClick(e2) {
    if (!disabled && clickPrevented) {
      prevent(e2, true);
    }
  }
  function save(e2) {
    prevBaseEvent = baseEvent;
    baseEvent = e2;
    basePosition = getPosition();
  }
  function move(e2) {
    var velocity = computeVelocity(e2);
    var destination = computeDestination(velocity);
    var rewind = options.rewind && options.rewindByDrag;
    reduce(false);
    if (isFree) {
      Controller2.scroll(destination, 0, options.snap);
    } else if (Splide2.is(FADE)) {
      Controller2.go(orient(sign(velocity)) < 0 ? rewind ? "<" : "-" : rewind ? ">" : "+");
    } else if (Splide2.is(SLIDE) && exceeded && rewind) {
      Controller2.go(exceededLimit(true) ? ">" : "<");
    } else {
      Controller2.go(Controller2.toDest(destination), true);
    }
    reduce(true);
  }
  function shouldStart(e2) {
    var thresholds = options.dragMinThreshold;
    var isObj = isObject(thresholds);
    var mouse = isObj && thresholds.mouse || 0;
    var touch = (isObj ? thresholds.touch : +thresholds) || 10;
    return abs(diffCoord(e2)) > (isTouchEvent(e2) ? touch : mouse);
  }
  function isSliderDirection(e2) {
    return abs(diffCoord(e2)) > abs(diffCoord(e2, true));
  }
  function computeVelocity(e2) {
    if (Splide2.is(LOOP) || !exceeded) {
      var time = diffTime(e2);
      if (time && time < LOG_INTERVAL) {
        return diffCoord(e2) / time;
      }
    }
    return 0;
  }
  function computeDestination(velocity) {
    return getPosition() + sign(velocity) * min(abs(velocity) * (options.flickPower || 600), isFree ? Infinity : Components2.Layout.listSize() * (options.flickMaxPages || 1));
  }
  function diffCoord(e2, orthogonal) {
    return coordOf(e2, orthogonal) - coordOf(getBaseEvent(e2), orthogonal);
  }
  function diffTime(e2) {
    return timeOf(e2) - timeOf(getBaseEvent(e2));
  }
  function getBaseEvent(e2) {
    return baseEvent === e2 && prevBaseEvent || baseEvent;
  }
  function coordOf(e2, orthogonal) {
    return (isTouchEvent(e2) ? e2.changedTouches[0] : e2)["page" + resolve(orthogonal ? "Y" : "X")];
  }
  function constrain(diff) {
    return diff / (exceeded && Splide2.is(SLIDE) ? FRICTION : 1);
  }
  function isDraggable(target2) {
    var noDrag = options.noDrag;
    return !matches(target2, "." + CLASS_PAGINATION_PAGE + ", ." + CLASS_ARROW) && (!noDrag || !matches(target2, noDrag));
  }
  function isTouchEvent(e2) {
    return typeof TouchEvent !== "undefined" && e2 instanceof TouchEvent;
  }
  function isDragging() {
    return dragging;
  }
  function disable(value) {
    disabled = value;
  }
  return {
    mount,
    disable,
    isDragging
  };
}
var NORMALIZATION_MAP = {
  Spacebar: " ",
  Right: ARROW_RIGHT,
  Left: ARROW_LEFT,
  Up: ARROW_UP,
  Down: ARROW_DOWN
};
function normalizeKey(key) {
  key = isString(key) ? key : key.key;
  return NORMALIZATION_MAP[key] || key;
}
var KEYBOARD_EVENT = "keydown";
function Keyboard(Splide2, Components2, options) {
  var _EventInterface10 = EventInterface(Splide2), on = _EventInterface10.on, bind = _EventInterface10.bind, unbind = _EventInterface10.unbind;
  var root = Splide2.root;
  var resolve = Components2.Direction.resolve;
  var target;
  var disabled;
  function mount() {
    init();
    on(EVENT_UPDATED, destroy);
    on(EVENT_UPDATED, init);
    on(EVENT_MOVE, onMove);
  }
  function init() {
    var keyboard = options.keyboard;
    if (keyboard) {
      target = keyboard === "global" ? window : root;
      bind(target, KEYBOARD_EVENT, onKeydown);
    }
  }
  function destroy() {
    unbind(target, KEYBOARD_EVENT);
  }
  function disable(value) {
    disabled = value;
  }
  function onMove() {
    var _disabled = disabled;
    disabled = true;
    nextTick(function() {
      disabled = _disabled;
    });
  }
  function onKeydown(e2) {
    if (!disabled) {
      var key = normalizeKey(e2);
      if (key === resolve(ARROW_LEFT)) {
        Splide2.go("<");
      } else if (key === resolve(ARROW_RIGHT)) {
        Splide2.go(">");
      }
    }
  }
  return {
    mount,
    destroy,
    disable
  };
}
var SRC_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-lazy";
var SRCSET_DATA_ATTRIBUTE = SRC_DATA_ATTRIBUTE + "-srcset";
var IMAGE_SELECTOR = "[" + SRC_DATA_ATTRIBUTE + "], [" + SRCSET_DATA_ATTRIBUTE + "]";
function LazyLoad(Splide2, Components2, options) {
  var _EventInterface11 = EventInterface(Splide2), on = _EventInterface11.on, off = _EventInterface11.off, bind = _EventInterface11.bind, emit = _EventInterface11.emit;
  var isSequential = options.lazyLoad === "sequential";
  var events = [EVENT_MOVED, EVENT_SCROLLED];
  var entries = [];
  function mount() {
    if (options.lazyLoad) {
      init();
      on(EVENT_REFRESH, init);
    }
  }
  function init() {
    empty(entries);
    register();
    if (isSequential) {
      loadNext();
    } else {
      off(events);
      on(events, check);
      check();
    }
  }
  function register() {
    Components2.Slides.forEach(function(Slide2) {
      queryAll(Slide2.slide, IMAGE_SELECTOR).forEach(function(img) {
        var src = getAttribute(img, SRC_DATA_ATTRIBUTE);
        var srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);
        if (src !== img.src || srcset !== img.srcset) {
          var className = options.classes.spinner;
          var parent = img.parentElement;
          var spinner = child(parent, "." + className) || create("span", className, parent);
          entries.push([img, Slide2, spinner]);
          img.src || display(img, "none");
        }
      });
    });
  }
  function check() {
    entries = entries.filter(function(data) {
      var distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
      return data[1].isWithin(Splide2.index, distance) ? load(data) : true;
    });
    entries.length || off(events);
  }
  function load(data) {
    var img = data[0];
    addClass(data[1].slide, CLASS_LOADING);
    bind(img, "load error", apply(onLoad, data));
    setAttribute(img, "src", getAttribute(img, SRC_DATA_ATTRIBUTE));
    setAttribute(img, "srcset", getAttribute(img, SRCSET_DATA_ATTRIBUTE));
    removeAttribute(img, SRC_DATA_ATTRIBUTE);
    removeAttribute(img, SRCSET_DATA_ATTRIBUTE);
  }
  function onLoad(data, e2) {
    var img = data[0], Slide2 = data[1];
    removeClass(Slide2.slide, CLASS_LOADING);
    if (e2.type !== "error") {
      remove(data[2]);
      display(img, "");
      emit(EVENT_LAZYLOAD_LOADED, img, Slide2);
      emit(EVENT_RESIZE);
    }
    isSequential && loadNext();
  }
  function loadNext() {
    entries.length && load(entries.shift());
  }
  return {
    mount,
    destroy: apply(empty, entries),
    check
  };
}
function Pagination(Splide2, Components2, options) {
  var event = EventInterface(Splide2);
  var on = event.on, emit = event.emit, bind = event.bind;
  var Slides2 = Components2.Slides, Elements2 = Components2.Elements, Controller2 = Components2.Controller;
  var hasFocus = Controller2.hasFocus, getIndex = Controller2.getIndex, go = Controller2.go;
  var resolve = Components2.Direction.resolve;
  var placeholder = Elements2.pagination;
  var items = [];
  var list;
  var paginationClasses;
  function mount() {
    destroy();
    on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], mount);
    var enabled = options.pagination;
    placeholder && display(placeholder, enabled ? "" : "none");
    if (enabled) {
      on([EVENT_MOVE, EVENT_SCROLL, EVENT_SCROLLED], update);
      createPagination();
      update();
      emit(EVENT_PAGINATION_MOUNTED, {
        list,
        items
      }, getAt(Splide2.index));
    }
  }
  function destroy() {
    if (list) {
      remove(placeholder ? slice(list.children) : list);
      removeClass(list, paginationClasses);
      empty(items);
      list = null;
    }
    event.destroy();
  }
  function createPagination() {
    var length = Splide2.length;
    var classes = options.classes, i18n = options.i18n, perPage = options.perPage;
    var max2 = hasFocus() ? Controller2.getEnd() + 1 : ceil(length / perPage);
    list = placeholder || create("ul", classes.pagination, Elements2.track.parentElement);
    addClass(list, paginationClasses = CLASS_PAGINATION + "--" + getDirection());
    setAttribute(list, ROLE, "tablist");
    setAttribute(list, ARIA_LABEL, i18n.select);
    setAttribute(list, ARIA_ORIENTATION, getDirection() === TTB ? "vertical" : "");
    for (var i2 = 0; i2 < max2; i2++) {
      var li = create("li", null, list);
      var button = create("button", {
        class: classes.page,
        type: "button"
      }, li);
      var controls = Slides2.getIn(i2).map(function(Slide2) {
        return Slide2.slide.id;
      });
      var text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
      bind(button, "click", apply(onClick, i2));
      if (options.paginationKeyboard) {
        bind(button, "keydown", apply(onKeydown, i2));
      }
      setAttribute(li, ROLE, "presentation");
      setAttribute(button, ROLE, "tab");
      setAttribute(button, ARIA_CONTROLS, controls.join(" "));
      setAttribute(button, ARIA_LABEL, format(text, i2 + 1));
      setAttribute(button, TAB_INDEX, -1);
      items.push({
        li,
        button,
        page: i2
      });
    }
  }
  function onClick(page) {
    go(">" + page, true);
  }
  function onKeydown(page, e2) {
    var length = items.length;
    var key = normalizeKey(e2);
    var dir = getDirection();
    var nextPage = -1;
    if (key === resolve(ARROW_RIGHT, false, dir)) {
      nextPage = ++page % length;
    } else if (key === resolve(ARROW_LEFT, false, dir)) {
      nextPage = (--page + length) % length;
    } else if (key === "Home") {
      nextPage = 0;
    } else if (key === "End") {
      nextPage = length - 1;
    }
    var item = items[nextPage];
    if (item) {
      focus(item.button);
      go(">" + nextPage);
      prevent(e2, true);
    }
  }
  function getDirection() {
    return options.paginationDirection || options.direction;
  }
  function getAt(index) {
    return items[Controller2.toPage(index)];
  }
  function update() {
    var prev = getAt(getIndex(true));
    var curr = getAt(getIndex());
    if (prev) {
      var button = prev.button;
      removeClass(button, CLASS_ACTIVE);
      removeAttribute(button, ARIA_SELECTED);
      setAttribute(button, TAB_INDEX, -1);
    }
    if (curr) {
      var _button = curr.button;
      addClass(_button, CLASS_ACTIVE);
      setAttribute(_button, ARIA_SELECTED, true);
      setAttribute(_button, TAB_INDEX, "");
    }
    emit(EVENT_PAGINATION_UPDATED, {
      list,
      items
    }, prev, curr);
  }
  return {
    items,
    mount,
    destroy,
    getAt,
    update
  };
}
var TRIGGER_KEYS = [" ", "Enter"];
function Sync(Splide2, Components2, options) {
  var isNavigation = options.isNavigation, slideFocus = options.slideFocus;
  var events = [];
  function mount() {
    Splide2.splides.forEach(function(target) {
      if (!target.isParent) {
        sync(Splide2, target.splide);
        sync(target.splide, Splide2);
      }
    });
    if (isNavigation) {
      navigate();
    }
  }
  function destroy() {
    events.forEach(function(event) {
      event.destroy();
    });
    empty(events);
  }
  function remount() {
    destroy();
    mount();
  }
  function sync(splide, target) {
    var event = EventInterface(splide);
    event.on(EVENT_MOVE, function(index, prev, dest) {
      target.go(target.is(LOOP) ? dest : index);
    });
    events.push(event);
  }
  function navigate() {
    var event = EventInterface(Splide2);
    var on = event.on;
    on(EVENT_CLICK, onClick);
    on(EVENT_SLIDE_KEYDOWN, onKeydown);
    on([EVENT_MOUNTED, EVENT_UPDATED], update);
    events.push(event);
    event.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
  }
  function update() {
    setAttribute(Components2.Elements.list, ARIA_ORIENTATION, options.direction === TTB ? "vertical" : "");
  }
  function onClick(Slide2) {
    Splide2.go(Slide2.index);
  }
  function onKeydown(Slide2, e2) {
    if (includes(TRIGGER_KEYS, normalizeKey(e2))) {
      onClick(Slide2);
      prevent(e2);
    }
  }
  return {
    setup: apply(Components2.Media.set, {
      slideFocus: isUndefined(slideFocus) ? isNavigation : slideFocus
    }, true),
    mount,
    destroy,
    remount
  };
}
function Wheel(Splide2, Components2, options) {
  var _EventInterface12 = EventInterface(Splide2), bind = _EventInterface12.bind;
  var lastTime = 0;
  function mount() {
    if (options.wheel) {
      bind(Components2.Elements.track, "wheel", onWheel, SCROLL_LISTENER_OPTIONS);
    }
  }
  function onWheel(e2) {
    if (e2.cancelable) {
      var deltaY = e2.deltaY;
      var backwards = deltaY < 0;
      var timeStamp = timeOf(e2);
      var _min = options.wheelMinThreshold || 0;
      var sleep = options.wheelSleep || 0;
      if (abs(deltaY) > _min && timeStamp - lastTime > sleep) {
        Splide2.go(backwards ? "<" : ">");
        lastTime = timeStamp;
      }
      shouldPrevent(backwards) && prevent(e2);
    }
  }
  function shouldPrevent(backwards) {
    return !options.releaseWheel || Splide2.state.is(MOVING) || Components2.Controller.getAdjacent(backwards) !== -1;
  }
  return {
    mount
  };
}
var SR_REMOVAL_DELAY = 90;
function Live(Splide2, Components2, options) {
  var _EventInterface13 = EventInterface(Splide2), on = _EventInterface13.on;
  var track = Components2.Elements.track;
  var enabled = options.live && !options.isNavigation;
  var sr = create("span", CLASS_SR);
  var interval = RequestInterval(SR_REMOVAL_DELAY, apply(toggle, false));
  function mount() {
    if (enabled) {
      disable(!Components2.Autoplay.isPaused());
      setAttribute(track, ARIA_ATOMIC, true);
      sr.textContent = "…";
      on(EVENT_AUTOPLAY_PLAY, apply(disable, true));
      on(EVENT_AUTOPLAY_PAUSE, apply(disable, false));
      on([EVENT_MOVED, EVENT_SCROLLED], apply(toggle, true));
    }
  }
  function toggle(active) {
    setAttribute(track, ARIA_BUSY, active);
    if (active) {
      append(track, sr);
      interval.start();
    } else {
      remove(sr);
      interval.cancel();
    }
  }
  function destroy() {
    removeAttribute(track, [ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY]);
    remove(sr);
  }
  function disable(disabled) {
    if (enabled) {
      setAttribute(track, ARIA_LIVE, disabled ? "off" : "polite");
    }
  }
  return {
    mount,
    disable,
    destroy
  };
}
var ComponentConstructors = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Media,
  Direction,
  Elements,
  Slides,
  Layout,
  Clones,
  Move,
  Controller,
  Arrows,
  Autoplay,
  Cover,
  Scroll,
  Drag,
  Keyboard,
  LazyLoad,
  Pagination,
  Sync,
  Wheel,
  Live
});
var I18N = {
  prev: "Previous slide",
  next: "Next slide",
  first: "Go to first slide",
  last: "Go to last slide",
  slideX: "Go to slide %s",
  pageX: "Go to page %s",
  play: "Start autoplay",
  pause: "Pause autoplay",
  carousel: "carousel",
  slide: "slide",
  select: "Select a slide to show",
  slideLabel: "%s of %s"
};
var DEFAULTS = {
  type: "slide",
  role: "region",
  speed: 400,
  perPage: 1,
  cloneStatus: true,
  arrows: true,
  pagination: true,
  paginationKeyboard: true,
  interval: 5e3,
  pauseOnHover: true,
  pauseOnFocus: true,
  resetProgress: true,
  easing: "cubic-bezier(0.25, 1, 0.5, 1)",
  drag: true,
  direction: "ltr",
  trimSpace: true,
  focusableNodes: "a, button, textarea, input, select, iframe",
  live: true,
  classes: CLASSES,
  i18n: I18N,
  reducedMotion: {
    speed: 0,
    rewindSpeed: 0,
    autoplay: "pause"
  }
};
function Fade(Splide2, Components2, options) {
  var Slides2 = Components2.Slides;
  function mount() {
    EventInterface(Splide2).on([EVENT_MOUNTED, EVENT_REFRESH], init);
  }
  function init() {
    Slides2.forEach(function(Slide2) {
      Slide2.style("transform", "translateX(-" + 100 * Slide2.index + "%)");
    });
  }
  function start(index, done) {
    Slides2.style("transition", "opacity " + options.speed + "ms " + options.easing);
    nextTick(done);
  }
  return {
    mount,
    start,
    cancel: noop
  };
}
function Slide(Splide2, Components2, options) {
  var Move2 = Components2.Move, Controller2 = Components2.Controller, Scroll2 = Components2.Scroll;
  var list = Components2.Elements.list;
  var transition = apply(style, list, "transition");
  var endCallback;
  function mount() {
    EventInterface(Splide2).bind(list, "transitionend", function(e2) {
      if (e2.target === list && endCallback) {
        cancel();
        endCallback();
      }
    });
  }
  function start(index, done) {
    var destination = Move2.toPosition(index, true);
    var position = Move2.getPosition();
    var speed = getSpeed(index);
    if (abs(destination - position) >= 1 && speed >= 1) {
      if (options.useScroll) {
        Scroll2.scroll(destination, speed, false, done);
      } else {
        transition("transform " + speed + "ms " + options.easing);
        Move2.translate(destination, true);
        endCallback = done;
      }
    } else {
      Move2.jump(index);
      done();
    }
  }
  function cancel() {
    transition("");
    Scroll2.cancel();
  }
  function getSpeed(index) {
    var rewindSpeed = options.rewindSpeed;
    if (Splide2.is(SLIDE) && rewindSpeed) {
      var prev = Controller2.getIndex(true);
      var end = Controller2.getEnd();
      if (prev === 0 && index >= end || prev >= end && index === 0) {
        return rewindSpeed;
      }
    }
    return options.speed;
  }
  return {
    mount,
    start,
    cancel
  };
}
var _Splide = /* @__PURE__ */ function() {
  function _Splide2(target, options) {
    this.event = EventInterface();
    this.Components = {};
    this.state = State(CREATED);
    this.splides = [];
    this._o = {};
    this._E = {};
    var root = isString(target) ? query(document, target) : target;
    assert(root, root + " is invalid.");
    this.root = root;
    options = merge({
      label: getAttribute(root, ARIA_LABEL) || "",
      labelledby: getAttribute(root, ARIA_LABELLEDBY) || ""
    }, DEFAULTS, _Splide2.defaults, options || {});
    try {
      merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
    } catch (e2) {
      assert(false, "Invalid JSON");
    }
    this._o = Object.create(merge({}, options));
  }
  var _proto = _Splide2.prototype;
  _proto.mount = function mount(Extensions, Transition) {
    var _this = this;
    var state = this.state, Components2 = this.Components;
    assert(state.is([CREATED, DESTROYED]), "Already mounted!");
    state.set(CREATED);
    this._C = Components2;
    this._T = Transition || this._T || (this.is(FADE) ? Fade : Slide);
    this._E = Extensions || this._E;
    var Constructors = assign({}, ComponentConstructors, this._E, {
      Transition: this._T
    });
    forOwn(Constructors, function(Component, key) {
      var component = Component(_this, Components2, _this._o);
      Components2[key] = component;
      component.setup && component.setup();
    });
    forOwn(Components2, function(component) {
      component.mount && component.mount();
    });
    this.emit(EVENT_MOUNTED);
    addClass(this.root, CLASS_INITIALIZED);
    state.set(IDLE);
    this.emit(EVENT_READY);
    return this;
  };
  _proto.sync = function sync(splide) {
    this.splides.push({
      splide
    });
    splide.splides.push({
      splide: this,
      isParent: true
    });
    if (this.state.is(IDLE)) {
      this._C.Sync.remount();
      splide.Components.Sync.remount();
    }
    return this;
  };
  _proto.go = function go(control) {
    this._C.Controller.go(control);
    return this;
  };
  _proto.on = function on(events, callback) {
    this.event.on(events, callback);
    return this;
  };
  _proto.off = function off(events) {
    this.event.off(events);
    return this;
  };
  _proto.emit = function emit(event) {
    var _this$event;
    (_this$event = this.event).emit.apply(_this$event, [event].concat(slice(arguments, 1)));
    return this;
  };
  _proto.add = function add(slides, index) {
    this._C.Slides.add(slides, index);
    return this;
  };
  _proto.remove = function remove2(matcher) {
    this._C.Slides.remove(matcher);
    return this;
  };
  _proto.is = function is(type) {
    return this._o.type === type;
  };
  _proto.refresh = function refresh() {
    this.emit(EVENT_REFRESH);
    return this;
  };
  _proto.destroy = function destroy(completely) {
    if (completely === void 0) {
      completely = true;
    }
    var event = this.event, state = this.state;
    if (state.is(CREATED)) {
      EventInterface(this).on(EVENT_READY, this.destroy.bind(this, completely));
    } else {
      forOwn(this._C, function(component) {
        component.destroy && component.destroy(completely);
      }, true);
      event.emit(EVENT_DESTROY);
      event.destroy();
      completely && empty(this.splides);
      state.set(DESTROYED);
    }
    return this;
  };
  _createClass(_Splide2, [{
    key: "options",
    get: function get() {
      return this._o;
    },
    set: function set(options) {
      this._C.Media.set(options, true, true);
    }
  }, {
    key: "length",
    get: function get() {
      return this._C.Slides.getLength(true);
    }
  }, {
    key: "index",
    get: function get() {
      return this._C.Controller.getIndex();
    }
  }]);
  return _Splide2;
}();
var Splide = _Splide;
Splide.defaults = {};
Splide.STATES = STATES;
function flexSlide(target, delay = 4e3, list = 4, pager = true, auto = true, loop = false, target2) {
  const slideElement = document.querySelectorAll(target);
  const elementArr = Array.prototype.slice.call(slideElement);
  if (slideElement.length > 0) {
    elementArr.forEach((element) => {
      const item = element.querySelectorAll(".splide__slide").length;
      const slide = new Splide(element, {
        arrows: false,
        pagination: pager,
        speed: 1,
        autoplay: auto,
        rewind: loop === true ? true : false,
        interval: delay,
        pauseOnFocus: true,
        pauseOnHover: true,
        type: "fade",
        isNavigation: true
      });
      {
        const slide2 = new Splide(target2, {
          arrows: false,
          pagination: false,
          speed: 10,
          rewind: false,
          type: "slide",
          perPage: item < list ? item : list,
          isNavigation: true,
          perMove: 1,
          gap: "1.6rem"
        });
        slide.mount();
        slide2.sync(slide);
        slide2.mount();
      }
    });
  }
}
flexSlide(".mv_slide_main", 4e3, 4, false, false, false, ".mv_slide_thumb");
window.addEventListener("DOMContentLoaded", () => {
  new Modal();
  new Hamburger();
  new Tab();
  new ScrollAnimation();
  new Tab();
  new Filter();
  new NewsArchive();
  new SmoothScroll();
  new GuideTour();
});
window.addEventListener("load", () => {
  new Accordion();
  getHeader();
});
