import { ProjectConfig } from '../config';

declare global {
  const projectConfig: ProjectConfig;
}

declare module '*.css';
