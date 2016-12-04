import { DATA } from '../constants';

export const getData = () => {  // eslint-disable-line import/prefer-default-export
  return new Promise((resolve) => {
    resolve(DATA);
  });
};
