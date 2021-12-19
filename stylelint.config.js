module.exports = {
  extends: [
    "stylelint-config-html/html",
    "stylelint-config-standard",
    "stylelint-prettier/recommended",
  ],
  overrides: [
    {
      customSyntax: "@stylelint/postcss-css-in-js",
      files: ["**/*.{js,ts,tsx}"],
    },
  ],
  plugins: ["stylelint-order"],
  rules: {
    "order/properties-alphabetical-order": true,
  },
};
