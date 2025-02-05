import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("guide-tour")
export class GuideTour extends LitElement {
  static styles = css`
    /* オーバーレイのスタイル */

    .c_help_pop {
      border: 0;
      background: none;
      position: fixed;
      inset: var(--popY) 0 auto;
      margin: auto;
      z-index: 999;
      width: fit-content;
      height: fit-content;
      padding-block: 1.5rem;

    }
    .c_help_pop::before,
    .c_help_pop::after {
      content: '';
      margin: auto;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: calc(var(--targetY) - var(--targetHeight));
      background-color: var(--color-txt);
      z-index: -1;
      opacity: 0.5;
    }

    .c_help_pop::after {
      top: auto;
      bottom: 0;
      height: calc(100% - var(--targetY));
    }

    .c_help_pop::backdrop {
      height: 0;
      pointer-events: none;
    }

    .c_help_container {
      max-width: calc(100% - 3rem);
      position: relative;
      background-color: var(--help-body);
      padding: 1rem 6.5rem 2rem;
      color: var(--color-txt);
      border-radius: 0.5rem;
      box-shadow: 0 0.22rem 0.4rem rgba(0, 0, 0, 0.2);
      opacity: 0;
      transition: opacity 0.1s;
    }
    .c_help_container::before {
      content: '';
      position: absolute;
      inset: -1rem 0 auto;
      margin: auto;
      width: 2rem;
      height: 1.5rem;
      background-color: var(--help-body);
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }
    .c_help_pop.-reversal .c_help_container::before {
      top: auto;
      bottom: -1rem;
      rotate: 180deg;
    }
    .c_help_pop.-visible .c_help_container {
      opacity: 1;
    }

    .c_help_ttl {
      display: flex;
      align-items: center;
      gap: 0.5em;
      font-size: 2.4rem;
      font-weight: bold;
      margin: 0 auto 1.6rem;
    }

    .c_help_icon {
      position: relative;
      height: 3.5rem;
      aspect-ratio: 1/1;
      display: inline-block;
    }

    .c_help_icon::after {
      content: '';
      position: absolute;
      inset: 0;
      margin: auto;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.6rem;
      font-weight: bold;
      color: var(--help-body);
    }

    .progress-svg {
      position: absolute;
      inset: 0;
      margin: auto;
      fill: none;
      stroke: var(--help-stroke);
      width: 100%;
      height: 100%;
      stroke-dasharray: calc(24 * 3.14), calc(24 * 3.14);
      stroke-width: 0.5rem;
      transform: rotate(-90deg);
    }

    .progress-svg.-bar {
      stroke-dasharray: var(--progress), calc(24 * 3.14);
      stroke: var(--help-fill);
    }

    .c_help_arrow,
    .c_help_close {
      position: absolute;
      inset: 0 0.5rem;
      margin: auto;
      width: 3rem;
      height: 3rem;
      aspect-ratio: 1/1;
      background-color: var(--help-btn);
      border-radius: 50%;
      border: 0.1rem solid var(--help-border);
      cursor: pointer;
      box-shadow: 0 0.2rem 0 0 #212121;
      transition:
        translate 0.2s,
        box-shadow 0.2s;
    }

    .c_help_arrow.-disable {
      opacity: 0.35;
      pointer-events: none;
    }

    @media (hover: hover) {
      .c_help_arrow:hover,
      .c_help_close:hover {
        box-shadow: none;
        translate: 0 0.2rem;
      }
    }

    .c_help_arrow.-prev {
      right: auto;
    }

    .c_help_arrow.-next {
      left: auto;
    }

    .c_help_arrow::after {
      content: '';
      position: absolute;
      inset: 0 0.4rem 0 0;
      margin: auto;
      height: 0.8rem;
      aspect-ratio: 1/1;
      display: flex;
      border: 0.2rem solid var(--help-arrow);
      border-width: 0.2rem 0.2rem 0 0;
      rotate: 45deg;
    }

    .c_help_arrow.-prev::after {
      rotate: 225deg;
      inset: 0 0 0 0.4rem;
    }

    .c_help_close {
      inset: 0.5rem 0.5rem auto auto;
      height: 2rem;
      width: 2rem;
    }

    .c_help_close::before,
    .c_help_close::after {
      content: '';
      position: absolute;
      inset: 0;
      margin: auto;
      width: 0.2rem;
      height: 60%;
      background-color: var(--help-arrow);
    }

    .c_help_close::before {
      rotate: 45deg;
    }
    .c_help_close::after {
      rotate: -45deg;
    }

    .txtHidden {
      position: absolute;
      width: 0.1rem;
      height: 0.1rem;
      overflow: hidden;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      white-space: nowrap;
    }

    .c_help_caution {
      color: var(--help-caution);
      font-weight: 500;
    }

    .stepNum-current {
      font-size: 120%;
      position: relative;
      padding-right: 0.3em;
      color: var(--help-fill);
    }
    .stepNum-current::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 0.3rem;
      height: 70%;
      background-color: var(--help-stroke);
      rotate: 25deg;
    }
    .stepNum-all {
      font-size: 70%;
      vertical-align: bottom;
      font-weight: 600;
      margin-left: 0.3em;
      color: var(--help-stroke);
    }
    @media screen and (width >= 768px) {
      .c_help_pop {
        right: auto;
        left:  var(--popX);
        padding-right: 2rem;
      }
      .c_help_container::before {
        right: auto;
        left: 1rem;
      }
    }

  `;

