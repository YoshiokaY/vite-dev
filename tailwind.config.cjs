/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx,html,pug}"],
  theme: {
    fontSize: {
      sm: "1.4rem",
      base: "1.6rem",
      lg: "1.8rem",
      xl: "2rem",
    },
    extend: {
      // 変数などを設定できる。
      // 呼び出す時は「text-primary」や「bg-primary」みたいな感じで使える。
      colors: {
        txt: "#333",
        reversal: "#fff",
        prime: "#0a1284",
        second: "#ffe17b",
        third: "#333",
        gray: "#F5F5F7",
        body: "#FFC9FB",
      },
      backgroundImage: {},
    },
    spacing: {
      ...Object.fromEntries([...Array(401)].map((_, i) => i).map((num) => [num, `${num}rem`])),
    },
  },
  plugins: [],
};
