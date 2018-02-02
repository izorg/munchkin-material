import connect from 'react-redux/es/connect/connect';

import { movePlayer } from '../../../../../actions';

import { EDIT } from '../../../modes';
import { getModeFromPathname } from '../../../path';

import Component from './Component';

const mapStateToProps = (state) => ({
  editMode: getModeFromPathname(state.router.location.pathname) === EDIT,
  playerList: state.playerList,
});

const mapDispatchToProps = {
  onPlayerMove: movePlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
