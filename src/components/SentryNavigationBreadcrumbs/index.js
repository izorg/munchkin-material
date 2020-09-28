import * as Sentry from '@sentry/react';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const displayName = 'SentryNavigationBreadcrumbs';

const SentryNavigationBreadcrumbs = () => {
  const location = useLocation();

  const to = `${location.pathname}${location.search}`;
  const fromRef = useRef(to);

  useEffect(() => {
    const from = fromRef.current;

    if (to !== from) {
      Sentry.addBreadcrumb({
        category: 'navigation',
        data: {
          from,
          to,
        },
      });
    }

    fromRef.current = to;
  }, [to]);

  return null;
};

SentryNavigationBreadcrumbs.displayName = displayName;

export default SentryNavigationBreadcrumbs;
