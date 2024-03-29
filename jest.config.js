module.exports = {
  collectCoverageFrom: ['src/**/*.{js,ts,jsx}', '!src/**/*.css.ts'],
  coveragePathIgnorePatterns: ['polyfills.js', 'testing/.*.js'],
  moduleDirectories: [__dirname, 'node_modules', 'src'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
};
