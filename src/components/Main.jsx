import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getTitleAsync } from '../actions/title.js';

const mapStateToProps = (state) => {
  return {
    title: state.title
  };
};

const mapDispatchToProps = {
  getTitleAsync
};

class Main extends Component {
  componentWillMount() {
    this.props.getTitleAsync();
  }

  render() {
    const { title } = this.props;

    return <h1 className="title">{ title.error || title.content }</h1>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
