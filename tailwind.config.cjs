/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx,html,pug}"],
  theme: {
    extend: {
      // 変数などを設定できる。
      // 呼び出す時は「text-primary」や「bg-primary」みたいな感じで使える。
      // css変数にすることでsass側と統一
      colors: {
        txt: "var(--color-txt)",
        reversal: "var(--color-reversal)",
        prime: "var(--color-prime)",
        second: "var(--color-second)",
        third: "var(--color-third)",
        gray: "var(--color-gray)",
        body: "var(--color-body)",
        highlight: "var(--color-highlight)",
      },
      fontSize: {
        // css変数にすることでsass側と統一（sp時に可変サイズにする）
        h1: "var(--font-size-heading-1)",
        h2: "var(--font-size-heading-2)",
        h3: "var(--font-size-heading-3)",
        h4: "var(--font-size-heading-4)",
        h5: "var(--font-size-heading-5)",
        xl: "var(--font-size-large-2)",
        lg: "var(--font-size-large-1)",
        base: "var(--font-size-base)",
        sm: "var(--font-size-small-1)",
        xs: "var(--font-size-small-2)",
      },
      fontFamily: {
        // Mont: "Montserrat",
      },
      backgroundImage: {
        // normal: "url('/img/common/bg_img001.jpg')",
        // accent: "url('/img/common/bg_img002.jpg')",
      },
    },
    spacing: {
      ...Object.fromEntries([...Array(401)].map((_, i) => i).map((num) => [num, `${num}rem`])),
    },
  },
  // corePlugins: {
  //   preflight: false, // falseでリセットCSS無効化
  // },
  // important: "", // セレクタを記述することでTailwindのスタイルをそのセレクタ内に限定する
  plugins: [],
};
