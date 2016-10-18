import render from '../src/index';

jest.mock('react-dom');
jest.mock('redux-thunk');
jest.mock('react-redux');
jest.mock('redux');
jest.mock('../src/reducers');
jest.mock('../src/components/Routes');
import ReactDOM from 'react-dom';


describe('app index file', () => {
  it('calls ReactDOM.render with a Provider and a DOM node', () => {

  });

  it('contains Routes inside the Provider', () => {

  });

  it('enhances the store with devtools when SHOW_DEVTOOLS is on and the right window stuff is set', () => {

  });

  it('does nothing to the store when SHOW_DEVTOOLS is false', () => {

  });

  it('does nothing to the store when the redux-devtools-extension window prop is missing', () => {

  });
});
