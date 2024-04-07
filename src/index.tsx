/* eslint-disable import/no-import-module-exports */

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import Analytics from './components/Analytics';
import Routes from './components/Routes';
import { setup as sentrySetup } from './services/errors';
import { IS_PROD } from './constants';
import { register } from './utils/sw-loader';
import PWAUpdater from './components/PWAUpdater';

sentrySetup();
const queryClient = new QueryClient();

const rootEl = document.getElementById('main');
const root = createRoot(rootEl!);
const render = () => {
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <PWAUpdater />
        <BrowserRouter>
          <Analytics />
          <Routes />
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>,
  );
};

register();

if (module.hot && !IS_PROD) {
  module.hot.accept('./components/Routes', () => {
    render();
  });
}

render();
