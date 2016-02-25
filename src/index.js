import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import persistState from 'redux-localstorage';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';

import './stylesheets';
import Main from './components/Main';
import Err from './components/Err';
import DevTools from './components/DevTools';
import reducer from './reducers';
import { showDevTools } from './constants';

const reduxRouterMiddleware = syncHistory(browserHistory);

const middlewares = [
  applyMiddleware(thunk),
  applyMiddleware(reduxRouterMiddleware),
  persistState('routing')
];

if (showDevTools) { middlewares.push(DevTools.instrument()); }

const composedCreateStore = compose.apply(this, middlewares)(createStore);

const store = composedCreateStore(reducer);

if (showDevTools) { reduxRouterMiddleware.listenForReplays(store); }

ReactDOM.render(
  <Provider store={ store }>
    <div>
      <Router history={ browserHistory }>
        <Route path="/" component={ Main }/>
        <Route path="/error" component={ Err }/>
      </Router>
      { showDevTools ? <DevTools/> : null }
    </div>
  </Provider>,
  document.getElementById('main')
);
