import { Workbox } from 'workbox-window';
import { SW_FILENAME } from '../constants';

export const register = () => {
  if (process.env.SW_ENABLE && 'serviceWorker' in navigator) {
    const wb = new Workbox(SW_FILENAME);
    wb.register();
  }
};
