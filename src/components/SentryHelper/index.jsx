import * as Sentry from '@sentry/react';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useStore } from 'react-redux';
import { useLocation } from 'react-router-dom';

import ErrorBoundary from './ErrorBoundary';

const displayName = 'SentryHelper';

const SentryHelper = ({ children, forceNavigationBreadcrumbs }) => {
  const location = useLocation();
  const fromRef = useRef(`${location.pathname}${location.search}`);
  const store = useStore();

  useEffect(() => {
    if (!forceNavigationBreadcrumbs) {
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
  }, [forceNavigationBreadcrumbs, location.pathname, location.search]);

  return <ErrorBoundary store={store}>{children}</ErrorBoundary>;
};

SentryHelper.propTypes = {
  children: PropTypes.node.isRequired,
  forceNavigationBreadcrumbs: PropTypes.bool,
};

SentryHelper.defaultProps = {
  forceNavigationBreadcrumbs: false,
};

SentryHelper.displayName = displayName;

export default SentryHelper;
