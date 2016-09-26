import title from '../../src/reducers/title';
import {
  GET_TITLE_FAILED,
  GET_TITLE_SUCCEEDED,
} from '../../src/actions/title';

describe('title reducer', () => {
  describe(`action type ${GET_TITLE_SUCCEEDED}`, () => {
    it('returns the title and no errors', () => {
      expect(title({}, {
        type: GET_TITLE_SUCCEEDED,
        payload: {
          title: 'foo',
        },
      })).toEqual({
        content: 'foo',
        error: false,
      });
    });
  });

  describe(`action type ${GET_TITLE_FAILED}`, () => {
    it('returns an empty title and the error passed', () => {
      expect(title({}, {
        type: GET_TITLE_FAILED,
        payload: {
          error: 'foo',
        },
      })).toEqual({
        content: null,
        error: 'foo',
      });
    });
  });

  describe('by default', () => {
    it('does nothing', () => {
      expect(title({}, { type: 'foo' })).toEqual({});
    });

    it('preserves passed state', () => {
      const state = { foo: 'bar' };
      expect(title(state, { type: 'foo' })).toEqual(state);
    });
  });
});
