import React from 'react';

import Child from 'components/Child';
import { render } from 'testing/rtl';

describe('child component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Child path="/child/:id" />, { route: '/child/foo' });
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays the param it recieves in props', async () => {
    const { getByText } = render(<Child path="/child/:id" />, { route: '/child/foo' });
    expect(getByText('received param: foo')).toBeInTheDocument();
  });

  it('has a link back to home', async () => {
    const { getByRole } = render(<Child path="/child/:id" />, { route: '/child/foo' });
    const homeLink = getByRole('link');
    expect(new URL(homeLink.href).pathname).toEqual('/');
  });
});
