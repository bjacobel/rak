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
  });
  describe('in production mode', () => {
    beforeEach(() => {
      mockLogErrorsConstant.mockReturnValue(true);
    });

    it("sets up Raven if it hasn't been 'installed' yet", () => {
      logToRaven(err);
      expect(BrowserMicroSentryClient).toHaveBeenCalled();
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

    it("does not call Raven initialize, even if it isn't installed", () => {
      logToRaven(err);
      expect(BrowserMicroSentryClient).not.toHaveBeenCalled();
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
