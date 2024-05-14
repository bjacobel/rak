import { useQuery } from '@tanstack/react-query';
import { styled } from '@linaria/react';

import { getData, Data } from '../services/data';
import ErrorComponent from './errors/ErrorComponent';
import { lightgrey } from '../stylesheets/colors.css';
import { center, openSans } from '../stylesheets/shared.css';
import StyledLink from './StyledLink';

const DataHeader = styled.h3`
  ${center}
  ${openSans}
  ${lightgrey}
  font-style: italic;
`;

const Logo = styled.div`
  height: 100px;
  background-image: url('../assets/images/logo.svg');
  background-repeat: no-repeat;
  background-position: center;
`;

export default () => {
  const { isLoading, data, error } = useQuery<Data, Error>({ queryKey: ['data'], queryFn: getData });

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (isLoading) {
    return <span>loading...</span>;
  }

  return (
    <>
      <Logo role="banner" />
      <DataHeader>{data!.text || ''}</DataHeader>
      <StyledLink to="/child/foo">Routing demo</StyledLink>
      <StyledLink to="/asdf">404 demo</StyledLink>
      <StyledLink to="/error">Error</StyledLink>
    </>
  );
};
