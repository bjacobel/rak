import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import styles from '../stylesheets/main.css';
import { link } from '../stylesheets/link.css';
import { getDataAsync } from '../actions/data';

const mapStateToProps = state => ({
  data: state.data,
});

const mapDispatchToProps = {
  getDataAsync,
};

// Separately export the MainComponent so it can be tested without being wrapped by connect()
export class MainComponent extends Component {
  componentWillMount() {
    this.props.getDataAsync();
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        <div className={ styles.logo } />
        <h3 className={ styles.data }>{ data.text || '' }</h3>
        <Link className={ link } to={ `/child/${Math.floor(Math.random() * 100)}` }>
          Component with passed params
        </Link>
        <Link className={ link } to="/asdf">Dead link</Link>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainComponent);
