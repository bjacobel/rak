import { loadingStarted, loadingEnded } from './loading';
import { getData } from '../services/data';

export const GET_DATA_FAILED = 'GET_DATA_FAILED';
export const GET_DATA_SUCCEEDED = 'GET_DATA_SUCCEEDED';

export const getDataSucceeded = data => ({ type: GET_DATA_SUCCEEDED, payload: { data } });

export const getDataFailed = err => ({ type: GET_DATA_FAILED, payload: { errors: [err] } });

export const getDataAsync = () => dispatch => {
  dispatch(loadingStarted());

  return getData()
    .then(data => {
      dispatch(loadingEnded());
      dispatch(getDataSucceeded(data));
    })
    .catch(err => {
      dispatch(loadingEnded());
      dispatch(getDataFailed(err));
    });
};
