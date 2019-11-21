import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import reducer from './reducers';
import Routes from './components/Routes';
import { setup as sentrySetup } from './services/errors';
import { SHOW_DEV_TOOLS } from './constants';

const composeEnhancers = (SHOW_DEV_TOOLS && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; // eslint-disable-line no-underscore-dangle

const store = createStore(reducer, {}, composeEnhancers(applyMiddleware(...[thunk])));

sentrySetup();

const rootEl = document.getElementById('main');
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    rootEl,
  );
};

if (module.hot) {
  module.hot.accept('./components/Routes', () => {
    render();
  });
}

render();
