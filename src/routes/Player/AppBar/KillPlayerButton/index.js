import { connect } from 'react-redux';
import { compose, fromRenderProps } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import { get } from 'lodash/fp';

import PlayerContext from '../../../../components/PlayerContext';
import { killPlayer } from '../../../../ducks/players';
import { setUndo, UNDO_KILL_PLAYER } from '../../../../ducks/undo';

import Component from './Component';

const disabled = createSelector(
  get('players'),
  (state, ownProps) => ownProps.playerId,
  (players, playerId) => players[playerId].gear === 0,
);

const mapStateToProps = createStructuredSelector({
  disabled,
});

const mapDispatchToProps = {
  onClick: (playerId) => (dispatch, getState) => {
    const player = get(['players', playerId], getState());

    dispatch(killPlayer(playerId));
    dispatch(
      setUndo({
        type: UNDO_KILL_PLAYER,
        player,
      }),
    );
  },
};

export default compose(
  fromRenderProps(PlayerContext.Consumer, (playerId) => ({ playerId })),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Component);
