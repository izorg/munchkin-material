import { connect } from 'react-redux';

import { movePlayer } from '../../../../../ducks/playerList';

import { EDIT } from '../../../modes';
import { modeSelector } from '../../../selectors';

import Component from './Component';

const mapStateToProps = (state) => ({
  editMode: modeSelector(state) === EDIT,
  playerList: state.playerList,
});

const mapDispatchToProps = {
  onPlayerMove: movePlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
