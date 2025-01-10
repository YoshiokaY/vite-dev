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
      inset: var(--popOffset) 0 auto;
      margin: auto;
      z-index: 999;
      width: fit-content;
      height: fit-content;
    }
    .c_help_pop::before,
    .c_help_pop::after {
      content: '';
      margin: auto;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: -1;
    }

    .c_help_pop::before {
      height: 100px;
    }

    .c_help_pop::after {
      height: calc(100% - var(--popOffset));
      top: auto;
      bottom: 0;
    }

    .c_help_pop::backdrop {
      height: 0;
    }

    .c_help_container {
      position: relative;
      background-color: white;
      padding: 1rem 6.5rem 2rem;
      color: #333;
      border-radius: 0.5rem;
      box-shadow: 0 0.22rem 0.4rem rgba(0, 0, 0, 0.2);
    }

    .c_help_ttl {
      display: flex;
      align-items: center;
      gap: 0.5em;
      font-size: 2.4rem;
      font-weight: bold;
      margin: 0 auto 1em;
    }

    .c_help_icon {
      position: relative;
      height: 4rem;
      aspect-ratio: 1/1;
      display: inline-block;
    }

    .c_help_icon::after {
      content: '?';
      position: absolute;
      inset: 0;
      margin: auto;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.6rem;
      color: #999;
    }

    .progress-svg {
      position: absolute;
      inset: 0;
      margin: auto;
      fill: none;
      stroke: #999;
      width: 100%;
      height: 100%;
      stroke-dasharray: calc(24 * 3.14), calc(24 * 3.14);
      stroke-width: 0.3rem;
      transform: rotate(-90deg);
    }

    .progress-svg.-bar {
      stroke-dasharray: var(--progress), calc(24 * 3.14);
      stroke: #333;
    }

    .c_help_arrow,
    .c_help_close {
      position: absolute;
      inset: 0 0.5rem;
      margin: auto;
      height: 3rem;
      aspect-ratio: 1/1;
      background-color: #999;
      border-radius: 50%;
      border: 0;
      cursor: pointer;
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
      border: 0.2rem solid #fff;
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
      background-color: #999;
    }

    .c_help_close::before,
    .c_help_close::after {
      content: '';
      position: absolute;
      inset: 0;
      margin: auto;
      width: 0.2rem;
      height: 60%;
      background-color: #fff;
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

    // ターゲット要素の位置とサイズを取得
    // const rect = target.getBoundingClientRect();

    return html`
      <div class="c_help">
        <slot name="c_help_btn" @click=${this._popoverToggle}></slot>
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
                ステップ：${this.currentIndex + 1}/${this.targets.length}
              </p>
              <slot name="${currentTargetId}"></slot>
            </div>
            <button class="c_help_arrow -prev" @click=${this._handleClick}><span class="txtHidden">${this.prev}</span></button>
            <button class="c_help_arrow -next" @click=${this._handleClick}><span class="txtHidden">${this.next}</span></button>
            <button class="c_help_close" @click=${this._popoverToggle}><span class="txtHidden">ヘルプを閉じる</span></button>
          </div>
        </div>
      </div>
    `;
  }

  // popoverの表示/非表示
  _popoverToggle() {
    const popover = this.shadowRoot?.querySelector(".c_help_pop") as HTMLElement;
    // popover?.removeAttribute("hidden");
    popover?.togglePopover();
    // ステップ処理
    this._popSwitch();
  }

  // popoverを更新する
  _handleClick(e: Event) {
    const target = e.target as HTMLInputElement;
    const text = target.querySelector(".txtHidden")?.textContent;
    if (text === this.next && this.currentIndex < this.targets.length) {
      this.currentIndex++;
    } else if (text === this.prev && this.currentIndex > 0) {
      this.currentIndex--;
    }
    this._popSwitch();
  }

  //
  _popSwitch() {
    const targetId = this.targets[this.currentIndex];
    if (targetId) {
      const scrollTarget = document.getElementById(targetId);
      this.smoothScroll(scrollTarget);
      if (scrollTarget) {
        const offset = 100;
        const pop = this.shadowRoot?.querySelector(".c_help_pop") as HTMLElement;
        const popHeight = pop.offsetHeight;
        const targetHeight = scrollTarget.offsetHeight;
        pop?.style.setProperty("--targetOffset", `${Number(popHeight + targetHeight + offset)}px`);
        pop?.style.setProperty("--popOffset", `${Number(targetHeight + offset)}px`);
        pop?.style.setProperty("--progress", `${Number((24 * 3.14 * (this.currentIndex + 1)) / this.targets.length)}`);
      }
    }
  }

  // スムーススクロール
  smoothScroll(target: HTMLElement | null) {
    // スクロールのオプション
    // ブラウザ側が視差効果を明示的に切っている場合は従う
    const isPrefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scrollBehavior = isPrefersReduced ? "instant" : "smooth";

    setTimeout(() => {
      // ターゲットにフォーカスを移動
      target?.focus({ preventScroll: true });
      // アクティブな要素がターゲット要素でない場合
      if (document.activeElement !== target) {
        // ターゲット要素のtabindexを一時的に-1に設定
        target?.setAttribute("tabindex", "-1");
        // 再度フォーカスを設定
        target?.focus({ preventScroll: true });
      }

      if (target) {
        target.style.scrollMarginBlockStart = "100px";
      }
      // スクロールさせる
      target?.scrollIntoView({ behavior: scrollBehavior, inline: "end" });
    }, 0);
  }
}
