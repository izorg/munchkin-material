import { replace } from 'connected-react-router/lib/actions';
import connect from 'react-redux/es/connect/connect';

import { setActivePlayer } from '../../../../actions';

import Slider from './Component';

const mapStateToProps = state => ({
  players: state.playerList.map(id => state.players[id]),
  selectedPlayer: state.players[state.app.activePlayerId],
});

const mapDispatchToProps = dispatch => ({
  onPlayerChange: (player) => {
    dispatch(setActivePlayer(player.id));
    dispatch(replace(`/player/${player.id}`));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
