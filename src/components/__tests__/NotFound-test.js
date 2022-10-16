import React from 'react';

import { render } from 'testing/rtl';
import NotFound from 'components/NotFound';

describe('404 component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<NotFound default />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays 404 message', () => {
    const { getByText } = render(<NotFound default />);

    expect(getByText('404: page not found')).toBeInTheDocument();
  });

  it('has a link back to home', () => {
    const { getByRole } = render(<NotFound default />);
    const homeLink = getByRole('link');

    expect(homeLink).toBeInTheDocument();
    expect(new URL(homeLink.href).pathname).toEqual('/');
  });
});
