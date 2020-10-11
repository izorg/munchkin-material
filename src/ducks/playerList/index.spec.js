import {
  ADD_PLAYER_TO_LIST,
  MOVE_PLAYER,
  SHUFFLE_PLAYERS,
} from './actionTypes';

import reducer from './index';

describe('Player List reducer', () => {
  test('should add player', () => {
    let playerList = reducer(undefined, {
      type: ADD_PLAYER_TO_LIST,
      id: 1,
    });

    expect(playerList[0]).toStrictEqual(1);

    playerList = reducer(playerList, {
      type: ADD_PLAYER_TO_LIST,
      id: 2,
    });

    expect(playerList[1]).toStrictEqual(2);
  });

  test('should move player', () => {
    const playerList = reducer([1, 2, 3], {
      type: MOVE_PLAYER,
      oldPosition: 0,
      newPosition: 2,
    });

    expect(playerList).toStrictEqual([2, 3, 1]);
  });

  test('should shuffle players', () => {
    const state = [1, 2, 3];

    const playerList = reducer([1, 2, 3], {
      type: SHUFFLE_PLAYERS,
    });

    expect(playerList).not.toBe(state);
    expect(playerList).toHaveLength(state.length);
  });
});
