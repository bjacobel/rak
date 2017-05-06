const ravenMock = jest.genMockFromModule('raven-js');

module.exports = Object.assign({}, ravenMock, {
  config: jest.fn(() => ravenMock),
});
