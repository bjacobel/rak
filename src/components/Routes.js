import React from 'react';
import { Router } from '@reach/router';

import NotFound from './NotFound';
import Child from './Child';
import Main from './Main';

export default () => (
  <Router>
    <Main path="/" />
    <Child path="/child/:id" />
    <NotFound default />
  </Router>
);
