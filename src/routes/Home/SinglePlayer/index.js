import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { get } from 'lodash/fp';

import { setCombatPlayerBonus } from '../../../ducks/combat';
import { togglePlayerSex, updatePlayer } from '../../../ducks/players';
import {
  isLevelDecrementDisabled,
  isLevelIncrementDisabled,
} from '../../../utils/levelLimit';

import Component from './Component';

const playerSelector = createSelector(
  get('players'),
  get(['app', 'singleModePlayerId']),
  (players, id) => players[id],
);

const getPlayerLevel = createSelector(
  playerSelector,
  get('level'),
);

const levelDecrementDisabled = (state) => {
  const levelLimit = get(['app', 'levelLimit'], state);
  const level = getPlayerLevel(state);

  return isLevelDecrementDisabled(level, levelLimit);
};

const levelIncrementDisabled = (state) => {
  const levelLimit = get(['app', 'levelLimit'], state);
  const epic = get(['app', 'epic'], state);
  const level = getPlayerLevel(state);

  return isLevelIncrementDisabled(level, levelLimit, epic);
};

const mapStateToProps = createStructuredSelector({
  bonus: get(['combat', 'playerBonus']),
  levelDecrementDisabled,
  levelIncrementDisabled,
  player: playerSelector,
});

const mapDispatchToProps = {
  onBonusDecrement: () => (dispatch, getState) => {
    const {
      combat: { playerBonus },
    } = getState();

    dispatch(setCombatPlayerBonus(playerBonus - 1));
  },
  onBonusIncrement: () => (dispatch, getState) => {
    const {
      combat: { playerBonus },
    } = getState();

    dispatch(setCombatPlayerBonus(playerBonus + 1));
  },
  onGearDecrement: () => (dispatch, getState) => {
    const {
      combat: { playerId },
      players,
    } = getState();

    const player = players[playerId];

    dispatch(
      updatePlayer({
        ...player,
        gear: player.gear - 1,
      }),
    );
  },
  onSexToggle: () => (dispatch, getState) => {
    const {
      combat: { playerId },
    } = getState();

    dispatch(togglePlayerSex(playerId));
  },
  onGearIncrement: () => (dispatch, getState) => {
    const {
      combat: { playerId },
      players,
    } = getState();

    const player = players[playerId];

    dispatch(
      updatePlayer({
        ...player,
        gear: player.gear + 1,
      }),
    );
  },
  onLevelDecrement: () => (dispatch, getState) => {
    const {
      combat: { playerId },
      players,
    } = getState();

    const player = players[playerId];

    dispatch(
      updatePlayer({
        ...player,
        level: player.level - 1,
      }),
    );
  },
  onLevelIncrement: () => (dispatch, getState) => {
    const {
      combat: { playerId },
      players,
    } = getState();

    const player = players[playerId];

    dispatch(
      updatePlayer({
        ...player,
        level: player.level + 1,
      }),
    );
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
