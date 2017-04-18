import { GET_DATA_SUCCEEDED } from '../actions/data';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_DATA_SUCCEEDED:
      return { ...state, ...action.payload.data };
    default:
      return state;
  }
};
