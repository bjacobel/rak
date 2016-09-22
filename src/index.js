import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import Main from './components/Main';
import reducer from './reducers';
import { SHOW_DEVTOOLS } from './constants';

const middlewares = [
  applyMiddleware(thunk),
];

if (SHOW_DEVTOOLS) {
  middlewares.push(window.devToolsExtension ? window.devToolsExtension() : f => f);
}

const composedCreateStore = compose.apply(this, middlewares)(createStore);
const store = composedCreateStore(reducer);

ReactDOM.render(
  <Provider store={ store }>
    <Main />
  </Provider>,
  document.getElementById('main')
);
