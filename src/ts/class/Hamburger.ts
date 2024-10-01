//ハンバーガーメニュー
export class Hamburger {
  /**
   * ナビゲーション要素
   * @parm {string}
   */
  target: string;

  /**
   * 展開時のクラス名
   * @parm {string}
   */
  open: string;

  constructor(TARGET: string = ".headerNavi", OPEN: string = "-open") {
    this.target = TARGET;
    this.open = OPEN;
    const nav = document.querySelector(TARGET);
    const btn = nav?.querySelector(".ac_menu") as HTMLElement;
    const btn_label = nav?.querySelector(".ac_menu span") as HTMLElement;
    const wrap = nav?.querySelector(".naviWrapper");
    const close_btn = nav?.querySelector(".closeBtn");

    btn?.addEventListener("click", () => {
      nav?.classList.toggle(OPEN);
      if (nav?.classList.contains(OPEN)) {
        btn.setAttribute("aria-expanded", "true");
        btn_label.textContent = "メニューを閉じる";
      } else {
        btn.setAttribute("aria-expanded", "false");
        btn_label.textContent = "メニューを開く";
      }
    });
    close_btn?.addEventListener("click", () => {
      menuClose();
    });
    wrap?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.closest("#navi") === null) {
        menuClose();
      }
    });

    const menuClose = () => {
      nav?.classList.remove(OPEN);
      btn.setAttribute("aria-expanded", "false");
      btn_label.textContent = "メニューを開く";
    };
    function subMenu() {
      const ac = document.querySelectorAll(".spAccordion");
      const HEIGHT = "--subHeightOpen"; //開いた時の高さ
      const OFFSET_TIME = 5; //ディレイ
      let openFlg = false;
      const SPEED: number = 250;

      ac.forEach((btn) => {
        btn?.addEventListener("click", () => {
          const subMenu = btn.closest("div")?.nextElementSibling as HTMLElement;
          if (!openFlg) {
            subMenu.classList.add("-open"); // クラスの追加
            btn.classList.add("-open");

            const height = subMenu.offsetHeight; //高さ取得
            subMenu.style.setProperty(HEIGHT, "0"); //アニメーション開始用の0

            // open付与から少しだけ遅らせた方が動作が安定する
            setTimeout(() => {
              // ※ コンテンツの高さはopenを付けたあとで取得しないと iOSで０になる
              subMenu.style.setProperty(HEIGHT, `${height}px`);
              openFlg = true;
            }, OFFSET_TIME);
          } else if (openFlg) {
            // アニメーション
            subMenu.style.setProperty(HEIGHT, "0");
            btn.classList.remove("-open");

            // アニメーション完了後にopenクラスを削除。（CSS側のアニメーション時間+少しだけ余裕をもたせている）
            setTimeout(() => {
              subMenu.classList.remove("-open"); // クラスを削除
              openFlg = false;
              subMenu.style.setProperty(HEIGHT, "auto"); //アニメーションの後始末
            }, SPEED + OFFSET_TIME);
          }
        });
      });
    }
    subMenu();
  }
}
