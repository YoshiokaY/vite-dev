import { html, LitElement } from "lit";
import { property, customElement } from "lit/decorators.js";
import { getTime, sanitize, srcCheck } from "../utils/util.ts";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

// jsonの構造
interface jsonObject {
  date: string;
  ttl: string;
  tag: string[];
  img: { src: string; size: number[] };
  link?: string;
  content: string;
}

@customElement("news-archive")
export class NewsArchive extends LitElement {
  @property()
  src: string = ""; // jsonファイル
  @property()
  href: string = ""; // 詳細ページへのリンク
  @property({ type: Array })
  data = []; // 初期値を空の配列に
  @property()
  visible: number = 3; // 表示件数
  @property()
  headline: number = 3; // ヘッドラインの表示件数
  @property()
  show: number = 0; // 現在の表示開始件数
  @property()
  page: number = 1; // 現在のページ
  @property()
  single: boolean = false; // 詳細ページの判定
  @property()
  post: number = 0; // 投稿のID

  private ACTIVE_CLASS_NAME = "-current"; // 表示用クラス
  private _maxCount: number = 0; // 最大表示件数
  private _archiveUrl = "";

  override connectedCallback() {
    super.connectedCallback();
    this.fetchData();
    // ブラウザバックした場合
    window.addEventListener("popstate", this._handlePopstate.bind(this));
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.fetchData();
    window.removeEventListener("popstate", this._handlePopstate.bind(this));
  }

