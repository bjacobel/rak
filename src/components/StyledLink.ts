import { styled } from '@linaria/react';
import { Link } from 'react-router-dom';

import { center, openSans } from '../stylesheets/shared.css';

export default styled(Link)`
  ${center}
  ${openSans}
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
