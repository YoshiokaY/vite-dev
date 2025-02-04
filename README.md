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
npx playwright install
```

## 各コマンド
### 開発
```sh
npm start
```
http://localhost:5173

### ビルド
```sh
npm run build
```

### プレビュー
```sh
npm run preview
```
http://localhost:4173

### チェック
#### 更新した場合
```sh
npm run check:update
```
#### 通常
```sh
npm run check
```
#### レポート
```sh
npm run report
```


## 使い方
1. `.env`を編集して案件ごとのディレクトリや圧縮などの設定を変更します。
1. `src/scss/abstracts/_variables.scss`を編集して案件ごとの色やフォントの設定を変更します。
1. `src/pug/_base/_common.pug`を編集して、案件ごとの共通要素を入力します。
1. `src/pug/index.pug`、`src/scss/style.scss`、`src/ts/app.js`またはその読み込みファイルを編集します。（以下ページごとに繰り返し）
1. `check.config.ts`を編集して案件ごとのチェック設定を入力し、チェック実行します。（以下、エラーがなくなるまで繰り返し）


## 機能

- HTML
  - [Pug](https://pugjs.org/api/getting-started.html)
    参考 URL：https://zenn.dev/yend724/articles/20220408-tfq16buha8ctdzp7#pug%E3%82%92%E4%BD%BF%E3%81%88%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B
- CSS
  - [Sass](https://sass-lang.com/) ([dart-sass](https://github.com/sass/dart-sass))
  参考 URL：https://zenn.dev/sutobu000/articles/fef3959195cda5
  - [PostCSS](https://postcss.org/)
  - [TailwindCSS](https://tailwindcss.com/)
  - [Autoprefixer](https://github.com/postcss/autoprefixer)
- image
  - [imagemin](https://github.com/imagemin/imagemin)
  - [webP](https://github.com/rei990/vite-plugin-webp-and-path)
- lint
  - [Stylelint](https://stylelint.io/)
  - [ESLint](https://eslint.org/)
  - [Markuplint](https://markuplint.dev/ja/)
  - [Prettier](https://prettier.io/)
- check
  - [playwright](https://playwright.dev/)
  - [Axe](https://www.deque.com/axe/)


## HTML - Pug

- 頭に`_`が付いていないPugファイルをエントリーポイントにビルドします。
- 従来通りpugおよびhtmlでの記述をサポートしていますが、ejsや本来のjsxには今のところ対応していません。
- また画像などアセットへのパスはsrc内でのパスを記述することで、ビルド時に自動で実際のパスへ置き換わります。
- pugのテンプレート機能を使用しているので`src/pug/_base/_common.pug`及び各ページの`_contents.pug`ファイルを編集することでヘッダー＆フッターなどの共通パーツや各ページのheadタグなどが自動で出力されます。

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
- 従来通りDart Sassでの記述をサポートしています。
- Tailwindをサポートしていますので、sassと並行で活用してください。
- 色や文字サイズなどの変数は`src/scss/abstracts/_variables.scss`で設定した値をSassとTailwindの両方で使用できるようになっていますので案件ごとに設定してください。※Tailwind4.0に伴い、@themeに追加することで利用可能。
- glob記法をサポートしているので、各scssファイルの一括読み込みや除外が可能です。
- リセットスタイルは従来のものからアクセシビリティが考慮された`@acab/reset.css`に変更しています。※Tailwind4.0に伴いレイヤー指定する必要があるためローカルファイルの読み込みに変更。
- アクセシビリティ担保のためサイズ指定には`rem`を使用しています。（`px`だとブラウザ設定で文字サイズを変更していても固定になってしまう。また、文字だけ大きくなって表示が崩れるため）
- いちいち計算するのがめんどくさいのでデフォルトでは`1px＝0.1rem`です。必要に応じて変更してください。
- SPの文字サイズはデフォルトで`rem`を使用していますがどの端末でも同じ見え方にしたい場合は`src/scss/abstracts/_variables.scss`の`$spFontVw`を`"true"`にしてください。
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
    |       ├── _c_modal      // アクセシビリティを考慮したモーダルコンポーネント※不要の場合削除 
    |       └── _c_tab        // アクセシビリティを考慮したタブコンポーネント※不要の場合削除 
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

### ディレクトリ構造
```js
.
└── ts
    ├── class
    │   ├── Accordion.ts    // アクセシビリティを考慮したアコーディオン
    │   ├── Animation.ts    // 交差オブサーバーを使用したフェードインアニメーション
    │   ├── Hamburger.ts    // アクセシビリティを考慮したハンバーガーメニュー
    │   ├── Modal.ts        // アクセシビリティを考慮したモーダル
    │   └── Tab.ts          // アクセシビリティを考慮したタブ
    ├── utlils
    │   └── utils.ts        // サニタイズなどのユーティリティスクリプト
    └── app.js              // 実際にビルドされるjs
