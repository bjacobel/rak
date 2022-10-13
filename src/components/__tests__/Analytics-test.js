import React from 'react';
import { mount } from 'enzyme';
import { navigate } from '@reach/router';

import Analytics from 'components/Analytics';
import GA from 'services/GA';

jest.mock('services/GA');

describe('Analytics component', () => {
  beforeEach(() => {
    // reset call count before each test
    GA.prototype.pageview.mockClear();
  });

  it('inits the GA class', () => {
    mount(<Analytics />);
    expect(GA).toHaveBeenCalled();
  });

  it('calls the analytics pageview fn when you navigate to a new route', () => {
    mount(<Analytics />);
    navigate('/child/1');
    expect(GA.prototype.pageview).toHaveBeenCalledTimes(1);
  });
});
