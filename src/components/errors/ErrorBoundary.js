import React, { Component } from 'react';

import log from 'services/errors';
import { LOG_ERRORS } from '../../constants';
import ErrorComponent from './ErrorComponent';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (LOG_ERRORS) {
      log(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}
