const { version } = require('./package');

const dev = process.env.NODE_ENV === 'development';
const prod = process.env.NODE_ENV === 'production';
const test = process.env.NODE_ENV === 'test';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        loose: true,
        modules: test ? 'auto' : false,
        useBuiltIns: 'usage',
      },
    ],
    [
      '@babel/preset-react',
      {
        development: dev,
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: false,
        useESModules: !test,
      },
    ],
    'babel-plugin-react-intl',
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
        'mdi-material-ui': {
          transform: (importName) => `mdi-material-ui/${importName}`,
          preventFullImport: true,
        },
      },
    ],
    prod && 'babel-plugin-transform-react-remove-prop-types',
  ].filter(Boolean),
};
