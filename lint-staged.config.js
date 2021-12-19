module.exports = {
  "**/*.{css,html,js,ts,tsx}": "stylelint --cache --fix",
  "**/*.{html,md,yml}": "prettier --write",
  "**/*.{js,json,mjs,ts,tsx}": "eslint --cache --fix",
};
