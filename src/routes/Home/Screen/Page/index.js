import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import { MULTI } from '../../modes';
import { matchSelector } from '../../selectors';

import Component from './Component';

const menu = createSelector(
  matchSelector,
  (match) => match && match.isExact && match.params.mode !== MULTI,
);

const mapStateToProps = createStructuredSelector({
  empty: (state) => !state.playerList.length,
  menu,
  singleMode: (state) => state.app.singleMode,
});

export default connect(mapStateToProps)(Component);
