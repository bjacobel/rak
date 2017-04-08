import React from 'react';
import { shallow, mount } from 'enzyme';

import Routes from '../../src/components/Routes';
import Analytics from '../../src/services/analytics';

jest.mock('../../src/components/Main');
jest.mock('../../src/components/Child');
jest.mock('../../src/components/NotFound');
jest.mock('../../src/services/Analytics');

const setPath = (value) => {
  // thanks @cpojer! https://github.com/facebook/jest/issues/890#issuecomment-209698782
  Object.defineProperty(window.location, 'pathname', {
    writable: true,
    value,
  });
};

describe('Router', () => {
  it('matches snapshot', () => {
    expect(shallow(<Routes />)).toMatchSnapshot();
  });

  describe('Routing config', () => {
    it('has a home route', () => {
      setPath('/');
      const routes = mount(<Routes />);
      expect(routes.find('Connect(Main)').length).toBe(1);
    });

    it('has a route for child views that takes a url param', () => {
      setPath('/child/1');
      const routes = mount(<Routes />);
      expect(routes.find('Child').length).toBe(1);
      expect(routes.find('Child').props()).toEqual(
        expect.objectContaining({
          match: expect.objectContaining({
            params: {
              id: '1',
            },
          }),
        }),
      );
    });

    it('has a fallthrough 404', () => {
      setPath('/asdfasaddf');
      const routes = mount(<Routes />);
      expect(routes.find('NotFound').length).toBe(1);
    });
  });

  describe('Analytics functionality', () => {
    beforeEach(() => {
      Analytics.prototype = jest.fn(() => ({
        constructor: jest.fn(),
        pageview: jest.fn(),
      }));
    });

    it('inits the analytics class', () => {
      mount(<Routes />);
      expect(Analytics.prototype.constructor).toHaveBeenCalled();
    });

    it('calls the analytics pageview fn when you navigate to a new route', () => {
      mount(<Routes />);
      setPath('/child/1');
      expect(Analytics.prototype.pageview).toHaveBeenCalledTimes(1);
    });

    it('supplies GA to routed components via context', () => {
      const routes = mount(<Routes />);
      expect(routes.find('Route')[0]).props.toEqual(expect.objectContaining({
        ga: undefined,
      }));
    });
  });
});
