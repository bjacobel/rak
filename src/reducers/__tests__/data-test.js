import data from 'reducers/data';
import { GET_DATA_SUCCEEDED } from 'actions/data';

describe('data reducer', () => {
  describe(`action type ${GET_DATA_SUCCEEDED}`, () => {
    it('returns the data and no errors', () => {
      expect(
        data(
          {},
          {
            type: GET_DATA_SUCCEEDED,
            payload: {
              data: {
                text: 'foo',
              },
            },
          }
        )
      ).toEqual({ text: 'foo' });
    });
  });

  describe('by default', () => {
    it('does nothing', () => {
      expect(data({}, { type: 'foo' })).toEqual({});
    });

    it('preserves passed state', () => {
      const state = { foo: 'bar' };
      expect(data(state, { type: 'foo' })).toEqual(state);
    });
  });
});
