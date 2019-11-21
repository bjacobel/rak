import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from '../stylesheets/child.css';
import { link } from '../stylesheets/link.css';

export default class Child extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <h3 className={styles.id}>{`received param: ${match.params.id}`}</h3>
        <Link className={link} to="/">
          Home
        </Link>
      </div>
    );
  }
}

Child.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
