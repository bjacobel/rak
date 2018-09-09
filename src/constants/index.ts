export const IS_PROD = process.env.NODE_ENV === 'production';
export const SHOW_DEV_TOOLS = !IS_PROD;
export const TRACK_ANALYTICS = IS_PROD;
export const LOG_ERRORS = IS_PROD;
export const DATA = {
  text: 'an opinionated skeleton to quickly set up a new React app',
};
export const RAVEN_ENDPT = projectConfig.RavenDSN;
export const GA_ID = projectConfig.GAProperty;
export const RELEASE = process.env.GITHUB_SHA;
