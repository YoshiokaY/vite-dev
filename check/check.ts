import type { Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { createHtmlReport } from "axe-html-reporter";
import { pages, localhost, WCAG } from "./check.config";
import sharp from "sharp";
import { existsSync, mkdirSync } from "fs";

interface TargetPage {
  name: string;
  path: string;
}

const targetPages: TargetPage[] = pages;

for (const targetPage of targetPages) {
  test(targetPage.name, async ({ page }) => {
    await a11y(page, targetPage);
    await screenshot(page, targetPage);
    await pixelPerfect(page, targetPage);
  });
}

const a11y = async (page: Page, targetPage: TargetPage) => {
  // test.configで設定したチェック対象のページを参照
  await page.goto(localhost + targetPage.path);

  // axe-core を使ってアクセシビリティテストを実行
  const results = await new AxeBuilder({ page }).withTags(WCAG).analyze();
  // レポートをhtmlで出力
  createHtmlReport({
    results: results,
    options: {
      reportFileName: "a11y-report-" + targetPage.name + ".html",
      outputDir: "check/a11y",
    },
  });
  expect(results.violations).toEqual([]);
};

// VRT（前回との比較）
const screenshot = async (page: Page, targetPage: TargetPage) => {
  // test.configで設定したチェック対象のページを参照
  await page.goto(localhost + targetPage.path);

  // 前回と今回のスクリーンショットの比較を行う
  await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled" });
};

// デザインとの比較
const pixelPerfect = async (page: Page, targetPage: TargetPage) => {
  // 出力先フォルダがなければ作成
  if (!existsSync("./check/diff/")) {
    mkdirSync("./check/diff/");
  }

  await page.goto(localhost + targetPage.path);
  const screenshot = await page.screenshot({ path: "./check/screenshot/" + targetPage.name + ".png", fullPage: true, animations: "disabled" });
  const screenshotImage = sharp(screenshot);

  // デザイン画像参照
  const designFilePath = "./check/design/" + targetPage.name + ".png";
  const designImage = sharp(designFilePath);
  const designImageMetaData = await designImage.metadata();
  // デザイン画像のサイズ取得
  const designImageSize = {
    width: designImageMetaData.width,
    height: designImageMetaData.height,
  };

  // スクリーンショットをデザイン画像のサイズにリサイズ
  const resizedScreenshot = await screenshotImage
    .resize({
      width: designImageSize.width,
      height: designImageSize.height,
      position: "left top",
      withoutEnlargement: true,
    })
    .toBuffer();

  // デザイン画像とスクリーンショット画像を重ねて差の絶対値で差分を検出
  const difference = await designImage
    .composite([
      {
        input: resizedScreenshot,
        blend: "difference",
        gravity: "northwest",
      },
    ])
    .toBuffer();

  // ネガ反転してファイル出力
  await sharp(difference)
    .negate({ alpha: false })
    .toFile("./check/diff/diff-" + targetPage.name + ".png");
};
