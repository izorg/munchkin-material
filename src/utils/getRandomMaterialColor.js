import { without } from 'lodash/fp';

import availableColors from './availableColors';

export default (excluded = []) => {
  let preferredColors = without(excluded, availableColors);

  if (!preferredColors.length) {
    preferredColors = availableColors;
  }

  const index = Math.floor(Math.random() * preferredColors.length);

  return preferredColors[index];
};
