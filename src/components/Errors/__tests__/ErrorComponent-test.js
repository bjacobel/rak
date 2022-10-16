import React from 'react';

import { unwrappedRender } from 'testing/rtl';
import ErrorComponent from '../ErrorComponent';

describe('error rendering component', () => {
  describe('in dev mode', () => {
    it('matches snapshot without an error', () => {
      const { asFragment } = unwrappedRender(<ErrorComponent />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot without an error', () => {
      const { asFragment } = unwrappedRender(<ErrorComponent error={new Error('idk lol')} />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('has error string in document', () => {
      const errString = 'idk lol';
      const { getByTestId } = unwrappedRender(<ErrorComponent error={new Error(errString)} />);
      expect(getByTestId('stack').innerHTML).toMatch(`Error: ${errString}`);
    });
  });

  describe('in prod mode', () => {
    it('does not print stack even with an error', () => {
      jest.resetModules();
      jest.doMock('../../../constants', () => ({
        SHOW_STACK: false,
      }));
      // eslint-disable-next-line global-require
      const ScopedErrorComponent = require('../ErrorComponent').default;

      const errString = 'idk lol';
      const { queryByText } = unwrappedRender(<ScopedErrorComponent error={new Error(errString)} />);
      expect(queryByText(errString)).not.toBeInTheDocument();
    });
  });
});
