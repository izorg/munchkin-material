import PropTypes from 'prop-types';
import Monster from 'munchkin-core/lib/classes/Monster';
import Player from 'munchkin-core/lib/classes/Player';

export const classesObject = PropTypes.object;
export const monsterInstance = PropTypes.instanceOf(Monster);
export const playerInstance = PropTypes.instanceOf(Player);
