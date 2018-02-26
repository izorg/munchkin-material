import {
  ADD_PLAYER_TO_LIST,
  MOVE_PLAYER,
  REMOVE_PLAYER_FROM_LIST,
} from '../../utils/actionTypes';

import reducer from '../playerList';

test('should add player', () => {
  let playerList = reducer(undefined, {
    type: ADD_PLAYER_TO_LIST,
    id: 1,
  });

  expect(playerList[0]).toEqual(1);

  playerList = reducer(playerList, {
    type: ADD_PLAYER_TO_LIST,
    id: 2,
  });

  expect(playerList[1]).toEqual(2);
});

test('should move player', () => {
  const playerList = reducer([1, 2, 3], {
    type: MOVE_PLAYER,
    oldPosition: 0,
    newPosition: 2,
  });

  expect(playerList).toEqual([2, 3, 1]);
});

test('should remove player', () => {
  const playerList = reducer([1, 2, 3], {
    type: REMOVE_PLAYER_FROM_LIST,
    id: 2,
  });

  expect(playerList[1]).toEqual(3);
});
