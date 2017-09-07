import { connect } from 'react-redux';
import { goBack, replace } from 'react-router-redux';

import { setActivePlayer, throwDice } from '../../actions';
import PlayerSlider from '../../components/Player/Slider';

const mapStateToProps = ({ app: { activePlayerId }, playerList, players }) => ({
  players: playerList.map(id => players[id]),
  selectedPlayer: players[activePlayerId],
});

const mapDispatchToProps = dispatch => ({
  onBack: () => dispatch(goBack()),
  onDiceClick: () => {
    dispatch(throwDice());
  },
  onPlayerChange: (player) => {
    dispatch(setActivePlayer(player.id));
    dispatch(replace(`/player/${player.id}`));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSlider);
