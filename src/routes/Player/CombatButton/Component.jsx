import React from 'react';
import PropTypes from 'prop-types';
import { SwordCross } from 'mdi-material-ui';

import Fab from '../../../components/Fab';

const CombatButton = ({ goToCombat, playerId, ...rest }) => (
  <Fab
    data-screenshots="combat-button"
    onClick={() => goToCombat(playerId)}
    {...rest}
  >
    <SwordCross />
  </Fab>
);

CombatButton.propTypes = {
  goToCombat: PropTypes.func.isRequired,
  playerId: PropTypes.string.isRequired,
};

export default CombatButton;
