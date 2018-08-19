module.exports = {
  presets: ['@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-modules-commonjs',
    'lodash',
    'react-hot-loader/babel',
    'version-inline',
  ],
  env: {
    production: {
      plugins: [
        '@babel/plugin-transform-react-constant-elements',
        '@babel/plugin-transform-react-inline-elements',
        ['@babel/plugin-transform-runtime', { corejs: 2 }],
        ['react-remove-properties', { properties: ['data-screenshots'] }],
        'transform-react-remove-prop-types',
      ],
    },
    test: {
      plugins: ['dynamic-import-node'],
    },
    i18n: {
      plugins: [['react-intl', { messagesDir: './messages/' }]],
    },
  },
};
