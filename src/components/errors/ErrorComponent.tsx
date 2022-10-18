import React from 'react';

import { SHOW_STACK } from '../../constants';
import { errorHeader } from './style.css';

const ErrorComponent = ({ error }: { error?: Error }) => (
  <>
    <h3 className={errorHeader}>Something went wrong.</h3>
    {SHOW_STACK && error && error.stack && <pre data-testid="stack">{error.stack}</pre>}
  </>
);

ErrorComponent.defaultProps = {
  error: undefined,
};

export default ErrorComponent;
