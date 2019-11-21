module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['polyfills.js'],
  moduleNameMapper: {
    '^.+\\.css$': '<rootDir>/__mocks__/stylesheets.js',
  },
  moduleDirectories: [__dirname, 'node_modules', 'src'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['./jest.setup.js'],
  testURL: 'http://localhost',
};
