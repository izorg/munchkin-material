import PropTypes from 'prop-types';
import { FEMALE, MALE } from 'munchkin-core';
import { keys as breakpoints } from '@material-ui/core/styles/createBreakpoints';

export const sexProp = PropTypes.oneOf([FEMALE, MALE]);

export const monsterShape = PropTypes.shape({
  bonus: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
});

export const playerShape = PropTypes.shape({
  gear: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string,
});

export const widthProp = PropTypes.oneOf(breakpoints);
