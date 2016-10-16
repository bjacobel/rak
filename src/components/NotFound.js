import React, { Component } from 'react';
import styles from '../stylesheets/notFound.css';

export default class NotFound extends Component {
  render() {
    return (
      <h1 className={ styles['not-found'] }>404: page not found</h1>
    );
  }
}
