import { Accordion } from "./class/Accordion";
import { Modal } from "./class/Modal";

window.addEventListener("DOMContentLoaded", () => {
  new Modal(); //モーダル
});

window.addEventListener("load", () => {
  new Accordion(); //アコーディオン
});
