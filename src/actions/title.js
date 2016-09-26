import {
  loadingStarted,
  loadingEnded,
} from './loading';
import { getTitle } from '../services/title';

export const GET_TITLE_FAILED = 'GET_TITLE_FAILED';
export const GET_TITLE_SUCCEEDED = 'GET_TITLE_SUCCEEDED';

export const getTitleSucceeded = (title) => {
  return { type: GET_TITLE_SUCCEEDED, payload: { title } };
};

export const getTitleFailed = (err) => {
  return { type: GET_TITLE_FAILED, payload: { err }, error: true };
};

export const getTitleAsync = () => {
  return (dispatch) => {
    dispatch(loadingStarted());

    return getTitle()
      .then((title) => {
        dispatch(loadingEnded());
        dispatch(getTitleSucceeded(title));
      })
      .catch((err) => {
        dispatch(loadingEnded());
        dispatch(getTitleFailed(err));
      });
  };
};
