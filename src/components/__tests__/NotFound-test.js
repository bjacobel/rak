import React from 'react';
import { shallow } from 'enzyme';

import NotFound from 'components/NotFound';

describe('404 component', () => {
  it('matches snapshot', () => {
    expect(shallow(<NotFound />)).toMatchSnapshot();
  });

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
