var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
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
    /**
     * アコーディオンの開閉スピード
     * @parm {number}
     */
    __publicField(this, "speed");
    /**
     * SPのブレイクポイント
     * @parm {number}
     */
    __publicField(this, "mq");
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
      ttl == null ? void 0 : ttl.addEventListener("click", (e) => {
        e.preventDefault();
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
class Modal {
  constructor(TARGET = ".c_modal") {
    /**
     * モーダルのクラス
     * @parm {string}
     */
    __publicField(this, "target");
    this.target = TARGET;
    const modalBtn = document.querySelectorAll(TARGET + "_btn");
    let closes = document.querySelectorAll(TARGET + "_close");
    modalBtn.forEach((a) => {
      a.addEventListener("click", (e) => {
        const event = e.currentTarget;
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
            dialog += "</div></dialog>";
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
        modal == null ? void 0 : modal.addEventListener("click", (e2) => {
          const event2 = e2.target;
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
      let p;
      for (let i = 0, n = pairs.length; i < n; i++) {
        if (!pairs[i]) {
          continue;
        }
        p = pairs[i].split("=");
        obj.set(p[0], p[1]);
      }
      return obj;
    }
    function appendQueryParams(url, params) {
      const keys = Object.keys(params);
      const query = keys.map((key) => `${key}=${params[key]}`).join("&");
      return `${url}${url.includes("?") ? "&" : "?"}${query}`;
    }
  }
}
class Hamburger {
  constructor(TARGET = ".headerNavi", OPEN = "-open") {
    /**
     * ナビゲーション要素
     * @parm {string}
     */
    __publicField(this, "target");
    /**
     * 展開時のクラス名
     * @parm {string}
     */
    __publicField(this, "open");
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
    wrap == null ? void 0 : wrap.addEventListener("click", (e) => {
      const target = e.target;
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
          var _a;
          const subMenu2 = (_a = btn2.closest("div")) == null ? void 0 : _a.nextElementSibling;
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
    /**
     * アニメーションを付与する要素
     * @parm {string}
     */
    __publicField(this, "target");
    /**
     * アニメーションを付与するためのクラス名
     * @parm {string}
     */
    __publicField(this, "active");
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
    /**
     * タブのクラス
     * @parm {string}
     */
    __publicField(this, "target");
    /**
     * タブ展開時のクラス
     * @parm {string}
     */
    __publicField(this, "open");
    this.target = TARGET;
    this.open = OPEN;
    const btns = document.querySelectorAll(TARGET + "_list li button");
    function onTabClick(e) {
      const event = e.target;
      const parent = event.closest(TARGET);
      const tabContents = parent == null ? void 0 : parent.querySelectorAll(TARGET + "_content");
      const tabArr = Array.prototype.slice.call(tabContents);
      const item = parent == null ? void 0 : parent.querySelectorAll(TARGET + "_list li button");
      const itemArr = Array.prototype.slice.call(item);
      const index = itemArr.indexOf(e.target);
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
class SmoothScroll {
  constructor(HEADER_FIX = false) {
    /**
     * 固定ヘッダーかどうか
     * @parm {string}
     */
    __publicField(this, "header_fix");
    this.header_fix = HEADER_FIX;
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
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
window.addEventListener("DOMContentLoaded", () => {
  new Modal();
  new Hamburger();
  new Tab();
  new ScrollAnimation();
  new SmoothScroll();
});
window.addEventListener("load", () => {
  new Accordion();
});
