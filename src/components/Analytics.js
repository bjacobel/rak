import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import GA from '../services/GA';

export default () => {
  const location = useLocation();

  const ga = useMemo(() => new GA());

  useEffect(() => {
    if (!ga) return;
    ga.set('page', location.pathname + location.search);
    ga.pageview();
  }, [location, ga]);

  return null;
};
