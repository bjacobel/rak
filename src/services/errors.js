import Raven from 'raven-js';

import { LOG_ERRORS, RAVEN_ENDPT, RELEASE } from '../constants';

export default (ex, context) => {
  if (LOG_ERRORS) {
    // eslint-disable-next-line no-underscore-dangle
    if (!Raven._isRavenInstalled) {
      Raven.config(RAVEN_ENDPT, { release: RELEASE }).install();
    }

    Raven.captureException(ex, {
      extra: context,
    });
  }

  return window.console && console.error && console.error(ex);
};
