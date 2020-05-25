import reducer, { THROW_DICE } from './index';

describe('Dice reducer', () => {
  test('should set dice value from action', () => {
    const dice = reducer(undefined, {
      type: THROW_DICE,
      dice: 1,
    });

    expect(dice).toBe(1);
  });
});
