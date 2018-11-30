const prettier = require('./.prettierrc');

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'plugin:jest/recommended',
    'plugin:lodash-fp/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  env: {
    browser: true,
  },
  plugins: ['json', 'lodash-fp', 'prettier'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    'prettier/prettier': ['error', prettier],
    'react/forbid-prop-types': [
      'error',
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
