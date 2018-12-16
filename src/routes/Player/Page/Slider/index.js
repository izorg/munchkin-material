import { replace } from 'connected-react-router';
import { connect } from 'react-redux';

import Slider from './Component';

const mapStateToProps = (state, ownProps) => ({
  initialSlide: state.playerList.indexOf(ownProps.playerId),
  playerList: state.playerList,
});

const mapDispatchToProps = {
  onPlayerChange: (playerId) => (dispatch) => {
    dispatch(replace(`/player/${playerId}`));
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Slider);
