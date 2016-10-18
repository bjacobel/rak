import NotFound from '../../src/components/NotFound';

import React from 'react';
import { shallow } from 'enzyme';

describe('404 component', () => {
  it('displays 404 message', () => {
    const notFound = shallow(<NotFound />);

    expect(notFound.find('h1').length).toBe(1);
    expect(notFound.find('h1').text()).toEqual('404: page not found');
  });

  it('has a link back to home', () => {
    const notFound = shallow(<NotFound />);
    const homeLink = notFound.find('Link');

    expect(homeLink.length).toBe(1);
    expect(homeLink.prop('to')).toEqual('/');
  });
});
