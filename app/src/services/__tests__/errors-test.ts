import { BrowserMicroSentryClient } from '@micro-sentry/browser';

import logToRaven from '../errors';

jest.mock('@micro-sentry/browser');

const mockLogErrorsConstant = jest.fn().mockReturnValue(false);
jest.mock('constants/index', () => ({
  get LOG_ERRORS() {
    return mockLogErrorsConstant();
  },
}));

const err = new Error('err');

describe('error logging service', () => {
  beforeEach(() => {
    console.error = jest.fn();
    jest.mocked(BrowserMicroSentryClient.prototype.report).mockReset();
  });
  describe('in production mode', () => {
    beforeEach(() => {
      mockLogErrorsConstant.mockReturnValue(true);
    });

    it('logs an error to Raven', () => {
      logToRaven(err);
      expect(BrowserMicroSentryClient.prototype.report).toHaveBeenCalled();
    });

    it('can set extra context in scope', () => {
      const context = { foo: 'bar' };
      logToRaven(err, context);
      expect(BrowserMicroSentryClient.prototype.setExtra).toHaveBeenCalled();
    });

    it('logs the error to the console too', () => {
      logToRaven(err);
      expect(console.error).toHaveBeenCalledWith(err);
    });
  });

  describe('in development mode', () => {
    beforeEach(() => {
      mockLogErrorsConstant.mockReturnValue(false);
    });

    it("does not call raven's exception logger", () => {
      logToRaven(err);
      expect(BrowserMicroSentryClient.prototype.report).not.toHaveBeenCalled();
    });

    it('logs to console', () => {
      logToRaven(err);
      expect(console.error).toHaveBeenCalledWith(err);
    });
  });
});
