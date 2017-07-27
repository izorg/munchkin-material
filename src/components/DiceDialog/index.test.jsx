import React from 'react';
import { shallow } from 'enzyme';

import DiceDialog from '../DiceDialog';
import DiceOne from '../icons/dice/one';
import DiceTwo from '../icons/dice/two';
import DiceThree from '../icons/dice/three';
import DiceFour from '../icons/dice/four';
import DiceFive from '../icons/dice/five';
import DiceSix from '../icons/dice/six';

const icons = [
  DiceOne,
  DiceTwo,
  DiceThree,
  DiceFour,
  DiceFive,
  DiceSix,
];

/* global describe, expect, test */
describe('DiceDialog', () => {
  test('renders dices', () => {
    const diceDialog = shallow(<DiceDialog />);

    icons.forEach((Icon, index) => {
      diceDialog.setProps({ dice: index + 1 });
      expect(diceDialog.contains(<Icon />)).toBe(true);
    });
  });
});
