import React from 'react';
import { mount } from 'enzyme';
import { useQuery } from '@tanstack/react-query';

import log from 'services/errors';
import Main from 'components/Main';

jest.mock('@tanstack/react-query');
jest.mock('services/errors');
jest.mock('@reach/router', () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('main component', () => {
  it('matches snapshot', () => {
    useQuery.mockReturnValueOnce({ data: { text: 'foo' } });
    expect(mount(<Main />)).toMatchSnapshot();
  });

  it("renders an h3 with data if it didn't hit an error", () => {
    useQuery.mockReturnValueOnce({ data: { text: 'foo' } });
    const main = mount(<Main />);

    expect(main.find('h3').length).toBe(1);
    expect(main.find('h3').text()).toEqual('foo');
  });

  it('renders nothing and logs error if data-fetching hits an error', () => {
    const error = new Error('mock error');
    useQuery.mockReturnValueOnce({ error });
    const main = mount(<Main />);

    expect(main.find('h3').length).toBe(0);
    expect(log).toHaveBeenCalledWith(error);
  });
});
