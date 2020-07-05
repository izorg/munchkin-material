import { ExtraErrorData, RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/react';

const sentry = (dsn) => {
  let integrations = [
    new ExtraErrorData({
      depth: 10,
    }),
  ];

  if (window.cordova) {
    integrations = [
      ...integrations,
      new RewriteFrames({
        iteratee: (frame) => {
          frame.filename = frame.filename.replace(/^.*\/www\//, '/');

          return frame;
        },
      }),
    ];
  }

  const build = window.cordova ? 'cordova' : 'web';

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV,
    integrations,
    normalizeDepth: 11,
    release: `${VERSION}-${build}`,
  });
};

export default sentry;
