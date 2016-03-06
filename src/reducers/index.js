import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

import title from './title';
import loading from './loading';

export default combineReducers({
  loading,
  routing: routeReducer,
  title
});
