import { createSelector } from 'reselect';
import { matchPath } from 'react-router-dom';

import * as modes from './modes';

const path = `/:mode(${Object.values(modes).join('|')})?`;

export const matchSelector = createSelector(
  (state) => state.router.location.pathname,
  (pathname) => matchPath(pathname, { path }),
);

export const modeSelector = createSelector(
  matchSelector,
  (match) => match && match.params.mode,
);
