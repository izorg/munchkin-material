import * as Sentry from '@sentry/react';

const sentry = (dsn) => {
  const build = 'cordova' in window ? 'cordova' : 'web';

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV,
    normalizeDepth: 10,
    release: `${VERSION}-${build}`,
  });
};

export default sentry;
