import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import { MULTI, SINGLE } from '../../modes';
import { matchSelector, modeSelector } from '../../selectors';

import Component from './Component';

const menu = createSelector(
  matchSelector,
  (match) => match && match.isExact && match.params.mode !== MULTI,
);

const singleMode = createSelector(modeSelector, (mode) => mode === SINGLE);

const mapStateToProps = createStructuredSelector({
  empty: (state) => !state.playerList.length,
  menu,
  singleMode,
});

export default connect(mapStateToProps)(Component);
