import { styled } from '@linaria/react';
import React from 'react';

import { center, openSans } from '../stylesheets/shared.css';
import StyledLink from './StyledLink';

const Header = styled.h1`
  ${center}
  ${openSans}
`;

export default () => (
  <div>
    <Header>404: page not found</Header>
    <StyledLink to="/">Home</StyledLink>
  </div>
);
