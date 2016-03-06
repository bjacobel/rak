import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import './stylesheets';
import Main from './components/Main';
import Err from './components/Err';
import DevTools from './components/DevTools';
import reducer from './reducers';
import { showDevTools } from './constants';

const middlewares = [
  applyMiddleware(thunk)
];
if (showDevTools) { middlewares.push(DevTools.instrument()); }

const composedCreateStore = compose.apply(this, middlewares)(createStore);
const store = composedCreateStore(reducer);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={ store }>
    <div>
      <Router history={ history }>
        <Route path="/error" component={ Err } />
        <Route path="/" component={ Main } />
      </Router>
      { showDevTools ? <DevTools /> : null }
    </div>
  </Provider>,
  document.getElementById('main')
);
