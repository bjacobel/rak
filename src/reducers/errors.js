import { GET_DATA_FAILED } from '../actions/data';

export default (state = [], action) => {
  switch (action.type) {
    case GET_DATA_FAILED:
      return [...action.payload.errors, ...state];
    default:
      return state;
  }
};
