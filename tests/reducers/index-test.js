import { combineReducers } from 'redux';

import title from '../../src/reducers/title';
import loading from '../../src/reducers/loading';

jest.mock('redux');
jest.mock('../../src/reducers/title');
jest.mock('../../src/reducers/loading');

describe('reducer index', () => {
  it('combines all my reducers', () => {
    // neccessary because the combining is done on export
    require('../../src/reducers');  // eslint-disable-line global-require

    expect(combineReducers).lastCalledWith({ title, loading });
  });
});

