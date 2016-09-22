import { TITLE } from '../constants';

export const getTitle = () => {
  return new Promise((resolve) => {
    resolve(TITLE);
  });
};
