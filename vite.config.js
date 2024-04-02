import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import vitePluginPug from "./plugins/vite-plugin-pug";
import globule from "globule";
import viteImagemin from "vite-plugin-imagemin";
import VitePluginWebpAndPath from "vite-plugin-webp-and-path";
import sassGlobImports from "vite-plugin-sass-glob-import";

// pugを検索（_から始まるものは除外）
const htmlFiles = globule.find("src/**/*.pug", {
  ignore: ["src/**/_*.pug"],
});

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const asset = env.VITE_ASSETS_PATH;
  return {
    publicDir: "public", //コピーディレクトリ
    root: "src", //ルートディレクトリ
    base: "/", //アセットのパス指定(相対パスにする場合は"./")
    server: {
      host: true,
    },
    build: {
      outDir: resolve(__dirname, "htdocs"),
      emptyOutDir: true, //ビルド時出力先フォルダをクリーンアップするか
      assetsInlineLimit: 0, //画像をインライン化するサイズ
      rollupOptions: {
        input: htmlFiles,
        output: {
          entryFileNames: `${asset}/js/[name].js`,
          chunkFileNames: `${asset}/js/[name].js`,
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split(".")[1];
            //Webフォントファイルの振り分け
            if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
              extType = "fonts";
            }
            if (/png|jpe?g|webp|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = "img";
            }
            //ビルド時のCSS名を明記してコントロールする
            if (extType === "css") {
              return `${asset}/css/style.css`;
            }
            return `${asset}/${extType}/[name][extname]`;
          },
        },
      },
    },
    plugins: [
      sassGlobImports(),
      vitePluginPug(),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 80,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: "removeViewBox",
            },
            {
              name: "removeEmptyAttrs",
              active: false,
            },
          ],
        },
      }),
      //webPに変換する場合はコメントアウトを解除する
      // VitePluginWebpAndPath({
      //   targetDir: `./htdocs/`,
      //   imgExtensions: "jpg,png",
      //   quality: 80,
      // }),
    ],
  };
});
