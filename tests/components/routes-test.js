jest.mock('../../src/components/Main');
jest.mock('../../src/components/Child');
jest.mock('../../src/components/NotFound');
import Routes from '../../src/components/Routes';

import React from 'react';
import { mount } from 'enzyme';

const setHref = (value) => {
  // thanks @cpojer! https://github.com/facebook/jest/issues/890#issuecomment-209698782
  Object.defineProperty(window.location, 'pathname', {
    writable: true,
    value,
  });
};

describe('Routes component', () => {
  it('has a home route', () => {
    setHref('/');
    const routes = mount(<Routes />);
    expect(routes.find('Connect(MainComponent)').length).toBe(1);
  });

  it('has a route for child views that takes a url param', () => {
    setHref('/child/1');
    const routes = mount(<Routes />);
    expect(routes.find('Child').length).toBe(1);
    expect(routes.find('Child').props()).toEqual(jasmine.objectContaining({ params: { id: '1' } }));
  });

  it('has a fallthrough 404', () => {
    setHref('/asdfasaddf');
    const routes = mount(<Routes />);
    expect(routes.find('NotFound').length).toBe(1);
  });
});
