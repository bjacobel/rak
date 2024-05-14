import { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Router } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const customRender = (ui: ReactNode, options?: RenderOptions & { route?: string }) => {
  const path = options && options.route ? options.route : '/';
  const { hook } = memoryLocation({ path, static: true });
  return {
    user: userEvent.setup(),
    ...render(
      <QueryClientProvider client={queryClient}>
        <Router hook={hook}>{ui}</Router>
      </QueryClientProvider>,
      options,
    ),
  };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
