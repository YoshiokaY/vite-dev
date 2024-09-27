//** タブ */
export class Tab {
  /**
   * タブのクラス
   * @parm {string}
   */
  target: string;
  /**
   * タブ展開時のクラス
   * @parm {string}
   */
  open: string;
  constructor(TARGET: string = ".c_tab", OPEN: string = "-open") {
    this.target = TARGET;
    this.open = OPEN;
    const btns = document.querySelectorAll(TARGET + "_list li button");

    function onTabClick(e: Event) {
      const event = e.target as HTMLElement;
      // イベントターゲットが含まれるタブコンテンツを取得
      const parent = event.closest(TARGET);
      const tabContents = parent?.querySelectorAll(TARGET + "_content");
      const tabArr = Array.prototype.slice.call(tabContents);
      const item = parent?.querySelectorAll(TARGET + "_list li button");
      const itemArr = Array.prototype.slice.call(item);
      // ボタンとパネルを紐づけるための番号取得
      const index = itemArr.indexOf(e.target);
      // タブボタン切り替え
      itemArr.forEach((el) => {
        el.classList.remove(OPEN);
        el.setAttribute("aria-pressed", "false");
        el.setAttribute("tabindex", "0");
      });
      event.classList.add(OPEN);
      event.setAttribute("aria-pressed", "true");
      event.setAttribute("tabindex", "-1");

      // タブパネル切り替え
      tabArr.forEach((tab) => {
        tab.setAttribute("hidden", "");
        tab.setAttribute("tabindex", "-1");
      });
      tabArr[index].removeAttribute("hidden");
      // フォーカスしてもスクロールはしない
      tabArr[index].focus({ preventScroll: true });
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
