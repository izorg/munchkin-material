import { connect } from 'react-redux';
import { setCombatPlayerBonus, updatePlayer } from 'munchkin-core/lib/actions';

import Component from './Component';
import { togglePlayerGender } from '../../../../../actions';

const mapStateToProps = (state) => ({
  bonus: state.combat.playerBonus,
  player: state.players[state.app.singleModePlayerId],
});

const mapDispatchToProps = {
  onBonusDecrement: () => (dispatch, getState) => {
    const { combat: { playerBonus } } = getState();

    dispatch(setCombatPlayerBonus(playerBonus - 1));
  },
  onBonusIncrement: () => (dispatch, getState) => {
    const { combat: { playerBonus } } = getState();

    dispatch(setCombatPlayerBonus(playerBonus + 1));
  },
  onGearDecrement: () => (dispatch, getState) => {
    const { combat: { playerId }, players } = getState();

    const player = players[playerId];

    dispatch(
      updatePlayer({
        ...player,
        gear: player.gear - 1,
      }),
    );
  },
  onGenderToggle: () => (dispatch, getState) => {
    const { combat: { playerId } } = getState();

    dispatch(togglePlayerGender(playerId));
  },
  onGearIncrement: () => (dispatch, getState) => {
    const { combat: { playerId }, players } = getState();

    const player = players[playerId];

    dispatch(
      updatePlayer({
        ...player,
        gear: player.gear + 1,
      }),
    );
  },
  onLevelDecrement: () => (dispatch, getState) => {
    const { combat: { playerId }, players } = getState();

    const player = players[playerId];

    dispatch(
      updatePlayer({
        ...player,
        level: player.level - 1,
      }),
    );
  },
  onLevelIncrement: () => (dispatch, getState) => {
    const { combat: { playerId }, players } = getState();

    const player = players[playerId];

    dispatch(
      updatePlayer({
        ...player,
        level: player.level + 1,
      }),
    );
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
