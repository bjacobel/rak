import { ReactNode } from 'react';
import { Switch, Route } from 'wouter';

import Child from '../Child';
import { render } from '../../testing/rtl';

describe('child component', () => {
  let child: ReactNode;

  beforeEach(() => {
    child = (
      <Switch>
        <Route component={Child} path="/child/:id" />;
      </Switch>
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
