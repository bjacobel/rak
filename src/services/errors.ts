import { BrowserMicroSentryClient } from '@micro-sentry/browser';
import { BreadcrumbsPlugin } from '@micro-sentry/breadcrumbs-plugin';

import { LOG_ERRORS, RAVEN_ENDPT, RELEASE } from '../constants';

let client: BrowserMicroSentryClient;

export const setup = () => {
  if (LOG_ERRORS) {
    if (!client) {
      client = new BrowserMicroSentryClient({
        dsn: RAVEN_ENDPT,
        release: RELEASE,
        plugins: [BreadcrumbsPlugin],
      });
    }
  }
};

export default (ex: Error, context?: string) => {
  if (LOG_ERRORS) {
    setup(); // memoized, it is fine to call this on every log

    if (context) {
      client.setExtra('context', context);
    }

    client.report(ex);
  }

  return window.console && console.error && console.error(ex);
};
