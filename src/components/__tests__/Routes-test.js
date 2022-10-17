import React from 'react';

import { render } from 'testing/rtl';
import Routes from 'components/Routes';

jest.mock('components/Main', () => jest.fn().mockReturnValue('Main'));
jest.mock('components/Child', () => jest.fn().mockReturnValue('Child'));
jest.mock('components/NotFound', () => jest.fn().mockReturnValue('NotFound'));

describe('Router', () => {
  it('navigates to Main on /', () => {
    const { getByText } = render(<Routes />, { route: '/' });
    expect(getByText('Main')).toBeInTheDocument();
  });

  it('navigates to Child on /child/:id', () => {
    const { getByText } = render(<Routes />, { route: '/child/1' });
    expect(getByText('Child')).toBeInTheDocument();
  });

  it('navigates to NotFound by default', () => {
    const { getByText } = render(<Routes />, { route: '/asdf' });
    expect(getByText('NotFound')).toBeInTheDocument();
  });
});
