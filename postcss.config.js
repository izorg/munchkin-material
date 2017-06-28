module.exports = {
  plugins: {
    'postcss-cssnext': {
      browsers: [
        'last 2 versions',
        'chrome >= 30',
        'not ie <= 10',
      ],
    },
  },
};
