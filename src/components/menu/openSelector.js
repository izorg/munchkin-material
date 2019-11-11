import { createSelector } from 'reselect';
import { flow, get, isNull } from 'lodash/fp';

import { getQuery } from '../../utils/location';

const openSelector = createSelector(getQuery, flow(get('menu'), isNull));

export default openSelector;
