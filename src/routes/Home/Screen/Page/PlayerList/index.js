import connect from 'react-redux/es/connect/connect';

import { movePlayer } from '../../../../../actions';

import Component from './Component';

const mapStateToProps = state => ({
  playerList: state.playerList,
});

const mapDispatchToProps = {
  onPlayerMove: movePlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
