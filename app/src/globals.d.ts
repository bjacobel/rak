import config from '../../config';

declare global {
  const projectConfig: typeof config;
  const htmlWebpackPlugin: {
    options: {
      title: string;
    };
  };
}
