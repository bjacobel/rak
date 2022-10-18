import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getData, Data } from '../services/data';
import ErrorComponent from './errors/ErrorComponent';
import { data as dataStyle, logo } from '../stylesheets/main.css';
import { link } from '../stylesheets/link.css';

export default () => {
  const { isLoading, data, error } = useQuery<Data>(['data'], getData);

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div role="banner" className={logo} />
      <h3 className={dataStyle}>{data!.text || ''}</h3>
      <Link className={link} to="/child/foo">
        Routing demo
      </Link>
      <Link className={link} to="/asdf">
        404 demo
      </Link>
    </>
  );
};
