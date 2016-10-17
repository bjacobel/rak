import React, { Component } from 'react';
import { Link } from 'react-router';

import styles from '../stylesheets/child.css';
import { link } from '../stylesheets/link.css';

export default class Child extends Component {
  render() {
    return (
      <div>
        <h3 className={ styles.id }>recieved param: { this.props.params.id }</h3>
        <Link className={ link } to="/">Home</Link>
      </div>
    );
  }
}
