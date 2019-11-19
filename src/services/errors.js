import { init, captureException, configureScope } from '@sentry/browser';

import { LOG_ERRORS, RAVEN_ENDPT, RELEASE } from '../constants';

export default (ex, context) => {
  if (LOG_ERRORS) {
    init({ dsn: RAVEN_ENDPT });

    configureScope(scope => scope.setExtra('release', RELEASE));

    if (context) {
      configureScope(scope => scope.setExtra('context', context));
    }

    captureException(ex);
  }

  return window.console && console.error && console.error(ex);
};
