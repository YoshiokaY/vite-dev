//** フィルター */
import { html, css, LitElement } from "lit";
import { property, customElement } from "lit/decorators.js";
@customElement("filter-list")
export class Filter extends LitElement {
  @property({ type: Array })
  category = []; // カテゴリー
  @property()
  list: number = 0; // 一行の数
  @property()
  all?: string; // すべて選択必要な場合
  @property()
  visible?: number; // 初期表示

  /**
   * カスタムエレメントからslotを取得
   * @param children target children
   * @returns Element[] slot elements
   */
  private static findSlots(children: HTMLCollection): Element[] {
    let slots: Element[] = [];
    for (const child of children) {
      if (child.tagName === "SLOT") {
        slots.push(child);
      } else if (child.tagName.indexOf("-") < 0) {
        slots = slots.concat(this.findSlots(child.children));
      }
    }
    return slots;
  }

  /**
   * slotをライトDOMに挿入
   */
  private targetElements: Element[] = [];

  override connectedCallback() {
    super.connectedCallback();

    this.targetElements = [...this.children];
  }

  /**
   * 初期描画
   */
  override firstUpdated() {
    const slots = Filter.findSlots(this.children);
    for (const child of this.targetElements) {
      let targetSlot = null;
      if (child.hasAttribute("slot")) {
        const slotName = child.attributes.getNamedItem("slot")?.value;
        targetSlot = slots.find((slot) => slot.attributes.getNamedItem("name")?.value === slotName);
      } else {
        targetSlot = slots[0];
      }
      if (targetSlot) {
        child.remove();
        targetSlot.append(child);
      }
    }
    this.targetElements = [];
  }

  // -----------------------------------------
  // 職種ラジオボタンクリック時のイベントハンドラ
  // -----------------------------------------
  _handleClick(e: Event) {
    const SHOWN_CLASS_NAME = "-visible";
    let target = e.target as HTMLInputElement;
    let cateStr = target.checked ? target.value : ""; // チェック状態のvalue値
    const _allCardList = this.querySelectorAll(".c_filter_item"); // フィルタリングする要素
    const FIRST_SHOW_NUM = this.visible ? this.visible : _allCardList.length;
    let _cateCardList: any = _allCardList; // 最初は「すべて」カテゴリ選択状態
    let _shownCardNum: number = 0; // 表示中の件数は0
    const MORE_SHOW_NUM = 3;

    if (!_allCardList) {
      // データがない場合は何もしない
      return;
    }

    if (cateStr === this.all) {
      // 選択したカテゴリーがすべての場合の他のチェックボックスを外す
      const checkbox = this.querySelectorAll("input");
      checkbox.forEach((input, i) => {
        if (i !== 0) {
          input.checked = false;
        }
      });
    } else {
      // カテゴリーがすべてのチェックボックスを外す
      const checkAll = this.querySelector("#cat0") as HTMLInputElement;
      if (checkAll) {
        checkAll.checked = false;
      }
      // 選択したカテゴリの一覧を取得
      _cateCardList = Array.from(_allCardList).filter((card: any) => {
        const category = card.querySelector(".cat");
        if (category) {
          const cateText = category.textContent;
          return cateText === cateStr;
        } else {
          return false;
        }
      });
    }

    // 表示中のデータを非表示
    _allCardList.forEach((card) => {
      card.classList.remove(SHOWN_CLASS_NAME);
    });
    // 選択したカテゴリのデータを表示
    for (let i = 0; i < FIRST_SHOW_NUM && i < _cateCardList.length; i++) {
      _cateCardList[i].classList.add(SHOWN_CLASS_NAME);
      _shownCardNum++;
    }

    const _moreBtn: HTMLElement | null = this.querySelector(".c_filter_more"); // もっと見るボタン
    // もっと見るボタンの表示切替
    if (_moreBtn) {
      console.log(_shownCardNum < _cateCardList.length);
      if (_shownCardNum < _cateCardList.length) {
        // 表示させる
        _moreBtn.classList.add(SHOWN_CLASS_NAME);
      } else {
        // 非表示
        _moreBtn.classList.remove(SHOWN_CLASS_NAME);
      }
    }
    const catButtons = this.querySelectorAll("input");
    if (catButtons.length > 0) {
      // もっと見るボタン押下時の処理を登録
      if (_moreBtn) {
        _moreBtn.addEventListener("click", () => {
          if (_cateCardList.length < 1) {
            // データがない場合は何もしない
            return;
          }
          // データを表示
          const maxCount = _shownCardNum + MORE_SHOW_NUM; // 表示可能な最大件数
          for (let i = _shownCardNum; i < maxCount && i < _cateCardList.length; i++) {
            _cateCardList[i].classList.add(SHOWN_CLASS_NAME);
            _shownCardNum++;
          }

          // もっと見るボタンの表示切替
          if (_moreBtn) {
            if (_shownCardNum < _cateCardList.length) {
              // 表示させる
              _moreBtn.classList.add(SHOWN_CLASS_NAME);
            } else {
              // 非表示
              _moreBtn.classList.remove(SHOWN_CLASS_NAME);
            }
          }
        });
      }

      // 一番最初のカテゴリを選択状態にするためにclickイベントを発火
      (<HTMLElement>catButtons[0]).click();
    }
  }

  override render() {
    return html`
    <div class="c_filter">
      <ul class="grid grid-cols-3">
        ${
          this.all
            ? html`
          <li>
          <input type="checkbox" @click=${this._handleClick} name="filter" value=${this.all} id="cat0" />
          <label for="cat0">${this.all}</label>
        </li>
        `
            : html``
        }

      ${this.category.map(
        (cat: string, i: number) => html`
        <li>
          <input type="checkbox" @click=${this._handleClick} name="filter" value=${cat} id="cat${i + 1}" />
          <label for="cat${i + 1}">${cat}</label>
        </li>
        `
      )}
      </ul>
      <slot name="content"></slot>
      <slot name="more"></slot>
    </div>
    `;
  }
  protected createRenderRoot() {
    return this;
  }
}
