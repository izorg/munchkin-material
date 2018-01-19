import { replace } from 'connected-react-router/lib/actions';
import connect from 'react-redux/es/connect/connect';

import { setActivePlayer } from '../../../../../../actions';

import Slider from './Component';

const mapStateToProps = state => ({
  initialSlide: state.playerList.indexOf(state.app.activePlayerId),
  playerList: state.playerList,
});

const mapDispatchToProps = {
  onPlayerChange: playerId => (dispatch) => {
    dispatch(setActivePlayer(playerId));
    dispatch(replace(`/player/${playerId}`));
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
