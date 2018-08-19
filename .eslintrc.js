const prettier = require('./.prettierrc');

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:jest/recommended', 'prettier'],
  env: {
    browser: true,
  },
  plugins: ['json', 'prettier'],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'prettier/prettier': ['error', prettier],
    'react/forbid-prop-types': [true, { forbid: ['match'] }],
    'react/jsx-wrap-multilines': 'off',
    'react/prop-types': [
      'error',
      { ignore: ['classes', 'className', 'theme'] },
    ],
  },
};
