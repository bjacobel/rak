/**
 * This CloudFormation template supports both apps hosted at the root domain (e.g., https://react-redux-boilerplate.com)
 * and apps hosted on a subdomain (what is configured below, https://react-redux-boilerplate.bjacobel.com).
 * Note that setting the ProjectDomain and ProjectFQDomain to the same value will trigger config for the root domain
 * case, and will add extra resources (an additional A record and SAN for www.ProjectDomain).
 * You still need both values even if they are the same.
 */
module.exports = {
  // The common name for your project.
  ProjectName: 'react-redux-boilerplate',

  // The root domain that your project will live at.
  ProjectDomain: 'bjacobel.com',

  // If project will live on a subdomain, give the fully qualified domain here. Otherwise use the same value as above.
  ProjectFQDomain: 'react-redux-boilerplate.bjacobel.com',
};
