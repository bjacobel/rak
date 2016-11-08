import React from 'react';
import { mount } from 'enzyme';

import Routes from '../../src/components/Routes';

jest.mock('../../src/components/Main');
jest.mock('../../src/components/Child');
jest.mock('../../src/components/NotFound');

const setPath = (value) => {
  // thanks @cpojer! https://github.com/facebook/jest/issues/890#issuecomment-209698782
  Object.defineProperty(window.location, 'pathname', {
    writable: true,
    value,
  });
};

describe('Routes component', () => {
  it('has a home route', () => {
    setPath('/');
    const routes = mount(<Routes />);
    expect(routes.find('MainComponent').length).toBe(1);
  });

  it('has a route for child views that takes a url param', () => {
    setPath('/child/1');
    const routes = mount(<Routes />);
    expect(routes.find('Child').length).toBe(1);
    expect(routes.find('Child').props()).toEqual(jasmine.objectContaining({ params: { id: '1' } }));
  });

  it('has a fallthrough 404', () => {
    setPath('/asdfasaddf');
    const routes = mount(<Routes />);
    expect(routes.find('NotFound').length).toBe(1);
  });
});