  async fetchData() {
    try {
      const response = await fetch(srcCheck(sanitize(this.src)) + ".json");
      const data = await response.json();
      this.data = data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // 初期描画
  override firstUpdated() {
    this._maxCount = this.visible;
    this._archiveUrl = sanitize(this.href);
    // URLで直接詳細ページを表示する場合
    if (this.getQuery()) {
      this.post = this.getQuery();
      this.single = true;
    }
  }

  override render() {
    if (!this.data.length) {
      return html`<div aria-busy="true" class="fadeIn"></div>`;
    }
    const pageCount = Math.ceil(this.data.length / this.visible); // 最大ページ数計算

    return html`
    ${
      this.href !== ""
        ? html`
      <dl class="flex flex-col justify-between archiveList md:gap-y-[6.5rem] gap-y-[4.9rem]">
        ${this.data.map((item: jsonObject, i) => {
          if (i < this.headline) {
            return html`
              <div class="grid md:grid-cols-[13.1rem,auto] md:gap-[3rem] gap-[1.2rem]">
                <dt>
                  ${
                    // 日付
                    item.date
                      ? html`
                      <time datetime=${getTime(item.date)}>${item.date}</time>
                      `
                      : null
                  }
                </dt>
                <dd>
                  <a href="${item.link ? item.link : this.href.includes("http") ? null : this._archiveUrl + "#post-" + (i + 1)}" class="linkArrow block">${item.ttl ? item.ttl : null}</a>
                </dd>
              </div>
            `;
          }
        })}
      </dl>
      `
        : html`
      <div class="grid gap-[3.2rem]">
        ${this.data.map((item: jsonObject, i) => {
          return html`
            ${
              this.single !== true
                ? html`
              ${
                // アーカイブ
                this.show - 1 <= i && i <= this._maxCount - 1
                  ? html`
                <div class="border-prime border-[0.1rem] rounded-[1rem] overflow-hidden fadeUp">
                  <a href="${item.link ? item.link : this.href.includes("http") ? null : this._archiveUrl + "#post-" + (i + 1)}" class="grid grid-cols-[auto_1fr] gap-[3rem] items-center" @click=${() => this._showSingle(i + 1)}>
                    ${
                      // 画像
                      item.img
                        ? html`
                      <img src="${item.img.src}" width="${item.img.size && item.img.size[0] ? item.img.size[0] : null}" height="${item.img.size && item.img.size[1] ? item.img.size[1] : null}" decoding="async" loading="lazy" class="aspect-[240/160] object-cover w-full max-w-[48rem]">
                      `
                        : html`
                      <img src="/_assets/img/top/noimage.jpg" width="480" height="320" decoding="async" loading="lazy" class="aspect-[240/160] object-cover w-full">
                      `
                    }
                    <div>
                    ${
                      // タグ
                      item.tag
                        ? html`
                      <div class="flex gap-[1.6rem] mb-[1.2rem]">
                        ${item.tag.map((tag) => {
                          return html`
                            <span class="bg-prime text-reversal text-sm p-[0.1em_0.5em]">${tag}</span>
                          `;
                        })}
                      </div>
                      `
                        : null
                    }
                    ${
                      // 日付
                      item.date
                        ? html`
                      <time datetime=${getTime(item.date)}>${item.date}</time>
                      `
                        : null
                    }
                    ${
                      // タイトル
                      item.ttl
                        ? html`
                      <h3 class="text-prime font-bold mb-[0.8rem]">${item.ttl}</h3>
                      `
                        : null
                    }
                    </div>
                  </a>
                </div>
                `
                  : null
              }`
                : html`
                ${
                  i == this.post - 1
                    ? html`
                    <div class="fadeUp">
                    <section class="md:pt-[6.4rem] pt-[3.6rem] mb-[3.2rem]">
                      <div class="contentInner">
                        ${
                          // 日付
                          item.date
                            ? html`
                          <span class="block md:mb-[1rem] mb-[0.8rem]">
                            <time datetime=${getTime(item.date)}>${item.date}</time>
                          </span>
                          `
                            : null
                        }
                        ${
                          // タグ
                          item.tag
                            ? html`
                          <div class="flex gap-[1.6rem] mb-[1.2rem]">
                            ${item.tag.map((tag) => {
                              return html`
                                <span class="bg-prime text-reversal text-sm p-[0.1em_0.5em]">${tag}</span>
                              `;
                            })}
                          </div>
                          `
                            : null
                        }
                        ${
                          // タイトル
                          item.ttl
                            ? html`
                          <h1 class="font-bold text-h1"><span class="c_ttl_h1__jp">${item.ttl}</span></h1>
                          `
                            : null
                        }
                      </div>
                    </section><!-- /下層タイトル -->
                    <section class="md:mb-[2.4rem] mb-[1.6rem]">
                      <div class="contentInner">
                        <div class="bg-highlight md:rounded-[4rem] rounded-[5.6rem] md:p-[8rem] p-[5.6rem_2.4rem]">
                          <div class="overflow-hidden rounded-[0.8rem] mb-[3.6rem]">
                            ${
                              // 画像
                              item.img
                                ? html`
                              <img src="${item.img.src}" width="${item.img.size && item.img.size[0] ? item.img.size[0] : null}" height="${item.img.size && item.img.size[1] ? item.img.size[1] : null}" decoding="async" loading="lazy" class="aspect-[240/160] object-cover w-full">
                              `
                                : html`
                              <img src="/_assets/img/top/noimage.jpg" width="480" height="320" decoding="async" loading="lazy" class="aspect-[240/160] object-cover w-full">
                              `
                            }
                          </div>
                          <div class="postContent">
                            ${
                              // コンテンツ
                              item.content
                                ? html`
                              ${unsafeHTML(item.content.replace(/script>/g, "スクリプト&gt;").replace(/style>/g, "スタイル&gt;"))}
                              `
                                : html`<div>Coming soon...</div>`
                            }
                          </div>
                        </div>
                      </div>
                    </section><!-- /ニュース詳細 -->
                    <div class="contentInner">
                      <a href="#" class="c_btn max-w-[24rem]">記事一覧に戻る</a>
                    </div>
                  </div>
                `
                    : null
                }
                `
            }
        `;
        })}
      </div>
      ${
        // ページャー
        this.single !== true && this.data.length > this.visible
          ? html`
          <nav aria-label="ページ送り">
            <ol class="c_pager fadeUp">
              ${
                this.page > 1
                  ? html`
              <li class="c_pager_item">
                  <button class="c_pager_btn -arrow -prev"  @click=${() => this._changePage(this.page - 1)}><span class="txtHidden">前のページ</span></button>
                </li>
              `
                  : null
              }
              ${Array.from({ length: pageCount }).map(
                (_, i) => html`
                <li class="c_pager_item">
                  <button class="c_pager_btn -number ${i == 0 ? this.ACTIVE_CLASS_NAME : null}"  @click=${() => this._changePage(i + 1)}>${i + 1}<span class="txtHidden">ページ</span></button>
                </li>
              `
              )}
              ${
                this.page < pageCount
                  ? html`
              <li class="c_pager_item">
                  <button class="c_pager_btn -arrow -next"  @click=${() => this._changePage(this.page + 1)}><span>次のページ</span></button>
                </li>
              `
                  : null
              }
            </ol>
          </nav>
          `
          : null
      }
        `
    }
    `;
  }

  // -----------------------------------------
  // ページャークリック時のイベントハンドラ
  // -----------------------------------------

  _changePage(page: number) {
    // ページ変更処理
    const btns = this.querySelectorAll(".c_pager_btn.-number");
    // 選択ボタンのスタイル変更
    btns.forEach((btn) => {
      btn.classList.remove(this.ACTIVE_CLASS_NAME);
    });
    btns[page - 1].classList.add(this.ACTIVE_CLASS_NAME);
    this.page = page;
    this._maxCount = this.visible * page; // ページ内最大値
    this.show = this._maxCount - this.visible + 1; // ページ内最小値
  }

  // -----------------------------------------
  // 記事クリック時のイベントハンドラ
  // -----------------------------------------

  _showSingle(id: number) {
    // 記事詳細表示
    this.post = id;
    this.single = true;
  }

  // -----------------------------------------
  // URLに直接入力し場合の処理
  // -----------------------------------------
  // getQuery()メソッド内で、ハッシュ値を取得し、_postを更新
  getQuery() {
    const urlHash = Number(location.hash.split("#post-")[1]);
    return urlHash;
  }

  _handlePopstate() {
    // ブラウザバックが実行された
    // 例：URLの変化に応じてcurrentPageを更新
    if (this.getQuery()) {
      this.post = this.getQuery();
      this.single = true;
    } else {
      this.single = false;
      setTimeout(() => {
        this._changePage(this.page);
      }, 200);
    }
  }

  // DOM描画
  protected createRenderRoot() {
    return this;
  }
}
