import { init, captureException, configureScope } from '@sentry/browser';

import logToRaven from 'services/errors';
import * as constants from 'src/constants';

jest.mock('constants');
jest.mock('@sentry/browser');

const err = new Error('err');

describe('error logging service', () => {
  beforeEach(() => {
    console.error = jest.fn();
    init.mockReset();
    captureException.mockReset();
    configureScope.mockReset();
  });

  describe('in production mode', () => {
    beforeEach(() => {
      constants.LOG_ERRORS = true;
    });

    it("sets up Raven if it hasn't been 'installed' yet", () => {
      logToRaven(err);
      expect(init).toHaveBeenCalled();
    });

    it('logs an error to Raven', () => {
      logToRaven(err);
      expect(captureException).toHaveBeenCalled();
    });

    it('can set extra context in scope', () => {
      const context = { foo: 'bar' };
      logToRaven(err, context);
      expect(configureScope).toHaveBeenCalled();
    });

    it('logs the error to the console too', () => {
      logToRaven(err);
      expect(console.error).toHaveBeenCalledWith(err);
    });
  });

  describe('in development mode', () => {
    beforeEach(() => {
      constants.LOG_ERRORS = false;
    });

    it("does not call Raven initialize, even if it isn't installed", () => {
      logToRaven(err);
      expect(init).not.toHaveBeenCalled();
    });

    it("does not call raven's exception logger", () => {
      logToRaven(err);
      expect(captureException).not.toHaveBeenCalled();
    });

    it('logs to console', () => {
      logToRaven(err);
      expect(console.error).toHaveBeenCalledWith(err);
    });
  });
});
