// lenis
import Lenis from "@studio-freight/lenis";
export class Scroll {
  constructor() {
    const easeOutQuart = (x: number) => {
      return 1 - Math.pow(1 - x, 4);
    };

    const lenis = new Lenis({
      lerp: 0.2, // 慣性の強さ
      duration: 1, // スクロールアニメーションの時間
      easing: easeOutQuart, // イージング関数
    });

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    // アンカーリンクを取得
    const anchors = document.querySelectorAll("a[href^='#']");
    if (anchors.length > 0) {
      anchors.forEach((btn) => {
        // クリック時に目的の箇所までスクロールする
        btn?.addEventListener("click", (e) => {
          let event = e.currentTarget as HTMLElement;
          // urlを変更しないようにする
          e.preventDefault();
          let target = String(event?.getAttribute("href"));
          const destination = document.getElementById(target.replace("#", ""));
          // スクロール
          lenis.scrollTo(target);
          destination?.setAttribute("tabindex", "-1");
          destination?.focus();
        });
      });
    }
  }
}
