import { styled } from '@linaria/react';
import React from 'react';

import { SHOW_STACK } from '../../constants';
import { robotoMono } from '../../stylesheets/shared.css';

const MonoHeader = styled.h3`
  ${robotoMono}
`;

const ErrorComponent = ({ error }: { error?: Error }) => (
  <>
    <MonoHeader>Something went wrong.</MonoHeader>
    {SHOW_STACK && error && error.stack && <pre data-testid="stack">{error.stack}</pre>}
  </>
);

ErrorComponent.defaultProps = {
  error: undefined,
};

export default ErrorComponent;
