import * as colorSets from '@material-ui/core/colors';
import { map } from 'lodash/fp';

const { brown, common, ...availableColorSets } = colorSets;

export default map(500, availableColorSets);
