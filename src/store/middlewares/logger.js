const logger = (Sentry) => () => (next) => (action) => {
  const { type, ...rest } = action;

  Sentry.addBreadcrumb({
    category: 'redux.action',
    data: rest,
    level: Sentry.Severity.Info,
    message: type,
  });

  return next(action);
};

export default logger;
