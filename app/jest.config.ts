import path from 'path';

const esmDependencies = ['wouter', '@micro-sentry/core', '@micro-sentry/breadcrumbs-plugin'];

export default {
  collectCoverageFrom: ['src/**/*.{js,ts,jsx}', '!src/**/*.css.ts'],
  coveragePathIgnorePatterns: ['polyfills.js', 'testing/.*.js'],
  moduleDirectories: [__dirname, 'node_modules', 'src'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  transformIgnorePatterns: [`/node_modules/(?!(${esmDependencies.join('|')}))`],
  transform: { '\\.[jt]sx?$': ['babel-jest', { configFile: path.join(__dirname, '.babelrc.js'), rootMode: 'upward' }] },
};
