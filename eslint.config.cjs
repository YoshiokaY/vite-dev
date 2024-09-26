const prettier = require("eslint-config-prettier");

module.exports = [
  {
    files: ["**/*.js"],
    ignores: ["**/*.config.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        browser: true,
        node: true,
        commonjs: true,
        jquery: true,
      },
      parserOptions: {
        sourceType: "module",
      },
    },
    rules: {
      "no-console": "warn",
    },
  },
  prettier,
];
