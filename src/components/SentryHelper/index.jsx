import * as Sentry from '@sentry/react';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const displayName = 'SentryHelper';

const SentryHelper = ({ children }) => {
  const location = useLocation();
  const fromRef = useRef(`${location.pathname}${location.search}`);

  useEffect(() => {
    if (!window.cordova) {
      return;
    }

    const from = fromRef.current;
    const to = `${location.pathname}${location.search}`;

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
  }, [location.pathname, location.search]);

  return (
    <Sentry.ErrorBoundary fallback={null}>{children}</Sentry.ErrorBoundary>
  );
};

SentryHelper.propTypes = {
  children: PropTypes.node.isRequired,
};

SentryHelper.displayName = displayName;

export default SentryHelper;
