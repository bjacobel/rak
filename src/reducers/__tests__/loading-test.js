import loading from 'reducers/loading';
import { LOADING_ENDED, LOADING_STARTED } from 'actions/loading';

describe('loading reducer', () => {
  describe(`action type ${LOADING_STARTED}`, () => {
    it('sets loading state to true', () => {
      expect(loading(false, { type: LOADING_STARTED })).toEqual(true);
    });
  });

  describe(`action type ${LOADING_ENDED}`, () => {
    it('sets loading state to false', () => {
      expect(loading(true, { type: LOADING_ENDED })).toEqual(false);
    });
  });

  describe('by default', () => {
    it('does nothing', () => {
      expect(loading({}, { type: 'foo' })).toEqual({});
    });

    it('preserves passed state', () => {
      const state = false;
      expect(loading(state, { type: 'foo' })).toEqual(state);
    });
  });
});
