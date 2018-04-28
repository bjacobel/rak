import Analytics from 'services/Analytics';
import * as constants from 'src/constants';

jest.mock('constants');

describe('Analytics service', () => {
  describe('constructor', () => {
    it('(tries to) load code from google', () => {
      document.body.appendChild = jest.fn();
      new Analytics(); // eslint-disable-line no-new
      expect(document.body.appendChild).toHaveBeenCalledWith(expect.any(Element));
    });

    it('puts stuff on window.ga', () => {
      new Analytics(); // eslint-disable-line no-new
      expect(window.ga).toBeDefined();
    });
  });

  describe('when TRACK_ANALYTICS is disabled', () => {
    beforeEach(() => {
      new Analytics(); // eslint-disable-line no-new
      window.ga = jest.fn();
    });

    describe('Analytics.pageview()', () => {
      it("doesn't do anything", () => {
        expect(window.ga).not.toHaveBeenCalled();
      });
    });

    describe('Analytics.event()', () => {
      it("doesn't do anything", () => {
        expect(window.ga).not.toHaveBeenCalled();
      });
    });
  });

  describe('when TRACK_ANALYTICS is enabled', () => {
    let analytics;

    beforeEach(() => {
      constants.TRACK_ANALYTICS = true;
      analytics = new Analytics();
      window.ga = jest.fn();
    });

    describe('Analytics.pageview()', () => {
      it("calls ga('send', 'pageview')", () => {
        analytics.pageview();
        expect(window.ga).toHaveBeenCalledWith('send', 'pageview');
      });
    });

    describe('Analytics.event()', () => {
      it("calls ga('send', 'event', ...data)", () => {
        const category = 'category';
        const action = 'action';
        const value = 5;

        analytics.event(category, action, value);
        expect(window.ga).toHaveBeenCalledWith('send', 'event', category, action, value);
      });
    });
  });
});
