import matchPath from 'react-router-dom/es/matchPath';

import * as modes from './modes';

const path = `/:mode(${Object.values(modes).join('|')})?`;

export const getModeFromPathname = (pathname) => {
  const match = matchPath(pathname, { path });

  return match && match.params.mode;
};

export default path;
