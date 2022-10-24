import React from 'react';
import { styled } from '@linaria/react';
import { useParams } from 'react-router-dom';

import { center, openSans } from '../stylesheets/shared.css';
import { lightgrey } from '../stylesheets/colors.css';
import StyledLink from './StyledLink';

const Child = styled.h3`
  ${center}
  ${openSans}
  ${lightgrey}
  font-style: italic;
`;

export default () => {
  const params = useParams<{ id: string }>();
  return (
    <div>
      <Child>{`received param: ${params.id}`}</Child>
      <StyledLink to="/">Home</StyledLink>
    </div>
  );
};
