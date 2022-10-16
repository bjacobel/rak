/* eslint-disable import/no-import-module-exports */

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import Analytics from './components/Analytics';
import Routes from './components/Routes';
import { setup as sentrySetup } from './services/errors';

sentrySetup();
const queryClient = new QueryClient();

const rootEl = document.getElementById('main');
const render = () => {
  ReactDOM.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Analytics />
        <Routes />
      </QueryClientProvider>
    </StrictMode>,
    rootEl,
  );
};

if (module.hot) {
  module.hot.accept('./components/Routes', () => {
    render();
  });
}

render();
