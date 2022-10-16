import React from 'react';
import { navigate } from '@reach/router';

import { unwrappedRender } from 'testing/rtl';
import Routes from 'components/Routes';

jest.mock('components/Main', () => jest.fn().mockReturnValue('Main'));
jest.mock('components/Child', () => jest.fn().mockReturnValue('Child'));
jest.mock('components/NotFound', () => jest.fn().mockReturnValue('NotFound'));

describe('Router', () => {
  it('navigates to Main on /', () => {
    navigate('/');
    const { getByText } = unwrappedRender(<Routes />);
    expect(getByText('Main')).toBeInTheDocument();
  });

  it('navigates to Child on /child/:id', () => {
    navigate('/child/1');
    const { getByText } = unwrappedRender(<Routes />);
    expect(getByText('Child')).toBeInTheDocument();
  });

  it('navigates to NotFound by default', () => {
    navigate('/asdf');
    const { getByText } = unwrappedRender(<Routes />);
    expect(getByText('NotFound')).toBeInTheDocument();
  });
});
