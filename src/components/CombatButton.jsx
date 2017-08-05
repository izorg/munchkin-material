/* eslint-disable */
import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import SwordCross from './icons/SwordCross';

const messages = defineMessages({
  label: {
    id: 'battleButton.label',
    defaultMessage: 'Start a new battle',
  },
});

const CombatButton = ({ intl, playerId }) => (
  <FloatingActionButton
    // aria-label={intl.formatMessage(messages.label)}
    containerElement={<Link to={`/player/${playerId}/combat`} />}
  >
    <SwordCross />
  </FloatingActionButton>
);

CombatButton.propTypes = {
  intl: intlShape.isRequired,
  playerId: PropTypes.number.isRequired,
};

export default injectIntl(CombatButton);
