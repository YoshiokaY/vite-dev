//** モーダル */
import { sanitize } from "../utils/util.ts";

export class Modal {
  /**
   * モーダルのクラス
   * @parm {string}
   */
  target: string;

  constructor(TARGET: string = ".c_modal") {
    this.target = TARGET; // ターゲット要素
    const modalBtn = document.querySelectorAll(TARGET + "_btn");
    let closes = document.querySelectorAll(TARGET + "_close");

    modalBtn.forEach((a) => {
      a.addEventListener("click", (e) => {
        const event = e.currentTarget as HTMLElement;
        //ボタンに紐づいたモーダルを開くためにaria-contorolからID取得
        let modalID: string | null = sanitize(event?.getAttribute("aria-controls") || "");
        let modal = document.getElementById(modalID) as HTMLDialogElement;
        const targetNext = event.nextElementSibling;
        if (modalID) {
          modal = document.getElementById(modalID) as HTMLDialogElement;
        } else {
          //画像・動画の場合
          const modalSrc = sanitize(event.getAttribute("data-src")); // アセットのアドレス
          const modalAlt = sanitize(event.getAttribute("data-alt")); // alt属性
          if (!targetNext) {
            const YOUTUBE = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i;
            const youtube_uri = YOUTUBE.exec(modalSrc);
            let dialog = "";
            dialog += '<dialog class="c_modal"><div class="c_modal_content" tabindex="-1">';
            //youtubeiframe挿入
            if (youtube_uri) {
              dialog += '<button class="c_modal_close"><span class="txtHidden">モーダルウィンドウを閉じる</span></button>';
              dialog += setFrame(
                appendQueryParams(
                  "https://www.youtube" + (youtube_uri[2] || "") + ".com/embed/" + youtube_uri[4],
                  //youtubeのオプションを記述
                  Object.assign(
                    {
                      autoplay: 1,
                      rel: 0,
                    },
                    parseQueryParams(youtube_uri[5] || "")
                  )
                )
              );
            } else {
              //画像用モーダル
              dialog += `<figure><img src=${modalSrc} decoding="async" alt=${modalAlt}></figure>`;
            }
            dialog += '<button class="c_modal_close"><span class="txtHidden">モーダルウィンドウを閉じる</span></button>';
            dialog += "</div></dialog>";
            event.insertAdjacentHTML("afterend", dialog);
          }
          modal = event.nextElementSibling as HTMLDialogElement;
          closes = document.querySelectorAll(".c_modal_close");
        }

        //モーダル展開
        modal?.showModal();
        const content = modal.querySelector(TARGET + "_content") as HTMLElement;
        setTimeout(() => {
          // ターゲットにフォーカスを移動
          content?.focus({ preventScroll: true });
          // アクティブな要素がターゲット要素でない場合
          if (document.activeElement !== content) {
            // ターゲット要素のtabindexを一時的に-1に設定
            content?.setAttribute("tabindex", "-1");
            // 再度フォーカスを設定
            content?.focus({ preventScroll: true });
          }
        }, 0);

        //モーダルの使い回し時に呼び出す
        // setModal(modalDate);

        //IDメモリ解放
        modalID = null;
        closes.forEach((close) => {
          close.addEventListener("click", () => {
            closeModal(modal);
          });
        });

        modal?.addEventListener("cancel", () => {
          closeModal(modal);
        });

        modal?.addEventListener("click", (e) => {
          const event = e.target as HTMLElement;
          if (event === modal) {
            closeModal(modal);
          }
        });
      });
    });
    //モーダル始末
    function closeModal(modal: HTMLDialogElement) {
      modal.close("cancelled");
      //iframeだけ始末
      if (modal.querySelector(".frameWrapper")) {
        modal.remove();
      }
    }

    //Youtube用
    function setFrame(target: string) {
      return '<div class="frameWrapper"><iframe frameborder="0" allow="autoplay; fullscreen" src="' + target + '"/></div>';
    }

    function parseQueryParams(params: string) {
      const pairs = decodeURI(params.split("#")[0]).split("&");
      const obj = new Map();
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

    function appendQueryParams(url: string, params: { autoplay: number; rel: number }) {
      const keys = Object.keys(params) as (keyof typeof params)[];
      const query = keys.map((key) => `${key}=${params[key]}`).join("&");
      return `${url}${url.includes("?") ? "&" : "?"}${query}`;
    }
  }
}
