import {
  init,
  makeBrowserOfflineTransport,
  makeFetchTransport,
  replayIntegration,
} from "@sentry/react";

init({
  dsn: "https://2f751739a828470aaab26658058e3fe5@o115150.ingest.sentry.io/5449939",
  enabled: !window.BuildInfo.debug,
  environment: process.env.NODE_ENV,
  ignoreErrors: [
    "BILLING_UNAVAILABLE",
    "The user cancelled the order.",
    "USER_CANCELED",
  ],
  integrations: [
    replayIntegration({
      blockAllMedia: false,
      maskAllText: false,
    }),
  ],
  normalizeDepth: 10,
  release: `munchkin@${window.BuildInfo.version}`,
  replaysOnErrorSampleRate: 1,
  replaysSessionSampleRate: 0,
  transport: makeBrowserOfflineTransport(makeFetchTransport),
});
