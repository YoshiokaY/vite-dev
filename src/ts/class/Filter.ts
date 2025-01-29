//** フィルター */
import { html, LitElement } from "lit";
import { property, customElement } from "lit/decorators.js";
import { getTime, sanitize, srcCheck } from "../utils/util.ts";
import _, { cloneDeep } from "lodash";
interface jsonObject {
  cat: string[];
  ttl: string;
  img: { src: string; size: number[] };
  txt: string;
}
@customElement("filter-list")
export class Filter extends LitElement {
  @property({ type: Array })
  category = []; // フィルターカテゴリー
  @property()
  all?: string; // 全件表示ボタンが必要な場合
  @property()
  visible?: number; // moreボタンが必要な場合の一度に表示する件数
  @property()
  show: number = 0;
  @property()
  type: "checkbox" | "radio" = "checkbox"; // ラジオボタン or チェクボックス
  @property()
  search: "AND" | "OR" = "AND"; // AND検索 or OR検索
  @property()
  src: string = ""; // jsonファイル
  @property({ type: Array })
  data = []; // 初期値を空の配列に
  @property({ type: Array })
  array: jsonObject[] = []; // 操作用の配列

  private SHOW_CLASS_NAME = "-visible"; // 表示用クラス
  private ALL_CARD_LIST = this.querySelectorAll(".c_filter_item");
  private _targetElements: Element[] = []; // slotをLigth DOMに格納
  // フィルタリング用変数
  private _filterCats: string[] = []; // 選択カテゴリーを保存する配列
  private _matchedLists: Element[] = []; // 一致した要素の配列
  private _maxCount: number = 0; // 最大表示件数
  private _showCountNum: number = 0; // 現在の表示件数

