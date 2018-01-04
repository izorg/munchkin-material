import { REMOVE_PLAYER } from 'munchkin-core/es/utils/actionTypes';

import { SET_PLAYER_COLOR } from '../../utils/actionTypes';

import reducer from '../playerColors';

/* global test, expect */
test('should set player color', () => {
  const playerColors = reducer(undefined, {
    type: SET_PLAYER_COLOR,
    color: '#FFFFFF',
    id: 1,
  });

  expect(playerColors[1]).toEqual('#FFFFFF');
});

test('should remove player color', () => {
  const playerColors = reducer({ 1: '#000000' }, {
    type: REMOVE_PLAYER,
    id: 1,
  });

  expect(playerColors[1]).toEqual(undefined);
});
