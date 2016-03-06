import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import title from './title';
import loading from './loading';

export default combineReducers({
  loading,
  routing: routerReducer,
  title
});
