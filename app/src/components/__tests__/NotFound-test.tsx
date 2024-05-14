import { ReactNode } from 'react';
import { Route, Switch } from 'wouter';

import { render } from '../../testing/rtl';
import NotFound from '../NotFound';

describe('404 component', () => {
  let notFound: ReactNode;

  beforeEach(() => {
    notFound = (
      <Switch>
        <Route component={NotFound} path="*" />
      </Switch>
    );
  });

  it('matches snapshot', () => {
    const { asFragment } = render(notFound);

    expect(asFragment()).toMatchSnapshot();
  });

  it('displays 404 message', () => {
    const { getByText } = render(notFound);

    expect(getByText('404: page not found')).toBeInTheDocument();
  });

  it('has a link back to home', () => {
    const { getByRole } = render(notFound);
    const homeLink = getByRole('link');

    expect(homeLink).toBeInTheDocument();

    expect(new URL((homeLink as HTMLLinkElement).href).pathname).toEqual('/');
  });
});
