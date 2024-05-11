import GA from '../GA';

const mockTrackAnalyticsConstant = jest.fn().mockReturnValue(false);
jest.mock('constants/index', () => ({
  get TRACK_ANALYTICS() {
    return mockTrackAnalyticsConstant();
  },
}));

describe('Google Analytics service', () => {
  describe('constructor', () => {
    it('(tries to) load code from google', () => {
      document.body.appendChild = jest.fn();
      new GA(); // eslint-disable-line no-new
      expect(document.body.appendChild).toHaveBeenCalledWith(expect.any(Element));
    });

    it('puts stuff on window.ga', () => {
      new GA(); // eslint-disable-line no-new
      expect(window.ga).toBeDefined();
    });
  });

  describe('when TRACK_ANALYTICS is disabled', () => {
    beforeEach(() => {
      new GA(); // eslint-disable-line no-new
      // @ts-expect-error assigning mock to window
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

    describe('Analytics.set()', () => {
      it("doesn't do anything", () => {
        expect(window.ga).not.toHaveBeenCalled();
      });
    });
  });

  describe('when TRACK_ANALYTICS is enabled', () => {
    let analytics: GA;
    beforeEach(() => {
      mockTrackAnalyticsConstant.mockReturnValueOnce(true);
      analytics = new GA();
      // @ts-expect-error assigning mock to window
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

    describe('Analytics.set()', () => {
      it("calls ga('set', attr, value)", () => {
        analytics.set('attr', 'value');
        expect(window.ga).toHaveBeenCalledWith('set', 'attr', 'value');
      });
    });
  });
});
