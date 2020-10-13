import { v4 as uuid } from 'uuid';

import createPlayer from '../../utils/createPlayer';
import { FEMALE, MALE } from '../../utils/sex';

import {
  ADD_PLAYER,
  DECREMENT_PLAYER_GEAR,
  DECREMENT_PLAYER_LEVEL,
  INCREMENT_PLAYER_GEAR,
  INCREMENT_PLAYER_LEVEL,
  KILL_PLAYER,
  TOGGLE_PLAYER_SEX,
  UPDATE_PLAYER,
} from './actionTypes';

import reducer, {
  addPlayer,
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
  initialState,
  killPlayer,
  playerReducer,
  togglePlayerSex,
  updatePlayer,
} from './index';

describe('Players reducer', () => {
  test('adds player', () => {
    const player = createPlayer({
      name: 'Munchkin',
    });

    const players = reducer(undefined, {
      type: ADD_PLAYER,
      player,
    });

    expect(players[player.id]).toBe(player);
  });

  test('increments/decrements player level/gear', () => {
    const player = createPlayer();
    const { id } = player;

    let players = reducer(
      { [id]: player },
      {
        type: INCREMENT_PLAYER_LEVEL,
        id,
      },
    );

    expect(players[id].level).toBe(2);

    players = reducer(players, {
      type: DECREMENT_PLAYER_LEVEL,
      id,
    });

    expect(players[id].level).toBe(1);

    players = reducer(players, {
      type: INCREMENT_PLAYER_GEAR,
      id,
    });

    expect(players[id].gear).toBe(1);

    players = reducer(players, {
      type: DECREMENT_PLAYER_GEAR,
      id,
    });

    expect(players[id].gear).toBe(0);
  });

  test('kill player', () => {
    const id = uuid();

    const player = createPlayer({ id, gear: 12, level: 6 });

    const players = reducer(
      { [player.id]: player },
      {
        type: KILL_PLAYER,
        id,
      },
    );

    expect(players[id].gear).toBe(0);
    expect(players[id].level).toBe(6);
  });

  test('toggles sex', () => {
    const id = uuid();

    const player = createPlayer({ id, sex: MALE });

    let players = reducer(
      { [player.id]: player },
      {
        type: TOGGLE_PLAYER_SEX,
        id,
      },
    );

    expect(players[id].sex).toBe(FEMALE);

    players = reducer(players, {
      type: TOGGLE_PLAYER_SEX,
      id,
    });

    expect(players[id].sex).toBe(MALE);
  });

  test('updates player data', () => {
    const id = uuid();

    const player = createPlayer({ id });

    const players = reducer(
      { [player.id]: player },
      {
        type: UPDATE_PLAYER,
        player: {
          id,
          name: 'Lol',
        },
      },
    );

    expect(players[id].name).toBe('Lol');
  });

  test('tests default behavior', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  test('should ignore unknown action', () => {
    const state = {};

    expect(reducer(state, {})).toBe(state);
    expect(playerReducer(state, {})).toBe(state);
  });
});

describe('Players actions', () => {
  test('should create an action to add a player', () => {
    const player = createPlayer();

    const expectedAction = {
      type: ADD_PLAYER,
      player,
    };

    expect(addPlayer(player)).toStrictEqual(expectedAction);
  });

  test('should create an action to decrement player gear', () => {
    const player = createPlayer();

    const expectedAction = {
      type: DECREMENT_PLAYER_GEAR,
      id: player.id,
    };

    expect(decrementPlayerGear(player.id)).toStrictEqual(expectedAction);
  });

  test('should create an action to decrement player level', () => {
    const player = createPlayer();

    const expectedAction = {
      type: DECREMENT_PLAYER_LEVEL,
      id: player.id,
    };

    expect(decrementPlayerLevel(player.id)).toStrictEqual(expectedAction);
  });

  test('should create an action to increment player gear', () => {
    const player = createPlayer();

    const expectedAction = {
      type: INCREMENT_PLAYER_GEAR,
      id: player.id,
    };

    expect(incrementPlayerGear(player.id)).toStrictEqual(expectedAction);
  });

  test('should create an action to increment player level', () => {
    const player = createPlayer();

    const expectedAction = {
      type: INCREMENT_PLAYER_LEVEL,
      id: player.id,
    };

    expect(incrementPlayerLevel(player.id)).toStrictEqual(expectedAction);
  });

  test('should create an action to kill player', () => {
    const player = createPlayer();

    const expectedAction = {
      type: KILL_PLAYER,
      id: player.id,
    };

    expect(killPlayer(player.id)).toStrictEqual(expectedAction);
  });

  test('should create an action to toggle player sex', () => {
    const player = createPlayer();

    const expectedAction = {
      type: TOGGLE_PLAYER_SEX,
      id: player.id,
    };

    expect(togglePlayerSex(player.id)).toStrictEqual(expectedAction);
  });

  test('should create an action to update a player', () => {
    const player = createPlayer();

    const expectedAction = {
      type: UPDATE_PLAYER,
      player,
    };

    expect(updatePlayer(player)).toStrictEqual(expectedAction);
  });
});
