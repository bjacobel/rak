import config from '../../config';

export const SHOW_DEV_TOOLS = process.env.NODE_ENV !== 'production';
export const TRACK_ANALYTICS = process.env.NODE_ENV === 'production';
export const LOG_ERRORS = process.env.NODE_ENV === 'production';
export const DATA = { text: 'an opinionated skeleton to quickly set up a new React app' };
export const RAVEN_ENDPT = config.RavenDSN;
export const GA_ID = config.GAProperty;
export const RELEASE = process.env.TRAVIS_COMMIT;
