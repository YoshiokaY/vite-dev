import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";

export default tseslint.config(
  {
    // このオブジェクトは ignores プロパティだけにする必要あり
    ignores: ["*.cjs", "*.config.*", "**/plugins/**", "**/htdocs/**", "**/check/**"], // ESLint のチェック対象外 (node_modules と .git はデフォルトで対象外)
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
        ...globals.es2020,
        ...globals.jquery,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-console": "warn",
    },
  },
  // Shareable Configs を有効化
  eslint.configs.recommended,
  ...tseslint.configs.recommended, // strict は recommended よりも厳しめな設定
  jsxA11yPlugin.flatConfigs.recommended,
  prettierConfig
);
