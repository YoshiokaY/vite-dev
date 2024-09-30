// サニタイズ
// データ属性などから取得する文字列を無害化する際に使用
export const sanitize = (str: string | null) => {
  return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

// 固定ヘッダー分の高さをcss変数に格納
export const getHeader = () => {
  const header = document.querySelector("header");
  const headerHeight = header?.clientHeight;
  if (headerHeight) {
    // 読み込み時のバッファ
    setTimeout(() => {
      document.documentElement.style.setProperty("--headerHeight", `${headerHeight}px`);
    }, 5);
  }
};

// トップに戻るボタンなど、スクロールしたら何かする場合
export const setScroll = () => {
  const header = document.querySelector("header");
  const topBtn = document.querySelector("#toTop") as HTMLElement;
  if (header) {
    // トリガー要素を挿入
    const scrollTrigger = document.createElement("div");
    const headerHeight = header?.clientHeight;
    scrollTrigger.id = "scrollTrigger";
    scrollTrigger.style.top = String(headerHeight) + "px";
    scrollTrigger.style.position = "absolute";
    header.parentNode?.insertBefore(scrollTrigger, header.nextSibling);
    // 交差オブザーバーの設定
    const options = {
      root: null,
      rootMargin: "0px 0px 0px 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          // トップに戻るボタンを表示する
          if (topBtn) {
            topBtn.style.bottom = "-200px";
          }
        } else {
          if (topBtn) {
            topBtn.style.bottom = "200px";
          }
        }
      });
    }, options);

    observer.observe(scrollTrigger);
  }
};
