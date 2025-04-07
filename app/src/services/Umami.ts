/* eslint-disable class-methods-use-this */

import { TRACK_ANALYTICS, UMAMI_ID } from '../constants';

declare global {
  interface Window {
    umami: {
      track: (propsFn: (existingProps: Record<string, string>) => Record<string, string>) => void;
    };
    scriptLoaded: boolean;
  }
}

window.scriptLoaded = false;

export default class Umami {
  constructor() {
    if (!window.scriptLoaded) {
      const script = document.createElement('script');
      script.defer = true;
      script.src = 'https://cloud.umami.is/script.js';
      script.setAttribute('data-website-id', UMAMI_ID);
      script.setAttribute('data-auto-track', 'false');
      document.body.appendChild(script);

      window.scriptLoaded = true;
    }
  }

  track(propsFn: (existingProps: Record<string, string>) => Record<string, string>) {
    if (window.umami && TRACK_ANALYTICS) {
      window.umami.track(propsFn);
    }
  }
}
