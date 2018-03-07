import PropTypes from 'prop-types';
import * as sex from 'munchkin-core/lib/utils/sex';

export const sexProp = PropTypes.oneOf(Object.values(sex));

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
