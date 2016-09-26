import { MainComponent } from '../../src/components/Main';

import React from 'react';
import { shallow } from 'enzyme';

describe('main component', () => {
  describe('un-Connected component', () => {
    it("renders an h1 with a title if title doesn't have an error", () => {
      const main = shallow(<MainComponent title={ { content: 'foo' } } getTitleAsync={ jest.fn() } />);

      expect(main.find('h1').length).toBe(1);
      expect(main.find('h1').text()).toEqual('foo');
    });

    it('renders an h1 with an err if title has an error', () => {
      const main = shallow(<MainComponent title={ { error: 'err' } } getTitleAsync={ jest.fn() } />);

      expect(main.find('h1').length).toBe(1);
      expect(main.find('h1').text()).toEqual('err');
    });

    it('calls getTitleAsync on mount', () => {
      const getTitleAsync = jest.fn();
      shallow(<MainComponent title={ { contents: 'foo' } } getTitleAsync={ getTitleAsync } />);
      expect(getTitleAsync).toHaveBeenCalled();
    });
  });
});
