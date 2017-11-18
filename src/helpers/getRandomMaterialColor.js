import * as colors from 'material-ui/es/colors';

const {
  brown, common, yellow, ...availableColors
} = colors;

const colorKeys = Object.keys(availableColors);

export default () => {
  const index = Math.floor(Math.random() * colorKeys.length);

  return availableColors[colorKeys[index]][500];
};
