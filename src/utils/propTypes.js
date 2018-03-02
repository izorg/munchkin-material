import PropTypes from 'prop-types';
import * as gender from 'munchkin-core/lib/utils/gender';

export const genderProp = PropTypes.oneOf(Object.values(gender));

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
