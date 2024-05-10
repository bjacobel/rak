/**
 * Rak's CloudFormation template supports both apps hosted at the root domain (e.g., https://rak.com)
 * and apps hosted on a subdomain (what is configured below, https://rak.bjacobel.com).
 * Note that setting the ProjectDomain and ProjectFQDomain to the same value will trigger config for the root domain
 * case, and will add extra resources (an additional A record and SAN for www.ProjectDomain).
 * You still need both values even if they are the same.
 */
const config = {
  // The common name for your project. Used for naming CloudFormation stacks and CloudFront distros.
  ProjectName: 'rak',

  // The root domain that your project will live at. Used for creating hosted zones and connecting DNS.
  ProjectDomain: 'bjacobel.com',

  // If project will live on a subdomain, give the fully qualified domain here. Otherwise use the same value as above.
  ProjectFQDomain: 'rak.bjacobel.com',

  // If you already have a Route53 hosted zone for the ProjectDomain domain, setting this value to `'true'` will
  // re-use the zone. Setting it to `'false'` will create a new zone.
  ExistingHostedZone: 'true',

  // Configuration for sentry.io error and release monitoring
  SentryOrg: 'bjacobelcom',
  SentryProject: 'rak',
  RavenDSN: 'https://a47a3c1a936941379cb5e0318bb4333a@sentry.io/114591',

  // Configuration for Google Analytics
  GAProperty: 'UA-34138258-8',

  // AWS Region you would like services to be created in
  Region: 'us-east-1',
};

if (!module.parent && process.argv[2]) {
  const param = process.argv[2];
  console.log(config[param] || 'Not passed a valid config param.');
}

module.exports = config;
