import { init, captureException, configureScope } from '@sentry/browser';

import { LOG_ERRORS, RAVEN_ENDPT, RELEASE } from '../constants';

export const setup = () => {
  if (LOG_ERRORS) {
    /* eslint-disable no-underscore-dangle */
    if (!window.__SENTRY_READY__) {
      init({ dsn: RAVEN_ENDPT });
      window.__SENTRY_READY__ = true;
    }
    /* eslint-enable no-underscore-dangle */
  }
};

export default (ex, context) => {
  if (LOG_ERRORS) {
    setup(); // memoized, it is fine to call this on every log

    configureScope(scope => scope.setExtra('release', RELEASE));

    if (context) {
      configureScope(scope => scope.setExtra('context', context));
    }

    captureException(ex);
  }

  return window.console && console.error && console.error(ex);
};
