import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  GET_TITLE_FAILED,
  GET_TITLE_SUCCEEDED,
  getTitleFailed,
  getTitleSucceeded,
  getTitleAsync,
} from '../../src/actions/title';
import {
  LOADING_STARTED,
  LOADING_ENDED,
} from '../../src/actions/loading';

jest.mock('../../src/services/title');
import { getTitle } from '../../src/services/title';

const mockStore = configureMockStore([thunk]);

describe('title actions', () => {
  describe('getTitleSucceeded', () => {
    it('returns a type and the passed string in payload', () => {
      expect(getTitleSucceeded('foo')).toEqual({
        type: GET_TITLE_SUCCEEDED,
        payload: {
          title: 'foo',
        },
      });
    });
  });

  describe('getTitleFailed', () => {
    it('returns a type and the passed err in payload + err prop', () => {
      expect(getTitleFailed('foo')).toEqual({
        type: GET_TITLE_FAILED,
        payload: {
          err: 'foo',
        },
        error: true,
      });
    });
  });

  describe('getTitleAsync', () => {
    let store;

    beforeEach(() => {
      store = mockStore({});
      getTitle.mockImplementation(() => Promise.resolve('title'));
    });

    it('dispatches loadingStarted', () => {
      return store.dispatch(getTitleAsync()).then(() => {
        expect(store.getActions()).toEqual(jasmine.arrayContaining([
          { type: LOADING_STARTED },
        ]));
      });
    });

    it('calls getTitle, then on success it dispatches loadingEnded and getTitleSucceeded', () => {
      return store.dispatch(getTitleAsync()).then(() => {
        expect(store.getActions()).toEqual(jasmine.arrayContaining([
          { type: LOADING_ENDED },
          jasmine.objectContaining({ type: GET_TITLE_SUCCEEDED }),
        ]));
      });
    });

    it('calls getTitle, on fail it dispatches loadingEnded and getTitleFailed', () => {
      getTitle.mockImplementationOnce(() => Promise.reject('error'));

      return store.dispatch(getTitleAsync()).then(() => {
        expect(store.getActions()).toEqual(jasmine.arrayContaining([
          { type: LOADING_ENDED },
          jasmine.objectContaining({ type: GET_TITLE_FAILED }),
        ]));
      });
    });
  });
});
