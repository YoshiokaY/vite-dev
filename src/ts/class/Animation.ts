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

    //監視対象にACTIVEがなければ付与する
    function callback(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry: IntersectionObserverEntry) => {
        const target = entry.target;
        if (entry.isIntersecting && !target.classList.contains(ACTIVE)) {
          setTimeout(() => {
            target.classList.add(ACTIVE);
          }, 5);
        }
      });
    }
  }
}
