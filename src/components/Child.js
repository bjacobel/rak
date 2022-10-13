import React from 'react';
import { Link, useParams } from '@reach/router';

import { id } from '../stylesheets/child.css';
import { link } from '../stylesheets/link.css';

export default () => {
  const params = useParams();
  return (
    <div>
      <h3 className={id}>{`received param: ${params.id}`}</h3>
      <Link className={link} to="/">
        Home
      </Link>
    </div>
  );
};
