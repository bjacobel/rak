import { title } from '../constants';

export const getTitle = () => {
  return new Promise((resolve) => {
    resolve(title);
  });
};
