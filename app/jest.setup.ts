import '@testing-library/jest-dom';

import config from '../config';

// @ts-expect-error this mirrors what DefinePlugin does for the webpack app build
global.projectConfig = config;
