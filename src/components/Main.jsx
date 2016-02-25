import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = {

};

class Main extends Component {
  render() {
    return <h1>react-redux-boilerplate</h1>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
