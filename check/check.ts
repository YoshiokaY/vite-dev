import type { Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { createHtmlReport } from "axe-html-reporter";
import { pages, localhost, WCAG } from "./check.config";
import fs from "fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

interface TargetPage {
  name: string;
  path: string;
}

const targetPages: TargetPage[] = pages;

for (const targetPage of targetPages) {
  test(targetPage.name, async ({ page }) => {
    // await a11y(page, targetPage);
    // await screenshot(page, targetPage);
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

// VRT
const screenshot = async (page: Page, targetPage: TargetPage) => {
  // test.configで設定したチェック対象のページを参照
  await page.goto(localhost + targetPage.path);

  // 前回と今回のスクリーンショットの比較を行う
  await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled" });
};

const pixelPerfect = async (page: Page, targetPage: TargetPage, designImagePath?: string) => {
  await page.goto(localhost + targetPage.path);
  await page.screenshot({ path: "./check/screenshot/" + targetPage.name + ".png", fullPage: true, animations: "disabled" });
  // expect(await page.screenshot({ path: "./check/screenshot/" + targetPage.name + ".png", fullPage: true, animations: "disabled" })).toMatchSnapshot("./check/design/" + targetPage.name + ".png");

  // // スクリーンショットをPNG画像に変換
  // const img1 = PNG.sync.read(screenshot);
  // const img2 = PNG.sync.read(fs.readFileSync(designImagePath));

  // // 画像のサイズを合わせる
  // const { width, height } = img1;
  // if (img2.width !== width || img2.height !== height) {
  //   throw new Error('Image dimensions do not match');
  // }

  // // 差分を格納する配列
  // const diff = new PNG({ width, height });

  // // Pixelmatch を使用して画像を比較
  // const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

  // // 差分画像を生成 (Resemble.js を利用)
  // const data = await resemble(screenshot).compareTo(designImagePath).ignoreColors().onComplete((data) => {
  //   fs.writeFileSync('diff.png', data.getBuffer());
  // });

  // // 差分の割合を計算
  // const diffPercent = (numDiffPixels / (width * height)) * 100;

  // if (diffPercent > 5) {
  //   console.error('Images are not similar');
  //   // テストを失敗させる
  // }
};
