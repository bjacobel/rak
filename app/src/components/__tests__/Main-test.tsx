import React, { ReactNode } from 'react';
import { Switch, Route } from 'wouter';

import { getData } from '../../services/data';
import { DATA } from '../../constants';
import Main from '../Main';
import { render, waitFor } from '../../testing/rtl';
import ErrorComponent from '../errors/ErrorComponent';

jest.mock('../../services/data');

jest.mock('../errors/ErrorComponent', () => jest.fn(() => <span>ErrorComponent</span>));

describe('main component', () => {
  let main: ReactNode;

  beforeEach(() => {
    jest.mocked(getData).mockImplementation(() => Promise.resolve(DATA));
    main = (
      <Switch>
        <Route component={Main} path="/" />
      </Switch>
    );
  });

  it('matches snapshot', async () => {
    const { asFragment, getByRole } = render(main);

    await waitFor(() => expect(getByRole('banner')).toBeInTheDocument());

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders an h3 with data if it didn't hit an error", async () => {
    const { getByText } = render(main);

    await waitFor(() => expect(getByText(DATA.text)).toBeInTheDocument());
  });

  it('renders error if data-fetching errors', async () => {
    const error = new Error('mock error');
    jest.mocked(getData).mockImplementationOnce(() => {
      throw error;
    });

    const { asFragment } = render(main);

    await waitFor(() => expect(ErrorComponent).toHaveBeenCalled());

    expect(asFragment()).toMatchSnapshot();
  });
});
