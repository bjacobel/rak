import { combineReducers } from 'redux';

import data from '../../src/reducers/data';
import errors from '../../src/reducers/errors';
import loading from '../../src/reducers/loading';

jest.mock('redux');
jest.mock('../../src/reducers/data');
jest.mock('../../src/reducers/errors');
jest.mock('../../src/reducers/loading');

describe('reducer index', () => {
  it('combines all my reducers', () => {
    // neccessary because the combining is done on export
    require('../../src/reducers'); // eslint-disable-line global-require

    expect(combineReducers).lastCalledWith({ data, errors, loading });
  });
});
