import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/react';

const sentry = (dsn) => {
  const integrations = [];

  if ('cordova' in window) {
    integrations.push(
      new RewriteFrames({
        iteratee: (frame) => {
          frame.filename = frame.filename.replace(/^.*\/www\//, '/');

          return frame;
        },
      }),
    );
  }

  const build = 'cordova' in window ? 'cordova' : 'web';

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV,
    integrations,
    normalizeDepth: 10,
    release: `${VERSION}-${build}`,
  });
};

export default sentry;
