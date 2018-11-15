import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import { createSelector, createStructuredSelector } from 'reselect';

import { MULTI } from '../modes';

import Component from './Component';

const menu = createSelector(
  (state, ownProps) => ownProps.match,
  (match) => match && match.isExact && match.params.mode !== MULTI,
);

const mapStateToProps = createStructuredSelector({
  empty: (state) => !state.playerList.length,
  menu,
  playerCount: (state) => state.playerList.length,
  singleMode: (state) => state.app.singleMode,
});

export default compose(
  withRouter,
  connect(mapStateToProps),
)(Component);
