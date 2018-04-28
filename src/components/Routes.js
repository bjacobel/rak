import React, { Component } from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import NotFound from './NotFound';
import Child from './Child';
import Main from './Main';
import Analytics from '../services/Analytics';

class GARoute extends Route {
  render() {
    this.props.ga.pageview();
    return <Route {...this.props} />;
  }
}

export default class Routes extends Component {
  componentWillMount() {
    this.ga = new Analytics();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <GARoute ga={this.ga} path="/" exact component={Main} />
            <GARoute ga={this.ga} path="/child/:id" component={Child} />
            <GARoute ga={this.ga} component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
