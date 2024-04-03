//** アコーディオン */
export class Accordion {
  /**
   * アコーディオンの開閉スピード
   * @parm {number}
   */
  speed: number;

  /**
   * SPのブレイクポイント
   * @parm {number}
   */
  mq: number;

  constructor(SPEED: number = 250, MQ: number = 768) {
    this.speed = SPEED; //アニメーションスピード
    this.mq = MQ; //ブレイクポイント
    const OFFSET_TIME = 5; //ディレイ
    const HEIGHT_CLOSED = "--pullHeightClosed"; //閉じた時の高さ
    const HEIGHT = "--pullHeightOpen"; //開いた時の高さ

    const accordions = document.querySelectorAll(".c_pull");
    accordions.forEach((accordion) => {
      const ttl = accordion.querySelector(".c_pull_ttl") as HTMLElement;
      const content = accordion.querySelector(".c_pull_content") as HTMLElement;
      //リキャスト
      const target = accordion as HTMLDetailsElement;
      // -open クラスを持つかどうか
      const hasOpenedClass = accordion.classList.contains("-open");

      // summary クリックイベント
      ttl?.addEventListener("click", (e) => {
        // すぐに open 属性が切り替わらないようにする
        e.preventDefault();
        // タイトル部分の高さを取得。（ブラウザ幅が変更されて高さが変わった場合などにも対応できるようにクリックイベントの中で高さを毎回取得）
        const ttlHeight = ttl.offsetHeight;

        // 閉じる時の高さ = タイトル部分の高さ
        target.style.setProperty(HEIGHT_CLOSED, `${ttlHeight}px`);

        // オープン / クローズ 処理
        if (!target.open) {
          // open属性を最初にセット
          target.open = true;

          // ※ コンテンツの高さはopenを付けたあとで取得しないと iOSで０になる
          target.style.setProperty(HEIGHT, `${ttlHeight + content.offsetHeight}px`);

          // open付与から少しだけ遅らせた方が動作が安定する
          setTimeout(() => {
            accordion.classList.add("-open"); // クラスの追加
          }, OFFSET_TIME);
        } else if (target.open) {
          // 初期状態で開いているアコーディオンもアニメーションするように、閉じるときにもセット
          target.style.setProperty(HEIGHT, `${ttlHeight + content.offsetHeight}px`);

          setTimeout(() => {
            accordion.classList.remove("-open"); // クラスを削除
          }, OFFSET_TIME);

          // アニメーション完了後にopen属性を削除。（CSS側のアニメーション時間+少しだけ余裕をもたせている）
          setTimeout(() => {
            target.open = false;
          }, SPEED + OFFSET_TIME);
        }
      });

      // details 'toggle' イベント
      accordion.addEventListener("toggle", () => {
        if (target.open && !hasOpenedClass) {
          // open はセットされたのに -open クラスがついてない時
          accordion.classList.add("-open");
        } else if (!target.open && hasOpenedClass) {
          // open は削除されたのに -open クラスがまだついている時
          accordion.classList.remove("-open");
        }
      });

      //SP時のみアコーディオン
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
      //リサイズにも発火
      window.addEventListener("resize", spPull);
    });
  }
}
