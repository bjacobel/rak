export interface ProjectConfig {
  readonly ProjectName: string;
  readonly ProjectDomain: string;
  readonly ProjectFQDomain: string;
  readonly ExistingHostedZone: string;
  readonly SentryOrg: string;
  readonly SentryProject: string;
  readonly RavenDSN: string;
  readonly GAProperty: string;
  readonly Region: string;
}

declare const config: ProjectConfig;
export default config;
