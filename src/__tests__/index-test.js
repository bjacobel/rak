import { createRoot } from 'react-dom/client';

jest.mock('react-dom/client');

describe('app entry point', () => {
  let render;

  beforeEach(() => {
    render = jest.fn();
    createRoot.mockReturnValue({
      render,
    });
  });

  it('renders the react app', () => {
    jest.requireActual('../index');
    expect(render).toHaveBeenCalledTimes(1);
  });
});
