import React, { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const customRender = (ui: ReactNode, options?: RenderOptions & { route?: string }) => {
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
