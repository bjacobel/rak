import { combineReducers } from 'redux';

import data from 'reducers/data';
import errors from 'reducers/errors';
import loading from 'reducers/loading';

jest.mock('redux');
jest.mock('reducers/data');
jest.mock('reducers/errors');
jest.mock('reducers/loading');

describe('reducer index', () => {
  it('combines all my reducers', () => {
    // neccessary because the combining is done on export
    require('reducers'); // eslint-disable-line global-require

    expect(combineReducers).lastCalledWith({ data, errors, loading });
  });
});
