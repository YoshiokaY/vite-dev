// モーダル
export class Modal {
  constructor() {
    //モーダル
    const html = document.querySelector("html");
    const modalBtn = document.querySelectorAll(".c_modal_btn");
    // let modal = "";
    let closes = document.querySelectorAll(".c_modal_close");

    modalBtn.forEach((a) => {
      a.addEventListener("click", (e) => {
        let event = e.currentTarget as HTMLElement;
        //ボタンに紐づいたモーダルを開くためにaria-contorolからID取得
        let modalID: string | null = sanitize(event?.getAttribute("aria-controls") || "");
        let modal = document.getElementById(modalID) as HTMLDialogElement;
        const targetNext = event.nextElementSibling;
        if (modalID) {
          modal = document.getElementById(modalID) as HTMLDialogElement;
        } else {
          //画像・動画の場合
          let modalHref = sanitize(event.getAttribute("data-href"));
          if (!targetNext) {
            const YOUTUBE = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i;
            const youtube_uri = YOUTUBE.exec(modalHref);
            let dialog = "";
            dialog += '<dialog class="dialog"><div class="c_modal_content">';
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
              dialog += `<figure tabindex="1"><img src=${modalHref} decoding="async"></figure>`;
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
        //htmlのスクロール抑制のためのクラス
        html?.classList.add("-disable");

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
          let event = e.target as HTMLElement;
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
      modal.querySelector(".frameWrapper") && modal.remove();
      html?.classList.remove("-disable");
    }

    //サニタイズ
    function sanitize(str: string | null) {
      return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    //Youtube用
    function setFrame(target: any) {
      return '<div class="frameWrapper"><iframe frameborder="0" allow="autoplay; fullscreen" src="' + target + '"/></div>';
    }

    function parseQueryParams(params: string) {
      var pairs = decodeURI(params.split("#")[0]).split("&");
      var obj = new Map();
      var p;

      for (var i = 0, n = pairs.length; i < n; i++) {
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
