import { Accordion } from "./class/Accordion";
import { Modal } from "./class/Modal";
import { Hamburger } from "./class/Hamburger";
import { ScrollAnimation } from "./class/Animation";
import { Tab } from "./class/Tab";

window.addEventListener("DOMContentLoaded", () => {
  new Modal(); // モーダル
  new Hamburger(); // ハンバーガー
  new ScrollAnimation(); // アニメーション
  new Tab(); // タブ
});

window.addEventListener("load", () => {
  new Accordion(); // アコーディオン
});
