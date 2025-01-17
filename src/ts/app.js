import { Accordion } from "./class/Accordion";
import { Modal } from "./class/Modal";
import { Hamburger } from "./class/Hamburger";
import { ScrollAnimation } from "./class/Animation";
import { Tab } from "./class/Tab";
import { Filter } from "./class/Filter";
import { ArchiveList } from "./class/NewsArchive";
import { NewsSingle } from "./class/NewsSingle";
import { SmoothScroll } from "./class/SmoothScroll";
import { GuideTour } from "./class/GuideTour";
import "./utils/slide";
import { getHeader } from "./utils/util";

window.addEventListener("DOMContentLoaded", () => {
  new Modal(); // モーダル
  new Hamburger(); // ハンバーガー
  new Tab(); // タブ
  new ScrollAnimation(); // アニメーション
  new Tab(); // タブ
  new Filter(); // フィルター機能
  new ArchiveList(); // お知らせ一覧
  new NewsSingle(); // お知らせ詳細
  new SmoothScroll(); // スムーススクロール
  new GuideTour(); // スムーススクロール
});

window.addEventListener("load", () => {
  new Accordion(); // アコーディオン
  getHeader();
});
