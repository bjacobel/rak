import { render } from '../../testing/rtl';
import Routes from '../Routes';

jest.mock('../Main', () => jest.fn().mockReturnValue('Main'));
jest.mock('../Child', () => jest.fn().mockReturnValue('Child'));
jest.mock('../NotFound', () => jest.fn().mockReturnValue('NotFound'));

describe('Router', () => {
  it('navigates to Main on /', () => {
    const { getByText } = render(<Routes />, { route: '/' });

    expect(getByText('Main')).toBeInTheDocument();
  });

  it('navigates to Child on /child/:id', () => {
    const { getByText } = render(<Routes />, { route: '/child/1' });

    expect(getByText('Child')).toBeInTheDocument();
  });

  it('navigates to NotFound by default', () => {
    const { getByText } = render(<Routes />, { route: '/asdf' });

    expect(getByText('NotFound')).toBeInTheDocument();
  });
});
