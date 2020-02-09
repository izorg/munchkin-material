const sentry = (Sentry) => (store) => (next) => (action) => {
  if (!Sentry) {
    return next(action);
  }

  const { type, ...rest } = action;

  Sentry.addBreadcrumb({
    category: 'redux.action',
    data: rest,
    level: Sentry.Severity.Info,
    message: type,
  });

  try {
    return next(action);
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setExtras({
        action,
        state: store.getState(),
      });
      Sentry.captureException(error);
    });

    throw error;
  }
};

export default sentry;
