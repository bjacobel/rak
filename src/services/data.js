import { DATA } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const getData = () =>
  new Promise(resolve => {
    resolve(DATA);
  });
