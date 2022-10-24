import { ProjectConfig } from '../config';

declare global {
  const projectConfig: ProjectConfig;
  const htmlWebpackPlugin: {
    options: {
      title: string;
    };
  };
}
