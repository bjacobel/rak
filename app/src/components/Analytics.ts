import { useEffect, useMemo } from 'react';
import { useLocation, useSearch } from 'wouter';

import Umami from '../services/Umami';

export default () => {
  const [location] = useLocation();
  const search = useSearch();

  const umami = useMemo(() => new Umami(), []);

  useEffect(() => {
    if (umami) {
      umami.track(props => ({ ...props, url: location + search }));
    }
  }, [location, search, umami]);

  return null;
};