  @property({ type: Array })
  targets: (string | null)[] = []; // ターゲット要素のID配列

  @state()
  currentIndex = 0; // 現在の表示位置

  @property()
  prev: string = "前のステップ";
  next: string = "次のステップ";

  connectedCallback() {
    super.connectedCallback();
    // 初期化時にslotのname属性を取得
    const slots = this.querySelectorAll(".c_help_txt");
    this.targets = [...slots].map((slot) => slot.getAttribute("slot"));
  }

  render() {
    // ターゲット要素を取得
    const currentTargetId = this.targets[this.currentIndex];
    const target = document.querySelector(`#${currentTargetId}`);
    if (!target) return html``;

    return html`
      <div class="c_help">
        <slot name="helpOpen" @click=${this._popoverOpen}></slot>
        <div class="c_help_pop" id="modal1" popover="manual">
          <div class="c_help_container">
            <div class="c_help_txt">
              <p class="c_help_ttl">
                <span class="c_help_icon">
                  <svg class="progress-svg -bg" viewBox="0 0 30 30">
                    <circle cx="15" cy="15" r="12"></circle>
                  </svg>
                  <svg class="progress-svg -bar" viewBox="0 0 30 30">
                    <circle cx="15" cy="15" r="12"></circle>
                  </svg>
                </span>
                <span class="stepNum">ステップ：<span class="stepNum-current">${this.currentIndex + 1}</span><span class="stepNum-all">${this.targets.length}</span></span>
              </p>
              <slot name="${currentTargetId}"></slot>
              ${
                this.currentIndex + 1 === this.targets.length
                  ? html`
                <span class="c_help_caution">※最後のステップです</span>`
                  : null
              }
            </div>
            <button class="c_help_arrow -prev${this.currentIndex === 0 ? " -disable" : null}" tabindex="${this.currentIndex === 0 ? -1 : 0}" @click=${this._handleClick}><span class="txtHidden">${this.prev}</span></button>
            <button class="c_help_arrow -next" @click=${this._handleClick}><span class="txtHidden">${this.next}</span></button>
            <button class="c_help_close" @click=${this._popoverClose}><span class="txtHidden">ヘルプを閉じる</span></button>
          </div>
        </div>
      </div>
    `;
  }

