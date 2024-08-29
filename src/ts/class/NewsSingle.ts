import { property, customElement } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { getTime, sanitize, srcCheck } from "../utils/util.ts";

@customElement("news-single")
export class NewsSingle extends LitElement {
  @property()
  src: string = ""; // jsonファイル
  @property({ type: Array })
  data = []; // 初期値を空の配列に
  @property({ state: true })
  private _post = 0; // 該当記事

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
    this._post = this.getQuery();
  }

  // getQuery()メソッド内で、ハッシュ値を取得し、_postを更新
  getQuery() {
    const urlHash = Number(location.hash.split("#post")[1]);
    this._post = urlHash;
    return urlHash;
  }

  srcCheck(src: string) {
    let regExp = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/gi;
    if (!src.match(regExp)) {
      return src;
    }
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

  override render() {
    if (!this.data.length) {
      return html`<section class="md:pt-[6.4rem] pt-[3.6rem] md:pb-[6.3rem] pb-[3.1rem]">
          <div class="contentInner"><div aria-busy="true">Coming soon...</div></div></section>`;
    }
    // 該当記事を参照
    for (let i = 0; i < this.data.length; i++) {
      if (i === this._post) {
        const item: { ttl: string; date: string; img?: string; content: string } = this.data[i];
        return html`
        <!-- 下層タイトル -->
        <section class="md:pt-[6.4rem] pt-[3.6rem] md:pb-[6.3rem] pb-[3.1rem]">
          <div class="contentInner">
            <span class="block md:mb-[1rem] mb-[0.8rem]">
              <time datetime=${getTime(item.date)}>${item.date}</time>
            </span>
            <h1 class="font-bold text-h1"><span class="c_ttl_h1__jp">${item.ttl}</span></h1>
          </div>
        </section><!-- /下層タイトル -->
        <!-- ニュース詳細 -->
        <section class="md:mb-[14rem] mb-[8rem]">
          <div class="contentInner">
            <div class="bg-body md:rounded-[8rem] rounded-[5.6rem] md:p-[8rem] p-[5.6rem_2.4rem]">
              <div class="postContent">
                ${
                  item.img // ヒーロー画像があれば表示
                    ? html`
                      <figure class="mb-[2em]"><img src=${item.img} alt="" width="920" height="520" decoding="async" loading="lazy"></figure>`
                    : html``
                }
                ${unsafeHTML(item.content.replace(/script>/g, "スクリプト&gt;").replace(/style>/g, "スタイル&gt;"))}
              </div>
            </div>
          </div>
        </section><!-- /ニュース詳細 -->
        `;
      }
    }
  }
  protected createRenderRoot() {
    return this;
  }
}
