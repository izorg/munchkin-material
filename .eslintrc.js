const prettier = require('./.prettierrc');

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:jest/recommended', 'prettier'],
  env: {
    browser: true,
  },
  plugins: ['json', 'prettier'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'prettier/prettier': ['error', prettier],
    'react/forbid-prop-types': [
      true,
      {
        forbid: ['match'],
      },
    ],
    'react/prop-types': [
      'error',
      {
        ignore: ['classes', 'className', 'theme'],
      },
    ],
  },
};
