import React from 'react';
import { useParams } from '@reach/router';
import { render } from '@testing-library/react';

import Child from 'components/Child';

jest.mock('@reach/router');

describe('child component', () => {
  it('matches snapshot', () => {
    useParams.mockReturnValueOnce({ id: 'foo' });
    const { asFragment } = render(<Child />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays the param it recieves in props', () => {
    useParams.mockReturnValueOnce({ id: 'foo' });
    const { getByText } = render(<Child />);

    expect(getByText('received param: foo')).toBeInTheDocument();
  });

  it('has a link back to home', () => {
    useParams.mockReturnValueOnce({ id: 'foo' });
    const { getByRole } = render(<Child />);
    const homeLink = getByRole('link');

    expect(homeLink.prop('to')).toEqual('/');
  });
});
