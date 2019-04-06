import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose, mapProps } from 'recompose';
import { omit } from 'lodash/fp';

import { togglePlayer, unselectAllPlayers } from '../../../../ducks/app';
import { MULTI } from '../../modes';

import Component from './Component';

const mapStateToProps = (state, ownProps) => {
  const { playerId } = ownProps;
  const { mode } = ownProps;

  return {
    multiSelected:
      mode === MULTI && state.app.selectedPlayerIds.includes(playerId),
    player: state.players[playerId],
  };
};

const onMultiSelectActivate = (playerId) => (dispatch) => {
  dispatch(unselectAllPlayers());
  dispatch(togglePlayer(playerId));
  dispatch(push(`/${MULTI}`));
};

const onPlayerEdit = (playerId) => push(`?player=${playerId}`);

const onPlayerSelect = (playerId) => push(`/player/${playerId}`);

const onPlayerToggle = (playerId) => (dispatch, getState) => {
  dispatch(togglePlayer(playerId));

  const {
    app: { selectedPlayerIds },
  } = getState();

  if (selectedPlayerIds.length === 0) {
    dispatch(goBack());
  }
};

const mapDispatchToProps = {
  onMultiSelectActivate,
  onPlayerEdit,
  onPlayerSelect,
  onPlayerToggle,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  mapProps(omit('playerId')),
)(Component);
