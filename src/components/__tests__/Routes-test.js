import React from 'react';
import { shallow, mount } from 'enzyme';
import { navigate } from '@reach/router';

import Routes from 'components/Routes';
import Child from 'components/Child';
import NotFound from 'components/NotFound';

jest.mock('components/Main');

describe('Router', () => {
  it('matches snapshot', () => {
    expect(shallow(<Routes />)).toMatchSnapshot();
  });

  it('has a home route', () => {
    navigate('/');
    const routes = mount(<Routes />);
    expect(routes.find('Connect(Main)').length).toBe(1);
  });

  it('has a route for child views that takes a url param', () => {
    navigate('/child/1');
    const routes = mount(<Routes />);
    expect(routes.find(Child).length).toBe(1);
    expect(routes.find(Child).props()).toEqual(
      expect.objectContaining({
        id: '1',
      }),
    );
  });

  it('has a fallthrough 404', () => {
    navigate('/asdfasaddf');
    const routes = mount(<Routes />);
    expect(routes.find(NotFound).length).toBe(1);
  });
});
