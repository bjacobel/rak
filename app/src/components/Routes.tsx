import React from 'react';
import { Switch, Route } from 'wouter';

import Main from './Main';
import Child from './Child';
import Error from './Error';
import NotFound from './NotFound';

export default () => (
  <Switch>
    <Route component={Main} path="/" />
    <Route component={Child} path="/child/:id" />
    <Route component={Error} path="/error" />
    <Route component={NotFound} path="*" />
  </Switch>
);
