import { TITLE } from '../constants';

export const getTitle = () => {  // eslint-disable-line import/prefer-default-export
  return new Promise((resolve) => {
    resolve(TITLE);
  });
};
