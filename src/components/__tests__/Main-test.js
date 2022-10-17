import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { getData } from 'services/data';
import { DATA } from '../../constants';
import Main from 'components/Main';
import { render, waitFor } from 'testing/rtl';
import ErrorComponent from 'components/errors/ErrorComponent';

jest.mock('services/data');
jest.mock('components/errors/ErrorComponent', () => jest.fn(() => <span>ErrorComponent</span>));

describe('main component', () => {
  let main;
  beforeEach(() => {
    getData.mockImplementation(() => Promise.resolve(DATA));
    main = (
      <Routes>
        <Route element={<Main />} path="/" />
      </Routes>
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
    getData.mockImplementationOnce(() => {
      throw error;
    });

    const { asFragment } = render(main);
    await waitFor(() => expect(ErrorComponent).toHaveBeenCalled());

    expect(asFragment()).toMatchSnapshot();
  });
});
