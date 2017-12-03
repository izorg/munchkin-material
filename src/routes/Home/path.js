import matchPath from 'react-router-dom/es/matchPath';

import modes from './modes';

const path = `/:mode(${Object.values(modes).join('|')})?`;

export const getModeFromLocation = (pathname) => {
  const match = matchPath(pathname, { path });

  return match && match.params.mode;
};

export default path;
