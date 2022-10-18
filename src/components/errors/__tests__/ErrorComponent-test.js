import React from 'react';

import { render } from 'testing/rtl';
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
      const { asFragment } = render(<ErrorComponent />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('has error string in document', () => {
      const errString = 'idk lol';
      const { getByTestId } = render(<ErrorComponent error={new Error(errString)} />);
      expect(getByTestId('stack').innerHTML).toMatch(`Error: ${errString}`);
    });
  });

  describe('in prod mode', () => {
    it('does not print stack even with an error', () => {
      mockShowStackConstant.mockReturnValueOnce(true);

      const errString = 'idk lol';
      const { queryByText } = render(<ErrorComponent error={new Error(errString)} />);
      expect(queryByText(errString)).not.toBeInTheDocument();
    });
  });
});
