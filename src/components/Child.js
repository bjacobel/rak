import React, { Component } from 'react';
import Link from 'react-router-dom/Link';

import styles from '../stylesheets/child.css';
import { link } from '../stylesheets/link.css';

export default class Child extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <h3 className={styles.id}>received param: {match.params.id}</h3>
        <Link className={link} to="/">
          Home
        </Link>
      </div>
    );
  }
}
