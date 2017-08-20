/* eslint-disable */
import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import { noop } from '../constants';

import SwordCross from './icons/SwordCross';

const messages = defineMessages({
  label: {
    id: 'battleButton.label',
    defaultMessage: 'Start a new battle',
  },
});

const CombatButton = ({ intl, onCombatStart, playerId }) => (
  <FloatingActionButton
    // aria-label={intl.formatMessage(messages.label)}
    onTouchTap={() => onCombatStart(playerId)}
  >
    <SwordCross />
  </FloatingActionButton>
);

CombatButton.propTypes = {
  intl: intlShape.isRequired,
  onCombatStart: PropTypes.func,
  playerId: PropTypes.number.isRequired,
};

CombatButton.defaultProps = {
  onCombatStart: noop,
};

export default injectIntl(CombatButton);
