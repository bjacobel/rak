import Analytics from '../Analytics';
import Umami from '../../services/Umami';
import { render } from '../../testing/rtl';

jest.mock('services/Umami');

describe('Analytics component', () => {
  beforeEach(() => {
    // reset call count before each test
    jest.mocked(Umami.prototype.track).mockClear();
  });

  it('inits the GA class', () => {
    render(<Analytics />);

    expect(Umami).toHaveBeenCalled();
  });

  it('calls the analytics pageview fn when you navigate to a new route', () => {
    render(<Analytics />, { route: '/child/1' });

    expect(Umami.prototype.track).toHaveBeenCalledTimes(1);
  });
});
