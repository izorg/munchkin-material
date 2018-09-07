import { getLocation } from 'connected-react-router';
import { connect } from 'react-redux';
import matchPath from 'react-router-dom/matchPath';
import { createSelector, createStructuredSelector } from 'reselect';
import { flow, get } from 'lodash/fp';

import ScreenLoader from '../../components/ScreenLoader';

const loader = () => import(/* webpackChunkName: "player" */ './Screen');

const match = createSelector(
  flow(
    getLocation,
    get('pathname'),
  ),
  (pathname) => matchPath(pathname, { path: '/player/:id' }),
);

const mapStateToProps = createStructuredSelector({
  loader: () => loader,
  match,
});

export default connect(mapStateToProps)(ScreenLoader);