  // popoverの表示
  _popoverOpen() {
    const popover = this.shadowRoot?.querySelector(".c_help_pop") as HTMLElement;
    // popover?.removeAttribute("hidden");
    popover?.showPopover();
    // ステップ処理
    this._popSwitch();
  }
  // popoverの非表示
  _popoverClose() {
    const popover = this.shadowRoot?.querySelector(".c_help_pop") as HTMLElement;
    popover?.hidePopover();
    const pop = this.shadowRoot?.querySelector(".c_help_pop") as HTMLElement;
    pop.classList.remove("-visible");
    pop.style.setProperty("--targetHeight", "0");
    pop.style.setProperty("--popY", "0");
  }

  // テキストを更新する
  _handleClick(e: Event) {
    const target = e.target as HTMLInputElement;
    const text = target.querySelector(".txtHidden")?.textContent;
    const pop = this.shadowRoot?.querySelector(".c_help_pop") as HTMLElement;
    if (pop.classList.contains("-visible")) {
      pop.classList.remove("-visible");
    }
    // フェード処理を待つ
    setTimeout(() => {
      if (text === this.next && this.currentIndex + 1 === this.targets.length) {
        this._popoverClose();
      } else if (text === this.next && this.currentIndex < this.targets.length) {
        this.currentIndex++;
      } else if (text === this.prev && this.currentIndex > 0) {
        this.currentIndex--;
      }
      this._popSwitch();
    }, 100);
  }

  // 交差オブザーバーでスクロール後に要素が画面内に入るのを待機
  _popSwitch() {
    const targetId = this.targets[this.currentIndex];
    if (targetId) {
      const scrollTarget = document.getElementById(targetId);
      if (scrollTarget) {
        this.smoothScroll(scrollTarget);
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // 要素が完全に視界に入ったら監視停止
              observer.disconnect();
              // スクロール完了時の処理
              setTimeout(() => {
                this._setPopup(scrollTarget);
              }, 500);
            }
          });
        });
        observer.observe(scrollTarget);
      }
    }
  }

  // ポップを表示する
  _setPopup(scrollTarget: HTMLElement) {
    const pop = this.shadowRoot?.querySelector(".c_help_pop") as HTMLElement;
    const targetHeight = scrollTarget.offsetHeight;
    const targetY = scrollTarget.getBoundingClientRect().top;
    const targetX = scrollTarget.getBoundingClientRect().left;
    const windowHeight = window.innerHeight;
    const popHeight = pop.offsetHeight;
    const flag = windowHeight / 2 < targetY ? true : false;
    const popY = flag === false ? Number(targetHeight + targetY) : Number(targetY - popHeight);
    if (pop) {
      pop.style.setProperty("--targetHeight", `${targetHeight}px`); // ターゲットの高さ
      pop.style.setProperty("--targetY", `${Number(targetHeight + targetY)}px`); // ポップのY座標
      pop.style.setProperty("--popY", `${Number(popY)}px`); // ポップのY座標
      pop.style.setProperty("--popX", `${targetX}px`); // ポップのX座標
      pop.style.setProperty("--progress", `${Number((24 * 3.14 * (this.currentIndex + 1)) / this.targets.length)}`); // インジケーターの角度
      pop.classList.add("-visible");
      if (flag) {
        pop.classList.add("-reversal");
      } else {
        pop.classList.remove("-reversal");
      }
    }
  }

  // スムーススクロール
  smoothScroll(target: HTMLElement) {
    if (target) {
      // ブラウザ側が視差効果を明示的に切っている場合は従う
      const isPrefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const scrollBehavior = isPrefersReduced ? "instant" : "smooth";
      const header = document.querySelector("header");

      if (header) {
        const computedStyle = window.getComputedStyle(header);
        const position = computedStyle.position;
        // 固定ヘッダーの場合、その高さを考慮する
        const headerHeight = position === "fixed" ? header.clientHeight : 0;
        target.scrollIntoView({ behavior: scrollBehavior, inline: "end", block: "center" });
        target.style.scrollMarginBlockStart = String(headerHeight + "px");
      }
    }
  }
}
