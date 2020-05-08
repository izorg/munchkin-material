const { version } = require('./package');

const prod = process.env.NODE_ENV === 'production';
const i18n = process.env.NODE_ENV === 'i18n';
const test = process.env.NODE_ENV === 'test';
const modules = test ? 'auto' : false;

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        loose: true,
        modules,
        useBuiltIns: 'usage',
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
    [
      'babel-plugin-transform-imports',
      {
        'lodash/fp': {
          transform: (importName) => `lodash/fp/${importName}`,
          preventFullImport: true,
        },
        'mdi-material-ui': {
          transform: (importName) => `mdi-material-ui/${importName}`,
          preventFullImport: true,
        },
      },
    ],
    prod && 'babel-plugin-transform-react-remove-prop-types',
  ].filter(Boolean),
};
