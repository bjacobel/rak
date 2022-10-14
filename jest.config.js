module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['polyfills.js'],
  moduleNameMapper: {
    '^.+\\.css$': '<rootDir>/__mocks__/stylesheets.js',
  },
  moduleDirectories: [__dirname, 'node_modules', 'src'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
};
