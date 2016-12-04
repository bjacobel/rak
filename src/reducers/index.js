import { combineReducers } from 'redux';

import data from './data';
import errors from './errors';
import loading from './loading';

export default combineReducers({
  loading,
  data,
  errors,
});
