import availableColors from "./availableColors";

const getRandomMaterialColor = (excluded = []) => {
  let preferredColors = availableColors.filter(
    (color) => !excluded.includes(color)
  );

  if (!preferredColors.length) {
    preferredColors = availableColors;
  }

  const index = Math.floor(Math.random() * preferredColors.length);

  return preferredColors[index];
};

export default getRandomMaterialColor;
