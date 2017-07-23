import { MOVE_PLAYER } from '../../constants/actionTypes';

import reducer from '../playerList';

/* global test, expect */
test('should move player', () => {
  const playerList = reducer([1, 2, 3], {
    type: MOVE_PLAYER,
    oldPosition: 0,
    newPosition: 2,
  });

  expect(playerList).toEqual([2, 3, 1]);
});
