# hajimete-fes-web

ハッチ - NTTUDはじめてフェスLP制作

# vite開発環境

## インストール

### macOS

- [Homebrew](https://brew.sh/index_ja.html)
- [nodenv](docs/nodenv.md)

### Windows

- [nodist](docs/nodist.md)

### VS Code Extensions

- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Markuplint](https://marketplace.visualstudio.com/items?itemName=yusukehirao.vscode-markuplint)

## セットアップ

```sh
npm i
```

## 開発

```sh
npm run dev
```

http://localhost:5173

## ビルド

```sh
npm run build
```

css と js が圧縮され、ソースマップは出力されません。
アセットのパスがhtdocsに変換されえます（ts→jsにトランスパイル）。

## 機能

- [Pug](https://pugjs.org/api/getting-started.html)
  参考 URL：https://zenn.dev/yend724/articles/20220408-tfq16buha8ctdzp7#pug%E3%82%92%E4%BD%BF%E3%81%88%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B
- [Sass](https://sass-lang.com/) ([dart-sass](https://github.com/sass/dart-sass))
  参考 URL：https://zenn.dev/sutobu000/articles/fef3959195cda5
  - [PostCSS](https://postcss.org/)
  - [TailwindCSS](https://tailwindcss.com/)
  - [Autoprefixer](https://github.com/postcss/autoprefixer)
- [imagemin](https://github.com/imagemin/imagemin)
  - [webP](https://github.com/rei990/vite-plugin-webp-and-path)
- [Stylelint](https://stylelint.io/)
- [ESLint](https://eslint.org/)
- [Markuplint](https://markuplint.dev/ja/)
- [Prettier](https://prettier.io/)

## HTML - Pug

ejs対応には未対応。

ファイル名の先頭に `_` が入るファイルは直接はビルドされません。  
includeやextendの指定は相対パスで記述してください。

## CSS - TailwindCSS / SASS

コンポーネントは従来通りscssで記述して、テキストや余白などコンポーネントやページごとに差異が出てくる箇所にTailwindCSSの使用を想定しているのでどちらも使えます。

## JavaScript - typescript

現時点ではtypescriptのみ対応。
とはいえ、クライアントから支給されるものや@typeがないプラグインもあると思うので、いずれjavaScriptと並走できるようにする予定です。

## 画像圧縮 - imagemin

`*.jpg`, `*.jpeg`, `*.png`, `*.gif`, `*.svg` を圧縮します。
圧縮率は`vite.config.cjs` を編集してください。

また`*.jpg`, `*.png`をwebPに変換します。
不要の場合は`vite.config.cjs`の当該プラグインをコメントアウトしてください。
また、上記変換プラグインが元ファイルを置き換える仕様のため、環境をインストールしたら以下をコメントアウトしてください。

```
imageFiles.forEach((file) => {
  fs.unlinkSync(file);
});
log('All original images deleted.');
path replace

```

## 静的アセット

ogp画像などドメイン付きのアドレスで直接指定しているものやファビコンののようにhtml側から直接指定しないような静的ファイルはviteが使用していいないものと判断しビルドされません。そのため`public`フォルダにディレクトリ構造ごと入れてください、ディレクトリ構造を保ったままビルドされます。

## 出力ディレクトリの変更

ディレクトリを変更する場合は `.env`の  `VITE_ASSETS_PATH`を編集してください。
またsrcの画像フォルダも併せて変更したディレクトリ名のフォルダの中に入れてください。

## 構文チェック - Stylelint / ESLint / MarkupLint

設定したルールに沿って警告・エラーをコンソールに出力します。

## 注意点

- viteの性質上必ずビルドしたもので最終的な表示確認をすること(`npm run preview`でhtdocsの内容で表示することができます)
- dev環境ではアセットをVite上で読み込むため、srcフォルダ内のパスを参照するように記述してください（ビルド時に正規のパスに置き換わります）

## 実装予定
- jsとtsの並走（配布されたjsやプラグインをいちいち変換するの面倒なので）
- npm　scriptで使っていたパペッティアを使ったVRT
