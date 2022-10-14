import React, { useEffect } from 'react';
import { Link } from '@reach/router';
import { useQuery } from '@tanstack/react-query';

import { getData } from 'services/data';
import log from 'services/errors';
import { data as dataStyle, logo } from '../stylesheets/main.css';
import { link } from '../stylesheets/link.css';

export default () => {
  const { isLoading, data, error } = useQuery(['data'], getData);

  useEffect(() => {
    if (error) {
      log(error);
    }
  }, [error]);

  if (isLoading || error) {
    return null;
  }

  return (
    <>
      <div className={logo} />
      <h3 className={dataStyle}>{data.text || ''}</h3>
      <Link className={link} to="/child/foo">
        Routing demo
      </Link>
      <Link className={link} to="/asdf">
        404 demo
      </Link>
    </>
  );
};
