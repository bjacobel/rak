import { useEffect, useMemo } from 'react';
import { useLocation, useSearch } from 'wouter';

import GA from '../services/GA';

export default () => {
  const location = useLocation();
  const search = useSearch();

  const ga = useMemo(() => new GA(), []);

  useEffect(() => {
    if (!ga) return;
    ga.set('page', location + search);
    ga.pageview();
  }, [location, search, ga]);

  return null;
};
