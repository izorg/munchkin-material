import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import { flow, get, isEmpty, size } from 'lodash/fp';

import { MULTI } from './modes';

import Component from './Component';

const menu = createSelector(
  (state, ownProps) => ownProps.match,
  (match) => match && match.isExact && match.params.mode !== MULTI,
);

const mode = (state, ownProps) => get(['match', 'params', 'mode'], ownProps);

const mapStateToProps = createStructuredSelector({
  empty: flow(
    get('playerList'),
    isEmpty,
  ),
  menu,
  menuCollapsed: get(['app', 'menuCollapsed']),
  mode,
  playerCount: flow(
    get('playerList'),
    size,
  ),
  singleMode: get(['app', 'singleMode']),
});

export default compose(
  hot,
  connect(mapStateToProps),
)(Component);
