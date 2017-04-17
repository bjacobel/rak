const Analytics = jest.fn();

Analytics.prototype = {
  pageview: jest.fn(),
};

export default Analytics;
