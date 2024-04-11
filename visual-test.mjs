import puppeteer from "puppeteer";
import sharp from "sharp";
import { existsSync, mkdirSync, copyFileSync, unlinkSync } from "fs";
import path from "path";
import { CAPTURE_URL, DESIGN_DIR, DIFF_DIR, SCREENSHOT_DIR, testSettings } from "./test-config.mjs";

(async () => {
  // 出力先フォルダがなければ作成
  if (!existsSync(SCREENSHOT_DIR)) {
    mkdirSync(SCREENSHOT_DIR);
  }
  if (!existsSync(DIFF_DIR)) {
    mkdirSync(DIFF_DIR);
  }

  // Puppeteer起動
  const browser = await puppeteer.launch();

  // ページごとに実行
  for (const { design, capturePath } of testSettings) {
    // デザイン画像のパス
    const designFilePath = `${DESIGN_DIR}/${design}`;

    // デザイン画像のファイル名取得
    const designFileName = path.parse(designFilePath).name;

    // スクリーンショットの格納先とファイル名
    const screenshotFilePath = `${SCREENSHOT_DIR}/screenshot_${designFileName}.png`;
    const designImage = sharp(designFilePath);
    const designImageMetaData = await designImage.metadata();

    const screenshotImage = sharp(screenshotFilePath);
    //既にスクショがある場合
    const exists = existsSync(screenshotFilePath);

    // デザイン画像のサイズ取得
    const designImageSize = {
      width: designImageMetaData.width,
      height: designImageMetaData.height,
    };
    // Puppeteerの設定
    const page = await browser.newPage();
    //ビューポートをデザインサイズに合わせる
    await page.setViewport({
      width: designImageMetaData.width,
      height: designImageMetaData.height,
    });
    await page.goto(`${CAPTURE_URL}${capturePath}`);
    // アニメーションが終わるまで待機
    await page.evaluate(() => {
      setTimeout(() => {
        scroll(0, 99999);
      }, 5000);
    });
    await page.setDefaultNavigationTimeout(0);
    await page.waitForTimeout(5000);

    // ページ全体のスクリーンショット撮影
    //初回以外は前回の画像との比較も行う
    if (exists == true) {
      const newScreenshotFilePath = `${SCREENSHOT_DIR}/screenshot_${designFileName}_1.png`;
      await page.screenshot({
        path: newScreenshotFilePath,
        fullPage: true,
      });

      //リサイズ
      const resizedScreenshot2 = await sharp(newScreenshotFilePath)
        .resize({
          width: designImageSize.width,
          height: designImageSize.height,
          fit: null,
          position: "left top",
          withoutEnlargement: true,
        })
        .toBuffer();

      //前回と今回の画像比較
      const compositedScreenshot = await sharp(screenshotFilePath)
        .composite([
          {
            input: resizedScreenshot2,
            blend: "difference",
            gravity: "northwest",
          },
        ])
        .toBuffer();

      // 比較画像を取得をファイル出力
      await sharp(compositedScreenshot).negate({ alpha: false }).toFile(`${DIFF_DIR}/reg_${designFileName}.png`);

      // 前回の画像を今回の画像で上書き
      copyFileSync(newScreenshotFilePath, screenshotFilePath);
      unlinkSync(newScreenshotFilePath);
    } else {
      await page.screenshot({
        path: screenshotFilePath,
        fullPage: true,
      });
    }

    // スクリーンショット画像をデザイン画像のサイズにリサイズ
    const resizedScreenshot = await screenshotImage
      .resize({
        width: designImageSize.width,
        height: designImageSize.height,
        fit: null,
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
    await sharp(difference).negate({ alpha: false }).toFile(`${DIFF_DIR}/diff_${designFileName}.png`);
  }

  await browser.close();
})();
