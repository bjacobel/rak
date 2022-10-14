import React from 'react';
import { shallow } from 'enzyme';
import { navigate } from '@reach/router';

import Routes from 'components/Routes';
import Main from 'components/Main';
import Child from 'components/Child';
import NotFound from 'components/NotFound';

describe('Router', () => {
  it('matches snapshot', () => {
    expect(shallow(<Routes />)).toMatchSnapshot();
  });

  it('has a home route', () => {
    navigate('/');
    const routes = shallow(<Routes />);
    expect(routes.find(Main).length).toBe(1);
  });

  it('has a parameterized route for child views', () => {
    navigate('/child/1');
    const routes = shallow(<Routes />);
    expect(routes.find(Child).length).toBe(1);
  });

  it('has a fallthrough 404', () => {
    navigate('/asdfasaddf');
    const routes = shallow(<Routes />);
    expect(routes.find(NotFound).length).toBe(1);
  });
});
