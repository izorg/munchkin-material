import * as Sentry from '@sentry/browser';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://41e93153dfb94d9db3ed8a2cbc7228a9@sentry.io/253536',
    environment: process.env.NODE_ENV,
    release: VERSION,
  });
}

export default Sentry;
