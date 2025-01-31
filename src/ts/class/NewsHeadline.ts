import { property, customElement } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { getTime, sanitize, srcCheck } from "../utils/util.ts";

@customElement("news-list")
export class NewsHeadline extends LitElement {
  @property()
  src: string = ""; // jsonファイル
  @property()
  href: string = ""; // 詳細ページへのリンク
  @property({ type: Array })
  data = []; // 初期値を空の配列に
  @property({ type: Number })
  limit = 3; // 表示件数

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
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
      return html`<div aria-busy="true">Coming soon...</div>`;
    }
    return html`
      <dl class="flex flex-col justify-between archiveList md:gap-y-[6.5rem] gap-y-[4.9rem]">
        ${this.data.map((item: { ttl: string; date: string; link?: string }, i) => {
          if (i < this.limit) {
            return html`
              <div class="grid md:grid-cols-[13.1rem,auto] md:gap-[3rem] gap-[1.2rem]">
                <dt><time datetime=${getTime(item.date)}>${item.date}</time></dt>
                <dd>
                  ${
                    item.link // リンクが指定されていたらそちらに飛ぶ
                      ? html`
                    <a href=${item.link} class="linkArrow block">${item.ttl}</a>`
                      : this.href.includes("http") // リンクが指定されていない場合はオプションのテンプレート先ににクエリをつけて飛ばす※ただしオプションに外部リンクが指定されている場合はセキュリティの観点から弾く
                        ? html`
                    <span>${item.ttl}</span>`
                        : html`
                    <a href=${sanitize(this.href) + "#post" + i} class="linkArrow block">${item.ttl}</a>`
                  }
                </dd>
              </div>
            `;
          }
        })}
      </dl>
    `;
  }
  protected createRenderRoot() {
    return this;
  }
}
