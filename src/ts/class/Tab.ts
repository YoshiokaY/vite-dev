// タブ
export class Tab {
  constructor() {
    //タブ
    const btns = document.querySelectorAll(".c_tab_list li button");
    function onTabClick(e: Event) {
      let event = e.target as HTMLElement;
      // イベントターゲットが含まれるタブコンテンツを取得
      const parent = event.closest(".c_tab");
      const tabContents = parent?.querySelectorAll(".c_tab_content");
      const tabArr = Array.prototype.slice.call(tabContents);
      const item = parent?.querySelectorAll(".c_tab_list li button");
      const itemArr = Array.prototype.slice.call(item);
      // ボタンとパネルを紐づけるための番号取得
      const index = itemArr.indexOf(e.target);
      // タブボタン切り替え
      itemArr.forEach((el) => {
        el.classList.remove("-open");
        el.setAttribute("aria-pressed", "false");
        el.setAttribute("tabindex", "0");
      });
      event.classList.add("-open");
      event.setAttribute("aria-pressed", "true");
      event.setAttribute("tabindex", "-1");

      // タブパネル切り替え
      tabArr.forEach((tab) => {
        tab.setAttribute("hidden", "");
        tab.setAttribute("tabindex", "-1");
      });
      tabArr[index].removeAttribute("hidden");
      tabArr[index].setAttribute("tabindex", "0");
      // tabArr[index].focus();
    }

    btns.forEach((btn) => {
      btn.addEventListener("click", onTabClick);
    });

    // アンカーリンク調べてそのタブを開く
    if (btns.length > 0) {
      const url = new URL(window.location.href);
      const hash = url.hash;
      if (hash) {
        const number = Number(hash.slice(-1));
        if (!isNaN(number)) {
          (<HTMLElement>btns[number - 1]).click();
        }
      }
    }
  }
}
