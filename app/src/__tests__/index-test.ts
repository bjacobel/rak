import { createRoot } from 'react-dom/client';

jest.mock('react-dom/client');

describe('app entry point', () => {
  let render: () => void;

  beforeEach(() => {
    render = jest.fn();
    jest.mocked(createRoot).mockReturnValue({
      render,
    } as unknown as ReturnType<typeof createRoot>);
  });

  it('renders the react app', () => {
    jest.requireActual('../index');
    expect(render).toHaveBeenCalledTimes(1);
  });
});
