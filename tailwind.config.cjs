/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx,html,pug}"],
  theme: {
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
    },
    extend: {
      // 変数などを設定できる。
      // 呼び出す時は「text-primary」や「bg-primary」みたいな感じで使える。
      colors: {
        txt: "#333",
        reversal: "#fff",
        prime: "#0A1284",
        second: "#FFE17B",
        gray: "#F5F5F7",
        body: "#FFC9FB",
        body2: "#82F0FE",
      },
      backgroundImage: {
        mv: "url('/hajimete-fes/images/mv_bg.jpg')",
      },
    },
    spacing: {
      ...Object.fromEntries([...Array(401)].map((_, i) => i).map((num) => [num, `${num}rem`])),
    },
  },
  plugins: [],
};
