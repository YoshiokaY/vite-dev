import type { Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { createHtmlReport } from "axe-html-reporter";
import { pages, localhost, WCAG, disableRules } from "../check.config";

interface TargetPage {
  name: string;
  path: string;
}

// a11yファイルを出力する格納するディレクトリ
const a11y_DIR = "./check/a11y/";
// ページ読み込みの待機時間
const TIME = 2000;

const targetPages: TargetPage[] = pages;

for (const targetPage of targetPages) {
  test(targetPage.name, async ({ page }) => {
    await test.step("コンソールエラーチェック", async () => {
      await consoleCheck(page, targetPage);
    });
    await test.step("アクセシビリティチェック", async () => {
      await a11y(page, targetPage);
    });
  });
}

// アクセシビリティチェック
const a11y = async (page: Page, targetPage: TargetPage) => {
  // test.configで設定したチェック対象のページを参照
  await page.goto(localhost + targetPage.path, { waitUntil: "load" });

  // axe-core を使ってアクセシビリティテストを実行
  const results = await new AxeBuilder({ page }).withTags(WCAG).disableRules(disableRules).analyze();
  // レポートをhtmlで出力
  createHtmlReport({
    results: results,
    options: {
      reportFileName: "a11y-report-" + targetPage.name + ".html",
      outputDir: a11y_DIR,
    },
  });
  // エラーがあれば失敗する
  expect.soft(results.violations).toEqual([]);
};

// コンソールエラー
const consoleCheck = async (page: Page, targetPage: TargetPage) => {
  const messages: Array<string> = [];
  const client = await page.context().newCDPSession(page);

  await client.send("Runtime.enable");
  client.on("Runtime.exceptionThrown", (payload) => {
    messages.push(payload.exceptionDetails.exception?.description || "no description");
  });

  // test.configで設定したチェック対象のページを参照
  await page.goto(localhost + targetPage.path, { waitUntil: "load" });
  await page.waitForTimeout(TIME);

  // エラー内容
  messages.forEach((message, i) => {
    test.info().annotations.push({ type: "console error" + i, description: message });
  });

  // エラーがあれば失敗する
  expect.soft(messages).toEqual([]);
};
