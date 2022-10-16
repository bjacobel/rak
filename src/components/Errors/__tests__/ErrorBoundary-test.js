import React from 'react';

import { unwrappedRender } from 'testing/rtl';
import log from 'services/errors';
import ErrorBoundary from 'components/Errors/ErrorBoundary';

const mockLogErrorsConstant = jest.fn().mockReturnValue(false);
jest.mock('services/errors');
jest.mock('constants', () => ({
  get LOG_ERRORS() {
    return mockLogErrorsConstant();
  },
}));

const IntentionallyThrows = ({ error }) => {
  throw error;
};

describe('ErrorBoundary component', () => {
  let consoleError;

  beforeAll(() => {
    consoleError = console.error;
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = consoleError;
  });

  it('does not log to error service when LOG_ERRORS is false', () => {
    const error = new Error('mock render error');
    unwrappedRender(
      <ErrorBoundary>
        <IntentionallyThrows error={error} />
      </ErrorBoundary>,
    );
    expect(log).not.toHaveBeenCalled();
  });

  it('does not log to error service when LOG_ERRORS is false', () => {
    mockLogErrorsConstant.mockReturnValue(true);

    const error = new Error('mock render error');
    unwrappedRender(
      <ErrorBoundary>
        <IntentionallyThrows error={error} />
      </ErrorBoundary>,
    );
    expect(log).toHaveBeenCalledWith(error, expect.any(Object));
  });
});
