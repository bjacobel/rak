import React from 'react';
import { shallow } from 'enzyme';
import { useParams } from '@reach/router';

import Child from 'components/Child';

jest.mock('@reach/router');

describe('child component', () => {
  it('matches snapshot', () => {
    useParams.mockReturnValueOnce({ id: 'foo' });
    expect(shallow(<Child />)).toMatchSnapshot();
  });

  it('displays the param it recieves in props', () => {
    useParams.mockReturnValueOnce({ id: 'foo' });
    const child = shallow(<Child />);

    expect(child.find('h3').length).toBe(1);
    expect(child.find('h3').text()).toEqual('received param: foo');
  });

  it('has a link back to home', () => {
    useParams.mockReturnValueOnce({ id: 'foo' });
    const child = shallow(<Child />);
    const homeLink = child.find('Link');

    expect(homeLink.length).toBe(1);
    expect(homeLink.prop('to')).toEqual('/');
  });
});
