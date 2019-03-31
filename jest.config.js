module.exports = {
  notify: false, // waiting for https://github.com/facebook/jest/issues/8036
  setupFilesAfterEnv: ['./jest.setup.js'],
  testURL: 'http://localhost',
};
