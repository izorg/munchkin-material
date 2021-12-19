module.exports = {
  "**/*.{css,html,tsx}": "stylelint --cache --fix",
  "**/*.{js,json,jsx,mjs,ts,tsx}":
    "eslint --cache --ext=.js,.json,.jsx,.mjs --fix",
  "**/*.{md,yml}": "prettier --write",
};
