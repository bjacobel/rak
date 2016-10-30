import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import styles from '../stylesheets/main.css';
import { link } from '../stylesheets/link.css';
import { getTitleAsync } from '../actions/title';

const mapStateToProps = state => ({
  title: state.title,
});

const mapDispatchToProps = {
  getTitleAsync,
};

// Separately export the MainComponent so it can be tested without being wrapped by connect()
export class MainComponent extends Component {
  componentWillMount() {
    this.props.getTitleAsync();
  }

  render() {
    const { title } = this.props;

    return (
      <div>
        <h1 className={ styles.title }>{ title.error || title.content }</h1>
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
