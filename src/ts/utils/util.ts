// サニタイズ
// データ属性などから取得する文字列を無害化する際に使用
export const sanitize = (str: string | null) => {
  return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

// 固定ヘッダー分の高さをcss変数に格納
export const getHeader = () => {
  const header = document.querySelector("header");
  const headerHeight = header?.clientHeight;
  let showFlag: boolean = false;
  if (headerHeight) {
    // 読み込み時のバッファ
    setTimeout(() => {
      document.documentElement.style.setProperty("--headerHeight", `${headerHeight}px`);
    }, 5);
    // スクロールでヘッダーにクラス付与
    document.addEventListener("scroll", () => {
      if (window.scrollY > headerHeight) {
        if (!showFlag) {
          showFlag = true;
          header?.classList.add("-fixed");
        }
      } else {
        if (showFlag) {
          showFlag = false;
          header?.classList.remove("-fixed");
        }
      }
    });
  }
};

export const getTime = (date: string) => {
  const formattedDate = new Date(date.replace(/年|月|日/g, "/").replace("日", ""));
  let year = formattedDate.getFullYear();
  let month = String(formattedDate.getMonth() + 1).padStart(2, "0");
  let day = String(formattedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const srcCheck = (src: string) => {
  let regExp = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/gi;
  if (!src.match(regExp)) {
    return src;
  }
};
