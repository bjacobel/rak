import React from 'react';

import { SHOW_STACK } from 'constants/index';
import { errorHeader } from './style.css';

export default ({ error }) => (
  <>
    <h3 className={errorHeader}>Something went wrong.</h3>
    {SHOW_STACK && error && error.stack && <pre data-testid="stack">{error.stack}</pre>}
  </>
);
