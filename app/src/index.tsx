/* eslint-disable import/no-import-module-exports */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import Analytics from './components/Analytics';
import Routes from './components/Routes';
import { setup as sentrySetup } from './services/errors';
import { IS_PROD } from './constants';
import { register } from './utils/sw-loader';
import PWAUpdater from './components/PWAUpdater';
import ErrorBoundary from './components/errors/ErrorBoundary';
import CommonMeta from './components/CommonMeta';

sentrySetup();
const queryClient = new QueryClient();

const rootEl = document.getElementById('main');
const root = createRoot(rootEl!);
const render = () => {
  root.render(
    <StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <PWAUpdater />
            <CommonMeta />
            <Analytics />
            <Routes />
          </ErrorBoundary>
        </QueryClientProvider>
      </HelmetProvider>
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
