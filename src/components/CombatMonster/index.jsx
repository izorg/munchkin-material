import React from 'react';
import PropTypes from 'prop-types';

import { noop } from '../../constants';

const CombatMonster = ({ onRemove }) => (
  <div>
    Monster
    <button onClick={onRemove}>x</button>
  </div>
);

CombatMonster.propTypes = {
  onRemove: PropTypes.func,
};

CombatMonster.defaultProps = {
  onRemove: noop,
};

export default CombatMonster;
