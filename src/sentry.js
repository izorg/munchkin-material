import * as Sentry from '@sentry/browser';
import { ExtraErrorData } from '@sentry/integrations';

const sentry = (dsn) => {
  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV,
    integrations: [
      new ExtraErrorData({
        depth: 10,
      }),
    ],
    normalizeDepth: 11,
    release: VERSION,
  });
};

export default sentry;
