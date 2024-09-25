// ベースURL
export const localhost = "http://localhost:5173";

// チェック対象ページ
export const pages = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "about",
    path: "/about/",
  },
];

// アクセシビリティチェックのレベル
export const WCAG = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

// アクセシビリティチェック除外項目
export const disableRules = ["color-contrast"];
