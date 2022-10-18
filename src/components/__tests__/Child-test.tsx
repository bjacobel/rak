import React, { ReactNode } from 'react';
import { Routes, Route } from 'react-router-dom';

import Child from '../Child';
import { render } from '../../testing/rtl';

describe('child component', () => {
  let child: ReactNode;

  beforeEach(() => {
    child = (
      <Routes>
        <Route element={<Child />} path="/child/:id" />;
      </Routes>
    );
  });

  it('matches snapshot', () => {
    const { asFragment } = render(child, { route: '/child/foo' });

    expect(asFragment()).toMatchSnapshot();
  });

  it('displays the param it recieves in props', async () => {
    const { getByText } = render(child, { route: '/child/foo' });

    expect(getByText('received param: foo')).toBeInTheDocument();
  });

  it('has a link back to home', async () => {
    const { getByRole } = render(child, { route: '/child/foo' });
    const homeLink = getByRole('link');

    expect(new URL((homeLink as HTMLLinkElement).href).pathname).toEqual('/');
  });
});
