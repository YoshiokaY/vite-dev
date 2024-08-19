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

- 頭に`_`が付いていないPugファイルをエントリーポイントにビルドします。
- 従来通りpugおよびhtmlでの記述をサポートしていますが、ejsや本来のjsxには今のところ対応していません。
- また画像などアセットへのパスはsrc内でのパスを記述することで、ビルド時に自動で実際のパスへ置き換わります。
- pugのテンプレート機能を使用しているので`_common`及び各ページの`_contents`ファイルを編集することでヘッダー＆フッターなどの共通パーツや各ページのheadタグなどが自動で出力されます。

### ディレクトリ構造
```pug
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
```
## CSS - TailwindCSS / SASS

- 頭に`_`が付いていない`scss`ファイルをエントリーポイントにビルドします。
- 従来通りDart Sassで記述をサポートしています。
- Tailwindをサポートしていますので、sassと並行で活用してください。
- Sassの変数、及びTailwindの変数はCSSのカスタムプロパティで統一しています。
- glob記法をサポートしているので、各scssファイルの一括読み込みや除外が可能です。
- リセットスタイルは従来のものからアクセシビリティが考慮された`@acab/reset.css`に変更しています。
- アクセシビリティ担保のためサイズ指定には`rem`を使用しています。（`px`だとブラウザ設定で文字サイズを変更していても固定になる。また、文字だけ大きくなって表示が崩れるのを防ぐ）
- いちいち計算するのがめんどくさいのでデフォルトでは`1px＝0.1rem`です。必要に応じて変更してください。
- SPの文字サイズはどの端末でも同じ見え方になるように`vw`を使用していますが、`custom`のcss変数で切り替え可能です。
- Tailwindとの相性が悪いのでPurge CSSは入っていません。不要な記述は適宜削除かコメントアウトしてください。

### ディレクトリ構造
```scss
.
└── scss
    ├── abstracts             // 共通で使用するための変数や関数
    │   ├── _custom           // カスタムプロパティ
    │   ├── _extend           // extendファイル
    │   ├── _functions        // 関数ファイル
    │   ├── _index            // fowardファイル ※abstractsに新規ファイル追加する場合はこちらにも記述
    │   ├── _mixins           // ミックスインファイル
    │   ├── _svg              // アイコンなどのsvgをbase64に変換したファイル。@extendで読み込んで下さい。
    │   └── _variable         // 変数ファイル。※案件ごとに設定を変更してください。
    ├── base
    │   ├── _default          // htmlタグデフォルトの挙動
    │   └── _general          // 共通で使用するユーティリティークラス
    ├── components            // 共通で使用するコンポーネントスタイル
    │   ├── _c_btn            // ボタンコンポーネント
    │   ├── _u_anima          // フェードインアニメーション※不要の場合削除
    │   └── option            
    |       ├── _c_accordion  // アクセシビリティを考慮したアコーディオンコンポーネント※不要の場合削除
    |       └── _c_modal      // アクセシビリティを考慮したモーダルコンポーネント※不要の場合削除 
    ├── layouts               // ヘッダーフッターなど共通要素のスタイル
    │   ├── _l_footer         // フッター要素
    │   ├── _l_header         // ヘッダー要素
    │   └── _l_main           // メイン要素
    ├── pages                 // 各ページ固有のスタイル
    │   ├── _top
    │   └── _about
    └── style                 // 実際にビルドされるファイル。※ライブラリのcssなど追記する場合はこちらに記述する
```

## JavaScript - typescript

- 頭に`_`が付いていない`js`ファイルをエントリーポイントにビルドします。
- デフォルトでTypescriptをサポートしていますが、ライブラリで型ファイルがない場合など通常のJSも並走可能です。
- jQuery用の型ファイルも入っているので使用する場合はインポートしてください。


## 画像圧縮 - imagemin

- デフォルトで`*.jpg`, `*.jpeg`, `*.png`, `*.gif`, `*.svg` を圧縮します。不要の場合は`.env`の  `VITE_BUILD_IMAGEMIN`を編集してください。
- 圧縮率を変える場合は`vite.config.cjs` を編集してください。
- デフォルトで`*.jpg`, `*.png`をwebPに変換し、ビルド後の拡張子も自動で置き換えます。不要の場合は `.env`の `VITE_BUILD_WEBP`を編集してください。


## 静的アセット

### publicフォルダ
ogp画像などドメイン付きのアドレスで直接指定しているものやファビコンのようにドメイン付きの絶対パスで参照するファイルはviteが使用していいないものと判断しビルドされません。
そのため`public`フォルダにディレクトリ構造ごと入れてください、ディレクトリ構造を保ったままビルドされます。
また、デフォルトではimgフォルダ内の画像はディレクトリ構造を無視して一括で出力されます。

#### 例
`/src/img/tokyo/` `/src/img/osaka/`に格納されているファイルが全て`/htdocs/_assets/img/`直下に出力され、参照先も自動で書き換えられます。

使用していないダミー画像や差し替え前の画像など不要なファイルが納品に紛れ込むリスクを避けることができますが、その反面ビルド後はimgフォルダ内ディレクトリを作ることができません。
ビルド後も画像のディレクトリ構造を保ちたい場合は`/src/img/`ではなく、publicフォルダにビルド時のルートからのディレクトリ構造を保って（先の例の場合は`/_assets/img/tokyo/`　`/_assets/img/osaka/`）入れます。
その際、src内のパスはpublicを参照するように（※ただし`public`の部分は不要なのでその直下からのパスを）記述してください。パスはビルド時に自動で置き換わります。

### 出力ディレクトリの変更

ディレクトリを変更する場合は`.env`の`VITE_ASSETS_PATH`を編集してください。
またsrcの画像フォルダも併せて変更したディレクトリ名のフォルダの中に入れてください。

### アセットパスの変更

アセットのファイルパス設定はデフォルトではルート相対。
相対パスにしたい場合は `.env`の  `VITE_ASSETS_RELATIVE`を編集してください。


## 構文チェック - Stylelint / ESLint / MarkupLint

設定したルールに沿って警告・エラーをコンソールに出力します。

## 注意点

- viteの性質上必ずビルドしたもので最終的な表示確認をすること(`npm run preview`でhtdocsの内容で表示することができます)
- dev環境ではアセットをVite上で読み込むため、srcフォルダ内のパスを参照するように記述してください（ビルド時に正規のパスに置き換わります）
- ただしカスタムdata属性などで静的アセットを指定している場合はその限りではないので、手動で書き換える必要があります。

## 実装予定
- 重い場合のパペッティアの調整
- VRTとaxeの設定ファイルの統合
- WP開発用にゆうじさんのdocker環境マージ
- pugとsassも環境変数で管理
