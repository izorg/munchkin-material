import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { get, isEqual } from 'lodash/fp';

import { movePlayer } from '../../../../../ducks/playerList';

import { EDIT } from '../../../modes';
import { modeSelector } from '../../../selectors';

import Component from './Component';

const editMode = createSelector(modeSelector, isEqual(EDIT));

const mapStateToProps = createStructuredSelector({
  editMode,
  playerList: get('playerList'),
});

const mapDispatchToProps = {
  onPlayerMove: movePlayer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
