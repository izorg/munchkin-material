import { connect } from 'react-redux';
import matchPath from 'react-router-dom/matchPath';
import { createSelector, createStructuredSelector } from 'reselect';

import ScreenLoader from '../ScreenLoader';

const loader = () =>
  import(/* webpackChunkName: "player-form" */ './Screen/index');

const match = createSelector(
  (state) => state.router.location.pathname,
  (pathname) =>
    matchPath(pathname, { path: '/new' }) ||
    matchPath(pathname, { path: '/edit/:id' }),
);

const mapStateToProps = createStructuredSelector({
  loader: () => loader,
  match,
});

export default connect(mapStateToProps)(ScreenLoader);
