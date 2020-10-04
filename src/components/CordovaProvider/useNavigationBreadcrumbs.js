import { addBreadcrumb } from '@sentry/react';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const useNavigationBreadcrumbs = () => {
  const location = useLocation();

  const to = `${location.pathname}${location.search}`;
  const fromRef = useRef(to);

  useEffect(() => {
    const from = fromRef.current;

    if (to === from) {
      return;
    }

    addBreadcrumb({
      category: 'navigation',
      data: {
        from,
        to,
      },
    });

    fromRef.current = to;
  }, [to]);
};

export default useNavigationBreadcrumbs;
