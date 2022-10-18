import { DATA } from '../constants';

export type Data = typeof DATA;

// eslint-disable-next-line import/prefer-default-export
export const getData = () => Promise.resolve(DATA);
