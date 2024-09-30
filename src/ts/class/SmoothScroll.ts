// スムーススクロール
// 基本的にCSSのscroll-behavior: smooth;とscroll-margin-topで代用できますが、別ページから飛んでくるアンカーリンクがある場合、JSで実装した方が余計なスクロールを発生させないので有効です

export class SmoothScroll {
  /**
   * 固定ヘッダーかどうか
   * @parm {string}
   */
  header_fix: boolean;
  constructor(HEADER_FIX: boolean = false) {
    this.header_fix = HEADER_FIX;
    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const href = anchor.getAttribute("href");
        let target: HTMLElement | null;

        if (!href) {
          return;
        }
        if (href === "#") {
          target = document.body;
          smoothScroll(target);
        } else if (href) {
          target = document.getElementById(href.replace("#", ""));
          // 固定ヘッダーの場合、ターゲットに対してヘッダーの高さ分だけscroll-margin-block-startを設定
          if (target && this.header_fix) {
            const header = document.querySelector("header");
            const headerHeight = header?.clientHeight;
            target.style.scrollMarginBlockStart = String(headerHeight) + "px";
          }
          smoothScroll(target);
        }
      });
    });

    function smoothScroll(target: HTMLElement | null) {
      // スクロールのオプション
      // ブラウザ側が視差効果を明示的に切っている場合は従う
      const isPrefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const scrollBehavior = isPrefersReduced ? "instant" : "smooth";

      setTimeout(() => {
        // ターゲットにフォーカスを移動
        target?.focus({ preventScroll: true });
        // アクティブな要素がターゲット要素でない場合
        if (document.activeElement !== target) {
          // ターゲット要素のtabindexを一時的に-1に設定
          target?.setAttribute("tabindex", "-1");
          // 再度フォーカスを設定
          target?.focus({ preventScroll: true });
        }
        // スクロールさせる
        target?.scrollIntoView({ behavior: scrollBehavior, inline: "end" });
      }, 0);
    }

    // 別ページから飛んできた場合は不要なスクロールを発生させない
    // URLのハッシュ値を取得
    const urlHash = location.hash;
    if (urlHash) {
      const urlTarget = document.querySelector(urlHash) as HTMLElement;
      if (urlTarget) {
        // 固定ヘッダーの場合、ターゲットに対してヘッダーの高さ分だけscroll-margin-block-startを設定
        if (urlTarget && this.header_fix) {
          const header = document.querySelector("header");
          const headerHeight = header?.clientHeight;
          urlTarget.style.scrollMarginBlockStart = String(headerHeight) + "px";
        }
        urlTarget.scrollIntoView({ behavior: "instant", inline: "end" });
      }
    }
  }
}
