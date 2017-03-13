import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import NotFound from './NotFound';
import Child from './Child';
import Main from './Main';

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={ Main } />
            <Route path="/child/:id" component={ Child } />
            <Route component={ NotFound } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
