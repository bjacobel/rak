// eslint-disable-next-line
export function BrowserMicroSentryClient() {}

jest.spyOn(BrowserMicroSentryClient.prototype, 'constructor');
BrowserMicroSentryClient.prototype.setExtra = jest.fn();
BrowserMicroSentryClient.prototype.report = jest.fn();
