import React from 'react';
import { Switch, Route } from 'wouter';

import NotFound from './NotFound';
import Child from './Child';
import Main from './Main';

export default () => (
  <Switch>
    <Route component={Main} path="/" />
    <Route component={Child} path="/child/:id" />
    <Route component={NotFound} path="*" />
  </Switch>
);
