# vivte-dev

Vite-dev環境

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
npm start
```

http://localhost:5173

## ビルド

```sh
npm run build
```

css と js が圧縮され、ソースマップは出力されません。
アセットのパスがhtdocsに変換されえます（ts→jsにトランスパイル）。

## チェック

```sh
npm run check
```

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

Pugをエントリーポイントにビルドしているので、従来通りpugおよびhtmlで記述することができますが、ejsや本来のjsxには対応していません。
また画像などアセットへのパスはsrc内でのパスを記述することで、ビルド時に自動で実際のパスへ置き換わります。

### ディレクトリ構造
.
└── pug
    ├── _base
    │   ├── _head         // headタグ（cssやjsの読み込みもここ）
    │   ├── _jsonLd       // JSONLD
    │   ├── _layout       // pugのテンプレートファイル
    │   └── _common       // ヘッダーフッターなどページ共通要素のコンテンツ
    ├── _component        // 複数ページで共通で使用するパーツ
    │   ├── _circular-nav
    │   ├── _cta
    │   ├── _links
    │   ├── _mixin
    │   ├── _sns
    │   ├── _lowerMv
    │   └── _lowerTtl
    ├── _layouts          // デフォルトで使用する構造
    │   ├── _footer
    │   ├── _header
    │   ├── _main
    │   ├── _beginBody    // bodyタグ直後（Gタグなどもここ）
    │   └── _beginHead    // headタグ直後（Gタグなどもここ）
    └── recruit           // 下層ページディレクトリ
    │    ├── _parts       // ページ固有のパーツ
    │    │   └──_content
    │    ├── _contents    // ページ固有のコンテンツ
    │    ├── index        // 実際のページ
    │    └── jobs         // 第三階層ディレクトリ
    │        ├── _parts
    │        │   └── _sticky
    │        ├── _contents
    │        └── index
    └──_parts 
    │  └──_content        
    ├── _contents
    └── index             // ルートディレクトリのページ

## CSS - TailwindCSS / SASS

従来通りDart Sassで記述できるほか、Tailwind.cssでの記述をサポートしていますが不要の場合は読み込みをコメントアウトします。
また、glob記法をサポートしているので一括での読み込みや除外が可能です。
リセットスタイルは従来のものからアクセシビリティが考慮された@acab/reset.cssに変更しています。
Tailwindとの相性が悪いのでPurge CSSは入っていません。


## JavaScript - typescript

デフォルトでTypescriptをサポートしていますが、jQuery用の型ファイルも入っているので使用する場合はインポートします。


## 画像圧縮 - imagemin

`*.jpg`, `*.jpeg`, `*.png`, `*.gif`, `*.svg` を圧縮します。
圧縮率は`vite.config.cjs` を編集してください。

また`*.jpg`, `*.png`をwebPに変換し、ビルド後の拡張子も自動で置き換えます。
不要の場合は`vite.config.cjs`の当該プラグインをコメントアウトしてください。


## 静的アセット

### publicフォルダ
ogp画像などドメイン付きのアドレスで直接指定しているものやファビコンのようにドメイン付きの絶対パスで参照するファイルはviteが使用していいないものと判断しビルドされません。
そのため`public`フォルダにディレクトリ構造ごと入れてください、ディレクトリ構造を保ったままビルドされます。
また、デフォルトではimgフォルダ内の画像はディレクトリ構造を無視して一括で出力されます。

#### 例
`/src/img/tokyo/` `/src/img/osaka/`に格納されているファイルが全部`/htdocs/_assets/img/`に出力される。

ビルド後も画像のディレクトリ構造を保ちたい場合は`/src/img/`ではなく、
publicフォルダにビルド時のルートからのディレクトリ構造を保って（先の例の場合は`/_assets/img/tokyo/`　`/_assets/img/osaka/`）入れると実現できます。
その際、src内のパスはpublicを参照するように（※ただし`public`の部分は不要なのでその直下からのパスを）記述してください。パスはビルド時に自動で置き換わります。

### 出力ディレクトリの変更

ディレクトリを変更する場合は `.env`の  `VITE_ASSETS_PATH`を編集してください。
またsrcの画像フォルダも併せて変更したディレクトリ名のフォルダの中に入れてください。

### アセットパスの変更

アセットのファイルパス設定はデフォルトではルート相対。
相対パスにしたい場合は`vite.config.cjs`の`base`オプションを`./`に変更します。


## 構文チェック - Stylelint / ESLint / MarkupLint

設定したルールに沿って警告・エラーをコンソールに出力します。

## 注意点

- viteの性質上必ずビルドしたもので最終的な表示確認をすること(`npm run preview`でhtdocsの内容で表示することができます)
- dev環境ではアセットをVite上で読み込むため、srcフォルダ内のパスを参照するように記述してください（ビルド時に正規のパスに置き換わります）
- ただしカスタムdata属性などで静的アセットを指定している場合はその限りではないので、手動で書き換える必要があります。

## 実装予定
- jsとtsの並走（配布されたjsやプラグインをいちいち変換するの面倒なので）
- 重い場合のパペッティアの調整
- VRTとaxeの設定ファイルの統合
- WP開発用にゆうじさんのdocker環境マージ
