import { connect } from 'react-redux';
import matchPath from 'react-router-dom/matchPath';
import { createSelector, createStructuredSelector } from 'reselect';

import path from './path';
import Screen from './Screen';

const match = createSelector(
  (state) => state.router.location.pathname,
  (pathname) => matchPath(pathname, { path }),
);

const mapStateToProps = createStructuredSelector({
  match,
});

export default connect(mapStateToProps)(Screen);
