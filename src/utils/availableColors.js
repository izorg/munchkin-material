import * as colorSets from '@material-ui/core/colors';
import { map } from 'lodash/fp';

const { brown, common, ...availableColorSets } = colorSets;

const availableColors = map(500, availableColorSets);

export default availableColors;
