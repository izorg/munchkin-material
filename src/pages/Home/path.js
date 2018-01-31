import matchPath from 'react-router-dom/matchPath';

import * as modes from './modes';

const path = `/:mode(${Object.values(modes).join('|')})?`;

export const getModeFromPathname = (pathname) => {
  const match = matchPath(pathname, { path });

  return Boolean(match) && match.params.mode;
};

export default path;
