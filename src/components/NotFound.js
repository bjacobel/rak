import React from 'react';
import { Link } from '@reach/router';

import { notFound } from '../stylesheets/notFound.css';
import { link } from '../stylesheets/link.css';

export default () => (
  <div>
    <h1 className={notFound}>404: page not found</h1>
    <Link className={link} to="/">
      Home
    </Link>
  </div>
);
