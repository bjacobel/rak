import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const queryClient = new QueryClient({
  logger: {
    log: console.log,
    warn: console.warn,
    error: process.env.NODE_ENV === 'test' ? noop : console.error,
  },
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const customRender = (ui, options) => {
  const route = options && options.route ? options.route : '/';
  return {
    user: userEvent.setup(),
    ...render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </QueryClientProvider>,
      options,
    ),
  };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