```


## 画像圧縮 - imagemin
- デフォルトで`*.jpg`, `*.jpeg`, `*.png`, `*.gif`, `*.svg` を圧縮します。不要の場合は`.env`の`VITE_BUILD_IMAGEMIN`を`false`に設定してください。
- 圧縮率を変える場合は`vite.config.cjs` を編集してください。

### webP変換
- `*.jpg`, `*.png`ファイルをwebPに変換し、ビルド後の拡張子も自動で置き換えます。不要の場合は`.env`の`VITE_BUILD_WEBP`を`false`に設定してください。
※現状では外部ファイルなど絶対パスで記述しているパスも全て変換してしまうため、運用面でのフォローが必要です。


## publicフォルダ
ogp画像などドメイン付きの絶対パスで指定しているものやdata属性に入れてjsで表示させているような画像はviteが使用していないものと判断してビルドされません。
そのため`public`フォルダに本番と同じディレクトリ構造で格納してください。
参照する際は`public`の部分は不要なのでその直下からのパスを記述してください。

### 画像フォルダのディレクトリ構造を保つ方法
デフォルトではimgフォルダ内の画像はディレクトリ構造を無視して一括で出力されます。

#### 例
`/src/img/tokyo/` `/src/img/osaka/`に格納されているファイルが全て`/htdocs/_assets/img/`直下に出力され、参照先も自動で書き換えられます。

使用していないダミー画像や差し替え前の画像など不要なファイルが納品に紛れ込むリスクを避けることができますが、その反面ビルド後はimgフォルダ内ディレクトリを作ることができません。
ビルド後も画像のディレクトリ構造を保ちたい場合は`/src/img/`ではなく、publicフォルダに本番と同じディレクトリ構造で格納（先の例の場合は`/_assets/img/tokyo/`　`/_assets/img/osaka/`）します。
その際、src内のパスはpublicを参照するように（※ただし`public`の部分は不要なのでその直下からのパスを）記述してください。


## ビルド
### プロジェクトルートの変更
ドメイン配下の下層ディレクトリがプロジェクトルートとなる案件の場合は、`.env`の`VITE_ROOT_PATH`に記述してください。

### アセットディレクトリの変更
アセットのディレクトリ名を変更する場合は`.env`の`VITE_ASSETS_PATH`を編集してください。

### アセットパスの変更
アセットの参照ファイルの設定はデフォルトではルート相対です。
相対パスにしたい場合は `.env`の  `VITE_ASSETS_RELATIVE`を`false`に変更してください。

### ソースコードの圧縮
デフォルトではcss、js、htmlが圧縮されますが不要の場合は`.env`の`VITE_BUILD_MINIFY`を`false`に変更してください。


## 構文チェック - Stylelint / ESLint / MarkupLint
設定したルールに沿って警告・エラーをコンソールに出力します。


## E2Eテスト - playwright / axe 
playwrightを使用した自動テストを実行します。
チェック項目の設定は`check.config.ts`で行います。

### テスト項目
- コンソールエラーチェック
- アクセシビリティチェック
- ピクセルパーフェクトチェック
- ビジュアルリグレッションテスト

### アクセシビリティチェック
`check.config.ts`でチェックのレベルを設定できるほか、除外したいルールを設定できます。
※JIS:X8341-3:2016はWCAG2.0相当になります

### ピクセルパーフェクトチェック
`check/design`にデザイン画像を格納してください。
その際、各デザイン画像の名前は`check.config.ts`で設定したページ名と合わせてください。

### ビジュアルリグレッションテスト
前回と今回の画面差分を検出することで、意図しない表示変更がないか確認できます。
差分があって然る場合は下記コマンドでクリーンショットを更新します。
```sh
npm run check:update
```


## 注意点
- viteの性質上必ずビルドしたもので最終的な表示確認をすること(`npm run preview`でhtdocsの内容で表示することができます)
- dev環境ではアセットをVite上で読み込むため、srcフォルダ内のパスを参照するように記述してください（ビルド時に正規のパスに置き換わります）
- ただしカスタムdata属性などで静的アセットを指定している場合はその限りではないので、手動で書き換える必要があります。


## 更新履歴

### 0.5.0 (2024-04)

- vite 開発環境公開

### 1.0.0 (2024-08)

- `.env` で、案件ごとの設定を変更できるように改修
- `_variables.scss`でsassとtailwindの変数を一括変更できるように改修
- ハンバーガーメニューコンポーネント追加
- タブコンポーネント追加
- フェードインアニメーション追加
- その他軽微なFB対応

### 1.5.0 (2024-10)

- `Axe` によるアクセシビリティチェックを実装
- `playwright` によるコンソールエラーチェックを実装
- `playwright` によるVRTとピクセルパーフェクトチェックを実装
- その他軽微なFB対応

### 1.5.5 (2024-10)

- webp変換の除外ルール
- GitHubActionでeslintとmarkuplintの自動チェック
- その他軽微なFB対応

### 1.8.0β (2025-02)

- Tailwind4.0にアップデート
- 上記アップデートに伴い変数をcss側で追加できるように変更
- 上記アップデートに伴いautoprefixerからLightningCSSに変更
- 上記アップデートに伴いreset.cssをローカルファイルの読み込みに変更

## 実装予定
- WP開発用にゆうじさんのdocker環境マージ
