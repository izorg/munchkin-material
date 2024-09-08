import {
  init,
  makeBrowserOfflineTransport,
  makeFetchTransport,
  replayIntegration,
} from "@sentry/react";

init({
  dsn: "https://2f751739a828470aaab26658058e3fe5@o115150.ingest.sentry.io/5449939",
  enabled: process.env.NODE_ENV === "production",
  environment: process.env.NODE_ENV,
  integrations: [
    replayIntegration({
      blockAllMedia: false,
      maskAllText: false,
    }),
  ],
  normalizeDepth: 10,
  release: `munchkin@${process.env.VERSION}`,
  replaysOnErrorSampleRate: 1,
  replaysSessionSampleRate: 0.01,
  transport: makeBrowserOfflineTransport(makeFetchTransport),
});
