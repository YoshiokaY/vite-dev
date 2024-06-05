import { Accordion } from "./class/Accordion";
import { Modal } from "./class/Modal";
import { Hamburger } from "./class/Hamburger";
import { Tab } from "./class/Tab";

window.addEventListener("DOMContentLoaded", () => {
  new Modal(); // モーダル
  new Hamburger(); // ハンバーガーメニュー
  new Tab();
});

window.addEventListener("load", () => {
  new Accordion(); // アコーディオン
});
