import React, { useEffect, useMemo } from 'react';
import { Router, useLocation } from '@reach/router';

import GA from '../services/GA';

const LocationTracker = () => {
  const location = useLocation();

  const ga = useMemo(() => new GA());

  useEffect(() => {
    if (!ga) return;
    ga.set('page', location.pathname + location.search);
    ga.pageview('send', 'pageview');
  }, [location, ga]);

  return null;
};

export default () => (
  <Router primary={false}>
    <LocationTracker path="*" />
  </Router>
);
