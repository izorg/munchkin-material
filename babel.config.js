const transform = {
  '@material-ui/core': {
    transform: (member) => {
      if (
        [
          'createMuiTheme',
          'MuiThemeProvider',
          'withStyles',
          'withTheme',
        ].includes(member)
      ) {
        return `@material-ui/core/styles/${member}`;
      }

      return `@material-ui/core/${member}`;
    },
    preventFullImport: true,
  },

  'lodash/fp': {
    transform: (member) => `lodash/fp/${member}`,
    preventFullImport: true,
  },

  recompose: {
    transform: (member) => `recompose/${member}`,
    preventFullImport: true,
  },
};

module.exports = {
  presets: ['@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-modules-commonjs',
    ['babel-plugin-transform-imports', transform],
    'babel-plugin-version-inline',
    'react-hot-loader/babel',
  ],
  env: {
    production: {
      plugins: [
        '@babel/plugin-transform-react-constant-elements',
        '@babel/plugin-transform-react-inline-elements',
        ['@babel/plugin-transform-runtime', { corejs: 2 }],
        [
          'babel-plugin-react-remove-properties',
          { properties: ['data-screenshots'] },
        ],
        'babel-plugin-transform-react-remove-prop-types',
      ],
    },
    test: {
      plugins: ['babel-plugin-dynamic-import-node'],
    },
    i18n: {
      plugins: [['babel-plugin-react-intl', { messagesDir: './messages/' }]],
    },
  },
};
