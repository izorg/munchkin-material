import React from 'react';
import PropTypes from 'prop-types';
import { SwordCross } from 'mdi-material-ui';

import DialogFab from '../../../components/DialogFab';

const CombatButton = ({ goToCombat, playerId, ...rest }) => (
  <DialogFab
    data-screenshots="combat-button"
    onClick={() => goToCombat(playerId)}
    {...rest}
  >
    <SwordCross />
  </DialogFab>
);

CombatButton.propTypes = {
  goToCombat: PropTypes.func.isRequired,
  playerId: PropTypes.string.isRequired,
};

CombatButton.displayName = 'CombatButton';

export default CombatButton;
