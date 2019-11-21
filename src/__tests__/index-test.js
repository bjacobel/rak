import ReactDOM from 'react-dom';

jest.mock('react-dom');

describe('app entry point', () => {
  it('renders the react app', () => {
    jest.requireActual('../index');
    expect(ReactDOM.render).toHaveBeenCalledTimes(1);
  });
});
