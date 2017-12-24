import PropTypes from 'prop-types';

export const classesObject = PropTypes.object;
export const locationShape = PropTypes.shape({
  pathname: PropTypes.string.isRequired,
});
export const monsterInstance = PropTypes.shape({
  bonus: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
});
export const playerInstance = PropTypes.shape({
  gear: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});
export const themeObject = PropTypes.object;
