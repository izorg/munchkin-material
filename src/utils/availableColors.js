import { colors } from '@material-ui/core';

const { brown, common, ...rest } = colors;

const availableColors = Object.values(rest).map((color) => color[500]);

export default availableColors;
