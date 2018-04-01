import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import { EDIT, SINGLE } from '../../modes';
import { matchSelector, modeSelector } from '../../selectors';

import Component from './Component';

const menu = createSelector(
  matchSelector,
  (match) => match && match.isExact && match.params.mode !== EDIT,
);

const singleMode = createSelector(modeSelector, (mode) => mode === SINGLE);

const mapStateToProps = createStructuredSelector({
  empty: (state) => !state.playerList.length,
  menu,
  singleMode,
});

export default connect(mapStateToProps)(Component);
