import React from 'react';
import { shallow } from 'enzyme';

import Child from '../../src/components/Child';

describe('child component', () => {
  it('displays the param it recieves in props', () => {
    const child = shallow(<Child params={ { id: 'foo' } } />);

    expect(child.find('h3').length).toBe(1);
    expect(child.find('h3').text()).toEqual('received param: foo');
  });

  it('has a link back to home', () => {
    const child = shallow(<Child params={ { id: 'foo' } } />);
    const homeLink = child.find('Link');

    expect(homeLink.length).toBe(1);
    expect(homeLink.prop('to')).toEqual('/');
  });
});
