import * as Sentry from '@sentry/react';

const sentry = () => {
  Sentry.init({
    dsn:
      'https://2f751739a828470aaab26658058e3fe5@o115150.ingest.sentry.io/5449939',
    environment: process.env.NODE_ENV,
    normalizeDepth: 10,
    release: VERSION,
  });
};

export default sentry;
