module.exports = {
  extends: ["stylelint-config-standard-scss", "stylelint-config-recess-order", "stylelint-config-prettier-scss"],
  rules: {
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["apply", "layer", "responsive", "screen", "tailwind"],
      },
    ],
    "selector-id-pattern": null, // idでkebab-case以外も許容
    "selector-class-pattern": null, // classでkebab-case以外も許容
    "keyframes-name-pattern": null, // keyframesでkebab-case以外も許容
    "scss/at-mixin-pattern": null, // mixinでkebab-case以外も許容
    "scss/dollar-variable-pattern": null, // $変数でkebab-case以外も許容
    "scss/percent-placeholder-pattern": null, // %placeholderでkebab-case以外も許容
    "scss/at-extend-no-missing-placeholder": null, // @extendで%placeholder以外も許容
    "function-url-quotes": ["always", { severity: "warning" }], // url()内が""で囲まれていなくてもwarningで止める
    "number-max-precision": [3, { severity: "warning" }], // 小数点以下3桁以上でもwarningで止める
    "alpha-value-notation": ["number", { severity: "warning" }], // 0.3が30%となっていてもwarningで止める
    "font-family-name-quotes": ["always-where-recommended", { severity: "warning" }], // font-family名のルールが適合していなくてもwarningで止める
    "scss/load-no-partial-leading-underscore": null, //scssファイルの接頭_許可
    "function-name-case": null,
    "scss/at-mixin-argumentless-call-parentheses": null,
    "scss/double-slash-comment-empty-line-before": null,
    "custom-property-pattern": null,
    "property-no-vendor-prefix": [
      true,
      {
        ignoreProperties: ["appearance", "text-size-adjust"],
      }, // autoprefixerで補えるprefixを書いていた場合、エラーとなるが、ignorePropertiesは無視する
    ],
  },
};
