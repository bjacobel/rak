export const IS_PROD = process.env.NODE_ENV === 'production';
export const SHOW_DEV_TOOLS = !IS_PROD;
export const SHOW_STACK = !IS_PROD;
export const TRACK_ANALYTICS = IS_PROD;
export const LOG_ERRORS = IS_PROD;
export const DATA = {
  text: 'an opinionated skeleton to quickly set up a new React app',
};
export const RAVEN_ENDPT = projectConfig.RavenDSN;
export const UMAMI_ID = projectConfig.UmamiWebsite;
export const RELEASE = process.env.GITHUB_SHA;
export const SW_FILENAME = 'service-worker.js';
