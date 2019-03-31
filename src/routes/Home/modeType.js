import PropTypes from 'prop-types';

import * as modes from './modes';

export default PropTypes.oneOf(Object.values(modes));
