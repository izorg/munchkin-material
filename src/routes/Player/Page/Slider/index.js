import { replace } from 'connected-react-router';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

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

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Slider);
