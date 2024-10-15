import { Accordion } from "./class/Accordion";
import { Modal } from "./class/Modal";
import { Hamburger } from "./class/Hamburger";
import { ScrollAnimation } from "./class/Animation";
import { Tab } from "./class/Tab";
import { SmoothScroll } from "./class/SmoothScroll";

window.addEventListener("DOMContentLoaded", () => {
  new Modal(); // モーダル
  new Hamburger(); // ハンバーガー
  new Tab(); // タブ
  new ScrollAnimation(); // アニメーション
  new SmoothScroll(); // スムーススクロール
});

window.addEventListener("load", () => {
  new Accordion(); // アコーディオン
});

const hoge = document.getElementById("hoge");
const hogeHeight = hoge;
document.documentElement.style.setProperty("--hogeHeight", `${hoge.clientHeight}px`);
