import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFound from './NotFound';
import Child from './Child';
import Main from './Main';

export default () => (
  <Routes>
    <Route element={<Main />} path="/" />
    <Route element={<Child />} path="/child/:id" />
    <Route element={<NotFound />} path="*" />
  </Routes>
);
