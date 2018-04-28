import errors from 'reducers/errors';
import { GET_DATA_FAILED } from 'actions/data';

describe('errors reducer', () => {
  describe(`action type ${GET_DATA_FAILED}`, () => {
    it('returns the error passed in an errors array', () => {
      expect(
        errors([], {
          type: GET_DATA_FAILED,
          payload: {
            errors: ['foo'],
          },
        })
      ).toEqual(['foo']);
    });

    it('joins the new error with existing errors', () => {
      expect(
        errors(['fizz', 'baz'], {
          type: GET_DATA_FAILED,
          payload: {
            errors: ['foo'],
          },
        })
      ).toEqual(['foo', 'fizz', 'baz']);
    });

    it('can accept multiple errors', () => {
      expect(
        errors(['fizz', 'baz'], {
          type: GET_DATA_FAILED,
          payload: {
            errors: ['foo', 'bar'],
          },
        })
      ).toEqual(['foo', 'bar', 'fizz', 'baz']);
    });
  });

  describe('by default', () => {
    it('does nothing', () => {
      expect(errors({}, { type: 'foo' })).toEqual({});
    });

    it('preserves passed state', () => {
      const state = { foo: 'bar' };
      expect(errors(state, { type: 'foo' })).toEqual(state);
    });
  });
});
