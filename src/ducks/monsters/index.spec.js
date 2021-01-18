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
      monster,
      type: ADD_MONSTER,
    });

    expect(monsters[monster.id]).toBe(monster);
  });

  test('decrements/increments bonus/level', () => {
    const monster = createMonster();
    const { id } = monster;

    let monsters = reducer(
      { [id]: monster },
      {
        id,
        type: INCREMENT_MONSTER_LEVEL,
      },
    );

    expect(monsters[id].level).toBe(2);

    monsters = reducer(monsters, {
      id,
      type: DECREMENT_MONSTER_LEVEL,
    });

    expect(monsters[id].level).toBe(1);

    monsters = reducer(monsters, {
      id,
      type: INCREMENT_MONSTER_BONUS,
    });

    expect(monsters[id].bonus).toBe(1);

    monsters = reducer(monsters, {
      id,
      type: DECREMENT_MONSTER_BONUS,
    });

    expect(monsters[id].bonus).toBe(0);
  });

  test('removes monster', () => {
    const monster = createMonster();
    const { id } = monster;

    const monsters = reducer(
      { [monster.id]: monster },
      {
        id,
        type: REMOVE_MONSTER,
      },
    );

    expect(monsters[id]).toBeUndefined();
  });

  test('starts combat', () => {
    const monster = createMonster();

    const monsters = reducer(undefined, {
      monster,
      type: START_COMBAT,
    });

    expect(monsters).toStrictEqual({ [monster.id]: monster });
  });

  test('updates monster', () => {
    const monster = createMonster();
    const { id } = monster;
    const level = 12;

    const monsters = reducer(
      { [monster.id]: monster },
      {
        monster: {
          id,
          level,
        },
        type: UPDATE_MONSTER,
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
      monster,
      type: ADD_MONSTER,
    };

    expect(addMonster(monster)).toStrictEqual(expectedAction);
  });

  test('decrement monster bonus', () => {
    const monster = createMonster();
    const { id } = monster;

    const expectedAction = {
      id,
      type: DECREMENT_MONSTER_BONUS,
    };

    expect(decrementMonsterBonus(id)).toStrictEqual(expectedAction);
  });

  test('should create an action to decrement monster level', () => {
    const monster = createMonster();
    const { id } = monster;

    const expectedAction = {
      id,
      type: DECREMENT_MONSTER_LEVEL,
    };

    expect(decrementMonsterLevel(id)).toStrictEqual(expectedAction);
  });

  test('should create an action to increment monster bonus', () => {
    const monster = createMonster();
    const { id } = monster;

    const expectedAction = {
      id,
      type: INCREMENT_MONSTER_BONUS,
    };

    expect(incrementMonsterBonus(id)).toStrictEqual(expectedAction);
  });

  test('should create an action to increment monster level', () => {
    const monster = createMonster();
    const { id } = monster;

    const expectedAction = {
      id,
      type: INCREMENT_MONSTER_LEVEL,
    };

    expect(incrementMonsterLevel(id)).toStrictEqual(expectedAction);
  });

  test('should create an action to remove the monster by id', () => {
    const monster = createMonster();
    const { id } = monster;

    const expectedAction = {
      id,
      type: REMOVE_MONSTER,
    };

    expect(removeMonster(id)).toStrictEqual(expectedAction);
  });
});
