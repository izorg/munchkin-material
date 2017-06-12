/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { shallow } from 'enzyme';

import DiceDialog from '../DiceDialog';
import DiceOneIcon from '../icons/dice/one';
import DiceTwoIcon from '../icons/dice/two';
import DiceThreeIcon from '../icons/dice/three';
import DiceFourIcon from '../icons/dice/four';
import DiceFiveIcon from '../icons/dice/five';
import DiceSixIcon from '../icons/dice/six';

const icons = [
  DiceOneIcon,
  DiceTwoIcon,
  DiceThreeIcon,
  DiceFourIcon,
  DiceFiveIcon,
  DiceSixIcon,
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
