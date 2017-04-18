export const LOADING_STARTED = 'LOADING_STARTED';
export const LOADING_ENDED = 'LOADING_ENDED';

export const loadingStarted = () => ({ type: LOADING_STARTED });

export const loadingEnded = () => ({ type: LOADING_ENDED });
