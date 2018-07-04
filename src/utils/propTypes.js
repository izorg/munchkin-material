import PropTypes from 'prop-types';
import { FEMALE, MALE } from 'munchkin-core';

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
