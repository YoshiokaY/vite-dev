// スクロールアニメーション
export class ScrollAnimation {
  /**
   * アニメーションを付与する要素
   * @parm {string}
   */
  target: string;
  /**
   * アニメーションを付与するためのクラス名
   * @parm {string}
   */
  active: string;

  constructor(TARGET: string = ".scrollIn,.scroll", ACTIVE: string = "-active") {
    this.target = TARGET; // ターゲット要素
    this.active = ACTIVE; // アクティブ時に付与するクラス
    const elements = document.querySelectorAll(TARGET);
    const elementArr = Array.prototype.slice.call(elements);

    //IOSのオプション
    const options: IntersectionObserverInit = {
      root: null, // ビューポートをルート要素とする
      rootMargin: "0px 0px", // ビューポートの中心を判定基準にする
      threshold: 0, // 閾値は0
    };
    const observer = new IntersectionObserver(callback, options);
    elementArr.forEach((box: HTMLDivElement) => {
      observer.observe(box);
    });

    //監視対象に".is-active"がなければ付与する
    function callback(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry: IntersectionObserverEntry, i: number) => {
        const target = entry.target;
        if (entry.isIntersecting && !target.classList.contains(ACTIVE)) {
          const delay = i * 100;
          setTimeout(() => {
            target.classList.add(ACTIVE);
          }, delay);
        }
      });
    }
    //一文字ずつアニメーションさせるため、該当クラスのテキストを取得して一文字ずつfont（他と干渉しなさそうなタグ）タグでくくる
    //引数：クラス名を記述
    //初期値：".typTxt"
    const typTxt = (className: string = ".typTxt") => {
      const typTxts = document.querySelectorAll(className) || [];
      typTxts.forEach((typTxt) => {
        const text = typTxt.innerHTML;
        const textWithoutBr = text.replace(/<br>/g, "Γ");
        // console.log(text);
        let textbox = "";
        textWithoutBr?.split("").forEach((t: string, i: number) => {
          if (t !== " ") {
            if (t == "Γ") {
              textbox += "<font class='br'>" + t + "</font>";
            } else {
              textbox += "<font><font>" + t + "</font></font>";
            }
          } else {
            textbox += t;
          }
        });
        textbox = textbox.replace("Γ", "<br>");
        typTxt.innerHTML = textbox;
      });
    };
  }
}
