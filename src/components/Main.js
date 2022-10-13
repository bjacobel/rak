import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from '@reach/router';

import { data as dataStyle, logo } from '../stylesheets/main.css';
import { link } from '../stylesheets/link.css';
import { getDataAsync } from '../actions/data';

const mapStateToProps = state => ({
  data: state.data,
});

const mapDispatchToProps = {
  getDataAsync,
};

class Main extends Component {
  componentDidMount() {
    this.props.getDataAsync();
  }

  render() {
    const { data } = this.props;

    return (
      <>
        <div className={logo} />
        <h3 className={dataStyle}>{data.text || ''}</h3>
        <Link className={link} to="/child/foo">
          Routing demo
        </Link>
        <Link className={link} to="/asdf">
          404 demo
        </Link>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
