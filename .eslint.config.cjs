const js = require("@eslint/js");
const prettier = require("eslint-config-prettier");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    ignores: ["**/*.config.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    parserOptions: {
      sourceType: "module",
    },
    rules: {
      "no-console": "warn",
    },
  },
  prettier,
];
