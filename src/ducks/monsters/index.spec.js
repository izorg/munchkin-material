import createMonster from '../../utils/createMonster';
import { START_COMBAT } from '../combat/actionTypes';

import {
  ADD_MONSTER,
  DECREMENT_MONSTER_BONUS,
  DECREMENT_MONSTER_LEVEL,
  INCREMENT_MONSTER_BONUS,
  INCREMENT_MONSTER_LEVEL,
  REMOVE_MONSTER,
  UPDATE_MONSTER,
} from './actionTypes';

import reducer, {
  addMonster,
  decrementMonsterBonus,
  decrementMonsterLevel,
  incrementMonsterBonus,
  incrementMonsterLevel,
  monsterReducer,
  removeMonster,
} from './index';

describe('Monsters reducer', () => {
  test('adds monster', () => {
    const monster = createMonster();

    const monsters = reducer(undefined, {
      type: ADD_MONSTER,
      monster,
    });

    expect(monsters[monster.id]).toBe(monster);
  });

  test('decrements/increments bonus/level', () => {
    const monster = createMonster();
    const { id } = monster;

    let monsters = reducer(
      { [id]: monster },
      {
        type: INCREMENT_MONSTER_LEVEL,
        id,
      },
    );

    expect(monsters[id].level).toBe(2);

    monsters = reducer(monsters, {
      type: DECREMENT_MONSTER_LEVEL,
      id,
    });

    expect(monsters[id].level).toBe(1);

    monsters = reducer(monsters, {
      type: INCREMENT_MONSTER_BONUS,
      id,
    });

    expect(monsters[id].bonus).toBe(1);

    monsters = reducer(monsters, {
      type: DECREMENT_MONSTER_BONUS,
      id,
    });

    expect(monsters[id].bonus).toBe(0);
  });

  test('removes monster', () => {
    const monster = createMonster();
    const { id } = monster;

    const monsters = reducer(
      { [monster.id]: monster },
      {
        type: REMOVE_MONSTER,
        id,
      },
    );

    expect(monsters[id]).toBeUndefined();
  });

  test('starts combat', () => {
    const monster = createMonster();

    const monsters = reducer(undefined, {
      type: START_COMBAT,
      monster,
    });

    expect(monsters).toEqual({ [monster.id]: monster });
  });

  test('updates monster', () => {
    const monster = createMonster();
    const { id } = monster;
    const level = 12;

    const monsters = reducer(
      { [monster.id]: monster },
      {
        type: UPDATE_MONSTER,
        monster: {
          id,
          level,
        },
      },
    );

    expect(monsters[id].level).toBe(level);
  });

  test('should ignore unknown action', () => {
    const state = {};

    expect(reducer(state, {})).toBe(state);
    expect(monsterReducer(state, {})).toBe(state);
  });
});

describe('Monsters actions', () => {
  test('add a monster', () => {
    const monster = createMonster();

    const expectedAction = {
      type: ADD_MONSTER,
      monster,
    };

    expect(addMonster(monster)).toEqual(expectedAction);
  });

  test('decrement monster bonus', () => {
    const monster = createMonster();
    const { id } = monster;

    const expectedAction = {
      type: DECREMENT_MONSTER_BONUS,
      id,
    };

    expect(decrementMonsterBonus(id)).toEqual(expectedAction);
  });

  test('should create an action to decrement monster level', () => {
    const monster = createMonster();
    const { id } = monster;

    const expectedAction = {
      type: DECREMENT_MONSTER_LEVEL,
      id,
    };

    expect(decrementMonsterLevel(id)).toEqual(expectedAction);
  });

  test('should create an action to increment monster bonus', () => {
    const monster = createMonster();
    const { id } = monster;

    const expectedAction = {
      type: INCREMENT_MONSTER_BONUS,
      id,
    };

    expect(incrementMonsterBonus(id)).toEqual(expectedAction);
  });

  test('should create an action to increment monster level', () => {
    const monster = createMonster();
    const { id } = monster;

    const expectedAction = {
      type: INCREMENT_MONSTER_LEVEL,
      id,
    };

    expect(incrementMonsterLevel(id)).toEqual(expectedAction);
  });

  test('should create an action to remove the monster by id', () => {
    const monster = createMonster();
    const { id } = monster;

    const expectedAction = {
      type: REMOVE_MONSTER,
      id,
    };

    expect(removeMonster(id)).toEqual(expectedAction);
  });
});
