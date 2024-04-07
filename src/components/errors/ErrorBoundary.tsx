import React, { Component, PropsWithChildren } from 'react';

import log from '../../services/errors';
import { LOG_ERRORS } from '../../constants';
import ErrorComponent from './ErrorComponent';

type State = {
  error?: Error;
  hasError: boolean;
};

export default class ErrorBoundary extends Component<PropsWithChildren, State> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    if (LOG_ERRORS) {
      log(error, errorInfo as string);
    }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}
