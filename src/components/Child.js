import React, { Component } from 'react';

import styles from '../stylesheets/child.css';

export default class Child extends Component {
  render() {
    return <h3 className={ styles.id }>recieved param: { this.props.params.id }</h3>;
  }
}
