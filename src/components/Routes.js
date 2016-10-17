import React, { Component } from 'react';
import { Match, Miss, BrowserRouter } from 'react-router';

import NotFound from './NotFound';
import Child from './Child';
import Main from './Main';

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Match pattern="/" exactly component={ Main } />
          <Match pattern="/child/:id" component={ Child } />
          <Miss component={ NotFound } />
        </div>
      </BrowserRouter>
    );
  }
}
