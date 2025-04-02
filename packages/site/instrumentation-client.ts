// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { init, replayIntegration } from "@sentry/nextjs";

init({
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  enabled: process.env.NEXT_PUBLIC_SENTRY_ENABLED === "true",

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    replayIntegration({
      blockAllMedia: false,
      maskAllText: false,
    }),
  ],

  replaysOnErrorSampleRate: 1,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.1,
});
