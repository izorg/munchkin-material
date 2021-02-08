import { v4 as uuid } from "uuid";

import createPlayer from "../../utils/createPlayer";
import { FEMALE, MALE } from "../../utils/sex";

import {
  ADD_PLAYER,
  DECREMENT_PLAYER_GEAR,
  DECREMENT_PLAYER_LEVEL,
  INCREMENT_PLAYER_GEAR,
  INCREMENT_PLAYER_LEVEL,
  KILL_PLAYER,
  TOGGLE_PLAYER_SEX,
  UPDATE_PLAYER,
} from "./actionTypes";

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
} from "./index";

describe("Players reducer", () => {
  test("adds player", () => {
    const player = createPlayer({
      name: "Munchkin",
    });

    const players = reducer(undefined, {
      player,
      type: ADD_PLAYER,
    });

    expect(players[player.id]).toBe(player);
  });

  test("increments/decrements player level/gear", () => {
    const player = createPlayer();
    const { id } = player;

    let players = reducer(
      { [id]: player },
      {
        id,
        type: INCREMENT_PLAYER_LEVEL,
      }
    );

    expect(players[id].level).toBe(2);

    players = reducer(players, {
      id,
      type: DECREMENT_PLAYER_LEVEL,
    });

    expect(players[id].level).toBe(1);

    players = reducer(players, {
      id,
      type: INCREMENT_PLAYER_GEAR,
    });

    expect(players[id].gear).toBe(1);

    players = reducer(players, {
      id,
      type: DECREMENT_PLAYER_GEAR,
    });

    expect(players[id].gear).toBe(0);
  });

  test("kill player", () => {
    const id = uuid();

    const player = createPlayer({ gear: 12, id, level: 6 });

    const players = reducer(
      { [player.id]: player },
      {
        id,
        type: KILL_PLAYER,
      }
    );

    expect(players[id].gear).toBe(0);
    expect(players[id].level).toBe(6);
  });

  test("toggles sex", () => {
    const id = uuid();

    const player = createPlayer({ id, sex: MALE });

    let players = reducer(
      { [player.id]: player },
      {
        id,
        type: TOGGLE_PLAYER_SEX,
      }
    );

    expect(players[id].sex).toBe(FEMALE);

    players = reducer(players, {
      id,
      type: TOGGLE_PLAYER_SEX,
    });

    expect(players[id].sex).toBe(MALE);
  });

  test("updates player data", () => {
    const id = uuid();

    const player = createPlayer({ id });

    const players = reducer(
      { [player.id]: player },
      {
        player: {
          id,
          name: "Lol",
        },
        type: UPDATE_PLAYER,
      }
    );

    expect(players[id].name).toBe("Lol");
  });

  test("tests default behavior", () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  test("should ignore unknown action", () => {
    const state = {};

    expect(reducer(state, {})).toBe(state);
    expect(playerReducer(state, {})).toBe(state);
  });
});

describe("Players actions", () => {
  test("should create an action to add a player", () => {
    const player = createPlayer();

    const expectedAction = {
      player,
      type: ADD_PLAYER,
    };

    expect(addPlayer(player)).toStrictEqual(expectedAction);
  });

  test("should create an action to decrement player gear", () => {
    const player = createPlayer();

    const expectedAction = {
      id: player.id,
      type: DECREMENT_PLAYER_GEAR,
    };

    expect(decrementPlayerGear(player.id)).toStrictEqual(expectedAction);
  });

  test("should create an action to decrement player level", () => {
    const player = createPlayer();

    const expectedAction = {
      id: player.id,
      type: DECREMENT_PLAYER_LEVEL,
    };

    expect(decrementPlayerLevel(player.id)).toStrictEqual(expectedAction);
  });

  test("should create an action to increment player gear", () => {
    const player = createPlayer();

    const expectedAction = {
      id: player.id,
      type: INCREMENT_PLAYER_GEAR,
    };

    expect(incrementPlayerGear(player.id)).toStrictEqual(expectedAction);
  });

  test("should create an action to increment player level", () => {
    const player = createPlayer();

    const expectedAction = {
      id: player.id,
      type: INCREMENT_PLAYER_LEVEL,
    };

    expect(incrementPlayerLevel(player.id)).toStrictEqual(expectedAction);
  });

  test("should create an action to kill player", () => {
    const player = createPlayer();

    const expectedAction = {
      id: player.id,
      type: KILL_PLAYER,
    };

    expect(killPlayer(player.id)).toStrictEqual(expectedAction);
  });

  test("should create an action to toggle player sex", () => {
    const player = createPlayer();

    const expectedAction = {
      id: player.id,
      type: TOGGLE_PLAYER_SEX,
    };

    expect(togglePlayerSex(player.id)).toStrictEqual(expectedAction);
  });

  test("should create an action to update a player", () => {
    const player = createPlayer();

    const expectedAction = {
      player,
      type: UPDATE_PLAYER,
    };

    expect(updatePlayer(player)).toStrictEqual(expectedAction);
  });
});
