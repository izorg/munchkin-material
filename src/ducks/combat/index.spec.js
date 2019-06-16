import uuid from 'uuid/v4';

import createMonster from '../../utils/createMonster';

import { ADD_MONSTER, REMOVE_MONSTER } from '../monsters/actionTypes';

import {
  SET_COMBAT_HELPER,
  SET_COMBAT_HELPER_BONUS,
  SET_COMBAT_PLAYER_BONUS,
  START_COMBAT,
} from './actionTypes';

import reducer, {
  setCombatHelper,
  setCombatHelperBonus,
  setCombatPlayerBonus,
  startCombat,
} from './index';

describe('Combat reducer', () => {
  test('adds monster', () => {
    const monster = createMonster();

    const combat = reducer(undefined, {
      type: ADD_MONSTER,
      monster,
    });

    expect(combat.monsters[0]).toBe(monster.id);
  });

  test('removes monster', () => {
    const monster = createMonster();
    const { id } = monster;

    const combat = reducer(
      { monsters: [id] },
      {
        type: REMOVE_MONSTER,
        id,
      },
    );

    expect(combat.monsters).toHaveLength(0);
  });

  test('sets player bonus', () => {
    const bonus = -3;

    const combat = reducer(undefined, {
      type: SET_COMBAT_PLAYER_BONUS,
      bonus,
    });

    expect(combat.playerBonus).toBe(bonus);
  });

  test('sets helper bonus', () => {
    const bonus = 3;

    const combat = reducer(undefined, {
      type: SET_COMBAT_HELPER_BONUS,
      bonus,
    });

    expect(combat.helperBonus).toBe(bonus);
  });

  test('sets helper id', () => {
    const id = 1;

    const combat = reducer(undefined, {
      type: SET_COMBAT_HELPER,
      id,
    });

    expect(combat.helperId).toBe(id);
  });

  test('starts combat', () => {
    const playerId = 10;

    const combat = reducer(undefined, {
      type: START_COMBAT,
      playerId,
    });

    expect(combat.playerId).toBe(playerId);
  });

  test('should ignore unknown action', () => {
    const state = {};

    expect(reducer(state, {})).toBe(state);
  });
});

describe('Combat actions', () => {
  test('should create an action to set helper', () => {
    const action = {
      type: SET_COMBAT_HELPER,
      id: uuid(),
    };

    expect(setCombatHelper(action.id)).toEqual(action);
  });

  test('should create an action to set helper bonus', () => {
    const action = {
      type: SET_COMBAT_HELPER_BONUS,
      bonus: 2,
    };

    expect(setCombatHelperBonus(action.bonus)).toEqual(action);
  });

  test('should create an action to set player bonus', () => {
    const action = {
      type: SET_COMBAT_PLAYER_BONUS,
      bonus: 2,
    };

    expect(setCombatPlayerBonus(action.bonus)).toEqual(action);
  });

  test('should create an action to start a combat', () => {
    const action = {
      type: START_COMBAT,
      playerId: uuid(),
    };

    expect(startCombat(action.playerId)).toEqual(action);
  });
});
