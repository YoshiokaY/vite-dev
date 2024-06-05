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
  /**
   * アコーディオンのターゲット要素
   * @parm {string}
   */
  target: string;

  constructor(SPEED: number = 250, MQ: number = 768, TARGET: string = ".c_pull") {
    this.speed = SPEED;
    this.mq = MQ;
    this.target = TARGET;
    const OFFSET_TIME = 5; //ディレイ
    const HEIGHT_CLOSED = "--pullHeightClosed"; // 閉じた時の高さ
    const HEIGHT = "--pullHeightOpen"; // 開いた時の高さ
    const OPEN = "-open"; // 展開時のクラス

    const accordions = document.querySelectorAll(TARGET);
    accordions.forEach((accordion) => {
      const summary = accordion.querySelector("summary") as HTMLElement;
      // const details = summary.nextElementSibling as HTMLElement;
      const details = accordion.querySelector(".c_pull_content") as HTMLElement;
      //リキャスト
      const target = accordion as HTMLDetailsElement;
      // -open クラスを持つかどうか
      const hasOpenedClass = accordion.classList.contains(OPEN);

      // summary クリックイベント
      summary?.addEventListener("click", (e) => {
        // すぐに open 属性が切り替わらないようにする
        e.preventDefault();
        // タイトル部分の高さを取得。（ブラウザ幅が変更されて高さが変わった場合などにも対応できるようにクリックイベントの中で高さを毎回取得）
        const summaryHeight = summary.offsetHeight;

        // 閉じる時の高さ = タイトル部分の高さ
        target.style.setProperty(HEIGHT_CLOSED, `${summaryHeight}px`);

        // オープン / クローズ 処理
        if (!target.open) {
          // open属性を最初にセット
          target.open = true;

          // ※ コンテンツの高さはopenを付けたあとで取得しないと iOSで０になる
          target.style.setProperty(HEIGHT, `${summaryHeight + details.offsetHeight}px`);

          // open付与から少しだけ遅らせた方が動作が安定する
          setTimeout(() => {
            accordion.classList.add(OPEN); // クラスの追加
          }, OFFSET_TIME);
        } else if (target.open) {
          // 初期状態で開いているアコーディオンもアニメーションするように、閉じるときにもセット
          target.style.setProperty(HEIGHT, `${summaryHeight + details.offsetHeight}px`);

          setTimeout(() => {
            accordion.classList.remove(OPEN); // クラスを削除
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
          accordion.classList.add(OPEN);
        } else if (!target.open && hasOpenedClass) {
          // open は削除されたのに -open クラスがまだついている時
          accordion.classList.remove(OPEN);
        }
      });

      //SP時のみアコーディオン
      function spPull() {
        const ww = window.innerWidth;
        if (target.classList.contains("-spPull")) {
          if (ww <= MQ) {
            accordion.classList.remove(OPEN);
            target.open = false;
          } else {
            accordion.classList.add(OPEN);
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
