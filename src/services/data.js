import { DATA } from '../constants';

export const getData = () =>
  // eslint-disable-line import/prefer-default-export
  new Promise(resolve => {
    resolve(DATA);
  });
