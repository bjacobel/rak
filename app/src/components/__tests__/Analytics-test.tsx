import Analytics from '../Analytics';
import GA from '../../services/GA';
import { render } from '../../testing/rtl';

jest.mock('services/GA');

describe('Analytics component', () => {
  beforeEach(() => {
    // reset call count before each test
    jest.mocked(GA.prototype.pageview).mockClear();
  });

  it('inits the GA class', () => {
    render(<Analytics />);

    expect(GA).toHaveBeenCalled();
  });

  it('calls the analytics pageview fn when you navigate to a new route', () => {
    render(<Analytics />, { route: '/child/1' });

    expect(GA.prototype.pageview).toHaveBeenCalledTimes(1);
  });
});
