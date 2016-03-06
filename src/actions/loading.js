export const LOADING_STARTED = 'LOADING_STARTED';
export const LOADING_ENDED = 'LOADING_ENDED';

export const loadingStarted = () => {
  return { type: LOADING_STARTED };
};

export const loadingEnded = () => {
  return { type: LOADING_ENDED };
};
