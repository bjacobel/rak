/* eslint-disable class-methods-use-this */

import { GA_ID, TRACK_ANALYTICS } from '../constants';

// @TODO: I'd really like to not install ga onto window; it should be self-contained by this class

export default class Analytics {
  constructor() {
    window.ga =
      window.ga ||
      // eslint-disable-next-line func-names
      function(...args) {
        (window.ga.q = window.ga.q || []).push(args);
      };
    window.ga.l = +new Date();
    window.ga('create', GA_ID, 'auto');

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.google-analytics.com/analytics.js';
    document.body.appendChild(script);
  }

  pageview() {
    if (TRACK_ANALYTICS) {
      window.ga('send', 'pageview');
    }
  }

  event(category, action, value) {
    if (TRACK_ANALYTICS) {
      window.ga('send', 'event', category, action, Number.isNaN(value) ? undefined : value);
    }
  }
}
