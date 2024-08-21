//** フィルター */
import { html, LitElement } from "lit";
import { property, customElement } from "lit/decorators.js";
@customElement("filter-list")
export class Filter extends LitElement {
  @property({ type: Array })
  category = []; // カテゴリー
  @property()
  all?: string; // すべて選択必要な場合
  @property()
  visible?: number; // 表示件数
  @property()
  type: "checkbox" | "radio" = "checkbox"; // ラジオボタン or チェクボックス
  @property()
  search: "AND" | "OR" = "AND"; // AND検索 or OR検索
  private _filterCat: string[] = []; // 選択されたキーワードを保存する配列
  private SHOW_CLASS_NAME = "-visible"; // 表示用クラス
  private ALL_CARD_LIST = this.querySelectorAll(".c_filter_item");
  private MORE_BTN = this.querySelector(".c_filter_more"); // もっと見るボタン
  private targetElements: Element[] = []; // slotをLigth DOMに格納
  private _maxCount: number = 0;
  // private _moreShowNum: number = this.visible ? this.visible : 0;

  // DOM描画
  override connectedCallback() {
    super.connectedCallback();
    this.targetElements = [...this.children];
  }

  // 初期描画
  override firstUpdated() {
    // slotがある場合Light DOMに挿入する
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
    // すべて表示の選択肢がある場合、初期選択状態にする
    this._setCatAll();
  }

  // DOM構造
  override render() {
    return html`
    <div class="c_filter">
      <ul class="c_filter_list grid grid-cols-5 mb-[1.6rem] gap-[0.8rem]">
        ${
          // 全件表示が必要な場合描画
          this.all
            ? html`
          <li>
            <input type=${this.type} @click=${this._handleClick} name="filter" value=${this.all} id="cat0" />
            <label for="cat0">${this.all}</label>
          </li>
        `
            : html``
        }

        ${
          // categoryの分だけフィルタリングボタンを描画
          this.category.map(
            (cat: string, i: number) => html`
            <li>
              <input type=${this.type} @click=${this._handleClick} name="filter" value=${cat} id="cat${i + 1}" />
              <label for="cat${i + 1}">${cat}</label>
            </li>
          `
          )
        }
      </ul>
      <slot name="content"></slot>
      <slot name="more"></slot>
    </div>
    `;
  }

  // -----------------------------------------
  // ボタンクリック時のイベントハンドラ
  // -----------------------------------------
  _handleClick(e: Event) {
    let target = e.target as HTMLInputElement;
    let keyword = target.value; // 選択カテゴリーのvalu値
    let cateStr = target.checked ? target.value : ""; // チェック状態のvalue値

    if (!this.ALL_CARD_LIST) {
      // データがない場合は何もしない
      return;
    }
    if (cateStr === this.all) {
      this._setCatAll();
    } else {
      // 全件表示のチェックボックスを外す
      const checkAll = this.querySelector("#cat0") as HTMLInputElement;
      if (checkAll) {
        checkAll.checked = false;
      }
      // 選択中のvalueを配列に格納
      if (target.checked) {
        // ラジオボタンの時は一度配列を空にする
        if (this.type === "radio") {
          this._filterCat = [];
        }
        this._filterCat.push(keyword);
      } else {
        // 選択していない値を配列から除去
        this._filterCat = this._filterCat.filter((k) => k !== keyword);
      }
      // フィルタリングを実行
      this._filterElements();
    }
    // チェックが一件もない場合、全件表示にする
    if (this._filterCat.length === 0) {
      this._setCatAll();
    }
  }
  // フィルタリング
  _filterElements(all?: boolean) {
    let firstShowNum = this.visible ? this.visible : this.ALL_CARD_LIST.length; // 初期表示件数
    let showCountNum: number = 0; // 現在表示している件数※初期は0件
    let matchedCards: Element[] = []; // 一致した要素の配列
    this._maxCount = 0;
    this.ALL_CARD_LIST.forEach((card) => {
      // 表示中のデータを一旦非表示
      card.classList.remove(this.SHOW_CLASS_NAME);
      if (all) {
        matchedCards.push(card);
      } else {
        const cardText = card.textContent?.toLowerCase(); // 要素のカテゴリーを小文字で格納

        // 現在選択中のカテゴリーと一致した場合trueを返す
        const isMatch = this.search === "OR" ? this._filterCat.some((keyword) => cardText?.includes(keyword.toLowerCase())) : this._filterCat.every((keyword) => cardText?.includes(keyword.toLowerCase()));
        // 一致するデータを配列に格納
        if (isMatch) {
          matchedCards.push(card);
        }
      }
    });
    // 選択したカテゴリーのデータを表示
    for (let i = 0; i < firstShowNum && i < matchedCards.length; i++) {
      matchedCards[i].classList.add(this.SHOW_CLASS_NAME);
      showCountNum++;
    }

    // moreボタン
    if (this.MORE_BTN && this.visible) {
      this._setMoreBtn(showCountNum, matchedCards);
    }
  }

  //
  _setMoreBtn(showCountNum: number, matchedCards: any) {
    let _moreShowNum: number = this.visible ? this.visible : 0;
    // moreボタンの表示/非表示
    this._showMoreBtn(showCountNum, matchedCards.length);
    this.MORE_BTN?.addEventListener("click", () => {
      if (matchedCards.length < 1) {
        // データがない場合は何もしない
        return;
      }
      this._maxCount = showCountNum + +_moreShowNum; // 表示可能な最大件数
      for (let i = showCountNum; i < this._maxCount && i < matchedCards.length; i++) {
        matchedCards[i].classList.add(this.SHOW_CLASS_NAME);
        showCountNum++;
      }
      // moreボタンの表示/非表示
      this._showMoreBtn(showCountNum, matchedCards.length);
    });
  }

  // moreボタンの表示/非表示
  _showMoreBtn(showCountNum: number, matcheCardNum: number) {
    if (showCountNum < matcheCardNum) {
      // 表示させる
      this.MORE_BTN?.classList.add(this.SHOW_CLASS_NAME);
    } else {
      // 非表示
      this.MORE_BTN?.classList.remove(this.SHOW_CLASS_NAME);
    }
  }

  // 全件表示
  _setCatAll() {
    const checkAll = this.querySelector("#cat0") as HTMLInputElement;
    if (checkAll) {
      // 選択したカテゴリーがすべての場合の他のチェックボックスを外す
      const checkbox = this.querySelectorAll("input");
      checkbox.forEach((input, i) => {
        if (i !== 0) {
          input.checked = false;
        }
      });
      this._filterCat = [];
      // チェックをいれる
      checkAll.checked = true;
      this._filterElements(true);
    }
  }

  /**
   * カスタムエレメントからslotを取得してLight DOMでも表示できるようにする
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

  // DOM描画
  protected createRenderRoot() {
    return this;
  }
}
