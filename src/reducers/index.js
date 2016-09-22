import { combineReducers } from 'redux';

import title from './title';
import loading from './loading';

export default combineReducers({
  loading,
  title,
});
