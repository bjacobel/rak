import { loadingStarted, loadingEnded, LOADING_STARTED, LOADING_ENDED } from 'actions/loading';

describe('loading actions', () => {
  describe('loadingStarted', () => {
    it('returns an object with the correct type', () => {
      expect(loadingStarted()).toEqual({
        type: LOADING_STARTED,
      });
    });
  });

  describe('loadingEnded', () => {
    it('returns an object with the correct type', () => {
      expect(loadingEnded()).toEqual({
        type: LOADING_ENDED,
      });
    });
  });
});
