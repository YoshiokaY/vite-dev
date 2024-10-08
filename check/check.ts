import type { Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { createHtmlReport } from "axe-html-reporter";
import sharp from "sharp";
import { existsSync, mkdirSync } from "fs";
import { pages, localhost, WCAG, disableRules } from "../check.config";

interface TargetPage {
  name: string;
  path: string;
}

// デザイン画像が格納しているディレクトリ
const DESIGN_DIR = "./check/design/";
// スクリーンショットを格納するディレクトリ
const SCREENSHOT_DIR = "./check/screenshot/";
// 差分ファイルを出力する格納するディレクトリ
const DIFF_DIR = "./check/diff/";
// a11yファイルを出力する格納するディレクトリ
const a11y_DIR = "./check/a11y";
// 画像の拡張子
const UNIT = ".png";
// ページ読み込みの待機時間
const TIME = 2000;

const targetPages: TargetPage[] = pages;

for (const targetPage of targetPages) {
  test(targetPage.name, async ({ page }) => {
    await test.step("コンソールエラーチェック", async () => {
      await consoleCheck(page, targetPage);
    });
    await test.step("ピクセルパーフェクト", async () => {
      await pixelPerfect(page, targetPage);
    });
    await test.step("アクセシビリティチェック", async () => {
      await a11y(page, targetPage);
    });
    await test.step("ヴィジュアルリグレッション", async () => {
      await vrtCheck(page, targetPage);
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

// VRT（前回との比較）
const vrtCheck = async (page: Page, targetPage: TargetPage) => {
  // test.configで設定したチェック対象のページを参照
  await page.goto(localhost + targetPage.path, { waitUntil: "load" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(TIME); // スクロール完了までwait

  // 前回と今回のスクリーンショットの比較を行う
  await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled" });
};

// デザインチェック
const pixelPerfect = async (page: Page, targetPage: TargetPage) => {
  // 出力先フォルダがなければ作成
  if (!existsSync(DIFF_DIR)) {
    mkdirSync(DIFF_DIR);
  }

  // デザイン画像参照
  const designFilePath = DESIGN_DIR + targetPage.name + UNIT;
  const designImage = sharp(designFilePath);
  // デザインのサイズを取得
  const designImageMetaData = await designImage.metadata();
  const designImageSize = {
    width: designImageMetaData.width,
    height: designImageMetaData.height,
  };
  // デザインサイズでブラウザを表示
  await page.setViewportSize({ width: Number(designImageSize.width), height: Number(designImageSize.height) });
  await page.goto(localhost + targetPage.path, { waitUntil: "load" });

  // アニメーションの発火のためページの一番下までスクロールする
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(TIME);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(TIME);

  // スクリーンショット撮影
  const screenshot = await page.screenshot({ path: SCREENSHOT_DIR + targetPage.name + UNIT, fullPage: true, animations: "disabled" });

  // デザイン画像とスクリーンショット画像を重ねて差の絶対値で差分を検出
  const difference = await designImage
    .composite([
      {
        input: screenshot,
        blend: "difference",
        gravity: "northwest",
      },
    ])
    .toBuffer();

  // ネガ反転してファイル出力
  await sharp(difference)
    .negate({ alpha: false })
    .toFile(DIFF_DIR + "diff-" + targetPage.name + UNIT);

  await test.info().attach("screenshot", { body: difference, contentType: "image/png" });
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
