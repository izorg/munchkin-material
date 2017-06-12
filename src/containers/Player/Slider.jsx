import { connect } from 'react-redux';
import { goBack, replace } from 'react-router-redux';

import actions from '../../actions';
import PlayerSlider from '../../components/Player/Slider';

const mapStateToProps = ({ app: { activePlayerId, bannerVisible }, players }) => ({
  bannerVisible,
  players,
  selectedPlayer: players.find(({ id }) => id === activePlayerId),
});

const mapDispatchToProps = dispatch => ({
  onBack: () => dispatch(goBack()),
  onDiceTouchTap: () => {
    dispatch(actions.throwDice());
  },
  onPlayerChange: (player) => {
    dispatch(actions.setActivePlayer(player.id));
    dispatch(replace(`/player/${player.id}`));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSlider);
