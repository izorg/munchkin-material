import toggleSex from './toggleSex';
import { FEMALE, MALE } from './sex';

describe('Sex toggle', () => {
  test('should change female to male and vice versa', () => {
    expect(toggleSex(FEMALE)).toBe(MALE);
    expect(toggleSex(MALE)).toBe(FEMALE);
  });

  test('should ignore unknown sex', () => {
    const sex = 'test';

    expect(toggleSex(sex)).toBe(sex);
  });
});
