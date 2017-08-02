import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import SwordCross from './icons/SwordCross';
import { noop } from '../constants';

const messages = defineMessages({
  label: {
    id: 'battleButton.label',
    defaultMessage: 'Start a new battle',
  },
});

const BattleButton = ({ intl, onTouchTap }) => (
  <FloatingActionButton
    aria-label={intl.formatMessage(messages.label)}
    onTouchTap={onTouchTap}
  >
    <SwordCross />
  </FloatingActionButton>
);

BattleButton.propTypes = {
  intl: intlShape.isRequired,
  onTouchTap: PropTypes.func,
};

BattleButton.defaultProps = {
  onTouchTap: noop,
};

export default injectIntl(BattleButton);
