import * as Sentry from '@sentry/browser';

const sentry = (dsn) => {
  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV,
    release: VERSION,
  });
};

export default sentry;
