const cssnext = require('postcss-cssnext');

module.exports = {
  plugins: [
    cssnext({
      browsers: [
        'last 2 versions',
        'not ie <= 10',
      ],
    }),
  ],
};
