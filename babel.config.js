const { version } = require('./package');

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

  '@material-ui/lab': {
    transform: (member) => `@material-ui/lab/${member}`,
    preventFullImport: true,
  },

  '@material-ui/icons': {
    transform: (member) => `@material-ui/icons/${member}`,
    preventFullImport: true,
  },

  'lodash/fp': {
    transform: (member) => `lodash/fp/${member}`,
    preventFullImport: true,
  },

  'mdi-material-ui': {
    transform: (member) => `mdi-material-ui/${member}`,
    preventFullImport: true,
  },

  'react-transition-group': {
    transform: (member) => `react-transition-group/${member}`,
    preventFullImport: true,
  },

  recompose: {
    transform: (member) => `recompose/${member}`,
    preventFullImport: true,
  },
};

const prod = process.env.NODE_ENV === 'production';
const i18n = process.env.BABEL_ENV === 'i18n';
const test = process.env.BABEL_ENV === 'test';
const modules = test ? 'auto' : false;

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        include: ['es6.object.set-prototype-of'], // for react-hot-loader on Android 4.4
        loose: true,
        modules,
        useBuiltIns: 'entry',
      },
    ],
    [
      '@babel/preset-react',
      {
        development: !prod,
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: false,
        useESModules: modules,
      },
    ],
    '@babel/plugin-syntax-dynamic-import',
    i18n && [
      'babel-plugin-react-intl',
      {
        messagesDir: './messages/',
      },
    ],
    prod && [
      'babel-plugin-react-remove-properties',
      {
        properties: ['data-screenshots'],
      },
    ],
    [
      'babel-plugin-transform-define',
      {
        VERSION: version,
      },
    ],
    ['babel-plugin-transform-imports', transform],
    prod && 'babel-plugin-transform-react-remove-prop-types',
    'react-hot-loader/babel',
  ].filter(Boolean),
};
