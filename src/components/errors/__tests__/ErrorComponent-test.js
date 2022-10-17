import React from 'react';

import { unwrappedRender } from 'testing/rtl';
import ErrorComponent from '../ErrorComponent';

const mockShowStackConstant = jest.fn().mockReturnValue(true);
jest.mock('constants', () => ({
  get SHOW_STACK() {
    return mockShowStackConstant();
  },
}));

describe('error rendering component', () => {
  describe('in dev mode', () => {
    it('matches snapshot without an error', () => {
      const { asFragment } = unwrappedRender(<ErrorComponent />);
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
      mockShowStackConstant.mockReturnValueOnce(true);

      const errString = 'idk lol';
      const { queryByText } = unwrappedRender(<ErrorComponent error={new Error(errString)} />);
      expect(queryByText(errString)).not.toBeInTheDocument();
    });
  });
});
