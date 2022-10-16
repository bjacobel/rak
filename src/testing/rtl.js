import React from 'react';
import { render } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Router, createHistory, createMemorySource, LocationProvider } from '@reach/router';

const queryClient = new QueryClient({
  logger: {
    log: console.log,
    warn: console.warn,
    error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
  },
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const Providers = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

const renderWithRouterAndWrappers = (ui, options) => {
  const defaultRouteOptions = {
    route: '/',
    history: createHistory(createMemorySource(options && options.route ? options.route : '/')),
  };
  const renderOptions = { ...defaultRouteOptions, ...options };

  return {
    ...render(
      <LocationProvider history={renderOptions.history}>
        <Router>{ui}</Router>
      </LocationProvider>,
      {
        wrapper: Providers,
        ...options,
      },
    ),
    history: renderOptions.history,
  };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithRouterAndWrappers as render, render as unwrappedRender };
