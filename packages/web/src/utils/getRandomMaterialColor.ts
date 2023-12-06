import availableColors from "./availableColors";
import { getRandomInt } from "./getRandomInt";

const getRandomMaterialColor = (
  excluded: typeof availableColors = [],
): (typeof availableColors)[number] => {
  let preferredColors = availableColors.filter(
    (color) => !excluded.includes(color),
  );

  if (preferredColors.length === 0) {
    preferredColors = availableColors;
  }

  const index = getRandomInt(0, preferredColors.length - 1);

  return preferredColors[index];
};

export default getRandomMaterialColor;
