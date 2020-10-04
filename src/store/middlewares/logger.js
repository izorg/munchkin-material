import { addBreadcrumb, Severity } from '@sentry/react';

const logger = () => (next) => (action) => {
  const { type, ...rest } = action;

  addBreadcrumb({
    category: 'redux.action',
    data: rest,
    level: Severity.Info,
    message: type,
  });

  return next(action);
};

export default logger;