  async fetchData() {
    try {
      const response = await fetch(srcCheck(sanitize(this.src)) + ".json");
      const data = await response.json();
      this.data = data;
      this.array = _.cloneDeep(this.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // DOM描画
  override connectedCallback() {
    super.connectedCallback();
    this.fetchData();
    this._targetElements = [...this.children];
  }

  // 初期描画
  override firstUpdated() {
    // slotがある場合Light DOMに挿入する
    const slots = Filter.findSlots(this.children);
    for (const child of this._targetElements) {
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
    this._targetElements = [];
    // 初期は全件表示状態にする
    setTimeout(() => {
      this._setCatAll();
    }, 400);
  }

  // DOM構造
  override render() {
    if (!this.data.length) {
      return html`<div aria-busy="true">Coming soon...</div>`;
    }
    return html`
    <div class="c_filter">
      <ul class="c_filter_list grid grid-cols-5 mb-[1.6rem] gap-[0.8rem]">
        <li class=${!this.all ? "txtHidden" : ""}>
          <input type=${this.type} @click=${this._handleClick} name="filter" value="allCat" id="cat0" />
          <label for="cat0">${this.all}</label>
        </li>
        ${
          // categoryの分だけボタンを描画
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
      ${
        this.src && this.array
          ? html`
          <div class="grid grid-cols-3 gap-[3.2rem]">
          ${this.array.map((item: jsonObject, i) => {
            return html`
             ${
               this.visible && i < this.show
                 ? html`
              <div class="border-prime c_filter_item border-[0.1rem] -visible">
                <img src="/img/top/${item.img.src}" width="${item.img.size[0]}" height="${item.img.size[1]}" decoding="async" loading="lazy">
                <div class="p-[2.4rem]">
                  <div class="flex gap-[1.6rem] mb-[1.2rem]">
                    ${item.cat.map((cat) => {
                      return html`
                        <span class="c_filter_cat bg-prime text-reversal text-sm p-[0.1em_0.5em]">${cat}</span>
                      `;
                    })}
                  </div>
                  <h3 class="text-prime font-bold mb-[0.8rem]">
                    <span class="block.text-sm"> No.${i + 1}</span>
                    <span class="text-lg">${item.ttl}さん</span>
                  </h3>
                  <p>${item.txt}</p>
                </div>
              </div>
              `
                 : ``
             }
            `;
          })}
          </div>
          `
          : html`<slot name="content"></slot>`
      }
      ${
        // visibleオプションが設定されている場合にmoreボタン描画
        this.visible
          ? html`
          <button class="c_filter_more" @click=${this._handleMoreButtonClick}>もっと見る</button>
        `
          : html``
      }
    </div>
    `;
  }

  // -----------------------------------------
  // カテゴリー選択時のイベントハンドラ
  // -----------------------------------------
  _handleClick(e: Event) {
    const target = e.target as HTMLInputElement;
    const keyword = target.value; // 選択カテゴリーのvalue値
    const cateStr = target.checked ? target.value : ""; // チェック状態のvalue値

    if (!this.ALL_CARD_LIST) {
      // データがない場合は何もしない
      return;
    }
    if (cateStr === "allCat") {
      this._setCatAll();
    } else {
      // 全件表示のチェックボックスを外す
      const checkAll = this.querySelector("#cat0") as HTMLInputElement;
      if (checkAll) {
        checkAll.checked = false;
      }
      // 選択中のvalueを配列に格納
      if (target.checked) {
        // ラジオボタンの時は吐いた処理にするため一度配列を空にする
        if (this.type === "radio") {
          this._filterCats = [];
        }
        this._filterCats.push(keyword);
      } else {
        // 選択していない値を配列から除去
        this._filterCats = this._filterCats.filter((k) => k !== keyword);
      }
      // フィルタリングを実行
      this._filterElements();
    }
    // チェックが一件もない場合、全件表示にする
    if (this._filterCats.length === 0) {
      this._setCatAll();
    }
  }
  // フィルタリング
  _filterElements(all?: boolean) {
    const firstShowNum = this.visible ? this.visible : this.ALL_CARD_LIST.length; // 初期表示件数
    this._matchedLists = []; // 配列リセット
    this._showCountNum = this.visible ? this.visible : 0; // 現在表示件数リセット
    this._maxCount = 0; // 最大表示件数リセット
    this.show = this._showCountNum;
    // 検索条件に応じて配列変更
    if (this.search === "OR") {
      this.array = this.data.filter((item: jsonObject) => this._filterCats.some((tag) => item.cat.includes(tag))); // 選択カテゴリーのいずれかを含む配列
    } else {
      this.array = this.data.filter((item: jsonObject) => this._filterCats.every((tag) => item.cat.includes(tag))); // 選択カテゴリーに一致する配列
    }
    // 選択したカテゴリーのデータを表示
    // 現在表示件数を更新
    for (let i = 0; i < firstShowNum && i < this.array.length; i++) {
      this._showCountNum++;
    }
    this.ALL_CARD_LIST = this.querySelectorAll(".c_filter_item");
    this._matchedLists = this.array;

    // moreボタンの表示/非表示
    if (this.visible) {
      this._showMoreBtn(this._showCountNum, this._matchedLists.length);
    }
  }
  // _filterElements(all?: boolean) {
  //   const firstShowNum = this.visible ? this.visible : this.ALL_CARD_LIST.length; // 初期表示件数
  //   this.ALL_CARD_LIST = this.querySelectorAll(".c_filter_item");
  //   this._matchedLists = []; // 配列リセット
  //   this._showCountNum = 0; // 現在表示件数リセット
  //   this._maxCount = 0; // 最大表示件数リセット
  //   this.ALL_CARD_LIST.forEach((card) => {
  //     // 表示中のデータを一旦非表示
  //     card.classList.remove(this.SHOW_CLASS_NAME);
  //     if (all) {
  //       this._matchedLists.push(card);
  //     } else {
  //       const cardTexts: string[] = [];
  //       card.querySelectorAll(".c_filter_cat").forEach((cat) => {
  //         if (cat.textContent) {
  //           // 要素のカテゴリーを小文字で格納
  //           cardTexts.push(cat.textContent.toLowerCase());
  //         }
  //       });
  //       // 現在選択中のカテゴリーと一致した場合trueを返す
  //       // OR検索の場合は部分一致、AND検索の場合は完全一致
  //       const isMatch = this.search === "OR" ? this._filterCats.some((keyword) => cardTexts.includes(keyword.toLowerCase())) : this._filterCats.every((keyword) => cardTexts.includes(keyword.toLowerCase()));
  //       // 一致するデータを配列に格納
  //       if (isMatch) {
  //         this._matchedLists.push(card);
  //       }
  //     }
  //   });
  //   // 選択したカテゴリーのデータを表示
  //   // 現在表示件数を更新
  //   for (let i = 0; i < firstShowNum && i < this._matchedLists.length; i++) {
  //     this._matchedLists[i].classList.add(this.SHOW_CLASS_NAME);
  //     this._showCountNum++;
  //   }

  //   // console.log(this.querySelector(".c_filter_more"));

  //   // moreボタンの表示/非表示
  //   if (this.visible) {
  //     this._showMoreBtn(this._showCountNum, this._matchedLists.length);
  //   }
  // }

  // -----------------------------------------
  // moreクリック時のイベントハンドラ
  // -----------------------------------------

  _handleMoreButtonClick = () => {
    if (this.array.length < 1) {
      // データがない場合は何もしない
      return;
    }

    // 表示可能な最大件数
    if (this.visible) {
      this._maxCount = this._showCountNum + +this.visible;
    }
    // 表示可能な最大件数
    for (let i = this._showCountNum; i < this._maxCount && i < this.array.length; i++) {
      this.show++;
    }
    // moreボタンの表示/非表示
    this._showMoreBtn(this.show, this._matchedLists.length);
  };

  // _handleMoreButtonClick = () => {
  //   if (this._matchedLists.length < 1) {
  //     // データがない場合は何もしない
  //     return;
  //   }
  //   // 表示可能な最大件数
  //   if (this.visible) {
  //     this._maxCount = this._showCountNum + +this.visible;
  //   }
  //   // 表示可能な最大件数
  //   for (let i = this._showCountNum; i < this._maxCount && i < this._matchedLists.length; i++) {
  //     this._matchedLists[i].classList.add(this.SHOW_CLASS_NAME);
  //     this._showCountNum++;
  //   }
  //   // moreボタンの表示/非表示
  //   this._showMoreBtn(this._showCountNum, this._matchedLists.length);
  // };

  // -----------------------------------------
  // moreボタンの表示関数
  // -----------------------------------------
  // 現在表示件数が一致件数よりも少ない場合はmoreボタンを表示
  _showMoreBtn(showCountNum: number, matcheListNum: number) {
    const MORE_BTN = this.querySelector(".c_filter_more");
    if (showCountNum < matcheListNum) {
      // 表示させる
      MORE_BTN?.classList.add(this.SHOW_CLASS_NAME);
    } else {
      // 非表示
      MORE_BTN?.classList.remove(this.SHOW_CLASS_NAME);
    }
  }

  // -----------------------------------------
  // 全件表示の関数
  // -----------------------------------------
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
      this._filterCats = [];
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
