// import { Accordion } from "./class/Accordion";
// import { Modal } from "./class/Modal";
// import { Hamburger } from "./class/Hamburger";
import { ScrollAnimation } from "./class/Animation";
// import { Tab } from "./class/Tab";
// import { getHeader } from "./utils/util";
import { Filter } from "./class/Filter";
import { ArchiveList } from "./class/NewsArchive";
import { NewsSingle } from "./class/NewsSingle";
import { Three } from "./class/Three";

window.addEventListener("DOMContentLoaded", () => {
  // new Modal(); // モーダル
  // new Hamburger(); // ハンバーガー
  // new Tab(); // タブ
  new ScrollAnimation(); // アニメーション
  // new Tab(); // タブ
  new Filter(); // フィルター機能
  new ArchiveList(); // お知らせ一覧
  new NewsSingle(); // お知らせ詳細
  new Three(); // お知らせ詳細
});

// window.addEventListener("load", () => {
//   new Accordion(); // アコーディオン
//   // getHeader(); // 固定ヘッダー
// });
