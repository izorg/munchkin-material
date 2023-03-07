import {
  init,
  makeBrowserOfflineTransport,
  makeFetchTransport,
} from "@sentry/react";

init({
  dsn: "https://2f751739a828470aaab26658058e3fe5@o115150.ingest.sentry.io/5449939",
  enabled: !window.BuildInfo.debug,
  environment: process.env.NODE_ENV,
  normalizeDepth: 10,
  release: window.BuildInfo.version,
  transport: makeBrowserOfflineTransport(makeFetchTransport),
});
