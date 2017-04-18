import { LOADING_STARTED, LOADING_ENDED } from '../actions/loading';

const loading = (state = false, action) => {
  switch (action.type) {
    case LOADING_STARTED:
      return true;
    case LOADING_ENDED:
      return false;
    default:
      return state;
  }
};

export default loading;
