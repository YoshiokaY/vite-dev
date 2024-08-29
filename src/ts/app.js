import { Accordion } from "./class/Accordion";
import { Modal } from "./class/Modal";
import { Hamburger } from "./class/Hamburger";
import { ScrollAnimation } from "./class/Animation";
import { Tab } from "./class/Tab";
import { getHeader } from "./utils/util";
import { Filter } from "./class/Filter";

window.addEventListener("DOMContentLoaded", () => {
  new Modal(); // モーダル
  new Hamburger(); // ハンバーガー
  new Tab(); // タブ
  new ScrollAnimation(); // アニメーション
  new Tab(); // タブ
  new Filter(); // フィルター機能
});

window.addEventListener("load", () => {
  new Accordion(); // アコーディオン
  // getHeader(); // 固定ヘッダー
});
