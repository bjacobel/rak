import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Match, Miss, BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import reducer from './reducers';
import { SHOW_DEVTOOLS } from './constants';
import NotFound from './components/NotFound';
import Child from './components/Child';

const composeEnhancers = (!SHOW_DEVTOOLS && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;  // eslint-disable-line max-len, no-underscore-dangle

const store = createStore(reducer, {}, composeEnhancers(
  applyMiddleware(...[thunk])
));

const rootEl = document.getElementById('main');
const render = () => {
  // See here for explanation of why this require() is needed:
  // https://github.com/reactjs/redux/pull/1455/files#r54380102
  const Main = require('./components/Main').default; // eslint-disable-line global-require

  ReactDOM.render(
    <Provider store={ store }>
      <BrowserRouter>
        <div>
          <Match pattern="/" exactly component={ Main } />
          <Match pattern="/child/:id" component={ Child } />
          <Miss component={ NotFound } />
        </div>
      </BrowserRouter>
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept('./components/Main', () => {
    render();
  });
}

render();
