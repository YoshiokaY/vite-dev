import fs from "fs";
import path from "path";
import { glob } from "glob"; // glob をインストールする必要があります
export default function scssWatch(options) {
  const { targetFilePattern, outputFile } = options;
  return {
    name: "vite-plugin-scss-watch",
    handleHotUpdate({ file, server }) {
      const targetFiles = glob.sync(targetFilePattern); // ワイルドカードにマッチするファイルパスを取得
      if (targetFiles.some((targetFile) => path.resolve(file) === path.resolve(targetFile))) {
        // console.log(`${file} が変更されました`);
        try {
          const outputContent = fs.readFileSync(outputFile, "utf8");
          fs.writeFileSync(outputFile, outputContent, "utf8");
          // console.log(`${outputFile} にテキストが追加されました`);
          server.ws.send({
            type: "full-reload",
            path: outputFile,
          });
        } catch (err) {
          console.error(`${outputFile} の書き込みに失敗しました: ${err}`);
        }
      }
    },
  };
}
