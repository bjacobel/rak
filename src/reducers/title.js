import {
  GET_TITLE_FAILED,
  GET_TITLE_SUCCEEDED
} from '../actions/title';

const title = (state = {}, action) => {
  switch (action.type) {
  case GET_TITLE_SUCCEEDED:
    return {
      content: action.payload.title,
      error: false
    };
  case GET_TITLE_FAILED:
    return {
      content: null,
      error: action.payload.error
    };
  default:
    return state;
  }
};

export default title;
