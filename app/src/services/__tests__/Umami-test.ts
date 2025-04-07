import Umami from '../Umami';

const mockTrackAnalyticsConstant = jest.fn().mockReturnValue(false);
jest.mock('constants/index', () => ({
  get TRACK_ANALYTICS() {
    return mockTrackAnalyticsConstant();
  },
}));

describe('Umami Analytics service', () => {
  describe('constructor', () => {
    it('(tries to) load code from Umami', () => {
      document.body.appendChild = jest.fn();
      new Umami(); // eslint-disable-line no-new
      expect(document.body.appendChild).toHaveBeenCalledWith(expect.any(Element));
    });
  });

  describe('when TRACK_ANALYTICS is disabled', () => {
    let analytics: Umami;
    beforeEach(() => {
      analytics = new Umami(); // eslint-disable-line no-new
      // @ts-expect-error assigning mock to window
      window.umami = jest.fn();
    });

    describe('analytics.track', () => {
      it("doesn't do anything", () => {
        analytics.track(() => ({}));
        expect(window.umami.track).not.toHaveBeenCalled();
      });
    });
  });

  describe('when TRACK_ANALYTICS is enabled', () => {
    let analytics: Umami;
    beforeEach(() => {
      mockTrackAnalyticsConstant.mockReturnValueOnce(true);
      analytics = new Umami();
      // @ts-expect-error assigning mock to window
      window.umami = jest.fn(() => ({
        track: jest.fn(),
      }));
    });

    describe('analytics.track', () => {
      it('calls umami.track', () => {
        analytics.track(() => ({}));
        expect(window.umami.track).toHaveBeenCalledWith(expect.any(Function));
      });
    });
  });
});
