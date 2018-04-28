import React, { Component } from 'react';
import Link from 'react-router-dom/Link';

import styles from '../stylesheets/notFound.css';
import { link } from '../stylesheets/link.css';

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <h1 className={styles['not-found']}>404: page not found</h1>
        <Link className={link} to="/">
          Home
        </Link>
      </div>
    );
  }
}
