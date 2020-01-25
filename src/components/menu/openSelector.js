import { getQuery } from '../../utils/location';

const openSelector = (state) => getQuery(state).menu === null;

export default openSelector;
