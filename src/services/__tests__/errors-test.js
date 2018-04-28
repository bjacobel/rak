/* eslint-disable no-underscore-dangle */

import Raven from 'raven-js';

import logToRaven from 'services/errors';
import * as constants from 'src/constants';

jest.mock('constants');
jest.mock('raven-js');

const err = new Error('err');

describe('error logging service', () => {
  beforeEach(() => {
    console.error = jest.fn();
    Raven.config().install.mockClear();
    Raven.captureException.mockClear();
  });

  describe('in production mode', () => {
    beforeEach(() => {
      constants.LOG_ERRORS = true;
    });

    it("sets up Raven if it hasn't been 'installed' yet", () => {
      Raven._isRavenInstalled = false;
      logToRaven(err);
      expect(Raven.config().install).toHaveBeenCalled();
    });

    it('calls config and logs an error to Raven if it has not been set up', () => {
      Raven._isRavenInstalled = false;
      logToRaven(err);
      expect(Raven.config().install).toHaveBeenCalled();
      expect(Raven.captureException).toHaveBeenCalled();
    });

    it('solely logs an error to Raven if it has already been set up', () => {
      Raven._isRavenInstalled = true;
      logToRaven(err);
      expect(Raven.config().install).not.toHaveBeenCalled();
      expect(Raven.captureException).toHaveBeenCalled();
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
      expect(Raven.config().install).not.toHaveBeenCalled();
    });

    it("does not call raven's exception logger", () => {
      logToRaven(err);
      expect(Raven.captureException).not.toHaveBeenCalled();
    });

    it('logs to console', () => {
      logToRaven(err);
      expect(console.error).toHaveBeenCalledWith(err);
    });
  });
});
