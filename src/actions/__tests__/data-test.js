import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { GET_DATA_FAILED, GET_DATA_SUCCEEDED, getDataFailed, getDataSucceeded, getDataAsync } from 'actions/data';
import { LOADING_STARTED, LOADING_ENDED } from 'actions/loading';
import { getData } from 'services/data';
import 'services/errors';

jest.mock('services/data');
jest.mock('services/errors');

const mockStore = configureMockStore([thunk]);

describe('data actions', () => {
  describe('getDataSucceeded', () => {
    it('returns a type and the passed string in payload', () => {
      expect(getDataSucceeded('foo')).toEqual({
        type: GET_DATA_SUCCEEDED,
        payload: {
          data: 'foo',
        },
      });
    });
  });

  describe('getDataFailed', () => {
    it('returns a type and the passed err in payload + err prop', () => {
      expect(getDataFailed('foo')).toEqual({
        type: GET_DATA_FAILED,
        payload: {
          errors: ['foo'],
        },
      });
    });
  });

  describe('getDataAsync', () => {
    let store;

    beforeEach(() => {
      store = mockStore({});
      getData.mockImplementation(() => Promise.resolve('data'));
    });

    it('dispatches loadingStarted', () =>
      store.dispatch(getDataAsync()).then(() => {
        expect(store.getActions()).toEqual(expect.arrayContaining([{ type: LOADING_STARTED }]));
      }));

    it('calls getData, then on success it dispatches loadingEnded and getDataSucceeded', () =>
      store.dispatch(getDataAsync()).then(() => {
        expect(store.getActions()).toEqual(
          expect.arrayContaining([{ type: LOADING_ENDED }, expect.objectContaining({ type: GET_DATA_SUCCEEDED })])
        );
      }));

    it('calls getData, on fail it dispatches loadingEnded and getDataFailed', () => {
      getData.mockImplementationOnce(() => Promise.reject(new Error('error')));

      return store.dispatch(getDataAsync()).then(() => {
        expect(store.getActions()).toEqual(
          expect.arrayContaining([{ type: LOADING_ENDED }, expect.objectContaining({ type: GET_DATA_FAILED })])
        );
      });
    });
  });
});
