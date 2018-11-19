import { replace } from 'connected-react-router';
import { connect } from 'react-redux';
import getContext from 'recompose/getContext';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

import Slider from './Component';

const contextTypes = {
  playerId: PropTypes.string,
};

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
  getContext(contextTypes),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Slider);
