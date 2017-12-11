import PropTypes from 'prop-types';
import Monster from 'munchkin-core/es/classes/Monster';
import Player from 'munchkin-core/es/classes/Player';

export const classesObject = PropTypes.object;
export const locationShape = PropTypes.shape({
  pathname: PropTypes.string.isRequired,
});
export const monsterInstance = PropTypes.instanceOf(Monster);
export const playerInstance = PropTypes.instanceOf(Player);
export const themeObject = PropTypes.object;
