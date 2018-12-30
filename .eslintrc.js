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
  globals: {
    VERSION: true,
  },
  plugins: ['json'],
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
    'prettier/prettier': 'error',
    'react/forbid-prop-types': [
      'error',
      {
        forbid: ['match'],
      },
    ],
    'react/prop-types': [
      'error',
      {
        ignore: ['classes', 'className', 'style', 'theme'],
      },
    ],
  },
  overrides: [
    {
      files: ['scripts/**/*.js'],
      env: {
        node: true,
      },
      rules: {
        'no-console': 'off',
      },
    },
  ],
};
